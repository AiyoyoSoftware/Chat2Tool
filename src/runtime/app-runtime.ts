import { evaluateExpression, formatValue, isTruthy } from '../compiler/expression';
import type { DataDescriptor, RuntimeConfig, Scope } from '../lib/types';

interface RuntimeState {
  state: Record<string, unknown>;
  data: Record<string, unknown>;
  descriptors: Record<string, DataDescriptor>;
  computed: Record<string, string>;
}

export async function initInteractivePage(root: ParentNode, runtime: RuntimeConfig) {
  const current: RuntimeState = {
    state: structuredClone(runtime.state),
    data: hydrateData(runtime.data),
    descriptors: runtime.data,
    computed: runtime.computed,
  };

  const rerender = () => {
    renderTree(root, buildScope(current));
  };

  bindInputs(root, current, rerender);
  await loadRemoteData(current);
  rerender();
}

function bindInputs(root: ParentNode, runtime: RuntimeState, rerender: () => void) {
  for (const element of root.querySelectorAll<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>(
    '[data-app-bind]',
  )) {
    const bind = element.dataset.appBind;
    if (!bind) continue;

    const update = () => {
      runtime.state[bind] = element.value;
      rerender();
    };

    element.addEventListener('input', update);
    element.addEventListener('change', update);
  }
}

function renderTree(root: ParentNode, scope: Scope) {
  renderSelectOptions(root, scope);
  renderTextBindings(root, scope);
  renderIfBlocks(root, scope);
  renderJsonLists(root, scope);
  renderLoops(root, scope);
}

function renderTextBindings(root: ParentNode, scope: Scope) {
  for (const element of root.querySelectorAll<HTMLElement>('[data-app-text]')) {
    const expression = element.dataset.appText;
    if (!expression) continue;
    element.textContent = formatValue(safeEvaluate(expression, scope));
  }
}

function renderIfBlocks(root: ParentNode, scope: Scope) {
  for (const element of root.querySelectorAll<HTMLElement>('[data-app-if]')) {
    const expression = element.dataset.appIf;
    if (!expression) continue;
    element.hidden = !isTruthy(safeEvaluate(expression, scope));
  }
}

function renderJsonLists(root: ParentNode, scope: Scope) {
  for (const element of root.querySelectorAll<HTMLElement>('[data-app-json-list]')) {
    const expression = element.dataset.appJsonList;
    if (!expression) continue;
    const items = safeEvaluate(expression, scope);
    const field = element.dataset.appField;
    if (!Array.isArray(items)) {
      element.innerHTML = '';
      continue;
    }
    element.innerHTML = items
      .map((item) => {
        const value =
          field && item && typeof item === 'object' ? (item as Record<string, unknown>)[field] : item;
        return `<li>${escapeHtml(formatValue(value))}</li>`;
      })
      .join('');
  }
}

function renderLoops(root: ParentNode, scope: Scope) {
  for (const loop of root.querySelectorAll<HTMLElement>('[data-app-for]')) {
    const alias = loop.dataset.appForAlias;
    const expression = loop.dataset.appFor;
    const target = loop.querySelector<HTMLElement>('[data-app-for-target]');
    const template = loop.querySelector<HTMLTemplateElement>('template');

    if (!alias || !expression || !target || !template) continue;

    const items = safeEvaluate(expression, scope);
    target.innerHTML = '';

    if (!Array.isArray(items)) continue;

    for (const item of items) {
      const fragment = template.content.cloneNode(true) as DocumentFragment;
      const childScope = {
        ...scope,
        [alias]: item,
      };
      renderTree(fragment, childScope);
      target.append(fragment);
    }
  }
}

function renderSelectOptions(root: ParentNode, scope: Scope) {
  for (const element of root.querySelectorAll<HTMLSelectElement>('[data-app-bind]')) {
    const bind = element.dataset.appBind;
    const optionsSource = element.dataset.appOptions;
    if (!bind || !optionsSource) continue;

    const options = resolveOptions(optionsSource, scope);
    const currentValue = scope[bind];
    element.innerHTML = options
      .map((option) => {
        const selected = currentValue === option.value ? ' selected' : '';
        return `<option value="${escapeAttr(option.value)}"${selected}>${escapeHtml(option.label)}</option>`;
      })
      .join('');

    const value = typeof currentValue === 'string' ? currentValue : undefined;
    if (value) element.value = value;
  }
}

async function loadRemoteData(runtime: RuntimeState) {
  const tasks: Promise<void>[] = [];

  for (const [key, descriptor] of Object.entries(runtime.descriptors)) {
    if (descriptor.kind !== 'remote') continue;

    tasks.push(
      (async () => {
        try {
          const response = await fetch(descriptor.url);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          runtime.data[key] = await response.json();
        } catch {
          runtime.data[key] = Array.isArray(descriptor.initialValue) ? descriptor.initialValue : null;
        }
      })(),
    );
  }

  await Promise.all(tasks);
}

function hydrateData(descriptors: Record<string, DataDescriptor>) {
  return Object.fromEntries(
    Object.entries(descriptors).map(([key, descriptor]) => {
      if (descriptor.kind === 'remote') return [key, descriptor.initialValue];
      if (descriptor.kind === 'local') return [key, descriptor.value];
      return [key, descriptor.value];
    }),
  );
}

function buildScope(runtime: RuntimeState) {
  const computed: Record<string, unknown> = {};
  for (const [key, expression] of Object.entries(runtime.computed)) {
    computed[key] = safeEvaluate(expression, {
      ...runtime.data,
      ...runtime.state,
      ...computed,
    });
  }

  return {
    ...runtime.data,
    ...runtime.state,
    ...computed,
  };
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
