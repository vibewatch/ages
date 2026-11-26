import { expect } from 'vitest';
import { BOOKS, UNITS } from '../../src/shared/data/curriculum.ts';
import { EVENT } from '../../src/shared/data/events.ts';
import { PLACE } from '../../src/shared/data/places.ts';
import { POLITY } from '../../src/shared/data/polities.ts';
import type { I18n, Lesson } from '../../src/shared/data/types.ts';

const CJK = /[㐀-鿿]/;
/** English without Chinese characters, Chinese with them. */
export const bilingual = (s: I18n | undefined, where: string): void => {
  expect(s, where).toBeTruthy();
  expect(s!.zh, where).toMatch(CJK);
  expect(s!.en ?? '', where).not.toMatch(CJK);
  expect((s!.en ?? '').trim().length, where).toBeGreaterThan(1);
};

/** The content rules every lesson follows (docs/design/course.md). */
export function checkLesson(l: Lesson): void {
  expect(BOOKS[l.book], l.id).toBeTruthy();
  expect(UNITS.some(u => u.book === l.book && u.unit === l.unit), `${l.id} unit`).toBe(true);
  bilingual(l.title, l.id); bilingual(l.blurb, l.id);
  expect(l.minutes, l.id).toBeGreaterThan(0);
  expect(l.steps.length, l.id).toBeGreaterThanOrEqual(3);
  expect(l.checks.length, l.id).toBeGreaterThanOrEqual(3);
  expect(l.keys.length, l.id).toBeGreaterThanOrEqual(2);
  l.keys.forEach((k, i) => bilingual(k, `${l.id} key ${i}`));
  expect(l.steps.some(s => s.body), `${l.id} has a written step`).toBe(true);
  expect(l.checks.some(c => 'q' in c), `${l.id} has a written question`).toBe(true);
  l.steps.forEach((s, i) => {
    const w = `${l.id} step ${i}`;
    if (s.ev) expect(EVENT.get(s.ev), `${w} event ${s.ev}`).toBeTruthy();
    else { bilingual(s.title, w); bilingual(s.body, w); expect(s.year ?? null, w).not.toBeNull(); }
    if (s.title) bilingual(s.title, w);
    if (s.body) bilingual(s.body, w);
    if (s.polity) expect(POLITY.get(s.polity), `${w} polity ${s.polity}`).toBeTruthy();
    if (s.at) {
      const [lon, lat, d] = s.at;
      expect(lon, w).toBeGreaterThan(60); expect(lon, w).toBeLessThan(150);
      expect(lat, w).toBeGreaterThan(5); expect(lat, w).toBeLessThan(60);
      if (d != null) { expect(d, w).toBeGreaterThan(4); expect(d, w).toBeLessThan(200); }
    }
    expect(!!(s.ev || s.at || s.polity), `${w} frames nothing`).toBe(true);
  });
  l.checks.forEach((c, i) => {
    const w = `${l.id} check ${i}`;
    if ('q' in c) {
      bilingual(c.q, w); bilingual(c.why, w);
      expect(c.options.length, w).toBeGreaterThanOrEqual(3);
      expect(c.options.length, w).toBeLessThanOrEqual(5);
      c.options.forEach(o => bilingual(o, w));
      expect(new Set(c.options.map(o => o.zh)).size, w).toBe(c.options.length);
      expect(new Set(c.options.map(o => o.en)).size, w).toBe(c.options.length);
      expect(Number.isInteger(c.answer) && c.answer >= 0 && c.answer < c.options.length, w).toBe(true);
      if (c.ev) expect(EVENT.get(c.ev), `${w} event ${c.ev}`).toBeTruthy();
    } else if ('order' in c) {
      expect(c.order.length, w).toBeGreaterThanOrEqual(3);
      expect(c.order.length, w).toBeLessThanOrEqual(5);
      const evs = c.order.map(id => EVENT.get(id));
      evs.forEach((e, k) => expect(e, `${w} ${c.order[k]}`).toBeTruthy());
      expect(new Set(evs.map(e => e!.year)).size, `${w} distinct years`).toBe(c.order.length);
      if (c.why) bilingual(c.why, w);
    } else {
      expect(EVENT.get(c.where) ?? PLACE.get(c.where), `${w} where ${c.where}`).toBeTruthy();
      if (c.tol != null) { expect(c.tol, w).toBeGreaterThanOrEqual(100); expect(c.tol, w).toBeLessThanOrEqual(1000); }
      if (c.why) bilingual(c.why, w);
    }
  });
}
