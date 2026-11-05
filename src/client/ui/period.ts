import { formatArea, polityArea, realmArea, snapPolities } from '../../shared/data/areas.ts';
import { tr } from '../../shared/data/i18n.ts';
import { WORKS } from '../../shared/data/jiangshan.ts';
import { PLACE, mapName } from '../../shared/data/places.ts';
import { POLITY } from '../../shared/data/polities.ts';
import { snapshotSources } from '../../shared/data/sources.ts';
import { SNAPSHOTS } from '../../shared/data/territories.ts';
import type { Lang, Polity, Snapshot, Year } from '../../shared/data/types.ts';
import { worldForRange } from '../../shared/data/world-sync.ts';
import { phaseAt, previousSnap, type Phase } from '../../shared/lib/chronicle.ts';
import { eraAt, formatYear } from '../../shared/lib/timeline.ts';
import { lang, t, type Key } from '../lib/i18n.ts';
import { fill, h, iconBtn } from './dom.ts';

const ROLE_ORDER: Polity['role'][] = ['main', 'rival', 'occupied', 'protectorate', 'neighbor'];
const WORK_COLOR: Record<string, string> = { wall: '#a8916a', canal: '#2f7fc4', road: '#8a5a2b', sea: '#1f5f8b' };
const WORK_KEY: Record<string, Key> = { wall: 'wkWall', canal: 'wkCanal', road: 'wkRoad', sea: 'wkSea' };

interface Pol { id: string; color: string; role: Polity['role']; name: string; area: number }

/** "241" + "万平方千米" / "2.41" + "million km²" from thousands of km². */
function areaParts(k: number, l: Lang): [string, string] {
  if (l === 'zh') { const w = k / 10; return [w >= 10 ? Math.round(w).toLocaleString('zh-CN') : w.toFixed(1), '万平方千米']; }
  return k >= 1000 ? [(k / 1000).toFixed(2), 'million km²'] : [`${Math.round(k)},000`, 'km²'];
}

const areaShort = (k: number, l: Lang): string => areaParts(k, l).join(' ').replace('million km²', 'M km²').replace('平方千米', 'km²');
const stripTitleDate = (s: string): string =>
  s.replace(/^[^·（(]*\d[^·（(]*·\s*(?=\S)/, '').replace(/([（(])[^·（）()]*\d[^·（）()]*·\s*(?=\S)/, '$1');

/**
 * The territorial period at the timeline's year, shown at three depths:
 * - `btn` (the top-right toolbar): the 时期详情 toggle;
 * - `stats` (map, top right, under the toolbar): the realm's area in large type and the largest coexisting polities;
 * - `line` (map, bottom centre): the phase title as an ambient caption;
 * - `key` (map, bottom left): the line legend (the border disclaimer is in the help dialog);
 * - `view` (the 时期详情 popover under the toolbar, like the study hall and settings), by priority: the overview (span, phase stepper, title, dynasty · capital ·
 *   area, note) and the chronicle (mounted by the app, fills the rest), then a folded section: every polity with its area.
 *   (The course's 随堂检测 lives in the lesson player, ui/lesson.ts.)
 * Hovering a polity holds its highlight on the map; clicking frames it.
 */
export class Period {
  readonly stats: HTMLElement;
  readonly line: HTMLElement;
  readonly key: HTMLElement;
  readonly view: HTMLElement;
  private body: HTMLElement;
  private overview: HTMLElement;
  private pols: HTMLDetailsElement;
  private polsSum: HTMLElement;
  private polsBody: HTMLElement;
  readonly btn: HTMLButtonElement;
  private sig = '';
  private year: Year = 0;
  compareYear: Year | null = null;
  onYear: (y: Year) => void = () => {};
  onCompare: (y: Year | null) => void = () => {};
  onSwapCompare: () => void = () => {};
  onHold: (polity: string | null) => void = () => {};
  onPolity: (polity: string) => void = () => {};
  onEra: (id: string) => void = () => {};
  /** the 时期详情 button and the ambient line: open / close the period popover */
  onDetails: () => void = () => {};

  constructor() {
    this.btn = iconBtn('list', t('details'), () => this.onDetails(), 'b-details');
    this.btn.setAttribute('aria-expanded', 'false');
    this.stats = h('div', { class: 'hud-stats' });
    this.line = h('button', { type: 'button', class: 'amb', onclick: () => this.onDetails() });
    this.key = h('div', { class: 'map-key' });
    this.overview = h('section', { class: 'pv-sec pv-ov' });
    // folded by default; the details elements persist across years, so an opened section stays open
    this.polsSum = h('summary', { class: 'pv-h' });
    this.polsBody = h('div', { class: 'pv-fb' });
    this.pols = h('details', { class: 'pv-sec pv-fold pv-pols' }, this.polsSum, this.polsBody);
    this.body = h('div', { class: 'view-body' }, this.overview, this.pols);
    this.view = h('div', { class: 'pop menu pv', hidden: true, role: 'dialog' }, this.body);
    this.relabel();
  }

  /** Docks a section (the chronicle) right after the overview. */
  mount(section: HTMLElement): void { this.body.insertBefore(section, this.pols); }

  /** Marks the 时期详情 button pressed while the popover is open. */
  pressed(on: boolean): void {
    this.btn.classList.toggle('on', on);
    this.btn.setAttribute('aria-expanded', String(on));
  }

  setCompare(y: Year | null): void {
    if (this.compareYear === y) return;
    this.compareYear = y;
    this.sig = '';
    this.setYear(this.year);
  }

  setYear(y: Year): void {
    this.year = y;
    const ph = phaseAt(y);
    const works = [...new Set(WORKS.filter(w => y >= w.span[0] && y <= w.span[1]).map(w => w.kind))];
    const sig = `${ph?.snap.id}|${ph?.snap.regions.length}|${this.compareYear ?? ''}|${works.join()}|${lang}`;
    if (sig === this.sig) return;
    this.sig = sig;
    this.renderStats(ph);
    this.renderKey(works);
    this.line.hidden = !ph;
    if (ph) this.line.textContent = tr(ph.snap.title, lang);
    this.overview.hidden = this.pols.hidden = !ph;
    if (!ph) return;
    this.renderOverview(ph);
    this.renderPolities(ph.snap);
  }

  // ------------------------------------------------------------ map overlay

  private renderStats(ph: Phase | null): void {
    if (!ph) { fill(this.stats); return; }
    const s = ph.snap, L = lang;
    const list = this.polities(s);
    const main = list.find(p => p.role === 'main') ?? list[0];
    const area = realmArea(s.id);
    const others: Pol[] = snapPolities(s.id).filter(([id]) => id !== main?.id && POLITY.has(id)).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([id, k]) => {
      const p = POLITY.get(id)!;
      return { id, color: list.find(x => x.id === id)?.color ?? p.color, role: p.role, name: tr(p.name, L), area: k };
    });
    const n = snapPolities(s.id).length;
    const [num, unit] = areaParts(area, L);
    const era = eraAt(s.year);
    const cmpPh = this.compareYear != null ? phaseAt(this.compareYear) : null;
    const cmpEra = cmpPh ? eraAt(cmpPh.snap.year) : undefined;
    fill(this.stats,
      area ? h('p', { class: 'st-k' }, h('i', { style: `--c:${main?.color ?? era?.color ?? '#888'}` }), h('span', { text: t('realmArea', { p: main?.name ?? (era ? tr(era.short, L) : '') }) })) : null,
      area ? h('p', { class: 'st-n' }, h('b', { text: num }), h('span', { text: unit })) : null,
      cmpPh ? h('p', { class: 'st-cmp', 'data-testid': 'hud-compare', text: t('cmpVs', { t: `${formatYear(cmpPh.snap.year, L, { short: true })} ${cmpEra ? tr(cmpEra.short, L) : stripTitleDate(tr(cmpPh.snap.title, L))}` }) }) : null,
      others.length ? h('ul', { class: 'st-pols' }, ...others.map(p => h('li', {}, this.polBtn(p, 'st-pol')))) : null,
      n > 1 ? h('p', { class: 'st-c', text: t('coexistN', { n }) }) : null);
  }

  private renderKey(works: string[]): void {
    const cmpPh = this.compareYear != null ? phaseAt(this.compareYear) : null;
    const cmpEra = cmpPh ? eraAt(cmpPh.snap.year) : undefined;
    const ghostLabel = cmpPh
      ? t('cmpBorder', { t: `${formatYear(cmpPh.snap.year, lang, { short: true })} ${cmpEra ? tr(cmpEra.short, lang) : ''}`.trim() })
      : t('roleGhost');
    fill(this.key,
      h('div', { class: 'mk-row' },
        h('span', { class: 'mk mk-border' }, h('i'), h('span', { text: t('keyBorder') })),
        h('span', { class: 'mk mk-ghost' }, h('i'), h('span', { text: ghostLabel })),
        h('span', { class: 'mk mk-cap' }, h('i'), h('span', { text: t('capitalNow') })),
        ...works.map(k => h('span', { class: `mk mk-line k-${k}`, style: `--c:${WORK_COLOR[k] ?? '#888'}` }, h('i'), h('span', { text: t(WORK_KEY[k] ?? 'works') })))));
  }

  // ------------------------------------------------------------ the 时期详情 popover

  private renderOverview(ph: Phase): void {
    const s = ph.snap, L = lang;
    const era = eraAt(s.year);
    const cap = era?.capital ? PLACE.get(era.capital) : undefined;
    const capName = cap ? mapName(cap, s.year) ?? cap.name : null;
    const area = realmArea(s.id);
    const n = ph.group.length;
    const pad = (i: number) => String(i).padStart(2, '0');
    const steps = n > 1 ? h('div', { class: 'pv-steps', role: 'tablist' }, ...ph.group.map((g, i) => h('button', {
      type: 'button', role: 'tab', class: g === s ? 'on' : '', 'aria-selected': String(g === s), title: tr(g.title, L),
      'aria-label': `${t('phase', { i: i + 1, n })} ${tr(g.title, L)}`, onclick: () => this.onYear(g.year),
    }))) : null;
    const fact = (k: string, v: Node | string | null) => (v ? h('div', {}, h('dt', { text: k }), typeof v === 'string' ? h('dd', { text: v }) : h('dd', {}, v)) : null);
    const src = snapshotSources(s);
    const worldList = worldForRange(ph.from, ph.to, 2);
    const prev = previousSnap(s);
    const cmpPh = this.compareYear != null ? phaseAt(this.compareYear) : null;
    const cmpSnap = cmpPh?.snap ?? null;
    const cmpSel = h('select', { class: 'pv-cmp-sel', 'data-testid': 'compare-select', 'aria-label': t('cmpTitle') },
      h('option', { value: '', text: t('cmpNone') }),
      prev ? h('option', { value: String(prev.year), text: t('cmpPrev', { t: `${formatYear(prev.year, L, { short: true })} · ${stripTitleDate(tr(prev.title, L))}` }) }) : null,
      ...SNAPSHOTS.filter(x => x.id !== s.id && x.id !== prev?.id).map(x => h('option', {
        value: String(x.year),
        text: `${formatYear(x.year, L, { short: true })} · ${stripTitleDate(tr(x.title, L))}`,
      })));
    cmpSel.value = cmpSnap ? String(cmpSnap.year) : '';
    cmpSel.addEventListener('change', () => {
      const val = cmpSel.value ? Number(cmpSel.value) : null;
      this.onCompare(val);
    });
    let cmpCard: HTMLElement | null = null;
    if (cmpSnap) {
      const eraB = eraAt(cmpSnap.year);
      const capB = eraB?.capital ? PLACE.get(eraB.capital) : undefined;
      const capNameB = capB ? mapName(capB, cmpSnap.year) ?? capB.name : null;
      const areaB = realmArea(cmpSnap.id);
      let deltaStr = '—';
      if (area && areaB) {
        const diff = area - areaB;
        const sign = diff > 0 ? '+' : diff < 0 ? '−' : '±';
        const pct = Math.round((Math.abs(diff) / areaB) * 100);
        deltaStr = `${sign}${areaShort(Math.abs(diff), L)} (${sign}${pct}%)`;
      }
      const labelA = `${formatYear(s.year, L, { short: true })} ${era ? tr(era.short, L) : stripTitleDate(tr(s.title, L))}`;
      const labelB = `${formatYear(cmpSnap.year, L, { short: true })} ${eraB ? tr(eraB.short, L) : stripTitleDate(tr(cmpSnap.title, L))}`;
      cmpCard = h('div', { class: 'pv-cmp-card', 'data-testid': 'compare-card' },
        h('div', { class: 'pv-cmp-cols' },
          h('div', { class: 'pv-cmp-col is-a' },
            h('span', { class: 'pv-cmp-tag', text: 'A' }),
            h('b', { text: labelA }),
            h('small', { text: `${t('capitalNow')}: ${capName ? tr(capName, L) : '—'} · ${area ? areaShort(area, L) : '—'}` })),
          h('div', { class: 'pv-cmp-col is-b' },
            h('span', { class: 'pv-cmp-tag', text: 'B' }),
            h('b', { text: labelB }),
            h('small', { text: `${t('capitalNow')}: ${capNameB ? tr(capNameB, L) : '—'} · ${areaB ? areaShort(areaB, L) : '—'}` }))),
        h('div', { class: 'pv-cmp-delta', 'data-testid': 'compare-delta' },
          h('span', { text: t('cmpDelta') }),
          h('b', { text: deltaStr })),
        h('p', { class: 'pv-cmp-sum', text: t('cmpSummary', { a: labelA, ca: capName ? tr(capName, L) : '—', b: labelB, cb: capNameB ? tr(capNameB, L) : '—', d: deltaStr }) }));
    }
    fill(this.overview,
      h('div', { class: 'pv-top' },
        h('span', { class: 'pv-span', text: `${formatYear(ph.from, L, { short: true })} – ${formatYear(ph.to, L, { short: true })}` }),
        n > 1 ? h('small', { class: 'pv-idx', text: `${pad(ph.index + 1)} / ${pad(n)}` }) : null),
      steps,
      // the span is shown above, so a title's own leading dates ("221–215 BCE · …") are dropped
      h('p', { class: 'pv-title', text: stripTitleDate(tr(s.title, L)) }),
      h('dl', { class: 'pv-facts' },
        fact(t('dynasty'), era ? h('button', { type: 'button', class: 'pv-era', style: `--c:${era.color}`, onclick: () => this.onEra(era.id) }, h('i'), h('span', { text: tr(era.short, L) })) : null),
        fact(t('capitalNow'), capName ? tr(capName, L) : null),
        fact(t('pArea'), area ? areaShort(area, L) : null)),
      s.note ? h('p', { class: 'pv-note', text: tr(s.note, L) }) : null,
      h('div', { class: 'pv-src', 'data-testid': 'period-sources', 'data-source-kind': src.kind },
        h('span', { class: 'pv-src-badge', text: tr(src.badge, L) }),
        h('p', { class: 'pv-src-text', text: tr(src.source, L) }),
        h('p', { class: 'pv-src-note', text: tr(src.uncertainty, L) })),
      worldList.length ? h('div', { class: 'pv-world', 'data-testid': 'period-world' },
        h('span', { class: 'pv-world-h', text: `🌍 ${t('worldSync')}` }),
        ...worldList.map(w => h('p', { class: 'pv-world-item' },
          h('b', { text: `${tr(w.region, L)} · ${tr(w.title, L)}` }),
          h('span', { text: ` — ${tr(w.summary, L)}` })))) : null,
      h('div', { class: 'pv-cmp', 'data-testid': 'period-compare' },
        h('div', { class: 'pv-cmp-bar' },
          cmpSel,
          cmpSnap ? h('button', { type: 'button', class: 'btn pv-cmp-btn', 'data-act': 'cmp-swap', text: t('cmpSwap'), onclick: () => this.onSwapCompare() }) : null,
          cmpSnap ? h('button', { type: 'button', class: 'btn ghost pv-cmp-btn', 'data-act': 'cmp-clear', text: t('cmpClear'), onclick: () => this.onCompare(null) }) : null),
        cmpCard));
  }

  private renderPolities(s: Snapshot): void {
    // the drawn polities first, then every other one the area table knows (the neighbours), largest first
    const list = this.polities(s).filter(p => p.id);
    const have = new Set(list.map(p => p.id));
    for (const [id, k] of snapPolities(s.id).slice().sort((a, b) => b[1] - a[1])) {
      const p = POLITY.get(id);
      if (p && !have.has(id)) list.push({ id, color: p.color, role: 'neighbor', name: tr(p.name, lang), area: k });
    }
    fill(this.polsSum, h('h3', { text: t('pPolities') }), h('small', { text: `${list.length} · ${t('pPolUnit')}` }));
    fill(this.polsBody, h('div', { class: 'pv-grid' }, ...list.map(p => this.polBtn(p, 'pv-pol'))));
  }

  private polBtn(p: Pol, cls: string): HTMLButtonElement {
    const b = h('button', { type: 'button', class: `${cls} r-${p.role}`, style: `--c:${p.color}`, 'data-polity': p.id, onclick: () => { if (p.id) this.onPolity(p.id); } },
      h('i'), h('span', { text: p.name }), p.area ? h('small', { text: formatArea(p.area, lang, true) }) : null);
    if (p.id) {
      b.addEventListener('pointerenter', () => this.onHold(p.id));
      b.addEventListener('pointerleave', () => this.onHold(null));
      b.addEventListener('focus', () => this.onHold(p.id));
      b.addEventListener('blur', () => this.onHold(null));
    }
    return b;
  }

  /** Distinct polities of a snapshot, most important first, with their areas (neighbours collapse into one entry). */
  private polities(s: Snapshot): Pol[] {
    const seen = new Map<string, Pol>();
    const named = new Map<string, number>();
    let neighbor: Pol | null = null;
    for (const r of s.regions) {
      const p = POLITY.get(r.polity);
      if (!p) continue;
      const role = r.role ?? p.role;
      if (role === 'neighbor') { neighbor ??= { id: '', color: '#9a9a8a', role, name: t('roleNeighbor'), area: 0 }; continue; }
      const key = p.id + (r.name ? tr(r.name, 'en') : '');
      named.set(p.id, (named.get(p.id) ?? 0) + (seen.has(key) ? 0 : 1));
      if (!seen.has(key)) seen.set(key, { id: p.id, color: r.color ?? p.color, role, name: tr(r.name ?? p.name, lang), area: 0 });
    }
    // areas only for polities drawn as one (not one split into named parts)
    for (const x of seen.values()) if (named.get(x.id) === 1) x.area = polityArea(s.id, x.id);
    const out = [...seen.values()].sort((a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role) || b.area - a.area).slice(0, 12);
    return neighbor ? [...out, neighbor] : out;
  }

  relabel(): void {
    this.view.setAttribute('aria-label', t('details'));
    this.btn.title = t('details'); this.btn.setAttribute('aria-label', t('details'));
    this.key.setAttribute('aria-label', t('legend'));
    this.line.title = t('details');
    this.sig = '';
    this.setYear(this.year);
  }
}
