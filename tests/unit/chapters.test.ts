import { describe, expect, it } from 'vitest';
import { CHAPTERS, WHY, chapterAt, chapterOfLesson } from '../../src/shared/data/chapters.ts';
import { ERAS } from '../../src/shared/data/eras.ts';
import { EVENT } from '../../src/shared/data/events.ts';
import { LESSON, LESSONS } from '../../src/shared/data/lessons/index.ts';

const CJK = /[㐀-鿿]/;

describe('learning path chapters', () => {
  it('are numbered in order, contiguous in time and bilingual', () => {
    CHAPTERS.forEach((c, i) => {
      expect(c.n, c.id).toBe(i + 1);
      expect(c.span[0], c.id).toBeLessThan(c.span[1]);
      if (i > 0) expect(c.span[0], c.id).toBe(CHAPTERS[i - 1].span[1]);
      for (const s of [c.title, c.idea]) {
        expect(s.zh, c.id).toMatch(CJK);
        expect(s.en ?? '', c.id).not.toMatch(CJK);
      }
    });
    expect(new Set(CHAPTERS.map(c => c.id)).size).toBe(CHAPTERS.length);
  });

  it('point at real eras, events and lessons, with key events inside the chapter', () => {
    for (const c of CHAPTERS) {
      for (const e of c.eras) expect(ERAS.some(x => x.id === e), `${c.id}: era ${e}`).toBe(true);
      expect(c.keys.length, c.id).toBeGreaterThanOrEqual(4);
      for (const id of c.keys) {
        const ev = EVENT.get(id);
        expect(ev, `${c.id}: event ${id}`).toBeTruthy();
        expect(ev!.year, `${c.id}: ${id}`).toBeGreaterThanOrEqual(c.span[0]);
        expect(ev!.year, `${c.id}: ${id}`).toBeLessThanOrEqual(c.span[1]);
        expect(WHY[id]?.zh, `${c.id}: why ${id}`).toMatch(CJK);
        expect(WHY[id]?.en ?? '', `${c.id}: why ${id}`).not.toMatch(CJK);
      }
      expect(c.keys.some(id => EVENT.get(id)?.story), `${c.id}: an opening story`).toBe(true);
      expect(c.lessons.length, c.id).toBeGreaterThan(0);
      for (const id of c.lessons) expect(LESSON.get(id), `${c.id}: lesson ${id}`).toBeTruthy();
    }
  });

  it('cover every middle-school lesson exactly once, in course order', () => {
    const middle = LESSONS.filter(l => l.book !== 'hs1').map(l => l.id);
    expect(CHAPTERS.flatMap(c => c.lessons)).toEqual(middle);
    for (const id of middle) expect(chapterOfLesson(id)?.lessons, id).toContain(id);
  });

  it('find the chapter of a year', () => {
    expect(chapterAt(-1_000_000).id).toBe('origins');
    expect(chapterAt(-221).id).toBe('qin-han');
    expect(chapterAt(755).id).toBe('sui-tang');
    expect(chapterAt(1405).id).toBe('ming-qing');
    expect(chapterAt(1937).id).toBe('revolution');
    expect(chapterAt(2008).id).toBe('new-china');
  });
});

describe('chapter checks and spaced review', () => {
  it('draws a chapter check from its years, its events to know first', async () => {
    const { makeQuiz } = await import('../../src/shared/lib/quiz.ts');
    const { EVENTS } = await import('../../src/shared/data/events.ts');
    for (const c of CHAPTERS) {
      const qs = makeQuiz(EVENTS, { n: 5, seed: 7, range: c.span, prefer: c.keys });
      expect(qs.length, c.id).toBe(5);
      const ids = qs.flatMap(q => ('events' in q ? q.events : 'event' in q ? [q.event] : []) as string[]);
      for (const id of ids) {
        const y = EVENT.get(id)!.year;
        expect(y, `${c.id}: ${id}`).toBeGreaterThanOrEqual(c.span[0]);
        expect(y, `${c.id}: ${id}`).toBeLessThanOrEqual(c.span[1]);
      }
      // the first questions are about the chapter's events to know
      const first = qs[0];
      expect(c.keys, c.id).toContain('event' in first ? first.event : (first as { events: string[] }).events[0]);
    }
  });

  it('brings a resolved mistake back after 1, 3 and 7 days, and resets it when missed again', async () => {
    const { vi } = await import('vitest');
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => store.set(k, v) });
    const { Progress } = await import('../../src/client/lib/storage.ts');
    const DAY = 86_400_000;
    const p = new Progress();
    p.addMistake('when:zhenguan');
    const t0 = 1_000_000_000_000;
    p.resolveMistake('when:zhenguan', t0);
    expect(p.mistakes.has('when:zhenguan')).toBe(false);
    expect(p.scheduled).toBe(1);
    expect(p.promoteDue(t0 + DAY - 1)).toBe(0);
    expect(p.promoteDue(t0 + DAY)).toBe(1);
    expect(p.mistakes.has('when:zhenguan')).toBe(true);
    // right again: next gap is 3 days, then 7, then it is learned
    p.resolveMistake('when:zhenguan', t0 + DAY);
    expect(p.promoteDue(t0 + 3 * DAY)).toBe(0);
    expect(p.promoteDue(t0 + 4 * DAY)).toBe(1);
    p.resolveMistake('when:zhenguan', t0 + 4 * DAY);
    expect(p.promoteDue(t0 + 11 * DAY)).toBe(1);
    p.resolveMistake('when:zhenguan', t0 + 11 * DAY);
    expect(p.scheduled).toBe(0);
    expect(p.spaced['when:zhenguan']).toBeUndefined();
    // a miss starts the spacing over
    p.addMistake('where:qin_unify');
    p.resolveMistake('where:qin_unify', t0);
    p.promoteDue(t0 + DAY);
    p.addMistake('where:qin_unify');
    expect(p.spaced['where:qin_unify']).toEqual({ box: 0, due: null });
    // the schedule survives a backup round trip
    p.resolveMistake('where:qin_unify', t0);
    const snap = p.exportData();
    p.reset();
    expect(p.scheduled).toBe(0);
    expect(p.importData(snap)).toBe(true);
    expect(p.scheduled).toBe(1);
    // a chapter check passes at 60 %
    p.score('chapter:qin-han', 2, 5);
    expect(p.chapterPassed('qin-han')).toBe(false);
    p.score('chapter:qin-han', 3, 5);
    expect(p.chapterPassed('qin-han')).toBe(true);
    vi.unstubAllGlobals();
  });
});
