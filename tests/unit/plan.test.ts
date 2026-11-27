import { describe, expect, it } from 'vitest';
import { allow, FREE } from '../../src/shared/lib/plan.ts';

describe('free / Pro', () => {
  it('opens everything when the build has no gate', () => {
    const s = { gate: false, pro: false, mapRounds: 99 };
    expect(allow(s, 'mapread')).toBe(true);
    expect(allow(s, 'chapterCheck', 10)).toBe(true);
    expect(allow(s, 'reportImage')).toBe(true);
  });

  it('keeps the free limits behind a gate, and Pro opens them', () => {
    const s = { gate: true, pro: false, mapRounds: 0 };
    expect(allow(s, 'mapread')).toBe(true);
    expect(allow({ ...s, mapRounds: FREE.mapRoundsPerDay }, 'mapread')).toBe(false);
    expect(allow(s, 'chapterCheck', FREE.openChapters)).toBe(true);
    expect(allow(s, 'chapterCheck', FREE.openChapters + 1)).toBe(false);
    expect(allow(s, 'reportImage')).toBe(false);
    const pro = { ...s, pro: true, mapRounds: 50 };
    expect(allow(pro, 'mapread') && allow(pro, 'chapterCheck', 10) && allow(pro, 'reportImage')).toBe(true);
  });
});
