import type { Lesson } from '../types.ts';

/** Learning-path lessons for chapter 2 (see src/shared/data/chapters.ts and docs/design/course.md). */
export const CH2: Lesson[] = [
  {
    id: 'ch2-1', book: 'g7a', unit: 2, minutes: 6,
    title: { zh: '夏与商：最早的王朝', en: 'Xia and Shang: the first dynasties' },
    blurb: { zh: '禹建立夏朝，世袭制代替禅让制；商汤灭夏，盘庚迁殷，甲骨文和青铜器见证商代文明。', en: 'Yu founds the Xia and rule becomes hereditary; Tang overthrows the Xia, Pangeng moves to Yin, and oracle bones and bronzes record Shang civilisation.' },
    steps: [
      {
        year: -2100, at: [113, 35, 30],
        title: { zh: '黄河岸边的部落联盟', en: 'Tribal alliances on the Yellow River' },
        body: { zh: '传说尧、舜、禹时期，部落联盟首领由推举产生，称为“禅让”。禹因治水有功受到拥戴，中原地区正在走向国家。', en: 'In the age of the legendary Yao, Shun and Yu, leaders of the tribal alliance were chosen and the post was handed on to the worthy. Yu, honoured for taming the floods, led the Central Plains towards statehood.' },
      },
      {
        ev: 'xia_found', polity: 'xia',
        body: { zh: '约公元前2070年禹建立夏朝，这是我国历史上第一个王朝。禹死后其子启继位，王位世袭制代替了禅让制。', en: 'Around 2070 BCE Yu founded the Xia, the first dynasty in Chinese history. When he died his son Qi took the throne, and hereditary succession replaced abdication.' },
      },
      {
        ev: 'shang_found', polity: 'shang',
        body: { zh: '夏朝末代君主桀统治残暴。约公元前1600年，商汤起兵灭夏，建立商朝。', en: 'Jie, the last Xia ruler, governed cruelly. Around 1600 BCE Tang of Shang rose against him, destroyed the Xia and founded the Shang dynasty.' },
      },
      {
        ev: 'pangeng', polity: 'shang',
        body: { zh: '商朝曾多次迁都，盘庚把都城迁到殷（今河南安阳），统治逐渐稳定。殷墟出土的甲骨文是目前已知最早的成熟文字。', en: 'The Shang moved their capital several times until Pangeng settled at Yin, today’s Anyang in Henan, and rule grew stable. The oracle-bone script found at Yinxu is the earliest known mature Chinese writing.' },
      },
      {
        ev: 'houmuwu',
        body: { zh: '商朝青铜铸造技术高超。后母戊鼎是已发现的世界上最重的青铜器之一，四羊方尊造型精美；三星堆的青铜器展现了另一支灿烂文化。', en: 'Shang bronze casting was superb. The Houmuwu ding is one of the heaviest bronzes ever found and the four-goat square zun is finely made; the Sanxingdui bronzes show another brilliant culture.' },
      },
    ],
    checks: [
      {
        q: { zh: '夏朝建立后，王位传承方式发生了什么变化？', en: 'How did the passing of the throne change once the Xia was founded?' },
        options: [{ zh: '分封制代替宗法制', en: 'Enfeoffment replaced clan law' }, { zh: '郡县制代替分封制', en: 'Counties replaced enfeoffment' }, { zh: '世袭制代替禅让制', en: 'Hereditary succession replaced abdication' }, { zh: '推举制代替世袭制', en: 'Election replaced hereditary succession' }],
        answer: 2, ev: 'xia_found',
        why: { zh: '禹死后其子启继承王位，“公天下”变为“家天下”，世袭制代替了禅让制。', en: 'After Yu died his son Qi inherited the throne, so the realm became a family possession and hereditary rule replaced abdication.' },
      },
      {
        q: { zh: '目前已知我国最早的成熟文字是？', en: 'What is the earliest known mature Chinese writing?' },
        options: [{ zh: '甲骨文', en: 'Oracle-bone script' }, { zh: '小篆', en: 'Small seal script' }, { zh: '隶书', en: 'Clerical script' }, { zh: '楷书', en: 'Regular script' }],
        answer: 0, ev: 'pangeng',
        why: { zh: '甲骨文是商朝刻在龟甲和兽骨上的文字，出土于殷墟；小篆是秦朝统一后的规范文字，隶书、楷书出现得更晚。', en: 'Oracle-bone script was carved on Shang turtle shells and bones found at Yinxu; small seal script was Qin’s standard after unification, and clerical and regular script came later.' },
      },
      { order: ['xia_found', 'shang_found', 'pangeng', 'houmuwu'] },
      { where: 'pangeng', tol: 300, why: { zh: '盘庚迁都的殷在今河南安阳，殷墟就在那里。', en: 'Pangeng’s capital Yin lies at today’s Anyang in Henan, where the ruins of Yin are found.' } },
    ],
    keys: [
      { zh: '约公元前2070年禹建立夏朝，这是我国第一个王朝；启继位后世袭制代替了禅让制。', en: 'Around 2070 BCE Yu founded the Xia, China’s first dynasty; when Qi succeeded him, hereditary rule replaced abdication.' },
      { zh: '约公元前1600年商汤灭夏建立商朝；盘庚迁殷后统治稳定，甲骨文是已知最早的成熟文字。', en: 'Around 1600 BCE Tang founded the Shang; after Pangeng moved to Yin rule grew stable, and oracle-bone script is the earliest known mature writing.' },
      { zh: '后母戊鼎、四羊方尊等青铜器反映了商朝高超的青铜铸造技术。', en: 'Bronzes such as the Houmuwu ding and the four-goat zun show the skill of Shang casters.' },
    ],
  },
  {
    id: 'ch2-2', book: 'g7a', unit: 2, minutes: 7,
    title: { zh: '周朝：分封天下与诸侯争霸', en: 'Zhou: enfeoffment and the rival lords' },
    blurb: { zh: '牧野之战后西周建立，实行分封制；平王东迁后王室衰微，春秋诸侯争霸。', en: 'After Muye the Western Zhou rules through enfeoffment; once King Ping moves east, royal power fades and the lords of the Spring and Autumn period fight for supremacy.' },
    steps: [
      {
        year: -1070, at: [110, 34.5, 35],
        title: { zh: '渭水流域的周族', en: 'The Zhou of the Wei valley' },
        body: { zh: '商朝后期，纣王统治残暴，社会矛盾尖锐。与此同时，渭水流域的周族逐渐强盛起来，准备东进伐商。', en: 'In the late Shang, King Zhou ruled harshly and discontent grew. Meanwhile the Zhou people of the Wei River valley grew strong and prepared to march east against the Shang.' },
      },
      {
        ev: 'muye', polity: 'zhou',
        body: { zh: '公元前1046年，周武王在牧野大败商军，商朝灭亡。周朝建立，定都镐京，史称西周。', en: 'In 1046 BCE King Wu of Zhou crushed the Shang army at Muye and the Shang fell. The Zhou dynasty was founded with its capital at Haojing: the Western Zhou.' },
      },
      {
        ev: 'fenfeng', polity: 'zhou',
        body: { zh: '为巩固统治，西周把土地和人民分封给王族、功臣和古代帝王的后代。诸侯要服从周王、定期朝贡、随从作战，周的统治区域因此扩大。', en: 'To secure its rule the Western Zhou granted land and people to royal kin, loyal followers and descendants of earlier rulers. The lords had to obey the king, bring tribute and fight for him, and Zhou rule spread.' },
      },
      {
        ev: 'pingwang',
        body: { zh: '公元前771年西周灭亡。次年周平王迁都洛邑，东周开始，分为春秋和战国两个时期，周王室从此日渐衰微。', en: 'The Western Zhou fell in 771 BCE. The next year King Ping moved the capital to Luoyi and the Eastern Zhou began, divided into the Spring and Autumn and Warring States periods; royal power faded from then on.' },
      },
      {
        ev: 'kuiqiu',
        body: { zh: '春秋时期诸侯争当霸主。齐桓公任用管仲改革，以“尊王攘夷”为号召，在葵丘会盟诸侯，成为春秋时期第一个霸主。', en: 'In the Spring and Autumn period the lords competed to be hegemon. Duke Huan of Qi reformed his state with Guan Zhong and, calling to “honour the king and repel the barbarians”, gathered the lords at Kuiqiu as the first hegemon.' },
      },
      {
        ev: 'chengpu',
        body: { zh: '公元前632年，晋文公在城濮之战中打败楚军，成为新的霸主。南方的楚国也不断向北扩张。', en: 'In 632 BCE Duke Wen of Jin defeated Chu at Chengpu and became the new hegemon, while Chu in the south kept pushing north.' },
      },
      {
        ev: 'goujian',
        body: { zh: '春秋后期吴越争霸。越王勾践被吴国打败后卧薪尝胆、发愤图强，最终灭掉吴国。', en: 'Late in the period Wu and Yue fought for supremacy. Beaten by Wu, King Goujian of Yue slept on brushwood and tasted gall to steel himself, rebuilt his state and finally destroyed Wu.' },
      },
    ],
    checks: [
      {
        q: { zh: '西周分封制规定，诸侯对周王的义务不包括？', en: 'Under Zhou enfeoffment, which was NOT a duty the lords owed the king?' },
        options: [{ zh: '服从周王的命令', en: 'Obeying the king’s orders' }, { zh: '定期朝贡', en: 'Bringing tribute regularly' }, { zh: '随从作战', en: 'Fighting at the king’s side' }, { zh: '由周王任免地方官员', en: 'Letting the king appoint and dismiss their officials' }],
        answer: 3, ev: 'fenfeng',
        why: { zh: '诸侯在封国内世代相传，自己管理封地；由皇帝直接任免地方官员是秦朝郡县制的特点。', en: 'Lords passed their fiefs down and ran them themselves; officials appointed and dismissed by the ruler belong to Qin’s system of commanderies and counties.' },
      },
      {
        q: { zh: '春秋时期第一个霸主是？', en: 'Who was the first hegemon of the Spring and Autumn period?' },
        options: [{ zh: '晋文公', en: 'Duke Wen of Jin' }, { zh: '齐桓公', en: 'Duke Huan of Qi' }, { zh: '楚庄王', en: 'King Zhuang of Chu' }, { zh: '越王勾践', en: 'King Goujian of Yue' }],
        answer: 1, ev: 'kuiqiu',
        why: { zh: '齐桓公任用管仲改革，打出“尊王攘夷”的旗号，成为春秋首霸；晋文公、楚庄王和越王勾践称霸都在其后。', en: 'With Guan Zhong’s reforms and the call to “honour the king and repel the barbarians”, Duke Huan of Qi became the first hegemon; Jin, Chu and Yue came later.' },
      },
      { order: ['muye', 'pingwang', 'kuiqiu', 'chengpu', 'goujian'] },
      { where: 'goujian', tol: 400, why: { zh: '吴、越都在长江下游，越国都城会稽在今浙江绍兴一带。', en: 'Wu and Yue lay on the lower Yangtze; Yue’s capital Kuaiji was near today’s Shaoxing in Zhejiang.' } },
    ],
    keys: [
      { zh: '公元前1046年牧野之战后西周建立，定都镐京；西周实行分封制，巩固了统治，扩大了统治区域。', en: 'After Muye in 1046 BCE the Western Zhou ruled from Haojing; enfeoffment secured its rule and widened its territory.' },
      { zh: '公元前770年平王东迁洛邑，东周开始；春秋时期王室衰微，诸侯争霸，齐桓公是第一个霸主。', en: 'In 770 BCE King Ping moved to Luoyi and the Eastern Zhou began; as royal power faded the lords fought for supremacy, with Duke Huan of Qi as the first hegemon.' },
    ],
  },
  {
    id: 'ch2-3', book: 'g7a', unit: 2, minutes: 8,
    title: { zh: '春秋战国：变法与百家争鸣', en: 'Spring and Autumn to Warring States: reform and the Hundred Schools' },
    blurb: { zh: '孔子创立儒家，铁犁牛耕推广；战国七雄并立，商鞅变法使秦国强大，百家争鸣，秦国逐渐走向统一。', en: 'Confucius founds his school and iron ploughs spread; seven great states compete, Shang Yang makes Qin strong, the Hundred Schools debate, and Qin moves towards unity.' },
    steps: [
      {
        year: -551, at: [114, 35, 45],
        title: { zh: '大变革的时代', en: 'An age of great change' },
        body: { zh: '春秋战国时期，生产工具进步，旧的制度逐渐瓦解，诸侯之间的兼并越来越激烈，思想文化也空前活跃。', en: 'In the Spring and Autumn and Warring States periods better tools appeared, the old order broke down, the states swallowed one another ever more fiercely, and thought flourished as never before.' },
      },
      {
        ev: 'confucius',
        body: { zh: '春秋末年，孔子创立儒家学派，主张“仁”和“为政以德”。他兴办私学，提出“有教无类”“因材施教”，言行被弟子编成《论语》。', en: 'Late in the Spring and Autumn period Confucius founded the Confucian school, teaching benevolence and rule by virtue. He opened private schools, taught all who came and suited lessons to each student; his disciples gathered his sayings in the Analects.' },
      },
      {
        ev: 'tieli',
        body: { zh: '春秋时期出现了铁农具和牛耕，战国时期逐渐推广，农业生产力大大提高，井田制逐渐瓦解。', en: 'Iron farm tools and ox ploughing appeared in the Spring and Autumn period and spread in the Warring States. Farm output rose sharply and the old well-field system broke down.' },
      },
      {
        ev: 'sanjia',
        body: { zh: '韩、赵、魏三家瓜分晋国，战国时期开始。齐、楚、燕、韩、赵、魏、秦并称“战国七雄”，兼并战争日益激烈。', en: 'Han, Zhao and Wei divided the state of Jin and the Warring States period began. Qi, Chu, Yan, Han, Zhao, Wei and Qin, the Seven Warring States, fought ever larger wars of conquest.' },
      },
      {
        ev: 'shangyang', polity: 'qin_s',
        body: { zh: '各国纷纷变法图强。商鞅在秦国变法：承认土地私有，奖励耕战，建立县制。秦国经济发展、军队战斗力增强，成为最强大的诸侯国。', en: 'Every state reformed to grow strong. Shang Yang’s reforms in Qin recognised private land, rewarded farming and fighting and set up counties; Qin’s economy and army grew until it was the strongest state.' },
      },
      {
        ev: 'baijia',
        body: { zh: '战国时期，儒家的孟子、道家的庄子、墨家的墨子、法家的韩非等著书立说、相互辩论，形成“百家争鸣”的局面。', en: 'In the Warring States period thinkers such as the Confucian Mencius, the Daoist Zhuangzi, Mozi of the Mohists and the Legalist Han Fei wrote and argued with one another: the Hundred Schools of Thought.' },
      },
      {
        ev: 'changping',
        body: { zh: '公元前260年，秦军在长平之战中大败赵军。此后东方六国再也无力单独抵抗秦国，统一的趋势越来越明显。', en: 'In 260 BCE Qin crushed Zhao at Changping. After that no eastern state could stand against Qin alone, and unification drew nearer.' },
      },
      {
        ev: 'dujiangyan',
        body: { zh: '战国时期，秦国蜀郡守李冰主持修建都江堰，既能分洪又能灌溉，使成都平原成为“天府之国”，至今仍发挥作用。', en: 'Li Bing, Qin’s governor of Shu, built the Dujiangyan works to control floods and irrigate fields. The Chengdu Plain became a “land of abundance”, and the system still works today.' },
      },
    ],
    checks: [
      {
        q: { zh: '商鞅变法的内容不包括？', en: 'Which was NOT part of Shang Yang’s reforms?' },
        options: [{ zh: '实行分封制', en: 'Granting fiefs to royal kin' }, { zh: '国家承认土地私有', en: 'Recognising private ownership of land' }, { zh: '奖励耕战', en: 'Rewarding farming and fighting' }, { zh: '建立县制', en: 'Setting up counties' }],
        answer: 0, ev: 'shangyang',
        why: { zh: '商鞅变法承认土地私有、奖励耕战、建立县制，打击了旧贵族；分封制是西周的制度。', en: 'Shang Yang recognised private land, rewarded farming and fighting and set up counties, weakening the old nobility; enfeoffment was the Western Zhou system.' },
      },
      {
        q: { zh: '提出“有教无类”、兴办私学的思想家是？', en: 'Which thinker opened private schools and taught “all without distinction”?' },
        options: [{ zh: '老子', en: 'Laozi' }, { zh: '墨子', en: 'Mozi' }, { zh: '孔子', en: 'Confucius' }, { zh: '韩非', en: 'Han Fei' }],
        answer: 2, ev: 'confucius',
        why: { zh: '孔子创办私学，主张“有教无类”“因材施教”；老子是道家创始人，墨子主张“兼爱”“非攻”，韩非是法家代表。', en: 'Confucius ran private schools and taught everyone, suiting lessons to each student; Laozi founded Daoism, Mozi preached universal love, and Han Fei was a Legalist.' },
      },
      {
        q: { zh: '主张“兼爱”“非攻”的学派是？', en: 'Which school taught universal love and opposed wars of aggression?' },
        options: [{ zh: '儒家', en: 'Confucians' }, { zh: '道家', en: 'Daoists' }, { zh: '法家', en: 'Legalists' }, { zh: '墨家', en: 'Mohists' }],
        answer: 3, ev: 'baijia',
        why: { zh: '墨家创始人墨子主张“兼爱”“非攻”；儒家主张“仁”，道家主张“无为”，法家主张以法治国。', en: 'Mozi, founder of the Mohists, preached universal love and no aggression; Confucians stressed benevolence, Daoists non-action and Legalists rule by law.' },
      },
      { order: ['confucius', 'sanjia', 'shangyang', 'changping'] },
      { where: 'dujiangyan', tol: 300, why: { zh: '都江堰在今四川成都西北的岷江上。', en: 'Dujiangyan lies on the Min River north-west of Chengdu in Sichuan.' } },
    ],
    keys: [
      { zh: '春秋时期出现铁农具和牛耕，战国时期推广，推动了社会变革。', en: 'Iron tools and ox ploughs appeared in the Spring and Autumn period and spread in the Warring States, driving social change.' },
      { zh: '商鞅变法承认土地私有、奖励耕战、建立县制，使秦国成为战国时期最强大的诸侯国。', en: 'Shang Yang recognised private land, rewarded farming and fighting and set up counties, making Qin the strongest Warring State.' },
      { zh: '孔子创立儒家学派，主张“仁”；战国时期儒、道、墨、法等学派形成“百家争鸣”的局面。', en: 'Confucius founded Confucianism and taught benevolence; in the Warring States, Confucians, Daoists, Mohists and Legalists formed the Hundred Schools of Thought.' },
    ],
  },
];
