import { h } from './dom.ts';

/** A view of the side panel and how to close it. */
export interface PanelView { el: HTMLElement; close: () => void }

/**
 * The side panel: a stack of views floating between the headline and the line key — the learning path at the root,
 * then a lesson, the quiz and the card with its 3D view (which unfolds the Wikipedia reader beside itself). A view
 * shows itself by un-hiding; the most recently shown one sits on top, and `pop()` (Esc, a close button) closes it to
 * reveal the one beneath. On phones the panel is a bottom sheet above the timeline. Everything else — 时期详情,
 * Explore, settings — is a popover.
 */
export class Panel {
  readonly el: HTMLElement;
  private order: HTMLElement[] = [];
  private views: PanelView[];
  onChange: () => void = () => {};

  constructor(views: PanelView[]) {
    this.views = views;
    this.el = h('div', { class: 'panel panel-l' }, ...views.map(v => v.el));
    // views open and close themselves (a lesson ends, a card is replaced): the stack follows their `hidden`
    const mo = new MutationObserver(recs => {
      for (const r of recs) {
        const v = r.target as HTMLElement;
        this.order = this.order.filter(x => x !== v);
        if (!v.hidden) this.order.push(v);
      }
      this.apply();
    });
    for (const { el: v } of views) {
      v.classList.add('view');
      if (!v.hidden) this.order.push(v);
      mo.observe(v, { attributes: true, attributeFilter: ['hidden'] });
    }
    this.apply();
  }

  get open(): boolean { return this.order.length > 0; }
  /** The view on top. */
  get top(): HTMLElement | null { return this.order[this.order.length - 1] ?? null; }
  /** Whether `el` is in the stack (shown, on top or beneath). */
  has(el: HTMLElement): boolean { return this.order.includes(el); }

  /** Closes the view on top; false when the stack is empty. */
  pop(): boolean {
    const top = this.top;
    if (!top) return false;
    this.views.find(v => v.el === top)?.close();
    return true;
  }

  private apply(): void {
    this.order.forEach((v, i) => { v.style.zIndex = String(i + 1); v.classList.toggle('top', i === this.order.length - 1); });
    for (const v of this.el.children) if (!this.order.includes(v as HTMLElement)) v.classList.remove('top');
    this.el.classList.toggle('on', this.order.length > 0);
    this.onChange();
  }
}
