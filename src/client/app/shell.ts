import { lang, setLang, t } from '../lib/i18n.ts';
import { save } from '../lib/storage.ts';
import type { Atlas } from '../scene/atlas.ts';
import type { Caption } from '../ui/caption.ts';
import { h, iconBtn } from '../ui/dom.ts';
import type { HubMenu, SettingsMenu } from '../ui/menus.ts';
import type { Music } from '../ui/music.ts';
import { Panel } from '../ui/panel.ts';
import type { Period } from '../ui/period.ts';
import type { SearchBox } from '../ui/searchbox.ts';
import type { Timeline } from '../ui/timeline.ts';
import type { TrailBar } from '../ui/trail.ts';

export type Popover = 'details' | 'hub' | 'settings';

export interface ShellParts {
  atlas: Atlas;
  timeline: Timeline;
  period: Period;
  hub: HubMenu;
  settings: SettingsMenu;
  search: SearchBox;
  trail: TrailBar;
  caption: Caption;
  music: Music;
  /** the side panel's views, bottom to top: the learning path first (the stack's root) */
  views: { el: HTMLElement; close: () => void }[];
  /** dialogs appended to the root (course picker, help) */
  dialogs: HTMLElement[];
  lowfx: boolean;
}

export interface ShellActions {
  /** the Learn button: show the learning path on top, or close it */
  learn: () => void;
  /** the panel's top view changed */
  panelChanged: () => void;
}

/**
 * The screen's frame, built once: the toolbar (Learn · This period · Explore | search · settings · 中/EN) with its
 * popovers, the HUD on the map (headline, area, line key, phase line / story caption, timeline) and the side panel.
 * It also keeps the side panel fitted between the headline and the line key and tells the camera what the panel and the
 * timeline cover.
 *
 * Level 1 — the map overlay: headline top left, toolbar top right, line key bottom left, timeline bottom centre.
 * Level 2 — the side panel (a stack: path ▸ lesson ▸ quiz ▸ card), between the headline and the line key.
 * Level 3 — popovers under the tools, one at a time, and dialogs.
 */
export class Shell {
  readonly panel: Panel;
  readonly tools: HTMLElement;
  private pops: HTMLElement[];
  private hudTl: HTMLElement;
  private hudBl: HTMLElement;
  private hudBc: HTMLElement;
  private brand: HTMLElement;

  constructor(private root: HTMLElement, private p: ShellParts, actions: ShellActions) {
    const { timeline, period, hub, settings, search, trail, caption, music } = p;
    const hubBtn = iconBtn('journey', t('hub'), () => this.pop(hub.el.hidden ? 'hub' : null), 'b-hub lbl');
    const pathBtn = iconBtn('book', t('pathTitle'), () => actions.learn(), 'b-path lbl primary-tool');
    // the main tools carry a word as well as an icon: Learn · This period · Explore
    for (const b of [pathBtn, period.btn, hubBtn]) { b.classList.add('lbl'); b.append(h('span', { class: 'lbl-t' })); }
    const setBtn = iconBtn('sliders', t('settings'), () => this.pop(settings.el.hidden ? 'settings' : null), 'b-settings');
    const langBtn = h('button', {
      // its name is in the language it switches to, so a screen reader reads it with that voice
      type: 'button', class: 'ib lang b-lang', title: t('langTitle'), 'aria-label': t('langTitle'), text: t('lang'), lang: lang === 'zh' ? 'en' : 'zh-CN',
      onclick: () => setLang(lang === 'zh' ? 'en' : 'zh'),
    });
    const fullBtn = iconBtn('full', t('fullscreen'), () => { if (document.fullscreenElement) void document.exitFullscreen(); else void document.documentElement.requestFullscreen?.().catch(() => {}); }, 'b-full');
    fullBtn.hidden = !document.fullscreenEnabled;
    document.addEventListener('fullscreenchange', () => fullBtn.classList.toggle('on', !!document.fullscreenElement));
    settings.extra = h('div', { class: 'set-extra' }, music.el, fullBtn);
    settings.quality = {
      low: p.lowfx,
      pick: low => {
        save('quality', low ? 'low' : 'high');
        const u = new URL(location.href);
        u.searchParams.delete('lowfx');
        location.replace(u.href);
      },
    };
    settings.render();
    this.tools = h('div', { class: 'tools' }, pathBtn, period.btn, hubBtn, h('i', { class: 'tools-sep', 'aria-hidden': 'true' }), search.el, setBtn, langBtn);
    this.pops = [period.view, hub.el, settings.el];
    const bar = h('div', { class: 'bar' }, this.tools, ...this.pops);
    this.brand = h('div', { class: 'brand' }, h('span', { class: 'logo', 'aria-hidden': 'true' }), h('b', { text: 'Ages' }), h('span', { class: 'brand-k' }));
    this.hudTl = h('div', { class: 'hud-tl' }, this.brand, timeline.head);
    this.hudBl = h('div', { class: 'hud-bl' }, period.key);
    const hud = h('div', { class: 'hud' },
      this.hudTl,
      h('div', { class: 'hud-tr' }, period.stats),
      h('div', { class: 'hud-bot' },
        this.hudBl,
        this.hudBc = h('div', { class: 'hud-bc' }, trail.el, period.line, caption.el, timeline.el)));
    this.panel = new Panel(p.views);
    this.panel.onChange = () => {
      this.root.querySelector('.b-path')?.classList.toggle('on', this.panel.top === p.views[0].el);
      this.root.classList.toggle('dock-on', this.panel.open);
      this.updateInset();
      actions.panelChanged();
    };
    // a popover closes on a click anywhere else (the phase line toggles 时期详情 itself)
    document.addEventListener('pointerdown', e => {
      const n = e.target as Node;
      if (this.pops.some(x => !x.hidden) && !this.tools.contains(n) && !period.line.contains(n) && !this.pops.some(x => x.contains(n))) this.pop(null);
    });
    this.root.append(hud, this.panel.el, bar, ...p.dialogs);
    this.relabel();

    // measured at most once a frame: class flips and resizes come in bursts, and every pass forces a layout
    let insetQ = 0;
    const inset = () => { insetQ ||= requestAnimationFrame(() => { insetQ = 0; this.updateInset(); }); };
    new MutationObserver(inset).observe(this.root, { attributes: true, attributeFilter: ['class'] });
    const ro = new ResizeObserver(inset);
    for (const el of [this.root, this.panel.el, timeline.el, this.hudTl, this.hudBl, this.hudBc]) ro.observe(el);
  }

  /** Whether a toolbar popover is open. */
  get popOpen(): boolean { return this.pops.some(x => !x.hidden); }

  /** Opens one toolbar popover (or none): 时期详情, Explore and settings are mutually exclusive. */
  pop(which: Popover | null): void {
    const { hub, settings, period } = this.p;
    // focus goes into an opened menu and back to its toolbar button when the menu closes under it
    const was = !hub.el.hidden ? 'hub' : !settings.el.hidden ? 'settings' : null;
    const inside = was && (was === 'hub' ? hub.el : settings.el).contains(document.activeElement);
    period.view.hidden = which !== 'details';
    period.pressed(which === 'details');
    if (which === 'hub') hub.show(); else hub.toggle(false);
    settings.toggle(which === 'settings');
    for (const [sel, k] of [['.b-hub', 'hub'], ['.b-settings', 'settings']] as const) {
      const b = this.root.querySelector(sel);
      b?.classList.toggle('on', which === k);
      b?.setAttribute('aria-expanded', String(which === k));
    }
    if (which === 'hub' || which === 'settings') {
      const menu = which === 'hub' ? hub.el : settings.el;
      if (!menu.contains(document.activeElement)) menu.querySelector<HTMLElement>('button, input')?.focus({ preventScroll: true });
    } else if (inside && which === null) this.root.querySelector<HTMLElement>(was === 'hub' ? '.b-hub' : '.b-settings')?.focus({ preventScroll: true });
  }

  /** Fits the side panel between the headline and the line key, and tells the camera how much of the screen it (or the
   * phone's bottom sheet) and the timeline cover so the subject stays visible. */
  updateInset(): void {
    if (!this.panel) return;
    const { timeline, trail, atlas } = this.p;
    const H = this.root.clientHeight;
    const top = this.root.getBoundingClientRect().top;
    // (on phones the transport buttons sit just above the track, and the trail bar sits above them when active)
    const ctl = timeline.el.querySelector('.tl-ctl');
    const trailTop = !trail.el.hidden && matchMedia('(max-width: 720px)').matches ? trail.el.getBoundingClientRect().top : Infinity;
    const tl = Math.min(timeline.el.getBoundingClientRect().top, ctl?.getClientRects().length ? ctl.getBoundingClientRect().top : Infinity, trailTop) - top;
    // the phone's bottom sheet sits right above the timeline
    this.root.style.setProperty('--tl-b', `${Math.round(H - tl)}px`);
    // the left column: under the headline, above the line key (or the timeline, where the key is folded away)
    const head = this.hudTl.getBoundingClientRect().bottom - top;
    const foot = Math.min(tl, this.hudBl.getClientRects().length ? this.hudBl.getBoundingClientRect().top - top : tl);
    this.root.style.setProperty('--lt', `${Math.ceil(head + 6)}px`);
    this.root.style.setProperty('--lb', `${Math.ceil(H - foot + 6)}px`);
    // reading, the widened panel reaches over the foot's centre: stop above the phase line too
    const line = this.hudBc.getBoundingClientRect().top - top;
    // 时期详情 runs from under the toolbar down to just above the foot's centre
    this.root.style.setProperty('--bc-t', `${Math.round(line)}px`);
    this.root.style.setProperty('--lb-read', `${Math.ceil(H - Math.min(foot, line) + 6)}px`);
    if (this.root.classList.contains('story-on')) return atlas.view.setInset(0, 0, 0);
    if (matchMedia('(max-width: 720px)').matches) {
      const sheet = this.panel.open ? tl - this.panel.el.offsetHeight : tl;
      return atlas.view.setInset(0, 0, Math.min(H * 0.62, H - Math.min(sheet, tl)));
    }
    // the desktop side panel floats over the map: opening it must not move the map
    atlas.view.setInset(0, 0, 0);
  }

  relabel(): void {
    this.brand.querySelector('.brand-k')!.textContent = `${lang === 'zh' ? '长河' : 'Changhe'} · ${t('kicker')}`;
    this.brand.title = `Ages · ${t('brandSub')}`;
    const set = (cls: string, k: Parameters<typeof t>[0]) => { const el = this.root.querySelector<HTMLElement>(cls); if (el) { el.title = t(k); el.setAttribute('aria-label', t(k)); } };
    set('.b-hub', 'hub'); set('.b-path', 'pathTitle'); set('.b-settings', 'settings');
    const word = (cls: string, k: Parameters<typeof t>[0]) => { const el = this.root.querySelector<HTMLElement>(`${cls} .lbl-t`); if (el) el.textContent = t(k); };
    word('.b-path', 'learnBtn'); word('.b-details', 'periodBtn'); word('.b-hub', 'exploreBtn'); set('.b-full', 'fullscreen'); set('.b-lang', 'langTitle');
    const lb = this.root.querySelector<HTMLElement>('.b-lang');
    if (lb) { lb.textContent = t('lang'); lb.lang = lang === 'zh' ? 'en' : 'zh-CN'; }
    document.title = lang === 'zh' ? '长河 · 3D 中国历史地图' : 'Ages · 3D Atlas of Chinese History';
  }
}
