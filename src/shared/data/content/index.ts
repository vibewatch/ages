import { LANDMARKS_EARLY, MILESTONES_EARLY } from './events-early.ts';
import { LANDMARKS_LATE, MILESTONES_LATE } from './events-late.ts';
import { LANDMARKS_MIDDLE, MILESTONES_MIDDLE } from './events-middle.ts';
import { PASSES } from './places-early.ts';
import { REGIONAL, REIGNS } from './reigns.ts';
import type { Content } from './types.ts';
import { DYNASTIES, MUSIC, RIVERS, WORKS } from './works.ts';

/** Our own content lists; each one present replaces the imported list of the same name (jiangshan.ts). */
// the reign readout is short: 'Emperor Taizong of Tang' → 'Emp. Taizong' (the era band already names the dynasty)
type Span = Content['reigns'][number];
const short = (s: Span): Span => [s[0], s[1], s[2], s[3], s[4].replace(/^Emperor (\S+) of .+$/, 'Emp. $1'), s[5]];

export const OWN_CONTENT: Partial<Content> = {
  reigns: REIGNS.map(short),
  regional: REGIONAL.map(r => ({ ...r, spans: r.spans.map(short) })),
  works: WORKS, rivers: RIVERS, dynasties: DYNASTIES, music: MUSIC,
  milestones: [...MILESTONES_EARLY, ...MILESTONES_MIDDLE, ...MILESTONES_LATE],
  landmarks: [...LANDMARKS_EARLY, ...LANDMARKS_MIDDLE, ...LANDMARKS_LATE],
  passes: PASSES,
};
