/**
 * Commercial build (`npm run build:commercial`, VITE_COMMERCIAL=1). Some imported geometry is licensed for academic,
 * non-commercial use only (NOTICE.md): the prefecture-level boundaries (CHGIS V6, Hartwell) and the Warring States
 * territories. A commercial build leaves them out: no administrative layer, and our own schematic Warring States map.
 */
export const COMMERCIAL: boolean = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_COMMERCIAL === '1';

/** Imported dynasties whose territories are non-commercial (their snapshots are dropped). */
export const NONCOMMERCIAL_DYN: ReadonlySet<string> = new Set(['zhanguo']);
