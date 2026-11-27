import type { Chapter } from '../../shared/data/chapters.ts';
import { EVENT } from '../../shared/data/events.ts';
import { tr } from '../../shared/data/i18n.ts';
import { JOURNEYS, type Journey } from '../../shared/data/corpus.ts';
import type { HistEvent } from '../../shared/data/types.ts';
import { chapterPlaylist, cleanItems, cleanTitle, encodePlaylist, isPlaylist, MAX_ITEMS, move, type PlayItem, type Playlist } from '../../shared/lib/playlist.ts';
import { formatYear } from '../../shared/lib/timeline.ts';
import { lang, t } from '../lib/i18n.ts';
import { load, save } from '../lib/storage.ts';
import { ModalFocus, fill, h, icon, iconBtn } from './dom.ts';

const journey = (id: string): Journey | undefined => JOURNEYS.find(j => j.id === id);
const itemTitle = (x: PlayItem): string => (x.k === 'e' ? tr(EVENT.get(x.id)?.title, lang) : tr(journey(x.id)?.title, lang));
const itemSub = (x: PlayItem): string => {
  if (x.k === 'e') { const e = EVENT.get(x.id); return e ? formatYear(e.year, lang) + (e.story ? ' · ▶' : '') : ''; }
  const j = journey(x.id);
  return j ? `${t('pJourney')} · ${tr(j.span, lang)}` : '';
};

/** The shareable address of a playlist. */
export function playlistUrl(p: Playlist): string {
  const u = new URL(location.href);
  u.searchParams.delete('lowfx');
  const q = new URLSearchParams({ show: encodePlaylist(p.items) });
  if (p.title) q.set('st', p.title);
  q.set('lang', lang);
  u.hash = q.toString();
  return u.href;
}

/**
 * 课堂演示 — the teacher's playlist, a dialog: events (added from their card, or a whole chapter at once) and journeys in
 * the order they will be shown, with a title; start presenting, copy the link, or clear it. Saved on the device.
 */
export class ClassroomView {
  readonly el: HTMLElement;
  private box: HTMLElement;
  readonly focus: ModalFocus;
  list: Playlist = load<Playlist>('playlist', { title: '', items: [] }, isPlaylist);
  /** a playlist opened from a link, not yet saved over the teacher's own */
  private shared = false;
  private msg = '';
  onPresent: (p: Playlist) => void = () => {};

  constructor() {
    this.list = { title: cleanTitle(this.list.title), items: cleanItems(this.list.items) };
    this.box = h('div', { class: 'modal-box classroom' });
    this.el = h('div', { class: 'modal', hidden: true, role: 'dialog', 'aria-modal': 'true', 'data-testid': 'classroom', 'aria-label': t('pTitle'), onclick: (e: Event) => { if (e.target === this.el) this.toggle(false); } }, this.box);
    this.focus = new ModalFocus(this.el);
  }

  get open(): boolean { return !this.el.hidden; }
  toggle(on = this.el.hidden): void {
    if (on === this.open) return;
    this.el.hidden = !on;
    if (on) { this.msg = ''; this.render(); this.focus.opened(); } else this.focus.closed();
  }

  private store(): void { this.shared = false; save('playlist', this.list); }
  private set(items: PlayItem[], title = this.list.title): void { this.list = { title: cleanTitle(title), items: cleanItems(items) }; this.store(); this.render(); }

  has(e: HistEvent): boolean { return this.list.items.some(x => x.k === 'e' && x.id === e.id); }
  /** Adds an event (or takes it out again); false when the list is full. */
  toggleEvent(e: HistEvent): boolean {
    if (this.has(e)) { this.set(this.list.items.filter(x => !(x.k === 'e' && x.id === e.id))); return true; }
    if (this.list.items.length >= MAX_ITEMS) return false;
    this.set([...this.list.items, { k: 'e', id: e.id }]);
    return true;
  }
  addJourney(j: Journey): void { this.set([...this.list.items, { k: 'j', id: j.id }]); }
  /** Replaces the playlist with a chapter's events to know. */
  fromChapter(c: Chapter): void {
    const p = chapterPlaylist(c, t('pChapterTitle', { n: c.n, t: tr(c.title, lang) }));
    this.set(p.items, p.title);
  }
  /** A playlist opened from a link: shown, saved only once the teacher changes it. */
  loadShared(p: Playlist): void {
    this.list = { title: cleanTitle(p.title), items: cleanItems(p.items) };
    this.shared = true;
  }

  render(): void {
    if (!this.open) return;
    this.el.setAttribute('aria-label', t('pTitle'));
    const items = this.list.items;
    const title = h('input', { type: 'text', class: 'cr-title', 'data-testid': 'classroom-title', maxlength: '60', placeholder: t('pTitlePh'), 'aria-label': t('pTitlePh') }) as HTMLInputElement;
    title.value = this.list.title;
    title.addEventListener('change', () => { this.list = { ...this.list, title: cleanTitle(title.value) }; this.store(); });
    const msg = h('p', { class: 'cr-msg', 'aria-live': 'polite', text: this.msg });
    fill(this.box,
      h('header', { class: 'rp-head' },
        h('div', {}, h('h2', { text: t('pTitle') }), h('small', { text: t('pSub') })),
        iconBtn('close', t('close'), () => this.toggle(false))),
      this.shared ? h('p', { class: 'cr-shared', text: t('pShared') }) : null,
      title,
      items.length
        ? h('ol', { class: 'cr-list', 'data-testid': 'classroom-list' }, ...items.map((x, i) => h('li', {},
          h('i', { text: String(i + 1) }),
          h('span', {}, h('b', { text: itemTitle(x) }), h('small', { text: itemSub(x) })),
          iconBtn('up', t('pUp'), () => this.set(move(items, i, -1)), 'cr-up'),
          iconBtn('down', t('pDown'), () => this.set(move(items, i, 1)), 'cr-down'),
          iconBtn('close', t('pRemove'), () => this.set(items.filter((_, k) => k !== i)), 'cr-rm'))))
        : h('p', { class: 'cr-empty', text: t('pEmpty') }),
      h('div', { class: 'rp-acts' },
        h('button', { type: 'button', class: 'btn primary', 'data-act': 'present', disabled: !items.length, onclick: () => { if (this.shared) this.store(); this.toggle(false); this.onPresent(this.list); } },
          icon('play'), h('span', { text: t('pStart') })),
        h('button', { type: 'button', class: 'btn', 'data-act': 'present-link', disabled: !items.length, text: t('pLink'), onclick: () => void this.copy(msg) }),
        items.length ? h('button', { type: 'button', class: 'btn ghost', 'data-act': 'present-clear', text: t('pClear'), onclick: () => this.set([], '') }) : null),
      msg,
      h('p', { class: 'rp-note', text: t('pKeys') }));
  }

  private async copy(msg: HTMLElement): Promise<void> {
    const url = playlistUrl(this.list);
    try { await navigator.clipboard.writeText(url); this.msg = t('pCopied'); } catch { this.msg = url; }
    msg.textContent = this.msg;
  }
}

export interface PresenterHooks {
  /** shows an event on the map (year, camera, its model), without the card */
  event: (e: HistEvent) => void;
  play: (e: HistEvent) => void;
  journey: (j: Journey) => void;
  exit: () => void;
}

/**
 * Presentation mode: the map full screen for a projector, one playlist item at a time with a large caption, stepped with
 * the arrow keys, Page Up / Down (a clicker) or the on-screen buttons; P or Enter plays the event's story.
 */
export class Presenter {
  readonly el: HTMLElement;
  private list: Playlist = { title: '', items: [] };
  private i = 0;
  on = false;

  constructor(private hooks: PresenterHooks) {
    this.el = h('section', { class: 'present', hidden: true, 'data-testid': 'presenter', role: 'region', 'aria-live': 'polite' });
  }

  get index(): number { return this.i; }
  get item(): PlayItem | undefined { return this.list.items[this.i]; }

  start(p: Playlist, at = 0): void {
    if (!p.items.length) return;
    this.list = p;
    this.on = true;
    this.el.hidden = false;
    this.go(at);
  }

  stop(): void {
    if (!this.on) return;
    this.on = false;
    this.el.hidden = true;
    this.hooks.exit();
  }

  step(dir: 1 | -1): void { this.go(this.i + dir); }

  go(i: number): void {
    if (!this.on) return;
    this.i = Math.max(0, Math.min(this.list.items.length - 1, i));
    const x = this.item!;
    if (x.k === 'e') { const e = EVENT.get(x.id); if (e) this.hooks.event(e); } else { const j = journey(x.id); if (j) this.hooks.journey(j); }
    this.render();
  }

  /** Plays the current event's story, if it has one. */
  play(): void {
    const x = this.item;
    const e = x?.k === 'e' ? EVENT.get(x.id) : undefined;
    if (e?.story) this.hooks.play(e);
  }

  render(): void {
    if (!this.on) return;
    const L = lang, x = this.item!, n = this.list.items.length;
    const e = x.k === 'e' ? EVENT.get(x.id) : undefined;
    const j = x.k === 'j' ? journey(x.id) : undefined;
    fill(this.el,
      h('div', { class: 'pr-top' },
        h('span', { class: 'pr-list', text: this.list.title || t('pTitle') }),
        h('span', { class: 'pr-n', 'data-testid': 'presenter-n', text: `${this.i + 1} / ${n}` })),
      h('p', { class: 'pr-y', text: e ? formatYear(e.year, L) : j ? tr(j.span, L) : '' }),
      h('h2', { class: 'pr-t', text: e ? tr(e.title, L) : j ? tr(j.title, L) : '' }),
      e ? h('p', { class: 'pr-sum', text: tr(e.summary, L) }) : null,
      h('div', { class: 'pr-ctl' },
        iconBtn('prev', t('prev'), () => this.step(-1), 'pr-prev'),
        e?.story ? h('button', { type: 'button', class: 'btn primary pr-play', 'data-act': 'present-play', onclick: () => this.play() }, icon('play'), h('span', { text: t('pPlay') })) : null,
        iconBtn('next', t('next'), () => this.step(1), 'pr-next'),
        h('button', { type: 'button', class: 'btn ghost pr-exit', 'data-act': 'present-exit', text: t('pExit'), onclick: () => this.stop() })),
      h('i', { class: 'pr-bar', 'aria-hidden': 'true' }, h('b', { style: `width:${((this.i + 1) / n) * 100}%` })));
    (this.el.querySelector<HTMLElement>('.pr-next') ?? this.el).focus({ preventScroll: true });
  }
}
