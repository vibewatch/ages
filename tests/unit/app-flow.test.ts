/** The app's derived state: the learning focus and how links and search hits become subjects. */
import { describe, expect, it } from 'vitest';
import { learnFocus, sameFocus } from '../../src/client/app/focus.ts';
import { hashSubject, hitSubject, linkSubjects, linkYear } from '../../src/client/app/router.ts';
import { CHAPTER } from '../../src/shared/data/chapters.ts';
import { EVENT } from '../../src/shared/data/events.ts';
import { LESSON } from '../../src/shared/data/lessons/index.ts';
import { recallQuestion } from '../../src/shared/lib/course.ts';

const none = { path: { open: false, chapter: null }, lesson: null, check: null };

describe('learning focus', () => {
  it('is empty while nothing is being learned', () => {
    expect(learnFocus(none)).toBeNull();
    // a chapter remembered on a closed path is not a focus
    expect(learnFocus({ ...none, path: { open: false, chapter: 'sui-tang' } })).toBeNull();
  });

  it('numbers an open chapter’s events to know', () => {
    const f = learnFocus({ ...none, path: { open: true, chapter: 'sui-tang' } })!;
    expect(f.mode).toBe('chapter');
    expect(f.chapter).toBe(CHAPTER.get('sui-tang'));
    expect(f.events).toEqual(CHAPTER.get('sui-tang')!.keys);
  });

  it('follows a lesson step by step and takes over from the chapter', () => {
    const c = CHAPTER.get('sui-tang')!;
    const l = LESSON.get(c.lessons[0])!;
    const k = l.steps.findIndex(s => s.ev);
    const f = learnFocus({ path: { open: true, chapter: 'qin-han' }, lesson: { id: l.id, phase: 'steps', step: k }, check: null })!;
    expect(f.mode).toBe('lesson');
    expect(f.chapter).toBe(c);
    expect(f.current).toBe(l.steps[k].ev);
    expect(f.events).toEqual([...new Set(l.steps.flatMap(s => (s.ev ? [s.ev] : [])))]);
  });

  it('numbers nothing during a check, so the map gives no answers away', () => {
    const l = LESSON.get(CHAPTER.get('sui-tang')!.lessons[0])!;
    expect(learnFocus({ ...none, lesson: { id: l.id, phase: 'check', step: 0 } })).toMatchObject({ mode: 'check', events: [] });
    expect(learnFocus({ ...none, path: { open: true, chapter: 'qin-han' }, check: 'sui-tang' })).toMatchObject({ mode: 'check', chapter: CHAPTER.get('sui-tang'), events: [] });
  });

  it('compares by content', () => {
    const a = learnFocus({ ...none, path: { open: true, chapter: 'qin-han' } });
    const b = learnFocus({ ...none, path: { open: true, chapter: 'qin-han' } });
    expect(a).not.toBe(b);
    expect(sameFocus(a, b)).toBe(true);
    expect(sameFocus(a, null)).toBe(false);
  });
});

describe('router', () => {
  it('turns a link into the subjects it opens, in order, and its starting year', () => {
    expect(linkSubjects({ event: 'grand_canal', trail: 'capitals', trailStop: 2 }).map(s => s.kind)).toEqual(['event', 'trail']);
    expect(linkSubjects({ year: 600 })).toEqual([]);
    expect(linkSubjects({ event: 'no-such-event' })).toEqual([]);
    expect(linkYear({ event: 'grand_canal' })).toBe(EVENT.get('grand_canal')!.year);
    expect(linkYear({ year: 1000 })).toBe(1000);
    const l = linkSubjects({ lesson: 'g7b-1' })[0];
    expect(l).toMatchObject({ kind: 'lesson', resume: true });
  });

  it('opens one subject per hash change, the year when nothing else is named', () => {
    expect(hashSubject({ event: 'grand_canal', lesson: 'g7b-1' })?.kind).toBe('event');
    expect(hashSubject({ lesson: 'g7b-1' })?.kind).toBe('lesson');
    expect(hashSubject({ year: 99999 })).toMatchObject({ kind: 'year' });
    expect(hashSubject({})).toBeNull();
  });

  it('resolves search hits', () => {
    expect(hitSubject({ type: 'event', id: 'grand_canal', label: { zh: '', en: '' }, year: 605, score: 1 })).toMatchObject({ kind: 'event' });
    expect(hitSubject({ type: 'event', id: 'nope', label: { zh: '', en: '' }, year: 605, score: 1 })).toBeNull();
    expect(hitSubject({ type: 'year', id: 'y', label: { zh: '', en: '' }, year: 605, score: 1 })).toEqual({ kind: 'year', y: 605 });
  });
});

describe('quick recall', () => {
  it('asks when an event happened, with four options and the right one among them', () => {
    for (let seed = 1; seed < 20; seed++) {
      const q = recallQuestion('grand_canal', seed)!;
      expect(q.kind).toBe('choice');
      if (q.kind !== 'choice') continue;
      expect(q.options).toHaveLength(4);
      expect(q.options[q.answer].en).toContain(String(EVENT.get('grand_canal')!.year));
    }
    // deep prehistory has no sensible year options
    expect(recallQuestion('peking_man', 1)).toBeNull();
  });
});
