/**
 * The modern reference shapes in public/data/atlas/shapes.json, from Natural Earth (public domain,
 * https://www.naturalearthdata.com/): the province-level outlines for the "modern borders" overlay, lakes (with the
 * years historical waters existed), and the precise outlines of our PRC maps (`x_prc1950`, `x_prc2000`). The country
 * outline follows Natural Earth's China point of view (ne_10m_admin_0_countries_chn), as the national textbook map
 * does; no maritime lines are drawn (ADR-009). Two lakes long gone — 云梦泽 and 巨野泽 — are our own sketches.
 *
 *   node scripts/build-basemap.ts      (npm run data:basemap; downloads are cached in .basemap-cache/)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import pc from 'polygon-clipping';
import type { LonLat } from '../src/shared/data/types.ts';
import { encodeRing } from '../src/shared/lib/rings.ts';
import { simplify } from './territory/gen.ts';

const NE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/';
const CACHE = '.basemap-cache';
mkdirSync(CACHE, { recursive: true });

type Geom = { type: 'Polygon'; coordinates: number[][][] } | { type: 'MultiPolygon'; coordinates: number[][][][] };
interface Feature { properties: Record<string, unknown>; geometry: Geom | null }

async function layer(name: string): Promise<Feature[]> {
  const f = `${CACHE}/${name}.geojson`;
  if (!existsSync(f)) {
    const r = await fetch(NE + name + '.geojson');
    if (!r.ok) throw new Error(`${name}: ${r.status}`);
    writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  }
  return (JSON.parse(readFileSync(f, 'utf8')) as { features: Feature[] }).features;
}

const mp = (g: Geom | null): pc.MultiPolygon => (!g ? [] : g.type === 'Polygon' ? [g.coordinates as pc.Polygon] : (g.coordinates as pc.MultiPolygon));
const union = (list: pc.MultiPolygon[]): pc.MultiPolygon => (list.length ? pc.union(list[0], ...list.slice(1)) : []);
const prop = (f: Feature, k: string) => String(f.properties[k] ?? f.properties[k.toUpperCase()] ?? '');

/** Area of a multipolygon, thousand km² (sinusoidal). */
function mpArea(m: pc.MultiPolygon): number {
  const ring = (r: pc.Ring) => {
    let a = 0;
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const k = Math.PI / 180;
      a += r[j][0] * Math.cos(r[j][1] * k) * r[i][1] - r[i][0] * Math.cos(r[i][1] * k) * r[j][1];
    }
    return Math.abs(a / 2) * 111.32 * 111.32 / 1000;
  };
  return m.reduce((s, poly) => s + poly.reduce((t, r, i) => t + (i ? -1 : 1) * ring(r), 0), 0);
}

// --------------------------------------------------------------- store

const rings: string[] = [];
const names: string[] = [];
const ringIds = (m: pc.MultiPolygon, tol = 0.02): number[] => m.flatMap(poly => poly.map(r => {
  const s = simplify(r.slice(0, -1) as LonLat[], tol);
  if (s.length < 3) return -1;
  rings.push(encodeRing(s));
  return rings.length - 1;
})).filter(i => i >= 0);
const nameId = (zh: string, en: string) => { names.push(zh, en); return names.length / 2 - 1; };

// --------------------------------------------------------------- countries

const chnPov = await layer('ne_10m_admin_0_countries_chn');
const world = await layer('ne_10m_admin_0_countries');
const country = (fs: Feature[], a3: string) => union(fs.filter(f => prop(f, 'ADM0_A3') === a3).map(f => mp(f.geometry)));
const hk = country(world, 'HKG'), mo = country(world, 'MAC'), mongolia = country(world, 'MNG');
// China's point of view: the mainland with Taiwan, 藏南 and 阿克赛钦; the SARs added
const china = union([country(chnPov, 'CHN'), country(chnPov, 'TWN'), hk, mo]);
console.log(`China ${Math.round(mpArea(china))}k km², Mongolia ${Math.round(mpArea(mongolia))}k km²`);
const chinaLess = pc.difference(china, hk, mo);

// --------------------------------------------------------------- provinces

/** Province-level units: name (zh, en) by Natural Earth's adm1 name, and the seat of government. */
const SEAT: Record<string, [string, string, number, number]> = {
  Beijing: ['北京市', 'Beijing', 116.4, 39.9], Tianjin: ['天津市', 'Tianjin', 117.2, 39.13], Hebei: ['河北省', 'Hebei', 114.5, 38.04],
  Shanxi: ['山西省', 'Shanxi', 112.55, 37.87], 'Inner Mongol': ['内蒙古自治区', 'Inner Mongolia', 111.75, 40.84],
  Liaoning: ['辽宁省', 'Liaoning', 123.43, 41.8], Jilin: ['吉林省', 'Jilin', 125.32, 43.82], Heilongjiang: ['黑龙江省', 'Heilongjiang', 126.53, 45.8],
  Shanghai: ['上海市', 'Shanghai', 121.47, 31.23], Jiangsu: ['江苏省', 'Jiangsu', 118.78, 32.06], Zhejiang: ['浙江省', 'Zhejiang', 120.15, 30.27],
  Anhui: ['安徽省', 'Anhui', 117.23, 31.82], Fujian: ['福建省', 'Fujian', 119.3, 26.08], Jiangxi: ['江西省', 'Jiangxi', 115.86, 28.68],
  Shandong: ['山东省', 'Shandong', 117.0, 36.65], Henan: ['河南省', 'Henan', 113.62, 34.75], Hubei: ['湖北省', 'Hubei', 114.3, 30.6],
  Hunan: ['湖南省', 'Hunan', 112.94, 28.23], Guangdong: ['广东省', 'Guangdong', 113.26, 23.13], Guangxi: ['广西壮族自治区', 'Guangxi', 108.37, 22.82],
  Hainan: ['海南省', 'Hainan', 110.33, 20.03], Chongqing: ['重庆市', 'Chongqing', 106.55, 29.56], Sichuan: ['四川省', 'Sichuan', 104.07, 30.67],
  Guizhou: ['贵州省', 'Guizhou', 106.71, 26.58], Yunnan: ['云南省', 'Yunnan', 102.71, 25.04], Xizang: ['西藏自治区', 'Tibet', 91.13, 29.65],
  Shaanxi: ['陕西省', 'Shaanxi', 108.94, 34.26], Gansu: ['甘肃省', 'Gansu', 103.83, 36.06], Qinghai: ['青海省', 'Qinghai', 101.78, 36.62],
  Ningxia: ['宁夏回族自治区', 'Ningxia', 106.23, 38.49], Xinjiang: ['新疆维吾尔自治区', 'Xinjiang', 87.62, 43.83],
  Taiwan: ['台湾省', 'Taiwan', 121.5, 25.05], 'Hong Kong': ['香港特别行政区', 'Hong Kong', 114.17, 22.28], Macao: ['澳门特别行政区', 'Macao', 113.54, 22.19],
};
const adm1 = await layer('ne_10m_admin_1_states_provinces');
const byProv = new Map<string, pc.MultiPolygon[]>();
const key = (f: Feature): string | null => {
  const a3 = prop(f, 'adm0_a3');
  if (a3 === 'TWN') return 'Taiwan';
  if (a3 === 'HKG') return 'Hong Kong';
  if (a3 === 'MAC') return 'Macao';
  if (a3 !== 'CHN') return null;
  const n = prop(f, 'name');
  return Object.keys(SEAT).find(k => n.startsWith(k) || prop(f, 'name_en').startsWith(k) || prop(f, 'gn_name').startsWith(k)) ?? null;
};
for (const f of adm1) {
  const k = key(f);
  if (!k) continue;
  (byProv.get(k) ?? byProv.set(k, []).get(k)!).push(mp(f.geometry));
}
const missing = Object.keys(SEAT).filter(k => !byProv.has(k));
if (missing.length) throw new Error(`provinces not found in Natural Earth: ${missing.join(', ')}`);
const prov = new Map([...byProv].map(([k, v]) => [k, pc.intersection(union(v), china)]));
// land inside the country outline but in no province (藏南, slivers along the coast and borders) joins its neighbour
const rest = pc.difference(china, ...prov.values());
for (const poly of rest) {
  const piece: pc.MultiPolygon = [poly];
  if (mpArea(piece) < 0.3) continue;
  const [cx, cy] = poly[0].reduce(([x, y], [a, b]) => [x + a / poly[0].length, y + b / poly[0].length], [0, 0]);
  let best = '', bd = Infinity;
  for (const [k, m] of prov) for (const p of m) for (const [x, y] of p[0]) { const d = (x - cx) ** 2 + (y - cy) ** 2; if (d < bd) { bd = d; best = k; } }
  prov.set(best, pc.union(prov.get(best)!, piece));
  console.log(`  ${Math.round(mpArea(piece))}k km² unassigned land → ${best}`);
}
const provinces = [...prov].map(([k, m]) => { const [zh, en, lon, lat] = SEAT[k]; return [nameId(zh, en), [lon, lat] as LonLat, ringIds(m, 0.015)] as const; });

// --------------------------------------------------------------- lakes

/** Years historical waters existed (lakes not listed are timeless). */
const DATED: Record<string, [number | null, number | null]> = {
  'Hongze Hu': [1194, null], 'Weishan Hu': [1560, null], 'Lop Nur': [null, 1972],
};
const lakes: [string, number, number | null, number | null, number[]][] = [];
const inWindow = (m: pc.MultiPolygon) => m.some(p => p[0].some(([x, y]) => x > 60 && x < 150 && y > 0 && y < 60));
for (const f of [...await layer('ne_10m_lakes'), ...await layer('ne_10m_lakes_historic')]) {
  const m = mp(f.geometry);
  if (!inWindow(m)) continue;
  const rank = Number(f.properties.scalerank ?? 9);
  const name = prop(f, 'name');
  if (rank > 6 && !DATED[name]) continue;
  const [from, to] = DATED[name] ?? [null, null];
  lakes.push([name, Math.max(1, Math.min(6, rank || 1)), from, to, ringIds(m, 0.01)]);
}
// our own sketches of two vanished lakes: 云梦泽 on the Jianghan plain (gone by the Sui), 巨野泽 / 梁山泊 below Mount Liang
const sketch = (cx: number, cy: number, rx: number, ry: number, wob: number[]): pc.MultiPolygon => {
  const r: pc.Ring = wob.map((w, i) => { const a = (i / wob.length) * Math.PI * 2; return [cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w] as [number, number]; });
  r.push(r[0]);
  return [[r]];
};
lakes.push(['Yunmeng Ze', 2, null, 600, ringIds(sketch(113.3, 30.25, 0.75, 0.32, [1, 0.9, 1.1, 0.8, 1, 1.15, 0.85, 1, 0.95, 1.1, 0.9, 1]), 0.005)]);
lakes.push(['Juye Ze', 2, null, 1280, ringIds(sketch(116.05, 35.65, 0.28, 0.2, [1, 0.85, 1.1, 0.9, 1.05, 0.95, 1, 0.9, 1.1, 0.95]), 0.005)]);

// --------------------------------------------------------------- PRC maps

const snaps = {
  x_prc1950: { p: [['mongolia', null, null, null, ringIds(mongolia)], ['prc', null, null, null, ringIds(chinaLess)], ['colony_uk', null, null, null, ringIds(hk, 0.004)], ['colony_pt', null, null, null, ringIds(mo, 0.002)]], g: [], f: [] },
  x_prc2000: { p: [['mongolia', null, null, null, ringIds(mongolia)], ['prc', null, null, null, ringIds(china)]], g: [], f: [] },
};

const out = {
  source: { repo: 'Natural Earth (public domain)', sha: '', license: 'public domain (Natural Earth); 云梦泽 / 巨野泽 sketches GPL-3.0' },
  rings, names, snaps, provinces, lakes,
};
writeFileSync('public/data/atlas/shapes.json', JSON.stringify(out));
console.log(`shapes.json: ${provinces.length} provinces, ${lakes.length} lakes, ${rings.length} rings, ${(JSON.stringify(out).length / 1024).toFixed(0)} KB`);
