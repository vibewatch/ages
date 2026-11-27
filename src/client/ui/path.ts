import { CHAPTERS, WHY, chapterAt, type Chapter } from '../../shared/data/chapters.ts';
import { ERAS } from '../../shared/data/eras.ts';
import { EVENT } from '../../shared/data/events.ts';
import { tr } from '../../shared/data/i18n.ts';
import { LESSON } from '../../shared/data/lessons/index.ts';
import type { HistEvent, Lesson, Year } from '../../shared/data/types.ts';
import { dueToday, level, score, summarize, type Level } from '../../shared/lib/mastery.ts';
import { formatYear } from '../../shared/lib/timeline.ts';
import { lang, t } from '../lib/i18n.ts';
import { load, save, type Progress } from '../lib/storage.ts';
import { h, icon, iconBtn } from './dom.ts';

const PASS = 0.6;
/** every chapter's events to know, in order */
export const ALL_KEYS: string[] = [...new Set(CHAPTERS.flatMap(c => c.keys))];
const LEVEL_KEY: Record<Level, 'mNew' | 'mSeen' | 'mPractised' | 'mMastered' | 'mDue' | 'mWeak'> = {
  new: 'mNew', seen: 'mSeen', practised: 'mPractised', mastered: 'mMastered', due: 'mDue', weak: 'mWeak',
};
export const levelName = (lv: Level): string => t(LEVEL_KEY[lv]);

export interface PathHooks {
  lesson: (l: Lesson, resume?: boolean) => void;
  event: (e: HistEvent) => void;
  /** previews a chapter on the map: its time and its events to know */
  preview: (c: Chapter) => void;
  quiz: () => void;
  /** a chapter's check */
  check: (c: Chapter) => void;
  /** plays an event's 3D story */
  play: (e: HistEvent) => void;
  mistakes: () => void;
  /** today's review: the mistakes queue plus these events falling due */
  review: (due: string[]) => void;
  /** the learner's own map: every event to know, marked by mastery */
  myMap: (on: boolean) => void;
  /** the weekly report */
  report: () => void;
  /** a round of 读图题 on a chapter's maps */
  maps: (c: Chapter) => void;
  /** the classroom playlist, optionally filled with a chapter's events */
  classroom: (c?: Chapter) => void;
  course: () => void;
  close: () => void;
  /** the open chapter changed (the learning focus follows it) */
  changed?: () => void;
}

/**
 * 学习路线 — the Learn view of the side panel: Chinese history in ten chapters, in time order. It is the app's starting
 * point: a newcomer sees where to begin, a returning learner sees where they left off. Each chapter opens to its big
 * idea, the events to know (each opens its card on the map) and its map lessons with their scores; picking a chapter
 * moves the map to its time. Practice — the quiz, mistake review and the textbook course — sits at the foot.
 */
export class PathView {
  readonly el: HTMLElement;
  private body: HTMLElement;
  private headEl: HTMLElement;
  private openId: string | null = load<string | null>('pathChapter', null, v => v === null || (typeof v === 'string' && CHAPTERS.some(c => c.id === v)));
  private here: Chapter = CHAPTERS[0];
  /** showing the learner's own map (every event to know, by mastery) */
  myMap = false;

  constructor(private progress: Progress, private hooks: PathHooks) {
    this.headEl = h('header', { class: 'view-head path-head' });
    this.body = h('div', { class: 'view-body path-body' });
    this.el = h('section', { class: 'path', hidden: true, role: 'region', 'data-testid': 'path' }, this.headEl, this.body);
  }

  get open(): boolean { return !this.el.hidden; }
  /** the chapter opened on the path, if any */
  get openChapterId(): string | null { return this.openId; }

  /** Opens a chapter (from the timeline's chapter row or the period popover) and brings it into view. */
  openChapter(c: Chapter, preview = true): void {
    this.setMyMap(false);
    if (this.openId !== c.id) { this.openId = c.id; save('pathChapter', c.id); }
    if (preview) this.hooks.preview(c);
    this.render();
    this.reveal(c.id);
  }

  private reveal(id: string): void {
    const li = this.body.querySelector<HTMLElement>(`.pl-head[data-chapter="${id}"]`)?.parentElement;
    if (!li) return;
    requestAnimationFrame(() => { this.body.scrollTop = Math.max(0, li.offsetTop - this.body.offsetTop - 8); });
  }

  toggle(on = this.el.hidden): void {
    if (on === this.open) return;
    if (on) this.render();
    this.el.hidden = !on;
    this.hooks.changed?.();
  }

  /** Follows the timeline: marks the chapter the map is in (re-rendered only when it changes). */
  setYear(y: Year): void {
    const c = chapterAt(y);
    if (c === this.here) return;
    this.here = c;
    if (this.open) this.render();
  }

  setMyMap(on: boolean): void {
    if (on === this.myMap) return;
    this.myMap = on;
    if (on && this.openId) { this.openId = null; save('pathChapter', null); }
    this.hooks.myMap(on);
    if (this.open) this.render();
  }

  /** Events with a record, falling due today (the mistakes queue is counted apart). */
  private due(): string[] { return dueToday(Object.keys(this.progress.mastery), this.progress.mastery); }

  /** Re-reads progress and language. */
  refresh(): void { if (this.open) this.render(); }

  private passed(id: string): boolean { const b = this.progress.scores[id]; return !!b && b[0] / b[1] >= PASS; }
  private doneIn(c: Chapter): number { return c.lessons.filter(id => this.passed(id)).length; }
  /** a chapter is done when its check is passed, or all its lessons are */
  private finished(c: Chapter): boolean { return this.progress.chapterPassed(c.id) || this.doneIn(c) === c.lessons.length; }
  /** the story that opens a chapter: its first event to know with a 3D story */
  private opening(c: Chapter): HistEvent | undefined { return c.keys.map(id => EVENT.get(id)).find(e => !!e?.story); }
  /** the first chapter not yet finished */
  private nextUp(): Chapter | undefined { return CHAPTERS.find(c => !this.finished(c)); }

  render(): void {
    const L = lang;
    const done = CHAPTERS.filter(c => this.finished(c)).length;
    const started = CHAPTERS.some(c => this.doneIn(c) > 0 || this.progress.scores[`chapter:${c.id}`]) || !!this.progress.lastLesson;
    // spaced review: mistakes whose day has come rejoin the queue
    this.progress.promoteDue();
    this.el.setAttribute('aria-label', t('pathTitle'));
    this.headEl.replaceChildren(
      h('div', { class: 'path-t' }, h('h2', { text: t('pathTitle') }), h('small', { text: t('pathSub') })),
      iconBtn('close', t('close'), () => this.hooks.close(), 'path-x'));

    // where to go next: carry on with the saved lesson, else start the next unfinished chapter
    const last = this.progress.lastLesson;
    const saved = last ? LESSON.get(last.id) : undefined;
    const up = this.nextUp();
    const upId = up?.lessons.find(id => !this.passed(id));
    const upLesson = upId ? LESSON.get(upId) : undefined;
    const cta = saved && last
      ? h('button', { type: 'button', class: 'path-cta', 'data-act': 'path-resume', onclick: () => this.hooks.lesson(saved, true) },
        h('span', { class: 'pc-k', text: t('pathContinue') }),
        h('b', { text: tr(saved.title, L) }),
        h('small', { text: t(last.phase === 'check' ? 'pathAtCheck' : 'pathAtStep', { s: last.step + 1 }) }),
        icon('chevron'))
      : up && upLesson
        ? h('button', { type: 'button', class: 'path-cta', 'data-act': 'path-start', onclick: () => this.hooks.lesson(upLesson) },
          h('span', { class: 'pc-k', text: started ? t('pathNext', { n: up.n }) : t('pathStart') }),
          h('b', { text: tr(up.title, L) }),
          h('small', { text: t('pathLessonMin', { n: upLesson.minutes }) }),
          icon('chevron'))
        : up
          // every lesson passed, the check still to take
          ? h('button', { type: 'button', class: 'path-cta', 'data-act': 'path-check', onclick: () => this.hooks.check(up) },
            h('span', { class: 'pc-k', text: t('pathNext', { n: up.n }) }),
            h('b', { text: tr(up.title, L) }),
            h('small', { text: t('chCheck') }),
            icon('chevron'))
          : h('p', { class: 'path-cta done', text: t('pathAllDone') });
    // today's review: the missed questions, and events answered before that are about to be forgotten
    const due = this.due();
    const mis = this.progress.mistakes;
    const fresh = due.filter(id => !mis.has(id) && !mis.has(`when:${id}`) && !mis.has(`where:${id}`));
    const nRev = mis.size + fresh.length, nLater = this.progress.scheduled;
    const review = nRev
      ? h('button', { type: 'button', class: 'path-review', 'data-act': 'path-review', 'data-n': String(nRev), onclick: () => this.hooks.review(fresh) },
        icon('back'), h('span', {}, h('b', { text: t('reviewToday', { n: Math.min(nRev, 12) }) }), h('small', { text: nLater && !fresh.length ? t('reviewLater', { n: nLater }) : t('reviewTodaySub') })), icon('chevron'))
      : null;
    // what I know: mastery over every event to know, and the map of it
    const ms = summarize(ALL_KEYS, this.progress.mastery);
    const mastery = ms.seen ? h('div', { class: 'path-mast', 'data-testid': 'path-mastery' },
      h('div', { class: 'pm-head' },
        h('b', { text: t('mastTitle') }),
        h('button', {
          type: 'button', class: 'pm-map' + (this.myMap ? ' on' : ''), 'data-act': 'my-map', 'aria-pressed': String(this.myMap), title: t('myMapTitle'),
          onclick: () => this.setMyMap(!this.myMap),
        }, icon('journey'), h('span', { text: t('myMap') }))),
      h('i', { class: 'pm-bar', 'aria-hidden': 'true' },
        h('b', { class: 'm-mastered', style: `flex:${ms.mastered}` }), h('b', { class: 'm-practised', style: `flex:${ms.practised}` }),
        h('b', { class: 'm-due', style: `flex:${ms.due + ms.weak}` }), h('b', { class: 'm-seen', style: `flex:${ms.seen - ms.mastered - ms.practised - ms.due - ms.weak}` }),
        h('b', { class: 'm-new', style: `flex:${ms.total - ms.seen}` })),
      h('div', { class: 'pm-foot' },
        h('small', { text: t('mastLine', { m: ms.mastered, p: ms.practised, d: ms.due + ms.weak, n: ms.total }) }),
        h('button', { type: 'button', class: 'pm-report', 'data-act': 'report', text: `${t('rpOpen')} →`, onclick: () => this.hooks.report() })),
      this.myMap ? h('p', { class: 'pm-hint', text: t('mastHint') }) : null) : null;

    const intro = started || this.openId ? null : h('p', { class: 'path-intro', text: t('pathIntro') });
    const meter = h('div', { class: 'path-meter', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(CHAPTERS.length), 'aria-valuenow': String(done), 'aria-label': t('pathProgress', { n: done, m: CHAPTERS.length }) },
      h('span', { text: t('pathProgress', { n: done, m: CHAPTERS.length }) }),
      h('i', {}, ...CHAPTERS.map(c => h('b', { class: this.finished(c) ? 'on' : this.doneIn(c) ? 'half' : '' }))));

    const list = h('ol', { class: 'path-list' }, ...CHAPTERS.map(c => this.chapter(c)));
    const practice = h('div', { class: 'path-practice' },
      h('h3', { text: t('pathPractice') }),
      this.tile('quiz', t('quizTitle'), t('quizDesc'), 'path-quiz', () => this.hooks.quiz()),
      this.tile('book', t('pathCourse'), t('pathCourseDesc'), 'path-course', () => this.hooks.course()),
      this.tile('present', t('pTitle'), t('pTile'), 'path-classroom', () => this.hooks.classroom()));
    this.body.replaceChildren(intro ?? '', cta, review ?? '', meter, mastery ?? '', list, practice);
    this.hooks.changed?.();
  }

  private tile(ic: Parameters<typeof icon>[0], title: string, desc: string, act: string, onclick: () => void): HTMLElement {
    return h('button', { type: 'button', class: 'path-tile', 'data-act': act, onclick }, icon(ic), h('span', {}, h('b', { text: title }), h('small', { text: desc })));
  }

  private chapter(c: Chapter): HTMLElement {
    const L = lang;
    const n = this.doneIn(c), m = c.lessons.length;
    const fin = this.finished(c);
    const isOpen = this.openId === c.id;
    const here = this.here === c;
    const color = ERAS.find(e => e.id === c.eras[0])?.color ?? 'var(--zhu)';
    const years = `${formatYear(c.span[0], L, { short: true })} – ${c.span[1] >= 2025 ? t('pathToday') : formatYear(c.span[1], L, { short: true })}`;
    const head = h('button', {
      type: 'button', class: 'pl-head', 'aria-expanded': String(isOpen), 'data-chapter': c.id,
      onclick: () => {
        if (!isOpen) this.setMyMap(false);
        this.openId = isOpen ? null : c.id;
        save('pathChapter', this.openId);
        if (!isOpen) this.hooks.preview(c);
        this.render();
        if (!isOpen) this.reveal(c.id);
      },
    },
      h('i', { class: 'pl-n' + (fin ? ' done' : ''), text: fin ? '✓' : String(c.n) }),
      h('span', { class: 'pl-t' }, h('b', { text: tr(c.title, L) }), h('small', { text: years }),
        // how much of the chapter's events to know the learner has
        h('i', { class: 'pl-mast', 'aria-hidden': 'true', style: `--m:${Math.round(score(c.keys, this.progress.mastery) * 100)}%` })),
      here ? h('em', { class: 'pl-here', text: t('pathHere') }) : null,
      !fin && (m > 1 || n > 0) ? h('span', { class: 'pl-frac', text: `${n}/${m}` }) : null,
      icon(isOpen ? 'up' : 'down'));
    const li = h('li', { class: 'pl' + (isOpen ? ' open' : '') + (here ? ' here' : ''), style: `--c:${color}` }, head);
    if (!isOpen) return li;
    const keys = c.keys.map(id => EVENT.get(id)).filter((e): e is HistEvent => !!e);
    const story = this.opening(c);
    const chk = this.progress.scores[`chapter:${c.id}`];
    li.append(h('div', { class: 'pl-body' },
      h('p', { class: 'pl-idea', text: tr(c.idea, L) }),
      // see it first: the chapter opens with its best 3D story
      story ? h('button', { type: 'button', class: 'pl-watch', 'data-act': 'chapter-watch', onclick: () => this.hooks.play(story) },
        h('i', { text: '▶' }), h('span', {}, h('b', { text: t('chWatch') }), h('small', { text: tr(story.title, L) }))) : null,
      h('h4', { text: t('pathKeys') }),
      h('div', { class: 'pl-keys' }, ...keys.map((e, k) => { const lv = level(this.progress.mastery[e.id]); return h('button', {
        type: 'button', class: 'pl-key', 'data-ev': e.id, 'data-m': lv, title: levelName(lv), onclick: () => this.hooks.event(e),
      }, h('i', { class: 'pl-kn', 'aria-hidden': 'true', text: String(k + 1) }), h('small', { text: formatYear(e.year, L, { short: true }) }),
        h('span', {}, h('b', { text: tr(e.title, L) }), WHY[e.id] ? h('em', { text: tr(WHY[e.id], L) }) : null),
        e.story ? h('i', { class: 'pl-play', 'aria-label': t('chStory'), text: '▶' }) : null); })),
      h('h4', { text: t('pathLessons') }),
      h('div', { class: 'pl-lessons' }, ...c.lessons.map((id, i) => {
        const l = LESSON.get(id);
        if (!l) return null;
        const sc = this.progress.scores[id];
        const ok = this.passed(id);
        return h('button', { type: 'button', class: 'pl-lesson' + (ok ? ' ok' : ''), 'data-lesson': id, onclick: () => this.hooks.lesson(l) },
          h('i', { text: ok ? '✓' : String(i + 1) }),
          h('span', {}, h('b', { text: tr(l.title, L) }), h('small', { text: sc ? t('pathScore', { r: sc[0], n: sc[1] }) + ' · ' + t('pathLessonMin', { n: l.minutes }) : t('pathLessonMin', { n: l.minutes }) })),
          h('em', { text: sc ? t('lsAgain') : t('lsStart') }));
      })),
      // then check it
      h('button', { type: 'button', class: 'pl-check' + (this.progress.chapterPassed(c.id) ? ' ok' : ''), 'data-act': 'chapter-check', onclick: () => this.hooks.check(c) },
        h('i', { text: this.progress.chapterPassed(c.id) ? '✓' : '?' }),
        h('span', {}, h('b', { text: t('chCheck') }), chk ? h('small', { text: t('pathScore', { r: chk[0], n: chk[1] }) }) : null),
        h('em', { text: chk ? t('again') : t('start') })),
      // read the chapter's maps (from the first states on)
      c.span[1] > -2070 ? h('button', { type: 'button', class: 'pl-present pl-maps', 'data-act': 'chapter-maps', onclick: () => this.hooks.maps(c) }, icon('layers'), h('span', { text: t('chMaps') })) : null,
      // for a teacher: the chapter's events as a classroom playlist
      h('button', { type: 'button', class: 'pl-present', 'data-act': 'chapter-present', onclick: () => this.hooks.classroom(c) }, icon('present'), h('span', { text: t('pFromChapter') }))));
    return li;
  }
}
