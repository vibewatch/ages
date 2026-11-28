import type { Hold, OwnEra, Seat } from './types.ts';
import { JIN_SEATS, NEIGHBOR_SEATS, S } from './xijin.ts';

/**
 * 东晋十六国 (317–420): the Eastern Jin in the south and the kingdoms of the north. The seats are the Jin commandery
 * seats (shared with xijin.ts) plus the capitals the kingdoms built; each holding change cites the 晋书 annals or the
 * 载记 (records of the northern rulers) that tells of it, or 《魏书》《宋书》《资治通鉴》 (`est` marks a date we infer
 * where the sources are silent or disagree).
 */
const seats: Seat[] = [
  ...JIN_SEATS,
  ...NEIGHBOR_SEATS,
  S('longcheng', '龙城', 'Longcheng', 120.45, 41.57, '辽宁朝阳', { r: 260, b: 10 }),
  S('tongwan', '统万城', 'Tongwan', 108.85, 37.98, '陕西靖边白城子', { r: 330, b: 10 }),
  S('jinchang', '晋昌', 'Jinchang', 95.78, 40.52, '甘肃瓜州', { r: 260 }),
  S('baekje', '百济（慰礼城）', 'Baekje (Wiryeseong)', 126.97, 37.52, '韩国首尔', { r: 300 }),
  S('silla', '新罗（金城）', 'Silla (Geumseong)', 129.21, 35.84, '韩国庆州', { r: 260 }),
];

const J = 'ejin', QZ = 'dongjin_qianzhao', HZ = 'dongjin_houzhao', CH = 'dongjin_chenghan', QL = 'dongjin_qianliang',
  QY = 'dongjin_qianyan', DAI = 'dongjin_dai', DUAN = 'dongjin_duan', QQ = 'qianqin', HY = 'dongjin_houyan',
  XY = 'dongjin_xiyan', HQ = 'dongjin_houqin', XQ = 'dongjin_xiqin', HL = 'dongjin_houliang', NL = 'dongjin_nanliang',
  BL = 'dongjin_beiliang', XL = 'dongjin_xiliang', NY = 'dongjin_nanyan', BY = 'dongjin_beiyan', XIA = 'dongjin_xia',
  QS = 'dongjin_qiaoshu', CC = 'dongjin_chouchi', BW = 'beiwei', GGL = 'goguryeo';

/** 河北: 后赵 → 前燕 (352) → 前秦 (370) → 后燕 (385) → 北魏 (397) */
const HEBEI: Hold[] = [[317, HZ], [352, QY, 'js.murongjun'], [370, QQ, 'js.fujian'], [385, HY, 'js.murongchui'], [397, BW, 'wss.taizu']];
/** 蜀: 成汉 → 东晋 (347) → 前秦 (373) → 东晋 (385) → 谯蜀 (405) → 东晋 (413) */
const SHU: Hold[] = [[317, CH], [347, J, 'js.mudi'], [373, QQ, 'js.fujian'], [385, J, 'est'], [405, QS, 'js.qiaozong'], [413, J, 'js.andi']];
/** 河西: 前凉 → 前秦 (376) → 后凉 (386) */
const HEXI: Hold[] = [[317, QL], [376, QQ, 'js.fujian'], [386, HL, 'js.lvguang']];
/** 关中: 汉 / 前赵 → 后赵 (329) → 前秦 (351) → 后秦 (386) → 东晋 (417) */
const GUANZHONG: Hold[] = [[317, QZ], [329, HZ, 'js.shile'], [351, QQ, 'js.fujiansj'], [386, HQ, 'js.yaochang'], [417, J, 'ss.wudi']];
/** 青州: 曹嶷 (nominally Jin) → submits to 后赵 (c. 319; ended 323) → 段龛 for Jin (351) → 前燕 (356) → 前秦 (370) → 东晋 (384) → 南燕 (399) → 东晋 (410) */
const QINGZHOU: Hold[] = [[317, J, 'est'], [319, HZ, 'est'], [351, J, 'est'], [356, QY, 'js.murongjun'], [370, QQ, 'js.fujian'],
  [384, J, 'js.xiexuan'], [399, NY, 'js.murongde'], [410, J, 'ss.wudi']];
/** 河南 south of the Yellow River: 祖逖 holds it for Jin (to 321) → 后赵 (325) → Jin after 后赵 falls (351) → 前燕 (364)
 * → 前秦 (370) → 东晋 (384) → 后秦 (399) → 东晋 (416) */
const HENAN: Hold[] = [[317, J], [325, HZ, 'est'], [351, J, 'est'], [364, QY, 'zztj'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan'],
  [399, HQ, 'js.yaoxing'], [416, J, 'ss.wudi']];
/** 淮北 (徐、兖 south): Jin → 后赵 (326) → Jin (350) → 前秦 (379) → Jin (384) */
const HUAIBEI: Hold[] = [[317, J], [326, HZ, 'est'], [350, J, 'est'], [379, QQ, 'js.fujian'], [384, J, 'js.xiexuan']];
/** 兖州 north and 泰山: Jin → 后赵 (322) → Jin (351) → 前燕 (359) → 前秦 (370) → Jin (384) → 南燕 (399) → Jin (410) */
const YANZHOU: Hold[] = [[317, J], [322, HZ, 'est'], [351, J, 'est'], [359, QY, 'zztj'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan'], [399, NY, 'est'],
  [410, J, 'ss.wudi']];
/** 并州: 后赵 → 前燕 (358) → 前秦 (370) → 西燕 (386) → 后燕 (394) → 北魏 (396) */
const BINGZHOU: Hold[] = [[317, HZ, 'js.shile'], [358, QY, 'est'], [370, QQ, 'js.fujian'], [386, XY, 'est'], [394, HY, 'js.murongchui'],
  [396, BW, 'wss.taizu']];
/** 幽州: 段部 → 后赵 (321) → 前燕 (350) → 前秦 (370) → 后燕 (385) → 北魏 (398) */
const YOUZHOU: Hold[] = [[317, DUAN], [321, HZ, 'est'], [350, QY, 'js.murongjun'], [370, QQ, 'js.fujian'], [385, HY, 'js.murongchui'],
  [398, BW, 'est']];
/** 辽西 / 辽东: 慕容 (前燕) → 前秦 (370) → 后燕 (385) → 北燕 (407) */
const LIAO: Hold[] = [[317, QY, 'js.murongwei'], [370, QQ, 'js.fujian'], [385, HY, 'js.murongchui'], [407, BY, 'js.fengba']];
/** 荆北 (南阳盆地): Jin → 后赵 (330) → Jin (352) → 前燕 (366) → 前秦 (370) → Jin (384) → 后秦 (399) → Jin, 姚兴 returns 十二郡 (405) */
const NANYANG: Hold[] = [[317, J], [330, HZ, 'est'], [352, J, 'est'], [366, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'est'],
  [399, HQ, 'js.yaoxing'], [405, J, 'js.yaoxing']];

const holds: Record<string, Hold[]> = {
  // the Jin south (default) — everything not listed below stays Jin
  ...Object.fromEntries(JIN_SEATS.map(s => [s.id, [[317, J]] as Hold[]])),

  // 河北
  xiangguo: HEBEI, guangping: HEBEI, fangzi: HEBEI, yingtao: HEBEI, xindu: HEBEI, zhending: HEBEI, anping: HEBEI, bolu: HEBEI,
  lecheng: HEBEI, ganling: HEBEI, yuancheng: HEBEI, nanpi: HEBEI, dongpingshu: HEBEI, pingyuan: HEBEI, ji_jun: HEBEI,
  ye: [[317, HZ, 'js.shile'], [352, QY, 'js.murongjun'], [370, QQ, 'js.fujian'], [385, HY, 'js.murongchui'], [398, BW, 'wss.taizu']],
  lunu: HEBEI,
  yanci: [[317, J], [321, HZ, 'js.shile'], [352, QY, 'est'], [370, QQ, 'js.fujian'], [385, HY, 'est'], [397, BW, 'est']],
  yewang: [[317, J], [324, HZ, 'est'], [352, QY, 'est'], [370, QQ, 'js.fujian'], [385, HY, 'est'], [398, BW, 'est']],
  liyang: [[317, HZ], [352, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan'], [392, HY, 'js.murongchui'], [398, BW, 'est']],
  huatai: [[317, HZ], [352, QY, 'est'], [370, QQ, 'js.fujian'], [385, J, 'est'], [392, HY, 'js.murongchui'], [398, NY, 'js.murongde'],
    [399, BW, 'est'], [416, J, 'ss.wudi']],
  // 幽州 and the 段部
  ji: YOUZHOU, zhuo: YOUZHOU, yuyang: YOUZHOU, juyang: YOUZHOU,
  lingzhi: [[317, DUAN], [338, HZ, 'js.shihu'], [350, QY, 'est'], [370, QQ, 'js.fujian'], [385, HY, 'est'], [407, BY, 'js.fengba']],
  xuwu: [[317, DUAN], [338, HZ, 'js.shihu'], [350, QY, 'est'], [370, QQ, 'js.fujian'], [385, HY, 'est'], [407, BY, 'est']],
  // 慕容 → 前燕 (称王 337), 后燕, 北燕; 高句丽 takes 辽东 (c. 404)
  changli: LIAO, murong: LIAO, longcheng: LIAO,
  xiangping: [[317, J], [319, QY, 'js.murongwei'], [370, QQ, 'js.fujian'], [385, HY, 'js.murongchui'], [404, GGL, 'est']],
  xuantu: [[317, J], [319, QY, 'js.murongwei'], [370, QQ, 'js.fujian'], [385, HY, 'js.murongchui'], [404, GGL, 'est']],
  lelang: [[317, GGL]], daifang: [[317, GGL]], wandu: [[317, GGL]],
  yuwen: [[317, 'xianbei'], [344, QY, 'js.muronghuang'], [370, QQ, 'est'], [385, 'xianbei', 'est']],
  // 代 (拓跋), ended by 前秦 (376); 北魏 (386)
  shengle: [[317, DAI], [376, QQ, 'js.fujian'], [386, BW, 'wss.taizu']],
  pingcheng: [[317, DAI], [376, QQ, 'js.fujian'], [386, BW, 'est']],
  mayi: [[317, DAI], [376, QQ, 'js.fujian'], [386, BW, 'est']],
  dai: [[317, DAI], [376, QQ, 'js.fujian'], [386, BW, 'est']],
  wuyuan: [[317, DAI], [376, 'xiongnu', 'js.fujian'], [391, BW, 'wss.taizu']],
  // 铁弗 匈奴 in the Ordos; 赫连勃勃's 夏 (407), 统万城 (413)
  ordos: [[317, 'xiongnu'], [391, BW, 'wss.taizu'], [407, XIA, 'js.helian']],
  tongwan: [[317, 'xiongnu'], [391, BW, 'wss.taizu'], [407, XIA, 'js.helian']],
  // 并州
  jinyang: BINGZHOU, zhan: BINGZHOU, jiuyuan_xx: BINGZHOU,
  guangwu: [[317, HZ, 'est'], [358, QY, 'est'], [370, QQ, 'js.fujian'], [386, XY, 'est'], [394, HY, 'js.murongchui'], [396, BW, 'wss.taizu']],
  lu_sd: [[317, HZ], [352, QY, 'est'], [370, QQ, 'js.fujian'], [386, XY, 'est'], [394, HY, 'js.murongchui'], [398, BW, 'est']],
  zhangzi: [[317, HZ], [352, QY, 'est'], [370, QQ, 'js.fujian'], [386, XY, 'est'], [394, HY, 'js.murongchui'], [398, BW, 'est']],
  lishi: [[317, QZ], [319, HZ, 'est'], [358, QQ, 'est'], [386, XY, 'est'], [394, HY, 'est'], [396, BW, 'est']],
  pingyang: [[317, QZ, 'js.liucong'], [319, HZ, 'js.shile'], [358, QQ, 'est'], [386, XY, 'est'], [394, HY, 'js.murongchui'], [398, BW, 'est']],
  puzi: [[317, QZ, 'js.liucong'], [319, HZ, 'est'], [358, QQ, 'est'], [386, XY, 'est'], [394, HY, 'est'], [398, BW, 'est']],
  anyi: [[317, QZ], [328, HZ, 'est'], [352, QQ, 'est'], [386, XY, 'est'], [394, HQ, 'est'], [417, J, 'ss.wudi']],
  puban: [[317, QZ], [328, HZ, 'est'], [352, QQ, 'est'], [389, HQ, 'est'], [417, J, 'ss.wudi']],
  // 关中
  changan: GUANZHONG, linjin: GUANZHONG, chiyang: GUANZHONG, huaili: GUANZHONG,
  hongnong: [[317, QZ], [328, HZ, 'est'], [352, QQ, 'est'], [386, HQ, 'est'], [416, J, 'ss.wudi']],
  shangluo: [[317, QZ, 'est'], [329, HZ, 'est'], [351, QQ, 'est'], [386, HQ, 'est'], [417, J, 'ss.wudi']],
  chencang: [[317, QZ], [329, HZ, 'js.shile'], [351, QQ, 'js.fujiansj'], [394, HQ, 'js.yaoxing'], [417, J, 'ss.wudi']],
  niyang: [[317, QZ], [329, HZ, 'js.shile'], [351, QQ, 'js.fujiansj'], [384, HQ, 'js.yaochang'], [417, J, 'est']],
  qi_xp: [[317, QZ], [329, HZ, 'js.shile'], [351, QQ, 'js.fujiansj'], [385, HQ, 'js.yaochang'], [417, J, 'est']],
  linjing: [[317, QZ], [329, HZ, 'js.shile'], [351, QQ, 'est'], [389, HQ, 'est'], [416, XIA, 'js.helian']],
  gaoping: [[317, QZ], [329, HZ, 'js.shile'], [351, QQ, 'est'], [389, HQ, 'est'], [407, XIA, 'js.helian']],
  // 陇右: 司马保 at 上邽 for Jin (to 320); 苻登 holds out here after 386; 西秦 in 苑川 and 枹罕
  shanggui: [[317, J, 'js.yuandi'], [320, QZ, 'js.liuyao'], [329, HZ, 'js.shile'], [352, QQ, 'est'], [394, HQ, 'est'], [417, XQ, 'est']],
  lueyang: [[317, J], [320, QZ, 'js.liuyao'], [329, HZ, 'js.shile'], [352, QQ, 'est'], [394, HQ, 'est'], [417, XQ, 'est']],
  xiangwu: [[317, J], [320, QZ, 'js.liuyao'], [329, HZ, 'js.shile'], [352, QQ, 'est'], [394, XQ, 'js.qifu'], [400, HQ, 'js.yaoxing'],
    [409, XQ, 'est']],
  didao: [[317, J], [320, QZ, 'est'], [329, QL, 'js.zhanggui'], [371, QQ, 'js.fujian'], [385, XQ, 'js.qifu'], [400, HQ, 'js.yaoxing'],
    [409, XQ, 'js.qifu']],
  fuhan: [[317, QL], [371, QQ, 'js.fujian'], [394, XQ, 'est'], [400, HQ, 'js.yaoxing'], [410, XQ, 'est']],
  yuzhong: [[317, QL], [376, QQ, 'js.fujian'], [385, XQ, 'js.qifu'], [400, HQ, 'js.yaoxing'], [409, XQ, 'js.qifu']],
  // 河西
  xiping: [...HEXI, [397, NL, 'js.tufa'], [414, XQ, 'js.qifu']],
  ledu: [...HEXI, [397, NL, 'js.tufa'], [414, XQ, 'js.qifu']],
  guzang: [...HEXI, [403, HQ, 'js.yaoxing'], [406, NL, 'js.tufa'], [412, BL, 'js.juqu']],
  rile: [...HEXI, [398, BL, 'js.juqu']],
  yongping: [...HEXI, [398, BL, 'js.juqu']],
  juyan: [...HEXI, [399, BL, 'est']],
  fulu: [...HEXI, [399, BL, 'est'], [401, XL, 'est']],
  dunhuang: [...HEXI, [397, BL, 'js.juqu'], [400, XL, 'js.lihao']],
  jinchang: [...HEXI, [397, BL, 'est'], [400, XL, 'js.lihao']],
  gaochang: [...HEXI, [397, BL, 'est'], [400, XL, 'est']],
  loulan: [[317, QL, 'js.zhanggui'], [376, 'dongjin_xiyuguo', 'est']],
  qiuci: [[317, 'dongjin_xiyuguo']], yutian: [[317, 'dongjin_xiyuguo']],
  // 仇池 (杨氏): ended by 前秦 (371), restored by 杨定 (385)
  chouchi: [[317, CC], [371, QQ, 'js.fujian'], [385, CC, 'est']],
  xiabian: [[317, CC, 'est'], [371, QQ, 'js.fujian'], [385, CC, 'est']],
  yinping: [[317, CC, 'est'], [371, QQ, 'js.fujian'], [385, CC, 'est']],
  // 巴蜀
  chengdu: SHU, luo: SHU, wuyang: SHU, guanghan: SHU, wenshan: SHU, hanjia: SHU, zitong: SHU, langzhong: SHU, dangqu: SHU,
  jiangzhou: SHU, jiangyang: SHU,
  fuling: [[317, CH], [347, J, 'js.mudi']],
  qiongdu: [[317, CH, 'est'], [347, J, 'js.mudi']],
  nanzheng: [[317, CH], [347, J, 'est'], [373, QQ, 'js.fujian'], [385, J, 'est'], [405, CC, 'est'], [413, J, 'est']],
  // 宁州: taken by 成 (333), back to Jin with the fall of 成汉
  zhuti: [[317, J], [333, CH, 'js.chengdi'], [347, J, 'est']],
  wei_jn: [[317, J], [333, CH, 'js.chengdi'], [347, J, 'est']],
  dianchi: [[317, J], [333, CH, 'js.chengdi'], [347, J, 'est']],
  yunnan: [[317, J], [333, CH, 'est'], [347, J, 'est']],
  yongchang: [[317, J], [333, CH, 'est'], [347, J, 'est']],
  wanwen: [[317, J], [333, CH, 'est'], [347, J, 'est']],
  // 荆州 north
  xiangyang: [[317, J], [330, HZ, 'zztj'], [332, J, 'est'], [379, QQ, 'js.fujian'], [384, J, 'est']],
  wan: NANYANG, luyang: NANYANG, xinye: NANYANG, nanxiang: NANYANG,
  xicheng: [[317, J], [379, QQ, 'js.fujian'], [384, J, 'est']],
  shangyong: [[317, J], [379, QQ, 'est'], [384, J, 'est']],
  // 河南, 淮北, 兖州, 青州
  luoyang: [[317, QZ], [325, HZ, 'js.shile'], [356, J, 'js.huanwen'], [365, QY, 'js.murongwei2'], [370, QQ, 'js.fujian'],
    [385, J, 'est'], [399, HQ, 'js.yaoxing'], [416, J, 'ss.wudi']],
  xingyang: [[317, J], [325, HZ, 'zztj'], [356, QY, 'est'], [370, QQ, 'js.fujian'], [385, J, 'est'], [399, HQ, 'est'], [416, J, 'ss.wudi']],
  chenliu: [[317, J], [325, HZ, 'est'], [356, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'est'], [399, HQ, 'est'], [416, J, 'ss.wudi']],
  yongqiu: [[317, J, 'js.zuti'], [325, HZ, 'est'], [356, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'est'], [399, HQ, 'est'], [416, J, 'ss.wudi']],
  xuchang: HENAN, xiangcheng: HENAN, chen: HENAN, xuanhu: HENAN,
  qiao: [[317, J, 'js.zuti'], [324, HZ, 'est'], [350, J, 'est'], [364, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan']],
  suiyang: [[317, J, 'js.zuti'], [325, HZ, 'est'], [350, J, 'est'], [364, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan']],
  ruyin: [[317, J], [329, HZ, 'est'], [350, J, 'est'], [364, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'est']],
  xinxi: [[317, J], [329, HZ, 'est'], [350, J, 'est']],
  shouchun: [[317, J], [329, HZ, 'js.chengdi'], [350, J, 'js.mudi']],
  pengcheng: HUAIBEI, xiapi: HUAIBEI, tan: HUAIBEI, xiang_pei: HUAIBEI,
  lu: [[317, J], [325, HZ, 'est'], [350, J, 'est'], [366, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan']],
  rencheng: [[317, J], [325, HZ, 'est'], [350, J, 'est'], [366, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan']],
  changyi: [[317, J], [325, HZ, 'est'], [350, J, 'est'], [366, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan']],
  dingtao: [[317, J], [325, HZ, 'est'], [356, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan']],
  puyang: [[317, HZ, 'est'], [352, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan'], [393, HY, 'est'], [398, NY, 'est'],
    [399, BW, 'est'], [416, J, 'ss.wudi']],
  juancheng: [[317, J], [322, HZ, 'est'], [356, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan'], [393, HY, 'est'],
    [398, NY, 'est'], [410, J, 'ss.wudi']],
  xuchang_dp: YANZHOU, lu_jb: YANZHOU, fenggao: YANZHOU,
  kaiyang: [[317, J], [323, HZ, 'est'], [350, J, 'est'], [359, QY, 'est'], [370, QQ, 'js.fujian'], [384, J, 'js.xiexuan'], [399, NY, 'est'],
    [410, J, 'ss.wudi']],
  linzi: QINGZHOU, guanggu: QINGZHOU, pingling: QINGZHOU, gaoyuan: QINGZHOU, ye_dl: QINGZHOU, buqi: QINGZHOU, ju: QINGZHOU,
  dongguan: QINGZHOU,
  // 交州: 林邑 takes 日南 (347)
  xijuan: [[317, J], [347, 'dongjin_linyi', 'js.siyi']],

  // neighbours
  mobei: [[317, 'xianbei'], [402, 'rouran', 'wss.ruru']],
  mobei_w: [[317, 'xianbei'], [402, 'rouran', 'wss.ruru']],
  fuyu: [[317, 'dongjin_fuyu']],
  baekje: [[317, 'dongjin_baekje']],
  silla: [[317, 'silla']],
  qiang_hh: [[317, 'tuyuhun', 'js.siyi']],
  qiang_zz: [[317, 'qiang']],
  linyi: [[317, 'dongjin_linyi']],
};

const P = (id: string, zh: string, en: string, color: string, role: 'rival' | 'neighbor' | 'protectorate' = 'rival') =>
  ({ id, name: { zh, en }, color, role });

export const DONGJIN: OwnEra = {
  replaces: 'dongjin',
  reach: 260,
  roles: { beiwei: 'rival' },
  polities: [
    P(QZ, '前赵', 'Former Zhao', '#8c3b3b'),
    P(HZ, '后赵', 'Later Zhao', '#8c5a3c'),
    P(CH, '成汉', 'Cheng Han', '#c98a2b'),
    P(QL, '前凉', 'Former Liang', '#8c6a4e'),
    P(QY, '前燕', 'Former Yan', '#5b7fa6'),
    P(DAI, '代（拓跋）', 'Dai (Tuoba)', '#6b5b95'),
    P(DUAN, '段部鲜卑', 'Duan Xianbei', '#8f8a76', 'neighbor'),
    P(HY, '后燕', 'Later Yan', '#4f86a8'),
    P(XY, '西燕', 'Western Yan', '#7fa3bf'),
    P(HQ, '后秦', 'Later Qin', '#7d6b5a'),
    P(XQ, '西秦', 'Western Qin', '#a0784a'),
    P(HL, '后凉', 'Later Liang', '#9a7b5f'),
    P(NL, '南凉', 'Southern Liang', '#b08e5e'),
    P(BL, '北凉', 'Northern Liang', '#8c6a4e'),
    P(XL, '西凉', 'Western Liang', '#a8946a'),
    P(NY, '南燕', 'Southern Yan', '#7a8f5a'),
    P(BY, '北燕', 'Northern Yan', '#5b7fa6'),
    P(XIA, '夏', 'Xia (Helian)', '#8c3b5a'),
    P(QS, '谯蜀（西蜀）', 'Qiao Shu (Western Shu)', '#b5803a'),
    P(CC, '仇池（杨氏）', 'Chouchi (Yang clan)', '#a08d6a', 'neighbor'),
    P('dongjin_fuyu', '夫余', 'Buyeo', '#b3b8ae', 'neighbor'),
    P('dongjin_baekje', '百济', 'Baekje', '#c2c8c4', 'neighbor'),
    P('dongjin_xiyuguo', '西域诸国', 'States of the Western Regions', '#c5b9a0', 'neighbor'),
    P('dongjin_linyi', '林邑', 'Linyi (Champa)', '#b5c0a8', 'neighbor'),
  ],
  seats,
  holds,
  phases: [
    { id: 'o_dongjin_1', from: 317, to: 322, at: 320, title: { zh: '晋室南渡，祖逖北伐（320年 · 两赵分据北方）', en: 'Jin moves south; Zu Ti fights north (320: two Zhao states share the north)' } },
    { id: 'o_dongjin_2', from: 323, to: 328, at: 326, title: { zh: '后赵南进（326年 · 取青州、河南，逼近淮水）', en: 'Later Zhao pushes south (326: Qingzhou and Henan taken, up to the Huai)' } },
    { id: 'o_dongjin_3', from: 329, to: 337, at: 333, title: { zh: '后赵灭前赵，独大北方（333年 · 前赵亡于329年）', en: 'Later Zhao ends Former Zhao and dominates the north (333: Former Zhao fell in 329)' } },
    { id: 'o_dongjin_4', from: 338, to: 346, at: 340, title: { zh: '前燕称王，代国再兴（340年 · 337年慕容皝称燕王，338年后赵灭段部）', en: 'Former Yan a kingdom, Dai revived (340: Murong Huang king of Yan from 337; Later Zhao ended the Duan in 338)' } },
    { id: 'o_dongjin_5', from: 347, to: 351, at: 349, title: { zh: '桓温灭成汉之后（349年 · 成汉亡于347年，东晋复有巴蜀）', en: 'After Huan Wen ends Cheng Han (349: Cheng Han fell in 347; Jin holds Ba and Shu again)' } },
    { id: 'o_dongjin_6', from: 352, to: 363, at: 358, title: { zh: '前燕、前秦东西并立（358年 · 桓温356年收复洛阳）', en: 'Former Yan in the east, Former Qin in the west (358: Huan Wen retook Luoyang in 356)' } },
    { id: 'o_dongjin_7', from: 364, to: 369, at: 367, title: { zh: '前燕极盛（367年 · 364–365年取许昌、洛阳）', en: 'Former Yan at its height (367: Xuchang and Luoyang taken in 364–365)' } },
    { id: 'o_dongjin_8', from: 370, to: 375, at: 374, title: { zh: '前秦灭前燕，取梁、益（374年 · 370年灭燕，373年取梁、益）', en: 'Former Qin ends Former Yan and takes Liang and Yi (374: Yan ended in 370, Liang and Yi taken in 373)' } },
    { id: 'o_dongjin_9', from: 376, to: 383, at: 380, title: { zh: '前秦统一北方（380年 · 376年灭前凉、代国；淝水之战前）', en: 'Former Qin unites the north (380: Former Liang and Dai ended in 376; before the battle of the Fei River)' } },
    { id: 'o_dongjin_10', from: 384, to: 389, at: 387, title: { zh: '淝水战后北方重裂（387年 · 后燕、后秦、西燕、北魏、后凉、西秦）', en: 'The north breaks up after the Fei River (387: Later Yan, Later Qin, Western Yan, Northern Wei, Later Liang, Western Qin)' } },
    { id: 'o_dongjin_11', from: 390, to: 397, at: 395, title: { zh: '后燕并西燕，后秦灭前秦（395年 · 二事皆在394年；参合陂之战）', en: 'Later Yan absorbs Western Yan, Later Qin ends Former Qin (395: both in 394; the battle of Canhe)' } },
    { id: 'o_dongjin_12', from: 398, to: 404, at: 400, title: { zh: '北魏入主河北，南燕据青齐（400年 · 河西五凉）', en: 'Northern Wei takes the Hebei plain, Southern Yan holds Qi (400: the Liang states of the Hexi)' } },
    { id: 'o_dongjin_13', from: 405, to: 409, at: 407, title: { zh: '夏、北燕兴起，谯纵据蜀（407年）', en: 'Xia and Northern Yan rise; Qiao Zong holds Shu (407)' } },
    { id: 'o_dongjin_14', from: 410, to: 416, at: 414, title: { zh: '刘裕灭南燕，收复巴蜀（414年 · 410年灭南燕，413年收蜀）', en: 'Liu Yu ends Southern Yan and retakes Shu (414: Southern Yan ended in 410, Shu retaken in 413)' } },
    { id: 'o_dongjin_15', from: 417, to: 420, at: 417, title: { zh: '刘裕灭后秦，收复洛阳、长安（417年）', en: 'Liu Yu ends Later Qin, retaking Luoyang and Chang’an (417)' } },
  ],
  sources: {
    'js.yuandi': { zh: '《晋书·元帝纪》', en: 'Jin shu, Annals of Emperor Yuan' },
    'js.chengdi': { zh: '《晋书·成帝纪》', en: 'Jin shu, Annals of Emperor Cheng' },
    'js.mudi': { zh: '《晋书·穆帝纪》', en: 'Jin shu, Annals of Emperor Mu' },
    'js.andi': { zh: '《晋书·安帝纪》', en: 'Jin shu, Annals of Emperor An' },
    'js.zuti': { zh: '《晋书·祖逖传》', en: 'Jin shu, Biography of Zu Ti' },
    'js.huanwen': { zh: '《晋书·桓温传》', en: 'Jin shu, Biography of Huan Wen' },
    'js.xiexuan': { zh: '《晋书·谢玄传》', en: 'Jin shu, Biography of Xie Xuan' },
    'js.zhanggui': { zh: '《晋书·张轨传》（附张寔、张骏、张天锡）', en: 'Jin shu, Biography of Zhang Gui (with his successors)' },
    'js.lihao': { zh: '《晋书·凉武昭王李玄盛传》', en: 'Jin shu, Biography of Li Hao, King Wuzhao of Liang' },
    'js.qiaozong': { zh: '《晋书·谯纵传》', en: 'Jin shu, Biography of Qiao Zong' },
    'js.siyi': { zh: '《晋书·四夷传》', en: 'Jin shu, Accounts of the Four Barbarians' },
    'js.liucong': { zh: '《晋书·刘聪载记》', en: 'Jin shu, Record of Liu Cong' },
    'js.liuyao': { zh: '《晋书·刘曜载记》', en: 'Jin shu, Record of Liu Yao' },
    'js.shile': { zh: '《晋书·石勒载记》', en: 'Jin shu, Record of Shi Le' },
    'js.shihu': { zh: '《晋书·石季龙载记》', en: 'Jin shu, Record of Shi Hu' },
    'js.murongwei': { zh: '《晋书·慕容廆载记》', en: 'Jin shu, Record of Murong Hui' },
    'js.muronghuang': { zh: '《晋书·慕容皝载记》', en: 'Jin shu, Record of Murong Huang' },
    'js.murongjun': { zh: '《晋书·慕容儁载记》', en: 'Jin shu, Record of Murong Jun' },
    'js.murongwei2': { zh: '《晋书·慕容暐载记》', en: 'Jin shu, Record of Murong Wei' },
    'js.fujiansj': { zh: '《晋书·苻健载记》', en: 'Jin shu, Record of Fu Jian (founder)' },
    'js.fujian': { zh: '《晋书·苻坚载记》', en: 'Jin shu, Record of Fu Jian' },
    'js.murongchui': { zh: '《晋书·慕容垂载记》', en: 'Jin shu, Record of Murong Chui' },
    'js.murongde': { zh: '《晋书·慕容德载记》', en: 'Jin shu, Record of Murong De' },
    'js.yaochang': { zh: '《晋书·姚苌载记》', en: 'Jin shu, Record of Yao Chang' },
    'js.yaoxing': { zh: '《晋书·姚兴载记》', en: 'Jin shu, Record of Yao Xing' },
    'js.qifu': { zh: '《晋书·乞伏国仁载记》（附乞伏乾归、乞伏炽磐）', en: 'Jin shu, Record of Qifu Guoren (with Qiangui and Chipan)' },
    'js.lvguang': { zh: '《晋书·吕光载记》', en: 'Jin shu, Record of Lü Guang' },
    'js.tufa': { zh: '《晋书·秃发乌孤载记》（附利鹿孤、傉檀）', en: 'Jin shu, Record of Tufa Wugu (with Lilugu and Rutan)' },
    'js.juqu': { zh: '《晋书·沮渠蒙逊载记》', en: 'Jin shu, Record of Juqu Mengxun' },
    'js.helian': { zh: '《晋书·赫连勃勃载记》', en: 'Jin shu, Record of Helian Bobo' },
    'js.fengba': { zh: '《晋书·冯跋载记》', en: 'Jin shu, Record of Feng Ba' },
    'wss.taizu': { zh: '《魏书·太祖纪》', en: 'Wei shu, Annals of Taizu' },
    'wss.ruru': { zh: '《魏书·蠕蠕传》', en: 'Wei shu, Account of the Rouran' },
    'ss.wudi': { zh: '《宋书·武帝纪》', en: 'Song shu, Annals of Emperor Wu' },
    zztj: { zh: '《资治通鉴》', en: 'Zizhi tongjian' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
