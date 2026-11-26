import { ERAS } from '../../shared/data/eras.ts';
import { EVENT } from '../../shared/data/events.ts';
import { JOURNEYS, PERSON, type Journey, type Person } from '../../shared/data/jiangshan.ts';
import { LESSON } from '../../shared/data/lessons/index.ts';
import { LIFE, type LifeItem } from '../../shared/data/life.ts';
import { PLACE } from '../../shared/data/places.ts';
import { TRAIL, type Trail } from '../../shared/data/trails.ts';
import type { Era, HistEvent, Lesson, Place, Year } from '../../shared/data/types.ts';
import type { Hit } from '../../shared/lib/search.ts';
import { clampYear } from '../../shared/lib/timeline.ts';
import type { LinkState } from '../lib/link.ts';

/**
 * What the app can show: every way in — a deep link on arrival, a changed hash, a search hit — becomes a `Subject`,
 * and `App.navigate` is the one place that opens it.
 */
export type Subject =
  | { kind: 'event'; e: HistEvent }
  | { kind: 'era'; era: Era; year?: Year }
  | { kind: 'place'; p: Place; year?: Year }
  | { kind: 'person'; p: Person }
  | { kind: 'life'; x: LifeItem }
  | { kind: 'lesson'; l: Lesson; resume?: boolean }
  | { kind: 'trail'; trail: Trail; stop: number }
  | { kind: 'journey'; j: Journey }
  | { kind: 'year'; y: Year };

/** How a subject is reached: on arrival (jump, no flight), from a changed hash, or picked by the user. */
export type Arrival = 'arrive' | 'hash' | 'pick';

/** The card subject a link names (the first of event, era, place, person, life), if any. */
function cardSubject(l: LinkState): Subject | null {
  const e = l.event ? EVENT.get(l.event) : undefined;
  if (e) return { kind: 'event', e };
  const era = l.era ? ERAS.find(x => x.id === l.era) : undefined;
  if (era) return { kind: 'era', era, year: l.year };
  const p = l.place ? PLACE.get(l.place) : undefined;
  if (p) return { kind: 'place', p, year: l.year };
  const person = l.person ? PERSON.get(l.person) : undefined;
  if (person) return { kind: 'person', p: person };
  const x = l.life ? LIFE.find(i => i.id === l.life) : undefined;
  if (x) return { kind: 'life', x };
  return null;
}

/**
 * Everything a link opens on arrival, in order: its card subject, then a lesson, a trail and a journey (a link can
 * carry a lesson and a trail together). A bare year is not a subject: it only sets the starting year.
 */
export function linkSubjects(l: LinkState): Subject[] {
  const out: Subject[] = [];
  const card = cardSubject(l);
  if (card) out.push(card);
  const lesson = l.lesson ? LESSON.get(l.lesson) : undefined;
  if (lesson) out.push({ kind: 'lesson', l: lesson, resume: true });
  const trail = l.trail ? TRAIL.get(l.trail) : undefined;
  if (trail) out.push({ kind: 'trail', trail, stop: l.trailStop ?? 0 });
  const j = l.journey ? JOURNEYS.find(x => x.id === l.journey) : undefined;
  if (j) out.push({ kind: 'journey', j });
  return out;
}

/** The one subject a changed hash names (a trail is handled before it, the year when nothing else is named). */
export function hashSubject(l: LinkState): Subject | null {
  const card = cardSubject(l);
  if (card) return card;
  const lesson = l.lesson ? LESSON.get(l.lesson) : undefined;
  if (lesson) return { kind: 'lesson', l: lesson, resume: true };
  const j = l.journey ? JOURNEYS.find(x => x.id === l.journey) : undefined;
  if (j) return { kind: 'journey', j };
  return l.year != null ? { kind: 'year', y: clampYear(l.year) } : null;
}

/** The starting year a link implies: its event's, its year, its era's, the middle of its person's life. */
export function linkYear(l: LinkState): Year | undefined {
  const e = l.event ? EVENT.get(l.event) : undefined;
  const era = l.era ? ERAS.find(x => x.id === l.era) : undefined;
  const person = l.person ? PERSON.get(l.person) : undefined;
  const eraYear = era ? Math.max(era.start, Math.min(era.end, era.start < -10000 ? era.start : era.start + 1)) : undefined;
  return e?.year ?? l.year ?? eraYear ?? (person ? Math.round((person.span[0] + person.span[1]) / 2) : undefined);
}

/** A search hit as a subject. */
export function hitSubject(x: Hit): Subject | null {
  switch (x.type) {
    case 'year': return { kind: 'year', y: clampYear(x.year) };
    case 'event': { const e = EVENT.get(x.id); return e ? { kind: 'event', e } : null; }
    case 'era': { const era = ERAS.find(e => e.id === x.id); return era ? { kind: 'era', era } : null; }
    case 'person': { const p = PERSON.get(x.id); return p ? { kind: 'person', p } : null; }
    case 'life': { const li = LIFE.find(i => i.id === x.id); return li ? { kind: 'life', x: li } : null; }
    case 'lesson': { const l = LESSON.get(x.id); return l ? { kind: 'lesson', l } : null; }
    case 'trail': { const tl = TRAIL.get(x.id); return tl ? { kind: 'trail', trail: tl, stop: 0 } : null; }
    case 'journey': { const j = JOURNEYS.find(i => i.id === x.id); return j ? { kind: 'journey', j } : null; }
    case 'place': { const p = PLACE.get(x.id); return p ? { kind: 'place', p } : null; }
  }
}
