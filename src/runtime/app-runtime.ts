import { evaluateExpression, formatValue, isTruthy } from '../compiler/expression';
import { getByPath, setByPath } from '../lib/object-path';
import type { DataDescriptor, DataStatus, FieldConfig, RuntimeConfig, Scope } from '../lib/types';

interface RuntimeState {
  slug: string;
  state: Record<string, unknown>;
  initialState: Record<string, unknown>;
  data: Record<string, unknown>;
  descriptors: Record<string, DataDescriptor>;
  dataStatus: Record<string, DataStatus>;
  computed: Record<string, string>;
  fields: FieldConfig[];
  persist: string[];
}

export async function initInteractivePage(root: ParentNode, runtime: RuntimeConfig) {
  const current: RuntimeState = {
    slug: runtime.slug,
    state: structuredClone(runtime.state),
    initialState: structuredClone(runtime.state),
    data: hydrateData(runtime.data),
    descriptors: runtime.data,
    dataStatus: hydrateStatuses(runtime.data),
    computed: runtime.computed,
    fields: runtime.fields,
    persist: runtime.persist,
  };

  restoreStateFromStorage(current);
  restoreStateFromUrl(current);

  const rerender = () => {
    const scope = buildScope(current);
    renderTree(root, scope, current);
    persistState(current);
    syncUrl(current);
  };

  bindInputs(root, current, rerender);
  bindButtons(root, current, rerender);
  rerender();
  await refreshAllRemoteData(current, rerender);
}

function bindInputs(root: ParentNode, runtime: RuntimeState, rerender: () => void) {
  for (const element of root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-app-bind]')) {
    const bind = element.dataset.appBind;
    if (!bind) continue;

    const update = () => {
      setByPath(runtime.state, bind, readElementValue(element));
      rerender();
    };

    element.addEventListener('input', update);
    element.addEventListener('change', update);
  }
}

function bindButtons(root: ParentNode, runtime: RuntimeState, rerender: () => void) {
  for (const button of root.querySelectorAll<HTMLButtonElement>('.imd-action-button, .imd-toggle-button')) {
    if (button.dataset.appBound === 'true') continue;
    button.dataset.appBound = 'true';

    button.addEventListener('click', async () => {
      const confirmMessage = button.dataset.appConfirm;
      if (confirmMessage && !window.confirm(confirmMessage)) return;

      if (button.dataset.appControl === 'toggle') {
        const bind = button.dataset.appBind;
        if (bind) {
          setByPath(runtime.state, bind, !Boolean(getByPath(runtime.state, bind)));
          rerender();
        }
        return;
      }

      await runButtonAction(button, runtime, rerender);
    });
  }
}

function renderTree(root: ParentNode, scope: Scope, runtime: RuntimeState) {
  renderFieldStates(root, scope, runtime);
  renderTextBindings(root, scope);
  renderConditions(root, scope);
  renderEmptyBlocks(root, scope);
  renderJsonLists(root, scope);
  renderLoops(root, scope, runtime);
}

function renderFieldStates(root: ParentNode, scope: Scope, runtime: RuntimeState) {
  const validation = computeValidationMap(runtime.state, runtime.fields);

  for (const element of root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-app-bind]')) {
    const bind = element.dataset.appBind;
    if (!bind) continue;

    if (element instanceof HTMLInputElement && element.type === 'checkbox') {
      element.checked = Boolean(getByPath(runtime.state, bind));
    } else if (element instanceof HTMLInputElement && element.type === 'radio') {
      element.checked = getByPath(runtime.state, bind) === element.value;
    } else if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
      const nextValue = getByPath(runtime.state, bind);
      element.value = formatValue(nextValue);
    }

    if (element instanceof HTMLSelectElement && element.dataset.appOptions) {
      const options = resolveOptions(element.dataset.appOptions, scope);
      element.innerHTML = options
        .map((option) => {
          const selected = getByPath(runtime.state, bind) === option.value ? ' selected' : '';
          return `<option value="${escapeAttr(option.value)}"${selected}>${escapeHtml(option.label)}</option>`;
        })
        .join('');
    }
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('.imd-toggle-button[data-app-bind]')) {
    const bind = button.dataset.appBind!;
    const checked = Boolean(getByPath(runtime.state, bind));
    button.dataset.appChecked = checked ? 'true' : 'false';
    const pill = button.querySelector<HTMLElement>('.imd-toggle-pill');
    if (pill) pill.textContent = checked ? 'On' : 'Off';
  }

  for (const message of root.querySelectorAll<HTMLElement>('[data-app-invalid-message]')) {
    const bind = message.dataset.appInvalidMessage!;
    const state = validation[bind];
    message.textContent = state?.invalid ? state.message : '';
  }

  for (const wrap of root.querySelectorAll<HTMLElement>('[data-app-field-wrap]')) {
    const bind = wrap.dataset.appFieldWrap!;
    const state = validation[bind];
    wrap.classList.toggle('is-invalid', Boolean(state?.invalid));
  }
}

function renderTextBindings(root: ParentNode, scope: Scope) {
  for (const element of root.querySelectorAll<HTMLElement>('[data-app-text]')) {
    const expression = element.dataset.appText;
    if (!expression) continue;
    element.textContent = formatValue(safeEvaluate(expression, scope));
  }
}

function renderConditions(root: ParentNode, scope: Scope) {
  for (const condition of root.querySelectorAll<HTMLElement>('[data-app-condition]')) {
    const branches = Array.from(condition.querySelectorAll<HTMLElement>(':scope > [data-app-condition-branch]'));
    const elseBranch = condition.querySelector<HTMLElement>(':scope > [data-app-condition-else]');
    let matched = false;

    for (const branch of branches) {
      const expression = branch.dataset.appConditionExpr;
      const visible = !matched && expression ? isTruthy(safeEvaluate(expression, scope)) : false;
      branch.hidden = !visible;
      if (visible) matched = true;
    }

    if (elseBranch) {
      elseBranch.hidden = matched;
    }
  }
}

function renderEmptyBlocks(root: ParentNode, scope: Scope) {
  for (const element of root.querySelectorAll<HTMLElement>('[data-app-empty]')) {
    const expression = element.dataset.appEmpty;
    if (!expression) continue;
    element.hidden = isTruthy(safeEvaluate(expression, scope));
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
        const value = field ? getByPath(item, field) : item;
        return `<li>${escapeHtml(formatValue(value))}</li>`;
      })
      .join('');
  }
}

function renderLoops(root: ParentNode, scope: Scope, runtime: RuntimeState) {
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
      renderTree(fragment, { ...scope, [alias]: item }, runtime);
      bindInputs(fragment, runtime, () => {
        const nextScope = buildScope(runtime);
        renderTree(root, nextScope, runtime);
        persistState(runtime);
        syncUrl(runtime);
      });
      bindButtons(fragment, runtime, () => {
        const nextScope = buildScope(runtime);
        renderTree(root, nextScope, runtime);
        persistState(runtime);
        syncUrl(runtime);
      });
      target.append(fragment);
    }
  }
}

async function runButtonAction(button: HTMLButtonElement, runtime: RuntimeState, rerender: () => void) {
  const scope = buildScope(runtime);

  if (button.dataset.appSet) {
    const assignment = parseAssignment(button.dataset.appSet, scope);
    if (assignment) setByPath(runtime.state, assignment.path, assignment.value);
  }

  if (button.dataset.appPatch) {
    const patch = parsePatch(button.dataset.appPatch, scope);
    if (patch) applyPatch(runtime.state, patch.path, patch.value);
  }

  if (button.dataset.appToggle) {
    const path = button.dataset.appToggle;
    if (path) setByPath(runtime.state, path, !Boolean(getByPath(runtime.state, path)));
  }

  if (button.dataset.appReset) {
    const keys = button.dataset.appReset === '*' ? Object.keys(runtime.initialState) : button.dataset.appReset?.split(',').map((part) => part.trim()).filter(Boolean) ?? [];
    for (const key of keys) {
      setByPath(runtime.state, key, structuredClone(getByPath(runtime.initialState, key)));
    }
  }

  if (button.dataset.appCopy) {
    const value = safeEvaluate(button.dataset.appCopy, scope);
    await navigator.clipboard.writeText(formatValue(value));
  }

  if (button.dataset.appRefresh) {
    await refreshRemoteData(runtime, button.dataset.appRefresh, rerender);
  }

  rerender();
}

async function refreshAllRemoteData(runtime: RuntimeState, rerender: () => void) {
  const keys = Object.keys(runtime.descriptors).filter((key) => runtime.descriptors[key]?.kind === 'remote');
  await Promise.all(keys.map((key) => refreshRemoteData(runtime, key, rerender)));
}

async function refreshRemoteData(runtime: RuntimeState, key: string, rerender: () => void) {
  const descriptor = runtime.descriptors[key];
  if (!descriptor || descriptor.kind !== 'remote') return;

  runtime.dataStatus[key] = { loading: true, loaded: false, error: null };
  rerender();

  try {
    const response = await fetch(descriptor.url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    runtime.data[key] = await response.json();
    runtime.dataStatus[key] = { loading: false, loaded: true, error: null };
  } catch (error) {
    runtime.data[key] = Array.isArray(descriptor.initialValue) ? descriptor.initialValue : null;
    runtime.dataStatus[key] = {
      loading: false,
      loaded: false,
      error: error instanceof Error ? error.message : 'Fetch failed',
    };
  }

  rerender();
}

function hydrateData(descriptors: Record<string, DataDescriptor>) {
  return Object.fromEntries(
    Object.entries(descriptors).map(([key, descriptor]) => {
      if (descriptor.kind === 'remote') return [key, descriptor.initialValue];
      return [key, descriptor.value];
    }),
  );
}

function hydrateStatuses(descriptors: Record<string, DataDescriptor>) {
  return Object.fromEntries(
    Object.entries(descriptors).map(([key, descriptor]) => [
      key,
      descriptor.kind === 'remote'
        ? { loading: true, loaded: false, error: null }
        : { loading: false, loaded: true, error: null },
    ]),
  ) as Record<string, DataStatus>;
}

function buildScope(runtime: RuntimeState) {
  const helpers = createScopeHelpers(runtime.state, runtime.fields, runtime.dataStatus);
  const computed: Record<string, unknown> = {};

  for (const [key, expression] of Object.entries(runtime.computed)) {
    computed[key] = safeEvaluate(expression, {
      ...helpers,
      ...runtime.data,
      ...runtime.state,
      ...computed,
    });
  }

  return {
    ...helpers,
    ...runtime.data,
    ...runtime.state,
    ...computed,
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

function readElementValue(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  if (element instanceof HTMLInputElement && element.type === 'checkbox') {
    return element.checked;
  }

  if (element instanceof HTMLInputElement && element.type === 'radio') {
    return element.value;
  }

  if (element instanceof HTMLInputElement && (element.type === 'number' || element.type === 'range')) {
    const parsed = Number(element.value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return element.value;
}

function parseAssignment(source: string | undefined, scope: Scope) {
  if (!source) return null;
  const match = source.match(/^([A-Za-z_][A-Za-z0-9_.]*)\s*=\s*(.+)$/);
  if (!match) return null;
  return {
    path: match[1]!,
    value: parseActionValue(match[2]!, scope),
  };
}

function parsePatch(source: string | undefined, scope: Scope) {
  if (!source) return null;
  const match = source.match(/^([A-Za-z_][A-Za-z0-9_.]*)\s*\+=\s*(.+)$/);
  if (!match) return null;
  return {
    path: match[1]!,
    value: parseActionValue(match[2]!, scope),
  };
}

function parseActionValue(source: string, scope: Scope) {
  const trimmed = source.trim();
  const evaluated = safeEvaluate(trimmed, scope);
  if (evaluated !== undefined) return evaluated;
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (!Number.isNaN(Number(trimmed))) return Number(trimmed);
  return trimmed;
}

function applyPatch(state: Record<string, unknown>, path: string, value: unknown) {
  const current = getByPath(state, path);
  if (Array.isArray(current)) {
    setByPath(state, path, [...current, value]);
    return;
  }
  if (typeof current === 'number' && typeof value === 'number') {
    setByPath(state, path, current + value);
    return;
  }
  if (typeof current === 'string') {
    setByPath(state, path, current + formatValue(value));
    return;
  }
  if (current == null) {
    setByPath(state, path, Array.isArray(value) ? value : [value]);
    return;
  }
  setByPath(state, path, value);
}

function restoreStateFromStorage(runtime: RuntimeState) {
  if (!runtime.persist.length) return;
  try {
    const raw = window.localStorage.getItem(storageKey(runtime.slug));
    if (!raw) return;
    const persisted = JSON.parse(raw) as Record<string, unknown>;
    for (const key of runtime.persist) {
      if (key in persisted) {
        setByPath(runtime.state, key, persisted[key]);
      }
    }
  } catch {
    // Ignore storage failures.
  }
}

function persistState(runtime: RuntimeState) {
  if (!runtime.persist.length) return;
  try {
    const snapshot = Object.fromEntries(runtime.persist.map((key) => [key, getByPath(runtime.state, key)]));
    window.localStorage.setItem(storageKey(runtime.slug), JSON.stringify(snapshot));
  } catch {
    // Ignore storage failures.
  }
}

function restoreStateFromUrl(runtime: RuntimeState) {
  const params = new URLSearchParams(window.location.search);
  for (const field of runtime.fields.filter((entry) => entry.url)) {
    const raw = params.get(field.bind);
    if (raw == null) continue;
    setByPath(runtime.state, field.bind, coerceValue(raw, field));
  }
}

function syncUrl(runtime: RuntimeState) {
  const urlFields = runtime.fields.filter((field) => field.url);
  if (!urlFields.length) return;
  const url = new URL(window.location.href);

  for (const field of urlFields) {
    const value = getByPath(runtime.state, field.bind);
    const text = formatValue(value);
    if (!text) {
      url.searchParams.delete(field.bind);
    } else {
      url.searchParams.set(field.bind, text);
    }
  }

  window.history.replaceState({}, '', url);
}

function coerceValue(raw: string, field: FieldConfig) {
  if (field.control === 'checkbox' || field.control === 'toggle') return raw === 'true';
  if (field.control === 'range' || field.type === 'number') return compareNumeric(raw);
  return raw;
}

function storageKey(slug: string) {
  return `llastro:${slug}:state`;
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
