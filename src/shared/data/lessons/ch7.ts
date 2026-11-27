import type { Lesson } from '../types.ts';

/** Learning-path lessons for chapter 7 (see src/shared/data/chapters.ts and docs/design/course.md). */
export const CH7: Lesson[] = [
  {
    id: 'ch7-1', book: 'g7b', unit: 3, minutes: 6,
    title: { zh: '明朝的建立与郑和下西洋', en: 'The Ming is founded and Zheng He sails' },
    blurb: { zh: '朱元璋建立明朝，废丞相、加强皇权；郑和七下西洋；明成祖迁都北京，修建紫禁城。', en: 'Zhu Yuanzhang founds the Ming and abolishes the chancellor; Zheng He sails seven times; the Yongle Emperor moves the capital to Beijing and builds the Forbidden City.' },
    steps: [
      {
        year: 1351, at: [116, 33, 55],
        title: { zh: '元末农民起义', en: 'Risings at the end of the Yuan' },
        body: { zh: '元朝后期政治腐败，赋役沉重，民不聊生。1351年刘福通等领导的红巾军起义爆发，出身贫苦的朱元璋投身起义军，逐渐发展壮大。', en: 'Late Yuan rule was corrupt and taxes and labour duties crushed the people. In 1351 the Red Turban risings led by Liu Futong and others broke out, and Zhu Yuanzhang, born into poverty, joined the rebels and built up his own power.' },
        src: { zh: '统编版七年级下册第三单元 · 《元史·顺帝纪》 · 《明史·太祖本纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Yuanshi, Annals of Shundi · Mingshi, Taizu' },
      },
      {
        ev: 'ming_found', polity: 'ming',
        body: { zh: '1368年朱元璋在应天府（今南京）称帝，建立明朝，年号洪武。同年明军北上攻占大都，结束了元朝的统治。', en: 'In 1368 Zhu Yuanzhang proclaimed himself emperor at Yingtian, today’s Nanjing, and founded the Ming. That year his armies marched north, took Dadu and ended Yuan rule.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·太祖本纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Annals of Taizu' },
      },
      {
        ev: 'ming_autocracy',
        body: { zh: '1380年明太祖废除丞相，由六部直接对皇帝负责，又设锦衣卫监视官民。明成祖时设内阁、东厂，科举以八股取士，君主专制空前加强。', en: 'In 1380 the Ming founder abolished the chancellor and made the Six Ministries answer to him directly, and set up the Embroidered Uniform Guard to watch officials and people. The Yongle Emperor added the Grand Secretariat and the Eastern Depot, and exams demanded the eight-legged essay: imperial power grew as never before.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·职官志》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Treatise on Officials' },
      },
      {
        ev: 'zhenghe',
        body: { zh: '1405年至1433年，郑和率领庞大船队七次远航，访问亚非三十多个国家和地区，最远到达非洲东海岸和红海沿岸，比欧洲人的远航早半个多世纪。', en: 'Between 1405 and 1433 Zheng He led a great fleet on seven voyages, visiting more than thirty countries in Asia and Africa and reaching as far as East Africa and the Red Sea, over half a century before Europe’s great voyages.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·郑和传》 · 《天妃灵应之记》碑', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Zheng He · Tianfei stele at Changle' },
      },
      {
        ev: 'forbidden_city',
        body: { zh: '明成祖在北京修建宫殿，1421年正式迁都北京。北京故宫是世界上现存规模最大、保存最完整的古代宫殿建筑群。', en: 'The Yongle Emperor built a palace in Beijing and formally moved the capital there in 1421. The Forbidden City is the largest and best-preserved ancient palace complex in the world.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·成祖本纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Annals of Chengzu' },
      },
    ],
    checks: [
      {
        q: { zh: '明太祖加强皇权的措施是？', en: 'How did the Ming founder strengthen the throne?' },
        options: [{ zh: '设立军机处', en: 'He set up the Grand Council' }, { zh: '实行行省制度', en: 'He created provinces' }, { zh: '杯酒释兵权', en: 'He took his generals’ commands over wine' }, { zh: '废丞相，权分六部', en: 'He abolished the chancellor and ruled through the Six Ministries' }],
        answer: 3, ev: 'ming_autocracy',
        why: { zh: '1380年明太祖废除丞相，六部直接对皇帝负责；军机处是清朝雍正帝设立的，杯酒释兵权是宋太祖的做法。', en: 'In 1380 the Ming founder abolished the chancellor and had the Six Ministries report to him; the Grand Council came with the Qing Yongzheng emperor, and the wine banquet was the Song founder’s move.' },
      },
      {
        q: { zh: '1421年明成祖迁都到了哪里？', en: 'Where did the Yongle Emperor move the capital in 1421?' },
        options: [{ zh: '北京', en: 'Beijing' }, { zh: '南京', en: 'Nanjing' }, { zh: '西安', en: 'Xi’an' }, { zh: '开封', en: 'Kaifeng' }],
        answer: 0, ev: 'forbidden_city',
        why: { zh: '明朝初都南京（应天府），明成祖修建北京宫殿后于1421年迁都北京。', en: 'The Ming first ruled from Nanjing, then after building the Beijing palace the Yongle Emperor moved the capital there in 1421.' },
      },
      { order: ['ming_found', 'ming_autocracy', 'zhenghe', 'forbidden_city'] },
      { where: 'forbidden_city', tol: 200 },
    ],
    keys: [
      { zh: '1368年朱元璋建立明朝，定都应天府；明太祖废丞相、权分六部，君主专制空前加强。', en: 'Zhu Yuanzhang founded the Ming in 1368 with its capital at Yingtian; abolishing the chancellor and ruling through the Six Ministries, the Ming made the throne stronger than ever.' },
      { zh: '1405—1433年郑和七下西洋，最远到达非洲东海岸和红海沿岸。', en: 'Zheng He sailed seven times between 1405 and 1433, reaching as far as East Africa and the Red Sea.' },
      { zh: '1421年明成祖迁都北京，北京故宫是现存规模最大、保存最完整的古代宫殿建筑群。', en: 'The Yongle Emperor moved the capital to Beijing in 1421; the Forbidden City is the largest and best-preserved ancient palace complex.' },
    ],
  },
  {
    id: 'ch7-2', book: 'g7b', unit: 3, minutes: 7,
    title: { zh: '明朝中后期与清军入关', en: 'The later Ming and the Qing conquest' },
    blurb: { zh: '戚继光抗倭，明朝修筑长城，葡萄牙人租居澳门；科技与小说繁荣；后金崛起，1644年明朝灭亡，清军入关。', en: 'Qi Jiguang fights the pirates, the Ming builds the Great Wall and the Portuguese settle in Macao; science and novels flourish; the Later Jin rises, the Ming falls in 1644 and the Qing enters the passes.' },
    steps: [
      {
        year: 1540, at: [121, 29, 40],
        title: { zh: '东南沿海的倭患', en: 'Pirates on the south-east coast' },
        body: { zh: '元末明初起，日本的一些武士、商人和海盗常骚扰我国沿海，被称为“倭寇”。明朝中期，倭寇与中国的海盗、奸商勾结，东南沿海深受其害。', en: 'From the end of the Yuan, some Japanese samurai, merchants and pirates raided China’s coast; they were called wokou. By the mid Ming they worked with Chinese pirates and smugglers, and the south-east coast suffered badly.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·日本传》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Account of Japan' },
      },
      {
        ev: 'macao_pt',
        body: { zh: '1553年，葡萄牙人以晾晒货物为名进入澳门，1557年起长期租居。澳门成为中西贸易和文化交流的据点，但主权仍属中国。', en: 'In 1553 the Portuguese entered Macao on the pretext of drying their goods and from 1557 rented it as a long-term base. Macao became a hub of trade and culture between China and the West, but it remained Chinese territory.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·佛郎机传》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Account of the Portuguese' },
      },
      {
        ev: 'qijiguang',
        body: { zh: '戚继光组建纪律严明的“戚家军”，1561年在台州九战九捷，后与俞大猷等将领一起基本平定了倭患。', en: 'Qi Jiguang trained a disciplined force, the Qi Family Army, won nine battles in a row at Taizhou in 1561, and with Yu Dayou and other generals largely ended the pirate raids.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·戚继光传》 · 《纪效新书》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Qi Jiguang · Jixiao Xinshu' },
      },
      {
        ev: 'ming_wall',
        body: { zh: '为防御蒙古，明朝多次大规模修筑长城，西起嘉峪关，东到鸭绿江。今天我们看到的长城大多是明长城。', en: 'To hold off the Mongols the Ming rebuilt the Great Wall on a grand scale, from Jiayu Pass in the west to the Yalu river in the east. Most of the wall we see today is Ming work.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·兵志》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Treatise on the Military' },
      },
      {
        ev: 'ming_science',
        body: { zh: '明朝李时珍著《本草纲目》，被誉为“东方医药巨典”；宋应星著《天工开物》，被称为“中国17世纪的工艺百科全书”。', en: 'In the Ming, Li Shizhen wrote the Bencao Gangmu, praised as the great medical classic of the East, and Song Yingxing wrote the Tiangong Kaiwu, called China’s 17th-century encyclopedia of crafts.' },
        src: { zh: '统编版七年级下册第三单元 · 《本草纲目》 · 《天工开物》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Bencao Gangmu · Tiangong Kaiwu' },
      },
      {
        ev: 'later_jin',
        body: { zh: '东北的女真首领努尔哈赤统一女真各部，创建八旗制度，1616年建立后金。1636年皇太极改国号为清。', en: 'In the north-east the Jurchen leader Nurhaci united the Jurchen tribes, created the Eight Banners and founded the Later Jin in 1616. In 1636 Hong Taiji renamed the state Qing.' },
        src: { zh: '统编版七年级下册第三单元 · 《清太祖实录》 · 《满文老档》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Veritable Records of Qing Taizu · Old Manchu Archives' },
      },
      {
        ev: 'li_zicheng', polity: 'qing',
        body: { zh: '明末政治腐败，李自成提出“均田免粮”，农民军迅速壮大。1644年李自成攻入北京，明朝灭亡；同年清军入关，迁都北京。', en: 'The late Ming was corrupt, and Li Zicheng’s call for “equal land and no grain tax” swelled his peasant army. In 1644 he took Beijing and the Ming fell; that same year the Qing army came through the passes and made Beijing its capital.' },
        src: { zh: '统编版七年级下册第三单元 · 《明史·李自成传》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Mingshi, Biography of Li Zicheng' },
      },
    ],
    checks: [
      {
        q: { zh: '明朝率领“戚家军”抗击倭寇的将领是？', en: 'Which Ming general led the Qi Family Army against the pirates?' },
        options: [{ zh: '郑成功', en: 'Zheng Chenggong' }, { zh: '戚继光', en: 'Qi Jiguang' }, { zh: '袁崇焕', en: 'Yuan Chonghuan' }, { zh: '岳飞', en: 'Yue Fei' }],
        answer: 1, ev: 'qijiguang',
        why: { zh: '戚继光组建戚家军，在台州九战九捷，基本平定倭患；郑成功是收复台湾的民族英雄。', en: 'Qi Jiguang’s army won nine battles at Taizhou and largely ended the pirate raids; Zheng Chenggong is the hero who recovered Taiwan.' },
      },
      {
        q: { zh: '被称为“中国17世纪的工艺百科全书”的是？', en: 'Which work is called China’s 17th-century encyclopedia of crafts?' },
        options: [{ zh: '《本草纲目》', en: 'The Bencao Gangmu' }, { zh: '《农政全书》', en: 'The Nongzheng Quanshu' }, { zh: '《天工开物》', en: 'The Tiangong Kaiwu' }, { zh: '《梦溪笔谈》', en: 'The Dream Pool Essays' }],
        answer: 2, ev: 'ming_science',
        why: { zh: '宋应星的《天工开物》系统记载了农业和手工业技术；《本草纲目》是李时珍的医药学著作。', en: 'Song Yingxing’s Tiangong Kaiwu sets out the techniques of farming and crafts; the Bencao Gangmu is Li Shizhen’s work on medicine.' },
      },
      { order: ['macao_pt', 'qijiguang', 'later_jin', 'li_zicheng'] },
      { where: 'qijiguang', tol: 400 },
    ],
    keys: [
      { zh: '戚继光率领戚家军抗倭，基本平定倭患；1553年葡萄牙人进入澳门，1557年起租居。', en: 'Qi Jiguang’s army largely ended the pirate raids; the Portuguese entered Macao in 1553 and rented it from 1557.' },
      { zh: '1616年努尔哈赤建立后金，1636年皇太极改国号为清；1644年李自成攻入北京，明朝灭亡，清军入关。', en: 'Nurhaci founded the Later Jin in 1616 and Hong Taiji renamed it Qing in 1636; Li Zicheng took Beijing in 1644, the Ming fell and the Qing entered the passes.' },
    ],
  },
  {
    id: 'ch7-3', book: 'g7b', unit: 3, minutes: 7,
    title: { zh: '清朝巩固统一的多民族国家', en: 'The Qing consolidates a unified multi-ethnic state' },
    blurb: { zh: '郑成功收复台湾，清朝设台湾府；雅克萨之战后签订《尼布楚条约》；清朝设驻藏大臣，平定准噶尔和大小和卓叛乱，土尔扈特部东归。', en: 'Zheng Chenggong recovers Taiwan and the Qing makes it a prefecture; after Albazin comes the Treaty of Nerchinsk; the Qing posts Ambans in Tibet, defeats the Dzungars and the Khojas, and the Torghuts come home.' },
    steps: [
      {
        year: 1650, at: [112, 36, 70], polity: 'qing',
        title: { zh: '清朝统一全国', en: 'The Qing unites the country' },
        body: { zh: '清朝定都北京后，经过多年征战，逐步统一了全国大陆。此时台湾仍被荷兰殖民者侵占，北方的沙俄也不断侵入黑龙江流域。', en: 'After making Beijing its capital the Qing spent years of war uniting the mainland. Taiwan, however, was still held by the Dutch, and in the north Russia kept pushing into the Heilong river valley.' },
        src: { zh: '统编版七年级下册第三单元 · 《清史稿·世祖本纪》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Draft History of Qing, Annals of Shizu' },
      },
      {
        ev: 'zheng_chenggong',
        body: { zh: '17世纪荷兰殖民者侵占台湾。1661年郑成功率军横渡台湾海峡，1662年迫使荷兰殖民者投降，收复了台湾。', en: 'Dutch colonists had seized Taiwan in the 17th century. In 1661 Zheng Chenggong led his fleet across the Taiwan Strait, and in 1662 he forced the Dutch to surrender and recovered Taiwan.' },
        src: { zh: '统编版七年级下册第三单元 · 《清史稿·郑成功传》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Draft History of Qing, Zheng Chenggong' },
      },
      {
        ev: 'taiwan_fu',
        body: { zh: '1683年清军进入台湾，次年清政府设置台湾府，隶属福建省，加强了中央对台湾的管辖。', en: 'Qing forces entered Taiwan in 1683, and next year the Qing set up Taiwan Prefecture under Fujian province, tightening the central government’s hold on the island.' },
        src: { zh: '统编版七年级下册第三单元 · 《清圣祖实录》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Veritable Records of the Kangxi Emperor' },
      },
      {
        ev: 'yaksa', polity: 'qing',
        body: { zh: '康熙帝两次派兵在雅克萨反击沙俄侵略军。1689年中俄签订《尼布楚条约》，从法律上肯定了黑龙江和乌苏里江流域包括库页岛在内的广大地区是中国领土。', en: 'The Kangxi emperor twice sent troops to drive the Russians from Albazin. In 1689 China and Russia signed the Treaty of Nerchinsk, which confirmed in law that the Heilong and Ussuri basins, Sakhalin included, were Chinese territory.' },
        src: { zh: '统编版七年级下册第三单元 · 《尼布楚条约》 · 《清圣祖实录》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Treaty of Nerchinsk text · Kangxi Veritable Records' },
      },
      {
        ev: 'zhuzang',
        body: { zh: '清朝册封达赖喇嘛和班禅额尔德尼。1727年设驻藏大臣，与达赖、班禅共同管理西藏；1793年又颁布金瓶掣签制度。', en: 'The Qing conferred titles on the Dalai Lama and the Panchen Erdeni. In 1727 it posted Ambans to govern Tibet together with them, and in 1793 it introduced the Golden Urn for choosing reincarnations.' },
        src: { zh: '统编版七年级下册第三单元 · 《清史稿·藩部传》 · 《钦定藏内善后章程》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Draft History of Qing · 1793 Tibet Ordinance' },
      },
      {
        ev: 'zungar', polity: 'qing',
        body: { zh: '康熙、雍正、乾隆三朝平定准噶尔部叛乱。1759年乾隆帝平定大小和卓叛乱，统一新疆，后设伊犁将军管辖。', en: 'Over the reigns of Kangxi, Yongzheng and Qianlong the Qing put down the Dzungar revolts. In 1759 Qianlong crushed the Khoja revolt and unified Xinjiang, later placing it under the General of Ili.' },
        src: { zh: '统编版七年级下册第三单元 · 《清史稿·高宗本纪》 · 《平定准噶尔方略》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Draft History of Qing, Gaozong · Dzungar Campaign Record' },
      },
      {
        ev: 'torghut',
        body: { zh: '1771年，渥巴锡率领土尔扈特部众摆脱沙俄控制，从伏尔加河下游万里东归，回到伊犁，受到清政府的妥善安置。', en: 'In 1771 Ubashi led the Torghuts out of Russian control on a vast trek from the lower Volga back to Ili, where the Qing government resettled them with care.' },
        src: { zh: '统编版七年级下册第三单元 · 乾隆《土尔扈特全部归顺记》碑', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Qianlong’s stele on the return of the Torghuts' },
      },
    ],
    checks: [
      {
        q: { zh: '1689年中俄签订的条约是？', en: 'What treaty did China and Russia sign in 1689?' },
        options: [{ zh: '《南京条约》', en: 'The Treaty of Nanking' }, { zh: '《瑷珲条约》', en: 'The Treaty of Aigun' }, { zh: '《北京条约》', en: 'The Convention of Peking' }, { zh: '《尼布楚条约》', en: 'The Treaty of Nerchinsk' }],
        answer: 3, ev: 'yaksa',
        why: { zh: '雅克萨之战后，中俄平等谈判签订《尼布楚条约》，划定了中俄东段边界；其他三个是近代不平等条约。', en: 'After Albazin the two sides negotiated as equals and signed the Treaty of Nerchinsk, fixing the eastern border; the other three are unequal treaties of modern times.' },
      },
      {
        q: { zh: '1727年清朝为加强对西藏的管理设立了？', en: 'What did the Qing set up in 1727 to govern Tibet?' },
        options: [{ zh: '宣政院', en: 'The Xuanzheng Yuan' }, { zh: '驻藏大臣', en: 'The Ambans' }, { zh: '伊犁将军', en: 'The General of Ili' }, { zh: '台湾府', en: 'Taiwan Prefecture' }],
        answer: 1, ev: 'zhuzang',
        why: { zh: '1727年清朝设驻藏大臣，与达赖、班禅共同管理西藏；宣政院是元朝的机构，伊犁将军管辖新疆。', en: 'In 1727 the Qing posted Ambans to govern Tibet with the Dalai Lama and the Panchen Lama; the Xuanzheng Yuan was a Yuan office and the General of Ili governed Xinjiang.' },
      },
      { order: ['zheng_chenggong', 'taiwan_fu', 'yaksa', 'zhuzang', 'torghut'] },
      { where: 'yaksa', tol: 400 },
    ],
    keys: [
      { zh: '1662年郑成功收复台湾；1684年清朝设台湾府，隶属福建省。', en: 'Zheng Chenggong recovered Taiwan in 1662; the Qing set up Taiwan Prefecture under Fujian in 1684.' },
      { zh: '雅克萨之战后，1689年中俄签订《尼布楚条约》，从法律上肯定黑龙江和乌苏里江流域是中国领土。', en: 'After Albazin, the Treaty of Nerchinsk of 1689 confirmed in law that the Heilong and Ussuri basins were Chinese.' },
      { zh: '清朝设驻藏大臣管理西藏，平定准噶尔和大小和卓叛乱，设伊犁将军，巩固了统一的多民族国家。', en: 'The Qing posted Ambans in Tibet, defeated the Dzungars and the Khojas and appointed the General of Ili, consolidating the unified multi-ethnic state.' },
    ],
  },
  {
    id: 'ch7-4', book: 'g7b', unit: 3, minutes: 6,
    title: { zh: '君主专制的顶峰与闭关锁国', en: 'Peak autocracy and the closed door' },
    blurb: { zh: '雍正帝设军机处，君主专制达到顶峰；清朝闭关锁国，只开广州一口通商；《红楼梦》问世，京剧形成；中国逐渐落后于世界。', en: 'The Yongzheng emperor’s Grand Council takes autocracy to its peak; the Qing closes its doors and trades only at Guangzhou; Dream of the Red Chamber is written and Peking opera forms; China falls behind the world.' },
    steps: [
      {
        year: 1700, at: [114, 32, 55],
        title: { zh: '清朝前期的社会经济', en: 'Society and economy in the early Qing' },
        body: { zh: '清朝前期社会安定，农业恢复发展，明朝中后期从美洲传入的玉米、甘薯等高产作物在各地推广，人口迅速增长。但重农抑商的政策限制了工商业的发展。', en: 'The early Qing was settled and farming recovered; high-yield American crops such as maize and sweet potato, brought in during the later Ming, spread widely, and the population grew fast. But the policy of favouring farming over trade held back crafts and commerce.' },
        src: { zh: '统编版七年级下册第三单元 · 《清史稿·食货志》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Draft History of Qing, Food and Money' },
      },
      {
        ev: 'junjichu',
        body: { zh: '1729年雍正帝设立军机处，军机大臣只能按皇帝旨意办事，军国大事由皇帝一人裁决，标志着君主专制达到顶峰。清朝还大兴“文字狱”，禁锢思想。', en: 'In 1729 the Yongzheng emperor set up the Grand Council, whose ministers only carried out his orders; the emperor alone decided affairs of state, the peak of autocracy. The Qing also persecuted writers in literary inquisitions, stifling thought.' },
        src: { zh: '统编版七年级下册第三单元 · 《清史稿·军机大臣年表》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Draft History of Qing, Grand Councillors' },
      },
      {
        ev: 'canton',
        body: { zh: '清朝实行“闭关锁国”政策，严格限制对外贸易。1757年乾隆帝下令只开放广州一处对外通商，由“十三行”统一经营。', en: 'The Qing followed a closed-door policy and tightly limited foreign trade. In 1757 the Qianlong emperor allowed foreign trade at Guangzhou alone, handled by the licensed Thirteen Hongs.' },
        src: { zh: '统编版七年级下册第三单元 · 《清高宗实录》乾隆二十二年上谕', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Qianlong Veritable Records, edict of 1757' },
      },
      {
        ev: 'honglou',
        body: { zh: '清朝曹雪芹创作的《红楼梦》是我国古典小说的巅峰之作。乾隆时编成的《四库全书》是我国古代规模最大的丛书。', en: 'Cao Xueqin’s Dream of the Red Chamber is the summit of the classical Chinese novel. The Siku Quanshu, compiled under Qianlong, is the largest collection of books from imperial China.' },
        src: { zh: '统编版七年级下册第三单元 · 曹雪芹《红楼梦》 · 《四库全书总目》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · Cao Xueqin, Dream of the Red Chamber · Siku Catalogue' },
      },
      {
        ev: 'jingju',
        body: { zh: '1790年起，徽班陆续进京演出，吸收昆曲、汉调等剧种的精华，在道光年间逐渐形成京剧。京剧被誉为“国粹”。', en: 'From 1790 opera troupes from Anhui came to perform in Beijing; drawing on Kunqu, Han opera and other styles, they formed Peking opera in the Daoguang reign. It is prized as a national treasure.' },
        src: { zh: '统编版七年级下册第三单元 · 《中国京剧史》', en: 'PEP textbook, Grade 7 vol. 2, unit 3 · A History of Peking Opera (Zhongguo Jingju Shi)' },
      },
      {
        year: 1839, at: [100, 35, 120],
        title: { zh: '1840年前夕', en: 'On the eve of 1840' },
        body: { zh: '18世纪60年代起，英国率先开始工业革命，西方殖民者加紧向外扩张。闭关锁国在一定程度上对殖民者的侵略起到自卫作用，但隔绝了中外交往，使中国逐渐落后于世界潮流。', en: 'From the 1760s Britain led the way into the industrial revolution and Western colonial powers pushed overseas. The closed door served to some extent as self-defence against colonial encroachment, but it cut China off from the world and left it falling behind.' },
        src: { zh: '统编版七年级下册第三单元', en: 'PEP textbook, Grade 7 vol. 2, unit 3' },
      },
    ],
    checks: [
      {
        q: { zh: '标志着我国君主专制达到顶峰的是？', en: 'What marked the peak of imperial autocracy in China?' },
        options: [{ zh: '明成祖设立内阁', en: 'The Yongle Emperor creating the Grand Secretariat' }, { zh: '明太祖设锦衣卫', en: 'The Ming founder creating the Embroidered Uniform Guard' }, { zh: '雍正帝设立军机处', en: 'Yongzheng setting up the Grand Council' }, { zh: '元朝设中书省', en: 'The Yuan creating the Central Secretariat' }],
        answer: 2, ev: 'junjichu',
        why: { zh: '军机处设立后，军国大事由皇帝一人裁决，君主专制达到顶峰；内阁和锦衣卫是明朝加强皇权的措施。', en: 'With the Grand Council the emperor alone decided affairs of state, the peak of autocracy; the Grand Secretariat and the Guard were earlier Ming steps.' },
      },
      {
        q: { zh: '1757年后清朝只允许在哪里对外通商？', en: 'Where alone did the Qing allow foreign trade after 1757?' },
        options: [{ zh: '广州', en: 'Guangzhou' }, { zh: '泉州', en: 'Quanzhou' }, { zh: '宁波', en: 'Ningbo' }, { zh: '澳门', en: 'Macao' }],
        answer: 0, ev: 'canton',
        why: { zh: '1757年乾隆帝下令只开广州一口通商，由十三行统一经营；这是闭关锁国政策的体现。', en: 'In 1757 Qianlong limited foreign trade to Guangzhou alone, run through the Thirteen Hongs, a sign of the closed-door policy.' },
      },
      {
        q: { zh: '闭关锁国政策带来的主要后果是？', en: 'What was the main result of the closed-door policy?' },
        options: [{ zh: '中国对外贸易大幅增长', en: 'China’s foreign trade grew sharply' }, { zh: '中国逐渐落后于世界潮流', en: 'China gradually fell behind the world' }, { zh: '西方工业革命被阻止', en: 'The Western industrial revolution was halted' }, { zh: '清朝君主专制被削弱', en: 'Qing autocracy was weakened' }],
        answer: 1, ev: 'canton',
        why: { zh: '闭关锁国在一定程度上对殖民者的侵略起到自卫作用，但隔绝了中外交往，使中国看不到世界发展大势，逐渐落后于世界潮流。', en: 'The closed door served to some extent as self-defence against colonial encroachment, but it cut China off from a changing world, so it gradually fell behind.' },
      },
      { order: ['junjichu', 'canton', 'jingju'] },
      { where: 'canton', tol: 300 },
    ],
    keys: [
      { zh: '1729年雍正帝设立军机处，标志着我国君主专制达到顶峰；清朝大兴文字狱。', en: 'The Grand Council set up by Yongzheng in 1729 marked the peak of autocracy; the Qing also ran literary inquisitions.' },
      { zh: '清朝实行闭关锁国，1757年只开放广州一口通商，使中国逐渐落后于世界潮流。', en: 'The Qing closed its doors and from 1757 traded only at Guangzhou, so China gradually fell behind the world.' },
      { zh: '曹雪芹著《红楼梦》，乾隆时编成《四库全书》；徽班进京后形成京剧。', en: 'Cao Xueqin wrote Dream of the Red Chamber and the Siku Quanshu was compiled under Qianlong; Peking opera grew from the Anhui troupes in Beijing.' },
    ],
  },
];
