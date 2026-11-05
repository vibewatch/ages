import type { I18n, Year } from './types.ts';

export interface TrailStop {
  event?: string;
  place?: string;
  year: Year;
  title: I18n;
  note: I18n;
}

export interface Trail {
  id: string;
  color: string;
  title: I18n;
  subtitle: I18n;
  stops: TrailStop[];
}

export const TRAILS: Trail[] = [
  {
    id: 'capitals',
    color: '#c99b3b',
    title: { zh: '历代都城东迁南移', en: 'Migration of Imperial Capitals' },
    subtitle: { zh: '从伊洛河畔到长安、汴梁、临安与北京：中国古代政治重心的空间转移', en: 'From Erlitou and Chang’an to Kaifeng, Hangzhou, and Beijing across 3,500 years' },
    stops: [
      {
        event: 'xia_found',
        place: 'erlitou',
        year: -2070,
        title: { zh: '二里头（夏都斟鄩）', en: 'Erlitou (Late Xia Heartland)' },
        note: { zh: '伊洛河平原上的最早井字形大道网与宫城遗址，开启中原王都规制。', en: 'China’s earliest grid-planned palace complex in the Yi–Luo basin of Henan.' },
      },
      {
        event: 'pangeng',
        place: 'anyang',
        year: -1300,
        title: { zh: '殷（安阳殷墟）', en: 'Yin (Anyang)' },
        note: { zh: '盘庚迁殷后商朝稳定近三百年，留下甲骨文档案与后母戊鼎。', en: 'King Pangeng stabilized the Shang court at Yin, preserving oracle-bone archives and monumental bronzes.' },
      },
      {
        event: 'muye',
        place: 'xian',
        year: -1046,
        title: { zh: '西周镐京与东周洛邑', en: 'Western Zhou Haojing & Eastern Zhou Luoyi' },
        note: { zh: '西周定都关中丰镐，前770年平王东迁洛邑，确立“关中—洛阳”双轴传统。', en: 'Western Zhou ruled from Haojing in Guanzhong before moving east to Luoyi in 770 BCE, establishing the Chang’an–Luoyang axis.' },
      },
      {
        event: 'qin_unify',
        place: 'xianyang',
        year: -221,
        title: { zh: '秦都咸阳与汉都长安', en: 'Qin Xianyang & Han Chang’an' },
        note: { zh: '秦汉据崤函之固俯瞰关东，长安成为丝绸之路起点与大一统帝国中枢。', en: 'Guarded by the passes of Shaanxi, Xianyang and Chang’an anchored the first unified empires and the eastern terminus of the Silk Road.' },
      },
      {
        event: 'kaiyuan',
        place: 'xian',
        year: 713,
        title: { zh: '隋大兴与唐长安城', en: 'Sui Daxing & Tang Chang’an' },
        note: { zh: '宇文恺规划的棋盘格坊市制都城，人口逾百万，成为东亚都城营建典范。', en: 'Laid out on a monumental ward-and-market grid, Tang Chang’an housed a million residents and inspired capitals across East Asia.' },
      },
      {
        event: 'song_found',
        place: 'kaifeng',
        year: 960,
        title: { zh: '北宋东京（开封）', en: 'Northern Song Bianjing (Kaifeng)' },
        note: { zh: '政治重心由关中东移中原运河枢纽，仰仗汴河漕运供给百万军民，坊市界限自此打破。', en: 'With the Grand Canal lifeline replacing Guanzhong passes, Kaifeng became an open commercial metropolis along the Bian River.' },
      },
      {
        event: 'south_shift',
        place: 'hangzhou',
        year: 1150,
        title: { zh: '南宋行在临安（杭州）', en: 'Southern Song Lin’an (Hangzhou)' },
        note: { zh: '靖康南渡后定都江南水网核心，与经济重心南移完成相呼应。', en: 'Set amid the prosperous Yangtze Delta waterways, Lin’an reflected the completed southward shift of China’s economic gravity.' },
      },
      {
        event: 'forbidden_city',
        place: 'beijing',
        year: 1421,
        title: { zh: '元大都与明清北京城', en: 'Yuan Dadu & Ming–Qing Beijing' },
        note: { zh: '金中都、元大都至1421年明成祖迁都北京，紫禁城中轴线成为近六个世纪的国家中枢。', en: 'From Jin Zhongdu and Yuan Dadu to the Yongle Emperor’s Forbidden City (1421), Beijing linked the North China Plain with the northern frontier.' },
      },
    ],
  },
  {
    id: 'silk-maritime',
    color: '#2e86de',
    title: { zh: '丝路驼铃与海上风帆', en: 'Overland & Maritime Silk Roads' },
    subtitle: { zh: '从张骞“凿空”西域、玄奘西行到泉州市舶与郑和下西洋的中外交流史', en: 'Caravan oases and monsoon sea lanes connecting China with Eurasia and the Indian Ocean' },
    stops: [
      {
        event: 'zhangqian',
        year: -138,
        title: { zh: '张骞“凿空”西域', en: 'Zhang Qian Opens the Western Regions' },
        note: { zh: '前138年与前119年两次出使，打通长安经河西走廊通往中亚、西亚的陆上丝绸之路。', en: 'Two diplomatic missions (138 & 119 BCE) opened the overland Silk Road from Chang’an through the Hexi Corridor to Central Asia.' },
      },
      {
        event: 'xiyu_duhu',
        year: -60,
        title: { zh: '西域都护府与丝路畅通', en: 'Protectorate of the Western Regions' },
        note: { zh: '前60年设西域都护府于乌垒城，保障天山南北商路安全，丝绸、铁器与西域葡萄、良马双向流通。', en: 'Established at Wulei in 60 BCE, the Protectorate secured the Tarim Basin oases for caravans trading silk, iron, horses, and grapes.' },
      },
      {
        event: 'xuanzang',
        year: 627,
        title: { zh: '玄奘西行求法', en: 'Xuanzang’s Journey to India' },
        note: { zh: '贞观年间孤征天竺那烂陀寺，口述《大唐西域记》记录百余国山川风俗。', en: 'Travelling overland to Nalanda and back (627–645), Xuanzang documented over a hundred states across Central and South Asia.' },
      },
      {
        event: 'jianzhen',
        year: 753,
        title: { zh: '鉴真东渡与海上交通', en: 'Jianzhen Sails to Japan' },
        note: { zh: '唐代海陆并举：西通波斯大食，东连日本新罗，鉴真六次东渡传播医药与建筑技艺。', en: 'Tang maritime routes linked Yangzhou and Guangzhou with Japan and the Persian Gulf; Jianzhen reached Nara in 753.' },
      },
      {
        event: 'south_shift',
        place: 'quanzhou',
        year: 1150,
        title: { zh: '宋代市舶司与泉州海贸', en: 'Song Maritime Trade & Quanzhou' },
        note: { zh: '陆路受阻后海上丝路跃居主导，指南针应用于海船，广州、泉州、明州设市舶司，蕃商云集。', en: 'Equipped with magnetic compasses and watertight bulkheads, Song merchant junks made Quanzhou and Guangzhou world ports.' },
      },
      {
        event: 'marco_polo',
        year: 1275,
        title: { zh: '元代驿路与马可·波罗来华', en: 'Yuan Post Roads & Marco Polo' },
        note: { zh: '蒙元时期陆海通道全线贯通，马可·波罗由陆路来华、由泉州海路返欧。', en: 'Marco Polo arrived overland across the Pamirs and returned by sea from Quanzhou through the Strait of Malacca.' },
      },
      {
        event: 'zhenghe',
        year: 1405,
        title: { zh: '郑和七下西洋', en: 'Seven Voyages of Zheng He' },
        note: { zh: '1405—1433年庞大船队远航占城、满剌加、古里乃至东非木骨都束，将古代官方航海推向顶峰。', en: 'Between 1405 and 1433 Zheng He’s treasure fleets sailed across the Indian Ocean to Hormuz, Aden, and the East African coast.' },
      },
    ],
  },
  {
    id: 'reforms',
    color: '#c85a32',
    title: { zh: '历代变法与制度革新', en: 'Great Reforms & Institutional Shifts' },
    subtitle: { zh: '从分封到郡县、从察举九品到科举、从传统税制到现代改革开放', en: 'How administrative, fiscal, and civil-service reforms reshaped the Chinese state' },
    stops: [
      {
        event: 'fenfeng',
        year: -1040,
        title: { zh: '西周分封制与礼乐制度', en: 'Western Zhou Enfeoffment (Fengjian)' },
        note: { zh: '以血缘宗法为纽带“授民授疆土”，奠定先秦天下秩序。', en: 'Kinship-based enfeoffment bound regional lords to the Zhou king through clan law and ritual.' },
      },
      {
        event: 'shangyang',
        year: -356,
        title: { zh: '商鞅变法：废井田、行县制', en: 'Shang Yang’s Legalist Reforms' },
        note: { zh: '打破世卿世禄，奖励耕战、普遍推行县制，完成从贵族分封向官僚集权国家转型。', en: 'Abolishing hereditary aristocratic privilege in favor of counties, land titles, and military merit propelled Qin to supremacy.' },
      },
      {
        event: 'qin_unify',
        year: -221,
        title: { zh: '秦创皇帝制与郡县制', en: 'Qin Emperor System & Commanderies' },
        note: { zh: '创立皇帝制度、三公九卿与全国郡县制，“书同文、车同轨”，奠定两千年政治制度框架。', en: 'Centralized commanderies and counties, standardized script, coinage, and weights established the imperial institutional blueprint.' },
      },
      {
        event: 'hanwudi',
        year: -134,
        title: { zh: '汉武帝推恩令与盐铁官营', en: 'Emperor Wu’s Edict of Grace & State Monopolies' },
        note: { zh: '以推恩令消解诸侯王尾大不掉，收铸币与盐铁归中央，设立太学与刺史监察。', en: 'Dividing princely fiefs by inheritance, centralizing wuzhu coinage and salt/iron, and founding the Imperial Academy consolidated Han unity.' },
      },
      {
        event: 'xiaowendi',
        year: 494,
        title: { zh: '北魏孝文帝汉化改革', en: 'Emperor Xiaowen’s Reforms' },
        note: { zh: '推行均田制、三长制并迁都洛阳，促进北方民族大交融，为隋唐田制与兵制探路。', en: 'The equal-field system and move to Luoyang blended steppe and Central Plains institutions, laying the groundwork for Sui–Tang governance.' },
      },
      {
        event: 'keju',
        year: 605,
        title: { zh: '隋唐三省六部制与科举取士', en: 'Three Departments & Imperial Examinations' },
        note: { zh: '以分科考试选拔官员取代门第垄断，扩大统治基础并延续一千三百年。', en: 'Written examinations opened civil office beyond aristocratic clans, enduring for 1,300 years until 1905.' },
      },
      {
        event: 'wanganshi',
        year: 1069,
        title: { zh: '北宋王安石变法', en: 'Wang Anshi’s New Policies' },
        note: { zh: '以青苗法、募役法、方田均税法与保甲法整顿财政军政，尝试以国家信用调控农业与商业。', en: 'Green-Sprout rural loans, hired service, and cadastral surveys sought to Fiscalize state revenue and relieve Song fiscal strains.' },
      },
      {
        event: 'third_plenum',
        year: 1978,
        title: { zh: '十一届三中全会与改革开放', en: '1978 Reform and Opening-Up' },
        note: { zh: '从家庭联产承包责任制、经济特区到社会主义市场经济体制，开启当代中国的现代化大转型。', en: 'Starting with rural household contracts and Special Economic Zones, post-1978 reforms launched China’s modern economic transformation.' },
      },
    ],
  },
  {
    id: 'science',
    color: '#3f9c6d',
    title: { zh: '中国古代科技与四大发明', en: 'Science & the Four Great Inventions' },
    subtitle: { zh: '水利、造纸、天文、算学、印刷与航海科技如何改变中国与世界', en: 'Hydraulic engineering, papermaking, astronomy, mathematics, printing, and navigation' },
    stops: [
      {
        event: 'dujiangyan',
        year: -256,
        title: { zh: '都江堰无坝引水工程', en: 'Dujiangyan Irrigation System' },
        note: { zh: '李冰父子巧借弯道环流分水排沙，两千两百余年持续灌溉成都平原。', en: 'Li Bing’s鱼嘴 (Fish Mouth) levee and spillway harnessed natural river hydraulics without damming the Min River.' },
      },
      {
        event: 'cailun',
        year: 105,
        title: { zh: '蔡伦改进造纸术', en: 'Cai Lun Refines Papermaking' },
        note: { zh: '以树皮、麻头、破布造出轻便廉价的“蔡侯纸”，取代笨重竹简与昂贵缣帛。', en: 'Tree bark, hemp, and rags yielded affordable paper that replaced bamboo slips and silk.' },
      },
      {
        event: 'zhangheng',
        year: 132,
        title: { zh: '张衡候风地动仪与汉代医学', en: 'Zhang Heng’s Seismoscope & Han Medicine' },
        note: { zh: '东汉天文历算与张仲景《伤寒杂病论》、华佗外科麻醉共同奠定传统科技体系。', en: 'Celestial globes, earthquake detection, and Zhang Zhongjing’s clinical treatise anchored Eastern Han science.' },
      },
      {
        event: 'zuchongzhi',
        year: 462,
        title: { zh: '祖冲之圆周率与《齐民要术》', en: 'Zu Chongzhi’s π & Qimin Yaoshu' },
        note: { zh: '祖冲之将圆周率精确到小数点后七位（领先世界近千年），贾思勰总结北方精耕细作农学。', en: 'Zu Chongzhi computed π to seven decimal places (unmatched for nearly a millennium) while Jia Sixie compiled China’s oldest complete agricultural manual.' },
      },
      {
        event: 'diamond_sutra',
        year: 868,
        title: { zh: '唐代雕版印刷《金刚经》与火药发明', en: 'Printed Diamond Sutra & Gunpowder' },
        note: { zh: '868年敦煌雕版《金刚经》为现存最早标有确切年代的印刷品；唐末火药开始用于军事。', en: 'The 868 Dunhuang Diamond Sutra is the world’s earliest dated printed book; gunpowder entered military use in the late Tang.' },
      },
      {
        event: 'bisheng',
        year: 1045,
        title: { zh: '毕昇活字印刷与航海罗盘', en: 'Bi Sheng’s Movable Type & Mariner’s Compass' },
        note: { zh: '北宋泥活字印刷与水罗盘航海相得益彰，沈括《梦溪笔谈》详细记录了这两项突破。', en: 'Clay movable type and the magnetic needle compass were both documented in Shen Kuo’s Dream Pool Essays.' },
      },
      {
        event: 'guoshoujing',
        year: 1280,
        title: { zh: '郭守敬“四海测验”与《授时历》', en: 'Guo Shoujing’s Shoushi Calendar' },
        note: { zh: '在全国设立27座观测点测定回归年为365.2425日，与现行公历精度相同而早约三百年。', en: 'Surveying 27 observatories from南海 to Siberia, Guo Shoujing fixed the tropical year at 365.2425 days three centuries before the Gregorian calendar.' },
      },
      {
        event: 'ming_science',
        year: 1578,
        title: { zh: '《本草纲目》《天工开物》与明末科学总结', en: 'Bencao Gangmu & Tiangong Kaiwu' },
        note: { zh: '李时珍、宋应星与徐光启对传统医药、手工业与农学进行百科全书式总结，并开启西学东渐译介。', en: 'Li Shizhen, Song Yingxing, and Xu Guangqi synthesized classical pharmacology, crafts, and agronomy while translating Euclidean geometry.' },
      },
    ],
  },
  {
    id: 'frontier',
    color: '#8e6b48',
    title: { zh: '农牧交融与万里长城', en: 'Steppe, Sown & the Great Wall' },
    subtitle: { zh: '长城南北的战争、和亲、互市与多民族国家形成脉络', en: 'Defense, marriage alliances, border markets, and multi-ethnic integration along the frontier' },
    stops: [
      {
        event: 'qin_wall',
        year: -214,
        title: { zh: '秦连接各国长城', en: 'Qin Connects the Great Wall' },
        note: { zh: '蒙恬北击匈奴收复河南地，连接秦、赵、燕旧塞，形成西起临洮、东至辽东的万里防线。', en: 'Meng Tian linked the old walls of Qin, Zhao, and Yan from Lintao to Liaodong along the steppe–farmland transition zone.' },
      },
      {
        event: 'zhaojun',
        year: -33,
        title: { zh: '汉匈和战与昭君出塞', en: 'Han–Xiongnu Peace & Wang Zhaojun' },
        note: { zh: '经汉武帝反击匈奴后，前33年昭君出塞和亲，开启汉匈边塞数十载和平与关市互易。', en: 'Following Emperor Wu’s campaigns, Wang Zhaojun’s 33 BCE marriage alliance brought decades of border peace and trade.' },
      },
      {
        event: 'xiaowendi',
        year: 494,
        title: { zh: '北魏迁都洛阳与胡汉交融', en: 'Northern Wei & Hu–Han Synthesis' },
        note: { zh: '鲜卑拓跋部统一北方后南迁洛阳，胡服骑射与中原礼制汇流，孕育隋唐宏大格局。', en: 'The Tuoba Xianbei court moved from Pingcheng to Luoyang, fusing steppe vitality with Central Plains statecraft.' },
      },
      {
        event: 'wencheng',
        year: 641,
        title: { zh: '唐太宗“天可汗”与文成公主入藏', en: 'Tang “Heavenly Qaghan” & Princess Wencheng' },
        note: { zh: '唐朝以开放政策处理民族关系，设安西、北庭都护府，641年文成公主入藏促进唐蕃亲善。', en: 'Honored as “Heavenly Qaghan” by northern peoples, Tang Taizong also sent Princess Wencheng to Tibet in 641, inaugurating Tang–Tuban ties.' },
      },
      {
        event: 'chanyuan',
        year: 1005,
        title: { zh: '宋辽澶渊之盟与榷场贸易', en: 'Song–Liao Treaty of Chanyuan' },
        note: { zh: '1005年宋辽盟约换来百余年边境和平，沿边榷场茶马、丝绢贸易繁盛。', en: 'The 1005 Chanyuan Covenant inaugurated a century of Song–Liao peace and thriving border-market (quechang) commerce.' },
      },
      {
        event: 'ming_wall',
        year: 1570,
        title: { zh: '明长城九边与隆庆和议', en: 'Ming Nine Garrisons & Longqing Peace' },
        note: { zh: '明朝营建西起嘉峪关、东至鸭绿江的砖石长城；1571年俺答封贡与大同一带马市再兴。', en: 'The Ming fortified the brick-and-stone wall from Jiayuguan to the Yalu while opening horse markets after the 1571 peace with Altan Khan.' },
      },
      {
        event: 'zhuzang',
        year: 1727,
        title: { zh: '清代多民族版图奠定', en: 'Qing Multi-Ethnic Realm Consolidated' },
        note: { zh: '清朝联蒙治藏、设伊犁将军与驻藏大臣，“一座避暑山庄，胜抵十万雄兵”，奠定近代中国疆域。', en: 'Through alliance banners, the Ili General, and Ambans in Lhasa, the Qing unified Inner Asia and China Proper into a single realm.' },
      },
    ],
  },
];

export const TRAIL = new Map(TRAILS.map(t => [t.id, t]));

/** Returns all thematic trails and stop indices that include `eventId`. */
export function trailsForEvent(eventId: string): { trail: Trail; stopIndex: number }[] {
  const out: { trail: Trail; stopIndex: number }[] = [];
  for (const trail of TRAILS) {
    const idx = trail.stops.findIndex(s => s.event === eventId);
    if (idx >= 0) out.push({ trail, stopIndex: idx });
  }
  return out;
}

/** Returns all thematic trails and stop indices that visit `placeId` (either directly or via the stop's event place). */
export function trailsForPlace(placeId: string, eventPlaceOf?: (evId: string) => string | undefined): { trail: Trail; stopIndex: number }[] {
  const out: { trail: Trail; stopIndex: number }[] = [];
  for (const trail of TRAILS) {
    const idx = trail.stops.findIndex(s => s.place === placeId || (s.event && eventPlaceOf?.(s.event) === placeId));
    if (idx >= 0) out.push({ trail, stopIndex: idx });
  }
  return out;
}

