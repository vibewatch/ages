import { hasScript } from '../../shared/data/events.ts';
import { tr } from '../../shared/data/i18n.ts';
import type { Era, EventKind, HistEvent, Year } from '../../shared/data/types.ts';
import { CHRONICLE, chapterAt, currentEntry } from '../../shared/lib/chronicle.ts';
import { formatYear } from '../../shared/lib/timeline.ts';
import { kindName, lang, t } from '../lib/i18n.ts';
import { load, save, type Progress } from '../lib/storage.ts';
import { h } from './dom.ts';

const KIND_ORDER: EventKind[] = ['prehistory', 'politics', 'war', 'reform', 'culture', 'science', 'economy', 'diplomacy', 'revolution'];
type ChKindFilter = 'all' | 'story' | EventKind;

/**
 * 本时期大事: the dynasty's chronicle as a list (year · headline · kind), a section of the period details. The line at or
 * before the timeline's year is highlighted and kept in view; clicking a line opens the event. All entries or only the
 * textbook ones, plus optional filtering by 3D story or event kind.
 */
export class Chronicle {
  readonly el: HTMLElement;
  private head: HTMLElement;
  private kindsBar: HTMLElement;
  private list: HTMLElement;
  private era: Era | undefined;
  private baseEvents: HistEvent[] = [];
  private events: HistEvent[] = [];
  private cur: string | null = null;
  private sel: string | null = null;
  private core = load<boolean>('chCore', false);
  private kindFilter: ChKindFilter = 'all';
  private userScroll = -Infinity;
  private lastYear: Year = 0;
  /** Laid out (the period popover is open); while hidden, following the year costs no layout. */
  private shown = false;
  onOpen: (e: HistEvent) => void = () => {};

  constructor(private progress?: Progress) {
    this.head = h('header', { class: 'pv-h' });
    this.kindsBar = h('div', { class: 'ch-kinds', 'data-testid': 'chronicle-kinds' });
    this.list = h('ol', { class: 'ch-list' });
    this.list.addEventListener('wheel', () => (this.userScroll = performance.now()), { passive: true });
    this.list.addEventListener('touchmove', () => (this.userScroll = performance.now()), { passive: true });
    this.el = h('section', { class: 'pv-sec chronicle' }, this.head, this.kindsBar, this.list);
    new ResizeObserver(([e]) => {
      const was = this.shown;
      this.shown = e.contentRect.height > 0;
      if (this.shown && !was) this.scrollToCur(true);
    }).observe(this.list);
  }

  /** Follows the timeline: rebuilds when the dynasty changes, otherwise just moves the highlight. */
  update(y: Year): void {
    this.lastYear = y;
    const { era, events: base } = chapterAt(y, this.core ? CHRONICLE.filter(e => e.weight <= 2) : CHRONICLE);
    if (era?.id !== this.era?.id || base.length !== this.baseEvents.length) {
      this.era = era;
      this.baseEvents = base;
      if (this.kindFilter === 'story' && !base.some(e => hasScript(e))) this.kindFilter = 'all';
      else if (this.kindFilter !== 'all' && this.kindFilter !== 'story' && !base.some(e => e.kind === this.kindFilter)) this.kindFilter = 'all';
      this.applyFilter();
    }
    const c = currentEntry(y, this.events);
    const id = c && c.year <= y ? c.id : null;
    if (id !== this.cur) {
      this.cur = id;
      for (const li of this.list.children as HTMLCollectionOf<HTMLElement>) li.classList.toggle('cur', li.dataset.id === id);
      this.scrollToCur();
    }
  }

  private applyFilter(): void {
    this.events = this.kindFilter === 'all'
      ? this.baseEvents
      : this.kindFilter === 'story'
        ? this.baseEvents.filter(e => hasScript(e))
        : this.baseEvents.filter(e => e.kind === this.kindFilter);
    this.build();
  }

  select(id: string | null): void {
    this.sel = id;
    for (const li of this.list.children as HTMLCollectionOf<HTMLElement>) li.classList.toggle('sel', li.dataset.id === id);
  }

  /** Keeps the current line in view (not while the reader scrolls the list themselves). */
  scrollToCur(force = false): void {
    if (!this.shown || (!force && performance.now() - this.userScroll < 4000)) return;
    const li = this.list.querySelector<HTMLElement>('.cur');
    if (!li) { this.list.scrollTop = 0; return; }
    const H = this.list.clientHeight;
    if (!H) return;
    const top = li.offsetTop - this.list.offsetTop - H * 0.35;
    const far = Math.abs(top - this.list.scrollTop) > H * 2;
    this.list.scrollTo({ top, behavior: force || far ? 'auto' : 'smooth' });
  }

  private build(): void {
    const L = lang;
    const filter = h('div', { class: 'seg ch-filter', role: 'radiogroup' }, ...([false, true] as const).map(core => h('button', {
      type: 'button', role: 'radio', class: this.core === core ? 'on' : '', 'aria-checked': String(this.core === core), text: t(core ? 'chCore' : 'chAll'),
      onclick: () => { this.core = core; save('chCore', core); this.era = undefined; this.update(this.lastYear); },
    })));
    this.head.replaceChildren(h('h3', { text: t('pEvents') }), h('small', { text: t('chCount', { n: this.events.length }) }), filter);

    const presentKinds = KIND_ORDER.filter(k => this.baseEvents.some(e => e.kind === k));
    const hasStories = this.baseEvents.some(e => hasScript(e));
    const chips: { key: ChKindFilter; label: string }[] = [
      { key: 'all', label: t('chrAll') },
      ...(hasStories ? [{ key: 'story' as const, label: t('chrStory') }] : []),
      ...presentKinds.map(k => ({ key: k as ChKindFilter, label: kindName(k) })),
    ];
    this.kindsBar.hidden = chips.length <= 2;
    this.kindsBar.replaceChildren(...chips.map(c => h('button', {
      type: 'button',
      class: 'ch-kind-chip' + (this.kindFilter === c.key ? ' on' : ''),
      'data-kind': c.key,
      'aria-pressed': String(this.kindFilter === c.key),
      text: c.label,
      onclick: () => {
        this.kindFilter = this.kindFilter === c.key && c.key !== 'all' ? 'all' : c.key;
        this.applyFilter();
        const curEntry = currentEntry(this.lastYear, this.events);
        const id = curEntry && curEntry.year <= this.lastYear ? curEntry.id : null;
        this.cur = id;
        for (const li of this.list.children as HTMLCollectionOf<HTMLElement>) li.classList.toggle('cur', li.dataset.id === id);
      },
    })));

    this.list.replaceChildren(...this.events.map(e => h('li', { 'data-id': e.id, class: `w${e.weight} k-${e.kind}` + (e.id === this.sel ? ' sel' : '') },
      h('button', { type: 'button', onclick: () => this.onOpen(e), title: tr(e.summary, L) },
        h('span', { class: 'ch-y', text: formatYear(e.year, L, { short: true }) }),
        h('span', { class: 'ch-t', text: tr(e.headline ?? e.title, L) }),
        this.progress?.learned.has(e.id) ? h('i', { class: 'ch-ok', text: '✓' }) : null,
        hasScript(e) ? h('i', { class: 'ch-s', title: t('chStory'), text: '▶' }) : null,
        e.weight <= 1 ? h('span', { class: 'ch-k', text: kindName(e.kind) }) : null))));
    this.cur = null;
  }

  relabel(): void {
    this.era = undefined;
    this.update(this.lastYear);
  }
}
