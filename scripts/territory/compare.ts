/**
 * QA only: compares one of our generated phases with another map on the same grid (per-polity cell counts and overlap,
 * IoU), and writes a side-by-side picture. Use it to find mistakes in seats and holdings; never copy shapes from the
 * other map (docs/data/territories.md).
 *
 *   node scripts/territory/compare.ts <their snapshot id> <our phase id> [our shapes file] [--wide]
 *   e.g. node scripts/territory/compare.ts s_tang_a o_tang_2 .territory-preview/try-tang.json --wide
 */
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { POLITY } from '../../src/shared/data/polities.ts';
import { decodeRing } from '../../src/shared/lib/rings.ts';

const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const [theirs, ours, ourFile = 'public/data/atlas/own.json'] = args;
const wide = process.argv.includes('--wide');
const box = wide ? { west: 60, north: 58, w: 820, h: 430 } : { west: 95, north: 46, w: 360, h: 260 };
const st = 0.1;
type Reg = { p: string; rings: [number, number][][] };
const load = (f: string, id: string): Reg[] => {
  const r = JSON.parse(readFileSync(f, 'utf8'));
  if (!r.snaps[id]) throw new Error(`${f}: no ${id}`);
  return r.snaps[id].p.map(([p, , , , rs]: [string, unknown, unknown, unknown, number[]]) => ({ p, rings: rs.map(i => decodeRing(r.rings[i]) as [number, number][]) }));
};
const nameOf = (id: string) => POLITY.get(id)?.name.zh ?? id;
const inside = (rings: [number, number][][], x: number, y: number) => {
  let c = false;
  for (const r of rings) for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i], [xj, yj] = r[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
const raster = (regs: Reg[]) => {
  const o: string[] = new Array(box.w * box.h).fill('');
  for (let y = 0; y < box.h; y++) for (let x = 0; x < box.w; x++) {
    const lon = box.west + (x + 0.5) * st, lat = box.north - (y + 0.5) * st;
    for (let k = regs.length - 1; k >= 0; k--) if (inside(regs[k].rings, lon, lat)) { o[y * box.w + x] = nameOf(regs[k].p); break; }
  }
  return o;
};
const A = raster(load('public/data/atlas/shapes.json', theirs)), B = raster(load(ourFile, ours));
const rows: [number, string][] = [];
for (const n of new Set([...A, ...B].filter(Boolean))) {
  let a = 0, b = 0, both = 0;
  for (let i = 0; i < A.length; i++) { const x = A[i] === n, y = B[i] === n; if (x) a++; if (y) b++; if (x && y) both++; }
  if (a + b > 30) rows.push([a + b, `${n}\tthem ${a}\tus ${b}\tIoU ${(both / (a + b - both)).toFixed(2)}`]);
}
console.log(rows.sort((x, y) => y[0] - x[0]).map(r => r[1]).join('\n'));
const col = (n: string): number[] => {
  for (const p of POLITY.values()) if (p.name.zh === n) { const v = parseInt(p.color.slice(1), 16); return [v >> 16, (v >> 8) & 255, v & 255]; }
  if (!n) return [240, 236, 226];
  let h = 0; for (const ch of n) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return [80 + (h & 127), 80 + ((h >> 7) & 127), 80 + ((h >> 14) & 127)];
};
const px = Buffer.alloc(box.w * box.h * 3 * 2);
for (let y = 0; y < box.h; y++) for (let x = 0; x < box.w; x++) {
  px.set(col(A[y * box.w + x]), (y * box.w * 2 + x) * 3);
  px.set(col(B[y * box.w + x]), (y * box.w * 2 + box.w + x) * 3);
}
const out = `.territory-preview/cmp-${ours}.png`;
await sharp(px, { raw: { width: box.w * 2, height: box.h, channels: 3 } }).resize(box.w * (wide ? 2 : 4), box.h * (wide ? 1 : 2), { kernel: 'nearest' }).png().toFile(out);
console.log(`left: ${theirs} · right: ${ours} → ${out}`);
