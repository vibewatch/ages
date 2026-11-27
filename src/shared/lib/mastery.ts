/**
 * Mastery — what a learner knows, per event, from what they did: seen it (card, lesson step, story), answered it right on
 * different days, missed it. Pure functions over a small record so it can be tested and kept in the progress backup.
 *
 * Levels: new → seen → practised (right once) → mastered (right on two different days). Practised and mastered items fall
 * *due* after a gap (3 days; 14 days once mastered, 30 days after three right days), and a miss since the last right
 * answer makes it *weak*. Due and weak items make up "today's review".
 */
export interface MasteryRec {
  /** first seen (ms) */
  s?: number;
  /** number of different days answered right */
  r: number;
  /** last day answered right (YYYY-MM-DD, local) */
  d?: string;
  /** last right answer (ms) */
  l?: number;
  /** last miss (ms) */
  m?: number;
}

export type Level = 'new' | 'seen' | 'weak' | 'practised' | 'mastered' | 'due';

const DAY = 86_400_000;
const dayOf = (ms: number): string => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/** Days until a right answer needs refreshing, by the number of right days. */
export const gapDays = (r: number): number => (r >= 3 ? 30 : r >= 2 ? 14 : 3);

export function level(x: MasteryRec | undefined, now = Date.now()): Level {
  if (!x) return 'new';
  if (x.m != null && (x.l == null || x.m >= x.l)) return 'weak';
  if (x.r <= 0 || x.l == null) return 'seen';
  if (now - x.l > gapDays(x.r) * DAY) return 'due';
  return x.r >= 2 ? 'mastered' : 'practised';
}

export function seen(x: MasteryRec | undefined, now = Date.now()): MasteryRec {
  return x ? (x.s != null ? x : { ...x, s: now }) : { s: now, r: 0 };
}

export function answered(x: MasteryRec | undefined, ok: boolean, now = Date.now()): MasteryRec {
  const base = seen(x, now);
  if (!ok) return { ...base, m: now };
  const day = dayOf(now);
  // a right answer counts once a day: mastery needs coming back
  return { ...base, r: base.d === day ? base.r : base.r + 1, d: day, l: now };
}

export interface MasterySummary { total: number; seen: number; practised: number; mastered: number; due: number; weak: number }

/** Counts for a set of events (a chapter's events to know, or all of them). `seen` counts everything not new. */
export function summarize(ids: string[], recs: Record<string, MasteryRec>, now = Date.now()): MasterySummary {
  const s: MasterySummary = { total: ids.length, seen: 0, practised: 0, mastered: 0, due: 0, weak: 0 };
  for (const id of ids) {
    const lv = level(recs[id], now);
    if (lv === 'new') continue;
    s.seen++;
    if (lv === 'practised') s.practised++;
    else if (lv === 'mastered') s.mastered++;
    else if (lv === 'due') s.due++;
    else if (lv === 'weak') s.weak++;
  }
  return s;
}

/** A 0–1 score for a set: mastered 1, practised or due ½, seen or weak ¼. */
export function score(ids: string[], recs: Record<string, MasteryRec>, now = Date.now()): number {
  if (!ids.length) return 0;
  const w: Record<Level, number> = { new: 0, seen: 0.25, weak: 0.25, practised: 0.5, due: 0.5, mastered: 1 };
  return ids.reduce((a, id) => a + w[level(recs[id], now)], 0) / ids.length;
}

/** The events to review today, weakest first then the longest overdue. */
export function dueToday(ids: string[], recs: Record<string, MasteryRec>, now = Date.now()): string[] {
  return ids
    .filter(id => { const lv = level(recs[id], now); return lv === 'weak' || lv === 'due'; })
    .sort((a, b) => {
      const wa = level(recs[a], now) === 'weak' ? 0 : 1, wb = level(recs[b], now) === 'weak' ? 0 : 1;
      return wa - wb || (recs[a].l ?? 0) - (recs[b].l ?? 0);
    });
}

export const isMasteryRec = (v: unknown): v is MasteryRec =>
  !!v && typeof v === 'object' && !Array.isArray(v)
  && Number.isInteger((v as MasteryRec).r) && (v as MasteryRec).r >= 0
  && (['s', 'l', 'm'] as const).every(k => (v as MasteryRec)[k] === undefined || (typeof (v as MasteryRec)[k] === 'number' && Number.isFinite((v as MasteryRec)[k])))
  && ((v as MasteryRec).d === undefined || typeof (v as MasteryRec).d === 'string');

export const isMasteryMap = (v: unknown): v is Record<string, MasteryRec> =>
  !!v && typeof v === 'object' && !Array.isArray(v) && Object.values(v).every(isMasteryRec);
