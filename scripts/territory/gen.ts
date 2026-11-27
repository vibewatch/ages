/**
 * Our own territory maps, generated rather than traced (see docs/data/territories.md): every polity holds a set of
 * seats (治所 — commandery, prefecture or county seats, capitals, garrisons) at known coordinates, and the land is shared
 * out between the seats by travel cost over the real relief — slopes and high ground cost more, great rivers are
 * crossed at a price, the sea is not crossed — up to each seat's reach. Borders therefore run along ridges, rivers and
 * deserts the way pre-modern borders did, and every border is the consequence of a sourced holding, not a drawn line.
 *
 * Pure functions over a terrain grid; scripts/build-territories.ts loads the heightmap and writes the shapes.
 */
import type { LonLat } from '../../src/shared/data/types.ts';

/** The relief on a regular lon/lat grid: elevation (m), land, river strength (0–254). */
export interface Grid {
  w: number; h: number;
  /** lon of column 0's west edge, lat of row 0's north edge, cell size in degrees */
  west: number; north: number; step: number;
  elev: Float32Array; land: Uint8Array; river: Uint8Array;
}

export const cellLon = (g: Grid, x: number) => g.west + (x + 0.5) * g.step;
export const cellLat = (g: Grid, y: number) => g.north - (y + 0.5) * g.step;
export const cellAt = (g: Grid, lon: number, lat: number): number => {
  const x = Math.floor((lon - g.west) / g.step), y = Math.floor((g.north - lat) / g.step);
  return x < 0 || y < 0 || x >= g.w || y >= g.h ? -1 : y * g.w + x;
};

export interface Source {
  /** polity index (into the caller's list) */
  owner: number;
  lon: number; lat: number;
  /** reach in cost-km: how far the seat's hold extends over easy ground */
  reach: number;
  /** head start in cost-km (capitals and large seats push their border outwards) */
  boost?: number;
}

/** Cost weights; tuned so borders follow the Qinling, the Taihang, the Huai and the Yangtze where history says they did. */
export const COST = {
  /** per 100 m of climb or descent between neighbouring cells, in km */
  slope: 1.6,
  /** extra per km over high ground above 1 500 m (plateaus are hard to hold) */
  high: 0.12,
  /** crossing a river cell, scaled by its strength (0–1), in km */
  river: 45,
  /** rivers weaker than this (0–254) are not barriers */
  riverMin: 150,
};

/** A binary min-heap of (cost, cell) pairs. */
class Heap {
  private c: number[] = []; private v: number[] = [];
  get size() { return this.c.length; }
  push(cost: number, cell: number) {
    const c = this.c, v = this.v;
    let i = c.length; c.push(cost); v.push(cell);
    while (i > 0) { const p = (i - 1) >> 1; if (c[p] <= cost) break; c[i] = c[p]; v[i] = v[p]; i = p; }
    c[i] = cost; v[i] = cell;
  }
  pop(): [number, number] {
    const c = this.c, v = this.v, top: [number, number] = [c[0], v[0]];
    const lc = c.pop()!, lv = v.pop()!;
    if (c.length) {
      let i = 0; const n = c.length;
      for (;;) {
        const l = 2 * i + 1, r = l + 1; let m = i, mc = lc;
        if (l < n && c[l] < mc) { m = l; mc = c[l]; }
        if (r < n && c[r] < mc) { m = r; mc = c[r]; }
        if (m === i) break;
        c[i] = c[m]; v[i] = v[m]; i = m;
      }
      c[i] = lc; v[i] = lv;
    }
    return top;
  }
}

/**
 * Shares the land out between the sources: each land cell goes to the source that reaches it most cheaply, within that
 * source's reach. Returns the owner per cell (-1 = nobody's).
 */
export function allocate(g: Grid, sources: Source[]): Int16Array { return allocateSeats(g, sources).owner; }

/** As `allocate`, also returning which source (seat) won each cell (-1 = none). */
export function allocateSeats(g: Grid, sources: Source[]): { owner: Int16Array; seat: Int32Array } {
  const n = g.w * g.h;
  const best = new Float64Array(n).fill(Infinity);
  const owner = new Int16Array(n).fill(-1);
  const seat = new Int32Array(n).fill(-1);
  const heap = new Heap();
  sources.forEach((s, i) => {
    let c = cellAt(g, s.lon, s.lat);
    if (c < 0) return;
    // a coastal seat a little offshore at this resolution: step onto the nearest land
    if (!g.land[c]) c = nearestLand(g, c);
    if (c < 0) return;
    const start = -(s.boost ?? 0);
    if (start < best[c]) { best[c] = start; owner[c] = s.owner; seat[c] = i; heap.push(start, c); }
  });
  const dy = g.step * 111.32;
  const D8 = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  while (heap.size) {
    const [cost, c] = heap.pop();
    if (cost > best[c]) continue;
    const s = sources[seat[c]];
    const x = c % g.w, y = (c - x) / g.w;
    const dx = dy * Math.cos((cellLat(g, y) * Math.PI) / 180);
    for (const [ox, oy] of D8) {
      const nx = x + ox, ny = y + oy;
      if (nx < 0 || ny < 0 || nx >= g.w || ny >= g.h) continue;
      const m = ny * g.w + nx;
      if (!g.land[m]) continue;
      const d = Math.hypot(ox * dx, oy * dy);
      const climb = Math.abs(g.elev[m] - g.elev[c]) / 100;
      const hi = Math.max(0, g.elev[m] - 1500) / 1000;
      const rv = g.river[m] >= COST.riverMin && g.river[c] < COST.riverMin ? COST.river * (g.river[m] / 254) : 0;
      const nc = cost + d * (1 + hi * COST.high * 10) + climb * COST.slope + rv;
      if (nc > s.reach || nc >= best[m]) continue;
      best[m] = nc; owner[m] = owner[c]; seat[m] = seat[c];
      heap.push(nc, m);
    }
  }
  return { owner, seat };
}

function nearestLand(g: Grid, c: number): number {
  const x0 = c % g.w, y0 = (c - x0) / g.w;
  for (let r = 1; r <= 6; r++) for (let oy = -r; oy <= r; oy++) for (let ox = -r; ox <= r; ox++) {
    const x = x0 + ox, y = y0 + oy;
    if (x >= 0 && y >= 0 && x < g.w && y < g.h && g.land[y * g.w + x]) return y * g.w + x;
  }
  return -1;
}

/** Removes specks: owned patches smaller than `min` cells are given to the surrounding owner (or nobody). */
export function despeckle(g: Grid, owner: Int16Array, min = 6): void {
  const seen = new Uint8Array(owner.length);
  const stack: number[] = [];
  for (let i = 0; i < owner.length; i++) {
    if (seen[i] || owner[i] < 0) continue;
    const o = owner[i], patch: number[] = [];
    const around = new Map<number, number>();
    stack.push(i); seen[i] = 1;
    while (stack.length) {
      const c = stack.pop()!; patch.push(c);
      const x = c % g.w;
      for (const m of [x > 0 ? c - 1 : -1, x < g.w - 1 ? c + 1 : -1, c - g.w, c + g.w]) {
        if (m < 0 || m >= owner.length) continue;
        if (owner[m] === o) { if (!seen[m]) { seen[m] = 1; stack.push(m); } } else around.set(owner[m], (around.get(owner[m]) ?? 0) + 1);
      }
    }
    if (patch.length >= min) continue;
    let to = -1, most = 0;
    for (const [k, v] of around) if (k >= 0 && v > most) { most = v; to = k; }
    for (const c of patch) owner[c] = to;
  }
}

/** Fills holes: unowned patches (lakes, unreachable specks) under `max` cells wholly inside one owner join it. */
export function fillHoles(g: Grid, owner: Int16Array, max = 600): void {
  const seen = new Uint8Array(owner.length);
  const stack: number[] = [];
  for (let i = 0; i < owner.length; i++) {
    if (seen[i] || owner[i] >= 0) continue;
    const patch: number[] = [];
    const around = new Set<number>();
    let open = false;
    stack.push(i); seen[i] = 1;
    while (stack.length) {
      const c = stack.pop()!; patch.push(c);
      const x = c % g.w, y = (c - x) / g.w;
      if (x === 0 || y === 0 || x === g.w - 1 || y === g.h - 1) open = true;
      for (const m of [x > 0 ? c - 1 : -1, x < g.w - 1 ? c + 1 : -1, y > 0 ? c - g.w : -1, y < g.h - 1 ? c + g.w : -1]) {
        if (m < 0) continue;
        if (owner[m] < 0) { if (!seen[m]) { seen[m] = 1; stack.push(m); } } else around.add(owner[m]);
      }
    }
    if (open || patch.length > max || around.size !== 1) continue;
    const to = [...around][0];
    for (const c of patch) owner[c] = to;
  }
}

/**
 * The outline of every cell owned by `who`, as closed rings of cell corners (outer rings and holes; filled with the
 * even-odd rule). Edges are walked with the region on the left; at a corner shared diagonally, it turns left so rings
 * stay simple.
 */
export function trace(g: Grid, owner: Int16Array, who: number): LonLat[][] {
  return traceWhere(g, c => owner[c] === who);
}

/** Cell bounds [x0, y0, x1, y1] (inclusive) to trace within. */
export type CellBox = [number, number, number, number];

/** The outline of the cells for which `inside(cell)` holds, within `box` (default: the whole grid). */
export function traceWhere(g: Grid, inside: (cell: number) => boolean, box: CellBox = [0, 0, g.w - 1, g.h - 1]): LonLat[][] {
  const W = g.w + 1;
  const [bx0, by0, bx1, by1] = box;
  const isIn = (x: number, y: number) => x >= bx0 && y >= by0 && x <= bx1 && y <= by1 && inside(y * g.w + x);
  // directed edges keyed by start corner; dir 0 = east, 1 = south, 2 = west, 3 = north (y grows southwards)
  const out = new Map<number, number[]>();
  const add = (cx: number, cy: number, dir: number) => {
    const k = cy * W + cx;
    const l = out.get(k); if (l) l.push(dir); else out.set(k, [dir]);
  };
  for (let y = by0; y <= by1; y++) for (let x = bx0; x <= bx1; x++) {
    if (!isIn(x, y)) continue;
    // region on the left of each edge, walking counter-clockwise on screen (clockwise in lon/lat)
    if (!isIn(x, y - 1)) add(x + 1, y, 2);      // top edge, westwards
    if (!isIn(x - 1, y)) add(x, y, 1);          // left edge, southwards
    if (!isIn(x, y + 1)) add(x, y + 1, 0);      // bottom edge, eastwards
    if (!isIn(x + 1, y)) add(x + 1, y + 1, 3);  // right edge, northwards
  }
  const step = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  const rings: LonLat[][] = [];
  for (const [k0, l0] of out) {
    while (l0.length) {
      let k = k0, dir = l0.pop()!;
      const pts: [number, number][] = [];
      for (let guard = 0; guard < 4e6; guard++) {
        const cx = k % W, cy = (k - cx) / W;
        pts.push([cx, cy]);
        const nx = cx + step[dir][0], ny = cy + step[dir][1];
        k = ny * W + nx;
        const l = out.get(k);
        if (!l || !l.length) break;
        // prefer turning left, then straight, then right
        let pick = -1;
        for (const d of [(dir + 3) % 4, dir, (dir + 1) % 4]) { const j = l.indexOf(d); if (j >= 0) { pick = j; break; } }
        if (pick < 0) pick = 0;
        dir = l.splice(pick, 1)[0];
        if (k === k0 && !l.length && !l0.length) break;
      }
      if (pts.length >= 4) rings.push(pts.map(([cx, cy]) => [g.west + cx * g.step, g.north - cy * g.step] as LonLat));
    }
  }
  return rings;
}

/** Douglas–Peucker simplification of a closed ring (tolerance in degrees). */
export function simplify(ring: LonLat[], tol: number): LonLat[] {
  if (ring.length < 8) return ring;
  const keep = new Uint8Array(ring.length);
  keep[0] = 1; keep[ring.length - 1] = 1;
  // split at the point farthest from the first, so a closed ring simplifies as two open runs
  let far = 0, fd = -1;
  for (let i = 1; i < ring.length; i++) { const d = (ring[i][0] - ring[0][0]) ** 2 + (ring[i][1] - ring[0][1]) ** 2; if (d > fd) { fd = d; far = i; } }
  keep[far] = 1;
  const t2 = tol * tol;
  const run = (a: number, b: number) => {
    const st = [[a, b]];
    while (st.length) {
      const [i, j] = st.pop()!;
      const [x1, y1] = ring[i], [x2, y2] = ring[j];
      const L = (x2 - x1) ** 2 + (y2 - y1) ** 2;
      let m = -1, md = t2;
      for (let k = i + 1; k < j; k++) {
        const [x, y] = ring[k];
        let d: number;
        if (!L) d = (x - x1) ** 2 + (y - y1) ** 2;
        else { const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / L)); d = (x - x1 - t * (x2 - x1)) ** 2 + (y - y1 - t * (y2 - y1)) ** 2; }
        if (d > md) { md = d; m = k; }
      }
      if (m >= 0) { keep[m] = 1; st.push([i, m], [m, j]); }
    }
  };
  run(0, far); run(far, ring.length - 1);
  return ring.filter((_, i) => keep[i]);
}

/** One round of Chaikin corner cutting: takes the staircase out of grid outlines. */
export function smooth(ring: LonLat[]): LonLat[] {
  const out: LonLat[] = [];
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length];
    out.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
  }
  return out;
}

/** Area of a ring in thousand km² (sinusoidal projection). */
export function ringArea(r: LonLat[]): number {
  let a = 0;
  const k = Math.PI / 180;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    a += r[j][0] * Math.cos(r[j][1] * k) * r[i][1] - r[i][0] * Math.cos(r[i][1] * k) * r[j][1];
  }
  return (Math.abs(a / 2) * 111.32 * 111.32) / 1000;
}

/** Owned area per owner, in thousand km². */
export function areas(g: Grid, owner: Int16Array, n: number): number[] {
  const out = new Array(n).fill(0);
  const c = g.step * 111.32;
  for (let i = 0; i < owner.length; i++) if (owner[i] >= 0) {
    const y = Math.floor(i / g.w);
    out[owner[i]] += (c * c * Math.cos((cellLat(g, y) * Math.PI) / 180)) / 1000;
  }
  return out;
}
