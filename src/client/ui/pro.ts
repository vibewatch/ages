import type { Feature } from '../../shared/lib/plan.ts';
import { t } from '../lib/i18n.ts';
import type { Plan } from '../lib/plan.ts';
import { ModalFocus, fill, h, iconBtn } from './dom.ts';

/**
 * About Pro — shown when a gated build (VITE_PRO_GATE=1) reaches a Pro feature: what Pro adds, what stays free, and
 * (until payment exists) a way to try it on the device.
 */
export class ProSheet {
  readonly el: HTMLElement;
  private box: HTMLElement;
  readonly focus: ModalFocus;
  private why: Feature | null = null;
  onUnlock: () => void = () => {};

  constructor(private plan: Plan) {
    this.box = h('div', { class: 'modal-box pro' });
    this.el = h('div', { class: 'modal', hidden: true, role: 'dialog', 'aria-modal': 'true', 'data-testid': 'pro', 'aria-label': t('proTitle'), onclick: (e: Event) => { if (e.target === this.el) this.toggle(false); } }, this.box);
    this.focus = new ModalFocus(this.el);
  }

  get open(): boolean { return !this.el.hidden; }
  show(why: Feature): void { this.why = why; this.toggle(true); }
  toggle(on = this.el.hidden): void {
    if (on === this.open) return;
    this.el.hidden = !on;
    if (on) { this.render(); this.focus.opened(); } else this.focus.closed();
  }

  render(): void {
    if (!this.open) return;
    const why = this.why === 'mapread' ? t('proWhyMap', { n: this.plan.free.mapRoundsPerDay })
      : this.why === 'chapterCheck' ? t('proWhyCheck', { n: this.plan.free.openChapters })
        : this.why === 'reportImage' ? t('proWhyReport') : '';
    fill(this.box,
      h('header', { class: 'rp-head' }, h('div', {}, h('h2', { text: t('proTitle') }), h('small', { text: t('proSub') })), iconBtn('close', t('close'), () => this.toggle(false))),
      why ? h('p', { class: 'cr-shared', 'data-testid': 'pro-why', text: why }) : null,
      h('h3', { text: t('proGets') }),
      h('ul', { class: 'pro-list' }, ...(['proF1', 'proF2', 'proF3', 'proF4'] as const).map(k => h('li', { text: t(k) }))),
      h('h3', { text: t('proFree') }),
      h('p', { class: 'rp-line', text: t('proFreeList') }),
      h('div', { class: 'rp-acts' },
        h('button', { type: 'button', class: 'btn primary', 'data-act': 'pro-try', text: t('proTry'), onclick: () => { this.plan.unlock(); this.toggle(false); this.onUnlock(); } }),
        h('button', { type: 'button', class: 'btn', text: t('proLater'), onclick: () => this.toggle(false) })),
      h('p', { class: 'rp-note', text: t('proNote') }));
  }
}
