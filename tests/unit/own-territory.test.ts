import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { allocate, fillHoles, trace, type Grid } from '../../scripts/territory/gen.ts';
import { ERAS_OWN } from '../../src/shared/data/own/index.ts';
import { holderAt } from '../../src/shared/data/own/types.ts';
import { OWN_SNAPSHOTS } from '../../src/shared/data/own.ts';
import { POLITY } from '../../src/shared/data/polities.ts';
import { IMPORTED_SNAPSHOTS } from '../../src/shared/data/jiangshan.ts';

const flat = (w: number, h: number): Grid => ({ w, h, west: 0, north: h, step: 1, elev: new Float32Array(w * h), land: new Uint8Array(w * h).fill(1), river: new Uint8Array(w * h) });

describe('territory generation', () => {
  it('shares flat land between two seats down the middle, within reach', () => {
    const g = flat(40, 10);
    const o = allocate(g, [{ owner: 0, lon: 5.5, lat: 5.5, reach: 2000 }, { owner: 1, lon: 34.5, lat: 5.5, reach: 2000 }]);
    expect(o[5 * 40 + 10]).toBe(0);
    expect(o[5 * 40 + 30]).toBe(1);
    const short = allocate(g, [{ owner: 0, lon: 5.5, lat: 5.5, reach: 150 }]);
    expect(short[5 * 40 + 30]).toBe(-1);
  });

  it('does not cross the sea, and a ridge pushes the border', () => {
    const g = flat(40, 10);
    for (let y = 0; y < 10; y++) g.land[y * 40 + 20] = 0;
    const o = allocate(g, [{ owner: 0, lon: 5.5, lat: 5.5, reach: 99999 }]);
    expect(o[5 * 40 + 30]).toBe(-1);
    // 11 km cells: a 3 000 m ridge is worth many cells of plain
    const r = { ...flat(40, 10), north: 1, step: 0.1 };
    for (let y = 0; y < 10; y++) r.elev[y * 40 + 12] = 3000;
    const o2 = allocate(r, [{ owner: 0, lon: 0.55, lat: 0.55, reach: 99999 }, { owner: 1, lon: 3.45, lat: 0.55, reach: 99999 }]);
    expect(o2[5 * 40 + 11]).toBe(0);
    expect(o2[5 * 40 + 15]).toBe(1);
  });

  it('fills enclosed holes and traces closed outlines', () => {
    const g = flat(10, 10);
    const o = new Int16Array(100).fill(-1);
    for (let y = 2; y < 8; y++) for (let x = 2; x < 8; x++) o[y * 10 + x] = 0;
    o[5 * 10 + 5] = -1;
    fillHoles(g, o);
    expect(o[55]).toBe(0);
    const rings = trace(g, o, 0);
    expect(rings).toHaveLength(1);
    expect(rings[0].length).toBeGreaterThanOrEqual(4);
  });
});

describe('our own territory data', () => {
  for (const era of ERAS_OWN) {
    const extra = new Set((era.polities ?? []).map(p => p.id));
    it(`${era.replaces}: every seat is held, cited and on the map; phases are in order`, () => {
      for (const s of era.seats) {
        const h = era.holds[s.id];
        expect(h, s.id).toBeDefined();
        for (let i = 1; i < h.length; i++) expect(h[i][0], s.id).toBeGreaterThan(h[i - 1][0]);
        for (const [, p, src] of h) {
          if (p) expect(POLITY.has(p) || extra.has(p), `${s.id}: ${p}`).toBe(true);
          if (src) expect(era.sources[src], `${s.id}: ${src}`).toBeDefined();
        }
        expect(s.at[0]).toBeGreaterThan(60); expect(s.at[0]).toBeLessThan(142);
        expect(s.at[1]).toBeGreaterThan(15); expect(s.at[1]).toBeLessThan(58);
      }
      for (let i = 1; i < era.phases.length; i++) expect(era.phases[i].from).toBe(era.phases[i - 1].to + 1);
      // every phase has holders
      for (const ph of era.phases) expect(era.seats.some(s => holderAt(era.holds[s.id], ph.at ?? ph.to))).toBe(true);
    });
  }

  it('is generated: every phase has its map and replaces the imported era', () => {
    const own = JSON.parse(readFileSync('public/data/atlas/own.json', 'utf8'));
    const ids = ERAS_OWN.flatMap(e => e.phases.map(p => p.id));
    expect(OWN_SNAPSHOTS.map(s => s.id)).toEqual(ids);
    for (const id of ids) expect(own.snaps[id]?.p.length, id).toBeGreaterThan(3);
    for (const e of ERAS_OWN) expect(IMPORTED_SNAPSHOTS.some(s => s.dyn === e.replaces)).toBe(false);
    // changes after the first phase carry their sources
    const later = OWN_SNAPSHOTS.slice(1).flatMap(s => s.changes ?? []);
    expect(later.length).toBeGreaterThan(20);
    expect(later.every(c => c.src)).toBe(true);
  });
});
