import type { Era, HistEvent, I18n, Place } from '../data/types.ts';

export type Hit =
  | { type: 'year'; id: string; label: I18n; year: number; score: number }
  | { type: 'event'; id: string; label: I18n; year: number; score: number }
  | { type: 'era'; id: string; label: I18n; year: number; score: number }
  | { type: 'place'; id: string; label: I18n; score: number; sub?: I18n }
  | { type: 'person'; id: string; label: I18n; score: number; sub?: I18n }
  | { type: 'journey'; id: string; label: I18n; score: number }
  | { type: 'life'; id: string; label: I18n; score: number; sub?: I18n }
  | { type: 'lesson'; id: string; label: I18n; score: number; sub?: I18n }
  | { type: 'trail'; id: string; label: I18n; score: number; sub?: I18n };

export interface SearchPerson { id: string; name: I18n; title: I18n; aliases: string[] }
export interface SearchJourney { id: string; title: I18n; short: I18n }
export interface SearchLife { id: string; name: I18n; desc: I18n }
export interface SearchLesson { id: string; title: I18n; blurb: I18n; sub?: I18n }
export interface SearchTrail { id: string; title: I18n; subtitle: I18n }

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[’'`·\-\s]/g, '');

/** Parses a year query such as "-221", "前221年", "公元前221", "221 BCE", "755", or "1405年". */
export function parseYearQuery(raw: string): number | null {
  const s = raw.trim();
  if (!s) return null;
  let m = /^(?:公元)?前\s*(\d{1,7})\s*年?$/i.exec(s);
  if (m) {
    const n = -Number(m[1]);
    return n >= -1_700_000 && n < 0 ? n : null;
  }
  m = /^(\d{1,7})\s*(?:bce|bc)$/i.exec(s);
  if (m) {
    const n = -Number(m[1]);
    return n >= -1_700_000 && n < 0 ? n : null;
  }
  m = /^-\s*(\d{1,7})$/.exec(s);
  if (m) {
    const n = -Number(m[1]);
    return n >= -1_700_000 && n < 0 ? n : null;
  }
  m = /^(?:公元\s*)?(\d{1,4})\s*(?:年|ce|ad)?$/i.exec(s);
  if (m) {
    const n = Number(m[1]);
    return n >= 1 && n <= 2025 ? n : null;
  }
  return null;
}

/** Scores a text against a query: prefix 3, word-prefix 2, substring 1. */
function score(text: string, q: string): number {
  const t = norm(text);
  if (!q || !t) return 0;
  if (t.startsWith(q)) return 3;
  const words = text.toLowerCase().split(/[\s\-’'(),]+/);
  if (words.some((_, i) => norm(words.slice(i).join('')).startsWith(q))) return 2;
  return t.includes(q) ? 1 : 0;
}
const best = (q: string, ...texts: (string | undefined)[]) => Math.max(0, ...texts.map(t => (t ? score(t, q) : 0)));

/** Bilingual search across years, events, eras, places, people, journeys, everyday life items and lessons. */
export function search(
  query: string,
  src: {
    events: HistEvent[];
    eras: Era[];
    places: Place[];
    people?: SearchPerson[];
    journeys?: SearchJourney[];
    life?: SearchLife[];
    lessons?: SearchLesson[];
    trails?: SearchTrail[];
  },
  limit = 12,
): Hit[] {
  const raw = query.trim();
  const q = norm(raw);
  if (!q) return [];
  const hits: Hit[] = [];
  const yr = parseYearQuery(raw);
  if (yr !== null) {
    hits.push({
      type: 'year',
      id: String(yr),
      label: {
        zh: `跳转至 ${yr < 0 ? `前${-yr}年` : `${yr}年`}`,
        en: `Jump to ${yr < 0 ? `${-yr} BCE` : `${yr} CE`}`,
      },
      year: yr,
      score: 20,
    });
  }
  for (const e of src.events) {
    // curated textbook events rank above imported chronicle entries
    let s = best(q, e.title.zh, e.title.en) * (e.source === 'jiangshan' ? 2 : 3);
    s = Math.max(s, best(q, ...(e.people ?? []).flatMap(p => [p.zh, p.en])) * 2);
    if (!s) s = best(q, e.summary.zh, e.summary.en) > 0 ? 1 : 0;
    if (yr !== null) {
      if (e.year === yr) s = Math.max(s, e.source === 'jiangshan' ? 8 : 12);
      else if (e.end && yr >= e.year && yr <= e.end) s = Math.max(s, 7);
    }
    if (s) hits.push({ type: 'event', id: e.id, label: e.title, year: e.year, score: s + (4 - e.weight) * 0.3 });
  }
  for (const e of src.eras) {
    let s = best(q, e.name.zh, e.name.en, e.short.zh, e.short.en) * 3;
    if (yr !== null && yr >= e.start && yr <= e.end && !e.lane) s = Math.max(s, 6);
    if (s) hits.push({ type: 'era', id: e.id, label: e.name, year: e.start, score: s + 0.5 });
  }
  for (const p of src.places) {
    let s = best(q, p.name.zh, p.name.en, p.modern?.zh, p.modern?.en) * 2;
    // matched only by a historical name / alias: show which one
    let via: I18n | undefined;
    if (!s) {
      const olds = [...(p.names ?? []), ...(p.periods ?? [])].map(n => n.name).concat((p.aliases ?? []).map(a => ({ zh: a, en: a })));
      for (const n of olds) {
        const v = best(q, n.zh, n.en) * 1.6;
        if (v > s) { s = v; via = n; }
      }
    }
    if (s) hits.push({ type: 'place', id: p.id, label: p.name, sub: via, score: s + (3 - p.tier) * 0.2 });
  }
  for (const p of src.people ?? []) {
    const s = best(q, p.name.zh, p.name.en, ...p.aliases) * 2;
    if (s) hits.push({ type: 'person', id: p.id, label: p.name, sub: p.title, score: s + 0.4 });
  }
  for (const j of src.journeys ?? []) {
    const s = best(q, j.title.zh, j.title.en, j.short.zh, j.short.en) * 2;
    if (s) hits.push({ type: 'journey', id: j.id, label: j.title, score: s + 0.3 });
  }
  for (const l of src.life ?? []) {
    const s = best(q, l.name.zh, l.name.en) * 2.2 || (best(q, l.desc.zh, l.desc.en) > 0 ? 1 : 0);
    if (s) hits.push({ type: 'life', id: l.id, label: l.name, score: s + 0.25 });
  }
  for (const ls of src.lessons ?? []) {
    const s = best(q, ls.title.zh, ls.title.en) * 2.2 || (best(q, ls.blurb.zh, ls.blurb.en) > 0 ? 0.9 : 0);
    if (s) hits.push({ type: 'lesson', id: ls.id, label: ls.title, sub: ls.sub, score: s + 0.2 });
  }
  for (const tr of src.trails ?? []) {
    const s = best(q, tr.title.zh, tr.title.en) * 2.4 || (best(q, tr.subtitle.zh, tr.subtitle.en) > 0 ? 1.1 : 0);
    if (s) hits.push({ type: 'trail', id: tr.id, label: tr.title, score: s + 0.35 });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
