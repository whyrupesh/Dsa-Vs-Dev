type Entry<T> = { value: T; expiresAt: number };

const store = new Map<string, Entry<unknown>>();

/** Runs `fn` and caches its resolved value for `ttlMs`, keyed by `key`. */
export async function cached<T>(
  key: string,
  ttlMs: number,
  fn: () => Promise<T>
): Promise<T> {
  const hit = store.get(key);
  if (hit && hit.expiresAt > Date.now()) {
    return hit.value as T;
  }

  const value = await fn();
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}
