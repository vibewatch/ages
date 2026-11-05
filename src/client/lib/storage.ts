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
}

const isValidScores = (v: unknown): v is Record<string, [number, number]> =>
  !!v && typeof v === 'object' && !Array.isArray(v)
  && Object.values(v).every(x => Array.isArray(x) && x.length === 2 && x.every(n => typeof n === 'number' && Number.isFinite(n)) && x[0] >= 0 && x[1] > 0 && x[0] <= x[1]);

const isValidLastLesson = (v: unknown): v is LastLesson | null =>
  v === null || (!!v && typeof v === 'object' && !Array.isArray(v)
    && typeof (v as LastLesson).id === 'string' && (v as LastLesson).id.length > 0
    && ((v as LastLesson).phase === 'steps' || (v as LastLesson).phase === 'check')
    && typeof (v as LastLesson).step === 'number' && Number.isInteger((v as LastLesson).step) && (v as LastLesson).step >= 0);

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

  watch(id: string): void { this.watched.add(id); save('watched', [...this.watched]); }
  toggleLearned(id: string): boolean {
    if (this.learned.has(id)) this.learned.delete(id); else this.learned.add(id);
    save('learned', [...this.learned]);
    return this.learned.has(id);
  }
  addMistake(id: string): void {
    if (!id || this.mistakes.has(id)) return;
    this.mistakes.add(id);
    save('mistakes', [...this.mistakes]);
  }
  resolveMistake(id: string): void {
    if (!this.mistakes.delete(id)) return;
    save('mistakes', [...this.mistakes]);
  }
  saveLessonStep(id: string, phase: 'steps' | 'check', step: number): void {
    this.lastLesson = { id, phase, step: Math.max(0, Math.floor(step)) };
    save('lastLesson', this.lastLesson);
  }
  clearLessonStep(id?: string): void {
    if (id && this.lastLesson?.id !== id) return;
    this.lastLesson = null;
    save('lastLesson', null);
  }
  quiz(score: number): void { if (score > this.best) { this.best = score; save('quizBest', score); } }
  /** the course: best result per lesson / unit test (`test:<book>-<unit>`), as [right, asked] */
  scores = load<Record<string, [number, number]>>('lessons', {}, isValidScores);
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
      lastLesson: this.lastLesson ? { ...this.lastLesson } : null,
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
      if (!isValidScores(b.lessons)) return false;
      if (b.mistakes !== undefined && (!Array.isArray(b.mistakes) || !b.mistakes.every(x => typeof x === 'string'))) return false;
      if (b.lastLesson !== undefined && !isValidLastLesson(b.lastLesson)) return false;

      this.watched = new Set(b.watched);
      this.learned = new Set(b.learned);
      this.mistakes = new Set(b.mistakes ?? []);
      this.best = b.quizBest;
      this.scores = { ...b.lessons };
      this.lastLesson = b.lastLesson ?? null;
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
    save('watched', []);
    save('learned', []);
    save('mistakes', []);
    save('quizBest', 0);
    save('lessons', {});
    save('lastLesson', null);
  }
}
