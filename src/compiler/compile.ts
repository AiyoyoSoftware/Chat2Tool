import { marked } from 'marked';
import { evaluateExpression, formatValue, isTruthy } from './expression';
import { parseSource, type AppNode } from './parser';
import {
  getManifestPath,
  type LayoutName,
} from '../lib/config';
import {
  ensureStorageLayout,
  hasManifest,
  listSourceFiles,
  readCompiledPage,
  readManifest,
  readSourceFile,
  readLocalData,
  writeCompiledPage,
  writeManifest,
} from '../lib/storage';
import type {
  AppFrontmatter,
  CompileAllResult,
  CompiledPage,
  DataDescriptor,
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
}

export async function compileSource(source: string, sourcePath?: string): Promise<CompiledPage> {
  const { frontmatter, body } = parseSource(source);
  validateBody(body, frontmatter);
  const resolvedData = await resolveData(frontmatter.data);
  const runtime = {
    state: structuredClone(frontmatter.state),
    data: resolvedData.descriptors,
    computed: frontmatter.computed,
  };
  const scope = buildScope(runtime.state, resolvedData.values, frontmatter.computed);
  const html = renderNodes(body, scope, 'live');

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

  for (const [key, value] of Object.entries(entries)) {
    if (typeof value === 'string' && /^https?:\/\//.test(value)) {
      descriptors[key] = {
        kind: 'remote',
        url: value,
        initialValue: [],
      };
      values[key] = [];
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
      continue;
    }

    descriptors[key] = {
      kind: 'inline',
      value,
    };
    values[key] = value;
  }

  return { descriptors, values };
}

function buildScope(
  state: Record<string, unknown>,
  data: Record<string, unknown>,
  computedEntries: Record<string, string>,
  localScope: Scope = {},
) {
  const computed: Record<string, unknown> = {};
  for (const [key, expression] of Object.entries(computedEntries)) {
    computed[key] = evaluateExpression(expression, {
      ...data,
      ...state,
      ...computed,
      ...localScope,
    });
  }

  return {
    ...data,
    ...state,
    ...computed,
    ...localScope,
  };
}

function renderNodes(nodes: AppNode[], scope: Scope, mode: 'live' | 'template'): string {
  return nodes.map((node) => renderNode(node, scope, mode)).join('\n');
}

function renderNode(node: AppNode, scope: Scope, mode: 'live' | 'template'): string {
  if (node.type === 'markdown') {
    return renderMarkdown(node.content, scope, mode);
  }

  if (node.type === 'if') {
    const visible = isTruthy(safeEvaluate(node.expression, scope));
    return `<div class="imd-if" data-app-if="${escapeAttr(node.expression)}"${visible ? '' : ' hidden'}>${renderNodes(node.children, scope, mode)}</div>`;
  }

  if (node.type === 'for') {
    const items = safeEvaluate(node.expression, scope);
    const rendered = Array.isArray(items)
      ? items
          .map((item) =>
            renderNodes(node.children, { ...scope, [node.alias]: item }, 'live'),
          )
          .join('')
      : '';
    const template = renderNodes(node.children, scope, 'template');
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

  if (node.type === 'json-list') {
    return renderJsonList(node.attrs, scope);
  }

  if (node.type === 'callout') {
    const type = escapeAttr(node.attrs.type ?? 'info');
    const title = node.attrs.title ? `<div class="imd-callout-title">${escapeHtml(node.attrs.title)}</div>` : '';
    return `<aside class="imd-callout imd-callout-${type}">${title}<div class="imd-callout-body">${renderNodes(node.children, scope, mode)}</div></aside>`;
  }

  if (node.type === 'accordion') {
    const title = node.attrs.title ?? 'Details';
    return `<details class="imd-accordion"><summary>${escapeHtml(title)}</summary><div class="imd-accordion-body">${renderNodes(node.children, scope, mode)}</div></details>`;
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
  if (!bind || !optionsAttr) {
    return '<div class="imd-error">Invalid select directive.</div>';
  }

  const options = resolveSelectOptions(optionsAttr, scope);
  const label = attrs.label
    ? `<label class="imd-field-label" for="field-${escapeAttr(bind)}">${escapeHtml(attrs.label)}</label>`
    : '';
  const currentValue = mode === 'live' ? scope[bind] : undefined;
  const optionMarkup = options
    .map((option) => {
      const selected = currentValue === option.value ? ' selected' : '';
      return `<option value="${escapeAttr(option.value)}"${selected}>${escapeHtml(option.label)}</option>`;
    })
    .join('');

  return [
    '<div class="imd-field">',
    label,
    `<select id="field-${escapeAttr(bind)}" data-app-bind="${escapeAttr(bind)}" data-app-options="${escapeAttr(optionsAttr)}">`,
    optionMarkup,
    '</select>',
    '</div>',
  ].join('');
}

function renderJsonList(attrs: Record<string, string>, scope: Scope) {
  const source = attrs.source;
  if (!source) return '<div class="imd-error">Invalid json-list directive.</div>';
  const field = attrs.field;
  const value = safeEvaluate(source, scope);
  const items = Array.isArray(value) ? value : [];
  const markup = items
    .map((item) => {
      const label = field && item && typeof item === 'object' ? (item as Record<string, unknown>)[field] : item;
      return `<li>${escapeHtml(formatValue(label))}</li>`;
    })
    .join('');
  return `<ul class="imd-json-list" data-app-json-list="${escapeAttr(source)}"${field ? ` data-app-field="${escapeAttr(field)}"` : ''}>${markup}</ul>`;
}

function resolveSelectOptions(source: string, scope: Scope) {
  if (source.includes(',')) {
    return source.split(',').map((item) => {
      const value = item.trim();
      return { label: value, value };
    });
  }

  try {
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
  } catch {
    return [{ label: source, value: source }];
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

function validateBody(nodes: AppNode[], frontmatter: AppFrontmatter) {
  const issues: { message: string; line?: number }[] = [];
  const walk = (entries: AppNode[]) => {
    for (const node of entries) {
      if (node.type === 'select') {
        if (!node.attrs.bind) {
          issues.push({ message: '@#select requires a bind attribute.', line: node.line });
        } else if (!(node.attrs.bind in frontmatter.state)) {
          issues.push({
            message: `Unknown state binding "${node.attrs.bind}" in @#select.`,
            line: node.line,
          });
        }

        if (!node.attrs.options) {
          issues.push({ message: '@#select requires an options attribute.', line: node.line });
        }
      }

      if (node.type === 'json-list' && !node.attrs.source) {
        issues.push({ message: '@#json-list requires a source attribute.', line: node.line });
      }

      if (node.type === 'accordion' && !node.attrs.title) {
        issues.push({ message: '@#accordion requires a title attribute.', line: node.line });
      }

      if (node.type === 'callout' || node.type === 'accordion' || node.type === 'if' || node.type === 'for') {
        walk(node.children);
      }
    }
  };

  walk(nodes);

  if (issues.length) {
    const error = new Error(issues.map((issue) => issue.message).join('\n')) as Error & {
      issues: { message: string; line?: number }[];
    };
    error.issues = issues;
    throw error;
  }
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
