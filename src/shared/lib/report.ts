import { CHAPTERS, type Chapter } from '../data/chapters.ts';
import { EVENT } from '../data/events.ts';
import { dueToday, score, summarize, type MasteryRec, type MasterySummary } from './mastery.ts';

/**
 * 学习周报 — the learner's week, from local progress only: days active and streak, questions answered this week against
 * last week, mastery over every event to know and per chapter, what was finished, and what to review next.
 */
export interface Report {
  /** the 7 days ending today, oldest first: [YYYY-MM-DD, activity] */
  week: [string, number][];
  activeDays: number;
  /** answers this week and in the week before */
  answers: number;
  answersPrev: number;
  /** consecutive days with activity, ending today (or yesterday, if today has none yet) */
  streak: number;
  mastery: MasterySummary;
  /** mastery 0–1 per chapter, in order */
  chapters: { c: Chapter; score: number; passed: boolean }[];
  lessonsPassed: number;
  lessonsTotal: number;
  chaptersPassed: number;
  /** events to review next, weakest first (at most 5) */
  review: string[];
}

export const dayKey = (ms: number): string => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
/** Midday of the day `k` days before `now` (midday: safe across daylight-saving shifts). */
const dayBefore = (now: number, k: number): number => {
  const d = new Date(now);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - k);
  return d.getTime();
};

export interface ReportInput {
  mastery: Record<string, MasteryRec>;
  days: Record<string, number>;
  scores: Record<string, [number, number]>;
  now?: number;
}

const PASS = 0.6;

export function makeReport({ mastery, days, scores, now = Date.now() }: ReportInput): Report {
  const week: [string, number][] = [];
  for (let k = 6; k >= 0; k--) { const key = dayKey(dayBefore(now, k)); week.push([key, days[key] ?? 0]); }
  let answersPrev = 0;
  for (let k = 7; k < 14; k++) answersPrev += days[dayKey(dayBefore(now, k))] ?? 0;
  let streak = 0;
  for (let k = days[dayKey(now)] ? 0 : 1; days[dayKey(dayBefore(now, k))]; k++) streak++;
  const keys = [...new Set(CHAPTERS.flatMap(c => c.keys))];
  const passed = (id: string) => { const b = scores[id]; return !!b && b[0] / b[1] >= PASS; };
  const lessons = [...new Set(CHAPTERS.flatMap(c => c.lessons))];
  return {
    week,
    activeDays: week.filter(([, n]) => n > 0).length,
    answers: week.reduce((a, [, n]) => a + n, 0),
    answersPrev,
    streak,
    mastery: summarize(keys, mastery, now),
    chapters: CHAPTERS.map(c => ({ c, score: score(c.keys, mastery, now), passed: passed(`chapter:${c.id}`) })),
    lessonsPassed: lessons.filter(passed).length,
    lessonsTotal: lessons.length,
    chaptersPassed: CHAPTERS.filter(c => passed(`chapter:${c.id}`)).length,
    // only events that still exist (a removed one would take a slot and show nothing)
    review: dueToday(Object.keys(mastery).filter(id => EVENT.has(id)), mastery, now).slice(0, 5),
  };
}
