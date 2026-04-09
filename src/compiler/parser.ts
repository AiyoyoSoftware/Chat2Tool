import { z } from 'zod';
import YAML from 'yaml';
import { ALLOWED_LAYOUTS, ALLOWED_THEMES } from '../lib/config';
import type { AppFrontmatter, ValidationIssue } from '../lib/types';

export type AppNode =
  | { type: 'markdown'; content: string; line: number }
  | { type: 'if'; branches: { expression: string; children: AppNode[]; line: number }[]; elseChildren: AppNode[]; line: number }
  | { type: 'empty'; expression: string; children: AppNode[]; line: number }
  | { type: 'for'; alias: string; expression: string; children: AppNode[]; line: number }
  | { type: 'select' | 'json-list' | 'input' | 'textarea' | 'checkbox' | 'radio' | 'range' | 'toggle' | 'button'; attrs: Record<string, string>; line: number }
  | { type: 'callout' | 'accordion' | 'define'; attrs: Record<string, string>; children: AppNode[]; line: number }
  | { type: 'use'; attrs: Record<string, string>; name: string; line: number }
  | { type: 'appjs'; code: string; line: number };

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  theme: z.enum(ALLOWED_THEMES),
  layout: z.enum(ALLOWED_LAYOUTS),
  description: z.string().optional(),
  state: z.record(z.any()).default({}),
  data: z.record(z.any()).default({}),
  computed: z.record(z.string()).default({}),
  meta: z
    .object({
      tags: z.array(z.string()).default([]),
      published: z.boolean().default(true),
      accent: z.string().optional(),
      persist: z.array(z.string()).default([]),
    })
    .default({}),
});

interface ParseResult {
  frontmatter: AppFrontmatter;
  body: AppNode[];
}

interface ParsedDirective {
  name: string;
  argument?: string;
  attrs: Record<string, string>;
  line: number;
}

export function parseSource(source: string): ParseResult {
  const issues: ValidationIssue[] = [];
  const normalized = source.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw compileValidationError([{ message: 'Source files must start with a YAML front matter block.' }]);
  }

  let rawFrontmatter: unknown;
  try {
    rawFrontmatter = YAML.parse(match[1]);
  } catch (error) {
    throw compileValidationError([{ message: `Front matter is not valid YAML: ${(error as Error).message}` }]);
  }

  const parsedFrontmatter = frontmatterSchema.safeParse(rawFrontmatter);
  if (!parsedFrontmatter.success) {
    throw compileValidationError(
      parsedFrontmatter.error.issues.map((issue) => ({
        message: `Front matter ${issue.path.join('.') || 'root'}: ${issue.message}`,
      })),
    );
  }

  const body = parseBody(match[2] ?? '', issues);
  if (issues.length > 0) {
    throw compileValidationError(issues);
  }

  const frontmatter = parsedFrontmatter.data;
  return {
    frontmatter: {
      ...frontmatter,
      meta: {
        tags: frontmatter.meta.tags ?? [],
        published: frontmatter.meta.published ?? true,
        accent: frontmatter.meta.accent,
        persist: frontmatter.meta.persist ?? [],
      },
    },
    body,
  };
}

function parseBody(body: string, issues: ValidationIssue[]) {
  const lines = body.split('\n');
  const result = parseNodes(lines, 0, null, issues);
  if (result.index < lines.length) {
    issues.push({ message: 'Unexpected trailing content after parsing body.', line: result.index + 1 });
  }
  return result.nodes;
}

function parseNodes(
  lines: string[],
  startIndex: number,
  stopNames: Set<string> | null,
  issues: ValidationIssue[],
): { nodes: AppNode[]; index: number; stop?: ParsedDirective } {
  const nodes: AppNode[] = [];
  const markdownBuffer: string[] = [];
  const markdownStartLine = { value: startIndex + 1 };
  let index = startIndex;

  const flushMarkdown = () => {
    const content = markdownBuffer.join('\n').trimEnd();
    if (!content.trim()) {
      markdownBuffer.length = 0;
      markdownStartLine.value = index + 1;
      return;
    }

    const nonCodeContent = content.replace(/```[\s\S]*?```/g, '');
    if (/<\/?[A-Za-z][^>]*>/.test(nonCodeContent)) {
      issues.push({
        message: 'Raw HTML is not allowed in markdown body content.',
        line: markdownStartLine.value,
      });
    }

    nodes.push({ type: 'markdown', content, line: markdownStartLine.value });
    markdownBuffer.length = 0;
    markdownStartLine.value = index + 1;
  };

  while (index < lines.length) {
    const rawLine = lines[index]!;
    const line = rawLine.trim();

    if (!line.startsWith('@#')) {
      if (line.startsWith('```')) {
        flushMarkdown();
        const fenceInfo = line.slice(3).trim();
        const fenceLine = index + 1;

        if (fenceInfo === 'appjs') {
          const endIndex = findFenceClose(lines, index + 1);
          if (endIndex === -1) {
            issues.push({ message: 'Unclosed ```appjs fenced block.', line: fenceLine });
            return { nodes, index: lines.length };
          }

          if (process.env.ENABLE_APPJS !== 'true') {
            issues.push({
              message: '```appjs blocks are disabled. Set ENABLE_APPJS=true to allow trusted scripts.',
              line: fenceLine,
            });
          } else {
            nodes.push({
              type: 'appjs',
              code: lines.slice(index + 1, endIndex).join('\n'),
              line: fenceLine,
            });
          }

          index = endIndex + 1;
          continue;
        }

        const endIndex = findFenceClose(lines, index + 1);
        if (endIndex === -1) {
          issues.push({ message: 'Unclosed fenced code block.', line: fenceLine });
          return { nodes, index: lines.length };
        }

        if (!markdownBuffer.length) markdownStartLine.value = fenceLine;
        markdownBuffer.push(...lines.slice(index, endIndex + 1));
        index = endIndex + 1;
        continue;
      }

      if (!markdownBuffer.length) markdownStartLine.value = index + 1;
      markdownBuffer.push(rawLine);
      index += 1;
      continue;
    }

    flushMarkdown();
    const directive = parseDirectiveLine(line, index + 1, issues);
    index += 1;

    if (stopNames?.has(directive.name)) {
      return { nodes, index, stop: directive };
    }

    if (directive.name.startsWith('end')) {
      issues.push({ message: `Unexpected closing directive @#${directive.name}.`, line: directive.line });
      continue;
    }

    if (directive.name === 'if') {
      if (!directive.argument) {
        issues.push({ message: '@#if requires an expression.', line: directive.line });
        continue;
      }

      const parsedIf = parseIfBlock(lines, index, directive, issues);
      nodes.push(parsedIf.node);
      index = parsedIf.index;
      continue;
    }

    if (directive.name === 'empty') {
      if (!directive.argument) {
        issues.push({ message: '@#empty requires an expression.', line: directive.line });
        continue;
      }
      const nested = parseNodes(lines, index, new Set(['endempty']), issues);
      if (nested.stop?.name !== 'endempty') {
        issues.push({ message: 'Missing closing directive @#endempty.', line: directive.line });
      }
      nodes.push({ type: 'empty', expression: directive.argument, children: nested.nodes, line: directive.line });
      index = nested.index;
      continue;
    }

    if (directive.name === 'for') {
      const match = directive.argument?.match(/^([A-Za-z_][A-Za-z0-9_]*)\s+in\s+(.+)$/);
      if (!match) {
        issues.push({ message: '@#for must use the form `@#for item in expression`.', line: directive.line });
        continue;
      }
      const nested = parseNodes(lines, index, new Set(['endfor']), issues);
      if (nested.stop?.name !== 'endfor') {
        issues.push({ message: 'Missing closing directive @#endfor.', line: directive.line });
      }
      nodes.push({
        type: 'for',
        alias: match[1]!,
        expression: match[2]!,
        children: nested.nodes,
        line: directive.line,
      });
      index = nested.index;
      continue;
    }

    if (directive.name === 'callout' || directive.name === 'accordion' || directive.name === 'define') {
      const endToken = directive.name === 'callout' ? 'endcallout' : directive.name === 'accordion' ? 'endaccordion' : 'enddefine';
      const nested = parseNodes(lines, index, new Set([endToken]), issues);
      if (nested.stop?.name !== endToken) {
        issues.push({ message: `Missing closing directive @#${endToken}.`, line: directive.line });
      }
      nodes.push({
        type: directive.name,
        attrs: directive.attrs,
        children: nested.nodes,
        line: directive.line,
      });
      index = nested.index;
      continue;
    }

    if (directive.name === 'use') {
      const name = directive.argument?.trim() || directive.attrs.name;
      if (!name) {
        issues.push({ message: '@#use requires a definition name.', line: directive.line });
        continue;
      }
      nodes.push({ type: 'use', name, attrs: directive.attrs, line: directive.line });
      continue;
    }

    if (
      directive.name === 'select' ||
      directive.name === 'json-list' ||
      directive.name === 'input' ||
      directive.name === 'textarea' ||
      directive.name === 'checkbox' ||
      directive.name === 'radio' ||
      directive.name === 'range' ||
      directive.name === 'toggle' ||
      directive.name === 'button'
    ) {
      nodes.push({
        type: directive.name,
        attrs: directive.attrs,
        line: directive.line,
      });
      continue;
    }

    issues.push({ message: `Unknown directive @#${directive.name}.`, line: directive.line });
  }

  flushMarkdown();
  return { nodes, index };
}

function parseIfBlock(lines: string[], startIndex: number, firstDirective: ParsedDirective, issues: ValidationIssue[]) {
  const branches: { expression: string; children: AppNode[]; line: number }[] = [];
  const firstNested = parseNodes(lines, startIndex, new Set(['elseif', 'else', 'endif']), issues);
  branches.push({
    expression: firstDirective.argument!,
    children: firstNested.nodes,
    line: firstDirective.line,
  });

  let index = firstNested.index;
  let stop = firstNested.stop;
  const elseChildren: AppNode[] = [];

  while (stop?.name === 'elseif') {
    if (!stop.argument) {
      issues.push({ message: '@#elseif requires an expression.', line: stop.line });
    }
    const nested = parseNodes(lines, index, new Set(['elseif', 'else', 'endif']), issues);
    branches.push({
      expression: stop.argument ?? 'false',
      children: nested.nodes,
      line: stop.line,
    });
    index = nested.index;
    stop = nested.stop;
  }

  if (stop?.name === 'else') {
    const nested = parseNodes(lines, index, new Set(['endif']), issues);
    elseChildren.push(...nested.nodes);
    index = nested.index;
    stop = nested.stop;
  }

  if (stop?.name !== 'endif') {
    issues.push({ message: 'Missing closing directive @#endif.', line: firstDirective.line });
  }

  return {
    node: {
      type: 'if',
      branches,
      elseChildren,
      line: firstDirective.line,
    } as AppNode,
    index,
  };
}

function parseDirectiveLine(line: string, lineNumber: number, issues: ValidationIssue[]): ParsedDirective {
  const trimmed = line.slice(2).trim();
  const [name] = trimmed.split(/\s+/);
  const rest = trimmed.slice(name.length).trim();
  const attrs = parseAttributes(rest);

  if (name !== 'if' && name !== 'elseif' && name !== 'for' && name !== 'empty' && name !== 'use') {
    const leftover = rest.replace(/([A-Za-z_][A-Za-z0-9_-]*)="([^"]*)"/g, '').trim();
    if (leftover) {
      issues.push({ message: `Unable to parse directive attributes for ${line}.`, line: lineNumber });
    }
  }

  return {
    name,
    argument: name === 'if' || name === 'elseif' || name === 'for' || name === 'empty' || name === 'use' ? rest : undefined,
    attrs,
    line: lineNumber,
  };
}

function parseAttributes(source: string) {
  const attrs: Record<string, string> = {};
  const regex = /([A-Za-z_][A-Za-z0-9_-]*)="([^"]*)"/g;
  for (const match of source.matchAll(regex)) {
    attrs[match[1]!] = match[2]!;
  }
  return attrs;
}

function findFenceClose(lines: string[], startIndex: number) {
  for (let index = startIndex; index < lines.length; index += 1) {
    if (lines[index]!.trim() === '```') return index;
  }
  return -1;
}

function compileValidationError(issues: ValidationIssue[]) {
  const error = new Error(issues.map((issue) => issue.message).join('\n')) as Error & { issues: ValidationIssue[] };
  error.issues = issues;
  return error;
}
