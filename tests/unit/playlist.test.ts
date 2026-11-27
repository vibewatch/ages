import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../../src/shared/data/chapters.ts';
import { JOURNEYS } from '../../src/shared/data/corpus.ts';
import { chapterPlaylist, cleanTitle, decodePlaylist, encodePlaylist, isPlaylist, MAX_ITEMS, move } from '../../src/shared/lib/playlist.ts';

describe('classroom playlist', () => {
  const j = JOURNEYS[0].id;

  it('round-trips through its link form', () => {
    const items = [{ k: 'e' as const, id: 'qin_unify' }, { k: 'j' as const, id: j }, { k: 'e' as const, id: 'zhangqian' }];
    const s = encodePlaylist(items);
    expect(s).toBe(`e.qin_unify~j.${j}~e.zhangqian`);
    expect(decodePlaylist(s)).toEqual(items);
  });

  it('drops unknown, malformed and repeated items and caps the length', () => {
    expect(decodePlaylist('e.qin_unify~e.nope~x.qin_unify~e.qin_unify~j.~e.<script>~e')).toEqual([{ k: 'e', id: 'qin_unify' }]);
    const many = Array.from({ length: 80 }, () => 'e.qin_unify').join('~') + '~' + CHAPTERS.flatMap(c => c.keys).map(id => `e.${id}`).join('~');
    expect(decodePlaylist(many).length).toBeLessThanOrEqual(MAX_ITEMS);
    expect(decodePlaylist(null)).toEqual([]);
  });

  it('makes a chapter into a playlist of its events to know', () => {
    const c = CHAPTERS[4];
    const p = chapterPlaylist(c, 'Ch 5');
    expect(p.items.map(x => x.id)).toEqual(c.keys);
    expect(isPlaylist(p)).toBe(true);
  });

  it('cleans titles and moves items', () => {
    expect(cleanTitle('  a\\u0007b '.replace('\\u0007', '\u0007'))).toBe('ab');
    expect(cleanTitle('x'.repeat(100))).toHaveLength(60);
    expect(move([1, 2, 3], 0, 1)).toEqual([2, 1, 3]);
    expect(move([1, 2, 3], 0, -1)).toEqual([1, 2, 3]);
    expect(isPlaylist({ title: 1, items: [] })).toBe(false);
  });
});
