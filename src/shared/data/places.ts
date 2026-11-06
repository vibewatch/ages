import { importedPlaces, type RiverLabel } from './jiangshan.ts';
import type { I18n, Place, Year } from './types.ts';

type Names = [from: Year, to: Year, zh: string, en: string][];
type Lore = [tagZh: string, tagEn: string, descZh: string, descEn: string];
const pl = (id: string, lon: number, lat: number, zh: string, en: string, o: {
  kind?: Place['kind']; tier?: Place['tier']; names?: Names; capital?: [Year, Year][]; since?: Year; until?: Year;
  lore?: Lore; modern?: [string, string];
} = {}): Place => ({
  id, scope: 'china', lon, lat, kind: o.kind ?? 'city', tier: o.tier ?? 2, name: { zh, en },
  names: o.names?.map(([from, to, z, e]) => ({ from, to, name: { zh: z, en: e } })),
  capital: o.capital, since: o.since, until: o.until,
  lore: o.lore ? { tag: { zh: o.lore[0], en: o.lore[1] }, desc: { zh: o.lore[2], en: o.lore[3] } } : undefined,
  modern: o.modern ? { zh: o.modern[0], en: o.modern[1] } : undefined,
});

/** Cities, passes and sites. Names change with the period (镐京 → 长安 → 大兴 → 西安); capitals get a marker. */
const CURATED: Place[] = [
  // ---- great capitals -------------------------------------------------------------------------------------------
  pl('xian', 108.94, 34.27, '西安', 'Xi’an', { tier: 1, since: 1369,
    names: [[-1046, -771, '镐京', 'Haojing'], [-202, 581, '长安', 'Chang’an'], [582, 617, '大兴', 'Daxing'], [618, 1368, '长安', 'Chang’an']],
    capital: [[-1046, -771], [-202, 8], [190, 195], [582, 904]] }),
  pl('xianyang', 108.71, 34.33, '咸阳', 'Xianyang', { tier: 2, capital: [[-350, -207]], since: -350 }),
  pl('luoyang', 112.45, 34.62, '洛阳', 'Luoyang', { tier: 1, since: -256, names: [[-770, -256, '洛邑', 'Luoyi']],
    capital: [[-770, -256], [25, 190], [220, 311], [494, 534], [605, 618], [690, 705], [923, 936]] }),
  pl('anyang', 114.32, 36.12, '安阳', 'Anyang', { tier: 2, names: [[-1300, -1046, '殷', 'Yin']], capital: [[-1300, -1046]], since: -257 }),
  pl('erlitou', 112.69, 34.69, '二里头', 'Erlitou', { kind: 'site', tier: 3, until: -1000, modern: ['洛阳·偃师', 'Yanshi, Luoyang'],
    lore: ['最早中国 · 夏都斟鄩', 'Earliest Royal Capital · Xia Heartland',
      '位于洛阳盆地伊洛河畔，拥有中国最早的井字形大道网、宫城与青铜器作坊，出土青铜爵与绿松石龙形器，学术界普遍认为是夏代晚期都城斟鄩遗址。',
      'Set between the Yi and Luo rivers near Luoyang, Erlitou preserves China’s earliest grid-planned palace complex, bronze foundries, ritual bronze jue, and turquoise dragon mosaic, widely identified with the late Xia capital Zhenxun.'] }),
  pl('zhengzhou', 113.65, 34.76, '郑州', 'Zhengzhou', { tier: 2, names: [[-1600, -1300, '亳', 'Bo']], since: 583 }),
  pl('kaifeng', 114.31, 34.8, '开封', 'Kaifeng', { tier: 1, since: 1368,
    names: [[-364, -225, '大梁', 'Daliang'], [578, 906, '汴州', 'Bianzhou'], [907, 1127, '东京（汴梁）', 'Bianjing'], [1128, 1367, '汴梁', 'Bianliang']], capital: [[907, 923], [936, 1127]] }),
  pl('hangzhou', 120.16, 30.27, '杭州', 'Hangzhou', { tier: 1, names: [[1129, 1276, '临安', 'Lin’an']], capital: [[907, 978], [1138, 1276]], since: 589 }),
  pl('nanjing', 118.78, 32.06, '南京', 'Nanjing', { tier: 1, since: 1421,
    names: [[229, 280, '建业', 'Jianye'], [317, 589, '建康', 'Jiankang'], [937, 975, '金陵', 'Jinling'], [1368, 1420, '应天府', 'Yingtian'],
      [1853, 1864, '天京', 'Tianjing']],
    capital: [[229, 280], [317, 589], [937, 975], [1368, 1420], [1853, 1864], [1912, 1912], [1927, 1949]] }),
  pl('beijing', 116.4, 39.9, '北京', 'Beijing', { tier: 1, since: 1403,
    names: [[-1045, -222, '蓟', 'Ji'], [-221, 937, '幽州', 'Youzhou'], [938, 1152, '燕京', 'Yanjing'], [1153, 1214, '中都', 'Zhongdu'],
      [1267, 1368, '大都', 'Dadu'], [1369, 1402, '北平', 'Beiping'], [1928, 1949, '北平', 'Beiping']],
    capital: [[1153, 1214], [1267, 1368], [1421, 1911], [1912, 1927], [1949, 2100]] }),
  pl('datong', 113.3, 40.09, '大同', 'Datong', { tier: 3, names: [[398, 494, '平城', 'Pingcheng']], capital: [[398, 494]], since: 1048 }),
  pl('shenyang', 123.43, 41.8, '沈阳', 'Shenyang', { tier: 2, names: [[1625, 1911, '盛京', 'Shengjing']], capital: [[1625, 1644]], since: 1296 }),
  pl('xingqing', 106.23, 38.49, '银川', 'Yinchuan', { tier: 3, names: [[1038, 1227, '兴庆府', 'Xingqing']], capital: [[1038, 1227]], since: 1945 }),
  pl('shangjing', 119.38, 43.95, '辽上京', 'Liao Supreme Capital', { kind: 'site', tier: 3, capital: [[918, 1120]], since: 918, modern: ['赤峰·巴林左旗', 'Bairin Left Banner, Chifeng'],
    lore: ['契丹龙兴 · 南北双城', 'Khitan Imperial Seat · Twin-City Capital',
      '耶律阿保机于神册三年（918）在潢水之滨始建皇都，后改称上京临潢府。城分北皇城（契丹皇族）与南汉城（汉人商工），体现辽代“因俗而治”的南北面官格局。',
      'Founded by Abaoji in 918 along the Xar Moron River as Linhuang-fu, the Liao Supreme Capital paired a northern imperial city for Khitan elites with a southern market city for Han residents, reflecting Liao dual administration.'] }),
  pl('huining', 126.95, 45.5, '金上京', 'Jin Supreme Capital', { kind: 'site', tier: 3, capital: [[1115, 1153]], since: 1115, modern: ['哈尔滨·阿城', 'Acheng, Harbin'],
    lore: ['按出虎水 · 女真兴王之地', 'Ashihe Heartland · First Jin Capital',
      '位于阿什河（女真语“按出虎水”，意为金水）流域。1115年完颜阿骨打在此称帝建金，定为上京会宁府，至1153年完颜亮迁都中都（今北京）前为金朝政治中枢。',
      'Beside the Ashihe ("River of Gold" in Jurchen), Wanyan Aguda proclaimed the Jin dynasty here in 1115; Huining Prefecture served as the Jin Supreme Capital until the court moved south to Zhongdu (Beijing) in 1153.'] }),
  pl('dali', 100.16, 25.69, '大理', 'Dali', { tier: 3, names: [[738, 902, '太和城', 'Taihe']], capital: [[738, 1253]], since: 937 }),
  pl('chengdu', 104.07, 30.67, '成都', 'Chengdu', { tier: 1, capital: [[221, 263], [934, 965]], since: -316 }),
  pl('chongqing', 106.55, 29.56, '重庆', 'Chongqing', { tier: 2, capital: [[1937, 1946]], since: 1189 }),
  pl('wuhan', 114.3, 30.59, '武汉', 'Wuhan', { tier: 1, names: [[1911, 1949, '武昌', 'Wuchang']], since: 1949 }),
  pl('changsha', 112.94, 28.23, '长沙', 'Changsha', { tier: 2, since: -221 }),
  pl('guangzhou', 113.26, 23.13, '广州', 'Guangzhou', { tier: 1, names: [[-214, 226, '番禺', 'Panyu']], since: 226 }),
  pl('quanzhou', 118.59, 24.91, '泉州', 'Quanzhou', { tier: 2, since: 711 }),
  pl('yangzhou', 119.42, 32.39, '扬州', 'Yangzhou', { tier: 2, since: 589 }),
  pl('suzhou', 120.62, 31.3, '苏州', 'Suzhou', { tier: 3, since: 589 }),
  pl('shanghai', 121.47, 31.23, '上海', 'Shanghai', { tier: 1, since: 1292 }),
  pl('tianjin', 117.2, 39.13, '天津', 'Tianjin', { tier: 2, since: 1404 }),
  pl('jinan', 117.0, 36.67, '济南', 'Jinan', { tier: 3, since: -153 }),
  pl('qufu', 116.99, 35.6, '曲阜', 'Qufu', { tier: 2, capital: [[-1042, -256]], since: -1100 }),
  pl('linzi', 118.31, 36.86, '临淄', 'Linzi', { tier: 3, capital: [[-859, -221]], since: -900 }),
  pl('handan', 114.49, 36.6, '邯郸', 'Handan', { tier: 3, capital: [[-386, -228]], since: -500 }),
  pl('ying', 112.19, 30.35, '郢', 'Ying', { kind: 'site', tier: 3, capital: [[-689, -278]], since: -700, modern: ['荆州·纪南城', 'Jingzhou, Hubei'],
    lore: ['江汉都会 · 荆楚王都', 'Jianghan Metropolis · Capital of Chu',
      '地处江汉平原腹心（今湖北荆州纪南城遗址）。自楚文王迁都于此至前278年秦将白起拔郢，历二十余王、四百余年，为南方最大都会与楚辞、漆器、青铜文明中心。',
      'Located on the Jianghan Plain at modern Jingzhou, Ying served as the royal capital of Chu for over four centuries until Qin general Bai Qi captured it in 278 BCE, nurturing Chu poetry, lacquerware, and bronze art.'] }),
  pl('fuzhou', 119.3, 26.08, '福州', 'Fuzhou', { tier: 3, since: 725 }),
  pl('kunming', 102.83, 24.88, '昆明', 'Kunming', { tier: 2, since: 1276 }),
  pl('lanzhou', 103.83, 36.06, '兰州', 'Lanzhou', { tier: 2, since: 581,
    lore: ['河西咽喉 · 金城津要', 'Yellow River Crossing · Gateway to Hexi',
      '古称金城，黄河穿城而过，扼守中原通往河西走廊、青海与西域之咽喉。西汉霍去病西征渡河于此，设金城郡；隋置兰州总管府，历为丝路渡口与西北军事重镇。',
      'Anciently known as Jincheng, Lanzhou commands the narrow valley where the Silk Road crosses the Yellow River into the Hexi Corridor and Qinghai, fortified since Han general Huo Qubing’s western campaigns.'] }),
  pl('xining', 101.78, 36.62, '西宁', 'Xining', { tier: 3, since: 1104 }),
  pl('lhasa', 91.11, 29.65, '拉萨', 'Lhasa', { tier: 1, names: [[600, 1300, '逻些', 'Rasa']], capital: [[633, 842]], since: 1301 }),
  pl('urumqi', 87.62, 43.83, '乌鲁木齐', 'Ürümqi', { tier: 2, since: 1955, names: [[1763, 1954, '迪化', 'Dihua']] }),
  pl('kashgar', 75.99, 39.47, '喀什', 'Kashgar', { tier: 2, names: [[-200, 1700, '疏勒', 'Shule']], since: 1701 }),
  pl('luntai', 84.25, 41.78, '轮台', 'Luntai', { tier: 3, names: [[-60, 107, '乌垒（西域都护府）', 'Wulei']], since: -101,
    lore: ['天山南麓 · 西域都护治所', 'Tarim North Rim · Seat of the Western Regions Protectorate',
      '位于天山南麓、塔里木盆地北缘。汉武帝晚年下《轮台罪己诏》息兵屯田；汉宣帝神爵二年（前60）设西域都护府于乌垒城（今轮台策大雅），标志西域正式纳入中央政权管辖。',
      'Along the northern rim of the Tarim Basin, Luntai (Wulei) became the seat of the Han Protectorate of the Western Regions in 60 BCE under Emperor Xuan, bringing the oasis states of Xinjiang under central administration.'] }),
  pl('turpan', 89.19, 42.95, '吐鲁番', 'Turpan', { tier: 3, names: [[-100, 1300, '高昌', 'Gaochang']], since: 1301 }),
  pl('dunhuang', 94.66, 40.14, '敦煌', 'Dunhuang', { tier: 1, since: -111 }),
  pl('jiuquan', 98.49, 39.73, '酒泉', 'Jiuquan', { tier: 3, since: -121 }),
  pl('hohhot', 111.75, 40.84, '呼和浩特', 'Hohhot', { tier: 2, since: 1954, names: [[1581, 1953, '归化城', 'Guihua']] }),
  pl('harbin', 126.63, 45.75, '哈尔滨', 'Harbin', { tier: 2, since: 1898,
    lore: ['松花江畔 · 北疆铁路枢纽', 'Songhua River Hub · Northeast Railway Crossroads',
      '地处松花江中游平原，金代故都阿城（上京会宁府）在其东南。1898年中东铁路与南满支线交会于此而迅速崛起为近代东北国际商埠，抗战时期为东北抗日联军重要活动区域。',
      'Rising on the Songhua River plain near the old Jin capital at Acheng, Harbin grew rapidly after 1898 at the junction of the Chinese Eastern Railway and was a key center of resistance in the Northeast during the War against Japan.'] }),
  pl('changchun', 125.32, 43.82, '长春', 'Changchun', { tier: 3, since: 1800 }),
  pl('dalian', 121.61, 38.91, '大连', 'Dalian', { tier: 3, names: [[1898, 1945, '旅大', 'Port Arthur–Dalny']], since: 1946 }),
  pl('taipei', 121.56, 25.04, '台北', 'Taipei', { tier: 1, since: 1875 }),
  pl('tainan', 120.2, 22.99, '台南', 'Tainan', { tier: 3, since: 1887, names: [[1624, 1683, '赤嵌', 'Chikan'], [1684, 1886, '台湾府', 'Taiwan-fu']] }),
  pl('hongkong', 114.17, 22.32, '香港', 'Hong Kong', { tier: 1, since: 1842 }),
  pl('macao', 113.54, 22.19, '澳门', 'Macao', { tier: 2, since: 1557 }),
  pl('shenzhen', 114.06, 22.54, '深圳', 'Shenzhen', { tier: 2, since: 1979 }),
  pl('haikou', 110.35, 20.02, '海口', 'Haikou', { tier: 3, since: 1388 }),
  // ---- revolution and modern history sites ----------------------------------------------------------------------
  pl('jiaxing', 120.75, 30.75, '嘉兴南湖', 'South Lake, Jiaxing', { kind: 'site', tier: 3, since: 1921, modern: ['浙江·嘉兴', 'Jiaxing, Zhejiang'],
    lore: ['烟雨南湖 · 红船启航之地', 'South Lake Mist · Where the Red Boat Set Sail',
      '位于浙江嘉兴城南。1921年7月底中共一大因上海法租界巡捕搜查转移至嘉兴南湖一艘画舫（红船）上续开，通过党纲、选举中央局，庄严宣告中国共产党诞生。',
      'When French Concession police raided the Shanghai venue in late July 1921, delegates reconvened aboard a painted boat on Jiaxing’s South Lake to adopt the party program and formally found the Communist Party of China.'] }),
  pl('nanchang', 115.86, 28.68, '南昌', 'Nanchang', { tier: 2, since: 762 }),
  pl('jinggangshan', 114.17, 26.57, '井冈山', 'Jinggangshan', { kind: 'mountain', tier: 3, since: 1927, modern: ['江西·吉安', 'Ji’an, Jiangxi'],
    lore: ['罗霄山脉 · 中国革命摇篮', 'Luoxiao Range · Cradle of the Chinese Revolution',
      '地处湘赣边界罗霄山脉中段。1927年10月毛泽东率秋收起义部队在此创建第一个农村革命根据地，1928年4月朱德、陈毅率部到此实现井冈山会师，开辟“农村包围城市、武装夺取政权”道路。',
      'In the central Luoxiao Mountains on the Hunan–Jiangxi border, Mao Zedong established the first rural revolutionary base here in October 1927 and joined forces with Zhu De in April 1928.'] }),
  pl('ruijin', 116.03, 25.89, '瑞金', 'Ruijin', { tier: 3, since: 905,
    lore: ['赣南苏区 · 红色故都', 'Southern Jiangxi · Cradle of the Soviet Republic',
      '位于武夷山西麓贡水之源。1931年11月中华苏维埃共和国临时中央政府在瑞金叶坪成立，为中央革命根据地首府；1934年10月中央红军由此出发开始长征。',
      'Set in the Wuyi foothills at the headwaters of the Gong River, Ruijin became the capital of the Chinese Soviet Republic in November 1931 and the main departure point of the Central Red Army’s Long March in October 1934.'] }),
  pl('zunyi', 106.93, 27.73, '遵义', 'Zunyi', { tier: 3, since: 639 }),
  pl('yanan', 109.49, 36.6, '延安', 'Yan’an', { tier: 2, since: 1089 }),
  pl('xibaipo', 113.94, 38.35, '西柏坡', 'Xibaipo', { kind: 'site', tier: 3, since: 1947, modern: ['石家庄·平山', 'Pingshan, Shijiazhuang'],
    lore: ['太行东麓 · 进京赶考出发地', 'Taihang Foothills · Last Rural Command Center',
      '地处太行山东麓滹沱河北岸。1948—1949年中共中央驻此指挥辽沈、淮海、平津三大战役，召开七届二中全会，并于1949年3月由此动身“进京赶考”。',
      'On the north bank of the Hutuo River at the foot of the Taihang Mountains, Xibaipo was the headquarters from which the CPC directed the Three Great Campaigns and held the Second Plenum of the 7th Central Committee before entering Beijing in March 1949.'] }),
  pl('lugouqiao', 116.21, 39.85, '卢沟桥', 'Marco Polo Bridge', { kind: 'site', tier: 3, since: 1192, modern: ['北京·丰台', 'Fengtai, Beijing'],
    lore: ['永定河渡 · 全民族抗战起点', 'Yongding River Crossing · Start of Full-Scale Resistance',
      '横跨永定河（古卢沟河）之上，金大定二十九年（1189）始建，以雕栏石狮与“卢沟晓月”著称。1937年7月7日日军在此挑起七七事变，中国全民族抗战由此爆发。',
      'Built under the Jin dynasty in 1189–1192 across the Yongding River and famed for its stone lions and "Dawn Moon at Lugou", the bridge was the site of the July 7 Incident of 1937 that ignited China’s full-scale War of Resistance against Japan.'] }),
  pl('taierzhuang', 117.73, 34.56, '台儿庄', 'Tai’erzhuang', { kind: 'site', tier: 3, since: 1600, modern: ['枣庄·台儿庄', 'Zaozhuang, Shandong'],
    lore: ['运河重镇 · 抗战正面战场最大捷', 'Grand Canal Town · Greatest Early Nationalist Victory',
      '位于鲁苏交界京杭大运河畔，扼徐州门户。1938年春李宗仁指挥第五战区中国军队在此浴血奋战，歼灭日军万余人，取得抗战以来正面战场最大一场胜利。',
      'Standing on the Grand Canal at the northern gateway to Xuzhou, Tai’erzhuang was the scene of the spring 1938 battle where Chinese forces under Li Zongren won the largest front-line victory of the early War of Resistance.'] }),
  pl('pingxingguan', 113.93, 39.33, '平型关', 'Pingxingguan', { kind: 'pass', tier: 3, since: 1400, modern: ['大同·灵丘', 'Lingqiu, Shanxi'],
    lore: ['内长城隘口 · 全民族抗战首胜', 'Inner Great Wall Pass · First Major Victory of the War',
      '地处晋东北恒山与太行山交界，为明内长城要隘。1937年9月25日林彪率八路军第115师在此设伏，歼灭日军精锐千余人，打破了日军“不可战胜”的神话。',
      'A steep defile along the Inner Great Wall in northeastern Shanxi where the Eighth Route Army’s 115th Division ambushed Japanese forces on 25 September 1937, winning the first major Chinese victory of the war.'] }),
  pl('humen', 113.67, 22.82, '虎门', 'Humen', { kind: 'site', tier: 3, since: 1800, modern: ['东莞·虎门', 'Dongguan, Guangdong'],
    lore: ['珠江咽喉 · 林则徐销烟之地', 'Pearl River Throat · Site of the Opium Destruction',
      '扼珠江口入海水道，大虎、小虎二山对峙如门，为广州海防要塞。1839年6月林则徐在此海滩当众销毁鸦片二百三十余万斤；1841年广东水师提督关天培在此壮烈殉国。',
      'Guarding the Pearl River estuary south of Guangzhou, Humen was where imperial commissioner Lin Zexu destroyed over 1,100 tonnes of opium in June 1839 and where Admiral Guan Tianpei fell defending the forts in 1841.'] }),
  pl('weihai', 122.12, 37.51, '威海卫', 'Weihaiwei', { tier: 3, since: 1398, modern: ['山东·威海', 'Weihai, Shandong'],
    lore: ['胶东海防 · 北洋水师刘公岛基地', 'Shandong Naval Fortress · Beiyang Fleet Base',
      '地处山东半岛东端，隔海与辽东旅顺对峙，共扼渤海门户。明洪武年间设卫防倭；清光绪年间建刘公岛北洋水师提督署，1895年威海卫之战北洋舰队在此覆没。',
      'At the tip of the Shandong Peninsula opposite Lushun across the Bohai Strait, Weihaiwei and Liugong Island served as headquarters of the Qing Beiyang Fleet until its last stand in the 1895 Battle of Weihaiwei.'] }),
  pl('xiaogang', 117.85, 32.6, '小岗村', 'Xiaogang', { kind: 'site', tier: 3, since: 1978, modern: ['滁州·凤阳', 'Fengyang, Anhui'],
    lore: ['淮畔农庄 · 中国农村改革源头', 'Huai River Village · Birthplace of Rural Reform',
      '位于安徽凤阳县东南部。1978年冬小岗村十八户农民按下红手印，实行“包干到户”，拉开了家庭联产承包责任制与中国农村改革开放的序幕。',
      'In this Fengyang village in late 1978, eighteen farming households signed a secret pact dividing collective land into family contracts, pioneering the household responsibility system that launched China’s rural reforms.'] }),
  pl('dandong', 124.38, 40.13, '丹东', 'Dandong', { tier: 3, names: [[1876, 1965, '安东', 'Andong']], since: 1966,
    lore: ['鸭绿江口 · 抗美援朝出征渡口', 'Yalu Estuary · Crossing of the Chinese People’s Volunteers',
      '地处辽东半岛东麓、鸭绿江入海口西岸，旧称安东，为明代九连城及万里长城东端虎山长城所在。1950年10月中国人民志愿军由此跨过鸭绿江赴朝作战。',
      'Located at the mouth of the Yalu River near the eastern terminus of the Ming Great Wall at Hushan, Dandong (formerly Andong) was the main crossing where the Chinese People’s Volunteers marched into Korea in October 1950.'] }),
  pl('jiuquan_lc', 100.28, 40.96, '酒泉卫星发射中心', 'Jiuquan Satellite Launch Center', { kind: 'site', tier: 3, since: 1958, modern: ['额济纳·东风航天城', 'Dongfeng Space City'],
    lore: ['弱水戈壁 · 中国航天发祥地', 'Ruo Shui Gobi · Cradle of Chinese Spaceflight',
      '始建于1958年，地处巴丹吉林沙漠边缘弱水河畔（东风航天城）。1970年“东方红一号”人造卫星、2003年“神舟五号”首次载人飞船及历次神舟载人任务均由此升空。',
      'Founded in 1958 beside the Ruo River on the edge of the Badain Jaran Desert, Jiuquan launched China’s first satellite Dongfanghong-1 in 1970 and its first crewed spacecraft Shenzhou-5 in 2003.'] }),
  pl('lop_nur', 90.25, 40.6, '罗布泊', 'Lop Nur', { kind: 'site', tier: 3, since: 1959, modern: ['新疆·若羌', 'Ruoqiang, Xinjiang'],
    lore: ['楼兰故泽 · 两弹核试验基地', 'Ancient Loulan Basin · Nuclear Test Site',
      '位于塔里木盆地东端，汉唐时为丝路重镇楼兰与蒲昌海所在。1964年10月16日中国第一颗原子弹、1967年6月17日第一颗氢弹相继在此成功爆炸。',
      'On the eastern edge of the Tarim Basin near ancient Loulan, Lop Nur was the test site where China successfully detonated its first atomic bomb on 16 October 1964 and its first hydrogen bomb on 17 June 1967.'] }),
  // ---- passes ---------------------------------------------------------------------------------------------------
  pl('yumenguan', 93.86, 40.35, '玉门关', 'Yumen Pass', { kind: 'pass', tier: 2, since: -111 }),
  pl('jiayuguan', 98.21, 39.8, '嘉峪关', 'Jiayu Pass', { kind: 'pass', tier: 2, since: 1372 }),
  pl('shanhaiguan', 119.75, 40.0, '山海关', 'Shanhai Pass', { kind: 'pass', tier: 2, since: 1381 }),
  pl('hanguguan', 110.92, 34.63, '函谷关', 'Hangu Pass', { kind: 'pass', tier: 3, since: -700 }),
  pl('tongguan', 110.25, 34.54, '潼关', 'Tong Pass', { kind: 'pass', tier: 3, since: 200 }),
  pl('jianmenguan', 105.55, 32.2, '剑门关', 'Jianmen Pass', { kind: 'pass', tier: 3, since: 220 }),
  // ---- prehistoric and archaeological sites ---------------------------------------------------------------------
  pl('yuanmou', 101.87, 25.68, '元谋', 'Yuanmou', { kind: 'site', tier: 3, until: -1000, modern: ['云南·楚雄', 'Chuxiong, Yunnan'],
    lore: ['金沙江畔 · 东方早期直立人', 'Jinsha Valley · Earliest Known Hominin in China',
      '位于云南楚雄元谋盆地，1965年发现距今约170万年的元谋人门齿化石与打制石器、炭屑，是我国境内已知最早的古人类遗址之一。',
      'In the Yuanmou Basin of Yunnan, fossilized incisors, chipped stone tools, and charcoal dated to roughly 1.7 million years ago mark one of the earliest known hominin sites in China.'] }),
  pl('zhoukoudian', 115.93, 39.69, '周口店', 'Zhoukoudian', { kind: 'site', tier: 3, until: -1000, modern: ['北京·房山', 'Fangshan, Beijing'],
    lore: ['龙骨山洞 · 北京人与山顶洞人遗址', 'Dragon Bone Hill · Peking Man & Upper Cave Site',
      '位于北京西南房山龙骨山，先后发掘出距今约70万—20万年的北京直立人头盖骨、十万余件打制石器与厚达数米的用火灰烬层，以及距今约3万年的山顶洞人遗存。',
      'Dragon Bone Hill southwest of Beijing yielded skullcaps of Peking Man (c. 700,000–200,000 years ago), over 100,000 stone tools, thick hearth ash beds, and the Upper Cave Homo sapiens fossils (c. 30,000 years ago).'] }),
  pl('banpo', 109.05, 34.27, '半坡', 'Banpo', { kind: 'site', tier: 3, until: -1000, modern: ['陕西·西安', 'Xi’an, Shaanxi'],
    lore: ['浐河东岸 · 仰韶文化聚落典范', 'Chan River Terrace · Classic Yangshao Neolithic Village',
      '位于西安东郊浐河东岸，距今约6000年，完整保存了半地穴式房屋、防卫环壕、公共墓地与陶窑场，以人面鱼纹彩陶盆和粟作农耕著称。',
      'On the eastern terrace of the Chan River in Xi’an, this 6,000-year-old Yangshao village preserves semi-subterranean houses, a defensive moat, kilns, millet stores, and painted pottery basins with human-face and fish motifs.'] }),
  pl('hemudu', 121.35, 29.97, '河姆渡', 'Hemudu', { kind: 'site', tier: 3, until: -1000, modern: ['浙江·余姚', 'Yuyao, Zhejiang'],
    lore: ['姚江平原 · 长江下游稻作文明', 'Yaojiang Plain · Early Rice & Stilt-House Culture',
      '位于浙江余姚，距今约7000年，出土大片人工栽培水稻遗存、骨耜、榫卯结构的干栏式木构长屋及猪纹陶钵、朱漆木碗，证实长江流域同样是中华文明摇篮。',
      'Dating to c. 5000 BCE in Yuyao, Zhejiang, Hemudu preserved deep layers of domesticated rice, bone spades, mortise-and-tenon stilt houses, and China’s earliest lacquerware.'] }),
  pl('liangzhu', 119.99, 30.39, '良渚', 'Liangzhu', { kind: 'site', tier: 3, until: -1000, modern: ['浙江·杭州', 'Hangzhou, Zhejiang'],
    lore: ['玉魂国魄 · 中华五千年文明实证', 'Sacred Jade Metropolis · 5,000-Year Urban Civilization',
      '位于杭州余杭，距今约5300—4300年，拥有规模宏大的宫殿区、内城外郭、大型外围水利系统及刻有神人兽面纹的玉琮、玉璧、玉钺礼制体系。',
      'Flourishing c. 3300–2300 BCE near Hangzhou, Liangzhu encompassed a vast walled city, palace platform, peripheral flood-control dams, and ritual jade cong and bi carved with deity-and-beast emblems.'] }),
  pl('dawenkou', 117.1, 35.95, '大汶口', 'Dawenkou', { kind: 'site', tier: 3, until: -1000, modern: ['山东·泰安', 'Tai’an, Shandong'],
    lore: ['泰山南麓 · 海岱新石器礼制萌芽', 'South of Mount Tai · Haidai Neolithic Culture',
      '位于山东泰安大汶河畔，距今约6300—4500年，出土精美白陶、黑陶高柄杯、玉钺及刻画陶文，墓葬随葬品多寡悬殊，反映私有制与社会阶层分化。',
      'Along the Dawen River south of Mount Tai (c. 4300–2500 BCE), Dawenkou tombs display white and black goblets, jade axes, and sharp wealth stratification marking the rise of social hierarchy.'] }),
  pl('sanxingdui', 104.21, 30.99, '三星堆', 'Sanxingdui', { kind: 'site', tier: 3, until: -800, modern: ['四川·广汉', 'Guanghan, Sichuan'],
    lore: ['成都平原 · 古蜀青铜神国', 'Chengdu Plain · Bronze Kingdom of Ancient Shu',
      '位于四川广汉鸭子河畔，距今约4500—2800年，祭祀坑出土青铜大立人、纵目面具、青铜神树、黄金面具与权杖，展现中华文明多元一体的壮丽图景。',
      'On the Chengdu Plain at Guanghan, sacrificial pits of the ancient Shu kingdom yielded towering bronze figures, protruding-eye masks, bronze spirit trees, and gold masks and scepters.'] }),
  pl('dujiangyan', 103.61, 31.0, '都江堰', 'Dujiangyan', { kind: 'site', tier: 3, since: 960, names: [[-256, 959, '都安堰', 'Du’an Weir']], modern: ['四川·都江堰', 'Dujiangyan, Sichuan'],
    lore: ['天府之源 · 千年无坝水利奇迹', 'Fountain of the Land of Abundance · Ancient No-Dam Weir',
      '公元前256年秦蜀郡太守李冰父子在岷江出山口主持修建，以鱼嘴分水堤、飞沙堰溢洪道、宝瓶口引水口自动分流排沙，使成都平原成为“水旱从人、不知饥馑”的天府之国。',
      'Engineered in 256 BCE by Qin governor Li Bing where the Min River exits the mountains, its Fish-Mouth levee, Feishayan spillway, and Baopingkou channel have irrigated the Chengdu Plain for over 2,200 years without a dam.'] }),
  pl('lingqu', 110.57, 25.6, '灵渠', 'Lingqu Canal', { kind: 'site', tier: 3, since: 618, names: [[-214, -207, '秦凿渠', 'Qin Canal'], [-206, 617, '零渠', 'Ling Canal']], modern: ['桂林·兴安', 'Xing’an, Guilin'],
    lore: ['湘漓同源 · 沟通长江珠江水系', 'Xiang–Li Divide · Canal Linking the Yangtze and Pearl Basins',
      '公元前214年秦始皇命史禄在广西兴安开凿，以铧嘴和大小天平拦湘江水，分南北二渠连通湘江（长江水系）与漓江（珠江水系），并设陡门船闸，促进岭南融入中原。',
      'Cut in 214 BCE under Qin Shi Huang across the divide at Xing’an, Guangxi, Lingqu used a ploughshare diversion weir and flash locks to connect the Xiang (Yangtze) and Li (Pearl River) watersheds.'] }),
  pl('zhaozhou', 114.77, 37.71, '赵州桥', 'Zhaozhou Bridge', { kind: 'site', tier: 3, since: 605, modern: ['石家庄·赵县', 'Zhaoxian, Hebei'],
    lore: ['安济名桥 · 世界最早敞肩石拱桥', 'Anji Bridge · World’s Oldest Open-Spandrel Stone Arch Bridge',
      '又名安济桥，隋大业年间（约595—605）由匠师李春设计建造，横跨河北赵县洨河，跨径37米余，首创敞肩圆弧石拱结构，减轻桥重并利于泄洪，屹立千四百年不倒。',
      'Designed by master mason Li Chun during the Sui dynasty (c. 605) across the Xiao River in Hebei, the Anji Bridge pioneered open-spandrel segmental stone arch construction and still stands after 1,400 years.'] }),
  pl('yungang', 113.12, 40.11, '云冈石窟', 'Yungang Grottoes', { kind: 'site', tier: 3, since: 1550, names: [[460, 1549, '武州山石窟寺', 'Wuzhou Shan Grottoes']], modern: ['山西·大同', 'Datong, Shanxi'],
    lore: ['武州山麓 · 北魏皇家石窟造像', 'Wuzhou Cliffs · Northern Wei Imperial Buddhist Caves',
      '位于山西大同西郊武州山南麓。北魏和平元年（460）由高僧昙曜主持开凿“昙曜五窟”，大佛气魄雄浑，融汇健陀罗、笈多艺术与中原传统风格。',
      'Carved into sandstone cliffs west of Datong starting in 460 CE under Northern Wei monk Tanyao, Yungang’s colossal Buddhas blend Gandharan and Gupta motifs with Chinese imperial sculpture.'] }),
  pl('longmen', 112.47, 34.56, '龙门石窟', 'Longmen Grottoes', { kind: 'site', tier: 3, since: 493, modern: ['河南·洛阳', 'Luoyang, Henan'],
    lore: ['伊阙两岸 · 北魏至盛唐造像巅峰', 'Yi River Gorge · Pinnacle of Northern Wei & Tang Sculpture',
      '位于洛阳南郊伊河两岸龙门山与香山。始凿于北魏孝文帝迁都洛阳（493）之际，历经东魏、北齐、隋、唐，宾阳洞表现出“秀骨清像”，奉先寺卢舍那大佛则尽显盛唐气象。',
      'Flanking the Yi River south of Luoyang, Longmen was begun when Northern Wei moved its capital in 493 CE and culminated under the Tang in the monumental Vairocana Buddha of Fengxian Temple.'] }),
  pl('mogao', 94.8, 40.04, '莫高窟', 'Mogao Caves', { kind: 'site', tier: 3, since: 698, names: [[366, 697, '鸣沙山石窟', 'Mingsha Shan Caves']], modern: ['甘肃·敦煌', 'Dunhuang, Gansu'],
    lore: ['鸣沙千佛 · 丝绸之路艺术宝库', 'Caves of the Singing Sands · Treasury of Silk Road Art',
      '位于敦煌东南鸣沙山东麓断崖。前秦建元二年（366）乐僔和尚始凿，历十朝千年营建，现存洞窟735个、壁画4.5万平方米、彩塑2400余身；1900年藏经洞出土数万卷中古文书。',
      'Hewn into the cliffs of Mingsha Shan near Dunhuang from 366 CE through the Yuan dynasty, Mogao preserves 735 caves of murals and painted sculptures along with the Library Cave’s tens of thousands of Silk Road manuscripts.'] }),
  // ---- battlefields ---------------------------------------------------------------------------------------------
  pl('muye', 113.9, 35.2, '牧野', 'Muye', { kind: 'site', tier: 3, since: -1100, modern: ['河南·新乡', 'Xinxiang, Henan'],
    lore: ['太行南麓 · 武王伐纣决战地', 'South of Yin · Battlefield where Zhou Overthrew Shang',
      '位于商都朝歌以南（今河南新乡、卫辉一带）。公元前1046年周武王率战车三百乘、虎贲三千人在此誓师（《尚书·牧誓》），商军阵前倒戈，商纣王自焚，西周建立。',
      'On the plain south of the Shang capital Zhaoge (modern Xinxiang, Henan), King Wu of Zhou rallied his coalition in 1046 BCE; Shang troops defected on the field, ending the Shang dynasty.'] }),
  pl('changping', 112.9, 35.8, '长平', 'Changping', { kind: 'site', tier: 3, since: -300, modern: ['山西·高平', 'Gaoping, Shanxi'],
    lore: ['上党要冲 · 秦赵战国决战之地', 'Shangdang Highlands · Decisive Qin–Zhao Battlefield',
      '位于山西高平丹河流域。公元前262—前260年秦赵两军在此对峙三年，赵以赵括代廉颇出击，秦武安君白起奇兵断粮、围歼赵军四十余万，东方六国自此再难独抗强秦。',
      'In the valleys around Gaoping, Shanxi (262–260 BCE), Qin general Bai Qi encircled Zhao Kuo’s army and destroyed over 400,000 Zhao troops, breaking the last military peer of Qin.'] }),
  pl('julu', 115.0, 37.2, '巨鹿', 'Julu', { kind: 'site', tier: 3, since: -300, modern: ['河北·平乡/巨鹿', 'Pingxiang, Hebei'],
    lore: ['漳水古泽 · 项羽破釜沉舟之战', 'Zhang River Plain · Xiang Yu’s "Smash the Cauldrons" Victory',
      '位于河北平乡、巨鹿一带。公元前207年秦将章邯、王离围赵于巨鹿，项羽率楚军渡漳水，“破釜沉舟，持三日粮”，九战皆捷，歼灭秦军主力，诸侯军莫敢仰视。',
      'Near modern Pingxiang and Julu in Hebei, Xiang Yu crossed the Zhang River in 207 BCE, sank his boats and smashed his cooking cauldrons, and crushed the main Qin field army in nine engagements.'] }),
  pl('gaixia', 117.6, 33.3, '垓下', 'Gaixia', { kind: 'site', tier: 3, since: -250, modern: ['安徽·固镇', 'Guzhen, Anhui'],
    lore: ['沱水古垒 · 楚汉相争终局之地', 'Tuo River Ramparts · Final Battle of Chu and Han',
      '位于安徽固镇沱河南岸。公元前202年刘邦、韩信、彭越率汉军合围项羽于此，设十面埋伏、夜唱四面楚歌；项羽突围至乌江自刎，西汉遂定天下。',
      'In 202 BCE at Gaixia (modern Guzhen, Anhui), Han forces under Liu Bang and Han Xin surrounded Xiang Yu with the "Ambush from Ten Sides" and "Songs of Chu from Four Sides", sealing the founding of the Han dynasty.'] }),
  pl('dazexiang', 117.0, 33.4, '大泽乡', 'Dazexiang', { kind: 'site', tier: 3, since: -250, modern: ['安徽·宿州', 'Suzhou, Anhui'],
    lore: ['蕲县泽畔 · 秦末农民首义之地', 'Qixian Marshes · Birthplace of the First Peasant Uprising',
      '位于安徽宿州东南。公元前209年陈胜、吴广率九百戍卒赴渔阳戍边，在此遇雨失期，高呼“王侯将相宁有种乎”，揭竿而起，掀起中国历史上第一次大规模农民起义。',
      'Southeast of Suzhou, Anhui, conscripts Chen Sheng and Wu Guang raised the banner of revolt here in 209 BCE after rains delayed their march, launching China’s first great peasant uprising against Qin.'] }),
  pl('guandu', 114.1, 34.7, '官渡', 'Guandu', { kind: 'site', tier: 3, since: 150, modern: ['河南·中牟', 'Zhongmu, Henan'],
    lore: ['鸿沟故道 · 曹操定鼎北方之战', 'Honggou Canal · Cao Cao’s Victory for the North',
      '位于河南中牟东北古汴水（官渡水）畔。建安五年（200）曹操以两万余兵力在此相持袁绍十万大军，奇袭乌巢烧毁袁军粮草，以少胜多，奠定统一北方之基。',
      'Northeast of Zhongmu, Henan, Cao Cao held off Yuan Shao’s far larger army in 200 CE before raiding the supply depot at Wuchao, winning a decisive victory that secured northern China.'] }),
  pl('chibi', 113.9, 29.83, '赤壁', 'Red Cliffs', { kind: 'site', tier: 3, since: 150, modern: ['湖北·赤壁', 'Chibi, Hubei'],
    lore: ['大江矶头 · 三国鼎立奠基古战场', 'Yangtze Bluffs · Crucible of the Three Kingdoms',
      '位于湖北赤壁市西北长江南岸。建安十三年（208）孙权、刘备联军五万，由周瑜、黄盖施火攻大破曹操南下水陆大军，从此奠定魏蜀吴三国鼎立格局。',
      'On the south bank of the Yangtze in Hubei, the allied forces of Sun Quan and Liu Bei under Zhou Yu used fire ships in 208 CE to shatter Cao Cao’s fleet, establishing the Three Kingdoms balance.'] }),
  pl('feishui', 116.8, 32.3, '淝水', 'Fei River', { kind: 'site', tier: 3, since: 350, modern: ['安徽·寿县', 'Shouxian, Anhui'],
    lore: ['八公山下 · 东晋以少胜多古战场', 'Below Mount Bagong · Eastern Jin Victory over Former Qin',
      '位于安徽寿县东南。太元八年（383）前秦苻坚率八十余万大军南侵，谢安、谢玄率东晋北府兵八万隔淝水决战，秦军“风声鹤唳、草木皆兵”溃败，南北分裂局面得以延续。',
      'At the Fei River near Shouxian, Anhui in 383 CE, 80,000 Eastern Jin Beifu troops under Xie Xuan routed Fu Jian’s massive Former Qin invasion, preserving the Southern dynasties.'] }),
  pl('yashan', 113.07, 22.08, '崖山', 'Yamen', { kind: 'site', tier: 3, since: 1200, modern: ['广东·新会', 'Xinhui, Jiangmen'],
    lore: ['崖门海口 · 南宋忠烈蹈海之地', 'Yamen Estuary · Last Stand of the Southern Song',
      '位于广东江门新会银洲湖出海口，东有崖山、西有汤瓶山对峙如门。祥兴二年（1279）元将张弘范水军猛攻宋军，张世杰突围未果，左丞相陆秀夫背负八岁幼帝赵昺投海殉国，南宋灭亡。',
      'At the Yamen sea gate in Xinhui, Guangdong, the final naval battle of 1279 ended when Chancellor Lu Xiufu leaped into the sea with the eight-year-old Emperor Bing, bringing the Song dynasty to an end.'] }),
  // ---- beyond the stage's centre --------------------------------------------------------------------------------
  pl('nara', 135.8, 34.68, '奈良', 'Nara', { tier: 3, names: [[710, 794, '平城京', 'Heijō-kyō']], since: 795,
    lore: ['平城古京 · 鉴真东渡唐招提寺', 'Heijō-kyō · Tang-Modeled Capital & Tōshōdai-ji',
      '710—784年为日本奈良时代都城平城京，仿唐长安城棋盘格局营建。唐玄宗时高僧鉴真六次东渡，于754年抵平城京传授戒律与医药建筑，创建唐招提寺。',
      'Capital of Japan (Heijō-kyō, 710–784) laid out on the grid of Tang Chang’an; the blind Tang monk Jianzhen arrived here in 754 after six sea attempts and founded Tōshōdai-ji.'] }),
  pl('kyoto', 135.77, 35.01, '京都', 'Kyoto', { tier: 3, since: 1869, names: [[794, 1868, '平安京', 'Heian-kyō']],
    lore: ['平安古都 · 千年唐风王城', 'Heian-kyō · Millennial Imperial Capital of Japan',
      '794年桓武天皇仿唐长安、洛阳营建平安京，分左右两京与朱雀大路，至1869年迁都东京前为日本逾千年皇都，保存大量唐宋佛教与汉学文化遗存。',
      'Founded in 794 as Heian-kyō on the model of Tang Chang’an and Luoyang, Kyoto served as Japan’s imperial seat for over a millennium and preserved deep Tang–Song cultural traditions.'] }),
  pl('tokyo', 139.69, 35.69, '东京', 'Tokyo', { tier: 2, names: [[1600, 1867, '江户', 'Edo']], since: 1868,
    lore: ['关东都会 · 江户幕府与近代日本都城', 'Kantō Metropolis · Edo Shogunate & Modern Japanese Capital',
      '古称江户，1603年德川家康在此开立江户幕府；1868年明治维新后改称东京并定为都城，清末民初梁启超、孙中山、秋瑾、鲁迅等大批中国仁人志士曾赴此求学或活动。',
      'Seat of the Tokugawa shogunate as Edo from 1603 and imperial capital as Tokyo after the 1868 Meiji Restoration; in the late Qing it was a major hub for Chinese students and revolutionaries including Sun Yat-sen, Qiu Jin, and Lu Xun.'] }),
  pl('seoul', 126.98, 37.57, '首尔', 'Seoul', { tier: 2, since: 2005, names: [[1394, 1909, '汉城', 'Hanseong'], [1910, 1945, '京城', 'Keijō'], [1946, 2004, '汉城', 'Seoul']],
    lore: ['汉江北岸 · 朝鲜王朝五百年王都', 'North of the Han River · Joseon Royal Capital',
      '地处朝鲜半岛中部汉江之滨。1394年李成桂建朝鲜王朝迁都汉阳（汉城），营建景福宫，沿用汉字与儒家礼制五百余年，与明清两朝保持密切宗藩与文化往来。',
      'Situated on the Han River in the center of the Korean Peninsula, Hanseong (Seoul) became the capital of the Joseon dynasty in 1394 and maintained close diplomatic and scholarly ties with Ming and Qing China.'] }),
  pl('pyongyang', 125.75, 39.03, '平壤', 'Pyongyang', { tier: 3, since: 427,
    lore: ['大同江畔 · 箕子乐浪与高句丽故都', 'Taedong River · Ancient Lelang & Goguryeo Capital',
      '位于大同江下游平原。汉武帝置乐浪郡治于此；427年高句丽长寿王自国内城迁都平壤；1593年明将李如松在此大破日军光复平壤，1894年甲午平壤之战左宝贵殉国。',
      'On the lower Taedong River, Pyongyang was the seat of Han Lelang Commandery, capital of Goguryeo from 427 CE, liberated by Ming forces in 1593 during the Imjin War, and contested in 1894 during the First Sino-Japanese War.'] }),
  pl('albazin', 124.2, 53.4, '雅克萨', 'Albazin', { kind: 'site', tier: 3, since: 1650,
    lore: ['黑龙江上游 · 康熙抗击沙俄前哨', 'Upper Heilongjiang · Site of the Albazin Campaigns',
      '位于黑龙江上游北岸，原为达斡尔族首领阿尔巴西驻地。17世纪中叶沙俄哥萨克盘踞筑城，康熙二十四年至二十五年（1685—1686）清军两次围攻雅克萨，迫使俄方谈判签约。',
      'On the northern bank of the upper Heilongjiang (Amur), Albazin was a Daur stronghold occupied by Russian Cossacks until Kangxi’s two sieges of 1685–1686 compelled Russia to negotiate the Treaty of Nerchinsk.'] }),
  pl('nerchinsk', 116.6, 51.98, '尼布楚', 'Nerchinsk', { tier: 3, since: 1654,
    lore: ['石勒喀河畔 · 中俄首个边界条约签署地', 'Shilka River · Site of the 1689 Treaty of Nerchinsk',
      '位于石勒喀河与尼布楚河交汇处。康熙二十八年（1689）索额图率清朝使团在此与俄国签订《尼布楚条约》，从法律上肯定黑龙江和乌苏里江流域包括库页岛在内的广大地区皆属中国。',
      'At the confluence of the Shilka and Nercha rivers, Qing envoy Songgotu and Russian plenipotentiaries signed the Treaty of Nerchinsk in 1689, legally defining the eastern Sino-Russian border along the Argun and Stanovoy Range.'] }),
  pl('vladivostok', 131.9, 43.12, '海参崴', 'Vladivostok', { tier: 3, since: 1860,
    lore: ['绥芬河东 · 原吉林将军辖境海港', 'Golden Horn Bay · Former Qing Maritime Frontier Port',
      '满语意为“海边的小渔村”，因盛产海参得名海参崴，原属清朝吉林将军管辖。1860年沙俄通过中俄《北京条约》割占乌苏里江以东包括库页岛、海参崴在内的约40万平方千米领土。',
      'Formerly a fishing port under the Qing General of Jilin known for its sea cucumbers, it lay within the 400,000 km² east of the Ussuri River ceded to Imperial Russia under the 1860 Convention of Peking.'] }),
  pl('talas', 72.3, 42.5, '怛罗斯', 'Talas', { kind: 'site', tier: 3, since: -100,
    lore: ['中亚河谷 · 唐与大食交锋及造纸西传地', 'Talas Valley · Tang–Abbasid Battle & Westward Spread of Paper',
      '位于天山西北麓怛罗斯河畔（今哈萨克斯坦塔拉兹）。西汉陈汤曾在此击灭北匈奴郅支单于；唐天宝十载（751）高仙芝与阿拔斯王朝在此交战，被俘唐军工匠使造纸术传往阿拉伯与欧洲。',
      'In the Talas River valley (modern Taraz), Han commander Chen Tang defeated Chanyu Zhizhi in 36 BCE, and in 751 CE Tang forces under Gao Xianzhi clashed with the Abbasid Caliphate, after which captured artisans transmitted Chinese papermaking west.'] }),
  pl('samarkand', 66.97, 39.65, '撒马尔罕', 'Samarkand', { tier: 3, since: 1220, names: [[600, 900, '康国', 'Kang']],
    lore: ['河中明珠 · 丝路昭武九姓康国故都', 'Crossroads of Transoxiana · Sogdian Silk Road Hub',
      '位于中亚泽拉夫善河谷，汉魏称康居、隋唐为“昭武九姓”之首康国。粟特商队由此往返长安，传入胡旋舞、胡腾舞与金银器；元明之际又为帖木儿帝国都城。',
      'Heart of Sogdiana (known in Tang China as the state of Kang), Samarkand sent Sogdian merchant caravans, music, and metalwork along the Silk Road to Chang’an and later became Timur’s imperial capital.'] }),
  pl('nalanda', 85.44, 25.14, '那烂陀寺', 'Nalanda', { kind: 'site', tier: 3, since: 427,
    lore: ['摩揭陀古刹 · 玄奘义净求法最高学府', 'Magadha Monastery · Great Buddhist University Visited by Xuanzang',
      '位于古印度摩揭陀国王舍城附近，为笈多王朝创立的佛教最高学府。唐代高僧玄奘在此师从戒贤法师研习唯识学五年，义净亦曾留居十年译经求法。',
      'The renowned Buddhist monastic university in ancient Magadha (Bihar, India), where Tang pilgrim Xuanzang studied Yogacara philosophy under Silabhadra for five years and Yijing later studied for a decade.'] }),
  pl('calicut', 75.78, 11.25, '古里', 'Calicut', { tier: 3, since: 1405,
    lore: ['印度西岸 · 郑和下西洋西洋要津', 'Malabar Coast · Western Ocean Terminus of Zheng He’s Early Voyages',
      '位于印度半岛西南马拉巴尔海岸（今科泽科德），为香料贸易枢纽。明永乐年间郑和七下西洋每次均到访古里、立碑纪行，1433年郑和在第七次返航途中病逝于古里。',
      'On India’s Malabar Coast (modern Kozhikode), Calicut was the premier spice emporium of the Indian Ocean visited on all seven of Zheng He’s Ming treasure voyages and the place where Zheng He died in 1433.'] }),
  pl('malacca', 102.25, 2.2, '满剌加', 'Malacca', { tier: 3, since: 1405,
    lore: ['海峡咽喉 · 郑和船队远航中转大本营', 'Strait of Malacca · Forward Staging Base of Zheng He’s Fleet',
      '扼守太平洋与印度洋之间的马六甲海峡要冲。明永乐年间满剌加国王多次访华，郑和下西洋在此设立官厂（仓储城栅），作为船队候风与分航西洋各国的中心基地。',
      'Commanding the strait between the Pacific and Indian oceans, Malacca allied closely with Yongle’s court and hosted Zheng He’s fortified supply depot ("Guan Chang") for fleets waiting on the monsoon winds.'] }),
  pl('hanoi', 105.85, 21.03, '河内', 'Hanoi', { tier: 3, names: [[-111, 938, '交趾', 'Jiaozhi'], [1010, 1831, '升龙', 'Thăng Long']], since: 1831,
    lore: ['红河三角洲 · 汉交趾唐安南都护府治', 'Red River Delta · Seat of Han Jiaozhi & Tang Annan Protectorate',
      '地处红河三角洲腹心，汉代为交趾郡治，唐代置安南都护府（大罗城）。1010年李朝定都改称升龙，1831年改名河内，久为中南半岛北部的政治文化中心。',
      'In the heart of the Red River Delta, it served as the seat of Han Jiaozhi Commandery and the Tang Protectorate General to Pacify the South before becoming the royal capital Thăng Long in 1010 and Hanoi in 1831.'] }),
  // ---- geography --------------------------------------------------------------------------------------------------
  pl('everest', 86.92, 27.99, '珠穆朗玛峰', 'Qomolangma (Everest)', { kind: 'mountain', tier: 2, since: 1719,
    lore: ['喜马拉雅之巅 · 世界第一高峰', 'Crest of the Himalayas · Highest Peak on Earth',
      '耸立于喜马拉雅山脉中段，海拔8848.86米。康熙五十六年（1717）清廷派楚儿沁藏布、兰木占巴等实测西藏地形，在《皇舆全览图》中首次以“朱母郎马阿林”标注此峰；1960年中国登山队首次从北坡登顶。',
      'Rising 8,848.86 m in the central Himalayas, Qomolangma was first mapped by Kangxi’s Tibetan surveyors in 1717 on the Imperial Atlas as "Zhumulangma Alin" and first summited via the North Ridge by a Chinese team in 1960.'] }),
  pl('taishan', 117.1, 36.25, '泰山', 'Mount Tai', { kind: 'mountain', tier: 3,
    lore: ['五岳独尊 · 历代帝王封禅圣山', 'Foremost of the Five Sacred Mountains · Imperial Fengshan Altar',
      '屹立于鲁中齐鲁平原之上，古称岱宗。自秦始皇刻石封禅，汉武帝、汉光武帝、唐高宗与武则天、唐玄宗、宋真宗皆曾登临泰山举行封天禅地大典，为“天人合一”与大一统的国家象征。',
      'Rising above the Shandong plain as "Daizong", Mount Tai was the sacred peak where emperors from Qin Shi Huang and Han Wudi to Tang Xuanzong and Song Zhenzong performed the Feng and Shan sacrifices to Heaven and Earth.'] }),
  pl('diaoyu', 123.47, 25.75, '钓鱼岛', 'Diaoyu Islands', { kind: 'water', tier: 3, since: 1403,
    lore: ['东海大陆架 · 明清册封琉球航路坐标', 'East China Sea Shelf · Ming–Qing Ryukyu Envoy Landmark',
      '位于中国台湾岛东北东海大陆架边缘。早见于明永乐元年（1403）《顺风相送》海道针经，明代纳入海防巡视范围，明清两朝册封琉球使臣陈侃、郭汝霖等《使琉球录》均记载以此为中琉海域分界。',
      'On the continental shelf northeast of Taiwan, the Diaoyu Islands were recorded in the 1403 Ming navigation manual Shunfeng Xiangsong and incorporated into Ming coastal defense and Ming–Qing Ryukyu investiture route logs.'] }),
  pl('nanhai', 114.0, 12.0, '南海诸岛', 'South China Sea Islands', { kind: 'water', tier: 2, since: 1947,
    lore: ['万里石塘 · 海上丝绸之路航标水域', 'Myriad-Li Coral Shoals · Maritime Silk Road Sea Lanes',
      '统括东沙、西沙、中沙、南沙四大群岛，古称“涨海崎头”“千里长沙、万里石塘”。宋元明清海商与水师长年航行经略，1946年中国政府派军舰收复并立碑，1947年公布《南海诸岛位置图》。',
      'Encompassing the Dongsha, Xisha, Zhongsha, and Nansha archipelagos—known historically as "Qianli Changsha and Wanli Shitang"—the islands were reclaimed with sovereignty markers in 1946 and charted officially in 1947.'] }),
  pl('xisha', 112.3, 16.5, '西沙群岛', 'Paracel (Xisha) Islands', { kind: 'water', tier: 3, since: 1947,
    lore: ['千里长沙 · 郭守敬南海测验与北宋巡海水师', 'Qianli Changsha · Song Naval Patrol & Yuan Astronomical Station',
      '古称“九乳螺洲”“千里长沙”，分宣德、永乐两群岛。北宋水师已巡至“九乳螺洲”，元代天文学家郭守敬于1279年主持“四海测验”在南海设观测点，清光绪三十五年（1909）水师提督李准率舰巡视立碑。',
      'Known in Song–Yuan texts as Jiuru Luozhou and Qianli Changsha, the Xisha Islands were patrolled by Northern Song fleets, surveyed during Guo Shoujing’s 1279 astronomical expedition, and inspected by Qing Admiral Li Zhun in 1909.'] }),
  pl('nansha', 114.5, 9.5, '南沙群岛', 'Spratly (Nansha) Islands', { kind: 'water', tier: 3, since: 1947,
    lore: ['万里石塘 · 中国最南端珊瑚礁群', 'Wanli Shitang · Southernmost Coral Archipelago',
      '古称“万里石塘”，岛礁星罗棋布，南达曾母暗沙。中国渔民世代以《更路簿》在此海域航行耕海，1946年12月中国政府派“太平”“中业”号军舰接收进驻太平岛等岛礁并重立主权石碑。',
      'Historically recorded as Wanli Shitang and navigated for generations using Hainan fishermen’s Genglu Bu route books, the Nansha Islands were garrisoned by the warships Taiping and Zhongye in December 1946.'] }),
];

/** Curated places first, then the imported settlements, passes and city lore (which also enrich curated places). */
export const PLACES: Place[] = [...CURATED, ...importedPlaces(CURATED)];

export const PLACE = new Map(PLACES.map(p => [p.id, p]));

const named = (p: Place, year: Year): I18n | undefined =>
  (p.names?.find(n => year >= n.from && year <= n.to) ?? p.periods?.find(n => year >= n.from && year <= n.to))?.name;

/**
 * Bridges unannotated intermediate dynasties in imported settlement spans so cities do not blink off between
 * recorded periods before their next period or modern `since` year.
 */
function bridgedName(p: Place, year: Year): I18n | undefined {
  const spans = [...(p.names ?? []), ...(p.periods ?? [])];
  if (!spans.length) return undefined;
  let prev: { from: Year; to: Year; name: I18n } | undefined;
  let hasLater = false;
  for (const r of spans) {
    if (r.to < year && (!prev || r.to > prev.to)) prev = r;
    if (r.from > year) hasLater = true;
  }
  if (!prev || prev.to < -1100) return undefined;
  if (hasLater || (p.since != null && year < p.since)) return prev.name;
  if (p.periodOnly && p.modern?.zh && prev.to >= 900) return year >= 1912 ? p.modern : prev.name;
  return undefined;
}

/** Whether a place exists in `year` (period-only places vanish outside their named periods). */
export const placeExists = (p: Place, year: Year): boolean =>
  !p.periodOnly || !!p.names?.some(n => year >= n.from && year <= n.to) || !!bridgedName(p, year);

/** The name a place had in `year` (falls back to the modern name). */
export function placeName(p: Place, year: Year): I18n {
  if (p.since != null && year >= p.since) return named(p, year) ?? p.name;
  return named(p, year) ?? bridgedName(p, year) ?? p.name;
}

/**
 * The name to print on the map in `year`, or null: only names in use at the time (curated, then imported periods),
 * the modern name only from `since` on, and nothing after `until`. Places without either keep their (historic) name.
 */
export function mapName(p: Place, year: Year): I18n | null {
  if (!placeExists(p, year) || (p.until != null && year > p.until)) return null;
  const n = named(p, year);
  if (n) return n;
  if (p.since != null && year >= p.since) return p.name;
  const b = bridgedName(p, year);
  if (b) return b;
  if (p.periodOnly || p.since != null) return null;
  return p.kind === 'city' ? null : p.name;
}

type Period = [from: Year, to: Year, zh: string, en: string];
const ANY = -2_000_000;
/**
 * Period names of rivers and lakes, keyed by the label's name: an older name inside its years, `now` (the current
 * name) from `since`, and nothing in between (a modern name such as 塔里木河 or 斋桑泊 is not printed in antiquity).
 */
const WATER: Record<string, { names?: Period[]; since?: Year; now?: [string, string] }> = {
  黄河: { names: [[ANY, -207, '河水', 'He (Yellow R.)']] },
  长江: { names: [[ANY, 219, '江水', 'Jiang (Yangtze R.)']] },
  珠江: { names: [[ANY, 959, '郁水', 'Yu R.'], [960, 1643, '西江', 'Xi R.']] },
  赣江: { names: [[ANY, 588, '赣水', 'Gan R.']] },
  辽河: { names: [[ANY, 906, '辽水', 'Liao R.']] },
  松花江: { names: [[ANY, 906, '粟末水', 'Sumo R.'], [907, 1367, '宋瓦江', 'Songwa R.']] },
  黑龙江: { names: [[ANY, 906, '黑水', 'Heishui (Amur)']] },
  伊犁河: { names: [[ANY, 617, '伊列水', 'Yilie R.'], [618, 1643, '伊丽水', 'Yili R.']] },
  塔里木河: { since: 1700 },
  雅鲁藏布江: { since: 1700 },
  '彭蠡·鄱阳': { names: [[ANY, 588, '彭蠡泽', 'Pengli Marsh']], now: ['鄱阳湖', 'Poyang L.'] },
  青海: { names: [[ANY, 385, '西海', 'Xihai (Qinghai L.)']] },
  '北海（贝加尔）': { names: [[ANY, 1699, '北海', 'Beihai (L. Baikal)']], now: ['贝加尔湖', 'L. Baikal'] },
  '蒲昌海·罗布泊': { names: [[ANY, 1299, '蒲昌海', 'Puchang Sea']], now: ['罗布泊', 'Lop Nur'] },
  博斯腾湖: { since: 1700 },
  '热海（伊塞克）': { names: [[ANY, 1699, '热海', 'Rehai (Issyk-Kul)']], now: ['伊塞克湖', 'Issyk-Kul'] },
  '夷播海（巴尔喀什）': { names: [[ANY, 1699, '夷播海', 'Yibo Sea (L. Balkhash)']], now: ['巴尔喀什湖', 'L. Balkhash'] },
  斋桑泊: { since: 1700 },
  洪泽: { now: ['洪泽湖', 'Hongze L.'] },
};

/** The name a river or lake label shows in `year`, or null while it did not exist or had no name we can print. */
export function riverName(r: RiverLabel, year: Year): I18n | null {
  if ((r.from != null && year < r.from) || (r.to != null && year > r.to)) return null;
  const w = WATER[r.name.zh];
  if (!w) return r.name;
  const n = w.names?.find(([a, b]) => year >= a && year <= b);
  if (n) return { zh: n[2], en: n[3] };
  if (w.since != null && year < w.since) return null;
  return w.now ? { zh: w.now[0], en: w.now[1] } : r.name;
}

export function isCapital(p: Place, year: Year): boolean {
  return !!p.capital?.some(([a, b]) => year >= a && year <= b);
}
