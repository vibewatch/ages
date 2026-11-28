import { DONGHAN } from './donghan.ts';
import { holderAt, type Hold, type OwnEra, type Seat } from './types.ts';

/**
 * 三国 (220–280): seats and holdings for our own Three Kingdoms maps. The seats are those of the Eastern Han (same
 * sites, ./donghan.ts) that still mattered, plus the new commanderies of 魏, 蜀 and 吴 and the Western Regions posts of
 * 魏 and 晋. Every seat starts with its holder at the end of the Eastern Han (220, as recorded there); the changes
 * after 220 cite the 三国志 or 晋书 chapter that records them (`est` marks a date we infer).
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

const WEI = 'cao_wei', SHU = 'shu_han', WU = 'sun_wu', JIN = 'wjin', GS = 'sanguo_gongsun', NZ = 'sanguo_nanzhong',
  XY = 'sanguo_xiyu', XG = 'sanguo_xiyuguo';

/** Eastern Han holders in 220 → the polities of this era. */
const HEIR: Record<string, string> = {
  donghan_caocao: WEI, donghan_liubei: SHU, donghan_sun: WU, donghan_gongsundu: GS, donghan_linyi: 'sanguo_linyi',
  donghan_xiyuguo: XG, donghan_nxiongnu: 'xiongnu', donghan_fuyu: 'sanguo_fuyu', donghan_sanhan: 'sanguo_sanhan',
};
/** seats of the Han whose names changed by the Three Kingdoms */
const RENAME: Record<string, [string, string]> = {
  moling: ['建业', 'Jianye'], e: ['武昌', 'Wuchang'], ji: ['冀（汉阳郡，后改天水）', 'Ji (Hanyang / Tianshui)'],
  shangyong: ['上庸（新城郡）', 'Shangyong (Xincheng)'], yufu: ['永安（白帝）', 'Yong’an (Baidi)'], wei_yz: ['味（建宁郡）', 'Wei (Jianning)'],
  yiling: ['夷陵（宜都郡）', 'Yiling (Yidu)'], changli: ['昌黎（昌黎郡）', 'Changli'], meiji: ['美稷（河套匈奴）', 'Meiji (Xiongnu of the Ordos)'],
  zuoguo: ['左国城（匈奴五部）', 'Zuoguo (the Five Xiongnu Divisions)'],
};
/** Han seats left out: abandoned frontier commanderies (省 in 215) and posts nobody held in 220 */
const DROP = new Set(['juyan', 'fushi', 'jiuyuan', 'linrong', 'yunzhong', 'shanwu', 'yiwu', 'barkol', 'wuhuan', 'tagan']);

const seats: Seat[] = [
  ...DONGHAN.seats.filter(s => !DROP.has(s.id)).map(s => RENAME[s.id] ? { ...s, name: { zh: RENAME[s.id][0], en: RENAME[s.id][1] } } : s),
  // 魏
  S('xinxing', '九原（新兴郡）', 'Jiuyuan (Xinxing)', 112.73, 38.40, '山西忻州', { r: 280 }),
  S('guangwu', '广武（雁门郡）', 'Guangwu (Yanmen)', 112.95, 39.07, '山西代县西南', { r: 260 }),
  S('zishi', '兹氏（西河郡）', 'Zishi (Xihe)', 111.78, 37.27, '山西汾阳'),
  S('xidu', '西都（西平郡）', 'Xidu (Xiping)', 101.78, 36.62, '青海西宁', { r: 260 }),
  S('loulan', '楼兰（西域长史）', 'Loulan (Chief Clerk of the Western Regions)', 89.92, 40.52, '新疆若羌罗布泊西北', { r: 380 }),
  S('gaochang', '高昌（戊己校尉）', 'Gaochang (Wuji commandant)', 89.53, 42.85, '新疆吐鲁番东南', { r: 250 }),
  // 吴
  S('jianan', '建安', 'Jian’an', 118.32, 27.05, '福建建瓯', { r: 300 }),
  // 鲜卑拓跋部
  S('shengle', '盛乐（拓跋部）', 'Shengle (Tuoba)', 111.82, 40.38, '内蒙古和林格尔', { r: 380 }),
];

const explicit: Record<string, Hold[]> = {
  xinxing: [[220, WEI]], guangwu: [[220, WEI]], zishi: [[220, WEI]], xidu: [[220, WEI]], jianan: [[220, WU]],
  zuoguo: [[220, WEI]],
  loulan: [[220, null], [222, XY, 'sgz.wendi']],
  gaochang: [[220, XG], [222, XY, 'sgz.wendi']],
  shengle: [[220, null], [258, 'xianbei', 'wsh.xuji']],
  // 223 南中大姓雍闿、高定、朱褒叛，225 诸葛亮南征平之
  dianchi: [[220, SHU], [223, NZ, 'sgz.houzhu'], [225, SHU, 'sgz.zgl']],
  wei_yz: [[220, SHU], [223, NZ, 'sgz.houzhu'], [225, SHU, 'sgz.zgl']],
  nongdong: [[220, SHU], [223, NZ, 'sgz.houzhu'], [225, SHU, 'sgz.zgl']],
  qiongdu: [[220, SHU], [223, NZ, 'sgz.houzhu'], [225, SHU, 'sgz.zgl']],
  qielan: [[220, SHU], [223, NZ, 'sgz.houzhu'], [225, SHU, 'sgz.zgl']],
  // 229 陈式攻克武都、阴平
  xibian: [[220, WEI], [229, SHU, 'sgz.zgl']],
  yinping: [[220, WEI], [229, SHU, 'sgz.zgl']],
  // 238 司马懿平辽东
  xiangping: [[220, GS], [238, WEI, 'sgz.mingdi']],
  xuantu: [[220, GS], [238, WEI, 'sgz.mingdi']],
  lelang: [[220, GS], [238, WEI, 'sgz.mingdi']],
  daifang: [[220, GS], [238, WEI, 'sgz.mingdi']],
  // 263 吕兴以交趾附魏，九真、日南应之；晋代魏；271 陶璜复取
  longbian: [[220, WU], [263, WEI, 'sgz.sansi'], [266, JIN, 'js.wudi'], [271, WU, 'js.taohuang']],
  xupu: [[220, WU], [263, WEI, 'sgz.sansi'], [266, JIN, 'js.wudi'], [271, WU, 'js.taohuang']],
  xianhuan: [[220, WU], [263, WEI, 'sgz.sansi'], [266, JIN, 'js.wudi'], [271, WU, 'js.taohuang']],
  xijuan: [[220, WU], [263, WEI, 'sgz.sansi'], [266, JIN, 'js.wudi'], [271, WU, 'js.taohuang']],
};

const holds: Record<string, Hold[]> = {};
for (const s of seats) {
  const h = explicit[s.id] ?? (() => { const p = holderAt(DONGHAN.holds[s.id], 220); return [[220, p && (HEIR[p] ?? p)]] as Hold[]; })();
  // 263 蜀亡（后主出降）; 266 晋代魏
  if (holderAt(h, 262) === SHU && !h.some(([y]) => y === 263)) h.push([263, WEI, 'sgz.houzhu']);
  if (holderAt(h, 265) === WEI && !h.some(([y]) => y === 266)) h.push([266, JIN, 'js.wudi']);
  holds[s.id] = h.sort((a, b) => a[0] - b[0]);
}

export const SANGUO: OwnEra = {
  replaces: 'sanguo',
  reach: 260,
  roles: { cao_wei: 'rival', shu_han: 'rival', sun_wu: 'rival' },
  polities: [
    { id: GS, name: { zh: '公孙氏（辽东）', en: 'The Gongsun of Liaodong' }, color: '#7a528a', role: 'rival' },
    { id: NZ, name: { zh: '南中诸姓（雍闿、高定、朱褒）', en: 'Nanzhong rebels (Yong Kai, Gao Ding, Zhu Bao)' }, color: '#a68a64', role: 'rival' },
    { id: XY, name: { zh: '西域长史 · 戊己校尉', en: 'Chief Clerk of the Western Regions' }, color: '#6f94b8', role: 'protectorate' },
    { id: XG, name: { zh: '西域诸国', en: 'Western Regions states' }, color: '#c9bea2', role: 'neighbor' },
    { id: 'sanguo_fuyu', name: { zh: '夫余', en: 'Buyeo' }, color: '#c2bba5', role: 'neighbor' },
    { id: 'sanguo_sanhan', name: { zh: '三韩', en: 'Samhan' }, color: '#bcc6c0', role: 'neighbor' },
    { id: 'sanguo_linyi', name: { zh: '林邑', en: 'Linyi (Champa)' }, color: '#b3bfa4', role: 'neighbor' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_sanguo_1', from: 220, to: 224, at: 223, title: { zh: '三国鼎立，夷陵战后南中叛乱（223年）', en: 'Three Kingdoms: after Yiling, Nanzhong in revolt (223)' } },
    { id: 'o_sanguo_2', from: 225, to: 237, at: 230, title: { zh: '诸葛亮平南中、取武都阴平，公孙氏据辽东（230年 · 225年平南中，229年取二郡）', en: 'Zhuge Liang pacifies Nanzhong and takes Wudu and Yinping; the Gongsun in Liaodong (230; Nanzhong pacified in 225, Wudu and Yinping taken in 229)' } },
    { id: 'o_sanguo_3', from: 238, to: 262, at: 250, title: { zh: '司马懿平辽东，三国相持（250年 · 辽东238年平）', en: 'Sima Yi takes Liaodong; the three kingdoms at a standstill (250; Liaodong taken in 238)' } },
    { id: 'o_sanguo_4', from: 263, to: 265, at: 264, title: { zh: '魏灭蜀，交趾吕兴附魏（264年 · 二事皆在263年）', en: 'Wei conquers Shu; Lü Xing brings Jiaozhi over to Wei (264; both in 263)' } },
    { id: 'o_sanguo_5', from: 266, to: 271, at: 268, title: { zh: '西晋代魏，与吴南北对峙（268年）', en: 'Western Jin replaces Wei and faces Wu (268)' } },
    { id: 'o_sanguo_6', from: 272, to: 280, at: 278, title: { zh: '陶璜收复交趾，晋灭吴前夕（278年 · 交趾271年收复）', en: 'Tao Huang retakes Jiaozhi; on the eve of Jin’s conquest of Wu (278; Jiaozhi retaken in 271)' } },
  ],
  sources: {
    'sgz.wendi': { zh: '《三国志·魏书·文帝纪》', en: 'Sanguozhi, Annals of Emperor Wen of Wei' },
    'sgz.mingdi': { zh: '《三国志·魏书·明帝纪》', en: 'Sanguozhi, Annals of Emperor Ming of Wei' },
    'sgz.houzhu': { zh: '《三国志·蜀书·后主传》', en: 'Sanguozhi, Biography of the Later Lord (Liu Shan)' },
    'sgz.zgl': { zh: '《三国志·蜀书·诸葛亮传》', en: 'Sanguozhi, Biography of Zhuge Liang' },
    'sgz.sansi': { zh: '《三国志·吴书·三嗣主传》', en: 'Sanguozhi, Biographies of the Three Successors of Wu' },
    'js.wudi': { zh: '《晋书·武帝纪》', en: 'Jinshu, Annals of Emperor Wu' },
    'js.taohuang': { zh: '《晋书·陶璜传》', en: 'Jinshu, Biography of Tao Huang' },
    'wsh.xuji': { zh: '《魏书·序纪》', en: 'Weishu, Prefatory Annals (the Tuoba before Wei)' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
