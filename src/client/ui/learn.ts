import { BOOKS, UNITS } from '../../shared/data/curriculum.ts';
import { tr } from '../../shared/data/i18n.ts';
import { LESSON, LESSONS, unitLessons } from '../../shared/data/lessons/index.ts';
import type { Book, Lesson } from '../../shared/data/types.ts';
import { lang, t } from '../lib/i18n.ts';
import { load, save, type Progress } from '../lib/storage.ts';
import { ModalFocus, h, iconBtn } from './dom.ts';
import { bookShort } from './lesson.ts';

const PASS = 0.6;

/**
 * 历史课堂 — the course picker, a dialog over the map: book tabs, then every unit of the book with its lesson and its
 * unit test. Picking one closes the dialog and starts the lesson scene (the lesson runs in the left column).
 */
export class Learn {
  readonly el: HTMLElement;
  private box: HTMLElement;
  private book: Book = load<Book>('book', 'g7a', v => typeof v === 'string' && Object.hasOwn(BOOKS, v));
  private backupOpen = false;
  private backupMsg: { ok: boolean; text: string } | null = null;
  private lastResetBackup: string | null = null;
  onLesson: (l: Lesson, resume?: boolean) => void = () => {};
  onTest: (book: Book, unit: number) => void = () => {};
  onReviewMistakes: () => void = () => {};

  constructor(private progress: Progress) {
    this.box = h('div', { class: 'modal-box course' });
    this.el = h('div', { class: 'modal', hidden: true, role: 'dialog', 'aria-modal': 'true', 'aria-label': t('learnTitle'), onclick: (e: Event) => { if (e.target === this.el) this.toggle(false); } }, this.box);
    this.focus = new ModalFocus(this.el);
  }

  get open(): boolean { return !this.el.hidden; }
  readonly focus: ModalFocus;
  toggle(on = this.el.hidden): void {
    if (on === !this.el.hidden) return;
    this.el.hidden = !on;
    if (on) { this.backupMsg = null; this.render(); this.focus.opened(); } else this.focus.closed();
  }

  /** Lessons passed, out of all. */
  done(): [number, number] {
    return [LESSONS.filter(l => this.passed(l.id)).length, LESSONS.length];
  }

  private passed(id: string): boolean { const b = this.progress.scores[id]; return !!b && b[0] / b[1] >= PASS; }

  render(): void {
    const L = lang;
    this.el.setAttribute('aria-label', t('learnTitle'));
    const [n, m] = this.done();
    const last = this.progress.lastLesson;
    const saved = last ? LESSON.get(last.id) : undefined;
    const mistakeCount = this.progress.mistakes.size;
    const resumeText = saved && last
      ? `▶ ${t(last.phase === 'check' ? 'lsResumeCheck' : 'lsResume', { t: tr(saved.title, L), s: last.step + 1 })}`
      : '';
    const tools = h('div', { class: 'c-tools' },
      saved ? h('button', {
        type: 'button', class: 'btn primary c-resume', 'data-act': 'resume-lesson',
        text: resumeText,
        onclick: () => this.onLesson(saved, true),
      }) : null,
      mistakeCount > 0 ? h('button', {
        type: 'button', class: 'btn c-mistakes', 'data-act': 'review-mistakes',
        text: `${t('qmMistakes')} (${mistakeCount})`,
        onclick: () => { this.toggle(false); this.onReviewMistakes(); },
      }) : null,
      h('button', {
        type: 'button', class: 'btn ghost c-backup-btn' + (this.backupOpen ? ' on' : ''), 'data-act': 'toggle-backup',
        text: t('pgExport'),
        onclick: () => { this.backupOpen = !this.backupOpen; this.backupMsg = null; this.render(); },
      }));
    let backupPanel: HTMLElement | null = null;
    if (this.backupOpen) {
      const ta = h('textarea', { class: 'c-backup-ta', 'data-testid': 'progress-json', rows: '4', 'aria-label': t('pgBackup') }) as HTMLTextAreaElement;
      ta.value = this.progress.exportData();
      const msgEl = h('p', {
        class: 'c-backup-msg' + (this.backupMsg ? (this.backupMsg.ok ? ' ok' : ' bad') : ''),
        'data-testid': 'backup-msg',
        hidden: !this.backupMsg,
        text: this.backupMsg?.text ?? '',
      });
      backupPanel = h('div', { class: 'c-backup', 'data-testid': 'progress-backup' },
        h('p', { class: 'c-backup-hint', text: t('pgExportHint') }),
        ta,
        msgEl,
        h('div', { class: 'c-backup-acts' },
          h('button', {
            type: 'button', class: 'btn primary', 'data-act': 'import-progress', text: t('pgApply'),
            onclick: () => {
              const ok = this.progress.importData(ta.value);
              if (ok) {
                this.lastResetBackup = null;
                this.backupMsg = { ok: true, text: t('pgImported') };
                this.render();
              } else {
                this.backupMsg = { ok: false, text: t('pgInvalid') };
                msgEl.textContent = this.backupMsg.text;
                msgEl.className = 'c-backup-msg bad';
                msgEl.hidden = false;
              }
            },
          }),
          h('button', {
            type: 'button', class: 'btn ghost', 'data-act': 'reset-progress', text: t('pgReset'),
            onclick: () => {
              this.lastResetBackup = this.progress.exportData();
              this.progress.reset();
              this.backupMsg = { ok: true, text: t('pgResetDone') };
              this.render();
            },
          }),
          this.lastResetBackup ? h('button', {
            type: 'button', class: 'btn', 'data-act': 'undo-reset', text: t('pgUndoReset'),
            onclick: () => {
              if (this.lastResetBackup && this.progress.importData(this.lastResetBackup)) {
                this.lastResetBackup = null;
                this.backupMsg = { ok: true, text: t('pgImported') };
                this.render();
              }
            },
          }) : null));
    }
    const tabs = h('div', { class: 'tabs', role: 'tablist' }, ...(Object.keys(BOOKS) as Book[]).map(b => h('button', {
      type: 'button', role: 'tab', class: b === this.book ? 'on' : '', 'aria-selected': String(b === this.book), 'data-book': b,
      text: bookShort(b),
      title: tr(BOOKS[b].name, L),
      onclick: () => { this.book = b; save('book', b); this.render(); },
    })));
    const units = UNITS.filter(u => u.book === this.book).map(u => {
      const lessons = unitLessons(u.book, u.unit);
      if (!lessons.length) return null;
      const passed = lessons.every(l => this.passed(l.id));
      return h('li', { class: 'unit' + (passed ? ' done' : '') },
        h('div', { class: 'u-h' },
          h('span', { class: 'u-n', text: String(u.unit).padStart(2, '0') }),
          h('span', { class: 'u-t', text: tr(u.title, L) }),
          passed ? h('i', { class: 'u-ok', text: '✓', title: t('learned') }) : null),
        ...lessons.map(l => this.row('u-ls', '▶', tr(l.title, L), `${t('lsMin', { n: l.minutes })} · ${tr(l.blurb, L)}`, this.progress.scores[l.id], () => this.onLesson(l), l.id)),
        this.row('u-test', '✎', t('lsTest'), t('lsTestDesc'), this.progress.scores[`test:${u.book}-${u.unit}`], () => this.onTest(u.book, u.unit)));
    });
    this.box.replaceChildren(
      h('header', {}, h('h2', { text: t('learnTitle') }), h('span', { class: 'c-done', text: t('lessonsDone', { n, m }) }), iconBtn('close', t('close'), () => this.toggle(false))),
      h('p', { class: 'c-intro', text: t('courseIntro') }),
      tools,
      ...(backupPanel ? [backupPanel] : []),
      tabs,
      h('ul', { class: 'units' }, ...units));
  }

  /** A lesson or unit-test row: mark, title, a line under it and the best score. */
  private row(cls: string, mark: string, title: string, sub: string, best: [number, number] | undefined, onclick: () => void, id?: string): HTMLElement {
    return h('button', { type: 'button', class: `u-row ${cls}`, 'data-lesson': id, onclick },
      h('i', { class: 'u-mk', text: mark }),
      h('span', { class: 'u-rt' }, h('b', { text: title }), h('small', { text: sub })),
      best ? h('span', { class: 'u-best' + (best[0] / best[1] >= PASS ? ' ok' : ''), text: t('lsBest', { s: best[0], n: best[1] }) }) : null);
  }
}
