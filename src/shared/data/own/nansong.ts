import type { Hold, OwnEra, Seat } from './types.ts';
import { LIAO_SEATS, NEIGHBOUR_SEATS, SONG_SEATS, XIA_SEATS } from './beisong.ts';

/**
 * 南宋 (1127–1279): seats and holdings for our own Southern Song maps, with 金, 伪齐, 西夏, 大理, 西辽 and 蒙古 / 元.
 * The seats are those of the Northern Song maps (beisong.ts: 《宋史·地理志》, 《辽史·地理志》 — the 辽 seats are 金's
 * from 1125, see 《金史·地理志》) plus the 金 frontier seats on the 界壕, the 蒙古 and 西辽 centres and a few 南宋 seats.
 * Each holding change cites the chapter that records it (`est` marks a date we infer).
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

/** the same city under its 南宋 / 金 name */
const RENAME: Record<string, [string, string]> = {
  kaifeng: ['南京开封府（汴京）', 'Nanjing Kaifeng (Bianjing)'],
  yanjing: ['中都大兴府（燕京）', 'Zhongdu Daxing (Yanjing)'],
  dading: ['北京大定府', 'Beijing Dading'],
  datong: ['西京大同府', 'Xijing Datong'],
  dongjing: ['东京辽阳府', 'Dongjing Liaoyang'],
  shangjing: ['临潢府', 'Linhuang'],
  huining: ['上京会宁府', 'Shangjing Huining'],
  huanglong: ['隆州（黄龙府）', 'Longzhou (Huanglong)'],
  hulan: ['蒲与路', 'Puyu circuit'],
  suping: ['恤品路', 'Xupin circuit'],
  helan: ['曷懒路', 'Helan circuit'],
  wuguo: ['胡里改路', 'Huligai circuit'],
  hangzhou: ['临安府（行在）', 'Lin’an (the temporary capital)'],
  xiangzhou: ['襄阳府', 'Xiangyang'],
  jiangning: ['建康府', 'Jiankang'],
  kelie: ['克烈部（土拉河）', 'Kereit (Tuul river)'],
  kerulen: ['塔塔儿部（克鲁伦河）', 'Tatar (Kherlen river)'],
  zhenzhou_kd: ['可敦城（和林川）', 'Kedun (Orkhon valley)'],
};

const seats: Seat[] = [
  ...[...SONG_SEATS, ...LIAO_SEATS, ...XIA_SEATS, ...NEIGHBOUR_SEATS].map(s =>
    RENAME[s.id] ? { ...s, name: { zh: RENAME[s.id][0], en: RENAME[s.id][1] } } : s),
  // 南宋 seats
  S('xihe', '西和州', 'Xihezhou', 105.30, 34.00, '甘肃西和', { r: 150 }),
  S('zaoyang', '枣阳军', 'Zaoyang Army', 112.75, 32.13, '湖北枣阳'),
  S('yashan', '崖山', 'Yashan', 113.08, 22.25, '广东江门新会崖门'),
  // 金 on the 界壕
  S('huanzhou_jin', '桓州', 'Huanzhou', 116.00, 42.25, '内蒙古正蓝旗', { r: 300 }),
  S('fuzhou_zb', '抚州', 'Fuzhou', 114.70, 41.15, '河北张北', { r: 260 }),
  S('jingzhou_sz', '净州', 'Jingzhou', 111.68, 41.65, '内蒙古四子王旗', { r: 300 }),
  // 东夏
  S('dongxia_nj', '东夏南京（城子山山城）', 'Southern capital of Dongxia', 129.47, 42.95, '吉林延吉', { r: 400 }),
  // 蒙古、西辽
  S('onon', '斡难河源', 'Source of the Onon', 110.60, 48.60, '蒙古国肯特省', { r: 800 }),
  S('emil', '叶密立', 'Emil', 83.63, 46.53, '新疆额敏', { r: 750 }),
];

const NS = 'nsong', JIN = 'jin', QI = 'nansong_weiqi', XX = 'xixia', DL = 'dali', XL = 'xiliao', MGT = 'mongol',
  MG = 'nansong_mongol', YUAN = 'yuan', DX = 'nansong_dongxia', TB = 'tubo_bu', TBM = 'nansong_tubo', HH = 'huihu_w',
  KH = 'karakhan', KW = 'nansong_khwarazm', CH = 'chagatai', GL = 'gaoli', AN = 'annam', ZC = 'nansong_zhancheng',
  TZ = 'nansong_tianzhu', PG = 'nansong_pagan', XN = 'nansong_xinan';

const holds: Record<string, Hold[]> = {};
/** the same holdings for a list of seats */
const set = (ids: string, ...h: Hold[]) => { for (const id of ids.trim().split(/\s+/)) holds[id] = h; };

// ---------------------------------------------------------------- 金 takes the north (1127–1131), 伪齐 (1130–1137)
// 河北 north and 河东: 金's by the end of 靖康
set('qizhou_aq dingzhou baozhou anshu guangxin xiongzhou bazhou xinan mozhou shunan yingzhou_hj qianning cangzhou',
  [1127, JIN], [1215, MG, 'ys.taizu']);
set('zhending zhaozhou xingzhou mingzhou shenzhou jizhou_hb', [1127, JIN], [1220, MG, 'ys.muqali']);
set('taiyuan xinzhou daizhou ninghua kelan huoshan lanzhou_lx xianzhou shizhou fenzhou liaozhou_zq pingding',
  [1127, JIN], [1218, MG, 'ys.muqali']);
set('weisheng luzhou zezhou jinzhou_lf jiangzhou_xj cizhou_jx xizhou_sx', [1127, JIN], [1220, MG, 'ys.muqali']);
// 河北 south: held into 1128
set('enzhou dezhou bozhou_lc dizhou binzhou cizhou xiangzhou_ay', [1127, NS], [1128, JIN, 'js.taizong'], [1220, MG, 'ys.muqali']);
set('daming', [1127, NS], [1128, JIN, 'js.taizong'], [1130, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1220, MG, 'ys.muqali']);
set('chanzhou weizhou_wh huaizhou', [1127, NS], [1128, JIN, 'js.taizong'], [1232, MG, 'ys.taizong']);
set('hezhong jiezhou', [1127, NS], [1128, JIN, 'js.taizong'], [1231, MG, 'ys.taizong']);
set('jinning fuzhou_fg linzhou', [1127, NS], [1128, JIN, 'js.taizong'], [1227, MG, 'est']);
// 京东: lost 1128–1129, given to 伪齐
set('qizhou_jn', [1127, NS], [1128, JIN, 'js.taizong'], [1130, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1220, MG, 'est']);
set('yunzhou jizhou_jy puzhou_sd yanzhou caozhou danzhou', [1127, NS], [1129, JIN, 'js.taizong'], [1130, QI, 'js.taizong'],
  [1137, JIN, 'js.xizong'], [1220, MG, 'ys.muqali']);
// 益都 and the east of 山东: 红袄军 / 李全 went over to 宋 (1218), to 蒙古 (1227)
set('qingzhou weizhou_wf mizhou laizhou dengzhou_pl zizhou yizhou_ly', [1127, NS], [1129, JIN, 'js.taizong'],
  [1130, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1218, NS, 'ss.liquan'], [1227, MG, 'ss.liquan']);
set('haizhou', [1127, NS], [1130, QI, 'est'], [1137, JIN, 'js.xizong'], [1161, NS, 'ss.gaozong'], [1164, JIN, 'ss.xiaozong'],
  [1218, NS, 'ss.liquan'], [1227, MG, 'ss.liquan']);
set('lianshui', [1127, NS], [1130, QI, 'est'], [1137, JIN, 'js.xizong'], [1218, NS, 'ss.liquan'], [1227, MG, 'ss.liquan']);
// 淮北 and 河南: 伪齐, then 金 to the end (1232–1234)
set('xuzhou huaiyang_jun suzhou_ah bozhou yingtian', [1127, NS], [1129, JIN, 'js.taizong'], [1130, QI, 'js.taizong'],
  [1137, JIN, 'js.xizong'], [1233, MG, 'ys.taizong']);
set('sizhou_xy', [1127, NS], [1130, QI, 'est'], [1137, JIN, 'js.xizong'], [1162, NS, 'ss.xiaozong'], [1164, JIN, 'ss.xiaozong'],
  [1233, MG, 'ys.taizong']);
set('kaifeng', [1127, NS], [1130, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1233, MG, 'ys.taizong']);
set('henan zhengzhou huazhou_hx mengzhou xuzhou_xc chenzhou ruzhou yingzhou_fy', [1127, NS], [1130, QI, 'js.taizong'],
  [1137, JIN, 'js.xizong'], [1232, MG, 'ys.taizong']);
set('caizhou', [1127, NS], [1130, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1234, MG, 'js.aizong']);
set('xizhou_xx', [1127, NS], [1130, QI, 'est'], [1137, JIN, 'js.xizong'], [1234, NS, 'ss.lizong'], [1236, MG, 'ss.lizong']);
// 襄阳六郡: 伪齐 李成 took them (1133), 岳飞 won them back (1134); 唐、邓 went to 金 by the 绍兴 treaty
set('tangzhou dengzhou_dz', [1127, NS], [1131, QI, 'est'], [1134, NS, 'ss.yuefei'], [1141, JIN, 'ss.gaozong'],
  [1162, NS, 'ss.xiaozong'], [1164, JIN, 'ss.xiaozong'], [1233, NS, 'ss.lizong'], [1236, MG, 'ss.lizong']);
set('xiangzhou', [1127, NS], [1133, QI, 'ss.gaozong'], [1134, NS, 'ss.yuefei'], [1236, MG, 'ss.lizong'],
  [1239, NS, 'ss.menggong'], [1273, MG, 'ys.shizu']);
set('suizhou yingzhou_zx xinyang zaoyang', [1127, NS], [1133, QI, 'ss.gaozong'], [1134, NS, 'ss.yuefei'], [1274, MG, 'ys.shizu']);
// 陕西: 金 from 1128 (关中, 鄜延) and 1130–1131 after 富平; 伪齐 1131–1137
set('jingzhao huazhou_hz tongzhou yaozhou qianzhou binzhou_bx fangzhou_hl fuzhou_fx danzhou_yc yanzhou_ya', [1127, NS],
  [1128, JIN, 'js.taizong'], [1131, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1231, MG, 'ys.taizong']);
set('baoan qingjian suizhou_sd mizhi', [1127, NS], [1128, JIN, 'js.taizong'], [1131, QI, 'js.taizong'], [1137, JIN, 'js.xizong'],
  [1231, MG, 'est']);
set('shanzhou', [1127, NS], [1130, JIN, 'js.taizong'], [1131, QI, 'js.taizong'], [1137, JIN, 'js.xizong'],
  [1232, MG, 'ys.taizong']);
set('guozhou', [1127, NS], [1130, JIN, 'js.taizong'], [1131, QI, 'js.taizong'], [1137, JIN, 'js.xizong'],
  [1161, NS, 'ss.gaozong'], [1164, JIN, 'ss.xiaozong'], [1232, MG, 'ys.taizong']);
set('shangzhou', [1127, NS], [1141, JIN, 'ss.gaozong'], [1161, NS, 'ss.gaozong'], [1164, JIN, 'ss.xiaozong'],
  [1232, MG, 'ys.taizong']);
set('ningzhou qingzhou_qy huanzhou dingbian jingzhou_jc weizhou_pl zhenrong', [1127, NS], [1130, JIN, 'js.taizong'],
  [1131, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1231, MG, 'est']);
set('fengxiang', [1127, NS], [1130, JIN, 'js.taizong'], [1131, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1231, MG, 'ys.taizong']);
set('qinzhou_ts longzhou deshun yuanzhou', [1127, NS], [1130, JIN, 'js.taizong'], [1131, QI, 'js.taizong'], [1137, JIN, 'js.xizong'],
  [1161, NS, 'ss.gaozong'], [1164, JIN, 'ss.xiaozong'], [1234, MG, 'est']);
set('tongyuan', [1127, NS], [1131, QI, 'js.taizong'], [1137, JIN, 'js.xizong'], [1235, MG, 'ys.wangshixian']);
set('xizhou_lt hezhou_lx lanzhou taozhou minzhou diezhou dangzhou huizhou_jy', [1127, NS], [1131, QI, 'js.taizong'],
  [1137, JIN, 'js.xizong'], [1227, MG, 'ys.taizu']);
// 西夏 takes the forts of the 天都 frontier (1128) and is given 西宁、乐州、积石 by 金 (1136)
set('xian_zhou tiandu huaide zhenwu', [1127, NS], [1128, XX, 'est'], [1227, MG, 'ys.taizu']);
set('xining huangzhou jishi kuozhou', [1127, NS], [1131, JIN, 'est'], [1136, XX, 'js.xixia'], [1227, MG, 'ys.taizu']);

// ---------------------------------------------------------------- 南宋
// 淮南、京西南、荆湖: 宋 to the 元 campaigns of 1274–1276
set('guangzhou_hc', [1127, NS], [1275, MG, 'ys.shizu']);
set('junzhou fangzhou', [1127, NS], [1274, MG, 'ys.shizu']);
set('jinzhou_ak', [1127, NS], [1276, MG, 'est']);
set('ezhou huangzhou_hg qizhou_qc jiangzhou_jj nankang chizhou raozhou hongzhou xuyi wuwei chuzhou_cz jiangling xiazhou_yc guizhou_zg fuzhou_tm jingmen anzhou yuezhou lizhou_lx shuzhou_qs',
  [1127, NS], [1275, MG, 'ys.shizu']);
set('jiangning taiping runzhou changzhou xuanzhou guangde suzhou', [1127, NS], [1275, MG, 'ys.shizu']);
set(`hangzhou huzhou xiuzhou yuezhou_sx mingzhou_nb taizhou_lh wenzhou chuzhou_ls wuzhou quzhou muzhou shezhou
  luzhou_hf shouzhou haozhou hezhou_hx yangzhou zhenzhou taizhou_tz tongzhou_nt gaoyou chuzhou_ha
  tanzhou langzhou_cd chenzhou_yl yuanzhou_zj jingzhou_jz shaozhou wugang hengzhou yongzhou quanzhou_qz daozhou chenzhou_cz
  xinhua xinzhou_sr fuzhou_jx jianchang yuanzhou_yc yunzhou_ga linjiang jizhou_ja qianzhou_gz`, [1127, NS], [1276, MG, 'ys.shizu']);
set('nanan', [1127, NS], [1277, MG, 'est']);
set('fuzhou jianzhou_jo nanjian shaowu quanzhou xinghua zhangzhou tingzhou', [1127, NS], [1277, MG, 'ys.shizu']);
set(`guangzhou shaozhou_sg nanxiong lianzhou yingzhou_yd huizhou xunzhou meizhou_mz chaozhou duanzhou xinzhou_xx fengzhou_fk
  kangzhou nanen guizhou zhaozhou_pl hezhou_hz wuzhou_wz tengzhou xunzhou_gp guizhou_gg rongzhou_rx yulin xiangzhou_xz liuzhou
  rongzhou_rs yizhou_ys binzhou_bm hengzhou_hx yongzhou_nn taiping_cz tianzhou qinzhou_qz lianzhou_hp`, [1127, NS], [1277, MG, 'ys.shizu']);
set('huazhou_hzh gaozhou qiongzhou_hk changhua wanan zhuya', [1127, NS], [1278, MG, 'ys.shizu']);
set('leizhou', [1127, NS], [1279, MG, 'est']);
set('yashan', [1127, null], [1278, NS, 'ss.yingguo'], [1279, MG, 'ss.yingguo']);
// 利州路 north: 蒙古 from 1236
set('xingyuan yangzhou_yx xingzhou_ly wenzhou_wx jiezhou_wd chengzhou fengzhou_fx xihe', [1127, NS], [1236, MG, 'est']);
// 四川: 蒙哥's campaign (1258) took the north and west; the rest held into the 1270s
set(`chengdu hanzhou pengzhou shuzhou qiongzhou yongkang mianzhou jianzhou_jy lingzhou_rs maozhou weizhou_wc meizhou yazhou
  lizhou_hy`, [1127, NS], [1257, MG, 'ys.xianzong']);
set('lizhou jianzhou longzhou_pw langzhou bazhou_bz pengzhou_yl guozhou_nc zizhou_st suizhou_sn guangan',
  [1127, NS], [1258, MG, 'ys.xianzong']);
set('jiazhou rongzhou_yb zizhou_zz puzhou_ay rongzhou changzhou_dz', [1127, NS], [1275, MG, 'est']);
set('luzhou_lz', [1127, NS], [1261, MG, 'ss.lizong'], [1262, NS, 'ss.lizong'], [1276, MG, 'est']);
set('quzhou_qx dazhou kaizhou wanzhou zhongzhou fuzhou_fl', [1127, NS], [1277, MG, 'est']);
set('yuzhou kuizhou nanping qianzhou_ps shizhou_es', [1127, NS], [1278, MG, 'ys.shizu']);
set('hezhou_hc', [1127, NS], [1279, MG, 'ys.shizu']);
set('bozhou_zy sizhou', [1127, NS], [1277, MG, 'est']);

// ---------------------------------------------------------------- 金's northern lands and 东夏
set('yanjing zhuozhou yizhou_yx xincheng guan_l wuqing tanzhou_my shunzhou jizhou_jx jingzhou_zh pingzhou luanzhou yingzhou_cl',
  [1127, JIN], [1215, MG, 'ys.taizu']);
set('datong yingzhou_yx shuozhou wuzhou_sc weizhou_yx fengsheng guihua ruzhou_yq', [1127, JIN], [1215, MG, 'est']);
set('fengzhou_hh dongsheng ningbian tiande huanzhou_jin fuzhou_zb jingzhou_sz', [1127, JIN], [1211, MG, 'ys.taizu']);
set('dading beian zezhou_pq xingzhong jinzhou_lx laizhou_sz yizhou_yx2 shangjing qingzhou_bl', [1127, JIN], [1215, MG, 'ys.taizu']);
set('taizhou_l changchun huanglong ningjiang xianzhou_bz', [1127, JIN], [1213, MG, 'ys.yelvliuge']);
set('dongjing shenzhou_sy haizhou_hc chenzhou_gz suzhou_jz', [1127, JIN], [1216, MG, 'est']);
set('kaizhou_fc laiyuan xianzhou_ky huining hulan wuguo suping helan changbai', [1127, JIN], [1217, DX, 'js.xuanzong'],
  [1233, MG, 'ys.taizong']);
set('dongxia_nj', [1127, JIN], [1217, DX, 'js.xuanzong'], [1233, MG, 'ys.taizong']);
// 汪古 kept 金's frontier and went over to 铁木真
set('wanggu', [1127, JIN], [1207, MG, 'est']);

// ---------------------------------------------------------------- 西夏
set('xiazhou yinzhou youzhou yanzhou_db hongzhou_xx lingzhou xingqing heishan baima zhuoluo', [1127, XX], [1227, MG, 'ys.taizu']);
set('liangzhou ganzhou suzhou_jq guazhou shazhou heishui', [1127, XX], [1226, MG, 'ys.taizu']);

// ---------------------------------------------------------------- 漠北, 西域
set('onon kelie kerulen naiman mieerqi wugu', [1127, MGT], [1206, MG, 'ys.taizu']);
set('zhenzhou_kd', [1127, XL], [1131, MGT, 'est'], [1206, MG, 'ys.taizu']);
set('emil', [1127, null], [1132, XL, 'ls.tianzuo'], [1218, MG, 'ys.taizu']);
set('gaochang beiting yizhou_hm', [1127, HH], [1209, MG, 'ys.taizu']);
set('qiuci', [1127, HH], [1209, MG, 'ys.taizu'], [1264, CH, 'est']);
set('balasagun', [1127, KH], [1134, XL, 'ls.tianzuo'], [1218, MG, 'ys.taizu'], [1264, CH, 'est']);
set('kashgar yutian talas', [1127, KH], [1137, XL, 'est'], [1218, MG, 'ys.taizu'], [1264, CH, 'est']);
set('samarkand bukhara', [1127, KH], [1210, KW, 'est'], [1220, MG, 'ys.taizu'], [1264, CH, 'est']);

// ---------------------------------------------------------------- 大理, 吐蕃 and the other neighbours
set('dali beisheng', [1127, DL], [1253, MG, 'ys.xianzong']);
set('shanchan jianchang_xc huichuan weichu yongchang tengchong tonghai shicheng wusa kainan mengle', [1127, DL], [1254, MG, 'ys.wlht']);
set('luodian ziqi', [1127, XN]);
set('duyun nandan', [1127, NS], [1277, MG, 'est']);
set('lhasa sakya guge ladakh qiangtang nagqu kongpo kham yushu ganzi qaidam guoluo songpan qinghai', [1127, TB], [1247, TBM, 'est']);
set('kaijing xijing_py qingzhou_kr quanzhou_kr anbei', [1127, GL]);
set('shenglong liangzhou_vn qinghua yian buzheng', [1127, AN]);
set('zhancheng wuli', [1127, ZC]);
set('lahore kashmir kannauj nepal pataliputra kamarupa', [1127, TZ]);
set('pagan myitkyina', [1127, PG]);

// 大蒙古国 becomes 元 (1271): every 蒙古 holding from then on is 元's
for (const id of Object.keys(holds)) {
  const h = holds[id].map(([y, p, s]): Hold => [y, p === MG && y >= 1271 ? YUAN : p, s]);
  const i = h.findIndex(([y]) => y > 1271);
  const before = (i < 0 ? h : h.slice(0, i)).filter(([y]) => y <= 1271).at(-1);
  if (before?.[1] === MG && before[0] < 1271) h.splice(i < 0 ? h.length : i, 0, [1271, YUAN, 'ys.shizu']);
  holds[id] = h;
}

export const NANSONG: OwnEra = {
  replaces: 'nansong',
  // the period's own dynasty is the realm; its neighbours here are rivals (area readout, map-reading)
  roles: { jin: 'rival', xixia: 'rival', dali: 'rival', yuan: 'rival' },
  reach: 220,
  polities: [
    { id: QI, name: { zh: '伪齐（刘豫）', en: 'Puppet Qi (Liu Yu)' }, color: '#8e6c3a', role: 'rival' },
    { id: MG, name: { zh: '大蒙古国', en: 'Great Mongol State' }, color: '#4a6984', role: 'rival' },
    { id: DX, name: { zh: '东夏', en: 'Eastern Xia (Dongxia)' }, color: '#7a8c6a', role: 'rival' },
    { id: TBM, name: { zh: '吐蕃（归附蒙古）', en: 'Tibet (submitted to the Mongols)' }, color: '#9aa6b8', role: 'protectorate' },
    { id: KW, name: { zh: '花剌子模', en: 'Khwarazm' }, color: '#c9bba5', role: 'neighbor' },
    { id: ZC, name: { zh: '占城', en: 'Champa' }, color: '#b9c2b0', role: 'neighbor' },
    { id: TZ, name: { zh: '天竺诸国', en: 'Indian kingdoms' }, color: '#c8bfa9', role: 'neighbor' },
    { id: PG, name: { zh: '蒲甘', en: 'Pagan' }, color: '#bcc4ad', role: 'neighbor' },
    { id: XN, name: { zh: '西南诸蛮（罗殿、自杞）', en: 'Southwestern peoples (Luodian, Ziqi)' }, color: '#b6b99d', role: 'neighbor' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_nansong_1', from: 1127, to: 1129, at: 1128, title: { zh: '靖康之后，金军尽取河北、河东（1128年）', en: 'After Jingkang: Jin takes Hebei and Hedong (1128)' } },
    { id: 'o_nansong_2', from: 1130, to: 1140, at: 1135, title: { zh: '金立刘豫伪齐，岳飞收复襄阳六郡（约1135年 · 1130年立伪齐，1134年收复六郡）', en: 'Jin sets up Liu Yu’s Qi; Yue Fei wins back the six Xiangyang prefectures (c. 1135; Qi set up in 1130, the six prefectures won back in 1134)' } },
    { id: 'o_nansong_3', from: 1141, to: 1160, at: 1150, title: { zh: '绍兴和议：东以淮水、西以大散关为界（约1150年 · 和议成于1141年）', en: 'Shaoxing treaty: the Huai and the Dasan pass as the border (c. 1150; treaty of 1141)' } },
    { id: 'o_nansong_4', from: 1161, to: 1164, at: 1162, title: { zh: '完颜亮南侵失败，宋军收复海、泗、唐、邓与秦州（1162年）', en: 'Wanyan Liang’s invasion fails; Song retakes Hai, Si, Tang, Deng and Qin (1162)' } },
    { id: 'o_nansong_5', from: 1165, to: 1205, at: 1190, title: { zh: '隆兴和议以后，宋金南北对峙（约1190年）', en: 'After the Longxing treaty: Song and Jin face each other (c. 1190)' } },
    { id: 'o_nansong_6', from: 1206, to: 1214, at: 1210, title: { zh: '铁木真称成吉思汗，建大蒙古国（约1210年 · 事在1206年）', en: 'Temüjin becomes Chinggis Khan: the Great Mongol State (c. 1210; in 1206)' } },
    { id: 'o_nansong_7', from: 1215, to: 1226, at: 1220, title: { zh: '蒙古取中都，金南迁汴京（约1220年 · 1214年南迁，1215年中都陷落）', en: 'The Mongols take Zhongdu; Jin moves to Bianjing (c. 1220; Jin moved in 1214, Zhongdu fell in 1215)' } },
    { id: 'o_nansong_8', from: 1227, to: 1233, at: 1230, title: { zh: '西夏亡，金守河南、关中（约1230年 · 西夏亡于1227年）', en: 'Xia falls; Jin holds Henan and the Guanzhong (c. 1230; Xia fell in 1227)' } },
    { id: 'o_nansong_9', from: 1234, to: 1252, at: 1240, title: { zh: '宋蒙灭金，宋蒙对峙（约1240年 · 金亡于1234年）', en: 'Song and the Mongols end Jin and face each other (c. 1240; Jin fell in 1234)' } },
    { id: 'o_nansong_10', from: 1253, to: 1268, at: 1260, title: { zh: '蒙古灭大理，蒙哥攻蜀（约1260年 · 1253–1254年灭大理，1258–1259年攻蜀）', en: 'The Mongols conquer Dali; Möngke invades Sichuan (c. 1260; Dali conquered 1253–1254, Sichuan invaded 1258–1259)' } },
    { id: 'o_nansong_11', from: 1269, to: 1275, at: 1273, title: { zh: '元军围襄樊，襄阳失守（1273年）', en: 'Yuan besieges Xiangyang and Fancheng; Xiangyang falls (1273)' } },
    { id: 'o_nansong_12', from: 1276, to: 1277, at: 1276, title: { zh: '元军入临安，宋室退保闽广（1276年）', en: 'Yuan enters Lin’an; the Song court flees to Fujian and Guangdong (1276)' } },
    { id: 'o_nansong_13', from: 1278, to: 1279, at: 1278, title: { zh: '崖山与钓鱼城：南宋最后的据点（1278年）', en: 'Yashan and Diaoyu fortress: the last Song strongholds (1278)' } },
  ],
  sources: {
    'ss.gaozong': { zh: '《宋史·高宗纪》', en: 'Songshi, Annals of Gaozong' },
    'ss.xiaozong': { zh: '《宋史·孝宗纪》', en: 'Songshi, Annals of Xiaozong' },
    'ss.lizong': { zh: '《宋史·理宗纪》', en: 'Songshi, Annals of Lizong' },
    'ss.yingguo': { zh: '《宋史·瀛国公纪》（附二王）', en: 'Songshi, Annals of the Duke of Ying (with the two princes)' },
    'ss.yuefei': { zh: '《宋史·岳飞传》', en: 'Songshi, Biography of Yue Fei' },
    'ss.menggong': { zh: '《宋史·孟珙传》', en: 'Songshi, Biography of Meng Gong' },
    'ss.liquan': { zh: '《宋史·叛臣传·李全》', en: 'Songshi, Biography of Li Quan (Rebels)' },
    'js.taizong': { zh: '《金史·太宗纪》', en: 'Jinshi, Annals of Taizong' },
    'js.xizong': { zh: '《金史·熙宗纪》', en: 'Jinshi, Annals of Xizong' },
    'js.xuanzong': { zh: '《金史·宣宗纪》', en: 'Jinshi, Annals of Xuanzong' },
    'js.aizong': { zh: '《金史·哀宗纪》', en: 'Jinshi, Annals of Aizong' },
    'js.xixia': { zh: '《金史·西夏传》', en: 'Jinshi, Account of Xia' },
    'ls.tianzuo': { zh: '《辽史·天祚皇帝纪》（附耶律大石）', en: 'Liaoshi, Annals of the Tianzuo Emperor (with Yelü Dashi)' },
    'ys.taizu': { zh: '《元史·太祖纪》', en: 'Yuanshi, Annals of Taizu (Chinggis Khan)' },
    'ys.taizong': { zh: '《元史·太宗纪》', en: 'Yuanshi, Annals of Taizong (Ögödei)' },
    'ys.xianzong': { zh: '《元史·宪宗纪》', en: 'Yuanshi, Annals of Xianzong (Möngke)' },
    'ys.shizu': { zh: '《元史·世祖纪》', en: 'Yuanshi, Annals of Shizu (Khubilai)' },
    'ys.muqali': { zh: '《元史·木华黎传》', en: 'Yuanshi, Biography of Muqali' },
    'ys.yelvliuge': { zh: '《元史·耶律留哥传》', en: 'Yuanshi, Biography of Yelü Liuge' },
    'ys.wangshixian': { zh: '《元史·汪世显传》', en: 'Yuanshi, Biography of Wang Shixian' },
    'ys.wlht': { zh: '《元史·兀良合台传》', en: 'Yuanshi, Biography of Uriyangqadai' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
