import type { Hold, OwnEra, Seat } from './types.ts';

/**
 * 元 (1279–1368): seats and holdings for our own Yuan maps. Seats are the capitals, the seats of the 路 / 府 / 州 under
 * the 中书省 and the 行省 as 《元史·地理志》 lists them, the 宣慰司 and 万户 of the lands under the 宣政院, and a few
 * large-reach centres for each neighbouring khanate and kingdom, all at their modern sites. Each holding change cites
 * the chapter that records it (`est` marks a date we infer where the sources are silent or disagree).
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

const seats: Seat[] = [
  // 中书省（腹里）
  S('dadu', '大都', 'Dadu (Khanbaliq)', 116.40, 39.90, '北京', { b: 40 }),
  S('shangdu', '上都', 'Shangdu (Xanadu)', 116.18, 42.36, '内蒙古正蓝旗', { r: 420, b: 20 }),
  S('xingho', '兴和路', 'Xinghe', 114.80, 41.10, '河北张北', { r: 320 }),
  S('jining_n', '集宁路', 'Jining', 113.05, 41.52, '内蒙古察哈尔右翼前旗', { r: 340 }),
  S('jingzhou_n', '净州路', 'Jingzhou', 111.55, 41.65, '内蒙古四子王旗', { r: 380 }),
  S('dening', '德宁路', 'Dening', 110.35, 41.75, '内蒙古达尔罕茂明安联合旗', { r: 420 }),
  S('fengzhou', '丰州', 'Fengzhou', 111.84, 40.86, '内蒙古呼和浩特', { r: 300 }),
  S('dongsheng', '东胜州', 'Dongsheng', 111.08, 40.28, '内蒙古托克托', { r: 380 }),
  S('yingchang', '应昌路', 'Yingchang', 116.55, 43.30, '内蒙古克什克腾旗达里诺尔', { r: 450 }),
  S('quanning', '全宁路', 'Quanning', 119.00, 42.90, '内蒙古翁牛特旗', { r: 380 }),
  S('baoding', '保定路', 'Baoding', 115.47, 38.87, '河北保定'),
  S('zhending', '真定路', 'Zhending', 114.57, 38.15, '河北正定'),
  S('hejian', '河间路', 'Hejian', 116.10, 38.44, '河北河间'),
  S('shunde', '顺德路', 'Shunde', 114.50, 37.07, '河北邢台'),
  S('zhangde', '彰德路', 'Zhangde', 114.35, 36.10, '河南安阳'),
  S('daming', '大名路', 'Daming', 115.15, 36.28, '河北大名'),
  S('huaiqing', '怀庆路', 'Huaiqing', 112.93, 35.09, '河南沁阳'),
  S('weihui', '卫辉路', 'Weihui', 114.07, 35.40, '河南卫辉'),
  S('dongping', '东平路', 'Dongping', 116.30, 35.91, '山东东平'),
  S('dongchang', '东昌路', 'Dongchang', 115.98, 36.45, '山东聊城'),
  S('jining', '济宁路', 'Jining', 116.59, 35.41, '山东济宁'),
  S('jinan', '济南路', 'Jinan', 117.00, 36.67, '山东济南'),
  S('yidu', '益都路', 'Yidu', 118.48, 36.69, '山东青州'),
  S('banyang', '般阳路', 'Banyang', 117.97, 36.64, '山东淄博淄川'),
  S('laizhou', '莱州', 'Laizhou', 119.93, 37.18, '山东莱州'),
  S('dengzhou', '登州', 'Dengzhou', 120.75, 37.81, '山东蓬莱'),
  S('ninghai', '宁海州', 'Ninghai', 121.60, 37.39, '山东烟台牟平'),
  S('jiaozhou', '胶州', 'Jiaozhou', 120.00, 36.28, '山东胶州'),
  S('yizhou', '沂州', 'Yizhou', 118.35, 35.10, '山东临沂'),
  S('caozhou', '曹州', 'Caozhou', 115.48, 35.24, '山东菏泽'),
  S('dezhou', '德州', 'Dezhou', 116.30, 37.45, '山东德州'),
  S('jining_sx', '冀宁路', 'Jining (Taiyuan)', 112.55, 37.87, '山西太原'),
  S('datong', '大同路', 'Datong', 113.30, 40.08, '山西大同', { r: 320 }),
  S('jinning', '晋宁路', 'Jinning (Pingyang)', 111.52, 36.08, '山西临汾'),
  S('luzhou_sx', '潞州', 'Luzhou', 113.10, 36.20, '山西长治'),
  S('xinzhou', '忻州', 'Xinzhou', 112.73, 38.42, '山西忻州'),
  S('fenzhou', '汾州', 'Fenzhou', 111.78, 37.27, '山西汾阳'),
  S('jiangzhou_sx', '绛州', 'Jiangzhou', 111.20, 35.60, '山西新绛'),
  S('weizhou', '蔚州', 'Yuzhou', 114.57, 39.84, '河北蔚县'),
  S('shunning', '顺宁府', 'Shunning (Xuande)', 115.03, 40.60, '河北张家口宣化'),
  // 辽阳行省
  S('liaoyang', '辽阳路', 'Liaoyang', 123.17, 41.27, '辽宁辽阳', { b: 10 }),
  S('shenyang', '沈阳路', 'Shenyang', 123.43, 41.80, '辽宁沈阳'),
  S('daning', '大宁路', 'Daning', 119.30, 41.60, '内蒙古宁城', { r: 340 }),
  S('guangning', '广宁府路', 'Guangning', 121.80, 41.60, '辽宁北镇'),
  S('xianping', '咸平府', 'Xianping', 124.04, 42.54, '辽宁开原', { r: 320 }),
  S('kaiyuan', '开元路', 'Kaiyuan', 125.17, 44.43, '吉林农安', { r: 420 }),
  S('zhaozhou', '肇州', 'Zhaozhou', 125.20, 45.60, '吉林扶余、黑龙江肇东一带', { r: 450 }),
  S('shuidada', '水达达路', 'Shuidada', 129.57, 46.33, '黑龙江依兰', { r: 500 }),
  S('nuergan', '奴儿干（征东元帅府）', 'Nurgan', 139.75, 52.93, '俄罗斯特林', { r: 800 }),
  S('heilongjiang', '黑龙江中游（吉烈迷、兀者）', 'Middle Amur (Gilemi, Wuzhe)', 131.5, 49.5, '黑龙江、俄罗斯阿穆尔州一带', { r: 700 }),
  S('hailar', '呼伦贝尔（诸王分地）', 'Hulunbuir (princely appanages)', 119.70, 49.20, '内蒙古海拉尔', { r: 650 }),
  S('helan', '合兰府（双城）', 'Helan (Ssangseong)', 127.40, 39.60, '朝鲜咸镜南道金野', { r: 220 }),
  S('jilju', '吉州（女真故地）', 'Kilju (Jurchen lands)', 129.30, 40.95, '朝鲜咸镜北道吉州', { r: 300 }),
  S('dongning', '东宁府', 'Dongning', 125.75, 39.02, '朝鲜平壤', { r: 220 }),
  S('tamra', '耽罗', 'Tamna (Jeju)', 126.53, 33.50, '韩国济州', { r: 60 }),
  // 岭北行省
  S('helin', '和林', 'Karakorum', 102.84, 47.20, '蒙古国哈拉和林', { r: 900, b: 30 }),
  S('chenghai', '称海', 'Chinqai', 94.50, 46.80, '蒙古国西部（位置有争议）', { r: 750 }),
  S('qianzhou', '谦州', 'Qianzhou (Kem-Kemchik)', 92.50, 51.60, '俄罗斯图瓦', { r: 650 }),
  S('jilijisi', '吉利吉思', 'Kirghiz', 91.40, 53.70, '俄罗斯阿巴坎一带', { r: 650 }),
  S('baliuhu', '八剌忽', 'Barghu', 109.60, 53.60, '俄罗斯巴尔古津', { r: 700 }),
  S('selengge', '薛灵哥河', 'Selenga', 107.60, 51.80, '俄罗斯乌兰乌德一带', { r: 650 }),
  S('wonan', '斡难河（大斡耳朵）', 'Onon (Great Ordo)', 110.50, 48.50, '蒙古国肯特省', { r: 700 }),
  S('lujuhe', '胪朐河', 'Kherlen', 115.00, 47.80, '蒙古国东方省', { r: 700 }),
  S('chita', '石勒喀河', 'Shilka', 114.50, 52.00, '俄罗斯赤塔一带', { r: 600 }),
  S('kobdo', '按台山东（科布多）', 'Eastern Altai (Khovd)', 91.64, 48.00, '蒙古国科布多', { r: 500 }),
  S('wuliyasutai', '杭爱山西', 'Western Khangai', 96.80, 47.70, '蒙古国乌里雅苏台', { r: 550 }),
  S('gobi', '漠北戈壁', 'Gobi', 105.0, 44.0, '蒙古国南戈壁一带', { r: 700 }),
  // 河南江北行省
  S('bianliang', '汴梁路', 'Bianliang', 114.35, 34.80, '河南开封', { b: 20 }),
  S('henanfu', '河南府路', 'Henan (Luoyang)', 112.45, 34.62, '河南洛阳'),
  S('nanyang', '南阳府', 'Nanyang', 112.53, 33.00, '河南南阳'),
  S('runing', '汝宁府', 'Runing', 114.02, 33.00, '河南汝南'),
  S('ruzhou', '汝州', 'Ruzhou', 112.85, 34.17, '河南汝州'),
  S('guide', '归德府', 'Guide', 115.65, 34.42, '河南商丘'),
  S('chenzhou', '陈州', 'Chenzhou', 114.88, 33.73, '河南淮阳'),
  S('yingzhou', '颍州', 'Yingzhou', 115.82, 32.90, '安徽阜阳'),
  S('bozhou', '亳州', 'Bozhou', 115.78, 33.85, '安徽亳州'),
  S('xinyang', '信阳州', 'Xinyang', 114.07, 32.13, '河南信阳'),
  S('guangzhou_h', '光州', 'Guangzhou (Huai)', 115.05, 32.13, '河南潢川'),
  S('xiangyang', '襄阳路', 'Xiangyang', 112.14, 32.05, '湖北襄阳'),
  S('junzhou', '均州', 'Junzhou', 111.00, 32.55, '湖北丹江口'),
  S('dean', '德安府', 'De’an', 113.60, 31.27, '湖北安陆'),
  S('anlu', '安陆府', 'Anlu', 112.58, 31.17, '湖北钟祥'),
  S('zhongxing', '中兴路', 'Zhongxing (Jiangling)', 112.20, 30.35, '湖北荆州'),
  S('xiazhou', '峡州', 'Xiazhou', 111.30, 30.70, '湖北宜昌'),
  S('mianyang', '沔阳府', 'Mianyang', 113.45, 30.37, '湖北仙桃'),
  S('huangzhou', '黄州路', 'Huangzhou', 114.87, 30.45, '湖北黄冈'),
  S('qizhou', '蕲州路', 'Qizhou', 115.35, 30.25, '湖北蕲春'),
  S('luzhou_h', '庐州路', 'Luzhou', 117.27, 31.86, '安徽合肥'),
  S('anfeng', '安丰路', 'Anfeng', 116.79, 32.58, '安徽寿县'),
  S('anqing', '安庆路', 'Anqing', 117.05, 30.52, '安徽安庆'),
  S('haozhou', '濠州', 'Haozhou', 117.55, 32.87, '安徽凤阳'),
  S('xuzhou', '徐州', 'Xuzhou', 117.18, 34.26, '江苏徐州'),
  S('suzhou_h', '宿州', 'Suzhou (Huaibei)', 116.98, 33.65, '安徽宿州'),
  S('pizhou', '邳州', 'Pizhou', 117.95, 34.32, '江苏睢宁、邳州一带'),
  S('haizhou', '海州', 'Haizhou', 119.18, 34.60, '江苏连云港'),
  S('huaian', '淮安路', 'Huai’an', 119.14, 33.50, '江苏淮安'),
  S('gaoyou', '高邮府', 'Gaoyou', 119.45, 32.78, '江苏高邮'),
  S('taizhou_h', '泰州', 'Taizhou', 119.92, 32.46, '江苏泰州'),
  S('tongzhou', '通州', 'Tongzhou', 120.86, 32.00, '江苏南通'),
  S('yangzhou', '扬州路', 'Yangzhou', 119.43, 32.40, '江苏扬州'),
  S('chuzhou', '滁州', 'Chuzhou', 118.32, 32.30, '安徽滁州'),
  S('hezhou', '和州', 'Hezhou', 118.35, 31.72, '安徽和县'),
  S('sizhou', '泗州', 'Sizhou', 118.55, 33.00, '江苏盱眙'),
  // 江浙行省
  S('hangzhou', '杭州路', 'Hangzhou', 120.16, 30.27, '浙江杭州', { b: 15 }),
  S('jiqing', '集庆路', 'Jiqing (Nanjing)', 118.78, 32.05, '江苏南京', { b: 10 }),
  S('zhenjiang', '镇江路', 'Zhenjiang', 119.45, 32.20, '江苏镇江'),
  S('changzhou', '常州路', 'Changzhou', 119.95, 31.78, '江苏常州'),
  S('jiangyin', '江阴州', 'Jiangyin', 120.27, 31.90, '江苏江阴'),
  S('pingjiang', '平江路', 'Pingjiang (Suzhou)', 120.62, 31.30, '江苏苏州', { b: 10 }),
  S('songjiang', '松江府', 'Songjiang', 121.23, 31.00, '上海松江'),
  S('jiaxing', '嘉兴路', 'Jiaxing', 120.75, 30.75, '浙江嘉兴'),
  S('huzhou', '湖州路', 'Huzhou', 120.09, 30.87, '浙江湖州'),
  S('taiping', '太平路', 'Taiping', 118.50, 31.55, '安徽当涂'),
  S('ningguo', '宁国路', 'Ningguo', 118.75, 30.95, '安徽宣城'),
  S('guangde', '广德路', 'Guangde', 119.42, 30.89, '安徽广德'),
  S('chizhou', '池州路', 'Chizhou', 117.49, 30.66, '安徽池州'),
  S('huizhou', '徽州路', 'Huizhou', 118.43, 29.87, '安徽歙县'),
  S('jiande', '建德路', 'Jiande', 119.43, 29.55, '浙江建德梅城'),
  S('wuzhou', '婺州路', 'Wuzhou', 119.65, 29.08, '浙江金华'),
  S('quzhou', '衢州路', 'Quzhou', 118.87, 28.97, '浙江衢州'),
  S('chuzhou_z', '处州路', 'Chuzhou', 119.92, 28.45, '浙江丽水'),
  S('shaoxing', '绍兴路', 'Shaoxing', 120.58, 30.00, '浙江绍兴'),
  S('qingyuan', '庆元路', 'Qingyuan (Ningbo)', 121.55, 29.87, '浙江宁波'),
  S('taizhou_z', '台州路', 'Taizhou', 121.12, 28.85, '浙江临海'),
  S('wenzhou', '温州路', 'Wenzhou', 120.65, 28.00, '浙江温州'),
  S('xinzhou_j', '信州路', 'Xinzhou', 117.95, 28.45, '江西上饶'),
  S('raozhou', '饶州路', 'Raozhou', 116.68, 29.00, '江西鄱阳'),
  S('fuzhou', '福州路', 'Fuzhou', 119.30, 26.08, '福建福州'),
  S('jianning', '建宁路', 'Jianning', 118.32, 27.05, '福建建瓯'),
  S('shaowu', '邵武路', 'Shaowu', 117.48, 27.33, '福建邵武'),
  S('yanping', '延平路', 'Yanping', 118.18, 26.65, '福建南平'),
  S('tingzhou', '汀州路', 'Tingzhou', 116.36, 25.82, '福建长汀'),
  S('xinghua', '兴化路', 'Xinghua', 119.00, 25.43, '福建莆田'),
  S('quanzhou', '泉州路', 'Quanzhou', 118.58, 24.90, '福建泉州'),
  S('zhangzhou', '漳州路', 'Zhangzhou', 117.65, 24.52, '福建漳州'),
  S('penghu', '澎湖巡检司', 'Penghu', 119.57, 23.57, '台湾澎湖', { r: 40 }),
  // 江西行省
  S('longxing', '龙兴路', 'Longxing (Nanchang)', 115.89, 28.68, '江西南昌', { b: 10 }),
  S('jiangzhou', '江州路', 'Jiangzhou', 116.00, 29.71, '江西九江'),
  S('nankang', '南康路', 'Nankang', 116.05, 29.45, '江西庐山星子'),
  S('ruizhou', '瑞州路', 'Ruizhou', 115.38, 28.40, '江西高安'),
  S('yuanzhou', '袁州路', 'Yuanzhou', 114.38, 27.80, '江西宜春'),
  S('linjiang', '临江路', 'Linjiang', 115.37, 27.97, '江西樟树'),
  S('jian', '吉安路', 'Ji’an', 114.98, 27.12, '江西吉安'),
  S('fuzhou_j', '抚州路', 'Fuzhou (Jiangxi)', 116.35, 27.95, '江西抚州'),
  S('jianchang', '建昌路', 'Jianchang', 116.63, 27.57, '江西南城'),
  S('ganzhou', '赣州路', 'Ganzhou', 114.93, 25.85, '江西赣州'),
  S('nanan', '南安路', 'Nan’an', 114.30, 25.40, '江西大余'),
  S('guangzhou', '广州路', 'Guangzhou', 113.26, 23.13, '广东广州', { b: 10 }),
  S('shaozhou', '韶州路', 'Shaozhou', 113.60, 24.80, '广东韶关'),
  S('nanxiong', '南雄路', 'Nanxiong', 114.30, 25.12, '广东南雄'),
  S('huizhou_g', '惠州路', 'Huizhou (Guangdong)', 114.42, 23.08, '广东惠州'),
  S('chaozhou', '潮州路', 'Chaozhou', 116.63, 23.66, '广东潮州'),
  S('meizhou', '梅州', 'Meizhou', 116.12, 24.29, '广东梅州'),
  S('zhaoqing', '肇庆路', 'Zhaoqing', 112.47, 23.05, '广东肇庆'),
  S('deqing', '德庆路', 'Deqing', 111.78, 23.14, '广东德庆'),
  // 湖广行省
  S('wuchang', '武昌路', 'Wuchang', 114.31, 30.55, '湖北武汉', { b: 10 }),
  S('yuezhou', '岳州路', 'Yuezhou', 113.13, 29.37, '湖南岳阳'),
  S('changde', '常德路', 'Changde', 111.69, 29.03, '湖南常德'),
  S('lizhou', '澧州路', 'Lizhou', 111.75, 29.63, '湖南澧县'),
  S('tianlin', '天临路', 'Tianlin (Changsha)', 112.94, 28.23, '湖南长沙'),
  S('hengzhou', '衡州路', 'Hengzhou', 112.60, 26.90, '湖南衡阳'),
  S('yongzhou', '永州路', 'Yongzhou', 111.60, 26.43, '湖南永州'),
  S('chenzhou_h', '郴州路', 'Chenzhou', 113.03, 25.80, '湖南郴州'),
  S('baoqing', '宝庆路', 'Baoqing', 111.47, 27.24, '湖南邵阳'),
  S('daozhou', '道州路', 'Daozhou', 111.60, 25.53, '湖南道县'),
  S('chenzhou_x', '辰州路', 'Chenzhou (Yuanling)', 110.39, 28.47, '湖南沅陵'),
  S('yuanzhou_h', '沅州路', 'Yuanzhou', 109.70, 27.45, '湖南芷江'),
  S('jingzhou_h', '靖州路', 'Jingzhou', 109.68, 26.58, '湖南靖州'),
  S('guizhou_h', '归州', 'Guizhou (Zigui)', 110.75, 31.00, '湖北秭归'),
  S('jingjiang', '静江路', 'Jingjiang (Guilin)', 110.29, 25.27, '广西桂林'),
  S('liuzhou', '柳州路', 'Liuzhou', 109.40, 24.32, '广西柳州'),
  S('qingyuan_g', '庆远南丹安抚司', 'Qingyuan-Nandan', 108.65, 24.48, '广西宜州', { r: 320 }),
  S('xunzhou', '浔州路', 'Xunzhou', 110.08, 23.39, '广西桂平'),
  S('wuzhou_g', '梧州路', 'Wuzhou (Guangxi)', 111.30, 23.48, '广西梧州'),
  S('yongzhou_g', '邕州（南宁路）', 'Nanning', 108.32, 22.82, '广西南宁'),
  S('taiping_g', '太平路', 'Taiping (Guangxi)', 107.35, 22.40, '广西崇左'),
  S('siming', '思明路', 'Siming', 107.07, 22.13, '广西宁明'),
  S('tianzhou', '田州路', 'Tianzhou', 106.90, 23.60, '广西田阳'),
  S('zhenan', '镇安路', 'Zhen’an', 106.60, 23.33, '广西德保'),
  S('yulin', '郁林州', 'Yulin', 110.15, 22.63, '广西玉林'),
  S('lianzhou', '廉州路', 'Lianzhou', 109.20, 21.66, '广西合浦'),
  S('qinzhou', '钦州路', 'Qinzhou', 108.62, 21.95, '广西钦州'),
  S('leizhou', '雷州路', 'Leizhou', 110.08, 20.91, '广东雷州'),
  S('gaozhou', '高州路', 'Gaozhou', 110.85, 21.92, '广东高州'),
  S('qiongzhou', '乾宁安抚司（琼州）', 'Qianning (Qiongzhou)', 110.35, 20.00, '海南海口'),
  S('jiyang', '吉阳军', 'Jiyang', 109.50, 18.25, '海南三亚'),
  S('nanning_j', '南宁军', 'Nanning Army (Danzhou)', 109.58, 19.52, '海南儋州'),
  S('wanan', '万安军', 'Wan’an', 110.40, 18.80, '海南万宁'),
  S('shunyuan', '八番顺元宣慰司', 'Bafan-Shunyuan', 106.71, 26.58, '贵州贵阳', { r: 320 }),
  S('bozhou_g', '播州宣慰司', 'Bozhou', 106.92, 27.72, '贵州遵义', { r: 300 }),
  S('sinan', '思州宣慰司', 'Sizhou', 108.25, 27.95, '贵州思南', { r: 300 }),
  S('xintian', '新添葛蛮安抚司', 'Xintian-Geman', 107.23, 26.57, '贵州贵定'),
  // 四川行省
  S('chengdu', '成都路', 'Chengdu', 104.07, 30.67, '四川成都', { b: 15 }),
  S('chongqing', '重庆路', 'Chongqing', 106.55, 29.56, '重庆', { b: 10 }),
  S('jiading', '嘉定府路', 'Jiading', 103.76, 29.55, '四川乐山'),
  S('xuzhou_s', '叙州路', 'Xuzhou (Yibin)', 104.63, 28.77, '四川宜宾'),
  S('luzhou_s', '泸州', 'Luzhou (Sichuan)', 105.44, 28.87, '四川泸州'),
  S('shunqing', '顺庆路', 'Shunqing', 106.08, 30.80, '四川南充'),
  S('tongchuan', '潼川府', 'Tongchuan', 105.10, 31.10, '四川三台'),
  S('baoning', '保宁府', 'Baoning', 105.98, 31.58, '四川阆中'),
  S('guangyuan', '广元路', 'Guangyuan', 105.84, 32.44, '四川广元'),
  S('kuizhou', '夔州路', 'Kuizhou', 109.50, 31.03, '重庆奉节'),
  S('wanzhou', '万州', 'Wanzhou', 108.40, 30.80, '重庆万州'),
  S('fuzhou_s', '涪州', 'Fuzhou (Fuling)', 107.38, 29.70, '重庆涪陵'),
  S('shaoqing', '绍庆府', 'Shaoqing', 108.17, 29.30, '重庆彭水'),
  S('dazhou', '达州', 'Dazhou', 107.50, 31.20, '四川达州'),
  S('yazhou', '雅州', 'Yazhou', 103.00, 29.98, '四川雅安', { r: 280 }),
  S('maozhou', '茂州', 'Maozhou', 103.85, 31.68, '四川茂县', { r: 260 }),
  S('mahu', '马湖路', 'Mahu', 104.15, 28.65, '四川屏山'),
  S('yongning', '永宁路', 'Yongning', 105.43, 28.17, '四川叙永'),
  S('longzhou', '龙州', 'Longzhou', 104.53, 32.40, '四川平武'),
  // 陕西行省
  S('fengyuan', '奉元路', 'Fengyuan (Xi’an)', 108.94, 34.27, '陕西西安', { b: 20 }),
  S('fengxiang', '凤翔府', 'Fengxiang', 107.40, 34.52, '陕西凤翔'),
  S('yanan', '延安路', 'Yan’an', 109.49, 36.60, '陕西延安', { r: 320 }),
  S('suide', '绥德州', 'Suide', 110.25, 37.50, '陕西绥德', { r: 300 }),
  S('gongchang', '巩昌府', 'Gongchang', 104.62, 35.00, '甘肃陇西'),
  S('lintao', '临洮府', 'Lintao', 103.85, 35.38, '甘肃临洮'),
  S('pingliang', '平凉府', 'Pingliang', 106.67, 35.54, '甘肃平凉'),
  S('qingyang', '庆阳府', 'Qingyang', 107.64, 35.73, '甘肃庆阳'),
  S('kaicheng', '开成路', 'Kaicheng', 106.27, 36.00, '宁夏固原'),
  S('xingyuan', '兴元路', 'Xingyuan (Hanzhong)', 107.03, 33.07, '陕西汉中'),
  S('jinzhou', '金州', 'Jinzhou (Ankang)', 109.03, 32.68, '陕西安康'),
  S('shangzhou', '商州', 'Shangzhou', 109.93, 33.87, '陕西商洛'),
  S('tongzhou_s', '同州', 'Tongzhou', 109.94, 34.80, '陕西大荔'),
  S('qinzhou_s', '秦州', 'Qinzhou', 105.72, 34.58, '甘肃天水'),
  S('jiezhou', '阶州', 'Jiezhou', 104.92, 33.39, '甘肃陇南武都'),
  S('lanzhou', '兰州', 'Lanzhou', 103.83, 36.06, '甘肃兰州'),
  S('huizhou_s', '会州', 'Huizhou', 104.68, 36.57, '甘肃靖远'),
  S('minzhou', '岷州', 'Minzhou', 104.03, 34.43, '甘肃岷县'),
  // 甘肃行省
  S('ganzhou_g', '甘州路', 'Ganzhou (Zhangye)', 100.45, 38.93, '甘肃张掖', { r: 380, b: 10 }),
  S('yongchang', '永昌路', 'Yongchang', 102.17, 38.25, '甘肃永昌', { r: 340 }),
  S('xiliang', '西凉州', 'Xiliang (Wuwei)', 102.64, 37.93, '甘肃武威', { r: 340 }),
  S('suzhou_g', '肃州路', 'Suzhou (Jiuquan)', 98.50, 39.74, '甘肃酒泉', { r: 400 }),
  S('guazhou', '瓜州', 'Guazhou', 95.78, 40.52, '甘肃瓜州', { r: 400 }),
  S('shazhou', '沙州路', 'Shazhou (Dunhuang)', 94.66, 40.14, '甘肃敦煌', { r: 450 }),
  S('yijinai', '亦集乃路', 'Ejina (Khara-Khoto)', 101.07, 41.97, '内蒙古额济纳旗黑城', { r: 500 }),
  S('ningxia', '宁夏府路', 'Ningxia', 106.27, 38.47, '宁夏银川', { r: 380 }),
  S('yingli', '应理州', 'Yingli', 105.19, 37.51, '宁夏中卫', { r: 300 }),
  S('wulahai', '兀剌海路', 'Uraqai', 106.80, 41.10, '内蒙古乌拉特后旗一带', { r: 480 }),
  S('alashan', '阿拉善', 'Alxa', 104.0, 39.5, '内蒙古阿拉善', { r: 450 }),
  S('xining', '西宁州', 'Xining', 101.78, 36.62, '青海西宁', { r: 360 }),
  S('hamili', '哈密力', 'Qamil (Hami)', 93.51, 42.82, '新疆哈密', { r: 450 }),
  S('huozhou', '火州（畏兀儿）', 'Qocho (Uyghur)', 89.53, 42.85, '新疆吐鲁番高昌故城', { r: 400 }),
  S('bieshibali', '别失八里', 'Beshbalik', 89.00, 44.10, '新疆吉木萨尔', { r: 450 }),
  S('luobu', '罗卜', 'Lop', 88.17, 39.02, '新疆若羌', { r: 900 }),
  S('wo_duan', '斡端', 'Khotan', 79.93, 37.11, '新疆和田', { r: 1000 }),
  // 云南行省
  S('zhongqing', '中庆路', 'Zhongqing (Kunming)', 102.71, 25.04, '云南昆明', { b: 15 }),
  S('dali', '大理路', 'Dali', 100.23, 25.60, '云南大理'),
  S('jinchi', '金齿（永昌府）', 'Jinchi (Yongchang)', 99.17, 25.12, '云南保山', { r: 320 }),
  S('tengchong', '腾冲府', 'Tengchong', 98.50, 25.02, '云南腾冲', { r: 260 }),
  S('weichu', '威楚路', 'Weichu', 101.55, 25.03, '云南楚雄'),
  S('heqing', '鹤庆路', 'Heqing', 100.18, 26.56, '云南鹤庆'),
  S('lijiang', '丽江路', 'Lijiang', 100.23, 26.87, '云南丽江', { r: 320 }),
  S('qujing', '曲靖路', 'Qujing', 103.80, 25.50, '云南曲靖'),
  S('linan', '临安路', 'Lin’an (Jianshui)', 102.82, 23.62, '云南建水'),
  S('yuanjiang', '元江路', 'Yuanjiang', 101.99, 23.60, '云南元江', { r: 300 }),
  S('guangnan', '广南西路', 'Guangnan', 105.05, 24.05, '云南广南', { r: 300 }),
  S('puan', '普安路', 'Pu’an', 104.65, 25.78, '贵州盘州'),
  S('wusa', '乌撒路', 'Wusa', 104.28, 26.87, '贵州威宁'),
  S('wumeng', '乌蒙路', 'Wumeng', 103.72, 27.32, '云南昭通'),
  S('jianchang_y', '建昌路（罗罗斯）', 'Jianchang (Luoluosi)', 102.27, 27.90, '四川西昌', { r: 320 }),
  S('menghua', '蒙化府', 'Menghua', 100.31, 25.23, '云南巍山'),
  S('weiyuan', '威远州', 'Weiyuan', 100.70, 23.50, '云南景谷', { r: 280 }),
  S('cheli', '彻里路', 'Cheli', 100.80, 22.00, '云南景洪', { r: 300 }),
  S('mengding', '孟定路', 'Mengding', 99.07, 23.55, '云南耿马', { r: 260 }),
  S('luchuan', '麓川路', 'Luchuan', 97.85, 24.00, '云南瑞丽', { r: 300 }),
  S('yunyuan', '云远路（孟养）', 'Yunyuan (Mohnyin)', 96.60, 24.80, '缅甸孟拱、孟养一带', { r: 320 }),
  S('taigong', '太公城（缅中行省）', 'Tagaung', 96.00, 23.50, '缅甸太公', { r: 260 }),
  // 宣政院辖地（吐蕃）
  S('hezhou_t', '河州（吐蕃等处宣慰司）', 'Hezhou (Tibetan Pacification Commission)', 103.21, 35.60, '甘肃临夏', { r: 300 }),
  S('songpan', '松潘宕叠威茂州', 'Songpan', 103.60, 32.65, '四川松潘', { r: 600 }),
  S('duogansi', '朵甘思（宣慰司）', 'Mdo-khams', 100.00, 31.60, '四川甘孜', { r: 1500 }),
  S('qamdo', '朵甘思西（昌都）', 'Chamdo', 97.17, 31.14, '西藏昌都', { r: 1800 }),
  S('yushu', '朵甘思北（玉树）', 'Yushu', 97.00, 33.00, '青海玉树', { r: 2000 }),
  S('heyuan', '黄河源（朵思麻）', 'Source of the Yellow River', 98.20, 34.90, '青海玛多', { r: 1800 }),
  S('qaidam', '柴达木', 'Qaidam', 96.00, 36.80, '青海都兰、格尔木一带', { r: 1500 }),
  S('lhasa', '拉萨（蔡巴万户）', 'Lhasa (Tshal-pa)', 91.13, 29.65, '西藏拉萨', { r: 1800 }),
  S('nedong', '乃东（帕木竹巴万户）', 'Nedong (Phag-mo-gru)', 91.77, 29.23, '西藏山南乃东', { r: 1500 }),
  S('sakya', '萨迦', 'Sakya', 88.02, 28.90, '西藏萨迦', { r: 2000, b: 10 }),
  S('nagqu', '那曲（羌塘东）', 'Nagqu', 92.05, 31.47, '西藏那曲', { r: 2200 }),
  S('nyingchi', '工布', 'Kongpo', 94.36, 29.65, '西藏林芝', { r: 1200 }),
  S('zayu', '察隅', 'Zayul', 97.47, 28.66, '西藏察隅', { r: 1000 }),
  S('ngari', '纳里速古鲁孙（阿里）', 'Ngari Korsum', 80.10, 31.50, '西藏阿里札达', { r: 2000 }),
  S('purang', '普兰', 'Purang', 81.18, 30.30, '西藏普兰', { r: 1500 }),
  S('rutog', '日土', 'Rutog', 79.72, 33.38, '西藏日土', { r: 2000 }),
  S('gerze', '改则（羌塘西）', 'Gêrzê', 84.10, 32.30, '西藏改则', { r: 2500 }),
  S('xainza', '申扎（羌塘中）', 'Xainza', 88.70, 30.95, '西藏申扎', { r: 2400 }),
  S('saga', '萨嘎', 'Saga', 85.23, 29.33, '西藏萨嘎', { r: 1800 }),
  S('hoh_xil', '可可西里', 'Hoh Xil', 91.50, 35.00, '青海可可西里', { r: 2600 }),
  S('qiemo', '且末（昆仑北）', 'Qiemo', 85.53, 38.13, '新疆且末', { r: 1000 }),
  // 窝阔台汗国（海都）
  S('emil', '叶密立', 'Emil', 83.60, 46.50, '新疆额敏', { r: 800 }),
  S('qayaliq', '海押立', 'Qayaliq', 79.50, 45.00, '哈萨克斯坦塔尔迪库尔干一带', { r: 600 }),
  S('altai', '也儿的石河（阿尔泰）', 'Irtysh (Altai)', 86.50, 48.00, '新疆阿勒泰', { r: 700 }),
  S('talas', '塔剌思', 'Talas', 71.37, 42.90, '哈萨克斯坦塔拉兹', { r: 500 }),
  // 察合台汗国
  S('almaliq', '阿力麻里', 'Almaliq', 80.80, 44.00, '新疆霍城', { r: 600 }),
  S('kashgar', '可失哈耳', 'Kashgar', 75.99, 39.47, '新疆喀什', { r: 900 }),
  S('aksu', '阿克苏', 'Aksu', 80.26, 41.17, '新疆阿克苏', { r: 800 }),
  S('kuqa', '苦叉', 'Kucha', 82.96, 41.72, '新疆库车', { r: 800 }),
  S('samarkand', '撒麻耳干', 'Samarkand', 66.97, 39.65, '乌兹别克斯坦撒马尔罕', { r: 600 }),
  S('bukhara', '不花剌', 'Bukhara', 64.42, 39.77, '乌兹别克斯坦布哈拉', { r: 500 }),
  S('balkh', '巴里黑', 'Balkh', 66.90, 36.76, '阿富汗巴尔赫', { r: 500 }),
  S('kabul', '可不里', 'Kabul', 69.17, 34.53, '阿富汗喀布尔', { r: 450 }),
  S('fergana', '忽毡（费尔干纳）', 'Khujand (Ferghana)', 69.62, 40.28, '塔吉克斯坦苦盏', { r: 450 }),
  S('issyk', '热海（伊塞克湖）', 'Issyk-Kul', 77.5, 42.5, '吉尔吉斯斯坦伊塞克湖', { r: 500 }),
  // 金帐汗国、伊利汗国
  S('sighnaq', '昔格纳黑（白帐）', 'Sighnaq (White Horde)', 68.20, 44.00, '哈萨克斯坦克孜勒奥尔达一带', { r: 900 }),
  S('kipchak', '钦察草原东部', 'Eastern Kipchak steppe', 68.0, 50.0, '哈萨克斯坦中部', { r: 900 }),
  S('ishim', '也儿的石下游（失必儿）', 'Lower Irtysh (Sibir)', 70.0, 56.0, '俄罗斯鄂木斯克一带', { r: 900 }),
  S('ob', '鄂毕河上游', 'Upper Ob', 82.0, 53.5, '俄罗斯巴尔瑙尔一带', { r: 700 }),
  S('herat', '也里（赫拉特）', 'Herat', 62.20, 34.35, '阿富汗赫拉特', { r: 600 }),
  S('merv', '马鲁', 'Merv', 61.83, 37.60, '土库曼斯坦马雷', { r: 500 }),
  S('kandahar', '坎大哈', 'Kandahar', 65.70, 31.61, '阿富汗坎大哈', { r: 500 }),
  // 南亚
  S('delhi', '德里', 'Delhi', 77.20, 28.60, '印度德里', { r: 1100 }),
  S('lahore', '拉合尔', 'Lahore', 74.35, 31.55, '巴基斯坦拉合尔', { r: 600 }),
  S('multan', '木尔坦', 'Multan', 71.47, 30.20, '巴基斯坦木尔坦', { r: 600 }),
  S('gujarat', '古吉拉特', 'Gujarat', 72.60, 23.00, '印度艾哈迈达巴德', { r: 600 }),
  S('malwa', '马尔瓦', 'Malwa', 75.80, 23.20, '印度乌贾因', { r: 600 }),
  S('devagiri', '德瓦吉里', 'Devagiri', 75.21, 19.94, '印度道拉塔巴德', { r: 700 }),
  S('lakhnauti', '勒克瑙蒂（孟加拉）', 'Lakhnauti (Bengal)', 88.13, 24.87, '印度高尔', { r: 600 }),
  S('sonargaon', '索纳尔冈', 'Sonargaon', 90.60, 23.65, '孟加拉国纳拉扬甘杰', { r: 400 }),
  S('cuttack', '奥里萨', 'Orissa', 85.88, 20.46, '印度克塔克', { r: 600 }),
  S('kathmandu', '加德满都谷地', 'Kathmandu Valley', 85.32, 27.70, '尼泊尔加德满都', { r: 350 }),
  S('kamata', '迦摩缕波', 'Kamarupa', 91.75, 26.18, '印度古瓦哈蒂', { r: 400 }),
  S('ahom', '阿洪姆', 'Ahom', 94.63, 26.98, '印度锡瓦萨格尔', { r: 350 }),
  S('kashmir', '克什米尔', 'Kashmir', 74.80, 34.08, '克什米尔斯利那加', { r: 500 }),
  S('ladakh', '拉达克', 'Ladakh', 77.58, 34.16, '拉达克列城', { r: 1200 }),
  // 东南亚、东亚
  S('thanglong', '升龙', 'Thăng Long', 105.85, 21.03, '越南河内', { r: 400 }),
  S('thanhhoa', '清化', 'Thanh Hóa', 105.78, 19.80, '越南清化', { r: 300 }),
  S('nghean', '乂安', 'Nghệ An', 105.68, 18.67, '越南荣市', { r: 300 }),
  S('hue', '乌州、里州（顺化）', 'Ô and Lý (Huế)', 107.58, 16.46, '越南顺化', { r: 250 }),
  S('champa', '占城（因陀罗补罗）', 'Champa', 108.30, 15.88, '越南广南', { r: 300 }),
  S('phimai', '真腊北境（披迈）', 'Northern Cambodia (Phimai)', 102.50, 15.20, '泰国披迈', { r: 450 }),
  S('sukhothai', '速古台', 'Sukhothai', 99.82, 17.00, '泰国素可泰', { r: 400 }),
  S('lanna', '八百媳妇', 'Lan Na', 98.98, 18.79, '泰国清迈', { r: 380 }),
  S('muangsua', '老挝（川）', 'Muang Sua (Laos)', 102.13, 19.88, '老挝琅勃拉邦', { r: 400 }),
  S('vientiane', '万象', 'Vientiane', 102.60, 17.97, '老挝万象', { r: 300 }),
  S('pagan', '蒲甘', 'Pagan', 94.86, 21.17, '缅甸蒲甘', { r: 450 }),
  S('ava', '邦牙、阿瓦', 'Pinya and Ava', 96.00, 21.85, '缅甸曼德勒一带', { r: 350 }),
  S('pegu', '勃固', 'Pegu', 96.48, 17.33, '缅甸勃固', { r: 400 }),
  S('arakan', '阿拉干', 'Arakan', 93.20, 20.60, '缅甸妙乌', { r: 350 }),
  S('kaesong', '开京', 'Kaegyong', 126.55, 37.97, '朝鲜开城', { r: 450 }),
  S('gyeongju', '庆州', 'Gyeongju', 129.20, 35.85, '韩国庆州', { r: 300 }),
  S('jeonju', '全州', 'Jeonju', 127.15, 35.82, '韩国全州', { r: 300 }),
  S('kyoto', '京都', 'Kyoto', 135.76, 35.01, '日本京都', { r: 700 }),
  S('kamakura', '镰仓', 'Kamakura', 139.55, 35.32, '日本镰仓', { r: 600 }),
  S('dazaifu', '大宰府', 'Dazaifu', 130.52, 33.52, '日本福冈', { r: 400 }),
  S('mutsu', '陆奥', 'Mutsu', 141.10, 39.70, '日本岩手', { r: 450 }),
  S('ezo', '虾夷地', 'Ezo', 141.35, 43.06, '日本北海道', { r: 400 }),
  S('ryukyu', '琉球', 'Ryukyu', 127.70, 26.20, '日本冲绳', { r: 80 }),
];

const Y = 'yuan';
const WU = 'yuan_wu', ZHOU = 'yuan_zhou', HAN = 'yuan_han', TW = 'yuan_tianwan', SONG = 'yuan_song', XIA = 'yuan_xia', FANG = 'yuan_fang', CYD = 'yuan_chenyd';

const holds: Record<string, Hold[]> = {};
/** the same holdings for several seats (space-separated ids) */
const h = (ids: string, ...hs: Hold[]) => { for (const id of ids.split(' ')) holds[id] = hs; };

// 中书省、辽阳、岭北、陕西、甘肃、云南: held to the end of the era
h('dadu shangdu xingho jining_n jingzhou_n dening fengzhou dongsheng yingchang quanning baoding zhending hejian shunde zhangde daming huaiqing weihui dongchang dezhou jining_sx datong jinning luzhou_sx xinzhou fenzhou jiangzhou_sx weizhou shunning', [1279, Y]);
h('liaoyang shenyang daning guangning xianping kaiyuan zhaozhou shuidada heilongjiang hailar jilju', [1279, Y]);
h('nuergan', [1279, Y, 'ys.dili']);
h('helin chenghai qianzhou jilijisi baliuhu selengge wonan lujuhe chita kobdo wuliyasutai gobi', [1279, Y]);
h('fengyuan fengxiang yanan suide gongchang lintao pingliang qingyang kaicheng xingyuan jinzhou shangzhou tongzhou_s qinzhou_s jiezhou lanzhou huizhou_s minzhou', [1279, Y]);
h('ganzhou_g yongchang xiliang suzhou_g guazhou shazhou yijinai ningxia yingli wulahai alashan xining hamili huozhou', [1279, Y]);
h('zhongqing dali jinchi tengchong weichu heqing lijiang qujing linan yuanjiang guangnan puan wusa wumeng jianchang_y menghua weiyuan mengding luchuan', [1279, Y]);
h('cheli', [1279, null], [1296, Y, 'ys.chengzong']);
h('yunyuan', [1279, 'yuan_mian', 'est'], [1287, Y, 'ys.mian']);
h('taigong', [1279, 'yuan_mian'], [1287, Y, 'ys.mian'], [1303, 'yuan_mian', 'ys.mian']);
h('helan', [1279, Y, 'gls'], [1356, 'gaoli', 'gls']);
h('dongning', [1279, Y, 'ys.gaoli'], [1290, 'gaoli', 'ys.gaoli']);
h('tamra', [1279, Y, 'ys.gaoli'], [1294, 'gaoli', 'ys.gaoli']);
h('penghu', [1279, null], [1281, Y, 'est']);
h('bieshibali', [1279, Y, 'ys.shizu'], [1290, 'yuan_haidu', 'est'], [1310, 'chagatai', 'ys.wuzong'], [1348, 'moghul', 'est']);
h('luobu wo_duan', [1279, Y, 'ys.shizu'], [1289, 'chagatai', 'est'], [1348, 'moghul', 'est']);
// lands under the 总制院, from 1288 the 宣政院
h('hezhou_t songpan duogansi qamdo yushu heyuan qaidam lhasa nedong sakya nagqu nyingchi zayu ngari purang rutog gerze xainza saga hoh_xil', [1279, 'yuan_tubo', 'ys.shilao'], [1288, Y, 'ys.baiguan']);
h('qiemo', [1279, Y, 'est'], [1289, 'chagatai', 'est'], [1348, 'moghul', 'est']);

// 河北、山东: the Red Turbans of 宋 (毛贵) in Shandong, 1357–1362
h('dongping jinan banyang laizhou dengzhou ninghai jiaozhou', [1279, Y], [1357, SONG, 'ys.shundi'], [1361, Y, 'ys.shundi'], [1368, WU, 'ms.taizu']);
h('yidu', [1279, Y], [1357, SONG, 'ys.shundi'], [1362, Y, 'ys.shundi'], [1367, WU, 'ms.taizu']);
h('yizhou', [1279, Y], [1367, WU, 'ms.taizu']);
h('jining caozhou', [1279, Y], [1358, SONG, 'est'], [1361, Y, 'est']);
// 河南: 宋 (韩林儿, 刘福通) 1351–1359
h('yingzhou', [1279, Y], [1351, SONG, 'ys.shundi'], [1359, Y, 'ys.shundi']);
h('bozhou', [1279, Y], [1355, SONG, 'ms.hanle'], [1359, Y, 'ys.shundi']);
h('bianliang', [1279, Y], [1358, SONG, 'ms.hanle'], [1359, Y, 'ms.hanle']);
h('guide chenzhou runing', [1279, Y], [1357, SONG, 'est'], [1359, Y, 'ys.shundi']);
h('henanfu ruzhou nanyang xinyang guangzhou_h', [1279, Y]);
h('anfeng', [1279, Y], [1357, SONG, 'ms.hanle'], [1363, WU, 'ms.taizu']);
h('luzhou_h', [1279, Y], [1355, SONG, 'est'], [1364, WU, 'ms.taizu']);
h('haozhou', [1279, Y], [1352, SONG, 'ms.taizu'], [1363, ZHOU, 'est'], [1366, WU, 'ms.taizu']);
h('xuzhou suzhou_h pizhou haizhou', [1279, Y], [1363, ZHOU, 'est'], [1366, WU, 'ms.taizu']);
h('sizhou', [1279, Y], [1356, ZHOU, 'est'], [1366, WU, 'ms.taizu']);
// 湖广、江西: 天完 (徐寿辉) from 1351, 汉 (陈友谅) from 1360, 吴 from 1361
h('qizhou huangzhou', [1279, Y], [1351, TW, 'ys.shundi'], [1360, HAN, 'ms.chenyl'], [1364, WU, 'ms.taizu']);
h('wuchang mianyang', [1279, Y], [1355, TW, 'ms.chenyl'], [1360, HAN, 'ms.chenyl'], [1364, WU, 'ms.taizu']);
h('yuezhou zhongxing lizhou changde', [1279, Y], [1357, TW, 'est'], [1360, HAN, 'ms.chenyl'], [1364, WU, 'ms.taizu']);
h('tianlin hengzhou', [1279, Y], [1359, TW, 'est'], [1360, HAN, 'ms.chenyl'], [1364, WU, 'ms.taizu']);
h('xiazhou', [1279, Y], [1358, TW, 'est'], [1360, HAN, 'est'], [1365, WU, 'est']);
h('yongzhou chenzhou_h baoqing daozhou chenzhou_x yuanzhou_h jingzhou_h', [1279, Y], [1365, WU, 'est']);
h('xiangyang junzhou dean anlu', [1279, Y], [1366, WU, 'ms.taizu']);
h('anqing', [1279, Y], [1357, TW, 'ms.chenyl'], [1360, HAN, 'ms.chenyl'], [1361, WU, 'ms.taizu']);
h('chizhou', [1279, Y], [1357, TW, 'ms.chenyl'], [1359, WU, 'ms.taizu']);
h('jiangzhou nankang raozhou', [1279, Y], [1358, TW, 'ms.chenyl'], [1360, HAN, 'ms.chenyl'], [1361, WU, 'ms.taizu']);
h('longxing ruizhou linjiang jian fuzhou_j yuanzhou', [1279, Y], [1358, TW, 'ms.chenyl'], [1360, HAN, 'ms.chenyl'], [1362, WU, 'ms.taizu']);
h('jianchang', [1279, Y], [1359, TW, 'ms.chenyl'], [1360, HAN, 'ms.chenyl'], [1362, WU, 'ms.taizu']);
h('ganzhou nanan', [1279, Y], [1359, TW, 'ms.chenyl'], [1360, HAN, 'ms.chenyl'], [1365, WU, 'ms.taizu']);
h('guizhou_h jingjiang liuzhou qingyuan_g xunzhou wuzhou_g yongzhou_g taiping_g siming tianzhou zhenan yulin lianzhou qinzhou leizhou gaozhou qiongzhou jiyang nanning_j wanan', [1279, Y]);
h('guangzhou shaozhou nanxiong huizhou_g chaozhou meizhou zhaoqing deqing', [1279, Y]);
h('shunyuan bozhou_g sinan xintian', [1279, Y]);
// 四川: 天完's 明玉珍 from 1357, 夏 from 1360
h('chongqing', [1279, Y], [1357, TW, 'ms.mingyz'], [1360, XIA, 'ms.mingyz']);
h('kuizhou wanzhou fuzhou_s shaoqing', [1279, Y], [1357, TW, 'est'], [1360, XIA, 'ms.mingyz']);
h('chengdu jiading xuzhou_s luzhou_s shunqing tongchuan baoning', [1279, Y], [1358, TW, 'ms.mingyz'], [1360, XIA, 'ms.mingyz']);
h('guangyuan dazhou yazhou maozhou longzhou', [1279, Y], [1360, XIA, 'est']);
h('mahu yongning', [1279, Y]);
// 江浙: 周 (张士诚) from 1353, 吴 (朱元璋) from 1354, 方国珍 from 1356
h('taizhou_h', [1279, Y], [1353, ZHOU, 'ms.zhangsc'], [1365, WU, 'ms.taizu']);
h('gaoyou', [1279, Y], [1354, ZHOU, 'ms.zhangsc'], [1366, WU, 'ms.taizu']);
h('huaian tongzhou', [1279, Y], [1356, ZHOU, 'ms.zhangsc'], [1366, WU, 'ms.taizu']);
h('pingjiang', [1279, Y], [1356, ZHOU, 'ms.zhangsc'], [1367, WU, 'ms.taizu']);
h('songjiang huzhou', [1279, Y], [1356, ZHOU, 'ms.zhangsc'], [1366, WU, 'ms.taizu']);
h('jiaxing', [1279, Y], [1358, ZHOU, 'ms.zhangsc'], [1366, WU, 'ms.taizu']);
h('hangzhou shaoxing', [1279, Y], [1359, ZHOU, 'ms.zhangsc'], [1366, WU, 'ms.taizu']);
h('changzhou jiangyin', [1279, Y], [1356, ZHOU, 'ms.zhangsc'], [1357, WU, 'ms.taizu']);
h('yangzhou', [1279, Y], [1357, WU, 'ms.taizu']);
h('chuzhou', [1279, Y], [1354, WU, 'ms.taizu']);
h('hezhou taiping', [1279, Y], [1355, WU, 'ms.taizu']);
h('jiqing zhenjiang guangde', [1279, Y], [1356, WU, 'ms.taizu']);
h('ningguo huizhou', [1279, Y], [1357, WU, 'ms.taizu']);
h('jiande wuzhou', [1279, Y], [1358, WU, 'ms.taizu']);
h('quzhou chuzhou_z xinzhou_j', [1279, Y], [1359, WU, 'ms.taizu']);
h('qingyuan taizhou_z wenzhou', [1279, Y], [1356, FANG, 'ms.fanggz'], [1367, WU, 'ms.taizu']);
// 福建: 陈友定 holds it for the Yuan from c. 1363
h('fuzhou jianning shaowu yanping tingzhou xinghua quanzhou zhangzhou', [1279, Y], [1363, CYD, 'ms.chenyd']);

// neighbours
h('emil qayaliq altai talas', [1279, 'yuan_haidu', 'ys.shizu'], [1310, 'chagatai', 'ys.wuzong']);
h('almaliq kashgar aksu kuqa issyk', [1279, 'chagatai'], [1348, 'moghul', 'est']);
h('samarkand bukhara balkh kabul fergana', [1279, 'chagatai']);
h('sighnaq kipchak ishim ob', [1279, 'yuan_golden']);
h('herat merv kandahar', [1279, 'yuan_ilkhan'], [1335, 'yuan_kart', 'est']);
h('delhi lahore multan', [1279, 'yuan_delhi']);
h('gujarat', [1279, 'yuan_india'], [1299, 'yuan_delhi', 'est']);
h('malwa', [1279, 'yuan_india'], [1305, 'yuan_delhi', 'est']);
h('devagiri', [1279, 'yuan_india'], [1318, 'yuan_delhi', 'est'], [1347, 'yuan_bahmani', 'est']);
h('lakhnauti sonargaon', [1279, 'yuan_delhi'], [1338, 'yuan_bengal', 'est']);
h('cuttack', [1279, 'yuan_india']);
h('kathmandu', [1279, 'yuan_nepal']);
h('kamata', [1279, 'yuan_india']);
h('ahom', [1279, 'yuan_ahom']);
h('kashmir ladakh', [1279, 'yuan_kashmir']);
h('thanglong thanhhoa nghean', [1279, 'annam', 'ys.annan']);
h('hue', [1279, 'yuan_champa', 'ys.zhancheng'], [1306, 'annam', 'est']);
h('champa', [1279, 'yuan_champa', 'ys.zhancheng']);
h('phimai', [1279, 'yuan_khmer']);
h('sukhothai', [1279, 'yuan_sukhothai']);
h('lanna', [1279, 'yuan_lanna']);
h('muangsua vientiane', [1279, 'yuan_lao']);
h('pagan ava', [1279, 'yuan_mian', 'ys.mian']);
h('pegu', [1279, 'yuan_mian'], [1287, 'yuan_pegu', 'est']);
h('arakan', [1279, 'yuan_arakan']);
h('kaesong gyeongju jeonju', [1279, 'gaoli', 'ys.gaoli']);
h('kyoto kamakura dazaifu mutsu', [1279, 'japan', 'ys.riben']);
h('ezo', [1279, 'yuan_ainu']);
h('ryukyu', [1279, 'yuan_ryukyu']);

export const YUAN: OwnEra = {
  replaces: 'yuan',
  reach: 300,
  polities: [
    { id: 'yuan_tubo', name: { zh: '吐蕃（总制院辖）', en: 'Tibet (under the Zongzhi Yuan)' }, color: '#1e8449', role: 'protectorate' },
    { id: 'yuan_song', name: { zh: '宋（韩林儿）', en: 'Song (Han Lin’er)' }, color: '#a84a4a', role: 'rival' },
    { id: 'yuan_tianwan', name: { zh: '天完（徐寿辉）', en: 'Tianwan (Xu Shouhui)' }, color: '#c98a2b', role: 'rival' },
    { id: 'yuan_han', name: { zh: '汉（陈友谅）', en: 'Han (Chen Youliang)' }, color: '#b9770e', role: 'rival' },
    { id: 'yuan_zhou', name: { zh: '周（张士诚）', en: 'Zhou (Zhang Shicheng)' }, color: '#2e86c1', role: 'rival' },
    { id: 'yuan_wu', name: { zh: '吴（朱元璋）', en: 'Wu (Zhu Yuanzhang)' }, color: '#c0392b', role: 'rival' },
    { id: 'yuan_xia', name: { zh: '夏（明玉珍）', en: 'Xia (Ming Yuzhen)' }, color: '#6b5b95', role: 'rival' },
    { id: 'yuan_fang', name: { zh: '方国珍', en: 'Fang Guozhen' }, color: '#48a9a6', role: 'rival' },
    { id: 'yuan_chenyd', name: { zh: '陈友定（福建）', en: 'Chen Youding (Fujian)' }, color: '#7f8c6d', role: 'rival' },
    { id: 'yuan_haidu', name: { zh: '窝阔台汗国（海都）', en: 'Ögedeid Khanate (Kaidu)' }, color: '#b9ab8e', role: 'neighbor' },
    { id: 'yuan_golden', name: { zh: '金帐汗国', en: 'Golden Horde' }, color: '#b8b09a', role: 'neighbor' },
    { id: 'yuan_ilkhan', name: { zh: '伊利汗国', en: 'Ilkhanate' }, color: '#c9b79c', role: 'neighbor' },
    { id: 'yuan_kart', name: { zh: '卡尔特王朝（赫拉特）', en: 'Kart dynasty (Herat)' }, color: '#c9b79c', role: 'neighbor' },
    { id: 'yuan_delhi', name: { zh: '德里苏丹国', en: 'Delhi Sultanate' }, color: '#c7b299', role: 'neighbor' },
    { id: 'yuan_bengal', name: { zh: '孟加拉苏丹国', en: 'Bengal Sultanate' }, color: '#bcae8f', role: 'neighbor' },
    { id: 'yuan_bahmani', name: { zh: '巴赫曼尼苏丹国', en: 'Bahmani Sultanate' }, color: '#c2b59b', role: 'neighbor' },
    { id: 'yuan_india', name: { zh: '印度诸邦', en: 'Indian kingdoms' }, color: '#cbbfa6', role: 'neighbor' },
    { id: 'yuan_nepal', name: { zh: '尼八剌（尼泊尔）', en: 'Nepal' }, color: '#c4b59a', role: 'neighbor' },
    { id: 'yuan_ahom', name: { zh: '阿洪姆', en: 'Ahom' }, color: '#b5b39a', role: 'neighbor' },
    { id: 'yuan_kashmir', name: { zh: '克什米尔 · 拉达克', en: 'Kashmir and Ladakh' }, color: '#c3b8a0', role: 'neighbor' },
    { id: 'yuan_champa', name: { zh: '占城', en: 'Champa' }, color: '#b9c4b0', role: 'neighbor' },
    { id: 'yuan_khmer', name: { zh: '真腊', en: 'Khmer (Zhenla)' }, color: '#c4bca6', role: 'neighbor' },
    { id: 'yuan_sukhothai', name: { zh: '速古台（素可泰）', en: 'Sukhothai' }, color: '#bdb59c', role: 'neighbor' },
    { id: 'yuan_lanna', name: { zh: '八百媳妇（兰纳）', en: 'Lan Na' }, color: '#b4ad95', role: 'neighbor' },
    { id: 'yuan_lao', name: { zh: '老挝', en: 'Lao (Muang Sua, Lan Xang)' }, color: '#c1b89e', role: 'neighbor' },
    { id: 'yuan_mian', name: { zh: '缅', en: 'Burma (Pagan, Pinya, Ava)' }, color: '#b7a98e', role: 'neighbor' },
    { id: 'yuan_pegu', name: { zh: '勃固', en: 'Pegu (Mon)' }, color: '#c2b8a3', role: 'neighbor' },
    { id: 'yuan_arakan', name: { zh: '阿拉干', en: 'Arakan' }, color: '#bab09a', role: 'neighbor' },
    { id: 'yuan_ainu', name: { zh: '虾夷（阿伊努）', en: 'Ezo (Ainu)' }, color: '#c8c3b4', role: 'neighbor' },
    { id: 'yuan_ryukyu', name: { zh: '琉球', en: 'Ryukyu' }, color: '#c6cdc4', role: 'neighbor' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_yuan_1', from: 1279, to: 1287, at: 1280, title: { zh: '崖山之后：元一统南北，总制院领吐蕃（1280年）', en: 'After Yashan: the Yuan unites north and south; Tibet under the Zongzhi Yuan (1280)' } },
    { id: 'o_yuan_2', from: 1288, to: 1306, at: 1295, title: { zh: '宣政院辖吐蕃，海都据西北（约1295年）', en: 'Tibet under the Xuanzheng Yuan; Kaidu holds the northwest (c. 1295)' } },
    { id: 'o_yuan_3', from: 1307, to: 1350, at: 1330, title: { zh: '行省制下的大一统（约1330年）', en: 'The unified realm of the branch secretariats (c. 1330)' } },
    { id: 'o_yuan_4', from: 1351, to: 1359, at: 1358, title: { zh: '红巾军起：宋、天完与张士诚、朱元璋（1358年）', en: 'The Red Turbans rise: Song, Tianwan, Zhang Shicheng and Zhu Yuanzhang (1358)' } },
    { id: 'o_yuan_5', from: 1360, to: 1363, at: 1362, title: { zh: '陈友谅称汉，明玉珍据蜀（1362年）', en: 'Chen Youliang’s Han; Ming Yuzhen holds Sichuan (1362)' } },
    { id: 'o_yuan_6', from: 1364, to: 1366, at: 1365, title: { zh: '鄱阳湖战后：朱元璋并汉，称吴王（1365年）', en: 'After Lake Poyang: Zhu Yuanzhang takes Han and is King of Wu (1365)' } },
    { id: 'o_yuan_7', from: 1367, to: 1368, at: 1367, title: { zh: '吴灭张士诚、降方国珍，北伐出师（1367年）', en: 'Wu ends Zhang Shicheng, takes Fang Guozhen’s surrender and marches north (1367)' } },
  ],
  sources: {
    'ys.shizu': { zh: '《元史·世祖纪》', en: 'Yuanshi, Annals of Shizu (Khubilai)' },
    'ys.chengzong': { zh: '《元史·成宗纪》', en: 'Yuanshi, Annals of Chengzong' },
    'ys.wuzong': { zh: '《元史·武宗纪》', en: 'Yuanshi, Annals of Wuzong' },
    'ys.shundi': { zh: '《元史·顺帝纪》', en: 'Yuanshi, Annals of Shundi (Toghon Temür)' },
    'ys.dili': { zh: '《元史·地理志》', en: 'Yuanshi, Treatise on Geography' },
    'ys.baiguan': { zh: '《元史·百官志》（至元二十五年改总制院为宣政院）', en: 'Yuanshi, Treatise on Officials (the Zongzhi Yuan renamed Xuanzheng Yuan, 1288)' },
    'ys.shilao': { zh: '《元史·释老传》', en: 'Yuanshi, Biographies of Buddhists and Daoists' },
    'ys.gaoli': { zh: '《元史·外夷传·高丽》', en: 'Yuanshi, Foreign Peoples: Goryeo' },
    'ys.riben': { zh: '《元史·外夷传·日本》', en: 'Yuanshi, Foreign Peoples: Japan' },
    'ys.annan': { zh: '《元史·外夷传·安南》', en: 'Yuanshi, Foreign Peoples: Annam' },
    'ys.zhancheng': { zh: '《元史·外夷传·占城》', en: 'Yuanshi, Foreign Peoples: Champa' },
    'ys.mian': { zh: '《元史·外夷传·缅》', en: 'Yuanshi, Foreign Peoples: Burma' },
    gls: { zh: '《高丽史》', en: 'Goryeosa (History of Goryeo)' },
    'ms.taizu': { zh: '《明史·太祖纪》', en: 'Mingshi, Annals of Taizu' },
    'ms.hanle': { zh: '《明史·韩林儿传》', en: 'Mingshi, Biography of Han Lin’er' },
    'ms.chenyl': { zh: '《明史·陈友谅传》', en: 'Mingshi, Biography of Chen Youliang' },
    'ms.zhangsc': { zh: '《明史·张士诚传》', en: 'Mingshi, Biography of Zhang Shicheng' },
    'ms.fanggz': { zh: '《明史·方国珍传》', en: 'Mingshi, Biography of Fang Guozhen' },
    'ms.mingyz': { zh: '《明史·明玉珍传》', en: 'Mingshi, Biography of Ming Yuzhen' },
    'ms.chenyd': { zh: '《明史·陈友定传》', en: 'Mingshi, Biography of Chen Youding' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
