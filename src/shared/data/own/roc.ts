import type { Hold, OwnEra, Seat } from './types.ts';

/**
 * 中华民国 (1912–1949): seats and holdings for our own Republican maps. Seats are the provincial capitals and the main
 * cities and 道 seats that the warlord cliques, the governments in Guangzhou and Nanjing and the Japanese invaders held,
 * plus the frontier seats of 新疆, 西藏, 西康, 青海 and 外蒙古, at their modern sites. Changes of hands cite 李新总编
 * 《中华民国史》 (or the treaty); `est` marks a date we infer.
 *
 * Positions follow the national history textbook: 台湾 is Chinese territory occupied by Japan until 1945; 西藏 and 新疆
 * are part of the Republic throughout; 外蒙古 is part of China until it breaks away with Soviet backing (1921; the
 * 蒙古人民共和国 1924) and is recognised as independent by the Chinese government in January 1946; 唐努乌梁海 is
 * Chinese territory under Russian and Soviet control from 1914 and annexed by the Soviet Union in 1944. The areas the
 * Japanese army seized are `jp_occ` (puppet regimes included), the puppet 伪满洲国 is drawn on its own. No maritime
 * lines are drawn.
 */
const seats: Seat[] = [];
const holds: Record<string, Hold[]> = {};
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, h: Hold[], o: Partial<Seat> = {}): void => {
  seats.push({ id, name: { zh, en }, at: [lon, lat], modern, ...o });
  holds[id] = h;
};

const R = 'roc', AH = 'roc_anhui', ZL = 'roc_zhili', FT = 'roc_fengxi', JX = 'roc_jinxi', HF = 'roc_hufa', XN = 'roc_xinan';
const WS = 'roc_wusheng', GJ = 'roc_guominjun', GM = 'roc_guomin', JO = 'jp_occ', MZ = 'roc_manzhou', WM = 'roc_waimeng';
const UK = 'colony_uk', PT = 'colony_pt', JT = 'jp_taiwan', RU = 'russia', SU = 'ussr', JP = 'japan';
const z = 'zhmgs';

/** seized by the Japanese army in `y`, recovered at the victory of 1945 */
const occ = (y: number): Hold[] => [[y, JO, z], [1945, R, z]];

// The clique that held each region, phase by phase (1916 Yuan Shikai dies; 1917 护法; 1920 直皖战争; 1922 第一次直奉战争;
// 1924 第二次直奉战争 and the 北京政变; 1925 五省联军; 1926–28 北伐; December 1928 东北易帜).
const BJ: Hold[] = [[1912, R], [1916, AH, z], [1920, ZL, z], [1924, GJ, z], [1926, FT, z], [1928, R, z]];
const TJ: Hold[] = [[1912, R], [1917, ZL, z], [1924, FT, z], [1925, GJ, z], [1926, FT, z], [1928, R, z]];
const ZLI: Hold[] = [[1912, R], [1917, ZL, z], [1925, GJ, 'est'], [1926, FT, z], [1928, R, z]];
const RH: Hold[] = [[1912, R], [1922, FT, 'est'], [1928, R, z], [1933, MZ, z], [1945, R, z]];
const CH: Hold[] = [[1912, R], [1916, AH, 'est'], [1920, ZL, z], [1924, GJ, z], [1926, FT, z], [1928, R, z]];
const SY: Hold[] = [[1912, R], [1916, AH, 'est'], [1920, ZL, 'est'], [1924, GJ, z], [1926, JX, z], [1927, GM, z], [1928, R, z]];
const SD: Hold[] = [[1912, R], [1916, AH, 'est'], [1920, ZL, z], [1925, FT, z], [1928, R, z]];
const SX: Hold[] = [[1912, R], [1917, JX, z], [1927, GM, z], [1928, R, z]];
const HN: Hold[] = [[1912, R], [1916, AH, 'est'], [1920, ZL, z], [1924, GJ, z], [1926, ZL, z], [1927, GM, z], [1928, R, z]];
const SN: Hold[] = [[1912, R], [1916, AH, z], [1921, ZL, z], [1925, GJ, z], [1927, GM, z], [1928, R, z]];
const GS: Hold[] = [[1912, R], [1925, GJ, z], [1927, GM, z], [1928, R, z]];
const W: Hold[] = [[1912, R]];
const SC: Hold[] = [[1912, R], [1917, HF, z], [1920, XN, z], [1926, GM, z], [1928, R, z]];
const YG: Hold[] = [[1912, R], [1917, HF, z], [1920, XN, 'est'], [1927, GM, z], [1928, R, z]];
const GX: Hold[] = [[1912, R], [1917, HF, z], [1921, XN, 'est'], [1926, GM, z], [1928, R, z]];
const GD: Hold[] = [[1912, R], [1917, HF, z], [1923, GM, z], [1928, R, z]];
const GDE: Hold[] = [[1912, R], [1917, HF, z], [1922, XN, z], [1925, GM, z], [1928, R, z]];
const GDS: Hold[] = [[1912, R], [1917, HF, z], [1923, XN, 'est'], [1926, GM, z], [1928, R, z]];
const HUN: Hold[] = [[1912, R], [1917, AH, z], [1920, XN, z], [1926, GM, z], [1928, R, z]];
const HUS: Hold[] = [[1912, R], [1917, HF, z], [1920, XN, z], [1926, GM, z], [1928, R, z]];
const HB: Hold[] = [[1912, R], [1917, ZL, z], [1926, GM, z], [1928, R, z]];
const JXI: Hold[] = [[1912, R], [1917, ZL, z], [1925, WS, z], [1926, GM, z], [1928, R, z]];
const ZJ: Hold[] = [[1912, R], [1916, AH, z], [1924, ZL, z], [1925, WS, z], [1927, GM, z], [1928, R, z]];
const JS: Hold[] = [[1912, R], [1917, ZL, z], [1925, WS, z], [1927, GM, z], [1928, R, z]];
const AHU: Hold[] = [[1912, R], [1916, AH, z], [1920, ZL, z], [1925, WS, z], [1927, GM, z], [1928, R, z]];
const FJ: Hold[] = [[1912, R], [1916, AH, z], [1923, ZL, 'est'], [1925, WS, z], [1926, GM, z], [1928, R, z]];
/** 东三省: 奉系 from `f`, 东北易帜 1928, seized by the Japanese army in `y` (九一八), 伪满洲国 from 1932 */
const DB = (f: number, y: number): Hold[] => [[1912, R], [f, FT, z], [1928, R, z], ...(y === 1931 ? [[1931, JO, z] as Hold] : []), [1932, MZ, z], [1945, R, z]];
const TW: Hold[] = [[1912, JT], [1945, R, 'decl']];
const WMG: Hold[] = [[1912, R], [1921, WM, z], [1946, 'mongolia', 'treaty.zhongsu']];
const RS: Hold[] = [[1912, RU], [1922, SU, 'ussr1922']];

// ── 京兆 · 直隶（河北）· 热河 · 察哈尔 · 绥远 ──────────────────────────────────────────────────────────────────────────
S('beijing', '北京（北平）', 'Beijing (Beiping)', 116.40, 39.90, '北京', [...BJ, ...occ(1937)], { b: 60 });
S('tianjin', '天津', 'Tianjin', 117.20, 39.13, '天津', [...TJ, ...occ(1937)]);
S('baoding', '保定', 'Baoding', 115.46, 38.87, '河北保定', [...ZLI, ...occ(1937)]);
S('shijiazhuang', '石家庄（正定）', 'Shijiazhuang (Zhengding)', 114.51, 38.04, '河北石家庄', [...ZLI, ...occ(1937)]);
S('xingtai', '顺德（邢台）', 'Shunde (Xingtai)', 114.50, 37.07, '河北邢台', [...ZLI, ...occ(1937)]);
S('daming', '大名', 'Daming', 115.15, 36.28, '河北大名', [...ZLI, ...occ(1938)]);
S('tangshan', '唐山', 'Tangshan', 118.18, 39.63, '河北唐山', [[1912, R], [1917, ZL, z], [1924, FT, z], [1928, R, z], ...occ(1935)]);
S('chengde', '承德', 'Chengde', 117.93, 40.97, '河北承德', RH);
S('chifeng', '赤峰', 'Chifeng', 118.95, 42.27, '内蒙古赤峰', RH, { r: 380 });
S('chaoyang', '朝阳', 'Chaoyang', 120.45, 41.57, '辽宁朝阳', RH);
S('zhangjiakou', '张家口（万全）', 'Zhangjiakou (Kalgan)', 114.88, 40.82, '河北张家口', [...CH, ...occ(1937)]);
S('zhangbei', '张北', 'Zhangbei', 114.70, 41.15, '河北张北', [...CH, ...occ(1936)], { r: 250 });
S('duolun', '多伦', 'Dolon Nor', 116.47, 42.20, '内蒙古多伦', [...CH, ...occ(1936)], { r: 300 });
S('xilinhot', '锡林郭勒', 'Shilingol', 116.08, 43.95, '内蒙古锡林浩特', [...CH, ...occ(1936)], { r: 520 });
S('guisui', '归绥', 'Guisui', 111.65, 40.82, '内蒙古呼和浩特', [...SY, ...occ(1937)], { r: 350 });
S('baotou', '包头', 'Baotou', 109.84, 40.65, '内蒙古包头', [...SY, ...occ(1937)], { r: 320 });
S('jining', '集宁（乌兰察布）', 'Jining (Ulaan Chab)', 113.13, 41.03, '内蒙古乌兰察布', [...SY, ...occ(1937)], { r: 400 });
S('siziwang', '乌兰察布盟（四子王旗）', 'Ulaan Chab league', 111.70, 41.53, '内蒙古四子王旗', [...SY, ...occ(1937)], { r: 500 });
S('wuyuan', '五原（绥西）', 'Wuyuan (western Suiyuan)', 108.27, 41.10, '内蒙古五原', SY, { r: 400 });
S('ordos', '伊克昭盟（鄂尔多斯）', 'Ikh Juu league (Ordos)', 109.73, 39.57, '内蒙古伊金霍洛', SY, { r: 420 });
// ── 山东 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('jinan', '济南', 'Jinan', 117.00, 36.67, '山东济南', [...SD, ...occ(1937)], { b: 20 });
S('dezhou', '德州', 'Dezhou', 116.36, 37.44, '山东德州', [...SD, ...occ(1937)]);
S('weixian', '潍县', 'Weixian', 119.16, 36.71, '山东潍坊', [...SD, ...occ(1938)]);
S('yantai', '烟台', 'Yantai (Chefoo)', 121.39, 37.54, '山东烟台', [...SD, ...occ(1938)]);
S('jining_sd', '济宁', 'Jining', 116.59, 35.41, '山东济宁', [...SD, ...occ(1938)]);
S('linyi', '临沂', 'Linyi', 118.35, 35.05, '山东临沂', [...SD, ...occ(1938)]);
S('heze', '菏泽', 'Heze', 115.48, 35.24, '山东菏泽', [...SD, ...occ(1938)]);
S('qingdao', '青岛（胶澳）', 'Qingdao (Jiao’ao)', 120.38, 36.07, '山东青岛',
  [[1912, 'roc_jiaoao'], [1914, JO, z], [1922, R, 'treaty.shandong'], [1925, FT, z], [1928, R, z], ...occ(1938)], { r: 35 });
S('weihai', '威海卫', 'Weihaiwei', 122.12, 37.50, '山东威海', [[1912, 'roc_weihai'], [1930, R, 'treaty.weihai'], ...occ(1938)], { r: 35 });
// ── 山西 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('taiyuan', '太原', 'Taiyuan', 112.55, 37.87, '山西太原', [...SX, ...occ(1937)], { b: 20 });
S('datong', '大同', 'Datong', 113.30, 40.08, '山西大同', [...SX, ...occ(1937)]);
S('xinzhou', '忻县', 'Xinxian', 112.73, 38.42, '山西忻州', [...SX, ...occ(1937)]);
S('linfen', '临汾', 'Linfen', 111.52, 36.08, '山西临汾', [...SX, ...occ(1938)]);
S('changzhi', '长治', 'Changzhi', 113.10, 36.20, '山西长治', [...SX, ...occ(1938)]);
S('yuncheng', '运城', 'Yuncheng', 111.00, 35.03, '山西运城', [...SX, ...occ(1938)]);
S('jixian', '吉县（克难坡）', 'Jixian (Kenanpo)', 110.68, 36.10, '山西吉县', SX, { r: 200 });
// ── 河南 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('kaifeng', '开封', 'Kaifeng', 114.35, 34.80, '河南开封', [...HN, ...occ(1938)], { b: 15 });
S('zhengzhou', '郑州', 'Zhengzhou', 113.65, 34.75, '河南郑州', [...HN, ...occ(1944)]);
S('luoyang', '洛阳', 'Luoyang', 112.45, 34.62, '河南洛阳', [...HN, ...occ(1944)]);
S('anyang', '安阳', 'Anyang', 114.38, 36.10, '河南安阳', [...HN, ...occ(1937)]);
S('xinxiang', '新乡', 'Xinxiang', 113.93, 35.30, '河南新乡', [...HN, ...occ(1938)]);
S('shangqiu', '商丘', 'Shangqiu', 115.65, 34.42, '河南商丘', [...HN, ...occ(1938)]);
S('xuchang', '许昌', 'Xuchang', 113.85, 34.03, '河南许昌', [...HN, ...occ(1944)]);
S('nanyang', '南阳', 'Nanyang', 112.53, 33.00, '河南南阳', HN);
S('xinyang', '信阳', 'Xinyang', 114.07, 32.13, '河南信阳', [...HN, ...occ(1938)]);
S('zhoukou', '淮阳（周口）', 'Huaiyang (Zhoukou)', 114.88, 33.73, '河南淮阳', HN);
// ── 陕西 · 甘肃 · 宁夏 · 青海 ──────────────────────────────────────────────────────────────────────────────────────
S('xian', '西安', 'Xi’an', 108.94, 34.27, '陕西西安', SN, { b: 30 });
S('baoji', '宝鸡', 'Baoji', 107.15, 34.36, '陕西宝鸡', SN);
S('hanzhong', '汉中（南郑）', 'Hanzhong', 107.03, 33.07, '陕西汉中', SN);
S('ankang', '安康', 'Ankang', 109.03, 32.68, '陕西安康', SN);
S('yanan', '延安（肤施）', 'Yan’an (Fushi)', 109.49, 36.60, '陕西延安', SN);
S('yulin', '榆林', 'Yulin', 109.74, 38.29, '陕西榆林', SN, { r: 320 });
S('lanzhou', '兰州（皋兰）', 'Lanzhou (Gaolan)', 103.83, 36.06, '甘肃兰州', GS, { b: 15 });
S('tianshui', '天水', 'Tianshui', 105.72, 34.58, '甘肃天水', GS);
S('pingliang', '平凉', 'Pingliang', 106.68, 35.54, '甘肃平凉', GS);
S('qingyang', '庆阳', 'Qingyang', 107.64, 35.73, '甘肃庆阳', GS);
S('wudu', '武都', 'Wudu', 104.92, 33.39, '甘肃陇南武都', GS);
S('linxia', '导河（临夏）', 'Daohe (Linxia)', 103.21, 35.60, '甘肃临夏', GS);
S('wuwei', '武威', 'Wuwei', 102.64, 37.93, '甘肃武威', GS, { r: 380 });
S('zhangye', '张掖', 'Zhangye', 100.45, 38.93, '甘肃张掖', GS, { r: 420 });
S('jiuquan', '酒泉', 'Jiuquan', 98.50, 39.74, '甘肃酒泉', GS, { r: 480 });
S('dunhuang', '敦煌', 'Dunhuang', 94.66, 40.14, '甘肃敦煌', GS, { r: 550 });
S('yinchuan', '宁夏（银川）', 'Ningxia (Yinchuan)', 106.27, 38.47, '宁夏银川', GS, { r: 380 });
S('zhongwei', '中卫', 'Zhongwei', 105.19, 37.51, '宁夏中卫', GS);
S('alxa', '阿拉善（定远营）', 'Alxa (Dingyuanying)', 105.68, 38.83, '内蒙古阿拉善左旗', GS, { r: 800 });
S('ejin', '额济纳', 'Ejin', 101.06, 41.96, '内蒙古额济纳旗', GS, { r: 750 });
S('xining', '西宁', 'Xining', 101.78, 36.62, '青海西宁', W, { r: 300 });
S('haiyan', '青海湖（海晏）', 'Kokonor (Haiyan)', 100.99, 36.90, '青海海晏', W, { r: 650 });
S('dulan', '都兰', 'Dulan', 98.10, 36.30, '青海都兰', W, { r: 1400 });
S('golmud', '格尔木', 'Golmud', 94.90, 36.40, '青海格尔木', W, { r: 1500 });
S('yushu', '玉树', 'Yushu', 97.01, 33.00, '青海玉树', W, { r: 1200 });
S('tuotuohe', '沱沱河', 'Tuotuo river', 92.44, 34.22, '青海格尔木唐古拉山镇', W, { r: 1800 });
S('golog', '果洛', 'Golog', 100.24, 34.47, '青海玛沁', W, { r: 700 });
S('henan_qh', '河南蒙旗', 'Henan Mongol banner', 101.61, 34.73, '青海河南', W, { r: 550 });
// ── 新疆 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('dihua', '迪化', 'Dihua (Ürümqi)', 87.62, 43.82, '新疆乌鲁木齐', W, { r: 450, b: 10 });
S('yining', '伊宁（伊犁）', 'Yining (Ili)', 81.32, 43.92, '新疆伊宁', W, { r: 600 });
S('tacheng', '塔城', 'Tacheng (Chuguchak)', 82.98, 46.75, '新疆塔城', W, { r: 550 });
S('altay', '承化（阿山）', 'Chenghua (Altay)', 88.13, 47.85, '新疆阿勒泰', W, { r: 600 });
S('wusu', '乌苏', 'Wusu', 84.68, 44.43, '新疆乌苏', W, { r: 350 });
S('jinghe', '精河', 'Jinghe', 82.89, 44.60, '新疆精河', W, { r: 250 });
S('qitai', '奇台', 'Qitai', 89.59, 44.01, '新疆奇台', W, { r: 400 });
S('hami', '哈密', 'Hami', 93.51, 42.82, '新疆哈密', W, { r: 450 });
S('barkol', '镇西（巴里坤）', 'Zhenxi (Barkol)', 93.01, 43.60, '新疆巴里坤', W, { r: 400 });
S('turpan', '吐鲁番', 'Turpan', 89.19, 42.95, '新疆吐鲁番', W, { r: 400 });
S('yanqi', '焉耆', 'Yanqi (Karashahr)', 86.57, 42.06, '新疆焉耆', W, { r: 500 });
S('kuqa', '库车', 'Kuqa', 82.96, 41.72, '新疆库车', W, { r: 450 });
S('aksu', '阿克苏', 'Aksu', 80.26, 41.17, '新疆阿克苏', W, { r: 450 });
S('wushi', '乌什', 'Uqturpan', 79.22, 41.21, '新疆乌什', W, { r: 300 });
S('kashgar', '疏附（喀什）', 'Shufu (Kashgar)', 75.99, 39.47, '新疆喀什', W, { r: 500, b: 10 });
S('yarkand', '莎车', 'Yarkand', 77.24, 38.41, '新疆莎车', W, { r: 550 });
S('khotan', '和阗', 'Khotan', 79.92, 37.11, '新疆和田', W, { r: 700 });
S('keriya', '于阗', 'Keriya', 81.67, 36.86, '新疆于田', W, { r: 1200 });
S('xaidulla', '赛图拉', 'Shahidulla', 78.00, 36.40, '新疆皮山赛图拉', W, { r: 1100 });
S('qiemo', '且末', 'Qiemo (Cherchen)', 85.53, 38.14, '新疆且末', W, { r: 1300 });
S('ruoqiang', '婼羌', 'Ruoqiang (Charklik)', 88.17, 39.03, '新疆若羌', W, { r: 1500 });
S('puli', '蒲犁', 'Puli (Tashkurgan)', 75.23, 37.77, '新疆塔什库尔干', W, { r: 400 });
// ── 西藏 · 西康 ──────────────────────────────────────────────────────────────────────────────────────────────────────
S('lhasa', '拉萨', 'Lhasa', 91.13, 29.65, '西藏拉萨', W, { r: 1500, b: 40 });
S('shigatse', '日喀则', 'Shigatse', 88.88, 29.27, '西藏日喀则', W, { r: 1300 });
S('dingri', '定日', 'Dingri', 87.12, 28.66, '西藏定日', W, { r: 900 });
S('cona', '错那', 'Cona', 91.96, 27.99, '西藏错那', W, { r: 700 });
S('dawang', '达旺（门隅）', 'Tawang (Monyul)', 91.86, 27.59, '西藏错那达旺', W, { r: 350 });
S('nyingchi', '工布', 'Kongpo', 94.36, 29.65, '西藏林芝', W, { r: 900 });
S('motuo', '墨脱（珞瑜）', 'Mêdog (Lhoyul)', 95.33, 29.33, '西藏墨脱', W, { r: 450 });
S('zayu', '察隅', 'Zayü', 97.47, 28.66, '西藏察隅', W, { r: 700 });
S('nagqu', '那曲', 'Nagqu', 92.05, 31.48, '西藏那曲', W, { r: 1800 });
S('shuanghu', '羌塘（双湖）', 'Changtang (Shuanghu)', 88.83, 33.19, '西藏双湖', W, { r: 2200 });
S('gerze', '改则', 'Gêrzê', 84.06, 32.30, '西藏改则', W, { r: 2200 });
S('gartok', '噶大克（阿里）', 'Gartok (Ngari)', 80.10, 31.75, '西藏噶尔', W, { r: 1800 });
S('rutog', '日土', 'Rutog', 79.72, 33.38, '西藏日土', W, { r: 1300 });
S('qamdo', '昌都', 'Qamdo', 97.18, 31.14, '西藏昌都', W, { r: 900 });
S('kangding', '康定（打箭炉）', 'Kangding (Dartsedo)', 101.96, 30.05, '四川康定', W, { r: 380 });
S('litang', '理化（理塘）', 'Lihua (Litang)', 100.27, 30.00, '四川理塘', W, { r: 500 });
S('batang', '巴安（巴塘）', 'Ba’an (Batang)', 99.10, 30.00, '四川巴塘', W, { r: 500 });
S('ganzi', '甘孜', 'Garzê', 99.99, 31.62, '四川甘孜', W, { r: 550 });
S('dege', '德格', 'Dêgê', 98.58, 31.80, '四川德格', W, { r: 550 });
S('xichang', '西昌', 'Xichang', 102.26, 27.89, '四川西昌', SC, { r: 340 });
S('yaan', '雅安', 'Ya’an', 103.00, 29.98, '四川雅安', SC);
// ── 四川 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('chengdu', '成都', 'Chengdu', 104.07, 30.67, '四川成都', SC, { b: 30, r: 340 });
S('chongqing', '重庆', 'Chongqing', 106.55, 29.56, '重庆', SC, { b: 20 });
S('yibin', '宜宾', 'Yibin', 104.63, 28.76, '四川宜宾', SC);
S('luzhou', '泸县', 'Luxian (Luzhou)', 105.44, 28.87, '四川泸州', SC);
S('leshan', '乐山', 'Leshan', 103.76, 29.55, '四川乐山', SC);
S('nanchong', '南充', 'Nanchong', 106.08, 30.80, '四川南充', SC);
S('langzhong', '阆中', 'Langzhong', 105.98, 31.58, '四川阆中', SC);
S('mianyang', '绵阳', 'Mianyang', 104.68, 31.47, '四川绵阳', SC);
S('guangyuan', '广元', 'Guangyuan', 105.84, 32.44, '四川广元', SC);
S('dazhou', '达县', 'Daxian', 107.50, 31.21, '四川达州', SC);
S('wanxian', '万县', 'Wanxian', 108.38, 30.81, '重庆万州', SC);
S('fengjie', '奉节', 'Fengjie', 109.46, 31.02, '重庆奉节', SC);
S('youyang', '酉阳', 'Youyang', 108.77, 28.84, '重庆酉阳', SC);
S('songpan', '松潘', 'Songpan', 103.60, 32.64, '四川松潘', SC, { r: 340 });
S('lixian', '理番', 'Lifan', 103.17, 31.43, '四川理县', SC);
S('aba', '阿坝', 'Ngawa', 101.71, 32.90, '四川阿坝', W, { r: 550 });
S('maogong', '懋功', 'Maogong', 102.36, 31.00, '四川小金', SC);
S('zhuokeji', '卓克基', 'Zhuokeji', 102.21, 31.90, '四川马尔康', SC);
S('daofu', '道孚', 'Dawu', 101.12, 30.98, '四川道孚', W, { r: 450 });
S('pingwu', '平武', 'Pingwu', 104.53, 32.41, '四川平武', SC);
// ── 云南 · 贵州 ──────────────────────────────────────────────────────────────────────────────────────────────────────
S('kunming', '昆明', 'Kunming', 102.71, 25.04, '云南昆明', YG, { b: 30 });
S('dali', '大理', 'Dali', 100.23, 25.60, '云南大理', YG);
S('chuxiong', '楚雄', 'Chuxiong', 101.54, 25.04, '云南楚雄', YG);
S('mengzi', '蒙自', 'Mengzi', 103.39, 23.37, '云南蒙自', YG);
S('wenshan', '文山（开化）', 'Wenshan (Kaihua)', 104.24, 23.37, '云南文山', YG);
S('guangnan', '广南', 'Guangnan', 105.06, 24.05, '云南广南', YG);
S('qujing', '曲靖', 'Qujing', 103.80, 25.50, '云南曲靖', YG);
S('zhaotong', '昭通', 'Zhaotong', 103.72, 27.34, '云南昭通', YG);
S('baoshan', '保山', 'Baoshan', 99.16, 25.11, '云南保山', YG);
S('tengchong', '腾冲', 'Tengchong', 98.49, 25.02, '云南腾冲', YG, { r: 250 });
S('fengqing', '顺宁（凤庆）', 'Shunning (Fengqing)', 99.92, 24.59, '云南凤庆', YG);
S('puer', '宁洱（普洱）', 'Ning’er (Pu’er)', 101.04, 23.06, '云南宁洱', YG, { r: 320 });
S('jinghong', '车里（景洪）', 'Cheli (Jinghong)', 100.80, 22.00, '云南景洪', YG, { r: 260 });
S('yuanjiang', '元江', 'Yuanjiang', 101.99, 23.60, '云南元江', YG);
S('lijiang', '丽江', 'Lijiang', 100.23, 26.87, '云南丽江', YG, { r: 320 });
S('zhongdian', '中甸', 'Zhongdian', 99.70, 27.83, '云南香格里拉', YG, { r: 380 });
S('weixi', '维西', 'Weixi', 99.29, 27.18, '云南维西', YG, { r: 300 });
S('guiyang', '贵阳', 'Guiyang', 106.71, 26.58, '贵州贵阳', YG, { b: 15 });
S('zunyi', '遵义', 'Zunyi', 106.93, 27.73, '贵州遵义', YG);
S('anshun', '安顺', 'Anshun', 105.95, 26.25, '贵州安顺', YG);
S('bijie', '毕节（大定）', 'Bijie (Dading)', 105.29, 27.30, '贵州毕节', YG);
S('weining', '威宁', 'Weining', 104.28, 26.87, '贵州威宁', YG);
S('xingyi', '兴义', 'Xingyi', 104.90, 25.09, '贵州兴义', YG);
S('duyun', '都匀', 'Duyun', 107.52, 26.26, '贵州都匀', YG);
S('zhenyuan', '镇远', 'Zhenyuan', 108.43, 27.05, '贵州镇远', YG);
S('tongren', '铜仁', 'Tongren', 109.19, 27.72, '贵州铜仁', YG);
S('sinan', '思南', 'Sinan', 108.25, 27.94, '贵州思南', YG);
S('rongjiang', '榕江', 'Rongjiang', 108.52, 25.93, '贵州榕江', YG);
S('liping', '黎平', 'Liping', 109.14, 26.23, '贵州黎平', YG);
// ── 广西 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('guilin', '桂林', 'Guilin', 110.29, 25.28, '广西桂林', [...GX, ...occ(1944)], { b: 15 });
S('nanning', '南宁', 'Nanning', 108.37, 22.82, '广西南宁', [...GX, [1939, JO, z], [1940, R, z], ...occ(1944)]);
S('liuzhou', '柳州', 'Liuzhou', 109.41, 24.33, '广西柳州', [...GX, ...occ(1944)]);
S('wuzhou', '梧州', 'Wuzhou', 111.28, 23.48, '广西梧州', [...GX, ...occ(1944)]);
S('pingle', '平乐', 'Pingle', 110.64, 24.63, '广西平乐', GX);
S('guiping', '桂平', 'Guiping', 110.08, 23.39, '广西桂平', GX);
S('yulin_gx', '郁林', 'Yulin', 110.15, 22.63, '广西玉林', GX);
S('yishan', '宜山', 'Yishan', 108.65, 24.49, '广西宜州', GX);
S('baise', '百色', 'Baise', 106.62, 23.90, '广西百色', GX);
S('longzhou', '龙州', 'Longzhou', 106.85, 22.35, '广西龙州', GX);
S('debao', '镇边（德保）', 'Debao', 106.62, 23.33, '广西德保', GX);
S('lingyun', '凌云', 'Lingyun', 106.56, 24.35, '广西凌云', GX);
S('beihai', '合浦（北海）', 'Hepu (Beihai)', 109.20, 21.66, '广西合浦', GDS);
// ── 广东 · 海南 · 港澳 ──────────────────────────────────────────────────────────────────────────────────────────────
S('guangzhou', '广州', 'Guangzhou', 113.26, 23.13, '广东广州', [...GD, ...occ(1938)], { b: 30 });
S('zhaoqing', '肇庆（高要）', 'Zhaoqing (Gaoyao)', 112.47, 23.05, '广东肇庆', GD);
S('shaoguan', '韶关（曲江）', 'Shaoguan (Qujiang)', 113.60, 24.81, '广东韶关', GD);
S('lianzhou', '连县', 'Lianxian', 112.38, 24.78, '广东连州', GD);
S('nanxiong', '南雄', 'Nanxiong', 114.31, 25.12, '广东南雄', GD);
S('huizhou', '惠阳（惠州）', 'Huiyang (Huizhou)', 114.41, 23.11, '广东惠州', [...GDE, ...occ(1938)]);
S('shantou', '汕头', 'Shantou (Swatow)', 116.68, 23.35, '广东汕头', [...GDE, ...occ(1939)]);
S('meixian', '梅县', 'Meixian', 116.12, 24.29, '广东梅州', GDE);
S('luoding', '罗定', 'Luoding', 111.57, 22.77, '广东罗定', GDS);
S('gaozhou', '茂名（高州）', 'Maoming (Gaozhou)', 110.92, 21.66, '广东高州', GDS);
S('leizhou', '海康（雷州）', 'Haikang (Leizhou)', 110.08, 20.91, '广东雷州', GDS);
S('guangzhouwan', '广州湾', 'Guangzhouwan', 110.40, 21.20, '广东湛江', [[1912, 'roc_gzw'], [1943, JO, z], [1945, R, 'treaty.gzw']], { r: 35 });
S('haikou', '琼山（海口）', 'Qiongshan (Haikou)', 110.35, 20.02, '海南海口', [...GDS, ...occ(1939)], { r: 250 });
S('danzhou', '儋县', 'Danxian', 109.58, 19.52, '海南儋州', [...GDS, ...occ(1939)], { r: 250 });
S('sanya', '崖县（三亚）', 'Yaxian (Sanya)', 109.50, 18.25, '海南三亚', [...GDS, ...occ(1939)], { r: 250 });
S('wanning', '万宁', 'Wanning', 110.39, 18.80, '海南万宁', [...GDS, ...occ(1939)], { r: 250 });
S('xinjie', '新界（大埔）', 'New Territories (Tai Po)', 114.17, 22.45, '香港新界', [[1912, UK], [1941, JO, z], [1945, UK, z]], { r: 25 });
S('kowloon', '九龙', 'Kowloon', 114.17, 22.32, '香港九龙', [[1912, UK], [1941, JO, z], [1945, UK, z]], { r: 12 });
S('hongkong', '香港岛', 'Hong Kong Island', 114.17, 22.27, '香港岛', [[1912, UK], [1941, JO, z], [1945, UK, z]], { r: 15 });
S('macau', '澳门', 'Macao', 113.54, 22.19, '澳门', [[1912, PT]], { r: 12 });
// ── 湖南 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('changsha', '长沙', 'Changsha', 112.94, 28.23, '湖南长沙', [...HUN, ...occ(1944)], { b: 15 });
S('yueyang', '岳阳', 'Yueyang', 113.13, 29.36, '湖南岳阳', [...HUN, ...occ(1938)]);
S('changde', '常德', 'Changde', 111.69, 29.04, '湖南常德', HUN);
S('lixian_hn', '澧县', 'Lixian', 111.76, 29.63, '湖南澧县', HUN);
S('hengyang', '衡阳', 'Hengyang', 112.57, 26.89, '湖南衡阳', [...HUS, ...occ(1944)]);
S('shaoyang', '邵阳（宝庆）', 'Shaoyang (Baoqing)', 111.47, 27.24, '湖南邵阳', HUS);
S('lingling', '零陵', 'Lingling', 111.61, 26.42, '湖南永州', [...HUS, ...occ(1944)]);
S('chenxian', '郴县', 'Chenxian', 113.03, 25.79, '湖南郴州', [...HUS, ...occ(1944)]);
S('yuanling', '沅陵', 'Yuanling', 110.39, 28.47, '湖南沅陵', HUS);
S('zhijiang', '芷江', 'Zhijiang', 109.68, 27.44, '湖南芷江', HUS);
S('yongshun', '永顺', 'Yongshun', 109.85, 29.00, '湖南永顺', HUS);
S('jingxian', '靖县', 'Jingxian', 109.69, 26.57, '湖南靖州', HUS);
// ── 湖北 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('wuhan', '武汉', 'Wuhan', 114.31, 30.55, '湖北武汉', [...HB, ...occ(1938)], { b: 25 });
S('huanggang', '黄冈', 'Huanggang', 114.87, 30.45, '湖北黄冈', [...HB, ...occ(1938)]);
S('xiaogan', '孝感', 'Xiaogan', 113.92, 30.93, '湖北孝感', [...HB, ...occ(1938)]);
S('yichang', '宜昌', 'Yichang', 111.29, 30.70, '湖北宜昌', [...HB, ...occ(1940)]);
S('jiangling', '江陵（沙市）', 'Jiangling (Shashi)', 112.24, 30.33, '湖北荆州', [...HB, ...occ(1940)]);
S('zhongxiang', '钟祥', 'Zhongxiang', 112.59, 31.17, '湖北钟祥', [...HB, ...occ(1939)]);
S('xiangyang', '襄阳', 'Xiangyang', 112.14, 32.04, '湖北襄阳', HB);
S('yunxian', '郧县', 'Yunxian', 110.81, 32.84, '湖北十堰郧阳', HB);
S('enshi', '恩施', 'Enshi', 109.48, 30.30, '湖北恩施', HB);
// ── 江西 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('nanchang', '南昌', 'Nanchang', 115.89, 28.68, '江西南昌', [...JXI, ...occ(1939)], { b: 15 });
S('jiujiang', '九江', 'Jiujiang', 116.00, 29.71, '江西九江', [...JXI, ...occ(1938)]);
S('poyang', '鄱阳', 'Poyang', 116.68, 29.00, '江西鄱阳', JXI);
S('shangrao', '上饶', 'Shangrao', 117.97, 28.45, '江西上饶', JXI);
S('fuzhou_jx', '临川（抚州）', 'Linchuan (Fuzhou)', 116.35, 27.95, '江西抚州', JXI);
S('nancheng', '南城', 'Nancheng', 116.63, 27.55, '江西南城', JXI);
S('jian', '吉安', 'Ji’an', 114.99, 27.11, '江西吉安', JXI);
S('ganzhou', '赣县（赣州）', 'Ganxian (Ganzhou)', 114.93, 25.83, '江西赣州', JXI);
S('ruijin', '瑞金', 'Ruijin', 116.03, 25.89, '江西瑞金', JXI);
S('yichun', '宜春', 'Yichun', 114.39, 27.80, '江西宜春', JXI);
S('gaoan', '高安', 'Gao’an', 115.37, 28.42, '江西高安', JXI);
// ── 浙江 · 上海 ──────────────────────────────────────────────────────────────────────────────────────────────────────
S('hangzhou', '杭州', 'Hangzhou', 120.15, 30.27, '浙江杭州', [...ZJ, ...occ(1937)], { b: 15 });
S('jiaxing', '嘉兴', 'Jiaxing', 120.75, 30.76, '浙江嘉兴', [...ZJ, ...occ(1937)]);
S('huzhou', '吴兴（湖州）', 'Wuxing (Huzhou)', 120.09, 30.89, '浙江湖州', [...ZJ, ...occ(1937)]);
S('ningbo', '鄞县（宁波）', 'Yinxian (Ningbo)', 121.55, 29.87, '浙江宁波', [...ZJ, ...occ(1941)]);
S('shaoxing', '绍兴', 'Shaoxing', 120.58, 30.00, '浙江绍兴', [...ZJ, ...occ(1941)]);
S('linhai', '临海', 'Linhai', 121.13, 28.85, '浙江临海', ZJ);
S('jinhua', '金华', 'Jinhua', 119.65, 29.08, '浙江金华', [...ZJ, ...occ(1942)]);
S('quzhou', '衢县', 'Quxian', 118.87, 28.94, '浙江衢州', ZJ);
S('jiande', '建德', 'Jiande', 119.50, 29.55, '浙江建德', ZJ);
S('wenzhou', '永嘉（温州）', 'Yongjia (Wenzhou)', 120.67, 28.00, '浙江温州', ZJ);
S('lishui', '丽水', 'Lishui', 119.92, 28.45, '浙江丽水', ZJ);
S('dinghai', '定海（舟山）', 'Dinghai (Zhoushan)', 122.10, 30.02, '浙江舟山', [...ZJ, ...occ(1939)], { r: 60 });
S('shanghai', '上海', 'Shanghai', 121.47, 31.23, '上海', [[1912, R], [1917, AH, z], [1924, ZL, z], [1925, WS, z], [1927, GM, z], [1928, R, z], ...occ(1937)], { b: 20 });
// ── 江苏 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('nanjing', '南京', 'Nanjing', 118.78, 32.06, '江苏南京', [...JS, ...occ(1937)], { b: 40 });
S('zhenjiang', '镇江', 'Zhenjiang', 119.45, 32.20, '江苏镇江', [...JS, ...occ(1937)]);
S('suzhou', '吴县（苏州）', 'Wuxian (Suzhou)', 120.62, 31.30, '江苏苏州', [...JS, ...occ(1937)]);
S('changzhou', '武进（常州）', 'Wujin (Changzhou)', 119.97, 31.78, '江苏常州', [...JS, ...occ(1937)]);
S('yangzhou', '江都（扬州）', 'Jiangdu (Yangzhou)', 119.42, 32.39, '江苏扬州', [...JS, ...occ(1937)]);
S('nantong', '南通', 'Nantong', 120.86, 32.00, '江苏南通', [...JS, ...occ(1938)]);
S('huaiyin', '淮阴', 'Huaiyin', 119.02, 33.60, '江苏淮安', [...JS, ...occ(1939)]);
S('yancheng', '盐城', 'Yancheng', 120.16, 33.35, '江苏盐城', [...JS, ...occ(1941)]);
S('xuzhou', '铜山（徐州）', 'Tongshan (Xuzhou)', 117.18, 34.26, '江苏徐州', [...JS, ...occ(1938)]);
S('haizhou', '东海（连云港）', 'Donghai (Lianyungang)', 119.22, 34.60, '江苏连云港', [...JS, ...occ(1939)]);
// ── 安徽 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('anqing', '怀宁（安庆）', 'Huaining (Anqing)', 117.05, 30.52, '安徽安庆', [...AHU, ...occ(1938)]);
S('hefei', '合肥', 'Hefei', 117.27, 31.86, '安徽合肥', [...AHU, ...occ(1938)]);
S('wuhu', '芜湖', 'Wuhu', 118.38, 31.33, '安徽芜湖', [...AHU, ...occ(1937)]);
S('xuancheng', '宣城', 'Xuancheng', 118.76, 30.95, '安徽宣城', [...AHU, ...occ(1937)]);
S('bengbu', '蚌埠', 'Bengbu', 117.39, 32.92, '安徽蚌埠', [...AHU, ...occ(1938)]);
S('suxian', '宿县', 'Suxian', 116.98, 33.63, '安徽宿州', [...AHU, ...occ(1938)]);
S('fuyang', '阜阳', 'Fuyang', 115.81, 32.89, '安徽阜阳', AHU);
S('luan', '六安', 'Lu’an', 116.50, 31.75, '安徽六安', AHU);
S('jinzhai', '立煌（金寨）', 'Lihuang (Jinzhai)', 115.93, 31.68, '安徽金寨', AHU);
S('shexian', '歙县（徽州）', 'Shexian (Huizhou)', 118.43, 29.87, '安徽歙县', AHU);
S('chizhou', '贵池', 'Guichi', 117.49, 30.66, '安徽池州', [...AHU, ...occ(1938)]);
// ── 福建 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('fuzhou', '闽侯（福州）', 'Minhou (Fuzhou)', 119.30, 26.08, '福建福州', [...FJ, ...occ(1944)], { b: 15 });
S('xiamen', '厦门', 'Xiamen (Amoy)', 118.09, 24.48, '福建厦门', [...FJ, ...occ(1938)], { r: 40 });
S('quanzhou', '晋江（泉州）', 'Jinjiang (Quanzhou)', 118.59, 24.91, '福建泉州', FJ);
S('zhangzhou', '龙溪（漳州）', 'Longxi (Zhangzhou)', 117.65, 24.51, '福建漳州', [[1912, R], [1916, AH, z], [1918, HF, z], [1920, AH, 'est'], [1923, ZL, 'est'], [1925, WS, z], [1926, GM, z], [1928, R, z]]);
S('longyan', '龙岩', 'Longyan', 117.02, 25.08, '福建龙岩', [[1912, R], [1916, AH, z], [1918, HF, z], [1920, AH, 'est'], [1923, ZL, 'est'], [1925, WS, z], [1926, GM, z], [1928, R, z]]);
S('putian', '莆田', 'Putian', 119.00, 25.43, '福建莆田', FJ);
S('nanping', '南平', 'Nanping', 118.17, 26.64, '福建南平', FJ);
S('jianou', '建瓯', 'Jian’ou', 118.32, 27.03, '福建建瓯', FJ);
S('shaowu', '邵武', 'Shaowu', 117.48, 27.34, '福建邵武', FJ);
S('changting', '长汀', 'Changting', 116.36, 25.84, '福建长汀', FJ);
S('xiapu', '霞浦', 'Xiapu', 120.00, 26.88, '福建霞浦', FJ);
// ── 东三省 · 关东州 ──────────────────────────────────────────────────────────────────────────────────────────────────
S('shenyang', '奉天（沈阳）', 'Fengtian (Shenyang)', 123.43, 41.80, '辽宁沈阳', DB(1916, 1931), { b: 40 });
S('liaoyang', '辽阳', 'Liaoyang', 123.17, 41.27, '辽宁辽阳', DB(1916, 1931));
S('yingkou', '营口', 'Yingkou', 122.23, 40.67, '辽宁营口', DB(1916, 1931));
S('andong', '安东', 'Andong', 124.38, 40.13, '辽宁丹东', DB(1916, 1931));
S('fuxian', '复县', 'Fuxian', 121.98, 39.63, '辽宁瓦房店', DB(1916, 1931), { r: 200 });
S('jinzhou', '锦县（锦州）', 'Jinxian (Jinzhou)', 121.13, 41.10, '辽宁锦州', DB(1916, 1932));
S('tonghua', '通化', 'Tonghua', 125.94, 41.73, '吉林通化', DB(1916, 1932));
S('siping', '四平', 'Siping', 124.35, 43.17, '吉林四平', DB(1916, 1931));
S('tongliao', '通辽', 'Tongliao', 122.25, 43.62, '内蒙古通辽', DB(1916, 1931), { r: 420 });
S('taonan', '洮南', 'Taonan', 122.79, 45.33, '吉林洮南', DB(1916, 1931), { r: 400 });
S('changchun', '长春', 'Changchun', 125.32, 43.82, '吉林长春', DB(1919, 1931));
S('jilin', '吉林（永吉）', 'Jilin (Yongji)', 126.55, 43.85, '吉林吉林市', DB(1919, 1931), { r: 380 });
S('yanji', '延吉', 'Yanji', 129.51, 42.89, '吉林延吉', DB(1919, 1932), { r: 300 });
S('mudanjiang', '宁安（牡丹江）', 'Ning’an (Mudanjiang)', 129.47, 44.35, '黑龙江宁安', DB(1919, 1932), { r: 420 });
S('harbin', '哈尔滨', 'Harbin', 126.63, 45.75, '黑龙江哈尔滨', DB(1919, 1932), { r: 350 });
S('jiamusi', '依兰（佳木斯）', 'Yilan (Jiamusi)', 129.57, 46.32, '黑龙江依兰', DB(1919, 1932), { r: 500 });
S('fuyuan', '富锦', 'Fujin', 132.04, 47.25, '黑龙江富锦', DB(1919, 1932), { r: 400 });
S('qiqihar', '龙江（齐齐哈尔）', 'Longjiang (Qiqihar)', 123.95, 47.35, '黑龙江齐齐哈尔', DB(1917, 1931), { r: 450 });
S('nenjiang', '嫩江', 'Nenjiang', 125.20, 49.18, '黑龙江嫩江', DB(1917, 1932), { r: 480 });
S('heihe', '黑河（瑷珲）', 'Heihe (Aigun)', 127.48, 50.25, '黑龙江黑河', DB(1917, 1932), { r: 500 });
S('mohe', '漠河', 'Mohe', 122.53, 52.97, '黑龙江漠河', DB(1917, 1932), { r: 450 });
S('hailar', '海拉尔（呼伦）', 'Hailar (Hulun)', 119.70, 49.20, '内蒙古海拉尔', DB(1917, 1932), { r: 480 });
S('lushun', '旅顺 · 大连（关东州）', 'Lüshun and Dalian (Kwantung)', 121.45, 38.92, '辽宁大连', [[1912, 'roc_guandong'], [1945, R, 'decl']], { r: 55 });
// ── 台湾（日本占据，1945年光复）──────────────────────────────────────────────────────────────────────────────────────
S('taibei', '台北', 'Taipei', 121.51, 25.05, '台湾台北', TW, { b: 10 });
S('jilong', '基隆', 'Keelung', 121.74, 25.13, '台湾基隆', TW);
S('xinzhu', '新竹', 'Hsinchu', 120.97, 24.80, '台湾新竹', TW);
S('taizhong', '台中', 'Taichung', 120.68, 24.14, '台湾台中', TW);
S('jiayi', '嘉义', 'Chiayi', 120.45, 23.48, '台湾嘉义', TW);
S('tainan', '台南', 'Tainan', 120.20, 23.00, '台湾台南', TW);
S('gaoxiong', '高雄', 'Kaohsiung', 120.29, 22.63, '台湾高雄', TW);
S('hengchun', '恒春', 'Hengchun', 120.74, 22.00, '台湾屏东恒春', TW);
S('taidong', '台东', 'Taitung', 121.15, 22.76, '台湾台东', TW);
S('hualian', '花莲', 'Hualien', 121.60, 23.98, '台湾花莲', TW);
S('yilan', '宜兰', 'Yilan', 121.75, 24.75, '台湾宜兰', TW);
S('penghu', '澎湖', 'Penghu', 119.57, 23.57, '台湾澎湖', TW, { r: 40 });
// ── 外蒙古 · 唐努乌梁海 ──────────────────────────────────────────────────────────────────────────────────────────────
S('kulun', '库伦', 'Khüree (Urga)', 106.92, 47.92, '蒙古国乌兰巴托', WMG, { r: 750 });
S('cecen', '车臣汗部', 'Setsen Khan aimag', 110.66, 47.32, '蒙古国温都尔汗', WMG, { r: 700 });
S('sayin', '赛音诺颜部', 'Sain Noyon aimag', 101.45, 47.47, '蒙古国车车尔勒格', WMG, { r: 650 });
S('uliastai', '乌里雅苏台', 'Uliastai', 96.85, 47.73, '蒙古国乌里雅苏台', WMG, { r: 650 });
S('khuvsgul', '库苏古尔', 'Khövsgöl', 100.16, 49.64, '蒙古国木伦', WMG, { r: 550 });
S('kyakhta', '恰克图（买卖城）', 'Kyakhta (Maimaicheng)', 106.45, 50.35, '蒙古国阿勒坦布拉格', WMG, { r: 200 });
S('dariganga', '东戈壁', 'Eastern Gobi', 110.10, 44.90, '蒙古国赛音山达', WMG, { r: 650 });
S('gobialtai', '戈壁阿尔泰', 'Gobi-Altai', 100.00, 44.40, '蒙古国巴彦洪戈尔南部', WMG, { r: 650 });
S('khovd', '科布多', 'Khovd', 91.64, 48.01, '蒙古国科布多', WMG, { r: 650 });
S('uvs', '乌布苏', 'Uvs', 92.07, 49.98, '蒙古国乌兰固木', WMG, { r: 450 });
S('tannu', '唐努乌梁海', 'Tannu Uriankhai', 94.45, 51.72, '俄罗斯图瓦克孜勒', [[1912, R], [1914, 'roc_tannu', z], [1944, SU, z]], { r: 650 });

// ── neighbours ──────────────────────────────────────────────────────────────────────────────────────────────────────
// 俄国 / 苏联
S('tomsk', '托木斯克', 'Tomsk', 84.97, 56.49, '俄罗斯托木斯克', RS, { r: 650 });
S('krasnoyarsk', '克拉斯诺亚尔斯克', 'Krasnoyarsk', 92.87, 56.01, '俄罗斯克拉斯诺亚尔斯克', RS, { r: 650 });
S('novokuznetsk', '库兹涅茨克', 'Kuznetsk', 87.12, 53.76, '俄罗斯新库兹涅茨克', RS, { r: 400 });
S('omsk', '鄂木斯克', 'Omsk', 73.37, 54.98, '俄罗斯鄂木斯克', RS, { r: 550 });
S('petropavl', '彼得罗巴甫洛夫斯克', 'Petropavlovsk', 69.15, 54.87, '哈萨克斯坦彼得罗巴甫尔', RS, { r: 450 });
S('barnaul', '巴尔瑙尔', 'Barnaul', 83.78, 53.35, '俄罗斯巴尔瑙尔', RS, { r: 350 });
S('semipalatinsk', '塞米巴拉金斯克', 'Semipalatinsk', 80.25, 50.41, '哈萨克斯坦塞梅伊', RS, { r: 450 });
S('ustkam', '乌斯季卡缅诺戈尔斯克', 'Ust-Kamenogorsk', 82.61, 49.95, '哈萨克斯坦厄斯克门', RS, { r: 300 });
S('zaysan', '斋桑', 'Zaysan', 84.87, 47.47, '哈萨克斯坦斋桑', RS, { r: 400 });
S('karkaraly', '卡尔卡拉雷', 'Karkaraly', 75.48, 49.40, '哈萨克斯坦卡尔卡拉雷', RS, { r: 750 });
S('ulytau', '兀鲁套', 'Ulytau', 67.00, 48.20, '哈萨克斯坦乌勒套', RS, { r: 750 });
S('lepsy', '列普辛斯克', 'Lepsinsk', 80.60, 45.53, '哈萨克斯坦列普辛斯克', RS, { r: 550 });
S('almaty', '维尔内（阿拉木图）', 'Verny (Almaty)', 76.95, 43.25, '哈萨克斯坦阿拉木图', RS, { r: 500 });
S('zharkent', '雅尔肯特', 'Zharkent', 80.00, 44.17, '哈萨克斯坦扎尔肯特', RS, { r: 250 });
S('karakol', '卡拉科尔', 'Karakol', 78.39, 42.49, '吉尔吉斯斯坦卡拉科尔', RS, { r: 450 });
S('pishpek', '比什凯克', 'Pishpek', 74.60, 42.87, '吉尔吉斯斯坦比什凯克', RS, { r: 300 });
S('taraz', '奥利阿塔', 'Aulie-Ata', 71.37, 42.90, '哈萨克斯坦塔拉兹', RS, { r: 400 });
S('turkestan', '突厥斯坦', 'Turkestan', 68.25, 43.30, '哈萨克斯坦突厥斯坦', RS, { r: 750 });
S('tashkent', '塔什干', 'Tashkent', 69.24, 41.30, '乌兹别克斯坦塔什干', RS, { r: 300 });
S('kokand', '浩罕', 'Kokand', 70.94, 40.53, '乌兹别克斯坦浩罕', RS, { r: 400 });
S('osh', '奥什', 'Osh', 72.80, 40.53, '吉尔吉斯斯坦奥什', RS, { r: 500 });
S('murghab', '帕米尔（穆尔加布）', 'Pamir (Murghab)', 73.97, 38.17, '塔吉克斯坦穆尔加布', RS, { r: 400 });
S('samarkand', '撒马尔罕', 'Samarkand', 66.97, 39.65, '乌兹别克斯坦撒马尔罕', RS, { r: 300 });
S('bukhara', '布哈拉', 'Bukhara', 64.42, 39.77, '乌兹别克斯坦布哈拉', RS, { r: 550 });
S('irkutsk', '伊尔库茨克', 'Irkutsk', 104.28, 52.29, '俄罗斯伊尔库茨克', RS, { r: 550 });
S('ulanude', '上乌金斯克', 'Verkhneudinsk', 107.60, 51.83, '俄罗斯乌兰乌德', RS, { r: 450 });
S('chita', '赤塔', 'Chita', 113.50, 52.03, '俄罗斯赤塔', RS, { r: 450 });
S('nerchinsk', '尼布楚', 'Nerchinsk', 116.53, 51.98, '俄罗斯涅尔琴斯克', RS, { r: 500 });
S('albazin', '阿尔巴津（雅克萨）', 'Albazino (Yaksa)', 124.00, 53.40, '俄罗斯阿尔巴津诺', RS, { r: 600 });
S('zeya', '结雅', 'Zeya', 127.27, 53.73, '俄罗斯结雅', RS, { r: 650 });
S('blagoveshchensk', '海兰泡', 'Blagoveshchensk', 127.53, 50.27, '俄罗斯布拉戈维申斯克', RS, { r: 250 });
S('bureya', '布列亚', 'Bureya', 130.25, 50.40, '俄罗斯布列亚河口一带', RS, { r: 500 });
S('nikolayevsk', '庙街', 'Nikolayevsk', 140.73, 53.14, '俄罗斯尼古拉耶夫斯克', RS, { r: 650 });
S('kizi', '基济', 'Kizi', 140.25, 51.45, '俄罗斯基济湖一带', RS, { r: 450 });
S('khabarovsk', '伯力', 'Khabarovsk', 135.07, 48.48, '俄罗斯哈巴罗夫斯克', RS, { r: 450 });
S('ussuriysk', '双城子', 'Ussuriysk', 131.95, 43.80, '俄罗斯乌苏里斯克', RS, { r: 280 });
S('vladivostok', '海参崴', 'Vladivostok', 131.89, 43.12, '俄罗斯符拉迪沃斯托克', RS, { r: 150 });
S('partizansk', '苏城', 'Suchan', 133.10, 43.12, '俄罗斯游击队城', RS, { r: 500 });
// 日本 · 朝鲜
const KR: Hold[] = [[1912, JP], [1945, 'roc_korea', 'decl']];
S('keijo', '汉城', 'Seoul', 126.98, 37.57, '韩国首尔', KR, { r: 350, b: 20 });
S('pyongyang', '平壤', 'Pyongyang', 125.75, 39.03, '朝鲜平壤', KR, { r: 300 });
S('sinuiju', '新义州', 'Sinuiju', 124.40, 40.10, '朝鲜新义州', KR, { r: 180 });
S('hamhung', '咸兴', 'Hamhung', 127.53, 39.92, '朝鲜咸兴', KR, { r: 300 });
S('hoeryong', '会宁', 'Hoeryong', 129.75, 42.43, '朝鲜会宁', KR, { r: 220 });
S('jeonju', '全州', 'Jeonju', 127.15, 35.82, '韩国全州', KR, { r: 300 });
S('busan', '釜山', 'Busan', 129.04, 35.10, '韩国釜山', KR, { r: 300 });
S('tokyo', '东京', 'Tokyo', 139.69, 35.69, '日本东京', [[1912, JP]], { r: 450, b: 20 });
S('kyoto', '京都', 'Kyoto', 135.77, 35.01, '日本京都', [[1912, JP]], { r: 400 });
S('fukuoka', '福冈', 'Fukuoka', 130.40, 33.59, '日本福冈', [[1912, JP]], { r: 350 });
S('kagoshima', '鹿儿岛', 'Kagoshima', 130.55, 31.60, '日本鹿儿岛', [[1912, JP]], { r: 300 });
S('kochi', '高知', 'Kochi', 133.53, 33.56, '日本高知', [[1912, JP]], { r: 300 });
S('kanazawa', '金泽', 'Kanazawa', 136.65, 36.56, '日本金泽', [[1912, JP]], { r: 350 });
S('sendai', '仙台', 'Sendai', 140.87, 38.27, '日本仙台', [[1912, JP]], { r: 400 });
S('hirosaki', '弘前', 'Hirosaki', 140.47, 40.60, '日本弘前', [[1912, JP]], { r: 300 });
S('hakodate', '函馆', 'Hakodate', 140.73, 41.77, '日本函馆', [[1912, JP]], { r: 150 });
S('sapporo', '札幌', 'Sapporo', 141.35, 43.06, '日本札幌', [[1912, JP]], { r: 400 });
S('naha', '那霸', 'Naha', 127.68, 26.21, '日本冲绳那霸', [[1912, JP]], { r: 150 });
// 英属印度 · 喜马拉雅诸国 · 阿富汗
const BI = 'roc_brindia', BB = 'roc_brburma';
S('delhi', '德里', 'Delhi', 77.21, 28.65, '印度德里', [[1912, BI]], { r: 550, b: 20 });
S('lahore', '拉合尔', 'Lahore', 74.34, 31.55, '巴基斯坦拉合尔', [[1912, BI]], { r: 450 });
S('peshawar', '白沙瓦', 'Peshawar', 71.57, 34.01, '巴基斯坦白沙瓦', [[1912, BI]], { r: 250 });
S('srinagar', '斯利那加', 'Srinagar', 74.80, 34.08, '克什米尔斯利那加', [[1912, BI]], { r: 300 });
S('leh', '列城', 'Leh', 77.58, 34.16, '拉达克列城', [[1912, BI]], { r: 500 });
S('lucknow', '勒克瑙', 'Lucknow', 80.95, 26.85, '印度勒克瑙', [[1912, BI]], { r: 450 });
S('patna', '巴特那', 'Patna', 85.14, 25.59, '印度巴特那', [[1912, BI]], { r: 450 });
S('dhaka', '达卡', 'Dhaka', 90.41, 23.81, '孟加拉国达卡', [[1912, BI]], { r: 450 });
S('guwahati', '高哈蒂', 'Guwahati', 91.74, 26.14, '印度阿萨姆高哈蒂', [[1912, BI]], { r: 300 });
S('sibsagar', '锡布萨格尔', 'Sibsagar', 94.64, 26.98, '印度阿萨姆锡布萨格尔', [[1912, BI]], { r: 300 });
S('gangtok', '甘托克（锡金）', 'Gangtok (Sikkim)', 88.61, 27.33, '锡金甘托克', [[1912, BI]], { r: 80 });
S('kathmandu', '加德满都', 'Kathmandu', 85.32, 27.70, '尼泊尔加德满都', [[1912, 'roc_nepal']], { r: 350 });
S('pokhara', '博卡拉', 'Pokhara', 83.99, 28.21, '尼泊尔博卡拉', [[1912, 'roc_nepal']], { r: 250 });
S('punakha', '普那卡', 'Punakha', 89.86, 27.60, '不丹普那卡', [[1912, 'roc_bhutan']], { r: 220 });
S('kabul', '喀布尔', 'Kabul', 69.17, 34.53, '阿富汗喀布尔', [[1912, 'roc_afghan']], { r: 500 });
S('faizabad', '法扎巴德', 'Faizabad', 70.58, 37.12, '阿富汗法扎巴德', [[1912, 'roc_afghan']], { r: 300 });
S('herat', '赫拉特', 'Herat', 62.20, 34.35, '阿富汗赫拉特', [[1912, 'roc_afghan']], { r: 500 });
// 缅甸 · 暹罗 · 法属印度支那
const BUR: Hold[] = [[1912, BI], [1937, BB, 'est']];
S('mandalay', '曼德勒', 'Mandalay', 96.08, 21.97, '缅甸曼德勒', BUR, { r: 600, b: 20 });
S('bago', '勃固', 'Bago', 96.48, 17.33, '缅甸勃固', BUR, { r: 500 });
S('mrauku', '妙乌（阿拉干）', 'Mrauk U (Arakan)', 93.19, 20.59, '缅甸妙乌', BUR, { r: 400 });
S('bhamo', '八莫', 'Bhamo', 97.23, 24.27, '缅甸八莫', BUR, { r: 250 });
S('myitkyina', '密支那', 'Myitkyina', 97.39, 25.38, '缅甸密支那', BUR, { r: 250 });
S('hsenwi', '兴威（木邦）', 'Hsenwi', 97.96, 23.30, '缅甸兴威', BUR, { r: 250 });
S('kengtung', '景栋（孟艮）', 'Kengtung', 99.60, 21.29, '缅甸景栋', BUR, { r: 250 });
S('chiangmai', '清迈', 'Chiang Mai', 98.99, 18.79, '泰国清迈', [[1912, 'roc_siam']], { r: 350 });
S('phitsanulok', '彭世洛', 'Phitsanulok', 100.26, 16.82, '泰国彭世洛', [[1912, 'roc_siam']], { r: 500 });
const FI: Hold[] = [[1912, 'roc_frindochina']];
S('hanoi', '河内', 'Hanoi', 105.85, 21.03, '越南河内', FI, { r: 400, b: 20 });
S('langson', '谅山', 'Lạng Sơn', 106.76, 21.85, '越南谅山', FI, { r: 150 });
S('caobang', '高平', 'Cao Bằng', 106.25, 22.67, '越南高平', FI, { r: 150 });
S('laocai', '老街', 'Lào Cai', 103.97, 22.49, '越南老街', FI, { r: 200 });
S('vinh', '荣市', 'Vinh', 105.68, 18.67, '越南荣市', FI, { r: 350 });
S('hue', '顺化', 'Huế', 107.58, 16.46, '越南顺化', FI, { r: 400 });
S('luangprabang', '琅勃拉邦', 'Luang Prabang', 102.14, 19.89, '老挝琅勃拉邦', FI, { r: 400 });
S('vientiane', '万象', 'Vientiane', 102.60, 17.97, '老挝万象', FI, { r: 400 });

export const ROC: OwnEra = {
  replaces: 'roc',
  reach: 300,
  polities: [
    { id: AH, name: { zh: '皖系（段祺瑞）', en: 'Anhui clique (Duan Qirui)' }, color: '#5b8a72', role: 'rival' },
    { id: ZL, name: { zh: '直系（冯国璋、曹锟、吴佩孚）', en: 'Zhili clique (Feng Guozhang, Cao Kun, Wu Peifu)' }, color: '#c9a227', role: 'rival' },
    { id: FT, name: { zh: '奉系（张作霖）', en: 'Fengtian clique (Zhang Zuolin)' }, color: '#7d5ba6', role: 'rival' },
    { id: JX, name: { zh: '晋系（阎锡山）', en: 'Shanxi clique (Yan Xishan)' }, color: '#a0522d', role: 'rival' },
    { id: HF, name: { zh: '护法军政府及西南各省', en: 'Constitution Protection government and the southwest' }, color: '#c0504d', role: 'rival' },
    { id: XN, name: { zh: '西南及各省地方实力派', en: 'Southwestern and provincial militarists' }, color: '#b08d6e', role: 'rival' },
    { id: WS, name: { zh: '五省联军（孙传芳）', en: 'Allied Army of Five Provinces (Sun Chuanfang)' }, color: '#3b7dbf', role: 'rival' },
    { id: GJ, name: { zh: '国民军（冯玉祥）', en: 'Guominjun (Feng Yuxiang)' }, color: '#6a994e', role: 'rival' },
    { id: GM, name: { zh: '广州革命政府 · 国民政府', en: 'Revolutionary government in Guangzhou / Nationalist Government' }, color: '#d1495b', role: 'rival' },
    { id: MZ, name: { zh: '伪满洲国', en: 'Puppet “Manchukuo”' }, color: '#4d5656', role: 'occupied' },
    { id: WM, name: { zh: '外蒙古（苏联扶植，未获承认）', en: 'Outer Mongolia (Soviet-backed, unrecognised)' }, color: '#b8b09a', role: 'protectorate' },
    { id: 'roc_tannu', name: { zh: '唐努乌梁海（沙俄、苏联控制）', en: 'Tannu Uriankhai (under Russian, then Soviet control)' }, color: '#6c5b6e', role: 'occupied' },
    { id: 'roc_jiaoao', name: { zh: '胶澳（德国租借）', en: 'Jiaozhou Bay (German lease)' }, color: '#566573', role: 'occupied' },
    { id: 'roc_weihai', name: { zh: '威海卫（英国租借）', en: 'Weihaiwei (British lease)' }, color: '#566573', role: 'occupied' },
    { id: 'roc_guandong', name: { zh: '关东州（日本租借）', en: 'Kwantung (Japanese lease)' }, color: '#566573', role: 'occupied' },
    { id: 'roc_gzw', name: { zh: '广州湾（法国租借）', en: 'Guangzhouwan (French lease)' }, color: '#566573', role: 'occupied' },
    { id: 'roc_korea', name: { zh: '朝鲜半岛', en: 'Korean peninsula' }, color: '#bfc9ca', role: 'neighbor' },
    { id: BI, name: { zh: '英属印度', en: 'British India' }, color: '#b5bcc0', role: 'neighbor' },
    { id: BB, name: { zh: '英属缅甸', en: 'British Burma' }, color: '#bfb393', role: 'neighbor' },
    { id: 'roc_nepal', name: { zh: '尼泊尔', en: 'Nepal' }, color: '#bba98f', role: 'neighbor' },
    { id: 'roc_bhutan', name: { zh: '不丹', en: 'Bhutan' }, color: '#c1b394', role: 'neighbor' },
    { id: 'roc_afghan', name: { zh: '阿富汗', en: 'Afghanistan' }, color: '#b9a98c', role: 'neighbor' },
    { id: 'roc_siam', name: { zh: '暹罗（泰国）', en: 'Siam (Thailand)' }, color: '#c2bb9e', role: 'neighbor' },
    { id: 'roc_frindochina', name: { zh: '法属印度支那', en: 'French Indochina' }, color: '#b3bbc2', role: 'neighbor' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_roc_1', from: 1912, to: 1916, at: 1914, title: { zh: '中华民国建立，北京政府时期（1914年 · 民国1912年建立）', en: 'The Republic of China founded; the Beijing government (1914; founded in 1912)' } },
    { id: 'o_roc_2', from: 1917, to: 1920, at: 1918, title: { zh: '北洋军阀割据，孙中山在广州护法（1918年）', en: 'The Beiyang warlords divide the north; Sun Yat-sen’s Constitution Protection in Guangzhou (1918)' } },
    { id: 'o_roc_3', from: 1921, to: 1924, at: 1923, title: { zh: '直系控制北京政府，孙中山重建广州政权（1923年）', en: 'The Zhili clique holds Beijing; Sun Yat-sen re-founds his Guangzhou government (1923)' } },
    { id: 'o_roc_4', from: 1925, to: 1926, at: 1925, title: { zh: '奉系入关，孙传芳五省联军、冯玉祥国民军与广州国民政府（1925年）', en: 'Fengtian moves south of the Wall; Sun Chuanfang’s five provinces, Feng Yuxiang’s Guominjun and the Nationalist Government in Guangzhou (1925)' } },
    { id: 'o_roc_5', from: 1927, to: 1928, at: 1927, title: { zh: '国民革命军北伐，国民政府定都南京（1927年）', en: 'The Northern Expedition; the Nationalist Government in Nanjing (1927)' } },
    { id: 'o_roc_6', from: 1929, to: 1930, at: 1929, title: { zh: '东北易帜，全国在形式上统一（1929年 · 易帜在1928年底）', en: 'The Northeast changes flags; China formally reunited (1929; the flags changed at the end of 1928)' } },
    { id: 'o_roc_7', from: 1931, to: 1931, at: 1931, title: { zh: '九一八事变，日军侵占东北（1931年）', en: 'The September 18 Incident: the Japanese army seizes the Northeast (1931)' } },
    { id: 'o_roc_8', from: 1932, to: 1936, at: 1933, title: { zh: '日本扶植伪满洲国，侵占热河（1933年 · 伪满1932年成立）', en: 'Japan sets up puppet “Manchukuo” and seizes Rehe (1933; “Manchukuo” set up in 1932)' } },
    { id: 'o_roc_9', from: 1937, to: 1944, at: 1940, title: { zh: '全面抗战：日军侵占华北、华东、华中、华南大片国土（1940年）', en: 'The War of Resistance: Japan occupies much of north, east, central and south China (1940)' } },
    { id: 'o_roc_10', from: 1945, to: 1945, at: 1945, title: { zh: '抗日战争胜利，台湾光复（1945年）', en: 'Victory over Japan; Taiwan restored to China (1945)' } },
    { id: 'o_roc_11', from: 1946, to: 1949, at: 1946, title: { zh: '中国政府承认外蒙古独立；解放战争时期（1946年起）', en: 'The Chinese government recognises Outer Mongolia’s independence; the War of Liberation (from 1946)' } },
  ],
  sources: {
    zhmgs: { zh: '李新总编《中华民国史》（中华书局）', en: 'Li Xin (ed.), History of the Republic of China (Zhonghua Book Company)' },
    decl: { zh: '《开罗宣言》（1943）、《波茨坦公告》（1945）与日本投降', en: 'Cairo Declaration (1943), Potsdam Proclamation (1945) and the Japanese surrender' },
    'treaty.zhongsu': { zh: '《中苏友好同盟条约》关于外蒙古问题的换文（1945）；国民政府1946年1月承认外蒙古独立', en: 'Sino-Soviet Treaty of Friendship (1945), notes on Outer Mongolia; recognition by the Nationalist Government, January 1946' },
    'treaty.shandong': { zh: '中日《解决山东悬案条约》（1922）', en: 'Sino-Japanese Treaty for the Settlement of Outstanding Questions relative to Shantung (1922)' },
    'treaty.weihai': { zh: '中英《交收威海卫专约》（1930）', en: 'Convention for the Rendition of Weihaiwei (1930)' },
    'treaty.gzw': { zh: '中法《交收广州湾租借地专约》（1945）', en: 'Sino-French Convention for the Retrocession of Guangzhouwan (1945)' },
    ussr1922: { zh: '《关于建立苏维埃社会主义共和国联盟的条约》（1922）', en: 'Treaty on the Creation of the USSR (1922)' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
