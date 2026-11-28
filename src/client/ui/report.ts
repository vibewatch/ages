import { EVENT } from '../../shared/data/events.ts';
import { tr } from '../../shared/data/i18n.ts';
import type { HistEvent } from '../../shared/data/types.ts';
import { makeReport, type Report } from '../../shared/lib/report.ts';
import { lang, t } from '../lib/i18n.ts';
import type { Progress } from '../lib/storage.ts';
import { ModalFocus, fill, h, iconBtn } from './dom.ts';

const COLORS = { mastered: '#c99a3c', practised: '#1d9152', due: '#c8372d', seen: '#8e877c', track: '#e7e1d6', ink: '#2d2a25', ink2: '#5b564e', paper: '#fbf8f1', zhu: '#c8372d' };

/**
 * 学习周报 — the weekly report: a dialog with the learner's week (days, streak, answers against last week), mastery over
 * the events to know and per chapter, and what to review next; it saves as an image or shares as text, for a parent or
 * a teacher. Everything comes from this device's progress.
 */
export class ReportView {
  readonly el: HTMLElement;
  private box: HTMLElement;
  readonly focus: ModalFocus;
  onEvent: (e: HistEvent) => void = () => {};

  constructor(private progress: Progress) {
    this.box = h('div', { class: 'modal-box report' });
    this.el = h('div', { class: 'modal', hidden: true, role: 'dialog', 'aria-modal': 'true', 'data-testid': 'report', 'aria-label': t('rpTitle'), onclick: (e: Event) => { if (e.target === this.el) this.toggle(false); } }, this.box);
    this.focus = new ModalFocus(this.el);
  }

  get open(): boolean { return !this.el.hidden; }

  toggle(on = this.el.hidden): void {
    if (on === this.open) return;
    this.el.hidden = !on;
    if (on) { this.render(); this.focus.opened(); } else this.focus.closed();
  }

  private data(): Report {
    return makeReport({ mastery: this.progress.mastery, days: this.progress.days, scores: this.progress.scores });
  }

  private range(r: Report): string {
    const f = (k: string) => { const [, m, d] = k.split('-').map(Number); return lang === 'zh' ? `${m}月${d}日` : `${d}/${m}`; };
    return `${f(r.week[0][0])} – ${f(r.week[6][0])}`;
  }

  render(): void {
    if (!this.open) return;
    const L = lang;
    const r = this.data();
    this.el.setAttribute('aria-label', t('rpTitle'));
    const diff = r.answers - r.answersPrev;
    const max = Math.max(1, ...r.week.map(([, n]) => n));
    const wd = (k: string) => new Date(`${k}T12:00:00`).toLocaleDateString(L === 'zh' ? 'zh-CN' : 'en', { weekday: 'narrow' });
    const ms = r.mastery;
    const msg = h('p', { class: 'rp-msg', 'aria-live': 'polite' });
    fill(this.box,
      h('header', { class: 'rp-head' },
        h('div', {}, h('h2', { text: t('rpTitle') }), h('small', { text: this.range(r) })),
        iconBtn('close', t('close'), () => this.toggle(false))),
      h('div', { class: 'rp-stats' },
        this.stat(String(r.streak), t('rpStreak'), 'rp-streak'),
        this.stat(`${r.activeDays}/7`, t('rpDays'), 'rp-days'),
        this.stat(String(r.answers), t('rpAnswers'), 'rp-answers',
          r.answersPrev || r.answers ? (diff >= 0 ? `▲ ${diff}` : `▼ ${-diff}`) + ' ' + t('rpVsLast') : '')),
      h('div', { class: 'rp-week', 'aria-hidden': 'true' }, ...r.week.map(([k, n]) => h('span', {},
        h('i', { style: `height:${Math.round((n / max) * 100)}%`, class: n ? 'on' : '' }), h('small', { text: wd(k) })))),
      h('h3', { text: t('mastTitle') }),
      h('i', { class: 'pm-bar rp-bar', 'aria-hidden': 'true' },
        h('b', { class: 'm-mastered', style: `flex:${ms.mastered}` }), h('b', { class: 'm-practised', style: `flex:${ms.practised}` }),
        h('b', { class: 'm-due', style: `flex:${ms.due + ms.weak}` }), h('b', { class: 'm-seen', style: `flex:${ms.seen - ms.mastered - ms.practised - ms.due - ms.weak}` }),
        h('b', { class: 'm-new', style: `flex:${ms.total - ms.seen}` })),
      h('p', { class: 'rp-line', 'data-testid': 'report-mastery', text: t('mastLine', { m: ms.mastered, p: ms.practised, d: ms.due + ms.weak, n: ms.total }) }),
      h('p', { class: 'rp-line', text: t('rpDone', { c: r.chaptersPassed, l: r.lessonsPassed, n: r.lessonsTotal }) }),
      h('ol', { class: 'rp-chapters' }, ...r.chapters.map(({ c, score, passed }) => h('li', {},
        h('span', { text: `${c.n}. ${tr(c.short, L)}` }),
        h('i', {}, h('b', { style: `width:${Math.round(score * 100)}%` })),
        h('em', { text: passed ? '✓' : `${Math.round(score * 100)}%` })))),
      r.review.length ? h('h3', { text: t('rpReview') }) : null,
      r.review.length ? h('div', { class: 'rp-review' }, ...r.review.map(id => EVENT.get(id)).filter((e): e is HistEvent => !!e).map(e =>
        h('button', { type: 'button', class: 'chip link', text: tr(e.title, L), onclick: () => { this.toggle(false); this.onEvent(e); } }))) : null,
      h('div', { class: 'rp-acts' },
        h('button', { type: 'button', class: 'btn primary', 'data-act': 'report-image', text: t('rpImage'), onclick: () => void this.saveImage(r, msg) }),
        h('button', { type: 'button', class: 'btn', 'data-act': 'report-share', text: t('rpShare'), onclick: () => void this.share(r, msg) })),
      msg,
      h('p', { class: 'rp-note', text: t('rpLocal') }));
  }

  private stat(big: string, label: string, cls: string, sub = ''): HTMLElement {
    return h('div', { class: 'rp-stat ' + cls }, h('b', { text: big }), h('span', { text: label }), sub ? h('small', { text: sub }) : null);
  }

  /** The report as plain text, for a message to a parent or a teacher. */
  text(r: Report = this.data()): string {
    const L = lang, ms = r.mastery;
    return [
      `${t('rpTitle')} · ${this.range(r)}`,
      `${t('rpStreak')} ${r.streak} · ${t('rpDays')} ${r.activeDays}/7 · ${t('rpAnswers')} ${r.answers}`,
      t('mastLine', { m: ms.mastered, p: ms.practised, d: ms.due + ms.weak, n: ms.total }),
      t('rpDone', { c: r.chaptersPassed, l: r.lessonsPassed, n: r.lessonsTotal }),
      ...(r.review.length ? [`${t('rpReview')}: ${r.review.map(id => EVENT.get(id)).filter(e => !!e).map(e => tr(e!.title, L)).join(L === 'zh' ? '、' : ', ')}`] : []),
      `${t('brand')} · ${location.origin}`,
    ].join('\n');
  }

  private async share(r: Report, msg: HTMLElement): Promise<void> {
    const text = this.text(r);
    try {
      if (navigator.share) { await navigator.share({ title: t('rpTitle'), text }); return; }
      await navigator.clipboard.writeText(text);
      msg.textContent = t('rpCopied');
    } catch (e) {
      // a cancelled share sheet is not an error; a refused clipboard is — say so rather than claim "copied"
      msg.textContent = (e as Error)?.name === 'AbortError' ? '' : t('rpCopyFail');
    }
  }

  /** Draws the report on a portrait canvas (1080 × 1350) — the picture a parent receives. */
  draw(r: Report = this.data()): HTMLCanvasElement {
    const L = lang;
    const c = document.createElement('canvas');
    c.width = 1080; c.height = 1350;
    const g = c.getContext('2d');
    if (!g) return c;
    const font = (w: number, px: number) => `${w} ${px}px system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`;
    g.fillStyle = COLORS.paper; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = COLORS.zhu; g.fillRect(0, 0, c.width, 14);
    g.fillStyle = COLORS.ink; g.font = font(800, 64); g.fillText(t('rpTitle'), 80, 150);
    g.fillStyle = COLORS.ink2; g.font = font(500, 34); g.fillText(`${this.range(r)} · Ages ${L === 'zh' ? '长河' : 'Changhe'}`, 80, 205);
    // three numbers
    const stats: [string, string][] = [[String(r.streak), t('rpStreak')], [`${r.activeDays}/7`, t('rpDays')], [String(r.answers), t('rpAnswers')]];
    stats.forEach(([big, label], i) => {
      const x = 80 + i * 320;
      g.fillStyle = COLORS.ink; g.font = font(800, 96); g.fillText(big, x, 350);
      g.fillStyle = COLORS.ink2; g.font = font(500, 30); g.fillText(label, x, 400);
    });
    // mastery bar
    const ms = r.mastery;
    g.fillStyle = COLORS.ink; g.font = font(700, 40); g.fillText(t('mastTitle'), 80, 500);
    const parts: [number, string][] = [[ms.mastered, COLORS.mastered], [ms.practised, COLORS.practised], [ms.due + ms.weak, COLORS.due], [ms.seen - ms.mastered - ms.practised - ms.due - ms.weak, COLORS.seen], [ms.total - ms.seen, COLORS.track]];
    let x = 80; const W = 920;
    for (const [n, col] of parts) { if (!n) continue; const w = (n / Math.max(1, ms.total)) * W; g.fillStyle = col; g.fillRect(x, 530, Math.max(0, w - 4), 28); x += w; }
    g.fillStyle = COLORS.ink2; g.font = font(500, 30); g.fillText(t('mastLine', { m: ms.mastered, p: ms.practised, d: ms.due + ms.weak, n: ms.total }), 80, 605);
    // chapters
    r.chapters.forEach(({ c: ch, score, passed }, i) => {
      const y = 690 + i * 56;
      g.fillStyle = COLORS.ink; g.font = font(600, 30); g.fillText(`${ch.n}. ${tr(ch.short, L)}`, 80, y + 22);
      g.fillStyle = COLORS.track; g.fillRect(380, y, 540, 24);
      g.fillStyle = passed ? COLORS.practised : COLORS.mastered; g.fillRect(380, y, 540 * score, 24);
      g.fillStyle = COLORS.ink2; g.font = font(600, 28); g.fillText(passed ? '✓' : `${Math.round(score * 100)}%`, 940, y + 22);
    });
    g.fillStyle = COLORS.ink2; g.font = font(500, 26); g.fillText(location.host || 'Ages', 80, 1300);
    return c;
  }

  /** asked before saving the image (Pro in a gated build) */
  beforeImage: () => boolean = () => true;

  private async saveImage(r: Report, msg: HTMLElement): Promise<void> {
    if (!this.beforeImage()) return;
    const c = this.draw(r);
    const blob = await new Promise<Blob | null>(res => c.toBlob(res, 'image/png'));
    if (!blob) return;
    const name = `ages-report-${r.week[6][0]}.png`;
    const file = new File([blob], name, { type: 'image/png' });
    try {
      if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: t('rpTitle') }); return; }
    } catch { /* fall back to a download */ }
    const a = h('a', { href: URL.createObjectURL(blob), download: name }) as HTMLAnchorElement;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    msg.textContent = t('rpSaved');
  }
}
