import { tr } from '../../shared/data/i18n.ts';
import type { Trail, TrailStop } from '../../shared/data/trails.ts';
import { formatYear } from '../../shared/lib/timeline.ts';
import { lang, t } from '../lib/i18n.ts';
import { fill, h, iconBtn } from './dom.ts';

/**
 * Interactive Cross-Dynasty Thematic Trail stepper bar (`[data-testid="trail-bar"]`).
 * Lets the user step across dynasties along a curated historical theme (capitals, Silk Road, reforms, science, frontier).
 */
export class TrailBar {
  readonly el: HTMLElement;
  private current: Trail | null = null;
  private idx = 0;
  onStop: (trail: Trail, stop: TrailStop, index: number) => void = () => {};
  onClose: () => void = () => {};

  constructor() {
    this.el = h('aside', { class: 'trail-bar', 'data-testid': 'trail-bar', hidden: true });
  }

  get active(): { trail: Trail; index: number } | null {
    return this.current ? { trail: this.current, index: this.idx } : null;
  }

  start(trail: Trail, index = 0): void {
    this.current = trail;
    this.idx = Math.max(0, Math.min(trail.stops.length - 1, index));
    this.el.hidden = false;
    this.render();
    this.onStop(trail, trail.stops[this.idx], this.idx);
  }

  step(delta: number): void {
    if (!this.current) return;
    const next = this.idx + delta;
    if (next < 0 || next >= this.current.stops.length) return;
    this.idx = next;
    this.render();
    this.onStop(this.current, this.current.stops[this.idx], this.idx);
  }

  close(notify = true): void {
    if (!this.current) return;
    this.current = null;
    this.el.hidden = true;
    fill(this.el);
    if (notify) this.onClose();
  }

  relabel(): void {
    if (this.current) this.render();
  }

  private render(): void {
    const trl = this.current;
    if (!trl) return;
    const L = lang;
    const stop = trl.stops[this.idx];
    const n = trl.stops.length;
    this.el.style.setProperty('--c', trl.color);
    const prevBtn = iconBtn('prev', t('trailPrev'), () => this.step(-1), 'tb-nav');
    prevBtn.disabled = this.idx <= 0;
    prevBtn.setAttribute('data-act', 'trail-prev');
    const nextBtn = iconBtn('next', t('trailNext'), () => this.step(1), 'tb-nav');
    nextBtn.disabled = this.idx >= n - 1;
    nextBtn.setAttribute('data-act', 'trail-next');
    const closeBtn = iconBtn('close', t('trailExit'), () => this.close(true), 'tb-close');
    closeBtn.setAttribute('data-act', 'trail-close');

    const dots = h('div', { class: 'tb-dots', role: 'tablist' }, ...trl.stops.map((s, i) =>
      h('button', {
        type: 'button',
        role: 'tab',
        class: 'tb-dot' + (i === this.idx ? ' on' : ''),
        'aria-selected': String(i === this.idx),
        'data-stop': String(i),
        title: `${formatYear(s.year, L, { short: true })} · ${tr(s.title, L)}`,
        onclick: () => {
          this.idx = i;
          this.render();
          this.onStop(trl, trl.stops[i], i);
        },
      }, String(i + 1))));

    fill(this.el,
      h('div', { class: 'tb-head' },
        h('span', { class: 'tb-badge', text: t('trails') }),
        h('b', { class: 'tb-title', text: tr(trl.title, L) }),
        h('span', { class: 'tb-idx', 'data-testid': 'trail-index', text: `${this.idx + 1} / ${n}` }),
        dots,
        prevBtn,
        nextBtn,
        closeBtn),
      h('div', { class: 'tb-stop', 'data-testid': 'trail-stop' },
        h('span', { class: 'tb-year', text: formatYear(stop.year, L) }),
        h('b', { class: 'tb-stop-title', text: tr(stop.title, L) }),
        h('span', { class: 'tb-stop-note', text: tr(stop.note, L) })));
  }
}
