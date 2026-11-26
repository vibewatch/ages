/**
 * 学习路线 — the learning path: Chinese history told as ten chapters in time order, for anyone who wants to learn it
 * from the start (not only for exam review). Each chapter names the big idea to take away, the handful of events to
 * know, and the map lessons that teach it. The imperial chapters (2–7) have their own short lessons (`ch<n>-<k>`,
 * lessons/ch<n>.ts), because the textbook gives each of those eras a single unit; the first chapter and the modern ones
 * use the middle-school lessons, which already run in time order. The textbook course stays in the course picker.
 */
import { PATH_LESSONS } from './lessons/index.ts';
import type { I18n, Year } from './types.ts';

export interface Chapter {
  id: string;
  /** chapter number, 1-based */
  n: number;
  title: I18n;
  /** a short name for tight places (the timeline's chapter row) */
  short: I18n;
  /** the years it covers */
  span: [Year, Year];
  /** one or two sentences: what to remember from this chapter */
  idea: I18n;
  /** the eras (dynasties) it covers, by id in ERAS */
  eras: string[];
  /** the events to know, in time order (ids in EVENTS) */
  keys: string[];
  /** the map lessons that teach it, in order (ids in LESSON) */
  lessons: string[];
  /** the middle-school lesson covering the same years (practice by textbook) */
  textbook: string[];
}

const SHORT: Record<string, I18n> = {
  'origins': { zh: '远古', en: 'Prehistory' },
  'early-states': { zh: '夏商周', en: 'Xia–Zhou' },
  'qin-han': { zh: '秦汉', en: 'Qin–Han' },
  'division': { zh: '魏晋南北朝', en: 'Division' },
  'sui-tang': { zh: '隋唐', en: 'Sui–Tang' },
  'song-yuan': { zh: '宋元', en: 'Song–Yuan' },
  'ming-qing': { zh: '明清', en: 'Ming–Qing' },
  'late-qing': { zh: '晚清', en: 'Late Qing' },
  'revolution': { zh: '民国', en: 'Republic' },
  'new-china': { zh: '新中国', en: 'PRC' },
};

/** A chapter's own path lessons (`ch<n>-1` …), else the textbook lessons. */
const own = (n: number, textbook: string[]): string[] => {
  const mine = PATH_LESSONS.filter(l => l.id.startsWith(`ch${n}-`)).map(l => l.id);
  return mine.length ? mine : textbook;
};

const C = (n: number, id: string, zh: string, en: string, span: [Year, Year], idea: I18n, eras: string[], keys: string[], textbook: string[]): Chapter =>
  ({ id, n, title: { zh, en }, short: SHORT[id], span, idea, eras, keys, lessons: own(n, textbook), textbook });

export const CHAPTERS: Chapter[] = [
  C(1, 'origins', '文明的曙光', 'The dawn of civilisation', [-1_700_000, -2070], {
    zh: '远古人类在这片土地上学会用火、种地、定居；黄河与长江流域的许多文化共同孕育了中华文明。',
    en: 'Early people here learned to use fire, farm and settle; many cultures along the Yellow and Yangtze rivers together gave rise to Chinese civilisation.',
  }, ['paleo', 'neo'], ['peking_man', 'hemudu', 'banpo', 'liangzhu', 'huangdi'], ['g7a-1']),
  C(2, 'early-states', '夏商周：早期国家', 'Xia, Shang and Zhou: the first states', [-2070, -221], {
    zh: '王朝出现，青铜与甲骨文兴起；周的分封制瓦解后，春秋战国在变法与百家争鸣中走向统一。',
    en: 'Dynasties appear, with bronze and the first writing; as Zhou’s feudal order breaks down, reforms and the Hundred Schools of Thought push the warring states towards unity.',
  }, ['xia', 'shang', 'wzhou', 'chunqiu', 'zhanguo'], ['xia_found', 'pangeng', 'fenfeng', 'confucius', 'shangyang', 'baijia'], ['g7a-2']),
  C(3, 'qin-han', '秦汉：大一统', 'Qin and Han: one empire', [-221, 220], {
    zh: '秦建立第一个统一的中央集权国家，统一文字、货币和度量衡；汉巩固大一统，并经丝绸之路连通西域。',
    en: 'Qin builds the first unified, centrally ruled state and standardises writing, coins and measures; Han makes the union last and opens the Silk Road to the west.',
  }, ['qin', 'whan', 'xin', 'ehan'], ['qin_unify', 'qin_wall', 'han_found', 'zhangqian', 'hanwudi', 'cailun'], ['g7a-3']),
  C(4, 'division', '分裂与交融', 'Division and blending', [220, 589], {
    zh: '三国、两晋、南北朝近四百年分裂，但各民族迁徙交融，江南得到开发，为再次统一打下基础。',
    en: 'Nearly four centuries of division, from the Three Kingdoms to the Northern and Southern dynasties; yet peoples mixed, the south was developed, and the ground was laid for reunion.',
  }, ['sanguo', 'wjin', 'ejin', 'nanbei'], ['sanguo', 'wjin_unify', 'dongjin', 'feishui', 'xiaowendi'], ['g7a-4']),
  C(5, 'sui-tang', '隋唐：盛世与开放', 'Sui and Tang: a golden age', [589, 907], {
    zh: '隋重新统一并开凿大运河、创立科举；唐朝国力强盛、对外开放，安史之乱后由盛转衰。',
    en: 'Sui reunites China, digs the Grand Canal and starts the civil-service exams; Tang becomes a strong, open empire until the An Lushan rebellion turns it into decline.',
  }, ['sui', 'tang'], ['sui_unify', 'grand_canal', 'keju', 'zhenguan', 'xuanzang', 'anshi'], ['g7b-1']),
  C(6, 'song-yuan', '宋元：多政权并立与再统一', 'Song to Yuan: rivals and reunion', [907, 1368], {
    zh: '宋与辽、西夏、金并立，经济重心南移，活字印刷、指南针、火药广泛应用；蒙古崛起，元朝重新统一。',
    en: 'Song shares the land with Liao, Western Xia and Jin; the economy’s centre moves south and printing, the compass and gunpowder spread; then the Mongols rise and Yuan reunites China.',
  }, ['wudai', 'bsong', 'nsong', 'liao', 'xixia', 'jin', 'yuan'], ['song_found', 'chanyuan', 'bisheng', 'jingkang', 'south_shift', 'yuan_found'], ['g7b-2']),
  C(7, 'ming-qing', '明清：疆域奠定', 'Ming and Qing: the shape of China', [1368, 1840], {
    zh: '明朝加强皇权，郑和远航；清朝统一台湾、平定西北，奠定了今天中国版图的基础，后期却闭关自守。',
    en: 'Ming strengthens the emperor’s power and sends Zheng He to sea; Qing unites Taiwan and the north-west, setting the outline of today’s China, but later closes itself off.',
  }, ['ming', 'qing'], ['ming_found', 'zhenghe', 'forbidden_city', 'zheng_chenggong', 'yaksa', 'canton'], ['g7b-3']),
  C(8, 'late-qing', '近代：危机与变革', 'Crisis and reform (1840–1912)', [1840, 1912], {
    zh: '鸦片战争后列强入侵，中国逐步沦为半殖民地半封建社会；洋务、维新到辛亥革命，人们不断探索救国之路。',
    en: 'After the Opium War, foreign powers push in and China becomes semi-colonial; from self-strengthening and reform to the 1911 Revolution, people search for a way to save the nation.',
  }, ['qing'], ['opium_war', 'taiping', 'yangwu', 'jiawu', 'wuxu', 'wuchang'], ['g8a-1', 'g8a-2', 'g8a-3']),
  C(9, 'revolution', '革命与抗战', 'Revolution and war (1912–1949)', [1912, 1949], {
    zh: '新文化运动与五四运动唤醒新思想，中国共产党诞生；中华民族坚持十四年抗战取得胜利，1949年新中国成立。',
    en: 'New ideas spread through the New Culture and May Fourth movements and the Communist Party is founded; China wins a fourteen-year war against Japan, and the People’s Republic is founded in 1949.',
  }, ['roc'], ['may4', 'cpc_found', 'long_march', 'july7', 'victory1945', 'founding'], ['g8a-4', 'g8a-5', 'g8a-6', 'g8a-7', 'g8a-8']),
  C(10, 'new-china', '新中国', 'The People’s Republic', [1949, 2025], {
    zh: '新中国巩固政权、建设工业与国防；1978年起改革开放，经济飞速发展，香港、澳门相继回归。',
    en: 'The new state secures itself and builds industry and defence; from 1978 reform and opening-up bring rapid growth, and Hong Kong and Macao return.',
  }, ['prc'], ['founding', 'five_year', 'liangdan', 'third_plenum', 'shenzhen', 'hk_return'], ['g8b-1', 'g8b-2', 'g8b-3', 'g8b-4', 'g8b-5', 'g8b-6']),
];

export const CHAPTER = new Map(CHAPTERS.map(c => [c.id, c]));

/** The chapter whose years contain `y` (the later one at a shared boundary year). */
export function chapterAt(y: Year): Chapter {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) if (y >= CHAPTERS[i].span[0]) return CHAPTERS[i];
  return CHAPTERS[0];
}

/** The chapter that teaches a lesson, if any. */
export const chapterOfLesson = (lessonId: string): Chapter | undefined => CHAPTERS.find(c => c.lessons.includes(lessonId));

const W = (zh: string, en: string): I18n => ({ zh, en });

/**
 * Why it matters: one line per event to know, saying what it changed (not what happened, which the card tells). Shown
 * under the event in its chapter and on its card when opened from the learning path.
 */
export const WHY: Record<string, I18n> = {
  peking_man: W('证明远古人类很早就在这里生活，并已会使用火。', 'Shows that early humans lived here very long ago, and already used fire.'),
  hemudu: W('长江流域种水稻，说明中华文明不只起源于黄河。', 'Rice farming on the Yangtze shows Chinese civilisation did not start only on the Yellow River.'),
  banpo: W('黄河流域种粟、建村落，人们从此定居下来。', 'Millet farming and villages on the Yellow River: people settle down for good.'),
  liangzhu: W('城墙、水坝和玉器表明，五千年前已出现早期国家。', 'Walls, dams and jades show early states existed 5,000 years ago.'),
  huangdi: W('炎黄被视为华夏共同的祖先，是民族认同的源头。', 'The Yan and Yellow Emperors are seen as shared ancestors: a root of Chinese identity.'),
  xia_found: W('“禅让”变为“世袭”，第一个王朝出现。', 'Rule passes from father to son instead of to the worthiest: the first dynasty.'),
  pangeng: W('甲骨文是已知最早的成熟汉字，商朝历史由此可信。', 'Oracle bones carry the earliest mature Chinese writing, so Shang history can be checked.'),
  fenfeng: W('分封亲族镇守四方，周朝靠宗法和礼乐维持统治。', 'Zhou rules by giving land to relatives, held together by family rank and ritual.'),
  confucius: W('儒家思想影响中国两千多年的政治与教育。', 'Confucian ideas shaped Chinese government and schooling for over 2,000 years.'),
  shangyang: W('奖励耕战、废井田，秦国由此强大，为统一打下基础。', 'Rewarding farming and fighting made Qin strong enough to unify China.'),
  baijia: W('儒、道、墨、法等学派奠定了中国思想文化的基础。', 'Confucians, Daoists, Mohists and Legalists laid the foundations of Chinese thought.'),
  qin_unify: W('第一个统一的中央集权国家；郡县制沿用两千年。', 'The first unified, centrally ruled state; its county system lasted 2,000 years.'),
  qin_wall: W('连接各国旧长城抵御匈奴，成为中华民族的象征。', 'Joined older walls against the Xiongnu, and became a symbol of China.'),
  han_found: W('汉朝延续秦制又休养生息，“汉族”“汉字”由此得名。', 'Han kept Qin’s system but eased its burdens; the Han people and Han characters are named after it.'),
  zhangqian: W('打通丝绸之路，中原与西域、欧亚各地从此相连。', 'Opened the Silk Road, linking China with Central Asia and beyond.'),
  hanwudi: W('推恩令、独尊儒术、盐铁官营，大一统真正巩固。', 'Weakening the princes, adopting Confucianism and state salt and iron made the union last.'),
  cailun: W('廉价好用的纸让文化得以广泛传播，后传遍世界。', 'Cheap, practical paper spread learning, and later spread around the world.'),
  sanguo: W('东汉瓦解后魏蜀吴三分天下，分裂时期开始。', 'After Han fell, Wei, Shu and Wu split the land: an age of division begins.'),
  wjin_unify: W('短暂的统一很快在内乱中瓦解，北方陷入混战。', 'A brief reunion soon collapsed in civil war, and the north fell into chaos.'),
  dongjin: W('北方人口南迁，江南得到大规模开发。', 'Northerners moved south and the Yangtze region was developed on a large scale.'),
  feishui: W('以少胜多，保住了南方政权，南北对峙延续。', 'A small army won, the south survived, and north and south stayed apart.'),
  xiaowendi: W('改汉服、说汉语、通婚，推动北方民族大交融。', 'Han dress, language and intermarriage: peoples of the north blended together.'),
  sui_unify: W('结束近三百年分裂，中国重新统一。', 'Ended nearly 300 years of division: China was one again.'),
  grand_canal: W('沟通南北五大水系，成为此后千年的经济命脉。', 'Linked five river systems north to south: an economic lifeline for 1,000 years.'),
  keju: W('凭考试选官，普通读书人也能做官，沿用1300年。', 'Officials chosen by exam, open to ordinary scholars, for 1,300 years.'),
  zhenguan: W('唐太宗虚心纳谏、轻徭薄赋，开创盛世。', 'Emperor Taizong listened to advice and cut taxes, opening a golden age.'),
  xuanzang: W('西行取经，带回佛经并写下《大唐西域记》。', 'Brought Buddhist texts back from India and wrote a record of the lands on the way.'),
  anshi: W('唐朝由盛转衰的转折点，藩镇割据从此开始。', 'The turning point from Tang’s height to its decline, as regional governors took power.'),
  song_found: W('重文轻武、加强中央集权，避免了武将割据。', 'Favouring civil officials over generals ended warlord rule, but weakened the army.'),
  chanyuan: W('宋辽议和，此后百余年和平，边境贸易兴盛。', 'Peace between Song and Liao brought over a century of calm and border trade.'),
  bisheng: W('活字印刷让书籍更易制作，后传到世界各地。', 'Movable type made books easier to make, and later spread worldwide.'),
  jingkang: W('北宋灭亡，宋室南迁，南宋与金对峙。', 'Northern Song fell; the court fled south and Southern Song faced Jin.'),
  south_shift: W('南方经济超过北方，“苏湖熟，天下足”。', 'The south’s economy overtook the north: when Suzhou and Huzhou harvest, all are fed.'),
  yuan_found: W('结束多政权并立，行省制度影响至今。', 'Ended the age of rival states; its province system is still used today.'),
  ming_found: W('废丞相、设锦衣卫，皇权空前加强。', 'Abolishing the chancellor gave the emperor more power than ever.'),
  zhenghe: W('七下西洋，比哥伦布早近一个世纪，展示了明初国力。', 'Seven voyages, nearly a century before Columbus, showing early Ming power.'),
  forbidden_city: W('迁都北京，紫禁城成为此后五百年的权力中心。', 'The capital moved to Beijing; the Forbidden City was the seat of power for 500 years.'),
  zheng_chenggong: W('从荷兰殖民者手中收复台湾。', 'Took Taiwan back from Dutch colonists.'),
  yaksa: W('抗击沙俄，《尼布楚条约》划定中俄东段边界。', 'Fighting Russia led to the Treaty of Nerchinsk, fixing the eastern border.'),
  canton: W('只开广州一口通商，与世界拉开差距。', 'Trade only through Guangzhou: China fell behind a changing world.'),
  opium_war: W('第一个不平等条约，中国近代史由此开端。', 'The first unequal treaty: the start of China’s modern history.'),
  taiping: W('规模最大的农民战争，沉重打击清朝统治。', 'The largest peasant war, a heavy blow to Qing rule.'),
  yangwu: W('学习西方技术“自强”，开启中国近代化。', 'Learning Western technology to self-strengthen began China’s modernisation.'),
  jiawu: W('败于日本、割让台湾，民族危机空前严重。', 'Defeat by Japan and the loss of Taiwan made the national crisis acute.'),
  wuxu: W('维新变法仅百日即失败，改良道路走不通。', 'Reform lasted only a hundred days: change from within the system failed.'),
  wuchang: W('推翻清朝，结束两千多年的君主专制。', 'Overthrew Qing and ended more than 2,000 years of imperial rule.'),
  may4: W('青年学生觉醒，新民主主义革命的开端。', 'Students awoke to politics: the beginning of the New Democratic Revolution.'),
  cpc_found: W('中国共产党成立，中国革命面貌焕然一新。', 'The founding of the Communist Party changed the course of the revolution.'),
  long_march: W('红军转危为安，保存了革命力量。', 'The Red Army escaped encirclement and kept its forces alive.'),
  july7: W('全民族抗战开始。', 'The start of China’s nationwide war of resistance against Japan.'),
  victory1945: W('近代以来第一次反侵略斗争的完全胜利。', 'China’s first complete victory against foreign invasion in modern times.'),
  founding: W('中华人民共和国成立，开启新的历史纪元。', 'The founding of the People’s Republic opened a new era.'),
  five_year: W('有计划地建设工业，打下工业化基础。', 'Planned industrial building laid the foundations of industrialisation.'),
  liangdan: W('原子弹、氢弹和人造卫星，大大增强国防实力。', 'Atomic and hydrogen bombs and a satellite greatly strengthened defence.'),
  third_plenum: W('改革开放的起点，工作重心转向经济建设。', 'The start of reform and opening-up: the focus turned to building the economy.'),
  shenzhen: W('经济特区成为对外开放的窗口。', 'Special economic zones became China’s windows to the world.'),
  hk_return: W('香港回归，“一国两制”成为现实。', 'Hong Kong returned, and “one country, two systems” became reality.'),
};
