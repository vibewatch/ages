import type { HistEvent, I18n, Snapshot } from './types.ts';

export interface EventSourceInfo {
  kind: 'curated' | 'imported';
  provenance: I18n;
  classics: I18n[];
  uncertainty: I18n | null;
}

export interface SnapshotSourceInfo {
  kind: 'curated' | 'imported' | 'schematic';
  badge: I18n;
  source: I18n;
  uncertainty: I18n;
}

const PILOT_EVENT_CLASSICS: Record<string, I18n[]> = {
  yuanmou: [
    { zh: '中国社会科学院考古研究所《中国考古学·旧石器时代卷》', en: 'CASS Institute of Archaeology, Chinese Archaeology: Paleolithic Volume' },
    { zh: '钱方等《元谋人牙齿化石地层古地磁测年》与元谋盆地发掘报告', en: 'Paleomagnetic stratigraphy & excavation reports of the Yuanmou hominin site' },
  ],
  peking_man: [
    { zh: '裴文中、贾兰坡《周口店发掘记》 · 《中国考古学·旧石器时代卷》', en: 'Pei Wenzhong & Jia Lanpo, Zhoukoudian Excavation Reports · Chinese Archaeology: Paleolithic Volume' },
    { zh: '沈冠军等《周口店第一地点²⁶Al/¹⁰Be埋藏测年》（Nature, 2009）', en: 'Shen et al., ²⁶Al/¹⁰Be cosmogenic nuclide burial dating of Zhoukoudian Locality 1 (Nature, 2009)' },
  ],
  qin_unify: [
    { zh: '《史记·秦始皇本纪》（司马迁）', en: 'Records of the Grand Historian (Shiji): Basic Annals of Qin Shi Huang' },
    { zh: '睡虎地秦墓竹简 · 里耶秦简（出土秦律与郡县公文）', en: 'Shuihudi & Liye Qin Bamboo Slips (excavated Qin statutes and county archives)' },
  ],
  shangyang: [
    { zh: '《史记·商君列传》 · 《商君书》', en: 'Shiji: Biography of Lord Shang · The Book of Lord Shang' },
    { zh: '青川秦木牍 · 睡虎地秦简《田律》', en: 'Qingchuan Qin wooden tablet & Shuihudi Field Statutes' },
  ],
  zhenguan: [
    { zh: '吴兢《贞观政要》 · 《旧唐书·太宗本纪》', en: 'Wu Jing, Essentials of Government of the Zhenguan Reign · Old Book of Tang' },
    { zh: '《唐律疏议》 · 《资治通鉴》', en: 'Tang Code with Commentary (Tanglü Shuyi) · Zizhi Tongjian' },
  ],
  xuanzang: [
    { zh: '玄奘口述、辩机撰《大唐西域记》', en: 'Great Tang Records on the Western Regions (Datang Xiyuji, by Xuanzang & Bianji)' },
    { zh: '慧立、彦悰《大慈恩寺三藏法师传》', en: 'Biography of the Tripitaka Master of Daci’en Monastery' },
  ],
  kaiyuan: [
    { zh: '《旧唐书·玄宗本纪》 · 《唐六典》', en: 'Old Book of Tang: Annals of Xuanzong · Six Statutes of Tang (Tang Liudian)' },
    { zh: '杜佑《通典·食货典》', en: 'Du You, Comprehensive Institutions (Tongdian): Food and Money' },
  ],
  anshi: [
    { zh: '《旧唐书·安禄山传》 · 《资治通鉴·唐纪》', en: 'Old Book of Tang: Biography of An Lushan · Zizhi Tongjian' },
    { zh: '姚汝能《安禄山事迹》', en: 'Yao Runeng, Deeds of An Lushan' },
  ],
  kaiguo: [
    { zh: '《中国人民政治协商会议共同纲领》（1949年9月）', en: 'Common Program of the CPPCC (September 1949)' },
    { zh: '《建国以来重要文献选编》（中央文献出版社）', en: 'Selected Important Documents since the Founding of the PRC' },
  ],
};

const PILOT_EVENT_UNCERTAINTY: Record<string, I18n> = {
  yuanmou: {
    zh: '年代说明：距今约170万年远超碳十四测年上限（约5万年），本条目年代依据古地磁地层学与电子自旋共振（ESR）测年，代表早更新世化石层近似区间。',
    en: 'Chronology note: At ~1.7 Ma (far beyond the ~50 ka limit of ¹⁴C), this date relies on paleomagnetic stratigraphy and ESR dating of the Early Pleistocene fossil horizon.',
  },
  peking_man: {
    zh: '年代说明：周口店北京人遗址跨越中更新世多个文化层（距今约70万—20万年），由古地磁、铀系法及宇宙成因核素（²⁶Al/¹⁰Be）埋藏测年综合测定。',
    en: 'Chronology note: Zhoukoudian Locality 1 spans multiple Middle Pleistocene strata (~700–200 ka), dated via paleomagnetism, U-series, and ²⁶Al/¹⁰Be cosmogenic burial dating.',
  },
  qin_unify: {
    zh: '考证说明：前221年秦完成兼并六国核心区；南征百越置桂林、象郡、南海三郡（前214年）及北击匈奴收河南地系后续扩边，地图疆界反映前214年后的极盛范围。',
    en: 'Historical note: Qin completed the annexation of the Six States in 221 BCE; the three Lingnan commanderies (214 BCE) and the Ordos Loop were incorporated in subsequent campaigns.',
  },
  xia_found: {
    zh: '年代与考证：约前2070年为夏商周断代工程拟定年代；二里头遗址展现了夏代中晚期王都气象，但早期夏史文献与考古文化的精确对应仍在深入研究中。',
    en: 'Chronology note: c. 2070 BCE is the estimate of the Xia–Shang–Zhou Chronology Project; Erlitou reflects a Bronze Age royal center, though exact textual-archaeological links remain under study.',
  },
  muye: {
    zh: '年代考证：武王伐纣之年历代有数十种推算；前1046年采用夏商周断代工程结合利簋铭文、天象推算与碳十四测年得出的通行年代。',
    en: 'Chronology note: Over forty dates were historically proposed for King Wu’s conquest of Shang; 1046 BCE follows the Xia–Shang–Zhou Chronology Project synthesis of the Li Gui bronze inscription, astronomy and ¹⁴C dating.',
  },
  kaiyuan: {
    zh: '统计说明：盛唐户籍人口（约5290万）见载于《通典》，因隐漏户、羁縻州及不课户未全计入，现代学者估算实际人口约7000万至8000万。',
    en: 'Demographic note: Registered Tang households peaked near 52.9 million in the Tongdian; accounting for unregistered households and jimi prefectures, modern historians estimate 70–80 million people.',
  },
};

function defaultClassics(year: number): I18n[] {
  if (year < -50_000) {
    return [
      { zh: '中国社会科学院考古研究所《中国考古学·旧石器时代卷》', en: 'CASS Institute of Archaeology, Chinese Archaeology: Paleolithic Volume' },
      { zh: '古脊椎动物与古人类研究所遗址发掘报告及古地磁/同位素测年研究', en: 'IVPP hominin excavation reports & paleomagnetic / radiometric dating studies' },
    ];
  }
  if (year < -2070) {
    return [
      { zh: '中国社会科学院考古研究所《中国考古学·新石器时代卷》', en: 'CASS Institute of Archaeology, Chinese Archaeology: Neolithic Volume' },
      { zh: '国家文物局田野考古发掘报告与碳十四测年数据集', en: 'National Cultural Heritage Administration excavation reports & ¹⁴C datasets' },
    ];
  }
  if (year < -1046) {
    return [
      { zh: '《史记·夏本纪 / 殷本纪》 · 《竹书纪年》', en: 'Records of the Grand Historian (Shiji): Xia & Yin Annals · Bamboo Annals' },
      { zh: '《甲骨文合集》 · 《夏商周断代工程报告》', en: 'Corpus of Oracle Bone Inscriptions · Xia–Shang–Zhou Chronology Project Report' },
    ];
  }
  if (year < -221) {
    return [
      { zh: '《左传》 · 《史记》 · 《战国策》', en: 'Zuo Commentary (Zuo Zhuan) · Shiji · Strategies of the Warring States' },
      { zh: '《竹书纪年》与战国出土简帛文献', en: 'Bamboo Annals and excavated Warring States bamboo & silk manuscripts' },
    ];
  }
  if (year <= -207) {
    return [
      { zh: '《史记·秦始皇本纪》 · 《汉书》', en: 'Shiji: Basic Annals of Qin Shi Huang · Book of Han' },
      { zh: '睡虎地秦墓竹简 · 里耶秦简', en: 'Shuihudi & Liye Qin Bamboo Slips' },
    ];
  }
  if (year <= 220) {
    return [
      { zh: '《史记》 · 《汉书》 · 《后汉书》', en: 'Shiji · Book of Han (Hanshu) · Book of Later Han (Hou Hanshu)' },
      { zh: '居延汉简 · 悬泉置汉简', en: 'Juyan & Xuanquanzhi Han wooden slips' },
    ];
  }
  if (year < 581) {
    return [
      { zh: '《三国志》 · 《晋书》 · 《南史 / 北史》', en: 'Records of the Three Kingdoms · Book of Jin · Histories of the Southern & Northern Dynasties' },
      { zh: '司马光《资治通鉴》', en: 'Sima Guang, Comprehensive Mirror in Aid of Governance (Zizhi Tongjian)' },
    ];
  }
  if (year <= 907) {
    return [
      { zh: '《隋书》 · 《旧唐书》 · 《新唐书》', en: 'Book of Sui · Old Book of Tang · New Book of Tang' },
      { zh: '《资治通鉴》 · 杜佑《通典》', en: 'Zizhi Tongjian · Du You, Comprehensive Institutions (Tongdian)' },
    ];
  }
  if (year < 1271) {
    return [
      { zh: '《宋史》 · 《辽史》 · 《金史》', en: 'History of Song · History of Liao · History of Jin' },
      { zh: '李焘《续资治通鉴长编》 · 徐梦莘《三朝北盟会编》', en: 'Li Tao, Long Draft of the Continuation of Zizhi Tongjian' },
    ];
  }
  if (year < 1368) {
    return [
      { zh: '《元史》 · 《元朝秘史》', en: 'History of Yuan (Yuanshi) · Secret History of the Mongols' },
      { zh: '《大元一统志》 · 《经世大典》辑佚', en: 'Comprehensive Gazetteer of the Great Yuan (Dayuan Yitongzhi)' },
    ];
  }
  if (year < 1644) {
    return [
      { zh: '《明史》 · 《明实录》', en: 'History of Ming (Mingshi) · Ming Veritable Records (Ming Shilu)' },
      { zh: '《大明会典》 · 谈迁《国榷》', en: 'Collected Statutes of the Ming Dynasty · Tan Qian, Guoque' },
    ];
  }
  if (year <= 1911) {
    return [
      { zh: '《清史稿》 · 《清实录》', en: 'Draft History of Qing (Qingshigao) · Qing Veritable Records' },
      { zh: '中国第一历史档案馆明清档案 · 《筹办夷务始末》', en: 'First Historical Archives of China (Qing palace memorials & treaties)' },
    ];
  }
  return [
    { zh: '《中国近代史资料丛刊》 · 中央档案馆文献选编', en: 'Compendium of Modern Chinese Historical Sources · Central Archives' },
    { zh: '教育部统编历史教材与权威史学著作', en: 'Ministry of Education standard history curriculum & modern archival studies' },
  ];
}

/** Returns structured provenance, classical/primary sources, and date/location uncertainty notes for any event. */
export function eventSources(e: HistEvent): EventSourceInfo {
  const imported = e.source === 'jiangshan';
  const hasPilotSource = Object.hasOwn(PILOT_EVENT_CLASSICS, e.id);
  const provenance: I18n = imported
    ? { zh: '江山图编年史料 · 附断代参考史籍', en: 'jiangshan-map chronicle · paired with period reference histories' }
    : hasPilotSource
      ? { zh: '统编历史教材核心条目 · 专项正史与出土文献核校', en: 'Core curriculum entry · verified with event-specific primary & archaeological sources' }
      : e.curriculum.length
        ? { zh: '统编历史教材核心条目 · 附断代参考史籍', en: 'Core curriculum entry · paired with period reference histories' }
        : { zh: '长河专题史事 · 附断代参考史籍', en: 'Curated historical entry · paired with period reference histories' };

  const classics = PILOT_EVENT_CLASSICS[e.id] ?? defaultClassics(e.year);

  let uncertainty: I18n | null = PILOT_EVENT_UNCERTAINTY[e.id] ?? null;
  if (!uncertainty) {
    if (e.year < -50_000) {
      uncertainty = {
        zh: '年代说明：距今5万年以前的旧石器时代遗址超出碳十四测年范围，绝对年代主要依据古地磁地层学、铀系法、电子自旋共振（ESR）或宇宙成因核素测年。',
        en: 'Chronology note: Paleolithic sites older than ~50 ka exceed the limit of ¹⁴C dating and rely on paleomagnetic stratigraphy, U-series, ESR, or cosmogenic nuclide dating.',
      };
    } else if (e.year < -2070) {
      uncertainty = {
        zh: '年代说明：新石器及旧石器晚期绝对年代主要依据放射性碳十四（¹⁴C）测年与树轮校正，为考古文化层近似区间。',
        en: 'Chronology note: Late prehistoric dates derive from calibrated radiocarbon (¹⁴C) dating and represent approximate archaeological horizons.',
      };
    } else if (e.year < -841) {
      uncertainty = {
        zh: '年代说明：共和元年（前841年）以前尚无确切逐年纪年，本条目采用夏商周断代工程与统编教材通行拟年，具体王年仍有学术讨论。',
        en: 'Chronology note: Exact year-by-year dating in Chinese historiography begins in 841 BCE (Gonghe Regency); earlier dates follow the Xia–Shang–Zhou Chronology Project and remain approximate.',
      };
    } else if (imported) {
      uncertainty = {
        zh: '数据说明：本条编年事件坐标据古今地名治所对应折算，古战场与行军位置为历史地理近似定位。',
        en: 'Geolocation note: Coordinates correspond to historical administrative seats or approximate campaign sites in historical GIS.',
      };
    }
  }

  return { kind: imported ? 'imported' : 'curated', provenance, classics, uncertainty };
}

/** Returns provenance classification, source attribution, and boundary uncertainty note for a territorial snapshot. */
export function snapshotSources(s: Snapshot): SnapshotSourceInfo {
  if (s.year < -403) {
    return {
      kind: 'schematic',
      badge: { zh: '先秦示意疆域', en: 'Schematic early realm' },
      source: {
        zh: '底图来源：据谭其骧主编《中国历史地图集》与统编教材先秦形势图示意绘制',
        en: 'Source: Schematic reconstruction after Tan Qixiang’s Historical Atlas of China and curriculum maps',
      },
      uncertainty: {
        zh: '边界说明：先秦方国与诸侯尚无近代划界，色块表示核心控制区与山川自然分界；共和元年（前841年）以前年代为近似拟年。',
        en: 'Boundary note: Pre-imperial states lacked modern demarcated borders; shaded areas indicate core spheres of control and natural terrain divides, and pre-841 BCE dates are approximate.',
      },
    };
  }
  if (s.id === 'war1940' || s.id === 'prc1950' || s.id === 'prc2000') {
    return {
      kind: 'curated',
      badge: { zh: '教材教学示意图', en: 'Curriculum schematic map' },
      source: {
        zh: '底图来源：依据中学历史统编教材形势图简化绘制（教学示意用途）',
        en: 'Source: Simplified from standard school history textbook situation maps for educational use',
      },
      uncertainty: {
        zh: '地图说明：本图为历史教学简化示意图，海岸与边疆线条经地形网格折算，不作为任何标准国界或行政划界依据。',
        en: 'Map note: This simplified teaching map is projected onto the 3D terrain mesh for historical overview and is not an authoritative boundary reference.',
      },
    };
  }
  const isImported = Boolean(s.dyn || (s.shapes && !s.shapes.startsWith('x_')));
  if (s.year >= -221 && s.year <= -207) {
    return {
      kind: isImported ? 'imported' : 'curated',
      badge: { zh: '秦代疆域考证 · 谭图 / CHGIS', en: 'Qin realm · Tan Atlas / CHGIS' },
      source: {
        zh: '底图来源：谭其骧《中国历史地图集》（第二册·秦）、里耶秦简郡县考证与江山图底图',
        en: 'Source: Tan Qixiang’s Historical Atlas of China (Vol. 2: Qin), Liye Qin bamboo-slip county studies & jiangshan-map',
      },
      uncertainty: {
        zh: '疆界说明：反映秦代郡县直辖区与北境长城防线；西南夷与岭南百越边缘当时多为通道与据点控制，折算面积为近似估算。',
        en: 'Boundary note: Depicts Qin commanderies and the northern wall line; southern and southwestern marches were held mainly along garrisoned corridors, so area figures are approximate.',
      },
    };
  }
  if (s.year >= 618 && s.year <= 907) {
    return {
      kind: isImported ? 'imported' : 'curated',
      badge: { zh: '唐代疆域考证 · 谭图 / CHGIS', en: 'Tang realm · Tan Atlas / CHGIS' },
      source: {
        zh: '底图来源：谭其骧《中国历史地图集》（第五册·唐）、《旧唐书·地理志》与江山图底图',
        en: 'Source: Tan Qixiang’s Historical Atlas of China (Vol. 5: Tang), Old Book of Tang Geography Treatise & jiangshan-map',
      },
      uncertainty: {
        zh: '疆界说明：涵盖正州（道州县）与安西、北庭、安北、单于等羁縻都护府；羁縻边疆随西域与草原局势动态伸缩，面积为近似估算。',
        en: 'Boundary note: Includes both regular prefectures and jimi protectorates (Anxi, Beiting, Anbei); protectorate frontiers shifted fluidly with steppe politics, so area figures are approximate.',
      },
    };
  }
  return {
    kind: isImported ? 'imported' : 'curated',
    badge: isImported
      ? { zh: '历史GIS底图 · 谭图 / 江山图', en: 'Historical GIS · Tan Atlas / jiangshan' }
      : { zh: '统编教材参考底图', en: 'Curriculum reference map' },
    source: {
      zh: '底图来源：谭其骧《中国历史地图集》、CHGIS（哈佛中国历史GIS）与江山图阶段数据',
      en: 'Source: Tan Qixiang’s Historical Atlas of China, Harvard CHGIS and jiangshan-map phase polygons',
    },
    uncertainty: {
      zh: '疆界说明：古代边疆、羁縻府州与游牧政权交界多为动态过渡带，折算面积为近似值，仅供教学参考。',
      en: 'Boundary note: Pre-modern frontiers, jimi protectorates and steppe marches were fluid transition zones; calculated areas are approximate and for educational use only.',
    },
  };
}
