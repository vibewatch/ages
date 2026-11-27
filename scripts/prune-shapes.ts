/**
 * Build step (vite.config.ts): ships only the parts of the shape store the app shows.
 */
type Json = Record<string, unknown>;
interface Store { source?: Json; rings: string[]; snaps: Record<string, { p: unknown[]; g: unknown; f: unknown }>; [k: string]: unknown }

/**
 * Keeps only the snapshots the app shows (`keep`: the imported phases not yet replaced by our own, and the curated maps'
 * precise shapes), blanking every ring nothing uses any more (provinces and lakes keep theirs). Every build does this.
 */
export function pruneShapes(store: Store, keep: ReadonlySet<string>): Store {
  const snaps: Store['snaps'] = {};
  for (const [id, s] of Object.entries(store.snaps)) if (keep.has(id)) snaps[id] = s;
  const used = new Set<number>();
  const add = (rs: unknown) => { for (const r of (rs as number[]) ?? []) used.add(r); };
  for (const s of Object.values(snaps)) {
    for (const p of s.p as unknown[][]) add(p[4]);
    for (const level of [s.g, s.f]) if (Array.isArray(level)) for (const a of level as unknown[][]) add(a[3]);
  }
  for (const p of (store.provinces as unknown[][] | undefined) ?? []) add(p[2]);
  for (const l of (store.lakes as unknown[][] | undefined) ?? []) add(l[4]);
  return { ...store, rings: store.rings.map((r, i) => (used.has(i) ? r : '')), snaps };
}
