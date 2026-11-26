import { describe, expect, it } from 'vitest';
import { snapPolities } from '../../src/shared/data/areas.ts';
import { SNAPSHOTS } from '../../src/shared/data/territories.ts';
import { makeMapQuiz, mapQuestionFromKey, MAP_ERAS } from '../../src/shared/lib/mapread.ts';
import { makeMistakeQuiz } from '../../src/shared/lib/quiz.ts';
import { phaseAt } from '../../src/shared/lib/chronicle.ts';
import { eraAt } from '../../src/shared/lib/timeline.ts';
import { EVENTS } from '../../src/shared/data/events.ts';

const HAN = /[㐀-鿿]/;

describe('读图题 (map-reading questions)', () => {
  const rounds = Array.from({ length: 40 }, (_, s) => makeMapQuiz({ seed: s + 1 }));

  it('makes full rounds that cycle the three kinds', () => {
    for (const qs of rounds) {
      expect(qs).toHaveLength(9);
      expect(new Set(qs.map(q => q.kind))).toEqual(new Set(['period', 'polity', 'first']));
      expect(new Set(qs.map(q => q.key)).size).toBe(qs.length);
    }
  });

  it('is deterministic for a seed', () => {
    expect(makeMapQuiz({ seed: 42 })).toEqual(makeMapQuiz({ seed: 42 }));
  });

  it('has distinct, bilingual options with the answer among them', () => {
    for (const q of rounds.flat()) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
      expect(new Set(q.options.map(o => o.zh)).size).toBe(q.options.length);
      for (const s of [q.prompt, q.why, ...q.options]) {
        expect(s.zh.length).toBeGreaterThan(0);
        expect(s.en.length).toBeGreaterThan(0);
      }
      expect(HAN.test(q.prompt.en) || HAN.test(q.why.en.replace(/\(.*?\)/g, ''))).toBe(false);
    }
  });

  it('asks about the map that is shown', () => {
    for (const q of rounds.flat()) {
      const [snapId] = q.key.split(':').slice(2);
      const ph = phaseAt(q.years[0]);
      expect(ph?.snap.id).toBe(snapId);
      if (q.kind === 'period') expect(q.options[q.answer]).toEqual(eraAt(q.years[0], MAP_ERAS)!.name);
      if (q.kind === 'polity') expect(snapPolities(snapId).map(([id]) => id)).toContain(q.polity);
      if (q.kind === 'first') {
        expect(q.years).toHaveLength(2);
        expect(q.answer).toBe(q.years[0] < q.years[1] ? 0 : 1);
        expect(Math.abs(q.years[0] - q.years[1])).toBeGreaterThanOrEqual(50);
      }
    }
  });

  it('spreads the answer over the options', () => {
    const at = [0, 0, 0, 0];
    for (const q of rounds.flat()) if (q.kind !== 'first') at[q.answer]++;
    for (const n of at) expect(n).toBeGreaterThan(20);
  });

  it('meets every period with a map over a few rounds', () => {
    const seen = new Set(rounds.flat().filter(q => q.kind === 'period').map(q => q.options[q.answer].zh));
    expect(seen.size).toBeGreaterThanOrEqual(MAP_ERAS.length - 2);
  });

  it('keeps a chapter round within its years', () => {
    const qs = makeMapQuiz({ n: 6, seed: 5, range: [581, 907] });
    expect(qs.length).toBe(6);
    for (const q of qs.filter(x => x.kind !== 'first')) {
      expect(q.years[0]).toBeGreaterThanOrEqual(581);
      expect(q.years[0]).toBeLessThanOrEqual(907);
    }
  });

  it('rebuilds a missed question from its key for mistake review', () => {
    for (const q of rounds[0]) {
      const again = mapQuestionFromKey(q.key, 9);
      expect(again?.key).toBe(q.key);
      expect(again?.options[again.answer]).toEqual(q.options[q.answer]);
    }
    const review = makeMistakeQuiz(EVENTS, rounds[0].map(q => q.key));
    expect(review).toHaveLength(9);
    expect(review.every(q => q.type === 'map' && q.prompt.zh.startsWith('【错题复习】'))).toBe(true);
    expect(mapQuestionFromKey('map:period:nope')).toBeNull();
  });

  it('only uses snapshots of Chinese history that exist', () => {
    const ids = new Set(SNAPSHOTS.map(s => s.id));
    for (const q of rounds.flat()) for (const id of q.key.split(':').slice(2, q.kind === 'first' ? 4 : 3)) expect(ids.has(id)).toBe(true);
  });
});
