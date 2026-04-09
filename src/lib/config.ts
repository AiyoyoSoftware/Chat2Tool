import path from 'node:path';

export const ALLOWED_THEMES = ['default', 'recipe', 'guide'] as const;
export const ALLOWED_LAYOUTS = ['article', 'tool', 'dashboard'] as const;

export type ThemeName = (typeof ALLOWED_THEMES)[number];
export type LayoutName = (typeof ALLOWED_LAYOUTS)[number];

export function getStorageRoot() {
  return process.env.STORAGE_ROOT
    ? path.resolve(process.env.STORAGE_ROOT)
    : path.join(process.cwd(), 'storage');
}

export function getContentRoot() {
  return path.join(getStorageRoot(), 'content');
}

export function getDataRoot() {
  return path.join(getStorageRoot(), 'data');
}

export function getCacheRoot() {
  return path.join(getStorageRoot(), 'cache');
}

export function getPagesCacheRoot() {
  return path.join(getCacheRoot(), 'pages');
}

export function getManifestPath() {
  return path.join(getCacheRoot(), 'manifest.json');
}

export function collectionForLayout(layout: LayoutName) {
  if (layout === 'article') return 'guides';
  if (layout === 'dashboard') return 'dashboards';
  return 'tools';
}

export function sourcePathForSlug(slug: string, layout: LayoutName) {
  return path.join(getContentRoot(), collectionForLayout(layout), `${slug}.md`);
}

export function cachePathForSlug(slug: string) {
  return path.join(getPagesCacheRoot(), `${slug}.json`);
}
