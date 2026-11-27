/**
 * Strips the non-commercial geometry from the shape store (public/data/atlas/shapes.json) for a commercial build:
 * every snapshot's administrative regions and prefectures (`g`, `f`), the Warring States snapshots, and every ring only
 * they used (blanked, so ring indices stay valid). See NOTICE.md and src/shared/data/licence.ts.
 *
 * Used by the build (vite.config.ts) when VITE_COMMERCIAL=1, and runnable on its own:
 *   npx tsx scripts/commercial-data.ts dist/data/atlas/shapes.json
 */
import { readFileSync, writeFileSync } from 'node:fs';

type Json = Record<string, unknown>;
interface Store { source?: Json; rings: string[]; snaps: Record<string, { p: unknown[]; g: unknown; f: unknown }>; [k: string]: unknown }

export const DROP_SNAP = /^s_zhanguo_/;

export function stripNonCommercial(store: Store): Store {
  const snaps: Store['snaps'] = {};
  for (const [id, s] of Object.entries(store.snaps)) {
    if (DROP_SNAP.test(id)) continue;
    snaps[id] = { ...s, g: [], f: [] };
  }
  // keep the rings the remaining polities use
  const used = new Set<number>();
  for (const s of Object.values(snaps)) for (const p of s.p as unknown[][]) for (const r of (p[4] as number[]) ?? []) used.add(r);
  const rings = store.rings.map((r, i) => (used.has(i) ? r : ''));
  return {
    ...store,
    source: { ...(store.source ?? {}), license: 'GPL-3.0 (commercial build: CHGIS / Hartwell-derived boundaries and Warring States territories removed)' },
    rings,
    snaps,
  };
}

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

if (process.argv[1] && /commercial-data\.ts$/.test(process.argv[1])) {
  const file = process.argv[2] ?? 'dist/data/atlas/shapes.json';
  const out = stripNonCommercial(JSON.parse(readFileSync(file, 'utf8')));
  writeFileSync(file, JSON.stringify(out));
  console.log(`commercial data: ${file} (${Object.keys(out.snaps).length} snapshots, ${out.rings.filter(Boolean).length} rings)`);
}
