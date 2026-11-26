import { CHAPTERS, chapterAt, type Chapter } from '../../shared/data/chapters.ts';
import { EVENTS } from '../../shared/data/events.ts';
import { ERAS } from '../../shared/data/eras.ts';
import { tr } from '../../shared/data/i18n.ts';
import type { HistEvent, Year } from '../../shared/data/types.ts';
import { reignAt, regionalReignsAt } from '../../shared/data/jiangshan.ts';
import { STOPS, stepStop } from '../../shared/lib/chronicle.ts';
import { realmArea } from '../../shared/data/areas.ts';
import { SNAPSHOTS } from '../../shared/data/territories.ts';
import { clampYear, eraAt, formatYear, normYear, rulerAt, tToYear, ticks, yearToT, YEAR_MAX, YEAR_MIN } from '../../shared/lib/timeline.ts';
import { lang, t } from '../lib/i18n.ts';
import { load, save } from '../lib/storage.ts';
import { h, iconBtn, setIcon } from './dom.ts';

/**
 * Time, in two parts. `head` is the headline on the map's top-left corner: the dynasty (click for its card), the year
 * and the ruler / reign era. `el` is the bar across the foot of the map: one plate of ⏮ ▶ ⏭ and a
 * speed toggle (0.5× → 1× → 2×), then the track — the dynasty's territorial area as a stepped curve, event ticks, coloured era bands
 * (two lanes for overlapping regimes), the year axis and a draggable thumb. The axis is piecewise-linear (see
 * shared/lib/timeline.ts) so the dense recent centuries get room while prehistory stays visible.
 *
 * In the simple mode (the default) a row of the learning path's ten chapters runs above the dynasties; while a chapter is
 * being learned the track zooms to its years (the learner can widen it back to all of history).
 */
export class Timeline {
  readonly el: HTMLElement;
  readonly head: HTMLElement;
  private curve: HTMLElement;
  private track: HTMLElement;
  private thumb: HTMLElement;
  private yearEl: HTMLElement;
  private eraEl: HTMLButtonElement;
  private rulerEl: HTMLElement;
  private playBtn: HTMLButtonElement;
  private speedBtn: HTMLButtonElement;
  /** playback rate: 1× crosses the whole axis in ~100 s */
  private speed = 1;
  private tip: HTMLElement;
  private bands: HTMLElement;
  private dots: HTMLElement;
  private axis: HTMLElement;
  private phases: HTMLElement;
  private flag: HTMLElement;
  private chapterRow: HTMLElement;
  private zoomBtn: HTMLButtonElement;
  /** the chapter being learned, and whether the track is zoomed to it */
  private chapter: Chapter | null = null;
  private zoomed = false;
  /** the visible window of the axis, in axis units (0–1) */
  private win: [number, number] = [0, 1];
  year: Year = 0;
  playing = false;
  onYear: (y: Year, final: boolean) => void = () => {};
  onEvent: (e: HistEvent) => void = () => {};
  onEra: (eraId: string) => void = () => {};
  onPlay: (on: boolean) => void = () => {};
  /** Fires on every readout change (year, era), e.g. for the period stats and chronicle. */
  onRender: (y: Year) => void = () => {};
  /** a chapter of the chapter row was picked */
  onChapter: (c: Chapter) => void = () => {};
  /** the simple / detailed mode changed */
  onDetail: (on: boolean) => void = () => {};
  private selected: string | null = null;

  /** Simple (the default: dynasties and the key events) or detailed (every chronicle entry, territorial phases and the
   * area curve). */
  private detailBtn = h('button', { type: 'button', class: 'ib tl-detail', 'aria-pressed': 'false', onclick: () => this.setDetail(!this.detail, true) });
  detail = false;
  setDetail(on: boolean, remember = false): void {
    this.detail = on;
    this.el?.classList.toggle('detail', on);
    this.detailBtn.setAttribute('aria-pressed', String(on));
    this.detailBtn.classList.toggle('on', on);
    this.detailBtn.textContent = t(on ? 'tlDetailOn' : 'tlDetailOff');
    this.detailBtn.title = t('tlDetailTitle');
    if (remember) save('tlDetail', on);
    this.onDetail(on);
  }

  /** Where `y` sits on the visible track (0–1; outside when zoomed in). */
  private pos(y: Year): number { return (yearToT(y) - this.win[0]) / (this.win[1] - this.win[0]); }
  private pct(y: Year): string { return `${(this.pos(y) * 100).toFixed(3)}%`; }
  private width(a: Year, b: Year, min = 0): string { return `${Math.max(min, (this.pos(b) - this.pos(a)) * 100).toFixed(3)}%`; }

  /**
   * Follows the learning focus: the chapter being learned is marked on the chapter row and the track zooms to its years
   * (unless the learner widened it). Null returns to the whole of history.
   */
  setChapter(c: Chapter | null): void {
    if (c === this.chapter) return;
    this.chapter = c;
    this.zoomed = !!c;
    this.applyZoom();
  }

  private applyZoom(): void {
    const c = this.zoomed ? this.chapter : null;
    if (c) {
      const a = yearToT(c.span[0]), b = yearToT(Math.min(c.span[1], tToYear(1)));
      const pad = (b - a) * 0.04;
      this.win = [Math.max(0, a - pad), Math.min(1, b + pad)];
    } else this.win = [0, 1];
    this.el.classList.toggle('zoomed', !!c);
    this.zoomBtn.hidden = !this.chapter;
    this.zoomBtn.setAttribute('aria-pressed', String(!!c));
    this.zoomBtn.textContent = c ? t('tlWhole') : t('tlChapter', { n: this.chapter?.n ?? '' });
    this.zoomBtn.title = c ? t('tlWholeTitle') : t('tlChapterTitle');
    this.build();
    this.select(this.selected);
  }

  constructor() {
    this.playBtn = iconBtn('play', t('play'), () => this.setPlaying(!this.playing), 'tl-play');
    this.speedBtn = h('button', {
      type: 'button', class: 'ib tl-speed', title: t('speed'), 'aria-label': `${t('speed')} 1×`, text: '1×',
      onclick: () => {
        const sp = [0.5, 1, 2];
        this.speed = sp[(sp.indexOf(this.speed) + 1) % sp.length];
        this.speedBtn.textContent = `${this.speed}×`;
        this.speedBtn.setAttribute('aria-label', `${t('speed')} ${this.speed}×`);
      },
    });
    this.yearEl = h('div', { class: 'tl-year', 'aria-live': 'polite' });
    this.eraEl = h('button', { type: 'button', class: 'tl-era', onclick: () => { const e = eraAt(this.year); if (e) this.onEra(e.id); } });
    this.rulerEl = h('div', { class: 'tl-ruler' });
    this.bands = h('div', { class: 'tl-bands' });
    this.dots = h('div', { class: 'tl-dots' });
    this.axis = h('div', { class: 'tl-axis' });
    this.phases = h('div', { class: 'tl-phases', 'aria-hidden': 'true' });
    this.flag = h('div', { class: 'tl-flag' });
    this.thumb = h('div', { class: 'tl-thumb' }, h('i'), this.flag);
    this.tip = h('div', { class: 'tl-tip' });
    this.curve = h('div', { class: 'tl-curve', 'aria-hidden': 'true' });
    this.chapterRow = h('div', { class: 'tl-chapters' });
    this.zoomBtn = h('button', { type: 'button', class: 'ib tl-zoom', hidden: true, onclick: () => { this.zoomed = !this.zoomed; this.applyZoom(); } });
    this.track = h('div', { class: 'tl-track', role: 'slider', tabindex: 0, 'aria-label': t('era'), 'aria-valuemin': YEAR_MIN, 'aria-valuemax': YEAR_MAX }, this.curve, this.chapterRow, this.dots, this.bands, this.phases, this.axis, this.thumb, this.tip);
    this.head = h('div', { class: 'tl-head' }, this.eraEl, this.yearEl, this.rulerEl);
    const ctl = h('div', { class: 'tl-ctl' },
      iconBtn('prev', t('prevStop'), () => this.step(-1), 'tl-prev'), this.playBtn, iconBtn('next', t('nextStop'), () => this.step(1), 'tl-next'),
      h('i', { class: 'tools-sep', 'aria-hidden': 'true' }), this.speedBtn, this.detailBtn, this.zoomBtn);
    this.el = h('div', { class: 'tl' }, ctl, this.track);
    this.setDetail(load<boolean>('tlDetail', false, v => typeof v === 'boolean'));
    this.build();
    this.bind();
    new ResizeObserver(() => this.layoutAxis()).observe(this.track);
  }

  private build(): void {
    this.chapterRow.replaceChildren(...CHAPTERS.map(c => h('button', {
      type: 'button', tabindex: -1, class: 'tl-ch' + (c === this.chapter ? ' cur' : ''), 'data-tl-chapter': c.id,
      style: `left:${this.pct(c.span[0])};width:${this.width(c.span[0], Math.min(c.span[1], tToYear(1)))}`,
      title: `${t('pathChapterN', { n: c.n })} · ${tr(c.title, lang)}`,
      onclick: (ev: Event) => { ev.stopPropagation(); this.onChapter(c); },
    }, h('b', { text: String(c.n) }), h('span', { text: tr(c.short, lang) }))));
    this.bands.replaceChildren(...ERAS.filter(e => e.scope === 'china').map(e => {
      const b = h('button', {
        type: 'button', tabindex: -1, class: `tl-band lane${e.lane ?? 0}`, style: `left:${this.pct(e.start)};width:${this.width(e.start, e.end, 0.15)};--c:${e.color}`,
        title: `${tr(e.name, lang)} ${formatYear(e.start, lang)}–${formatYear(e.end, lang)}`, 'data-era': e.id,
        onclick: (ev: Event) => { ev.stopPropagation(); this.onEra(e.id); },
      });
      // a short form for narrow bands: "W. Han" → "Han"
      b.append(h('span', { text: tr(e.short, lang), 'data-compact': lang === 'en' ? tr(e.short, 'en').replace(/^(W|E|N|S|Later|Former)\.?\s+/, '') : tr(e.short, 'zh').slice(0, 1) }));
      return b;
    }));
    this.curve.replaceChildren(this.areaCurve());
    this.phases.replaceChildren(...SNAPSHOTS.filter(x => x.year >= -2070).map(x => h('i', { style: `left:${this.pct(x.year)}` })));
    // textbook events on top of the (fainter) imported chronicle entries
    this.dots.replaceChildren(...EVENTS.filter(e => e.scope === 'china').sort((a, b) => b.weight - a.weight).map(e => {
      // ~900 dots: pointer targets only, so Tab doesn't walk through them (the slider, search and period list cover the keyboard)
      const d = h('button', { type: 'button', tabindex: -1, class: `tl-dot w${e.weight} k-${e.kind}`, style: `left:${this.pct(e.year)}`, 'data-id': e.id, 'aria-label': tr(e.title, lang) });
      d.addEventListener('pointerenter', () => this.showTip(e, d));
      d.addEventListener('pointerleave', () => this.tip.classList.remove('on'));
      d.addEventListener('click', ev => { ev.stopPropagation(); this.onEvent(e); });
      return d;
    }));
    this.layoutAxis();
    this.render();
  }

  /** The dynasty's territorial area per phase as a stepped, filled line (one step per territorial snapshot). */
  private areaCurve(): SVGSVGElement {
    const NS = 'http://www.w3.org/2000/svg';
    const snaps = SNAPSHOTS.filter(x => x.year >= -2070);
    const max = Math.max(...snaps.map(x => realmArea(x.id)), 1);
    const pts: string[] = [];
    snaps.forEach((x, i) => {
      const a = 1000 * (1 - realmArea(x.id) / max);
      const x0 = yearToT(x.year) * 1000, x1 = yearToT(snaps[i + 1]?.year ?? tToYear(1)) * 1000;
      pts.push(`${x0.toFixed(1)},${a.toFixed(0)}`, `${x1.toFixed(1)},${a.toFixed(0)}`);
    });
    const first = (yearToT(snaps[0].year) * 1000).toFixed(1), last = (yearToT(tToYear(1)) * 1000).toFixed(1);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', `${(this.win[0] * 1000).toFixed(1)} 0 ${((this.win[1] - this.win[0]) * 1000).toFixed(1)} 1000`);
    svg.setAttribute('preserveAspectRatio', 'none');
    const fill = document.createElementNS(NS, 'polygon');
    fill.setAttribute('points', `${first},1000 ${pts.join(' ')} ${last},1000`);
    const line = document.createElementNS(NS, 'polyline');
    line.setAttribute('points', pts.join(' '));
    line.setAttribute('vector-effect', 'non-scaling-stroke');
    svg.append(fill, line);
    return svg;
  }

  private layoutAxis(): void {
    const w = this.track.clientWidth || 600;
    const ys = this.zoomed && this.chapter ? zoomTicks(tToYear(this.win[0]), tToYear(this.win[1]), w) : ticks(w);
    this.axis.replaceChildren(...ys.map(y => h('span', { style: `left:${this.pct(y)}`, text: formatYear(y, lang, { short: true }).replace('约', '').replace('c. ', '').replace(' million years ago', 'M ya') })));
    // drop axis labels that would collide with the previous visible one
    let right = -Infinity;
    for (const s of this.axis.children as HTMLCollectionOf<HTMLElement>) {
      const r = s.getBoundingClientRect();
      s.style.visibility = !r.width || r.left >= right + 6 ? 'visible' : 'hidden';
      if (s.style.visibility === 'visible' && r.width) right = r.right;
    }
    // band labels that do not fit try their short form, then hide; so do the chapter names (the number stays)
    for (const b of this.bands.children as HTMLCollectionOf<HTMLElement>) {
      const s = b.firstElementChild as HTMLElement;
      const full = s.dataset.full ?? s.textContent ?? '';
      s.dataset.full = full;
      s.textContent = full;
      if (s.scrollWidth > b.clientWidth - 2 && s.dataset.compact) s.textContent = s.dataset.compact;
      s.style.visibility = s.scrollWidth <= b.clientWidth - 2 ? 'visible' : 'hidden';
    }
    for (const b of this.chapterRow.children as HTMLCollectionOf<HTMLElement>) {
      const s = b.querySelector('span')!;
      s.style.display = '';
      if (b.scrollWidth > b.clientWidth + 1) s.style.display = 'none';
    }
  }

  private showTip(e: HistEvent, d: HTMLElement): void {
    this.tip.textContent = `${formatYear(e.year, lang)} ${tr(e.title, lang)}`;
    this.tip.style.left = d.style.left;
    this.tip.classList.add('on');
  }

  private bind(): void {
    let drag = false;
    const at = (cx: number) => {
      const r = this.track.getBoundingClientRect();
      const u = Math.min(1, Math.max(0, (cx - r.left) / r.width));
      return tToYear(this.win[0] + u * (this.win[1] - this.win[0]));
    };
    this.track.addEventListener('pointerdown', e => {
      if ((e.target as HTMLElement).closest('.tl-dot,.tl-band,.tl-ch')) return;
      drag = true;
      this.el.classList.add('dragging');
      this.track.setPointerCapture(e.pointerId);
      this.setPlaying(false);
      this.set(at(e.clientX), false);
    });
    this.track.addEventListener('pointermove', e => { if (drag) this.set(at(e.clientX), false); });
    const end = (e: PointerEvent) => { if (drag) { drag = false; this.el.classList.remove('dragging'); this.set(at(e.clientX), true); } };
    this.track.addEventListener('pointerup', end);
    this.track.addEventListener('pointercancel', end);
    this.track.addEventListener('keydown', e => {
      const step = this.year < -10000 ? 50000 : this.year < -1000 ? 50 : this.year < 1800 ? 10 : 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { this.set(this.year + step * (e.shiftKey ? 10 : 1), true); e.preventDefault(); e.stopPropagation(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { this.set(this.year - step * (e.shiftKey ? 10 : 1), true); e.preventDefault(); e.stopPropagation(); }
    });
    let last = 0, raf = 0, playT = 0;
    const tick = (now: number) => {
      raf = 0;
      if (!this.playing) return;
      const dt = Math.min(0.1, (now - (last || now)) / 1000);
      last = now;
      // a fractional position: one frame's step is often less than a year, which rounding the year would swallow;
      // re-synced whenever something else moved the year
      if (normYear(tToYear(playT)) !== this.year) playT = yearToT(this.year);
      // ~100 s for the whole axis; slower inside dense periods because the axis is non-linear
      // ~100 s for the whole axis, a chapter in about 20 s when zoomed to it
      playT += (dt * this.speed * Math.max(0.2, this.win[1] - this.win[0])) / 100;
      if (playT >= this.win[1]) { this.set(tToYear(this.win[1]), true); this.setPlaying(false); } else {
        this.set(tToYear(playT), false);
        if (this.playing) raf = requestAnimationFrame(tick);
      }
    };
    this.startTick = () => {
      if (!raf && this.playing) { last = 0; playT = yearToT(this.year); raf = requestAnimationFrame(tick); }
    };
  }

  private startTick = () => {};
  private lastEraId: string | undefined = '__init__';

  /** Jumps to the next/previous chronicle entry or territorial phase. */
  step(dir: 1 | -1): void {
    this.setPlaying(false);
    this.set(this.year < -2070 && dir > 0 ? STOPS[0] : stepStop(this.year, dir), true);
  }

  setPlaying(on: boolean): void {
    if (on === this.playing) return;
    this.playing = on;
    // from the start of the visible window when at (or past) its end
    if (on && (yearToT(this.year) >= this.win[1] - 0.001 || yearToT(this.year) < this.win[0])) this.set(tToYear(this.win[0]), false);
    setIcon(this.playBtn, on ? 'pause' : 'play');
    this.playBtn.title = this.playBtn.ariaLabel = t(on ? 'pause' : 'play');
    this.el.classList.toggle('playing', on);
    if (on) this.startTick();
    if (!on) this.onYear(this.year, true);
    this.onPlay(on);
  }

  /** Sets the year (from the user when `emit`, otherwise from the app). */
  set(y: Year, final: boolean, emit = true): void {
    y = clampYear(y);
    const changed = y !== this.year;
    this.year = y;
    this.render();
    if (emit && (changed || final)) this.onYear(y, final);
  }

  select(id: string | null): void {
    this.selected = id;
    for (const d of this.dots.children as HTMLCollectionOf<HTMLElement>) d.classList.toggle('sel', d.dataset.id === id);
  }

  private render(): void {
    const y = this.year;
    this.thumb.style.left = this.pct(y);
    this.thumb.hidden = this.pos(y) < -0.001 || this.pos(y) > 1.001;
    const here = chapterAt(y).id;
    for (const b of this.chapterRow.children as HTMLCollectionOf<HTMLElement>) b.classList.toggle('here', b.dataset.tlChapter === here);
    this.yearEl.textContent = formatYear(y, lang);
    const era = eraAt(y);
    if (era?.id !== this.lastEraId) {
      this.lastEraId = era?.id;
      this.eraEl.textContent = era ? tr(era.name, lang) : '';
      this.eraEl.style.setProperty('--c', era?.color ?? '#888');
      this.eraEl.hidden = !era;
      for (const b of this.bands.children as HTMLCollectionOf<HTMLElement>) b.classList.toggle('cur', b.dataset.era === era?.id);
    }
    // the orthodox reign era (年号) when known, else the curated ruler; rival regimes' eras in the tooltip
    const r = rulerAt(y), reign = reignAt(y);
    this.rulerEl.textContent = reign ? tr(reign.label, lang) : r ? tr(r.name, lang) : '';
    this.flag.textContent = `${formatYear(y, lang)}${reign ? ' · ' + tr(reign.label, lang).replace(/^.*· /, '') : ''}`;
    this.rulerEl.title = [this.rulerEl.textContent, ...regionalReignsAt(y).map(x => `${tr(x.regime, lang)}${lang === 'zh' ? '：' : ': '}${tr(x.reign.label, lang)}`)].filter(Boolean).join('\n');
    this.track.setAttribute('aria-valuenow', String(y));
    this.track.setAttribute('aria-valuetext', `${formatYear(y, lang)} ${era ? tr(era.name, lang) : ''}`);
    this.onRender(y);
  }

  relabel(): void {
    this.lastEraId = '__init__';
    this.track.setAttribute('aria-label', t('era'));
    for (const [c, k] of [['.tl-prev', 'prevStop'], ['.tl-next', 'nextStop']] as const) { const b = this.el.querySelector<HTMLElement>(c)!; b.title = t(k); b.setAttribute('aria-label', t(k)); }
    this.playBtn.title = this.playBtn.ariaLabel = t(this.playing ? 'pause' : 'play');
    this.speedBtn.title = t('speed');
    this.speedBtn.setAttribute('aria-label', `${t('speed')} ${this.speed}×`);
    this.setDetail(this.detail);
    this.applyZoom();
  }
}

/** Round years across a zoomed window, about one label per 90 px. */
function zoomTicks(a: Year, b: Year, w: number): Year[] {
  const want = Math.max(2, Math.floor(w / 90));
  const span = b - a;
  const steps = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000, 10_000, 50_000, 100_000, 200_000, 500_000];
  const step = steps.find(s => span / s <= want) ?? 1_000_000;
  const out: Year[] = [];
  for (let y = Math.ceil(a / step) * step; y <= b; y += step) out.push(y === 0 ? 1 : y);
  return out;
}


