import type { Hold, OwnEra, Seat } from './types.ts';

/**
 * 清 (1644–1912): seats and holdings for our own Qing maps. Seats are the capitals, the 府 / 州 / 厅 seats of
 * 《清史稿·地理志》, the seats of the 将军, 都统 and 大臣 in the northeast, Mongolia, Xinjiang, Qinghai and Tibet, and a
 * few large-reach seats for each neighbour, all at their modern sites. Each change of hands cites the record of the
 * event (the basic annals of 《清史稿》, its biographies, or the treaty); `est` marks a date we infer.
 *
 * Positions follow the national history textbook: 台湾 is Chinese throughout (occupied by the Dutch until 1662, by
 * Japan from 1895); 西藏 is under the Qing from 1720 (驻藏大臣 1727, its rulers invested from 1653); the lands north of
 * the 黑龙江 and east of the 乌苏里江 and those east and south of Lake Balkhash are Qing territory until the treaties
 * that cede them. No maritime lines are drawn. The window stops at 58° N, so the northern edge of 外东北 (up to the
 * 外兴安岭) is cut off.
 */
const seats: Seat[] = [];
const holds: Record<string, Hold[]> = {};
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, h: Hold[], o: Partial<Seat> = {}): void => {
  seats.push({ id, name: { zh, en }, at: [lon, lat], modern, ...o });
  holds[id] = h;
};

const Q = 'qing', NM = 'qing_nanming', DS = 'qing_dashun', DX = 'qing_daxi', WZ = 'qing_wuzhou', MZ = 'qing_mingzheng';
const NL = 'qing_nl_taiwan', KH = 'qing_khalkha', ZG = 'qing_zhunge', HS = 'qing_hoshut', YK = 'qing_yarkand';
const TP = 'qing_taiping', YB = 'qing_yakub', RI = 'qing_ru_ili', RU = 'russia', JP = 'japan', JO = 'joseon', AN = 'annam';
const KZ = 'qing_kazakh', KO = 'qing_kokand', BK = 'qing_bukhara', AF = 'qing_afghan', PE = 'qing_persia', MG = 'qing_mughal';
const SK = 'qing_sikh', BI = 'qing_brindia', AH = 'qing_ahom', LD = 'qing_ladakh', NP = 'qing_nepal', BT = 'qing_bhutan';
const SM = 'qing_sikkim', BU = 'qing_burma', AR = 'qing_arakan', SI = 'qing_siam', LA = 'qing_laos', FR = 'qing_frindochina';
const RY = 'qing_ryukyu', UK = 'colony_uk', PT = 'colony_pt', JT = 'jp_taiwan';

/** held by the Qing from 1644 (关外, 漠南蒙古, 京畿) */
const Q0: Hold[] = [[1644, Q]];
/** taken by the Qing in the conquest of the north, 1644 */
const Q44: Hold[] = [[1644, Q, 'qsg.shizu']];
/** 大顺 in 1644, the Qing from `y` */
const ds = (y = 1645): Hold[] => [[1644, DS, 'mingshi.lzc'], [y, Q, 'qsg.shizu']];
/** 南明 in 1644, the Qing from `y` */
const nm = (y: number, src = 'qsg.shizu'): Hold[] => [[1644, NM], [y, Q, src]];
/** rose with the 三藩 in 1674, recovered in `y` */
const sf = (y: number, from = 1674): Hold[] => [[from, WZ, 'qsg.wusangui'], [y, Q, 'qsg.shengzu']];
/** 大西 in 1644 */
const DX44: Hold = [1644, DX, 'mingshi.lzc'];

// ── 直隶 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('beijing', '顺天府（京师）', 'Shuntian (Beijing)', 116.40, 39.90, '北京', Q44, { b: 80 });
S('baoding', '保定府', 'Baoding', 115.46, 38.87, '河北保定', Q44);
S('yongping', '永平府', 'Yongping', 118.87, 39.88, '河北卢龙', Q44);
S('hejian', '河间府', 'Hejian', 116.10, 38.44, '河北河间', Q44);
S('tianjin', '天津府', 'Tianjin', 117.20, 39.13, '天津', Q44);
S('zhengding', '正定府', 'Zhengding', 114.57, 38.15, '河北正定', Q44);
S('shunde', '顺德府', 'Shunde', 114.50, 37.07, '河北邢台', Q44);
S('daming', '大名府', 'Daming', 115.15, 36.28, '河北大名', Q44);
S('xuanhua', '宣化府', 'Xuanhua', 115.06, 40.60, '河北张家口宣化', Q44);
S('chengde', '承德府（热河）', 'Chengde (Rehe)', 117.93, 40.97, '河北承德', Q0);
// ── 山东 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('jinan', '济南府', 'Jinan', 117.00, 36.67, '山东济南', Q44, { b: 20 });
S('yanzhou', '兖州府', 'Yanzhou', 116.83, 35.55, '山东兖州', Q44);
S('dongchang', '东昌府', 'Dongchang', 115.98, 36.45, '山东聊城', Q44);
S('qingzhou', '青州府', 'Qingzhou', 118.48, 36.69, '山东青州', Q44);
S('dengzhou', '登州府', 'Dengzhou', 120.75, 37.81, '山东蓬莱', Q44);
S('laizhou', '莱州府', 'Laizhou', 119.94, 37.18, '山东莱州', Q44);
S('yizhou', '沂州府', 'Yizhou', 118.35, 35.05, '山东临沂', Q44);
S('caozhou', '曹州府', 'Caozhou', 115.48, 35.24, '山东菏泽', Q44);
S('jiaozhou', '胶州', 'Jiaozhou', 120.00, 36.28, '山东胶州', Q44);
S('qingdao', '胶澳（青岛）', 'Jiao’ao (Qingdao)', 120.38, 36.07, '山东青岛', [...Q44, [1898, 'qing_lease_de', 'treaty.jiaoao']], { r: 30 });
S('weihai', '威海卫', 'Weihaiwei', 122.12, 37.50, '山东威海', [...Q44, [1898, 'qing_lease_uk', 'treaty.weihai']], { r: 35 });
// ── 山西 · 归化 ──────────────────────────────────────────────────────────────────────────────────────────────────────
S('taiyuan', '太原府', 'Taiyuan', 112.55, 37.87, '山西太原', Q44, { b: 20 });
S('pingyang', '平阳府', 'Pingyang', 111.52, 36.08, '山西临汾', ds());
S('puzhou', '蒲州府', 'Puzhou', 110.45, 34.87, '山西永济', ds());
S('luan', '潞安府', 'Lu’an', 113.10, 36.20, '山西长治', Q44);
S('fenzhou', '汾州府', 'Fenzhou', 111.78, 37.27, '山西汾阳', Q44);
S('datong', '大同府', 'Datong', 113.30, 40.08, '山西大同', Q44);
S('shuoping', '朔平府', 'Shuoping', 112.47, 39.99, '山西右玉', Q44);
S('daizhou', '代州', 'Daizhou', 112.96, 39.07, '山西代县', Q44);
S('guihua', '归化城', 'Guihua', 111.65, 40.82, '内蒙古呼和浩特', Q0, { r: 350 });
// ── 河南 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('kaifeng', '开封府', 'Kaifeng', 114.35, 34.80, '河南开封', ds(), { b: 15 });
S('henanfu', '河南府', 'Henan (Luoyang)', 112.45, 34.62, '河南洛阳', ds());
S('guide', '归德府', 'Guide', 115.65, 34.42, '河南商丘', nm(1645));
S('zhangde', '彰德府', 'Zhangde', 114.38, 36.10, '河南安阳', Q44);
S('huaiqing', '怀庆府', 'Huaiqing', 112.93, 35.09, '河南沁阳', Q44);
S('nanyang', '南阳府', 'Nanyang', 112.53, 33.00, '河南南阳', ds());
S('runing', '汝宁府', 'Runing', 114.36, 33.00, '河南汝南', ds());
S('chenzhou_hn', '陈州府', 'Chenzhou', 114.88, 33.73, '河南淮阳', ds());
S('xuzhou_hn', '许州', 'Xuzhou', 113.85, 34.03, '河南许昌', ds());
S('guangzhou_hn', '光州', 'Guangzhou (Henan)', 115.05, 32.13, '河南潢川', nm(1645));
S('shanzhou', '陕州', 'Shanzhou', 111.20, 34.77, '河南三门峡', ds());
// ── 陕西 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('xian', '西安府', 'Xi’an', 108.94, 34.27, '陕西西安', ds(), { b: 30 });
S('tongzhou_sx', '同州府', 'Tongzhou', 109.94, 34.80, '陕西大荔', ds());
S('fengxiang', '凤翔府', 'Fengxiang', 107.39, 34.52, '陕西凤翔', ds());
S('hanzhong', '汉中府', 'Hanzhong', 107.03, 33.07, '陕西汉中', ds());
S('xingan', '兴安府', 'Xing’an', 109.03, 32.68, '陕西安康', ds());
S('yanan', '延安府', 'Yan’an', 109.49, 36.60, '陕西延安', ds());
S('yulin', '榆林府', 'Yulin', 109.74, 38.29, '陕西榆林', ds(), { r: 320 });
S('shangzhou', '商州', 'Shangzhou', 109.94, 33.87, '陕西商洛', ds());
S('suide', '绥德州', 'Suide', 110.26, 37.50, '陕西绥德', ds());
S('binzhou', '邠州', 'Binzhou', 108.08, 35.05, '陕西彬州', ds());
// ── 甘肃 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('lanzhou', '兰州府', 'Lanzhou', 103.83, 36.06, '甘肃兰州', ds(), { b: 15 });
S('gongchang', '巩昌府', 'Gongchang', 104.64, 35.00, '甘肃陇西', [...ds(), ...sf(1676)]);
S('pingliang', '平凉府', 'Pingliang', 106.68, 35.54, '甘肃平凉', [...ds(), ...sf(1676)]);
S('qingyang', '庆阳府', 'Qingyang', 107.64, 35.73, '甘肃庆阳', ds());
S('qinzhou', '秦州', 'Qinzhou', 105.72, 34.58, '甘肃天水', [...ds(), ...sf(1676)]);
S('jiezhou', '阶州', 'Jiezhou', 104.92, 33.39, '甘肃陇南武都', ds());
S('ningxia', '宁夏府', 'Ningxia', 106.27, 38.47, '宁夏银川', ds(), { r: 380 });
S('zhongwei', '中卫', 'Zhongwei', 105.19, 37.51, '宁夏中卫', ds());
S('liangzhou', '凉州府', 'Liangzhou', 102.64, 37.93, '甘肃武威', ds(), { r: 380 });
S('ganzhou', '甘州府', 'Ganzhou', 100.45, 38.93, '甘肃张掖', ds(), { r: 400 });
S('suzhou_gs', '肃州', 'Suzhou', 98.50, 39.74, '甘肃酒泉', ds(), { r: 450 });
S('hezhou', '河州', 'Hezhou', 103.21, 35.60, '甘肃临夏', ds());
S('xining', '西宁府', 'Xining', 101.78, 36.62, '青海西宁', ds(), { r: 280 });
S('anxi', '安西州', 'Anxi', 95.78, 40.52, '甘肃瓜州', [[1644, YK, 'est'], [1680, ZG, 'qsg.fanbu'], [1715, Q, 'qsg.shengzu']], { r: 500 });
S('dunhuang', '敦煌（沙州）', 'Dunhuang (Shazhou)', 94.66, 40.14, '甘肃敦煌', [[1644, YK, 'est'], [1680, ZG, 'qsg.fanbu'], [1715, Q, 'qsg.shengzu']], { r: 500 });
// ── 江苏 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('jiangning', '江宁府', 'Jiangning (Nanjing)', 118.78, 32.06, '江苏南京', [...nm(1645), [1853, TP, 'qsg.hongxiuquan'], [1864, Q, 'qsg.muzong']], { b: 30 });
S('suzhou', '苏州府', 'Suzhou', 120.62, 31.30, '江苏苏州', [...nm(1645), [1860, TP, 'qsg.wenzong'], [1863, Q, 'qsg.muzong']]);
S('songjiang', '松江府（上海）', 'Songjiang (Shanghai)', 121.30, 31.10, '上海', nm(1645));
S('changzhou', '常州府', 'Changzhou', 119.97, 31.78, '江苏常州', [...nm(1645), [1860, TP, 'qsg.wenzong'], [1864, Q, 'qsg.muzong']]);
S('zhenjiang', '镇江府', 'Zhenjiang', 119.45, 32.20, '江苏镇江', [...nm(1645), [1853, TP, 'qsg.wenzong'], [1857, Q, 'qsg.wenzong']]);
S('yangzhou', '扬州府', 'Yangzhou', 119.42, 32.39, '江苏扬州', [...nm(1645), [1853, TP, 'qsg.wenzong'], [1854, Q, 'qsg.wenzong']]);
S('huaian', '淮安府', 'Huai’an', 119.14, 33.50, '江苏淮安', nm(1645));
S('xuzhou', '徐州府', 'Xuzhou', 117.18, 34.26, '江苏徐州', nm(1645));
S('haizhou', '海州', 'Haizhou', 119.22, 34.60, '江苏连云港', nm(1645));
S('tongzhou_js', '通州', 'Tongzhou', 120.86, 32.00, '江苏南通', nm(1645));
// ── 安徽 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('anqing', '安庆府', 'Anqing', 117.05, 30.52, '安徽安庆', [...nm(1645), [1853, TP, 'qsg.wenzong'], [1861, Q, 'qsg.wenzong']]);
S('huizhou_ah', '徽州府', 'Huizhou', 118.43, 29.87, '安徽歙县', nm(1645));
S('ningguo', '宁国府', 'Ningguo', 118.76, 30.95, '安徽宣城', [...nm(1645), [1860, TP, 'qsg.wenzong'], [1864, Q, 'qsg.muzong']]);
S('chizhou', '池州府', 'Chizhou', 117.49, 30.66, '安徽池州', [...nm(1645), [1853, TP, 'qsg.wenzong'], [1861, Q, 'est']]);
S('taiping_ah', '太平府', 'Taiping (Anhui)', 118.50, 31.55, '安徽当涂', [...nm(1645), [1853, TP, 'qsg.wenzong'], [1863, Q, 'est']]);
S('luzhou_ah', '庐州府', 'Luzhou', 117.27, 31.86, '安徽合肥', [...nm(1645), [1854, TP, 'qsg.wenzong'], [1855, Q, 'qsg.wenzong'], [1858, TP, 'qsg.wenzong'], [1862, Q, 'qsg.muzong']]);
S('fengyang', '凤阳府', 'Fengyang', 117.56, 32.87, '安徽凤阳', nm(1645));
S('yingzhou', '颍州府', 'Yingzhou', 115.81, 32.89, '安徽阜阳', nm(1645));
S('luan_ah', '六安州', 'Lu’an (Anhui)', 116.50, 31.75, '安徽六安', nm(1645));
S('chuzhou_ah', '滁州', 'Chuzhou', 118.31, 32.30, '安徽滁州', nm(1645));
S('sizhou', '泗州', 'Sizhou', 117.90, 33.48, '安徽泗县', nm(1645));
// ── 江西 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
/** 南明 to 1645; 金声桓 rises for the Ming 1648–49 */
const jx = (): Hold[] => [...nm(1645), [1648, NM, 'qsg.shizu'], [1649, Q, 'qsg.shizu']];
/** held by the 太平天国 1856–58 (石达开 in 江西) */
const jxt: Hold[] = [[1856, TP, 'qsg.wenzong'], [1858, Q, 'qsg.wenzong']];
S('nanchang', '南昌府', 'Nanchang', 115.89, 28.68, '江西南昌', jx(), { b: 15 });
S('jiujiang', '九江府', 'Jiujiang', 116.00, 29.71, '江西九江', [...jx(), [1853, TP, 'qsg.wenzong'], [1858, Q, 'qsg.wenzong']]);
S('raozhou', '饶州府', 'Raozhou', 116.68, 29.00, '江西鄱阳', [...jx(), ...jxt]);
S('guangxin', '广信府', 'Guangxin', 117.97, 28.45, '江西上饶', jx());
S('fuzhou_jx', '抚州府', 'Fuzhou (Jiangxi)', 116.35, 27.95, '江西抚州', [...jx(), ...jxt]);
S('jianchang', '建昌府', 'Jianchang', 116.63, 27.55, '江西南城', [...jx(), ...jxt]);
S('jian', '吉安府', 'Ji’an', 114.99, 27.11, '江西吉安', [...jx(), ...jxt]);
S('ganzhou_jx', '赣州府', 'Ganzhou', 114.93, 25.83, '江西赣州', nm(1646));
S('nanan', '南安府', 'Nan’an', 114.36, 25.40, '江西大余', nm(1646));
S('yuanzhou', '袁州府', 'Yuanzhou', 114.39, 27.80, '江西宜春', [...jx(), ...jxt]);
S('ruizhou', '瑞州府', 'Ruizhou', 115.37, 28.42, '江西高安', [...jx(), ...jxt]);
S('linjiang', '临江府', 'Linjiang', 115.54, 28.06, '江西樟树', [...jx(), ...jxt]);
// ── 浙江 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('hangzhou', '杭州府', 'Hangzhou', 120.15, 30.27, '浙江杭州', [...nm(1645), [1861, TP, 'qsg.wenzong'], [1864, Q, 'qsg.muzong']], { b: 15 });
S('jiaxing', '嘉兴府', 'Jiaxing', 120.75, 30.76, '浙江嘉兴', [...nm(1645), [1860, TP, 'qsg.wenzong'], [1864, Q, 'qsg.muzong']]);
S('huzhou', '湖州府', 'Huzhou', 120.09, 30.89, '浙江湖州', [...nm(1645), [1860, TP, 'qsg.wenzong'], [1864, Q, 'qsg.muzong']]);
S('ningbo', '宁波府', 'Ningbo', 121.55, 29.87, '浙江宁波', [...nm(1646), [1861, TP, 'qsg.wenzong'], [1862, Q, 'qsg.muzong']]);
S('shaoxing', '绍兴府', 'Shaoxing', 120.58, 30.00, '浙江绍兴', [...nm(1646), [1861, TP, 'qsg.wenzong'], [1863, Q, 'qsg.muzong']]);
S('taizhou_zj', '台州府', 'Taizhou', 121.13, 28.85, '浙江临海', [...nm(1646), [1861, TP, 'qsg.wenzong'], [1862, Q, 'qsg.muzong']]);
S('jinhua', '金华府', 'Jinhua', 119.65, 29.08, '浙江金华', [...nm(1646), [1861, TP, 'qsg.wenzong'], [1863, Q, 'qsg.muzong']]);
S('quzhou', '衢州府', 'Quzhou', 118.87, 28.94, '浙江衢州', nm(1646));
S('yanzhou_zj', '严州府', 'Yanzhou (Zhejiang)', 119.50, 29.55, '浙江建德梅城', [...nm(1646), [1861, TP, 'qsg.wenzong'], [1863, Q, 'qsg.muzong']]);
S('wenzhou', '温州府', 'Wenzhou', 120.67, 28.00, '浙江温州', [...nm(1646), ...sf(1676)]);
S('chuzhou_zj', '处州府', 'Chuzhou (Zhejiang)', 119.92, 28.45, '浙江丽水', [...nm(1646), ...sf(1676), [1861, TP, 'qsg.wenzong'], [1863, Q, 'qsg.muzong']]);
S('dinghai', '定海（舟山）', 'Dinghai (Zhoushan)', 122.10, 30.02, '浙江舟山', nm(1651), { r: 60 });
// ── 福建 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
const fj = (): Hold[] => [...nm(1646), ...sf(1676)];
S('fuzhou', '福州府', 'Fuzhou', 119.30, 26.08, '福建福州', fj(), { b: 15 });
S('quanzhou', '泉州府', 'Quanzhou', 118.59, 24.91, '福建泉州', fj());
S('zhangzhou', '漳州府', 'Zhangzhou', 117.65, 24.51, '福建漳州', fj());
S('xinghua', '兴化府', 'Xinghua', 119.00, 25.43, '福建莆田', fj());
S('yanping', '延平府', 'Yanping', 118.17, 26.64, '福建南平', fj());
S('jianning', '建宁府', 'Jianning', 118.32, 27.03, '福建建瓯', fj());
S('shaowu', '邵武府', 'Shaowu', 117.48, 27.34, '福建邵武', fj());
S('tingzhou', '汀州府', 'Tingzhou', 116.36, 25.84, '福建长汀', fj());
S('funing', '福宁府', 'Funing', 120.00, 26.88, '福建霞浦', fj());
S('xiamen', '厦门', 'Xiamen', 118.09, 24.48, '福建厦门',
  [[1644, NM], [1662, MZ, 'qsg.zcg'], [1663, Q, 'qsg.shengzu'], [1674, MZ, 'qsg.zcg'], [1680, Q, 'qsg.shengzu']], { r: 40 });
// ── 湖北 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
S('wuchang', '武昌府', 'Wuchang', 114.31, 30.55, '湖北武汉', [...nm(1645), [1855, TP, 'qsg.wenzong'], [1856, Q, 'qsg.wenzong']], { b: 20 });
S('huangzhou', '黄州府', 'Huangzhou', 114.87, 30.45, '湖北黄冈', [...nm(1645), [1855, TP, 'qsg.wenzong'], [1856, Q, 'qsg.wenzong']]);
S('anlu', '安陆府', 'Anlu', 112.59, 31.17, '湖北钟祥', ds());
S('dean', '德安府', 'De’an', 113.69, 31.26, '湖北安陆', ds());
S('xiangyang', '襄阳府', 'Xiangyang', 112.14, 32.04, '湖北襄阳', ds());
S('yunyang', '郧阳府', 'Yunyang', 110.81, 32.84, '湖北十堰郧阳', ds());
S('jingzhou', '荆州府', 'Jingzhou', 112.24, 30.33, '湖北荆州', ds());
S('yichang', '宜昌府', 'Yichang', 111.29, 30.70, '湖北宜昌', ds());
S('shinan', '施南府', 'Shinan', 109.48, 30.30, '湖北恩施', nm(1659, 'est'));
// ── 湖南 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
const hn = (y = 1679): Hold[] => [...nm(1647), ...sf(y)];
S('changsha', '长沙府', 'Changsha', 112.94, 28.23, '湖南长沙', hn(), { b: 15 });
S('yuezhou', '岳州府', 'Yuezhou', 113.13, 29.36, '湖南岳阳', hn());
S('changde', '常德府', 'Changde', 111.69, 29.04, '湖南常德', hn());
S('lizhou', '澧州', 'Lizhou', 111.76, 29.63, '湖南澧县', hn());
S('baoqing', '宝庆府', 'Baoqing', 111.47, 27.24, '湖南邵阳', hn());
S('hengzhou', '衡州府', 'Hengzhou', 112.57, 26.89, '湖南衡阳', hn());
S('yongzhou', '永州府', 'Yongzhou', 111.61, 26.42, '湖南永州', hn());
S('chenzhou', '郴州', 'Chenzhou', 113.03, 25.79, '湖南郴州', hn());
S('chenzhou_x', '辰州府', 'Chenzhou (Yuanling)', 110.39, 28.47, '湖南沅陵', [...nm(1650, 'est'), ...sf(1680)]);
S('yuanzhou_hn', '沅州府', 'Yuanzhou', 109.68, 27.44, '湖南芷江', [...nm(1658), ...sf(1680)]);
S('jingzhou_hn', '靖州', 'Jingzhou (Hunan)', 109.69, 26.57, '湖南靖州', [...nm(1658), ...sf(1680)]);
S('yongshun', '永顺府', 'Yongshun', 109.85, 29.00, '湖南永顺', [...nm(1658, 'est'), ...sf(1680)]);
// ── 四川 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
const sc = (y: number, src = 'est'): Hold[] => [DX44, [1647, NM, 'est'], [y, Q, src], ...sf(1680)];
S('chengdu', '成都府', 'Chengdu', 104.07, 30.67, '四川成都', [DX44, [1647, null, 'est'], [1659, Q, 'est'], ...sf(1680)], { b: 30, r: 340 });
S('chongqing', '重庆府', 'Chongqing', 106.55, 29.56, '重庆', sc(1658), { b: 10 });
S('baoning', '保宁府', 'Baoning', 105.98, 31.58, '四川阆中', [DX44, [1647, Q, 'qsg.shizu'], ...sf(1680)]);
S('shunqing', '顺庆府', 'Shunqing', 106.08, 30.80, '四川南充', [DX44, [1647, Q, 'qsg.shizu'], ...sf(1680)]);
S('tongchuan', '潼川府', 'Tongchuan', 105.09, 31.10, '四川三台', [DX44, [1647, Q, 'qsg.shizu'], ...sf(1680)]);
S('longan', '龙安府', 'Long’an', 104.53, 32.41, '四川平武', [DX44, [1647, Q, 'qsg.shizu'], ...sf(1680)]);
S('xuzhou_sc', '叙州府', 'Xuzhou (Yibin)', 104.63, 28.76, '四川宜宾', sc(1659));
S('jiading', '嘉定府', 'Jiading', 103.76, 29.55, '四川乐山', sc(1659));
S('luzhou_sc', '泸州', 'Luzhou', 105.44, 28.87, '四川泸州', sc(1659));
S('yazhou', '雅州府', 'Yazhou', 103.00, 29.98, '四川雅安', sc(1659));
S('suiding', '绥定府', 'Suiding', 107.50, 31.21, '四川达州', [DX44, [1647, NM, 'est'], [1664, Q, 'qsg.shengzu'], ...sf(1680)]);
S('kuizhou', '夔州府', 'Kuizhou', 109.46, 31.02, '重庆奉节', [...nm(1664, 'qsg.shengzu'), ...sf(1680)]);
S('ningyuan_sc', '宁远府', 'Ningyuan', 102.26, 27.89, '四川西昌', [...nm(1659, 'est'), ...sf(1680)], { r: 340 });
S('youyang', '酉阳州', 'Youyang', 108.77, 28.84, '重庆酉阳', [...nm(1658, 'est'), ...sf(1680)]);
S('songpan', '松潘厅', 'Songpan', 103.60, 32.64, '四川松潘', [...nm(1659, 'est'), ...sf(1680)], { r: 340 });
S('lifan', '理番厅', 'Lifan', 103.17, 31.43, '四川理县', [...nm(1659, 'est'), ...sf(1680)]);
S('aba', '阿坝（松潘诸土司）', 'Ngawa (chiefdoms of Songpan)', 101.71, 32.90, '四川阿坝', [[1644, HS, 'est'], [1724, Q, 'qsg.shizong']], { r: 550 });
S('zhuokeji', '卓克基土司', 'Zhuokeji chiefdom', 102.21, 31.90, '四川马尔康', [[1644, HS, 'est'], [1724, Q, 'qsg.shizong']], { r: 450 });
S('daofu', '道孚（明正土司北境）', 'Dawu', 101.12, 30.98, '四川道孚', [[1644, HS], [1719, Q, 'qsg.shengzu']], { r: 450 });
S('maogong', '懋功厅（金川）', 'Maogong (Jinchuan)', 102.36, 31.00, '四川小金', [[1644, null], [1776, Q, 'qsg.gaozong']], { r: 300 });
S('dajianlu', '打箭炉厅', 'Dajianlu', 101.96, 30.05, '四川康定', [[1644, HS, 'est'], [1701, Q, 'qsg.shengzu']], { r: 380 });
S('litang', '里塘', 'Litang', 100.27, 30.00, '四川理塘', [[1644, HS], [1719, Q, 'qsg.shengzu']], { r: 500 });
S('batang', '巴塘', 'Batang', 99.10, 30.00, '四川巴塘', [[1644, HS], [1719, Q, 'qsg.shengzu']], { r: 500 });
S('ganzi', '甘孜（霍尔）', 'Garzê (Hor states)', 99.99, 31.62, '四川甘孜', [[1644, HS], [1719, Q, 'qsg.shengzu']], { r: 550 });
S('dege', '德格', 'Dêgê', 98.58, 31.80, '四川德格', [[1644, HS], [1720, Q, 'qsg.shengzu']], { r: 550 });
// ── 广东 · 琼州 ──────────────────────────────────────────────────────────────────────────────────────────────────────
/** 南明 to 1647, 李成栋 rises for the Ming 1648, the Qing again from 1650 */
const gd = (y = 1650): Hold[] => [[1644, NM], [1647, Q, 'qsg.shizu'], [1648, NM, 'qsg.shizu'], [y, Q, 'qsg.shizu']];
const shang: Hold[] = [[1676, WZ, 'qsg.shengzu'], [1677, Q, 'qsg.shengzu']];
S('guangzhou', '广州府', 'Guangzhou', 113.26, 23.13, '广东广州', [...gd(), ...shang], { b: 30 });
S('shaozhou', '韶州府', 'Shaozhou', 113.60, 24.81, '广东韶关', [...gd(), ...shang]);
S('nanxiong', '南雄州', 'Nanxiong', 114.31, 25.12, '广东南雄', gd());
S('huizhou', '惠州府', 'Huizhou', 114.41, 23.11, '广东惠州', [...gd(), ...shang]);
S('chaozhou', '潮州府', 'Chaozhou', 116.62, 23.66, '广东潮州', gd());
S('jiaying', '嘉应州', 'Jiaying', 116.12, 24.29, '广东梅州', gd());
S('zhaoqing', '肇庆府', 'Zhaoqing', 112.47, 23.05, '广东肇庆', [...gd(), ...shang]);
S('luoding', '罗定州', 'Luoding', 111.57, 22.77, '广东罗定', gd(1651));
S('gaozhou', '高州府', 'Gaozhou', 110.92, 21.66, '广东高州', [...gd(1651), ...shang]);
S('leizhou', '雷州府', 'Leizhou', 110.08, 20.91, '广东雷州', gd(1651));
S('lianzhou', '廉州府', 'Lianzhou', 109.20, 21.66, '广西合浦', gd(1651));
S('lianzhou_n', '连州', 'Lianzhou (north)', 112.38, 24.78, '广东连州', gd());
S('guangzhouwan', '广州湾', 'Guangzhouwan', 110.40, 21.20, '广东湛江', [...gd(1651), [1899, 'qing_lease_fr', 'treaty.gzw']], { r: 35 });
S('xinjie', '新界（大埔）', 'New Territories (Tai Po)', 114.17, 22.45, '香港新界', [...gd(), [1898, UK, 'treaty.hk1898']], { r: 25 });
S('kowloon', '九龙', 'Kowloon', 114.17, 22.32, '香港九龙', [...gd(), [1860, UK, 'treaty.beijing.uk']], { r: 12 });
S('hongkong', '香港岛', 'Hong Kong Island', 114.17, 22.27, '香港岛', [...gd(), [1842, UK, 'treaty.nanjing']], { r: 15 });
S('macau', '澳门', 'Macao', 113.54, 22.19, '澳门', [...gd(), [1887, PT, 'treaty.lisbon']], { r: 12 });
S('qiongzhou', '琼州府', 'Qiongzhou', 110.35, 20.02, '海南海口', gd(1651), { r: 250 });
S('danzhou', '儋州', 'Danzhou', 109.58, 19.52, '海南儋州', gd(1651), { r: 250 });
S('yazhou_hn', '崖州', 'Yazhou', 109.50, 18.25, '海南三亚', gd(1651), { r: 250 });
S('wanzhou', '万州', 'Wanzhou', 110.39, 18.80, '海南万宁', gd(1651), { r: 250 });
// ── 广西 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
const gx = (y: number, src = 'qsg.shizu'): Hold[] => [...nm(y, src), ...sf(1680)];
S('guilin', '桂林府', 'Guilin', 110.29, 25.28, '广西桂林', [[1644, NM], [1650, Q, 'qsg.shizu'], [1652, NM, 'qsg.shizu'], [1653, Q, 'est'], ...sf(1680)], { b: 15 });
S('pingle', '平乐府', 'Pingle', 110.64, 24.63, '广西平乐', gx(1650));
S('wuzhou', '梧州府', 'Wuzhou', 111.28, 23.48, '广西梧州', gx(1650));
S('xunzhou', '浔州府', 'Xunzhou', 110.08, 23.39, '广西桂平', gx(1650));
S('yulin_gx', '郁林州', 'Yulin', 110.15, 22.63, '广西玉林', gx(1650));
S('liuzhou', '柳州府', 'Liuzhou', 109.41, 24.33, '广西柳州', gx(1653, 'est'));
S('qingyuan_gx', '庆远府', 'Qingyuan', 108.65, 24.49, '广西宜州', gx(1659, 'est'));
S('nanning', '南宁府', 'Nanning', 108.37, 22.82, '广西南宁', gx(1656, 'est'));
S('taiping_gx', '太平府', 'Taiping (Guangxi)', 107.36, 22.40, '广西崇左', gx(1656, 'est'));
S('sien', '思恩府', 'Si’en', 108.27, 23.16, '广西武鸣', gx(1659, 'est'));
S('zhenan', '镇安府', 'Zhen’an', 106.62, 23.33, '广西德保', gx(1659, 'est'));
S('sicheng', '泗城府', 'Sicheng', 106.56, 24.35, '广西凌云', gx(1659, 'est'));
S('baise', '百色厅', 'Baise', 106.62, 23.90, '广西百色', gx(1659, 'est'));
// ── 云南 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
/** 南明; 大西余部 (孙可望、李定国) take it 1647 and join the 永历 court 1652; the Qing 1659; 吴三桂 1674–81 */
const yn = (): Hold[] => [[1644, NM], [1647, DX, 'mingshi.lzc'], [1652, NM, 'est'], [1659, Q, 'qsg.shizu'], ...sf(1681)];
const yn2 = (): Hold[] => [...nm(1659), ...sf(1681)];
S('kunming', '云南府', 'Yunnan (Kunming)', 102.71, 25.04, '云南昆明', yn(), { b: 30 });
S('dali', '大理府', 'Dali', 100.23, 25.60, '云南大理', yn());
S('lin_an', '临安府', 'Lin’an', 102.83, 23.62, '云南建水', yn());
S('chuxiong', '楚雄府', 'Chuxiong', 101.54, 25.04, '云南楚雄', yn());
S('qujing', '曲靖府', 'Qujing', 103.80, 25.50, '云南曲靖', yn());
S('guangnan', '广南府', 'Guangnan', 105.06, 24.05, '云南广南', yn2());
S('kaihua', '开化府', 'Kaihua', 104.24, 23.37, '云南文山', yn2());
S('shunning', '顺宁府', 'Shunning', 99.92, 24.59, '云南凤庆', yn2());
S('lijiang', '丽江府', 'Lijiang', 100.23, 26.87, '云南丽江', yn2(), { r: 320 });
S('yongchang', '永昌府', 'Yongchang', 99.16, 25.11, '云南保山', yn2());
S('tengyue', '腾越厅', 'Tengyue', 98.49, 25.02, '云南腾冲', yn2(), { r: 250 });
S('yuanjiang', '元江州', 'Yuanjiang', 101.99, 23.60, '云南元江', yn2());
S('puer', '普洱府', 'Pu’er', 101.04, 23.06, '云南宁洱', yn2(), { r: 320 });
S('cheli', '车里宣慰司', 'Cheli (Sipsongpanna)', 100.80, 22.00, '云南景洪', yn2(), { r: 260 });
S('dongchuan', '东川府', 'Dongchuan', 103.18, 26.08, '云南东川', yn2());
S('zhaotong', '昭通府（乌蒙）', 'Zhaotong (Wumeng)', 103.72, 27.34, '云南昭通', yn2());
S('zhongdian', '中甸厅', 'Zhongdian', 99.70, 27.83, '云南香格里拉', [[1644, HS, 'est'], [1724, Q, 'qsg.shizong']], { r: 380 });
S('weixi', '维西厅', 'Weixi', 99.29, 27.18, '云南维西', [[1644, HS, 'est'], [1724, Q, 'qsg.shizong']], { r: 300 });
// ── 贵州 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
const gz = (): Hold[] => [...nm(1658), ...sf(1681)];
S('guiyang', '贵阳府', 'Guiyang', 106.71, 26.58, '贵州贵阳', gz(), { b: 15 });
S('anshun', '安顺府', 'Anshun', 105.95, 26.25, '贵州安顺', gz());
S('duyun', '都匀府', 'Duyun', 107.52, 26.26, '贵州都匀', gz());
S('zhenyuan', '镇远府', 'Zhenyuan', 108.43, 27.05, '贵州镇远', gz());
S('sinan', '思南府', 'Sinan', 108.25, 27.94, '贵州思南', gz());
S('tongren', '铜仁府', 'Tongren', 109.19, 27.72, '贵州铜仁', gz());
S('liping', '黎平府', 'Liping', 109.14, 26.23, '贵州黎平', gz());
S('dading', '大定府', 'Dading', 105.61, 27.14, '贵州大方', gz());
S('xingyi', '兴义府', 'Xingyi', 104.90, 25.09, '贵州兴义', gz());
S('zunyi', '遵义府', 'Zunyi', 106.93, 27.73, '贵州遵义', gz());
S('guzhou', '古州厅', 'Guzhou', 108.52, 25.93, '贵州榕江', gz());
// ── 台湾 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
/** 荷兰殖民者侵占; 郑成功 recovers it 1662; the Qing 1683; ceded to Japan by the 马关条约 */
const tw: Hold[] = [[1644, NL], [1662, MZ, 'qsg.zcg'], [1683, Q, 'qsg.shengzu'], [1895, JT, 'treaty.shimonoseki']];
/** the east coast: no Dutch or Zheng hold; under the Qing from 1683 */
const twe: Hold[] = [[1644, null], [1683, Q, 'qsg.shengzu'], [1895, JT, 'treaty.shimonoseki']];
S('taiwanfu', '台湾府（承天府）', 'Taiwan prefecture (Chengtian)', 120.20, 23.00, '台湾台南', tw, { b: 15 });
S('zhuluo', '诸罗（嘉义）', 'Zhuluo (Chiayi)', 120.45, 23.48, '台湾嘉义', tw);
S('fengshan', '凤山', 'Fengshan', 120.29, 22.68, '台湾高雄', tw);
S('zhanghua', '彰化', 'Zhanghua', 120.54, 24.08, '台湾彰化', tw);
S('danshui', '淡水（竹堑）', 'Danshui (Zhuqian)', 120.97, 24.80, '台湾新竹', tw);
S('jilong', '鸡笼', 'Jilong', 121.74, 25.13, '台湾基隆', tw);
S('yilan', '噶玛兰（宜兰）', 'Kavalan (Yilan)', 121.75, 24.75, '台湾宜兰', twe);
S('hualian', '花莲港', 'Hualian', 121.60, 23.98, '台湾花莲', twe);
S('beinan', '卑南（台东）', 'Beinan (Taitung)', 121.15, 22.76, '台湾台东', twe);
S('hengchun', '恒春', 'Hengchun', 120.74, 22.00, '台湾屏东恒春', twe);
S('penghu', '澎湖', 'Penghu', 119.57, 23.57, '台湾澎湖', [[1644, NM], [1662, MZ, 'qsg.zcg'], [1683, Q, 'qsg.shengzu'], [1895, JT, 'treaty.shimonoseki']], { r: 40 });
// ── 盛京 · 吉林 · 黑龙江 ───────────────────────────────────────────────────────────────────────────────────────────
S('shengjing', '盛京（奉天府）', 'Shengjing (Mukden)', 123.43, 41.80, '辽宁沈阳', Q0, { b: 40 });
S('liaoyang', '辽阳', 'Liaoyang', 123.17, 41.27, '辽宁辽阳', Q0);
S('jinzhou', '锦州府', 'Jinzhou', 121.13, 41.10, '辽宁锦州', Q0);
S('xingjing', '兴京（赫图阿拉）', 'Xingjing (Hetu Ala)', 124.95, 41.73, '辽宁新宾', Q0);
S('fenghuang', '凤凰城', 'Fenghuang', 124.07, 40.45, '辽宁凤城', Q0);
S('fuzhou_ln', '复州', 'Fuzhou (Liaodong)', 121.98, 39.63, '辽宁瓦房店', Q0, { r: 200 });
S('lushun', '旅顺口', 'Lüshunkou', 121.26, 38.81, '辽宁大连旅顺', [...Q0, [1898, 'qing_lease_ru', 'treaty.luda'], [1905, 'qing_lease_jp', 'treaty.portsmouth']], { r: 50 });
S('jilin', '吉林（船厂）', 'Jilin', 126.55, 43.85, '吉林吉林市', Q0, { r: 380 });
S('ningguta', '宁古塔', 'Ningguta', 129.47, 44.35, '黑龙江宁安', Q0, { r: 420 });
S('hunchun', '珲春', 'Hunchun', 130.37, 42.87, '吉林珲春', Q0, { r: 250 });
S('sanxing', '三姓', 'Sanxing', 129.57, 46.32, '黑龙江依兰', Q0, { r: 480 });
S('bodune', '伯都讷', 'Bodune', 124.82, 45.18, '吉林松原', Q0, { r: 320 });
S('alchuka', '阿勒楚喀', 'Alchuka', 126.97, 45.53, '黑龙江哈尔滨阿城', Q0, { r: 320 });
S('qiqihar', '齐齐哈尔', 'Qiqihar', 123.95, 47.35, '黑龙江齐齐哈尔', Q0, { r: 450 });
S('mergen', '墨尔根', 'Mergen', 125.20, 49.18, '黑龙江嫩江', Q0, { r: 480 });
S('aihun', '黑龙江城（瑷珲）', 'Heilongjiang city (Aigun)', 127.48, 49.95, '黑龙江黑河瑷珲', Q0, { r: 520 });
S('hulunbuir', '呼伦贝尔', 'Hulunbuir', 119.70, 49.20, '内蒙古海拉尔', [[1644, Q, 'est']], { r: 480 });
// 黑龙江以北 (ceded by the 瑷珲条约 1858) and 乌苏里江以东 (北京条约 1860)
S('yakesa', '雅克萨', 'Albazin (Yaksa)', 124.00, 53.40, '俄罗斯阿尔巴津诺', [[1644, Q, 'est'], [1665, RU, 'est'], [1689, Q, 'treaty.nerchinsk'], [1858, RU, 'treaty.aihui']], { r: 600 });
S('zeya', '精奇里江', 'Zeya (Jingqili river)', 127.27, 53.73, '俄罗斯结雅', [[1644, Q, 'est'], [1858, RU, 'treaty.aihui']], { r: 650 });
S('hailanpao', '海兰泡', 'Hailanpao (Blagoveshchensk)', 127.53, 50.27, '俄罗斯布拉戈维申斯克', [[1644, Q, 'est'], [1858, RU, 'treaty.aihui']], { r: 150 });
S('jiangdong', '江东六十四屯', 'The Sixty-four Villages East of the River', 127.70, 50.00, '俄罗斯布拉戈维申斯克以南', [[1644, Q, 'est'], [1900, RU, 'qsg.dezong']], { r: 50 });
S('niuman', '牛满河', 'Niuman river (Bureya)', 130.25, 50.40, '俄罗斯布列亚河口一带', [[1644, Q, 'est'], [1858, RU, 'treaty.aihui']], { r: 500 });
S('miaojie', '庙街', 'Miaojie (Nikolayevsk)', 140.73, 53.14, '俄罗斯尼古拉耶夫斯克', [[1644, Q, 'est'], [1858, RU, 'treaty.aihui']], { r: 650 });
S('boli', '伯力', 'Boli (Khabarovsk)', 135.07, 48.48, '俄罗斯哈巴罗夫斯克', [[1644, Q, 'est'], [1860, RU, 'treaty.beijing.ru']], { r: 450 });
S('qiji', '奇集', 'Qiji (Kizi)', 140.25, 51.45, '俄罗斯基济湖一带', [[1644, Q, 'est'], [1860, RU, 'treaty.beijing.ru']], { r: 450 });
S('shuangchengzi', '双城子', 'Shuangchengzi (Ussuriysk)', 131.95, 43.80, '俄罗斯乌苏里斯克', [[1644, Q, 'est'], [1860, RU, 'treaty.beijing.ru']], { r: 280 });
S('haishenwai', '海参崴', 'Haishenwai (Vladivostok)', 131.89, 43.12, '俄罗斯符拉迪沃斯托克', [[1644, Q, 'est'], [1860, RU, 'treaty.beijing.ru']], { r: 150 });
S('sikhote', '锡霍特山东麓（苏城）', 'East of the Sikhote-Alin (Suchan)', 133.10, 43.12, '俄罗斯游击队城', [[1644, Q, 'est'], [1860, RU, 'treaty.beijing.ru']], { r: 500 });
// ── 漠南蒙古 ────────────────────────────────────────────────────────────────────────────────────────────────────────
S('horqin', '科尔沁', 'Khorchin', 122.25, 43.62, '内蒙古通辽', Q0, { r: 420 });
S('juuuda', '昭乌达', 'Juu Uda', 118.95, 42.27, '内蒙古赤峰', Q0, { r: 380 });
S('kharqin', '喀喇沁', 'Kharachin', 119.33, 41.60, '内蒙古宁城', Q0, { r: 250 });
S('xilingol', '锡林郭勒', 'Shilingol', 116.08, 43.95, '内蒙古锡林浩特', Q0, { r: 520 });
S('dolonnor', '多伦诺尔', 'Dolon Nor', 116.47, 42.20, '内蒙古多伦', Q0, { r: 300 });
S('ulanqab', '乌兰察布', 'Ulaan Chab', 111.70, 41.53, '内蒙古四子王旗', Q0, { r: 520 });
S('ordos', '伊克昭（鄂尔多斯）', 'Ikh Juu (Ordos)', 109.73, 39.57, '内蒙古伊金霍洛', Q0, { r: 420 });
S('alxa', '阿拉善（定远营）', 'Alxa (Dingyuanying)', 105.68, 38.83, '内蒙古阿拉善左旗', [[1644, HS, 'est'], [1697, Q, 'qsg.fanbu']], { r: 800 });
S('ejin', '额济纳', 'Ejin', 101.06, 41.96, '内蒙古额济纳旗', [[1644, null], [1731, Q, 'est']], { r: 750 });
// ── 喀尔喀（外蒙古）· 科布多 · 唐努乌梁海 ─────────────────────────────────────────────────────────────────────────
const kh: Hold[] = [[1644, KH], [1688, ZG, 'qsg.shengzu'], [1691, Q, 'qsg.shengzu']];
S('kulun', '库伦', 'Khüree (Urga)', 106.92, 47.92, '蒙古国乌兰巴托', kh, { r: 750 });
S('cecen', '车臣汗部', 'Setsen Khan aimag', 110.66, 47.32, '蒙古国温都尔汗', kh, { r: 700 });
S('sayin', '赛音诺颜部', 'Sain Noyon aimag', 101.45, 47.47, '蒙古国车车尔勒格', kh, { r: 650 });
S('uliastai', '乌里雅苏台', 'Uliastai', 96.85, 47.73, '蒙古国乌里雅苏台', kh, { r: 650 });
S('khuvsgul', '库苏古尔', 'Khövsgöl', 100.16, 49.64, '蒙古国木伦', kh, { r: 550 });
S('kyakhta', '恰克图（买卖城）', 'Kyakhta (Maimaicheng)', 106.45, 50.35, '蒙古国阿勒坦布拉格', kh, { r: 200 });
S('dariganga', '苏尼特 · 东戈壁', 'Eastern Gobi', 110.10, 44.90, '蒙古国赛音山达', kh, { r: 650 });
S('gobialtai', '戈壁阿尔泰', 'Gobi-Altai', 100.00, 44.40, '蒙古国巴彦洪戈尔南部', [[1644, KH], [1688, ZG, 'qsg.shengzu'], [1697, Q, 'qsg.shengzu']], { r: 650 });
S('khovd', '科布多', 'Khovd', 91.64, 48.01, '蒙古国科布多', [[1644, ZG, 'est'], [1731, Q, 'qsg.shizong']], { r: 650 });
S('uvs', '乌布苏（杜尔伯特）', 'Uvs (Dörbet)', 92.07, 49.98, '蒙古国乌兰固木', [[1644, ZG, 'est'], [1754, Q, 'qsg.gaozong']], { r: 450 });
S('tannu', '唐努乌梁海', 'Tannu Uriankhai', 94.45, 51.72, '俄罗斯图瓦克孜勒', [[1644, KH, 'est'], [1688, ZG, 'est'], [1727, Q, 'treaty.kyakhta']], { r: 650 });
// ── 青海 · 西藏 ──────────────────────────────────────────────────────────────────────────────────────────────────────
/** 和硕特部 (固始汗) holds Tibet; 准噶尔 invades 1717; the Qing drive them out 1720 (驻藏大臣 from 1727) */
const xz: Hold[] = [[1644, HS], [1717, ZG, 'qsg.shengzu'], [1720, Q, 'qsg.shengzu']];
const qh: Hold[] = [[1644, HS], [1724, Q, 'qsg.shizong']];
S('lhasa', '拉萨', 'Lhasa', 91.13, 29.65, '西藏拉萨', xz, { r: 1500, b: 40 });
S('shigatse', '日喀则（后藏）', 'Shigatse (Tsang)', 88.88, 29.27, '西藏日喀则', xz, { r: 1300 });
S('dingri', '定日', 'Dingri', 87.12, 28.66, '西藏定日', xz, { r: 900 });
S('cona', '错那', 'Cona', 91.96, 27.99, '西藏错那', xz, { r: 700 });
S('nyingchi', '工布', 'Kongpo', 94.36, 29.65, '西藏林芝', xz, { r: 900 });
S('nagqu', '那曲（哈喇乌苏）', 'Nagqu (Kharaus)', 92.05, 31.48, '西藏那曲', xz, { r: 1800 });
S('shuanghu', '羌塘（双湖）', 'Changtang (Shuanghu)', 88.83, 33.19, '西藏双湖', xz, { r: 2200 });
S('gerze', '改则', 'Gêrzê', 84.06, 32.30, '西藏改则', xz, { r: 2200 });
S('dawang', '达旺（门隅）', 'Tawang (Monyul)', 91.86, 27.59, '西藏错那达旺', xz, { r: 350 });
S('motuo', '墨脱（珞瑜）', 'Mêdog (Lhoyul)', 95.33, 29.33, '西藏墨脱', xz, { r: 450 });
S('gartok', '噶大克（阿里）', 'Gartok (Ngari)', 80.10, 31.75, '西藏噶尔', [[1644, LD, 'est'], [1683, HS, 'est'], [1717, ZG, 'est'], [1720, Q, 'qsg.shengzu']], { r: 1800 });
S('rutog', '日土', 'Rutog', 79.72, 33.38, '西藏日土', [[1644, LD, 'est'], [1683, HS, 'est'], [1717, ZG, 'est'], [1720, Q, 'qsg.shengzu']], { r: 1300 });
S('qamdo', '昌都', 'Qamdo', 97.18, 31.14, '西藏昌都', [[1644, HS], [1720, Q, 'qsg.shengzu']], { r: 900 });
S('zayu', '察隅', 'Zayü', 97.47, 28.66, '西藏察隅', [[1644, HS], [1720, Q, 'qsg.shengzu']], { r: 700 });
S('yushu', '玉树', 'Yushu', 97.01, 33.00, '青海玉树', qh, { r: 1200 });
S('chahantuolohai', '察罕托罗海（青海）', 'Chakhan Tolokhai (Kokonor)', 100.99, 36.90, '青海海晏', qh, { r: 650 });
S('qaidam', '柴达木', 'Qaidam', 98.10, 36.30, '青海都兰', qh, { r: 1400 });
S('golmud', '台吉乃尔（柴达木西部）', 'Taijinar (western Qaidam)', 94.90, 36.40, '青海格尔木', qh, { r: 1500 });
S('tuotuohe', '通天河源（沱沱河）', 'Upper Tongtian (Tuotuo river)', 92.44, 34.22, '青海格尔木唐古拉山镇', qh, { r: 1800 });
S('henanmeng', '河南蒙旗', 'Mongol banners south of the Yellow River', 101.61, 34.73, '青海河南', qh, { r: 550 });
S('golog', '果洛', 'Golog', 100.24, 34.47, '青海玛沁', qh, { r: 700 });
// ── 新疆 ────────────────────────────────────────────────────────────────────────────────────────────────────────────
/** 准噶尔 to 1755 (伊犁 taken), then the Qing; the 回部 (Tarim) */
const nj = (y: number, src: string): Hold[] => [[1644, ZG], [1755, Q, 'qsg.gaozong'], [y, RU, src]];
const hb = (invaded = 1867, back = 1877): Hold[] => [[1644, YK], [1680, ZG, 'qsg.fanbu'], [1759, Q, 'qsg.gaozong'], [invaded, YB, 'qsg.muzong'], [back, Q, 'qsg.zuozongtang']];
S('ili', '伊犁（惠远城）', 'Ili (Huiyuan)', 80.88, 43.99, '新疆霍城惠远', [[1644, ZG], [1755, Q, 'qsg.gaozong'], [1871, RI, 'qsg.bangjiao'], [1882, Q, 'treaty.ili']], { r: 650, b: 30 });
S('horgos_w', '霍尔果斯河以西（今雅尔肯特）', 'West of the Khorgos (Zharkent)', 80.00, 44.17, '哈萨克斯坦扎尔肯特', [[1644, ZG], [1755, Q, 'qsg.gaozong'], [1871, RI, 'qsg.bangjiao'], [1882, RU, 'treaty.ili']], { r: 250 });
S('tarbagatai', '塔尔巴哈台', 'Tarbagatai', 82.98, 46.75, '新疆塔城', [[1644, ZG], [1755, Q, 'qsg.gaozong']], { r: 550 });
S('altai', '阿尔泰（承化寺）', 'Altai (Chenghua monastery)', 88.13, 47.85, '新疆阿勒泰', [[1644, ZG], [1755, Q, 'qsg.gaozong']], { r: 600 });
S('zaysan', '斋桑淖尔', 'Lake Zaysan', 84.87, 47.47, '哈萨克斯坦斋桑', nj(1864, 'treaty.kanfen'), { r: 400 });
S('lepsy', '勒布什', 'Lepsy', 80.60, 45.53, '哈萨克斯坦列普辛斯克', nj(1864, 'treaty.kanfen'), { r: 550 });
S('almaty', '古尔班阿里玛图', 'Gurban Almatu (Almaty)', 76.95, 43.25, '哈萨克斯坦阿拉木图', nj(1864, 'treaty.kanfen'), { r: 500 });
S('issyk', '特穆尔图淖尔', 'Temurtu Nor (Issyk-Kul)', 78.39, 42.49, '吉尔吉斯斯坦卡拉科尔', [[1644, ZG], [1758, Q, 'qsg.gaozong'], [1864, RU, 'treaty.kanfen']], { r: 450 });
S('urumqi', '乌鲁木齐（迪化）', 'Ürümqi (Dihua)', 87.62, 43.82, '新疆乌鲁木齐', [[1644, ZG], [1755, Q, 'qsg.gaozong'], [1870, YB, 'qsg.muzong'], [1876, Q, 'qsg.zuozongtang']], { r: 450, b: 10 });
S('gucheng', '古城', 'Gucheng', 89.59, 44.01, '新疆奇台', [[1644, ZG], [1755, Q, 'qsg.gaozong'], [1870, YB, 'est'], [1876, Q, 'qsg.zuozongtang']], { r: 400 });
S('kurkarausu', '库尔喀喇乌苏', 'Kur Kara Usu', 84.68, 44.43, '新疆乌苏', [[1644, ZG], [1755, Q, 'qsg.gaozong'], [1870, YB, 'est'], [1876, Q, 'qsg.zuozongtang']], { r: 350 });
S('jinghe', '精河', 'Jinghe', 82.89, 44.60, '新疆精河', [[1644, ZG], [1755, Q, 'qsg.gaozong']], { r: 250 });
S('barkol', '巴里坤（镇西府）', 'Barkol (Zhenxi)', 93.01, 43.60, '新疆巴里坤', [[1644, YK, 'est'], [1680, ZG, 'qsg.fanbu'], [1715, Q, 'qsg.shengzu']], { r: 400 });
S('hami', '哈密', 'Hami', 93.51, 42.82, '新疆哈密', [[1644, YK], [1680, ZG, 'qsg.fanbu'], [1697, Q, 'qsg.shengzu']], { r: 450 });
S('turfan', '吐鲁番', 'Turpan', 89.19, 42.95, '新疆吐鲁番', [[1644, YK], [1680, ZG, 'qsg.fanbu'], [1755, Q, 'qsg.gaozong'], [1870, YB, 'qsg.muzong'], [1877, Q, 'qsg.zuozongtang']], { r: 400 });
S('karashahr', '喀喇沙尔', 'Karashahr', 86.57, 42.06, '新疆焉耆', hb(), { r: 500 });
S('kuqa', '库车', 'Kuqa', 82.96, 41.72, '新疆库车', hb(), { r: 450 });
S('aksu', '阿克苏', 'Aksu', 80.26, 41.17, '新疆阿克苏', hb(), { r: 450 });
S('ush', '乌什', 'Uqturpan', 79.22, 41.21, '新疆乌什', hb(), { r: 300 });
S('kashgar', '喀什噶尔', 'Kashgar', 75.99, 39.47, '新疆喀什', hb(1865), { r: 500, b: 10 });
S('yangihissar', '英吉沙尔', 'Yangihissar', 76.17, 38.93, '新疆英吉沙', hb(1865), { r: 250 });
S('yarkand', '叶尔羌', 'Yarkand', 77.24, 38.41, '新疆莎车', hb(1866), { r: 550 });
S('khotan', '和阗', 'Khotan', 79.92, 37.11, '新疆和田', hb(1867, 1878), { r: 700 });
S('keriya', '克里雅（于阗）', 'Keriya', 81.67, 36.86, '新疆于田', hb(1867, 1878), { r: 1200 });
S('xaidulla', '赛图拉卡伦', 'Shahidulla post', 78.00, 36.40, '新疆皮山赛图拉', hb(1867, 1878), { r: 1100 });
S('qiemo', '车尔臣（且末）', 'Cherchen', 85.53, 38.14, '新疆且末', hb(1867, 1878), { r: 1300 });
S('ruoqiang', '卡克里克（若羌）', 'Charklik', 88.17, 39.03, '新疆若羌', hb(1867, 1878), { r: 1500 });
S('tashkurgan', '色勒库尔（蒲犁）', 'Sarikol (Tashkurgan)', 75.23, 37.77, '新疆塔什库尔干', hb(1866, 1878), { r: 400 });
S('pamir', '帕米尔（苏满塔什）', 'Pamir (Somatash)', 73.97, 38.17, '塔吉克斯坦穆尔加布一带',
  [[1644, YK, 'est'], [1680, ZG, 'est'], [1759, Q, 'qsg.gaozong'], [1892, RU, 'qsg.bangjiao']], { r: 400 });

// ── neighbours ──────────────────────────────────────────────────────────────────────────────────────────────────────
// 俄国 (Siberia)
S('tomsk', '托木斯克', 'Tomsk', 84.97, 56.49, '俄罗斯托木斯克', [[1644, RU]], { r: 650 });
S('krasnoyarsk', '克拉斯诺亚尔斯克', 'Krasnoyarsk', 92.87, 56.01, '俄罗斯克拉斯诺亚尔斯克', [[1644, RU]], { r: 650 });
S('kuznetsk', '库兹涅茨克', 'Kuznetsk', 87.12, 53.76, '俄罗斯新库兹涅茨克', [[1644, RU]], { r: 400 });
S('tara', '塔拉', 'Tara', 74.37, 56.90, '俄罗斯塔拉', [[1644, RU]], { r: 550 });
S('omsk', '鄂木斯克', 'Omsk', 73.37, 54.98, '俄罗斯鄂木斯克', [[1644, null], [1716, RU, 'est']], { r: 500 });
S('petropavl', '彼得罗巴甫洛夫斯克', 'Petropavlovsk', 69.15, 54.87, '哈萨克斯坦彼得罗巴甫尔', [[1644, KZ], [1752, RU, 'est']], { r: 450 });
S('barnaul', '巴尔瑙尔', 'Barnaul', 83.78, 53.35, '俄罗斯巴尔瑙尔', [[1644, null], [1730, RU, 'est']], { r: 350 });
S('biysk', '比斯克', 'Biysk', 85.21, 52.54, '俄罗斯比斯克', [[1644, ZG, 'est'], [1709, RU, 'est']], { r: 350 });
S('semipalatinsk', '塞米巴拉金斯克', 'Semipalatinsk', 80.25, 50.41, '哈萨克斯坦塞梅伊', [[1644, ZG, 'est'], [1718, RU, 'est']], { r: 450 });
S('ustkam', '乌斯季卡缅诺戈尔斯克', 'Ust-Kamenogorsk', 82.61, 49.95, '哈萨克斯坦厄斯克门', [[1644, ZG, 'est'], [1720, RU, 'est']], { r: 300 });
S('irkutsk', '伊尔库茨克', 'Irkutsk', 104.28, 52.29, '俄罗斯伊尔库茨克', [[1644, null], [1661, RU, 'est']], { r: 550 });
S('udinsk', '上乌金斯克', 'Verkhneudinsk', 107.60, 51.83, '俄罗斯乌兰乌德', [[1644, KH, 'est'], [1666, RU, 'est']], { r: 450 });
S('selenginsk', '色楞格斯克', 'Selenginsk', 106.65, 51.10, '俄罗斯新色楞金斯克', [[1644, KH, 'est'], [1665, RU, 'est']], { r: 250 });
S('chita', '赤塔', 'Chita', 113.50, 52.03, '俄罗斯赤塔', [[1644, KH, 'est'], [1653, RU, 'est']], { r: 450 });
S('nerchinsk', '尼布楚', 'Nerchinsk', 116.53, 51.98, '俄罗斯涅尔琴斯克', [[1644, KH, 'est'], [1658, RU, 'est']], { r: 500 });
// 哈萨克 · 浩罕 · 布哈拉 · 阿富汗 · 波斯
S('turkestan', '突厥斯坦（哈萨克汗廷）', 'Turkestan (Kazakh khans)', 68.25, 43.30, '哈萨克斯坦突厥斯坦', [[1644, KZ], [1864, RU, 'est']], { r: 750 });
S('karkaraly', '卡尔卡拉雷（中玉兹）', 'Karkaraly (Middle Horde)', 75.48, 49.40, '哈萨克斯坦卡尔卡拉雷', [[1644, KZ], [1824, RU, 'est']], { r: 750 });
S('ulytau', '兀鲁套', 'Ulytau', 67.00, 48.20, '哈萨克斯坦乌勒套', [[1644, KZ], [1824, RU, 'est']], { r: 750 });
S('taraz', '塔拉斯（奥利阿塔）', 'Talas (Aulie-Ata)', 71.37, 42.90, '哈萨克斯坦塔拉兹', [[1644, KZ], [1864, RU, 'est']], { r: 400 });
S('tashkent', '塔什干', 'Tashkent', 69.24, 41.30, '乌兹别克斯坦塔什干', [[1644, KZ], [1809, KO, 'est'], [1865, RU, 'est']], { r: 300 });
S('kokand', '浩罕', 'Kokand', 70.94, 40.53, '乌兹别克斯坦浩罕', [[1644, BK], [1709, KO, 'est'], [1876, RU, 'est']], { r: 400, b: 10 });
S('osh', '奥什', 'Osh', 72.80, 40.53, '吉尔吉斯斯坦奥什', [[1644, BK], [1709, KO, 'est'], [1876, RU, 'est']], { r: 500 });
S('pishpek', '比什凯克', 'Pishpek', 74.60, 42.87, '吉尔吉斯斯坦比什凯克', [[1644, KZ, 'est'], [1825, KO, 'est'], [1862, RU, 'est']], { r: 250 });
S('bukhara', '布哈拉', 'Bukhara', 64.42, 39.77, '乌兹别克斯坦布哈拉', [[1644, BK]], { r: 550 });
S('samarkand', '撒马尔罕', 'Samarkand', 66.97, 39.65, '乌兹别克斯坦撒马尔罕', [[1644, BK], [1868, RU, 'est']], { r: 300 });
S('faizabad', '巴达克山', 'Badakhshan (Faizabad)', 70.58, 37.12, '阿富汗法扎巴德', [[1644, BK, 'est'], [1768, AF, 'est']], { r: 300 });
S('kabul', '喀布尔', 'Kabul', 69.17, 34.53, '阿富汗喀布尔', [[1644, MG], [1747, AF, 'est']], { r: 500 });
S('herat', '赫拉特', 'Herat', 62.20, 34.35, '阿富汗赫拉特', [[1644, PE], [1750, AF, 'est']], { r: 500 });
// 印度 · 喜马拉雅诸国
S('peshawar', '白沙瓦', 'Peshawar', 71.57, 34.01, '巴基斯坦白沙瓦', [[1644, MG], [1747, AF, 'est'], [1834, SK, 'est'], [1849, BI, 'est']], { r: 250 });
S('lahore', '拉合尔', 'Lahore', 74.34, 31.55, '巴基斯坦拉合尔', [[1644, MG], [1752, AF, 'est'], [1799, SK, 'est'], [1849, BI, 'est']], { r: 450 });
S('srinagar', '克什米尔（斯利那加）', 'Kashmir (Srinagar)', 74.80, 34.08, '克什米尔斯利那加', [[1644, MG], [1752, AF, 'est'], [1819, SK, 'est'], [1846, BI, 'treaty.amritsar']], { r: 300 });
S('leh', '拉达克（列城）', 'Ladakh (Leh)', 77.58, 34.16, '拉达克列城', [[1644, LD], [1834, SK, 'est'], [1846, BI, 'treaty.amritsar']], { r: 500 });
S('delhi', '德里', 'Delhi', 77.21, 28.65, '印度德里', [[1644, MG], [1803, BI, 'est']], { r: 550, b: 20 });
S('lucknow', '勒克瑙', 'Lucknow', 80.95, 26.85, '印度勒克瑙', [[1644, MG], [1856, BI, 'est']], { r: 450 });
S('patna', '巴特那', 'Patna', 85.14, 25.59, '印度巴特那', [[1644, MG], [1765, BI, 'est']], { r: 450 });
S('dhaka', '达卡', 'Dhaka', 90.41, 23.81, '孟加拉国达卡', [[1644, MG], [1765, BI, 'est']], { r: 450 });
S('guwahati', '高哈蒂', 'Guwahati', 91.74, 26.14, '印度阿萨姆高哈蒂', [[1644, AH], [1826, BI, 'treaty.yandabo']], { r: 300 });
S('sibsagar', '锡布萨格尔（阿洪王都）', 'Sibsagar (Ahom capital)', 94.64, 26.98, '印度阿萨姆锡布萨格尔', [[1644, AH], [1826, BI, 'treaty.yandabo']], { r: 300 });
S('kathmandu', '加德满都', 'Kathmandu', 85.32, 27.70, '尼泊尔加德满都', [[1644, NP]], { r: 350 });
S('pokhara', '博卡拉', 'Pokhara', 83.99, 28.21, '尼泊尔博卡拉', [[1644, NP]], { r: 250 });
S('punakha', '普那卡', 'Punakha', 89.86, 27.60, '不丹普那卡', [[1644, BT]], { r: 220 });
S('gangtok', '哲孟雄（甘托克）', 'Sikkim (Gangtok)', 88.61, 27.33, '锡金甘托克', [[1644, SM], [1890, BI, 'treaty.sikkim']], { r: 80 });
// 缅甸 · 暹罗 · 南掌 · 安南
S('ava', '阿瓦', 'Ava', 96.08, 21.87, '缅甸曼德勒', [[1644, BU], [1886, BI, 'treaty.burma']], { r: 600, b: 20 });
S('bago', '勃固', 'Bago (Pegu)', 96.48, 17.33, '缅甸勃固', [[1644, BU], [1852, BI, 'est']], { r: 500 });
S('mrauku', '阿拉干（妙乌）', 'Arakan (Mrauk U)', 93.19, 20.59, '缅甸妙乌', [[1644, AR], [1785, BU, 'est'], [1826, BI, 'treaty.yandabo']], { r: 400 });
S('bhamo', '新街（八莫）', 'Bhamo', 97.23, 24.27, '缅甸八莫', [[1644, BU], [1886, BI, 'treaty.burma']], { r: 250 });
S('myitkyina', '孟拱 · 密支那', 'Mogaung and Myitkyina', 97.39, 25.38, '缅甸密支那', [[1644, BU], [1886, BI, 'treaty.burma']], { r: 250 });
S('hsenwi', '木邦', 'Hsenwi', 97.96, 23.30, '缅甸兴威', [[1644, BU], [1886, BI, 'treaty.burma']], { r: 250 });
S('kengtung', '孟艮', 'Kengtung', 99.60, 21.29, '缅甸景栋', [[1644, BU], [1886, BI, 'treaty.burma']], { r: 250 });
S('chiangmai', '景迈（兰纳）', 'Chiang Mai (Lan Na)', 98.99, 18.79, '泰国清迈', [[1644, BU], [1775, SI, 'est']], { r: 350 });
S('phitsanulok', '彭世洛', 'Phitsanulok', 100.26, 16.82, '泰国彭世洛', [[1644, SI]], { r: 500 });
S('luangprabang', '南掌（琅勃拉邦）', 'Lan Xang (Luang Prabang)', 102.14, 19.89, '老挝琅勃拉邦', [[1644, LA], [1893, FR, 'treaty.frsiam']], { r: 400 });
S('vientiane', '万象', 'Vientiane', 102.60, 17.97, '老挝万象', [[1644, LA], [1779, SI, 'est'], [1893, FR, 'treaty.frsiam']], { r: 400 });
const an: Hold[] = [[1644, AN], [1885, FR, 'treaty.zhongfa']];
S('thanglong', '升龙（河内）', 'Thăng Long (Hanoi)', 105.85, 21.03, '越南河内', an, { r: 400, b: 20 });
S('langson', '谅山', 'Lạng Sơn', 106.76, 21.85, '越南谅山', an, { r: 150 });
S('caobang', '高平', 'Cao Bằng', 106.25, 22.67, '越南高平', an, { r: 150 });
S('laocai', '老街', 'Lào Cai', 103.97, 22.49, '越南老街', an, { r: 200 });
S('vinh', '乂安（荣市）', 'Nghệ An (Vinh)', 105.68, 18.67, '越南荣市', an, { r: 350 });
S('hue', '顺化', 'Huế', 107.58, 16.46, '越南顺化', an, { r: 400 });
// 朝鲜 · 日本 · 琉球
const jo: Hold[] = [[1644, JO], [1910, JP, 'treaty.korea1910']];
S('hanseong', '汉城', 'Hanseong (Seoul)', 126.98, 37.57, '韩国首尔', jo, { r: 350, b: 20 });
S('pyongyang', '平壤', 'Pyongyang', 125.75, 39.03, '朝鲜平壤', jo, { r: 300 });
S('uiju', '义州', 'Uiju', 124.53, 40.20, '朝鲜新义州', jo, { r: 180 });
S('hamhung', '咸兴', 'Hamhung', 127.53, 39.92, '朝鲜咸兴', jo, { r: 300 });
S('hoeryong', '会宁', 'Hoeryong', 129.75, 42.43, '朝鲜会宁', jo, { r: 220 });
S('jeonju', '全州', 'Jeonju', 127.15, 35.82, '韩国全州', jo, { r: 300 });
S('busan', '釜山', 'Busan', 129.04, 35.10, '韩国釜山', jo, { r: 300 });
S('edo', '江户', 'Edo (Tokyo)', 139.69, 35.69, '日本东京', [[1644, JP]], { r: 450, b: 20 });
S('kyoto', '京都', 'Kyoto', 135.77, 35.01, '日本京都', [[1644, JP]], { r: 400 });
S('fukuoka', '福冈', 'Fukuoka', 130.40, 33.59, '日本福冈', [[1644, JP]], { r: 350 });
S('kagoshima', '鹿儿岛（萨摩）', 'Kagoshima (Satsuma)', 130.55, 31.60, '日本鹿儿岛', [[1644, JP]], { r: 300 });
S('kochi', '高知', 'Kochi', 133.53, 33.56, '日本高知', [[1644, JP]], { r: 300 });
S('kanazawa', '金泽', 'Kanazawa', 136.65, 36.56, '日本金泽', [[1644, JP]], { r: 350 });
S('sendai', '仙台', 'Sendai', 140.87, 38.27, '日本仙台', [[1644, JP]], { r: 400 });
S('hirosaki', '弘前', 'Hirosaki', 140.47, 40.60, '日本弘前', [[1644, JP]], { r: 300 });
S('matsumae', '松前', 'Matsumae', 140.10, 41.43, '日本松前', [[1644, JP]], { r: 100 });
S('sapporo', '虾夷地（札幌）', 'Ezo (Sapporo)', 141.35, 43.06, '日本札幌', [[1644, null], [1869, JP, 'est']], { r: 400 });
S('naha', '琉球（首里）', 'Ryukyu (Shuri)', 127.72, 26.22, '日本冲绳那霸', [[1644, RY], [1879, JP, 'qsg.shuguo']], { r: 150 });

export const QING: OwnEra = {
  replaces: 'qing',
  reach: 300,
  polities: [
    { id: NM, name: { zh: '南明', en: 'Southern Ming' }, color: '#c98b3c', role: 'rival' },
    { id: DS, name: { zh: '大顺', en: 'Shun (Li Zicheng)' }, color: '#8a9a3b', role: 'rival' },
    { id: DX, name: { zh: '大西', en: 'Xi (Zhang Xianzhong)' }, color: '#b5654a', role: 'rival' },
    { id: WZ, name: { zh: '吴周 · 三藩', en: 'Zhou of Wu Sangui and the Three Feudatories' }, color: '#c0504d', role: 'rival' },
    { id: MZ, name: { zh: '明郑（台湾）', en: 'Zheng regime (Taiwan)' }, color: '#d4a017', role: 'rival' },
    { id: NL, name: { zh: '荷兰殖民者侵占（台湾）', en: 'Dutch-occupied Taiwan' }, color: '#566573', role: 'occupied' },
    { id: ZG, name: { zh: '准噶尔', en: 'Dzungar Khanate' }, color: '#8f7d55', role: 'rival' },
    { id: HS, name: { zh: '和硕特部（青海、西藏）', en: 'Khoshut (Kokonor and Tibet)' }, color: '#a5937a', role: 'protectorate' },
    { id: KH, name: { zh: '喀尔喀蒙古', en: 'Khalkha Mongols' }, color: '#b9ac8c', role: 'neighbor' },
    { id: YK, name: { zh: '叶尔羌汗国', en: 'Yarkent Khanate' }, color: '#bdb08f', role: 'neighbor' },
    { id: TP, name: { zh: '太平天国', en: 'Taiping Heavenly Kingdom' }, color: '#d35400', role: 'rival' },
    { id: YB, name: { zh: '阿古柏（浩罕入侵者）', en: 'Yaqub Beg (Kokandi invader)' }, color: '#566573', role: 'occupied' },
    { id: RI, name: { zh: '伊犁（沙俄侵占）', en: 'Ili (Russian-occupied)' }, color: '#6c5b6e', role: 'occupied' },
    { id: 'qing_lease_de', name: { zh: '胶州湾（德国租借）', en: 'Jiaozhou Bay (German lease)' }, color: '#566573', role: 'occupied' },
    { id: 'qing_lease_ru', name: { zh: '旅大（俄国租借）', en: 'Port Arthur and Dalian (Russian lease)' }, color: '#566573', role: 'occupied' },
    { id: 'qing_lease_jp', name: { zh: '旅大（日本租借）', en: 'Port Arthur and Dalian (Japanese lease)' }, color: '#566573', role: 'occupied' },
    { id: 'qing_lease_uk', name: { zh: '威海卫（英国租借）', en: 'Weihaiwei (British lease)' }, color: '#566573', role: 'occupied' },
    { id: 'qing_lease_fr', name: { zh: '广州湾（法国租借）', en: 'Guangzhouwan (French lease)' }, color: '#566573', role: 'occupied' },
    { id: KZ, name: { zh: '哈萨克', en: 'Kazakhs' }, color: '#c2b89c', role: 'neighbor' },
    { id: KO, name: { zh: '浩罕', en: 'Kokand' }, color: '#bcae95', role: 'neighbor' },
    { id: BK, name: { zh: '布哈拉', en: 'Bukhara' }, color: '#c4b393', role: 'neighbor' },
    { id: AF, name: { zh: '阿富汗', en: 'Afghanistan' }, color: '#b9a98c', role: 'neighbor' },
    { id: PE, name: { zh: '波斯', en: 'Persia' }, color: '#c6bca4', role: 'neighbor' },
    { id: MG, name: { zh: '莫卧儿帝国', en: 'Mughal Empire' }, color: '#c3b39a', role: 'neighbor' },
    { id: SK, name: { zh: '锡克王国', en: 'Sikh Empire' }, color: '#b8a990', role: 'neighbor' },
    { id: BI, name: { zh: '英属印度', en: 'British India' }, color: '#b5bcc0', role: 'neighbor' },
    { id: AH, name: { zh: '阿洪王国（阿萨姆）', en: 'Ahom kingdom (Assam)' }, color: '#bfb59b', role: 'neighbor' },
    { id: LD, name: { zh: '拉达克', en: 'Ladakh' }, color: '#c0b6a0', role: 'neighbor' },
    { id: NP, name: { zh: '尼泊尔（廓尔喀）', en: 'Nepal (Gorkha)' }, color: '#bba98f', role: 'neighbor' },
    { id: BT, name: { zh: '不丹', en: 'Bhutan' }, color: '#c1b394', role: 'neighbor' },
    { id: SM, name: { zh: '哲孟雄（锡金）', en: 'Sikkim' }, color: '#bdb39a', role: 'neighbor' },
    { id: BU, name: { zh: '缅甸', en: 'Burma' }, color: '#bfb393', role: 'neighbor' },
    { id: AR, name: { zh: '阿拉干', en: 'Arakan' }, color: '#c4b8a0', role: 'neighbor' },
    { id: SI, name: { zh: '暹罗', en: 'Siam' }, color: '#c2bb9e', role: 'neighbor' },
    { id: LA, name: { zh: '南掌（老挝）', en: 'Lan Xang (Laos)' }, color: '#bfb89a', role: 'neighbor' },
    { id: FR, name: { zh: '法属印度支那', en: 'French Indochina' }, color: '#b3bbc2', role: 'neighbor' },
    { id: RY, name: { zh: '琉球', en: 'Ryukyu' }, color: '#c3c2a8', role: 'neighbor' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_qing_1', from: 1644, to: 1645, at: 1644, title: { zh: '清军入关，定都北京；大顺、大西与南明并存（1644年）', en: 'The Qing enter the passes and make Beijing their capital; Shun, Xi and the Southern Ming (1644)' } },
    { id: 'o_qing_2', from: 1646, to: 1661, at: 1655, title: { zh: '南明永历政权与郑成功据守西南、东南（约1655年）', en: 'The Southern Ming Yongli court and Zheng Chenggong hold out in the southwest and southeast (c. 1655)' } },
    { id: 'o_qing_3', from: 1662, to: 1673, at: 1665, title: { zh: '郑成功驱逐荷兰殖民者收复台湾（约1665年 · 1662年收复）', en: 'Zheng Chenggong drives the Dutch from Taiwan (c. 1665; the Dutch left in 1662)' } },
    { id: 'o_qing_4', from: 1674, to: 1681, at: 1675, title: { zh: '三藩之乱（1675年）', en: 'Revolt of the Three Feudatories (1675)' } },
    { id: 'o_qing_5', from: 1682, to: 1683, at: 1682, title: { zh: '平定三藩，郑氏仍据台湾（1682年 · 三藩1681年平定）', en: 'The feudatories put down; the Zheng still hold Taiwan (1682; the revolt ended in 1681)' } },
    { id: 'o_qing_6', from: 1684, to: 1690, at: 1689, title: { zh: '统一台湾，设台湾府；中俄《尼布楚条约》（1689年 · 1683年统一台湾，1684年设府）', en: 'Taiwan brought under the Qing as a prefecture; the Treaty of Nerchinsk (1689; Taiwan taken in 1683, prefecture in 1684)' } },
    { id: 'o_qing_7', from: 1691, to: 1719, at: 1700, title: { zh: '多伦会盟，喀尔喀蒙古归附（约1700年 · 会盟在1691年）', en: 'The Dolon Nor assembly: the Khalkha Mongols submit (c. 1700; the assembly was in 1691)' } },
    { id: 'o_qing_8', from: 1720, to: 1758, at: 1735, title: { zh: '驱准保藏，设驻藏大臣；平定青海（约1735年 · 1720年驱准，1724年平青海，1727年设驻藏大臣）', en: 'The Dzungars driven from Tibet, Qing ambans in Lhasa; Kokonor pacified (c. 1735; Dzungars expelled in 1720, Kokonor pacified in 1724, ambans from 1727)' } },
    { id: 'o_qing_9', from: 1759, to: 1839, at: 1790, title: { zh: '统一天山南北，清朝疆域奠定（约1790年 · 1759年统一）', en: 'North and south of the Tianshan united; the Qing realm at its height (c. 1790; united in 1759)' } },
    { id: 'o_qing_10', from: 1840, to: 1850, at: 1843, title: { zh: '鸦片战争，英国割占香港岛（1843年 · 1842年《南京条约》割让）', en: 'The Opium War: Britain takes Hong Kong Island (1843; ceded by the Treaty of Nanking in 1842)' } },
    { id: 'o_qing_11', from: 1851, to: 1857, at: 1856, title: { zh: '太平天国定都天京（1856年 · 定都在1853年）', en: 'The Taiping Heavenly Kingdom rules from Tianjing (1856; since 1853)' } },
    { id: 'o_qing_12', from: 1858, to: 1859, at: 1859, title: { zh: '中俄《瑷珲条约》：沙俄割占黑龙江以北（1859年 · 条约订于1858年）', en: 'Treaty of Aigun: Russia takes the land north of the Amur (1859; treaty of 1858)' } },
    { id: 'o_qing_13', from: 1860, to: 1863, at: 1862, title: { zh: '中俄《北京条约》：沙俄割占乌苏里江以东；太平军转战苏浙（1862年 · 条约订于1860年）', en: 'Treaty of Peking: Russia takes the land east of the Ussuri; the Taiping in Jiangsu and Zhejiang (1862; treaty of 1860)' } },
    { id: 'o_qing_14', from: 1864, to: 1875, at: 1872, title: { zh: '《勘分西北界约记》割地；阿古柏入侵新疆，沙俄侵占伊犁（约1872年 · 1864年约记，1865年阿古柏入侵，1871年沙俄占伊犁）', en: 'The northwest ceded by the Tarbagatai protocol; Yaqub Beg invades Xinjiang, Russia occupies Ili (c. 1872; protocol of 1864, Yaqub Beg from 1865, Ili occupied in 1871)' } },
    { id: 'o_qing_15', from: 1876, to: 1881, at: 1878, title: { zh: '左宗棠收复新疆（1878年）', en: 'Zuo Zongtang recovers Xinjiang (1878)' } },
    { id: 'o_qing_16', from: 1882, to: 1894, at: 1890, title: { zh: '收回伊犁，新疆建省；中法战争之后（约1890年 · 1881年《伊犁条约》，1884年建省）', en: 'Ili recovered and Xinjiang made a province; after the Sino-French War (c. 1890; Treaty of Saint Petersburg 1881, province from 1884)' } },
    { id: 'o_qing_17', from: 1895, to: 1897, at: 1895, title: { zh: '《马关条约》：日本割占台湾、澎湖（1895年）', en: 'Treaty of Shimonoseki: Japan takes Taiwan and Penghu (1895)' } },
    { id: 'o_qing_18', from: 1898, to: 1912, at: 1910, title: { zh: '列强强租港湾，清朝末年（1910年）', en: 'The powers lease Chinese ports; the last years of the Qing (1910)' } },
  ],
  sources: {
    'qsg.shizu': { zh: '《清史稿·世祖本纪》', en: 'Draft History of Qing, Annals of the Shunzhi Emperor' },
    'qsg.shengzu': { zh: '《清史稿·圣祖本纪》', en: 'Draft History of Qing, Annals of the Kangxi Emperor' },
    'qsg.shizong': { zh: '《清史稿·世宗本纪》', en: 'Draft History of Qing, Annals of the Yongzheng Emperor' },
    'qsg.gaozong': { zh: '《清史稿·高宗本纪》', en: 'Draft History of Qing, Annals of the Qianlong Emperor' },
    'qsg.wenzong': { zh: '《清史稿·文宗本纪》', en: 'Draft History of Qing, Annals of the Xianfeng Emperor' },
    'qsg.muzong': { zh: '《清史稿·穆宗本纪》', en: 'Draft History of Qing, Annals of the Tongzhi Emperor' },
    'qsg.dezong': { zh: '《清史稿·德宗本纪》', en: 'Draft History of Qing, Annals of the Guangxu Emperor' },
    'qsg.fanbu': { zh: '《清史稿·藩部传》', en: 'Draft History of Qing, Accounts of the Outer Dependencies' },
    'qsg.shuguo': { zh: '《清史稿·属国传》', en: 'Draft History of Qing, Accounts of the Tributary States' },
    'qsg.bangjiao': { zh: '《清史稿·邦交志》', en: 'Draft History of Qing, Treatise on Foreign Relations' },
    'qsg.wusangui': { zh: '《清史稿·吴三桂传》', en: 'Draft History of Qing, Biography of Wu Sangui' },
    'qsg.zcg': { zh: '《清史稿·郑成功传》', en: 'Draft History of Qing, Biography of Zheng Chenggong' },
    'qsg.hongxiuquan': { zh: '《清史稿·洪秀全传》', en: 'Draft History of Qing, Biography of Hong Xiuquan' },
    'qsg.zuozongtang': { zh: '《清史稿·左宗棠传》', en: 'Draft History of Qing, Biography of Zuo Zongtang' },
    'mingshi.lzc': { zh: '《明史·流贼传》', en: 'History of Ming, Accounts of the Roving Bandits (Li Zicheng, Zhang Xianzhong)' },
    'treaty.nerchinsk': { zh: '中俄《尼布楚条约》（1689）', en: 'Treaty of Nerchinsk (1689)' },
    'treaty.kyakhta': { zh: '中俄《布连斯奇条约》《恰克图条约》（1727）', en: 'Treaties of Bura and Kyakhta (1727)' },
    'treaty.nanjing': { zh: '中英《南京条约》（1842）', en: 'Treaty of Nanking (1842)' },
    'treaty.aihui': { zh: '中俄《瑷珲条约》（1858）', en: 'Treaty of Aigun (1858)' },
    'treaty.beijing.ru': { zh: '中俄《北京条约》（1860）', en: 'Sino-Russian Treaty of Peking (1860)' },
    'treaty.beijing.uk': { zh: '中英《北京条约》（1860）', en: 'Sino-British Convention of Peking (1860)' },
    'treaty.kanfen': { zh: '中俄《勘分西北界约记》（1864）', en: 'Protocol of Chuguchak on the northwestern boundary (1864)' },
    'treaty.ili': { zh: '中俄《伊犁条约》（1881）', en: 'Treaty of Saint Petersburg on Ili (1881)' },
    'treaty.zhongfa': { zh: '中法《越南条款》（中法新约，1885）', en: 'Sino-French Treaty of Tientsin (1885)' },
    'treaty.burma': { zh: '中英《缅甸条款》（1886）', en: 'Sino-British Burma Convention (1886)' },
    'treaty.lisbon': { zh: '中葡《和好通商条约》（1887）', en: 'Sino-Portuguese Treaty of Peking (1887)' },
    'treaty.sikkim': { zh: '中英《藏印条约》（1890）', en: 'Anglo-Chinese Convention on Sikkim and Tibet (1890)' },
    'treaty.frsiam': { zh: '法暹条约（1893）', en: 'Franco-Siamese Treaty (1893)' },
    'treaty.shimonoseki': { zh: '中日《马关条约》（1895）', en: 'Treaty of Shimonoseki (1895)' },
    'treaty.jiaoao': { zh: '中德《胶澳租界条约》（1898）', en: 'Sino-German Kiautschou Lease Convention (1898)' },
    'treaty.luda': { zh: '中俄《旅大租地条约》（1898）', en: 'Sino-Russian Convention on Port Arthur and Dalian (1898)' },
    'treaty.weihai': { zh: '中英《订租威海卫专条》（1898）', en: 'Convention for the Lease of Weihaiwei (1898)' },
    'treaty.hk1898': { zh: '中英《展拓香港界址专条》（1898）', en: 'Convention for the Extension of Hong Kong Territory (1898)' },
    'treaty.gzw': { zh: '中法《广州湾租界条约》（1899）', en: 'Sino-French Convention on Guangzhouwan (1899)' },
    'treaty.portsmouth': { zh: '日俄《朴茨茅斯和约》（1905）', en: 'Treaty of Portsmouth (1905)' },
    'treaty.korea1910': { zh: '《日韩合并条约》（1910）', en: 'Japan–Korea Annexation Treaty (1910)' },
    'treaty.amritsar': { zh: '英国与查谟土邦《阿姆利则条约》（1846）', en: 'Treaty of Amritsar (1846)' },
    'treaty.yandabo': { zh: '英缅《杨达波条约》（1826）', en: 'Treaty of Yandabo (1826)' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
