export function getByPath(source: unknown, path: string) {
  if (!path) return source;
  const segments = path.split('.').filter(Boolean);
  let current = source;

  for (const segment of segments) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

export function setByPath(source: Record<string, unknown>, path: string, value: unknown) {
  const segments = path.split('.').filter(Boolean);
  if (segments.length === 0) return;

  let current: Record<string, unknown> = source;

  for (const segment of segments.slice(0, -1)) {
    const existing = current[segment];
    if (!existing || typeof existing !== 'object' || Array.isArray(existing)) {
      current[segment] = {};
    }
    current = current[segment] as Record<string, unknown>;
  }

  current[segments[segments.length - 1]!] = value;
}
