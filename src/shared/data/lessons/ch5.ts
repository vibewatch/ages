import type { Lesson } from '../types.ts';

/** Learning-path lessons for chapter 5 (see src/shared/data/chapters.ts and docs/design/course.md). */
export const CH5: Lesson[] = [
  {
    id: 'ch5-1', book: 'g7b', unit: 1, minutes: 7,
    title: { zh: '隋朝的统一与大运河', en: 'The Sui: reunion and the Grand Canal' },
    blurb: { zh: '隋朝结束近三百年的分裂，开通大运河、创立科举制，却因隋炀帝的暴政而迅速灭亡。', en: 'The Sui ended nearly three centuries of division, dug the Grand Canal and created the examinations, but fell fast under Emperor Yang’s tyranny.' },
    steps: [
      {
        year: 581, at: [110, 34, 50],
        title: { zh: '杨坚建隋', en: 'Yang Jian founds the Sui' },
        body: { zh: '北周统一北方后，外戚杨坚掌握了朝政。581年他夺取北周政权，建立隋朝，定都长安，他就是隋文帝。', en: 'After the Northern Zhou reunited the north, the empress’s father Yang Jian took control at court. In 581 he seized the throne and founded the Sui with its capital at Chang’an; he is Emperor Wen of Sui.' },
        src: { zh: '统编版七年级下册第一单元 · 《隋书·高祖纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Suishu, Annals of Gaozu' },
      },
      {
        ev: 'sui_unify', polity: 'sui',
        body: { zh: '589年隋军渡江南下，攻破建康，灭掉陈朝，结束了西晋末年以来近三百年的分裂局面。隋文帝勤于政务，社会经济迅速发展。', en: 'In 589 Sui armies crossed the Yangtze, took Jiankang and ended the Chen, closing nearly three hundred years of division since the late Western Jin. Emperor Wen worked hard at government and the economy grew quickly.' },
        src: { zh: '统编版七年级下册第一单元 · 《隋书·高祖纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Suishu, Annals of Gaozu' },
      },
      {
        ev: 'keju',
        body: { zh: '隋文帝开始用分科考试的办法选拔官员，隋炀帝设置进士科，标志着科举制正式诞生。从此读书人可以凭才学做官，打破了士族对官职的垄断。', en: 'Emperor Wen began choosing officials through examinations in several subjects, and Emperor Yang’s jinshi degree marks the birth of the imperial examinations. Scholars could now win office by learning, breaking the great clans’ monopoly.' },
        src: { zh: '统编版七年级下册第一单元 · 《隋书》 · 《通典·选举》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Suishu · Tongdian, Selection of Officials' },
      },
      {
        ev: 'grand_canal',
        body: { zh: '隋炀帝时开通大运河，以洛阳为中心，北达涿郡，南至余杭，分为永济渠、通济渠、邗沟、江南河四段，连接五大水系，是古代世界最长的运河。', en: 'Emperor Yang opened the Grand Canal. Centred on Luoyang, it ran from Zhuojun in the north to Yuhang in the south in four sections, the Yongji, Tongji, Hangou and Jiangnan canals, linking five river systems: the longest canal of the ancient world.' },
        src: { zh: '统编版七年级下册第一单元 · 《隋书·炀帝纪》 · 《资治通鉴》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Suishu, Annals of Yangdi · Zizhi Tongjian' },
      },
      {
        ev: 'zhaozhou',
        body: { zh: '隋朝工匠李春主持设计建造了赵州桥。它是世界上现存最古老的石拱桥，大拱两肩各有两个小拱，既减轻桥身重量，又便于泄洪。', en: 'The Sui craftsman Li Chun designed and built the Zhaozhou Bridge, the oldest surviving stone arch bridge in the world. Two small arches on each shoulder of the main arch lighten the bridge and let floodwater through.' },
        src: { zh: '统编版七年级下册第一单元 · 张嘉贞《安济桥铭》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Zhang Jiazhen, Inscription on the Anji Bridge' },
      },
      {
        ev: 'm-sui-612',
        body: { zh: '隋炀帝营建东都、开凿运河、三征高句丽，频繁征发兵役和徭役，百姓负担沉重，各地农民纷纷起义。', en: 'Emperor Yang built an eastern capital, dug canals and launched three campaigns against Goguryeo. Endless call-ups of soldiers and labourers crushed the people, and peasant risings broke out everywhere.' },
        src: { zh: '《隋书·炀帝纪》 · 《资治通鉴》', en: 'Suishu, Annals of Yangdi · Zizhi Tongjian' },
      },
      {
        ev: 'm-sui-618',
        body: { zh: '618年隋炀帝在江都被部下杀死，隋朝灭亡。隋朝的速亡成为后来唐朝统治者的深刻教训。', en: 'In 618 Emperor Yang was killed by his own officers at Jiangdu and the Sui came to an end. Its swift fall became a hard lesson for the Tang rulers who followed.' },
        src: { zh: '《隋书·炀帝纪》 · 《资治通鉴》', en: 'Suishu, Annals of Yangdi · Zizhi Tongjian' },
      },
    ],
    checks: [
      {
        q: { zh: '标志着科举制正式诞生的是？', en: 'What marks the birth of the imperial examinations?' },
        options: [{ zh: '隋炀帝设置进士科', en: 'Emperor Yang created the jinshi degree' }, { zh: '隋文帝建立隋朝', en: 'Emperor Wen founded the Sui' }, { zh: '武则天创立殿试', en: 'Wu Zetian created the palace exam' }, { zh: '唐太宗扩充国学', en: 'Emperor Taizong expanded the state academy' }],
        answer: 0, ev: 'keju',
        why: { zh: '隋文帝开始分科考试，隋炀帝设进士科，科举制正式诞生；殿试和扩充国学是唐朝对科举制的完善。', en: 'Emperor Wen began exams by subject and Emperor Yang’s jinshi degree created the system; the palace exam and the larger academy were Tang refinements.' },
      },
      {
        q: { zh: '隋朝迅速灭亡的主要原因是？', en: 'Why did the Sui fall so quickly?' },
        options: [{ zh: '北方民族南下进攻', en: 'Northern peoples invaded' }, { zh: '藩镇割据', en: 'Regional governors became warlords' }, { zh: '隋炀帝的暴政', en: 'Emperor Yang’s tyranny' }, { zh: '外戚和宦官专权', en: 'Consort clans and eunuchs seized power' }],
        answer: 2, ev: 'm-sui-618',
        why: { zh: '隋炀帝滥用民力、征战不止，激起农民起义，隋朝因此灭亡；藩镇割据是唐朝后期的问题。', en: 'Emperor Yang overworked the people and waged endless wars, provoking the risings that brought the Sui down; warlord governors were a late-Tang problem.' },
      },
      { order: ['sui_unify', 'grand_canal', 'm-sui-612', 'm-sui-618'] },
      { where: 'zhaozhou', tol: 300 },
    ],
    keys: [
      { zh: '581年杨坚建立隋朝，589年隋灭陈，结束了近三百年的分裂局面。', en: 'Yang Jian founded the Sui in 581 and conquered the Chen in 589, ending nearly three hundred years of division.' },
      { zh: '隋炀帝开通大运河，以洛阳为中心，北达涿郡，南至余杭，加强了南北经济文化交流。', en: 'Emperor Yang’s Grand Canal, centred on Luoyang, ran from Zhuojun to Yuhang and joined the economies and cultures of north and south.' },
      { zh: '隋文帝分科考试，隋炀帝设进士科，科举制正式诞生；隋炀帝暴政导致隋朝在618年灭亡。', en: 'Emperor Wen’s subject exams and Emperor Yang’s jinshi degree created the examinations; Emperor Yang’s tyranny brought the Sui down in 618.' },
    ],
  },
  {
    id: 'ch5-2', book: 'g7b', unit: 1, minutes: 7,
    title: { zh: '从贞观之治到开元盛世', en: 'From Zhenguan to Kaiyuan' },
    blurb: { zh: '唐太宗吸取隋亡教训开创“贞观之治”，武则天承上启下，唐玄宗前期出现“开元盛世”。', en: 'Taizong learned from the Sui and opened the Reign of Zhenguan; Wu Zetian carried it on, and early Xuanzong brought the Kaiyuan golden age.' },
    steps: [
      {
        year: 618, at: [108.9, 34.3, 40],
        title: { zh: '唐朝建立', en: 'The Tang is founded' },
        body: { zh: '隋末天下大乱，太原留守李渊起兵，攻入长安。618年李渊称帝，建立唐朝，定都长安，此后逐步统一全国。', en: 'As the Sui collapsed, Li Yuan, garrison commander at Taiyuan, rose and took Chang’an. In 618 he declared himself emperor of the Tang with Chang’an as capital, and went on to reunite the country.' },
        src: { zh: '统编版七年级下册第一单元 · 《旧唐书·高祖本纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Old Book of Tang, Annals of Gaozu' },
      },
      {
        ev: 'zhenguan', polity: 'tang',
        body: { zh: '唐太宗认识到“水能载舟，亦能覆舟”，虚心听取魏征等大臣的意见，轻徭薄赋，完善科举制。政治清明，经济发展，史称“贞观之治”。', en: 'Emperor Taizong saw that the people, like water, can carry the boat or overturn it. He heeded ministers such as Wei Zheng, lightened taxes and labour and improved the exams. Government was clean and the economy grew: the Reign of Zhenguan.' },
        src: { zh: '统编版七年级下册第一单元 · 吴兢《贞观政要》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Wu Jing, Zhenguan Zhengyao' },
      },
      {
        ev: 'm-tang-630',
        body: { zh: '630年唐朝大将李靖打败东突厥，北方和西北各族首领尊称唐太宗为“天可汗”。', en: 'In 630 the Tang general Li Jing defeated the Eastern Turks, and the chiefs of the northern and north-western peoples hailed Emperor Taizong as the Heavenly Khan.' },
        src: { zh: '《旧唐书·太宗本纪》 · 《资治通鉴》', en: 'Old Book of Tang, Annals of Taizong · Zizhi Tongjian' },
      },
      {
        ev: 'wuzetian',
        body: { zh: '690年武则天称帝，改国号为周，是我国历史上唯一的女皇帝。她重视人才选拔，创立殿试和武举，奖励农桑，被称为“政启开元，治宏贞观”。', en: 'In 690 Wu Zetian took the throne and renamed the dynasty Zhou, the only woman emperor in Chinese history. She cared about choosing talent, created the palace exam and the military exam and encouraged farming, carrying on the work of Zhenguan and preparing that of Kaiyuan.' },
        src: { zh: '统编版七年级下册第一单元 · 《旧唐书·则天皇后本纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Old Book of Tang, Annals of Empress Wu' },
      },
      {
        ev: 'm-tang-702',
        body: { zh: '唐朝加强对西域的管理。702年武则天在庭州设置北庭都护府，管辖天山以北的广大地区。', en: 'The Tang tightened its hold on the Western Regions. In 702 Wu Zetian set up the Beiting Protectorate at Tingzhou to govern the lands north of the Tianshan.' },
        src: { zh: '《新唐书·地理志》', en: 'New Book of Tang, Treatise on Geography' },
      },
      {
        ev: 'kaiyuan', polity: 'tang',
        body: { zh: '唐玄宗前期励精图治，任用贤能，整顿吏治，发展经济，唐朝进入全盛时期，史称“开元盛世”。农民改进了曲辕犁和筒车，长安成为国际性大都市。', en: 'In his early years Emperor Xuanzong ruled diligently, appointed able men, cleaned up officialdom and built up the economy: the Tang reached its height, the Kaiyuan golden age. Farmers used the curved-shaft plough and the bamboo water wheel, and Chang’an became a cosmopolitan city.' },
        src: { zh: '统编版七年级下册第一单元 · 《新唐书·玄宗本纪》 · 杜甫《忆昔》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · New Book of Tang, Annals of Xuanzong · Du Fu, Yi Xi' },
      },
    ],
    checks: [
      {
        q: { zh: '“水能载舟，亦能覆舟”反映了哪位皇帝的治国思想？', en: '“Water can carry a boat, and can also overturn it” sums up which emperor’s outlook on ruling?' },
        options: [{ zh: '隋炀帝', en: 'Emperor Yang of Sui' }, { zh: '唐太宗', en: 'Emperor Taizong of Tang' }, { zh: '武则天', en: 'Wu Zetian' }, { zh: '唐玄宗', en: 'Emperor Xuanzong of Tang' }],
        answer: 1, ev: 'zhenguan',
        why: { zh: '唐太宗吸取隋亡教训，把百姓比作水、君主比作舟，因而重视民生、虚心纳谏，开创了“贞观之治”。', en: 'Taizong, learning from the Sui’s fall, likened the people to water and the ruler to a boat, so he cared for the people and heeded advice, opening the Reign of Zhenguan.' },
      },
      {
        q: { zh: '我国历史上唯一的女皇帝是？', en: 'Who was the only woman emperor in Chinese history?' },
        options: [{ zh: '文成公主', en: 'Princess Wencheng' }, { zh: '冯太后', en: 'Empress Dowager Feng' }, { zh: '杨贵妃', en: 'Consort Yang' }, { zh: '武则天', en: 'Wu Zetian' }],
        answer: 3, ev: 'wuzetian',
        why: { zh: '690年武则天称帝，改国号为周；冯太后是北魏临朝听政的太后，并未称帝。', en: 'Wu Zetian took the throne in 690 as emperor of Zhou; Empress Dowager Feng governed for the Northern Wei but never became emperor.' },
      },
      { order: ['zhenguan', 'm-tang-630', 'wuzetian', 'kaiyuan'] },
      { where: 'm-tang-702', tol: 600 },
    ],
    keys: [
      { zh: '618年李渊建立唐朝，定都长安；唐太宗虚心纳谏、轻徭薄赋、完善科举制，出现“贞观之治”。', en: 'Li Yuan founded the Tang at Chang’an in 618; Taizong heeded advice, lightened taxes and improved the exams: the Reign of Zhenguan.' },
      { zh: '武则天是我国历史上唯一的女皇帝，“政启开元，治宏贞观”，起到承上启下的作用。', en: 'Wu Zetian, China’s only woman emperor, linked the Zhenguan and Kaiyuan eras.' },
      { zh: '唐玄宗前期励精图治，唐朝进入全盛时期，史称“开元盛世”。', en: 'Early in Xuanzong’s reign the Tang reached its height: the Kaiyuan golden age.' },
    ],
  },
  {
    id: 'ch5-3', book: 'g7b', unit: 1, minutes: 8,
    title: { zh: '开放的大唐', en: 'An open Tang' },
    blurb: { zh: '玄奘西行、遣唐使来华、文成公主入藏、鉴真东渡，唐诗与艺术灿烂辉煌，展现了开放包容的盛唐气象。', en: 'Xuanzang’s journey, Japan’s envoys, Princess Wencheng, Jianzhen’s voyage and the art of Tang poetry show an open, confident age.' },
    steps: [
      {
        year: 627, at: [108.9, 34.3, 80],
        title: { zh: '国际性大都市长安', en: 'Chang’an, a city of the world' },
        body: { zh: '唐朝国力强盛，对外交往频繁，陆上和海上交通发达。都城长安规模宏大，各国使节、商人、留学生和僧人汇聚于此。', en: 'The strong Tang traded and talked with many lands by road and by sea. Its vast capital Chang’an drew envoys, merchants, students and monks from many countries.' },
        src: { zh: '统编版七年级下册第一单元', en: 'PEP textbook, Grade 7 vol. 2, unit 1' },
      },
      {
        ev: 'xuanzang',
        body: { zh: '唐太宗贞观初年，高僧玄奘从长安出发，历经艰险到达天竺，在那烂陀寺学习佛经。十几年后他带回大量佛经，还写下《大唐西域记》。', en: 'Early in Taizong’s Zhenguan reign the monk Xuanzang set out from Chang’an and, through many hardships, reached India, where he studied at the Nalanda monastery. More than ten years later he came home with many sutras and wrote the Great Tang Records on the Western Regions.' },
        src: { zh: '统编版七年级下册第一单元 · 《大唐西域记》《大慈恩寺三藏法师传》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Datang Xiyuji · Life of the Tripitaka Master of Daci’en' },
      },
      {
        ev: 'kentoshi',
        body: { zh: '日本先后十几次派遣唐使来华，学习唐朝的制度和文化。日本的大化改新以唐朝制度为蓝本，都城平城京也仿照长安城布局。', en: 'Japan sent envoys to the Tang more than ten times to study its government and culture. Japan’s Taika Reform took Tang institutions as its model, and its capital Heijo-kyo was laid out like Chang’an.' },
        src: { zh: '统编版七年级下册第一单元 · 《旧唐书·日本传》 · 《日本书纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Old Book of Tang, Account of Japan · Nihon Shoki' },
      },
      {
        ev: 'wencheng', polity: 'tubo',
        body: { zh: '7世纪前期松赞干布统一青藏高原，建立吐蕃政权。641年唐太宗把文成公主嫁给松赞干布，她带去了中原的生产技术和书籍，促进了唐蕃友好。', en: 'Early in the 7th century Songtsen Gampo united the Tibetan plateau and founded the Tubo kingdom. In 641 Taizong married Princess Wencheng to him; she took Central Plains crafts and books with her, furthering Tang–Tibetan friendship.' },
        src: { zh: '统编版七年级下册第一单元 · 《旧唐书·吐蕃传》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Old Book of Tang, Account of Tubo' },
      },
      {
        ev: 'tang_poetry',
        body: { zh: '唐朝是诗歌的黄金时代，“诗仙”李白、“诗圣”杜甫和白居易留下了大量名篇；颜真卿、柳公权的书法和“画圣”吴道子的绘画也名扬后世。', en: 'The Tang was the golden age of poetry: Li Bai, the Immortal of Poetry, Du Fu, the Sage of Poetry, and Bai Juyi left many famous poems. The calligraphy of Yan Zhenqing and Liu Gongquan and the painting of Wu Daozi, the Sage of Painting, are still admired.' },
        src: { zh: '统编版七年级下册第一单元 · 《全唐诗》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Complete Tang Poems (Quan Tangshi)' },
      },
      {
        ev: 'jianzhen',
        body: { zh: '唐朝高僧鉴真应邀东渡日本，前五次都失败了，双目失明仍不放弃，753年第六次终于成功。他在日本传播佛教和唐文化，设计建造了唐招提寺。', en: 'Invited to Japan, the Tang monk Jianzhen failed five times and lost his sight, yet kept trying and arrived on his sixth attempt in 753. He spread Buddhism and Tang culture there and designed the Toshodai-ji temple.' },
        src: { zh: '统编版七年级下册第一单元 · 真人元开《唐大和上东征传》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Omi no Mifune, Voyage East of the Tang Master' },
      },
    ],
    checks: [
      {
        q: { zh: '玄奘根据西行见闻写成的著作是？', en: 'Which book did Xuanzang write about his journey?' },
        options: [{ zh: '《齐民要术》', en: 'Qimin Yaoshu' }, { zh: '《水经注》', en: 'Commentary on the Water Classic' }, { zh: '《大唐西域记》', en: 'Great Tang Records on the Western Regions' }, { zh: '《金刚经》', en: 'The Diamond Sutra' }],
        answer: 2, ev: 'xuanzang',
        why: { zh: '玄奘从天竺取经归来后撰写了《大唐西域记》，记述了沿途各地的山川、物产和风俗。', en: 'Back from India, Xuanzang wrote the Great Tang Records on the Western Regions, describing the lands, products and customs along his route.' },
      },
      {
        q: { zh: '唐朝时第六次东渡才成功到达日本的高僧是？', en: 'Which Tang monk reached Japan only on his sixth attempt?' },
        options: [{ zh: '玄奘', en: 'Xuanzang' }, { zh: '鉴真', en: 'Jianzhen' }, { zh: '法显', en: 'Faxian' }, { zh: '慧能', en: 'Huineng' }],
        answer: 1, ev: 'jianzhen',
        why: { zh: '鉴真前五次东渡失败、双目失明，753年第六次东渡成功；玄奘是西行天竺取经的高僧。', en: 'Jianzhen failed five times and went blind before arriving in 753; Xuanzang travelled west to India, not east.' },
      },
      { order: ['xuanzang', 'wencheng', 'tang_poetry', 'jianzhen'] },
      { where: 'kentoshi', tol: 400 },
    ],
    keys: [
      { zh: '唐朝对外交往频繁，长安是国际性大都市；日本派遣唐使来华，大化改新以唐朝制度为蓝本。', en: 'The Tang was open to the world and Chang’an was a cosmopolitan city; Japan sent envoys and modelled its Taika Reform on Tang institutions.' },
      { zh: '玄奘西行天竺取经并著《大唐西域记》；鉴真东渡日本，传播唐文化。', en: 'Xuanzang went to India for scriptures and wrote the Great Tang Records on the Western Regions; Jianzhen sailed to Japan and spread Tang culture.' },
      { zh: '641年文成公主入藏，促进了唐蕃友好；李白、杜甫代表了唐诗的最高成就。', en: 'Princess Wencheng went to Tibet in 641, furthering Tang–Tibetan friendship; Li Bai and Du Fu are the peaks of Tang poetry.' },
    ],
  },
  {
    id: 'ch5-4', book: 'g7b', unit: 1, minutes: 7,
    title: { zh: '安史之乱与唐朝的衰亡', en: 'The An Lushan rebellion and the end of the Tang' },
    blurb: { zh: '唐玄宗后期政治腐败，安史之乱使唐朝由盛转衰；此后藩镇割据，黄巢起义后唐朝灭亡。', en: 'Late in Xuanzong’s reign government decayed; the An Lushan rebellion turned the Tang towards decline, warlords took over, and after Huang Chao the dynasty fell.' },
    steps: [
      {
        year: 745, at: [112, 37, 50],
        title: { zh: '盛世背后的危机', en: 'Trouble beneath the golden age' },
        body: { zh: '唐玄宗后期沉迷享乐，任用李林甫、杨国忠等人，政治日益腐败。边疆节度使手握重兵，势力越来越大。', en: 'Late in his reign Xuanzong gave himself to pleasure and trusted ministers such as Li Linfu and Yang Guozhong, and government decayed. Frontier military governors commanded large armies and grew ever more powerful.' },
        src: { zh: '统编版七年级下册第一单元 · 《旧唐书·玄宗本纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Old Book of Tang, Annals of Xuanzong' },
      },
      {
        ev: 'anshi',
        body: { zh: '755年节度使安禄山和史思明从范阳起兵叛乱，先后攻占洛阳、长安，史称“安史之乱”。', en: 'In 755 the military governor An Lushan and his ally Shi Siming rebelled at Fanyang and captured Luoyang and then Chang’an: the An–Shi Rebellion.' },
        src: { zh: '统编版七年级下册第一单元 · 《旧唐书·安禄山传》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Old Book of Tang, Biography of An Lushan' },
      },
      {
        ev: 'm-tang-756',
        body: { zh: '756年唐玄宗逃往四川，途经马嵬驿时，随行将士杀死杨国忠，杨贵妃也被赐死。太子在灵武即位，组织平叛。', en: 'In 756 Xuanzong fled towards Sichuan. At Mawei Station his escort killed Yang Guozhong, and Consort Yang was ordered to die. The crown prince took the throne at Lingwu and organised the fight back.' },
        src: { zh: '《旧唐书·后妃传》 · 《资治通鉴》', en: 'Old Book of Tang, Consorts · Zizhi Tongjian' },
      },
      {
        ev: 'm-tang-763',
        body: { zh: '安史之乱历时八年，到763年才被平定。它是唐朝由盛转衰的转折点，此后藩镇割据的局面逐渐形成。', en: 'The rebellion lasted eight years and was put down only in 763. It was the turning point from prosperity to decline, and regional governors went on to rule their provinces as warlords.' },
        src: { zh: '《资治通鉴·唐纪》', en: 'Zizhi Tongjian, Tang annals' },
      },
      {
        ev: 'diamond_sutra',
        body: { zh: '唐朝发明了雕版印刷术。敦煌发现的868年印制的《金刚经》，是世界上现存最早的标有确切日期的雕版印刷品。', en: 'The Tang invented woodblock printing. The Diamond Sutra found at Dunhuang, printed in 868, is the world’s oldest surviving printed book with an exact date.' },
        src: { zh: '统编版七年级下册第一单元 · 敦煌藏经洞《金刚经》（大英图书馆藏）', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Dunhuang Diamond Sutra, British Library' },
      },
      {
        ev: 'huangchao',
        body: { zh: '唐朝后期藩镇割据、宦官专权，百姓生活困苦。875年爆发黄巢起义，起义军一度攻入长安，沉重打击了唐朝的统治。', en: 'Late Tang China suffered warlord governors and eunuch rule, and the people lived in hardship. The Huang Chao rising broke out in 875; the rebels even took Chang’an, dealing Tang rule a heavy blow.' },
        src: { zh: '统编版七年级下册第一单元 · 《旧唐书·黄巢传》', en: 'PEP textbook, Grade 7 vol. 2, unit 1 · Old Book of Tang, Biography of Huang Chao' },
      },
      {
        ev: 'tang_fall',
        body: { zh: '907年节度使朱温灭唐，建立后梁。此后中原相继出现五个朝代，南方等地先后存在十个政权，史称“五代十国”。', en: 'In 907 the military governor Zhu Wen ended the Tang and founded the Later Liang. Five dynasties followed one another in the north while ten states rose elsewhere: the Five Dynasties and Ten Kingdoms.' },
        src: { zh: '统编版七年级下册第二单元 · 《旧五代史·梁太祖纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Old History of the Five Dynasties, Liang Taizu' },
      },
    ],
    checks: [
      {
        q: { zh: '安史之乱最主要的影响是？', en: 'What was the main effect of the An Lushan rebellion?' },
        options: [{ zh: '唐朝由盛转衰', en: 'The Tang turned from prosperity to decline' }, { zh: '唐朝随即灭亡', en: 'The Tang fell at once' }, { zh: '结束了藩镇割据', en: 'It ended rule by warlord governors' }, { zh: '开创了开元盛世', en: 'It began the Kaiyuan golden age' }],
        answer: 0, ev: 'anshi',
        why: { zh: '安史之乱是唐朝由盛转衰的转折点，此后藩镇割据出现；唐朝直到907年才灭亡。', en: 'The rebellion was the turning point towards decline and left warlord governors in power; the Tang itself lasted until 907.' },
      },
      {
        q: { zh: '世界上现存最早的标有确切日期的雕版印刷品是？', en: 'What is the world’s oldest surviving dated printed book?' },
        options: [{ zh: '《兰亭序》', en: 'The Orchid Pavilion Preface' }, { zh: '《大唐西域记》', en: 'Great Tang Records on the Western Regions' }, { zh: '唐朝印制的《金刚经》', en: 'The Tang printed Diamond Sutra' }, { zh: '《齐民要术》', en: 'Qimin Yaoshu' }],
        answer: 2, ev: 'diamond_sutra',
        why: { zh: '敦煌发现的868年印制的《金刚经》是现存最早的标有确切日期的雕版印刷品，证明唐朝已有雕版印刷术。', en: 'The Diamond Sutra printed in 868 and found at Dunhuang is the oldest dated printed book, proof that the Tang had woodblock printing.' },
      },
      { order: ['anshi', 'm-tang-763', 'huangchao', 'tang_fall'] },
      { where: 'anshi', tol: 400 },
    ],
    keys: [
      { zh: '唐玄宗后期政治腐败，节度使势力膨胀；755年安禄山、史思明发动叛乱，763年才被平定。', en: 'Late in Xuanzong’s reign government decayed and frontier governors grew strong; An Lushan and Shi Siming rebelled in 755, and the revolt ended only in 763.' },
      { zh: '安史之乱是唐朝由盛转衰的转折点，此后出现藩镇割据。', en: 'The An Lushan rebellion turned the Tang from prosperity to decline and led to rule by warlord governors.' },
      { zh: '875年黄巢起义沉重打击了唐朝统治，907年朱温灭唐，进入五代十国时期。', en: 'The Huang Chao rising from 875 dealt Tang rule a heavy blow; Zhu Wen ended the Tang in 907 and the Five Dynasties and Ten Kingdoms began.' },
    ],
  },
];
