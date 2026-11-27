import type { Hold, OwnEra, Seat } from './types.ts';

/**
 * 西汉 (202 BCE – 25 CE), with 新 and the risings that ended it: the seats of the commanderies and kingdoms (郡国) of
 * 《汉书·地理志》 (the register of 2 CE), the frontier garrisons and the centres of the peoples beyond. Each holding change
 * cites the chapter that records it (`est` marks a date we infer). The early kingdoms are drawn as their own realms
 * until the Seven Kingdoms' revolt (154 BCE), after which their land was governed by the court's appointees.
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

const seats: Seat[] = [
  // 司隶：三辅、三河、弘农
  S('changan', '长安（京兆尹）', 'Chang’an (Jingzhao)', 108.88, 34.30, '陕西西安', { b: 40 }),
  S('gaoling', '高陵（左冯翊）', 'Gaoling (Zuo Pingyi)', 109.08, 34.53, '陕西高陵'),
  S('huaili', '槐里（右扶风）', 'Huaili (You Fufeng)', 108.48, 34.30, '陕西兴平'),
  S('yong', '雍', 'Yong', 107.40, 34.50, '陕西凤翔'),
  S('hongnong', '弘农', 'Hongnong', 110.87, 34.63, '河南灵宝'),
  S('shang', '商', 'Shang', 110.33, 33.70, '陕西丹凤'),
  S('anyi', '安邑（河东郡）', 'Anyi (Hedong)', 111.11, 35.06, '山西夏县'),
  S('pingyang', '平阳', 'Pingyang', 111.52, 36.08, '山西临汾'),
  S('huai', '怀（河内郡）', 'Huai (Henei)', 113.25, 35.06, '河南武陟'),
  S('luoyang', '雒阳（河南郡）', 'Luoyang (Henan)', 112.62, 34.72, '河南洛阳', { b: 15 }),
  S('xingyang', '荥阳', 'Xingyang', 113.38, 34.80, '河南荥阳'),
  // 并州、朔方
  S('jinyang', '晋阳（太原郡）', 'Jinyang (Taiyuan)', 112.48, 37.82, '山西太原', { r: 280 }),
  S('zhangzi', '长子（上党郡）', 'Zhangzi (Shangdang)', 112.88, 36.12, '山西长子'),
  S('lishi', '离石', 'Lishi', 111.15, 37.52, '山西吕梁'),
  S('pingding', '平定（西河郡）', 'Pingding (Xihe)', 110.70, 39.60, '内蒙古准格尔旗西南', { r: 240 }),
  S('fushi', '肤施（上郡）', 'Fushi (Shang commandery)', 109.85, 38.10, '陕西榆林东南', { r: 280 }),
  S('gaonu', '高奴', 'Gaonu', 109.49, 36.60, '陕西延安'),
  S('shuofang', '朔方', 'Shuofang', 108.25, 40.45, '内蒙古杭锦旗北', { r: 280 }),
  S('linrong', '临戎', 'Linrong', 106.90, 40.35, '内蒙古磴口', { r: 240 }),
  S('gaoque', '高阙', 'Gaoque Pass', 107.10, 41.10, '内蒙古乌拉特后旗东南', { r: 200 }),
  S('xinqinzhong', '新秦中（河南地）', 'Xinqinzhong (land south of the bend)', 108.90, 39.40, '内蒙古鄂尔多斯', { r: 320 }),
  S('jiuyuan', '九原（五原郡）', 'Jiuyuan (Wuyuan)', 109.75, 40.60, '内蒙古包头', { r: 280 }),
  S('guanglu', '光禄塞', 'Guanglu Barrier', 109.10, 41.40, '内蒙古乌拉特前旗北', { r: 200 }),
  S('yunzhong', '云中（云中郡）', 'Yunzhong', 111.35, 40.55, '内蒙古托克托', { r: 260 }),
  S('chengle', '成乐（定襄郡）', 'Chengle (Dingxiang)', 111.82, 40.38, '内蒙古和林格尔', { r: 240 }),
  S('shanwu', '善无（雁门郡）', 'Shanwu (Yanmen)', 112.45, 40.00, '山西右玉', { r: 240 }),
  S('loufan', '楼烦', 'Loufan', 112.30, 39.00, '山西宁武一带'),
  S('dai', '代（代郡）', 'Dai', 114.75, 39.85, '河北蔚县', { r: 240 }),
  // 幽州
  S('juyang', '沮阳（上谷郡）', 'Juyang (Shanggu)', 115.55, 40.38, '河北怀来', { r: 250 }),
  S('yuyang', '渔阳', 'Yuyang', 116.85, 40.37, '北京密云', { r: 250 }),
  S('pinggang', '平刚（右北平郡）', 'Pinggang (Youbeiping)', 118.80, 41.55, '内蒙古宁城西南', { r: 260 }),
  S('wuzhong', '无终', 'Wuzhong', 117.40, 40.05, '天津蓟州'),
  S('yangle', '阳乐（辽西郡）', 'Yangle (Liaoxi)', 121.20, 41.50, '辽宁义县一带', { r: 300 }),
  S('xiangping', '襄平（辽东郡）', 'Xiangping (Liaodong)', 123.18, 41.27, '辽宁辽阳', { r: 300 }),
  S('xianping', '西安平', 'Xi’anping', 124.40, 40.15, '辽宁丹东', { r: 200 }),
  S('ji', '蓟（广阳国）', 'Ji (Guangyang)', 116.35, 39.88, '北京', { b: 10 }),
  S('zhuo', '涿（涿郡）', 'Zhuo', 115.97, 39.49, '河北涿州'),
  S('fuyang', '浮阳（勃海郡）', 'Fuyang (Bohai)', 116.95, 38.25, '河北沧州东南', { r: 240 }),
  // 朝鲜四郡
  S('wangxian', '王险城（乐浪郡朝鲜县）', 'Wanggeom (Lelang)', 125.75, 39.03, '朝鲜平壤', { r: 360 }),
  S('zhenfan', '真番', 'Zhenfan', 126.40, 38.10, '朝鲜黄海道一带', { r: 220 }),
  S('lintun', '东暆（临屯郡）', 'Dongyi (Lintun)', 128.90, 37.75, '韩国江陵', { r: 240 }),
  S('woju', '夭租（玄菟郡初治）', 'Yaozu (first seat of Xuantu)', 127.53, 39.92, '朝鲜咸兴', { r: 280 }),
  S('xuantu', '高句丽县（玄菟郡）', 'Gaogouli county (Xuantu)', 124.90, 41.73, '辽宁新宾', { r: 220 }),
  // 冀州
  S('ye', '邺（魏郡）', 'Ye (Wei commandery)', 114.37, 36.33, '河北临漳'),
  S('handan', '邯郸（赵国）', 'Handan (Zhao)', 114.49, 36.61, '河北邯郸'),
  S('julu', '巨鹿', 'Julu', 115.03, 37.10, '河北平乡'),
  S('yuanshi', '元氏（常山郡）', 'Yuanshi (Changshan)', 114.50, 37.75, '河北元氏'),
  S('qingyang', '清阳（清河郡）', 'Qingyang (Qinghe)', 115.70, 37.00, '河北清河东南'),
  S('guangping', '广平', 'Guangping', 114.90, 36.85, '河北鸡泽东南'),
  S('zhending', '真定', 'Zhending', 114.58, 38.15, '河北正定'),
  S('lunu', '卢奴（中山国）', 'Lunu (Zhongshan)', 115.00, 38.52, '河北定州'),
  S('xindu', '信都', 'Xindu', 115.55, 37.75, '河北冀州'),
  S('lecheng', '乐成（河间国）', 'Lecheng (Hejian)', 116.30, 38.40, '河北献县东南'),
  // 兖州
  S('puyang', '濮阳（东郡）', 'Puyang (Dong commandery)', 115.03, 35.76, '河南濮阳'),
  S('chenliu', '陈留', 'Chenliu', 114.80, 34.70, '河南开封陈留'),
  S('changyi', '昌邑（山阳郡）', 'Changyi (Shanyang)', 116.10, 35.15, '山东巨野东南'),
  S('dingtao', '定陶（济阴郡）', 'Dingtao (Jiyin)', 115.57, 35.07, '山东定陶'),
  S('fenggao', '奉高（泰山郡）', 'Fenggao (Taishan)', 117.20, 36.25, '山东泰安东'),
  S('ju', '莒（城阳国）', 'Ju (Chengyang)', 118.83, 35.58, '山东莒县'),
  S('chen', '陈（淮阳国）', 'Chen (Huaiyang)', 114.88, 33.73, '河南淮阳'),
  S('wuyan', '无盐（东平国）', 'Wuyan (Dongping)', 116.35, 35.90, '山东东平'),
  // 豫州
  S('yangdi', '阳翟（颍川郡）', 'Yangdi (Yingchuan)', 113.47, 34.15, '河南禹州'),
  S('pingyu', '平舆（汝南郡）', 'Pingyu (Runan)', 114.65, 32.95, '河南平舆'),
  S('xiang', '相（沛郡）', 'Xiang (Pei)', 116.75, 33.93, '安徽淮北'),
  S('suiyang', '睢阳（梁国）', 'Suiyang (Liang)', 115.65, 34.42, '河南商丘'),
  S('lu', '鲁（鲁国）', 'Lu', 116.99, 35.58, '山东曲阜'),
  // 徐州
  S('tan', '郯（东海郡）', 'Tan (Donghai)', 118.35, 34.62, '山东郯城'),
  S('dongwu', '东武（琅邪郡）', 'Dongwu (Langya)', 119.40, 36.00, '山东诸城'),
  S('xu', '徐（临淮郡）', 'Xu (Linhuai)', 118.25, 33.30, '江苏泗洪南'),
  S('pengcheng', '彭城（楚国）', 'Pengcheng (Chu)', 117.18, 34.26, '江苏徐州'),
  S('ling', '凌（泗水国）', 'Ling (Sishui)', 118.65, 33.70, '江苏泗阳'),
  S('guangling', '广陵', 'Guangling', 119.43, 32.40, '江苏扬州', { r: 270 }),
  // 青州
  S('pingyuan', '平原', 'Pingyuan', 116.43, 37.17, '山东平原'),
  S('qiancheng', '千乘', 'Qiancheng', 117.82, 37.25, '山东高青北'),
  S('dongpingling', '东平陵（济南郡）', 'Dongpingling (Jinan)', 117.35, 36.68, '山东章丘'),
  S('yingling', '营陵（北海郡）', 'Yingling (Beihai)', 119.15, 36.50, '山东昌乐东南'),
  S('yexian', '掖（东莱郡）', 'Ye (Donglai)', 120.00, 37.18, '山东莱州', { r: 300 }),
  S('linzi', '临淄（齐郡）', 'Linzi (Qi)', 118.35, 36.82, '山东淄博', { b: 10 }),
  S('jux', '剧（菑川国）', 'Ju (Zichuan)', 118.75, 36.75, '山东寿光南'),
  S('jimo', '即墨（胶东国）', 'Jimo (Jiaodong)', 120.00, 36.60, '山东平度东南', { r: 280 }),
  S('gaomi', '高密', 'Gaomi', 119.75, 36.38, '山东高密'),
  // 荆州
  S('wan', '宛（南阳郡）', 'Wan (Nanyang)', 112.53, 33.00, '河南南阳', { r: 280 }),
  S('jiangling', '江陵（南郡）', 'Jiangling (Nan commandery)', 112.18, 30.35, '湖北荆州'),
  S('yiling', '夷陵', 'Yiling', 111.30, 30.70, '湖北宜昌'),
  S('wuxian', '巫', 'Wu', 109.88, 31.08, '重庆巫山', { r: 280 }),
  S('xiling', '西陵（江夏郡）', 'Xiling (Jiangxia)', 114.80, 30.85, '湖北武汉新洲', { r: 280 }),
  S('suo', '索（武陵郡）', 'Suo (Wuling)', 111.75, 29.08, '湖南常德东北', { r: 300 }),
  S('yuanling', '沅陵', 'Yuanling', 110.39, 28.47, '湖南沅陵', { r: 340 }),
  S('linxiang', '临湘（长沙国）', 'Linxiang (Changsha)', 112.94, 28.23, '湖南长沙', { r: 360 }),
  S('chenxian', '郴（桂阳郡）', 'Chen (Guiyang)', 113.03, 25.78, '湖南郴州', { r: 300 }),
  S('lingling', '零陵', 'Lingling', 111.00, 25.90, '广西全州西南', { r: 300 }),
  // 扬州
  S('shouchun', '寿春（九江郡）', 'Shouchun (Jiujiang)', 116.79, 32.58, '安徽寿县'),
  S('liu', '六（六安国）', 'Liu (Liu’an)', 116.50, 31.75, '安徽六安'),
  S('shu', '舒（庐江郡）', 'Shu (Lujiang)', 116.94, 31.46, '安徽舒城'),
  S('zhu', '邾（衡山）', 'Zhu (Hengshan)', 114.90, 30.45, '湖北黄冈', { r: 260 }),
  S('wanling', '宛陵（丹扬郡）', 'Wanling (Danyang)', 118.75, 30.95, '安徽宣城', { r: 280 }),
  S('wu', '吴（会稽郡）', 'Wu (Kuaiji)', 120.62, 31.30, '江苏苏州', { r: 280 }),
  S('shanyin', '山阴', 'Shanyin', 120.58, 30.00, '浙江绍兴', { r: 340 }),
  S('nanchang', '南昌（豫章郡）', 'Nanchang (Yuzhang)', 115.89, 28.68, '江西南昌', { r: 420 }),
  S('poyang', '鄱阳', 'Poyang', 116.68, 29.00, '江西鄱阳', { r: 300 }),
  S('dongou', '东瓯', 'Dong’ou', 120.65, 28.00, '浙江温州', { r: 260 }),
  S('ye_my', '冶（闽越）', 'Ye (Minyue)', 119.30, 26.08, '福建福州', { r: 420 }),
  // 益州
  S('xicheng', '西城（汉中郡）', 'Xicheng (Hanzhong)', 109.03, 32.68, '陕西安康', { r: 280 }),
  S('nanzheng', '南郑', 'Nanzheng', 107.03, 33.07, '陕西汉中', { r: 300 }),
  S('zitong', '梓潼（广汉郡）', 'Zitong (Guanghan)', 105.15, 31.63, '四川梓潼', { r: 300 }),
  S('chengdu', '成都（蜀郡）', 'Chengdu (Shu commandery)', 104.07, 30.67, '四川成都', { r: 360, b: 15 }),
  S('linqiong', '临邛', 'Linqiong', 103.46, 30.41, '四川邛崃', { r: 260 }),
  S('yandao', '严道', 'Yandao', 102.85, 29.80, '四川荥经', { r: 240 }),
  S('jiangzhou', '江州（巴郡）', 'Jiangzhou (Ba commandery)', 106.55, 29.56, '重庆', { r: 360 }),
  S('langzhong', '阆中', 'Langzhong', 105.98, 31.58, '四川阆中'),
  S('fuling', '涪陵', 'Fuling', 108.10, 29.40, '重庆彭水', { r: 280 }),
  S('bodao', '僰道（犍为郡）', 'Bodao (Qianwei)', 104.62, 28.77, '四川宜宾', { r: 300 }),
  S('bie', '鄨', 'Bie', 106.90, 27.70, '贵州遵义', { r: 300 }),
  S('zhuti', '朱提', 'Zhuti', 103.72, 27.33, '云南昭通', { r: 260 }),
  S('wenjiang', '汶江（汶山郡）', 'Wenjiang (Wenshan)', 103.85, 31.68, '四川茂县', { r: 260 }),
  S('zuodu', '笮都（沈黎郡）', 'Zuodu (Shenli)', 102.65, 29.35, '四川汉源', { r: 240 }),
  S('qiongdu', '邛都（越巂郡）', 'Qiongdu (Yuexi)', 102.27, 27.89, '四川西昌', { r: 330 }),
  S('dianchi', '滇池（益州郡）', 'Dianchi (Yizhou)', 102.70, 24.70, '云南晋宁', { r: 420 }),
  S('yeyu', '叶榆', 'Yeyu', 100.20, 25.70, '云南大理', { r: 320 }),
  S('qielan', '故且兰（牂柯郡）', 'Guqielan (Zangke)', 107.50, 26.70, '贵州福泉一带', { r: 360 }),
  S('yelang', '夜郎', 'Yelang', 105.30, 26.20, '贵州西部', { r: 360 }),
  S('jucheng', '句町', 'Gouding', 105.06, 24.05, '云南广南', { r: 300 }),
  S('wudu', '武都（武都郡）', 'Wudu', 105.30, 33.85, '甘肃西和南', { r: 260 }),
  // 凉州
  S('didao', '狄道（陇西郡）', 'Didao (Longxi)', 103.85, 35.38, '甘肃临洮', { r: 280 }),
  S('lintao', '临洮', 'Lintao', 104.03, 34.43, '甘肃岷县', { r: 240 }),
  S('shanggui', '上邽', 'Shanggui', 105.72, 34.58, '甘肃天水'),
  S('pingxiang', '平襄（天水郡）', 'Pingxiang (Tianshui)', 105.25, 35.20, '甘肃通渭'),
  S('maling', '马领（北地郡）', 'Maling (Beidi)', 107.65, 36.10, '甘肃庆阳西北'),
  S('gaoping', '高平（安定郡）', 'Gaoping (Anding)', 106.28, 36.00, '宁夏固原', { r: 260 }),
  S('fuping', '富平', 'Fuping', 106.50, 38.20, '宁夏吴忠', { r: 260 }),
  S('yuzhong', '榆中', 'Yuzhong', 104.12, 35.85, '甘肃榆中', { r: 220 }),
  S('jincheng', '允吾（金城郡）', 'Yunwu (Jincheng)', 103.20, 36.20, '甘肃永靖西北', { r: 240 }),
  S('lingju', '令居', 'Lingju', 103.25, 36.73, '甘肃永登', { r: 240 }),
  S('linqiang', '临羌', 'Linqiang', 101.25, 36.68, '青海湟源', { r: 240 }),
  S('xihai', '龙夷（西海郡）', 'Longyi (Xihai)', 100.90, 36.95, '青海海晏', { r: 260 }),
  S('guzang', '姑臧（武威郡）', 'Guzang (Wuwei)', 102.64, 37.93, '甘肃武威', { r: 320 }),
  S('lude', '觻得（张掖郡）', 'Lude (Zhangye)', 100.45, 38.93, '甘肃张掖', { r: 320 }),
  S('lufu', '禄福（酒泉郡）', 'Lufu (Jiuquan)', 98.50, 39.73, '甘肃酒泉', { r: 340 }),
  S('juyan', '居延', 'Juyan', 101.10, 41.95, '内蒙古额济纳旗', { r: 260 }),
  S('dunhuang', '敦煌（敦煌郡）', 'Dunhuang', 94.66, 40.14, '甘肃敦煌', { r: 340 }),
  S('yumen', '玉门关', 'Jade Gate', 93.86, 40.35, '甘肃敦煌西北', { r: 260 }),
  // 交州
  S('panyu', '番禺（南海郡）', 'Panyu (Nanhai)', 113.26, 23.13, '广东广州', { r: 380 }),
  S('longchuan', '龙川', 'Longchuan', 115.25, 24.10, '广东龙川', { r: 300 }),
  S('guangxin', '广信（苍梧郡）', 'Guangxin (Cangwu)', 111.90, 23.47, '广西梧州', { r: 320 }),
  S('bushan', '布山（郁林郡）', 'Bushan (Yulin)', 109.60, 23.10, '广西贵港', { r: 360 }),
  S('linchen', '临尘', 'Linchen', 107.36, 22.40, '广西崇左', { r: 320 }),
  S('hepu', '合浦（合浦郡）', 'Hepu', 109.20, 21.66, '广西合浦', { r: 280 }),
  S('xuwen', '徐闻', 'Xuwen', 110.17, 20.33, '广东徐闻', { r: 200 }),
  S('jiaozhi', '羸𨻻（交趾郡）', 'Luy Lâu (Jiaozhi)', 106.05, 21.05, '越南北宁', { r: 360 }),
  S('jiuzhen', '胥浦（九真郡）', 'Xupu (Jiuzhen)', 105.75, 19.85, '越南清化', { r: 300 }),
  S('rinan', '西卷（日南郡）', 'Xijuan (Rinan)', 107.20, 16.75, '越南广治', { r: 320 }),
  S('zhuya', '瞫都（珠崖郡）', 'Tandu (Zhuya)', 110.35, 20.00, '海南海口', { r: 220 }),
  S('daner', '儋耳', 'Dan’er', 109.58, 19.52, '海南儋州', { r: 220 }),
  // 西域
  S('jushi', '交河（车师前国）', 'Jiaohe (Jushi)', 89.06, 42.95, '新疆吐鲁番', { r: 380 }),
  S('loulan', '楼兰', 'Loulan', 89.90, 40.50, '新疆罗布泊西北', { r: 340 }),
  S('shanshan', '扜泥（鄯善）', 'Yuni (Shanshan)', 88.17, 39.02, '新疆若羌', { r: 360 }),
  S('qiemo', '且末', 'Qiemo', 85.53, 38.14, '新疆且末', { r: 340 }),
  S('jingjue', '精绝', 'Jingjue', 82.72, 37.98, '新疆民丰尼雅遗址', { r: 300 }),
  S('yutian', '于阗', 'Khotan', 79.92, 37.12, '新疆和田', { r: 380 }),
  S('shache', '莎车', 'Yarkand', 77.24, 38.42, '新疆莎车', { r: 320 }),
  S('shule', '疏勒', 'Kashgar', 75.99, 39.47, '新疆喀什', { r: 360 }),
  S('gumo', '姑墨', 'Gumo', 80.26, 41.17, '新疆阿克苏', { r: 340 }),
  S('qiuci', '延城（龟兹）', 'Yancheng (Kucha)', 82.96, 41.70, '新疆库车', { r: 380 }),
  S('wulei', '乌垒（都护治）', 'Wulei (seat of the Protector General)', 84.35, 41.75, '新疆轮台东', { r: 360, b: 20 }),
  S('yanqi', '员渠（焉耆）', 'Yuanqu (Karasahr)', 86.57, 42.06, '新疆焉耆', { r: 340 }),
  // neighbours
  S('xiongnu', '匈奴（阴山以北）', 'Xiongnu (north of the Yin Shan)', 107.00, 42.30, '内蒙古阴山以北', { r: 800 }),
  S('xiongnu_n', '单于庭', 'Court of the Chanyu', 103.00, 47.30, '蒙古国中部', { r: 1100 }),
  S('xiongnu_e', '匈奴左地', 'Xiongnu, left (eastern) lands', 114.50, 46.50, '蒙古国东部', { r: 900 }),
  S('xiongnu_w', '匈奴右地', 'Xiongnu, right (western) lands', 94.00, 45.50, '蒙古国西部', { r: 900 }),
  S('xiutu', '休屠、浑邪王地', 'Lands of the Xiutu and Hunye kings', 101.50, 39.70, '甘肃河西走廊北', { r: 500 }),
  S('wuhuan', '乌桓', 'Wuhuan', 119.50, 43.90, '内蒙古西拉木伦河以北', { r: 450 }),
  S('xianbei', '鲜卑', 'Xianbei', 122.50, 45.80, '大兴安岭南段', { r: 550 }),
  S('fuyu', '夫余', 'Buyeo', 126.55, 43.85, '吉林', { r: 450 }),
  S('gaogouli', '卒本（高句丽）', 'Jolbon (Goguryeo)', 125.35, 41.28, '辽宁桓仁', { r: 180 }),
  S('chenguo', '辰国（三韩）', 'Jin state (Samhan)', 127.30, 35.80, '韩国南部', { r: 320 }),
  S('yuezhi', '月氏（河西）', 'Yuezhi (Hexi)', 99.50, 39.20, '甘肃河西走廊', { r: 800 }),
  S('yuezhi_ili', '伊犁河谷', 'Ili valley', 81.30, 43.90, '新疆伊犁', { r: 600 }),
  S('yuezhi_bactria', '监氏城（大月氏）', 'Jianshi (Great Yuezhi)', 66.90, 36.76, '阿富汗巴尔赫', { r: 650 }),
  S('wusun', '赤谷城（乌孙）', 'Chigu (Wusun)', 78.00, 42.00, '吉尔吉斯斯坦伊塞克湖东南', { r: 600 }),
  S('dayuan', '贵山城（大宛）', 'Guishan (Dayuan)', 71.20, 40.90, '费尔干纳盆地', { r: 320 }),
  S('kangju', '康居', 'Kangju', 69.30, 41.80, '锡尔河中游', { r: 650 }),
  S('qiang', '羌（青海）', 'Qiang (Qinghai)', 100.30, 36.10, '青海共和一带', { r: 650 }),
  S('qiang_s', '羌（河曲）', 'Qiang (upper Yellow River)', 102.30, 33.70, '四川若尔盖一带', { r: 500 }),
  S('qiang_hy', '羌（河源）', 'Qiang (sources of the Yellow River)', 98.30, 34.90, '青海玛多一带', { r: 500 }),
  S('qiang_w', '婼羌', 'Ruoqiang', 91.50, 38.00, '青海柴达木西北', { r: 500 }),
  S('dian', '滇', 'Dian', 102.85, 24.95, '云南昆明', { r: 520 }),
];

const H: Record<string, Hold[]> = {};
/** from `y` on, `p` holds the seats `ids`, per source `src` */
// a later statement for the same year replaces the earlier one
const at = (y: number, p: string | null, src: string, ...ids: string[]) => {
  for (const id of ids) { const h = (H[id] ??= []); if (h.at(-1)?.[0] === y) h.pop(); h.push([y, p, src]); }
};
const W = 'whan';

// ——— 202 BCE: the empire that Gaozu inherits from Qin, less the north, the far south and the southwest
const later = new Set([
  'pingding', 'shuofang', 'linrong', 'gaoque', 'xinqinzhong', 'jiuyuan', 'guanglu', 'fuping',
  'wangxian', 'zhenfan', 'lintun', 'woju', 'xuantu',
  'dongou', 'ye_my', 'bie', 'zhuti', 'wenjiang', 'zuodu', 'qiongdu', 'dianchi', 'yeyu', 'qielan', 'yelang', 'jucheng', 'wudu',
  'jincheng', 'lingju', 'linqiang', 'xihai', 'guzang', 'lude', 'lufu', 'juyan', 'dunhuang', 'yumen',
  'panyu', 'longchuan', 'guangxin', 'bushan', 'linchen', 'hepu', 'xuwen', 'jiaozhi', 'jiuzhen', 'rinan', 'zhuya', 'daner',
  'jushi', 'loulan', 'shanshan', 'qiemo', 'jingjue', 'yutian', 'shache', 'shule', 'gumo', 'qiuci', 'wulei', 'yanqi',
  'xiongnu', 'xiongnu_n', 'xiongnu_e', 'xiongnu_w', 'xiutu', 'wuhuan', 'xianbei', 'fuyu', 'gaogouli', 'chenguo',
  'yuezhi', 'yuezhi_ili', 'yuezhi_bactria', 'wusun', 'dayuan', 'kangju', 'qiang', 'qiang_s', 'qiang_hy', 'qiang_w', 'dian',
]);
at(-202, W, 'sj.gz', ...seats.map(s => s.id).filter(id => !later.has(id)));

// the peoples beyond
at(-202, 'xiongnu', 'sj.xyn', 'pingding', 'shuofang', 'linrong', 'gaoque', 'xinqinzhong', 'jiuyuan', 'guanglu', 'fuping',
  'xiongnu', 'xiongnu_n', 'xiongnu_e', 'xiongnu_w');
at(-202, 'yuezhi', 'sj.dyw', 'yuezhi', 'xiutu', 'guzang', 'lude', 'lufu', 'juyan', 'dunhuang', 'yumen');
at(-202, null, 'est', 'yuezhi_ili', 'yuezhi_bactria', 'wusun', 'gaogouli');
at(-202, 'qiang', 'est', 'qiang', 'qiang_s', 'qiang_hy', 'qiang_w', 'jincheng', 'lingju', 'linqiang', 'xihai', 'wudu');
at(-202, 'xihan_xiyu', 'hs.xy', 'jushi', 'loulan', 'shanshan', 'qiemo', 'jingjue', 'yutian', 'shache', 'shule', 'gumo', 'qiuci', 'wulei', 'yanqi');
at(-202, 'xihan_dayuan', 'sj.dyw', 'dayuan');
at(-202, 'xihan_kangju', 'sj.dyw', 'kangju');
at(-202, 'xihan_wuhuan', 'hh.wh', 'wuhuan');
at(-202, 'xianbei', 'hh.wh', 'xianbei');
at(-202, 'xihan_fuyu', 'sj.hz', 'fuyu');
at(-202, 'chaoxian', 'sj.cx', 'wangxian', 'zhenfan', 'lintun', 'woju', 'xuantu');
at(-202, 'xihan_chen', 'sj.cx', 'chenguo');
at(-202, 'minyue', 'sj.dy', 'ye_my', 'dongou');
at(-202, 'xihan_nanyue', 'sj.ny', 'panyu', 'longchuan', 'guangxin', 'bushan', 'linchen', 'hepu', 'xuwen');
at(-202, 'nanyue', 'sj.ny', 'jiaozhi', 'jiuzhen', 'rinan', 'zhuya', 'daner');
at(-202, 'yelang', 'sj.xny', 'bie', 'zhuti', 'qielan', 'yelang', 'jucheng');
at(-202, 'dian', 'sj.xny', 'dian', 'dianchi');
at(-202, 'xihan_xny', 'sj.xny', 'wenjiang', 'zuodu', 'qiongdu', 'yeyu');

// ——— the kingdoms of the early Han (《汉书·诸侯王表》); the court keeps fifteen commanderies
at(-202, 'xihan_chu', 'hs.zhwb', 'pengcheng', 'lu', 'tan', 'ling', 'xiang');
at(-201, 'xihan_qi', 'hs.zhwb', 'linzi', 'fenggao', 'jimo', 'gaomi', 'dongwu', 'ju', 'dongpingling', 'jux', 'yingling', 'yexian', 'qiancheng', 'pingyuan');
at(-202, 'xihan_yan', 'hs.zhwb', 'ji', 'zhuo', 'juyang', 'yuyang', 'pinggang', 'wuzhong', 'yangle', 'xiangping', 'xianping', 'fuyang');
at(-202, 'xihan_zhao', 'hs.zhwb', 'handan', 'julu', 'yuanshi', 'qingyang', 'guangping', 'zhending', 'lunu', 'xindu', 'lecheng', 'ye', 'zhangzi');
at(-202, 'xihan_changsha', 'hs.zhwb', 'linxiang', 'chenxian', 'lingling');
at(-202, 'xihan_huainan', 'hs.zhwb', 'shouchun', 'liu', 'shu', 'zhu', 'nanchang', 'poyang');
at(-202, 'xihan_liang', 'hs.zhwb', 'suiyang', 'changyi', 'dingtao', 'chenliu');
at(-196, 'xihan_dai', 'hs.zhwb', 'dai', 'shanwu', 'loufan', 'jinyang', 'lishi', 'chengle');
at(-196, 'xihan_huaiyang', 'hs.zhwb', 'chen', 'pingyu');
at(-195, 'xihan_wu', 'hs.zhwb', 'guangling', 'wu', 'shanyin', 'wanling', 'xu');
at(-194, 'gojoseon', 'sj.cx', 'wangxian', 'zhenfan', 'lintun', 'woju', 'xuantu');
at(-192, 'xihan_dongou', 'sj.dy', 'dongou');
at(-180, 'xihan_nanyue', 'sj.ny', 'jiaozhi', 'jiuzhen');
at(-176, 'xiongnu', 'sj.xyn', 'yuezhi', 'xiutu', 'guzang', 'lude', 'lufu', 'juyan', 'dunhuang', 'yumen');
at(-176, 'yuezhi', 'sj.dyw', 'yuezhi_ili');
// after the Seven Kingdoms the kings no longer govern: their land is run by the court's officials
at(-154, W, 'hs.zhwb', 'pengcheng', 'lu', 'tan', 'ling', 'xiang', 'linzi', 'fenggao', 'jimo', 'gaomi', 'dongwu', 'ju',
  'dongpingling', 'jux', 'yingling', 'yexian', 'qiancheng', 'pingyuan', 'ji', 'zhuo', 'juyang', 'yuyang', 'pinggang',
  'wuzhong', 'yangle', 'xiangping', 'xianping', 'fuyang', 'handan', 'julu', 'yuanshi', 'qingyang', 'guangping', 'zhending',
  'lunu', 'xindu', 'lecheng', 'ye', 'zhangzi', 'linxiang', 'chenxian', 'lingling', 'shouchun', 'liu', 'shu', 'zhu',
  'nanchang', 'poyang', 'suiyang', 'changyi', 'dingtao', 'chenliu', 'dai', 'shanwu', 'loufan', 'jinyang', 'lishi', 'chengle',
  'chen', 'pingyu', 'guangling', 'wu', 'shanyin', 'wanling', 'xu');
// Dong'ou moves north into the Jiang–Huai (138 BCE)
at(-138, null, 'sj.dy', 'dongou');
// Qianwei commandery opens the way to Yelang (135 BCE)
at(-135, W, 'hs.wudi', 'bie', 'zhuti');

// ——— Emperor Wu's wars
at(-130, 'wusun', 'sj.dyw', 'yuezhi_ili', 'wusun');
at(-130, 'yuezhi', 'sj.dyw', 'yuezhi_bactria');
at(-127, W, 'hs.wudi', 'shuofang', 'linrong', 'gaoque', 'xinqinzhong', 'jiuyuan', 'fuping', 'pingding');
at(-121, W, 'hs.wudi', 'guzang', 'lude', 'lufu', 'jincheng');
at(-121, null, 'sj.xyn', 'xiutu', 'yuezhi');
at(-119, W, 'sj.xyn', 'lingju');
at(-119, null, 'sj.xyn', 'xiongnu');
at(-111, W, 'hs.wudi', 'dunhuang', 'panyu', 'longchuan', 'guangxin', 'bushan', 'linchen', 'hepu', 'xuwen', 'jiaozhi', 'jiuzhen', 'rinan',
  'qielan', 'yelang', 'jucheng', 'wenjiang', 'zuodu', 'qiongdu', 'wudu');
at(-110, W, 'hs.wudi', 'zhuya', 'daner', 'ye_my');
at(-109, W, 'hs.wudi', 'dianchi', 'yeyu', 'dian');
at(-108, W, 'hs.wudi', 'wangxian');
at(-108, W, 'sj.dyw', 'yumen');
at(-107, W, 'hs.wudi', 'zhenfan', 'lintun', 'woju', 'xuantu');
at(-102, W, 'sj.xyn', 'juyan', 'guanglu');
at(-101, W, 'hs.xy', 'wulei');
at(-60, W, 'hs.zcg', 'linqiang');
at(-60, 'xihan_duhu', 'hs.xy', 'jushi', 'loulan', 'shanshan', 'qiemo', 'jingjue', 'yutian', 'shache', 'shule', 'gumo', 'qiuci', 'wulei', 'yanqi');
at(-46, null, 'hs.yuan', 'zhuya', 'daner');
at(-37, 'goguryeo', 'est', 'gaogouli');
at(4, W, 'hs.wm', 'xihai');

// ——— 新 (9–23 CE): every Han seat passes to Wang Mang's Xin; the Western Regions break away
for (const s of seats) {
  const h = H[s.id] ?? [];
  const last = [...h].sort((a, b) => a[0] - b[0]).filter(([y]) => y <= 8).at(-1);
  if (last?.[1] === W) at(9, 'xihan_xin', 'hs.wm', s.id);
}
at(13, 'xihan_xiyu', 'hs.xy', 'jushi', 'loulan', 'shanshan', 'qiemo', 'jingjue', 'yutian', 'shache', 'shule', 'gumo', 'qiuci', 'wulei', 'yanqi');
at(23, 'qiang', 'est', 'xihai');

// ——— 更始 (23–25 CE): Gengshi inherits Xin's seats; Liu Xiu holds the north of the Yellow River, Gongsun Shu Shu,
// the Red Eyebrows the lands below Mount Tai
for (const s of seats) {
  const last = [...(H[s.id] ?? [])].sort((a, b) => a[0] - b[0]).filter(([y]) => y <= 22).at(-1);
  if (last?.[1] === 'xihan_xin' && s.id !== 'xihai') at(23, 'xihan_gengshi', 'hh.lxx', s.id);
}
at(24, 'ehan', 'hh.gw', 'ye', 'handan', 'julu', 'yuanshi', 'qingyang', 'guangping', 'zhending', 'lunu', 'xindu', 'lecheng',
  'ji', 'zhuo', 'juyang', 'yuyang', 'pinggang', 'wuzhong', 'yangle', 'xiangping', 'xianping', 'fuyang', 'huai', 'dai',
  'wangxian', 'zhenfan', 'lintun', 'woju', 'xuantu');
at(24, 'xihan_chengjia', 'hh.gss', 'chengdu', 'linqiong', 'yandao', 'zitong', 'bodao', 'wenjiang', 'zuodu');
at(24, 'xihan_chimei', 'hh.lxx', 'fenggao', 'wuyan', 'ju', 'tan', 'dongwu', 'lu', 'puyang', 'changyi', 'dingtao');

const holds = Object.fromEntries(Object.entries(H).map(([k, v]) => [k, v.sort((a, b) => a[0] - b[0])]));

export const XIHAN: OwnEra = {
  replaces: 'xihan',
  reach: 260,
  polities: [
    { id: 'xihan_chu', name: { zh: '楚国', en: 'Kingdom of Chu (Han)' }, color: '#3b7a57', role: 'rival' },
    { id: 'xihan_qi', name: { zh: '齐国', en: 'Kingdom of Qi (Han)' }, color: '#2e86c1', role: 'rival' },
    { id: 'xihan_wu', name: { zh: '吴国', en: 'Kingdom of Wu (Han)' }, color: '#5d6d7e', role: 'rival' },
    { id: 'xihan_huainan', name: { zh: '淮南国', en: 'Kingdom of Huainan' }, color: '#76448a', role: 'rival' },
    { id: 'xihan_changsha', name: { zh: '长沙国', en: 'Kingdom of Changsha' }, color: '#cd6155', role: 'rival' },
    { id: 'xihan_liang', name: { zh: '梁国', en: 'Kingdom of Liang' }, color: '#c9a227', role: 'rival' },
    { id: 'xihan_huaiyang', name: { zh: '淮阳国', en: 'Kingdom of Huaiyang' }, color: '#dc7633', role: 'rival' },
    { id: 'xihan_zhao', name: { zh: '赵国', en: 'Kingdom of Zhao (Han)' }, color: '#8e6bb0', role: 'rival' },
    { id: 'xihan_dai', name: { zh: '代国', en: 'Kingdom of Dai' }, color: '#b9770e', role: 'rival' },
    { id: 'xihan_yan', name: { zh: '燕国', en: 'Kingdom of Yan (Han)' }, color: '#1f9e89', role: 'rival' },
    { id: 'xihan_nanyue', name: { zh: '南越国', en: 'Nanyue' }, color: '#a9b48a', role: 'neighbor' },
    { id: 'xihan_dongou', name: { zh: '东瓯（东海国）', en: 'Dong’ou (Donghai)' }, color: '#b2bfa5', role: 'neighbor' },
    { id: 'xihan_xny', name: { zh: '西南夷诸部（邛、笮、昆明）', en: 'Southwestern peoples (Qiong, Zuo, Kunming)' }, color: '#bcae95', role: 'neighbor' },
    { id: 'xihan_xiyu', name: { zh: '西域诸国', en: 'Oasis states of the Western Regions' }, color: '#c2b49a', role: 'neighbor' },
    { id: 'xihan_duhu', name: { zh: '西域都护府', en: 'Protectorate of the Western Regions' }, color: '#b03a2e', role: 'protectorate' },
    { id: 'xihan_dayuan', name: { zh: '大宛', en: 'Dayuan (Ferghana)' }, color: '#c5b8a0', role: 'neighbor' },
    { id: 'xihan_kangju', name: { zh: '康居', en: 'Kangju' }, color: '#b9b29c', role: 'neighbor' },
    { id: 'xihan_wuhuan', name: { zh: '乌桓', en: 'Wuhuan' }, color: '#aeb1a8', role: 'neighbor' },
    { id: 'xihan_fuyu', name: { zh: '夫余', en: 'Buyeo' }, color: '#b8c2be', role: 'neighbor' },
    { id: 'xihan_chen', name: { zh: '辰国（三韩）', en: 'Jin state (Samhan)' }, color: '#c4cccb', role: 'neighbor' },
    { id: 'xihan_xin', name: { zh: '新', en: 'Xin (Wang Mang)' }, color: '#9b5b34', role: 'main' },
    { id: 'xihan_gengshi', name: { zh: '更始（汉）', en: 'Gengshi Han' }, color: '#a63a50', role: 'main' },
    { id: 'xihan_chimei', name: { zh: '赤眉', en: 'Red Eyebrows' }, color: '#8c3b3b', role: 'rival' },
    { id: 'xihan_chengjia', name: { zh: '成家（公孙述）', en: 'Chengjia (Gongsun Shu)' }, color: '#c98a2b', role: 'rival' },
  ],
  roles: { ehan: 'rival' },
  seats,
  holds,
  phases: [
    { id: 'o_xihan_1', from: -202, to: -155, at: -195, title: { zh: '汉初郡国并行（约前195年）', en: 'Early Han: commanderies and kingdoms side by side (c. 195 BCE)' } },
    { id: 'o_xihan_2', from: -154, to: -128, at: -135, title: { zh: '七国之乱后，王国归朝廷治理（约前135年）', en: 'After the Seven Kingdoms’ revolt: the court governs the kingdoms (c. 135 BCE)' } },
    { id: 'o_xihan_3', from: -127, to: -122, at: -125, title: { zh: '卫青收河南地，置朔方、五原（约前125年）', en: 'Wei Qing retakes the Ordos: Shuofang and Wuyuan (c. 125 BCE)' } },
    { id: 'o_xihan_4', from: -121, to: -112, at: -115, title: { zh: '浑邪王降，河西归汉（约前115年）', en: 'The Hunye king submits; the Hexi corridor becomes Han (c. 115 BCE)' } },
    { id: 'o_xihan_5', from: -111, to: -109, at: -109, title: { zh: '平南越、闽越，开西南夷（前109年）', en: 'Nanyue and Minyue conquered, the southwest opened (109 BCE)' } },
    { id: 'o_xihan_6', from: -108, to: -61, at: -100, title: { zh: '灭卫氏朝鲜置四郡，北筑居延（约前100年）', en: 'Wiman Joseon becomes four commanderies; forts at Juyan (c. 100 BCE)' } },
    { id: 'o_xihan_7', from: -60, to: 8, at: 2, title: { zh: '设西域都护，郡国一百零三（公元2年）', en: 'The Western Regions protectorate; 103 commanderies and kingdoms (2 CE)' } },
    { id: 'o_xihan_8', from: 9, to: 23, at: 15, title: { zh: '王莽建新，西域离散（约公元15年）', en: 'Wang Mang’s Xin; the Western Regions break away (c. 15 CE)' } },
    { id: 'o_xihan_9', from: 24, to: 25, at: 24, title: { zh: '更始帝与群雄并起（公元24年）', en: 'The Gengshi emperor and rival risings (24 CE)' } },
  ],
  sources: {
    'sj.gz': { zh: '《史记·高祖本纪》', en: 'Shiji, Annals of Emperor Gaozu' },
    'sj.xyn': { zh: '《史记·匈奴列传》', en: 'Shiji, Account of the Xiongnu' },
    'sj.dyw': { zh: '《史记·大宛列传》', en: 'Shiji, Account of Dayuan' },
    'sj.ny': { zh: '《史记·南越列传》', en: 'Shiji, Account of Southern Yue' },
    'sj.dy': { zh: '《史记·东越列传》', en: 'Shiji, Account of Eastern Yue' },
    'sj.xny': { zh: '《史记·西南夷列传》', en: 'Shiji, Account of the Southwestern Peoples' },
    'sj.cx': { zh: '《史记·朝鲜列传》', en: 'Shiji, Account of Joseon' },
    'sj.hz': { zh: '《史记·货殖列传》', en: 'Shiji, Biographies of the Money-makers' },
    'hs.zhwb': { zh: '《汉书·诸侯王表》', en: 'Hanshu, Table of the Kings' },
    'hs.wudi': { zh: '《汉书·武帝纪》', en: 'Hanshu, Annals of Emperor Wu' },
    'hs.yuan': { zh: '《汉书·元帝纪》', en: 'Hanshu, Annals of Emperor Yuan' },
    'hs.zcg': { zh: '《汉书·赵充国传》', en: 'Hanshu, Biography of Zhao Chongguo' },
    'hs.xy': { zh: '《汉书·西域传》', en: 'Hanshu, Account of the Western Regions' },
    'hs.wm': { zh: '《汉书·王莽传》', en: 'Hanshu, Biography of Wang Mang' },
    'hh.wh': { zh: '《后汉书·乌桓鲜卑列传》', en: 'Hou Hanshu, Account of the Wuhuan and Xianbei' },
    'hh.lxx': { zh: '《后汉书·刘玄刘盆子列传》', en: 'Hou Hanshu, Biographies of Liu Xuan and Liu Penzi' },
    'hh.gw': { zh: '《后汉书·光武帝纪》', en: 'Hou Hanshu, Annals of Emperor Guangwu' },
    'hh.gss': { zh: '《后汉书·公孙述列传》', en: 'Hou Hanshu, Biography of Gongsun Shu' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
