import { answered, isMasteryRec, seen, type MasteryRec } from '../../shared/lib/mastery.ts';

/** Small localStorage wrapper (silently in-memory when storage is unavailable, e.g. private mode). */
const mem = new Map<string, string>();
const unsaved = new Set<string>();
const KEY = 'ages:';

/** A saved value, or `d` when there is none or it is not of the default's kind (or fails `ok`): a stale or foreign
 * value under our key (another app on the same origin, an older version) must never break start-up. */
export function load<T>(k: string, d: T, ok?: (v: unknown) => boolean): T {
  let raw = mem.get(k);
  if (!unsaved.has(k)) {
    try {
      raw = localStorage.getItem(KEY + k) ?? undefined;
      if (raw === undefined) mem.delete(k); else mem.set(k, raw);
    } catch { /* use the in-memory copy */ }
  }
  if (raw == null) return d;
  try {
    const v: unknown = JSON.parse(raw);
    if (ok) return ok(v) ? v as T : d;
    if (d == null) return v as T;
    if (Array.isArray(d) !== Array.isArray(v) || typeof v !== typeof d || v === null) return d;
    if (typeof v === 'number' && !Number.isFinite(v)) return d;
    return v as T;
  } catch { return d; }
}

const strings = (v: string[]): string[] => v.filter(x => typeof x === 'string');

export interface LastLesson {
  id: string;
  phase: 'steps' | 'check';
  step: number;
  got?: (boolean | null)[];
  seed?: number;
}

export interface ProgressBackup {
  version: 1;
  exportedAt: string;
  watched: string[];
  learned: string[];
  quizBest: number;
  lessons: Record<string, [number, number]>;
  mistakes: string[];
  lastLesson: LastLesson | null;
  /** spaced review schedule (optional: older backups have none) */
  spaced?: Record<string, Spaced>;
  /** mastery per event (optional: older backups have none) */
  mastery?: Record<string, MasteryRec>;
  /** activity per day (optional) */
  days?: Record<string, number>;
}

/** A missed question in spaced review: `box` = reviews passed so far; `due` = when it comes back (ms), null while it is
 * in the review queue. */
export interface Spaced { box: number; due: number | null }
/** days until a reviewed mistake comes back, by box */
export const REVIEW_GAPS = [1, 3, 7];
const DAY = 86_400_000;

const isSpaced = (x: unknown): x is Spaced => !!x && typeof x === 'object' && Number.isInteger((x as Spaced).box) && (x as Spaced).box >= 0
  && ((x as Spaced).due === null || (typeof (x as Spaced).due === 'number' && Number.isFinite((x as Spaced).due)));
const isScore = (x: unknown): x is [number, number] =>
  Array.isArray(x) && x.length === 2 && x.every(n => typeof n === 'number' && Number.isFinite(n)) && x[0] >= 0 && x[1] > 0 && x[0] <= x[1];
const isMap = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
/** The valid entries of a saved map: one bad entry (an older version's, a hand-edited backup's) is dropped, not the rest. */
const entries = <T>(v: unknown, ok: (x: unknown) => x is T): Record<string, T> =>
  isMap(v) ? Object.fromEntries(Object.entries(v).filter((e): e is [string, T] => ok(e[1]))) : {};
const loadMap = <T>(k: string, ok: (x: unknown) => x is T): Record<string, T> => entries(load<unknown>(k, {}, isMap), ok);
const isDay = (n: unknown): n is number => typeof n === 'number' && Number.isFinite(n);

const isValidLastLesson = (v: unknown): v is LastLesson | null =>
  v === null || (!!v && typeof v === 'object' && !Array.isArray(v)
    && typeof (v as LastLesson).id === 'string' && (v as LastLesson).id.length > 0
    && ((v as LastLesson).phase === 'steps' || (v as LastLesson).phase === 'check')
    && typeof (v as LastLesson).step === 'number' && Number.isInteger((v as LastLesson).step) && (v as LastLesson).step >= 0
    && ((v as LastLesson).got === undefined || (Array.isArray((v as LastLesson).got) && (v as LastLesson).got!.every(x => x === null || typeof x === 'boolean')))
    && ((v as LastLesson).seed === undefined || (typeof (v as LastLesson).seed === 'number' && Number.isFinite((v as LastLesson).seed))));

export function save(k: string, v: unknown): void {
  const s = JSON.stringify(v);
  mem.set(k, s);
  try { localStorage.setItem(KEY + k, s); unsaved.delete(k); } catch { unsaved.add(k); }
}

/** Learning progress: events whose story was watched, events marked as learned, missed questions, and the course's best scores. */
export class Progress {
  watched = new Set<string>(strings(load<string[]>('watched', [])));
  learned = new Set<string>(strings(load<string[]>('learned', [])));
  mistakes = new Set<string>(strings(load<string[]>('mistakes', [])));
  best = load<number>('quizBest', 0);
  lastLesson = load<LastLesson | null>('lastLesson', null, isValidLastLesson);
  spaced = loadMap('spaced', isSpaced);
  mastery = loadMap('mastery', isMasteryRec);
  /** days with any learning activity (YYYY-MM-DD), for the streak and the weekly report */
  days = loadMap('days', isDay);

  private active(now: number): void {
    const d = new Date(now);
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    this.days[k] = (this.days[k] ?? 0) + 1;
    save('days', this.days);
  }
  /** called after the mastery of any event changed (the map repaints its marks) */
  onMastery: () => void = () => {};
  /** An event was met: its card, a lesson step, its story. */
  see(id: string, now = Date.now()): void {
    if (!id || this.mastery[id]?.s != null) return;
    this.mastery[id] = seen(this.mastery[id], now);
    save('mastery', this.mastery);
    this.onMastery();
  }
  /** A question was answered: the mistake queue (by `key`) and the mastery of the events it was about. */
  answer(key: string, ok: boolean, events: (string | undefined)[] = [], now = Date.now()): void {
    if (key) { if (ok) this.resolveMistake(key, now); else this.addMistake(key); }
    const ids = [...new Set(events.filter((x): x is string => !!x))];
    for (const id of ids) this.mastery[id] = answered(this.mastery[id], ok, now);
    if (ids.length) { save('mastery', this.mastery); this.onMastery(); }
    this.active(now);
  }

  watch(id: string): void { this.watched.add(id); save('watched', [...this.watched]); }
  toggleLearned(id: string): boolean {
    if (this.learned.has(id)) this.learned.delete(id); else this.learned.add(id);
    save('learned', [...this.learned]);
    return this.learned.has(id);
  }
  addMistake(id: string): void {
    if (!id) return;
    // missed again: its spacing starts over
    if (this.spaced[id]?.box || this.spaced[id]?.due != null) { this.spaced[id] = { box: 0, due: null }; save('spaced', this.spaced); }
    if (this.mistakes.has(id)) return;
    this.mistakes.add(id);
    this.spaced[id] = { box: 0, due: null };
    save('mistakes', [...this.mistakes]);
    save('spaced', this.spaced);
  }
  /** Forgets mistakes that can no longer be asked (their lesson check or event was removed). */
  dropMistakes(ids: string[]): void {
    if (!ids.filter(k => this.mistakes.delete(k)).length) return;
    for (const k of ids) delete this.spaced[k];
    save('mistakes', [...this.mistakes]);
    save('spaced', this.spaced);
  }
  /** A missed question answered right: it leaves the queue and comes back after 1, 3 and then 7 days; right after the
   * last gap it is learned. */
  resolveMistake(id: string, now = Date.now()): void {
    const keys = [id, ...(id.startsWith('when:') ? [id.slice(5)] : [])].filter(k => this.mistakes.delete(k));
    if (!keys.length) return;
    for (const k of keys) {
      const box = this.spaced[k]?.box ?? 0;
      if (box < REVIEW_GAPS.length) this.spaced[k] = { box: box + 1, due: now + REVIEW_GAPS[box] * DAY };
      else delete this.spaced[k];
    }
    save('mistakes', [...this.mistakes]);
    save('spaced', this.spaced);
  }
  /** Puts the mistakes whose review is due back into the queue; returns how many came back. */
  promoteDue(now = Date.now()): number {
    let n = 0;
    for (const [k, s] of Object.entries(this.spaced)) {
      if (s.due == null || s.due > now) continue;
      this.spaced[k] = { box: s.box, due: null };
      if (!this.mistakes.has(k)) { this.mistakes.add(k); n++; }
    }
    if (n) { save('mistakes', [...this.mistakes]); save('spaced', this.spaced); }
    return n;
  }
  /** mistakes scheduled to come back later */
  get scheduled(): number { return Object.values(this.spaced).filter(s => s.due != null).length; }
  /** A learning-path chapter's check, as [right, asked]; passed at 60 %. */
  chapterPassed(id: string): boolean { const b = this.scores[`chapter:${id}`]; return !!b && b[0] / b[1] >= 0.6; }
  saveLessonStep(id: string, phase: 'steps' | 'check', step: number, got?: (boolean | null)[], seed?: number): void {
    const next: LastLesson = { id, phase, step: Math.max(0, Math.floor(step)) };
    if (got && got.length) next.got = got.map(x => (typeof x === 'boolean' ? x : null));
    if (seed != null && Number.isFinite(seed)) next.seed = seed;
    this.lastLesson = next;
    save('lastLesson', this.lastLesson);
  }
  clearLessonStep(id?: string): void {
    if (id && this.lastLesson?.id !== id) return;
    this.lastLesson = null;
    save('lastLesson', null);
  }
  quiz(score: number): void { if (score > this.best) { this.best = score; save('quizBest', score); } }
  /** the course: best result per lesson / unit test (`test:<book>-<unit>`), as [right, asked] */
  scores = loadMap('lessons', isScore);
  score(id: string, right: number, n: number): void {
    if (n <= 0) return;
    const b = this.scores[id];
    if (!b || right / n >= b[0] / b[1]) { this.scores[id] = [right, n]; save('lessons', this.scores); }
  }

  /** Exports all local learning progress as a versioned JSON backup string. */
  exportData(): string {
    const payload: ProgressBackup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      watched: [...this.watched],
      learned: [...this.learned],
      quizBest: this.best,
      lessons: { ...this.scores },
      mistakes: [...this.mistakes],
      spaced: { ...this.spaced },
      mastery: { ...this.mastery },
      days: { ...this.days },
      lastLesson: this.lastLesson
        ? {
          ...this.lastLesson,
          ...(this.lastLesson.got ? { got: [...this.lastLesson.got] } : {}),
        }
        : null,
    };
    return JSON.stringify(payload, null, 2);
  }

  /** Imports a versioned JSON backup; returns false without altering state if the input is invalid or incompatible. */
  importData(raw: string): boolean {
    try {
      const v: unknown = JSON.parse(raw);
      if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
      const b = v as Partial<ProgressBackup>;
      if (b.version !== 1) return false;
      if (!Array.isArray(b.watched) || !b.watched.every(x => typeof x === 'string')) return false;
      if (!Array.isArray(b.learned) || !b.learned.every(x => typeof x === 'string')) return false;
      if (typeof b.quizBest !== 'number' || !Number.isFinite(b.quizBest) || b.quizBest < 0) return false;
      if (!isMap(b.lessons)) return false;
      if (b.mistakes !== undefined && (!Array.isArray(b.mistakes) || !b.mistakes.every(x => typeof x === 'string'))) return false;
      if (b.lastLesson !== undefined && !isValidLastLesson(b.lastLesson)) return false;
      if (b.spaced !== undefined && !isMap(b.spaced)) return false;
      if (b.mastery !== undefined && !isMap(b.mastery)) return false;

      this.watched = new Set(b.watched);
      this.learned = new Set(b.learned);
      this.mistakes = new Set(b.mistakes ?? []);
      this.best = b.quizBest;
      this.scores = entries(b.lessons, isScore);
      this.lastLesson = b.lastLesson ?? null;
      this.spaced = entries(b.spaced, isSpaced);
      this.mastery = entries(b.mastery, isMasteryRec);
      if (b.days && typeof b.days === 'object' && !Array.isArray(b.days)) this.days = Object.fromEntries(Object.entries(b.days).filter(([, n]) => typeof n === 'number' && Number.isFinite(n)));
      save('days', this.days);
      save('spaced', this.spaced);
      save('mastery', this.mastery);
      save('watched', [...this.watched]);
      save('learned', [...this.learned]);
      save('mistakes', [...this.mistakes]);
      save('quizBest', this.best);
      save('lessons', this.scores);
      save('lastLesson', this.lastLesson);
      return true;
    } catch {
      return false;
    }
  }

  /** Resets all local progress back to empty defaults. */
  reset(): void {
    this.watched.clear();
    this.learned.clear();
    this.mistakes.clear();
    this.best = 0;
    this.scores = {};
    this.lastLesson = null;
    this.spaced = {};
    this.mastery = {};
    this.days = {};
    save('spaced', {});
    save('mastery', {});
    save('days', {});
    save('watched', []);
    save('learned', []);
    save('mistakes', []);
    save('quizBest', 0);
    save('lessons', {});
    save('lastLesson', null);
  }
}
