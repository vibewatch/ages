/**
 * Free / Pro (docs/product/monetization.md §4). The free product stays whole — the atlas, stories, journeys, the learning
 * path and its lessons, the quiz, mastery and the classroom. Pro adds what a learner's family pays for: unlimited
 * 读图题 (free: one round a day), every chapter check (free: chapters 1–3), and the weekly report as an image.
 *
 * Nothing is gated unless the build turns the gate on (VITE_PRO_GATE=1): there is no payment yet. In a gated build
 * `?pro=1` unlocks Pro on the device, to try the paid experience.
 */
export type Feature = 'mapread' | 'chapterCheck' | 'reportImage';

export const FREE = { mapRoundsPerDay: 1, openChapters: 3 } as const;

export interface PlanState {
  gate: boolean;
  pro: boolean;
  /** map-reading rounds started today */
  mapRounds: number;
}

/** Whether `f` is open; `chapter` is the chapter's number for `chapterCheck`. */
export function allow(s: PlanState, f: Feature, chapter = 0): boolean {
  if (!s.gate || s.pro) return true;
  if (f === 'mapread') return s.mapRounds < FREE.mapRoundsPerDay;
  if (f === 'chapterCheck') return chapter <= FREE.openChapters;
  return false;
}
