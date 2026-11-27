import type { LonLat } from '../types.ts';
import type { Content } from './types.ts';

/**
 * Our own great works, river labels, dynasty records and guqin tracks (see docs/data/content.md). Every line is drawn
 * here through the towns, passes and river courses the work followed (modern sites, set by us).
 */

// ------------------------------------------------------------------ shared courses

/** 秦昭王长城: from 临洮 (岷县) north-east over the Loess hills to the Yellow River below 托克托. */
const QIN_ZHAOWANG: LonLat[] = [
  [104.05, 34.43], [104.15, 34.75], [104.25, 35.1], [104.6, 35.4], [105.0, 35.6], [105.45, 35.8], [105.8, 36.0],
  [106.2, 36.05], [106.6, 36.3], [107.0, 36.55], [107.35, 36.75], [107.8, 36.85], [108.2, 36.95], [108.6, 37.3],
  [108.9, 37.65], [109.3, 37.95], [109.7, 38.3], [110.1, 38.6], [110.5, 38.9], [110.85, 39.3], [111.15, 39.7],
];
/** 赵北长城 along the southern foot of the 阴山, from 高阙 (狼山口) east to above 张家口. */
const ZHAO_NORTH: LonLat[] = [
  [107.2, 41.15], [107.8, 41.05], [108.4, 40.95], [108.9, 40.85], [109.5, 40.8], [110.0, 40.8], [110.6, 40.85],
  [111.2, 40.95], [111.8, 41.0], [112.3, 40.95], [112.9, 40.95], [113.4, 40.9], [113.9, 40.85], [114.4, 40.75],
];
/** 燕北长城 from 造阳 over the 燕山 north slopes and the 辽西 hills to the 鸭绿江. */
const YAN_NORTH: LonLat[] = [
  [115.0, 41.05], [115.5, 41.35], [116.0, 41.6], [116.6, 41.65], [117.2, 41.8], [117.8, 42.0], [118.4, 42.15],
  [119.0, 42.2], [119.6, 42.3], [120.2, 42.45], [120.8, 42.5], [121.4, 42.35], [122.0, 42.2], [122.6, 42.15],
  [123.2, 42.1], [123.7, 41.85], [124.1, 41.45], [124.4, 41.0], [124.5, 40.55], [124.4, 40.15],
];
/** The Yellow River bank from 榆中 down through 宁夏 to 磴口 and the 狼山 (秦 河上塞). */
const HESHANG: LonLat[] = [
  [104.15, 35.95], [104.68, 36.57], [105.2, 37.5], [105.65, 37.75], [106.0, 38.0], [106.3, 38.5], [106.4, 39.0],
  [106.8, 39.65], [107.0, 40.3], [106.9, 40.9], [107.2, 41.15],
];
/** 邗沟: 淮安 (山阳) south through 宝应 and 高邮 to 扬州 and 瓜洲 on the Yangtze. */
const HANGOU: LonLat[] = [
  [119.15, 33.5], [119.25, 33.35], [119.31, 33.2], [119.4, 33.0], [119.45, 32.78], [119.45, 32.6], [119.42, 32.4],
  [119.4, 32.27],
];
/** 江南河: 京口 (镇江) through 常州, 无锡, 苏州 and 嘉兴 to 杭州. */
const JIANGNAN: LonLat[] = [
  [119.45, 32.2], [119.55, 32.05], [119.6, 31.98], [119.8, 31.85], [119.95, 31.78], [120.15, 31.65], [120.3, 31.57],
  [120.45, 31.42], [120.6, 31.3], [120.64, 31.16], [120.7, 30.95], [120.75, 30.75], [120.6, 30.62], [120.45, 30.5],
  [120.3, 30.4], [120.17, 30.3],
];
const DUNHUANG: LonLat = [94.66, 40.14];

export const WORKS: Content['works'] = [
  {
    id: 'wall_zhanguo', kind: 'wall', span: [-300, -215],
    name: { zh: '战国长城（秦·赵·燕北长城）', en: 'Warring States Walls (Qin, Zhao, Yan)' },
    summary: {
      zh: '秦、赵、燕三国为防北方游牧部族，各自在北境筑起长墙：秦昭王筑于陇西至黄河，赵武灵王筑于阴山之下，燕将秦开破东胡后筑于燕山以北至辽东。这些墙后来成为秦统一后连缀万里长城的基础。',
      en: 'Qin, Zhao and Yan each walled their northern frontier against the steppe peoples: Qin from Longxi to the Yellow River, Zhao under the Yin Mountains, and Yan beyond the Yan Mountains to Liaodong after it drove back the Donghu. After unification Qin joined these walls into one line.',
    },
    label: [113.2, 41.45],
    lines: [QIN_ZHAOWANG, ZHAO_NORTH, YAN_NORTH],
  },
  {
    id: 'wall_qin', kind: 'wall', span: [-214, -122],
    name: { zh: '秦长城', en: 'Qin Great Wall' },
    summary: {
      zh: '蒙恬北逐匈奴、收复河南地后，秦把三国旧墙连为一体，西起临洮，沿黄河与阴山向东，直抵辽东，号称万里。这是第一道横贯北方的长城，也耗尽了无数戍卒与民夫的力气。',
      en: 'After Meng Tian drove the Xiongnu out of the Ordos, Qin linked the old state walls into one line from Lintao along the Yellow River and the Yin Mountains to Liaodong, the first wall to span the whole north. Its building cost the lives and labour of countless conscripts.',
    },
    label: [112.6, 41.55],
    lines: [QIN_ZHAOWANG, HESHANG, [[106.7, 41.45], ...ZHAO_NORTH, ...YAN_NORTH]],
  },
  {
    id: 'wall_han', kind: 'wall', span: [-121, 220],
    name: { zh: '汉长城', en: 'Han Great Wall' },
    summary: {
      zh: '汉武帝反击匈奴之后，修缮秦代旧塞，又在阴山以北筑起外城（光禄塞），把防线推向大漠。汉长城与烽燧、亭障相连，是汉代北方屯戍体系的骨架。',
      en: 'After Emperor Wu turned the tide against the Xiongnu, Han repaired the Qin line and pushed outer walls (the Guanglu forts) north of the Yin Mountains towards the Gobi. With its beacon towers and garrison posts the wall was the backbone of Han frontier settlement.',
    },
    label: [109.3, 42.25],
    lines: [
      QIN_ZHAOWANG,
      [[106.7, 41.45], ...ZHAO_NORTH, ...YAN_NORTH],
      [[110.6, 41.1], [109.9, 41.5], [109.1, 41.75], [108.3, 41.95], [107.4, 42.1], [106.6, 42.2]],
      [[111.2, 41.4], [110.5, 41.95], [109.7, 42.35], [108.8, 42.6], [107.9, 42.75], [107.0, 42.85]],
    ],
  },
  {
    id: 'wall_han_hexi', kind: 'wall', span: [-111, 220],
    name: { zh: '汉长城（河西段）', en: 'Han Wall in the Hexi Corridor' },
    summary: {
      zh: '汉夺取河西走廊、设四郡之后，从令居向西筑塞，经武威、张掖、酒泉直到敦煌以西的玉门关，又沿弱水北上至居延。这道塞墙护住了通往西域的道路，敦煌、居延出土的汉简就来自沿线的烽燧。',
      en: 'Once Han had taken the Hexi Corridor and set up its four commanderies, it built a wall west from Lingju past Wuwei, Zhangye and Jiuquan to the Jade Gate beyond Dunhuang, with a branch north along the Ruo River to Juyan. It guarded the road to the Western Regions, and the Han wooden slips found at Dunhuang and Juyan come from its beacon towers.',
    },
    label: [97.5, 40.8],
    lines: [
      [
        [103.4, 36.6], [103.15, 36.95], [102.9, 37.4], [102.65, 37.85], [102.3, 38.05], [101.95, 38.25], [101.5, 38.5],
        [101.1, 38.75], [100.6, 38.95], [100.1, 39.2], [99.6, 39.4], [99.1, 39.6], [98.6, 39.85], [98.0, 40.1],
        [97.4, 40.25], [96.8, 40.35], [96.2, 40.5], [95.6, 40.55], [95.0, 40.45], [94.4, 40.4], [93.85, 40.35],
        [93.3, 40.4], [92.7, 40.45], [92.1, 40.4],
      ],
      [[98.9, 40.05], [99.3, 40.45], [99.7, 40.9], [100.1, 41.35], [100.5, 41.75], [100.9, 42.1], [101.1, 42.3]],
    ],
  },
  {
    id: 'wall_nanbei', kind: 'wall', span: [423, 577],
    name: { zh: '北魏·北齐长城', en: 'Northern Wei and Northern Qi Walls' },
    summary: {
      zh: '北魏为防柔然，于泰常八年（423年）筑长城，自赤城西至五原，与北边六镇相依。北齐为抵御突厥和北周，又从吕梁山北经雁门、居庸关一路修到渤海之滨，后世明长城的东段多沿其旧线。',
      en: 'Northern Wei built a wall in 423 from Chicheng west to Wuyuan against the Rouran, backed by its six frontier garrisons. Northern Qi, facing the Türks and Northern Zhou, walled the line from the Lüliang hills past Yanmen and Juyong Pass to the Bohai shore, a course the Ming wall later largely followed in the east.',
    },
    label: [113.0, 40.35],
    lines: [
      [
        [115.85, 40.95], [115.4, 41.05], [114.9, 41.15], [114.4, 41.15], [113.9, 41.05], [113.4, 41.0], [112.9, 40.95],
        [112.4, 40.9], [111.9, 40.95], [111.4, 40.95], [110.9, 40.85], [110.4, 40.8], [109.9, 40.85], [109.4, 40.95],
        [108.9, 41.05], [108.4, 41.1],
      ],
      [
        [110.85, 38.0], [111.2, 38.35], [111.55, 38.75], [111.9, 39.1], [112.3, 39.4], [112.75, 39.65], [113.2, 39.85],
        [113.7, 40.05], [114.2, 40.2], [114.7, 40.3], [115.2, 40.35], [115.7, 40.35], [116.05, 40.33], [116.5, 40.45],
        [117.0, 40.6], [117.4, 40.6], [117.9, 40.4], [118.4, 40.3], [118.9, 40.2], [119.4, 40.05], [119.75, 39.98],
      ],
    ],
  },
  {
    id: 'wall_jin', kind: 'wall', span: [1138, 1234],
    name: { zh: '金界壕', en: 'Jin Border Trenches' },
    summary: {
      zh: '金朝为防蒙古诸部，在大兴安岭以西的草原上掘壕筑墙，主线自嫩江畔西南行至阴山以北，绵延数千里，章宗时最为完备。它没有挡住蒙古铁骑，1211年成吉思汗越壕南下，金朝从此一败再败。',
      en: 'To hold off the Mongol tribes, Jin dug trenches and raised earth walls across the grasslands west of the Greater Khingan, the main line running south-west from the Nen River to north of the Yin Mountains; it was completed under Emperor Zhangzong. It did not stop the Mongols: Chinggis Khan crossed it in 1211, and Jin never recovered.',
    },
    label: [117.6, 45.25],
    lines: [
      [
        [124.5, 48.5], [124.0, 48.2], [123.4, 47.8], [122.9, 47.4], [122.5, 47.0], [122.0, 46.6], [121.5, 46.25],
        [121.0, 45.95], [120.4, 45.7], [119.8, 45.45], [119.2, 45.2], [118.6, 44.95], [118.0, 44.75], [117.4, 44.55],
        [116.8, 44.25], [116.2, 43.95], [115.6, 43.65], [115.0, 43.35], [114.4, 43.0], [113.8, 42.75], [113.1, 42.55],
        [112.4, 42.4], [111.7, 42.25], [111.0, 42.1], [110.4, 41.95], [109.9, 41.85],
      ],
      [[120.6, 50.6], [120.0, 50.1], [119.3, 49.8], [118.6, 49.6], [117.9, 49.5], [117.2, 49.25], [116.5, 48.95], [115.8, 48.65], [115.1, 48.3]],
    ],
  },
  {
    id: 'wall_ming', kind: 'wall', span: [1368, 9999],
    name: { zh: '明长城', en: 'Ming Great Wall' },
    summary: {
      zh: '明朝退守北方后，用两百多年把长城改筑成砖石边墙，西起嘉峪关，经河西、宁夏、榆林、大同、宣府，东到山海关入海，沿线分设九边重镇。今天人们登临的八达岭、慕田峪、金山岭，大多是明代所修。',
      en: 'Over two centuries Ming rebuilt the frontier as a wall of brick and stone from Jiayu Pass through Hexi, Ningxia, Yulin, Datong and Xuanfu to Shanhai Pass on the sea, guarded by nine border commands. Most of the wall visitors climb today, at Badaling, Mutianyu or Jinshanling, is Ming work.',
    },
    label: [110.0, 39.05],
    lines: [
      [
        [98.22, 39.8], [98.9, 39.7], [99.5, 39.45], [100.0, 39.2], [100.45, 38.98], [100.8, 38.85], [101.1, 38.8],
        [101.5, 38.55], [101.95, 38.3], [102.4, 38.1], [102.75, 37.95], [103.1, 37.6], [103.4, 37.3], [103.8, 37.15],
        [104.2, 37.2], [104.7, 37.35], [105.2, 37.5], [105.7, 37.8], [106.1, 38.05], [106.45, 38.3], [106.85, 38.05],
        [107.3, 37.85], [107.6, 37.6], [108.0, 37.55], [108.5, 37.6], [108.95, 37.75], [109.3, 37.95], [109.75, 38.3],
        [110.1, 38.55], [110.5, 38.85], [110.85, 38.95], [111.1, 39.1], [111.45, 39.4], [111.8, 39.55], [112.05, 39.9],
        [112.3, 40.2], [112.75, 40.3], [113.25, 40.38], [113.75, 40.45], [114.15, 40.55], [114.5, 40.75], [114.9, 40.85],
        [115.35, 41.0], [115.75, 41.25], [116.2, 41.0], [116.6, 40.75], [117.15, 40.68], [117.6, 40.5], [118.0, 40.4],
        [118.35, 40.4], [118.8, 40.25], [119.3, 40.1], [119.75, 39.99], [119.82, 39.96],
      ],
      [[105.25, 37.55], [105.55, 37.95], [105.8, 38.4], [106.0, 38.8], [106.25, 39.15]],
      [
        [111.45, 39.4], [111.9, 39.3], [112.3, 39.05], [112.88, 39.18], [113.3, 39.25], [113.9, 39.26], [114.4, 39.35],
        [114.9, 39.4], [115.17, 39.43], [115.5, 39.75], [115.85, 40.1], [116.07, 40.29], [116.0, 40.36], [116.3, 40.42],
        [116.55, 40.45], [116.85, 40.62], [117.15, 40.68],
      ],
    ],
  },
  {
    id: 'wall_ming_liaodong', kind: 'wall', span: [1442, 1644],
    name: { zh: '辽东边墙', en: 'Liaodong Border Wall' },
    summary: {
      zh: '明正统以后，为隔开兀良哈与女真诸部，自山海关向东北筑边墙，绕过辽河套，经开原、抚顺南下至鸭绿江边。它多为土墙与柳条篱，后来正是从这里，后金一步步打进了辽东。',
      en: 'From the 1440s Ming built a border wall north-east from Shanhai Pass, looping round the lower Liao valley and running past Kaiyuan and Fushun down to the Yalu, to keep the Uriankhai and the Jurchen tribes apart. Mostly rammed earth and palisade, it was the line the Later Jin broke through as it took Liaodong.',
    },
    label: [122.6, 42.4],
    lines: [[
      [119.75, 39.99], [120.1, 40.3], [120.4, 40.6], [120.7, 40.95], [121.0, 41.3], [121.5, 41.6], [122.0, 41.8],
      [122.2, 41.55], [122.4, 41.3], [122.6, 41.4], [122.8, 41.55], [123.0, 41.8], [123.2, 42.0], [123.5, 42.4],
      [123.8, 42.55], [124.05, 42.6], [124.3, 42.35], [124.3, 42.1], [124.1, 41.85], [124.2, 41.6], [124.3, 41.4],
      [124.55, 41.15], [124.8, 40.9], [124.7, 40.65], [124.6, 40.4], [124.35, 40.1],
    ]],
  },
  {
    id: 'zhidao', kind: 'road', span: [-212, 220],
    name: { zh: '秦直道', en: 'Qin Straight Road' },
    summary: {
      zh: '秦始皇命蒙恬修筑直道，从咸阳北面的甘泉宫出发，沿子午岭山脊北上，穿过鄂尔多斯高原直达九原郡，全长约七百公里。它让关中的军队能在数日之内抵达阴山前线，汉代仍在使用。',
      en: 'The First Emperor had Meng Tian build a road from the Ganquan palace north of Xianyang up the ridge of the Ziwu hills and across the Ordos to Jiuyuan, some 700 km. Troops from the Wei valley could reach the Yin Mountain front in days, and Han kept the road in use.',
    },
    label: [108.0, 37.2],
    lines: [[
      [108.55, 34.93], [108.6, 35.15], [108.62, 35.4], [108.66, 35.65], [108.7, 35.9], [108.65, 36.15], [108.55, 36.4],
      [108.45, 36.65], [108.4, 36.9], [108.45, 37.15], [108.6, 37.4], [108.8, 37.65], [109.0, 37.9], [109.2, 38.2],
      [109.35, 38.5], [109.5, 38.8], [109.65, 39.1], [109.8, 39.4], [109.9, 39.7], [109.95, 40.0], [109.9, 40.25],
      [109.8, 40.5],
    ]],
  },
  {
    id: 'chidao', kind: 'road', span: [-220, -202],
    name: { zh: '秦驰道', en: 'Qin Imperial Highways' },
    summary: {
      zh: '统一的第二年，秦以咸阳为中心修筑驰道，东出函谷关通往齐地海滨与燕地碣石，南出武关通往南阳和江陵。道宽五十步，两旁植树，始皇多次东巡就走在这些道路上。',
      en: 'A year after unification Qin began a network of highways radiating from Xianyang: east through Hangu Pass to the Qi coast and Jieshi in the old state of Yan, and south through Wu Pass to Nanyang and Jiangling. Fifty paces wide and lined with trees, they carried the First Emperor on his tours of the east.',
    },
    label: [113.4, 35.35],
    lines: [
      [
        [108.7, 34.33], [109.2, 34.4], [109.7, 34.5], [110.3, 34.55], [110.9, 34.62], [111.5, 34.7], [112.0, 34.7],
        [112.45, 34.68], [113.0, 34.78], [113.4, 34.82], [113.9, 34.8], [114.35, 34.8], [114.9, 34.9], [115.55, 35.07],
        [116.1, 35.4], [116.6, 35.6], [117.1, 36.0], [117.7, 36.4], [118.3, 36.85], [118.9, 37.1], [119.6, 37.3],
        [120.3, 37.5], [121.0, 37.55], [121.4, 37.55],
      ],
      [
        [113.4, 34.82], [113.9, 35.3], [114.3, 35.8], [114.45, 36.2], [114.5, 36.6], [114.6, 37.0], [114.65, 37.5],
        [114.6, 38.05], [115.0, 38.5], [115.4, 38.9], [115.9, 39.4], [116.35, 39.88], [116.9, 39.9], [117.6, 39.9],
        [118.4, 39.85], [119.15, 39.75],
      ],
      [
        [108.7, 34.33], [109.3, 34.2], [109.9, 34.0], [110.4, 33.75], [110.75, 33.55], [111.3, 33.3], [111.9, 33.05],
        [112.5, 33.0], [112.6, 32.5], [112.15, 32.05], [112.2, 31.5], [112.2, 30.9], [112.2, 30.35],
      ],
    ],
  },
  {
    id: 'silk_hexi', kind: 'road', span: [-121, 1400],
    name: { zh: '丝绸之路·河西道', en: 'Silk Road: Hexi Corridor' },
    summary: {
      zh: '从长安西行，越陇山经天水、兰州渡过黄河，再沿祁连山北麓的河西走廊穿过武威、张掖、酒泉抵达敦煌。张骞通西域后，这条走廊成了中原与西方往来的咽喉。',
      en: "From Chang'an the road crossed the Long hills to Tianshui and Lanzhou, forded the Yellow River, and ran along the foot of the Qilian Mountains through Wuwei, Zhangye and Jiuquan to Dunhuang. After Zhang Qian's missions this corridor was the throat of every exchange between China and the west.",
    },
    label: [103.0, 37.75],
    lines: [[
      [108.94, 34.26], [108.7, 34.33], [108.2, 34.4], [107.6, 34.5], [107.1, 34.7], [106.85, 34.9], [106.3, 34.75],
      [105.7, 34.58], [105.1, 34.8], [104.6, 35.0], [104.1, 35.4], [103.85, 35.75], [103.83, 36.06], [103.4, 36.55],
      [103.15, 36.95], [102.9, 37.4], [102.64, 37.93], [101.95, 38.25], [101.1, 38.78], [100.45, 38.93], [99.82, 39.38],
      [98.5, 39.73], [97.55, 39.95], [96.5, 40.3], [95.78, 40.52], [95.2, 40.3], DUNHUANG,
    ]],
  },
  {
    id: 'silk_north', kind: 'road', span: [-60, 1400],
    name: { zh: '丝绸之路·天山南路', en: 'Silk Road: South of the Tianshan' },
    summary: {
      zh: '出玉门关后，一路经楼兰、焉耆、龟兹、姑墨到疏勒，另一路经伊吾、高昌在焉耆会合，都沿天山南麓的绿洲西行。越过葱岭，商队便进入费尔干纳盆地，前往撒马尔罕。',
      en: 'Beyond the Jade Gate one branch went by Loulan, Yanqi, Kucha and Aksu to Kashgar, while another came by Hami and Gaochang to join it at Yanqi, both following the oases at the foot of the Tianshan. Over the Pamirs the caravans entered the Ferghana valley on the way to Samarkand.',
    },
    label: [84.5, 42.25],
    lines: [
      [
        DUNHUANG, [93.86, 40.35], [93.0, 40.45], [92.0, 40.5], [91.2, 40.55], [90.4, 40.55], [89.85, 40.5], [89.2, 40.85],
        [88.5, 41.25], [87.7, 41.6], [86.9, 41.85], [86.57, 42.06], [86.15, 41.73], [85.3, 41.75], [84.25, 41.78],
        [83.6, 41.75], [82.96, 41.72], [82.2, 41.6], [81.2, 41.4], [80.26, 41.17], [79.5, 40.6], [78.7, 40.1],
        [77.8, 39.8], [76.9, 39.6], [75.99, 39.47], [75.2, 39.6], [74.3, 39.75], [73.6, 39.95], [72.8, 40.53],
        [71.8, 40.6], [70.7, 40.4], [69.6, 40.28], [68.8, 40.0], [67.8, 39.75], [66.96, 39.65],
      ],
      [
        [95.78, 40.52], [95.3, 41.2], [94.6, 41.9], [93.5, 42.8], [92.5, 42.9], [91.5, 42.95], [90.5, 42.9],
        [89.55, 42.85], [89.06, 42.95], [88.3, 42.7], [87.6, 42.4], [86.57, 42.06],
      ],
    ],
  },
  {
    id: 'silk_south', kind: 'road', span: [-100, 1000],
    name: { zh: '丝绸之路·昆仑北路', en: 'Silk Road: North of the Kunlun' },
    summary: {
      zh: '出阳关后沿塔里木盆地南缘、昆仑山北麓西行，经鄯善、且末、精绝、于阗、莎车，再越葱岭穿过瓦罕走廊到达大夏。于阗的玉石和佛教经卷，都曾沿这条路东来。',
      en: 'From the Yang Pass the southern road skirted the Tarim basin under the Kunlun, through Shanshan, Qiemo, Niya, Khotan and Yarkand, then crossed the Pamirs and the Wakhan corridor into Bactria. Khotan jade and Buddhist scriptures both travelled east along it.',
    },
    label: [84.0, 37.35],
    lines: [[
      DUNHUANG, [94.07, 39.93], [93.2, 39.7], [92.2, 39.5], [91.2, 39.35], [90.2, 39.2], [89.2, 39.1], [88.17, 39.03],
      [87.2, 38.65], [86.3, 38.35], [85.53, 38.15], [84.5, 37.85], [83.6, 37.5], [82.7, 37.1], [81.7, 37.0],
      [80.8, 37.05], [79.92, 37.11], [79.1, 37.35], [78.28, 37.62], [77.7, 38.0], [77.24, 38.41], [76.4, 38.1],
      [75.6, 37.9], [75.23, 37.77], [74.6, 37.2], [73.6, 36.95], [72.5, 36.85], [71.5, 36.75], [70.4, 36.7],
      [69.0, 36.75], [67.9, 36.75], [66.9, 36.76],
    ]],
  },
  {
    id: 'lingqu', kind: 'canal', span: [-214, 9999],
    name: { zh: '灵渠', en: 'Lingqu Canal' },
    summary: {
      zh: '秦军南征百越时，史禄在兴安开凿灵渠，用分水的铧嘴把湘江水引入漓江，第一次以人工水道沟通长江与珠江两大水系。两千多年来它一直通航，至今仍在流淌。',
      en: 'During the Qin campaign against the Baiyue, Shi Lu cut the Lingqu at Xing\'an, splitting the Xiang with a stone prow and leading part of it into the Li: the first man-made link between the Yangtze and Pearl river systems. It carried boats for over two thousand years and still flows today.',
    },
    label: [110.75, 25.8],
    lines: [[
      [111.07, 25.93], [111.0, 25.85], [110.9, 25.76], [110.8, 25.67], [110.72, 25.62], [110.68, 25.615], [110.66, 25.61],
      [110.62, 25.59], [110.58, 25.565], [110.54, 25.54], [110.5, 25.515], [110.46, 25.49], [110.4, 25.4],
      [110.33, 25.32], [110.29, 25.27],
    ]],
  },
  {
    id: 'canal_tongji', kind: 'canal', span: [605, 1292],
    name: { zh: '隋唐大运河·通济渠', en: 'Grand Canal: Tongji Channel' },
    summary: {
      zh: '隋炀帝即位当年发百万民夫开通济渠，从洛阳西苑引谷、洛二水入黄河，再自板渚引河水经汴州、宋州东南流入淮河。唐宋时称汴河，江淮的粮食由此源源运往洛阳与开封。',
      en: 'In the first year of his reign Emperor Yang of Sui put a million labourers to cutting the Tongji Channel, from his Luoyang park to the Yellow River and then from Banzhu south-east past Bianzhou and Songzhou to the Huai. Known as the Bian River under Tang and Song, it carried the grain of the south to Luoyang and Kaifeng.',
    },
    label: [115.6, 34.1],
    lines: [[
      [112.45, 34.68], [112.75, 34.7], [113.0, 34.78], [113.2, 34.88], [113.42, 34.92], [113.7, 34.85], [114.0, 34.8],
      [114.35, 34.8], [114.75, 34.6], [115.1, 34.5], [115.65, 34.42], [116.05, 34.2], [116.45, 33.93], [116.75, 33.78],
      [116.98, 33.64], [117.4, 33.55], [117.88, 33.48], [118.25, 33.25], [118.53, 33.0],
    ]],
  },
  {
    id: 'canal_hangou', kind: 'canal', span: [605, 1292],
    name: { zh: '邗沟 · 江南河', en: 'Hangou and Jiangnan Canals' },
    summary: {
      zh: '邗沟本是春秋时吴王夫差所开，隋代拓宽后连接淮河与长江；江南河则从京口经苏州到余杭，610年开通。两段相接，大运河从此通到钱塘江畔。',
      en: 'The Hangou, first dug by King Fuchai of Wu, was widened under Sui to join the Huai and the Yangtze; the Jiangnan Canal from Jingkou past Suzhou to Yuhang opened in 610. Together they carried the Grand Canal all the way to the Qiantang.',
    },
    label: [119.95, 32.55],
    lines: [HANGOU, JIANGNAN],
  },
  {
    id: 'canal_yongji', kind: 'canal', span: [608, 1292],
    name: { zh: '隋唐大运河·永济渠', en: 'Grand Canal: Yongji Channel' },
    summary: {
      zh: '608年，隋炀帝引沁水南达黄河、北通涿郡，开成永济渠，沿途经卫州、魏州、德州、沧州。征高句丽的兵员与粮草由此北运，河北的物产也借它南下。',
      en: 'In 608 Emperor Yang opened the Yongji Channel, fed by the Qin River, running from the Yellow River north past modern Weihui, Daming, Dezhou and Cangzhou to Zhuojun. It carried troops and grain north for the Goguryeo wars and the produce of Hebei south.',
    },
    label: [115.25, 37.25],
    lines: [[
      [113.4, 35.05], [113.65, 35.2], [113.9, 35.3], [114.05, 35.42], [114.3, 35.55], [114.55, 35.67], [114.75, 35.95],
      [114.95, 36.3], [115.15, 36.5], [115.35, 36.65], [115.7, 36.85], [116.0, 37.15], [116.3, 37.45], [116.53, 37.88],
      [116.85, 38.3], [116.85, 38.6], [117.0, 38.9], [117.2, 39.12], [117.05, 39.4], [116.75, 39.6], [116.55, 39.75],
      [116.35, 39.88],
    ]],
  },
  {
    id: 'canal_jinghang', kind: 'canal', span: [1293, 9999],
    name: { zh: '京杭大运河', en: 'Beijing–Hangzhou Grand Canal' },
    summary: {
      zh: '元朝定都大都后，开济州河、会通河和通惠河，让运河不再绕道洛阳与开封，而是自杭州经苏州、扬州、淮安、济宁、临清、天津直抵大都积水潭。明清两代漕粮北运全靠这条水道，2014年它被列入世界遗产。',
      en: 'With its capital at Dadu, Yuan cut the Jizhou, Huitong and Tonghui channels so that the canal no longer looped through Luoyang and Kaifeng but ran straight from Hangzhou by Suzhou, Yangzhou, Huai\'an, Jining, Linqing and Tianjin to the Jishuitan in Dadu. Ming and Qing fed their capital with grain shipped along it; it became a World Heritage site in 2014.',
    },
    label: [117.4, 35.8],
    lines: [[
      [116.38, 39.94], [116.55, 39.92], [116.66, 39.9], [116.8, 39.65], [117.0, 39.4], [117.18, 39.14], [117.0, 38.85],
      [116.9, 38.6], [116.85, 38.3], [116.6, 38.05], [116.5, 37.85], [116.3, 37.45], [116.0, 37.15], [115.7, 36.85],
      [115.85, 36.6], [115.98, 36.45], [116.05, 36.15], [116.25, 35.95], [116.45, 35.65], [116.5, 35.55], [116.59, 35.41],
      [116.75, 35.15], [116.95, 34.85], [117.1, 34.55], [117.18, 34.27], [117.6, 34.25], [117.95, 34.35], [118.3, 33.95],
      [118.7, 33.7], ...HANGOU, ...JIANGNAN,
    ]],
  },
  {
    id: 'sea_silk', kind: 'sea', span: [618, 1433],
    name: { zh: '海上丝绸之路', en: 'Maritime Silk Road' },
    summary: {
      zh: '唐宋以后，海船从广州、泉州出发，经南海、过马六甲海峡，横越孟加拉湾到锡兰和印度西南海岸，再转往波斯湾；明州的船则东渡日本、高丽。丝绸、瓷器和茶叶从这里运出，香料、象牙和宝石从这里运进。',
      en: 'From Tang and Song times ships left Guangzhou and Quanzhou across the South China Sea, through the Strait of Malacca and over the Bay of Bengal to Sri Lanka and the Malabar coast, then on to the Persian Gulf, while ships from Mingzhou sailed east to Japan and Korea. Silk, porcelain and tea went out; spices, ivory and gems came in.',
    },
    label: [111.8, 17.2],
    lines: [
      [
        [113.26, 23.13], [113.55, 22.7], [113.8, 22.2], [113.2, 21.6], [112.0, 20.6], [111.6, 19.8], [111.2, 18.6],
        [110.6, 17.4], [109.8, 15.8], [109.5, 14.2], [109.1, 12.6], [108.2, 11.0], [107.0, 9.5], [105.8, 8.3],
        [104.8, 6.8], [104.4, 4.5], [104.2, 2.6], [104.0, 1.3], [103.4, 1.4], [102.6, 1.9], [102.25, 2.2], [101.3, 2.9],
        [100.4, 3.8], [99.3, 4.6], [98.3, 5.3], [97.2, 5.5], [96.0, 5.8], [94.0, 6.1], [91.5, 6.4], [88.5, 6.6],
        [85.0, 6.5], [82.0, 6.2], [80.2, 5.85], [78.8, 7.2], [77.55, 7.9], [76.9, 8.5], [76.5, 9.2], [76.2, 10.0],
        [75.9, 10.7], [75.7, 11.25],
      ],
      [[118.6, 24.9], [118.2, 24.2], [117.3, 23.5], [116.3, 22.8], [115.0, 22.3], [114.0, 22.0], [113.2, 21.6]],
      [[121.55, 29.87], [122.3, 30.0], [123.5, 30.6], [125.0, 31.3], [126.5, 32.0], [128.0, 32.8], [129.3, 33.3], [130.35, 33.6]],
    ],
  },
  {
    id: 'zhenghe', kind: 'sea', span: [1405, 1433],
    name: { zh: '郑和下西洋航线', en: "Zheng He's Voyages" },
    summary: {
      zh: '1405至1433年间，郑和率领的宝船船队七次从南京出发，由长江口南下，在福建长乐候风，经占城、满剌加、苏门答剌、锡兰抵达古里。船队还从古里远航至忽鲁谟斯、阿拉伯半岛和东非海岸，这里只画出到印度西南海岸为止的主航线。',
      en: "Between 1405 and 1433 Zheng He's treasure fleet sailed seven times from Nanjing, down the Yangtze and along the coast to Changle in Fujian to wait for the monsoon, then by Champa, Malacca, Samudra and Ceylon to Calicut. Squadrons went on to Hormuz, Arabia and East Africa; the line here shows the main route as far as the Malabar coast.",
    },
    label: [123.0, 28.0],
    lines: [[
      [118.78, 32.07], [119.45, 32.2], [120.3, 31.95], [120.9, 31.75], [121.15, 31.6], [122.2, 31.0], [122.6, 30.2],
      [122.4, 29.2], [121.9, 28.2], [121.2, 27.2], [120.4, 26.4], [119.7, 25.95], [119.2, 25.2], [118.4, 24.4],
      [117.4, 23.5], [116.2, 22.7], [114.8, 22.0], [113.2, 21.0], [111.8, 19.6], [110.9, 17.8], [110.0, 16.0],
      [109.35, 13.8], [109.0, 12.0], [107.8, 10.2], [106.4, 8.4], [105.2, 6.6], [104.4, 4.2], [104.1, 2.0], [103.6, 1.4],
      [102.25, 2.2], [101.2, 3.1], [100.2, 4.0], [99.0, 4.9], [97.7, 5.4], [97.15, 5.3], [95.6, 6.0], [93.0, 6.6],
      [90.0, 6.9], [86.5, 6.8], [83.0, 6.4], [80.3, 5.85], [79.75, 6.9], [78.6, 7.6], [77.55, 7.9], [76.8, 8.6],
      [76.3, 9.6], [75.9, 10.6], [75.7, 11.25],
    ]],
  },
];

// ------------------------------------------------------------------ rivers and lakes

/**
 * River and lake labels. Names that change with the period (河水 → 黄河, 彭蠡 → 鄱阳湖 …) are resolved by `riverName`
 * in places.ts, keyed by these Chinese names; `from` / `to` bound waters and courses that existed only for a time.
 * The first 黄河 entry must be the unbounded upstream one (its period names are tested).
 */
export const RIVERS: Content['rivers'] = [
  // great rivers
  { name: { zh: '黄河', en: 'Yellow R.' }, lon: 109.3, lat: 40.55, kind: 'trunk' },
  { name: { zh: '黄河', en: 'Yellow R.' }, lon: 110.45, lat: 36.8, kind: 'trunk' },
  { name: { zh: '长江', en: 'Yangtze R.' }, lon: 108.4, lat: 30.75, kind: 'trunk' },
  { name: { zh: '长江', en: 'Yangtze R.' }, lon: 117.0, lat: 30.48, kind: 'trunk' },
  { name: { zh: '淮水', en: 'Huai R.' }, lon: 116.6, lat: 32.5, kind: 'trunk' },
  { name: { zh: '珠江', en: 'Pearl R.' }, lon: 111.9, lat: 23.25, kind: 'trunk' },
  // the lower Yellow River and its shifting courses
  { name: { zh: '河水（禹贡故道）', en: 'He (Yu Gong course)' }, lon: 115.5, lat: 38.0, kind: 'river', to: -603 },
  { name: { zh: '河水（西汉故道）', en: 'He (Western Han course)' }, lon: 115.9, lat: 37.0, kind: 'river', from: -602, to: 10 },
  { name: { zh: '黄河（王景故道）', en: 'Yellow R. (Wang Jing course)' }, lon: 116.6, lat: 37.2, kind: 'river', from: 11, to: 1047 },
  { name: { zh: '黄河（北宋北流）', en: 'Yellow R. (Song northern course)' }, lon: 116.0, lat: 38.1, kind: 'river', from: 1048, to: 1193 },
  { name: { zh: '黄河（夺淮故道）', en: 'Yellow R. (Huai course)' }, lon: 117.7, lat: 34.15, kind: 'river', from: 1194, to: 1854 },
  { name: { zh: '黄河', en: 'Yellow R.' }, lon: 116.25, lat: 36.3, kind: 'trunk', from: 1855 },
  { name: { zh: '济水', en: 'Ji R.' }, lon: 117.2, lat: 36.75, kind: 'river', to: 1047 },
  { name: { zh: '大清河', en: 'Daqing R.' }, lon: 117.7, lat: 37.0, kind: 'river', from: 1048, to: 1854 },
  // rivers
  { name: { zh: '渭水', en: 'Wei R.' }, lon: 108.1, lat: 34.3, kind: 'river' },
  { name: { zh: '汉水', en: 'Han R.' }, lon: 110.8, lat: 32.8, kind: 'river' },
  { name: { zh: '汾水', en: 'Fen R.' }, lon: 111.65, lat: 36.4, kind: 'river' },
  { name: { zh: '湘水', en: 'Xiang R.' }, lon: 112.75, lat: 27.3, kind: 'river' },
  { name: { zh: '赣江', en: 'Gan R.' }, lon: 115.0, lat: 27.3, kind: 'river' },
  { name: { zh: '沅水', en: 'Yuan R.' }, lon: 110.4, lat: 28.45, kind: 'river' },
  { name: { zh: '嘉陵江', en: 'Jialing R.' }, lon: 106.1, lat: 30.8, kind: 'river' },
  { name: { zh: '岷江', en: 'Min R.' }, lon: 103.85, lat: 30.1, kind: 'river' },
  { name: { zh: '辽河', en: 'Liao R.' }, lon: 122.5, lat: 41.7, kind: 'river' },
  { name: { zh: '松花江', en: 'Songhua R.' }, lon: 126.9, lat: 45.9, kind: 'river' },
  { name: { zh: '黑龙江', en: 'Amur R.' }, lon: 129.3, lat: 49.4, kind: 'river' },
  { name: { zh: '塔里木河', en: 'Tarim R.' }, lon: 84.0, lat: 41.05, kind: 'river' },
  { name: { zh: '伊犁河', en: 'Ili R.' }, lon: 81.6, lat: 43.85, kind: 'river' },
  { name: { zh: '弱水', en: 'Ruo R.' }, lon: 100.1, lat: 41.0, kind: 'river' },
  { name: { zh: '雅鲁藏布江', en: 'Yarlung Tsangpo' }, lon: 90.75, lat: 29.35, kind: 'river' },
  // lakes and marshes
  { name: { zh: '洞庭', en: 'Dongting L.' }, lon: 112.9, lat: 29.3, kind: 'lake' },
  { name: { zh: '彭蠡·鄱阳', en: 'Poyang L.' }, lon: 116.3, lat: 29.1, kind: 'lake' },
  { name: { zh: '太湖', en: 'Tai L.' }, lon: 120.2, lat: 31.2, kind: 'lake' },
  { name: { zh: '巢湖', en: 'Chao L.' }, lon: 117.5, lat: 31.57, kind: 'lake' },
  { name: { zh: '云梦泽', en: 'Yunmeng Marshes' }, lon: 113.1, lat: 30.4, kind: 'lake', to: 600 },
  { name: { zh: '巨野泽', en: 'Juye Marsh' }, lon: 115.95, lat: 35.45, kind: 'lake', to: 899 },
  { name: { zh: '梁山泊', en: 'Liangshan Marsh' }, lon: 116.1, lat: 35.8, kind: 'lake', from: 900, to: 1279 },
  { name: { zh: '洪泽', en: 'Hongze L.' }, lon: 118.75, lat: 33.3, kind: 'lake', from: 1194 },
  { name: { zh: '青海', en: 'Qinghai L.' }, lon: 100.2, lat: 36.9, kind: 'lake' },
  { name: { zh: '滇池', en: 'Dian L.' }, lon: 102.7, lat: 24.85, kind: 'lake' },
  { name: { zh: '居延泽', en: 'Juyan L.' }, lon: 101.2, lat: 42.25, kind: 'lake', to: 1961 },
  { name: { zh: '蒲昌海·罗布泊', en: 'Lop Nur' }, lon: 90.3, lat: 40.3, kind: 'lake', to: 1972 },
  { name: { zh: '博斯腾湖', en: 'Bosten L.' }, lon: 87.0, lat: 42.0, kind: 'lake' },
  { name: { zh: '热海（伊塞克）', en: 'Issyk-Kul' }, lon: 77.3, lat: 42.45, kind: 'lake' },
  { name: { zh: '夷播海（巴尔喀什）', en: 'L. Balkhash' }, lon: 75.5, lat: 46.6, kind: 'lake' },
  { name: { zh: '斋桑泊', en: 'L. Zaysan' }, lon: 84.0, lat: 48.0, kind: 'lake' },
  { name: { zh: '北海（贝加尔）', en: 'L. Baikal' }, lon: 108.0, lat: 53.5, kind: 'lake' },
];

// ------------------------------------------------------------------ dynasties

export const DYNASTIES: Content['dynasties'] = [
  {
    id: 'zhanguo', name: { zh: '战国', en: 'Warring States' }, short: { zh: '战国', en: 'Warring States' }, start: -403, end: -221, color: '#7c5338',
    seat: { zh: '七国各有都城：秦咸阳、齐临淄、楚郢、魏大梁、赵邯郸、韩新郑、燕蓟', en: 'Seven capitals: Xianyang (Qin), Linzi (Qi), Ying (Chu), Daliang (Wei), Handan (Zhao), Xinzheng (Han), Ji (Yan)' },
    summary: {
      zh: '韩、赵、魏三家分晋得到周王承认，七个大国从此并立相争。各国竞相变法，商鞅在秦推行的改革最为彻底，郡县、户籍与军功爵制由此成形。铁器与牛耕普及，诸子百家著书立说，思想空前活跃。经过两百年兼并，秦最终一统天下。',
      en: 'When the Zhou king recognised the partition of Jin by Han, Zhao and Wei, seven great states were left to fight it out. Each reformed to survive, and Shang Yang\'s reforms in Qin went furthest, laying down counties, household registers and ranks earned in war. Iron tools and ox ploughs spread while the Hundred Schools argued over how to rule. After two centuries of conquest Qin absorbed them all.',
    },
  },
  {
    id: 'qin', name: { zh: '秦', en: 'Qin' }, short: { zh: '秦', en: 'Qin' }, start: -221, end: -202, color: '#5a554f',
    seat: { zh: '咸阳', en: 'Xianyang' },
    summary: {
      zh: '秦王嬴政灭六国，自称始皇帝，建立第一个统一的中央集权王朝。全国推行郡县制，统一文字、度量衡和车轨，北筑长城、南定百越。但徭役与刑罚过重，始皇死后不久，陈胜、吴广起事，秦在十余年间便土崩瓦解。',
      en: 'Ying Zheng of Qin conquered the six other states, took the title First Emperor, and founded the first unified, centrally ruled empire. He imposed commanderies and counties everywhere, standardised the script, weights, measures and axle widths, walled the north and conquered the Baiyue in the south. Labour levies and harsh law bred revolt, and within a few years of his death the risings of Chen Sheng and Wu Guang brought the dynasty down.',
    },
  },
  {
    id: 'xihan', name: { zh: '西汉', en: 'Western Han' }, short: { zh: '西汉', en: 'W. Han' }, start: -202, end: 25, color: '#b5452f',
    seat: { zh: '长安', en: "Chang'an" },
    summary: {
      zh: '刘邦在楚汉之争中胜出，建都长安，初期与民休息，文景之治积累了国力。汉武帝独尊儒术，北击匈奴，派张骞通西域，把疆域推向河西与岭南。西汉后期外戚专权，王莽篡位建立新朝。',
      en: "Liu Bang won the struggle with Xiang Yu and ruled from Chang'an, letting the land recover; the reigns of Wen and Jing built up the state's strength. Emperor Wu made Confucian learning official, struck back at the Xiongnu, sent Zhang Qian to the Western Regions, and extended the empire into Hexi and the far south. Late in the dynasty the empresses' kin took power, and Wang Mang seized the throne to found his Xin dynasty.",
    },
  },
  {
    id: 'donghan', name: { zh: '东汉', en: 'Eastern Han' }, short: { zh: '东汉', en: 'E. Han' }, start: 25, end: 220, color: '#a4432c',
    seat: { zh: '洛阳（末年迁许）', en: 'Luoyang (Xu at the end)' },
    summary: {
      zh: '刘秀平定新莽末年的大乱，重建汉朝，定都洛阳。班超经营西域，蔡伦改进造纸术，张衡制作地动仪，佛教也在此时传入。中后期外戚与宦官交替专权，黄巾起义后州牧割据，汉室名存实亡，220年曹丕代汉。',
      en: 'Liu Xiu ended the chaos after Wang Mang and restored the Han, with Luoyang as capital. Ban Chao held the Western Regions, Cai Lun improved papermaking, Zhang Heng built his seismoscope, and Buddhism reached China. Later the empresses\' kin and the eunuchs took turns in power; after the Yellow Turban rising the provinces fell to warlords, and in 220 Cao Pi ended the dynasty in name as well.',
    },
  },
  {
    id: 'sanguo', name: { zh: '三国', en: 'Three Kingdoms' }, short: { zh: '三国', en: '3K' }, start: 220, end: 280, color: '#4a6fa5',
    seat: { zh: '魏洛阳、蜀汉成都、吴建业', en: 'Wei at Luoyang, Shu Han at Chengdu, Wu at Jianye' },
    summary: {
      zh: '赤壁之战后，曹魏、蜀汉、孙吴三分天下。魏据中原，实力最强；蜀汉在诸葛亮治下经营西南并屡次北伐；吴开发江南，船队远航夷洲。263年魏灭蜀，司马炎代魏建晋，280年晋灭吴，重归统一。',
      en: 'After the battle of Red Cliffs the realm split three ways between Cao Wei, Shu Han and Sun Wu. Wei held the central plain and was strongest; Shu under Zhuge Liang developed the south-west and marched north again and again; Wu opened up the lower Yangtze and sent fleets as far as Taiwan. Wei took Shu in 263, Sima Yan replaced Wei with Jin, and Jin conquered Wu in 280.',
    },
  },
  {
    id: 'xijin', name: { zh: '西晋', en: 'Western Jin' }, short: { zh: '西晋', en: 'W. Jin' }, start: 280, end: 316, color: '#a0683f',
    seat: { zh: '洛阳（末年长安）', en: "Luoyang (Chang'an at the end)" },
    summary: {
      zh: '晋武帝统一全国，但分封宗室诸王、手握重兵，统治集团又崇尚奢靡。武帝死后爆发八王之乱，内迁各族乘机起兵。311年洛阳陷落，316年长安失守，西晋灭亡，北方陷入长期分裂。',
      en: 'Emperor Wu of Jin reunited the country but gave his kinsmen princedoms with their own armies, and the court was famous for its luxury. After his death the War of the Eight Princes broke out and the peoples settled inside the frontier rose in arms. Luoyang fell in 311 and Chang\'an in 316, ending the Western Jin and leaving the north divided for generations.',
    },
  },
  {
    id: 'dongjin', name: { zh: '东晋十六国', en: 'Eastern Jin & Sixteen Kingdoms' }, short: { zh: '东晋', en: 'E. Jin' }, start: 317, end: 420, color: '#4f8a78',
    seat: { zh: '东晋建康；北方诸国各有都城', en: 'Eastern Jin at Jiankang; the northern kingdoms each their own' },
    summary: {
      zh: '司马睿在建康重建晋室，北方士民大批南迁，江南得到进一步开发。北方先后出现匈奴、羯、鲜卑、氐、羌及汉人建立的十几个政权，前秦一度统一北方。383年淝水之战前秦大败，南北对峙的格局延续下来，420年刘裕代晋。',
      en: 'Sima Rui re-founded the Jin at Jiankang, and northern families fled south in great numbers, speeding the development of the south. In the north more than a dozen states rose and fell under Xiongnu, Jie, Xianbei, Di, Qiang and Han rulers, and Former Qin briefly united them. Its defeat at the Fei River in 383 fixed the north–south divide, and in 420 Liu Yu replaced the Jin.',
    },
  },
  {
    id: 'nanbei', name: { zh: '南北朝', en: 'Northern & Southern Dynasties' }, short: { zh: '南北朝', en: 'N & S' }, start: 420, end: 581, color: '#6b5b95',
    seat: { zh: '南朝建康；北魏平城、洛阳，后为邺与长安', en: 'Southern dynasties at Jiankang; Northern Wei at Pingcheng then Luoyang, later Ye and Chang\'an' },
    summary: {
      zh: '南方宋、齐、梁、陈相继，都城建康文风鼎盛；北方由北魏统一，孝文帝迁都洛阳、推行汉化改革。北魏后来分裂为东魏、西魏，又分别为北齐、北周所代。云冈、龙门石窟开凿于此时，北周灭北齐后，杨坚以隋代周。',
      en: 'In the south Song, Qi, Liang and Chen followed one another at Jiankang, a centre of letters; in the north Northern Wei unified the land and Emperor Xiaowen moved the capital to Luoyang and adopted Han ways. Wei later split into Eastern and Western Wei, replaced by Northern Qi and Northern Zhou. The Yungang and Longmen caves were carved in these years; Zhou conquered Qi, and Yang Jian then replaced Zhou with Sui.',
    },
  },
  {
    id: 'sui', name: { zh: '隋', en: 'Sui' }, short: { zh: '隋', en: 'Sui' }, start: 581, end: 618, color: '#8a6d3b',
    seat: { zh: '大兴城（长安），东都洛阳', en: "Daxing (Chang'an), with Luoyang as eastern capital" },
    summary: {
      zh: '隋文帝建立隋朝，589年灭陈，结束了近三百年的分裂。隋朝创立三省六部制和科举，修建大兴城，隋炀帝又开凿大运河、营建东都。三征高句丽和繁重徭役激起天下反抗，隋朝只传两代便亡。',
      en: 'Emperor Wen founded the Sui and conquered Chen in 589, ending almost three centuries of division. Sui created the Three Departments and Six Ministries and the civil examinations and built the new capital Daxing; Emperor Yang dug the Grand Canal and built Luoyang anew. Three wars against Goguryeo and crushing labour levies set the country ablaze, and the dynasty fell in its second reign.',
    },
  },
  {
    id: 'tang', name: { zh: '唐', en: 'Tang' }, short: { zh: '唐', en: 'Tang' }, start: 618, end: 907, color: '#c6952b',
    seat: { zh: '长安，东都洛阳', en: "Chang'an, with Luoyang as eastern capital" },
    summary: {
      zh: '李渊、李世民父子建立唐朝，贞观与开元年间政治清明、国力强盛，疆域西达葱岭以西。长安是当时世界上最大的城市，各国使节、商人与僧侣云集，诗歌、书法与佛教艺术达到高峰。755年安史之乱后藩镇割据、宦官擅权，907年唐为后梁所代。',
      en: "Li Yuan and his son Li Shimin founded the Tang, and under the Zhenguan and Kaiyuan reigns it was well governed and powerful, reaching beyond the Pamirs. Chang'an, the largest city in the world, drew envoys, merchants and monks from everywhere, and poetry, calligraphy and Buddhist art reached their height. After the An Lushan rebellion of 755 regional governors and palace eunuchs held the real power, and in 907 the Later Liang ended the dynasty.",
    },
  },
  {
    id: 'wudai', name: { zh: '五代十国', en: 'Five Dynasties & Ten Kingdoms' }, short: { zh: '五代', en: '5D10K' }, start: 907, end: 960, color: '#a8763a',
    seat: { zh: '中原五代多都开封（后唐都洛阳）；十国各有都城', en: 'The five northern dynasties mostly at Kaifeng (Later Tang at Luoyang); the ten kingdoms each their own' },
    summary: {
      zh: '唐亡后，中原在半个世纪里换了梁、唐、晋、汉、周五个朝代，南方和河东先后出现十个割据政权。后晋石敬瑭把燕云十六州割给契丹，北方门户从此洞开。南方诸国相对安定，经济继续发展，后周世宗的改革为统一打下了基础。',
      en: 'After the Tang the north went through five dynasties in half a century, Liang, Tang, Jin, Han and Zhou, while ten regional kingdoms held the south and Hedong. Shi Jingtang of Later Jin handed the Sixteen Prefectures of Yan and Yun to the Khitan, leaving the north open to attack. The southern kingdoms were steadier and their economies kept growing, and the reforms of Emperor Shizong of Later Zhou prepared the way for reunification.',
    },
  },
  {
    id: 'beisong', name: { zh: '北宋', en: 'Northern Song' }, short: { zh: '北宋', en: 'N. Song' }, start: 960, end: 1127, color: '#5f8a4e',
    seat: { zh: '东京开封府', en: 'Kaifeng (Dongjing)' },
    summary: {
      zh: '赵匡胤陈桥兵变建立宋朝，收回藩镇兵权，以文臣治国。宋与辽订立澶渊之盟，与西夏也时战时和，以岁币换取边境安宁。开封商业繁荣，活字印刷、火药和指南针得到广泛应用，王安石变法试图扭转积贫积弱。1127年金兵攻破开封，北宋灭亡。',
      en: 'Zhao Kuangyin took power in the Chenqiao mutiny, stripped the generals of their armies and governed through civil officials. Song made the Chanyuan peace with Liao and alternated war and truce with Western Xia, paying yearly sums for quiet borders. Kaifeng thrived on trade, movable type, gunpowder and the compass came into wide use, and Wang Anshi\'s reforms tried to cure the state\'s weakness. In 1127 Jin armies took Kaifeng and the Northern Song fell.',
    },
  },
  {
    id: 'nansong', name: { zh: '南宋', en: 'Southern Song' }, short: { zh: '南宋', en: 'S. Song' }, start: 1127, end: 1279, color: '#3f8f6a',
    seat: { zh: '临安（杭州）', en: "Lin'an (Hangzhou)" },
    summary: {
      zh: '宋高宗在江南重建宋朝，定都临安，岳飞等将领抗金，最终以淮河—大散关一线与金对峙。经济重心完成南移，海外贸易兴盛，泉州成为大港，朱熹集理学之大成。蒙古灭金后南下，1279年崖山之战后南宋灭亡。',
      en: "Emperor Gaozong rebuilt the Song south of the Yangtze with its capital at Lin'an; generals such as Yue Fei fought Jin, and the border settled on the Huai River and Dasan Pass. The economic heart of China moved south for good, overseas trade boomed through great ports like Quanzhou, and Zhu Xi gave Neo-Confucianism its classic form. After the Mongols destroyed Jin they turned south, and the Southern Song ended at the sea battle of Yamen in 1279.",
    },
  },
  {
    id: 'yuan', name: { zh: '元', en: 'Yuan' }, short: { zh: '元', en: 'Yuan' }, start: 1279, end: 1368, color: '#4b6587',
    seat: { zh: '大都（北京），夏季驻上都', en: 'Dadu (Beijing), with Shangdu as summer capital' },
    summary: {
      zh: '忽必烈定国号为元，灭南宋后统一全国，疆域北越大漠、西南包括吐蕃。元朝设行省制度，在澎湖设巡检司，开通京杭运河与海运，东西方往来频繁，马可·波罗等人留下了游记。元末政治腐败、黄河泛滥，红巾军起义后被明朝取代。',
      en: 'Khubilai named his dynasty Yuan and, after conquering the Southern Song, ruled a realm reaching beyond the Gobi and taking in Tibet. Yuan created the provincial system, posted officials on Penghu, and opened the Beijing–Hangzhou canal and sea transport, while travellers such as Marco Polo carried word between east and west. Misrule and Yellow River floods led to the Red Turban risings, and the Ming replaced it.',
    },
  },
  {
    id: 'ming', name: { zh: '明', en: 'Ming' }, short: { zh: '明', en: 'Ming' }, start: 1368, end: 1644, color: '#b23a3a',
    seat: { zh: '南京，1421年迁都北京', en: 'Nanjing, then Beijing from 1421' },
    summary: {
      zh: '朱元璋建立明朝，废丞相、强化皇权；明成祖迁都北京，派郑和七下西洋。明朝重修长城，戚继光等抗击倭寇，郑和航海之后海禁时紧时松。后期商品经济活跃，但党争与宦官之祸不断，1644年李自成攻入北京，崇祯帝自尽。',
      en: 'Zhu Yuanzhang founded the Ming, abolished the chancellorship and concentrated power in the throne; the Yongle Emperor moved the capital to Beijing and sent Zheng He on seven voyages. Ming rebuilt the Great Wall, and generals such as Qi Jiguang fought the coastal raiders while maritime bans tightened and loosened. Late Ming commerce flourished amid factional strife and eunuch power, until Li Zicheng took Beijing in 1644 and the Chongzhen Emperor hanged himself.',
    },
  },
  {
    id: 'qing', name: { zh: '清', en: 'Qing' }, short: { zh: '清', en: 'Qing' }, start: 1644, end: 1912, color: '#d4a017',
    seat: { zh: '北京（入关前为盛京）', en: 'Beijing (Shengjing before 1644)' },
    summary: {
      zh: '清军入关后定都北京，康熙、雍正、乾隆三朝收复台湾、平定准噶尔，奠定了近代中国的疆域。人口激增，但闭关自守使中国落后于工业化的西方。鸦片战争以后，列强侵略与太平天国等内乱接踵而来，洋务运动和戊戌变法未能挽回颓势，1912年清帝退位。',
      en: 'The Qing took Beijing in 1644, and under Kangxi, Yongzheng and Qianlong it took Taiwan and crushed the Dzungars, setting the borders of modern China. The population soared, but a closed door left the country behind an industrialising West. From the Opium War foreign aggression and risings such as the Taiping came one after another; neither the Self-Strengthening Movement nor the Hundred Days\' Reform turned the tide, and the last emperor abdicated in 1912.',
    },
  },
  {
    id: 'roc', name: { zh: '中华民国', en: 'Republic of China' }, short: { zh: '民国', en: 'ROC' }, start: 1912, end: 1949, color: '#4f6d8f',
    seat: { zh: '南京（1912–1928年北京为北洋政府驻地，抗战时重庆为陪都）', en: 'Nanjing (Beijing under the Beiyang government 1912–1928; Chongqing in wartime)' },
    summary: {
      zh: '辛亥革命推翻帝制，中华民国成立，但很快陷入袁世凯称帝和军阀混战。五四运动之后，中国共产党成立，国共合作北伐，1928年国民政府形式上统一全国。日本全面侵华后全民族抗战，1945年取得胜利，随后国共内战爆发。',
      en: 'The 1911 Revolution ended the empire and founded the Republic, which soon fell into Yuan Shikai\'s attempt at monarchy and the wars of the warlords. After the May Fourth Movement the Communist Party was founded, the Nationalists and Communists marched north together, and in 1928 the Nationalist government nominally united the country. Japan\'s full-scale invasion brought the War of Resistance, won in 1945, and then civil war.',
    },
  },
  {
    id: 'prc', name: { zh: '中华人民共和国', en: "People's Republic of China" }, short: { zh: '现代', en: 'PRC' }, start: 1949, end: 2027, color: '#c8322b',
    seat: { zh: '北京', en: 'Beijing' },
    summary: {
      zh: '1949年10月1日中华人民共和国成立，定都北京。经过土地改革和社会主义改造，国家开始大规模工业化建设，其间也经历了严重曲折。1978年起实行改革开放，经济高速增长，香港、澳门相继回归。',
      en: "The People's Republic was proclaimed on 1 October 1949 with Beijing as its capital. Land reform and socialist transformation were followed by large-scale industrialisation, along with grave setbacks. From 1978 reform and opening brought rapid growth, and Hong Kong and Macao returned to China.",
    },
  },
];

// ------------------------------------------------------------------ music

/** Guqin recordings hosted on Wikimedia Commons (public, attributable files). */
export const MUSIC: Content['music'] = [
  {
    name: { zh: '流水', en: 'Flowing Streams' },
    mp3: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e0/Liu_Shui.ogg/Liu_Shui.ogg.mp3',
    ogg: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Liu_Shui.ogg',
  },
  {
    name: { zh: '平沙落雁', en: 'Geese Alighting on the Sands' },
    mp3: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5a/Pingsha_Luoyan.ogg/Pingsha_Luoyan.ogg.mp3',
    ogg: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Pingsha_Luoyan.ogg',
  },
  {
    name: { zh: '阳关三叠', en: 'Three Refrains at Yang Pass' },
    mp3: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/60/Guqin-Yangguan_Sandie.ogg/Guqin-Yangguan_Sandie.ogg.mp3',
    ogg: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Guqin-Yangguan_Sandie.ogg',
  },
  {
    name: { zh: '醉渔唱晚', en: "The Tipsy Fisherman's Evening Song" },
    mp3: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/52/Guqin-Zuiyu_Changwan.ogg/Guqin-Zuiyu_Changwan.ogg.mp3',
    ogg: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Guqin-Zuiyu_Changwan.ogg',
  },
  {
    name: { zh: '酒狂', en: 'Wine-Fuelled Abandon' },
    mp3: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8f/Jiu_Kuang.ogg/Jiu_Kuang.ogg.mp3',
    ogg: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Jiu_Kuang.ogg',
  },
];
