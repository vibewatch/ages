import type { Content } from './types.ts';

/** City lore for curated places the main list does not cover. */
export const CITIES_EXTRA: Content['cities'] = [
  {
    modern: { zh: '曲阜', en: 'Qufu' }, lon: 116.99, lat: 35.6,
    tag: { zh: '孔子故里 · 鲁国都城', en: 'Home of Confucius · capital of Lu' },
    desc: {
      zh: '周代鲁国的都城，孔子在这里出生、讲学并安葬。历代王朝在此修孔庙、封孔府，曲阜由此成为儒家文化的象征。',
      en: 'The capital of the Zhou state of Lu, where Confucius was born, taught and was buried. Dynasty after dynasty endowed his temple and family mansion here, making Qufu the symbol of the Confucian tradition.',
    },
  },
  {
    modern: { zh: '吐鲁番', en: 'Turpan' }, lon: 89.19, lat: 42.95,
    tag: { zh: '高昌故地 · 丝路绿洲', en: 'Old Gaochang · Silk Road oasis' },
    desc: {
      zh: '天山南麓的盆地绿洲，汉代车师、魏晋高昌都在这里。唐灭高昌后设西州，交河、高昌两座故城至今留存。',
      en: 'A basin oasis below the Tianshan, home to Jushi in the Han and to the kingdom of Gaochang. After the Tang conquered Gaochang it became Xi Prefecture; the ruined cities of Jiaohe and Gaochang still stand.',
    },
  },
  {
    modern: { zh: '长春', en: 'Changchun' }, lon: 125.32, lat: 43.82,
    tag: { zh: '近代新城 · 伪满“新京”', en: 'A modern city · Manchukuo’s “Xinjing”' },
    desc: {
      zh: '清末因放垦和中东铁路兴起的城市。九一八事变后日本扶植伪满洲国，以此为“新京”；抗战胜利后回到中国。',
      en: 'A city that grew with late-Qing settlement and the Chinese Eastern Railway. After the Mukden Incident Japan made it “Xinjing”, capital of its puppet Manchukuo; it returned to China after the war.',
    },
  },
  {
    modern: { zh: '大连', en: 'Dalian' }, lon: 121.61, lat: 38.91,
    tag: { zh: '辽东半岛 · 旅大租借地', en: 'Liaodong peninsula · the leased territory' },
    desc: {
      zh: '甲午战争后列强争夺辽东半岛，俄国强租旅顺、大连，日俄战争后又落入日本之手。1945年后回到中国，成为北方重要的港口城市。',
      en: 'After the Sino-Japanese War the powers fought over the Liaodong peninsula: Russia forced a lease on Lüshun and Dalian, which passed to Japan after the Russo-Japanese War. Back in Chinese hands from 1945, it became a major northern port.',
    },
  },
];
