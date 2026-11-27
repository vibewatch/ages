import type { LonLat } from '../data/types.ts';

/**
 * 画疆域 — scoring a border drawn from memory. The learner's outline (a closed ring of clicked points) is compared with
 * where the polity is painted on top in the snapshot, by sampling a grid weighted for latitude: the overlap is the
 * intersection over the union (IoU) of the two areas, 0–1.
 */
export interface DrawRegion { polity: string; rings: LonLat[][]; evenodd?: boolean }

/** Even-odd point-in-polygon over all rings (holes included). */
export function inside(rings: LonLat[][], x: number, y: number): boolean {
  let c = false;
  for (const r of rings) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [xi, yi] = r[i], [xj, yj] = r[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
  }
  return c;
}

/** The polity painted on top at lon/lat (later regions cover earlier ones). */
export function ownerAt(regions: DrawRegion[], x: number, y: number): string | null {
  for (let i = regions.length - 1; i >= 0; i--) {
    const r = regions[i];
    if (r.evenodd ? inside(r.rings, x, y) : r.rings.some(ring => inside([ring], x, y))) return r.polity;
  }
  return null;
}

type Box = [number, number, number, number];
const boxOf = (rings: LonLat[][]): Box => {
  const b: Box = [Infinity, Infinity, -Infinity, -Infinity];
  for (const r of rings) for (const [x, y] of r) { b[0] = Math.min(b[0], x); b[1] = Math.min(b[1], y); b[2] = Math.max(b[2], x); b[3] = Math.max(b[3], y); }
  return b;
};

export interface Overlap {
  /** intersection over union, 0–1 */
  iou: number;
  /** share of the real territory the outline covers */
  cover: number;
  /** share of the outline that is the real territory */
  precise: number;
}

/** How well `outline` matches `polity` in `regions`; `step` is the grid in degrees. */
export function overlap(outline: LonLat[], regions: DrawRegion[], polity: string, step = 0.5): Overlap {
  const none = { iou: 0, cover: 0, precise: 0 };
  if (outline.length < 3) return none;
  const own = regions.filter(r => r.polity === polity);
  if (!own.length) return none;
  const a = boxOf([outline]), b = boxOf(own.flatMap(r => r.rings));
  const x0 = Math.min(a[0], b[0]), y0 = Math.min(a[1], b[1]), x1 = Math.max(a[2], b[2]), y1 = Math.max(a[3], b[3]);
  // keep the grid bounded for huge outlines
  const s = Math.max(step, Math.sqrt(((x1 - x0) * (y1 - y0)) / 40000));
  let u = 0, p = 0, both = 0;
  for (let y = y0 + s / 2; y < y1; y += s) {
    const w = Math.cos((y * Math.PI) / 180);
    for (let x = x0 + s / 2; x < x1; x += s) {
      const inU = inside([outline], x, y);
      const inP = x >= b[0] && x <= b[2] && y >= b[1] && y <= b[3] && ownerAt(regions, x, y) === polity;
      if (inU) u += w;
      if (inP) p += w;
      if (inU && inP) both += w;
    }
  }
  const union = u + p - both;
  return union > 0 ? { iou: both / union, cover: p ? both / p : 0, precise: u ? both / u : 0 } : none;
}

export type DrawGrade = 'correct' | 'close' | 'wrong';
/** Drawn from memory on a bare relief map, half the area right is good. */
export const gradeDraw = (iou: number): DrawGrade => (iou >= 0.5 ? 'correct' : iou >= 0.3 ? 'close' : 'wrong');
