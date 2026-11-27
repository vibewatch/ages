import type { Chapter } from '../data/chapters.ts';
import { EVENT } from '../data/events.ts';
import { JOURNEYS } from '../data/jiangshan.ts';

/**
 * 课堂演示 — a teacher's playlist: an ordered list of events (each shown on the map, with its 3D story when it has one)
 * and journeys, with a title. It is saved on the device and shared as a short, bounded link:
 * `#show=e.qin_unify~e.zhangqian~j.xuanzang&st=<title>`.
 */
export interface PlayItem { k: 'e' | 'j'; id: string }
export interface Playlist { title: string; items: PlayItem[] }

export const MAX_ITEMS = 40;
export const MAX_TITLE = 60;
const ID = /^[\w-]{1,64}$/;

export const itemExists = (x: PlayItem): boolean => (x.k === 'e' ? EVENT.has(x.id) : JOURNEYS.some(j => j.id === x.id));

/** Keeps known, distinct items, at most MAX_ITEMS. */
export function cleanItems(items: PlayItem[]): PlayItem[] {
  const seen = new Set<string>();
  return items.filter(x => (x.k === 'e' || x.k === 'j') && ID.test(x.id) && itemExists(x) && !seen.has(x.k + x.id) && !!seen.add(x.k + x.id)).slice(0, MAX_ITEMS);
}

export const cleanTitle = (s: string): string => s.replace(/[\u0000-\u001f]/g, '').trim().slice(0, MAX_TITLE);

export function encodePlaylist(items: PlayItem[]): string {
  return cleanItems(items).map(x => `${x.k}.${x.id}`).join('~');
}

export function decodePlaylist(s: string | null | undefined): PlayItem[] {
  if (!s) return [];
  return cleanItems(s.split('~').slice(0, MAX_ITEMS * 2).map(part => {
    const dot = part.indexOf('.');
    return { k: part.slice(0, dot) as PlayItem['k'], id: part.slice(dot + 1) };
  }));
}

/** A chapter as a playlist: its events to know, in order. */
export function chapterPlaylist(c: Chapter, title: string): Playlist {
  return { title: cleanTitle(title), items: cleanItems(c.keys.map(id => ({ k: 'e', id }))) };
}

export const isPlaylist = (v: unknown): v is Playlist =>
  !!v && typeof v === 'object' && !Array.isArray(v) && typeof (v as Playlist).title === 'string' && Array.isArray((v as Playlist).items)
  && (v as Playlist).items.every(x => !!x && typeof x === 'object' && (x.k === 'e' || x.k === 'j') && typeof x.id === 'string');

export function move<T>(a: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (i < 0 || i >= a.length || j < 0 || j >= a.length) return a;
  const b = a.slice();
  [b[i], b[j]] = [b[j], b[i]];
  return b;
}
