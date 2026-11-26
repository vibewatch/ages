import { formatArea, realmArea, snapPolities } from '../data/areas.ts';
import { POLITY } from '../data/polities.ts';
import { SNAPSHOTS } from '../data/territories.ts';
import type { Era, I18n, Polity, Snapshot, Year } from '../data/types.ts';
import { CHAPTERS, phaseAt } from './chronicle.ts';
import { eraAt, formatYear } from './timeline.ts';

/**
 * 读图题 — map-reading questions (时空观念). The map is shown without its names (headline, year, timeline, polity and
 * place labels, models), and the learner reads it:
 * - `period`: which period is this map?
 * - `polity`: which polity is highlighted? (the year is given)
 * - `first`: which of two maps, A or B, is earlier?
 * Every question is generated from the territory snapshots, so it is always true to the map shown.
 */
export type MapKind = 'period' | 'polity' | 'first';
export interface MapQuestion {
  type: 'map';
  kind: MapKind;
  /** mistake key: `map:<kind>:<snap>[:<polity or second snap>]` */
  key: string;
  /** the year(s) to show: one map, or maps A and B */
  years: Year[];
  /** the polity to highlight (`polity` questions) */
  polity?: string;
  prompt: I18n;
  options: I18n[];
  answer: number;
  why: I18n;
}

const both = (f: (l: 'zh' | 'en') => string): I18n => ({ zh: f('zh'), en: f('en') });

function rng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function shuffle<T>(a: T[], r: () => number): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const pick = <T>(a: T[], r: () => number): T => a[Math.floor(r() * a.length)];

/** The eras that have a territory map (夏 onwards), in order. */
export const MAP_ERAS: Era[] = CHAPTERS.filter(e => e.start >= -2070);

/** A snapshot that is the map of its own phase, with the phase's years. */
interface MapSnap { snap: Snapshot; era: Era; from: Year; to: Year; mid: Year }
const SNAPS: MapSnap[] = SNAPSHOTS.flatMap(s => {
  if (s.scope !== 'china') return [];
  const ph = phaseAt(s.year);
  const era = eraAt(s.year, CHAPTERS);
  if (!ph || ph.snap !== s || !era || era.start < -2070) return [];
  return [{ snap: s, era, from: ph.from, to: ph.to, mid: Math.round((ph.from + ph.to) / 2) }];
});
const SNAP = new Map(SNAPS.map(x => [x.snap.id, x]));
const byEra = (id: string) => SNAPS.filter(x => x.era.id === id);

const span = (x: MapSnap, l: 'zh' | 'en') => `${formatYear(x.from, l)} – ${formatYear(x.to, l)}`;

/** The polities of Chinese history on a map, largest first, big enough to see at a glance. */
function onMap(x: MapSnap): { p: Polity; k: number }[] {
  return snapPolities(x.snap.id)
    .map(([id, k]) => ({ p: POLITY.get(id)!, k }))
    .filter(o => o.p && o.p.role !== 'neighbor' && o.k >= 50)
    .sort((a, b) => b.k - a.k);
}

/** Four options with `right` among them, no two with the same name. */
function options(right: I18n, wrong: I18n[], r: () => number): { options: I18n[]; answer: number } | null {
  const seen = new Set([right.zh]);
  const picks = shuffle(wrong, r).filter(w => !seen.has(w.zh) && seen.add(w.zh)).slice(0, 3);
  if (picks.length < 3) return null;
  const opts = shuffle([right, ...picks], r);
  return { options: opts, answer: opts.indexOf(right) };
}

/** Which period is this map? Wrong options are eras near it in time, so the borders have to be read. */
function periodQuestion(x: MapSnap, r: () => number): MapQuestion | null {
  const i = MAP_ERAS.indexOf(x.era);
  const near = MAP_ERAS.filter((_, j) => j !== i && Math.abs(j - i) <= 4).map(e => e.name);
  const o = options(x.era.name, near, r);
  if (!o) return null;
  const k = realmArea(x.snap.id);
  return {
    type: 'map', kind: 'period', key: `map:period:${x.snap.id}`, years: [x.mid], ...o,
    prompt: both(l => (l === 'zh' ? '读图：这幅地图表现的是哪个时期？' : 'Read the map: which period does it show?')),
    why: both(l => (l === 'zh'
      ? `这是${x.era.name.zh}时期的地图（${span(x, l)}）${k ? `，疆域${formatArea(k, l)}` : ''}。`
      : `This is the map of ${x.era.name.en} (${span(x, l)})${k ? `, ${formatArea(k, l)}` : ''}.`)),
  };
}

/** Which polity is highlighted? The year is given; wrong options are others on the same map, then from nearby times. */
function polityQuestion(x: MapSnap, r: () => number, polity?: string): MapQuestion | null {
  const here = onMap(x);
  const target = polity ? here.find(o => o.p.id === polity) : pick(here.slice(0, 4), r);
  if (!target) return null;
  const same = here.filter(o => o.p.id !== target.p.id).map(o => o.p.name);
  const nearby = SNAPS.filter(s => s !== x && Math.abs(s.mid - x.mid) <= 300).flatMap(s => onMap(s).map(o => o.p.name));
  // same-map names first: telling neighbours apart is the skill
  const wrong = [...shuffle(same, r).slice(0, 2), ...shuffle(nearby, r)];
  const seen = new Set([target.p.name.zh]);
  const picks = wrong.filter(w => !seen.has(w.zh) && seen.add(w.zh)).slice(0, 3);
  if (picks.length < 3) return null;
  const opts = shuffle([target.p.name, ...picks], r);
  return {
    type: 'map', kind: 'polity', key: `map:polity:${x.snap.id}:${target.p.id}`, years: [x.mid], polity: target.p.id,
    options: opts, answer: opts.indexOf(target.p.name),
    prompt: both(l => (l === 'zh' ? `读图：${formatYear(x.mid, l)}的地图上，高亮的政权是？` : `Read the map: in ${formatYear(x.mid, l)}, which polity is highlighted?`)),
    why: both(l => (l === 'zh'
      ? `高亮的是${target.p.name.zh}，${formatArea(target.k, l)}（${x.era.name.zh}时期）。`
      : `It is ${target.p.name.en}, ${formatArea(target.k, l)} (${x.era.name.en}).`)),
  };
}

/** Which of two maps is earlier? Two different eras a few chapters apart. */
function firstQuestion(a: MapSnap, b: MapSnap): MapQuestion {
  const A = both(l => (l === 'zh' ? '地图 A 更早' : 'Map A is earlier'));
  const B = both(l => (l === 'zh' ? '地图 B 更早' : 'Map B is earlier'));
  return {
    type: 'map', kind: 'first', key: `map:first:${a.snap.id}:${b.snap.id}`, years: [a.mid, b.mid],
    options: [A, B], answer: a.mid < b.mid ? 0 : 1,
    prompt: both(l => (l === 'zh' ? '读图：比较地图 A 和 B，哪一幅更早？' : 'Read the maps: compare A and B — which is earlier?')),
    why: both(l => (l === 'zh'
      ? `A 是${a.era.name.zh}（${formatYear(a.mid, l)}），B 是${b.era.name.zh}（${formatYear(b.mid, l)}）。`
      : `A is ${a.era.name.en} (${formatYear(a.mid, l)}); B is ${b.era.name.en} (${formatYear(b.mid, l)}).`)),
  };
}

function firstPair(r: () => number, eras: Era[]): MapQuestion | null {
  for (let guard = 0; guard < 20; guard++) {
    const ea = pick(eras, r);
    const i = MAP_ERAS.indexOf(ea);
    const near = (list: Era[]) => list.filter(e => e !== ea && Math.abs(MAP_ERAS.indexOf(e) - i) <= 5 && byEra(e.id).length);
    // within the round's eras where it has more than one, else the neighbouring ones
    const others = near(eras).length ? near(eras) : near(MAP_ERAS);
    if (!others.length || !byEra(ea.id).length) continue;
    const a = pick(byEra(ea.id), r), b = pick(byEra(pick(others, r).id), r);
    if (Math.abs(a.mid - b.mid) < 50) continue;
    return firstQuestion(a, b);
  }
  return null;
}

/**
 * A round of map-reading questions, cycling period → polity → first, one era at a time so every period is met
 * (optionally only the years `range`, for a chapter).
 */
export function makeMapQuiz(opts: { n?: number; seed?: number; range?: [Year, Year] } = {}): MapQuestion[] {
  const r = rng(opts.seed ?? Date.now());
  const n = opts.n ?? 9;
  const [lo, hi] = opts.range ?? [-Infinity, Infinity];
  const eras = MAP_ERAS.filter(e => e.end >= lo && e.start <= hi && byEra(e.id).some(x => x.mid >= lo && x.mid <= hi));
  if (!eras.length) return [];
  const out: MapQuestion[] = [];
  const used = new Set<string>();
  let order = shuffle(eras, r);
  for (let i = 0, guard = 0; out.length < n && guard < n * 10; guard++) {
    if (!order.length) order = shuffle(eras, r);
    const era = order.pop()!;
    const snaps = byEra(era.id).filter(x => x.mid >= lo && x.mid <= hi);
    if (!snaps.length) continue;
    const x = pick(snaps, r);
    const kind: MapKind = (['period', 'polity', 'first'] as const)[i % 3];
    const q = kind === 'period' ? periodQuestion(x, r) : kind === 'polity' ? polityQuestion(x, r) : firstPair(r, eras);
    if (!q || used.has(q.key)) continue;
    used.add(q.key);
    out.push(q);
    i++;
  }
  return out;
}

/** Rebuilds a missed map question from its mistake key (`map:<kind>:<snap>[:<polity or snap>]`). */
export function mapQuestionFromKey(key: string, seed = 1): MapQuestion | null {
  const [tag, kind, a, b] = key.split(':');
  if (tag !== 'map') return null;
  const x = SNAP.get(a);
  if (!x) return null;
  const r = rng(seed);
  if (kind === 'period') return periodQuestion(x, r);
  if (kind === 'polity') return polityQuestion(x, r, b);
  const y = b ? SNAP.get(b) : undefined;
  return kind === 'first' && y ? firstQuestion(x, y) : null;
}
