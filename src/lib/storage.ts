import { promises as fs } from 'node:fs';
import type { Dirent } from 'node:fs';
import path from 'node:path';
import {
  cachePathForSlug,
  getCacheRoot,
  getContentRoot,
  getDataRoot,
  getManifestPath,
  getPagesCacheRoot,
  sourcePathForSlug,
  type LayoutName,
} from './config';
import type { CompileAllResult, CompiledPage } from './types';

export async function ensureStorageLayout() {
  await Promise.all([
    fs.mkdir(path.join(getContentRoot(), 'tools'), { recursive: true }),
    fs.mkdir(path.join(getContentRoot(), 'guides'), { recursive: true }),
    fs.mkdir(path.join(getContentRoot(), 'dashboards'), { recursive: true }),
    fs.mkdir(getDataRoot(), { recursive: true }),
    fs.mkdir(getCacheRoot(), { recursive: true }),
    fs.mkdir(getPagesCacheRoot(), { recursive: true }),
  ]);
}

export async function listSourceFiles() {
  await ensureStorageLayout();
  const collections = ['tools', 'guides', 'dashboards'];
  const files = await Promise.all(
    collections.map(async (collection) => {
      const directory = path.join(getContentRoot(), collection);
      const entries = await fs.readdir(directory, { withFileTypes: true });
      return entries
        .filter((entry: Dirent) => entry.isFile() && entry.name.endsWith('.md'))
        .map((entry: Dirent) => path.join(directory, entry.name));
    }),
  );

  return files.flat().sort();
}

export async function readSourceFile(filePath: string) {
  return fs.readFile(filePath, 'utf8');
}

export async function writeSourceFile(slug: string, layout: LayoutName, source: string) {
  await ensureStorageLayout();
  const filePath = sourcePathForSlug(slug, layout);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, source, 'utf8');
  return filePath;
}

export async function writeCompiledPage(slug: string, page: CompiledPage) {
  await ensureStorageLayout();
  const filePath = cachePathForSlug(slug);
  await fs.writeFile(filePath, JSON.stringify(page, null, 2), 'utf8');
  return filePath;
}

export async function readCompiledPage(slug: string) {
  const filePath = cachePathForSlug(slug);
  const contents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(contents) as CompiledPage;
}

export async function hasCompiledPage(slug: string) {
  try {
    await fs.access(cachePathForSlug(slug));
    return true;
  } catch {
    return false;
  }
}

export async function writeManifest(result: CompileAllResult) {
  await ensureStorageLayout();
  await fs.writeFile(getManifestPath(), JSON.stringify(result.pages, null, 2), 'utf8');
}

export async function readManifest() {
  const contents = await fs.readFile(getManifestPath(), 'utf8');
  return JSON.parse(contents) as CompileAllResult['pages'];
}

export async function hasManifest() {
  try {
    await fs.access(getManifestPath());
    return true;
  } catch {
    return false;
  }
}

export async function readLocalData(dataPath: string) {
  const normalized = dataPath.replace(/^\/+/, '');
  const candidates = [path.join(getDataRoot(), normalized.replace(/^data\//, '')), path.join(process.cwd(), 'public', normalized)];

  for (const candidate of candidates) {
    try {
      const raw = await fs.readFile(candidate, 'utf8');
      return JSON.parse(raw);
    } catch {
      continue;
    }
  }

  throw new Error(`Unable to resolve local data source "${dataPath}"`);
}
