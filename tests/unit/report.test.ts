import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../../src/shared/data/chapters.ts';
import { answered } from '../../src/shared/lib/mastery.ts';
import { dayKey, makeReport } from '../../src/shared/lib/report.ts';

const D = 86_400_000;
const NOW = new Date(2026, 10, 27, 15).getTime();
const day = (k: number) => dayKey(new Date(2026, 10, 27 - k, 12).getTime());

describe('weekly report', () => {
  it('counts the week, last week and the streak', () => {
    const days = { [day(0)]: 4, [day(1)]: 3, [day(2)]: 2, [day(4)]: 1, [day(8)]: 5, [day(13)]: 1, [day(14)]: 9 };
    const r = makeReport({ mastery: {}, days, scores: {}, now: NOW });
    expect(r.week).toHaveLength(7);
    expect(r.week[6][0]).toBe(day(0));
    expect(r.activeDays).toBe(4);
    expect(r.answers).toBe(10);
    expect(r.answersPrev).toBe(6);
    expect(r.streak).toBe(3);
  });

  it('keeps a streak alive until the end of today', () => {
    const r = makeReport({ mastery: {}, days: { [day(1)]: 1, [day(2)]: 1 }, scores: {}, now: NOW });
    expect(r.streak).toBe(2);
    expect(makeReport({ mastery: {}, days: { [day(2)]: 1 }, scores: {}, now: NOW }).streak).toBe(0);
  });

  it('reports mastery per chapter, finished work and what to review', () => {
    const c = CHAPTERS[2];
    const mastery = {
      [c.keys[0]]: answered(answered(undefined, true, NOW - 2 * D), true, NOW - D),
      [c.keys[1]]: answered(undefined, true, NOW - 20 * D),
    };
    const r = makeReport({ mastery, days: {}, scores: { [`chapter:${c.id}`]: [4, 5], [c.lessons[0]]: [3, 3] }, now: NOW });
    expect(r.mastery.mastered).toBe(1);
    expect(r.mastery.due).toBe(1);
    expect(r.chapters[2].passed).toBe(true);
    expect(r.chapters[2].score).toBeCloseTo(1.5 / c.keys.length);
    expect(r.chapters[0].score).toBe(0);
    expect(r.chaptersPassed).toBe(1);
    expect(r.lessonsPassed).toBe(1);
    expect(r.review).toEqual([c.keys[1]]);
  });
});
