import { describe, expect, it } from 'vitest';
import { answered, dueToday, gapDays, isMasteryMap, level, score, seen, summarize, type MasteryRec } from '../../src/shared/lib/mastery.ts';

const D = 86_400_000;
const T0 = new Date(2026, 10, 2, 10).getTime();

describe('mastery', () => {
  it('climbs from new to seen, practised and (on another day) mastered', () => {
    expect(level(undefined, T0)).toBe('new');
    let x: MasteryRec = seen(undefined, T0);
    expect(level(x, T0)).toBe('seen');
    x = answered(x, true, T0);
    expect(level(x, T0)).toBe('practised');
    // right again the same day does not count twice
    x = answered(x, true, T0 + 3600_000);
    expect(x.r).toBe(1);
    expect(level(x, T0 + 3600_000)).toBe('practised');
    x = answered(x, true, T0 + D);
    expect(x.r).toBe(2);
    expect(level(x, T0 + D)).toBe('mastered');
  });

  it('falls due after its gap, longer once mastered', () => {
    const p = answered(undefined, true, T0);
    expect(level(p, T0 + 3 * D - 1)).toBe('practised');
    expect(level(p, T0 + 3 * D + 1)).toBe('due');
    const m = answered(p, true, T0 + D);
    expect(level(m, T0 + D + 13 * D)).toBe('mastered');
    expect(level(m, T0 + D + 15 * D)).toBe('due');
    expect(gapDays(3)).toBe(30);
  });

  it('a miss since the last right answer makes it weak, a later right answer recovers it', () => {
    let x = answered(answered(undefined, true, T0), true, T0 + D);
    x = answered(x, false, T0 + 2 * D);
    expect(level(x, T0 + 2 * D)).toBe('weak');
    x = answered(x, true, T0 + 3 * D);
    expect(level(x, T0 + 3 * D)).toBe('mastered');
  });

  it('summarizes, scores and lists today’s review weakest first', () => {
    const recs: Record<string, MasteryRec> = {
      a: answered(answered(undefined, true, T0), true, T0 + D), // mastered
      b: answered(undefined, true, T0 + D), // practised
      c: answered(undefined, true, T0 - 10 * D), // due
      d: answered(answered(undefined, true, T0), false, T0 + D), // weak
      e: seen(undefined, T0),
    };
    const now = T0 + 1.5 * D;
    const ids = ['a', 'b', 'c', 'd', 'e', 'f'];
    expect(summarize(ids, recs, now)).toEqual({ total: 6, seen: 5, practised: 1, mastered: 1, due: 1, weak: 1 });
    expect(score(ids, recs, now)).toBeCloseTo((1 + 0.5 + 0.5 + 0.25 + 0.25) / 6);
    expect(dueToday(ids, recs, now)).toEqual(['d', 'c']);
    expect(score([], recs)).toBe(0);
  });

  it('validates stored records', () => {
    expect(isMasteryMap({ a: { r: 1, l: 5, d: '2026-11-02' }, b: { r: 0, s: 1 } })).toBe(true);
    expect(isMasteryMap({ a: { r: -1 } })).toBe(false);
    expect(isMasteryMap({ a: { r: 1, l: 'x' } })).toBe(false);
    expect(isMasteryMap([])).toBe(false);
  });
});
