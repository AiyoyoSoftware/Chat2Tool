import { getByPath } from '../lib/object-path';
import type { Scope } from '../lib/types';

type TokenType =
  | 'identifier'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'paren_open'
  | 'paren_close'
  | 'brace_open'
  | 'brace_close'
  | 'bracket_open'
  | 'bracket_close'
  | 'comma'
  | 'colon'
  | 'dot'
  | 'plus'
  | 'pipe'
  | 'eq'
  | 'neq'
  | 'and'
  | 'or'
  | 'not'
  | 'eof';

interface Token {
  type: TokenType;
  value?: string;
}

type ExprNode =
  | { type: 'identifier'; name: string }
  | { type: 'literal'; value: unknown }
  | { type: 'array'; items: ExprNode[] }
  | { type: 'object'; entries: { key: string; value: ExprNode }[] }
  | { type: 'member'; object: ExprNode; property: ExprNode; computed: boolean }
  | { type: 'call'; callee: ExprNode; args: ExprNode[] }
  | { type: 'binary'; operator: '==' | '!=' | '+' | 'and' | 'or'; left: ExprNode; right: ExprNode }
  | { type: 'unary'; operator: 'not'; argument: ExprNode }
  | { type: 'pipe'; input: ExprNode; name: string; args: ExprNode[] };

const PIPE_HELPERS: Record<string, (value: unknown, ...args: unknown[]) => unknown> = {
  where(value, field, expected) {
    if (!Array.isArray(value)) return [];
    return value.filter((entry) => getByPath(entry, String(field)) === expected);
  },
  length(value) {
    if (Array.isArray(value) || typeof value === 'string') return value.length;
    if (value && typeof value === 'object') return Object.keys(value as Record<string, unknown>).length;
    return 0;
  },
  join(value, separator = ', ') {
    if (!Array.isArray(value)) return '';
    return value.map((item) => formatValue(item)).join(String(separator));
  },
  first(value) {
    if (!Array.isArray(value)) return null;
    return value[0] ?? null;
  },
  default(value, fallback) {
    return isTruthy(value) ? value : fallback;
  },
  sort(value, field, direction = 'asc') {
    if (!Array.isArray(value)) return [];
    const dir = String(direction).toLowerCase() === 'desc' ? -1 : 1;
    const fieldName = field == null ? null : String(field);
    return [...value].sort((left, right) => compareValues(readComparable(left, fieldName), readComparable(right, fieldName)) * dir);
  },
  map(value, field) {
    if (!Array.isArray(value)) return [];
    return value.map((entry) => getByPath(entry, String(field)));
  },
  pluck(value, field) {
    if (!Array.isArray(value)) return [];
    return value.map((entry) => getByPath(entry, String(field)));
  },
  groupBy(value, field) {
    if (!Array.isArray(value)) return {};
    return value.reduce<Record<string, unknown[]>>((groups, entry) => {
      const key = formatValue(getByPath(entry, String(field))) || 'undefined';
      groups[key] ??= [];
      groups[key].push(entry);
      return groups;
    }, {});
  },
  contains(value, expected) {
    if (Array.isArray(value)) return value.some((entry) => entry === expected);
    if (typeof value === 'string') return value.includes(String(expected));
    return false;
  },
  sum(value, field) {
    if (!Array.isArray(value)) return 0;
    return value.reduce((total, entry) => total + toNumber(field == null ? entry : getByPath(entry, String(field))), 0);
  },
  min(value, field) {
    if (!Array.isArray(value) || value.length === 0) return null;
    return value.reduce((lowest, entry) => {
      const candidate = field == null ? entry : getByPath(entry, String(field));
      return lowest == null || compareValues(candidate, lowest) < 0 ? candidate : lowest;
    }, null as unknown);
  },
  max(value, field) {
    if (!Array.isArray(value) || value.length === 0) return null;
    return value.reduce((highest, entry) => {
      const candidate = field == null ? entry : getByPath(entry, String(field));
      return highest == null || compareValues(candidate, highest) > 0 ? candidate : highest;
    }, null as unknown);
  },
  slice(value, start, end) {
    if (!Array.isArray(value) && typeof value !== 'string') return [];
    return value.slice(toNumber(start), end == null ? undefined : toNumber(end));
  },
};

export function normalizeExpression(expression: string) {
  return expression.replace(/\b(loading|error):([A-Za-z_][A-Za-z0-9_]*)\b/g, '$1("$2")');
}

export function evaluateExpression(expression: string, scope: Scope) {
  const parser = new Parser(tokenize(normalizeExpression(expression)));
  const tree = parser.parseExpression();
  parser.expect('eof');
  return evaluateNode(tree, scope);
}

export function isTruthy(value: unknown) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0;
  return Boolean(value);
}

export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map((item) => formatValue(item)).join(', ');
  return JSON.stringify(value);
}

function evaluateNode(node: ExprNode, scope: Scope): unknown {
  switch (node.type) {
    case 'identifier':
      return scope[node.name];
    case 'literal':
      return node.value;
    case 'array':
      return node.items.map((item) => evaluateNode(item, scope));
    case 'object':
      return Object.fromEntries(node.entries.map((entry) => [entry.key, evaluateNode(entry.value, scope)]));
    case 'member': {
      const object = evaluateNode(node.object, scope);
      const property = node.computed
        ? evaluateNode(node.property, scope)
        : (node.property as Extract<ExprNode, { type: 'identifier' }>).name;
      if (object == null) return undefined;
      return (object as Record<string | number, unknown>)[property as string | number];
    }
    case 'call': {
      const callee = evaluateNode(node.callee, scope);
      if (typeof callee !== 'function') return undefined;
      return callee(...node.args.map((arg) => evaluateNode(arg, scope)));
    }
    case 'binary': {
      const left = evaluateNode(node.left, scope);
      const right = evaluateNode(node.right, scope);
      if (node.operator === '==') return left === right;
      if (node.operator === '!=') return left !== right;
      if (node.operator === '+') return `${formatValue(left)}${formatValue(right)}`;
      if (node.operator === 'and') return isTruthy(left) && isTruthy(right);
      return isTruthy(left) || isTruthy(right);
    }
    case 'unary':
      return !isTruthy(evaluateNode(node.argument, scope));
    case 'pipe': {
      const input = evaluateNode(node.input, scope);
      const helper = PIPE_HELPERS[node.name];
      if (!helper) return undefined;
      return helper(input, ...node.args.map((arg) => evaluateNode(arg, scope)));
    }
  }
}

class Parser {
  constructor(private readonly tokens: Token[], private index = 0) {}

  parseExpression(): ExprNode {
    return this.parsePipe();
  }

  expect(type: TokenType) {
    const token = this.peek();
    if (token.type !== type) {
      throw new Error(`Expected token ${type} but received ${token.type}`);
    }
    this.index += 1;
    return token;
  }

  private parsePipe(): ExprNode {
    let node = this.parseOr();
    while (this.match('pipe')) {
      const helper = this.expect('identifier').value!;
      const args = this.match('paren_open') ? this.parseArguments() : [];
      node = { type: 'pipe', input: node, name: helper, args };
    }
    return node;
  }

  private parseOr(): ExprNode {
    let node = this.parseAnd();
    while (this.match('or')) {
      node = { type: 'binary', operator: 'or', left: node, right: this.parseAnd() };
    }
    return node;
  }

  private parseAnd(): ExprNode {
    let node = this.parseEquality();
    while (this.match('and')) {
      node = { type: 'binary', operator: 'and', left: node, right: this.parseEquality() };
    }
    return node;
  }

  private parseEquality(): ExprNode {
    let node = this.parseAddition();
    while (true) {
      if (this.match('eq')) {
        node = { type: 'binary', operator: '==', left: node, right: this.parseAddition() };
        continue;
      }

      if (this.match('neq')) {
        node = { type: 'binary', operator: '!=', left: node, right: this.parseAddition() };
        continue;
      }

      return node;
    }
  }

  private parseAddition(): ExprNode {
    let node = this.parseUnary();
    while (this.match('plus')) {
      node = { type: 'binary', operator: '+', left: node, right: this.parseUnary() };
    }
    return node;
  }

  private parseUnary(): ExprNode {
    if (this.match('not')) {
      return { type: 'unary', operator: 'not', argument: this.parseUnary() };
    }

    return this.parseMember();
  }

  private parseMember(): ExprNode {
    let node = this.parsePrimary();

    while (true) {
      if (this.match('dot')) {
        node = {
          type: 'member',
          object: node,
          property: { type: 'identifier', name: this.expect('identifier').value! },
          computed: false,
        };
        continue;
      }

      if (this.match('bracket_open')) {
        const property = this.parseExpression();
        this.expect('bracket_close');
        node = { type: 'member', object: node, property, computed: true };
        continue;
      }

      if (this.match('paren_open')) {
        node = { type: 'call', callee: node, args: this.parseArguments() };
        continue;
      }

      return node;
    }
  }

  private parseArguments() {
    const args: ExprNode[] = [];
    if (this.match('paren_close')) return args;
    while (true) {
      args.push(this.parseExpression());
      if (this.match('paren_close')) return args;
      this.expect('comma');
    }
  }

  private parsePrimary(): ExprNode {
    const token = this.peek();
    if (token.type === 'identifier') {
      this.index += 1;
      return { type: 'identifier', name: token.value! };
    }

    if (token.type === 'string' || token.type === 'number' || token.type === 'boolean' || token.type === 'null') {
      this.index += 1;
      return {
        type: 'literal',
        value:
          token.type === 'number'
            ? Number(token.value)
            : token.type === 'boolean'
              ? token.value === 'true'
              : token.type === 'null'
                ? null
                : token.value,
      };
    }

    if (this.match('paren_open')) {
      const node = this.parseExpression();
      this.expect('paren_close');
      return node;
    }

    if (this.match('bracket_open')) {
      const items: ExprNode[] = [];
      if (this.match('bracket_close')) return { type: 'array', items };
      while (true) {
        items.push(this.parseExpression());
        if (this.match('bracket_close')) return { type: 'array', items };
        this.expect('comma');
      }
    }

    if (this.match('brace_open')) {
      const entries: { key: string; value: ExprNode }[] = [];
      if (this.match('brace_close')) return { type: 'object', entries };
      while (true) {
        const keyToken = this.peek();
        if (keyToken.type !== 'identifier' && keyToken.type !== 'string') {
          throw new Error(`Unexpected token ${keyToken.type} in object expression`);
        }
        this.index += 1;
        this.expect('colon');
        entries.push({ key: keyToken.value!, value: this.parseExpression() });
        if (this.match('brace_close')) return { type: 'object', entries };
        this.expect('comma');
      }
    }

    throw new Error(`Unexpected token ${token.type}`);
  }

  private match(type: TokenType) {
    if (this.peek().type !== type) return false;
    this.index += 1;
    return true;
  }

  private peek() {
    return this.tokens[this.index] ?? { type: 'eof' as const };
  }
}

function tokenize(source: string) {
  const tokens: Token[] = [];
  let index = 0;

  while (index < source.length) {
    const char = source[index]!;

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      const quote = char;
      let value = '';
      index += 1;
      while (index < source.length && source[index] !== quote) {
        value += source[index]!;
        index += 1;
      }
      if (source[index] !== quote) throw new Error('Unterminated string literal');
      index += 1;
      tokens.push({ type: 'string', value });
      continue;
    }

    const twoChars = source.slice(index, index + 2);
    if (twoChars === '==') {
      tokens.push({ type: 'eq' });
      index += 2;
      continue;
    }

    if (twoChars === '!=') {
      tokens.push({ type: 'neq' });
      index += 2;
      continue;
    }

    const singleCharTokens: Record<string, TokenType> = {
      '(': 'paren_open',
      ')': 'paren_close',
      '{': 'brace_open',
      '}': 'brace_close',
      '[': 'bracket_open',
      ']': 'bracket_close',
      ',': 'comma',
      ':': 'colon',
      '.': 'dot',
      '+': 'plus',
      '|': 'pipe',
    };

    const single = singleCharTokens[char];
    if (single) {
      tokens.push({ type: single });
      index += 1;
      continue;
    }

    const identifierMatch = /^[A-Za-z_][A-Za-z0-9_]*/.exec(source.slice(index));
    if (identifierMatch) {
      const value = identifierMatch[0];
      if (value === 'and' || value === 'or' || value === 'not') {
        tokens.push({ type: value });
      } else if (value === 'true' || value === 'false') {
        tokens.push({ type: 'boolean', value });
      } else if (value === 'null') {
        tokens.push({ type: 'null', value });
      } else {
        tokens.push({ type: 'identifier', value });
      }
      index += value.length;
      continue;
    }

    const numberMatch = /^[0-9]+(?:\.[0-9]+)?/.exec(source.slice(index));
    if (numberMatch) {
      tokens.push({ type: 'number', value: numberMatch[0] });
      index += numberMatch[0].length;
      continue;
    }

    throw new Error(`Unexpected character "${char}"`);
  }

  tokens.push({ type: 'eof' });
  return tokens;
}

function compareValues(left: unknown, right: unknown) {
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  return formatValue(left).localeCompare(formatValue(right));
}

function readComparable(value: unknown, field: string | null) {
  return field ? getByPath(value, field) : value;
}

function toNumber(value: unknown) {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
