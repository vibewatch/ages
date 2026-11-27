import type { OwnEra } from './types.ts';
import { BEISONG } from './beisong.ts';
import { DONGHAN } from './donghan.ts';
import { DONGJIN } from './dongjin.ts';
import { MING } from './ming.ts';
import { NANBEI } from './nanbei.ts';
import { NANSONG } from './nansong.ts';
import { ROC } from './roc.ts';
import { QIN } from './qin.ts';
import { QING } from './qing.ts';
import { SANGUO } from './sanguo.ts';
import { SUI } from './sui.ts';
import { TANG } from './tang.ts';
import { WUDAI } from './wudai.ts';
import { XIHAN } from './xihan.ts';
import { XIJIN } from './xijin.ts';
import { YUAN } from './yuan.ts';
import { ZHANGUO } from './zhanguo.ts';

/** Holdings in year order, one per year (a later statement for the same year wins). */
function tidy(era: OwnEra): OwnEra {
  for (const [id, h] of Object.entries(era.holds)) {
    const by = new Map<number, (typeof h)[number]>();
    for (const x of h) by.set(x[0], x);
    era.holds[id] = [...by.values()].sort((a, b) => a[0] - b[0]);
  }
  return era;
}

/** Every era with our own territory data, oldest first (see docs/data/territories.md). */
export const ERAS_OWN: OwnEra[] = [ZHANGUO, QIN, XIHAN, DONGHAN, SANGUO, XIJIN, DONGJIN, NANBEI, SUI, TANG, WUDAI, BEISONG, NANSONG, YUAN, MING, QING, ROC].map(tidy);
