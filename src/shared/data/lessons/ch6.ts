import type { Lesson } from '../types.ts';

/** Learning-path lessons for chapter 6 (see src/shared/data/chapters.ts and docs/design/course.md). */
export const CH6: Lesson[] = [
  {
    id: 'ch6-1', book: 'g7b', unit: 2, minutes: 7,
    title: { zh: '五代十国与北宋、辽、西夏并立', en: 'Five Dynasties, then Song beside Liao and Xia' },
    blurb: { zh: '唐亡后中原五代更替，契丹建辽、取得燕云十六州；赵匡胤建立北宋，与辽订立澶渊之盟，党项建立西夏。', en: 'After the Tang, five dynasties follow in the north and the Khitan Liao gains the Sixteen Prefectures; Zhao Kuangyin founds the Song, makes peace with the Liao at Chanyuan, and the Tangut found Western Xia.' },
    steps: [
      {
        year: 907, at: [113, 36, 60],
        title: { zh: '唐亡之后', en: 'After the Tang' },
        body: { zh: '907年朱温灭唐，建立后梁。此后中原依次出现梁、唐、晋、汉、周五个短命王朝，南方等地先后存在十个割据政权，合称“五代十国”。', en: 'In 907 Zhu Wen ended the Tang and founded the Later Liang. Five short-lived dynasties then followed one another in the north while ten regional states held the south: the Five Dynasties and Ten Kingdoms.' },
        src: { zh: '统编版七年级下册第二单元 · 《新五代史》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · New History of the Five Dynasties' },
      },
      {
        ev: 'liao_found', polity: 'liao',
        body: { zh: '北方草原上的契丹族逐渐强大。916年首领耶律阿保机建立契丹国，后改称辽，定都上京。辽“因俗而治”，用不同制度管理契丹人和汉人。', en: 'On the northern steppe the Khitan grew strong. In 916 their leader Yelü Abaoji founded a Khitan state, later called Liao, with its capital at Shangjing. The Liao ruled each people by its own customs, with separate offices for Khitan and Han.' },
        src: { zh: '统编版七年级下册第二单元 · 《辽史·太祖纪》《百官志》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Liaoshi, Annals of Taizu · Treatise on Officials' },
      },
      {
        ev: 'yanyun_sixteen',
        body: { zh: '936年石敬瑭借契丹兵建立后晋，把燕云十六州割给契丹。中原王朝从此失去北方的险要屏障，这成为后来宋辽对峙的重要背景。', en: 'In 936 Shi Jingtang founded the Later Jin with Khitan help and handed the Sixteen Prefectures of Yanyun to the Khitan. The northern dynasties lost their mountain barrier, which shaped the later standoff between Song and Liao.' },
        src: { zh: '统编版七年级下册第二单元 · 《旧五代史·晋高祖纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Old History of the Five Dynasties, Jin Gaozu' },
      },
      {
        ev: 'song_found',
        body: { zh: '960年后周大将赵匡胤发动陈桥兵变，建立宋朝，定都东京开封，史称北宋。宋太祖“杯酒释兵权”，加强中央集权，此后重文轻武。', en: 'In 960 the Later Zhou general Zhao Kuangyin seized power in the Chenqiao mutiny and founded the Song, with its capital at Kaifeng: the Northern Song. He talked his generals out of their commands over wine, centralised power and favoured civil officials over soldiers.' },
        src: { zh: '统编版七年级下册第二单元 · 《宋史·太祖纪》 · 《续资治通鉴长编》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Songshi, Annals of Taizu · Xu Zizhi Tongjian Changbian' },
      },
      {
        ev: 'chanyuan', polity: 'liao',
        body: { zh: '1004年辽军大举南下，宋真宗在寇准劝说下亲征澶州。次年双方议和，宋每年给辽岁币，史称“澶渊之盟”。此后宋辽长期和平，边境贸易兴旺。', en: 'In 1004 a Liao army drove south and, urged by Kou Zhun, Emperor Zhenzong went to the front at Chanzhou. Next year the two sides made peace and the Song paid the Liao a yearly sum: the Chanyuan treaty. A long peace and busy border trade followed.' },
        src: { zh: '统编版七年级下册第二单元 · 《宋史·寇准传》 · 《续资治通鉴长编》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Songshi, Biography of Kou Zhun · Changbian' },
      },
      {
        ev: 'xixia_found',
        body: { zh: '西北的党项族也强大起来。1038年首领元昊称帝，国号大夏，史称西夏，都兴庆府。宋夏之间时战时和，1044年双方议和。', en: 'In the north-west the Tangut rose too. In 1038 their leader Yuanhao declared himself emperor of Great Xia, known as Western Xia, with its capital at Xingqing. Song and Xia fought on and off until they made peace in 1044.' },
        src: { zh: '统编版七年级下册第二单元 · 《宋史·夏国传》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Songshi, Account of Xia' },
      },
    ],
    checks: [
      {
        q: { zh: '赵匡胤建立北宋的方式是？', en: 'How did Zhao Kuangyin found the Northern Song?' },
        options: [{ zh: '玄武门之变', en: 'The Xuanwu Gate incident' }, { zh: '陈桥兵变', en: 'The Chenqiao mutiny' }, { zh: '靖难之役', en: 'The Jingnan campaign' }, { zh: '黄巾起义', en: 'The Yellow Turban rising' }],
        answer: 1, ev: 'song_found',
        why: { zh: '960年赵匡胤在陈桥驿被部下拥立，夺取后周政权，建立宋朝；玄武门之变发生在唐初。', en: 'In 960 Zhao Kuangyin’s troops acclaimed him at Chenqiao and he took over the Later Zhou, founding the Song; the Xuanwu Gate incident belongs to the early Tang.' },
      },
      {
        q: { zh: '澶渊之盟后，宋辽关系的主要特点是？', en: 'What marked Song–Liao relations after the Chanyuan treaty?' },
        options: [{ zh: '连年大战', en: 'War year after year' }, { zh: '辽向宋称臣', en: 'The Liao submitting to the Song' }, { zh: '宋收回燕云十六州', en: 'The Song recovering the Sixteen Prefectures' }, { zh: '长期和平，贸易发展', en: 'A long peace and growing trade' }],
        answer: 3, ev: 'chanyuan',
        why: { zh: '澶渊之盟后宋每年给辽岁币，双方长期保持和平，边境榷场贸易发展；燕云十六州仍在辽手中。', en: 'After the treaty the Song paid a yearly sum and the two kept a long peace with thriving border markets; the Sixteen Prefectures stayed with the Liao.' },
      },
      { order: ['liao_found', 'yanyun_sixteen', 'song_found', 'chanyuan', 'xixia_found'] },
      { where: 'chanyuan', tol: 300 },
    ],
    keys: [
      { zh: '907年唐朝灭亡，进入五代十国时期；916年耶律阿保机建立契丹国（辽）。', en: 'The Tang fell in 907 and the Five Dynasties and Ten Kingdoms began; Yelü Abaoji founded the Khitan state, Liao, in 916.' },
      { zh: '960年赵匡胤发动陈桥兵变建立北宋，加强中央集权；1005年宋辽订立澶渊之盟，此后长期和平。', en: 'Zhao Kuangyin founded the Northern Song in the Chenqiao mutiny of 960 and centralised power; the Chanyuan treaty of 1005 brought the Song and Liao a long peace.' },
      { zh: '1038年元昊建立西夏，北宋与辽、西夏形成并立局面。', en: 'Yuanhao founded Western Xia in 1038, and the Northern Song stood beside the Liao and the Xia.' },
    ],
  },
  {
    id: 'ch6-2', book: 'g7b', unit: 2, minutes: 7,
    title: { zh: '北宋的经济、科技与文化', en: 'Northern Song economy, inventions and culture' },
    blurb: { zh: '宋代农业、商业繁荣，四川出现交子；指南针用于航海，毕昇发明活字印刷；王安石变法，宋词兴盛，《清明上河图》描绘开封繁华。', en: 'Song farming and trade flourish and Sichuan issues jiaozi; the compass goes to sea and Bi Sheng invents movable type; Wang Anshi reforms, Song lyrics bloom and a great scroll paints Kaifeng.' },
    steps: [
      {
        year: 1010, at: [114, 31, 45],
        title: { zh: '宋代经济的发展', en: 'The Song economy grows' },
        body: { zh: '源自越南中南部占城的占城稻耐旱早熟，1012年宋真宗下令在江淮、两浙推广；宋元之际棉花种植扩展到长江流域。制瓷、造船等手工业兴盛，景德镇逐渐成为著名的瓷都。', en: 'Champa rice, an early-ripening, drought-hardy rice from Champa in south-central Vietnam, was spread by Emperor Zhenzong’s order of 1012 across the Huai and lower Yangtze lands; by the end of the Song cotton growing reached the Yangtze valley. Crafts such as porcelain and shipbuilding thrived, and Jingdezhen grew into a famous porcelain town.' },
        src: { zh: '统编版七年级下册第二单元 · 《宋史·食货志》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Songshi, Treatise on Food and Money' },
      },
      {
        ev: 'jiaozi',
        body: { zh: '商业繁荣，铜钱、铁钱携带不便。北宋前期四川地区出现了“交子”，这是世界上最早的纸币。东京开封打破了坊和市的界限，还出现了娱乐场所“瓦子”。', en: 'Trade boomed and heavy copper and iron coins were awkward to carry, so early in the Northern Song Sichuan began to use jiaozi, the world’s first paper money. In Kaifeng shops spread beyond the old walled markets, and entertainment quarters called wazi appeared.' },
        src: { zh: '统编版七年级下册第二单元 · 《宋史·食货志》 · 《东京梦华录》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Songshi, Food and Money · Dongjing Meng Hua Lu' },
      },
      {
        ev: 'song_tech',
        body: { zh: '北宋时指南针开始用于航海，《武经总要》记载了火药配方，火药武器广泛用于战争。这些发明后来经阿拉伯人传到欧洲。', en: 'In the Northern Song the compass began to guide ships at sea, the Wujing Zongyao recorded recipes for gunpowder, and gunpowder weapons were widely used in war. These inventions later reached Europe through the Arabs.' },
        src: { zh: '统编版七年级下册第二单元 · 《武经总要》 · 朱彧《萍洲可谈》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Wujing Zongyao · Zhu Yu, Pingzhou Ketan' },
      },
      {
        ev: 'bisheng',
        body: { zh: '北宋平民毕昇发明了泥活字印刷术，比雕版印刷更省时省力。沈括在《梦溪笔谈》中记载了这项发明。', en: 'Bi Sheng, a commoner of the Northern Song, invented printing with movable clay type, faster and cheaper than carving whole blocks. Shen Kuo described the invention in his Dream Pool Essays.' },
        src: { zh: '统编版七年级下册第二单元 · 沈括《梦溪笔谈》卷十八', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Shen Kuo, Dream Pool Essays, ch. 18' },
      },
      {
        ev: 'wanganshi',
        body: { zh: '北宋中期“冗官、冗兵、冗费”问题严重，国家积贫积弱。1069年起王安石推行青苗法、募役法、保甲法等新法，以求富国强兵。', en: 'By the mid Northern Song, too many officials, soldiers and expenses had left the state poor and weak. From 1069 Wang Anshi brought in new laws, among them the green-sprout loans, hired labour service and the baojia militia, to enrich the state and strengthen its army.' },
        src: { zh: '统编版《中外历史纲要（上）》第三单元 · 《宋史·王安石传》', en: 'PEP textbook, Outline of Chinese and World History I, unit 3 · Songshi, Biography of Wang Anshi' },
      },
      {
        ev: 'songci',
        body: { zh: '宋词是宋代文学的代表。苏轼、辛弃疾的词豪迈奔放，李清照的词婉约清丽。1082年苏轼在黄州写下《念奴娇·赤壁怀古》。', en: 'Lyric verse, ci, is the hallmark of Song literature: Su Shi and Xin Qiji wrote boldly, Li Qingzhao delicately. In 1082 Su Shi, in exile at Huangzhou, wrote his ci on the Red Cliffs.' },
        src: { zh: '统编版七年级下册第二单元 · 苏轼《念奴娇·赤壁怀古》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Su Shi, Niannujiao: Red Cliff' },
      },
      {
        ev: 'qingming',
        body: { zh: '北宋画家张择端的《清明上河图》描绘了东京开封汴河两岸的街市、船只和行人，是宋代城市繁华的生动写照。', en: 'Zhang Zeduan’s scroll Along the River During the Qingming Festival shows the streets, boats and crowds on both banks of the Bian river at Kaifeng, a vivid picture of the bustling Song city.' },
        src: { zh: '统编版七年级下册第二单元 · 张择端《清明上河图》（故宫博物院藏）', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Zhang Zeduan’s scroll, Palace Museum' },
      },
    ],
    checks: [
      {
        q: { zh: '世界上最早的纸币“交子”出现在宋代的哪个地区？', en: 'Where did jiaozi, the world’s first paper money, appear in the Song?' },
        options: [{ zh: '两浙地区', en: 'Liangzhe' }, { zh: '福建地区', en: 'Fujian' }, { zh: '四川地区', en: 'Sichuan' }, { zh: '河北地区', en: 'Hebei' }],
        answer: 2, ev: 'jiaozi',
        why: { zh: '北宋前期四川地区商业发达而通用铁钱，携带不便，于是出现了交子。', en: 'Early Northern Song Sichuan had lively trade but used heavy iron coins, so merchants there began to use jiaozi.' },
      },
      {
        q: { zh: '记载毕昇发明活字印刷术的著作是？', en: 'Which book records Bi Sheng’s movable type?' },
        options: [{ zh: '《梦溪笔谈》', en: 'The Dream Pool Essays' }, { zh: '《天工开物》', en: 'The Tiangong Kaiwu' }, { zh: '《齐民要术》', en: 'The Qimin Yaoshu' }, { zh: '《武经总要》', en: 'The Wujing Zongyao' }],
        answer: 0, ev: 'bisheng',
        why: { zh: '北宋沈括在《梦溪笔谈》中记载了毕昇的泥活字印刷术；《武经总要》记载的是火药配方。', en: 'Shen Kuo described Bi Sheng’s clay type in the Dream Pool Essays; the Wujing Zongyao is the book with the gunpowder recipes.' },
      },
      { order: ['jiaozi', 'bisheng', 'wanganshi', 'qingming'] },
      { where: 'jiaozi', tol: 400 },
    ],
    keys: [
      { zh: '宋代经济发展，北宋前期四川出现世界上最早的纸币“交子”。', en: 'The Song economy grew, and early in the Northern Song Sichuan issued jiaozi, the world’s first paper money.' },
      { zh: '北宋毕昇发明活字印刷术；指南针用于航海，火药武器广泛使用，后经阿拉伯人传到欧洲。', en: 'Bi Sheng invented movable type in the Northern Song; the compass went to sea and gunpowder weapons spread, later reaching Europe through the Arabs.' },
      { zh: '1069年起王安石变法，以求富国强兵；宋词繁荣，张择端绘《清明上河图》。', en: 'Wang Anshi’s reforms from 1069 aimed to enrich the state and strengthen its army; Song lyrics flourished and Zhang Zeduan painted the Qingming scroll.' },
    ],
  },
  {
    id: 'ch6-3', book: 'g7b', unit: 2, minutes: 6,
    title: { zh: '金的兴起、南宋与经济重心南移', en: 'The Jin, the Southern Song and the shift south' },
    blurb: { zh: '女真建金，先灭辽后灭北宋；南宋建立，岳飞抗金，宋金对峙；南宋时我国经济重心南移完成。', en: 'The Jurchen Jin destroys the Liao and then the Northern Song; the Southern Song begins, Yue Fei fights back, and by the Southern Song the centre of the economy has moved south.' },
    steps: [
      {
        year: 1100, at: [124, 44, 50],
        title: { zh: '东北的女真族', en: 'The Jurchen of the north-east' },
        body: { zh: '女真族生活在东北的黑龙江、松花江一带，长期受辽的统治和压迫。11世纪末，女真完颜部逐渐统一了各部。', en: 'The Jurchen lived along the Heilong and Songhua rivers in the north-east and long suffered under Liao rule. Towards the end of the 11th century the Wanyan clan gradually united the Jurchen tribes.' },
        src: { zh: '统编版七年级下册第二单元 · 《金史·世纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Jinshi, Ancestral Annals' },
      },
      {
        ev: 'jin_found',
        body: { zh: '1115年女真首领阿骨打称帝，建立金，都会宁。金联合北宋攻辽，1125年金灭辽。', en: 'In 1115 the Jurchen leader Aguda declared himself emperor and founded the Jin, with its capital at Huining. Allied with the Song against the Liao, the Jin destroyed the Liao in 1125.' },
        src: { zh: '统编版七年级下册第二单元 · 《金史·太祖纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Jinshi, Annals of Taizu' },
      },
      {
        ev: 'jingkang',
        body: { zh: '灭辽后金军南下攻宋。1127年金军攻破开封，俘虏宋徽宗、宋钦宗，北宋灭亡，史称“靖康之变”。同年赵构即位，后定都临安，史称南宋。', en: 'After the Liao fell, the Jin turned on the Song. In 1127 Jin troops took Kaifeng and carried off the emperors Huizong and Qinzong, ending the Northern Song: the Jingkang incident. That year Zhao Gou took the throne and later made Lin’an his capital: the Southern Song.' },
        src: { zh: '统编版七年级下册第二单元 · 《宋史·钦宗纪》《高宗纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Songshi, Annals of Qinzong and Gaozong' },
      },
      {
        ev: 'yuefei', polity: 'nsong',
        body: { zh: '1140年岳飞率岳家军在郾城大败金军，收复大片失地。宋高宗和秦桧却一心求和，以“莫须有”罪名杀害岳飞。1142年宋金议和，形成对峙。', en: 'In 1140 Yue Fei and his army crushed the Jin at Yancheng and won back much lost land. But Emperor Gaozong and Qin Hui wanted peace and put Yue Fei to death on a trumped-up charge. In 1142 Song and Jin made peace and settled into a standoff.' },
        src: { zh: '统编版七年级下册第二单元 · 《宋史·岳飞传》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Songshi, Biography of Yue Fei' },
      },
      {
        ev: 'south_shift', polity: 'nsong',
        body: { zh: '北方战乱，大量人口南迁，带去劳动力和生产技术，南方社会相对安定。南宋时我国经济重心南移完成，“苏湖熟，天下足”；广州、泉州成为著名的外贸港口。', en: 'War in the north drove many people south, bringing labour and skills to a calmer south. By the Southern Song the centre of China’s economy had moved south: “when Suzhou and Huzhou ripen, the realm has enough”. Guangzhou and Quanzhou became great ports for overseas trade.' },
        src: { zh: '统编版七年级下册第二单元 · 范成大《吴郡志》 · 《宋史·食货志》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Fan Chengda, Wujun Zhi · Songshi, Food and Money' },
      },
    ],
    checks: [
      {
        q: { zh: '1127年北宋灭亡的事件史称？', en: 'What is the event of 1127 that ended the Northern Song called?' },
        options: [{ zh: '安史之乱', en: 'The An Lushan rebellion' }, { zh: '陈桥兵变', en: 'The Chenqiao mutiny' }, { zh: '澶渊之盟', en: 'The Chanyuan treaty' }, { zh: '靖康之变', en: 'The Jingkang incident' }],
        answer: 3, ev: 'jingkang',
        why: { zh: '1127年金军攻破开封、俘虏徽钦二帝，北宋灭亡，因发生在靖康年间，史称“靖康之变”。', en: 'In 1127, in the Jingkang era, the Jin took Kaifeng and captured two emperors, ending the Northern Song: the Jingkang incident.' },
      },
      {
        q: { zh: '“苏湖熟，天下足”反映了什么？', en: 'What does “when Suzhou and Huzhou ripen, the realm has enough” show?' },
        options: [{ zh: '南方成为全国经济重心', en: 'The south had become the centre of the economy' }, { zh: '北方农业恢复发展', en: 'Farming in the north had recovered' }, { zh: '海外贸易超过农业', en: 'Overseas trade had overtaken farming' }, { zh: '南宋定都苏州', en: 'The Southern Song had its capital at Suzhou' }],
        answer: 0, ev: 'south_shift',
        why: { zh: '这句谚语说明太湖流域已成为全国重要的粮仓，南宋时经济重心南移完成；南宋的都城是临安。', en: 'The saying shows the Lake Tai region had become the realm’s granary as the economy’s centre finished moving south; the Southern Song capital was Lin’an.' },
      },
      { order: ['jin_found', 'jingkang', 'yuefei', 'south_shift'] },
      { where: 'yuefei', tol: 400 },
    ],
    keys: [
      { zh: '1115年阿骨打建立金，1125年金灭辽；1127年靖康之变，北宋灭亡，同年南宋建立，后定都临安。', en: 'Aguda founded the Jin in 1115 and it destroyed the Liao in 1125; the Jingkang incident of 1127 ended the Northern Song, and the Southern Song began that year, later with its capital at Lin’an.' },
      { zh: '岳飞抗金，郾城大捷；1142年宋金议和，形成对峙局面。', en: 'Yue Fei fought the Jin and won at Yancheng; the peace of 1142 left Song and Jin in a standoff.' },
      { zh: '南宋时我国经济重心南移完成，“苏湖熟，天下足”。', en: 'By the Southern Song the economic centre had moved south: “when Suzhou and Huzhou ripen, the realm has enough”.' },
    ],
  },
  {
    id: 'ch6-4', book: 'g7b', unit: 2, minutes: 6,
    title: { zh: '蒙古兴起与元朝统一', en: 'The Mongols rise and the Yuan reunites China' },
    blurb: { zh: '成吉思汗统一蒙古，忽必烈建立元朝并统一全国；元朝实行行省制度，设宣政院管辖西藏；郭守敬编成《授时历》。', en: 'Genghis Khan unites the Mongols and Kublai founds the Yuan and reunites China; the Yuan creates provinces and governs Tibet; Guo Shoujing makes the Shoushi calendar.' },
    steps: [
      {
        year: 1190, at: [110, 47, 60],
        title: { zh: '草原上的蒙古族', en: 'The Mongols of the steppe' },
        body: { zh: '蒙古族很早就生活在额尔古纳河一带，后来向西迁徙到蒙古高原。12世纪时，蒙古各部互相争斗，长期处于分裂状态。', en: 'The Mongols lived early on around the Ergune river and later moved west onto the Mongolian plateau. In the 12th century the Mongol tribes fought one another and stayed divided.' },
        src: { zh: '统编版七年级下册第二单元 · 《蒙古秘史》 · 《旧唐书·室韦传》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Secret History of the Mongols · Old Book of Tang, Shiwei' },
      },
      {
        ev: 'genghis',
        body: { zh: '1206年铁木真统一蒙古各部，建立蒙古政权，被尊为“成吉思汗”。此后蒙古先后灭西夏（1227年）和金（1234年）。', en: 'In 1206 Temujin united the Mongol tribes, founded a Mongol state and was hailed as Genghis Khan. The Mongols went on to destroy Western Xia in 1227 and the Jin in 1234.' },
        src: { zh: '统编版七年级下册第二单元 · 《元史·太祖纪》 · 《蒙古秘史》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Yuanshi, Annals of Taizu · Secret History' },
      },
      {
        ev: 'yuan_found', polity: 'yuan',
        body: { zh: '1271年忽必烈定国号为元，次年定都大都。1276年元军攻占临安，1279年南宋灭亡，元朝统一全国。南宋大臣文天祥坚持抗元，宁死不屈。', en: 'In 1271 Kublai named his dynasty Yuan and next year made Dadu his capital. The Yuan took Lin’an in 1276 and ended the Southern Song in 1279, reuniting China. The Song minister Wen Tianxiang fought on and chose death over surrender.' },
        src: { zh: '统编版七年级下册第二单元 · 《元史·世祖纪》 · 《宋史·文天祥传》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Yuanshi, Annals of Shizu · Songshi, Wen Tianxiang' },
      },
      {
        ev: 'xingsheng', polity: 'yuan',
        body: { zh: '元朝中央设中书省，地方实行行省制度，这是我国省制的开端。元朝设宣政院管辖西藏，设澎湖巡检司管辖澎湖和台湾。', en: 'The Yuan ran the centre through the Central Secretariat and the regions through provinces, the beginning of China’s provincial system. It governed Tibet through the Xuanzheng Yuan and Penghu and Taiwan through the Penghu Inspectorate.' },
        src: { zh: '统编版七年级下册第二单元 · 《元史·百官志》《地理志》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Yuanshi, Treatises on Officials and Geography' },
      },
      {
        ev: 'guoshoujing',
        body: { zh: '元朝郭守敬主持全国天文测量，编成《授时历》。它以365.2425日为一年，与现行公历相同，但比公历早约300年。', en: 'Guo Shoujing led astronomical surveys across the Yuan realm and produced the Shoushi calendar. Its year of 365.2425 days matches today’s Gregorian calendar, about 300 years earlier.' },
        src: { zh: '统编版七年级下册第二单元 · 《元史·郭守敬传》《历志》', en: 'PEP textbook, Grade 7 vol. 2, unit 2 · Yuanshi, Guo Shoujing · Treatise on the Calendar' },
      },
    ],
    checks: [
      {
        q: { zh: '元朝管辖西藏地区的中央机构是？', en: 'Which central office governed Tibet under the Yuan?' },
        options: [{ zh: '中书省', en: 'The Central Secretariat' }, { zh: '宣政院', en: 'The Xuanzheng Yuan' }, { zh: '澎湖巡检司', en: 'The Penghu Inspectorate' }, { zh: '军机处', en: 'The Grand Council' }],
        answer: 1, ev: 'xingsheng',
        why: { zh: '元朝设宣政院管辖西藏，西藏正式成为元朝的行政区；澎湖巡检司管辖澎湖和台湾。', en: 'The Yuan set up the Xuanzheng Yuan to govern Tibet, which formally became a Yuan region; the Penghu Inspectorate governed Penghu and Taiwan.' },
      },
      {
        q: { zh: '元朝实行的行省制度有什么意义？', en: 'Why does the Yuan provincial system matter?' },
        options: [{ zh: '结束了五代十国的分裂', en: 'It ended the Five Dynasties split' }, { zh: '标志君主专制达到顶峰', en: 'It marked the peak of autocracy' }, { zh: '是我国省制的开端', en: 'It began China’s provincial system' }, { zh: '确立了科举制度', en: 'It founded the imperial examinations' }],
        answer: 2, ev: 'xingsheng',
        why: { zh: '行省制度加强了中央对地方的管辖，是我国省制的开端，影响至今；君主专制顶峰的标志是清朝设军机处。', en: 'Provinces tightened central control over the regions and began China’s provincial system, still in use; the peak of autocracy came with the Qing Grand Council.' },
      },
      { order: ['genghis', 'yuan_found', 'xingsheng'] },
      { where: 'yuan_found', tol: 300 },
    ],
    keys: [
      { zh: '1206年铁木真统一蒙古，被尊为成吉思汗；1271年忽必烈建立元朝，1279年统一全国。', en: 'Temujin united the Mongols in 1206 as Genghis Khan; Kublai founded the Yuan in 1271 and reunited China in 1279.' },
      { zh: '元朝实行行省制度，是我国省制的开端；设宣政院管辖西藏，设澎湖巡检司管辖澎湖和台湾。', en: 'The Yuan created provinces, the origin of China’s provincial system; it governed Tibet through the Xuanzheng Yuan and Penghu and Taiwan through the Penghu Inspectorate.' },
    ],
  },
];
