import type { LayoutName, ThemeName } from './config';

export type Primitive = string | number | boolean | null;
export type JsonValue = Primitive | JsonValue[] | { [key: string]: JsonValue };
export type Scope = Record<string, unknown>;

export interface AppMeta {
  tags?: string[];
  published?: boolean;
  accent?: string;
  persist?: string[];
}

export interface AppFrontmatter {
  title: string;
  slug: string;
  theme: ThemeName;
  layout: LayoutName;
  description?: string;
  state: Record<string, JsonValue>;
  data: Record<string, unknown>;
  computed: Record<string, string>;
  meta: AppMeta;
}

export interface DataDescriptorInline {
  kind: 'inline';
  value: unknown;
}

export interface DataDescriptorLocal {
  kind: 'local';
  path: string;
  value: unknown;
}

export interface DataDescriptorRemote {
  kind: 'remote';
  url: string;
  initialValue: unknown;
}

export type DataDescriptor =
  | DataDescriptorInline
  | DataDescriptorLocal
  | DataDescriptorRemote;

export interface RuntimeConfig {
  slug: string;
  state: Record<string, unknown>;
  data: Record<string, DataDescriptor>;
  computed: Record<string, string>;
  fields: FieldConfig[];
  persist: string[];
}

export interface FieldConfig {
  bind: string;
  control: 'select' | 'input' | 'textarea' | 'checkbox' | 'radio' | 'range' | 'toggle';
  label?: string;
  type?: string;
  options?: string;
  required?: boolean;
  min?: number;
  max?: number;
  match?: string;
  step?: number;
  url?: boolean;
}

export interface DataStatus {
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export interface PublishedPageSummary {
  slug: string;
  title: string;
  description?: string;
  theme: ThemeName;
  layout: LayoutName;
  tags: string[];
  sourcePath: string;
  updatedAt: string;
}

export interface CompiledPage {
  frontmatter: AppFrontmatter;
  html: string;
  runtime: RuntimeConfig;
  sourcePath?: string;
  updatedAt: string;
}

export interface CompileAllResult {
  manifestPath: string;
  pages: PublishedPageSummary[];
}

export interface ValidationIssue {
  message: string;
  line?: number;
}

export interface CompileError extends Error {
  issues?: ValidationIssue[];
}
