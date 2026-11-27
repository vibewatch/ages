import type { Journey, Person, RiverLabel, Work } from '../jiangshan.ts';
import type { I18n, Year } from '../types.ts';

/**
 * Our own chronicle content (replacing the jiangshan-map import piece by piece; see docs/data/content.md). Each module in
 * this folder exports one or more of these lists, in the shapes the app's normaliser (src/shared/data/jiangshan.ts)
 * reads; content/index.ts assembles them, and every list present replaces the imported one.
 */
export interface Content {
  dynasties: { id: string; name: I18n; short: I18n; start: Year; end: Year; color: string; seat: I18n; summary: I18n }[];
  /** turning points that change the map or the regime (shown as chronicle events) */
  milestones: { id: string; dyn: string; year: Year; title: I18n; site: I18n; lon: number; lat: number; map?: boolean }[];
  /** other landmark events */
  landmarks: { id: string; dyn: string; year: Year; title: I18n; site: I18n; lon: number; lat: number }[];
  /** settlements with their name in one period (`from`–`to`); the same site in several periods = several entries */
  settlements: { dyn: string; name: I18n; modern: I18n; lon: number; lat: number; from: Year; to: Year; capital?: boolean; minor?: boolean; note?: I18n }[];
  passes: { id: string; name: I18n; modern: I18n; lon: number; lat: number; from?: Year; to?: Year; focus?: Year; range: I18n; desc: I18n }[];
  /** city lore: what a city was known for */
  cities: { modern: I18n; lon: number; lat: number; tag: I18n; desc: I18n }[];
  /** historical names (古称) and aliases of places, for search */
  gazetteer: { name: I18n; aliases: string[]; modern: I18n; lon: number; lat: number }[];
  people: Person[];
  journeys: Journey[];
  /** orthodox reign eras: [first year, era name (or ruler's regnal count before 140 BCE), year number in that first year, ruler zh, ruler en, era pinyin] */
  reigns: [Year, string, number, string, string, string][];
  /** rival regimes' reign eras, shown on hover */
  regional: { regime: I18n; polities: string[]; until: Year; spans: [Year, string, number, string, string, string][] }[];
  works: Work[];
  rivers: RiverLabel[];
  music: { name: I18n; mp3: string; ogg: string }[];
}
