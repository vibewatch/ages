/** Content rules for the learning path's own lessons (src/shared/data/lessons/ch<n>.ts), one describe per chapter. */
import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../../src/shared/data/chapters.ts';
import { EVENT } from '../../src/shared/data/events.ts';
import { PATH_LESSONS } from '../../src/shared/data/lessons/index.ts';
import type { Lesson } from '../../src/shared/data/types.ts';
import { bilingual, checkLesson } from './lesson-rules.ts';

for (const n of [2, 3, 4, 5, 6, 7]) {
  describe(`ch${n}`, () => {
    const chapter = CHAPTERS.find(c => c.n === n)!;
    const load = async (): Promise<Lesson[]> => (await import(`../../src/shared/data/lessons/ch${n}.ts`))[`CH${n}`];

    it('has 2–4 lessons with ids ch<n>-1, ch<n>-2 …', async () => {
      const ls = await load();
      expect(ls.length).toBeGreaterThanOrEqual(2);
      expect(ls.length).toBeLessThanOrEqual(4);
      expect(ls.map(l => l.id)).toEqual(ls.map((_, i) => `ch${n}-${i + 1}`));
    });

    it('every lesson follows the content rules, short and focused', async () => {
      for (const l of await load()) {
        checkLesson(l);
        expect(l.steps.length, l.id).toBeGreaterThanOrEqual(5);
        expect(l.steps.length, l.id).toBeLessThanOrEqual(9);
        expect(l.checks.length, l.id).toBeLessThanOrEqual(5);
        expect(l.minutes, l.id).toBeLessThanOrEqual(10);
      }
    });

    it('stays inside the chapter, in time order, and teaches every event to know', async () => {
      const ls = await load();
      const [a, b] = chapter.span;
      const seen = new Set<string>();
      let last = -Infinity;
      for (const l of ls) {
        for (const s of l.steps) {
          const y = s.ev ? EVENT.get(s.ev)!.year : s.year!;
          // a scene-setting step may look a little back
          expect(y, `${l.id} ${s.ev ?? s.year}`).toBeGreaterThanOrEqual(a - 60);
          expect(y, `${l.id} ${s.ev ?? s.year}`).toBeLessThanOrEqual(b);
          if (s.ev) seen.add(s.ev);
        }
        const first = l.steps[0].ev ? EVENT.get(l.steps[0].ev)!.year : l.steps[0].year!;
        expect(first, `${l.id} starts after the lesson before`).toBeGreaterThanOrEqual(last - 60);
        last = first;
      }
      for (const k of chapter.keys) expect(seen.has(k), `event to know ${k} is taught`).toBe(true);
      // lessons do not repeat each other
      const evs = ls.flatMap(l => l.steps.flatMap(s => (s.ev ? [s.ev] : [])));
      expect(new Set(evs).size).toBe(evs.length);
    });

    it('spreads the right answers over the options', async () => {
      const pos = (await load()).flatMap(l => l.checks.flatMap(c => ('q' in c ? [c.answer] : [])));
      expect(new Set(pos).size).toBeGreaterThanOrEqual(Math.min(3, pos.length));
    });
  });
}

describe('sources', () => {
  it('every step of every learning-path lesson cites a bilingual source', () => {
    for (const l of PATH_LESSONS) l.steps.forEach((s, i) => bilingual(s.src, `${l.id} step ${i} src`));
  });
});
