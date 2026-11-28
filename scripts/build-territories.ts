/**
 * Generates our own territory maps (public/data/atlas/own.json and src/shared/data/gen/own.json) from the seats and
 * holdings in src/shared/data/own/*.ts over the public-domain relief (public/data/terrain/east-asia.webp, see
 * scripts/fetch-terrain.ts). See scripts/territory/gen.ts for the method and docs/data/territories.md.
 *
 *   node scripts/build-territories.ts            (npm run data:territories)
 *   node scripts/build-territories.ts --preview  also writes .territory-preview/<phase>.png for checking
 *   node scripts/build-territories.ts --try src/shared/data/own/tang.ts
 *       one era file on its own (not yet in own/index.ts): previews and .territory-preview/try-<era>.json only, nothing else
 *       written
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { POLITY } from '../src/shared/data/polities.ts';
import { STAGES } from '../src/shared/data/stage.ts';
import { ERAS_OWN } from '../src/shared/data/own/index.ts';
import { holderAt, type OwnEra, type Seat } from '../src/shared/data/own/types.ts';
import type { LonLat, Polity } from '../src/shared/data/types.ts';
import { encodeRing } from '../src/shared/lib/rings.ts';
import { allocateSeats, areas, cellLat, cellLon, despeckle, fillHoles, ringArea, simplify, smooth, trace, traceWhere, type CellBox, type Grid, type Source } from './territory/gen.ts';

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
const ringIndex = new Map<string, number>();
// unchanged outlines repeat from phase to phase: store each once
const ringId = (r: LonLat[]): number => { const e = encodeRing(r); let k = ringIndex.get(e); if (k === undefined) { k = rings.length; rings.push(e); ringIndex.set(e, k); } return k; };
const names: string[] = [];
const nameAt = new Map<string, number>();
const nameIndex = (n: { zh: string; en: string }): number => { const k = n.zh + '|' + n.en; let i = nameAt.get(k); if (i === undefined) { i = names.length / 2; names.push(n.zh, n.en); nameAt.set(k, i); } return i; };
type RawAdmin = [number, number, LonLat, number[]];
/** Unit kinds by the last character(s) of their name. */
const KIND: [RegExp, string, string][] = [
  [/都护府$/, '都护府', 'protectorate'], [/都督府$/, '都督府', 'area command'], [/都司$/, '都司', 'regional military command'],
  [/郡$/, '郡', 'commandery'], [/国$/, '王国', 'kingdom'], [/州$/, '州', 'prefecture'], [/府$/, '府', 'prefecture'], [/军$/, '军', 'military prefecture'],
  [/监$/, '监', 'industrial prefecture'], [/路$/, '路', 'circuit'], [/省$/, '省', 'province'], [/盟$/, '盟', 'league'], [/卫$/, '卫', 'guard'],
  [/镇$/, '镇', 'garrison'], [/厅$/, '厅', 'sub-prefecture'], [/道$/, '道', 'circuit'], [/(冯翊|扶风|京兆尹?)$/, '郡', 'commandery'],
];
/** A seat's unit: the 郡 / 州 / 府 … it is the seat of (named in brackets, as in 狄道（陇西郡）) or the seat itself. */
function unitOf(s: Seat): { name: { zh: string; en: string }; cat: { zh: string; en: string } } {
  const inner = /（([^）]+)）$/.exec(s.name.zh)?.[1];
  const named = inner && KIND.some(([re]) => re.test(inner)) ? inner : null;
  const zh = named ?? s.name.zh.replace(/（[^）]*）$/, '');
  const en = named ? (/\(([^)]+)\)$/.exec(s.name.en)?.[1] ?? s.name.en) : s.name.en.replace(/\s*\([^)]*\)$/, '');
  const k = KIND.find(([re]) => re.test(zh));
  return { name: { zh, en }, cat: k ? { zh: k[1], en: k[2] } : { zh: '治所辖区', en: 'seat and its land' } };
}
const snaps: Record<string, { p: [string, null, string | null, LonLat | null, number[]][]; g: RawAdmin[]; f: [] }> = {};
const meta: { replaces: string; phases: { id: string; from: number; to: number; title: unknown; note?: unknown; changes: [number, string, string | null, string | null, string?][]; cites: string[] }[]; sources: OwnEra['sources']; polities: Polity[] }[] = [];

for (const era of ERAS) {
  // polities defined by any of our eras (an era may reuse another's neighbours, e.g. 羌 or 百越)
  const extra = new Map([...ERAS_OWN, ...ERAS].flatMap(e => e.polities ?? []).map(p => [p.id, p]));
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
    const srcSeat: Seat[] = [];
    const now = new Map<string, string | null>();
    for (const s of era.seats) {
      const p = holderAt(era.holds[s.id], year);
      now.set(s.id, p);
      if (!p) continue;
      sources.push({ owner: idx(p), lon: s.at[0], lat: s.at[1], reach: s.r ?? era.reach, boost: s.b });
      srcSeat.push(s);
    }
    const { owner, seat } = allocateSeats(grid, sources);
    despeckle(grid, owner);
    fillHoles(grid, owner);
    const area = areas(grid, owner, list.length);
    const at = labels(grid, owner, list.length);
    const entry: (typeof snaps)[string]['p'] = [];
    // neighbours first, so the states are painted over them where the outlines touch
    const order = list.map((p, i) => i).sort((a, b) => Number(polity(list[a])!.role !== 'neighbor') - Number(polity(list[b])!.role !== 'neighbor'));
    for (const i of order) {
      const rs = trace(grid, owner, i).map(r => smooth(simplify(r, STEP * 1.0))).filter(r => ringArea(r) > 1);
      if (!rs.length) continue;
      // unchanged outlines repeat from phase to phase: store each once
      const ids = rs.map(ringId);
      const role = era.roles?.[list[i]] ?? null;
      entry.push([list[i], null, role, at[i], ids]);
    }
    // 政区: each seat's own share of its polity's land, named after the unit it is the seat of
    const units: RawAdmin[] = [];
    const box = sources.map((): CellBox => [Infinity, Infinity, -1, -1]);
    for (let c = 0; c < seat.length; c++) {
      const i = seat[c];
      if (i < 0 || owner[c] !== sources[i].owner) continue;
      const x = c % grid.w, y = (c - x) / grid.w, b = box[i];
      if (x < b[0]) b[0] = x; if (y < b[1]) b[1] = y; if (x > b[2]) b[2] = x; if (y > b[3]) b[3] = y;
    }
    sources.forEach((src, i) => {
      const role = era.roles?.[list[src.owner]] ?? polity(list[src.owner])!.role;
      if (role === 'neighbor' || box[i][2] < 0) return;
      const rs = traceWhere(grid, c => seat[c] === i && owner[c] === src.owner, box[i]).map(r => smooth(simplify(r, STEP * 1.2))).filter(r => ringArea(r) > 0.8);
      if (!rs.length) return;
      const u = unitOf(srcSeat[i]);
      units.push([nameIndex(u.name), nameIndex(u.cat), srcSeat[i].at, rs.map(ringId)]);
    });
    snaps[ph.id] = { p: entry, g: units, f: [] };
    // what changed since the previous phase, with sources (for the map's notes)
    const changes: [number, string, string | null, string | null, string?][] = [];
    if (prev) for (const s of era.seats) {
      const a = prev.get(s.id) ?? null, b = now.get(s.id) ?? null;
      if (a === b) continue;
      const h = era.holds[s.id].filter(([y]) => y <= year).at(-1);
      changes.push([h?.[0] ?? year, s.id, a, b, h?.[2]]);
    }
    prev = now;
    // the sources behind every holding drawn (not only this phase's changes), most cited first
    const count = new Map<string, number>();
    for (const s of era.seats) { const h = era.holds[s.id].filter(([y]) => y <= year).at(-1); if (h?.[1] && h[2] && h[2] !== 'est') count.set(h[2], (count.get(h[2]) ?? 0) + 1); }
    const cites = [...count].sort((a, b) => b[1] - a[1]).map(([k]) => k);
    phases.push({ id: ph.id, from: ph.from, to: ph.to, title: ph.title, note: ph.note, changes, cites });
    console.log(`${ph.id} (${year}): ${list.map((p, i) => `${polity(p)!.name.zh} ${Math.round(area[i])}`).join(' · ')}`);
    if (PREVIEW) await preview(grid, owner, list, id => polity(id)!.color, era.seats.map(s => [s.at, now.get(s.id) ? '#000000' : '#ff0000'] as [LonLat, string]), `.territory-preview/${ph.id}.png`);
  }
  meta.push({ replaces: era.replaces, phases, sources: era.sources, polities: era.polities ?? [] });
}

// the names of the seats a phase's changes mention, keyed per era (the same city has different names in different
// periods); only these ship in the app bundle
const named = new Set(meta.flatMap(e => e.phases.flatMap(p => p.changes.map(c => `${e.replaces}:${c[1]}`))));
const seatNames: Record<string, { zh: string; en: string }> = {};
for (const era of ERAS) for (const s of era.seats) { const k = `${era.replaces}:${s.id}`; if (named.has(k)) seatNames[k] = { zh: s.name.zh, en: s.name.en }; }

const shapes = JSON.stringify({
  source: { repo: 'own', sha: '', license: 'GPL-3.0 (own data, see docs/data/territories.md)' },
  rings, names, snaps, provinces: [], lakes: [],
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
