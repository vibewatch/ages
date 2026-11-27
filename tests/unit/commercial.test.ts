import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { stripNonCommercial } from '../../scripts/commercial-data.ts';
import { NONCOMMERCIAL_DYN } from '../../src/shared/data/licence.ts';
import { IMPORTED_SNAPSHOTS } from '../../src/shared/data/jiangshan.ts';

describe('commercial build data', () => {
  const store = JSON.parse(readFileSync('public/data/atlas/shapes.json', 'utf8'));
  const out = stripNonCommercial(store);

  it('drops every administrative boundary and the Warring States territories', () => {
    for (const [id, s] of Object.entries(out.snaps)) {
      expect(id).not.toMatch(/^s_zhanguo_/);
      expect(s.g).toEqual([]);
      expect(s.f).toEqual([]);
    }
    const dropped = IMPORTED_SNAPSHOTS.filter(s => s.dyn && NONCOMMERCIAL_DYN.has(s.dyn)).map(s => s.id);
    expect(dropped.length).toBeGreaterThan(10);
    for (const id of dropped) expect(out.snaps[id]).toBeUndefined();
  });

  it('keeps every other territory with all of its rings', () => {
    const kept = IMPORTED_SNAPSHOTS.filter(s => !(s.dyn && NONCOMMERCIAL_DYN.has(s.dyn)));
    for (const s of kept) {
      const snap = out.snaps[s.shapes!];
      expect(snap, s.id).toBeDefined();
      for (const p of snap.p as unknown[][]) for (const r of p[4] as number[]) expect(out.rings[r].length).toBeGreaterThan(0);
    }
    expect(out.rings).toHaveLength(store.rings.length);
    // and the geometry only the removed layers used is gone
    expect(out.rings.filter(Boolean).length).toBeLessThan(store.rings.length * 0.6);
    expect(String(out.source?.license)).toContain('removed');
  });
});
