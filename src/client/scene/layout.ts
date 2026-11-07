export interface ScreenBox { left: number; top: number; right: number; bottom: number }
export interface LayoutItem {
  bounds: ScreenBox;
  prio: number;
  pinned?: boolean;
  /** The main territory name is essential map context, not optional object text. */
  primary?: boolean;
  owner?: string;
  model?: LayoutItem;
  /** A keyboard target for a model whose bounds already reserve the space. */
  passive?: boolean;
  shown?: boolean;
}

/** Models reserve space before optional text. A selected object reserves space before everything else. */
export function declutter(models: LayoutItem[], labels: LayoutItem[]): void {
  const placed: LayoutItem[] = [];
  const rank = (a: LayoutItem, b: LayoutItem) => Number(!!b.pinned) - Number(!!a.pinned) || b.prio - a.prio;
  const place = (item: LayoutItem) => {
    const a = item.bounds;
    const overlap = placed.some(other => {
      if (item.owner && item.owner === other.owner) return false;
      const b = other.bounds;
      return a.left < b.right + 4 && a.right > b.left - 4 && a.top < b.bottom + 4 && a.bottom > b.top - 4;
    });
    item.shown = !!item.pinned || !!item.passive || !overlap;
    if (item.shown && !item.passive) placed.push(item);
  };
  for (const item of [...models, ...labels]) item.shown = false;
  const placedSet = new Set<LayoutItem>();
  const placeOnce = (item: LayoutItem) => {
    if (placedSet.has(item)) return;
    placedSet.add(item);
    place(item);
  };
  const priorityLabels = labels.filter(l => l.pinned && !l.passive && (!l.model || l.model.pinned));
  for (const l of priorityLabels.sort(rank)) placeOnce(l);
  for (const m of models.filter(m => m.pinned).sort(rank)) placeOnce(m);
  for (const m of models.filter(m => !m.pinned && m.prio >= 90).sort(rank)) placeOnce(m);
  const primaryLabels = labels.filter(l => l.primary && !priorityLabels.includes(l));
  for (const l of primaryLabels.sort(rank)) placeOnce(l);
  for (const m of models.filter(m => !m.pinned && m.prio < 90).sort(rank)) placeOnce(m);
  for (const l of labels.slice().sort(rank)) {
    if (!l.model || l.model.shown) placeOnce(l);
  }
}
