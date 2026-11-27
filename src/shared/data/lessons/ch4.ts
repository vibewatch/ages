import type { Lesson } from '../types.ts';

/** Learning-path lessons for chapter 4 (see src/shared/data/chapters.ts and docs/design/course.md). */
export const CH4: Lesson[] = [
  {
    id: 'ch4-1', book: 'g7a', unit: 4, minutes: 7,
    title: { zh: '三国鼎立', en: 'The Three Kingdoms' },
    blurb: { zh: '赤壁之战后魏、蜀、吴三分天下，各自经营一方，最终由西晋重新统一。', en: 'After the Red Cliffs, Wei, Shu and Wu split the land and each built up its own region, until the Western Jin reunited China.' },
    steps: [
      {
        year: 208, at: [113, 31, 45],
        title: { zh: '赤壁之后', en: 'After the Red Cliffs' },
        body: { zh: '东汉末年群雄割据。曹操在官渡之战后统一北方，208年在赤壁被孙权、刘备联军打败，退回北方，三分天下的格局由此奠定。', en: 'Warlords carved up the late Eastern Han. Cao Cao won the north at Guandu, but in 208 Sun Quan and Liu Bei beat him at the Red Cliffs and he fell back north, setting up a three-way split.' },
        src: { zh: '统编版七年级上册第四单元 · 《三国志·武帝纪》《周瑜传》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Sanguozhi, Annals of Cao Cao · Biography of Zhou Yu' },
      },
      {
        ev: 'sanguo',
        body: { zh: '220年曹丕称帝，国号魏，都洛阳；221年刘备在成都称帝，国号汉，史称蜀；229年孙权称帝，国号吴，后定都建业。三国鼎立局面形成。', en: 'In 220 Cao Pi took the throne as emperor of Wei at Luoyang; in 221 Liu Bei became emperor of Han, known as Shu, at Chengdu; in 229 Sun Quan became emperor of Wu, later ruling from Jianye. Three kingdoms now stood side by side.' },
        src: { zh: '统编版七年级上册第四单元 · 《三国志》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Sanguozhi (Records of the Three Kingdoms)' },
      },
      {
        ev: 'zhugeliang_beifa',
        body: { zh: '刘备死后，丞相诸葛亮辅佐刘禅，发展蜀地经济，改善与西南各族的关系。他上《出师表》，多次率军北伐曹魏，最终病逝于五丈原。', en: 'After Liu Bei died, the chancellor Zhuge Liang served his son Liu Shan, built up Shu’s economy and improved relations with the south-western peoples. He presented his Memorial on Sending Out the Army and led repeated campaigns against Wei, dying in camp at Wuzhang Plain.' },
        src: { zh: '统编版七年级上册第四单元 · 《三国志·诸葛亮传》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Sanguozhi, Biography of Zhuge Liang' },
      },
      {
        ev: 'weiwen_yizhou',
        body: { zh: '孙吴兴修水利、发展造船业，开发江南。230年孙权派卫温率船队到达夷洲（今台湾），加强了大陆与台湾地区的联系。', en: 'Wu built waterworks and ships and opened up the lower Yangtze. In 230 Sun Quan sent Wei Wen with a fleet to Yizhou, today’s Taiwan, strengthening the mainland’s early ties with the island.' },
        src: { zh: '统编版七年级上册第四单元 · 《三国志·吴主传》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Sanguozhi, Biography of Sun Quan' },
      },
      {
        ev: 'm-sanguo-263',
        body: { zh: '曹魏在北方推行屯田，实力最强，但朝政逐渐被司马氏控制。263年魏军攻入成都，蜀汉灭亡。', en: 'Wei, the strongest of the three, had soldiers and peasants farm state land in the north, but power at court slipped to the Sima family. In 263 Wei armies took Chengdu and Shu came to an end.' },
        src: { zh: '《三国志·邓艾传》《钟会传》', en: 'Sanguozhi, Biographies of Deng Ai and Zhong Hui' },
      },
      {
        ev: 'wjin_unify', polity: 'wjin',
        body: { zh: '266年司马炎夺取曹魏政权，建立西晋，定都洛阳。280年西晋灭吴，结束了三国分立的局面，全国重新统一。', en: 'In 266 Sima Yan took the Wei throne and founded the Western Jin at Luoyang. In 280 the Jin conquered Wu, ending the Three Kingdoms and reuniting China.' },
        src: { zh: '统编版七年级上册第四单元 · 《晋书·武帝纪》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Jinshu, Annals of Emperor Wu' },
      },
    ],
    checks: [
      {
        q: { zh: '三国中定都成都的是？', en: 'Which of the Three Kingdoms had its capital at Chengdu?' },
        options: [{ zh: '蜀', en: 'Shu' }, { zh: '魏', en: 'Wei' }, { zh: '吴', en: 'Wu' }, { zh: '西晋', en: 'Western Jin' }],
        answer: 0, ev: 'sanguo',
        why: { zh: '刘备于221年在成都称帝，史称蜀；魏都洛阳，吴都建业，西晋则是统一三国后的王朝。', en: 'Liu Bei became emperor at Chengdu in 221, founding Shu; Wei ruled from Luoyang and Wu from Jianye, while the Western Jin came after the three.' },
      },
      {
        q: { zh: '230年孙权派卫温率船队到达的夷洲是今天的？', en: 'In 230 Sun Quan sent Wei Wen’s fleet to Yizhou. What is Yizhou today?' },
        options: [{ zh: '海南岛', en: 'Hainan' }, { zh: '朝鲜半岛', en: 'Korea' }, { zh: '台湾', en: 'Taiwan' }, { zh: '日本列岛', en: 'Japan' }],
        answer: 2, ev: 'weiwen_yizhou',
        why: { zh: '夷洲就是今天的台湾，卫温的航行加强了大陆与台湾地区的联系，也反映了孙吴造船业的发达。', en: 'Yizhou was Taiwan; Wei Wen’s voyage strengthened the mainland’s ties with the island and shows how advanced Wu’s shipbuilding was.' },
      },
      { order: ['sanguo', 'zhugeliang_beifa', 'm-sanguo-263', 'wjin_unify'] },
      { where: 'weiwen_yizhou', tol: 400 },
    ],
    keys: [
      { zh: '赤壁之战奠定三国鼎立的基础；220—229年魏（洛阳）、蜀（成都）、吴（建业）相继建立。', en: 'The Red Cliffs set up the three-way split; Wei (Luoyang), Shu (Chengdu) and Wu (Jianye) were founded between 220 and 229.' },
      { zh: '诸葛亮治蜀、孙吴开发江南、曹魏屯田，三国各自发展了本地区经济；230年卫温到达夷洲（台湾）。', en: 'Zhuge Liang’s rule in Shu, Wu’s work in the south and Wei’s state farms each developed a region; in 230 Wei Wen reached Yizhou (Taiwan).' },
      { zh: '263年魏灭蜀，266年西晋建立，280年西晋灭吴，统一全国。', en: 'Wei conquered Shu in 263, the Western Jin was founded in 266, and it conquered Wu and reunited China in 280.' },
    ],
  },
  {
    id: 'ch4-2', book: 'g7a', unit: 4, minutes: 7,
    title: { zh: '西晋、东晋与北民南迁', en: 'The Jin and the move south' },
    blurb: { zh: '西晋的统一短暂，北方陷入混战，大批北方人南迁；东晋偏安江南，淝水一战保住了南方。', en: 'The Jin reunion was short; the north fell into war and many northerners moved south, where the Eastern Jin held on and won at the Fei River.' },
    steps: [
      {
        year: 291, at: [112.5, 34.6, 40],
        title: { zh: '短暂的统一', en: 'A short-lived reunion' },
        body: { zh: '西晋统一后，统治集团奢侈腐朽。291年起皇族诸王为争夺权力相互混战，史称“八王之乱”，国力大为削弱。', en: 'Once united, the Western Jin court grew lavish and corrupt. From 291 the imperial princes fought one another for power, the War of the Eight Princes, and the state was badly weakened.' },
        src: { zh: '统编版七年级上册第四单元 · 《晋书》卷五十九 · 《资治通鉴·晋纪》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Jinshu, ch. 59 · Zizhi Tongjian, Jin annals' },
      },
      {
        ev: 'xijin_fall',
        body: { zh: '东汉以来，北方和西北的匈奴、鲜卑、羯、氐、羌等族陆续内迁。他们趁西晋内乱起兵，311年攻破洛阳，316年西晋灭亡。', en: 'Since the Eastern Han, the Xiongnu, Xianbei, Jie, Di and Qiang had been settling inside the frontier. They rose during the Jin’s civil war, took Luoyang in 311, and the Western Jin fell in 316.' },
        src: { zh: '统编版七年级上册第四单元 · 《晋书·孝怀帝纪》《孝愍帝纪》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Jinshu, Annals of Emperors Huai and Min' },
      },
      {
        ev: 'dongjin', polity: 'ejin',
        body: { zh: '317年司马睿在建康建立东晋。北方人民大量南迁，带去了先进技术和劳动力，江南自然条件优越、社会较安定，江南地区得到开发。', en: 'In 317 Sima Rui founded the Eastern Jin at Jiankang. Northerners poured south bringing skills and labour; with good land and relative peace, the Jiangnan region was opened up.' },
        src: { zh: '统编版七年级上册第四单元 · 《晋书·元帝纪》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Jinshu, Annals of Emperor Yuan' },
      },
      {
        ev: 'wangxizhi',
        body: { zh: '南迁的士人也带来了文化的繁荣。东晋王羲之的《兰亭序》被誉为“天下第一行书”，他被尊为“书圣”；顾恺之擅长人物画。', en: 'Migrant scholars brought culture with them. Wang Xizhi’s Orchid Pavilion Preface is hailed as the finest work of running script and he is called the Sage of Calligraphy; Gu Kaizhi excelled at painting figures.' },
        src: { zh: '统编版七年级上册第四单元 · 《晋书·王羲之传》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Jinshu, Biography of Wang Xizhi' },
      },
      {
        ev: 'feishui',
        body: { zh: '北方的前秦苻坚统一黄河流域后，383年率大军南下攻打东晋，在淝水被东晋军队以少胜多打败。此后北方再次分裂，南北对峙的局面延续下来。', en: 'Fu Jian of the Former Qin united the Yellow River basin and in 383 marched south against the Eastern Jin, but the smaller Jin army beat him at the Fei River. The north broke apart again and the north–south divide went on.' },
        src: { zh: '统编版七年级上册第四单元 · 《晋书·谢安传》《苻坚载记》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Jinshu, Biography of Xie An · Record of Fu Jian' },
      },
      {
        ev: 'm-nanbei-420',
        body: { zh: '420年刘裕取代东晋，建立宋。此后南方相继经历宋、齐、梁、陈四个朝代，都定都建康，合称南朝。', en: 'In 420 Liu Yu replaced the Eastern Jin with his Song dynasty. The south then passed through Song, Qi, Liang and Chen, all ruling from Jiankang: the Southern Dynasties.' },
        src: { zh: '《宋书·武帝纪》', en: 'Songshu, Annals of Emperor Wu' },
      },
    ],
    checks: [
      {
        q: { zh: '东晋时江南地区得到开发，下列哪一项不是原因？', en: 'Which of these was NOT a reason the south developed under the Eastern Jin?' },
        options: [{ zh: '北方人民南迁带来技术和劳动力', en: 'Northern migrants brought skills and labour' }, { zh: '江南自然条件优越', en: 'The south had good natural conditions' }, { zh: '江南社会相对安定', en: 'The south was relatively peaceful' }, { zh: '隋朝开通了大运河', en: 'The Sui had dug the Grand Canal' }],
        answer: 3, ev: 'dongjin',
        why: { zh: '北民南迁、自然条件优越和社会安定是江南开发的原因；大运河是二百多年后隋朝才开通的。', en: 'Migrants, good land and peace explain the south’s development; the Grand Canal was dug by the Sui more than two centuries later.' },
      },
      {
        q: { zh: '淝水之战中被打败的一方是？', en: 'Who was defeated at the Fei River?' },
        options: [{ zh: '东晋', en: 'The Eastern Jin' }, { zh: '前秦', en: 'The Former Qin' }, { zh: '北魏', en: 'The Northern Wei' }, { zh: '西晋', en: 'The Western Jin' }],
        answer: 1, ev: 'feishui',
        why: { zh: '383年前秦苻坚南下进攻东晋，在淝水被东晋以少胜多打败，北方随即重新分裂。', en: 'In 383 Fu Jian of the Former Qin attacked the Eastern Jin and lost to its smaller army at the Fei River; the north then split up again.' },
      },
      { order: ['xijin_fall', 'dongjin', 'feishui', 'm-nanbei-420'] },
      { where: 'feishui', tol: 300 },
    ],
    keys: [
      { zh: '西晋因统治腐朽和“八王之乱”而衰落，内迁各族起兵，316年西晋灭亡。', en: 'Corruption and the War of the Eight Princes weakened the Western Jin; the peoples settled inside the frontier rose, and it fell in 316.' },
      { zh: '317年东晋在建康建立；北方人民南迁，加上自然条件优越、社会较安定，江南得到开发。', en: 'The Eastern Jin was founded at Jiankang in 317; northern migrants, good land and relative peace opened up the south.' },
      { zh: '383年淝水之战，东晋以少胜多打败前秦，南北对峙延续；420年起南方进入宋、齐、梁、陈的南朝。', en: 'At the Fei River in 383 the Eastern Jin beat the larger Former Qin and the divide went on; from 420 the south was ruled by the Southern Dynasties: Song, Qi, Liang and Chen.' },
    ],
  },
  {
    id: 'ch4-3', book: 'g7a', unit: 4, minutes: 8,
    title: { zh: '北魏孝文帝改革与民族交融', en: 'Emperor Xiaowen and the blending of peoples' },
    blurb: { zh: '鲜卑族建立的北魏统一北方，孝文帝迁都洛阳、推行汉化；南北两地的科技与文化也各有成就。', en: 'The Xianbei Northern Wei united the north and Emperor Xiaowen moved to Luoyang and adopted Han ways; north and south both made great advances in science and culture.' },
    steps: [
      {
        year: 420, at: [112, 35, 55],
        title: { zh: '南北对峙', en: 'North and south' },
        body: { zh: '南方由南朝统治时，北方各族政权仍在混战。鲜卑族拓跋部在386年建立北魏，以平城为都城，逐渐强大起来。', en: 'While the Southern Dynasties ruled the south, states of many peoples still fought over the north. The Tuoba Xianbei had founded the Northern Wei in 386 and, ruling from Pingcheng, grew steadily stronger.' },
        src: { zh: '统编版七年级上册第四单元 · 《魏书·太祖纪》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Weishu, Annals of Taizu' },
      },
      {
        ev: 'm-nanbei-439',
        body: { zh: '439年北魏太武帝灭北凉，统一了黄河流域，北方的混战局面结束，与南朝形成南北对峙。', en: 'In 439 Emperor Taiwu of the Northern Wei conquered the Northern Liang and united the Yellow River basin, ending the wars in the north and facing the Southern Dynasties across the divide.' },
        src: { zh: '《魏书·世祖纪》', en: 'Weishu, Annals of Shizu' },
      },
      {
        ev: 'grottoes',
        body: { zh: '北魏时佛教盛行，在平城附近开凿了云冈石窟，迁都后又在洛阳开凿龙门石窟，它们与敦煌莫高窟合称“三大石窟”。', en: 'Buddhism flourished under the Northern Wei. It carved the Yungang Grottoes near Pingcheng and, after the move south, the Longmen Grottoes at Luoyang; with the Mogao Caves of Dunhuang they are China’s three great cave temples.' },
        src: { zh: '统编版七年级上册第四单元 · 《魏书·释老志》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Weishu, Treatise on Buddhism and Daoism' },
      },
      {
        ev: 'zuchongzhi',
        body: { zh: '南朝科学家祖冲之把圆周率精确到3.1415926至3.1415927之间，这一成就领先世界近一千年。', en: 'In the Southern Dynasties the scientist Zu Chongzhi worked out pi to between 3.1415926 and 3.1415927, a result the rest of the world did not match for nearly a thousand years.' },
        src: { zh: '统编版七年级上册第四单元 · 《隋书·律历志》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Suishu, Treatise on Pitch and Calendar' },
      },
      {
        ev: 'm-nanbei-485',
        body: { zh: '北魏在冯太后和孝文帝主持下推行均田制，把国家掌握的土地分给农民耕种，促进了北方农业生产的恢复。', en: 'Under Empress Dowager Feng and Emperor Xiaowen, the Northern Wei introduced the equal-field system, granting state-held land to farmers and helping farming in the north recover.' },
        src: { zh: '《魏书·食货志》', en: 'Weishu, Treatise on Food and Money' },
      },
      {
        ev: 'xiaowendi', polity: 'beiwei',
        body: { zh: '494年孝文帝把都城从平城迁到洛阳，推行汉化：穿汉服、说汉语、改汉姓、与汉族通婚、采用汉族官制律法。改革加速了北方的民族交融。', en: 'In 494 Emperor Xiaowen moved the capital from Pingcheng to Luoyang and adopted Han ways: Han dress and speech, Han surnames, marriage with Han families and Han offices and laws. The reforms sped up the blending of the northern peoples.' },
        src: { zh: '统编版七年级上册第四单元 · 《魏书·高祖纪》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Weishu, Annals of Gaozu' },
      },
      {
        ev: 'qimin',
        body: { zh: '北魏贾思勰总结黄河中下游地区的农牧业生产经验，写成《齐民要术》，这是我国现存最早、最完整的农书。', en: 'Jia Sixie of the Northern Wei gathered the farming and herding know-how of the middle and lower Yellow River into the Qimin Yaoshu, China’s oldest complete surviving book on agriculture.' },
        src: { zh: '统编版七年级上册第四单元 · 贾思勰《齐民要术》', en: 'PEP textbook, Grade 7 vol. 1, unit 4 · Jia Sixie, Qimin Yaoshu' },
      },
      {
        ev: 'm-nanbei-577',
        body: { zh: '北魏后来分裂为东魏和西魏，又分别被北齐和北周取代。577年北周灭北齐，北方重新统一，为隋朝统一全国打下了基础。', en: 'The Northern Wei later split into Eastern and Western Wei, replaced in turn by the Northern Qi and Northern Zhou. In 577 the Northern Zhou conquered the Northern Qi and reunited the north, preparing the way for the Sui.' },
        src: { zh: '《周书·武帝纪》', en: 'Zhoushu, Annals of Emperor Wu' },
      },
    ],
    checks: [
      {
        q: { zh: '孝文帝改革时，北魏把都城迁到了？', en: 'Where did Emperor Xiaowen move the Northern Wei capital?' },
        options: [{ zh: '长安', en: 'Chang’an' }, { zh: '洛阳', en: 'Luoyang' }, { zh: '平城', en: 'Pingcheng' }, { zh: '建康', en: 'Jiankang' }],
        answer: 1, ev: 'xiaowendi',
        why: { zh: '494年孝文帝从平城（今大同）迁都洛阳，以便接受中原文化、加强对黄河流域的统治；建康是南朝的都城。', en: 'In 494 Xiaowen moved from Pingcheng (today’s Datong) to Luoyang, the better to take up Central Plains culture and rule the Yellow River basin; Jiankang was the southern capital.' },
      },
      {
        q: { zh: '把圆周率精确到小数点后第七位的科学家是？', en: 'Which scientist worked out pi to seven decimal places?' },
        options: [{ zh: '贾思勰', en: 'Jia Sixie' }, { zh: '张衡', en: 'Zhang Heng' }, { zh: '王羲之', en: 'Wang Xizhi' }, { zh: '祖冲之', en: 'Zu Chongzhi' }],
        answer: 3, ev: 'zuchongzhi',
        why: { zh: '南朝祖冲之把圆周率精确到3.1415926至3.1415927之间；贾思勰著《齐民要术》，张衡是东汉科学家，王羲之是东晋书法家。', en: 'Zu Chongzhi of the Southern Dynasties put pi between 3.1415926 and 3.1415927; Jia Sixie wrote the Qimin Yaoshu, Zhang Heng was an Eastern Han scientist and Wang Xizhi an Eastern Jin calligrapher.' },
      },
      { order: ['m-nanbei-439', 'm-nanbei-485', 'xiaowendi', 'm-nanbei-577'] },
      { where: 'grottoes', tol: 400 },
    ],
    keys: [
      { zh: '鲜卑族建立的北魏于439年统一黄河流域，与南朝形成南北对峙。', en: 'The Northern Wei, founded by the Xianbei, united the Yellow River basin in 439 and faced the Southern Dynasties.' },
      { zh: '494年孝文帝迁都洛阳，推行汉服、汉语、汉姓、通婚、汉族官制律法等措施，促进了北方的民族交融。', en: 'In 494 Emperor Xiaowen moved to Luoyang and brought in Han dress, language, surnames, intermarriage and Han offices and laws, blending the northern peoples.' },
      { zh: '祖冲之精算圆周率，贾思勰著《齐民要术》，北魏开凿云冈、龙门石窟。', en: 'Zu Chongzhi calculated pi, Jia Sixie wrote the Qimin Yaoshu, and the Northern Wei carved the Yungang and Longmen grottoes.' },
    ],
  },
];
