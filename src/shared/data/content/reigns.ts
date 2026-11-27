import type { Year } from '../types.ts';
import type { Content } from './types.ts';

/**
 * Reign eras (年号). REIGNS is the orthodox (正统) line of the national textbooks' chronological tables, 403 BCE – 1911:
 * 周 to 256 BCE, then 秦; 新 and 更始 between the two Han; 魏 for the Three Kingdoms; 东晋 and the southern dynasties
 * for the Sixteen Kingdoms and 南北朝 (陈 to 588, 隋 from 589); the Five Dynasties; 南宋 after 1127; 元 from 1279; 明
 * to 1643 and 清 from 1644. Each span begins in the year of the era's first year (元年); where several eras were
 * proclaimed within one year, only the one the year is reckoned by in the 《资治通鉴》 tradition is kept. Before 140 BCE
 * (no era names) a span carries the ruler's regnal count. A ruler who kept his predecessor's era gets a span of his own
 * with the running year number.
 *
 * REGIONAL lists the eras of rival regimes, shown on hover. Facts from the standard histories; dates of rival regimes
 * follow the usual tables (e.g. 《中国历史年代简表》).
 */

type Span = Content['reigns'][number];
type E = [first: Year, era: string, pinyin: string, n?: number];

/** one ruler's eras */
const R = (zh: string, en: string, eras: E[]): Span[] => eras.map(([y, era, py, n = 1]) => [y, era, n, zh, en, py]);

export const REIGNS: Content['reigns'] = [
  // 东周 (战国)
  ...R('周威烈王', 'King Weilie of Zhou', [[-403, '威烈王', '', 23]]),
  ...R('周安王', 'King An of Zhou', [[-401, '安王', '']]),
  ...R('周烈王', 'King Lie of Zhou', [[-375, '烈王', '']]),
  ...R('周显王', 'King Xian of Zhou', [[-368, '显王', '']]),
  ...R('周慎靓王', 'King Shenjing of Zhou', [[-320, '慎靓王', '']]),
  ...R('周赧王', 'King Nan of Zhou', [[-314, '赧王', '']]),
  // 秦
  ...R('秦昭襄王', 'King Zhaoxiang of Qin', [[-255, '昭襄王', '', 52]]),
  ...R('秦孝文王', 'King Xiaowen of Qin', [[-250, '孝文王', '']]),
  ...R('秦庄襄王', 'King Zhuangxiang of Qin', [[-249, '庄襄王', '']]),
  ...R('秦王政', 'Ying Zheng, King of Qin', [[-246, '秦王政', '']]),
  ...R('秦始皇', 'First Emperor of Qin', [[-221, '始皇', '', 26]]),
  ...R('秦二世', 'Second Emperor of Qin', [[-209, '二世', '']]),
  // 西汉
  ...R('汉高祖', 'Emperor Gaozu of Han', [[-206, '高祖', '']]),
  ...R('汉惠帝', 'Emperor Hui of Han', [[-194, '惠帝', '']]),
  ...R('汉高后', 'Empress Dowager Lü', [[-187, '高后', '']]),
  ...R('汉文帝', 'Emperor Wen of Han', [[-179, '前元', 'Qianyuan'], [-163, '后元', 'Houyuan']]),
  ...R('汉景帝', 'Emperor Jing of Han', [[-156, '前元', 'Qianyuan'], [-149, '中元', 'Zhongyuan'], [-143, '后元', 'Houyuan']]),
  ...R('汉武帝', 'Emperor Wu of Han', [
    [-140, '建元', 'Jianyuan'], [-134, '元光', 'Yuanguang'], [-128, '元朔', 'Yuanshuo'], [-122, '元狩', 'Yuanshou'],
    [-116, '元鼎', 'Yuanding'], [-110, '元封', 'Yuanfeng'], [-104, '太初', 'Taichu'], [-100, '天汉', 'Tianhan'],
    [-96, '太始', 'Taishi'], [-92, '征和', 'Zhenghe'], [-88, '后元', 'Houyuan'],
  ]),
  ...R('汉昭帝', 'Emperor Zhao of Han', [[-86, '始元', 'Shiyuan'], [-80, '元凤', 'Yuanfeng'], [-74, '元平', 'Yuanping']]),
  ...R('汉宣帝', 'Emperor Xuan of Han', [
    [-73, '本始', 'Benshi'], [-69, '地节', 'Dijie'], [-65, '元康', 'Yuankang'], [-61, '神爵', 'Shenjue'],
    [-57, '五凤', 'Wufeng'], [-53, '甘露', 'Ganlu'], [-49, '黄龙', 'Huanglong'],
  ]),
  ...R('汉元帝', 'Emperor Yuan of Han', [[-48, '初元', 'Chuyuan'], [-43, '永光', 'Yongguang'], [-38, '建昭', 'Jianzhao'], [-33, '竟宁', 'Jingning']]),
  ...R('汉成帝', 'Emperor Cheng of Han', [
    [-32, '建始', 'Jianshi'], [-28, '河平', 'Heping'], [-24, '阳朔', 'Yangshuo'], [-20, '鸿嘉', 'Hongjia'],
    [-16, '永始', 'Yongshi'], [-12, '元延', 'Yuanyan'], [-8, '绥和', 'Suihe'],
  ]),
  ...R('汉哀帝', 'Emperor Ai of Han', [[-6, '建平', 'Jianping'], [-2, '元寿', 'Yuanshou']]),
  ...R('汉平帝', 'Emperor Ping of Han', [[1, '元始', 'Yuanshi']]),
  ...R('孺子婴', 'Ruzi Ying', [[6, '居摄', 'Jushe'], [8, '初始', 'Chushi']]),
  // 新
  ...R('王莽', 'Wang Mang (Xin)', [[9, '始建国', 'Shijianguo'], [14, '天凤', 'Tianfeng'], [20, '地皇', 'Dihuang']]),
  ...R('更始帝', 'Gengshi Emperor', [[23, '更始', 'Gengshi']]),
  // 东汉
  ...R('汉光武帝', 'Emperor Guangwu of Han', [[25, '建武', 'Jianwu'], [56, '建武中元', 'Jianwu Zhongyuan']]),
  ...R('汉明帝', 'Emperor Ming of Han', [[58, '永平', 'Yongping']]),
  ...R('汉章帝', 'Emperor Zhang of Han', [[76, '建初', 'Jianchu'], [84, '元和', 'Yuanhe'], [87, '章和', 'Zhanghe']]),
  ...R('汉和帝', 'Emperor He of Han', [[89, '永元', 'Yongyuan'], [105, '元兴', 'Yuanxing']]),
  ...R('汉殇帝', 'Emperor Shang of Han', [[106, '延平', 'Yanping']]),
  ...R('汉安帝', 'Emperor An of Han', [
    [107, '永初', 'Yongchu'], [114, '元初', 'Yuanchu'], [120, '永宁', 'Yongning'], [121, '建光', 'Jianguang'], [122, '延光', 'Yanguang'],
  ]),
  ...R('汉顺帝', 'Emperor Shun of Han', [
    [126, '永建', 'Yongjian'], [132, '阳嘉', 'Yangjia'], [136, '永和', 'Yonghe'], [142, '汉安', "Han'an"], [144, '建康', 'Jiankang'],
  ]),
  ...R('汉冲帝', 'Emperor Chong of Han', [[145, '永嘉', 'Yongjia']]),
  ...R('汉质帝', 'Emperor Zhi of Han', [[146, '本初', 'Benchu']]),
  ...R('汉桓帝', 'Emperor Huan of Han', [
    [147, '建和', 'Jianhe'], [150, '和平', 'Heping'], [151, '元嘉', 'Yuanjia'], [153, '永兴', 'Yongxing'],
    [155, '永寿', 'Yongshou'], [158, '延熹', 'Yanxi'], [167, '永康', 'Yongkang'],
  ]),
  ...R('汉灵帝', 'Emperor Ling of Han', [[168, '建宁', 'Jianning'], [172, '熹平', 'Xiping'], [178, '光和', 'Guanghe'], [184, '中平', 'Zhongping']]),
  ...R('汉献帝', 'Emperor Xian of Han', [[190, '初平', 'Chuping'], [194, '兴平', 'Xingping'], [196, '建安', "Jian'an"]]),
  // 三国 (魏)
  ...R('魏文帝', 'Emperor Wen of Wei', [[220, '黄初', 'Huangchu']]),
  ...R('魏明帝', 'Emperor Ming of Wei', [[227, '太和', 'Taihe'], [233, '青龙', 'Qinglong'], [237, '景初', 'Jingchu']]),
  ...R('魏齐王曹芳', 'Cao Fang of Wei', [[240, '正始', 'Zhengshi'], [249, '嘉平', 'Jiaping']]),
  ...R('魏高贵乡公曹髦', 'Cao Mao of Wei', [[254, '正元', 'Zhengyuan'], [256, '甘露', 'Ganlu']]),
  ...R('魏元帝', 'Emperor Yuan of Wei', [[260, '景元', 'Jingyuan'], [264, '咸熙', 'Xianxi']]),
  // 西晋
  ...R('晋武帝', 'Emperor Wu of Jin', [[265, '泰始', 'Taishi'], [275, '咸宁', 'Xianning'], [280, '太康', 'Taikang']]),
  ...R('晋惠帝', 'Emperor Hui of Jin', [
    [290, '永熙', 'Yongxi'], [291, '元康', 'Yuankang'], [300, '永康', 'Yongkang'], [301, '永宁', 'Yongning'],
    [302, '太安', "Tai'an"], [304, '永安', "Yong'an"], [305, '永兴', 'Yongxing', 2], [306, '光熙', 'Guangxi'],
  ]),
  ...R('晋怀帝', 'Emperor Huai of Jin', [[307, '永嘉', 'Yongjia']]),
  ...R('晋愍帝', 'Emperor Min of Jin', [[313, '建兴', 'Jianxing']]),
  // 东晋
  ...R('晋元帝', 'Emperor Yuan of Jin', [[317, '建武', 'Jianwu'], [318, '大兴', 'Daxing'], [322, '永昌', 'Yongchang']]),
  ...R('晋明帝', 'Emperor Ming of Jin', [[323, '太宁', 'Taining']]),
  ...R('晋成帝', 'Emperor Cheng of Jin', [[326, '咸和', 'Xianhe'], [335, '咸康', 'Xiankang']]),
  ...R('晋康帝', 'Emperor Kang of Jin', [[343, '建元', 'Jianyuan']]),
  ...R('晋穆帝', 'Emperor Mu of Jin', [[345, '永和', 'Yonghe'], [357, '升平', 'Shengping']]),
  ...R('晋哀帝', 'Emperor Ai of Jin', [[362, '隆和', 'Longhe'], [363, '兴宁', 'Xingning']]),
  ...R('晋废帝', 'Sima Yi, deposed emperor of Jin', [[366, '太和', 'Taihe']]),
  ...R('晋简文帝', 'Emperor Jianwen of Jin', [[371, '咸安', "Xian'an"]]),
  ...R('晋孝武帝', 'Emperor Xiaowu of Jin', [[373, '宁康', 'Ningkang'], [376, '太元', 'Taiyuan']]),
  ...R('晋安帝', 'Emperor An of Jin', [[397, '隆安', "Long'an"], [402, '元兴', 'Yuanxing'], [405, '义熙', 'Yixi']]),
  ...R('晋恭帝', 'Emperor Gong of Jin', [[419, '元熙', 'Yuanxi']]),
  // 南朝 宋
  ...R('宋武帝', 'Emperor Wu of (Liu) Song', [[420, '永初', 'Yongchu']]),
  ...R('宋少帝', 'Emperor Shao of (Liu) Song', [[423, '景平', 'Jingping']]),
  ...R('宋文帝', 'Emperor Wen of (Liu) Song', [[424, '元嘉', 'Yuanjia']]),
  ...R('宋孝武帝', 'Emperor Xiaowu of (Liu) Song', [[454, '孝建', 'Xiaojian'], [457, '大明', 'Daming']]),
  ...R('宋明帝', 'Emperor Ming of (Liu) Song', [[465, '泰始', 'Taishi'], [472, '泰豫', 'Taiyu']]),
  ...R('宋后废帝', 'Liu Yu, deposed emperor of (Liu) Song', [[473, '元徽', 'Yuanhui']]),
  ...R('宋顺帝', 'Emperor Shun of (Liu) Song', [[477, '昇明', 'Shengming']]),
  // 齐
  ...R('齐高帝', 'Emperor Gao of Southern Qi', [[479, '建元', 'Jianyuan']]),
  ...R('齐武帝', 'Emperor Wu of Southern Qi', [[483, '永明', 'Yongming']]),
  ...R('齐明帝', 'Emperor Ming of Southern Qi', [[494, '建武', 'Jianwu'], [498, '永泰', 'Yongtai']]),
  ...R('齐东昏侯', 'Xiao Baojuan of Southern Qi', [[499, '永元', 'Yongyuan']]),
  ...R('齐和帝', 'Emperor He of Southern Qi', [[501, '中兴', 'Zhongxing']]),
  // 梁
  ...R('梁武帝', 'Emperor Wu of Liang', [
    [502, '天监', 'Tianjian'], [520, '普通', 'Putong'], [527, '大通', 'Datong'], [529, '中大通', 'Zhongdatong'],
    [535, '大同', 'Datong'], [546, '中大同', 'Zhongdatong'], [547, '太清', 'Taiqing'],
  ]),
  ...R('梁简文帝', 'Emperor Jianwen of Liang', [[550, '大宝', 'Dabao']]),
  ...R('梁元帝', 'Emperor Yuan of Liang', [[552, '承圣', 'Chengsheng']]),
  ...R('梁敬帝', 'Emperor Jing of Liang', [[555, '绍泰', 'Shaotai'], [556, '太平', 'Taiping']]),
  // 陈
  ...R('陈武帝', 'Emperor Wu of Chen', [[557, '永定', 'Yongding']]),
  ...R('陈文帝', 'Emperor Wen of Chen', [[560, '天嘉', 'Tianjia'], [566, '天康', 'Tiankang']]),
  ...R('陈废帝', 'Chen Bozong, deposed emperor of Chen', [[567, '光大', 'Guangda']]),
  ...R('陈宣帝', 'Emperor Xuan of Chen', [[569, '太建', 'Taijian']]),
  ...R('陈后主', 'Chen Shubao, last ruler of Chen', [[583, '至德', 'Zhide'], [587, '祯明', 'Zhenming']]),
  // 隋 (orthodox from the conquest of 陈, 589)
  ...R('隋文帝', 'Emperor Wen of Sui', [[589, '开皇', 'Kaihuang', 9], [601, '仁寿', 'Renshou']]),
  ...R('隋炀帝', 'Emperor Yang of Sui', [[605, '大业', 'Daye']]),
  ...R('隋恭帝', 'Emperor Gong of Sui', [[617, '义宁', 'Yining']]),
  // 唐
  ...R('唐高祖', 'Emperor Gaozu of Tang', [[618, '武德', 'Wude']]),
  ...R('唐太宗', 'Emperor Taizong of Tang', [[627, '贞观', 'Zhenguan']]),
  ...R('唐高宗', 'Emperor Gaozong of Tang', [
    [650, '永徽', 'Yonghui'], [656, '显庆', 'Xianqing'], [661, '龙朔', 'Longshuo'], [664, '麟德', 'Linde'],
    [666, '乾封', 'Qianfeng'], [668, '总章', 'Zongzhang'], [670, '咸亨', 'Xianheng'], [674, '上元', 'Shangyuan'],
    [676, '仪凤', 'Yifeng'], [679, '调露', 'Tiaolu'], [680, '永隆', 'Yonglong'], [681, '开耀', 'Kaiyao'],
    [682, '永淳', 'Yongchun'], [683, '弘道', 'Hongdao'],
  ]),
  ...R('武则天', 'Wu Zetian', [
    [684, '光宅', 'Guangzhai'], [685, '垂拱', 'Chuigong'], [689, '永昌', 'Yongchang'], [690, '天授', 'Tianshou'],
    [692, '长寿', 'Changshou'], [694, '延载', 'Yanzai'], [695, '天册万岁', 'Tiance Wansui'], [696, '万岁通天', 'Wansui Tongtian'],
    [697, '神功', 'Shengong'], [698, '圣历', 'Shengli'], [700, '久视', 'Jiushi'], [701, '长安', "Chang'an"],
  ]),
  ...R('唐中宗', 'Emperor Zhongzong of Tang', [[705, '神龙', 'Shenlong'], [707, '景龙', 'Jinglong']]),
  ...R('唐睿宗', 'Emperor Ruizong of Tang', [[710, '景云', 'Jingyun']]),
  ...R('唐玄宗', 'Emperor Xuanzong of Tang', [[712, '先天', 'Xiantian'], [713, '开元', 'Kaiyuan'], [742, '天宝', 'Tianbao']]),
  ...R('唐肃宗', 'Emperor Suzong of Tang', [[756, '至德', 'Zhide'], [758, '乾元', 'Qianyuan'], [760, '上元', 'Shangyuan']]),
  ...R('唐代宗', 'Emperor Daizong of Tang', [[762, '宝应', 'Baoying'], [763, '广德', 'Guangde'], [765, '永泰', 'Yongtai'], [766, '大历', 'Dali']]),
  ...R('唐德宗', 'Emperor Dezong of Tang', [[780, '建中', 'Jianzhong'], [784, '兴元', 'Xingyuan'], [785, '贞元', 'Zhenyuan']]),
  ...R('唐顺宗', 'Emperor Shunzong of Tang', [[805, '永贞', 'Yongzhen']]),
  ...R('唐宪宗', 'Emperor Xianzong of Tang', [[806, '元和', 'Yuanhe']]),
  ...R('唐穆宗', 'Emperor Muzong of Tang', [[821, '长庆', 'Changqing']]),
  ...R('唐敬宗', 'Emperor Jingzong of Tang', [[825, '宝历', 'Baoli']]),
  ...R('唐文宗', 'Emperor Wenzong of Tang', [[827, '大和', 'Dahe'], [836, '开成', 'Kaicheng']]),
  ...R('唐武宗', 'Emperor Wuzong of Tang', [[841, '会昌', 'Huichang']]),
  ...R('唐宣宗', 'Emperor Xuanzong of Tang', [[847, '大中', 'Dazhong']]),
  ...R('唐懿宗', 'Emperor Yizong of Tang', [[860, '咸通', 'Xiantong']]),
  ...R('唐僖宗', 'Emperor Xizong of Tang', [
    [874, '乾符', 'Qianfu'], [880, '广明', 'Guangming'], [881, '中和', 'Zhonghe'], [885, '光启', 'Guangqi'], [888, '文德', 'Wende'],
  ]),
  ...R('唐昭宗', 'Emperor Zhaozong of Tang', [
    [889, '龙纪', 'Longji'], [890, '大顺', 'Dashun'], [892, '景福', 'Jingfu'], [894, '乾宁', 'Qianning'],
    [898, '光化', 'Guanghua'], [901, '天复', 'Tianfu'], [904, '天祐', 'Tianyou'],
  ]),
  ...R('唐哀帝', 'Emperor Ai of Tang', [[905, '天祐', 'Tianyou', 2]]),
  // 五代
  ...R('后梁太祖', 'Emperor Taizu of Later Liang', [[907, '开平', 'Kaiping'], [911, '乾化', 'Qianhua']]),
  ...R('后梁末帝', 'Zhu Youzhen, last emperor of Later Liang', [[913, '乾化', 'Qianhua', 3], [915, '贞明', 'Zhenming'], [921, '龙德', 'Longde']]),
  ...R('后唐庄宗', 'Emperor Zhuangzong of Later Tang', [[923, '同光', 'Tongguang']]),
  ...R('后唐明宗', 'Emperor Mingzong of Later Tang', [[926, '天成', 'Tiancheng'], [930, '长兴', 'Changxing']]),
  ...R('后唐末帝', 'Li Congke, last emperor of Later Tang', [[934, '清泰', 'Qingtai']]),
  ...R('后晋高祖', 'Emperor Gaozu of Later Jin', [[936, '天福', 'Tianfu']]),
  ...R('后晋出帝', 'Shi Chonggui, last emperor of Later Jin', [[943, '天福', 'Tianfu', 8], [944, '开运', 'Kaiyun']]),
  ...R('后汉高祖', 'Emperor Gaozu of Later Han', [[947, '天福', 'Tianfu', 12], [948, '乾祐', 'Qianyou']]),
  ...R('后汉隐帝', 'Emperor Yin of Later Han', [[949, '乾祐', 'Qianyou', 2]]),
  ...R('后周太祖', 'Emperor Taizu of Later Zhou', [[951, '广顺', 'Guangshun'], [954, '显德', 'Xiande']]),
  ...R('后周世宗', 'Emperor Shizong of Later Zhou', [[955, '显德', 'Xiande', 2]]),
  // 北宋
  ...R('宋太祖', 'Emperor Taizu of Song', [[960, '建隆', 'Jianlong'], [963, '乾德', 'Qiande'], [968, '开宝', 'Kaibao']]),
  ...R('宋太宗', 'Emperor Taizong of Song', [
    [976, '太平兴国', 'Taiping Xingguo'], [984, '雍熙', 'Yongxi'], [988, '端拱', 'Duangong'], [990, '淳化', 'Chunhua'], [995, '至道', 'Zhidao'],
  ]),
  ...R('宋真宗', 'Emperor Zhenzong of Song', [
    [998, '咸平', 'Xianping'], [1004, '景德', 'Jingde'], [1008, '大中祥符', 'Dazhong Xiangfu'], [1017, '天禧', 'Tianxi'], [1022, '乾兴', 'Qianxing'],
  ]),
  ...R('宋仁宗', 'Emperor Renzong of Song', [
    [1023, '天圣', 'Tiansheng'], [1032, '明道', 'Mingdao'], [1034, '景祐', 'Jingyou'], [1038, '宝元', 'Baoyuan'],
    [1040, '康定', 'Kangding'], [1041, '庆历', 'Qingli'], [1049, '皇祐', 'Huangyou'], [1054, '至和', 'Zhihe'], [1056, '嘉祐', 'Jiayou'],
  ]),
  ...R('宋英宗', 'Emperor Yingzong of Song', [[1064, '治平', 'Zhiping']]),
  ...R('宋神宗', 'Emperor Shenzong of Song', [[1068, '熙宁', 'Xining'], [1078, '元丰', 'Yuanfeng']]),
  ...R('宋哲宗', 'Emperor Zhezong of Song', [[1086, '元祐', 'Yuanyou'], [1094, '绍圣', 'Shaosheng'], [1098, '元符', 'Yuanfu']]),
  ...R('宋徽宗', 'Emperor Huizong of Song', [
    [1101, '建中靖国', 'Jianzhong Jingguo'], [1102, '崇宁', 'Chongning'], [1107, '大观', 'Daguan'], [1111, '政和', 'Zhenghe'],
    [1118, '重和', 'Chonghe'], [1119, '宣和', 'Xuanhe'],
  ]),
  ...R('宋钦宗', 'Emperor Qinzong of Song', [[1126, '靖康', 'Jingkang']]),
  // 南宋
  ...R('宋高宗', 'Emperor Gaozong of Song', [[1127, '建炎', 'Jianyan'], [1131, '绍兴', 'Shaoxing']]),
  ...R('宋孝宗', 'Emperor Xiaozong of Song', [[1163, '隆兴', 'Longxing'], [1165, '乾道', 'Qiandao'], [1174, '淳熙', 'Chunxi']]),
  ...R('宋光宗', 'Emperor Guangzong of Song', [[1190, '绍熙', 'Shaoxi']]),
  ...R('宋宁宗', 'Emperor Ningzong of Song', [[1195, '庆元', 'Qingyuan'], [1201, '嘉泰', 'Jiatai'], [1205, '开禧', 'Kaixi'], [1208, '嘉定', 'Jiading']]),
  ...R('宋理宗', 'Emperor Lizong of Song', [
    [1225, '宝庆', 'Baoqing'], [1228, '绍定', 'Shaoding'], [1234, '端平', 'Duanping'], [1237, '嘉熙', 'Jiaxi'],
    [1241, '淳祐', 'Chunyou'], [1253, '宝祐', 'Baoyou'], [1259, '开庆', 'Kaiqing'], [1260, '景定', 'Jingding'],
  ]),
  ...R('宋度宗', 'Emperor Duzong of Song', [[1265, '咸淳', 'Xianchun']]),
  ...R('宋恭帝', 'Emperor Gong of Song', [[1275, '德祐', 'Deyou']]),
  ...R('宋端宗', 'Emperor Duanzong of Song', [[1276, '景炎', 'Jingyan']]),
  ...R('宋帝昺', 'Zhao Bing, last emperor of Song', [[1278, '祥兴', 'Xiangxing']]),
  // 元 (orthodox from the fall of the Song, 1279)
  ...R('元世祖', 'Emperor Shizu of Yuan (Khubilai)', [[1279, '至元', 'Zhiyuan', 16]]),
  ...R('元成宗', 'Emperor Chengzong of Yuan', [[1295, '元贞', 'Yuanzhen'], [1297, '大德', 'Dade']]),
  ...R('元武宗', 'Emperor Wuzong of Yuan', [[1308, '至大', 'Zhida']]),
  ...R('元仁宗', 'Emperor Renzong of Yuan', [[1312, '皇庆', 'Huangqing'], [1314, '延祐', 'Yanyou']]),
  ...R('元英宗', 'Emperor Yingzong of Yuan', [[1321, '至治', 'Zhizhi']]),
  ...R('元泰定帝', 'Yesün Temür (Taiding Emperor)', [[1324, '泰定', 'Taiding']]),
  ...R('元文宗', 'Emperor Wenzong of Yuan', [[1328, '天历', 'Tianli'], [1330, '至顺', 'Zhishun']]),
  ...R('元顺帝', 'Emperor Shun of Yuan (Toghon Temür)', [[1333, '元统', 'Yuantong'], [1335, '至元', 'Zhiyuan'], [1341, '至正', 'Zhizheng']]),
  // 明
  ...R('明太祖', 'Hongwu Emperor (Taizu of Ming)', [[1368, '洪武', 'Hongwu']]),
  ...R('明惠帝', 'Jianwen Emperor (Huidi of Ming)', [[1399, '建文', 'Jianwen']]),
  ...R('明成祖', 'Yongle Emperor (Chengzu of Ming)', [[1403, '永乐', 'Yongle']]),
  ...R('明仁宗', 'Hongxi Emperor (Renzong of Ming)', [[1425, '洪熙', 'Hongxi']]),
  ...R('明宣宗', 'Xuande Emperor (Xuanzong of Ming)', [[1426, '宣德', 'Xuande']]),
  ...R('明英宗', 'Zhengtong Emperor (Yingzong of Ming)', [[1436, '正统', 'Zhengtong']]),
  ...R('明代宗', 'Jingtai Emperor (Daizong of Ming)', [[1450, '景泰', 'Jingtai']]),
  ...R('明英宗', 'Tianshun Emperor (Yingzong of Ming, restored)', [[1457, '天顺', 'Tianshun']]),
  ...R('明宪宗', 'Chenghua Emperor (Xianzong of Ming)', [[1465, '成化', 'Chenghua']]),
  ...R('明孝宗', 'Hongzhi Emperor (Xiaozong of Ming)', [[1488, '弘治', 'Hongzhi']]),
  ...R('明武宗', 'Zhengde Emperor (Wuzong of Ming)', [[1506, '正德', 'Zhengde']]),
  ...R('明世宗', 'Jiajing Emperor (Shizong of Ming)', [[1522, '嘉靖', 'Jiajing']]),
  ...R('明穆宗', 'Longqing Emperor (Muzong of Ming)', [[1567, '隆庆', 'Longqing']]),
  ...R('明神宗', 'Wanli Emperor (Shenzong of Ming)', [[1573, '万历', 'Wanli']]),
  ...R('明光宗', 'Taichang Emperor (Guangzong of Ming)', [[1620, '泰昌', 'Taichang']]),
  ...R('明熹宗', 'Tianqi Emperor (Xizong of Ming)', [[1621, '天启', 'Tianqi']]),
  ...R('明思宗', 'Chongzhen Emperor (Sizong of Ming)', [[1628, '崇祯', 'Chongzhen']]),
  // 清
  ...R('清世祖', 'Shunzhi Emperor (Shizu of Qing)', [[1644, '顺治', 'Shunzhi']]),
  ...R('清圣祖', 'Kangxi Emperor (Shengzu of Qing)', [[1662, '康熙', 'Kangxi']]),
  ...R('清世宗', 'Yongzheng Emperor (Shizong of Qing)', [[1723, '雍正', 'Yongzheng']]),
  ...R('清高宗', 'Qianlong Emperor (Gaozong of Qing)', [[1736, '乾隆', 'Qianlong']]),
  ...R('清仁宗', 'Jiaqing Emperor (Renzong of Qing)', [[1796, '嘉庆', 'Jiaqing']]),
  ...R('清宣宗', 'Daoguang Emperor (Xuanzong of Qing)', [[1821, '道光', 'Daoguang']]),
  ...R('清文宗', 'Xianfeng Emperor (Wenzong of Qing)', [[1851, '咸丰', 'Xianfeng']]),
  ...R('清穆宗', 'Tongzhi Emperor (Muzong of Qing)', [[1862, '同治', 'Tongzhi']]),
  ...R('清德宗', 'Guangxu Emperor (Dezong of Qing)', [[1875, '光绪', 'Guangxu']]),
  ...R('清逊帝溥仪', 'Xuantong Emperor (Puyi)', [[1909, '宣统', 'Xuantong']]),
];

type Regime = Content['regional'][number];
const G = (zh: string, en: string, polities: string[], until: Year, spans: Span[]): Regime => ({ regime: { zh, en }, polities, until, spans });

export const REGIONAL: Content['regional'] = [
  // 三国
  G('蜀汉', 'Shu Han', ['蜀汉', '蜀', '刘备', '汉（蜀汉）'], 263, [
    ...R('汉昭烈帝刘备', 'Liu Bei (Zhaolie Emperor)', [[221, '章武', 'Zhangwu']]),
    ...R('汉后主刘禅', 'Liu Shan, last ruler of Shu Han', [[223, '建兴', 'Jianxing'], [238, '延熙', 'Yanxi'], [258, '景耀', 'Jingyao'], [263, '炎兴', 'Yanxing']]),
  ]),
  G('孙吴', 'Eastern Wu', ['吴', '孙吴', '东吴', '孙权'], 280, [
    ...R('吴大帝孙权', 'Sun Quan (Emperor Da of Wu)', [
      [222, '黄武', 'Huangwu'], [229, '黄龙', 'Huanglong'], [232, '嘉禾', 'Jiahe'], [238, '赤乌', 'Chiwu'], [251, '太元', 'Taiyuan'],
    ]),
    ...R('吴会稽王孙亮', 'Sun Liang of Wu', [[252, '建兴', 'Jianxing'], [254, '五凤', 'Wufeng'], [256, '太平', 'Taiping']]),
    ...R('吴景帝孙休', 'Sun Xiu (Emperor Jing of Wu)', [[258, '永安', "Yong'an"]]),
    ...R('吴末帝孙皓', 'Sun Hao, last ruler of Wu', [
      [264, '元兴', 'Yuanxing'], [265, '甘露', 'Ganlu'], [266, '宝鼎', 'Baoding'], [269, '建衡', 'Jianheng'],
      [272, '凤凰', 'Fenghuang'], [275, '天册', 'Tiance'], [276, '天玺', 'Tianxi'], [277, '天纪', 'Tianji'],
    ]),
  ]),
  // 十六国
  G('成汉', 'Cheng Han', ['成汉', '成', '李雄'], 347, [
    ...R('成武帝李雄', 'Li Xiong (Cheng Han)', [[304, '建兴', 'Jianxing'], [306, '晏平', 'Yanping'], [311, '玉衡', 'Yuheng']]),
    ...R('成汉李期', 'Li Qi (Cheng Han)', [[335, '玉恒', 'Yuheng']]),
    ...R('成汉昭文帝李寿', 'Li Shou (Cheng Han)', [[338, '汉兴', 'Hanxing']]),
    ...R('成汉李势', 'Li Shi, last ruler of Cheng Han', [[344, '太和', 'Taihe'], [346, '嘉宁', 'Jianing']]),
  ]),
  G('汉赵（前赵）', 'Han Zhao (Former Zhao)', ['汉赵', '前赵', '刘渊', '刘曜'], 329, [
    ...R('汉光文帝刘渊', 'Liu Yuan (Han Zhao)', [[304, '元熙', 'Yuanxi'], [308, '永凤', 'Yongfeng'], [309, '河瑞', 'Herui']]),
    ...R('汉昭武帝刘聪', 'Liu Cong (Han Zhao)', [[310, '光兴', 'Guangxing'], [311, '嘉平', 'Jiaping'], [315, '建元', 'Jianyuan'], [316, '麟嘉', 'Linjia']]),
    ...R('前赵刘曜', 'Liu Yao (Former Zhao)', [[318, '光初', 'Guangchu']]),
  ]),
  G('后赵', 'Later Zhao', ['后赵', '石勒', '石虎'], 351, [
    ...R('后赵明帝石勒', 'Shi Le (Later Zhao)', [[319, '赵王', ''], [328, '太和', 'Taihe'], [330, '建平', 'Jianping']]),
    ...R('后赵石弘', 'Shi Hong (Later Zhao)', [[334, '延熙', 'Yanxi']]),
    ...R('后赵武帝石虎', 'Shi Hu (Later Zhao)', [[335, '建武', 'Jianwu'], [349, '太宁', 'Taining']]),
    ...R('后赵石祗', 'Shi Zhi, last ruler of Later Zhao', [[350, '永宁', 'Yongning']]),
  ]),
  G('前燕', 'Former Yan', ['前燕', '慕容皝', '慕容儁'], 370, [
    ...R('前燕景昭帝慕容儁', 'Murong Jun (Former Yan)', [[352, '元玺', 'Yuanxi'], [357, '光寿', 'Guangshou']]),
    ...R('前燕幽帝慕容暐', 'Murong Wei, last ruler of Former Yan', [[360, '建熙', 'Jianxi']]),
  ]),
  G('前秦', 'Former Qin', ['前秦', '苻坚', '秦（苻氏）'], 394, [
    ...R('前秦景明帝苻健', 'Fu Jian (Former Qin founder)', [[351, '皇始', 'Huangshi']]),
    ...R('前秦苻生', 'Fu Sheng (Former Qin)', [[355, '寿光', 'Shouguang']]),
    ...R('前秦宣昭帝苻坚', 'Fu Jian (Former Qin, r. 357–385)', [[357, '永兴', 'Yongxing'], [359, '甘露', 'Ganlu'], [365, '建元', 'Jianyuan']]),
    ...R('前秦哀平帝苻丕', 'Fu Pi (Former Qin)', [[385, '太安', "Tai'an"]]),
    ...R('前秦高帝苻登', 'Fu Deng (Former Qin)', [[386, '太初', 'Taichu']]),
    ...R('前秦苻崇', 'Fu Chong, last ruler of Former Qin', [[394, '延初', 'Yanchu']]),
  ]),
  G('后秦', 'Later Qin', ['后秦', '姚苌', '姚兴', '秦（姚氏）'], 417, [
    ...R('后秦武昭帝姚苌', 'Yao Chang (Later Qin)', [[384, '白雀', 'Baique'], [386, '建初', 'Jianchu']]),
    ...R('后秦文桓帝姚兴', 'Yao Xing (Later Qin)', [[394, '皇初', 'Huangchu'], [399, '弘始', 'Hongshi']]),
    ...R('后秦姚泓', 'Yao Hong, last ruler of Later Qin', [[416, '永和', 'Yonghe']]),
  ]),
  G('后燕', 'Later Yan', ['后燕', '慕容垂'], 407, [
    ...R('后燕成武帝慕容垂', 'Murong Chui (Later Yan)', [[384, '燕元', 'Yanyuan'], [386, '建兴', 'Jianxing']]),
    ...R('后燕惠愍帝慕容宝', 'Murong Bao (Later Yan)', [[396, '永康', 'Yongkang']]),
    ...R('后燕昭武帝慕容盛', 'Murong Sheng (Later Yan)', [[398, '建平', 'Jianping'], [399, '长乐', 'Changle']]),
    ...R('后燕昭文帝慕容熙', 'Murong Xi, last ruler of Later Yan', [[401, '光始', 'Guangshi'], [407, '建始', 'Jianshi']]),
  ]),
  G('北凉', 'Northern Liang', ['北凉', '沮渠蒙逊'], 439, [
    ...R('北凉段业', 'Duan Ye (Northern Liang)', [[397, '神玺', 'Shenxi'], [399, '天玺', 'Tianxi']]),
    ...R('北凉武宣王沮渠蒙逊', 'Juqu Mengxun (Northern Liang)', [[401, '永安', "Yong'an"], [412, '玄始', 'Xuanshi'], [428, '承玄', 'Chengxuan'], [431, '义和', 'Yihe']]),
    ...R('北凉哀王沮渠牧犍', 'Juqu Mujian, last ruler of Northern Liang', [[433, '永和', 'Yonghe']]),
  ]),
  G('夏', 'Xia (Helian)', ['夏', '夏（赫连）', '胡夏', '赫连勃勃'], 431, [
    ...R('夏武烈帝赫连勃勃', 'Helian Bobo (Xia)', [[407, '龙升', 'Longsheng'], [413, '凤翔', 'Fengxiang'], [418, '昌武', 'Changwu'], [419, '真兴', 'Zhenxing']]),
    ...R('夏赫连昌', 'Helian Chang (Xia)', [[425, '承光', 'Chengguang']]),
    ...R('夏赫连定', 'Helian Ding, last ruler of Xia', [[428, '胜光', 'Shengguang']]),
  ]),
  // 北朝
  G('北魏', 'Northern Wei', ['北魏', '魏（北魏）', '代（拓跋）'], 534, [
    ...R('魏道武帝', 'Emperor Daowu of Northern Wei', [[386, '登国', 'Dengguo'], [396, '皇始', 'Huangshi'], [398, '天兴', 'Tianxing'], [404, '天赐', 'Tianci']]),
    ...R('魏明元帝', 'Emperor Mingyuan of Northern Wei', [[409, '永兴', 'Yongxing'], [414, '神瑞', 'Shenrui'], [416, '泰常', 'Taichang']]),
    ...R('魏太武帝', 'Emperor Taiwu of Northern Wei', [
      [424, '始光', 'Shiguang'], [428, '神䴥', 'Shenjia'], [432, '延和', 'Yanhe'], [435, '太延', 'Taiyan'],
      [440, '太平真君', 'Taiping Zhenjun'], [451, '正平', 'Zhengping'],
    ]),
    ...R('魏文成帝', 'Emperor Wencheng of Northern Wei', [[452, '兴安', "Xing'an"], [454, '兴光', 'Xingguang'], [455, '太安', "Tai'an"], [460, '和平', 'Heping']]),
    ...R('魏献文帝', 'Emperor Xianwen of Northern Wei', [[466, '天安', "Tian'an"], [467, '皇兴', 'Huangxing']]),
    ...R('魏孝文帝', 'Emperor Xiaowen of Northern Wei', [[471, '延兴', 'Yanxing'], [476, '承明', 'Chengming'], [477, '太和', 'Taihe']]),
    ...R('魏宣武帝', 'Emperor Xuanwu of Northern Wei', [[500, '景明', 'Jingming'], [504, '正始', 'Zhengshi'], [508, '永平', 'Yongping'], [512, '延昌', 'Yanchang']]),
    ...R('魏孝明帝', 'Emperor Xiaoming of Northern Wei', [[516, '熙平', 'Xiping'], [518, '神龟', 'Shengui'], [520, '正光', 'Zhengguang'], [525, '孝昌', 'Xiaochang']]),
    ...R('魏孝庄帝', 'Emperor Xiaozhuang of Northern Wei', [[528, '永安', "Yong'an"]]),
    ...R('魏长广王元晔', 'Yuan Ye of Northern Wei', [[530, '建明', 'Jianming']]),
    ...R('魏节闵帝', 'Emperor Jiemin of Northern Wei', [[531, '普泰', 'Putai']]),
    ...R('魏孝武帝', 'Emperor Xiaowu of Northern Wei', [[532, '永熙', 'Yongxi']]),
  ]),
  G('东魏', 'Eastern Wei', ['东魏'], 550, [
    ...R('东魏孝静帝', 'Emperor Xiaojing of Eastern Wei', [[534, '天平', 'Tianping'], [538, '元象', 'Yuanxiang'], [539, '兴和', 'Xinghe'], [543, '武定', 'Wuding']]),
  ]),
  G('西魏', 'Western Wei', ['西魏'], 556, [
    ...R('西魏文帝', 'Emperor Wen of Western Wei', [[535, '大统', 'Datong']]),
    ...R('西魏废帝', 'Yuan Qin, deposed emperor of Western Wei', [[552, '', '']]),
    ...R('西魏恭帝', 'Emperor Gong of Western Wei', [[554, '', '']]),
  ]),
  G('北齐', 'Northern Qi', ['北齐', '齐（北齐）'], 577, [
    ...R('齐文宣帝', 'Emperor Wenxuan of Northern Qi', [[550, '天保', 'Tianbao']]),
    ...R('齐孝昭帝', 'Emperor Xiaozhao of Northern Qi', [[560, '皇建', 'Huangjian']]),
    ...R('齐武成帝', 'Emperor Wucheng of Northern Qi', [[561, '太宁', 'Taining'], [562, '河清', 'Heqing']]),
    ...R('齐后主', 'Gao Wei, last ruler of Northern Qi', [[565, '天统', 'Tiantong'], [570, '武平', 'Wuping'], [576, '隆化', 'Longhua']]),
    ...R('齐幼主', 'Gao Heng of Northern Qi', [[577, '承光', 'Chengguang']]),
  ]),
  G('北周', 'Northern Zhou', ['北周', '周（北周）'], 581, [
    ...R('周孝闵帝', 'Emperor Xiaomin of Northern Zhou', [[557, '', '']]),
    ...R('周明帝', 'Emperor Ming of Northern Zhou', [[558, '', '', 2], [559, '武成', 'Wucheng']]),
    ...R('周武帝', 'Emperor Wu of Northern Zhou', [[561, '保定', 'Baoding'], [566, '天和', 'Tianhe'], [572, '建德', 'Jiande'], [578, '宣政', 'Xuanzheng']]),
    ...R('周静帝', 'Emperor Jing of Northern Zhou', [[579, '大象', 'Daxiang'], [581, '大定', 'Dading']]),
  ]),
  G('西梁（后梁）', 'Western Liang', ['西梁', '后梁（西梁）'], 587, [
    ...R('后梁宣帝萧詧', 'Xiao Cha (Western Liang)', [[555, '大定', 'Dading']]),
    ...R('后梁明帝萧岿', 'Xiao Kui (Western Liang)', [[562, '天保', 'Tianbao']]),
    ...R('后梁萧琮', 'Xiao Cong, last ruler of Western Liang', [[586, '广运', 'Guangyun']]),
  ]),
  G('隋', 'Sui', ['隋'], 588, [...R('隋文帝', 'Emperor Wen of Sui', [[581, '开皇', 'Kaihuang']])]),
  // 五代十国
  G('吴（杨吴）', 'Wu (Yang Wu)', ['吴（杨吴）', '淮南（杨行密）'], 937, [
    ...R('吴高祖杨隆演', 'Yang Longyan (Wu)', [[919, '武义', 'Wuyi']]),
    ...R('吴睿帝杨溥', 'Yang Pu, last ruler of Wu', [[921, '顺义', 'Shunyi'], [927, '乾贞', 'Qianzhen'], [929, '大和', 'Dahe'], [935, '天祚', 'Tianzuo']]),
  ]),
  G('南唐', 'Southern Tang', ['南唐'], 958, [
    ...R('南唐烈祖李昪', 'Li Bian (Southern Tang)', [[937, '昇元', 'Shengyuan']]),
    ...R('南唐元宗李璟', 'Li Jing (Southern Tang)', [[943, '保大', 'Baoda'], [958, '交泰', 'Jiaotai']]),
  ]),
  G('前蜀', 'Former Shu', ['前蜀', '西川（王建）'], 925, [
    ...R('前蜀高祖王建', 'Wang Jian (Former Shu)', [[908, '武成', 'Wucheng'], [911, '永平', 'Yongping'], [916, '通正', 'Tongzheng'], [917, '天汉', 'Tianhan'], [918, '光天', 'Guangtian']]),
    ...R('前蜀后主王衍', 'Wang Yan, last ruler of Former Shu', [[919, '乾德', 'Qiande'], [925, '咸康', 'Xiankang']]),
  ]),
  G('后蜀', 'Later Shu', ['后蜀'], 965, [
    ...R('后蜀高祖孟知祥', 'Meng Zhixiang (Later Shu)', [[934, '明德', 'Mingde']]),
    ...R('后蜀后主孟昶', 'Meng Chang, last ruler of Later Shu', [[935, '明德', 'Mingde', 2], [938, '广政', 'Guangzheng']]),
  ]),
  G('南汉', 'Southern Han', ['南汉', '清海（刘隐）'], 971, [
    ...R('南汉高祖刘䶮', 'Liu Yan (Southern Han)', [[917, '乾亨', 'Qianheng'], [925, '白龙', 'Bailong'], [928, '大有', 'Dayou']]),
    ...R('南汉殇帝刘玢', 'Liu Bin (Southern Han)', [[942, '光天', 'Guangtian']]),
    ...R('南汉中宗刘晟', 'Liu Sheng (Southern Han)', [[943, '乾和', 'Qianhe']]),
    ...R('南汉后主刘鋹', 'Liu Chang, last ruler of Southern Han', [[958, '大宝', 'Dabao']]),
  ]),
  G('闽', 'Min', ['闽', '威武（王审知）'], 945, [
    ...R('闽惠宗王延钧', 'Wang Yanjun (Min)', [[933, '龙启', 'Longqi'], [935, '永和', 'Yonghe']]),
    ...R('闽康宗王继鹏', 'Wang Jipeng (Min)', [[936, '通文', 'Tongwen']]),
    ...R('闽景宗王延羲', 'Wang Yanxi (Min)', [[939, '永隆', 'Yonglong']]),
    ...R('闽王延政', 'Wang Yanzheng, last ruler of Min', [[943, '天德', 'Tiande']]),
  ]),
  G('北汉', 'Northern Han', ['北汉'], 979, [
    ...R('北汉世祖刘旻', 'Liu Min (Northern Han)', [[951, '乾祐', 'Qianyou', 4]]),
    ...R('北汉睿宗刘承钧', 'Liu Chengjun (Northern Han)', [[955, '乾祐', 'Qianyou', 8], [957, '天会', 'Tianhui']]),
    ...R('北汉英武帝刘继元', 'Liu Jiyuan, last ruler of Northern Han', [[969, '天会', 'Tianhui', 13], [974, '广运', 'Guangyun']]),
  ]),
  // 辽 · 西夏 · 金 · 蒙古
  G('辽', 'Liao (Khitan)', ['契丹', '辽', '契丹 · 奚'], 1125, [
    ...R('辽太祖', 'Emperor Taizu of Liao (Abaoji)', [[916, '神册', 'Shence'], [922, '天赞', 'Tianzan'], [926, '天显', 'Tianxian']]),
    ...R('辽太宗', 'Emperor Taizong of Liao', [[927, '天显', 'Tianxian', 2], [938, '会同', 'Huitong']]),
    ...R('辽世宗', 'Emperor Shizong of Liao', [[947, '天禄', 'Tianlu']]),
    ...R('辽穆宗', 'Emperor Muzong of Liao', [[951, '应历', 'Yingli']]),
    ...R('辽景宗', 'Emperor Jingzong of Liao', [[969, '保宁', 'Baoning'], [979, '乾亨', 'Qianheng']]),
    ...R('辽圣宗', 'Emperor Shengzong of Liao', [[983, '统和', 'Tonghe'], [1012, '开泰', 'Kaitai'], [1021, '太平', 'Taiping']]),
    ...R('辽兴宗', 'Emperor Xingzong of Liao', [[1031, '景福', 'Jingfu'], [1032, '重熙', 'Chongxi']]),
    ...R('辽道宗', 'Emperor Daozong of Liao', [[1055, '清宁', 'Qingning'], [1065, '咸雍', 'Xianyong'], [1075, '大康', 'Dakang'], [1085, '大安', "Da'an"], [1095, '寿昌', 'Shouchang']]),
    ...R('辽天祚帝', 'Emperor Tianzuo of Liao', [[1101, '乾统', 'Qiantong'], [1111, '天庆', 'Tianqing'], [1121, '保大', 'Baoda']]),
  ]),
  G('西夏', 'Western Xia', ['西夏'], 1227, [
    ...R('夏景宗李元昊', 'Li Yuanhao (Jingzong of Western Xia)', [
      [1032, '显道', 'Xiandao'], [1034, '广运', 'Guangyun'], [1036, '大庆', 'Daqing'], [1038, '天授礼法延祚', 'Tianshou Lifa Yanzuo'],
    ]),
    ...R('夏毅宗', 'Yizong of Western Xia', [
      [1049, '延嗣宁国', 'Yansi Ningguo'], [1050, '天祐垂圣', 'Tianyou Chuisheng'], [1053, '福圣承道', 'Fusheng Chengdao'], [1057, '奲都', 'Duodu'], [1063, '拱化', 'Gonghua'],
    ]),
    ...R('夏惠宗', 'Huizong of Western Xia', [[1068, '乾道', 'Qiandao'], [1069, '天赐礼盛国庆', 'Tianci Lisheng Guoqing'], [1075, '大安', "Da'an"], [1085, '天安礼定', "Tian'an Liding"]]),
    ...R('夏崇宗', 'Chongzong of Western Xia', [
      [1086, '天仪治平', 'Tianyi Zhiping'], [1090, '天祐民安', "Tianyou Min'an"], [1098, '永安', "Yong'an"], [1101, '贞观', 'Zhenguan'],
      [1114, '雍宁', 'Yongning'], [1119, '元德', 'Yuande'], [1127, '正德', 'Zhengde'], [1135, '大德', 'Dade'],
    ]),
    ...R('夏仁宗', 'Renzong of Western Xia', [[1140, '大庆', 'Daqing'], [1144, '人庆', 'Renqing'], [1149, '天盛', 'Tiansheng'], [1170, '乾祐', 'Qianyou']]),
    ...R('夏桓宗', 'Huanzong of Western Xia', [[1194, '天庆', 'Tianqing']]),
    ...R('夏襄宗', 'Xiangzong of Western Xia', [[1206, '应天', 'Yingtian'], [1210, '皇建', 'Huangjian']]),
    ...R('夏神宗', 'Shenzong of Western Xia', [[1211, '光定', 'Guangding']]),
    ...R('夏献宗', 'Xianzong of Western Xia', [[1223, '乾定', 'Qianding']]),
    ...R('夏末主李睍', 'Li Xian, last ruler of Western Xia', [[1226, '宝义', 'Baoyi']]),
  ]),
  G('伪齐', 'Qi (Liu Yu, Jin client)', ['伪齐（刘豫）'], 1137, [...R('刘豫', 'Liu Yu', [[1131, '阜昌', 'Fuchang']])]),
  G('金', 'Jin (Jurchen)', ['金', '金（迁都汴京）'], 1234, [
    ...R('金太祖', 'Emperor Taizu of Jin (Aguda)', [[1115, '收国', 'Shouguo'], [1117, '天辅', 'Tianfu']]),
    ...R('金太宗', 'Emperor Taizong of Jin', [[1123, '天会', 'Tianhui']]),
    ...R('金熙宗', 'Emperor Xizong of Jin', [[1135, '天会', 'Tianhui', 13], [1138, '天眷', 'Tianjuan'], [1141, '皇统', 'Huangtong']]),
    ...R('金海陵王', 'Wanyan Liang (Prince of Hailing)', [[1149, '天德', 'Tiande'], [1153, '贞元', 'Zhenyuan'], [1156, '正隆', 'Zhenglong']]),
    ...R('金世宗', 'Emperor Shizong of Jin', [[1161, '大定', 'Dading']]),
    ...R('金章宗', 'Emperor Zhangzong of Jin', [[1190, '明昌', 'Mingchang'], [1196, '承安', "Cheng'an"], [1201, '泰和', 'Taihe']]),
    ...R('金卫绍王', 'Wanyan Yongji (Prince Weishao)', [[1209, '大安', "Da'an"], [1212, '崇庆', 'Chongqing']]),
    ...R('金宣宗', 'Emperor Xuanzong of Jin', [[1213, '贞祐', 'Zhenyou'], [1217, '兴定', 'Xingding'], [1222, '元光', 'Yuanguang']]),
    ...R('金哀宗', 'Emperor Aizong of Jin', [[1224, '正大', 'Zhengda'], [1232, '天兴', 'Tianxing']]),
  ]),
  G('大蒙古国 · 元', 'Mongol Empire · Yuan', ['大蒙古国', '蒙古', '元'], 1278, [
    ...R('元太祖成吉思汗', 'Genghis Khan', [[1206, '', '']]),
    ...R('拖雷监国', 'Tolui (regent)', [[1228, '', '']]),
    ...R('元太宗窝阔台', 'Ögedei Khan', [[1229, '', '']]),
    ...R('乃马真后称制', 'Töregene (regent)', [[1242, '', '']]),
    ...R('元定宗贵由', 'Güyük Khan', [[1246, '', '']]),
    ...R('海迷失后称制', 'Oghul Qaimish (regent)', [[1249, '', '']]),
    ...R('元宪宗蒙哥', 'Möngke Khan', [[1251, '', '']]),
    ...R('元世祖忽必烈', 'Khubilai Khan (Shizu of Yuan)', [[1260, '中统', 'Zhongtong'], [1264, '至元', 'Zhiyuan']]),
  ]),
  // 明末清初
  G('后金', 'Later Jin', ['后金', '清'], 1643, [
    ...R('清太祖努尔哈赤', 'Nurhaci (Taizu of Qing)', [[1616, '天命', 'Tianming']]),
    ...R('清太宗皇太极', 'Hong Taiji (Taizong of Qing)', [[1627, '天聪', 'Tiancong'], [1636, '崇德', 'Chongde']]),
  ]),
  G('南明', 'Southern Ming', ['南明'], 1662, [
    ...R('南明弘光帝朱由崧', 'Zhu Yousong (Hongguang Emperor)', [[1645, '弘光', 'Hongguang']]),
    ...R('南明隆武帝朱聿键', 'Zhu Yujian (Longwu Emperor)', [[1646, '隆武', 'Longwu', 2]]),
    ...R('南明永历帝朱由榔', 'Zhu Youlang (Yongli Emperor)', [[1647, '永历', 'Yongli']]),
  ]),
  G('明郑', 'Zheng regime in Taiwan', ['明郑（台湾）'], 1683, [
    ...R('延平王郑成功', 'Zheng Chenggong (Koxinga)', [[1662, '永历', 'Yongli', 16]]),
    ...R('延平王郑经', 'Zheng Jing', [[1663, '永历', 'Yongli', 17]]),
    ...R('延平王郑克塽', 'Zheng Keshuang', [[1681, '永历', 'Yongli', 35]]),
  ]),
];
