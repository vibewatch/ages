import type { Hold, OwnEra, Seat } from './types.ts';
import { TANG } from './tang.ts';

/**
 * 五代十国 (907–960): seats and holdings for our own Five Dynasties maps. The 州 / 府 seats are the Tang ones (see
 * tang.ts; 《新五代史·职方考》 lists which of them each dynasty held), renamed where the period renamed them, plus the
 * seats this period adds (the 燕云 prefectures, the capitals of 辽, 高丽 and the kingdoms beyond). Holdings are a
 * chronicle: who took which seats in which year, with the chapter that records it (`est` marks a date we infer).
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

/** Tang seats renamed (or re-weighted) for this period */
const RENAME: Record<string, Partial<Seat> & { zh?: string; en?: string }> = {
  bianzhou: { zh: '汴州（开封府 · 东京）', en: 'Bian prefecture (Kaifeng, Eastern Capital)', b: 35 },
  luoyang: { zh: '洛阳（西京）', en: 'Luoyang (Western Capital)', b: 15 },
  changan: { zh: '长安（京兆府）', en: 'Chang’an (Jingzhao)', b: 10 },
  weizhou_m: { zh: '魏州（兴唐府 · 大名府）', en: 'Wei prefecture (Daming)', b: 10 },
  taiyuan: { zh: '太原府', en: 'Taiyuan', b: 25 },
  jiangning: { zh: '金陵（江宁府）', en: 'Jinling (Jiangning)', b: 25 },
  yangzhou: { zh: '扬州（江都府）', en: 'Yangzhou (Jiangdu)', b: 15 },
  hangzhou: { zh: '杭州（西府）', en: 'Hangzhou', b: 20 },
  fuzhou: { zh: '福州（长乐府）', en: 'Fuzhou (Changle)', b: 15 },
  tanzhou_x: { zh: '潭州（长沙府）', en: 'Changsha', b: 20 },
  guangzhou: { zh: '广州（兴王府）', en: 'Guangzhou (Xingwang)', b: 20 },
  chengdu: { zh: '成都府', en: 'Chengdu', b: 30 },
  jiangling: { zh: '江陵府', en: 'Jiangling', b: 10 },
  fengxiang: { zh: '凤翔府（岐）', en: 'Fengxiang (Qi)', b: 15 },
  qidan: { zh: '上京临潢府', en: 'Upper Capital (Linhuang)', r: 500, b: 30 },
  xi: { zh: '奚（中京地）', en: 'Xi (later Central Capital)', r: 350 },
  liaodong: { zh: '辽阳（东京）', en: 'Liaoyang (Eastern Capital)', r: 300 },
  fuyu_b: { zh: '扶余府（黄龙府）', en: 'Buyeo (Huanglong)' },
  heishui: { zh: '女真诸部', en: 'Jurchen tribes' },
  linyi: { zh: '占城', en: 'Champa' },
  piao: { zh: '蒲甘', en: 'Pagan' },
  taihe: { zh: '羊苴咩城', en: 'Yangjumie (Dali)' },
  ganzhou: { zh: '甘州（回鹘牙帐）', en: 'Ganzhou (Uyghur court)', r: 420 },
  shule: { zh: '疏勒（喀什噶尔）', en: 'Kashgar' },
  suiye: { zh: '八剌沙衮（碎叶川）', en: 'Balasagun (Chu valley)' },
  jiaozhou: { zh: '交州（大罗城）', en: 'Jiao prefecture (Dai La)' },
  otuken: { zh: '漠北（阻卜）', en: 'North of the Gobi (Zubu)' },
  shiwei: { r: 600 },
  kerulen: { zh: '胪朐河（乌古 · 敌烈）', en: 'Kherlen (Ugu and Dilie)', r: 600 },
};
const DROP = new Set(['nara', 'jiaohe', 'shouxiang_w', 'shouxiang_e', 'yinshan']);
const seats: Seat[] = TANG.seats.filter(s => !DROP.has(s.id)).map(s => {
  const o = RENAME[s.id];
  if (!o) return s;
  const { zh, en, ...rest } = o;
  return { ...s, ...rest, name: { zh: zh ?? s.name.zh, en: en ?? s.name.en } };
});
seats.push(
  S('xinzhou_y', '新州', 'Xin prefecture (Yanyun)', 115.22, 40.38, '河北涿鹿'),
  S('wuzhou_y', '武州', 'Wu prefecture (Yanyun)', 115.05, 40.60, '河北张家口宣化'),
  S('ruzhou_y', '儒州', 'Ru prefecture', 115.97, 40.47, '北京延庆'),
  S('yingzhou_d', '应州', 'Ying prefecture (Datong)', 113.18, 39.56, '山西应县'),
  S('songak', '开京（松岳）', 'Gaegyeong (Songak)', 126.55, 37.97, '朝鲜开城', { r: 230, b: 10 }),
  S('heian', '平安京', 'Heian-kyō', 135.76, 35.01, '日本京都', { r: 700 }),
  S('liao_zuzhou', '漠南（天德 · 丰州）', 'South of the Gobi (Tiande, Feng)', 108.55, 41.10, '内蒙古乌拉特前旗', { r: 350 }),
);

const CENTRAL = { 907: 'wudai_houliang', 923: 'wudai_houtang', 936: 'houjin', 947: 'wudai_houhan', 951: 'wudai_houzhou' } as const;
const src: Record<number, string> = { 907: 'xwds.liang', 923: 'xwds.tang', 936: 'xwds.jin', 947: 'xwds.han', 951: 'xwds.zhou' };

const holds: Record<string, Hold[]> = {};
const ids = (s: string) => s.trim().split(/\s+/);
/** From `year`, `polity` holds the seats (space-separated ids), per `source`. */
const ev = (year: number, polity: string | null, source: string, list: string) => {
  for (const id of ids(list)) (holds[id] ??= []).push([year, polity, source]);
};
/** The seats follow the central dynasty from `from` (and until `until`, exclusive). */
const central = (from: number, list: string, until = 9999) => {
  for (const [y, p] of Object.entries(CENTRAL)) {
    const year = Math.max(Number(y), from);
    const next = Object.keys(CENTRAL).map(Number).find(n => n > Number(y)) ?? 9999;
    if (next <= from || year >= until) continue;
    ev(year, p, year === Number(y) ? src[Number(y)] : 'est', list);
  }
};

// ── the plains: 后梁 → 后唐 → 后晋 → 后汉 → 后周 ───────────────────────────────────────────────────────────────────────
const LIANG = `bianzhou songzhou bozhou yingzhou_y xuzhou_h chenzhou_h caizhou zhengzhou huazhou_h caozhou puzhou_h yunzhou_h yanzhou
  xuzhou suzhou_h luoyang ruzhou huaizhou shanzhou_h guozhou huazhou tongzhou changan shangzhou jinzhou qingzhou zizhou qizhou
  laizhou dengzhou mizhou yizhou_s haizhou dizhou puzhou jinzhou_s jiangzhou cizhou_s xizhou_s xiangzhou_s dengzhou_s tangzhou junzhou
  fangzhou_s yingzhou_s fuzhou_h suizhou anzhou shenzhou_h lingzhou yanzhou_y fuzhou_f danzhou_g yanzhou_g`;
central(907, LIANG);
// 河中 goes over to 晋 (920) and the north-east of 后梁 falls to 晋 (915–916)
ev(920, 'wudai_jin', 'xwds.tang', 'puzhou jinzhou_s jiangzhou cizhou_s xizhou_s');
ev(923, 'wudai_houtang', 'xwds.tang', 'puzhou jinzhou_s jiangzhou cizhou_s xizhou_s');
const HEDONG = 'taiyuan fenzhou qinzhou_s liaozhou xinzhou daizhou lanzhou_s shizhou linzhou luzhou zezhou';
ev(907, 'wudai_jin', 'xwds.tang', HEDONG);
central(923, HEDONG, 951);
ev(951, 'wudai_beihan', 'xwds.donghan', 'taiyuan fenzhou qinzhou_s liaozhou xinzhou daizhou lanzhou_s shizhou linzhou');
central(951, 'luzhou zezhou');
// 河北: 魏博, 成德, 义武 and 幽州
const WEIBO = 'weizhou_m bozhou_h beizhou xiangzhou weizhou_h xingzhou mingzhou_h';
ev(907, 'wudai_houliang', 'xwds.liang', WEIBO);
ev(915, 'wudai_jin', 'xwds.tang', 'weizhou_m bozhou_h xiangzhou weizhou_h');
ev(916, 'wudai_jin', 'xwds.tang', 'beizhou xingzhou mingzhou_h');
central(923, WEIBO);
const ZHAO = 'zhenzhou zhaozhou jizhou_h shenzhou dingzhou';
ev(907, 'wudai_houliang', 'xwds.liang', ZHAO);
ev(910, 'wudai_jin', 'xwds.tang', ZHAO);
central(923, ZHAO);
ev(907, 'wudai_houliang', 'est', 'cangzhou dezhou');
ev(916, 'wudai_jin', 'xwds.tang', 'cangzhou dezhou');
central(923, 'cangzhou dezhou');
// 幽州 (刘守光 until 913), then 晋; the 燕云十六州 to the 契丹 in 938; 世宗 takes back 瀛、莫 (and 易) in 959
const YANYUN = 'youzhou zhuozhou tanzhou jizhou_y guizhou_y xinzhou_y wuzhou_y ruzhou_y yingzhou_h mozhou yunzhou yingzhou_d shuozhou weizhou_y';
ev(907, 'wudai_yan', 'xwds.zhifang', 'youzhou zhuozhou tanzhou jizhou_y guizhou_y xinzhou_y wuzhou_y ruzhou_y yingzhou_h mozhou yizhou_h');
ev(913, 'wudai_jin', 'xwds.tang', 'youzhou zhuozhou tanzhou jizhou_y guizhou_y xinzhou_y wuzhou_y ruzhou_y yingzhou_h mozhou yizhou_h');
ev(907, 'wudai_jin', 'xwds.tang', 'yunzhou yingzhou_d shuozhou weizhou_y');
central(923, YANYUN + ' yizhou_h', 938);
ev(938, 'liao', 'xwds.jin', YANYUN);
ev(947, 'liao', 'est', 'yizhou_h');
ev(959, 'wudai_houzhou', 'xwds.zhou', 'yingzhou_h mozhou yizhou_h');
ev(907, 'liao', 'est', 'pingzhou yingzhou');
// 岐 (李茂贞) to 924
const QI = 'fengxiang binzhou ningzhou qingzhou_g jingzhou_g yuanzhou weizhou';
ev(907, 'wudai_qi', 'xwds.zhifang', QI);
central(924, QI);
// 定难军 (the Tangut 李 house) keeps 夏、绥、银、宥 throughout
ev(907, 'wudai_dingnan', 'xwds.zhifang', 'xiazhou yinzhou suizhou_g youzhou_x');

// ── 蜀: 前蜀 (907–925), 后唐, 后蜀 (934–) ─────────────────────────────────────────────────────────────────────────────
const SHU = `chengdu pengzhou shuzhou_j hanzhou meizhou jiazhou qiongzhou yazhou lizhou_j maozhou weizhou_j zizhou_j jianzhou_j
  lingzhou_j rongzhou_j zizhou_d mianzhou jianzhou_g longzhou suizhou_j hezhou_j guozhou_j langzhou_j luzhou_j rongzhou yuzhou
  fuzhou_c liangzhou_s yangzhou_s lizhou bazhou tongzhou_s xingzhou_s kaizhou wanzhou zhongzhou kuizhou qianzhou`;
ev(907, 'wudai_qianshu', 'xwds.qianshu', SHU);
ev(925, 'wudai_houtang', 'xwds.qianshu', SHU);
ev(934, 'houshu', 'xwds.houshu', SHU);
const QINFENG = 'qinzhou chengzhou wuzhou_l fengzhou_s';
ev(907, 'wudai_qi', 'xwds.zhifang', QINFENG);
ev(915, 'wudai_qianshu', 'xwds.qianshu', QINFENG);
ev(925, 'wudai_houtang', 'xwds.qianshu', QINFENG);
central(936, QINFENG, 947);
ev(947, 'houshu', 'xwds.houshu', QINFENG);
ev(955, 'wudai_houzhou', 'xwds.zhou', QINFENG);

// ── the south: 吴 / 南唐, 吴越, 闽, 楚, 南汉, 荆南 ───────────────────────────────────────────────────────────────────────
const HUAI_N = 'yangzhou chuzhou hezhou_h chuzhou_c luzhou_h shouzhou haozhou shuzhou guangzhou_h huangzhou qizhou_h sizhou';
const JIANGNAN = `jiangning runzhou changzhou xuanzhou shezhou chizhou ezhou hongzhou jiangzhou_x raozhou xinzhou_x fuzhou_x jizhou_x
  yuanzhou_x`;
ev(907, 'wudai_wu', 'xwds.wu', HUAI_N + ' ' + JIANGNAN);
ev(918, 'wudai_wu', 'xwds.wu', 'qianzhou_x');
ev(907, null, 'est', 'qianzhou_x');
ev(937, 'nantang', 'xwds.nantang', HUAI_N + ' ' + JIANGNAN + ' qianzhou_x');
ev(958, 'wudai_houzhou', 'xwds.zhou', HUAI_N);
ev(907, 'wuyue', 'xwds.wuyue', 'hangzhou huzhou suzhou muzhou yuezhou_z mingzhou taizhou wuzhou quzhou chuzhou_z wenzhou');
ev(907, 'min', 'xwds.min', 'fuzhou jianzhou quanzhou zhangzhou tingzhou_f');
ev(945, 'nantang', 'xwds.min', 'jianzhou quanzhou zhangzhou tingzhou_f');
ev(945, null, 'xwds.min', 'fuzhou');
ev(947, 'wuyue', 'xwds.wuyue', 'fuzhou');
const CHU_CORE = 'tanzhou_x hengzhou yongzhou daozhou shaozhou_x yuezhou langzhou lizhou_x chenzhou_y wuzhou_x';
const CHU_S = 'chenzhou_x lianzhou guizhou zhaozhou_l hezhou_l liuzhou xiangzhou_l rongzhou_l';
ev(907, 'chu5', 'xwds.chu', CHU_CORE + ' ' + CHU_S);
ev(951, 'nantang', 'xwds.chu', CHU_CORE);
ev(951, 'nanhan', 'xwds.nanhan', CHU_S);
ev(952, 'wudai_wuping', 'xwds.chu', CHU_CORE);
ev(907, 'nanhan', 'xwds.nanhan', `guangzhou shaozhou xunzhou chaozhou duanzhou kangzhou fengzhou_l xinzhou_l gaozhou luozhou leizhou
  yazhou_h danzhou_h zhenzhou_h wuzhou_l2 rongzhou_r yongzhou_l xunzhou_l qinzhou_l lianzhou_l`);
ev(907, 'jingnan', 'xwds.jingnan', 'jiangling xiazhou_s guizhou_s');
// 安南: the 曲 house (905–930), 南汉 (930–931), then 杨廷艺 and 吴权
ev(907, 'annam', 'xwds.nanhan', 'jiaozhou fengzhou_a aizhou huanzhou');
ev(930, 'nanhan', 'xwds.nanhan', 'jiaozhou fengzhou_a aizhou huanzhou');
ev(931, 'annam', 'xwds.nanhan', 'jiaozhou fengzhou_a aizhou huanzhou');
// the Guizhou plateau: the 播、思、牂柯 chiefs
ev(907, null, 'est', 'bozhou_q sizhou_q zangke');

// ── 契丹 / 辽 and the north-east ─────────────────────────────────────────────────────────────────────────────────────
ev(907, 'liao', 'ls.taizu', 'qidan xi xilin');
ev(916, 'liao', 'ls.taizu', 'fengzhou liao_zuzhou shouxiang_m danyu shengzhou');
ev(907, 'wudai_jin', 'est', 'fengzhou liao_zuzhou shouxiang_m danyu shengzhou');
ev(907, 'wudai_shiwei', 'est', 'shiwei');
ev(920, 'liao', 'est', 'shiwei');
ev(907, 'tatar', 'est', 'qikou otuken altai tongcheng');
ev(907, 'tatar', 'est', 'kerulen');
ev(924, 'liao', 'ls.taizu', 'kerulen qikou');
ev(907, 'wudai_xiajiasi', 'est', 'xiajiasi');
ev(907, 'wudai_nuzhen', 'est', 'heishui');
ev(907, 'bohai', 'xwds.siyi', 'bohai_old bohai_up bohai_e fuyu_b sumo zhacheng guonei nanhai fuyu_g liaodong anshi xincheng beisha');
ev(919, 'liao', 'ls.taizu', 'liaodong anshi xincheng beisha');
ev(926, 'liao', 'ls.taizu', 'bohai_old bohai_up bohai_e fuyu_b sumo zhacheng guonei fuyu_g');
ev(926, 'wudai_nuzhen', 'est', 'nanhai');
// Korea: 新罗 breaks up into the Later Three Kingdoms; 高丽 reunites it (935–936)
ev(907, 'silla', 'xwds.siyi', 'gyeongju sangju');
ev(907, 'wudai_taebong', 'xwds.siyi', 'songak hanzhou_s myeongju haeju');
ev(907, null, 'est', 'pyongyang');
ev(918, 'gaoli', 'xwds.siyi', 'songak hanzhou_s myeongju haeju pyongyang');
ev(907, 'wudai_hubaekje', 'xwds.siyi', 'sabi wansan mujin');
ev(935, 'gaoli', 'xwds.siyi', 'gyeongju sangju');
ev(936, 'gaoli', 'xwds.siyi', 'sabi wansan mujin');
ev(907, 'japan', 'est', 'heian dazaifu tagajo');

// ── the west: 河西, the Tarim, Tibet, Nanzhao's successors ───────────────────────────────────────────────────────────
ev(907, 'wudai_guiyi', 'xwds.siyi', 'shazhou guazhou');
ev(907, 'wudai_ganzhou', 'xwds.siyi', 'ganzhou suzhou_l');
ev(907, 'huihu_w', 'xwds.siyi', 'yizhou_l pulei xizhou tingzhou luntai yanqi qiuci');
ev(907, 'wudai_yutian', 'xwds.siyi', 'yutian boxian shicheng');
ev(907, 'karakhan', 'est', 'shule congling suiye gongyue balkhash geluolu otrar');
ev(907, 'wudai_saman', 'est', 'talas kangguo anguo shiguo bahanna xwarizm tuhuoluo bosi');
ev(907, 'tubo_bu', 'xwds.siyi', `lhasa supi xiangxiong bailan dangxiang fusi tuyuhun_w lanzhou hezhou shanzhou shancheng kuozhou
  taozhou minzhou linzhou_l dangzhou diezhou liangzhou huizhou songzhou_j xiaobolu dabolu tieqiao`);
ev(907, 'wudai_tianzhu', 'est', 'tianzhu_n tianzhu_e multan kashmir nipoluo kamarupa jibin');
ev(907, 'wudai_changhe', 'est', 'taihe mengshe yongchang yinsheng yaozhou xizhou_j kunzhou nanning');
ev(937, 'dali', 'est', 'taihe mengshe yongchang yinsheng yaozhou xizhou_j kunzhou nanning');
ev(907, 'wudai_champa', 'est', 'linyi');
ev(907, 'wudai_pagan', 'est', 'piao');

for (const h of Object.values(holds)) h.sort((a, b) => a[0] - b[0]);

export const WUDAI: OwnEra = {
  replaces: 'wudai',
  // the period's own dynasty is the realm; its neighbours here are rivals (area readout, map-reading)
  roles: { liao: 'rival', dali: 'rival' },
  reach: 250,
  polities: [
    { id: 'wudai_houliang', name: { zh: '后梁', en: 'Later Liang' }, color: '#b5632a', role: 'main' },
    { id: 'wudai_jin', name: { zh: '晋（河东李氏）', en: 'Jin (the Li of Hedong)' }, color: '#5b6fa8', role: 'rival' },
    { id: 'wudai_houtang', name: { zh: '后唐', en: 'Later Tang' }, color: '#8c4632', role: 'main' },
    { id: 'wudai_houhan', name: { zh: '后汉', en: 'Later Han' }, color: '#7d5a38', role: 'main' },
    { id: 'wudai_houzhou', name: { zh: '后周', en: 'Later Zhou' }, color: '#a8763a', role: 'main' },
    { id: 'wudai_yan', name: { zh: '燕（刘仁恭 · 刘守光）', en: 'Yan (Liu Rengong, Liu Shouguang)' }, color: '#6b8e9b', role: 'rival' },
    { id: 'wudai_qi', name: { zh: '岐（李茂贞）', en: 'Qi (Li Maozhen)' }, color: '#a04f6b', role: 'rival' },
    { id: 'wudai_qianshu', name: { zh: '前蜀', en: 'Former Shu' }, color: '#c98a2b', role: 'rival' },
    { id: 'wudai_wu', name: { zh: '吴（杨吴）', en: 'Wu (the Yang house)' }, color: '#3f8f6a', role: 'rival' },
    { id: 'wudai_beihan', name: { zh: '北汉', en: 'Northern Han' }, color: '#6b5b95', role: 'rival' },
    { id: 'wudai_wuping', name: { zh: '武平（湖南）', en: 'Wuping (Hunan)' }, color: '#5a7d6a', role: 'rival' },
    { id: 'wudai_dingnan', name: { zh: '定难军（党项）', en: 'Dingnan army (Tanguts)' }, color: '#9b7653', role: 'rival' },
    { id: 'wudai_taebong', name: { zh: '泰封（后高句丽）', en: 'Taebong (Later Goguryeo)' }, color: '#c5cdc8', role: 'neighbor' },
    { id: 'wudai_hubaekje', name: { zh: '后百济', en: 'Later Baekje' }, color: '#c3cbc6', role: 'neighbor' },
    { id: 'wudai_guiyi', name: { zh: '归义军（曹氏）', en: 'Guiyi Army (the Cao house)' }, color: '#c9a98b', role: 'neighbor' },
    { id: 'wudai_ganzhou', name: { zh: '甘州回鹘', en: 'Ganzhou Uyghurs' }, color: '#a6acaf', role: 'neighbor' },
    { id: 'wudai_yutian', name: { zh: '于阗', en: 'Khotan' }, color: '#c9bfa5', role: 'neighbor' },
    { id: 'wudai_saman', name: { zh: '萨曼王朝', en: 'Samanids' }, color: '#bdb39d', role: 'neighbor' },
    { id: 'wudai_tianzhu', name: { zh: '天竺诸国', en: 'Kingdoms of India' }, color: '#c7bba0', role: 'neighbor' },
    { id: 'wudai_changhe', name: { zh: '大长和 · 大义宁', en: 'Dachanghe and Dayining' }, color: '#b39ddb', role: 'neighbor' },
    { id: 'wudai_champa', name: { zh: '占城', en: 'Champa' }, color: '#b7c2a8', role: 'neighbor' },
    { id: 'wudai_pagan', name: { zh: '蒲甘', en: 'Pagan' }, color: '#bcc3a9', role: 'neighbor' },
    { id: 'wudai_xiajiasi', name: { zh: '黠戛斯', en: 'Kyrgyz' }, color: '#a3aba6', role: 'neighbor' },
    { id: 'wudai_nuzhen', name: { zh: '女真诸部', en: 'Jurchen tribes' }, color: '#b2b9b0', role: 'neighbor' },
    { id: 'wudai_shiwei', name: { zh: '室韦', en: 'Shiwei' }, color: '#b5bab0', role: 'neighbor' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_wudai_1', from: 907, to: 922, at: 916, title: { zh: '梁晋争衡（916年 · 后梁据河南，晋据河东、河北，十国分立）', en: 'Liang against Jin (916: Later Liang in Henan, Jin in Hedong and Hebei, the southern kingdoms apart)' } },
    { id: 'o_wudai_2', from: 923, to: 925, at: 924, title: { zh: '后唐灭梁之后（924年 · 梁亡于923年；岐归附，前蜀犹存）', en: 'After Later Tang ends Liang (924: Liang fell in 923; Qi submits, Former Shu still stands)' } },
    { id: 'o_wudai_3', from: 926, to: 933, at: 930, title: { zh: '后唐取蜀，契丹灭渤海（930年 · 前蜀亡于925年，渤海亡于926年）', en: 'Later Tang takes Shu, the Khitan end Balhae (930: Former Shu fell in 925, Balhae in 926)' } },
    { id: 'o_wudai_4', from: 934, to: 936, at: 935, title: { zh: '孟知祥建后蜀（935年 · 后蜀934年建国；燕云仍属中原）', en: 'Meng Zhixiang founds Later Shu (935: Later Shu founded in 934; Yan–Yun still with the plains)' } },
    { id: 'o_wudai_5', from: 937, to: 944, at: 940, title: { zh: '后晋割燕云，李昪建南唐（940年 · 燕云936年割让，南唐937年建立）', en: 'Later Jin cedes Yan–Yun, Li Bian founds Southern Tang (940: Yan–Yun ceded in 936, Southern Tang founded in 937)' } },
    { id: 'o_wudai_6', from: 945, to: 950, at: 948, title: { zh: '南唐、吴越分闽，刘知远建后汉（948年 · 闽亡于945–946年，后汉947年建立）', en: 'Southern Tang and Wuyue share out Min; Liu Zhiyuan founds Later Han (948: Min divided in 945–946, Later Han founded in 947)' } },
    { id: 'o_wudai_7', from: 951, to: 954, at: 953, title: { zh: '郭威建后周，北汉据太原（953年 · 二国皆立于951年；楚亡，湖南归武平）', en: 'Guo Wei founds Later Zhou, Northern Han holds Taiyuan (953: both founded in 951; Chu gone, Hunan under Wuping)' } },
    { id: 'o_wudai_8', from: 955, to: 958, at: 958, title: { zh: '周世宗取秦凤、淮南（958年 · 南唐划江为界）', en: 'Shizong of Zhou takes Qin–Feng and the Huainan (958: Southern Tang behind the Yangtze)' } },
    { id: 'o_wudai_9', from: 959, to: 960, at: 959, title: { zh: '世宗北伐（959年 · 复瀛、莫、易三州）', en: 'Shizong marches north (959: Ying, Mo and Yi prefectures retaken)' } },
  ],
  sources: {
    'xwds.liang': { zh: '《新五代史·梁本纪》', en: 'New History of the Five Dynasties, Annals of Liang' },
    'xwds.tang': { zh: '《新五代史·唐本纪》', en: 'New History of the Five Dynasties, Annals of Tang' },
    'xwds.jin': { zh: '《新五代史·晋本纪》', en: 'New History of the Five Dynasties, Annals of Jin' },
    'xwds.han': { zh: '《新五代史·汉本纪》', en: 'New History of the Five Dynasties, Annals of Han' },
    'xwds.zhou': { zh: '《新五代史·周本纪》', en: 'New History of the Five Dynasties, Annals of Zhou' },
    'xwds.wu': { zh: '《新五代史·吴世家》', en: 'New History of the Five Dynasties, House of Wu' },
    'xwds.nantang': { zh: '《新五代史·南唐世家》', en: 'New History of the Five Dynasties, House of Southern Tang' },
    'xwds.qianshu': { zh: '《新五代史·前蜀世家》', en: 'New History of the Five Dynasties, House of Former Shu' },
    'xwds.houshu': { zh: '《新五代史·后蜀世家》', en: 'New History of the Five Dynasties, House of Later Shu' },
    'xwds.nanhan': { zh: '《新五代史·南汉世家》', en: 'New History of the Five Dynasties, House of Southern Han' },
    'xwds.chu': { zh: '《新五代史·楚世家》', en: 'New History of the Five Dynasties, House of Chu' },
    'xwds.wuyue': { zh: '《新五代史·吴越世家》', en: 'New History of the Five Dynasties, House of Wuyue' },
    'xwds.min': { zh: '《新五代史·闽世家》', en: 'New History of the Five Dynasties, House of Min' },
    'xwds.jingnan': { zh: '《新五代史·南平世家》', en: 'New History of the Five Dynasties, House of Nanping (Jingnan)' },
    'xwds.donghan': { zh: '《新五代史·东汉世家》', en: 'New History of the Five Dynasties, House of the Eastern (Northern) Han' },
    'xwds.siyi': { zh: '《新五代史·四夷附录》', en: 'New History of the Five Dynasties, Appendix on the Four Barbarians' },
    'xwds.zhifang': { zh: '《新五代史·职方考》', en: 'New History of the Five Dynasties, Treatise on Administrative Geography' },
    'ls.taizu': { zh: '《辽史·太祖纪》', en: 'History of Liao, Annals of Taizu' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
