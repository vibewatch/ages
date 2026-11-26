/** The history course: one lesson per textbook unit (统编版初中 and 高中纲要上). Authoring guide: docs/design/course.md. */
import type { Book, Lesson } from '../types.ts';
import { G7A } from './g7a.ts';
import { G7B } from './g7b.ts';
import { G8A } from './g8a.ts';
import { G8B } from './g8b.ts';
import { HS1 } from './hs1.ts';
import { CH2 } from './ch2.ts';
import { CH3 } from './ch3.ts';
import { CH4 } from './ch4.ts';
import { CH5 } from './ch5.ts';
import { CH6 } from './ch6.ts';
import { CH7 } from './ch7.ts';

export const LESSONS: Lesson[] = [...G7A, ...G7B, ...G8A, ...G8B, ...HS1];
/**
 * The learning path's own lessons for chapters 2–7 (`ch<n>-<k>`): the textbook gives the 2,000 imperial years one unit
 * per era, so the path splits each era into short lessons. They are not part of the textbook course; `book`/`unit`
 * name the closest textbook unit.
 */
export const PATH_LESSONS: Lesson[] = [...CH2, ...CH3, ...CH4, ...CH5, ...CH6, ...CH7];
/** every lesson, textbook and path */
export const ALL_LESSONS: Lesson[] = [...LESSONS, ...PATH_LESSONS];
export const LESSON = new Map(ALL_LESSONS.map(l => [l.id, l]));
/** the lessons of a unit, in order */
export const unitLessons = (book: Book, unit: number): Lesson[] => LESSONS.filter(l => l.book === book && l.unit === unit);
