import { formatArea, snapPolities } from '../data/areas.ts';
import { ERAS } from '../data/eras.ts';
import { LESSON, LESSONS } from '../data/lessons/index.ts';
import { PLACE, mapName } from '../data/places.ts';
import { POLITY } from '../data/polities.ts';
import type { Book, HistEvent, I18n, Place, Snapshot, Year } from '../data/types.ts';
import { SNAPSHOTS } from '../data/territories.ts';
import { CHAPTERS, CHRONICLE, phaseAt, type Phase } from './chronicle.ts';
import { eraAt, formatYear } from './timeline.ts';

export type Question =
  | { type: 'when'; key?: string; event: string; prompt: I18n; options: number[]; answer: number }
  | { type: 'where'; key?: string; event: string; prompt: I18n; lon: number; lat: number }
  | { type: 'order'; key?: string; events: string[]; prompt: I18n; answer: string[] }
  | { type: 'choice'; key?: string; event?: string; prompt: I18n; options: I18n[]; answer: number; why: I18n }
  | { type: 'locate'; place: string; year: Year; name: I18n; prompt: I18n; hint?: I18n; lon: number; lat: number };

/** Small seeded PRNG so a quiz can be reproduced from its seed (and tested deterministically). */
export function rng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}
function shuffle<T>(a: T[], r: () => number): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Plausible wrong years: nearby, distinct, and on the same side of the BCE/CE line where possible. */
function distractors(y: number, r: () => number): number[] {
  const span = y <= -10000 ? Math.max(5000, Math.round(Math.abs(y) * 0.4)) : y < -1000 ? 300 : y < 0 ? 120 : y < 1800 ? 90 : 12;
  const out = new Set<number>();
  let guard = 0;
  while (out.size < 3 && guard++ < 100) {
    let d = Math.round((r() * 2 - 1) * span);
    if (Math.abs(d) < span / 8) continue;
    if (span >= 5000) d = Math.round(d / 1000) * 1000 || 1000;
    else if (span > 50) d = Math.round(d / 5) * 5 || 5;
    const c = y + d;
    if (c !== y && c !== 0 && (y < 0) === (c < 0)) out.add(c);
  }
  return [...out];
}

const LANE_ERA_RE: Record<string, RegExp> = {
  liao: /契丹|辽|耶律|澶渊|燕云/,
  xixia: /西夏|党项|元昊|兴庆/,
  jin: /女真|金朝|金军|完颜|阿骨打|靖康|岳飞|绍兴和议/,
};

/** Builds a quiz from curriculum events (optionally restricted to a textbook or dynasty/era), mixing question types. */
export function makeQuiz(events: HistEvent[], opts: { n?: number; seed?: number; book?: Book; era?: string } = {}): Question[] {
  const r = rng(opts.seed ?? Date.now());
  const eraObj = opts.era ? ERAS.find(x => x.id === opts.era) : undefined;
  const minYear = eraObj ? eraObj.start : -9_999;
  const inEra = (e: HistEvent) => !eraObj || (
    e.year >= eraObj.start &&
    e.year <= eraObj.end &&
    (!eraObj.lane || (LANE_ERA_RE[eraObj.id]?.test(e.title.zh + e.summary.zh) ?? true))
  );
  let pool = events.filter(e => e.weight <= 2 && e.year >= minYear && (!opts.book || e.curriculum.some(c => c.book === opts.book)) && inEra(e));
  if (eraObj && pool.length < 3) {
    pool = events.filter(e => e.scope === 'china' && e.year >= minYear && (!opts.book || e.curriculum.some(c => c.book === opts.book)) && inEra(e));
  }
  if (!pool.length && opts.book && eraObj) {
    pool = events.filter(e => e.scope === 'china' && e.year >= minYear && inEra(e));
  }
  const picks = shuffle(pool, r).slice(0, opts.n ?? 8);
  return picks.map((e, i): Question => {
    const kind = i % 3;
    if (kind === 1) {
      return { type: 'where', event: e.id, lon: e.lon, lat: e.lat, prompt: { zh: `在地图上找到「${e.title.zh}」的发生地`, en: `Find where “${e.title.en}” happened` } };
    }
    // every pair at least 4 years apart, so the order is never a tie
    const chosen = [e];
    if (kind === 2) for (const x of shuffle(pool, r)) {
      if (chosen.length === 4) break;
      if (chosen.every(c => Math.abs(c.year - x.year) > 3)) chosen.push(x);
    }
    if (chosen.length === 4) {
      const set = shuffle(chosen, r);
      return { type: 'order', events: set.map(x => x.id), answer: set.slice().sort((a, b) => a.year - b.year).map(x => x.id),
        prompt: { zh: '按时间先后排列这些事件', en: 'Put these events in time order' } };
    }
    return { type: 'when', event: e.id, answer: e.year, options: shuffle([e.year, ...distractors(e.year, r)], r),
      prompt: { zh: `「${e.title.zh}」发生在哪一年？`, en: `When did “${e.title.en}” happen?` } };
  });
}

/** Builds a targeted mistake-review quiz from missed question keys (`when:`, `where:`, `order:`, `choice:` or legacy event IDs) without inflating normal quiz/lesson scores. */
export function makeMistakeQuiz(events: HistEvent[], mistakeIds: Iterable<string>, seed = Date.now()): Question[] {
  const r = rng(seed);
  const byId = new Map(events.map(e => [e.id, e]));
  const orderPool = events.filter(e => e.weight <= 2 && e.year > -10_000);
  const out: Question[] = [];

  for (const raw of mistakeIds) {
    if (!raw) continue;
    if (raw.startsWith('where:')) {
      const id = raw.slice(6);
      const e = byId.get(id);
      if (e) {
        out.push({
          type: 'where',
          key: raw,
          event: e.id,
          lon: e.lon,
          lat: e.lat,
          prompt: { zh: `【错题复习】在地图上找到「${e.title.zh}」的发生地`, en: `[Review] Find where “${e.title.en}” happened` },
        });
        continue;
      }
      const p = PLACE.get(id);
      if (p) {
        out.push({
          type: 'where',
          key: raw,
          event: p.id,
          lon: p.lon,
          lat: p.lat,
          prompt: { zh: `【错题复习】在地图上找到「${p.name.zh}」的位置`, en: `[Review] Find “${p.name.en}” on the map` },
        });
      }
      continue;
    }

    if (raw.startsWith('order:')) {
      const ids = raw.slice(6).split(',').map(s => s.trim()).filter(Boolean);
      const chosen = ids.map(id => byId.get(id)).filter((x): x is HistEvent => !!x);
      if (chosen.length === 1) {
        for (const x of shuffle(orderPool, r)) {
          if (chosen.every(c => Math.abs(c.year - x.year) > 3)) {
            chosen.push(x);
            if (chosen.length >= 4) break;
          }
        }
      }
      if (chosen.length >= 2) {
        const answer = chosen.slice().sort((a, b) => a.year - b.year).map(x => x.id);
        let set = shuffle(chosen, r).map(x => x.id);
        if (set.length > 1 && set.every((id, idx) => id === answer[idx])) set = [...set.slice(1), set[0]];
        out.push({
          type: 'order',
          key: raw,
          events: set,
          answer,
          prompt: { zh: '【错题复习】按时间先后排列这些事件', en: '[Review] Put these events in time order' },
        });
      }
      continue;
    }

    if (raw.startsWith('choice:')) {
      const rest = raw.slice(7);
      const sep = rest.indexOf(':');
      let check = sep > 0 ? LESSON.get(rest.slice(0, sep))?.checks[Number(rest.slice(sep + 1))] : undefined;
      if (!check && sep < 0) {
        for (const l of LESSONS) {
          const found = l.checks.find(c => 'q' in c && c.ev === rest);
          if (found) { check = found; break; }
        }
      }
      if (check && 'q' in check) {
        out.push({
          type: 'choice',
          key: raw,
          event: check.ev,
          prompt: { zh: `【错题复习】${check.q.zh}`, en: `[Review] ${check.q.en}` },
          options: check.options,
          answer: check.answer,
          why: check.why,
        });
        continue;
      }
    }

    const id = raw.startsWith('when:') ? raw.slice(5) : raw.startsWith('choice:') ? raw.slice(7) : raw;
    const e = byId.get(id);
    if (!e) continue;
    out.push({
      type: 'when',
      key: raw,
      event: e.id,
      answer: e.year,
      options: shuffle([e.year, ...distractors(e.year, r)], r),
      prompt: { zh: `【错题复习】「${e.title.zh}」发生在哪一年？`, en: `[Review] When did “${e.title.en}” happen?` },
    });
  }

  return out;
}

/** Great-circle distance in km, used to grade "where" answers (within 300 km is correct, 800 km is close). */
export function distKm(a: [number, number], b: [number, number]): number {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b[1] - a[1]) * rad, dLon = (b[0] - a[0]) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
export const gradeWhere = (km: number): 'correct' | 'close' | 'wrong' => (km <= 300 ? 'correct' : km <= 800 ? 'close' : 'wrong');

/**
 * The place-finding challenge (古地名定位): an ancient name in its period, e.g. "唐代的「益州」在哪里？", answered by a
 * click on the map. Modern names are never given away; a period note (唐都 · 百万人口国际都会) is the only hint.
 */
export function makeLocateQuiz(places: Place[], opts: { n?: number; seed?: number } = {}): Question[] {
  const r = rng(opts.seed ?? Date.now());
  const pool: Question[] = [];
  for (const p of places) {
    if (p.scope !== 'china' || p.kind !== 'city') continue;
    const modern = p.modern?.zh ?? p.name.zh;
    const periods = [...(p.names ?? []), ...(p.periods ?? [])].filter(n => n.name.zh && n.name.zh !== modern && !modern.startsWith(n.name.zh) && !n.name.zh.includes(modern) && n.from > -800);
    if (!periods.length || !(p.capital?.length || p.notes?.length || p.tier <= 2)) continue;
    const n = periods[Math.floor(r() * periods.length)];
    const year = Math.round((n.from + Math.min(n.to, 1911)) / 2);
    const era = eraAt(year);
    if (!era) continue;
    const note = p.notes?.find(x => year >= x.from && year <= x.to && !x.text.zh.includes(modern))?.text;
    pool.push({
      type: 'locate', place: p.id, year, name: n.name, lon: p.lon, lat: p.lat, hint: note,
      prompt: { zh: `${era.name.zh}时期的「${n.name.zh}」在哪里？`, en: `Where was ${n.name.en} in the ${era.name.en}?` },
    });
  }
  return shuffle(pool, r).slice(0, opts.n ?? 10);
}

/** Points for a locate answer: full marks within 50 km, nothing beyond 650 km. */
export const locatePoints = (km: number): number => Math.max(0, Math.min(100, Math.round(100 - (km - 50) / 6)));

/** The official title a locate score earns (out of 100 per question). */
export const RANKS: { min: number; name: I18n }[] = [
  { min: 0.9, name: { zh: '太史令 · 舆图大家', en: 'Grand Historian & Master Cartographer' } },
  { min: 0.75, name: { zh: '职方郎中', en: 'Director of the Bureau of Operations' } },
  { min: 0.55, name: { zh: '州郡从事', en: 'Prefectural Retainer' } },
  { min: 0.35, name: { zh: '县学生员', en: 'County Scholar' } },
  { min: 0, name: { zh: '书院童生', en: 'Academy Novice' } },
];
export const rankOf = (score: number, max: number): I18n => RANKS.find(x => score >= x.min * max)!.name;

/** One multiple-choice question about a territorial phase (随堂检测): four options, the answer's index and why. */
export interface PeriodQuestion { snap: string; prompt: I18n; options: I18n[]; answer: number; why: I18n }

const hash = (s: string): number => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
const both = (f: (l: 'zh' | 'en') => string): I18n => ({ zh: f('zh'), en: f('en') });
const span = (ph: Phase, l: 'zh' | 'en') => `${formatYear(ph.from, l)} – ${formatYear(ph.to, l)}`;

/**
 * The question for one phase of the map, always the same for that phase: the capital (first phase of a dynasty with
 * one), a polity on the map at the time, or an event of the phase, with three wrong options from other times.
 */
export function periodQuestion(snap: Snapshot): PeriodQuestion | null {
  const ph = phaseAt(snap.year);
  if (!ph || ph.snap !== snap) return null;
  const r = rng(hash(snap.id));
  const era = eraAt(snap.year);
  const make = (prompt: I18n, right: I18n, wrong: I18n[], why: I18n): PeriodQuestion | null => {
    const seen = new Set([right.zh]);
    const picks = shuffle(wrong, r).filter(w => !seen.has(w.zh) && seen.add(w.zh)).slice(0, 3);
    if (picks.length < 3) return null;
    const options = shuffle([right, ...picks], r);
    return { snap: snap.id, prompt, options, answer: options.indexOf(right), why };
  };

  const capital = era?.capital ? PLACE.get(era.capital) : undefined;
  if (era && capital && ph.index === 0) {
    const name = (id: string | undefined, y: Year) => { const p = id ? PLACE.get(id) : undefined; return p ? mapName(p, y) ?? p.name : null; };
    const right = name(era.capital, era.start)!;
    // one option per city (洛邑 and 洛阳 are the same place)
    const cities = new Map(CHAPTERS.filter(e => e.capital && e.capital !== era.capital).map(e => [e.capital!, name(e.capital, e.start)]));
    const wrong = [...cities.values()].filter((n): n is I18n => !!n);
    const q = make(both(l => (l === 'zh' ? `${era.name.zh}的都城是？` : `Where was the capital of ${era.name.en}?`)), right, wrong,
      both(l => (l === 'zh' ? `${era.name.zh}定都${right.zh}${right.zh === capital.name.zh ? '' : `（今${capital.name.zh}）`}。` : `${era.name.en} ruled from ${right.en}${right.en === capital.name.en ? '' : ` (today's ${capital.name.en})`}.`)));
    if (q) return q;
  }

  const inPhase = (y: Year) => y >= ph.from && y <= ph.to;
  const events = CHRONICLE.filter(e => e.year >= -2070);
  const key = events.filter(e => e.weight <= 2);
  const mine = key.some(e => inPhase(e.year)) ? key.filter(e => inPhase(e.year)) : events.filter(e => inPhase(e.year));
  const here = new Map(snapPolities(snap.id).map(([id, k]) => [id, k]));
  const named = [...here.keys()].map(id => POLITY.get(id)).filter(p => !!p);
  const useEvent = mine.length > 0 && (named.length < 2 || r() < 0.6);

  if (useEvent) {
    const e = mine[Math.floor(r() * mine.length)];
    const far = key.filter(x => Math.abs(x.year - e.year) > 40 && !inPhase(x.year) && Math.abs(x.year - e.year) < 900);
    const q = make(both(l => (l === 'zh' ? '下列哪件事发生在这一时期？' : 'Which of these happened in this period?')), e.title, far.map(x => x.title),
      both(l => (l === 'zh' ? `${e.title.zh}发生于${formatYear(e.year, l)}，在本时期（${span(ph, l)}）之内。` : `${e.title.en} took place in ${formatYear(e.year, l)}, within this period (${span(ph, l)}).`)));
    if (q) return q;
  }

  // a polity on this map and three that were not on any map within two centuries
  const near = new Set<string>();
  for (const s of SNAPSHOTS) if (Math.abs(s.year - snap.year) < 200) for (const [id] of snapPolities(s.id)) near.add(POLITY.get(id)?.name.zh ?? id);
  // the polities of Chinese history rather than distant neighbours, on both sides of the question
  const ours = (x: { role: string }) => x.role !== 'neighbor';
  const pool = named.some(ours) ? named.filter(ours) : named;
  const sorted = pool.slice().sort((a, b) => (here.get(b.id) ?? 0) - (here.get(a.id) ?? 0));
  if (!sorted.length) return null;
  const p = sorted[Math.floor(r() * Math.min(4, sorted.length))];
  const away = [...POLITY.values()].filter(x => !near.has(x.name.zh));
  const others = away.filter(ours).length >= 3 ? away.filter(ours) : away;
  const k = here.get(p.id) ?? 0;
  return make(both(l => (l === 'zh' ? '下列哪个政权出现在这一时期的地图上？' : 'Which of these polities is on the map in this period?')), p.name, others.map(x => x.name),
    both(l => (l === 'zh' ? `${p.name.zh}在本时期（${span(ph, l)}）的地图上${k ? `，${formatArea(k, l)}` : ''}；其余三个都不在前后二百年的地图上。` : `${p.name.en} is on the map in this period (${span(ph, l)})${k ? `, ${formatArea(k, l)}` : ''}; the other three are on no map within two centuries.`)));
}
