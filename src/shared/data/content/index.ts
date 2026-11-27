import { REGIONAL, REIGNS } from './reigns.ts';
import type { Content } from './types.ts';

/** Our own content lists; each one present replaces the imported list of the same name (jiangshan.ts). */
// the reign readout is short: 'Emperor Taizong of Tang' → 'Emp. Taizong' (the era band already names the dynasty)
type Span = Content['reigns'][number];
const short = (s: Span): Span => [s[0], s[1], s[2], s[3], s[4].replace(/^Emperor (\S+) of .+$/, 'Emp. $1'), s[5]];

export const OWN_CONTENT: Partial<Content> = {
  reigns: REIGNS.map(short),
  regional: REGIONAL.map(r => ({ ...r, spans: r.spans.map(short) })),
};
