import type { I18n, LonLat, Polity, Year } from '../types.ts';

/**
 * Our own territory data (docs/data/territories.md). An era lists its seats (治所: capitals, commandery / prefecture
 * seats, garrisons, tribal centres) with modern coordinates, who held each seat from when (with the source), and the
 * phases to draw. scripts/build-territories.ts shares the land between the seats over the relief and writes the maps.
 */
export interface Seat {
  id: string;
  name: I18n;
  /** modern lon/lat of the seat */
  at: LonLat;
  /** how far the seat's hold reaches over easy ground, in km (default: the era's) */
  r?: number;
  /** head start in km: capitals and great cities push their border outwards */
  b?: number;
  /** where it is today, for checking (今地) */
  modern?: string;
}

/** From `year` on the seat is `polity`'s (null: nobody's / not mapped), per source `src` (a key of the era's sources). */
export type Hold = [year: Year, polity: string | null, src?: string];

export interface Phase {
  id: string;
  /** the years the map stands for */
  from: Year; to: Year;
  /** the year whose holdings are drawn (default `to`) */
  at?: Year;
  title: I18n;
  note?: I18n;
}

export interface OwnEra {
  /** the imported dynasty these maps replace (its phases are dropped) */
  replaces: string;
  /** default seat reach, km */
  reach: number;
  /** polities that appear here (in addition to the shared list), and per-era role overrides */
  polities?: Polity[];
  roles?: Record<string, Polity['role']>;
  seats: Seat[];
  holds: Record<string, Hold[]>;
  phases: Phase[];
  /** sources cited by key: 《史记·秦本纪》 … */
  sources: Record<string, I18n>;
}

/** Who held a seat in `year`. */
export function holderAt(h: Hold[] | undefined, year: Year): string | null {
  let who: string | null = null;
  for (const [y, p] of h ?? []) { if (y <= year) who = p; else break; }
  return who;
}
