import { EVENTS } from './events.ts';
import { capitalModel, personModel } from './heroes.ts';
import { personNamed, type Person } from './jiangshan.ts';
import { LIFE, lifeOf, type LifeItem, type LifeKind } from './life.ts';
import { ERAS } from './eras.ts';
import { PLACE, PLACES } from './places.ts';
import { STAGES } from './stage.ts';
import type { Era, HistEvent, I18n, ModelRecipe, Place } from './types.ts';

/**
 * One model standing on the map for a dynasty: a curated piece of its life (person, building, custom, food — see
 * life.ts), a landmark of one of its events, or one of its people.
 */
export interface SceneryItem {
  /** the event it belongs to ('' for curated life items) */
  event: string;
  kind: 'landmark' | LifeKind;
  lon: number;
  lat: number;
  model: ModelRecipe;
  /** a person's name (landmarks are named by their event pin) */
  name?: I18n;
  person?: Person;
  /** the curated life item (opens its own card) */
  life?: LifeItem;
  /**
   * Importance controls display priority and when to reveal detail, not whether an item carries a name.
   */
  level: Level;
  yaw?: number;
}

export type Level = 1 | 2 | 3;

/** key items per dynasty (the capital comes on top), so the period reads at a glance */
export const MAX_KEY = 6;

const lifePlaces = new WeakMap<LifeItem, Place | undefined>();
/** A curated landmark and its geographical entry are one map object, not two nearby click targets. */
export function lifePlace(l: LifeItem): Place | undefined {
  if (l.kind !== 'building') return undefined;
  if (lifePlaces.has(l)) return lifePlaces.get(l);
  const found = PLACES.find(p => p.kind !== 'city' && Math.hypot(l.lon - p.lon, l.lat - p.lat) < 0.5 &&
    (l.name.zh.startsWith(p.name.zh) || l.wiki.zh === p.name.zh));
  lifePlaces.set(l, found);
  return found;
}

const MAX_LANDMARKS = 6;
const MAX_PEOPLE = 4;
/** curated items may stand a little closer together (detail ones only show when zoomed in) */
const LIFE_SPACING = 1.1;
const LIFE_RINGS = [0, 0.7, 1.1, 1.5, 1.9];
/** degrees kept clear between any two models (and the capital's palace), so the map doesn't turn into a heap */
const SPACING = 1.5;
/** how far (degrees) a model may step off its event's spot to find room: landmarks stay close, people stand beside */
const LANDMARK_RINGS = [0, 0.9, 1.4];
const PERSON_RINGS = [1.1, 1.6, 2.1];

/**
 * 220×170 solid-land mask derived from `public/data/terrain/east-asia.webp` (10×10 px cells over STAGES.china.bounds).
 * Used when stepping off an item's origin (`r > 0`) so ring-offset models never step into rivers, bays, or seas.
 */
const LW = 220;
const LH = 170;
const LAND_RLE =
  '9,5,3c,28,73,3,32,31,8,7,2,8,c,4,2,1,48,4,33,31,1,22,1,b,44,4,1c,7,14,5c,17,c,22,4,1b,6,5,2,3,1,3,5,6,59,17,12,1d,4,' +
  '19,7,5,2,7,7,3,5b,6,3,3,8,1,16,36,a,4,7,1,8,3,5c,4,28,5,8,26,9,5,12,1,97,25,9,3,ab,17,7,8,8,9,a6,11,1,4,a,7,6,7,1,3,' +
  'a4,2,5,3,8,2,10,2,8,4,4,2,d1,5,4,3,cf,5,d3,1,1,6,d3,6,864,7,d4,8,d3,9,d0,c,c6,5,5,c,b8,15,1,e,b6,26,b5,25,b5,24,b6,' +
  '25,b6,25,b5,26,b4,28,b2,2a,b2,2a,b5,27,7,1,ad,5,2,20,7,1,b5,4,1,1b,4,3,b6,2,2,1b,4,3,b6,2,2,1b,3,4,b5,3,2,1c,1,5,b5,' +
  '4,1,22,b4,5,2,21,b5,4,2,21,3,2,af,5,3,25,af,5,1,28,ae,4,1,2b,ab,32,a9,33,a8,7,1,2d,a6,36,a5,38,a3,38,a3,37,a4,c,1,25,' +
  '2,3,a4,d,2,26,a6,e,5,23,9f,2,3,f,6,25,9b,17,3,29,98,45,96,47,95,47,83,4,d,45,84,6,b,18,3,2f,80,6,1,6,4,19,3,2f,7d,10,' +
  '3,1a,3,2e,7e,10,4,19,3,2e,7e,10,5,17,2,31,7f,10,4,16,2,31,7f,3,4,a,4,13,5,26,1,8,84,c,5,11,6,27,8c,e,4,f,8,27,8b,f,4,' +
  'f,6,29,8a,f,4,9,7,1,3,2b,8a,f,1,b,5,1,2,2f,8b,1b,3,2,1,30,8b,1b,2,34,8c,14,3,2,1,36,8d,14,2,39,8e,13,2,39,8d,4f,8e,' +
  '4e,8d,50,8c,50,8e,4f,8c,51,8c,50,8b,53,88,56,5,2,7e,5e,7d,60,7c,53,1,f,79,53,1,8,1,16,67,53,1,9,2,17,65,6,1,4d,2,8,3,' +
  '16,64,7,1,4d,e,17,61,7,2,4d,11,15,2b,1,2d,1,5,8,1,4e,12,17,28,3,2a,5e,13,15,4,2,23,3,29,5f,12,16,4,2,1c,a,20,4,3,61,' +
  '11,18,2,3,1b,c,1e,5,1,63,10,1e,1b,d,1b,6b,f,1f,1a,f,19,6c,f,1f,18,12,17,8,2,63,f,1f,17,14,16,7,3,63,d,21,16,15,16,7,' +
  '2,64,c,22,15,16,16,1f,1,4d,a,25,13,18,16,1d,3,4c,a,25,11,19,4,1,13,1c,3,4c,5,2a,11,19,4,2,13,1b,3,4c,4,2b,f,1b,2,5,' +
  '13,1a,2,4d,3,2d,c,24,14,18,3,4d,1,2f,c,24,15,17,2,7f,b,24,15,19,1,7e,b,24,16,18,1,7f,a,25,15,98,a,25,3,2,10,98,a,26,' +
  '1,5,e,18,1,80,8,27,1,7,c,99,8,27,1,7,c,66,2,32,7,27,1,9,8,1c,2,4a,2,32,7,32,6,69,1,34,5,27,1,c,2,6c,1,34,4,28,1,c,2,' +
  '21,1,4a,1,34,3,29,1,b0,2,4,2,23,2,34,1,80,2,24,2,2e,1,2,3,80,3,24,1,31,3,80,3,56,2,81,3,55,2,ab,2,1e,2,e,1,ab,3,1c,4,' +
  'b9,5,19,6,af,3,7,4,19,5,b1,3,6,4,16,7,b3,3,5,4,16,7,b4,3,5,3,15,7,b6,4,4,2,13,a,b6,3,5,2,10,c,b7,5,4,1,f,c,b7,7,d,13,' +
  'b5,8,c,11,7,1,1,1,af,7,c,10,b9,7,c,f,bb,5,d,f,1e,2,9c,6,c,d,6,2,2,1,13,5,9a,6,d,b,7,3,16,4,7,1,92,7,c,b,7,3,20,4,91,8,' +
  'd,8,6,2,2,2,16,2,5,8,8f,7,12,3,7,1,3,1,16,3,3,c,8d,6,20,1,19,12,8b,5,3d,11,8b,3,40,10,8a,1,1d,1,24,f,ce,f,6,4,82,1,40,' +
  '12,8a,4,3d,f,8e,a,35,10,93,4,33,b,5,2,cf,6,6,3,9e,1,10,1,1e,4,8,2,da,3,ab,1,2f,2,1ce';

const LAND_MASK = (() => {
  const m = new Uint8Array(LW * LH);
  let i = 0;
  let v = 0;
  for (const s of LAND_RLE.split(',')) {
    const n = parseInt(s, 16);
    if (v) m.fill(1, i, i + n);
    i += n;
    v ^= 1;
  }
  return m;
})();

const CHINA_BOUNDS = STAGES.china.bounds;
/** True when `[lon, lat]` lies within a solid-land cell of the East Asia terrain heightmap. */
export function onLand(lon: number, lat: number): boolean {
  const u = (lon - CHINA_BOUNDS.west) / (CHINA_BOUNDS.east - CHINA_BOUNDS.west);
  const v = (CHINA_BOUNDS.north - lat) / (CHINA_BOUNDS.north - CHINA_BOUNDS.south);
  if (u < 0 || u >= 1 || v < 0 || v >= 1) return false;
  return LAND_MASK[Math.floor(v * LH) * LW + Math.floor(u * LW)] === 1;
}

/** Generic figures stand straight on the map; named heroes keep their own model. */
const bare = (m: ModelRecipe): ModelRecipe => (m.hero ? m : { ...m, bare: true });

type Pt = { lon: number; lat: number };

/** The first free spot at `at` or on a land ring around it, keeping `gap` degrees clear of `taken`. */
function room(at: Pt, taken: Pt[], rings: number[], gap = SPACING): Pt | null {
  let hitWater = false;
  for (const r of rings) {
    for (const offset of [0, Math.PI / 8]) {
      if (offset && !r) break;
      for (let k = 0; k < (r ? 8 : 1); k++) {
        const a = -Math.PI / 4 + offset + (k * Math.PI) / 4;
        const p = { lon: at.lon + r * Math.cos(a) * 1.2, lat: at.lat + r * Math.sin(a) };
        if (taken.some(q => near(q, p, gap))) continue;
        if (r > 0 && !onLand(p.lon, p.lat)) { hitWater = true; continue; }
        return p;
      }
    }
  }
  if (hitWater) {
    const r = rings[rings.length - 1] + 0.6;
    for (let k = 0; k < 16; k++) {
      const a = -Math.PI / 4 + (k * Math.PI) / 8;
      const p = { lon: at.lon + r * Math.cos(a) * 1.2, lat: at.lat + r * Math.sin(a) };
      if (taken.some(q => near(q, p, gap)) || !onLand(p.lon, p.lat)) continue;
      return p;
    }
  }
  return null;
}

/** Generic map objects (banners, armies, plain scrolls) that say little about a place. */
const isLandmark = (m: ModelRecipe | undefined): m is ModelRecipe =>
  !!m && !(m.kind === 'flag' || m.kind === 'army' || (m.kind === 'scroll' && !m.hero));

const near = (a: { lon: number; lat: number }, b: { lon: number; lat: number }, d: number) => Math.hypot(a.lon - b.lon, a.lat - b.lat) < d;

/**
 * Dynasty affinity for events on boundary years or during multi-regime periods (Song / Liao / Western Xia / Jin),
 * preventing one regime's events and historical figures from spilling onto another regime's map.
 */
const EVENT_ERA: Record<string, string | string[]> = {
  xia_found: 'xia', shang_found: 'shang', muye: 'wzhou', qin_unify: 'qin',
  sanguo: 'sanguo', wjin_unify: 'wjin', sui_unify: 'sui',
  liao_found: 'liao', song_found: 'bsong', chanyuan: 'bsong',
  jiaozi: 'bsong', xixia_found: 'xixia', bisheng: 'bsong', wanganshi: 'bsong',
  jin_found: 'jin', qingming: 'bsong', jingkang: ['bsong', 'nsong', 'jin'],
  yuefei: 'nsong', south_shift: 'nsong', genghis: 'yuan',
  yuan_found: 'yuan', marco_polo: 'yuan', ming_found: 'ming',
  li_zicheng: 'ming', roc_found: 'roc', dujiang: 'roc', founding: 'prc',
};

const sceneryCache = new Map<string, SceneryItem[]>();

/**
 * The scenery for a dynasty: landmarks of its key (non-war) textbook events — buildings, works, ships, inventions — and
 * its famous people in period dress standing beside them. Most important events first; nothing piles up on the capital
 * (which has its own palace) or on another landmark.
 */
export function sceneryOf(era: Era, events: HistEvent[] = EVENTS): SceneryItem[] {
  if (events === EVENTS) {
    const hit = sceneryCache.get(era.id);
    if (hit) return hit;
  }
  const inEra = (e: HistEvent) => {
    const pin = EVENT_ERA[e.id];
    if (pin) return Array.isArray(pin) ? pin.includes(era.id) : pin === era.id;
    return e.year >= era.start && e.year <= era.end;
  };
  const list = events
    .filter(e => e.scope === era.scope && !e.source && inEra(e))
    .sort((a, b) => a.weight - b.weight || Number(!!b.model?.hero) - Number(!!a.model?.hero) || a.year - b.year);
  const cap = era.capital ? PLACE.get(era.capital) : undefined;
  const taken: Pt[] = cap ? [cap] : [];
  // curated life of the era first: its people, buildings, customs and foods
  const life: SceneryItem[] = [];
  for (const l of era.scope === 'china' ? lifeOf(era.id) : []) {
    const at = room(l, taken, LIFE_RINGS, LIFE_SPACING);
    if (!at) continue;
    taken.push(at);
    life.push({ event: '', kind: l.kind, ...at, model: l.model, name: l.name, ...(l.person ? { person: l.person } : {}), life: l, level: l.tier === 2 ? 3 : 2, yaw: l.kind === 'person' ? -0.4 : 0.3 });
  }
  const sameModel = (a: ModelRecipe, b: ModelRecipe) => a.style === b.style && (a.hero || b.hero ? a.hero === b.hero : a.kind === b.kind);
  const marks: SceneryItem[] = [];
  for (const e of list) {
    if (marks.length >= MAX_LANDMARKS) break;
    if (e.kind === 'war' || !isLandmark(e.model)) continue;
    // a dynasty's seat is its capital model; generic palaces would only repeat it
    if (e.model.kind === 'palace' && !e.model.hero) continue;
    const m = e.model;
    // one model stands for one subject: never twice on a period's map
    if ([...life, ...marks].some(l => sameModel(l.model, m)) || (cap && sameModel(capitalModel(era), m))) continue;
    const at = room(e, taken, LANDMARK_RINGS);
    if (!at) continue;
    taken.push(at);
    marks.push({ event: e.id, kind: 'landmark', ...at, model: e.model, level: 2, yaw: 0.3 });
  }
  const seen = new Set<string>(life.filter(l => l.kind === 'person').map(l => l.name!.zh));
  const people: SceneryItem[] = [];
  for (const e of list) {
    if (people.length >= MAX_PEOPLE) break;
    const n = e.people?.[0];
    if (!n) continue;
    const zh = n.zh.replace(/（.*）|\(.*\)/g, '').trim();
    if (seen.has(zh)) continue;
    const p = personNamed(n.zh) ?? personNamed(zh);
    if (!p || seen.has(p.name.zh)) continue;
    const model = bare(personModel(p));
    // a named hero already standing as their event's landmark (玄奘西行) or in curated life isn't repeated beside it
    if (model.hero && ([...life, ...marks, ...people].some(x => sameModel(x.model, model)) || LIFE.some(l => sameModel(l.model, model)))) continue;
    const at = room(marks.find(m => m.event === e.id) ?? e, taken, PERSON_RINGS);
    if (!at) continue;
    taken.push(at);
    seen.add(zh);
    seen.add(p.name.zh);
    people.push({ event: e.id, kind: 'person', ...at, model, name: p.name, person: p, level: e.weight === 1 ? 2 : 3, yaw: -0.4 });
  }
  const all = [...life, ...marks, ...people];
  keyItems(all, list);
  if (events === EVENTS) sceneryCache.set(era.id, all);
  return all;
}

/**
 * Raises the period's key items to level 1: its foremost people (curated ones first, then those of its weight-1 events),
 * buildings (curated order) and the landmarks of its weight-1 events, two of each, then the rest in the same order until
 * MAX_KEY.
 */
function keyItems(items: SceneryItem[], events: HistEvent[]): void {
  const w1 = new Set(events.filter(e => e.weight === 1).map(e => e.id));
  const groups = [
    items.filter(s => s.level === 2 && s.kind === 'person'),
    items.filter(s => s.life && s.level === 2 && s.kind === 'building'),
    items.filter(s => s.kind === 'landmark' && w1.has(s.event)),
  ];
  let n = 0;
  for (const take of [2, Infinity]) {
    for (const g of groups) {
      for (const s of g.filter(s => s.level === 2).slice(0, take)) {
        if (n >= MAX_KEY) return;
        s.level = 1;
        n++;
      }
    }
  }
}

let twins: Map<string, HistEvent> | null = null;
/**
 * The event a life item stands for (same Wikipedia article, or a title naming it, in its dynasty, on the same spot):
 * 赵州桥 the building and 赵州桥 the event. On the map the model then speaks for the event and its pin steps aside.
 */
export function lifeEvent(l: LifeItem): HistEvent | undefined {
  if (!twins) {
    twins = new Map();
    for (const x of LIFE) {
      const era = ERAS.find(e => e.id === x.era);
      if (!era) continue;
      const e = EVENTS.find(e => e.scope === 'china' && e.year >= era.start && e.year <= era.end && Math.hypot(e.lon - x.lon, e.lat - x.lat) < 0.3 &&
        ((!!e.wiki?.zh && e.wiki.zh === x.wiki?.zh) || e.title.zh === x.name.zh || (x.kind !== 'person' && e.title.zh.includes(x.name.zh))));
      if (e) twins.set(x.id, e);
    }
  }
  return twins.get(l.id);
}
