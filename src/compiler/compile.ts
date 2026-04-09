import { marked } from 'marked';
import { evaluateExpression, formatValue, isTruthy } from './expression';
import { parseSource, type AppNode } from './parser';
import { getByPath } from '../lib/object-path';
import { getManifestPath, type LayoutName } from '../lib/config';
import {
  ensureStorageLayout,
  hasManifest,
  listSourceFiles,
  readCompiledPage,
  readLocalData,
  readManifest,
  readSourceFile,
  writeCompiledPage,
  writeManifest,
} from '../lib/storage';
import type {
  AppFrontmatter,
  CompileAllResult,
  CompiledPage,
  DataDescriptor,
  DataStatus,
  FieldConfig,
  PublishedPageSummary,
  Scope,
} from '../lib/types';

marked.use({
  gfm: true,
  breaks: false,
});

interface ResolvedData {
  descriptors: Record<string, DataDescriptor>;
  values: Record<string, unknown>;
  statuses: Record<string, DataStatus>;
}

export async function compileSource(source: string, sourcePath?: string): Promise<CompiledPage> {
  const { frontmatter, body } = parseSource(source);
  const definitions = collectDefinitions(body);
  validateBody(definitions.body, frontmatter, definitions.named);
  const resolvedData = await resolveData(frontmatter.data);
  const fields = collectFields(definitions.body);
  const runtime = {
    slug: frontmatter.slug,
    state: structuredClone(frontmatter.state),
    data: resolvedData.descriptors,
    computed: frontmatter.computed,
    fields,
    persist: frontmatter.meta.persist ?? [],
  };
  const scope = buildScope(runtime.state, resolvedData.values, frontmatter.computed, fields, resolvedData.statuses);
  const html = renderNodes(definitions.body, scope, definitions.named, 'live', fields, resolvedData.statuses);

  return {
    frontmatter,
    html,
    runtime,
    sourcePath,
    updatedAt: new Date().toISOString(),
  };
}

export async function compileAllPages(): Promise<CompileAllResult> {
  await ensureStorageLayout();
  const files = await listSourceFiles();
  const pages: PublishedPageSummary[] = [];

  for (const filePath of files) {
    const source = await readSourceFile(filePath);
    const compiled = await compileSource(source, filePath);
    await writeCompiledPage(compiled.frontmatter.slug, compiled);

    if (compiled.frontmatter.meta.published !== false) {
      pages.push({
        slug: compiled.frontmatter.slug,
        title: compiled.frontmatter.title,
        description: compiled.frontmatter.description,
        theme: compiled.frontmatter.theme,
        layout: compiled.frontmatter.layout,
        tags: compiled.frontmatter.meta.tags ?? [],
        sourcePath: filePath,
        updatedAt: compiled.updatedAt,
      });
    }
  }

  const result = {
    manifestPath: getManifestPath(),
    pages: pages.sort((left, right) => left.title.localeCompare(right.title)),
  };

  await writeManifest(result);
  return result;
}

export async function ensureCompiledSite() {
  if (await hasManifest()) return readManifest();
  const result = await compileAllPages();
  return result.pages;
}

export async function loadCompiledPage(slug: string) {
  try {
    return await readCompiledPage(slug);
  } catch {
    await compileAllPages();
    return readCompiledPage(slug);
  }
}

export function storagePathHint(layout: LayoutName, slug: string) {
  if (layout === 'article') return `storage/content/guides/${slug}.md`;
  if (layout === 'dashboard') return `storage/content/dashboards/${slug}.md`;
  return `storage/content/tools/${slug}.md`;
}

async function resolveData(entries: AppFrontmatter['data']): Promise<ResolvedData> {
  const descriptors: Record<string, DataDescriptor> = {};
  const values: Record<string, unknown> = {};
  const statuses: Record<string, DataStatus> = {};

  for (const [key, value] of Object.entries(entries)) {
    if (typeof value === 'string' && /^https?:\/\//.test(value)) {
      descriptors[key] = {
        kind: 'remote',
        url: value,
        initialValue: [],
      };
      values[key] = [];
      statuses[key] = { loading: true, loaded: false, error: null };
      continue;
    }

    if (typeof value === 'string' && value.startsWith('/')) {
      const localValue = await readLocalData(value);
      descriptors[key] = {
        kind: 'local',
        path: value,
        value: localValue,
      };
      values[key] = localValue;
      statuses[key] = { loading: false, loaded: true, error: null };
      continue;
    }

    descriptors[key] = {
      kind: 'inline',
      value,
    };
    values[key] = value;
    statuses[key] = { loading: false, loaded: true, error: null };
  }

  return { descriptors, values, statuses };
}

function collectDefinitions(nodes: AppNode[]) {
  const named: Record<string, AppNode[]> = {};

  const strip = (entries: AppNode[]): AppNode[] => {
    const result: AppNode[] = [];

    for (const node of entries) {
      if (node.type === 'define') {
        const name = node.attrs.name ?? '';
        if (name) {
          named[name] = strip(node.children);
        }
        continue;
      }

      if (node.type === 'if') {
        result.push({
          ...node,
          branches: node.branches.map((branch) => ({
            ...branch,
            children: strip(branch.children),
          })),
          elseChildren: strip(node.elseChildren),
        });
        continue;
      }

      if (node.type === 'for' || node.type === 'callout' || node.type === 'accordion' || node.type === 'empty') {
        result.push({ ...node, children: strip(node.children) });
        continue;
      }

      result.push(node);
    }

    return result;
  };

  return {
    body: strip(nodes),
    named,
  };
}

function collectFields(nodes: AppNode[]) {
  const fields: FieldConfig[] = [];

  const walk = (entries: AppNode[]) => {
    for (const node of entries) {
      if (
        node.type === 'select' ||
        node.type === 'input' ||
        node.type === 'textarea' ||
        node.type === 'checkbox' ||
        node.type === 'radio' ||
        node.type === 'range' ||
        node.type === 'toggle'
      ) {
        const bind = node.attrs.bind;
        if (!bind) continue;
        fields.push({
          bind,
          control: node.type,
          label: node.attrs.label,
          type: node.attrs.type,
          options: node.attrs.options,
          required: node.attrs.required === 'true',
          min: parseNumberAttr(node.attrs.min),
          max: parseNumberAttr(node.attrs.max),
          match: node.attrs.match,
          step: parseNumberAttr(node.attrs.step),
          url: node.attrs.url === 'true',
        });
      }

      if (node.type === 'if') {
        for (const branch of node.branches) walk(branch.children);
        walk(node.elseChildren);
      }

      if (node.type === 'for' || node.type === 'callout' || node.type === 'accordion' || node.type === 'empty') {
        walk(node.children);
      }
    }
  };

  walk(nodes);
  return fields;
}

function buildScope(
  state: Record<string, unknown>,
  data: Record<string, unknown>,
  computedEntries: Record<string, string>,
  fields: FieldConfig[],
  statuses: Record<string, DataStatus>,
  localScope: Scope = {},
) {
  const helpers = createScopeHelpers(state, fields, statuses);
  const computed: Record<string, unknown> = {};

  for (const [key, expression] of Object.entries(computedEntries)) {
    computed[key] = evaluateExpression(expression, {
      ...helpers,
      ...data,
      ...state,
      ...computed,
      ...localScope,
    });
  }

  return {
    ...helpers,
    ...data,
    ...state,
    ...computed,
    ...localScope,
  };
}

function createScopeHelpers(
  state: Record<string, unknown>,
  fields: FieldConfig[],
  statuses: Record<string, DataStatus>,
) {
  const validation = computeValidationMap(state, fields);
  return {
    invalid: (field: unknown) => validation[String(field)]?.invalid ?? false,
    required: (value: unknown) => isRequiredSatisfied(value),
    min: (value: unknown, threshold: unknown) => compareNumeric(value) >= Number(threshold),
    max: (value: unknown, threshold: unknown) => compareNumeric(value) <= Number(threshold),
    match: (value: unknown, pattern: unknown) => new RegExp(String(pattern)).test(formatValue(value)),
    loading: (key: unknown) => statuses[String(key)]?.loading ?? false,
    error: (key: unknown) => Boolean(statuses[String(key)]?.error),
  };
}

function renderNodes(
  nodes: AppNode[],
  scope: Scope,
  definitions: Record<string, AppNode[]>,
  mode: 'live' | 'template',
  fields: FieldConfig[],
  statuses: Record<string, DataStatus>,
  macroDepth = 0,
): string {
  return nodes.map((node) => renderNode(node, scope, definitions, mode, fields, statuses, macroDepth)).join('\n');
}

function renderNode(
  node: AppNode,
  scope: Scope,
  definitions: Record<string, AppNode[]>,
  mode: 'live' | 'template',
  fields: FieldConfig[],
  statuses: Record<string, DataStatus>,
  macroDepth = 0,
): string {
  if (node.type === 'markdown') {
    return renderMarkdown(node.content, scope, mode);
  }

  if (node.type === 'if') {
    const branchMarkup = node.branches
      .map((branch) => {
        const visible = isTruthy(safeEvaluate(branch.expression, scope));
        return `<div data-app-condition-branch data-app-condition-expr="${escapeAttr(branch.expression)}"${visible ? '' : ' hidden'}>${renderNodes(branch.children, scope, definitions, mode, fields, statuses, macroDepth)}</div>`;
      })
      .join('');
    const elseVisible = node.branches.every((branch) => !isTruthy(safeEvaluate(branch.expression, scope)));
    const elseMarkup = node.elseChildren.length
      ? `<div data-app-condition-else${elseVisible ? '' : ' hidden'}>${renderNodes(node.elseChildren, scope, definitions, mode, fields, statuses, macroDepth)}</div>`
      : '';
    return `<div class="imd-condition" data-app-condition>${branchMarkup}${elseMarkup}</div>`;
  }

  if (node.type === 'empty') {
    const value = safeEvaluate(node.expression, scope);
    const visible = !isTruthy(value);
    return `<div class="imd-empty" data-app-empty="${escapeAttr(node.expression)}"${visible ? '' : ' hidden'}>${renderNodes(node.children, scope, definitions, mode, fields, statuses, macroDepth)}</div>`;
  }

  if (node.type === 'for') {
    const items = safeEvaluate(node.expression, scope);
    const rendered = Array.isArray(items)
      ? items.map((item) => renderNodes(node.children, { ...scope, [node.alias]: item }, definitions, 'live', fields, statuses, macroDepth)).join('')
      : '';
    const template = renderNodes(node.children, scope, definitions, 'template', fields, statuses, macroDepth);
    return [
      `<div class="imd-loop" data-app-for="${escapeAttr(node.expression)}" data-app-for-alias="${escapeAttr(node.alias)}">`,
      `<template>${template}</template>`,
      `<div data-app-for-target>${rendered}</div>`,
      '</div>',
    ].join('');
  }

  if (node.type === 'select') {
    return renderSelect(node.attrs, scope, mode);
  }

  if (node.type === 'input') {
    return renderInput(node.attrs, scope, 'input');
  }

  if (node.type === 'textarea') {
    return renderInput(node.attrs, scope, 'textarea');
  }

  if (node.type === 'checkbox') {
    return renderCheckbox(node.attrs, scope, false);
  }

  if (node.type === 'toggle') {
    return renderCheckbox(node.attrs, scope, true);
  }

  if (node.type === 'radio') {
    return renderRadio(node.attrs, scope);
  }

  if (node.type === 'range') {
    return renderInput(node.attrs, scope, 'range');
  }

  if (node.type === 'button') {
    return renderButton(node.attrs);
  }

  if (node.type === 'json-list') {
    return renderJsonList(node.attrs, scope);
  }

  if (node.type === 'callout') {
    const type = escapeAttr(node.attrs.type ?? 'info');
    const title = node.attrs.title ? `<div class="imd-callout-title">${escapeHtml(node.attrs.title)}</div>` : '';
    return `<aside class="imd-callout imd-callout-${type}">${title}<div class="imd-callout-body">${renderNodes(node.children, scope, definitions, mode, fields, statuses, macroDepth)}</div></aside>`;
  }

  if (node.type === 'accordion') {
    const title = node.attrs.title ?? 'Details';
    return `<details class="imd-accordion"><summary>${escapeHtml(title)}</summary><div class="imd-accordion-body">${renderNodes(node.children, scope, definitions, mode, fields, statuses, macroDepth)}</div></details>`;
  }

  if (node.type === 'use') {
    if (macroDepth > 8) return '<div class="imd-error">Macro recursion limit reached.</div>';
    const template = definitions[node.name];
    if (!template) return `<div class="imd-error">Unknown macro ${escapeHtml(node.name)}.</div>`;
    const macroScope = { ...scope, ...parseScopeAssignments(node.attrs.with, scope) };
    return renderNodes(template, macroScope, definitions, mode, fields, statuses, macroDepth + 1);
  }

  if (node.type === 'appjs') {
    return `<script type="application/appjs">${escapeHtml(node.code)}</script>`;
  }

  return '';
}

function renderMarkdown(markdown: string, scope: Scope, mode: 'live' | 'template') {
  const transformed = markdown.replace(/{{\s*([^}]+?)\s*}}/g, (_match, expression: string) => {
    const value = mode === 'live' ? escapeHtml(formatValue(safeEvaluate(expression.trim(), scope))) : '';
    return `<span data-app-text="${escapeAttr(expression.trim())}">${value}</span>`;
  });
  return marked.parse(transformed) as string;
}

function renderSelect(attrs: Record<string, string>, scope: Scope, mode: 'live' | 'template') {
  const bind = attrs.bind;
  const optionsAttr = attrs.options;
  if (!bind || !optionsAttr) return '<div class="imd-error">Invalid select directive.</div>';

  const options = resolveOptions(optionsAttr, scope);
  const label = attrs.label ? `<label class="imd-field-label" for="field-${escapeAttr(bind)}">${escapeHtml(attrs.label)}</label>` : '';
  const currentValue = mode === 'live' ? scope[bind] : undefined;
  const optionMarkup = options
    .map((option) => {
      const selected = currentValue === option.value ? ' selected' : '';
      return `<option value="${escapeAttr(option.value)}"${selected}>${escapeHtml(option.label)}</option>`;
    })
    .join('');

  return [
    `<div class="imd-field" data-app-field-wrap="${escapeAttr(bind)}">`,
    label,
    `<select id="field-${escapeAttr(bind)}" ${renderFieldAttrs(attrs, bind)} data-app-control="select" data-app-options="${escapeAttr(optionsAttr)}">`,
    optionMarkup,
    '</select>',
    `<div class="imd-field-error" data-app-invalid-message="${escapeAttr(bind)}"></div>`,
    '</div>',
  ].join('');
}

function renderInput(attrs: Record<string, string>, scope: Scope, kind: 'input' | 'textarea' | 'range') {
  const bind = attrs.bind;
  if (!bind) return '<div class="imd-error">Invalid input directive.</div>';

  const label = attrs.label ? `<label class="imd-field-label" for="field-${escapeAttr(bind)}">${escapeHtml(attrs.label)}</label>` : '';
  const commonAttrs = `${renderFieldAttrs(attrs, bind)} data-app-control="${kind}"`;
  const value = scope[bind];
  const inputType = kind === 'range' ? 'range' : attrs.type ?? 'text';
  const min = attrs.min ? ` min="${escapeAttr(attrs.min)}"` : '';
  const max = attrs.max ? ` max="${escapeAttr(attrs.max)}"` : '';
  const step = attrs.step ? ` step="${escapeAttr(attrs.step)}"` : '';
  const placeholder = attrs.placeholder ? ` placeholder="${escapeAttr(attrs.placeholder)}"` : '';

  const control =
    kind === 'textarea'
      ? `<textarea id="field-${escapeAttr(bind)}" ${commonAttrs}${placeholder}>${escapeHtml(formatValue(value))}</textarea>`
      : `<input id="field-${escapeAttr(bind)}" type="${escapeAttr(inputType)}" value="${escapeAttr(formatValue(value))}" ${commonAttrs}${min}${max}${step}${placeholder} />`;

  return [
    `<div class="imd-field" data-app-field-wrap="${escapeAttr(bind)}">`,
    label,
    control,
    `<div class="imd-field-error" data-app-invalid-message="${escapeAttr(bind)}"></div>`,
    '</div>',
  ].join('');
}

function renderCheckbox(attrs: Record<string, string>, scope: Scope, toggle = false) {
  const bind = attrs.bind;
  if (!bind) return '<div class="imd-error">Invalid checkbox directive.</div>';
  const checked = Boolean(scope[bind]);
  const label = escapeHtml(attrs.label ?? bind);

  if (toggle) {
    return [
      `<div class="imd-field imd-toggle-field" data-app-field-wrap="${escapeAttr(bind)}">`,
      `<button type="button" class="imd-toggle-button" data-app-bind="${escapeAttr(bind)}" data-app-control="toggle" data-app-checked="${checked ? 'true' : 'false'}"${attrs.url === 'true' ? ' data-app-url="true"' : ''}>`,
      `<span>${label}</span><span class="imd-toggle-pill">${checked ? 'On' : 'Off'}</span>`,
      '</button>',
      `<div class="imd-field-error" data-app-invalid-message="${escapeAttr(bind)}"></div>`,
      '</div>',
    ].join('');
  }

  return [
    `<label class="imd-check-field" data-app-field-wrap="${escapeAttr(bind)}">`,
    `<input type="checkbox" ${renderFieldAttrs(attrs, bind)} data-app-control="checkbox"${checked ? ' checked' : ''} />`,
    `<span>${label}</span>`,
    '</label>',
    `<div class="imd-field-error" data-app-invalid-message="${escapeAttr(bind)}"></div>`,
  ].join('');
}

function renderRadio(attrs: Record<string, string>, scope: Scope) {
  const bind = attrs.bind;
  const optionsAttr = attrs.options;
  if (!bind || !optionsAttr) return '<div class="imd-error">Invalid radio directive.</div>';

  const options = resolveOptions(optionsAttr, scope);
  const currentValue = scope[bind];
  const label = attrs.label ? `<legend class="imd-field-label">${escapeHtml(attrs.label)}</legend>` : '';
  const url = attrs.url === 'true' ? ' data-app-url="true"' : '';

  const radios = options
    .map((option) => {
      const checked = currentValue === option.value ? ' checked' : '';
      return `<label class="imd-radio-option"><input type="radio" name="field-${escapeAttr(bind)}" value="${escapeAttr(option.value)}" data-app-bind="${escapeAttr(bind)}" data-app-control="radio"${url}${checked} /> <span>${escapeHtml(option.label)}</span></label>`;
    })
    .join('');

  return `<fieldset class="imd-field imd-radio-group" data-app-field-wrap="${escapeAttr(bind)}">${label}<div class="imd-radio-options">${radios}</div><div class="imd-field-error" data-app-invalid-message="${escapeAttr(bind)}"></div></fieldset>`;
}

function renderButton(attrs: Record<string, string>) {
  const label = attrs.label ?? attrs.text ?? 'Run';
  const actionAttrs = Object.entries(attrs)
    .filter(([key]) => ['set', 'patch', 'toggle', 'reset', 'refresh', 'copy', 'confirm'].includes(key))
    .map(([key, value]) => ` data-app-${key}="${escapeAttr(value)}"`)
    .join('');
  return `<div class="imd-button-row"><button type="button" class="button button-ghost imd-action-button"${actionAttrs}>${escapeHtml(label)}</button></div>`;
}

function renderJsonList(attrs: Record<string, string>, scope: Scope) {
  const source = attrs.source;
  if (!source) return '<div class="imd-error">Invalid json-list directive.</div>';
  const field = attrs.field;
  const value = safeEvaluate(source, scope);
  const items = Array.isArray(value) ? value : [];
  const markup = items
    .map((item) => {
      const label = field && item && typeof item === 'object' ? getByPath(item, field) : item;
      return `<li>${escapeHtml(formatValue(label))}</li>`;
    })
    .join('');
  return `<ul class="imd-json-list" data-app-json-list="${escapeAttr(source)}"${field ? ` data-app-field="${escapeAttr(field)}"` : ''}>${markup}</ul>`;
}

function renderFieldAttrs(attrs: Record<string, string>, bind: string) {
  const parts = [`data-app-bind="${escapeAttr(bind)}"`];

  for (const key of ['required', 'min', 'max', 'match', 'step']) {
    if (attrs[key]) parts.push(`data-app-${key}="${escapeAttr(attrs[key]!)}"`);
  }

  if (attrs.url === 'true') parts.push('data-app-url="true"');
  return parts.join(' ');
}

function resolveOptions(source: string, scope: Scope) {
  if (source.includes(',')) {
    return source.split(',').map((item) => {
      const value = item.trim();
      return { label: value, value };
    });
  }

  const evaluated = safeEvaluate(source, scope);
  if (Array.isArray(evaluated)) {
    return evaluated.map((item) => {
      if (typeof item === 'string') return { label: item, value: item };
      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;
        const value = String(record.value ?? record.label ?? '');
        return {
          label: String(record.label ?? record.value ?? value),
          value,
        };
      }
      return { label: formatValue(item), value: formatValue(item) };
    });
  }

  return [{ label: source, value: source }];
}

function safeEvaluate(expression: string, scope: Scope) {
  try {
    return evaluateExpression(expression, scope);
  } catch {
    return undefined;
  }
}

function validateBody(nodes: AppNode[], frontmatter: AppFrontmatter, definitions: Record<string, AppNode[]>) {
  const issues: { message: string; line?: number }[] = [];

  const validateBind = (node: AppNode & { attrs: Record<string, string> }) => {
    const bind = node.attrs.bind;
    if (!bind) {
      issues.push({ message: `@#${node.type} requires a bind attribute.`, line: node.line });
      return;
    }

    const topLevel = bind.split('.')[0]!;
    if (!(topLevel in frontmatter.state)) {
      issues.push({ message: `Unknown state binding "${bind}" in @#${node.type}.`, line: node.line });
    }
  };

  const walk = (entries: AppNode[]) => {
    for (const node of entries) {
      if (
        node.type === 'select' ||
        node.type === 'input' ||
        node.type === 'textarea' ||
        node.type === 'checkbox' ||
        node.type === 'radio' ||
        node.type === 'range' ||
        node.type === 'toggle'
      ) {
        validateBind(node);
      }

      if ((node.type === 'select' || node.type === 'radio') && !node.attrs.options) {
        issues.push({ message: `@#${node.type} requires an options attribute.`, line: node.line });
      }

      if (node.type === 'json-list' && !node.attrs.source) {
        issues.push({ message: '@#json-list requires a source attribute.', line: node.line });
      }

      if (node.type === 'accordion' && !node.attrs.title) {
        issues.push({ message: '@#accordion requires a title attribute.', line: node.line });
      }

      if (node.type === 'define' && !node.attrs.name) {
        issues.push({ message: '@#define requires name="macro-name".', line: node.line });
      }

      if (node.type === 'use' && !definitions[node.name]) {
        issues.push({ message: `Unknown macro "${node.name}" in @#use.`, line: node.line });
      }

      if (node.type === 'button') {
        const actions = ['set', 'patch', 'toggle', 'reset', 'refresh', 'copy'].filter((key) => node.attrs[key]);
        if (actions.length === 0) {
          issues.push({ message: '@#button requires one action: set, patch, toggle, reset, refresh, or copy.', line: node.line });
        }
      }

      if (node.type === 'if') {
        for (const branch of node.branches) walk(branch.children);
        walk(node.elseChildren);
      }

      if (node.type === 'for' || node.type === 'callout' || node.type === 'accordion' || node.type === 'empty') {
        walk(node.children);
      }
    }
  };

  walk(nodes);

  if (issues.length) {
    const error = new Error(issues.map((issue) => issue.message).join('\n')) as Error & { issues: { message: string; line?: number }[] };
    error.issues = issues;
    throw error;
  }
}

function parseScopeAssignments(source: string | undefined, scope: Scope) {
  if (!source) return {};
  return Object.fromEntries(
    source
      .split(',')
      .map((pair) => pair.trim())
      .filter(Boolean)
      .map((pair) => {
        const [key, ...rest] = pair.split('=');
        return [key.trim(), safeEvaluate(rest.join('=').trim(), scope)];
      }),
  );
}

function computeValidationMap(state: Record<string, unknown>, fields: FieldConfig[]) {
  const map: Record<string, { invalid: boolean; message: string }> = {};

  for (const field of fields) {
    const value = getByPath(state, field.bind);
    let invalid = false;
    let message = '';

    if (field.required && !isRequiredSatisfied(value)) {
      invalid = true;
      message = 'Required';
    } else if (field.min != null && compareNumeric(value) < field.min) {
      invalid = true;
      message = `Min ${field.min}`;
    } else if (field.max != null && compareNumeric(value) > field.max) {
      invalid = true;
      message = `Max ${field.max}`;
    } else if (field.match && !new RegExp(field.match).test(formatValue(value))) {
      invalid = true;
      message = 'Invalid format';
    }

    map[field.bind] = { invalid, message };
  }

  return map;
}

function isRequiredSatisfied(value: unknown) {
  if (typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.length > 0;
  return formatValue(value).trim().length > 0;
}

function compareNumeric(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseNumberAttr(value: string | undefined) {
  if (value == null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeAttr(value: string) {
  return escapeHtml(value).replaceAll("'", '&#39;');
}
