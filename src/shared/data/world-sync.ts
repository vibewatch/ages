import type { I18n, Wiki, Year } from './types.ts';

export interface WorldMilestone {
  id: string;
  year: Year;
  end?: Year;
  region: I18n;
  title: I18n;
  summary: I18n;
  wiki?: Wiki;
}

export interface EventWorldLink {
  year: Year;
  title: I18n;
  note: I18n;
  wiki?: Wiki;
}

export const WORLD_MILESTONES: WorldMilestone[] = [
  {
    id: 'oldowan',
    year: -1_750_000,
    end: -500_000,
    region: { zh: '东非与欧亚大陆', en: 'East Africa & Eurasia' },
    title: { zh: '直立人走出非洲与阿舍利手斧技术', en: 'Homo erectus dispersals & Acheulean handaxes' },
    summary: { zh: '直立人自非洲扩散至高加索（德马尼西）、爪哇与东亚，掌握打制石器与早期用火。', en: 'Homo erectus spread across Africa, Georgia (Dmanisi), Java, and East Asia, crafting stone tools and mastering fire.' },
    wiki: { zh: '直立人', en: 'Homo erectus' },
  },
  {
    id: 'fertile_crescent',
    year: -8000,
    end: -3500,
    region: { zh: '西亚新月沃地', en: 'Fertile Crescent' },
    title: { zh: '新月沃地农业起源（小麦与大麦驯化）', en: 'Neolithic Revolution in the Fertile Crescent' },
    summary: { zh: '西亚驯化小麦、大麦与绵羊，与中国长江稻作、黄河粟作并列为世界最早的独立农业起源中心。', en: 'Wheat, barley, and sheep were domesticated in West Asia alongside China’s independent Yangtze rice and Yellow River millet traditions.' },
    wiki: { zh: '新石器革命', en: 'Neolithic Revolution' },
  },
  {
    id: 'sumer_egypt',
    year: -3100,
    end: -2000,
    region: { zh: '两河流域 · 尼罗河', en: 'Mesopotamia & Egypt' },
    title: { zh: '苏美尔城邦、楔形文字与古埃及金字塔时代', en: 'Sumerian city-states, cuneiform & Old Kingdom pyramids' },
    summary: { zh: '两河流域出现楔形文字与乌尔城邦，古埃及统一并营建吉萨金字塔，印度河流域兴起哈拉帕文明。', en: 'Cuneiform writing and city-states arose in Sumer, Old Kingdom Egypt built the Giza pyramids, and Harappan cities flourished in the Indus Valley.' },
    wiki: { zh: '苏美尔', en: 'Sumer' },
  },
  {
    id: 'hammurabi',
    year: -1792,
    end: -1595,
    region: { zh: '古巴比伦', en: 'Babylonia' },
    title: { zh: '古巴比伦王国与《汉谟拉比法典》', en: 'Old Babylonian Empire & Code of Hammurabi' },
    summary: { zh: '汉谟拉比统一两河流域中下游，颁布刻于黑色玄武岩柱上的《汉谟拉比法典》，与夏商之际大致同期。', en: 'Hammurabi united Mesopotamia and promulgated his basalt-stele law code, contemporaneous with the Xia–Shang transition.' },
    wiki: { zh: '汉谟拉比法典', en: 'Code of Hammurabi' },
  },
  {
    id: 'new_kingdom_egypt',
    year: -1550,
    end: -1070,
    region: { zh: '东地中海 · 近东', en: 'Eastern Mediterranean' },
    title: { zh: '古埃及新王国、赫梯帝国与晚青铜时代国际体系', en: 'New Kingdom Egypt, Hittites & Late Bronze Age diplomacy' },
    summary: { zh: '拉美西斯二世与赫梯签订银板和约，爱琴海迈锡尼文明兴盛，与商代殷墟甲骨文及青铜鼎盛期同处青铜时代高峰。', en: 'Ramesses II and the Hittites signed the Kadesh peace treaty while Mycenaean Greece and Shang Anyang reached their Bronze Age peaks.' },
    wiki: { zh: '新王国时期', en: 'New Kingdom of Egypt' },
  },
  {
    id: 'axial_greece_india',
    year: -600,
    end: -400,
    region: { zh: '古希腊 · 古印度 · 波斯', en: 'Greece, India & Persia' },
    title: { zh: '轴心时代：雅典民主、释迦牟尼与波斯帝国', en: 'Axial Age: Classical Athens, the Buddha & Achaemenid Persia' },
    summary: { zh: '苏格拉底、柏拉图与古印度释迦牟尼提出哲学与宗教思潮，与春秋战国孔子、老子及百家争鸣遥相呼应。', en: 'Socrates, Plato, and Siddhartha Gautama transformed philosophy and religion simultaneously with Confucius, Laozi, and China’s Hundred Schools.' },
    wiki: { zh: '轴心时代', en: 'Axial Age' },
  },
  {
    id: 'alexander_maurya',
    year: -334,
    end: -232,
    region: { zh: '地中海至南亚', en: 'Mediterranean to South Asia' },
    title: { zh: '亚历山大东征、希腊化时代与孔雀王朝阿育王', en: 'Alexander the Great, Hellenistic World & Ashoka’s Maurya Empire' },
    summary: { zh: '亚历山大横跨欧亚非建立帝国，阿育王统一印度大部并弘扬佛教，正值中国战国七雄兼并、秦走向统一前夕。', en: 'Alexander’s campaigns created the Hellenistic world and Ashoka unified most of India just as Qin rose to unify the Warring States.' },
    wiki: { zh: '希腊化时代', en: 'Hellenistic period' },
  },
  {
    id: 'punic_rome_rise',
    year: -264,
    end: -146,
    region: { zh: '地中海世界', en: 'Mediterranean' },
    title: { zh: '布匿战争与罗马共和国称霸地中海', en: 'Punic Wars & the rise of the Roman Republic' },
    summary: { zh: '罗马与迦太基展开三次布匿战争并称霸地中海，与秦统一六国、西汉建立在欧亚大陆东西两端同步演进。', en: 'Rome defeated Carthage in the Punic Wars to dominate the Mediterranean at the same time Qin and Western Han unified China.' },
    wiki: { zh: '布匿战争', en: 'Punic Wars' },
  },
  {
    id: 'pax_romana',
    year: -27,
    end: 180,
    region: { zh: '罗马帝国 · 贵霜帝国', en: 'Roman & Kushan Empires' },
    title: { zh: '屋大维创立罗马帝国与“罗马和平”（大秦）', en: 'Augustus & the Pax Romana (“Daqin”)' },
    summary: { zh: '罗马帝国与两汉并称“西罗马、东秦汉”，汉史称罗马为“大秦”，双方经丝绸之路、安息（帕提亚）与贵霜展开丝绸贸易。', en: 'Imperial Rome (“Daqin” in Han histories) and Han China anchored the two ends of Eurasia, linked across Parthia and Kushan by the Silk Road.' },
    wiki: { zh: '罗马帝国', en: 'Roman Empire' },
  },
  {
    id: 'late_antiquity_gupta',
    year: 313,
    end: 550,
    region: { zh: '欧洲 · 南亚', en: 'Europe & South Asia' },
    title: { zh: '民族大迁徙、西罗马灭亡（476）与印度笈多王朝', en: 'Fall of Western Rome (476) & Golden Age of Gupta India' },
    summary: { zh: '君士坦丁迁都拜占庭，日耳曼民族迁徙促成476年西罗马灭亡；印度笈多王朝在数学与梵文文学上达于鼎盛（玄奘后来游学之那烂陀即兴于此时）。', en: 'While the Migration Period ended the Western Roman Empire in 476, Gupta India flourished in mathematics and Sanskrit learning, founding Nalanda.' },
    wiki: { zh: '西罗马帝国衰亡', en: 'Fall of the Western Roman Empire' },
  },
  {
    id: 'justinian_islam_rise',
    year: 527,
    end: 661,
    region: { zh: '拜占庭 · 阿拉伯半岛', en: 'Byzantium & Arabia' },
    title: { zh: '查士丁尼编纂《民法大全》与伊斯兰教兴起', en: 'Justinian’s Corpus Juris Civilis & Rise of Islam' },
    summary: { zh: '东罗马帝国编纂罗马法体系，7世纪阿拉伯半岛统一并迅速向西亚北非扩展，与隋唐重新统一中国同步。', en: 'Byzantium codified Roman law under Justinian and the early Islamic caliphate unified Arabia just as Sui and Tang reunified China.' },
    wiki: { zh: '查士丁尼一世', en: 'Justinian I' },
  },
  {
    id: 'abbasid_charlemagne',
    year: 750,
    end: 900,
    region: { zh: '西亚 · 西欧 · 日本', en: 'West Asia, Europe & Japan' },
    title: { zh: '阿拔斯王朝“智慧宫”、查理曼帝国与日本奈良/平安时代', en: 'Abbasid Baghdad, Charlemagne & Nara–Heian Japan' },
    summary: { zh: '巴格达成为伊斯兰学术中心（中国造纸术经中亚西传），查理曼在西欧加冕，日本遣唐使推动大化改新与平城京建设。', en: 'Baghdad’s House of Wisdom translated classical science using newly arrived Chinese papermaking, Charlemagne was crowned in Europe, and Japan modeled Nara and Heian on Tang Chang’an.' },
    wiki: { zh: '伊斯兰黄金时代', en: 'Islamic Golden Age' },
  },
  {
    id: 'crusades_magna_carta',
    year: 1050,
    end: 1250,
    region: { zh: '欧洲 · 地中海 · 吴哥', en: 'Europe, Mediterranean & Angkor' },
    title: { zh: '欧洲大学兴起、十字军东征与英国《大宪章》（1215）', en: 'Rise of European universities, Crusades & Magna Carta (1215)' },
    summary: { zh: '博洛尼亚与巴黎大学兴起，1215年英格兰签署《大宪章》，东南亚吴哥窟建成，正值两宋城市商业、活字印刷与海上贸易繁荣期。', en: 'Universities rose at Bologna and Paris, England sealed Magna Carta (1215), and Angkor Wat was built while Song China pioneered paper money, movable type, and compass navigation.' },
    wiki: { zh: '大宪章', en: 'Magna Carta' },
  },
  {
    id: 'pax_mongolica',
    year: 1250,
    end: 1368,
    region: { zh: '欧亚大陆 · 北非', en: 'Eurasia & North Africa' },
    title: { zh: '蒙古帝国横跨欧亚与马可·波罗、伊本·白图泰游历', en: 'Eurasian exchange under the Mongol Empire (Marco Polo & Ibn Battuta)' },
    summary: { zh: '驿站网络贯通欧亚，马可·波罗与摩洛哥旅行家伊本·白图泰先后游历元朝中国，火药、罗盘与印刷术加速西传。', en: 'Post-road networks linked Eurasia from the Mediterranean to Yuan Dadu, carrying travellers like Marco Polo and Ibn Battuta and accelerating the westward spread of gunpowder and printing.' },
    wiki: { zh: '蒙元治世', en: 'Pax Mongolica' },
  },
  {
    id: 'renaissance_discovery',
    year: 1400,
    end: 1600,
    region: { zh: '欧洲 · 大西洋 · 美洲', en: 'Europe, Atlantic & Americas' },
    title: { zh: '欧洲文艺复兴、古登堡印刷术（c.1450）与新航路开辟（1492）', en: 'Renaissance, Gutenberg Press (c. 1450) & Age of Discovery (1492)' },
    summary: { zh: '郑和七下西洋（1405—1433）半个多世纪后，哥伦布横渡大西洋、麦哲伦船队完成环球航行，美洲白银经马尼拉大帆船大量流入明朝。', en: 'Half a century after Zheng He’s voyages, Columbus (1492) and Magellan opened global sea routes; New World silver flowed into Ming China via the Manila Galleons.' },
    wiki: { zh: '地理大发现', en: 'Age of Discovery' },
  },
  {
    id: 'scientific_enlightenment',
    year: 1640,
    end: 1789,
    region: { zh: '欧洲 · 北美', en: 'Europe & North America' },
    title: { zh: '英国资产阶级革命、牛顿近代科学、启蒙运动与工业革命开端', en: 'Scientific Revolution, Enlightenment, Steam Engine & American/French Revolutions' },
    summary: { zh: '1687年牛顿发表《自然哲学的数学原理》，18世纪中叶瓦特改良蒸汽机开启英国工业革命，1776年美国独立、1789年法国大革命爆发，与清朝康乾盛世同期。', en: 'While High Qing reached its territorial zenith under Kangxi and Qianlong, Newton published the Principia (1687), Watt’s steam engine launched the Industrial Revolution, and the American (1776) and French (1789) Revolutions reshaped politics.' },
    wiki: { zh: '工业革命', en: 'Industrial Revolution' },
  },
  {
    id: 'second_industrial_meiji',
    year: 1840,
    end: 1913,
    region: { zh: '欧美 · 日本', en: 'Europe, US & Japan' },
    title: { zh: '第二次工业革命、俄国农奴制改革（1861）与日本明治维新（1868）', en: 'Second Industrial Revolution, US Civil War & Japan’s Meiji Restoration (1868)' },
    summary: { zh: '电力、内燃机与铁路网重塑全球工业格局；1868年日本明治维新走上工业化与对外扩张道路，与晚清洋务运动、甲午战争直接交织。', en: 'Electricity, steel, and railways powered the Second Industrial Revolution; Japan’s 1868 Meiji Restoration paralleled and collided with Late Qing’s Self-Strengthening Movement in 1894.' },
    wiki: { zh: '明治维新', en: 'Meiji Restoration' },
  },
  {
    id: 'world_wars_twentieth',
    year: 1914,
    end: 1945,
    region: { zh: '全球', en: 'Global' },
    title: { zh: '第一次世界大战、十月革命（1917）、大萧条与世界反法西斯战争', en: 'WWI, 1917 October Revolution, Great Depression & WWII' },
    summary: { zh: '1919年巴黎和会引发中国五四运动；1931—1945年中国抗日战争开辟世界反法西斯战争东方主战场，与盟军共同赢得二战胜利并创立联合国。', en: 'The 1919 Paris Peace Conference sparked China’s May Fourth Movement, and China’s 1931–1945 War of Resistance formed the main eastern theater of the Allied victory in WWII and the founding of the UN.' },
    wiki: { zh: '第二次世界大战', en: 'World War II' },
  },
  {
    id: 'cold_war_information',
    year: 1946,
    end: 2025,
    region: { zh: '全球', en: 'Global' },
    title: { zh: '亚非拉民族独立浪潮、冷战与第三次科技（信息）革命', en: 'Decolonization, Space & Information Age, and Globalization' },
    summary: { zh: '1955年万隆会议推动亚非团结，计算机、航天与互联网开启信息时代，中国通过改革开放与加入世贸组织深度融入全球经济体系。', en: 'Postwar decolonization (Bandung 1955), spaceflight, semiconductors, and the internet transformed the world as China’s post-1978 Reform and Opening and 2001 WTO accession reshaped global trade.' },
    wiki: { zh: '信息时代', en: 'Information Age' },
  },
];

const EVENT_WORLD_LINKS: Record<string, EventWorldLink> = {
  yuanmou: {
    year: -1_700_000,
    title: { zh: '同时代世界：东非奥杜威文化与德马尼西直立人', en: 'Global context: Olduvai Gorge & Dmanisi hominins' },
    note: { zh: '元谋人与格鲁吉亚德马尼西直立人（约180万年前）共同印证了早更新世人类走出非洲、向欧亚大陆扩散的早期浪潮。', en: 'Together with Dmanisi in Georgia (~1.8 Ma), Yuanmou Man documents the earliest Early Pleistocene hominin dispersal across Eurasia.' },
    wiki: { zh: '直立人', en: 'Homo erectus' },
  },
  hemudu: {
    year: -5000,
    title: { zh: '同时代世界：西亚两河流域欧贝德文化与小麦农业', en: 'Global context: Ubaid Mesopotamia & Early Farming' },
    note: { zh: '河姆渡稻作农业与半坡粟作农业，同西亚新月沃地的小麦大麦农业、美洲玉米农业并列为人类定居文明的基石。', en: 'Hemudu’s wet-rice farming and Banpo’s millet cultivation developed alongside West Asian wheat/barley agriculture as foundational centers of human settlement.' },
  },
  xia_found: {
    year: -2070,
    title: { zh: '同时代世界：苏美尔乌尔第三王朝与古埃及中王国', en: 'Global context: Ur III Dynasty & Middle Kingdom Egypt' },
    note: { zh: '约前21世纪两河流域颁布《乌尔纳姆法典》，古埃及进入中王国时期，欧亚大陆各大河流域相继步入早期国家阶段。', en: 'Around the 21st century BCE, Mesopotamia issued the Code of Ur-Nammu and Egypt entered its Middle Kingdom as river-valley states consolidated across Afro-Eurasia.' },
  },
  pangeng: {
    year: -1300,
    title: { zh: '同时代世界：古埃及拉美西斯时代与腓尼基字母萌芽', en: 'Global context: New Kingdom Egypt & Early Alphabetic Scripts' },
    note: { zh: '殷墟甲骨文成熟之际，两河流域通行阿卡德楔形文字，古埃及使用圣书体，东地中海腓尼基字母正在孕育之中。', en: 'As Shang oracle-bone script matured at Anyang, Akkadian cuneiform served as the Near Eastern lingua franca, Egypt wrote in hieroglyphs, and early alphabetic script emerged in the Levant.' },
  },
  confucius: {
    year: -551,
    title: { zh: '同时代世界：轴心时代的古希腊与古印度思想巨匠', en: 'Global context: The Axial Age in Greece and India' },
    note: { zh: '孔子生平（前551—前479）与古印度释迦牟尼、古希腊毕达哥拉斯及雅典克里斯提尼民主改革同处公元前6—5世纪人类思想大觉醒时代。', en: 'Confucius (551–479 BCE) lived in the same century as Siddhartha Gautama in India, Pythagoras, and the birth of Athenian democracy.' },
    wiki: { zh: '轴心时代', en: 'Axial Age' },
  },
  baijia: {
    year: -350,
    title: { zh: '同时代世界：雅典柏拉图学园与亚里士多德吕克昂学园', en: 'Global context: Plato’s Academy & Aristotle’s Lyceum' },
    note: { zh: '齐国稷下学宫汇聚儒道墨法诸子辩难之时，雅典柏拉图学园与亚里士多德正在构建古典西方哲学与逻辑学体系。', en: 'While the Hundred Schools debated at Qi’s Jixia Academy, Plato’s Academy and Aristotle’s Lyceum in Athens were shaping classical Mediterranean philosophy.' },
  },
  qin_unify: {
    year: -221,
    title: { zh: '同时代世界：古印度孔雀王朝与地中海第二次布匿战争', en: 'Global context: Maurya India & the Second Punic War' },
    note: { zh: '前221年秦始皇统一中国、推行郡县制之际，地中海罗马共和国即将与迦太基统帅汉尼拔爆发第二次布匿战争（前218年）。', en: 'When Qin Shi Huang unified China in 221 BCE, the Roman Republic and Hannibal of Carthage stood on the brink of the Second Punic War (218 BCE).' },
  },
  zhangqian: {
    year: -138,
    title: { zh: '同时代世界：希腊化大夏（巴克特里亚）、安息与罗马东扩', en: 'Global context: Greco-Bactria, Parthia & Roman Expansion' },
    note: { zh: '张骞在西域亲见亚历山大东征后留下的希腊化文化遗存（大夏），丝绸之路自此将汉长安与安息（帕提亚）、罗马世界连接起来。', en: 'In Bactria (Daxia), Zhang Qian encountered Hellenistic cities left by Alexander’s campaigns; his missions linked Han Chang’an with Parthia and the Mediterranean.' },
  },
  cailun: {
    year: 105,
    title: { zh: '同时代世界：罗马帝国五贤帝时代（图拉真）与纸草书写', en: 'Global context: Trajan’s Rome & Papyrus/Parchment' },
    note: { zh: '蔡伦改进造纸术时，地中海世界仍依赖昂贵的埃及纸草与羊皮纸；造纸术此后经中亚、阿拉伯传入欧洲，深刻改变了人类知识传播。', en: 'When Cai Lun refined papermaking in 105 CE, Trajan’s Roman Empire still relied on papyrus and parchment; paper later spread via Samarkand and Baghdad to transform European literacy.' },
  },
  xuanzang: {
    year: 627,
    title: { zh: '同时代世界：戒日王统治北印度与那烂陀寺佛学巅峰', en: 'Global context: Harsha’s India & Nalanda Monastery' },
    note: { zh: '玄奘西行抵达的印度正值戒日王（Harsha）在位、那烂陀寺学术鼎盛期，《大唐西域记》成为研究7世纪中亚与南亚历史最珍贵的信史。', en: 'Xuanzang studied at Nalanda during Emperor Harsha’s reign; his Great Tang Records on the Western Regions remains a primary source for 7th-century Central and South Asian history.' },
  },
  kentoshi: {
    year: 645,
    title: { zh: '同时代世界：日本大化改新（645）与东亚唐文化圈', en: 'Global context: Japan’s Taika Reforms (645) & the East Asian Sphere' },
    note: { zh: '日本孝德天皇推行大化改新，仿唐制建立中央集权与班田收授法，平城京（奈良）与平安京（京都）均以长安城为蓝本规划。', en: 'Japan’s Taika Reforms (645) adopted Tang-style ministries and land systems, and both Nara (Heijō-kyō) and Kyoto (Heian-kyō) were laid out on the grid of Chang’an.' },
  },
  bisheng: {
    year: 1045,
    title: { zh: '同时代世界：欧洲手抄羊皮书时代（比古登堡早约400年）', en: 'Global context: Four centuries before Gutenberg’s press' },
    note: { zh: '毕昇发明泥活字印刷（1041—1048）时，欧洲仍由修道院手工抄写羊皮书；约400年后德国古登堡（约1450年）创制铅活字印刷机。', en: 'Bi Sheng’s clay movable type (c. 1045) preceded Johannes Gutenberg’s metal movable-type press in Mainz (c. 1450) by four centuries.' },
  },
  marco_polo: {
    year: 1275,
    title: { zh: '同时代世界：意大利商业共和国（威尼斯、热那亚）与文艺复兴前夜', en: 'Global context: Maritime Venice, Genoa & Late Medieval Europe' },
    note: { zh: '《马可·波罗行纪》在欧洲广泛流传，书中对元大都、杭州与刺桐（泉州）富庶的描绘，直接激发了15世纪葡萄牙与哥伦布寻找东方新航路的热潮。', en: 'Marco Polo’s accounts of Dadu, Hangzhou, and Quanzhou circulated widely in Venice and Genoa, directly inspiring 15th-century Iberian navigators including Columbus.' },
  },
  zhenghe: {
    year: 1405,
    title: { zh: '同时代世界：葡萄牙亨利王子航海探索与大航海时代前夕', en: 'Global context: Dawn of the European Age of Exploration' },
    note: { zh: '郑和船队（1405—1433）远航印度洋与东非海岸，比迪亚士绕过好望角（1488）、哥伦布横渡大西洋（1492）和达·伽马抵达印度（1498）早半个多世纪。', en: 'Zheng He’s Indian Ocean fleets (1405–1433) sailed more than half a century before Bartolomeu Dias (1488), Christopher Columbus (1492), and Vasco da Gama (1498).' },
  },
  opium_war: {
    year: 1840,
    title: { zh: '同时代世界：英国完成第一次工业革命与全球殖民扩张', en: 'Global context: Britain’s Industrial Revolution & Steam Power' },
    note: { zh: '19世纪30—40年代英国率先完成工业革命，蒸汽机船（如“复仇神号”）与近代工业生产力成为其打开晚清国门、冲击传统小农经济的时代背景。', en: 'By 1840 Britain had completed the First Industrial Revolution; steam-powered warships like the Nemesis and mechanized textile mills confronted Qing China’s agrarian economy.' },
  },
  yangwu: {
    year: 1861,
    title: { zh: '同时代世界：俄国1861年农奴制改革、美国内战与日本明治维新（1868）', en: 'Global context: 1861 Russian Emancipation, US Civil War & 1868 Meiji Restoration' },
    note: { zh: '19世纪60年代全球掀起工业化与制度变革浪潮：俄国废除农奴制（1861）、美国内战维护统一（1861—1865）、日本开启明治维新（1868），清廷同步推行洋务新政。', en: 'The 1860s saw simultaneous modernization drives worldwide: Russia’s 1861 emancipation, the US Civil War (1861–65), Japan’s 1868 Meiji Restoration, and China’s Self-Strengthening Movement.' },
  },
  may4: {
    year: 1919,
    title: { zh: '同时代世界：一战结束、1919年巴黎和会与战后国际秩序重构', en: 'Global context: 1919 Paris Peace Conference & Post-WWI Order' },
    note: { zh: '第一次世界大战结束后的巴黎和会无视中国作为战胜国的正当诉求，将德国在山东权益转交日本，直接点燃了1919年五四爱国运动。', en: 'At the 1919 Paris Peace Conference after WWI, the Allied powers transferred German concessions in Shandong to Japan despite China’s status as a victor, directly triggering the May Fourth Movement.' },
  },
  victory1945: {
    year: 1945,
    title: { zh: '同时代世界：世界反法西斯战争全面胜利与联合国成立（1945）', en: 'Global context: Allied Victory in WWII & Founding of the United Nations (1945)' },
    note: { zh: '中国抗日战争历时14年，是世界反法西斯战争的东方主战场；1945年中国作为发起国之一签署《联合国宪章》，成为联合国安理会五大常任理事国之一。', en: 'China’s 14-year War of Resistance anchored the Allied eastern theater in WWII; in 1945 China signed the UN Charter as a founding permanent member of the Security Council.' },
  },
  wto: {
    year: 2001,
    title: { zh: '同时代世界：经济全球化深化与21世纪全球产业链重组', en: 'Global context: 21st-Century Globalization & Global Supply Chains' },
    note: { zh: '2001年中国加入世界贸易组织（WTO），与全球信息产业浪潮汇合，迅速成长为世界第一大货物贸易国与全球制造业中心。', en: 'Joining the WTO in 2001 connected China’s manufacturing and Reform-era economy with global supply chains during the rapid expansion of the digital age.' },
  },
};

/** Returns world history milestones overlapping `[from, to]`, or the nearest contemporary milestones if the interval is narrow. */
export function worldForRange(from: Year, to: Year, max = 3): WorldMilestone[] {
  const spanPad = Math.max(25, Math.round((to - from) * 0.15));
  const lo = from - spanPad;
  const hi = to + spanPad;
  const overlapping = WORLD_MILESTONES.filter(m => {
    const mEnd = m.end ?? m.year;
    return m.year <= hi && mEnd >= lo;
  });
  if (overlapping.length > 0) return overlapping.slice(0, max);
  const mid = (from + to) / 2;
  return WORLD_MILESTONES.slice()
    .sort((a, b) => {
      const da = Math.min(Math.abs(a.year - mid), Math.abs((a.end ?? a.year) - mid));
      const db = Math.min(Math.abs(b.year - mid), Math.abs((b.end ?? b.year) - mid));
      return da - db;
    })
    .slice(0, Math.min(2, max));
}

/** Returns a direct global-context note for an event, or falls back to the closest contemporary world milestone. */
export function eventWorldLink(id: string, year: Year, end?: Year): EventWorldLink {
  const direct = EVENT_WORLD_LINKS[id];
  if (direct) return direct;
  const m = worldForRange(year, end ?? year, 1)[0];
  return {
    year: m.year,
    title: { zh: `${m.region.zh} · ${m.title.zh}`, en: `${m.region.en} · ${m.title.en}` },
    note: m.summary,
    wiki: m.wiki,
  };
}
