import type { Hold, OwnEra, Seat } from './types.ts';

/**
 * 秦 (221–202 BCE): the unified empire's commanderies (郡) and their seats, the northern and southern conquests of
 * 214 BCE, the risings of 209–207 BCE and the Chu–Han war. Seats are at their modern sites (《汉书·地理志》 and site
 * studies); each holding change cites the 史记 chapter that records it (`est` marks a date we infer).
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

const seats: Seat[] = [
  // 内史 (关中)
  S('xianyang', '咸阳', 'Xianyang', 108.71, 34.33, '陕西咸阳', { b: 40 }),
  S('yueyang', '栎阳', 'Yueyang', 109.23, 34.66, '陕西西安阎良'),
  S('feiqiu', '废丘', 'Feiqiu', 108.48, 34.30, '陕西兴平'),
  S('yong', '雍', 'Yong', 107.40, 34.50, '陕西凤翔'),
  S('chencang', '陈仓', 'Chencang', 107.15, 34.36, '陕西宝鸡'),
  S('zheng', '郑', 'Zheng', 109.76, 34.51, '陕西华州'),
  S('shang', '商', 'Shang', 110.33, 33.70, '陕西丹凤'),
  S('lantian', '蓝田', 'Lantian', 109.32, 34.15, '陕西蓝田'),
  // 陇西、北地、上郡
  S('didao', '狄道（陇西郡）', 'Didao (Longxi)', 103.85, 35.38, '甘肃临洮', { r: 300 }),
  S('lintao', '临洮', 'Lintao', 104.03, 34.43, '甘肃岷县', { r: 240 }),
  S('shanggui', '上邽', 'Shanggui', 105.72, 34.58, '甘肃天水'),
  S('yuzhong', '榆中', 'Yuzhong', 104.12, 35.85, '甘肃榆中', { r: 240 }),
  S('yiqu', '义渠（北地郡）', 'Yiqu (Beidi)', 107.64, 35.73, '甘肃宁县'),
  S('wushi', '乌氏', 'Wushi', 106.66, 35.54, '甘肃平凉西北'),
  S('chaona', '朝那', 'Chaona', 106.30, 35.95, '宁夏彭阳', { r: 240 }),
  S('fushi', '肤施（上郡）', 'Fushi (Shang commandery)', 109.85, 38.10, '陕西榆林东南', { r: 300 }),
  S('gaonu', '高奴', 'Gaonu', 109.49, 36.60, '陕西延安'),
  // 北边
  S('jiuyuan', '九原', 'Jiuyuan', 109.82, 40.60, '内蒙古包头', { r: 280 }),
  S('xinqinzhong', '新秦中（河南地）', 'Xinqinzhong (land south of the bend)', 108.90, 39.40, '内蒙古鄂尔多斯', { r: 320 }),
  S('fuping', '富平', 'Fuping', 106.50, 38.20, '宁夏吴忠', { r: 260 }),
  S('beijia', '北假', 'Beijia', 107.80, 40.85, '内蒙古河套平原', { r: 220 }),
  S('gaoque', '高阙', 'Gaoque Pass', 107.10, 41.10, '内蒙古乌拉特后旗东南', { r: 200 }),
  S('yunzhong', '云中', 'Yunzhong', 111.35, 40.55, '内蒙古托克托', { r: 260 }),
  S('shanwu', '善无（雁门郡）', 'Shanwu (Yanmen)', 112.45, 40.00, '山西右玉', { r: 240 }),
  S('loufan', '楼烦', 'Loufan', 112.30, 39.00, '山西宁武一带'),
  S('dai', '代（代郡）', 'Dai', 114.75, 39.85, '河北蔚县', { r: 240 }),
  // 河东、太原、上党
  S('anyi', '安邑（河东郡）', 'Anyi (Hedong)', 111.11, 35.06, '山西夏县'),
  S('pingyang', '平阳', 'Pingyang', 111.52, 36.08, '山西临汾'),
  S('puban', '蒲阪', 'Puban', 110.33, 34.83, '山西永济'),
  S('jinyang', '晋阳（太原郡）', 'Jinyang (Taiyuan)', 112.48, 37.82, '山西太原', { r: 280 }),
  S('lishi', '离石', 'Lishi', 111.15, 37.52, '山西吕梁'),
  S('zhangzi', '长子（上党郡）', 'Zhangzi (Shangdang)', 112.88, 36.12, '山西长子', { r: 240 }),
  // 三川、河内、颍川、南阳、东郡
  S('luoyang', '洛阳（三川郡）', 'Luoyang (Sanchuan)', 112.62, 34.72, '河南洛阳', { b: 10 }),
  S('xingyang', '荥阳', 'Xingyang', 113.38, 34.80, '河南荥阳'),
  S('yiyang', '宜阳', 'Yiyang', 112.18, 34.52, '河南宜阳'),
  S('huai', '怀（河内郡）', 'Huai (Henei)', 113.25, 35.06, '河南武陟'),
  S('zhaoge', '朝歌', 'Zhaoge', 114.20, 35.60, '河南淇县'),
  S('yangdi', '阳翟（颍川郡）', 'Yangdi (Yingchuan)', 113.47, 34.15, '河南禹州'),
  S('xinzheng', '新郑', 'Xinzheng', 113.74, 34.40, '河南新郑'),
  S('wan', '宛（南阳郡）', 'Wan (Nanyang)', 112.53, 33.00, '河南南阳', { r: 280 }),
  S('puyang', '濮阳（东郡）', 'Puyang (Dong commandery)', 115.03, 35.76, '河南濮阳'),
  S('chenliu', '陈留', 'Chenliu', 114.80, 34.70, '河南开封陈留'),
  // 邯郸、巨鹿、恒山
  S('handan', '邯郸', 'Handan', 114.49, 36.61, '河北邯郸'),
  S('xiangguo', '襄国（信都）', 'Xiangguo', 114.50, 37.06, '河北邢台'),
  S('julu', '巨鹿', 'Julu', 115.03, 37.10, '河北平乡'),
  S('dongyuan', '东垣（恒山郡）', 'Dongyuan (Hengshan)', 114.55, 38.08, '河北石家庄东北'),
  S('lunu', '卢奴', 'Lunu', 115.00, 38.52, '河北定州'),
  // 燕地
  S('ji', '蓟（广阳郡）', 'Ji (Guangyang)', 116.35, 39.88, '北京', { b: 10 }),
  S('zhuo', '涿', 'Zhuo', 115.97, 39.49, '河北涿州'),
  S('wuyang', '武阳', 'Wuyang', 115.45, 39.38, '河北易县'),
  S('juyang', '沮阳（上谷郡）', 'Juyang (Shanggu)', 115.55, 40.38, '河北怀来', { r: 250 }),
  S('yuyang', '渔阳', 'Yuyang', 116.85, 40.37, '北京密云', { r: 250 }),
  S('wuzhong', '无终（右北平郡）', 'Wuzhong (Youbeiping)', 117.40, 40.05, '天津蓟州', { r: 260 }),
  S('yangle', '阳乐（辽西郡）', 'Yangle (Liaoxi)', 121.20, 41.50, '辽宁义县一带', { r: 300 }),
  S('xiangping', '襄平（辽东郡）', 'Xiangping (Liaodong)', 123.18, 41.27, '辽宁辽阳', { r: 320 }),
  // 齐地
  S('linzi', '临淄（齐郡）', 'Linzi (Qi commandery)', 118.35, 36.82, '山东淄博', { b: 15 }),
  S('boyang', '博阳（济北郡）', 'Boyang (Jibei)', 117.10, 36.20, '山东泰安东南'),
  S('jimo', '即墨（胶东郡）', 'Jimo (Jiaodong)', 120.00, 36.60, '山东平度东南', { r: 300 }),
  S('huang', '黄', 'Huang', 120.40, 37.55, '山东龙口', { r: 300 }),
  S('langya', '琅邪', 'Langya', 119.95, 35.65, '山东青岛黄岛区'),
  S('ju', '莒', 'Ju', 118.83, 35.58, '山东莒县'),
  S('raoan', '饶安', 'Rao’an', 117.10, 38.10, '河北盐山', { r: 230 }),
  // 砀、泗水、薛、东海、陈
  S('dang', '砀（砀郡）', 'Dang', 116.43, 34.15, '河南永城芒砀山一带'),
  S('suiyang', '睢阳', 'Suiyang', 115.65, 34.42, '河南商丘'),
  S('dingtao', '定陶', 'Dingtao', 115.57, 35.07, '山东定陶'),
  S('xiang', '相（泗水郡）', 'Xiang (Sishui)', 116.75, 33.93, '安徽淮北'),
  S('pei', '沛', 'Pei', 116.93, 34.73, '江苏沛县'),
  S('pengcheng', '彭城', 'Pengcheng', 117.18, 34.26, '江苏徐州', { b: 10 }),
  S('lu', '鲁（薛郡）', 'Lu (Xue commandery)', 116.99, 35.58, '山东曲阜'),
  S('tan', '郯（东海郡）', 'Tan (Donghai)', 118.35, 34.62, '山东郯城'),
  S('xiapi', '下邳', 'Xiapi', 117.95, 34.32, '江苏睢宁'),
  S('xuyi', '盱眙', 'Xuyi', 118.53, 33.00, '江苏盱眙'),
  S('chen', '陈（陈郡）', 'Chen', 114.88, 33.73, '河南淮阳'),
  S('pingyu', '平舆', 'Pingyu', 114.65, 32.95, '河南平舆'),
  // 九江、衡山、会稽、鄣
  S('shouchun', '寿春（九江郡）', 'Shouchun (Jiujiang)', 116.79, 32.58, '安徽寿县'),
  S('liu', '六', 'Liu', 116.50, 31.75, '安徽六安'),
  S('juchao', '居巢', 'Juchao', 117.87, 31.60, '安徽巢湖'),
  S('shu', '舒', 'Shu', 116.94, 31.46, '安徽舒城'),
  S('zhu', '邾（衡山郡）', 'Zhu (Hengshan)', 114.90, 30.45, '湖北黄冈', { r: 280 }),
  S('fan', '番（番阳）', 'Fan (Poyang)', 116.68, 29.00, '江西鄱阳', { r: 420 }),
  S('guangling', '广陵', 'Guangling', 119.43, 32.40, '江苏扬州', { r: 270 }),
  S('wu', '吴（会稽郡）', 'Wu (Kuaiji)', 120.62, 31.30, '江苏苏州', { r: 300 }),
  S('shanyin', '山阴', 'Shanyin', 120.58, 30.00, '浙江绍兴', { r: 380 }),
  S('guzhang', '故鄣（鄣郡）', 'Guzhang (Zhang commandery)', 119.60, 30.90, '浙江安吉', { r: 280 }),
  // 南郡、黔中、长沙
  S('jiangling', '江陵（南郡）', 'Jiangling (Nan commandery)', 112.18, 30.35, '湖北荆州', { b: 10 }),
  S('yan', '鄢', 'Yan', 112.20, 31.70, '湖北宜城'),
  S('yiling', '夷陵', 'Yiling', 111.30, 30.70, '湖北宜昌'),
  S('wuxian', '巫', 'Wu', 109.88, 31.08, '重庆巫山', { r: 300 }),
  S('yuanling', '沅陵（黔中郡）', 'Yuanling (Qianzhong)', 110.39, 28.47, '湖南沅陵', { r: 400 }),
  S('linxiang', '临湘（长沙郡）', 'Linxiang (Changsha)', 112.94, 28.23, '湖南长沙', { r: 400 }),
  S('chenxian', '郴', 'Chen', 113.03, 25.78, '湖南郴州', { r: 300 }),
  S('cangwu', '苍梧', 'Cangwu', 111.95, 25.60, '湖南宁远一带', { r: 300 }),
  // 汉中、巴、蜀
  S('nanzheng', '南郑（汉中郡）', 'Nanzheng (Hanzhong)', 107.03, 33.07, '陕西汉中', { r: 320 }),
  S('shangyong', '上庸', 'Shangyong', 110.25, 32.33, '湖北竹山', { r: 270 }),
  S('chengdu', '成都（蜀郡）', 'Chengdu (Shu commandery)', 104.07, 30.67, '四川成都', { r: 420, b: 15 }),
  S('linqiong', '临邛', 'Linqiong', 103.46, 30.41, '四川邛崃', { r: 300 }),
  S('yandao', '严道', 'Yandao', 102.85, 29.80, '四川荥经', { r: 260 }),
  S('jiameng', '葭萌', 'Jiameng', 105.80, 32.25, '四川广元', { r: 300 }),
  S('langzhong', '阆中', 'Langzhong', 105.98, 31.58, '四川阆中', { r: 300 }),
  S('jiangzhou', '江州（巴郡）', 'Jiangzhou (Ba commandery)', 106.55, 29.56, '重庆', { r: 380 }),
  S('zhi', '枳', 'Zhi', 107.38, 29.70, '重庆涪陵', { r: 280 }),
  S('bodao', '僰道', 'Bodao', 104.62, 28.77, '四川宜宾', { r: 280 }),
  // 闽中、岭南
  S('dongye', '东冶（闽中郡）', 'Dongye (Minzhong)', 119.30, 26.08, '福建福州', { r: 420 }),
  S('dongou', '东瓯', 'Dong’ou', 120.65, 28.00, '浙江温州', { r: 260 }),
  S('panyu', '番禺（南海郡）', 'Panyu (Nanhai)', 113.26, 23.13, '广东广州', { r: 400 }),
  S('longchuan', '龙川', 'Longchuan', 115.25, 24.10, '广东龙川', { r: 300 }),
  S('bushan', '布山（桂林郡）', 'Bushan (Guilin commandery)', 109.60, 23.10, '广西贵港', { r: 420 }),
  S('linchen', '临尘（象郡）', 'Linchen (Xiang commandery)', 107.36, 22.40, '广西崇左', { r: 400 }),
  S('jiaozhi', '交趾（雒越）', 'Jiaozhi (Lac Viet)', 105.90, 21.10, '越南北宁一带', { r: 380 }),
  // neighbours
  S('xiongnu', '匈奴（头曼城）', 'Xiongnu', 106.50, 42.00, '阴山以北', { r: 1000 }),
  S('xiongnu_n', '匈奴（漠北）', 'Xiongnu (north of the Gobi)', 103.00, 47.30, '蒙古国中部', { r: 1000 }),
  S('donghu', '东胡', 'Donghu', 118.90, 42.27, '内蒙古赤峰一带', { r: 650 }),
  S('donghu_n', '东胡（北部）', 'Donghu (north)', 121.00, 45.50, '内蒙古东部', { r: 600 }),
  S('yuezhi', '月氏', 'Yuezhi', 100.45, 38.93, '甘肃张掖一带', { r: 900 }),
  S('qiang', '羌', 'Qiang', 101.78, 36.62, '青海西宁一带', { r: 650 }),
  S('qiang_s', '羌（河曲）', 'Qiang (upper Yellow River)', 102.30, 33.70, '四川若尔盖一带', { r: 500 }),
  S('dian', '滇', 'Dian', 102.70, 24.70, '云南晋宁', { r: 560 }),
  S('yelang', '夜郎', 'Yelang', 105.30, 26.20, '贵州西部', { r: 520 }),
  S('chaoxian', '朝鲜（王险城）', 'Gojoseon (Wanggeom)', 125.75, 39.03, '朝鲜平壤', { r: 520 }),
  S('qiuci', '龟兹', 'Kucha', 82.96, 41.70, '新疆库车', { r: 480 }),
  S('yutian', '于阗', 'Khotan', 79.92, 37.12, '新疆和田', { r: 450 }),
  S('shule', '疏勒', 'Kashgar', 75.99, 39.47, '新疆喀什', { r: 400 }),
  S('loulan', '楼兰', 'Loulan', 89.90, 40.50, '新疆罗布泊西北', { r: 380 }),
  S('jushi', '车师', 'Jushi', 89.06, 42.95, '新疆吐鲁番', { r: 360 }),
];

const H: Record<string, Hold[]> = {};
/** from `y` on, `p` holds the seats `ids`, per source `src` */
// a later statement for the same year replaces the earlier one
const at = (y: number, p: string | null, src: string, ...ids: string[]) => {
  for (const id of ids) { const h = (H[id] ??= []); if (h.at(-1)?.[0] === y) h.pop(); h.push([y, p, src]); }
};

const Q = 'qin', HAN = 'whan';

// 221 BCE: the empire of 36 commanderies
at(-221, Q, 'sj.qsh', ...seats.map(s => s.id).filter(id => ![
  'xinqinzhong', 'fuping', 'beijia', 'gaoque', 'panyu', 'longchuan', 'bushan', 'linchen', 'jiaozhi', 'dongou',
  'xiongnu', 'xiongnu_n', 'donghu', 'donghu_n', 'yuezhi', 'qiang', 'qiang_s', 'dian', 'yelang', 'chaoxian',
  'qiuci', 'yutian', 'shule', 'loulan', 'jushi', 'dongye'].includes(id)));
at(-221, Q, 'sj.dy', 'dongye');
at(-221, 'minyue', 'sj.dy', 'dongou');
at(-221, 'xiongnu', 'sj.xyn', 'xinqinzhong', 'fuping', 'beijia', 'gaoque', 'xiongnu');
at(-221, null, 'est', 'xiongnu_n');
at(-221, 'nanyue', 'sj.ny', 'panyu', 'longchuan', 'bushan', 'linchen', 'jiaozhi');
at(-221, 'donghu', 'sj.xyn', 'donghu', 'donghu_n');
at(-221, 'yuezhi', 'sj.xyn', 'yuezhi');
at(-221, 'qiang', 'est', 'qiang', 'qiang_s');
at(-221, 'dian', 'sj.xny', 'dian');
at(-221, 'yelang', 'sj.xny', 'yelang');
at(-221, 'chaoxian', 'sj.cx', 'chaoxian');
at(-221, 'qin_xiyu', 'est', 'qiuci', 'yutian', 'shule', 'loulan', 'jushi');

// 214 BCE: Meng Tian takes the land south of the bend; the Lingnan becomes Nanhai, Guilin and Xiang
at(-214, Q, 'sj.mt', 'xinqinzhong', 'fuping', 'beijia', 'gaoque');
at(-214, Q, 'sj.qsh', 'panyu', 'longchuan', 'bushan', 'linchen');

// 209–207 BCE: the risings
at(-209, 'xiongnu', 'sj.xyn', 'xinqinzhong', 'fuping', 'beijia', 'gaoque', 'jiuyuan');
at(-209, 'minyue', 'sj.dy', 'dongye');
at(-209, 'qin_chu', 'sj.cs', 'chen', 'xiang', 'pei', 'dang');
at(-209, 'qin_chu', 'sj.xy', 'wu', 'shanyin', 'guzhang');
at(-209, 'qin_zhao', 'sj.zr', 'handan', 'xiangguo', 'julu', 'dongyuan', 'lunu', 'dai');
at(-209, 'qin_yan', 'sj.cs', 'ji', 'zhuo', 'wuyang', 'juyang', 'yuyang', 'wuzhong', 'yangle', 'xiangping');
at(-209, 'qin_qi', 'sj.tdan', 'linzi', 'boyang', 'jimo', 'huang', 'langya', 'ju', 'raoan');
at(-208, 'qin_chu', 'sj.xy', 'pengcheng', 'xuyi', 'xiapi', 'tan', 'lu', 'guangling', 'shouchun', 'liu', 'juchao', 'shu', 'suiyang', 'pingyu');
at(-208, 'qin_chu', 'sj.qb', 'fan', 'zhu');
at(-208, 'qin_nanyue', 'sj.ny', 'panyu', 'longchuan');
at(-207, HAN, 'sj.gz', 'wan', 'shang', 'lantian');

// 206 BCE: Xiang Yu shares out the empire; by the year's end Liu Bang is back in the Wei valley, Tian Rong holds all
// of Qi and Zang Tu has taken Liaodong
at(-206, HAN, 'sj.xy', 'nanzheng', 'shangyong', 'chengdu', 'linqiong', 'yandao', 'jiameng', 'langzhong', 'jiangzhou', 'zhi', 'bodao');
at(-206, HAN, 'sj.gz', 'xianyang', 'yueyang', 'yong', 'chencang', 'zheng', 'gaonu', 'fushi');
at(-206, 'qin_yong', 'sj.xy', 'feiqiu', 'didao', 'lintao', 'shanggui', 'yuzhong', 'yiqu', 'wushi', 'chaona');
at(-206, 'qin_xiwei', 'sj.wb', 'anyi', 'pingyang', 'puban', 'zhangzi');
at(-206, 'qin_henan', 'sj.xy', 'luoyang', 'xingyang', 'yiyang');
at(-206, 'qin_han', 'sj.xy', 'yangdi', 'xinzheng');
at(-206, 'qin_yin', 'sj.xy', 'huai', 'zhaoge');
at(-206, 'qin_changshan', 'sj.zr', 'handan', 'xiangguo', 'julu', 'dongyuan', 'lunu');
at(-206, 'qin_dai', 'sj.zr', 'dai', 'shanwu', 'loufan', 'yunzhong', 'jinyang', 'lishi');
at(-206, 'qin_jiujiang', 'sj.qb', 'shouchun', 'liu', 'juchao', 'shu');
at(-206, 'qin_hengshan', 'sj.xy', 'zhu', 'fan');
at(-206, 'qin_linjiang', 'sj.xy', 'jiangling', 'yan', 'yiling', 'wuxian', 'yuanling', 'linxiang', 'chenxian', 'cangwu');
at(-206, 'qin_xichu', 'sj.xy', 'pengcheng', 'xiang', 'pei', 'dang', 'suiyang', 'dingtao', 'chen', 'pingyu', 'lu', 'tan',
  'xiapi', 'xuyi', 'guangling', 'wu', 'shanyin', 'guzhang', 'puyang', 'chenliu');
at(-206, 'qin_qi', 'sj.tdan', 'linzi', 'boyang', 'jimo', 'huang', 'langya', 'ju', 'raoan');
at(-206, 'qin_yan', 'sj.xy', 'ji', 'zhuo', 'wuyang', 'juyang', 'yuyang', 'wuzhong', 'yangle', 'xiangping');
at(-206, 'qin_nanyue', 'sj.ny', 'bushan', 'linchen');
at(-206, 'xiongnu', 'sj.xyn', 'donghu', 'donghu_n', 'xiongnu_n');

// 205–203 BCE: Han takes the north; Chu takes Jiujiang
at(-205, HAN, 'sj.gz', 'feiqiu', 'didao', 'lintao', 'shanggui', 'yuzhong', 'yiqu', 'wushi', 'chaona',
  'luoyang', 'xingyang', 'yiyang', 'huai', 'zhaoge');
at(-205, HAN, 'sj.hx', 'anyi', 'pingyang', 'puban', 'zhangzi', 'dai', 'shanwu', 'loufan', 'yunzhong', 'jinyang', 'lishi');
at(-205, HAN, 'sj.hxw', 'yangdi', 'xinzheng');
at(-205, 'qin_zhao', 'sj.zr', 'handan', 'xiangguo', 'julu', 'dongyuan', 'lunu');
at(-204, HAN, 'sj.hx', 'handan', 'xiangguo', 'julu', 'dongyuan', 'lunu');
at(-204, 'qin_xichu', 'sj.qb', 'shouchun', 'liu', 'juchao', 'shu');
at(-203, HAN, 'sj.hx', 'linzi', 'boyang', 'jimo', 'huang', 'langya', 'ju', 'raoan');

const holds = Object.fromEntries(Object.entries(H).map(([k, v]) => [k, v.sort((a, b) => a[0] - b[0])]));

export const QIN: OwnEra = {
  replaces: 'qin',
  reach: 260,
  polities: [
    { id: 'qin_xiyu', name: { zh: '西域诸国', en: 'Oasis states of the Western Regions' }, color: '#c2b49a', role: 'neighbor' },
    { id: 'qin_nanyue', name: { zh: '南越国（赵佗）', en: 'Nanyue (Zhao Tuo)' }, color: '#9aa86a', role: 'rival' },
    { id: 'qin_chu', name: { zh: '楚（陈胜、项梁）', en: 'Chu (Chen Sheng, Xiang Liang)' }, color: '#3b7a57', role: 'rival' },
    { id: 'qin_zhao', name: { zh: '赵', en: 'Zhao' }, color: '#8e6bb0', role: 'rival' },
    { id: 'qin_yan', name: { zh: '燕', en: 'Yan' }, color: '#1f9e89', role: 'rival' },
    { id: 'qin_qi', name: { zh: '齐', en: 'Qi' }, color: '#2e86c1', role: 'rival' },
    { id: 'qin_xichu', name: { zh: '西楚（项羽）', en: 'Western Chu (Xiang Yu)' }, color: '#2d6b3f', role: 'rival' },
    { id: 'qin_yong', name: { zh: '雍（章邯）', en: 'Yong (Zhang Han)' }, color: '#5d6d7e', role: 'rival' },
    { id: 'qin_xiwei', name: { zh: '西魏（魏豹）', en: 'Western Wei (Wei Bao)' }, color: '#c9a227', role: 'rival' },
    { id: 'qin_henan', name: { zh: '河南（申阳）', en: 'Henan (Shen Yang)' }, color: '#a0785a', role: 'rival' },
    { id: 'qin_han', name: { zh: '韩', en: 'Han (state)' }, color: '#dc7633', role: 'rival' },
    { id: 'qin_yin', name: { zh: '殷（司马卬）', en: 'Yin (Sima Ang)' }, color: '#9c640c', role: 'rival' },
    { id: 'qin_changshan', name: { zh: '常山（张耳）', en: 'Changshan (Zhang Er)' }, color: '#7d5ba6', role: 'rival' },
    { id: 'qin_dai', name: { zh: '代（赵歇）', en: 'Dai (Zhao Xie)' }, color: '#af7ac5', role: 'rival' },
    { id: 'qin_jiujiang', name: { zh: '九江（英布）', en: 'Jiujiang (Ying Bu)' }, color: '#76448a', role: 'rival' },
    { id: 'qin_hengshan', name: { zh: '衡山（吴芮）', en: 'Hengshan (Wu Rui)' }, color: '#48a99a', role: 'rival' },
    { id: 'qin_linjiang', name: { zh: '临江（共敖）', en: 'Linjiang (Gong Ao)' }, color: '#cd6155', role: 'rival' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_qin_1', from: -221, to: -215, at: -218, title: { zh: '秦并天下，分三十六郡（约前218年）', en: 'Qin unites the realm in 36 commanderies (c. 218 BCE)' } },
    { id: 'o_qin_2', from: -214, to: -210, at: -212, title: { zh: '北取河南地，南置岭南三郡（约前212年）', en: 'Qin takes the Ordos and founds three commanderies in the far south (c. 212 BCE)' } },
    { id: 'o_qin_3', from: -209, to: -207, at: -208, title: { zh: '陈胜起事，六国复起（前208年）', en: 'Chen Sheng rises; the old states return (208 BCE)' } },
    { id: 'o_qin_4', from: -206, to: -206, at: -206, title: { zh: '项羽分封诸王，汉还定三秦（前206年）', en: 'Xiang Yu shares out kingdoms; Han wins back the Wei valley (206 BCE)' } },
    { id: 'o_qin_5', from: -205, to: -202, at: -203, title: { zh: '楚汉相争（约前203年）', en: 'Chu and Han at war (c. 203 BCE)' } },
  ],
  sources: {
    'sj.qsh': { zh: '《史记·秦始皇本纪》', en: 'Shiji, Annals of the First Emperor' },
    'sj.xy': { zh: '《史记·项羽本纪》', en: 'Shiji, Annals of Xiang Yu' },
    'sj.gz': { zh: '《史记·高祖本纪》', en: 'Shiji, Annals of Emperor Gaozu' },
    'sj.cs': { zh: '《史记·陈涉世家》', en: 'Shiji, House of Chen She' },
    'sj.mt': { zh: '《史记·蒙恬列传》', en: 'Shiji, Biography of Meng Tian' },
    'sj.zr': { zh: '《史记·张耳陈余列传》', en: 'Shiji, Biographies of Zhang Er and Chen Yu' },
    'sj.tdan': { zh: '《史记·田儋列传》', en: 'Shiji, Biography of Tian Dan (of Qi)' },
    'sj.qb': { zh: '《史记·黥布列传》', en: 'Shiji, Biography of Qing Bu' },
    'sj.wb': { zh: '《史记·魏豹彭越列传》', en: 'Shiji, Biographies of Wei Bao and Peng Yue' },
    'sj.hx': { zh: '《史记·淮阴侯列传》', en: 'Shiji, Biography of the Marquis of Huaiyin (Han Xin)' },
    'sj.hxw': { zh: '《史记·韩信卢绾列传》', en: 'Shiji, Biographies of Han Xin (king of Han) and Lu Wan' },
    'sj.xyn': { zh: '《史记·匈奴列传》', en: 'Shiji, Account of the Xiongnu' },
    'sj.ny': { zh: '《史记·南越列传》', en: 'Shiji, Account of Southern Yue' },
    'sj.dy': { zh: '《史记·东越列传》', en: 'Shiji, Account of Eastern Yue' },
    'sj.xny': { zh: '《史记·西南夷列传》', en: 'Shiji, Account of the Southwestern Peoples' },
    'sj.cx': { zh: '《史记·朝鲜列传》', en: 'Shiji, Account of Joseon' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
