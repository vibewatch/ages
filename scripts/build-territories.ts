/**
 * Generates our own territory maps (public/data/atlas/own.json and src/shared/data/gen/own.json) from the seats and
 * holdings in src/shared/data/own/*.ts over the public-domain relief (public/data/terrain/east-asia.webp, see
 * scripts/fetch-terrain.ts). See scripts/territory/gen.ts for the method and docs/data/territories.md.
 *
 *   node scripts/build-territories.ts            (npm run data:territories)
 *   node scripts/build-territories.ts --preview  also writes .territory-preview/<phase>.png for checking
 *   node scripts/build-territories.ts --try src/shared/data/own/tang.ts
 *       one era file on its own (not yet in own/index.ts): previews and .territory-preview/try-<era>.json only, nothing else
 *       written; check it against another map with scripts/territory/compare.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { POLITY } from '../src/shared/data/polities.ts';
import { STAGES } from '../src/shared/data/stage.ts';
import { ERAS_OWN } from '../src/shared/data/own/index.ts';
import { holderAt, type OwnEra } from '../src/shared/data/own/types.ts';
import type { LonLat, Polity } from '../src/shared/data/types.ts';
import { encodeRing } from '../src/shared/lib/rings.ts';
import { allocate, areas, cellLat, cellLon, despeckle, fillHoles, ringArea, simplify, smooth, trace, type Grid, type Source } from './territory/gen.ts';

const TRY = process.argv.includes('--try') ? process.argv[process.argv.indexOf('--try') + 1] : null;
const PREVIEW = !!TRY || process.argv.includes('--preview');
async function erasToBuild(): Promise<OwnEra[]> {
  if (!TRY) return ERAS_OWN;
  const mod = await import(new URL('../' + TRY, import.meta.url).href) as Record<string, unknown>;
  const eras = Object.values(mod).filter((v): v is OwnEra => !!v && typeof v === 'object' && 'seats' in v && 'holds' in v);
  if (!eras.length) throw new Error(`${TRY}: no OwnEra export`);
  return eras;
}
const ERAS = await erasToBuild();
/** generation window and resolution (degrees) */
const WIN = { west: 60, east: 142, south: 15, north: 58 }, STEP = 0.1;

async function loadGrid(): Promise<Grid> {
  const st = STAGES.china;
  const { data, info } = await sharp('public/' + st.terrain).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const sx = (st.bounds.east - st.bounds.west) / W, sy = (st.bounds.north - st.bounds.south) / H;
  const w = Math.round((WIN.east - WIN.west) / STEP), h = Math.round((WIN.north - WIN.south) / STEP);
  const elev = new Float32Array(w * h), land = new Uint8Array(w * h), river = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const lon0 = WIN.west + x * STEP, lat0 = WIN.north - y * STEP;
    const px0 = Math.floor((lon0 - st.bounds.west) / sx), py0 = Math.floor((st.bounds.north - lat0) / sy);
    const px1 = Math.max(px0 + 1, Math.floor((lon0 + STEP - st.bounds.west) / sx)), py1 = Math.max(py0 + 1, Math.floor((st.bounds.north - lat0 + STEP) / sy));
    let e = 0, n = 0, l = 0, rv = 0;
    for (let py = py0; py < py1; py++) for (let px = px0; px < px1; px++) {
      if (px < 0 || py < 0 || px >= W || py >= H) continue;
      const i = (py * W + px) * C;
      const b = data[i + 2];
      n++;
      e += data[i] * 256 + data[i + 1] - 11000;
      if (b !== 255) l++;
      if (b > 0 && b < 255) rv = Math.max(rv, b);
    }
    const c = y * w + x;
    elev[c] = n ? e / n : 0;
    land[c] = n && l * 2 >= n ? 1 : 0;
    river[c] = rv;
  }
  return { w, h, west: WIN.west, north: WIN.north, step: STEP, elev, land, river };
}

/** The most inland cell of each owner (largest distance to another owner or the sea): where its name goes. */
function labels(g: Grid, owner: Int16Array, n: number): (LonLat | null)[] {
  const d = new Int32Array(owner.length).fill(-1);
  let q: number[] = [];
  for (let i = 0; i < owner.length; i++) {
    if (owner[i] < 0) continue;
    const x = i % g.w;
    const edge = [x > 0 ? i - 1 : -1, x < g.w - 1 ? i + 1 : -1, i - g.w, i + g.w].some(m => m < 0 || m >= owner.length || owner[m] !== owner[i]);
    if (edge) { d[i] = 0; q.push(i); }
  }
  for (let k = 1; q.length; k++) {
    const nq: number[] = [];
    for (const c of q) {
      const x = c % g.w;
      for (const m of [x > 0 ? c - 1 : -1, x < g.w - 1 ? c + 1 : -1, c - g.w, c + g.w]) {
        if (m < 0 || m >= owner.length || d[m] >= 0 || owner[m] !== owner[c]) continue;
        d[m] = k; nq.push(m);
      }
    }
    q = nq;
  }
  const best = new Array(n).fill(-1), at: (LonLat | null)[] = new Array(n).fill(null);
  for (let i = 0; i < owner.length; i++) if (owner[i] >= 0 && d[i] > best[owner[i]]) {
    best[owner[i]] = d[i];
    const x = i % g.w, y = (i - x) / g.w;
    at[owner[i]] = [Math.round(cellLon(g, x) * 100) / 100, Math.round(cellLat(g, y) * 100) / 100];
  }
  return at;
}

function hex(c: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(c);
  const v = m ? parseInt(m[1], 16) : 0x999999;
  return [v >> 16, (v >> 8) & 255, v & 255];
}

async function preview(g: Grid, owner: Int16Array, list: string[], colorOf: (id: string) => string, seats: [LonLat, string][], file: string): Promise<void> {
  const px = new Uint8Array(g.w * g.h * 3);
  for (let i = 0; i < owner.length; i++) {
    let c: [number, number, number] = g.land[i] ? [236, 230, 214] : [176, 200, 214];
    if (g.land[i] && g.river[i] >= 150) c = [120, 160, 200];
    if (owner[i] >= 0) {
      const p = hex(colorOf(list[owner[i]]));
      c = [Math.round(p[0] * 0.8 + c[0] * 0.2), Math.round(p[1] * 0.8 + c[1] * 0.2), Math.round(p[2] * 0.8 + c[2] * 0.2)];
      const x = i % g.w;
      const edge = [x > 0 ? i - 1 : -1, x < g.w - 1 ? i + 1 : -1, i - g.w, i + g.w].some(m => m >= 0 && m < owner.length && owner[m] !== owner[i] && g.land[m]);
      if (edge) c = [40, 30, 25];
    }
    px.set(c, i * 3);
  }
  for (const [[lon, lat], col] of seats) {
    const x = Math.floor((lon - g.west) / g.step), y = Math.floor((g.north - lat) / g.step);
    for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
      const xx = x + ox, yy = y + oy;
      if (xx >= 0 && yy >= 0 && xx < g.w && yy < g.h) px.set(hex(col), (yy * g.w + xx) * 3);
    }
  }
  // the Chinese heartland, doubled, and the whole window
  const img = () => sharp(Buffer.from(px), { raw: { width: g.w, height: g.h, channels: 3 } });
  const crop = { left: Math.round((95 - g.west) / g.step), top: Math.round((g.north - 46) / g.step), width: Math.round(36 / g.step), height: Math.round(26 / g.step) };
  await img().extract(crop).resize(crop.width * 2, crop.height * 2, { kernel: 'nearest' }).png().toFile(file);
  await img().png().toFile(file.replace(/\.png$/, '-wide.png'));
}

const grid = await loadGrid();
console.log(`grid ${grid.w}×${grid.h} @ ${STEP}°`);
if (PREVIEW) mkdirSync('.territory-preview', { recursive: true });

const rings: string[] = [];
const snaps: Record<string, { p: [string, null, string | null, LonLat | null, number[]][]; g: []; f: [] }> = {};
const meta: { replaces: string; phases: { id: string; from: number; to: number; title: unknown; note?: unknown; changes: [number, string, string | null, string | null, string?][] }[]; sources: OwnEra['sources']; polities: Polity[] }[] = [];

for (const era of ERAS) {
  const extra = new Map((era.polities ?? []).map(p => [p.id, p]));
  const polity = (id: string) => extra.get(id) ?? POLITY.get(id);
  const seatById = new Map(era.seats.map(s => [s.id, s]));
  for (const id of Object.keys(era.holds)) if (!seatById.has(id)) throw new Error(`hold for unknown seat ${id}`);
  for (const s of era.seats) {
    if (!era.holds[s.id]) throw new Error(`seat ${s.id} has no holdings`);
    for (const [, p, src] of era.holds[s.id]) {
      if (p && !polity(p)) throw new Error(`seat ${s.id}: unknown polity ${p}`);
      if (src && !era.sources[src]) throw new Error(`seat ${s.id}: unknown source ${src}`);
    }
  }
  const phases: (typeof meta)[number]['phases'] = [];
  let prev: Map<string, string | null> | null = null;
  for (const ph of era.phases) {
    const year = ph.at ?? ph.to;
    const list: string[] = [];
    const idx = (p: string) => { let i = list.indexOf(p); if (i < 0) { i = list.length; list.push(p); } return i; };
    const sources: Source[] = [];
    const now = new Map<string, string | null>();
    for (const s of era.seats) {
      const p = holderAt(era.holds[s.id], year);
      now.set(s.id, p);
      if (!p) continue;
      sources.push({ owner: idx(p), lon: s.at[0], lat: s.at[1], reach: s.r ?? era.reach, boost: s.b });
    }
    const owner = allocate(grid, sources);
    despeckle(grid, owner);
    fillHoles(grid, owner);
    const area = areas(grid, owner, list.length);
    const at = labels(grid, owner, list.length);
    const entry: (typeof snaps)[string]['p'] = [];
    // neighbours first, so the states are painted over them where the outlines touch
    const order = list.map((p, i) => i).sort((a, b) => Number(polity(list[a])!.role !== 'neighbor') - Number(polity(list[b])!.role !== 'neighbor'));
    for (const i of order) {
      const rs = trace(grid, owner, i).map(r => smooth(simplify(r, STEP * 0.6))).filter(r => ringArea(r) > 1);
      if (!rs.length) continue;
      const ids = rs.map(r => { rings.push(encodeRing(r)); return rings.length - 1; });
      const role = era.roles?.[list[i]] ?? null;
      entry.push([list[i], null, role, at[i], ids]);
    }
    snaps[ph.id] = { p: entry, g: [], f: [] };
    // what changed since the previous phase, with sources (for the map's notes)
    const changes: [number, string, string | null, string | null, string?][] = [];
    if (prev) for (const s of era.seats) {
      const a = prev.get(s.id) ?? null, b = now.get(s.id) ?? null;
      if (a === b) continue;
      const h = era.holds[s.id].filter(([y]) => y <= year).at(-1);
      changes.push([h?.[0] ?? year, s.id, a, b, h?.[2]]);
    }
    prev = now;
    phases.push({ id: ph.id, from: ph.from, to: ph.to, title: ph.title, note: ph.note, changes });
    console.log(`${ph.id} (${year}): ${list.map((p, i) => `${polity(p)!.name.zh} ${Math.round(area[i])}`).join(' · ')}`);
    if (PREVIEW) await preview(grid, owner, list, id => polity(id)!.color, era.seats.map(s => [s.at, now.get(s.id) ? '#000000' : '#ff0000'] as [LonLat, string]), `.territory-preview/${ph.id}.png`);
  }
  meta.push({ replaces: era.replaces, phases, sources: era.sources, polities: era.polities ?? [] });
}

const seatNames: Record<string, { zh: string; en: string; at: LonLat; modern?: string }> = {};
// keyed per era: the same city has different names in different periods
for (const era of ERAS) for (const s of era.seats) seatNames[`${era.replaces}:${s.id}`] = { ...s.name, at: s.at, modern: s.modern };

const shapes = JSON.stringify({
  source: { repo: 'own', sha: '', license: 'GPL-3.0 (own data, see docs/data/territories.md)' },
  rings, names: [], snaps, provinces: [], lakes: [],
});
if (TRY) {
  const f = `.territory-preview/try-${ERAS.map(e => e.replaces).join('-')}.json`;
  writeFileSync(f, shapes);
  console.log(`trial: ${Object.keys(snaps).length} phases → .territory-preview/<phase>.png, <phase>-wide.png and ${f}`);
} else {
  writeFileSync('public/data/atlas/own.json', shapes);
  writeFileSync('src/shared/data/gen/own.json', JSON.stringify({ eras: meta, seats: seatNames }, null, 0));
  console.log(`wrote ${Object.keys(snaps).length} phases, ${rings.length} rings, ${(shapes.length / 1024).toFixed(0)} KB`);
}
