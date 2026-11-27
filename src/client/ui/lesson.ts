import { chapterOfLesson, type Chapter } from '../../shared/data/chapters.ts';
import { BOOKS, unitOf } from '../../shared/data/curriculum.ts';
import { EVENT } from '../../shared/data/events.ts';
import { tr } from '../../shared/data/i18n.ts';
import { LESSON } from '../../shared/data/lessons/index.ts';
import type { Book, HistEvent, Lesson, LessonStep, Year } from '../../shared/data/types.ts';
import { lessonQuestions, nextLesson, recallQuestion, unitTest, type Asked } from '../../shared/lib/course.ts';
import { distKm } from '../../shared/lib/quiz.ts';
import { formatYear } from '../../shared/lib/timeline.ts';
import { lang, t } from '../lib/i18n.ts';
import type { Progress } from '../lib/storage.ts';
import type { Atlas } from '../scene/atlas.ts';
import { fill, h, iconBtn } from './dom.ts';

export interface LessonHooks {
  /** moves the timeline and the map to a year */
  year: (y: Year) => void;
  /** plays an event's story */
  play: (e: HistEvent) => void;
  /** opens an event's card over the lesson */
  open: (e: HistEvent) => void;
  /** the lesson was opened (`id`) or closed (null) */
  change: (id: string | null) => void;
  /** the step, phase or question changed (the learning focus follows it) */
  moved?: () => void;
  /** a chapter's check, offered when its last lesson is done */
  check?: (c: Chapter) => void;
}

/** a quick recall question after every RECALL_EVERY steps (not scored) */
const RECALL_EVERY = 3;

/** The book's short name: 七上, 八下, 高中纲要 / G7·1, HS. */
export const bookShort = (b: Book): string => lang === 'zh'
  ? tr(BOOKS[b].name, 'zh').replace('年级', '').replace('册', '').replace('高中《中外历史纲要（上）》', '高中纲要')
  : b === 'hs1' ? 'HS' : b.replace('g', 'G').replace('a', '·1').replace('b', '·2');

/**
 * The lesson player (a side-panel view): a lesson's steps, each one framing the map (year, camera, the event's model, a
 * polity's area), then its 随堂检测 one question at a time, then the score with the take-aways, what to review and the
 * next lesson. A unit test runs the same question loop without steps.
 */
export class LessonView {
  readonly el: HTMLElement;
  private head: HTMLElement;
  private body: HTMLElement;
  private nav: HTMLElement;
  private lesson: Lesson | null = null;
  private test: { book: Book; unit: number } | null = null;
  private phase: 'steps' | 'check' | 'done' = 'steps';
  private i = 0;
  private checkSeed = 0;
  private qs: Asked[] = [];
  private got: (boolean | null)[] = [];
  /** the quick recall on screen (asked after step `after`), and the steps already followed by one */
  private recall: { q: Asked; after: number; picked: number | null } | null = null;
  private recalled = new Set<number>();

  constructor(private atlas: Atlas, private progress: Progress, private hooks: LessonHooks) {
    this.head = h('header', { class: 'view-head ls-head' });
    this.body = h('div', { class: 'view-body ls-body', 'aria-live': 'polite' });
    this.nav = h('div', { class: 'ls-nav' });
    this.el = h('section', { class: 'lesson', hidden: true, role: 'region', 'data-testid': 'lesson' }, this.head, this.body, this.nav);
  }

  get open(): boolean { return !this.el.hidden; }
  get id(): string | null { return this.lesson?.id ?? (this.test ? `test:${this.test.book}-${this.test.unit}` : null); }
  /** where the running lesson (not a unit test) is: for the learning focus */
  get where(): { id: string; phase: 'steps' | 'check' | 'done'; step: number } | null {
    return this.open && this.lesson ? { id: this.lesson.id, phase: this.phase, step: this.recall ? this.recall.after : this.i } : null;
  }

  start(l: Lesson, resume = false): void {
    this.clearMap();
    const prevGot = resume && Array.isArray(this.got) ? [...this.got] : [];
    this.recall = null;
    this.recalled.clear();
    this.lesson = l;
    this.test = null;
    const saved = resume && this.progress.lastLesson?.id === l.id ? this.progress.lastLesson : null;
    if (saved && saved.phase === 'check' && l.checks.length > 0) {
      this.check(saved.seed);
      this.i = Math.min(saved.step, Math.max(0, this.qs.length - 1));
      const srcGot = Array.isArray(saved.got) && saved.got.length ? saved.got : prevGot;
      this.got = this.qs.map((_, k) => (typeof srcGot[k] === 'boolean' ? srcGot[k] : null));
    } else {
      this.phase = 'steps';
      this.i = saved ? Math.min(saved.step, Math.max(0, l.steps.length - 1)) : 0;
      this.qs = [];
      this.got = [];
    }
    this.show();
  }

  startTest(book: Book, unit: number): void {
    this.clearMap();
    this.lesson = null;
    this.test = { book, unit };
    this.check();
    this.show();
  }

  private show(): void {
    if (this.el.hidden) this.el.hidden = false;
    this.render();
    this.hooks.change(this.lesson?.id ?? null);
  }

  /** Leaves the lesson and gives the map back. */
  stop(): void {
    if (this.el.hidden) return;
    this.clearMap();
    this.atlas.select(null);
    this.el.hidden = true;
    this.lesson = this.test = null;
    this.hooks.change(null);
  }

  /** ← / → between steps. */
  step(dir: number): void {
    if (this.phase !== 'steps' || !this.lesson) return;
    // leaving a recall: forward goes on to the next step, back returns to the step it followed
    if (this.recall) {
      this.recall = null;
      if (dir < 0) { this.render(false); return; }
    } else if (dir > 0 && this.offerRecall()) { this.render(false); return; }
    const j = this.i + dir;
    if (j < 0) return;
    if (j >= this.lesson.steps.length) { this.check(); this.render(); return; }
    this.i = j;
    this.render();
  }

  /** In the new language, without moving the map; an answered question keeps its marked options until Next (rebuilding
   * it would offer the question again). */
  relabel(): void {
    if (!this.open || (this.phase === 'check' && this.got[this.i] != null)) return;
    this.render(false);
  }

  /** After every third step (not the last), one "when" question on an event of the steps just read before this one. */
  private offerRecall(): boolean {
    const l = this.lesson!;
    if ((this.i + 1) % RECALL_EVERY !== 0 || this.i >= l.steps.length - 1 || this.recalled.has(this.i)) return false;
    // the step on screen shows its own year, so ask about one read before it
    const pool = l.steps.slice(Math.max(0, this.i - RECALL_EVERY + 1), this.i).flatMap(s => (s.ev ? [s.ev] : []));
    if (!pool.length) return false;
    const seed = Date.now();
    const q = recallQuestion(pool[seed % pool.length], seed);
    if (!q) return false;
    this.recalled.add(this.i);
    this.recall = { q, after: this.i, picked: null };
    return true;
  }

  private check(seed = Date.now()): void {
    this.phase = 'check';
    this.i = 0;
    this.checkSeed = seed;
    this.qs = this.lesson ? lessonQuestions(this.lesson, seed) : unitTest(this.test!.book, this.test!.unit, seed);
    this.got = this.qs.map(() => null);
  }

  private clearMap(): void {
    this.atlas.hold(null);
    this.atlas.setPickMode(null);
    this.atlas.fx.clear('story');
  }

  // ------------------------------------------------------------------------------------------------ rendering

  private render(move = true): void {
    const L = lang;
    const book = this.lesson?.book ?? this.test!.book, unit = this.lesson?.unit ?? this.test!.unit;
    // on the learning path a lesson is "Chapter 5 · lesson 2"; the textbook course keeps its book and unit
    const ch = this.lesson ? chapterOfLesson(this.lesson.id) : undefined;
    const kicker = ch ? t('lsKicker', { n: ch.n, k: ch.lessons.indexOf(this.lesson!.id) + 1 })
      : `${bookShort(book)} · ${t('lsUnit', { n: unit })}${this.test ? ` · ${t('lsTest')}` : ''}`;
    const title = this.lesson ? tr(this.lesson.title, L) : tr(unitOf(book, unit)!.title, L);
    const steps = this.lesson?.steps.length ?? 0;
    const total = steps + (this.phase === 'steps' ? this.lesson!.checks.length : this.qs.length);
    const at = this.phase === 'steps' ? this.i + 1 : this.phase === 'check' ? steps + this.i + 1 : total;
    const n = this.phase === 'steps' ? `${this.i + 1} / ${steps}` : this.phase === 'check' ? `${t('pqTitle')} ${this.i + 1} / ${this.qs.length}` : '';
    fill(this.head,
      h('div', { class: 'ls-t' }, h('small', { class: 'ls-k', text: kicker }), h('h2', { text: title })),
      h('span', { class: 'ls-n', text: n }),
      iconBtn('close', t('close'), () => this.stop()),
      h('i', { class: 'ls-prog', style: `--p:${at / Math.max(total, 1)}` }));
    if (this.lesson) {
      if (this.phase === 'steps') this.progress.saveLessonStep(this.lesson.id, 'steps', this.i);
      else if (this.phase === 'check') this.progress.saveLessonStep(this.lesson.id, 'check', this.i, this.got, this.checkSeed);
      else this.progress.clearLessonStep(this.lesson.id);
    }
    if (this.phase === 'steps' && this.recall) this.renderRecall();
    else if (this.phase === 'steps') this.renderStep(this.lesson!.steps[this.i], move);
    else if (this.phase === 'check') this.renderQuestion(move);
    else this.renderDone();
    this.body.scrollTop = 0;
    this.hooks.moved?.();
  }

  /** The quick recall: one question on what was just read, answered or skipped; the map stays as it was. */
  private renderRecall(): void {
    const L = lang;
    const r = this.recall!, q = r.q;
    if (q.kind !== 'choice') return;
    const out = h('div', { class: 'ls-out' }, r.picked != null ? this.why(q, r.picked === q.answer) : null);
    const opts = q.options.map((o, k) => h('button', {
      type: 'button', class: 'ls-opt' + (r.picked != null ? (k === q.answer ? ' ok' : k === r.picked ? ' bad' : ' dim') : ''), 'data-i': String(k), disabled: r.picked != null,
      onclick: () => { r.picked = k; this.progress.answer('', k === q.answer, [q.ev]); this.render(false); },
    }, h('i', { text: 'ABCDE'[k] }), h('span', { text: tr(o, L) })));
    fill(this.body,
      h('p', { class: 'ls-y rc-k', text: t('rcTitle') }),
      h('p', { class: 'ls-q', 'data-testid': 'lesson-recall', text: tr(q.prompt, L) }),
      h('div', { class: 'ls-opts' }, ...opts),
      out,
      h('p', { class: 'ls-hint', text: t('rcHint') }));
    fill(this.nav,
      h('button', { type: 'button', class: 'btn', 'data-act': 'prev', text: `← ${t('lsPrev')}`, onclick: () => this.step(-1) }),
      h('button', { type: 'button', class: 'btn primary', 'data-act': 'next', text: r.picked != null ? `${t('rcGo')} →` : t('rcSkip'), onclick: () => this.step(1) }));
    if (r.picked != null) (this.nav.lastElementChild as HTMLElement).focus({ preventScroll: true });
  }

  private renderStep(s: LessonStep, move: boolean): void {
    const L = lang;
    const e = s.ev ? EVENT.get(s.ev) : undefined;
    const year = s.year ?? e?.year;
    if (move) this.frame(s, e, year);
    fill(this.body,
      year != null ? h('p', { class: 'ls-y', text: formatYear(year, L) }) : null,
      h('h3', { class: 'ls-h', text: tr(s.title ?? e?.title, L) }),
      h('p', { class: 'ls-p', text: tr(s.body ?? e?.summary, L) }),
      // where it comes from: the textbook unit or the classical source
      s.src ? h('p', { class: 'ls-src', 'data-testid': 'lesson-src' }, h('span', { text: t('lsSource') }), h('cite', { text: tr(s.src, L) })) : null,
      e ? h('div', { class: 'ls-acts' },
        // see it: the step's story is its main action
        e.story ? h('button', { type: 'button', class: 'btn ls-watch', 'data-act': 'watch', onclick: () => this.hooks.play(e) }, h('i', { text: '▶' }), h('span', { text: t('lsWatch') })) : null,
        h('button', { type: 'button', class: 'btn ghost', 'data-act': 'more', text: t('lsMore'), onclick: () => this.hooks.open(e) })) : null);
    const last = this.i === this.lesson!.steps.length - 1;
    fill(this.nav,
      h('button', { type: 'button', class: 'btn', 'data-act': 'prev', text: `← ${t('lsPrev')}`, disabled: this.i === 0, onclick: () => this.step(-1) }),
      h('button', { type: 'button', class: 'btn primary', 'data-act': 'next', text: last ? `${t('lsToCheck')} →` : `${t('lsNext')} →`, onclick: () => this.step(1) }));
  }

  /** Puts the step on the map: its year, the event's model, a polity's area and the camera. */
  private frame(s: LessonStep, e: HistEvent | undefined, year: Year | undefined): void {
    this.clearMap();
    if (year != null) this.hooks.year(year);
    if (e) this.progress.see(e.id);
    if (e) this.atlas.select(e, !s.at && !(s.polity && !s.ev));
    else this.atlas.select(null);
    if (s.at) this.atlas.flyTo({ lon: s.at[0], lat: s.at[1] - (s.at[2] ?? 40) * 0.05, dist: s.at[2] ?? 40, tilt: 0.85 }, 1.6);
    else if (s.polity && !e) this.atlas.flyToPolity(s.polity);
    if (s.polity) this.atlas.hold(s.polity);
  }

  private answered(ok: boolean): void {
    this.got[this.i] = ok;
    if (this.lesson && this.phase === 'check') {
      this.progress.saveLessonStep(this.lesson.id, 'check', Math.min(this.i + 1, Math.max(0, this.qs.length - 1)), this.got, this.checkSeed);
    }
    this.renderNav();
  }

  private renderNav(): void {
    const done = this.got[this.i] != null;
    const last = this.i === this.qs.length - 1;
    fill(this.nav,
      h('span', { class: 'ls-dots', 'aria-hidden': 'true' }, ...this.got.map((g, k) => h('i', { class: g == null ? (k === this.i ? 'cur' : '') : g ? 'ok' : 'no' }))),
      h('button', {
        type: 'button', class: 'btn primary', 'data-act': 'next', disabled: !done, text: last ? t('lsFinish') : `${t('lsNextQ')} →`,
        onclick: () => { this.clearMap(); if (last) this.phase = 'done'; else this.i++; this.render(); },
      }));
    if (done) (this.nav.lastElementChild as HTMLElement).focus({ preventScroll: true });
  }

  private why(q: Asked, ok: boolean): HTMLElement {
    return h('p', { class: `ls-res ${ok ? 'ok' : 'bad'}` }, h('b', { text: t(ok ? 'pqRight' : 'pqWrong') }), h('span', { text: tr(q.why, lang) }));
  }

  private renderQuestion(move = true): void {
    const L = lang;
    const q = this.qs[this.i];
    const out = h('div', { class: 'ls-out' });
    const nodes: (Node | null)[] = [h('p', { class: 'ls-q', text: tr(q.prompt, L) })];
    if (q.kind === 'choice') {
      const opts = q.options.map((o, k) => h('button', {
        type: 'button', class: 'ls-opt', 'data-i': String(k),
        onclick: () => {
          const ok = k === q.answer;
          opts.forEach((b, j) => { b.disabled = true; b.classList.add(j === q.answer ? 'ok' : j === k ? 'bad' : 'dim'); });
          out.replaceChildren(this.why(q, ok));
          const mKey = q.key ?? (q.ev ? `choice:${q.ev}` : '');
          this.progress.answer(mKey, ok, [q.ev]);
          if (q.ev) this.reveal(q.ev);
          this.answered(ok);
        },
      }, h('i', { text: 'ABCDE'[k] }), h('span', { text: tr(o, L) })));
      nodes.push(h('div', { class: 'ls-opts' }, ...opts));
    } else if (q.kind === 'order') {
      const picked: string[] = [];
      const list = h('ol', { class: 'ls-order' });
      const ok = h('button', { type: 'button', class: 'btn primary', 'data-act': 'check', text: t('lsCheck'), disabled: true });
      const btns = q.items.map(id => {
        const e = EVENT.get(id)!;
        const b = h('button', { type: 'button', class: 'ls-opt', 'data-id': id, onclick: () => {
          if (picked.includes(id) || ok.dataset.done) return;
          picked.push(id);
          b.disabled = true;
          list.append(h('li', { text: tr(e.title, L) }));
          ok.disabled = picked.length !== q.items.length;
        } }, h('span', { text: tr(e.title, L) }));
        return b;
      });
      const undo = h('button', { type: 'button', class: 'btn', text: t('lsUndo'), onclick: () => {
        if (ok.dataset.done) return;
        const id = picked.pop();
        if (!id) return;
        list.lastElementChild?.remove();
        btns.find(b => b.dataset.id === id)!.disabled = false;
        ok.disabled = true;
      } });
      ok.addEventListener('click', () => {
        ok.dataset.done = '1';
        ok.disabled = undo.disabled = true;
        const right = picked.every((id, k) => id === q.answer[k]);
        const mKey = q.key ?? `order:${q.answer.join(',')}`;
        this.progress.answer(mKey, right, q.answer);
        list.replaceChildren(...q.answer.map((id, k) => h('li', { class: picked[k] === id ? 'ok' : 'bad', text: `${formatYear(EVENT.get(id)!.year, L, { short: true })} · ${tr(EVENT.get(id)!.title, L)}` })));
        out.replaceChildren(this.why(q, right));
        this.answered(right);
      });
      nodes.push(h('p', { class: 'ls-hint', text: t('lsOrderHint') }), h('div', { class: 'ls-opts' }, ...btns), list, h('div', { class: 'ls-acts' }, undo, ok));
    } else {
      nodes.push(h('p', { class: 'ls-hint', text: t('lsPick') }));
      if (move) void this.atlas.home();
      this.atlas.setPickMode((lon, lat) => {
        this.atlas.setPickMode(null);
        const km = Math.round(distKm([lon, lat], [q.lon, q.lat]));
        const right = km <= q.tol;
        const mKey = q.key ?? (q.ev ? `where:${q.ev}` : '');
        this.progress.answer(mKey, right, [q.ev]);
        this.atlas.fx.spawn({ lon, lat, model: { kind: 'flag', color: '#2e86de' }, scale: 0.8 });
        this.atlas.fx.ring(this.atlas.geo.pos(q.lon, q.lat, 0.02), right ? '#5bd36b' : '#ff6b4a', 4);
        this.atlas.fx.spawn({ lon: q.lon, lat: q.lat, model: { kind: 'flag', color: '#c8372d' }, scale: 0.8, label: tr(q.name, L) });
        this.atlas.flyTo({ lon: q.lon, lat: q.lat - 1.5, dist: 34, tilt: 0.85 }, 1.4);
        out.replaceChildren(h('p', { class: 'ls-km', text: t('lsKm', { n: km }) }), this.why(q, right));
        this.answered(right);
      });
    }
    nodes.push(out);
    fill(this.body, ...nodes);
    this.renderNav();
  }

  /** Shows a question's event on the map once answered. */
  private reveal(id: string): void {
    const e = EVENT.get(id);
    if (!e) return;
    this.hooks.year(e.year);
    this.atlas.select(e, true);
  }

  private renderDone(): void {
    const L = lang;
    const right = this.got.filter(Boolean).length, n = this.qs.length;
    const id = this.id!;
    this.progress.score(id, right, n);
    const missed = [...new Set(this.qs.flatMap((q, k) => {
      if (this.got[k]) return [];
      return q.kind === 'order' ? q.answer : q.ev ? [q.ev] : [];
    }))].map(x => EVENT.get(x)!).filter(Boolean);
    // on the learning path the next lesson is the chapter's next one, and after its last the chapter check
    const ch = this.lesson ? chapterOfLesson(this.lesson.id) : undefined;
    const pathNext = ch ? ch.lessons[ch.lessons.indexOf(this.lesson!.id) + 1] : undefined;
    const next = ch ? (pathNext ? LESSON.get(pathNext) : undefined) : this.lesson ? nextLesson(this.lesson.id) : undefined;
    const toCheck = ch && !pathNext && this.hooks.check ? ch : null;
    fill(this.body,
      h('div', { class: 'ls-score', style: `--p:${n ? right / n : 0}` }, h('b', { text: `${right}/${n}` }), h('span', { text: t('lsScore', { s: right, n }) })),
      this.lesson ? h('section', { class: 'ls-sec' }, h('h3', { text: t('lsKeys') }), h('ul', { class: 'ls-keys' }, ...this.lesson.keys.map(k => h('li', { text: tr(k, L) })))) : null,
      missed.length ? h('section', { class: 'ls-sec' }, h('h3', { text: t('lsReview') }), h('div', { class: 'ls-rev' }, ...missed.map(e => h('button', {
        type: 'button', class: 'chip', text: tr(e.title, L), onclick: () => this.hooks.open(e),
      })))) : null);
    fill(this.nav,
      h('button', { type: 'button', class: 'btn', 'data-act': 'again', text: this.lesson ? t('lsAgain') : t('again'), onclick: () => (this.lesson ? this.start(this.lesson) : this.startTest(this.test!.book, this.test!.unit)) }),
      next
        ? h('button', { type: 'button', class: 'btn primary', 'data-act': 'next-lesson', text: `${t('lsNextLesson')} →`, title: tr(next.title, L), onclick: () => this.start(next) })
        : toCheck
          ? h('button', { type: 'button', class: 'btn primary', 'data-act': 'chapter-check', text: `${t('chCheck')} →`, title: t('lsChapterDone'), onclick: () => { this.stop(); this.hooks.check!(toCheck); } })
          : h('button', { type: 'button', class: 'btn primary', 'data-act': 'back', text: ch ? t('chBackPath') : t('lsBack'), onclick: () => this.stop() }));
  }
}
