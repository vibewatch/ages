import { CHAPTER, chapterOfLesson, type Chapter } from '../../shared/data/chapters.ts';
import { LESSON } from '../../shared/data/lessons/index.ts';
import type { Lesson } from '../../shared/data/types.ts';

/**
 * The learning focus: what the learner is working on right now, which the map, the timeline, the period line and the
 * card all follow. It is derived, never stored: from the open chapter of the learning path, the running lesson and the
 * chapter check.
 *
 * - `chapter`: a chapter is open on the path. Its events to know are numbered on the map, the timeline zooms to it.
 * - `lesson`: a lesson is running. Its events are numbered in teaching order, the current step's event is marked, and
 *   the dynasty's figures and buildings step aside.
 * - `check`: a lesson's check or a chapter check. The map is quiet and nothing is numbered (it would give answers away).
 */
export type FocusMode = 'chapter' | 'lesson' | 'check';

export interface LearnFocus {
  mode: FocusMode;
  chapter: Chapter | null;
  lesson: Lesson | null;
  /** event ids in teaching order (numbered on the map, walked by the card's ← →) */
  events: string[];
  /** the event of the step being read */
  current: string | null;
}

export interface FocusInput {
  /** the learning path is shown (anywhere in the panel stack) with this chapter open */
  path: { open: boolean; chapter: string | null };
  /** the running lesson (not a unit test) */
  lesson: { id: string; phase: 'steps' | 'check' | 'done'; step: number } | null;
  /** an open chapter check */
  check: string | null;
}

const stepEvents = (l: Lesson): string[] => [...new Set(l.steps.flatMap(s => (s.ev ? [s.ev] : [])))];

export function learnFocus(i: FocusInput): LearnFocus | null {
  if (i.check) {
    const c = CHAPTER.get(i.check) ?? null;
    return c ? { mode: 'check', chapter: c, lesson: null, events: [], current: null } : null;
  }
  const l = i.lesson ? LESSON.get(i.lesson.id) : undefined;
  if (l && i.lesson) {
    const chapter = chapterOfLesson(l.id) ?? null;
    if (i.lesson.phase === 'check') return { mode: 'check', chapter, lesson: l, events: [], current: null };
    const current = i.lesson.phase === 'steps' ? l.steps[i.lesson.step]?.ev ?? null : null;
    return { mode: 'lesson', chapter, lesson: l, events: stepEvents(l), current };
  }
  const c = i.path.open && i.path.chapter ? CHAPTER.get(i.path.chapter) : undefined;
  return c ? { mode: 'chapter', chapter: c, lesson: null, events: c.keys.slice(), current: null } : null;
}

export const sameFocus = (a: LearnFocus | null, b: LearnFocus | null): boolean =>
  a === b || (!!a && !!b && a.mode === b.mode && a.chapter === b.chapter && a.lesson === b.lesson && a.current === b.current && a.events.join() === b.events.join());
