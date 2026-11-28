import type { Hold, OwnEra, Seat } from './types.ts';

/**
 * 北宋 (960–1127): seats and holdings for our own Northern Song maps, with 辽, 西夏 and the other neighbours. Seats are
 * the 州 / 府 / 军 seats of 《宋史·地理志》 and 《元丰九域志》, the 辽 五京 and 州 of 《辽史·地理志》, the 西夏 capitals
 * and 监军司 of 《宋史·夏国传》, and one or a few large-reach centres for each neighbouring people, at their modern sites.
 * Each holding change cites the chapter that records it (`est` marks a date we infer). The seat list is shared with the
 * Southern Song maps (nansong.ts).
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

/** 宋 prefectures (Song names; a few seats only appear when the Song set them up, see the holdings). */
export const SONG_SEATS: Seat[] = [
  // 京畿、京东
  S('kaifeng', '东京开封府', 'Kaifeng', 114.35, 34.80, '河南开封', { b: 40 }),
  S('yingtian', '应天府（宋州）', 'Yingtian (Songzhou)', 115.65, 34.42, '河南商丘'),
  S('caozhou', '曹州', 'Caozhou', 115.48, 35.25, '山东菏泽'),
  S('danzhou', '单州', 'Shanzhou', 116.08, 34.80, '山东单县'),
  S('jizhou_jy', '济州', 'Jizhou', 116.10, 35.40, '山东巨野'),
  S('yunzhou', '郓州（东平府）', 'Yunzhou (Dongping)', 116.30, 35.92, '山东东平'),
  S('puzhou_sd', '濮州', 'Puzhou', 115.58, 35.68, '山东鄄城北'),
  S('yanzhou', '兖州（袭庆府）', 'Yanzhou', 116.83, 35.55, '山东兖州'),
  S('xuzhou', '徐州', 'Xuzhou', 117.18, 34.26, '江苏徐州'),
  S('yizhou_ly', '沂州', 'Yizhou', 118.35, 35.05, '山东临沂'),
  S('mizhou', '密州', 'Mizhou', 119.40, 36.00, '山东诸城'),
  S('qingzhou', '青州', 'Qingzhou', 118.47, 36.70, '山东青州'),
  S('weizhou_wf', '潍州', 'Weizhou', 119.10, 36.70, '山东潍坊'),
  S('laizhou', '莱州', 'Laizhou', 119.93, 37.18, '山东莱州'),
  S('dengzhou_pl', '登州', 'Dengzhou', 120.75, 37.80, '山东蓬莱'),
  S('zizhou', '淄州', 'Zizhou', 117.97, 36.65, '山东淄博淄川'),
  S('qizhou_jn', '齐州（济南府）', 'Qizhou (Jinan)', 117.00, 36.67, '山东济南'),
  S('huaiyang_jun', '淮阳军', 'Huaiyang Army', 117.95, 34.32, '江苏邳州（下邳）'),
  // 京西
  S('henan', '西京河南府', 'Luoyang (Henan)', 112.45, 34.68, '河南洛阳', { b: 15 }),
  S('zhengzhou', '郑州', 'Zhengzhou', 113.65, 34.75, '河南郑州'),
  S('huazhou_hx', '滑州', 'Huazhou', 114.65, 35.57, '河南滑县'),
  S('mengzhou', '孟州', 'Mengzhou', 112.78, 34.90, '河南孟州'),
  S('xuzhou_xc', '许州（颍昌府）', 'Xuzhou (Yingchang)', 113.85, 34.03, '河南许昌'),
  S('chenzhou', '陈州', 'Chenzhou', 114.88, 33.73, '河南淮阳'),
  S('caizhou', '蔡州', 'Caizhou', 114.03, 32.98, '河南汝南'),
  S('yingzhou_fy', '颍州', 'Yingzhou', 115.80, 32.90, '安徽阜阳'),
  S('ruzhou', '汝州', 'Ruzhou', 112.83, 34.17, '河南汝州'),
  S('tangzhou', '唐州', 'Tangzhou', 112.82, 32.68, '河南唐河'),
  S('dengzhou_dz', '邓州', 'Dengzhou', 112.08, 32.68, '河南邓州'),
  S('xiangzhou', '襄州（襄阳府）', 'Xiangzhou (Xiangyang)', 112.13, 32.02, '湖北襄阳'),
  S('junzhou', '均州', 'Junzhou', 111.50, 32.55, '湖北丹江口'),
  S('fangzhou', '房州', 'Fangzhou', 110.73, 32.05, '湖北房县'),
  S('suizhou', '随州', 'Suizhou', 113.37, 31.72, '湖北随州'),
  S('yingzhou_zx', '郢州', 'Yingzhou', 112.57, 31.17, '湖北钟祥'),
  S('jinzhou_ak', '金州', 'Jinzhou', 109.02, 32.68, '陕西安康'),
  S('xinyang', '信阳军', 'Xinyang Army', 114.07, 32.13, '河南信阳'),
  S('guangzhou_hc', '光州', 'Guangzhou', 115.05, 32.13, '河南潢川'),
  S('bozhou', '亳州', 'Bozhou', 115.78, 33.85, '安徽亳州'),
  S('xizhou_xx', '息州', 'Xizhou', 114.73, 32.35, '河南息县'),
  // 河北
  S('daming', '北京大名府', 'Daming', 115.20, 36.30, '河北大名东'),
  S('chanzhou', '澶州（开德府）', 'Chanzhou (Kaide)', 115.03, 35.76, '河南濮阳'),
  S('weizhou_wh', '卫州', 'Weizhou', 114.07, 35.40, '河南卫辉'),
  S('xiangzhou_ay', '相州', 'Xiangzhou', 114.35, 36.10, '河南安阳'),
  S('cizhou', '磁州', 'Cizhou', 114.37, 36.37, '河北磁县'),
  S('mingzhou', '洺州', 'Mingzhou', 114.75, 36.73, '河北永年'),
  S('xingzhou', '邢州（信德府）', 'Xingzhou', 114.50, 37.07, '河北邢台'),
  S('zhaozhou', '赵州', 'Zhaozhou', 114.77, 37.75, '河北赵县'),
  S('zhending', '真定府', 'Zhending', 114.57, 38.15, '河北正定'),
  S('dingzhou', '定州（中山府）', 'Dingzhou (Zhongshan)', 115.00, 38.52, '河北定州'),
  S('qizhou_aq', '祁州', 'Qizhou', 115.32, 38.42, '河北安国'),
  S('baozhou', '保州', 'Baozhou', 115.47, 38.87, '河北保定'),
  S('anshu', '安肃军', 'Anshu Army', 115.65, 39.02, '河北徐水'),
  S('guangxin', '广信军', 'Guangxin Army', 115.40, 39.10, '河北徐水遂城'),
  S('xiongzhou', '雄州', 'Xiongzhou', 116.10, 38.99, '河北雄县', { r: 120 }),
  S('bazhou', '霸州', 'Bazhou', 116.40, 39.10, '河北霸州', { r: 120 }),
  S('xinan', '信安军', 'Xin’an Army', 116.65, 39.05, '河北霸州信安镇', { r: 120 }),
  S('mozhou', '莫州', 'Mozhou', 116.10, 38.72, '河北任丘北'),
  S('shunan', '顺安军', 'Shun’an Army', 115.78, 38.70, '河北高阳'),
  S('yingzhou_hj', '瀛州（河间府）', 'Yingzhou (Hejian)', 116.10, 38.45, '河北河间'),
  S('qianning', '乾宁军（清州）', 'Qianning Army (Qingzhou)', 116.82, 38.58, '河北青县', { r: 120 }),
  S('cangzhou', '沧州', 'Cangzhou', 116.87, 38.30, '河北沧州东南'),
  S('shenzhou', '深州', 'Shenzhou', 115.55, 38.00, '河北深州'),
  S('jizhou_hb', '冀州', 'Jizhou', 115.57, 37.55, '河北冀州'),
  S('enzhou', '恩州（贝州）', 'Enzhou (Beizhou)', 115.90, 37.10, '河北清河'),
  S('bozhou_lc', '博州', 'Bozhou', 115.98, 36.45, '山东聊城'),
  S('dezhou', '德州', 'Dezhou', 116.30, 37.45, '山东德州'),
  S('dizhou', '棣州', 'Dizhou', 117.70, 37.48, '山东惠民'),
  S('binzhou', '滨州', 'Binzhou', 118.00, 37.38, '山东滨州'),
  S('huaizhou', '怀州', 'Huaizhou', 112.93, 35.10, '河南沁阳'),
  // 河东
  S('taiyuan', '太原府（并州）', 'Taiyuan (Bingzhou)', 112.55, 37.85, '山西太原', { b: 20 }),
  S('xinzhou', '忻州', 'Xinzhou', 112.73, 38.42, '山西忻州'),
  S('daizhou', '代州', 'Daizhou', 112.95, 39.07, '山西代县', { r: 160 }),
  S('ninghua', '宁化军', 'Ninghua Army', 112.00, 38.80, '山西宁武西南', { r: 140 }),
  S('kelan', '岢岚军', 'Kelan Army', 111.57, 38.70, '山西岢岚', { r: 140 }),
  S('huoshan', '火山军', 'Huoshan Army', 111.20, 39.20, '山西河曲', { r: 140 }),
  S('fuzhou_fg', '府州', 'Fuzhou', 111.08, 39.03, '陕西府谷', { r: 150 }),
  S('linzhou', '麟州', 'Linzhou', 110.48, 38.95, '陕西神木北', { r: 150 }),
  S('lanzhou_lx', '岚州', 'Lanzhou', 111.67, 38.28, '山西岚县'),
  S('xianzhou', '宪州', 'Xianzhou', 111.93, 38.37, '山西静乐'),
  S('shizhou', '石州', 'Shizhou', 111.13, 37.52, '山西吕梁离石'),
  S('fenzhou', '汾州', 'Fenzhou', 111.78, 37.27, '山西汾阳'),
  S('liaozhou_zq', '辽州', 'Liaozhou', 113.00, 37.07, '山西左权'),
  S('pingding', '平定军', 'Pingding Army', 113.62, 37.80, '山西平定'),
  S('weisheng', '威胜军（沁州）', 'Weisheng Army (Qinzhou)', 112.70, 36.75, '山西沁县'),
  S('luzhou', '潞州（隆德府）', 'Luzhou (Longde)', 113.10, 36.20, '山西长治'),
  S('zezhou', '泽州', 'Zezhou', 112.85, 35.50, '山西晋城'),
  S('jinzhou_lf', '晋州（平阳府）', 'Jinzhou (Pingyang)', 111.52, 36.08, '山西临汾'),
  S('jiangzhou_xj', '绛州', 'Jiangzhou', 111.20, 35.62, '山西新绛'),
  S('xizhou_sx', '隰州', 'Xizhou', 110.93, 36.70, '山西隰县'),
  S('cizhou_jx', '慈州', 'Cizhou', 110.68, 36.10, '山西吉县'),
  S('hezhong', '河中府（蒲州）', 'Hezhong (Puzhou)', 110.33, 34.83, '山西永济蒲州'),
  S('jiezhou', '解州', 'Xiezhou', 110.98, 35.03, '山西运城解州'),
  S('jinning', '晋宁军（葭芦寨）', 'Jinning Army (Jialu)', 110.48, 38.02, '陕西佳县', { r: 140 }),
  // 陕西：永兴军、鄜延、环庆
  S('jingzhao', '京兆府', 'Jingzhao (Chang’an)', 108.94, 34.27, '陕西西安', { b: 15 }),
  S('huazhou_hz', '华州', 'Huazhou', 109.77, 34.51, '陕西华州'),
  S('tongzhou', '同州', 'Tongzhou', 109.95, 34.80, '陕西大荔'),
  S('yaozhou', '耀州', 'Yaozhou', 108.98, 34.92, '陕西耀州'),
  S('binzhou_bx', '邠州', 'Binzhou', 108.08, 35.03, '陕西彬州'),
  S('qianzhou', '乾州（醴州）', 'Qianzhou', 108.23, 34.53, '陕西乾县'),
  S('fangzhou_hl', '坊州', 'Fangzhou', 109.25, 35.58, '陕西黄陵'),
  S('fuzhou_fx', '鄜州', 'Fuzhou', 109.37, 36.00, '陕西富县'),
  S('danzhou_yc', '丹州', 'Danzhou', 110.17, 36.05, '陕西宜川'),
  S('yanzhou_ya', '延州（延安府）', 'Yanzhou (Yan’an)', 109.49, 36.60, '陕西延安', { r: 160 }),
  S('baoan', '保安军', 'Bao’an Army', 108.77, 36.82, '陕西志丹', { r: 130 }),
  S('qingjian', '清涧城', 'Qingjian', 110.12, 37.08, '陕西清涧', { r: 130 }),
  S('suizhou_sd', '绥州（绥德军）', 'Suizhou (Suide)', 110.25, 37.50, '陕西绥德', { r: 140 }),
  S('mizhi', '米脂寨', 'Mizhi', 110.18, 37.75, '陕西米脂', { r: 120 }),
  S('ningzhou', '宁州', 'Ningzhou', 107.92, 35.50, '甘肃宁县'),
  S('qingzhou_qy', '庆州（庆阳府）', 'Qingzhou (Qingyang)', 107.65, 36.03, '甘肃庆阳', { r: 160 }),
  S('huanzhou', '环州', 'Huanzhou', 107.30, 36.58, '甘肃环县', { r: 140 }),
  S('dingbian', '定边军', 'Dingbian Army', 107.95, 36.95, '陕西吴起西北', { r: 120 }),
  // 陕西：泾原、秦凤、熙河
  S('fengxiang', '凤翔府', 'Fengxiang', 107.40, 34.52, '陕西凤翔'),
  S('longzhou', '陇州', 'Longzhou', 106.85, 34.90, '陕西陇县'),
  S('jingzhou_jc', '泾州', 'Jingzhou', 107.37, 35.33, '甘肃泾川'),
  S('weizhou_pl', '渭州（平凉府）', 'Weizhou (Pingliang)', 106.67, 35.55, '甘肃平凉'),
  S('yuanzhou', '原州', 'Yuanzhou', 107.20, 35.68, '甘肃镇原'),
  S('zhenrong', '镇戎军', 'Zhenrong Army', 106.28, 36.00, '宁夏固原', { r: 150 }),
  S('huaide', '怀德军（平夏城）', 'Huaide Army (Pingxia)', 106.15, 36.35, '宁夏固原北', { r: 120 }),
  S('xian_zhou', '西安州', 'Xi’anzhou', 105.55, 36.55, '宁夏海原西', { r: 140 }),
  S('huizhou_jy', '会州', 'Huizhou', 104.68, 36.57, '甘肃靖远', { r: 150 }),
  S('deshun', '德顺军', 'Deshun Army', 105.73, 35.52, '甘肃静宁', { r: 140 }),
  S('qinzhou_ts', '秦州', 'Qinzhou', 105.72, 34.58, '甘肃天水'),
  S('tongyuan', '通远军（巩州）', 'Tongyuan Army (Gongzhou)', 104.63, 35.00, '甘肃陇西', { r: 150 }),
  S('xizhou_lt', '熙州（临洮府）', 'Xizhou (Lintao)', 103.85, 35.38, '甘肃临洮', { r: 160 }),
  S('hezhou_lx', '河州', 'Hezhou', 103.20, 35.60, '甘肃临夏', { r: 160 }),
  S('lanzhou', '兰州', 'Lanzhou', 103.83, 36.06, '甘肃兰州', { r: 160 }),
  S('minzhou', '岷州', 'Minzhou', 104.03, 34.43, '甘肃岷县', { r: 150 }),
  S('taozhou', '洮州', 'Taozhou', 103.35, 34.70, '甘肃临潭', { r: 160 }),
  S('diezhou', '叠州', 'Diezhou', 103.20, 34.07, '甘肃迭部', { r: 140 }),
  S('dangzhou', '宕州', 'Dangzhou', 104.35, 34.03, '甘肃宕昌', { r: 130 }),
  S('huangzhou', '湟州（邈川）', 'Huangzhou (Miaochuan)', 102.40, 36.48, '青海乐都', { r: 180 }),
  S('xining', '鄯州（西宁州，青唐城）', 'Shanzhou (Xining, Qingtang)', 101.78, 36.62, '青海西宁', { r: 400 }),
  S('kuozhou', '廓州', 'Kuozhou', 101.95, 35.92, '青海尖扎北', { r: 160 }),
  S('jishi', '积石军', 'Jishi Army', 101.43, 36.03, '青海贵德', { r: 180 }),
  S('zhenwu', '震武军（古骨龙）', 'Zhenwu Army (Gugulong)', 101.85, 37.25, '青海门源南', { r: 160 }),
  S('fengzhou_fx', '凤州', 'Fengzhou', 106.50, 33.92, '陕西凤县'),
  S('chengzhou', '成州（同庆府）', 'Chengzhou', 105.72, 33.73, '甘肃成县'),
  S('jiezhou_wd', '阶州', 'Jiezhou', 104.92, 33.40, '甘肃陇南武都'),
  S('shangzhou', '商州', 'Shangzhou', 109.93, 33.87, '陕西商洛'),
  S('guozhou', '虢州', 'Guozhou', 110.85, 34.52, '河南灵宝'),
  S('shanzhou', '陕州', 'Shanzhou', 111.20, 34.77, '河南三门峡'),
  // 利州路、成都府路、梓州路、夔州路
  S('xingyuan', '兴元府', 'Xingyuan (Hanzhong)', 107.03, 33.07, '陕西汉中'),
  S('yangzhou_yx', '洋州', 'Yangzhou', 107.55, 33.22, '陕西洋县'),
  S('xingzhou_ly', '兴州（沔州）', 'Xingzhou (Mianzhou)', 106.15, 33.33, '陕西略阳'),
  S('wenzhou_wx', '文州', 'Wenzhou', 104.68, 32.95, '甘肃文县', { r: 160 }),
  S('lizhou', '利州', 'Lizhou', 105.83, 32.43, '四川广元'),
  S('jianzhou', '剑州', 'Jianzhou', 105.52, 32.03, '四川剑阁'),
  S('longzhou_pw', '龙州', 'Longzhou', 104.53, 32.42, '四川平武', { r: 160 }),
  S('langzhou', '阆州', 'Langzhou', 105.97, 31.58, '四川阆中'),
  S('bazhou_bz', '巴州', 'Bazhou', 106.75, 31.85, '四川巴中'),
  S('pengzhou_yl', '蓬州', 'Pengzhou', 106.40, 31.40, '四川仪陇东南'),
  S('chengdu', '成都府（益州）', 'Chengdu (Yizhou)', 104.07, 30.67, '四川成都', { b: 20 }),
  S('hanzhou', '汉州', 'Hanzhou', 104.27, 30.98, '四川广汉'),
  S('pengzhou', '彭州', 'Pengzhou', 103.95, 30.98, '四川彭州'),
  S('shuzhou', '蜀州', 'Shuzhou', 103.67, 30.63, '四川崇州'),
  S('qiongzhou', '邛州', 'Qiongzhou', 103.47, 30.42, '四川邛崃'),
  S('meizhou', '眉州', 'Meizhou', 103.83, 30.05, '四川眉山'),
  S('jiazhou', '嘉州（嘉定府）', 'Jiazhou (Jiading)', 103.77, 29.57, '四川乐山'),
  S('yazhou', '雅州', 'Yazhou', 103.00, 29.98, '四川雅安', { r: 160 }),
  S('lizhou_hy', '黎州', 'Lizhou', 102.65, 29.40, '四川汉源', { r: 150 }),
  S('maozhou', '茂州', 'Maozhou', 103.85, 31.68, '四川茂县', { r: 160 }),
  S('weizhou_wc', '威州', 'Weizhou', 103.58, 31.47, '四川汶川（理县东）', { r: 150 }),
  S('yongkang', '永康军', 'Yongkang Army', 103.62, 31.00, '四川都江堰'),
  S('jianzhou_jy', '简州', 'Jianzhou', 104.55, 30.40, '四川简阳'),
  S('lingzhou_rs', '陵州（仙井监）', 'Lingzhou', 104.13, 30.00, '四川仁寿'),
  S('mianzhou', '绵州', 'Mianzhou', 104.73, 31.47, '四川绵阳'),
  S('zizhou_st', '梓州（潼川府）', 'Zizhou (Tongchuan)', 105.08, 31.10, '四川三台'),
  S('suizhou_sn', '遂州（遂宁府）', 'Suizhou (Suining)', 105.58, 30.52, '四川遂宁'),
  S('guozhou_nc', '果州（顺庆府）', 'Guozhou (Shunqing)', 106.08, 30.80, '四川南充'),
  S('hezhou_hc', '合州', 'Hezhou', 106.27, 29.98, '重庆合川'),
  S('quzhou_qx', '渠州', 'Quzhou', 106.97, 30.83, '四川渠县'),
  S('guangan', '广安军', 'Guang’an Army', 106.63, 30.47, '四川广安'),
  S('zizhou_zz', '资州', 'Zizhou', 104.65, 29.78, '四川资中'),
  S('puzhou_ay', '普州', 'Puzhou', 105.33, 30.10, '四川安岳'),
  S('rongzhou', '荣州', 'Rongzhou', 104.42, 29.45, '四川荣县'),
  S('changzhou_dz', '昌州', 'Changzhou', 105.72, 29.70, '重庆大足'),
  S('luzhou_lz', '泸州', 'Luzhou', 105.43, 28.88, '四川泸州', { r: 180 }),
  S('rongzhou_yb', '戎州（叙州）', 'Rongzhou (Xuzhou)', 104.63, 28.77, '四川宜宾', { r: 180 }),
  S('yuzhou', '渝州（恭州、重庆府）', 'Yuzhou (Chongqing)', 106.55, 29.56, '重庆'),
  S('nanping', '南平军', 'Nanping Army', 106.65, 29.00, '重庆綦江', { r: 160 }),
  S('fuzhou_fl', '涪州', 'Fuzhou', 107.38, 29.70, '重庆涪陵'),
  S('zhongzhou', '忠州', 'Zhongzhou', 108.03, 30.30, '重庆忠县'),
  S('wanzhou', '万州', 'Wanzhou', 108.40, 30.80, '重庆万州'),
  S('kaizhou', '开州', 'Kaizhou', 108.40, 31.18, '重庆开州'),
  S('dazhou', '达州', 'Dazhou', 107.50, 31.22, '四川达州'),
  S('kuizhou', '夔州', 'Kuizhou', 109.47, 31.02, '重庆奉节'),
  S('qianzhou_ps', '黔州（绍庆府）', 'Qianzhou (Shaoqing)', 108.17, 29.30, '重庆彭水', { r: 200 }),
  S('shizhou_es', '施州', 'Shizhou', 109.48, 30.30, '湖北恩施', { r: 180 }),
  S('bozhou_zy', '播州（遵义军）', 'Bozhou (Zunyi)', 106.92, 27.72, '贵州遵义', { r: 200 }),
  S('sizhou', '思州', 'Sizhou', 108.10, 28.50, '贵州务川', { r: 200 }),
  // 荆湖、京西南
  S('jiangling', '江陵府', 'Jiangling', 112.18, 30.35, '湖北荆州', { b: 10 }),
  S('xiazhou_yc', '峡州', 'Xiazhou', 111.28, 30.70, '湖北宜昌'),
  S('guizhou_zg', '归州', 'Guizhou', 110.98, 30.83, '湖北秭归'),
  S('jingmen', '荆门军', 'Jingmen Army', 112.20, 31.03, '湖北荆门'),
  S('fuzhou_tm', '复州', 'Fuzhou', 113.15, 30.65, '湖北天门'),
  S('anzhou', '安州（德安府）', 'Anzhou (De’an)', 113.68, 31.27, '湖北安陆'),
  S('ezhou', '鄂州', 'Ezhou', 114.30, 30.55, '湖北武汉武昌'),
  S('huangzhou_hg', '黄州', 'Huangzhou', 114.88, 30.45, '湖北黄冈'),
  S('qizhou_qc', '蕲州', 'Qizhou', 115.33, 30.23, '湖北蕲春'),
  S('yuezhou', '岳州', 'Yuezhou', 113.10, 29.37, '湖南岳阳'),
  S('tanzhou', '潭州', 'Tanzhou', 112.94, 28.23, '湖南长沙', { b: 10 }),
  S('hengzhou', '衡州', 'Hengzhou', 112.60, 26.90, '湖南衡阳'),
  S('yongzhou', '永州', 'Yongzhou', 111.60, 26.43, '湖南永州'),
  S('daozhou', '道州', 'Daozhou', 111.60, 25.53, '湖南道县'),
  S('chenzhou_cz', '郴州', 'Chenzhou', 113.02, 25.78, '湖南郴州'),
  S('shaozhou', '邵州（宝庆府）', 'Shaozhou (Baoqing)', 111.47, 27.24, '湖南邵阳'),
  S('quanzhou_qz', '全州', 'Quanzhou', 111.07, 25.93, '广西全州'),
  S('langzhou_cd', '朗州（鼎州、常德府）', 'Langzhou (Dingzhou, Changde)', 111.68, 29.03, '湖南常德'),
  S('lizhou_lx', '澧州', 'Lizhou', 111.75, 29.63, '湖南澧县'),
  S('chenzhou_yl', '辰州', 'Chenzhou', 110.39, 28.47, '湖南沅陵', { r: 200 }),
  S('yuanzhou_zj', '沅州', 'Yuanzhou', 109.68, 27.45, '湖南芷江', { r: 180 }),
  S('jingzhou_jz', '诚州（靖州）', 'Chengzhou (Jingzhou)', 109.68, 26.58, '湖南靖州', { r: 180 }),
  S('xinhua', '新化（梅山）', 'Xinhua (Meishan)', 111.30, 27.73, '湖南新化'),
  S('wugang', '武冈军', 'Wugang Army', 110.63, 26.73, '湖南武冈'),
  // 淮南
  S('yangzhou', '扬州', 'Yangzhou', 119.43, 32.40, '江苏扬州'),
  S('chuzhou_ha', '楚州', 'Chuzhou', 119.15, 33.50, '江苏淮安'),
  S('lianshui', '涟水军', 'Lianshui Army', 119.27, 33.78, '江苏涟水'),
  S('haizhou', '海州', 'Haizhou', 119.15, 34.58, '江苏连云港海州'),
  S('sizhou_xy', '泗州', 'Sizhou', 118.50, 33.05, '江苏盱眙对岸（泗州城遗址）'),
  S('xuyi', '盱眙军', 'Xuyi Army', 118.55, 32.98, '江苏盱眙'),
  S('suzhou_ah', '宿州', 'Suzhou', 116.98, 33.63, '安徽宿州'),
  S('haozhou', '濠州', 'Haozhou', 117.55, 32.87, '安徽凤阳'),
  S('shouzhou', '寿州（寿春府、安丰军）', 'Shouzhou (Shouchun)', 116.78, 32.57, '安徽寿县'),
  S('luzhou_hf', '庐州', 'Luzhou', 117.27, 31.86, '安徽合肥'),
  S('shuzhou_qs', '舒州', 'Shuzhou', 116.57, 30.63, '安徽潜山'),
  S('hezhou_hx', '和州', 'Hezhou', 118.35, 31.72, '安徽和县'),
  S('chuzhou_cz', '滁州', 'Chuzhou', 118.30, 32.30, '安徽滁州'),
  S('zhenzhou', '真州', 'Zhenzhou', 119.18, 32.27, '江苏仪征'),
  S('taizhou_tz', '泰州', 'Taizhou', 119.92, 32.48, '江苏泰州'),
  S('tongzhou_nt', '通州', 'Tongzhou', 120.87, 32.00, '江苏南通'),
  S('wuwei', '无为军', 'Wuwei Army', 117.90, 31.30, '安徽无为'),
  S('gaoyou', '高邮军', 'Gaoyou Army', 119.45, 32.78, '江苏高邮'),
  // 江南、两浙
  S('jiangning', '江宁府（建康府）', 'Jiangning (Jiankang)', 118.78, 32.05, '江苏南京', { b: 20 }),
  S('runzhou', '润州（镇江府）', 'Runzhou (Zhenjiang)', 119.45, 32.20, '江苏镇江'),
  S('changzhou', '常州', 'Changzhou', 119.95, 31.78, '江苏常州'),
  S('xuanzhou', '宣州（宁国府）', 'Xuanzhou (Ningguo)', 118.75, 30.95, '安徽宣城'),
  S('taiping', '太平州', 'Taipingzhou', 118.50, 31.55, '安徽当涂'),
  S('guangde', '广德军', 'Guangde Army', 119.42, 30.90, '安徽广德'),
  S('shezhou', '歙州（徽州）', 'Shezhou (Huizhou)', 118.43, 29.87, '安徽歙县'),
  S('chizhou', '池州', 'Chizhou', 117.48, 30.65, '安徽池州'),
  S('jiangzhou_jj', '江州', 'Jiangzhou', 116.00, 29.71, '江西九江'),
  S('nankang', '南康军', 'Nankang Army', 116.05, 29.45, '江西庐山星子'),
  S('raozhou', '饶州', 'Raozhou', 116.68, 29.00, '江西鄱阳'),
  S('xinzhou_sr', '信州', 'Xinzhou', 117.95, 28.45, '江西上饶'),
  S('hongzhou', '洪州（隆兴府）', 'Hongzhou (Longxing)', 115.89, 28.68, '江西南昌'),
  S('yunzhou_ga', '筠州（瑞州）', 'Yunzhou', 115.38, 28.42, '江西高安'),
  S('yuanzhou_yc', '袁州', 'Yuanzhou', 114.38, 27.80, '江西宜春'),
  S('linjiang', '临江军', 'Linjiang Army', 115.53, 28.05, '江西樟树'),
  S('fuzhou_jx', '抚州', 'Fuzhou', 116.35, 27.95, '江西抚州'),
  S('jianchang', '建昌军', 'Jianchang Army', 116.63, 27.55, '江西南城'),
  S('jizhou_ja', '吉州', 'Jizhou', 114.98, 27.12, '江西吉安'),
  S('qianzhou_gz', '虔州（赣州）', 'Qianzhou (Ganzhou)', 114.93, 25.85, '江西赣州'),
  S('nanan', '南安军', 'Nan’an Army', 114.35, 25.40, '江西大余'),
  S('hangzhou', '杭州（临安府）', 'Hangzhou (Lin’an)', 120.16, 30.27, '浙江杭州', { b: 20 }),
  S('yuezhou_sx', '越州（绍兴府）', 'Yuezhou (Shaoxing)', 120.58, 30.00, '浙江绍兴'),
  S('suzhou', '苏州（平江府）', 'Suzhou (Pingjiang)', 120.62, 31.30, '江苏苏州'),
  S('huzhou', '湖州', 'Huzhou', 120.10, 30.87, '浙江湖州'),
  S('xiuzhou', '秀州（嘉兴府）', 'Xiuzhou (Jiaxing)', 120.75, 30.75, '浙江嘉兴'),
  S('mingzhou_nb', '明州（庆元府）', 'Mingzhou (Qingyuan)', 121.55, 29.87, '浙江宁波'),
  S('taizhou_lh', '台州', 'Taizhou', 121.13, 28.85, '浙江临海'),
  S('wenzhou', '温州', 'Wenzhou', 120.65, 28.00, '浙江温州'),
  S('chuzhou_ls', '处州', 'Chuzhou', 119.92, 28.45, '浙江丽水'),
  S('wuzhou', '婺州', 'Wuzhou', 119.65, 29.08, '浙江金华'),
  S('quzhou', '衢州', 'Quzhou', 118.87, 28.97, '浙江衢州'),
  S('muzhou', '睦州（严州）', 'Muzhou (Yanzhou)', 119.28, 29.48, '浙江建德梅城'),
  // 福建
  S('fuzhou', '福州', 'Fuzhou', 119.30, 26.08, '福建福州'),
  S('jianzhou_jo', '建州（建宁府）', 'Jianzhou (Jianning)', 118.32, 27.05, '福建建瓯'),
  S('nanjian', '南剑州', 'Nanjianzhou', 118.17, 26.65, '福建南平'),
  S('shaowu', '邵武军', 'Shaowu Army', 117.48, 27.33, '福建邵武'),
  S('tingzhou', '汀州', 'Tingzhou', 116.35, 25.83, '福建长汀'),
  S('quanzhou', '泉州', 'Quanzhou', 118.58, 24.92, '福建泉州'),
  S('zhangzhou', '漳州', 'Zhangzhou', 117.65, 24.52, '福建漳州'),
  S('xinghua', '兴化军', 'Xinghua Army', 119.00, 25.43, '福建莆田'),
  // 广南东路
  S('guangzhou', '广州', 'Guangzhou', 113.26, 23.13, '广东广州', { b: 15 }),
  S('shaozhou_sg', '韶州', 'Shaozhou', 113.60, 24.80, '广东韶关'),
  S('nanxiong', '南雄州', 'Nanxiongzhou', 114.30, 25.12, '广东南雄'),
  S('lianzhou', '连州', 'Lianzhou', 112.38, 24.78, '广东连州'),
  S('yingzhou_yd', '英州', 'Yingzhou', 113.40, 24.18, '广东英德'),
  S('huizhou', '惠州', 'Huizhou', 114.40, 23.08, '广东惠州'),
  S('xunzhou', '循州', 'Xunzhou', 115.25, 24.10, '广东龙川'),
  S('meizhou_mz', '梅州', 'Meizhou', 116.12, 24.30, '广东梅州'),
  S('chaozhou', '潮州', 'Chaozhou', 116.63, 23.67, '广东潮州'),
  S('duanzhou', '端州（肇庆府）', 'Duanzhou (Zhaoqing)', 112.47, 23.05, '广东肇庆'),
  S('xinzhou_xx', '新州', 'Xinzhou', 112.22, 22.70, '广东新兴'),
  S('fengzhou_fk', '封州', 'Fengzhou', 111.50, 23.45, '广东封开'),
  S('kangzhou', '康州（德庆府）', 'Kangzhou', 111.78, 23.15, '广东德庆'),
  S('nanen', '南恩州', 'Nan’enzhou', 111.97, 21.85, '广东阳江'),
  // 广南西路
  S('guizhou', '桂州（静江府）', 'Guizhou (Jingjiang)', 110.28, 25.28, '广西桂林'),
  S('zhaozhou_pl', '昭州', 'Zhaozhou', 110.63, 24.63, '广西平乐'),
  S('hezhou_hz', '贺州', 'Hezhou', 111.53, 24.42, '广西贺州'),
  S('wuzhou_wz', '梧州', 'Wuzhou', 111.28, 23.48, '广西梧州'),
  S('tengzhou', '藤州', 'Tengzhou', 110.92, 23.38, '广西藤县'),
  S('xunzhou_gp', '浔州', 'Xunzhou', 110.08, 23.39, '广西桂平'),
  S('guizhou_gg', '贵州', 'Guizhou', 109.60, 23.10, '广西贵港'),
  S('rongzhou_rx', '容州', 'Rongzhou', 110.55, 22.85, '广西容县'),
  S('yulin', '郁林州', 'Yulinzhou', 110.15, 22.63, '广西玉林'),
  S('xiangzhou_xz', '象州', 'Xiangzhou', 109.68, 23.97, '广西象州'),
  S('liuzhou', '柳州', 'Liuzhou', 109.40, 24.33, '广西柳州'),
  S('rongzhou_rs', '融州', 'Rongzhou', 109.40, 25.08, '广西融水', { r: 180 }),
  S('yizhou_ys', '宜州（庆远府）', 'Yizhou', 108.65, 24.48, '广西宜州', { r: 200 }),
  S('binzhou_bm', '宾州', 'Binzhou', 108.80, 23.20, '广西宾阳'),
  S('hengzhou_hx', '横州', 'Hengzhou', 109.27, 22.68, '广西横州'),
  S('yongzhou_nn', '邕州', 'Yongzhou', 108.32, 22.82, '广西南宁', { r: 220 }),
  S('taiping_cz', '太平寨（左江）', 'Taiping stockade (Zuojiang)', 107.35, 22.40, '广西崇左', { r: 160 }),
  S('tianzhou', '田州（右江）', 'Tianzhou (Youjiang)', 106.90, 23.60, '广西田阳', { r: 200 }),
  S('qinzhou_qz', '钦州', 'Qinzhou', 108.62, 21.95, '广西钦州'),
  S('lianzhou_hp', '廉州', 'Lianzhou', 109.20, 21.67, '广西合浦'),
  S('leizhou', '雷州', 'Leizhou', 110.08, 20.92, '广东雷州'),
  S('huazhou_hzh', '化州', 'Huazhou', 110.63, 21.67, '广东化州'),
  S('gaozhou', '高州', 'Gaozhou', 110.85, 21.92, '广东高州'),
  S('qiongzhou_hk', '琼州', 'Qiongzhou', 110.35, 20.00, '海南海口'),
  S('changhua', '昌化军（儋州）', 'Changhua Army (Danzhou)', 109.57, 19.52, '海南儋州'),
  S('wanan', '万安军', 'Wan’an Army', 110.38, 18.80, '海南万宁'),
  S('zhuya', '朱崖军（吉阳军）', 'Zhuya Army (Jiyang)', 109.17, 18.35, '海南三亚崖城'),
];

/** 辽 (and later 金) seats: the five capitals and the 州 of 《辽史·地理志》. */
export const LIAO_SEATS: Seat[] = [
  // 南京道
  S('yanjing', '南京析津府（燕京）', 'Nanjing Xijin (Yanjing)', 116.38, 39.90, '北京', { b: 30 }),
  S('zhuozhou', '涿州', 'Zhuozhou', 115.97, 39.49, '河北涿州'),
  S('yizhou_yx', '易州', 'Yizhou', 115.50, 39.35, '河北易县', { r: 140 }),
  S('xincheng', '新城', 'Xincheng', 115.85, 39.33, '河北高碑店新城', { r: 110 }),
  S('guan_l', '固安', 'Gu’an', 116.30, 39.43, '河北固安', { r: 110 }),
  S('wuqing', '武清', 'Wuqing', 117.05, 39.38, '天津武清', { r: 130 }),
  S('tanzhou_my', '檀州', 'Tanzhou', 116.85, 40.37, '北京密云'),
  S('shunzhou', '顺州', 'Shunzhou', 116.65, 40.13, '北京顺义'),
  S('jizhou_jx', '蓟州', 'Jizhou', 117.40, 40.05, '天津蓟州'),
  S('jingzhou_zh', '景州', 'Jingzhou', 117.95, 40.18, '河北遵化'),
  S('pingzhou', '平州', 'Pingzhou', 118.87, 39.88, '河北卢龙'),
  S('luanzhou', '滦州', 'Luanzhou', 118.70, 39.73, '河北滦州'),
  S('yingzhou_cl', '营州', 'Yingzhou', 119.17, 39.70, '河北昌黎'),
  // 西京道
  S('datong', '西京大同府（云州）', 'Xijing Datong (Yunzhou)', 113.30, 40.08, '山西大同', { b: 20 }),
  S('yingzhou_yx', '应州', 'Yingzhou', 113.18, 39.55, '山西应县'),
  S('shuozhou', '朔州', 'Shuozhou', 112.43, 39.33, '山西朔州', { r: 160 }),
  S('wuzhou_sc', '武州', 'Wuzhou', 112.05, 39.15, '山西神池', { r: 130 }),
  S('weizhou_yx', '蔚州', 'Yuzhou', 114.57, 39.83, '河北蔚县'),
  S('fengsheng', '奉圣州（新州）', 'Fengsheng (Xinzhou)', 115.22, 40.38, '河北涿鹿'),
  S('guihua', '归化州（武州）', 'Guihua', 115.05, 40.60, '河北张家口宣化'),
  S('ruzhou_yq', '儒州', 'Ruzhou', 115.97, 40.47, '北京延庆'),
  S('fengzhou_hh', '丰州（天德军）', 'Fengzhou', 111.75, 40.83, '内蒙古呼和浩特东', { r: 320 }),
  S('dongsheng', '东胜州', 'Dongsheng', 111.18, 40.27, '内蒙古托克托', { r: 220 }),
  S('ningbian', '宁边州', 'Ningbian', 111.68, 39.92, '内蒙古清水河', { r: 140 }),
  S('tiande', '天德军（云内州西）', 'Tiande Army', 108.80, 40.95, '内蒙古乌拉特前旗', { r: 320 }),
  // 中京道
  S('dading', '中京大定府', 'Zhongjing Dading', 119.18, 41.60, '内蒙古宁城大明镇', { b: 20, r: 320 }),
  S('beian', '北安州', 'Bei’anzhou', 117.95, 40.98, '河北承德', { r: 260 }),
  S('zezhou_pq', '泽州', 'Zezhou', 118.70, 41.00, '河北平泉', { r: 220 }),
  S('xingzhong', '兴中府（霸州）', 'Xingzhong (Bazhou)', 120.45, 41.57, '辽宁朝阳', { r: 260 }),
  S('jinzhou_lx', '锦州', 'Jinzhou', 121.13, 41.10, '辽宁锦州'),
  S('laizhou_sz', '来州', 'Laizhou', 120.33, 40.33, '辽宁绥中'),
  S('yizhou_yx2', '宜州', 'Yizhou', 121.23, 41.53, '辽宁义县'),
  // 上京道
  S('shangjing', '上京临潢府', 'Shangjing Linhuang', 119.39, 43.95, '内蒙古巴林左旗林东', { b: 30, r: 650 }),
  S('qingzhou_bl', '庆州', 'Qingzhou', 118.50, 44.68, '内蒙古巴林右旗白塔子', { r: 600 }),
  S('taizhou_l', '泰州', 'Taizhou', 123.18, 46.37, '黑龙江泰来塔子城', { r: 650 }),
  S('changchun', '长春州', 'Changchunzhou', 124.83, 45.33, '吉林前郭塔虎城', { r: 300 }),
  S('wugu', '乌古敌烈统军司', 'Wugu-Dilie command', 118.80, 48.80, '内蒙古呼伦贝尔', { r: 700 }),
  S('zhenzhou_kd', '镇州（可敦城）', 'Zhenzhou (Kedun)', 103.52, 48.13, '蒙古国布尔干省青托勒盖', { r: 600 }),
  // 东京道
  S('dongjing', '东京辽阳府', 'Dongjing Liaoyang', 123.18, 41.27, '辽宁辽阳', { b: 20 }),
  S('shenzhou_sy', '沈州', 'Shenzhou', 123.43, 41.80, '辽宁沈阳'),
  S('xianzhou_bz', '显州', 'Xianzhou', 121.78, 41.60, '辽宁北镇'),
  S('haizhou_hc', '海州', 'Haizhou', 122.75, 40.85, '辽宁海城'),
  S('chenzhou_gz', '辰州', 'Chenzhou', 122.35, 40.40, '辽宁盖州'),
  S('suzhou_jz', '苏州', 'Suzhou', 121.70, 39.10, '辽宁大连金州'),
  S('kaizhou_fc', '开州', 'Kaizhou', 124.07, 40.45, '辽宁凤城', { r: 200 }),
  S('laiyuan', '来远城', 'Laiyuan', 124.35, 40.15, '辽宁丹东九连城', { r: 120 }),
  S('xianzhou_ky', '咸州', 'Xianzhou', 124.03, 42.55, '辽宁开原', { r: 260 }),
  S('huanglong', '黄龙府', 'Huanglong', 125.18, 44.43, '吉林农安', { r: 300 }),
  S('ningjiang', '宁江州', 'Ningjiangzhou', 124.85, 45.05, '吉林松原', { r: 240 }),
  S('wuguo', '五国部（越里吉）', 'Five Nations (Yueliji)', 129.83, 46.33, '黑龙江依兰', { r: 650 }),
];

/** 西夏 (定难军) seats: 《宋史·夏国传》 and the 监军司 of the 夏 state. */
export const XIA_SEATS: Seat[] = [
  S('xiazhou', '夏州（统万城）', 'Xiazhou (Tongwan)', 108.85, 37.99, '陕西靖边白城子', { r: 300, b: 10 }),
  S('yinzhou', '银州', 'Yinzhou', 109.63, 37.95, '陕西榆林横山党岔', { r: 160 }),
  S('youzhou', '宥州', 'Youzhou', 108.10, 37.70, '内蒙古鄂托克前旗城川', { r: 300 }),
  S('yanzhou_db', '盐州', 'Yanzhou', 107.60, 37.58, '陕西定边', { r: 200 }),
  S('hongzhou_xx', '洪州', 'Hongzhou', 108.50, 37.45, '陕西靖边南', { r: 140 }),
  S('lingzhou', '灵州（西平府）', 'Lingzhou (Xiping)', 106.20, 37.98, '宁夏吴忠', { r: 260 }),
  S('xingqing', '兴州（兴庆府）', 'Xingzhou (Xingqing)', 106.27, 38.47, '宁夏银川', { b: 30, r: 320 }),
  S('heishan', '黑山威福军司', 'Heishan Weifu command', 107.60, 40.90, '内蒙古巴彦淖尔狼山南', { r: 280 }),
  S('baima', '白马强镇军司', 'Baima Qiangzhen command', 105.75, 39.70, '内蒙古阿拉善左旗', { r: 300 }),
  S('tiandu', '天都山（南牟会）', 'Tiandu Mountain (Nanmouhui)', 105.65, 36.75, '宁夏海原', { r: 160 }),
  S('zhuoluo', '卓啰和南军司', 'Zhuoluo Henan command', 103.25, 36.73, '甘肃永登', { r: 200 }),
  S('liangzhou', '凉州（西凉府）', 'Liangzhou (Xiliang)', 102.63, 37.93, '甘肃武威', { r: 420 }),
  S('ganzhou', '甘州（宣化府）', 'Ganzhou (Xuanhua)', 100.45, 38.93, '甘肃张掖', { r: 420 }),
  S('suzhou_jq', '肃州', 'Suzhou', 98.50, 39.73, '甘肃酒泉', { r: 420 }),
  S('guazhou', '瓜州', 'Guazhou', 96.20, 40.30, '甘肃瓜州锁阳城', { r: 420 }),
  S('shazhou', '沙州', 'Shazhou', 94.67, 40.13, '甘肃敦煌', { r: 500 }),
  S('heishui', '黑水镇燕军司（黑水城）', 'Heishui command (Khara-Khoto)', 101.15, 41.75, '内蒙古额济纳旗', { r: 350 }),
];

/** 大理, 吐蕃, 西域 and the other neighbours. */
export const NEIGHBOUR_SEATS: Seat[] = [
  // 大理
  S('dali', '羊苴咩城（大理）', 'Yangjumie (Dali)', 100.15, 25.68, '云南大理', { b: 30, r: 420 }),
  S('shanchan', '善阐府', 'Shanchan', 102.70, 25.04, '云南昆明', { r: 360 }),
  S('jianchang_xc', '建昌府', 'Jianchang', 102.27, 27.90, '四川西昌', { r: 360 }),
  S('huichuan', '会川府', 'Huichuan', 102.25, 26.65, '四川会理', { r: 320 }),
  S('weichu', '威楚府', 'Weichu', 101.53, 25.03, '云南楚雄', { r: 320 }),
  S('yongchang', '永昌府', 'Yongchang', 99.17, 25.12, '云南保山', { r: 400 }),
  S('tengchong', '腾冲府', 'Tengchong', 98.50, 25.02, '云南腾冲', { r: 360 }),
  S('tonghai', '通海都督府', 'Tonghai', 102.75, 24.12, '云南通海', { r: 360 }),
  S('shicheng', '石城郡', 'Shicheng', 103.80, 25.50, '云南曲靖', { r: 380 }),
  S('wusa', '乌撒部', 'Wusa', 104.28, 26.87, '贵州威宁', { r: 300 }),
  S('beisheng', '北胜府（丽江）', 'Beisheng (Lijiang)', 100.23, 26.87, '云南丽江', { r: 360 }),
  S('kainan', '开南（银生）', 'Kainan (Yinsheng)', 100.83, 24.45, '云南景东', { r: 380 }),
  S('mengle', '勐泐（景陇）', 'Mengle (Jinglong)', 100.80, 22.00, '云南景洪', { r: 380 }),
  // 西南诸蛮 (罗殿、自杞) and the 羁縻 prefectures between 大理 and 宋
  S('luodian', '罗殿', 'Luodian', 105.93, 26.25, '贵州安顺', { r: 260 }),
  S('ziqi', '自杞', 'Ziqi', 104.90, 25.08, '贵州兴义', { r: 260 }),
  S('duyun', '都匀（羁縻）', 'Duyun (loose-rein prefecture)', 107.50, 26.27, '贵州都匀', { r: 220 }),
  S('nandan', '南丹州', 'Nandanzhou', 107.55, 24.98, '广西南丹', { r: 200 }),
  // 吐蕃
  S('lhasa', '逻些（拉萨）', 'Lhasa', 91.12, 29.65, '西藏拉萨', { r: 2600, b: 20 }),
  S('sakya', '萨迦（后藏）', 'Sakya (Tsang)', 88.02, 28.90, '西藏萨迦', { r: 2600 }),
  S('guge', '古格（托林）', 'Guge (Tholing)', 79.80, 31.48, '西藏札达', { r: 2600 }),
  S('ladakh', '拉达克（日土）', 'Ladakh (Rutog)', 79.72, 33.38, '西藏日土', { r: 2200 }),
  S('qiangtang', '羌塘诸部（改则）', 'Changtang tribes (Gertse)', 84.06, 32.30, '西藏改则', { r: 2600 }),
  S('nagqu', '那曲诸部', 'Nagqu tribes', 92.05, 31.47, '西藏那曲', { r: 2600 }),
  S('kongpo', '工布（林芝）', 'Kongpo (Nyingchi)', 94.36, 29.65, '西藏林芝', { r: 1800 }),
  S('kham', '康（昌都）', 'Kham (Chamdo)', 97.17, 31.14, '西藏昌都', { r: 2000 }),
  S('yushu', '玉树诸部', 'Yushu tribes', 97.00, 33.00, '青海玉树', { r: 2000 }),
  S('ganzi', '甘孜诸部', 'Garze tribes', 100.00, 31.62, '四川甘孜', { r: 1500 }),
  S('qaidam', '柴达木诸部（都兰）', 'Qaidam tribes (Dulan)', 98.10, 36.30, '青海都兰', { r: 1800 }),
  S('guoluo', '黄河源诸部', 'Tribes of the Yellow River source', 100.20, 34.50, '青海果洛', { r: 1500 }),
  S('songpan', '松潘诸部', 'Songpan tribes', 103.60, 32.65, '四川松潘', { r: 300 }),
  S('qinghai', '青海湖诸部', 'Kokonor tribes', 100.60, 36.30, '青海共和', { r: 900 }),
  // 西域
  S('gaochang', '高昌（西州）', 'Gaochang (Qocho)', 89.53, 42.85, '新疆吐鲁番', { b: 20, r: 900 }),
  S('beiting', '北庭（别失八里）', 'Beiting (Beshbaliq)', 89.17, 44.10, '新疆吉木萨尔', { r: 800 }),
  S('qiuci', '龟兹', 'Kucha', 82.97, 41.72, '新疆库车', { r: 800 }),
  S('yizhou_hm', '伊州', 'Yizhou (Hami)', 93.50, 42.83, '新疆哈密', { r: 600 }),
  S('yutian', '于阗', 'Khotan', 79.93, 37.12, '新疆和田', { r: 700 }),
  S('kashgar', '疏勒（喀什噶尔）', 'Kashgar', 75.99, 39.47, '新疆喀什', { b: 20, r: 800 }),
  S('balasagun', '八剌沙衮', 'Balasagun', 75.25, 42.75, '吉尔吉斯斯坦托克马克', { r: 800 }),
  S('talas', '怛逻斯', 'Talas', 71.40, 42.90, '哈萨克斯坦塔拉兹', { r: 700 }),
  S('samarkand', '撒马尔罕', 'Samarkand', 66.97, 39.65, '乌兹别克斯坦撒马尔罕', { r: 700 }),
  S('bukhara', '布哈拉', 'Bukhara', 64.42, 39.77, '乌兹别克斯坦布哈拉', { r: 600 }),
  // 天竺、缅 (context only: they keep the 吐蕃 plateau from spilling onto the plains)
  S('lahore', '拉合尔', 'Lahore', 74.35, 31.55, '巴基斯坦拉合尔', { r: 700 }),
  S('kashmir', '迦湿弥罗', 'Kashmir', 74.80, 34.08, '克什米尔斯利那加', { r: 300 }),
  S('kannauj', '曲女城', 'Kannauj', 79.92, 27.05, '印度曲女城', { r: 700 }),
  S('nepal', '尼婆罗（加德满都）', 'Nepal (Kathmandu)', 85.32, 27.70, '尼泊尔加德满都', { r: 300 }),
  S('pataliputra', '华氏城（巴特那）', 'Pataliputra (Patna)', 85.14, 25.61, '印度巴特那', { r: 700 }),
  S('kamarupa', '迦摩缕波', 'Kamarupa', 91.74, 26.18, '印度古瓦哈提', { r: 450 }),
  S('pagan', '蒲甘', 'Pagan', 94.86, 21.17, '缅甸蒲甘', { r: 600 }),
  S('myitkyina', '缅北诸部', 'Northern Burmese tribes', 97.40, 25.38, '缅甸密支那', { r: 300 }),
  // 漠北、东北
  S('kelie', '克烈（土拉河）', 'Kereit (Tuul river)', 106.90, 47.90, '蒙古国乌兰巴托一带', { r: 800 }),
  S('kerulen', '克鲁伦河诸部', 'Kherlen tribes', 113.50, 47.50, '蒙古国东方省', { r: 750 }),
  S('naiman', '乃蛮（阿尔泰）', 'Naiman (Altai)', 91.60, 48.00, '蒙古国科布多', { r: 1100 }),
  S('mieerqi', '蔑儿乞（色楞格河）', 'Merkit (Selenga)', 106.00, 50.50, '俄罗斯布里亚特南部', { r: 1000 }),
  S('wanggu', '汪古（阴山北）', 'Ongud (north of Yinshan)', 110.50, 42.00, '内蒙古达茂旗', { r: 450 }),
  S('huining', '按出虎水（会宁）', 'Anchuhu river (Huining)', 126.95, 45.52, '黑龙江哈尔滨阿城', { r: 500 }),
  S('hulan', '蒲与路（女真北部）', 'Puyu (northern Jurchen)', 126.25, 48.03, '黑龙江克东', { r: 700 }),
  S('suping', '恤品（速频）', 'Xupin (Supin)', 131.95, 43.80, '俄罗斯乌苏里斯克', { r: 650 }),
  S('helan', '曷懒甸', 'Helan', 127.53, 39.92, '朝鲜咸兴', { r: 260 }),
  S('changbai', '长白山女真', 'Changbai Jurchen', 127.50, 42.20, '吉林长白山北', { r: 300 }),
  // 高丽
  S('kaijing', '开京', 'Kaegyong', 126.55, 37.97, '朝鲜开城', { b: 20, r: 420 }),
  S('xijing_py', '西京（平壤）', 'Sogyong (Pyongyang)', 125.75, 39.03, '朝鲜平壤', { r: 300 }),
  S('qingzhou_kr', '东京（庆州）', 'Tonggyong (Gyeongju)', 129.20, 35.85, '韩国庆州', { r: 360 }),
  S('quanzhou_kr', '全州', 'Jeonju', 127.15, 35.82, '韩国全州', { r: 360 }),
  S('anbei', '安北都护府（宁边）', 'Anbuk (Yongbyon)', 125.80, 39.80, '朝鲜宁边', { r: 200 }),
  // 安南、占城
  S('shenglong', '升龙（大罗）', 'Thang Long', 105.85, 21.03, '越南河内', { b: 20, r: 380 }),
  S('liangzhou_vn', '谅州', 'Lang Chau', 106.76, 21.85, '越南谅山', { r: 160 }),
  S('qinghua', '清化', 'Thanh Hoa', 105.78, 19.80, '越南清化', { r: 300 }),
  S('yian', '乂安', 'Nghe An', 105.68, 18.67, '越南荣市', { r: 260 }),
  S('buzheng', '布政（地哩）', 'Bo Chinh', 106.60, 17.47, '越南广平', { r: 200 }),
  S('zhancheng', '占城（因陀罗补罗）', 'Champa (Indrapura)', 108.25, 15.63, '越南广南', { r: 360 }),
  S('wuli', '乌里（顺化）', 'O–Ly (Hue)', 107.58, 16.46, '越南顺化', { r: 200 }),
];

const SG = 'bsong', LI = 'liao', BH = 'beisong_beihan', SHU = 'houshu', JN = 'jingnan', WP = 'beisong_wuping', NH = 'nanhan',
  NT = 'nantang', WY = 'wuyue', QY = 'beisong_qingyuan', DN = 'beisong_dingnan', XX = 'xixia', DL = 'dali',
  GS = 'beisong_gusiluo', TB = 'tubo_bu', GZ = 'beisong_ganzhou', GY = 'beisong_guiyi', HH = 'huihu_w', YT = 'beisong_yutian',
  KH = 'karakhan', SM = 'beisong_saman', NZ = 'beisong_nvzhen', ZB = 'beisong_zubu', GL = 'gaoli', AN = 'annam',
  ZC = 'beisong_zhancheng', TZ = 'beisong_tianzhu', PG = 'beisong_pagan', XN = 'beisong_xinan', JIN = 'jin', XL = 'xiliao';

const holds: Record<string, Hold[]> = {};
/** the same holdings for a list of seats */
const set = (ids: string, ...h: Hold[]) => { for (const id of ids.trim().split(/\s+/)) holds[id] = h; };

// ---------------------------------------------------------------- 宋 and the southern kingdoms
// held by 宋 throughout (the 后周 lands of 960, with 淮南 from 958 and 秦凤 from 955)
set(`kaifeng yingtian caozhou danzhou jizhou_jy yunzhou puzhou_sd yanzhou xuzhou yizhou_ly mizhou qingzhou weizhou_wf
  laizhou dengzhou_pl zizhou qizhou_jn huaiyang_jun henan zhengzhou huazhou_hx mengzhou xuzhou_xc chenzhou caizhou
  yingzhou_fy ruzhou tangzhou dengzhou_dz xiangzhou junzhou fangzhou suizhou yingzhou_zx jinzhou_ak xinyang
  guangzhou_hc bozhou xizhou_xx daming chanzhou weizhou_wh xiangzhou_ay cizhou mingzhou xingzhou zhaozhou shenzhou jizhou_hb
  enzhou bozhou_lc dezhou dizhou binzhou huaizhou luzhou zezhou jinzhou_lf jiangzhou_xj xizhou_sx cizhou_jx hezhong
  jiezhou jingzhao huazhou_hz tongzhou yaozhou binzhou_bx qianzhou fangzhou_hl fuzhou_fx danzhou_yc yanzhou_ya baoan
  ningzhou qingzhou_qy huanzhou fengxiang longzhou jingzhou_jc weizhou_pl yuanzhou qinzhou_ts fengzhou_fx
  chengzhou jiezhou_wd shangzhou guozhou shanzhou yangzhou chuzhou_ha lianshui haizhou sizhou_xy xuyi suzhou_ah haozhou
  shouzhou luzhou_hf shuzhou_qs hezhou_hx chuzhou_cz zhenzhou taizhou_tz tongzhou_nt wuwei gaoyou huangzhou_hg
  qizhou_qc anzhou fuzhou_tm jingmen`, [960, SG]);
// 河北 frontier: 宋 since 后周 took 瓦桥、益津 (959); 保州 and 定州 were always 宋
set('zhending dingzhou qizhou_aq baozhou anshu guangxin xiongzhou bazhou xinan mozhou shunan yingzhou_hj qianning cangzhou',
  [960, SG]);
// 河东 west of 北汉: 府州 折氏 and 麟州 杨氏 served 宋 from the start; the river forts were 宋 posts
set('fuzhou_fg linzhou huoshan', [960, SG]);
// 北汉 (to 979)
set('taiyuan xinzhou daizhou ninghua kelan lanzhou_lx xianzhou shizhou fenzhou liaozhou_zq pingding weisheng',
  [960, BH], [979, SG, 'ss.taizong']);
// 宋 seats set up later on the 西夏 frontier
set('qingjian', [960, null], [1041, SG, 'ss.renzong']);
set('dingbian', [960, null], [1099, SG, 'est']);
set('deshun', [960, null], [1043, SG, 'ss.dili']);
set('zhenrong', [960, null], [997, SG, 'ss.dili']);
set('jinning', [960, null], [1099, SG, 'ss.zhezong']);
set('mizhi', [960, DN], [1038, XX, 'ss.xiaxia'], [1081, SG, 'ss.shenzong']);
set('suizhou_sd', [960, DN], [982, SG, 'ss.taizong'], [997, DN, 'ss.xiaxia'], [1038, XX, 'ss.xiaxia'], [1067, SG, 'ss.shenzong']);
set('huaide', [960, null], [1098, SG, 'ss.zhezong']);
set('xian_zhou', [960, DN], [1038, XX, 'ss.xiaxia'], [1099, SG, 'ss.zhezong']);
set('huizhou_jy', [960, TB], [1028, DN, 'est'], [1038, XX, 'ss.xiaxia'], [1099, SG, 'ss.zhezong']);
set('tiandu', [960, DN], [1038, XX, 'ss.xiaxia'], [1099, SG, 'ss.zhezong']);
// 熙河开边 and 河湟
set('tongyuan', [960, TB], [1051, SG, 'est']);
set('xizhou_lt', [960, TB], [1032, GS, 'ss.tubo'], [1072, SG, 'ss.shenzong']);
set('hezhou_lx', [960, TB], [1032, GS, 'ss.tubo'], [1073, SG, 'ss.wangshao']);
set('minzhou dangzhou', [960, TB], [1073, SG, 'ss.wangshao']);
set('taozhou diezhou', [960, TB], [1032, GS, 'ss.tubo'], [1073, SG, 'ss.wangshao']);
set('lanzhou', [960, TB], [1028, DN, 'est'], [1038, XX, 'ss.xiaxia'], [1081, SG, 'ss.shenzong']);
set('huangzhou', [960, TB], [1032, GS, 'ss.tubo'], [1099, SG, 'ss.zhezong'], [1100, GS, 'ss.huizong'], [1103, SG, 'ss.huizong']);
set('xining', [960, TB], [1032, GS, 'ss.tubo'], [1099, SG, 'ss.zhezong'], [1100, GS, 'ss.huizong'], [1104, SG, 'ss.huizong']);
set('kuozhou', [960, TB], [1032, GS, 'ss.tubo'], [1104, SG, 'ss.huizong']);
set('jishi', [960, TB], [1032, GS, 'ss.tubo'], [1108, SG, 'ss.dili']);
set('zhenwu', [960, TB], [1032, GS, 'ss.tubo'], [1115, SG, 'ss.dili']);
// 后蜀 (to 965)
set(`xingyuan yangzhou_yx xingzhou_ly wenzhou_wx lizhou jianzhou longzhou_pw langzhou bazhou_bz pengzhou_yl chengdu hanzhou
  pengzhou shuzhou qiongzhou meizhou jiazhou yazhou lizhou_hy maozhou weizhou_wc yongkang jianzhou_jy lingzhou_rs mianzhou
  zizhou_st suizhou_sn guozhou_nc hezhou_hc quzhou_qx guangan zizhou_zz puzhou_ay rongzhou changzhou_dz luzhou_lz
  rongzhou_yb yuzhou nanping fuzhou_fl zhongzhou wanzhou kaizhou dazhou kuizhou qianzhou_ps shizhou_es`,
  [960, SHU], [965, SG, 'ss.taizu']);
// 播州 杨氏 and 思州 田氏: 羁縻, 宋 只 in name until they took 宋 offices
set('bozhou_zy', [960, null], [1108, SG, 'ss.dili']);
set('sizhou', [960, null], [1115, SG, 'est']);
// 荆南 and 武平 (湖南) (to 963)
set('jiangling xiazhou_yc guizhou_zg', [960, JN], [963, SG, 'ss.taizu']);
set('yuezhou tanzhou hengzhou yongzhou daozhou chenzhou_cz shaozhou quanzhou_qz langzhou_cd lizhou_lx chenzhou_yl wugang',
  [960, WP], [963, SG, 'ss.taizu']);
// 湖南 西 南北江 and 梅山: opened by 章惇 (1072) and later
set('xinhua', [960, null], [1072, SG, 'ss.shenzong']);
set('yuanzhou_zj', [960, null], [1074, SG, 'ss.dili']);
set('jingzhou_jz', [960, null], [1080, SG, 'ss.dili']);
// 南汉 (to 971)
set(`guangzhou shaozhou_sg nanxiong lianzhou yingzhou_yd huizhou xunzhou meizhou_mz chaozhou duanzhou xinzhou_xx fengzhou_fk
  kangzhou nanen guizhou zhaozhou_pl hezhou_hz wuzhou_wz tengzhou xunzhou_gp guizhou_gg rongzhou_rx yulin xiangzhou_xz
  liuzhou rongzhou_rs yizhou_ys binzhou_bm hengzhou_hx yongzhou_nn qinzhou_qz lianzhou_hp leizhou huazhou_hzh gaozhou
  qiongzhou_hk changhua wanan zhuya`, [960, NH], [971, SG, 'ss.taizu']);
set('taiping_cz tianzhou', [960, null], [1053, SG, 'ss.renzong']);
// 南唐 (to 975)
set(`jiangning runzhou xuanzhou taiping shezhou chizhou jiangzhou_jj nankang raozhou xinzhou_sr hongzhou yunzhou_ga
  yuanzhou_yc linjiang fuzhou_jx jianchang jizhou_ja qianzhou_gz nanan jianzhou_jo nanjian shaowu tingzhou ezhou guangde`,
  [960, NT], [975, SG, 'ss.taizu']);
set('changzhou', [960, NT], [975, WY, 'ss.taizu'], [978, SG, 'ss.taizong']);
// 吴越 and 漳泉 (to 978)
set('hangzhou yuezhou_sx suzhou huzhou xiuzhou mingzhou_nb taizhou_lh wenzhou chuzhou_ls wuzhou quzhou muzhou fuzhou',
  [960, WY], [978, SG, 'ss.taizong']);
set('quanzhou zhangzhou xinghua', [960, QY], [978, SG, 'ss.taizong']);

// ---------------------------------------------------------------- 辽 and 金
const L5 = (...rest: Hold[]): Hold[] => [[960, LI], ...rest];
set('yanjing zhuozhou tanzhou_my shunzhou jizhou_jx jingzhou_zh', ...L5([1122, JIN, 'js.taizu'], [1123, SG, 'ss.huizong'], [1125, JIN, 'js.taizong']));
set('yizhou_yx', [960, LI], [979, SG, 'ss.taizong'], [989, LI, 'ls.shengzong'], [1122, JIN, 'js.taizu'], [1123, SG, 'ss.huizong'], [1125, JIN, 'js.taizong']);
set('xincheng guan_l wuqing', ...L5([1122, JIN, 'js.taizu'], [1123, SG, 'ss.huizong'], [1125, JIN, 'js.taizong']));
set('pingzhou luanzhou yingzhou_cl', ...L5([1122, JIN, 'js.taizu']));
set('datong yingzhou_yx shuozhou wuzhou_sc weizhou_yx fengsheng guihua ruzhou_yq fengzhou_hh dongsheng ningbian tiande',
  ...L5([1122, JIN, 'js.taizu']));
set('dading beian zezhou_pq xingzhong jinzhou_lx laizhou_sz yizhou_yx2', ...L5([1122, JIN, 'js.taizu']));
set('shangjing qingzhou_bl', ...L5([1120, JIN, 'js.taizu']));
set('taizhou_l changchun', ...L5([1117, JIN, 'js.taizu']));
set('wugu', ...L5([1122, JIN, 'est']));
set('zhenzhou_kd', [960, ZB], [1004, LI, 'ls.dili'], [1124, XL, 'ls.tianzuo']);
set('dongjing shenzhou_sy haizhou_hc chenzhou_gz suzhou_jz kaizhou_fc laiyuan', ...L5([1116, JIN, 'js.taizu']));
set('xianzhou_bz', ...L5([1118, JIN, 'js.taizu']));
set('xianzhou_ky huanglong', ...L5([1115, JIN, 'js.taizu']));
set('ningjiang', ...L5([1114, JIN, 'js.taizu']));
set('wuguo', ...L5([1115, JIN, 'est']));
// 女真 homeland: 生女真 under 辽 in name, 金 from 1115
// 生女真 north of the 混同江 were 辽's 属部; the 东女真 by the Korean border were not
set('huining hulan suping', [960, LI], [1115, JIN, 'js.taizu']);
set('helan changbai', [960, NZ], [1115, JIN, 'js.taizu']);

// ---------------------------------------------------------------- 党项 / 西夏
set('xiazhou yinzhou youzhou', [960, DN], [982, SG, 'ss.taizong'], [997, DN, 'ss.xiaxia'], [1038, XX, 'ss.xiaxia']);
set('yanzhou_db hongzhou_xx', [960, DN], [1038, XX, 'ss.xiaxia']);
set('lingzhou', [960, SG], [1002, DN, 'ss.zhenzong'], [1038, XX, 'ss.xiaxia']);
set('xingqing heishan baima', [960, DN], [1038, XX, 'ss.xiaxia']);
set('zhuoluo', [960, TB], [1032, DN, 'est'], [1038, XX, 'ss.xiaxia']);
set('liangzhou', [960, TB], [1032, DN, 'ss.xiaxia'], [1038, XX, 'ss.xiaxia']);
set('ganzhou', [960, GZ], [1028, DN, 'ss.xiaxia'], [1038, XX, 'ss.xiaxia']);
set('suzhou_jq', [960, GZ], [1036, DN, 'ss.xiaxia'], [1038, XX, 'ss.xiaxia']);
set('guazhou shazhou', [960, GY], [1036, DN, 'ss.xiaxia'], [1038, XX, 'ss.xiaxia']);
set('heishui', [960, GZ], [1036, DN, 'est'], [1038, XX, 'ss.xiaxia']);

// ---------------------------------------------------------------- neighbours
set('dali shanchan jianchang_xc huichuan weichu yongchang tengchong tonghai shicheng wusa beisheng kainan mengle', [960, DL]);
set('lhasa sakya guge ladakh qiangtang nagqu kongpo kham yushu ganzi qaidam guoluo songpan', [960, TB]);
set('qinghai', [960, TB], [1032, GS, 'ss.tubo']);
set('gaochang beiting qiuci yizhou_hm', [960, HH]);
set('yutian', [960, YT], [1006, KH, 'est']);
set('kashgar balasagun talas', [960, KH]);
set('samarkand bukhara', [960, SM], [999, KH, 'est']);
set('naiman mieerqi wanggu', [960, ZB]);
set('kerulen', [960, LI], [1124, ZB, 'est']);
set('kelie', [960, ZB], [1004, LI, 'ls.dili'], [1124, ZB, 'est']);
set('kaijing xijing_py qingzhou_kr quanzhou_kr anbei', [960, GL]);
set('shenglong liangzhou_vn qinghua yian', [960, AN]);
set('buzheng', [960, ZC], [1069, AN, 'ss.waiguo']);
set('zhancheng wuli', [960, ZC]);
set('lahore kashmir kannauj nepal pataliputra kamarupa', [960, TZ]);
set('pagan myitkyina', [960, PG]);
set('luodian ziqi', [960, XN]);
// 都匀 and 南丹 莫氏 took 宋 titles as 羁縻 prefectures
set('duyun nandan', [960, null], [972, SG, 'est']);

// ---------------------------------------------------------------- 金 crosses into 宋 (1125–1126)
/** appends a later holding to seats set above */
const add = (ids: string, h: Hold) => { for (const id of ids.trim().split(/\s+/)) holds[id] = [...holds[id], h]; };
add('daizhou xinzhou ninghua', [1125, JIN, 'js.taizong']);
add('taiyuan fenzhou weisheng luzhou jinzhou_lf zezhou zhending', [1126, JIN, 'js.taizong']);

export const BEISONG: OwnEra = {
  replaces: 'beisong',
  // the period's own dynasty is the realm; its neighbours here are rivals (area readout, map-reading)
  roles: { liao: 'rival', dali: 'rival', xixia: 'rival', jin: 'rival' },
  reach: 220,
  polities: [
    { id: BH, name: { zh: '北汉', en: 'Northern Han' }, color: '#7d5ba6', role: 'rival' },
    { id: WP, name: { zh: '武平（湖南）', en: 'Wuping (Hunan)' }, color: '#c27c3a', role: 'rival' },
    { id: QY, name: { zh: '清源军（漳泉）', en: 'Qingyuan Army (Zhang–Quan)' }, color: '#a04000', role: 'rival' },
    { id: DN, name: { zh: '党项（定难军）', en: 'Tangut Dingnan Army' }, color: '#c0804a', role: 'rival' },
    { id: GS, name: { zh: '唃厮啰', en: 'Gusiluo (Tsongkha)' }, color: '#bba27c', role: 'neighbor' },
    { id: GZ, name: { zh: '甘州回鹘', en: 'Ganzhou Uyghurs' }, color: '#b5ac90', role: 'neighbor' },
    { id: GY, name: { zh: '归义军（沙州）', en: 'Guiyi Army (Shazhou)' }, color: '#c2b48f', role: 'neighbor' },
    { id: YT, name: { zh: '于阗', en: 'Khotan' }, color: '#bdb39b', role: 'neighbor' },
    { id: SM, name: { zh: '萨曼王朝', en: 'Samanids' }, color: '#c9bba5', role: 'neighbor' },
    { id: NZ, name: { zh: '女真诸部', en: 'Jurchen tribes' }, color: '#b3bfae', role: 'neighbor' },
    { id: ZB, name: { zh: '阻卜（鞑靼诸部）', en: 'Zubu (Tatar tribes)' }, color: '#adb0a5', role: 'neighbor' },
    { id: ZC, name: { zh: '占城', en: 'Champa' }, color: '#b9c2b0', role: 'neighbor' },
    { id: TZ, name: { zh: '天竺诸国', en: 'Indian kingdoms' }, color: '#c8bfa9', role: 'neighbor' },
    { id: XN, name: { zh: '西南诸蛮（罗殿、自杞）', en: 'Southwestern peoples (Luodian, Ziqi)' }, color: '#b6b99d', role: 'neighbor' },
    { id: PG, name: { zh: '蒲甘', en: 'Pagan' }, color: '#bcc4ad', role: 'neighbor' },
  ],
  seats: [...SONG_SEATS, ...LIAO_SEATS, ...XIA_SEATS, ...NEIGHBOUR_SEATS],
  holds,
  phases: [
    { id: 'o_beisong_1', from: 960, to: 962, at: 961, title: { zh: '宋初（961年 · 陈桥兵变之后，南方诸国与北汉犹存）', en: 'Early Song (961; after the Chenqiao mutiny, the southern kingdoms and Northern Han still stand)' } },
    { id: 'o_beisong_2', from: 963, to: 964, at: 964, title: { zh: '宋取荆南、湖南（964年 · 事在963年）', en: 'Song takes Jingnan and Hunan (964; both taken in 963)' } },
    { id: 'o_beisong_3', from: 965, to: 970, at: 968, title: { zh: '宋平后蜀（约968年 · 后蜀亡于965年）', en: 'Song conquers Later Shu (c. 968; Later Shu fell in 965)' } },
    { id: 'o_beisong_4', from: 971, to: 974, at: 972, title: { zh: '宋平南汉，岭南归宋（约972年 · 南汉亡于971年）', en: 'Song conquers Southern Han; Lingnan joins Song (c. 972; Southern Han fell in 971)' } },
    { id: 'o_beisong_5', from: 975, to: 977, at: 976, title: { zh: '曹彬下金陵，南唐亡（约976年）', en: 'Cao Bin takes Jinling; Southern Tang falls (c. 976)' } },
    { id: 'o_beisong_6', from: 978, to: 978, at: 978, title: { zh: '吴越、漳泉纳土（978年 · 唯余北汉）', en: 'Wuyue and Zhang–Quan submit (978; only Northern Han is left)' } },
    { id: 'o_beisong_7', from: 979, to: 1004, at: 995, title: { zh: '宋灭北汉，宋辽对峙（约995年 · 北汉亡于979年；李继迁据夏州）', en: 'Song ends Northern Han and faces Liao (c. 995; Northern Han ended in 979; Li Jiqian holds Xiazhou)' } },
    { id: 'o_beisong_8', from: 1005, to: 1037, at: 1030, title: { zh: '澶渊之盟以后（约1030年 · 党项1002年取灵州，1028年取甘州）', en: 'After the Chanyuan treaty (c. 1030; the Tanguts took Lingzhou in 1002 and Ganzhou in 1028)' } },
    { id: 'o_beisong_9', from: 1038, to: 1071, at: 1050, title: { zh: '元昊称帝，宋、辽、夏并立（约1050年 · 元昊1038年称帝）', en: 'Yuanhao proclaims Xia: Song, Liao and Xia (c. 1050; proclaimed in 1038)' } },
    { id: 'o_beisong_10', from: 1072, to: 1098, at: 1085, title: { zh: '王韶开熙河，宋取兰州、米脂（约1085年 · 1072年开熙河，1081年取兰州、米脂）', en: 'Wang Shao opens Xihe; Song takes Lanzhou and Mizhi (c. 1085; Xihe opened from 1072, Lanzhou and Mizhi taken in 1081)' } },
    { id: 'o_beisong_11', from: 1099, to: 1114, at: 1110, title: { zh: '宋取天都、会州与青唐（约1110年 · 1099年取天都、会州，1104年复取青唐）', en: 'Song takes Tiandu, Huizhou and Qingtang (c. 1110; Tiandu and Huizhou taken in 1099, Qingtang for good in 1104)' } },
    { id: 'o_beisong_12', from: 1115, to: 1121, at: 1118, title: { zh: '阿骨打建金，取黄龙府与辽东（约1118年 · 1115年建国、取黄龙府，1116年取辽东）', en: 'Aguda founds Jin and takes Huanglong and Liaodong (c. 1118; Jin founded and Huanglong taken in 1115, Liaodong in 1116)' } },
    { id: 'o_beisong_13', from: 1122, to: 1124, at: 1123, title: { zh: '金取辽五京，宋赎燕京（1123年 · 五京1120–1122年陷落）', en: 'Jin takes the five Liao capitals; Song buys back Yanjing (1123; the five capitals fell in 1120–1122)' } },
    { id: 'o_beisong_14', from: 1125, to: 1127, at: 1126, title: { zh: '辽亡，金军南下（1126年 · 辽亡于1125年；太原、真定失守）', en: 'Liao falls and Jin marches south (1126; Liao fell in 1125; Taiyuan and Zhending lost)' } },
  ],
  sources: {
    'ss.taizu': { zh: '《宋史·太祖纪》', en: 'Songshi, Annals of Taizu' },
    'ss.taizong': { zh: '《宋史·太宗纪》', en: 'Songshi, Annals of Taizong' },
    'ss.zhenzong': { zh: '《宋史·真宗纪》', en: 'Songshi, Annals of Zhenzong' },
    'ss.renzong': { zh: '《宋史·仁宗纪》', en: 'Songshi, Annals of Renzong' },
    'ss.shenzong': { zh: '《宋史·神宗纪》', en: 'Songshi, Annals of Shenzong' },
    'ss.zhezong': { zh: '《宋史·哲宗纪》', en: 'Songshi, Annals of Zhezong' },
    'ss.huizong': { zh: '《宋史·徽宗纪》', en: 'Songshi, Annals of Huizong' },
    'ss.qinzong': { zh: '《宋史·钦宗纪》', en: 'Songshi, Annals of Qinzong' },
    'ss.dili': { zh: '《宋史·地理志》', en: 'Songshi, Treatise on Geography' },
    'ss.wangshao': { zh: '《宋史·王韶传》', en: 'Songshi, Biography of Wang Shao' },
    'ss.xiaxia': { zh: '《宋史·夏国传》', en: 'Songshi, Account of Xia' },
    'ss.tubo': { zh: '《宋史·吐蕃传》', en: 'Songshi, Account of the Tibetans' },
    'ss.waiguo': { zh: '《宋史·外国传》', en: 'Songshi, Accounts of Foreign States' },
    'ls.shengzong': { zh: '《辽史·圣宗纪》', en: 'Liaoshi, Annals of Shengzong' },
    'ls.tianzuo': { zh: '《辽史·天祚皇帝纪》', en: 'Liaoshi, Annals of the Tianzuo Emperor' },
    'ls.dili': { zh: '《辽史·地理志》', en: 'Liaoshi, Treatise on Geography' },
    'js.taizu': { zh: '《金史·太祖纪》', en: 'Jinshi, Annals of Taizu' },
    'js.taizong': { zh: '《金史·太宗纪》', en: 'Jinshi, Annals of Taizong' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
