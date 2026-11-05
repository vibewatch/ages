import { BOOKS } from '../../shared/data/curriculum.ts';
import { EVENT, EVENTS } from '../../shared/data/events.ts';
import { tr } from '../../shared/data/i18n.ts';
import type { Book, HistEvent, I18n } from '../../shared/data/types.ts';
import { PLACE, PLACES } from '../../shared/data/places.ts';
import { distKm, gradeWhere, locatePoints, makeLocateQuiz, makeMistakeQuiz, makeQuiz, rankOf, type Question } from '../../shared/lib/quiz.ts';
import { formatYear } from '../../shared/lib/timeline.ts';
import { lang, t } from '../lib/i18n.ts';
import type { Progress } from '../lib/storage.ts';
import type { Atlas } from '../scene/atlas.ts';
import { fill, h, iconBtn } from './dom.ts';

/** Quiz panel: "when" (multiple choice), "where" (click the map), "order" (tap in time order), and mistake review. */
export class Quiz {
  readonly el: HTMLElement;
  private body: HTMLElement;
  private qs: Question[] = [];
  private i = 0;
  private score = 0;
  private book: Book | '' = '';
  private mode: 'events' | 'locate' | 'mistakes' = 'events';
  /** where the quiz is, so a language switch re-renders it in place */
  private phase: 'setup' | 'ask' | 'done' = 'setup';
  private answered = false;
  onClose: () => void = () => {};
  onOpenEvent: (e: HistEvent) => void = () => {};
  /** moves the whole app (timeline + map) to a question's year */
  onYear: (y: number) => void = y => this.atlas.setYear(y);

  constructor(private atlas: Atlas, private progress: Progress) {
    this.body = h('div', { class: 'qz-body' });
    this.el = h('section', { class: 'quiz', hidden: true, role: 'dialog', 'aria-label': t('quizTitle') }, this.body);
  }

  get open(): boolean { return !this.el.hidden; }

  toggle(on = this.el.hidden): void {
    this.el.hidden = !on;
    if (on) this.setup(); else { this.atlas.setPickMode(null); this.atlas.fx.clear('story'); this.onClose(); }
  }

  private head(extra: string): HTMLElement {
    return h('header', {}, h('h2', { text: t('quizTitle') }), h('span', { class: 'qz-n', text: extra }), iconBtn('close', t('close'), () => this.toggle(false)));
  }

  private setup(): void {
    this.phase = 'setup';
    this.atlas.setPickMode(null);
    const mistakeCount = this.progress.mistakes.size;
    if (this.mode === 'mistakes' && mistakeCount === 0) this.mode = 'events';
    const sel = h('select', { 'aria-label': t('quizBook') },
      h('option', { value: '', text: t('allBooks') }),
      ...(Object.keys(BOOKS) as Book[]).map(b => h('option', { value: b, text: tr(BOOKS[b].name, lang) })));
    sel.value = this.book;
    sel.addEventListener('change', () => (this.book = sel.value as Book | ''));
    const modeTitle = (m: 'events' | 'locate' | 'mistakes') => m === 'events' ? t('qmEvents') : m === 'locate' ? t('qmLocate') : t('qmMistakes');
    const modeDesc = (m: 'events' | 'locate' | 'mistakes') => m === 'events' ? t('qmEventsDesc') : m === 'locate' ? t('qmLocateDesc') : mistakeCount ? t('qmMistakesDesc', { n: mistakeCount }) : t('noMistakes');
    const modes = h('div', { class: 'qz-modes', role: 'radiogroup' }, ...(['events', 'locate', 'mistakes'] as const).map(m => h('button', {
      type: 'button', role: 'radio', class: 'qz-mode' + (this.mode === m ? ' on' : ''), 'data-mode': m, 'aria-checked': String(this.mode === m),
      disabled: m === 'mistakes' && mistakeCount === 0,
      onclick: () => { this.mode = m; this.setup(); },
    }, h('b', { text: modeTitle(m) }), h('small', { text: modeDesc(m) }))));
    this.body.replaceChildren(
      this.head(this.progress.best ? t('best', { n: this.progress.best }) : ''),
      modes,
      h('div', { class: 'qz-row' }, this.mode === 'events' ? h('label', {}, h('span', { text: t('quizBook') + ' ' }), sel) : h('span'),
        h('button', { type: 'button', class: 'btn primary', 'data-act': 'start', disabled: this.mode === 'mistakes' && mistakeCount === 0, text: t('start'), onclick: () => this.start() })));
  }

  /** Opens the quiz directly in mistake-review mode. */
  startMistakes(seed = Date.now()): void {
    this.mode = 'mistakes';
    this.el.hidden = false;
    this.start(seed);
  }

  start(seed = Date.now()): void {
    this.qs = this.mode === 'locate'
      ? makeLocateQuiz(PLACES, { n: 10, seed })
      : this.mode === 'mistakes'
        ? makeMistakeQuiz(EVENTS, this.progress.mistakes, seed)
        : makeQuiz(EVENTS, { n: 9, seed, book: this.book || undefined });
    this.i = 0;
    this.score = 0;
    this.ask();
  }

  private ask(): void {
    this.phase = 'ask';
    this.answered = false;
    this.atlas.setPickMode(null);
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
          if (!ok) this.progress.addMistake(mKey);
          else this.progress.resolveMistake(mKey);
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
          if (mKey) {
            if (!ok) this.progress.addMistake(mKey);
            else this.progress.resolveMistake(mKey);
          }
          (ev.currentTarget as HTMLElement).classList.add(ok ? 'ok' : 'no');
          const all = opts.querySelectorAll('button');
          all[q.answer]?.classList.add('ok');
          finish(ok, ok ? t('correct') : t('wrong'), ok ? 1 : 0, e, q.why);
          if (e) this.reveal(e.id);
        },
      })));
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
        if (g !== 'correct') this.progress.addMistake(mKey);
        else this.progress.resolveMistake(mKey);
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
        if (!ok) this.progress.addMistake(mKey);
        else this.progress.resolveMistake(mKey);
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

  private finish(): void {
    this.phase = 'done';
    this.atlas.setPickMode(null);
    const locate = this.mode === 'locate';
    if (this.mode === 'events') this.progress.quiz(this.score);
    const max = this.qs.length * (locate ? 100 : 1);
    fill(this.body,
      this.head(''),
      h('p', { class: 'qz-done', text: t('done', { s: this.score, n: max }) }),
      locate ? h('p', { class: 'qz-rank', text: t('rankIs', { r: tr(rankOf(this.score, max), lang) }) }) : null,
      this.mode === 'events' && h('p', { class: 'qz-hint', text: t('best', { n: this.progress.best }) }),
      h('div', { class: 'qz-row' }, h('button', { type: 'button', class: 'btn primary', text: t('again'), onclick: () => (this.mode === 'mistakes' && this.progress.mistakes.size === 0 ? this.setup() : this.start()) })));
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
