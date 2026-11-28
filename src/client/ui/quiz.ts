import type { Chapter } from '../../shared/data/chapters.ts';
import { BOOKS } from '../../shared/data/curriculum.ts';
import { ERAS } from '../../shared/data/eras.ts';
import { EVENT, EVENTS } from '../../shared/data/events.ts';
import { tr } from '../../shared/data/i18n.ts';
import type { Book, HistEvent, I18n, LonLat } from '../../shared/data/types.ts';
import { snapshotAt } from '../../shared/data/territories.ts';
import { gradeDraw, overlap } from '../../shared/lib/draw.ts';
import { PLACE, PLACES } from '../../shared/data/places.ts';
import { makeMapQuiz } from '../../shared/lib/mapread.ts';
import { distKm, gradeWhere, locatePoints, makeLocateQuiz, makeMistakeQuiz, makeQuiz, rankOf, type Question } from '../../shared/lib/quiz.ts';
import { formatYear } from '../../shared/lib/timeline.ts';
import { lang, t } from '../lib/i18n.ts';
import type { Progress } from '../lib/storage.ts';
import type { Atlas } from '../scene/atlas.ts';
import { fill, h, iconBtn } from './dom.ts';

/** Quiz panel: "when" (multiple choice), "where" (click the map), "order" (tap in time order), 读图题 (read an unlabelled
 * map), ancient places and mistake review. */
type Mode = 'events' | 'maps' | 'locate' | 'mistakes';
const MODES: Mode[] = ['events', 'maps', 'locate', 'mistakes'];

export class Quiz {
  readonly el: HTMLElement;
  private body: HTMLElement;
  private qs: Question[] = [];
  private i = 0;
  private score = 0;
  private book: Book | '' = '';
  private era = '';
  private mode: Mode = 'events';
  /** a learning-path chapter's check (5 questions from its years, its events to know first) */
  chapter: Chapter | null = null;
  /** where the quiz is, so a language switch re-renders it in place */
  private phase: 'setup' | 'ask' | 'done' = 'setup';
  private answered = false;
  onClose: () => void = () => {};
  onOpenEvent: (e: HistEvent) => void = () => {};
  /** moves the whole app (timeline + map) to a question's year */
  onYear: (y: number) => void = y => this.atlas.setYear(y);
  /** hides (or shows again) every name on the map and the HUD's year for a map-reading question */
  onBlind: (on: boolean) => void = on => this.atlas.setBlind(on);

  constructor(private atlas: Atlas, private progress: Progress) {
    this.body = h('div', { class: 'qz-body' });
    this.el = h('section', { class: 'quiz', hidden: true, role: 'dialog', 'aria-label': t('quizTitle') }, this.body);
  }

  get open(): boolean { return !this.el.hidden; }

  toggle(on = this.el.hidden): void {
    this.el.hidden = !on;
    if (on) this.setup(); else { this.atlas.setPickMode(null); this.clearMap(); this.atlas.fx.clear('story'); this.onClose(); }
  }

  private head(extra: string): HTMLElement {
    const title = this.chapter ? t('chCheckTitle', { n: this.chapter.n, t: tr(this.chapter.title, lang) }) : t('quizTitle');
    return h('header', {}, h('h2', { text: title }), h('span', { class: 'qz-n', text: extra }), iconBtn('close', t('close'), () => this.toggle(false)));
  }

  private setup(): void {
    this.phase = 'setup';
    this.chapter = null;
    this.extra = [];
    this.mapRange = null;
    this.atlas.setPickMode(null);
    this.clearMap();
    const mistakeCount = this.progress.mistakes.size;
    if (this.mode === 'mistakes' && mistakeCount === 0) this.mode = 'events';
    const sel = h('select', { 'aria-label': t('quizBook') },
      h('option', { value: '', text: t('allBooks') }),
      ...(Object.keys(BOOKS) as Book[]).map(b => h('option', { value: b, text: tr(BOOKS[b].name, lang) })));
    sel.value = this.book;
    const eraSel = h('select', { 'data-testid': 'quiz-era', 'aria-label': t('dynasty') },
      h('option', { value: '', text: t('allEras') }),
      ...ERAS.filter(e => e.scope === 'china').map(e => h('option', { value: e.id, text: tr(e.name, lang) })));
    eraSel.value = this.era;
    sel.addEventListener('change', () => {
      this.book = sel.value as Book | '';
      if (this.book && this.era) { this.era = ''; eraSel.value = ''; }
    });
    eraSel.addEventListener('change', () => {
      this.era = eraSel.value;
      if (this.era && this.book) { this.book = ''; sel.value = ''; }
    });
    const modeTitle = (m: Mode) => m === 'events' ? t('qmEvents') : m === 'maps' ? t('qmMaps') : m === 'locate' ? t('qmLocate') : t('qmMistakes');
    const modeDesc = (m: Mode) => m === 'events' ? t('qmEventsDesc') : m === 'maps' ? t('qmMapsDesc') : m === 'locate' ? t('qmLocateDesc') : mistakeCount ? t('qmMistakesDesc', { n: mistakeCount }) : t('noMistakes');
    const modes = h('div', { class: 'qz-modes', role: 'radiogroup' }, ...MODES.map(m => h('button', {
      type: 'button', role: 'radio', class: 'qz-mode' + (this.mode === m ? ' on' : ''), 'data-mode': m, 'aria-checked': String(this.mode === m),
      disabled: m === 'mistakes' && mistakeCount === 0,
      onclick: () => { this.mode = m; this.setup(); },
    }, h('b', { text: modeTitle(m) }), h('small', { text: modeDesc(m) }))));
    this.body.replaceChildren(
      this.head(this.progress.best ? t('best', { n: this.progress.best }) : ''),
      modes,
      h('div', { class: 'qz-row qz-filters' },
        this.mode === 'events'
          ? h('div', { class: 'qz-selects' },
              h('label', {}, h('span', { text: t('quizBook') + ' ' }), sel),
              h('label', {}, h('span', { text: t('dynasty') + ' ' }), eraSel))
          : h('span'),
        h('button', { type: 'button', class: 'btn primary', 'data-act': 'start', disabled: this.mode === 'mistakes' && mistakeCount === 0, text: t('start'), onclick: () => this.start() })));
  }

  /** events falling due, asked after the mistakes in today's review */
  private extra: string[] = [];
  /** a chapter's years, for a round of 读图题 on its maps only */
  private mapRange: [number, number] | null = null;

  /** A round of 读图题 on one chapter's maps. */
  startMapChapter(c: Chapter, seed = Date.now()): void {
    this.chapter = null;
    this.extra = [];
    this.mode = 'maps';
    this.mapRange = c.span;
    // shown only once the round is allowed (a gated build may refuse it)
    if (this.start(seed)) this.el.hidden = false;
  }

  /** Today's review: the mistakes queue, then `due` events (alternating when / where), at most 12 questions. */
  startReview(due: string[], seed = Date.now()): void {
    this.chapter = null;
    this.mapRange = null;
    this.mode = 'mistakes';
    this.extra = due;
    this.el.hidden = false;
    this.start(seed);
  }

  /** Opens the quiz directly in mistake-review mode. */
  startMistakes(seed = Date.now()): void {
    this.chapter = null;
    this.mapRange = null;
    this.extra = [];
    this.mode = 'mistakes';
    this.el.hidden = false;
    this.start(seed);
  }

  /** Opens the quiz directly filtered to a specific dynasty/era. */
  startEra(eraId: string, seed = Date.now()): void {
    this.chapter = null;
    this.mapRange = null;
    this.mode = 'events';
    this.book = '';
    this.era = eraId;
    this.el.hidden = false;
    this.start(seed);
  }

  /** Opens a learning-path chapter's check. */
  startChapter(c: Chapter, seed = Date.now()): void {
    this.mapRange = null;
    this.mode = 'events';
    this.chapter = c;
    this.el.hidden = false;
    this.start(seed);
  }

  /** asked before a round of 读图题 (a gated build counts and may refuse it) */
  beforeMaps: () => boolean = () => true;

  /** Today's review: mistakes (at most 8 when events are due, so those get asked too), then the due events. Mistakes
   * that no longer make a question (their lesson check or event is gone) leave the queue instead of haunting it. */
  private review(seed: number): Question[] {
    const queued = [...this.progress.mistakes];
    const missed = makeMistakeQuiz(EVENTS, queued, seed);
    const built = new Set(missed.map(q => ('key' in q ? q.key : undefined)));
    const lost = queued.filter(k => !built.has(k));
    if (lost.length) this.progress.dropMistakes(lost);
    const due = makeMistakeQuiz(EVENTS, this.extra.map((id, k) => `${k % 2 ? 'where' : 'when'}:${id}`), seed + 1);
    return [...missed.slice(0, due.length ? 8 : 12), ...due].slice(0, 12);
  }

  /** Starts a round; false when it was refused (读图题 over a gated build's free limit). */
  start(seed = Date.now()): boolean {
    const c = this.chapter;
    if (!c && this.mode === 'maps' && !this.beforeMaps()) return false;
    this.qs = c ? makeQuiz(EVENTS, { n: 5, seed, range: c.span, prefer: c.keys })
      : this.mode === 'maps'
      ? makeMapQuiz(this.mapRange ? { n: 6, seed, range: this.mapRange } : { n: 9, seed })
      : this.mode === 'locate'
      ? makeLocateQuiz(PLACES, { n: 10, seed })
      : this.mode === 'mistakes'
        ? this.review(seed)
        : makeQuiz(EVENTS, { n: 9, seed, book: this.book || undefined, era: this.era || undefined });
    this.i = 0;
    this.score = 0;
    this.ask();
    return true;
  }

  private ask(): void {
    this.phase = 'ask';
    this.answered = false;
    this.atlas.setPickMode(null);
    this.clearMap();
    this.atlas.fx.clear('story');
    const q = this.qs[this.i];
    if (!q) { this.finish(); return; }
    const L = lang;
    const fb = h('p', { class: 'qz-fb', 'aria-live': 'polite' });
    const whyBox = h('div', { class: 'qz-why', 'data-testid': 'quiz-explain', hidden: true });
    const openBtn = h('button', { type: 'button', class: 'btn ghost', 'data-act': 'open-event', hidden: true, text: t('openCard') });
    const next = h('button', { type: 'button', class: 'btn primary', 'data-act': 'next', hidden: true, text: t('nextQ'), onclick: () => { this.i++; this.ask(); } });
    const nodes: Node[] = [this.head(`${this.i + 1}/${this.qs.length}`), h('p', { class: 'qz-q', text: tr(q.prompt, L) })];
    const finish = (ok: boolean, msg: string, pts = ok ? 1 : 0, ev?: HistEvent, why?: I18n) => {
      this.answered = true;
      this.score += pts;
      fb.textContent = msg;
      fb.className = 'qz-fb ' + (ok ? 'ok' : 'no');
      if (why || ev) {
        whyBox.textContent = tr(why ?? ev!.summary, L);
        whyBox.hidden = false;
      }
      if (ev) {
        openBtn.hidden = false;
        openBtn.onclick = () => this.onOpenEvent(ev);
      }
      next.hidden = false;
      next.focus();
    };
    if (q.type === 'when') {
      const e = EVENT.get(q.event)!;
      const mKey = q.key ?? `when:${e.id}`;
      const opts = h('div', { class: 'qz-opts' }, ...q.options.map(y => h('button', {
        type: 'button', class: 'opt', text: formatYear(y, L),
        onclick: (ev: Event) => {
          if (!next.hidden) return;
          const ok = y === q.answer;
          this.progress.answer(mKey, ok, [e.id]);
          (ev.currentTarget as HTMLElement).classList.add(ok ? 'ok' : 'no');
          opts.querySelectorAll('button').forEach(b => { if (b.textContent === formatYear(q.answer, L)) b.classList.add('ok'); });
          finish(ok, ok ? t('correct') : t('answerWas', { a: formatYear(q.answer, L) }), ok ? 1 : 0, e);
          this.reveal(e.id);
        },
      })));
      nodes.push(opts);
    } else if (q.type === 'choice') {
      const e = q.event ? EVENT.get(q.event) : undefined;
      const mKey = q.key ?? (q.event ? `choice:${q.event}` : '');
      const opts = h('div', { class: 'qz-opts col' }, ...q.options.map((o, idx) => h('button', {
        type: 'button', class: 'opt', text: tr(o, L),
        onclick: (ev: Event) => {
          if (!next.hidden) return;
          const ok = idx === q.answer;
          this.progress.answer(mKey, ok, [q.event]);
          (ev.currentTarget as HTMLElement).classList.add(ok ? 'ok' : 'no');
          const all = opts.querySelectorAll('button');
          all[q.answer]?.classList.add('ok');
          finish(ok, ok ? t('correct') : t('wrong'), ok ? 1 : 0, e, q.why);
          if (e) this.reveal(e.id);
        },
      })));
      nodes.push(opts);
    } else if (q.type === 'map' && q.kind === 'draw') {
      // 画疆域: names and territories hidden; click round the border, then compare with the real one
      this.mapOn = true;
      this.drawing = true;
      this.onBlind(true);
      this.atlas.setDrawing(true);
      this.onYear(q.years[0]);
      void this.atlas.home();
      const pts: LonLat[] = [];
      const hint = h('p', { class: 'qz-hint', 'data-testid': 'draw-hint', text: t('drawHint') });
      const count = h('span', { class: 'qz-dn', 'data-testid': 'draw-n' });
      const undo = h('button', { type: 'button', class: 'btn ghost', 'data-act': 'draw-undo', text: t('drawUndo'), onclick: () => { pts.pop(); update(); } }) as HTMLButtonElement;
      const done = h('button', { type: 'button', class: 'btn primary', 'data-act': 'draw-done', text: t('drawDone'), onclick: () => grade() }) as HTMLButtonElement;
      const bar = h('div', { class: 'qz-draw' }, count, undo, done);
      const update = () => {
        this.atlas.sketch(pts);
        count.textContent = t('drawN', { n: pts.length });
        undo.disabled = !pts.length;
        done.disabled = pts.length < 3;
      };
      const grade = () => {
        if (this.answered || pts.length < 3) return;
        this.atlas.setPickMode(null);
        const id = q.key.split(':')[2];
        const snap = this.atlas.snapshot?.id === id ? this.atlas.snapshot : snapshotAt(q.years[0]);
        const o = overlap(pts, snap?.regions ?? [], q.polity!);
        const g = gradeDraw(o.iou);
        this.progress.answer(q.key, g === 'correct');
        this.onBlind(false);
        this.drawing = false;
        this.atlas.setDrawing(false);
        this.atlas.sketch(pts);
        this.atlas.flyToPolity(q.polity!);
        this.atlas.hold(q.polity!);
        hint.hidden = true;
        bar.hidden = true;
        const msg = `${t(g === 'correct' ? 'correct' : g === 'close' ? 'close_' : 'wrong')} ${t('drawScore', { n: Math.round(o.iou * 100) })}`;
        finish(g === 'correct', msg, g === 'correct' ? 1 : 0, undefined, q.why);
      };
      this.atlas.setPickMode((lon, lat) => { if (!this.answered) { pts.push([lon, lat]); update(); } }, true);
      update();
      nodes.push(hint, bar);
    } else if (q.type === 'map') {
      // 读图题: the map without its names; answering brings them back on the same map
      this.mapOn = true;
      this.onBlind(true);
      let shown = 0;
      const chips = q.years.length > 1 ? q.years.map((_, k) => h('button', {
        type: 'button', class: 'qz-map' + (k === 0 ? ' on' : ''), 'data-map': String(k), 'aria-pressed': String(k === 0), text: t(k === 0 ? 'mapA' : 'mapB'),
        onclick: () => { show(k); },
      })) : [];
      const show = (k: number) => {
        shown = k;
        this.onYear(q.years[k]);
        chips.forEach((c, j) => { c.classList.toggle('on', j === k); c.setAttribute('aria-pressed', String(j === k)); });
      };
      show(0);
      if (q.polity) { this.atlas.flyToPolity(q.polity); this.atlas.hold(q.polity); } else void this.atlas.home();
      const hint = h('p', { class: 'qz-hint', 'data-testid': 'map-hint', text: t('mapHint') });
      const opts = h('div', { class: 'qz-opts col' }, ...q.options.map((o, idx) => h('button', {
        type: 'button', class: 'opt', text: tr(o, L),
        onclick: (ev: Event) => {
          if (!next.hidden) return;
          const ok = idx === q.answer;
          this.progress.answer(q.key, ok);
          (ev.currentTarget as HTMLElement).classList.add(ok ? 'ok' : 'no');
          opts.querySelectorAll('button')[q.answer]?.classList.add('ok');
          this.onBlind(false);
          hint.hidden = true;
          show(shown);
          finish(ok, ok ? t('correct') : t('wrong'), ok ? 1 : 0, undefined, q.why);
        },
      })));
      nodes.push(hint);
      if (chips.length) nodes.push(h('div', { class: 'qz-maps', role: 'group' }, ...chips));
      nodes.push(opts);
    } else if (q.type === 'where') {
      const e = EVENT.get(q.event);
      const mKey = q.key ?? `where:${q.event}`;
      nodes.push(h('p', { class: 'qz-hint', text: t('clickMap') }));
      this.atlas.home();
      this.atlas.setPickMode((lon, lat) => {
        this.atlas.setPickMode(null);
        const km = Math.round(distKm([lon, lat], [q.lon, q.lat]));
        const g = gradeWhere(km);
        this.progress.answer(mKey, g === 'correct', [q.event]);
        this.atlas.fx.spawn({ lon, lat, model: { kind: 'flag', color: '#2e86de' }, scale: 0.8 });
        this.atlas.fx.ring(this.atlas.geo.pos(q.lon, q.lat, 0.02), g === 'wrong' ? '#ff6b4a' : '#5bd36b', 4);
        finish(g === 'correct', `${t(g === 'correct' ? 'correct' : g === 'close' ? 'close_' : 'wrong')} ${t('kmAway', { n: km })}`, g === 'correct' ? 1 : 0, e);
        this.reveal(q.event);
      });
    } else if (q.type === 'locate') {
      nodes.push(h('p', { class: 'qz-hint', text: t('clickMap') }));
      if (q.hint) nodes.push(h('p', { class: 'qz-clue', text: tr(q.hint, L) }));
      this.onYear(q.year);
      this.atlas.home();
      this.atlas.setPickMode((lon, lat) => {
        this.atlas.setPickMode(null);
        const km = Math.round(distKm([lon, lat], [q.lon, q.lat]));
        const pts = locatePoints(km);
        const p = PLACE.get(q.place);
        this.atlas.fx.spawn({ lon, lat, model: { kind: 'flag', color: '#2e86de' }, scale: 0.8 });
        this.atlas.fx.ring(this.atlas.geo.pos(q.lon, q.lat, 0.02), pts >= 60 ? '#5bd36b' : '#ff6b4a', 4);
        this.atlas.flyTo({ lon: q.lon, lat: q.lat - 1.5, dist: 34, tilt: 0.85 }, 1.4);
        const today = p ? ` · ${t('today')} ${tr(p.modern ?? p.name, L)}` : '';
        this.atlas.fx.spawn({ lon: q.lon, lat: q.lat, model: { kind: 'flag', color: '#c8372d' }, scale: 0.8, label: tr(q.name, L) });
        finish(pts >= 60, `${t('kmAway', { n: km })} · +${pts}${today}`, pts);
      }, true);
    } else {
      const picked: string[] = [];
      const list = h('ol', { class: 'qz-order' });
      const check = h('button', { type: 'button', class: 'btn primary', 'data-act': 'check', text: t('check'), disabled: true });
      const btns = q.events.map(id => {
        const e = EVENT.get(id)!;
        const b = h('button', { type: 'button', class: 'opt', 'data-id': id, text: tr(e.title, L), onclick: () => {
          if (picked.includes(id) || !next.hidden) return;
          picked.push(id);
          b.disabled = true;
          list.append(h('li', { text: tr(e.title, L) }));
          check.disabled = picked.length !== q.events.length;
        } });
        return b;
      });
      const undo = h('button', { type: 'button', class: 'btn ghost', text: t('undo'), onclick: () => {
        if (!next.hidden) return;
        const id = picked.pop();
        if (!id) return;
        list.lastElementChild?.remove();
        btns.find(b => b.dataset.id === id)!.disabled = false;
        check.disabled = true;
      } });
      check.addEventListener('click', () => {
        const ok = picked.every((id, k) => id === q.answer[k]);
        const mKey = q.key ?? `order:${q.answer.join(',')}`;
        this.progress.answer(mKey, ok, ok ? q.answer : q.answer.filter((id, k) => picked[k] !== id)); // a miss counts only for the events out of place
        list.replaceChildren(...q.answer.map((id, k) => h('li', { class: picked[k] === id ? 'ok' : 'no', text: `${formatYear(EVENT.get(id)!.year, L, { short: true })} · ${tr(EVENT.get(id)!.title, L)}` })));
        check.disabled = true;
        finish(ok, ok ? t('correct') : t('wrong'), ok ? 1 : 0, EVENT.get(q.answer[0]));
      });
      nodes.push(h('p', { class: 'qz-hint', text: t('orderHint') }), h('div', { class: 'qz-opts col' }, ...btns), list, h('div', { class: 'qz-row' }, undo, check));
    }
    nodes.push(fb, whyBox, h('div', { class: 'qz-row end' }, openBtn, next));
    this.body.replaceChildren(...nodes);
  }

  /** Flies to the answer and shows its model briefly. */
  private reveal(id: string): void {
    const e = EVENT.get(id);
    if (!e) return;
    this.onYear(e.year);
    this.atlas.flyTo({ lon: e.lon, lat: e.lat - 1.5, dist: 30, tilt: 0.85 }, 1.4);
    if (e.model) this.atlas.fx.spawn({ lon: e.lon, lat: e.lat, model: e.model, label: tr(e.title, lang) });
  }

  /** Lifts a map-reading question: names back, highlight released. */
  private mapOn = false;
  /** a 画疆域 question is open: the territories are hidden */
  private drawing = false;
  private clearMap(): void {
    if (!this.mapOn) return;
    this.mapOn = false;
    if (this.drawing) { this.drawing = false; this.atlas.setDrawing(false); }
    this.onBlind(false);
    this.atlas.hold(null);
  }

  private finish(): void {
    this.phase = 'done';
    this.atlas.setPickMode(null);
    this.clearMap();
    const locate = this.mode === 'locate';
    const c = this.chapter;
    if (c) this.progress.score(`chapter:${c.id}`, this.score, this.qs.length);
    else if (this.mode === 'events') this.progress.quiz(this.score);
    const max = this.qs.length * (locate ? 100 : 1);
    if (c) {
      const pass = this.score / Math.max(1, this.qs.length) >= 0.6;
      fill(this.body,
        this.head(''),
        h('p', { class: 'qz-done', text: t('done', { s: this.score, n: max }) }),
        h('p', { class: 'qz-verdict ' + (pass ? 'ok' : 'no'), 'data-testid': 'chapter-verdict', text: t(pass ? 'chPass' : 'chRetry', { n: c.n }) }),
        h('div', { class: 'qz-row' },
          h('button', { type: 'button', class: 'btn' + (pass ? '' : ' primary'), 'data-act': 'again', text: t('again'), onclick: () => this.start() }),
          h('button', { type: 'button', class: 'btn' + (pass ? ' primary' : ''), 'data-act': 'to-path', text: t('chBackPath'), onclick: () => this.toggle(false) })));
      return;
    }
    fill(this.body,
      this.head(''),
      h('p', { class: 'qz-done', text: t('done', { s: this.score, n: max }) }),
      locate ? h('p', { class: 'qz-rank', text: t('rankIs', { r: tr(rankOf(this.score, max), lang) }) }) : null,
      this.mode === 'events' && h('p', { class: 'qz-hint', text: t('best', { n: this.progress.best }) }),
      h('div', { class: 'qz-row' }, h('button', { type: 'button', class: 'btn primary', text: t('again'), onclick: () => { if (this.mode === 'mistakes') this.extra = []; /* the due events were just asked */ if (this.mode === 'mistakes' && this.progress.mistakes.size === 0) this.setup(); else this.start(); } })));
  }

  /** In the new language: the start screen, the current question while unanswered (an answered one keeps its marked
   * options until Next), or the score. */
  relabel(): void {
    this.el.setAttribute('aria-label', t('quizTitle'));
    if (!this.open) return;
    if (this.phase === 'setup') this.setup();
    else if (this.phase === 'done') this.finish();
    else if (!this.answered) this.ask();
  }
}
