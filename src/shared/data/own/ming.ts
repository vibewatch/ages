import type { Hold, OwnEra, Seat } from './types.ts';

/**
 * 明 (1368–1644): seats and holdings for our own Ming maps. Seats are the capitals, the 府 / 州 seats of the 两京十三
 * 布政司 as 《明史·地理志》 lists them, the 都司 and 卫所 of the frontier (《明史·兵志》), the 宣慰司 and 土司 of the
 * southwest, the 羁縻卫所 of the Jurchen and the 关西 guards, the 乌思藏 and 朵甘 都司, and a few large-reach centres for
 * each neighbouring khanate and kingdom, all at their modern sites. Each holding change cites the chapter that
 * records it (`est` marks a date we infer where the sources are silent or disagree).
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

const seats: Seat[] = [
  // 北直隶
  S('beijing', '北平（北京）', 'Beiping (Beijing)', 116.40, 39.90, '北京', { b: 40 }),
  S('baoding', '保定府', 'Baoding', 115.47, 38.87, '河北保定'),
  S('zhending', '真定府', 'Zhending', 114.57, 38.15, '河北正定'),
  S('hejian', '河间府', 'Hejian', 116.10, 38.44, '河北河间'),
  S('shunde', '顺德府', 'Shunde', 114.50, 37.07, '河北邢台'),
  S('guangping', '广平府', 'Guangping', 114.70, 36.78, '河北永年'),
  S('daming', '大名府', 'Daming', 115.15, 36.28, '河北大名'),
  S('yongping', '永平府', 'Yongping', 118.87, 39.95, '河北卢龙'),
  S('xuanfu', '宣府镇', 'Xuanfu', 115.03, 40.60, '河北张家口宣化', { r: 260 }),
  S('jizhou', '蓟州镇', 'Jizhou', 117.40, 40.05, '天津蓟州'),
  S('shanhai', '山海关', 'Shanhai Pass', 119.75, 40.00, '河北秦皇岛山海关', { r: 120 }),
  S('dushi', '独石', 'Dushi', 115.73, 41.32, '河北赤城独石口', { r: 200 }),
  S('kaiping', '开平卫（元上都）', 'Kaiping (old Shangdu)', 116.18, 42.36, '内蒙古正蓝旗', { r: 380 }),
  S('xinghe', '兴和守御所', 'Xinghe', 114.80, 41.10, '河北张北', { r: 260 }),
  S('daning', '大宁都司', 'Daning', 119.30, 41.60, '内蒙古宁城', { r: 340 }),
  S('quanning', '全宁卫', 'Quanning', 119.00, 42.90, '内蒙古翁牛特旗', { r: 380 }),
  // 山西
  S('taiyuan', '太原府', 'Taiyuan', 112.55, 37.87, '山西太原', { b: 10 }),
  S('datong', '大同府', 'Datong', 113.30, 40.08, '山西大同', { r: 240 }),
  S('pingyang', '平阳府', 'Pingyang', 111.52, 36.08, '山西临汾'),
  S('luan', '潞安府', 'Lu’an', 113.10, 36.20, '山西长治'),
  S('zezhou', '泽州', 'Zezhou', 112.85, 35.50, '山西晋城'),
  S('fenzhou', '汾州府', 'Fenzhou', 111.78, 37.27, '山西汾阳'),
  S('daizhou', '代州', 'Daizhou', 112.95, 39.07, '山西代县'),
  S('pianguan', '偏头关', 'Piantou Pass', 111.50, 39.43, '山西偏关', { r: 180 }),
  S('puzhou', '蒲州', 'Puzhou', 110.45, 34.87, '山西永济'),
  // 山东
  S('jinan', '济南府', 'Jinan', 117.00, 36.67, '山东济南'),
  S('dongchang', '东昌府', 'Dongchang', 115.98, 36.45, '山东聊城'),
  S('yanzhou', '兖州府', 'Yanzhou', 116.83, 35.55, '山东兖州'),
  S('qingzhou', '青州府', 'Qingzhou', 118.48, 36.69, '山东青州'),
  S('laizhou', '莱州府', 'Laizhou', 119.93, 37.18, '山东莱州'),
  S('dengzhou', '登州府', 'Dengzhou', 120.75, 37.81, '山东蓬莱'),
  S('jiaozhou', '胶州', 'Jiaozhou', 120.00, 36.28, '山东胶州'),
  S('yizhou', '沂州', 'Yizhou', 118.35, 35.10, '山东临沂'),
  S('dezhou', '德州', 'Dezhou', 116.30, 37.45, '山东德州'),
  S('ninghai', '宁海州', 'Ninghai', 121.60, 37.39, '山东烟台牟平'),
  // 河南
  S('kaifeng', '开封府', 'Kaifeng', 114.35, 34.80, '河南开封', { b: 10 }),
  S('henanfu', '河南府', 'Henan (Luoyang)', 112.45, 34.62, '河南洛阳'),
  S('nanyang', '南阳府', 'Nanyang', 112.53, 33.00, '河南南阳'),
  S('runing', '汝宁府', 'Runing', 114.02, 33.00, '河南汝南'),
  S('ruzhou', '汝州', 'Ruzhou', 112.85, 34.17, '河南汝州'),
  S('guide', '归德府', 'Guide', 115.65, 34.42, '河南商丘'),
  S('chenzhou', '陈州', 'Chenzhou', 114.88, 33.73, '河南淮阳'),
  S('zhangde', '彰德府', 'Zhangde', 114.35, 36.10, '河南安阳'),
  S('weihui', '卫辉府', 'Weihui', 114.07, 35.40, '河南卫辉'),
  S('huaiqing', '怀庆府', 'Huaiqing', 112.93, 35.09, '河南沁阳'),
  S('xinyang', '信阳州', 'Xinyang', 114.07, 32.13, '河南信阳'),
  S('guangzhou_h', '光州', 'Guangzhou (Huai)', 115.05, 32.13, '河南潢川'),
  // 陕西
  S('xian', '西安府', 'Xi’an', 108.94, 34.27, '陕西西安', { b: 20 }),
  S('fengxiang', '凤翔府', 'Fengxiang', 107.40, 34.52, '陕西凤翔'),
  S('yanan', '延安府', 'Yan’an', 109.49, 36.60, '陕西延安'),
  S('suide', '绥德州', 'Suide', 110.25, 37.50, '陕西绥德'),
  S('yulin', '榆林镇（延绥）', 'Yulin (Yansui)', 109.73, 38.28, '陕西榆林', { r: 200 }),
  S('qingyang', '庆阳府', 'Qingyang', 107.64, 35.73, '甘肃庆阳'),
  S('pingliang', '平凉府', 'Pingliang', 106.67, 35.54, '甘肃平凉'),
  S('guyuan', '固原镇', 'Guyuan', 106.27, 36.00, '宁夏固原'),
  S('gongchang', '巩昌府', 'Gongchang', 104.62, 35.00, '甘肃陇西'),
  S('lintao', '临洮府', 'Lintao', 103.85, 35.38, '甘肃临洮'),
  S('lanzhou', '兰州', 'Lanzhou', 103.83, 36.06, '甘肃兰州'),
  S('jinglu', '靖虏卫', 'Jinglu', 104.68, 36.57, '甘肃靖远'),
  S('hanzhong', '汉中府', 'Hanzhong', 107.03, 33.07, '陕西汉中'),
  S('xingan', '兴安州', 'Xing’an (Ankang)', 109.03, 32.68, '陕西安康'),
  S('shangzhou', '商州', 'Shangzhou', 109.93, 33.87, '陕西商洛'),
  S('qinzhou_s', '秦州', 'Qinzhou', 105.72, 34.58, '甘肃天水'),
  S('jiezhou', '阶州', 'Jiezhou', 104.92, 33.39, '甘肃陇南武都'),
  S('minzhou', '岷州卫', 'Minzhou', 104.03, 34.43, '甘肃岷县'),
  S('taozhou', '洮州卫', 'Taozhou', 103.35, 34.69, '甘肃临潭'),
  S('hezhou', '河州卫', 'Hezhou', 103.21, 35.60, '甘肃临夏'),
  S('xining', '西宁卫', 'Xining', 101.78, 36.62, '青海西宁', { r: 400 }),
  S('ningxia', '宁夏镇', 'Ningxia', 106.27, 38.47, '宁夏银川', { r: 240 }),
  S('zhongwei', '宁夏中卫', 'Ningxia Middle Guard', 105.19, 37.51, '宁夏中卫'),
  S('ordos', '河套', 'The Ordos (Hetao)', 108.80, 39.50, '内蒙古鄂尔多斯', { r: 450, b: 120 }),
  S('dongsheng', '东胜卫', 'Dongsheng', 111.08, 40.28, '内蒙古托克托', { r: 300 }),
  // 陕西行都司
  S('ganzhou_g', '甘州（陕西行都司）', 'Ganzhou (Shaanxi Branch Regional Command)', 100.45, 38.93, '甘肃张掖', { r: 200, b: 10 }),
  S('liangzhou', '凉州卫', 'Liangzhou', 102.64, 37.93, '甘肃武威', { r: 220 }),
  S('yongchang', '永昌卫', 'Yongchang', 102.17, 38.25, '甘肃永昌', { r: 200 }),
  S('zhenfan', '镇番卫', 'Zhenfan', 103.08, 38.62, '甘肃民勤', { r: 200 }),
  S('zhuanglang', '庄浪卫', 'Zhuanglang', 103.26, 36.73, '甘肃永登'),
  S('suzhou_g', '肃州卫', 'Suzhou (Jiuquan)', 98.50, 39.74, '甘肃酒泉', { r: 180 }),
  // 关西七卫、哈密
  S('chijin', '赤斤蒙古卫', 'Chijin Mongol Guard', 97.05, 40.27, '甘肃玉门', { r: 450 }),
  S('guazhou', '瓜州', 'Guazhou', 95.78, 40.52, '甘肃瓜州', { r: 380 }),
  S('shazhou', '沙州卫', 'Shazhou Guard', 94.66, 40.14, '甘肃敦煌', { r: 450 }),
  S('handong', '罕东卫', 'Handong Guard', 96.20, 39.10, '甘肃肃北、青海祁连山西段一带', { r: 750 }),
  S('anding', '安定卫', 'Anding Guard', 93.80, 38.20, '青海柴达木西北（茫崖一带）', { r: 600 }),
  S('quxian', '曲先卫', 'Quxian Guard', 96.20, 36.80, '青海柴达木东部（都兰一带）', { r: 600 }),
  S('hami', '哈密卫', 'Hami Guard', 93.51, 42.82, '新疆哈密', { r: 450 }),
  S('qinghai', '青海（西海）', 'Kokonor', 99.80, 36.90, '青海湖一带', { r: 750 }),
  // 四川
  S('chengdu', '成都府', 'Chengdu', 104.07, 30.67, '四川成都', { b: 15 }),
  S('chongqing', '重庆府', 'Chongqing', 106.55, 29.56, '重庆', { b: 10 }),
  S('baoning', '保宁府', 'Baoning', 105.98, 31.58, '四川阆中'),
  S('shunqing', '顺庆府', 'Shunqing', 106.08, 30.80, '四川南充'),
  S('kuizhou', '夔州府', 'Kuizhou', 109.50, 31.03, '重庆奉节'),
  S('wanzhou', '万县', 'Wanxian', 108.40, 30.80, '重庆万州'),
  S('fuzhou_s', '涪州', 'Fuzhou (Fuling)', 107.38, 29.70, '重庆涪陵'),
  S('pengshui', '彭水（酉阳、石砫）', 'Pengshui (Youyang, Shizhu)', 108.17, 29.30, '重庆彭水'),
  S('dazhou', '达州', 'Dazhou', 107.50, 31.20, '四川达州'),
  S('guangyuan', '广元县', 'Guangyuan', 105.84, 32.44, '四川广元'),
  S('tongchuan', '潼川州', 'Tongchuan', 105.10, 31.10, '四川三台'),
  S('xuzhou_s', '叙州府', 'Xuzhou (Yibin)', 104.63, 28.77, '四川宜宾'),
  S('luzhou_s', '泸州', 'Luzhou (Sichuan)', 105.44, 28.87, '四川泸州'),
  S('jiading', '嘉定州', 'Jiading', 103.76, 29.55, '四川乐山'),
  S('mahu', '马湖府', 'Mahu', 104.15, 28.65, '四川屏山'),
  S('yazhou', '雅州', 'Yazhou', 103.00, 29.98, '四川雅安', { r: 350 }),
  S('tianquan', '天全六番招讨司', 'Tianquan', 102.75, 30.07, '四川天全', { r: 350 }),
  S('changhexi', '长河西鱼通宁远宣慰司', 'Changhexi', 101.96, 30.05, '四川康定', { r: 650 }),
  S('maozhou', '茂州', 'Maozhou', 103.85, 31.68, '四川茂县', { r: 380 }),
  S('zagu', '杂谷安抚司', 'Zagu', 103.17, 31.43, '四川理县', { r: 450 }),
  S('songpan', '松潘卫', 'Songpan', 103.60, 32.65, '四川松潘', { r: 550 }),
  S('longan', '龙安府', 'Long’an', 104.53, 32.40, '四川平武'),
  S('jianchang', '建昌卫', 'Jianchang', 102.27, 27.90, '四川西昌', { r: 450 }),
  S('yongning', '永宁宣抚司', 'Yongning', 105.43, 28.17, '四川叙永'),
  S('bozhou', '播州宣慰司', 'Bozhou', 106.92, 27.72, '贵州遵义', { r: 300 }),
  S('wusa', '乌撒府', 'Wusa', 104.28, 26.87, '贵州威宁'),
  S('wumeng', '乌蒙府', 'Wumeng', 103.72, 27.32, '云南昭通'),
  S('dongchuan', '东川府', 'Dongchuan', 103.30, 26.42, '云南会泽'),
  // 湖广
  S('wuchang', '武昌府', 'Wuchang', 114.31, 30.55, '湖北武汉', { b: 10 }),
  S('huangzhou', '黄州府', 'Huangzhou', 114.87, 30.45, '湖北黄冈'),
  S('qizhou', '蕲州', 'Qizhou', 115.35, 30.25, '湖北蕲春'),
  S('dean', '德安府', 'De’an', 113.60, 31.27, '湖北安陆'),
  S('chengtian', '承天府（安陆州）', 'Chengtian (Anlu)', 112.58, 31.17, '湖北钟祥'),
  S('xiangyang', '襄阳府', 'Xiangyang', 112.14, 32.05, '湖北襄阳'),
  S('yunyang', '郧阳府', 'Yunyang', 110.80, 32.65, '湖北十堰郧阳'),
  S('jingzhou', '荆州府', 'Jingzhou', 112.20, 30.35, '湖北荆州'),
  S('yiling', '夷陵州', 'Yiling', 111.30, 30.70, '湖北宜昌'),
  S('mianyang', '沔阳州', 'Mianyang', 113.45, 30.37, '湖北仙桃'),
  S('shizhou', '施州卫', 'Shizhou', 109.48, 30.30, '湖北恩施'),
  S('rongmei', '容美宣抚司', 'Rongmei', 110.03, 29.90, '湖北鹤峰'),
  S('yuezhou', '岳州府', 'Yuezhou', 113.13, 29.37, '湖南岳阳'),
  S('changsha', '长沙府', 'Changsha', 112.94, 28.23, '湖南长沙'),
  S('changde', '常德府', 'Changde', 111.69, 29.03, '湖南常德'),
  S('lizhou', '澧州', 'Lizhou', 111.75, 29.63, '湖南澧县'),
  S('hengzhou', '衡州府', 'Hengzhou', 112.60, 26.90, '湖南衡阳'),
  S('yongzhou', '永州府', 'Yongzhou', 111.60, 26.43, '湖南永州'),
  S('chenzhou_h', '郴州', 'Chenzhou', 113.03, 25.80, '湖南郴州'),
  S('baoqing', '宝庆府', 'Baoqing', 111.47, 27.24, '湖南邵阳'),
  S('daozhou', '道州', 'Daozhou', 111.60, 25.53, '湖南道县'),
  S('chenzhou_x', '辰州府', 'Chenzhou (Yuanling)', 110.39, 28.47, '湖南沅陵'),
  S('yuanzhou_h', '沅州', 'Yuanzhou', 109.70, 27.45, '湖南芷江'),
  S('jingzhou_h', '靖州', 'Jingzhou', 109.68, 26.58, '湖南靖州'),
  S('yongshun', '永顺宣慰司', 'Yongshun', 109.85, 29.00, '湖南永顺'),
  // 江西
  S('nanchang', '南昌府', 'Nanchang', 115.89, 28.68, '江西南昌', { b: 10 }),
  S('jiujiang', '九江府', 'Jiujiang', 116.00, 29.71, '江西九江'),
  S('nankang', '南康府', 'Nankang', 116.05, 29.45, '江西庐山星子'),
  S('raozhou', '饶州府', 'Raozhou', 116.68, 29.00, '江西鄱阳'),
  S('guangxin', '广信府', 'Guangxin', 117.95, 28.45, '江西上饶'),
  S('jianchang_j', '建昌府', 'Jianchang (Jiangxi)', 116.63, 27.57, '江西南城'),
  S('fuzhou_j', '抚州府', 'Fuzhou (Jiangxi)', 116.35, 27.95, '江西抚州'),
  S('linjiang', '临江府', 'Linjiang', 115.37, 27.97, '江西樟树'),
  S('jian', '吉安府', 'Ji’an', 114.98, 27.12, '江西吉安'),
  S('ruizhou', '瑞州府', 'Ruizhou', 115.38, 28.40, '江西高安'),
  S('yuanzhou', '袁州府', 'Yuanzhou', 114.38, 27.80, '江西宜春'),
  S('ganzhou', '赣州府', 'Ganzhou', 114.93, 25.85, '江西赣州'),
  S('nanan', '南安府', 'Nan’an', 114.30, 25.40, '江西大余'),
  // 南直隶
  S('yingtian', '应天府（南京）', 'Yingtian (Nanjing)', 118.78, 32.05, '江苏南京', { b: 25 }),
  S('fengyang', '凤阳府（中都）', 'Fengyang (Middle Capital)', 117.55, 32.87, '安徽凤阳'),
  S('suzhou', '苏州府', 'Suzhou', 120.62, 31.30, '江苏苏州'),
  S('songjiang', '松江府', 'Songjiang', 121.23, 31.00, '上海松江'),
  S('changzhou', '常州府', 'Changzhou', 119.95, 31.78, '江苏常州'),
  S('zhenjiang', '镇江府', 'Zhenjiang', 119.45, 32.20, '江苏镇江'),
  S('yangzhou', '扬州府', 'Yangzhou', 119.43, 32.40, '江苏扬州'),
  S('tongzhou', '通州', 'Tongzhou', 120.86, 32.00, '江苏南通'),
  S('huaian', '淮安府', 'Huai’an', 119.14, 33.50, '江苏淮安'),
  S('haizhou', '海州', 'Haizhou', 119.18, 34.60, '江苏连云港'),
  S('xuzhou', '徐州', 'Xuzhou', 117.18, 34.26, '江苏徐州'),
  S('sizhou', '泗州', 'Sizhou', 118.55, 33.00, '江苏盱眙'),
  S('suzhou_h', '宿州', 'Suzhou (Huaibei)', 116.98, 33.65, '安徽宿州'),
  S('yingzhou', '颍州', 'Yingzhou', 115.82, 32.90, '安徽阜阳'),
  S('bozhou_h', '亳州', 'Bozhou', 115.78, 33.85, '安徽亳州'),
  S('luzhou_h', '庐州府', 'Luzhou', 117.27, 31.86, '安徽合肥'),
  S('shouzhou', '寿州', 'Shouzhou', 116.79, 32.58, '安徽寿县'),
  S('anqing', '安庆府', 'Anqing', 117.05, 30.52, '安徽安庆'),
  S('chizhou', '池州府', 'Chizhou', 117.49, 30.66, '安徽池州'),
  S('taiping', '太平府', 'Taiping', 118.50, 31.55, '安徽当涂'),
  S('ningguo', '宁国府', 'Ningguo', 118.75, 30.95, '安徽宣城'),
  S('huizhou', '徽州府', 'Huizhou', 118.43, 29.87, '安徽歙县'),
  S('chuzhou', '滁州', 'Chuzhou', 118.32, 32.30, '安徽滁州'),
  // 浙江
  S('hangzhou', '杭州府', 'Hangzhou', 120.16, 30.27, '浙江杭州', { b: 10 }),
  S('jiaxing', '嘉兴府', 'Jiaxing', 120.75, 30.75, '浙江嘉兴'),
  S('huzhou', '湖州府', 'Huzhou', 120.09, 30.87, '浙江湖州'),
  S('yanzhou_z', '严州府', 'Yanzhou', 119.43, 29.55, '浙江建德梅城'),
  S('jinhua', '金华府', 'Jinhua', 119.65, 29.08, '浙江金华'),
  S('quzhou', '衢州府', 'Quzhou', 118.87, 28.97, '浙江衢州'),
  S('chuzhou_z', '处州府', 'Chuzhou', 119.92, 28.45, '浙江丽水'),
  S('shaoxing', '绍兴府', 'Shaoxing', 120.58, 30.00, '浙江绍兴'),
  S('ningbo', '宁波府', 'Ningbo', 121.55, 29.87, '浙江宁波'),
  S('taizhou_z', '台州府', 'Taizhou', 121.12, 28.85, '浙江临海'),
  S('wenzhou', '温州府', 'Wenzhou', 120.65, 28.00, '浙江温州'),
  // 福建
  S('fuzhou', '福州府', 'Fuzhou', 119.30, 26.08, '福建福州', { b: 5 }),
  S('funing', '福宁州', 'Funing', 119.52, 26.66, '福建霞浦'),
  S('jianning', '建宁府', 'Jianning', 118.32, 27.05, '福建建瓯'),
  S('shaowu', '邵武府', 'Shaowu', 117.48, 27.33, '福建邵武'),
  S('yanping', '延平府', 'Yanping', 118.18, 26.65, '福建南平'),
  S('tingzhou', '汀州府', 'Tingzhou', 116.36, 25.82, '福建长汀'),
  S('xinghua', '兴化府', 'Xinghua', 119.00, 25.43, '福建莆田'),
  S('quanzhou', '泉州府', 'Quanzhou', 118.58, 24.90, '福建泉州'),
  S('zhangzhou', '漳州府', 'Zhangzhou', 117.65, 24.52, '福建漳州'),
  // 广东
  S('guangzhou', '广州府', 'Guangzhou', 113.26, 23.13, '广东广州', { b: 10 }),
  S('shaozhou', '韶州府', 'Shaozhou', 113.60, 24.80, '广东韶关'),
  S('nanxiong', '南雄府', 'Nanxiong', 114.30, 25.12, '广东南雄'),
  S('lianzhou_g', '连州', 'Lianzhou', 112.38, 24.78, '广东连州'),
  S('huizhou_g', '惠州府', 'Huizhou (Guangdong)', 114.42, 23.08, '广东惠州'),
  S('chaozhou', '潮州府', 'Chaozhou', 116.63, 23.66, '广东潮州'),
  S('zhaoqing', '肇庆府', 'Zhaoqing', 112.47, 23.05, '广东肇庆'),
  S('luoding', '罗定州', 'Luoding', 111.57, 22.77, '广东罗定'),
  S('gaozhou', '高州府', 'Gaozhou', 110.85, 21.92, '广东高州'),
  S('leizhou', '雷州府', 'Leizhou', 110.08, 20.91, '广东雷州'),
  S('lianzhou', '廉州府', 'Lianzhou', 109.20, 21.66, '广西合浦'),
  S('qinzhou', '钦州', 'Qinzhou', 108.62, 21.95, '广西钦州'),
  S('qiongzhou', '琼州府', 'Qiongzhou', 110.35, 20.00, '海南海口'),
  S('danzhou', '儋州', 'Danzhou', 109.58, 19.52, '海南儋州'),
  S('wanzhou_h', '万州', 'Wanzhou (Hainan)', 110.40, 18.80, '海南万宁'),
  S('yazhou_h', '崖州', 'Yazhou', 109.50, 18.25, '海南三亚'),
  // 广西
  S('guilin', '桂林府', 'Guilin', 110.29, 25.27, '广西桂林', { b: 5 }),
  S('pingle', '平乐府', 'Pingle', 110.64, 24.63, '广西平乐'),
  S('liuzhou', '柳州府', 'Liuzhou', 109.40, 24.32, '广西柳州'),
  S('qingyuan', '庆远府', 'Qingyuan', 108.65, 24.48, '广西宜州'),
  S('sicheng', '泗城州', 'Sicheng', 106.56, 24.35, '广西凌云', { r: 280 }),
  S('sien', '思恩府', 'Si’en', 108.27, 23.16, '广西武鸣'),
  S('xunzhou', '浔州府', 'Xunzhou', 110.08, 23.39, '广西桂平'),
  S('wuzhou', '梧州府', 'Wuzhou', 111.30, 23.48, '广西梧州'),
  S('nanning', '南宁府', 'Nanning', 108.32, 22.82, '广西南宁'),
  S('taiping_g', '太平府', 'Taiping (Guangxi)', 107.35, 22.40, '广西崇左'),
  S('siming', '思明府', 'Siming', 107.07, 22.13, '广西宁明'),
  S('tianzhou', '田州', 'Tianzhou', 106.90, 23.60, '广西田阳'),
  S('zhenan', '镇安府', 'Zhen’an', 106.60, 23.33, '广西德保'),
  S('yulin_g', '郁林州', 'Yulin', 110.15, 22.63, '广西玉林'),
  // 贵州
  S('guiyang', '贵州宣慰司（贵阳）', 'Guizhou Pacification Commission (Guiyang)', 106.71, 26.58, '贵州贵阳'),
  S('shuixi', '水西', 'Shuixi', 105.60, 27.15, '贵州大方', { r: 280 }),
  S('sinan', '思南府', 'Sinan', 108.25, 27.95, '贵州思南'),
  S('sizhou_gz', '思州府', 'Sizhou', 108.82, 27.17, '贵州岑巩'),
  S('tongren', '铜仁府', 'Tongren', 109.19, 27.72, '贵州铜仁'),
  S('zhenyuan', '镇远府', 'Zhenyuan', 108.42, 27.05, '贵州镇远'),
  S('liping', '黎平府', 'Liping', 109.13, 26.23, '贵州黎平'),
  S('duyun', '都匀府', 'Duyun', 107.52, 26.26, '贵州都匀'),
  S('anshun', '普定卫（安顺）', 'Puding (Anshun)', 105.95, 26.25, '贵州安顺'),
  S('puan', '普安州', 'Pu’an', 104.95, 25.78, '贵州盘州'),
  // 云南
  S('kunming', '云南府', 'Yunnan (Kunming)', 102.71, 25.04, '云南昆明', { b: 15 }),
  S('dali', '大理府', 'Dali', 100.23, 25.60, '云南大理'),
  S('yongchang_y', '永昌府', 'Yongchang', 99.17, 25.12, '云南保山', { r: 300 }),
  S('tengyue', '腾越', 'Tengyue', 98.50, 25.02, '云南腾冲', { r: 240 }),
  S('chuxiong', '楚雄府', 'Chuxiong', 101.55, 25.03, '云南楚雄'),
  S('yaoan', '姚安府', 'Yao’an', 101.24, 25.50, '云南姚安'),
  S('heqing', '鹤庆府', 'Heqing', 100.18, 26.56, '云南鹤庆'),
  S('lijiang', '丽江府', 'Lijiang', 100.23, 26.87, '云南丽江', { r: 450 }),
  S('yongning_y', '永宁府', 'Yongning (Yunnan)', 100.85, 27.28, '云南宁蒗', { r: 450 }),
  S('wuding', '武定府', 'Wuding', 102.40, 25.53, '云南武定'),
  S('qujing', '曲靖府', 'Qujing', 103.80, 25.50, '云南曲靖'),
  S('chengjiang', '澂江府', 'Chengjiang', 102.90, 24.67, '云南澄江'),
  S('guangxi_y', '广西府', 'Guangxi (Yunnan)', 103.77, 24.53, '云南泸西'),
  S('linan', '临安府', 'Lin’an (Jianshui)', 102.82, 23.62, '云南建水'),
  S('yuanjiang', '元江府', 'Yuanjiang', 101.99, 23.60, '云南元江', { r: 280 }),
  S('guangnan', '广南府', 'Guangnan', 105.05, 24.05, '云南广南', { r: 280 }),
  S('menghua', '蒙化府', 'Menghua', 100.31, 25.23, '云南巍山'),
  S('jingdong', '景东府', 'Jingdong', 100.83, 24.45, '云南景东'),
  S('zhenyuan_y', '镇沅府', 'Zhenyuan (Yunnan)', 101.10, 24.00, '云南镇沅'),
  S('weiyuan', '威远州', 'Weiyuan', 100.70, 23.50, '云南景谷'),
  S('cheli', '车里宣慰司', 'Cheli', 100.80, 22.00, '云南景洪', { r: 300 }),
  S('menglian', '孟琏长官司', 'Menglian', 99.58, 22.33, '云南孟连', { r: 220 }),
  S('mengding', '孟定府', 'Mengding', 99.07, 23.55, '云南耿马', { r: 240 }),
  S('nandian', '南甸宣抚司', 'Nandian', 98.30, 24.80, '云南梁河', { r: 200 }),
  S('ganya', '干崖宣抚司', 'Ganya', 97.93, 24.70, '云南盈江', { r: 200 }),
  S('luchuan', '麓川平缅宣慰司', 'Luchuan-Pingmian', 97.85, 24.00, '云南瑞丽', { r: 260 }),
  S('mengyang', '孟养宣慰司', 'Mengyang (Mohnyin)', 96.37, 24.78, '缅甸孟养', { r: 340 }),
  S('manmo', '蛮莫', 'Manmo (Bhamo)', 97.24, 24.27, '缅甸八莫', { r: 180 }),
  S('mubang', '木邦宣慰司', 'Mubang (Hsenwi)', 97.95, 23.30, '缅甸兴威', { r: 300 }),
  S('mengmi', '孟密宣抚司', 'Mengmi (Mongmit)', 96.68, 23.10, '缅甸孟密', { r: 240 }),
  S('menggen', '孟艮府', 'Menggen (Kengtung)', 99.60, 21.30, '缅甸景栋', { r: 300 }),
  // 辽东都司
  S('liaoyang', '辽阳（辽东都司）', 'Liaoyang (Liaodong Regional Command)', 123.17, 41.27, '辽宁辽阳', { b: 10 }),
  S('shenyang', '沈阳卫', 'Shenyang', 123.43, 41.80, '辽宁沈阳'),
  S('guangning', '广宁卫', 'Guangning', 121.80, 41.60, '辽宁北镇', { r: 260 }),
  S('jinzhou_l', '锦州', 'Jinzhou', 121.13, 41.10, '辽宁锦州'),
  S('ningyuan', '宁远卫', 'Ningyuan', 120.73, 40.62, '辽宁兴城'),
  S('kaiyuan', '开原（三万卫）', 'Kaiyuan (Sanwan Guard)', 124.04, 42.54, '辽宁开原', { r: 220 }),
  S('tieling', '铁岭卫', 'Tieling', 123.84, 42.29, '辽宁铁岭', { r: 200 }),
  S('fushun', '抚顺所', 'Fushun', 123.90, 41.88, '辽宁抚顺', { r: 180 }),
  S('haizhou_l', '海州卫', 'Haizhou (Liaodong)', 122.75, 40.85, '辽宁海城'),
  S('gaizhou', '盖州卫', 'Gaizhou', 122.35, 40.40, '辽宁盖州'),
  S('fuzhou_l', '复州卫', 'Fuzhou (Liaodong)', 121.70, 39.73, '辽宁瓦房店复州城'),
  S('jinzhou_w', '金州卫', 'Jinzhou (Liaodong)', 121.70, 39.10, '辽宁大连金州'),
  S('zhenjiang_l', '镇江堡', 'Zhenjiang Fort', 124.40, 40.15, '辽宁丹东九连城', { r: 160 }),
  // 女真、奴儿干都司
  S('jianzhou', '建州卫（赫图阿拉）', 'Jianzhou Guard (Hetu Ala)', 124.95, 41.68, '辽宁新宾', { r: 260 }),
  S('hada', '哈达', 'Hada', 124.65, 42.75, '辽宁西丰', { r: 220 }),
  S('yehe', '叶赫', 'Yehe', 124.60, 43.05, '吉林梨树叶赫', { r: 260 }),
  S('huifa', '辉发', 'Huifa', 126.05, 42.55, '吉林辉南', { r: 280 }),
  S('wula', '乌拉', 'Ula', 126.47, 44.07, '吉林市乌拉街', { r: 380 }),
  S('maolian', '毛怜卫', 'Maolian Guard', 129.50, 42.90, '吉林延吉', { r: 320 }),
  S('wuzhe', '兀者卫', 'Wuzhe Guard', 127.20, 46.60, '黑龙江呼兰、绥化一带', { r: 450 }),
  S('donghai', '东海女真（速平江）', 'Eastern Sea Jurchens (Suifen)', 131.95, 43.80, '俄罗斯乌苏里斯克', { r: 500 }),
  S('yilan', '依兰（斡朵怜、胡里改）', 'Yilan (Odoli, Huligai)', 129.57, 46.33, '黑龙江依兰', { r: 450 }),
  S('heilongjiang', '黑龙江中游', 'Middle Amur', 131.50, 49.50, '黑龙江、俄罗斯阿穆尔州一带', { r: 700 }),
  S('solon', '嫩江上游（索伦）', 'Upper Nen (Solon)', 125.20, 49.20, '黑龙江嫩江', { r: 450 }),
  S('nuergan', '奴儿干都司（特林）', 'Nurgan Regional Command (Tyr)', 139.75, 52.93, '俄罗斯特林', { r: 800 }),
  S('wusuli', '乌苏里江', 'Ussuri', 134.50, 46.50, '黑龙江饶河、俄罗斯滨海边疆区', { r: 550 }),
  // 兀良哈三卫
  S('taining', '泰宁卫', 'Taining Guard', 122.80, 45.33, '吉林洮南', { r: 380 }),
  S('fuyu', '福余卫', 'Fuyu Guard', 123.95, 47.35, '黑龙江齐齐哈尔', { r: 420 }),
  S('duoyan', '朵颜卫', 'Duoyan Guard', 121.20, 46.20, '内蒙古兴安盟（绰尔河一带）', { r: 420 }),
  S('jinshan', '金山（纳哈出）', 'Jinshan (Naghachu)', 123.50, 43.60, '吉林双辽一带', { r: 380 }),
  // 蒙古高原
  S('helin', '和林', 'Karakorum', 102.84, 47.20, '蒙古国哈拉和林', { r: 1100, b: 30 }),
  S('lujuhe', '胪朐河（克鲁伦）', 'Kherlen', 115.00, 47.80, '蒙古国东方省', { r: 750 }),
  S('wonan', '斡难河', 'Onon', 110.50, 48.50, '蒙古国肯特省', { r: 750 }),
  S('hailar', '呼伦贝尔', 'Hulunbuir', 119.70, 49.20, '内蒙古海拉尔', { r: 650 }),
  S('selengge', '薛灵哥河', 'Selenga', 107.60, 51.80, '俄罗斯乌兰乌德一带', { r: 700 }),
  S('baliuhu', '八剌忽', 'Barghu', 109.60, 53.60, '俄罗斯巴尔古津', { r: 700 }),
  S('chita', '石勒喀河', 'Shilka', 114.50, 52.00, '俄罗斯赤塔一带', { r: 650 }),
  S('gobi', '漠北戈壁', 'Gobi', 105.00, 44.00, '蒙古国南戈壁一带', { r: 750 }),
  S('yingchang', '应昌', 'Yingchang', 116.55, 43.30, '内蒙古克什克腾旗达里诺尔', { r: 450 }),
  S('chahar', '察哈尔（漠南）', 'Chahar (Inner Mongolia)', 113.50, 42.50, '内蒙古锡林郭勒西部', { r: 450 }),
  S('guihua', '丰州（归化城）', 'Fengzhou (Guihua)', 111.65, 40.82, '内蒙古呼和浩特', { r: 300 }),
  S('dening', '德宁（漠南西）', 'Dening', 110.35, 41.75, '内蒙古达尔罕茂明安联合旗', { r: 420 }),
  S('wulahai', '兀剌海', 'Uraqai', 106.80, 41.10, '内蒙古乌拉特后旗一带', { r: 480 }),
  S('yijinai', '亦集乃', 'Ejina', 101.07, 41.97, '内蒙古额济纳旗', { r: 550, b: 60 }),
  S('alashan', '阿拉善', 'Alxa', 104.00, 39.80, '内蒙古阿拉善', { r: 500, b: 60 }),
  S('wuliyasutai', '杭爱山西', 'Western Khangai', 96.80, 47.70, '蒙古国乌里雅苏台', { r: 600 }),
  S('kobdo', '科布多', 'Khovd', 91.64, 48.00, '蒙古国科布多', { r: 550 }),
  S('qianzhou', '谦河（图瓦）', 'Kem (Tuva)', 92.50, 51.60, '俄罗斯图瓦', { r: 650 }),
  S('jilijisi', '吉利吉思', 'Kirghiz (Yenisei)', 91.40, 53.70, '俄罗斯阿巴坎一带', { r: 650 }),
  S('altai', '也儿的石河（阿尔泰）', 'Irtysh (Altai)', 86.50, 48.00, '新疆阿勒泰', { r: 700 }),
  S('junggar', '准噶尔盆地', 'Junggar Basin', 85.00, 45.20, '新疆克拉玛依、塔城一带', { r: 650 }),
  S('emil', '叶密立', 'Emil', 83.60, 46.50, '新疆额敏', { r: 500 }),
  // 东察合台汗国（别失八里、吐鲁番、叶尔羌）
  S('bieshibali', '别失八里', 'Beshbalik', 89.00, 44.10, '新疆吉木萨尔', { r: 450 }),
  S('turfan', '吐鲁番（火州）', 'Turfan (Qocho)', 89.19, 42.95, '新疆吐鲁番', { r: 600 }),
  S('almaliq', '阿力麻里（亦力把里）', 'Almaliq (Ilibaliq)', 80.80, 44.00, '新疆霍城', { r: 600 }),
  S('kashgar', '可失哈耳', 'Kashgar', 75.99, 39.47, '新疆喀什', { r: 900 }),
  S('yarkand', '叶尔羌', 'Yarkand', 77.24, 38.42, '新疆莎车', { r: 600 }),
  S('khotan', '于阗', 'Khotan', 79.93, 37.11, '新疆和田', { r: 1000 }),
  S('aksu', '阿速（阿克苏）', 'Aksu', 80.26, 41.17, '新疆阿克苏', { r: 800 }),
  S('kuqa', '苦先（库车）', 'Kucha', 82.96, 41.72, '新疆库车', { r: 800 }),
  S('luobu', '罗布', 'Lop', 88.17, 39.02, '新疆若羌', { r: 1200 }),
  S('qiemo', '且末', 'Qiemo', 85.53, 38.13, '新疆且末', { r: 1000 }),
  S('issyk', '伊塞克湖', 'Issyk-Kul', 77.50, 42.50, '吉尔吉斯斯坦伊塞克湖', { r: 500 }),
  S('qayaliq', '七河北部（海押立）', 'Northern Zhetysu (Qayaliq)', 79.50, 45.00, '哈萨克斯坦塔尔迪库尔干一带', { r: 600 }),
  // 乌思藏、朵甘
  S('duogan', '朵甘（宣慰司）', 'Mdo-khams', 100.00, 31.60, '四川甘孜', { r: 1500 }),
  S('qamdo', '昌都', 'Chamdo', 97.17, 31.14, '西藏昌都', { r: 1800 }),
  S('yushu', '玉树（朵甘北）', 'Yushu', 97.00, 33.00, '青海玉树', { r: 2000 }),
  S('heyuan', '黄河源（朵思麻）', 'Source of the Yellow River', 98.20, 34.90, '青海玛多', { r: 1800 }),
  S('lhasa', '拉萨', 'Lhasa', 91.13, 29.65, '西藏拉萨', { r: 1800 }),
  S('nedong', '乃东（帕木竹巴）', 'Nedong (Phag-mo-gru)', 91.77, 29.23, '西藏山南乃东', { r: 1500, b: 10 }),
  S('shigatse', '日喀则（藏）', 'Shigatse (Tsang)', 88.88, 29.27, '西藏日喀则', { r: 2000 }),
  S('nagqu', '那曲', 'Nagqu', 92.05, 31.47, '西藏那曲', { r: 2200 }),
  S('nyingchi', '工布', 'Kongpo', 94.36, 29.65, '西藏林芝', { r: 1200 }),
  S('zayu', '察隅', 'Zayul', 97.47, 28.66, '西藏察隅', { r: 1000 }),
  S('ngari', '俄力思（阿里）', 'Ngari', 80.10, 31.50, '西藏阿里札达', { r: 2000 }),
  S('purang', '普兰', 'Purang', 81.18, 30.30, '西藏普兰', { r: 1500 }),
  S('rutog', '日土', 'Rutog', 79.72, 33.38, '西藏日土', { r: 2000 }),
  S('gerze', '改则（羌塘西）', 'Gêrzê', 84.10, 32.30, '西藏改则', { r: 2500 }),
  S('xainza', '申扎（羌塘中）', 'Xainza', 88.70, 30.95, '西藏申扎', { r: 2400 }),
  S('saga', '萨嘎', 'Saga', 85.23, 29.33, '西藏萨嘎', { r: 1800 }),
  S('hoh_xil', '可可西里', 'Hoh Xil', 91.50, 35.00, '青海可可西里', { r: 2600 }),
  // 中亚、西伯利亚
  S('talas', '塔剌思', 'Talas', 71.37, 42.90, '哈萨克斯坦塔拉兹', { r: 500 }),
  S('samarkand', '撒马儿罕', 'Samarkand', 66.97, 39.65, '乌兹别克斯坦撒马尔罕', { r: 600 }),
  S('bukhara', '卜花儿', 'Bukhara', 64.42, 39.77, '乌兹别克斯坦布哈拉', { r: 500 }),
  S('fergana', '俺的干（费尔干纳）', 'Andijan (Ferghana)', 72.34, 40.78, '乌兹别克斯坦安集延', { r: 450 }),
  S('tashkent', '达失干', 'Tashkent', 69.24, 41.30, '乌兹别克斯坦塔什干', { r: 400 }),
  S('balkh', '巴里黑', 'Balkh', 66.90, 36.76, '阿富汗巴尔赫', { r: 500 }),
  S('kabul', '可不里', 'Kabul', 69.17, 34.53, '阿富汗喀布尔', { r: 450 }),
  S('herat', '哈烈（赫拉特）', 'Herat', 62.20, 34.35, '阿富汗赫拉特', { r: 600 }),
  S('merv', '马鲁', 'Merv', 61.83, 37.60, '土库曼斯坦马雷', { r: 500 }),
  S('kandahar', '坎大哈', 'Kandahar', 65.70, 31.61, '阿富汗坎大哈', { r: 500 }),
  S('sighnaq', '昔格纳黑', 'Sighnaq', 68.20, 44.00, '哈萨克斯坦克孜勒奥尔达一带', { r: 900 }),
  S('kipchak', '钦察草原东部', 'Eastern Kipchak steppe', 68.00, 50.00, '哈萨克斯坦中部', { r: 900 }),
  S('ishim', '失必儿（伊斯克尔）', 'Sibir (Isker)', 68.40, 57.90, '俄罗斯托博尔斯克一带', { r: 800 }),
  S('ob', '鄂毕河上游', 'Upper Ob', 82.00, 53.50, '俄罗斯巴尔瑙尔一带', { r: 700 }),
  S('tara', '塔拉', 'Tara', 74.40, 56.90, '俄罗斯塔拉', { r: 500 }),
  S('tomsk', '托木斯克', 'Tomsk', 84.97, 56.50, '俄罗斯托木斯克', { r: 450 }),
  S('kuznetsk', '库兹涅茨克', 'Kuznetsk', 87.10, 53.75, '俄罗斯新库兹涅茨克', { r: 350 }),
  S('krasnoyarsk', '克拉斯诺亚尔斯克', 'Krasnoyarsk', 92.90, 56.00, '俄罗斯克拉斯诺亚尔斯克', { r: 400 }),
  S('bratsk', '布拉茨克', 'Bratsk', 101.60, 56.15, '俄罗斯布拉茨克', { r: 400 }),
  // 南亚
  S('delhi', '德里', 'Delhi', 77.20, 28.60, '印度德里', { r: 1100 }),
  S('lahore', '拉合尔', 'Lahore', 74.35, 31.55, '巴基斯坦拉合尔', { r: 600 }),
  S('multan', '木尔坦', 'Multan', 71.47, 30.20, '巴基斯坦木尔坦', { r: 600 }),
  S('gujarat', '古吉拉特', 'Gujarat', 72.60, 23.00, '印度艾哈迈达巴德', { r: 600 }),
  S('malwa', '马尔瓦', 'Malwa', 75.80, 23.20, '印度乌贾因', { r: 600 }),
  S('jaunpur', '江普尔', 'Jaunpur', 82.68, 25.75, '印度江普尔', { r: 450 }),
  S('devagiri', '德干（道拉塔巴德）', 'Deccan (Daulatabad)', 75.21, 19.94, '印度道拉塔巴德', { r: 700 }),
  S('gaur', '榜葛剌（孟加拉）', 'Bengal', 88.13, 24.87, '印度高尔', { r: 600 }),
  S('sonargaon', '索纳尔冈', 'Sonargaon', 90.60, 23.65, '孟加拉国纳拉扬甘杰', { r: 400 }),
  S('cuttack', '奥里萨', 'Orissa', 85.88, 20.46, '印度克塔克', { r: 600 }),
  S('kathmandu', '尼八剌（尼泊尔）', 'Nepal', 85.32, 27.70, '尼泊尔加德满都', { r: 350 }),
  S('kamata', '迦摩缕波（库奇）', 'Kamata (Koch)', 91.75, 26.18, '印度古瓦哈蒂', { r: 400 }),
  S('ahom', '阿洪姆', 'Ahom', 94.63, 26.98, '印度锡瓦萨格尔', { r: 350 }),
  S('kashmir', '克什米尔', 'Kashmir', 74.80, 34.08, '克什米尔斯利那加', { r: 500 }),
  S('ladakh', '拉达克', 'Ladakh', 77.58, 34.16, '拉达克列城', { r: 1200 }),
  // 东南亚、东亚
  S('thanglong', '升龙（东京）', 'Thăng Long', 105.85, 21.03, '越南河内', { r: 400 }),
  S('thanhhoa', '清化', 'Thanh Hóa', 105.78, 19.80, '越南清化', { r: 300 }),
  S('nghean', '乂安', 'Nghệ An', 105.68, 18.67, '越南荣市', { r: 300 }),
  S('hue', '顺化', 'Huế', 107.58, 16.46, '越南顺化', { r: 250 }),
  S('champa', '占城北境（广南）', 'Northern Champa (Quảng Nam)', 108.30, 15.88, '越南广南', { r: 300 }),
  S('phimai', '披迈（呵叻高原）', 'Phimai (Khorat plateau)', 102.50, 15.20, '泰国披迈', { r: 450 }),
  S('sukhothai', '素可泰', 'Sukhothai', 99.82, 17.00, '泰国素可泰', { r: 400 }),
  S('lanna', '八百大甸（兰纳）', 'Babai Dadian (Lan Na)', 98.98, 18.79, '泰国清迈', { r: 380 }),
  S('muangsua', '老挝（琅勃拉邦）', 'Laos (Luang Prabang)', 102.13, 19.88, '老挝琅勃拉邦', { r: 400 }),
  S('vientiane', '万象', 'Vientiane', 102.60, 17.97, '老挝万象', { r: 300 }),
  S('ava', '缅甸（阿瓦）', 'Burma (Ava)', 96.00, 21.85, '缅甸曼德勒一带', { r: 400 }),
  S('pagan', '蒲甘', 'Pagan', 94.86, 21.17, '缅甸蒲甘', { r: 400 }),
  S('toungoo', '东吁', 'Toungoo', 96.43, 18.93, '缅甸东吁', { r: 300 }),
  S('shan', '掸邦南部', 'Southern Shan', 97.00, 20.80, '缅甸东枝一带', { r: 300 }),
  S('pegu', '勃固', 'Pegu', 96.48, 17.33, '缅甸勃固', { r: 400 }),
  S('arakan', '阿拉干', 'Arakan', 93.20, 20.60, '缅甸妙乌', { r: 350 }),
  S('kaesong', '开京（开城）', 'Kaegyong (Kaesong)', 126.55, 37.97, '朝鲜开城', { r: 350 }),
  S('hanseong', '汉城', 'Hanseong', 126.98, 37.57, '韩国首尔', { r: 350 }),
  S('pyongyang', '平壤', 'Pyongyang', 125.75, 39.02, '朝鲜平壤', { r: 300 }),
  S('gyeongju', '庆州', 'Gyeongju', 129.20, 35.85, '韩国庆州', { r: 300 }),
  S('jeonju', '全州', 'Jeonju', 127.15, 35.82, '韩国全州', { r: 300 }),
  S('hamhung', '咸兴', 'Hamhung', 127.54, 39.92, '朝鲜咸兴', { r: 260 }),
  S('kilju', '吉州', 'Kilju', 129.30, 40.95, '朝鲜吉州', { r: 220 }),
  S('hoeryong', '会宁（六镇）', 'Hoeryong (Six Garrisons)', 129.75, 42.45, '朝鲜会宁', { r: 200 }),
  S('jeju', '济州', 'Jeju', 126.53, 33.50, '韩国济州', { r: 60 }),
  S('kyoto', '京都', 'Kyoto', 135.76, 35.01, '日本京都', { r: 700 }),
  S('kamakura', '镰仓（关东）', 'Kamakura (Kantō)', 139.55, 35.32, '日本镰仓', { r: 600 }),
  S('dazaifu', '九州', 'Kyushu', 130.52, 33.52, '日本福冈', { r: 400 }),
  S('mutsu', '陆奥', 'Mutsu', 141.10, 39.70, '日本岩手', { r: 450 }),
  S('ezo', '虾夷地', 'Ezo', 141.35, 43.06, '日本北海道', { r: 400 }),
  S('ryukyu', '琉球（中山）', 'Ryukyu (Chūzan)', 127.70, 26.20, '日本冲绳', { r: 80 }),
  S('zeelandia', '热兰遮城', 'Fort Zeelandia', 120.16, 23.00, '台湾台南安平', { r: 130 }),
  S('keelung', '圣萨尔瓦多城', 'Fort San Salvador', 121.74, 25.15, '台湾基隆', { r: 80 }),
];

const M = 'ming', BY = 'ming_beiyuan', XIA = 'ming_xia', LW = 'ming_liangwang', T = 'tatar', O = 'oirat';
const WSZ = 'ming_wusizang', GX = 'ming_guanxi', NUR = 'ming_nuergan', NZ = 'ming_nuzhen', WLH = 'ming_wulianghai';
const HJ = 'ming_houjin', Q = 'qing', DS = 'ming_dashun', DX = 'ming_daxi';

const holds: Record<string, Hold[]> = {};
/** the same holdings for several seats (space-separated ids) */
const h = (ids: string, ...hs: Hold[]) => { for (const id of ids.split(' ')) holds[id] = hs; };
/** 后金 from `year`, called 清 from 1636 */
const hj = (year: number, src: string): Hold[] => year < 1636 ? [[year, HJ, src], [1636, Q, 'qsg.taizong']] : [[year, Q, src]];

// 北直隶、山东、河南: taken 1368, Beijing (北平) from the eighth month
h('beijing', [1368, M, 'ms.taizu'], [1644, DS, 'ms.lzc']);
h('baoding zhending hejian shunde guangping daming', [1368, M, 'ms.xuda'], [1644, DS, 'ms.lzc']);
h('yongping jizhou', [1368, M, 'ms.xuda'], [1644, DS, 'ms.lzc']);
h('shanhai', [1368, M, 'ms.xuda'], [1644, Q, 'est']);
h('xuanfu', [1368, BY], [1369, M, 'ms.changyc'], [1644, DS, 'ms.lzc']);
h('dushi', [1368, BY], [1369, M, 'ms.changyc']);
h('kaiping', [1368, BY], [1369, M, 'ms.changyc'], [1430, T, 'ms.xuanzong'], [1635, HJ, 'qsg.taizong'], [1636, Q, 'qsg.taizong']);
h('xinghe', [1368, BY], [1369, M, 'est'], [1422, T, 'ms.chengzu'], [1635, HJ, 'qsg.taizong'], [1636, Q, 'qsg.taizong']);
h('daning quanning', [1368, BY], [1387, M, 'ms.fengsheng'], [1403, WLH, 'ms.duoyan'], ...hj(1628, 'qsg.taizong'));
h('jinan dongchang yanzhou qingzhou laizhou dengzhou jiaozhou yizhou dezhou ninghai', [1368, M, 'ms.taizu']);
h('xinyang guangzhou_h', [1368, M, 'ms.taizu']);
h('henanfu nanyang ruzhou', [1368, M, 'ms.taizu'], [1641, DS, 'ms.lzc']);
h('runing guide chenzhou kaifeng', [1368, M, 'ms.taizu'], [1642, DS, 'ms.lzc']);
h('zhangde weihui huaiqing', [1368, M, 'ms.taizu'], [1644, DS, 'ms.lzc']);
// 山西、陕西、甘肃: 1369–1372
h('taiyuan datong pingyang luan zezhou fenzhou daizhou pianguan puzhou', [1368, BY], [1369, M, 'ms.xuda'], [1644, DS, 'ms.lzc']);
h('xian fengxiang yanan suide qingyang pingliang guyuan gongchang lintao lanzhou jinglu', [1368, BY], [1369, M, 'ms.xuda'], [1643, DS, 'ms.lzc']);
h('yulin', [1368, BY], [1369, M, 'ms.xuda'], [1643, DS, 'ms.lzc']);
h('hanzhong xingan qinzhou_s jiezhou', [1368, BY], [1369, M, 'ms.xuda'], [1644, DS, 'ms.lzc']);
h('shangzhou', [1368, BY], [1369, M, 'ms.xuda'], [1643, DS, 'ms.lzc']);
h('minzhou taozhou hezhou', [1368, BY], [1370, M, 'ms.taizu']);
h('xining', [1368, BY], [1373, M, 'ms.bing']);
h('ningxia zhongwei', [1368, BY], [1372, M, 'est'], [1643, DS, 'ms.lzc']);
h('ganzhou_g liangzhou yongchang zhenfan zhuanglang', [1368, BY], [1372, M, 'ms.fengsheng'], [1644, DS, 'ms.lzc']);
h('suzhou_g', [1368, BY], [1372, M, 'ms.fengsheng'], [1644, DS, 'ms.lzc']);
h('dongsheng', [1368, BY], [1371, M, 'ms.bing'], [1403, null, 'ms.chengzu']);
h('ordos', [1368, BY], [1371, M, 'est'], [1403, null, 'est'], [1465, T, 'ms.dada'], ...hj(1635, 'qsg.taizong'));
// 关西七卫、哈密
h('chijin', [1368, BY], [1404, GX, 'ms.xiyu'], [1528, T, 'est']);
h('guazhou shazhou', [1368, BY], [1404, GX, 'ms.xiyu'], [1528, 'moghul', 'est']);
h('handong', [1368, BY], [1398, GX, 'ms.xiyu'], [1528, T, 'est']);
h('anding quxian', [1368, BY], [1374, GX, 'ms.xiyu'], [1512, T, 'ms.xiyu'], [1637, O, 'est']);
h('hami', [1368, BY, 'est'], [1406, GX, 'ms.xiyu'], [1473, 'moghul', 'ms.xiyu'], [1482, GX, 'ms.xiyu'], [1513, 'moghul', 'ms.xiyu']);
h('qinghai', [1368, BY, 'est'], [1373, WSZ, 'ms.xiyu'], [1510, T, 'ms.xiyu'], [1637, O, 'est']);
// 四川: 夏 (明升) to 1371
h('chengdu baoning shunqing tongchuan xuzhou_s luzhou_s jiading', [1368, XIA, 'ms.mingyz'], [1371, M, 'ms.mingyz'], [1644, DX, 'ms.zxz']);
h('chongqing kuizhou wanzhou fuzhou_s', [1368, XIA, 'ms.mingyz'], [1371, M, 'ms.mingyz'], [1644, DX, 'ms.zxz']);
h('dazhou guangyuan pengshui yazhou maozhou longan mahu', [1368, XIA, 'ms.mingyz'], [1371, M, 'ms.mingyz']);
h('tianquan changhexi zagu songpan', [1368, null], [1371, M, 'ms.sctusi']);
h('jianchang', [1368, LW, 'est'], [1382, M, 'ms.sctusi']);
h('bozhou', [1368, XIA, 'est'], [1372, M, 'ms.sctusi']);
h('yongning', [1368, XIA, 'est'], [1372, M, 'ms.sctusi'], [1621, 'ming_shean', 'ms.sctusi'], [1629, M, 'ms.sctusi']);
h('wusa wumeng dongchuan', [1368, LW, 'ms.bzlwem'], [1382, M, 'ms.fuyd']);
// 湖广、江西、南直隶、浙江、福建、两广: Wu's by 1368
h('wuchang', [1368, M, 'ms.taizu'], [1643, DX, 'ms.zxz'], [1644, M, 'est']);
h('huangzhou qizhou mianyang', [1368, M, 'ms.taizu']);
h('dean chengtian xiangyang jingzhou', [1368, M, 'ms.taizu'], [1643, DS, 'ms.lzc']);
h('yunyang yiling shizhou rongmei', [1368, M, 'ms.taizu']);
h('yuezhou changsha hengzhou', [1368, M, 'ms.taizu'], [1643, DX, 'ms.zxz'], [1644, M, 'est']);
h('changde lizhou yongzhou chenzhou_h baoqing daozhou chenzhou_x yuanzhou_h jingzhou_h yongshun', [1368, M, 'ms.taizu']);
h('nanchang jiujiang nankang raozhou guangxin jianchang_j fuzhou_j linjiang jian ruizhou yuanzhou ganzhou nanan', [1368, M, 'ms.taizu']);
h('yingtian fengyang suzhou songjiang changzhou zhenjiang yangzhou tongzhou huaian haizhou xuzhou sizhou suzhou_h yingzhou bozhou_h luzhou_h shouzhou anqing chizhou taiping ningguo huizhou chuzhou', [1368, M, 'ms.taizu']);
h('hangzhou jiaxing huzhou yanzhou_z jinhua quzhou chuzhou_z shaoxing ningbo taizhou_z wenzhou', [1368, M, 'ms.taizu']);
h('fuzhou funing jianning shaowu yanping tingzhou xinghua quanzhou zhangzhou', [1368, M, 'ms.chenyd']);
h('guangzhou shaozhou nanxiong lianzhou_g huizhou_g chaozhou zhaoqing luoding gaozhou leizhou lianzhou qinzhou qiongzhou danzhou wanzhou_h yazhou_h', [1368, M, 'ms.taizu']);
h('guilin pingle liuzhou qingyuan sicheng sien xunzhou wuzhou nanning taiping_g siming tianzhou zhenan yulin_g', [1368, M, 'ms.taizu']);
// 贵州
h('sinan sizhou_gz tongren zhenyuan', [1368, M, 'ms.gztusi']);
h('guiyang liping duyun', [1368, LW, 'est'], [1372, M, 'ms.gztusi']);
h('shuixi', [1368, LW, 'est'], [1372, M, 'ms.gztusi'], [1622, 'ming_shean', 'ms.gztusi'], [1629, M, 'ms.gztusi']);
h('anshun puan', [1368, LW, 'ms.bzlwem'], [1382, M, 'ms.fuyd']);
// 云南: 梁王 to 1382
h('kunming dali yongchang_y tengyue chuxiong yaoan heqing lijiang yongning_y wuding qujing chengjiang guangxi_y linan yuanjiang guangnan menghua jingdong zhenyuan_y weiyuan mengding nandian ganya', [1368, LW, 'ms.bzlwem'], [1382, M, 'ms.fuyd']);
h('cheli', [1368, null], [1384, M, 'ms.yntusi']);
h('menglian', [1368, null], [1406, M, 'ms.yntusi']);
h('luchuan', [1368, LW, 'est'], [1382, M, 'ms.yntusi'], [1436, 'ming_luchuan', 'ms.yntusi'], [1449, M, 'ms.yingzong']);
h('mengyang mubang', [1368, LW, 'est'], [1382, M, 'ms.yntusi'], [1584, 'ming_burma', 'ms.yntusi']);
h('mengmi manmo', [1368, LW, 'est'], [1382, M, 'est'], [1584, 'ming_burma', 'ms.yntusi']);
h('menggen', [1368, null], [1404, M, 'ms.yntusi'], [1557, 'ming_burma', 'ms.yntusi']);
// 辽东: from 1371; 后金 from 1618
h('liaoyang haizhou_l gaizhou fuzhou_l jinzhou_w', [1368, BY], [1371, M, 'ms.taizu'], ...hj(1621, 'qsg.taizu'));
h('shenyang', [1368, BY], [1374, M, 'est'], ...hj(1621, 'qsg.taizu'));
h('zhenjiang_l', [1368, BY, 'est'], [1371, M, 'est'], ...hj(1621, 'qsg.taizu'));
h('fushun', [1368, BY], [1384, M, 'est'], ...hj(1618, 'qsg.taizu'));
h('kaiyuan tieling', [1368, BY], [1388, M, 'ms.bing'], ...hj(1619, 'qsg.taizu'));
h('guangning', [1368, BY], [1374, M, 'est'], ...hj(1622, 'qsg.taizu'));
h('jinzhou_l', [1368, BY], [1374, M, 'est'], ...hj(1642, 'qsg.taizong'));
h('ningyuan', [1368, BY], [1374, M, 'est'], [1644, Q, 'est']);
// 女真: 纳哈出's to 1387, then the 羁縻卫所 under 奴儿干都司, 后金 from 1616
h('jianzhou', [1368, BY, 'est'], [1388, NZ, 'est'], [1403, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1616, 'qsg.taizu'));
h('hada', [1368, BY, 'est'], [1388, NZ, 'est'], [1409, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1616, 'qsg.taizu'));
h('huifa', [1368, BY, 'est'], [1388, NZ, 'est'], [1409, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1616, 'qsg.taizu'));
h('wula', [1368, BY, 'est'], [1388, NZ, 'est'], [1409, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1616, 'qsg.taizu'));
h('yehe', [1368, BY, 'est'], [1388, NZ, 'est'], [1409, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1619, 'qsg.taizu'));
h('maolian', [1368, null], [1405, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1616, 'est'));
h('wuzhe yilan', [1368, BY, 'est'], [1388, NZ, 'est'], [1409, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1616, 'est'));
h('donghai wusuli', [1368, null], [1409, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1626, 'est'));
h('heilongjiang solon nuergan', [1368, null], [1409, NUR, 'ms.chengzu'], [1435, NZ, 'est'], ...hj(1640, 'qsg.taizong'));
// 兀良哈三卫
h('jinshan', [1368, BY, 'ms.fengsheng'], [1387, M, 'ms.fengsheng'], [1389, WLH, 'ms.duoyan'], ...hj(1626, 'est'));
h('taining fuyu duoyan', [1368, BY], [1389, WLH, 'ms.duoyan'], ...hj(1626, 'est'));
// 蒙古: 北元 to 1388 (捕鱼儿海), then 鞑靼 and 瓦剌; 漠南 to 后金 1635
h('helin', [1368, BY], [1388, T, 'ms.dada'], [1439, O, 'ms.wala'], [1455, T, 'ms.wala']);
h('lujuhe wonan hailar selengge baliuhu chita gobi', [1368, BY], [1388, T, 'ms.dada']);
h('yingchang', [1368, BY], [1370, M, 'ms.liwz'], [1372, BY, 'est'], [1388, T, 'ms.dada'], ...hj(1635, 'qsg.taizong'));
h('chahar dening wulahai', [1368, BY], [1388, T, 'ms.dada'], ...hj(1635, 'qsg.taizong'));
h('guihua', [1368, BY], [1371, M, 'est'], [1403, T, 'est'], ...hj(1632, 'qsg.taizong'));
h('yijinai alashan', [1368, BY], [1388, T, 'ms.dada']);
h('wuliyasutai kobdo qianzhou jilijisi altai', [1368, BY], [1388, O, 'ms.wala']);
h('junggar emil', [1368, 'moghul'], [1430, O, 'est']);
// 西域
h('bieshibali turfan almaliq kashgar yarkand khotan aksu kuqa luobu qiemo issyk', [1368, 'moghul', 'ms.xiyu']);
h('qayaliq', [1368, 'moghul'], [1470, 'ming_kazakh', 'est']);
h('talas', [1368, 'moghul'], [1500, 'ming_kazakh', 'est']);
// 乌思藏、朵甘: the 帕木竹巴 until the 都司 of 1373; 和硕特 from 1642
h('duogan qamdo yushu heyuan lhasa nedong shigatse nagqu nyingchi zayu ngari purang rutog gerze xainza saga hoh_xil', [1368, 'ming_pazhu', 'est'], [1373, WSZ, 'ms.xiyu'], [1642, O, 'est']);
// 中亚、西伯利亚
h('samarkand bukhara tashkent fergana balkh', [1368, 'chagatai'], [1370, 'ming_timur', 'ms.xiyu'], [1500, 'ming_uzbek', 'est']);
h('kabul', [1368, 'chagatai'], [1370, 'ming_timur', 'est'], [1504, 'ming_mughal', 'est']);
h('herat merv', [1368, 'ming_kart'], [1381, 'ming_timur', 'ms.xiyu'], [1507, 'ming_uzbek', 'est'], [1510, 'ming_safavid', 'est']);
h('kandahar', [1368, 'ming_kart'], [1381, 'ming_timur', 'est'], [1522, 'ming_mughal', 'est']);
h('sighnaq kipchak', [1368, 'ming_whitehorde'], [1428, 'ming_uzbek', 'est'], [1470, 'ming_kazakh', 'est']);
h('ishim', [1368, 'ming_whitehorde'], [1490, 'ming_sibir', 'est'], [1587, 'russia', 'est']);
h('ob', [1368, 'ming_whitehorde'], [1430, O, 'est'], [1604, 'russia', 'est']);
h('tara', [1368, null], [1594, 'russia', 'est']);
h('tomsk', [1368, null], [1604, 'russia', 'est']);
h('kuznetsk', [1368, null], [1618, 'russia', 'est']);
h('krasnoyarsk', [1368, null], [1628, 'russia', 'est']);
h('bratsk', [1368, null], [1631, 'russia', 'est']);
// 南亚
h('delhi lahore multan', [1368, 'ming_delhi'], [1526, 'ming_mughal', 'est']);
h('gujarat', [1368, 'ming_delhi'], [1407, 'ming_india', 'est'], [1573, 'ming_mughal', 'est']);
h('malwa', [1368, 'ming_delhi'], [1401, 'ming_india', 'est'], [1561, 'ming_mughal', 'est']);
h('jaunpur', [1368, 'ming_delhi'], [1394, 'ming_india', 'est'], [1479, 'ming_delhi', 'est'], [1526, 'ming_mughal', 'est']);
h('devagiri', [1368, 'ming_india'], [1633, 'ming_mughal', 'est']);
h('gaur sonargaon', [1368, 'ming_bengal'], [1576, 'ming_mughal', 'est']);
h('cuttack', [1368, 'ming_india'], [1592, 'ming_mughal', 'est']);
h('kashmir', [1368, 'ming_kashmir'], [1586, 'ming_mughal', 'est']);
h('ladakh', [1368, 'ming_kashmir']);
h('kathmandu', [1368, 'ming_nepal']);
h('kamata', [1368, 'ming_india']);
h('ahom', [1368, 'ming_ahom']);
// 东南亚: 交趾 1407–1427
h('thanglong thanhhoa nghean', [1368, 'annam', 'ms.annan'], [1407, 'ming_jiaozhi', 'ms.chengzu'], [1428, 'annam', 'ms.xuanzong']);
h('hue', [1368, 'annam', 'ms.annan'], [1407, 'ming_jiaozhi', 'ms.chengzu'], [1428, 'annam', 'ms.xuanzong']);
h('champa', [1368, 'ming_champa', 'ms.zhancheng'], [1471, 'annam', 'ms.zhancheng']);
h('phimai', [1368, 'ming_khmer'], [1431, 'ming_siam', 'est']);
h('sukhothai', [1368, 'ming_sukhothai'], [1438, 'ming_siam', 'est']);
h('lanna', [1368, 'ming_lanna', 'ms.yntusi'], [1558, 'ming_burma', 'ms.yntusi']);
h('muangsua vientiane', [1368, 'ming_lanxang', 'ms.yntusi']);
h('ava pagan', [1368, 'ming_burma', 'ms.yntusi']);
h('toungoo', [1368, 'ming_burma']);
h('shan', [1368, 'ming_shan'], [1557, 'ming_burma', 'est']);
h('pegu', [1368, 'ming_pegu'], [1539, 'ming_burma', 'est']);
h('arakan', [1368, 'ming_arakan']);
h('kaesong pyongyang gyeongju jeonju hamhung kilju jeju', [1368, 'gaoli', 'ms.chaoxian'], [1392, 'joseon', 'ms.chaoxian']);
h('hanseong', [1368, 'gaoli', 'ms.chaoxian'], [1392, 'joseon', 'ms.chaoxian']);
h('hoeryong', [1368, null], [1405, NUR, 'est'], [1434, 'joseon', 'est']);
h('kyoto kamakura dazaifu mutsu', [1368, 'japan']);
h('ezo', [1368, 'ming_ainu']);
h('ryukyu', [1368, 'ming_ryukyu', 'ms.liuqiu']);
h('zeelandia', [1368, null], [1624, 'ming_dutch', 'ms.helan']);
h('keelung', [1368, null], [1626, 'ming_spain', 'est'], [1642, 'ming_dutch', 'ms.helan']);

export const MING: OwnEra = {
  replaces: 'ming',
  // the period's own dynasty is the realm; its neighbours here are rivals (area readout, map-reading)
  roles: { qing: 'rival' },
  reach: 300,
  polities: [
    { id: 'ming_beiyuan', name: { zh: '北元', en: 'Northern Yuan' }, color: '#5e7d6a', role: 'rival' },
    { id: 'ming_xia', name: { zh: '夏（明升）', en: 'Xia (Ming Sheng)' }, color: '#6b5b95', role: 'rival' },
    { id: 'ming_liangwang', name: { zh: '元梁王（云南）', en: 'Yuan Prince of Liang (Yunnan)' }, color: '#8a6d4b', role: 'rival' },
    { id: 'ming_luchuan', name: { zh: '麓川（思任发）', en: 'Luchuan (Si Renfa)' }, color: '#8e6c8a', role: 'rival' },
    { id: 'ming_shean', name: { zh: '奢安之乱（奢崇明、安邦彦）', en: 'She–An rising (She Chongming, An Bangyan)' }, color: '#8e6c8a', role: 'rival' },
    { id: 'ming_houjin', name: { zh: '后金', en: 'Later Jin' }, color: '#a569bd', role: 'rival' },
    { id: 'ming_dashun', name: { zh: '大顺（李自成）', en: 'Shun (Li Zicheng)' }, color: '#c0392b', role: 'rival' },
    { id: 'ming_daxi', name: { zh: '大西（张献忠）', en: 'Xi (Zhang Xianzhong)' }, color: '#16a085', role: 'rival' },
    { id: 'ming_wusizang', name: { zh: '乌思藏 · 朵甘（都司）', en: 'Ü-Tsang and Mdo-khams (regional commands)' }, color: '#d4ac0d', role: 'protectorate' },
    { id: 'ming_guanxi', name: { zh: '哈密 · 关西七卫', en: 'Hami and the guards west of the pass' }, color: '#d4ac0d', role: 'protectorate' },
    { id: 'ming_nuergan', name: { zh: '奴儿干都司（羁縻卫所）', en: 'Nurgan Regional Command (loose-rein guards)' }, color: '#d4ac0d', role: 'protectorate' },
    { id: 'ming_nuzhen', name: { zh: '女真诸卫（羁縻）', en: 'Jurchen guards (loose rein)' }, color: '#c9a227', role: 'protectorate' },
    { id: 'ming_wulianghai', name: { zh: '兀良哈三卫（朵颜、泰宁、福余）', en: 'Three Uriankhai guards (Duoyan, Taining, Fuyu)' }, color: '#c9a227', role: 'protectorate' },
    { id: 'ming_jiaozhi', name: { zh: '交趾布政司', en: 'Jiaozhi Province' }, color: '#d4ac0d', role: 'protectorate' },
    { id: 'ming_pazhu', name: { zh: '帕木竹巴（乌思藏）', en: 'Phag-mo-gru (Ü-Tsang)' }, color: '#c39b77', role: 'neighbor' },
    { id: 'ming_timur', name: { zh: '帖木儿帝国', en: 'Timurid Empire' }, color: '#c5b4a0', role: 'neighbor' },
    { id: 'ming_kart', name: { zh: '卡尔特王朝（哈烈）', en: 'Kart dynasty (Herat)' }, color: '#c9b79c', role: 'neighbor' },
    { id: 'ming_uzbek', name: { zh: '乌兹别克（昔班尼）', en: 'Uzbeks (Shaybanids)' }, color: '#bfb196', role: 'neighbor' },
    { id: 'ming_safavid', name: { zh: '萨法维波斯', en: 'Safavid Persia' }, color: '#c9b79c', role: 'neighbor' },
    { id: 'ming_whitehorde', name: { zh: '白帐汗国', en: 'White Horde' }, color: '#b8b09a', role: 'neighbor' },
    { id: 'ming_kazakh', name: { zh: '哈萨克汗国', en: 'Kazakh Khanate' }, color: '#b5ab92', role: 'neighbor' },
    { id: 'ming_sibir', name: { zh: '西伯利亚汗国', en: 'Khanate of Sibir' }, color: '#b3ae9c', role: 'neighbor' },
    { id: 'ming_delhi', name: { zh: '德里苏丹国', en: 'Delhi Sultanate' }, color: '#c7b299', role: 'neighbor' },
    { id: 'ming_mughal', name: { zh: '莫卧儿帝国', en: 'Mughal Empire' }, color: '#c2a98a', role: 'neighbor' },
    { id: 'ming_bengal', name: { zh: '榜葛剌（孟加拉苏丹国）', en: 'Bengal Sultanate' }, color: '#bcae8f', role: 'neighbor' },
    { id: 'ming_india', name: { zh: '印度诸邦', en: 'Indian kingdoms' }, color: '#cbbfa6', role: 'neighbor' },
    { id: 'ming_kashmir', name: { zh: '克什米尔 · 拉达克', en: 'Kashmir and Ladakh' }, color: '#c3b8a0', role: 'neighbor' },
    { id: 'ming_nepal', name: { zh: '尼八剌（尼泊尔）', en: 'Nepal' }, color: '#c4b59a', role: 'neighbor' },
    { id: 'ming_ahom', name: { zh: '阿洪姆', en: 'Ahom' }, color: '#b5b39a', role: 'neighbor' },
    { id: 'ming_champa', name: { zh: '占城', en: 'Champa' }, color: '#b9c4b0', role: 'neighbor' },
    { id: 'ming_khmer', name: { zh: '真腊', en: 'Khmer (Zhenla)' }, color: '#c4bca6', role: 'neighbor' },
    { id: 'ming_sukhothai', name: { zh: '素可泰', en: 'Sukhothai' }, color: '#bdb59c', role: 'neighbor' },
    { id: 'ming_siam', name: { zh: '暹罗（阿瑜陀耶）', en: 'Siam (Ayutthaya)' }, color: '#bdb59c', role: 'neighbor' },
    { id: 'ming_lanna', name: { zh: '八百（兰纳）', en: 'Lan Na' }, color: '#b4ad95', role: 'neighbor' },
    { id: 'ming_lanxang', name: { zh: '老挝（澜沧）', en: 'Lan Xang' }, color: '#c1b89e', role: 'neighbor' },
    { id: 'ming_burma', name: { zh: '缅甸（阿瓦、东吁）', en: 'Burma (Ava, Toungoo)' }, color: '#b7a98e', role: 'neighbor' },
    { id: 'ming_shan', name: { zh: '掸邦诸部', en: 'Shan states' }, color: '#bfb59b', role: 'neighbor' },
    { id: 'ming_pegu', name: { zh: '勃固', en: 'Pegu (Hanthawaddy)' }, color: '#c2b8a3', role: 'neighbor' },
    { id: 'ming_arakan', name: { zh: '阿拉干', en: 'Arakan' }, color: '#bab09a', role: 'neighbor' },
    { id: 'ming_ainu', name: { zh: '虾夷（阿伊努）', en: 'Ezo (Ainu)' }, color: '#c8c3b4', role: 'neighbor' },
    { id: 'ming_ryukyu', name: { zh: '琉球', en: 'Ryukyu' }, color: '#c6cdc4', role: 'neighbor' },
    { id: 'ming_dutch', name: { zh: '荷兰殖民者侵占（台湾）', en: 'Dutch-occupied Taiwan' }, color: '#566573', role: 'occupied' },
    { id: 'ming_spain', name: { zh: '西班牙殖民者侵占（台湾北部）', en: 'Spanish-occupied northern Taiwan' }, color: '#626567', role: 'occupied' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_ming_1', from: 1368, to: 1369, at: 1368, title: { zh: '明朝建立，徐达北伐克大都（1368年）', en: 'The Ming founded; Xu Da marches north and takes Dadu (1368)' } },
    { id: 'o_ming_2', from: 1370, to: 1371, at: 1370, title: { zh: '明定山西、陕西，李文忠克应昌（1370年 · 山西、陕西1368–1369年平定）', en: 'Ming takes Shanxi and Shaanxi; Li Wenzhong takes Yingchang (1370; Shanxi and Shaanxi taken in 1368–1369)' } },
    { id: 'o_ming_3', from: 1372, to: 1381, at: 1375, title: { zh: '平夏收蜀，置辽东都司与乌思藏、朵甘卫（约1375年 · 1371年平夏）', en: 'Xia ended and Sichuan taken; Liaodong and the Tibetan commands set up (c. 1375; Xia ended in 1371)' } },
    { id: 'o_ming_4', from: 1382, to: 1387, at: 1385, title: { zh: '傅友德平云南（约1385年 · 1381–1382年平定）', en: 'Fu Youde conquers Yunnan (c. 1385; conquered 1381–1382)' } },
    { id: 'o_ming_5', from: 1388, to: 1406, at: 1395, title: { zh: '捕鱼儿海之后：洪武疆域，北元分为鞑靼、瓦剌（约1395年）', en: 'After Buyur Lake: the Hongwu realm; the Northern Yuan splits into Tatars and Oirats (c. 1395)' } },
    { id: 'o_ming_6', from: 1407, to: 1427, at: 1410, title: { zh: '永乐：设交趾布政司、奴儿干都司与哈密卫（约1410年）', en: 'Yongle: Jiaozhi province, the Nurgan command and the Hami guard (c. 1410)' } },
    { id: 'o_ming_7', from: 1428, to: 1448, at: 1440, title: { zh: '罢交趾，开平内迁，三征麓川，瓦剌兴起（约1440年）', en: 'Jiaozhi given up, Kaiping withdrawn, war on Luchuan, the Oirats rise (c. 1440)' } },
    { id: 'o_ming_8', from: 1449, to: 1521, at: 1480, title: { zh: '土木之变后：鞑靼入河套，明修边墙（约1480年）', en: 'After Tumu: the Tatars enter the Ordos and the Ming builds walls (c. 1480)' } },
    { id: 'o_ming_9', from: 1522, to: 1572, at: 1550, title: { zh: '嘉靖：弃哈密、关西诸卫，俺答雄踞河套、青海（约1550年）', en: 'Jiajing: Hami and the western guards given up; Altan Khan holds the Ordos and Kokonor (c. 1550)' } },
    { id: 'o_ming_10', from: 1573, to: 1615, at: 1590, title: { zh: '万历：俺答封贡之后，东吁缅甸夺孟养、木邦（约1590年）', en: 'Wanli: after Altan Khan’s tribute peace; Toungoo Burma takes Mengyang and Mubang (c. 1590)' } },
    { id: 'o_ming_11', from: 1616, to: 1626, at: 1622, title: { zh: '后金崛起：萨尔浒战后辽沈、广宁失陷，奢安之乱（1622年）', en: 'The Later Jin rises: after Sarhu, Liaoyang, Shenyang and Guangning fall; the She–An rising (1622)' } },
    { id: 'o_ming_12', from: 1627, to: 1640, at: 1637, title: { zh: '皇太极改国号清，漠南蒙古归清（1637年 · 1636年改国号）', en: 'Hong Taiji proclaims the Qing; the Inner Mongols go over to the Qing (1637; the Qing proclaimed in 1636)' } },
    { id: 'o_ming_13', from: 1641, to: 1643, at: 1643, title: { zh: '松锦战后：李自成据襄阳、西安，张献忠据武昌（1643年）', en: 'After Songshan–Jinzhou: Li Zicheng holds Xiangyang and Xi’an, Zhang Xianzhong Wuchang (1643)' } },
    { id: 'o_ming_14', from: 1644, to: 1644, at: 1644, title: { zh: '甲申之变：大顺入北京，大西据四川（1644年）', en: 'The Jiashen crisis: the Shun take Beijing and the Xi hold Sichuan (1644)' } },
  ],
  sources: {
    'ms.taizu': { zh: '《明史·太祖纪》', en: 'Mingshi, Annals of Taizu' },
    'ms.chengzu': { zh: '《明史·成祖纪》', en: 'Mingshi, Annals of Chengzu' },
    'ms.xuanzong': { zh: '《明史·宣宗纪》', en: 'Mingshi, Annals of Xuanzong' },
    'ms.yingzong': { zh: '《明史·英宗前纪》', en: 'Mingshi, Former Annals of Yingzong' },
    'ms.dili': { zh: '《明史·地理志》', en: 'Mingshi, Treatise on Geography' },
    'ms.bing': { zh: '《明史·兵志》', en: 'Mingshi, Treatise on the Military' },
    'ms.xuda': { zh: '《明史·徐达传》', en: 'Mingshi, Biography of Xu Da' },
    'ms.changyc': { zh: '《明史·常遇春传》', en: 'Mingshi, Biography of Chang Yuchun' },
    'ms.liwz': { zh: '《明史·李文忠传》', en: 'Mingshi, Biography of Li Wenzhong' },
    'ms.fengsheng': { zh: '《明史·冯胜传》', en: 'Mingshi, Biography of Feng Sheng' },
    'ms.fuyd': { zh: '《明史·傅友德传》', en: 'Mingshi, Biography of Fu Youde' },
    'ms.mingyz': { zh: '《明史·明玉珍传》', en: 'Mingshi, Biography of Ming Yuzhen' },
    'ms.chenyd': { zh: '《明史·陈友定传》', en: 'Mingshi, Biography of Chen Youding' },
    'ms.bzlwem': { zh: '《明史·把匝剌瓦尔密传》', en: 'Mingshi, Biography of Basalawarmi' },
    'ms.lzc': { zh: '《明史·李自成传》', en: 'Mingshi, Biography of Li Zicheng' },
    'ms.zxz': { zh: '《明史·张献忠传》', en: 'Mingshi, Biography of Zhang Xianzhong' },
    'ms.dada': { zh: '《明史·外国传·鞑靼》', en: 'Mingshi, Foreign Countries: the Tatars' },
    'ms.wala': { zh: '《明史·外国传·瓦剌》', en: 'Mingshi, Foreign Countries: the Oirats' },
    'ms.duoyan': { zh: '《明史·外国传·朵颜、福余、泰宁》', en: 'Mingshi, Foreign Countries: Duoyan, Fuyu and Taining' },
    'ms.xiyu': { zh: '《明史·西域传》', en: 'Mingshi, Accounts of the Western Regions' },
    'ms.chaoxian': { zh: '《明史·外国传·朝鲜》', en: 'Mingshi, Foreign Countries: Korea' },
    'ms.annan': { zh: '《明史·外国传·安南》', en: 'Mingshi, Foreign Countries: Annam' },
    'ms.zhancheng': { zh: '《明史·外国传·占城》', en: 'Mingshi, Foreign Countries: Champa' },
    'ms.liuqiu': { zh: '《明史·外国传·琉球》', en: 'Mingshi, Foreign Countries: Ryukyu' },
    'ms.helan': { zh: '《明史·外国传·和兰》', en: 'Mingshi, Foreign Countries: Holland' },
    'ms.yntusi': { zh: '《明史·云南土司传》', en: 'Mingshi, Native Chieftains of Yunnan' },
    'ms.gztusi': { zh: '《明史·贵州土司传》', en: 'Mingshi, Native Chieftains of Guizhou' },
    'ms.sctusi': { zh: '《明史·四川土司传》', en: 'Mingshi, Native Chieftains of Sichuan' },
    'qsg.taizu': { zh: '《清史稿·太祖本纪》', en: 'Draft History of Qing, Annals of Taizu (Nurhaci)' },
    'qsg.taizong': { zh: '《清史稿·太宗本纪》', en: 'Draft History of Qing, Annals of Taizong (Hong Taiji)' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
