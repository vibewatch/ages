import type { Lesson } from '../types.ts';

/** Learning-path lessons for chapter 3 (see src/shared/data/chapters.ts and docs/design/course.md). */
export const CH3: Lesson[] = [
  {
    id: 'ch3-1', book: 'g7a', unit: 3, minutes: 7,
    title: { zh: '秦朝：第一个统一的中央集权国家', en: 'Qin: the first unified centralised state' },
    blurb: { zh: '秦灭六国，建立统一的中央集权国家，统一文字、货币和度量衡，修长城、凿灵渠；暴政激起农民起义，秦朝二世而亡。', en: 'Qin conquers the six states and builds a unified, centrally ruled empire with one script, coinage and measures, a Great Wall and the Lingqu Canal; harsh rule sparks revolt and the dynasty falls in its second reign.' },
    steps: [
      {
        year: -230, at: [110, 34, 50],
        title: { zh: '秦王扫六合', en: 'Qin sweeps the six states' },
        body: { zh: '经过商鞅变法，秦国成为战国七雄中最强大的国家。从公元前230年起，秦王嬴政开始发动统一战争。', en: 'Shang Yang’s reforms had made Qin the strongest of the seven states. From 230 BCE King Zheng of Qin launched his wars of unification.' },
      },
      {
        ev: 'qin_unify', polity: 'qin',
        body: { zh: '公元前221年秦灭六国，建立我国历史上第一个统一的多民族的中央集权国家。嬴政自称“始皇帝”，中央设丞相、太尉、御史大夫，地方推行郡县制。', en: 'In 221 BCE Qin conquered the last of the six states and founded China’s first unified, multi-ethnic, centrally ruled state. King Zheng called himself the First Emperor; chancellor, grand commandant and imperial secretary served at court, and commanderies and counties ran the provinces.' },
      },
      {
        ev: 'qin_wall', polity: 'qin',
        body: { zh: '秦始皇以小篆为规范文字，统一货币和度量衡。他派蒙恬北击匈奴，并把秦、赵、燕的旧长城连接起来，修成西起临洮、东到辽东的万里长城。', en: 'The First Emperor made small seal script the standard writing and unified coins, weights and measures. He sent Meng Tian against the Xiongnu and joined the old walls of Qin, Zhao and Yan into a Great Wall from Lintao to Liaodong.' },
      },
      {
        ev: 'lingqu',
        body: { zh: '秦朝在南方开凿灵渠，沟通湘江和漓江，连接起长江和珠江两大水系，为统一岭南地区提供了保障。', en: 'In the south Qin dug the Lingqu Canal between the Xiang and Li rivers, linking the Yangtze and Pearl River systems and making the conquest of Lingnan possible.' },
      },
      {
        ev: 'terracotta',
        body: { zh: '秦始皇陵兵马俑规模宏大、形象逼真，被誉为“世界第八大奇迹”，展现了秦朝强大的国力，也反映出役使民力之重。', en: 'The vast, lifelike Terracotta Army at the First Emperor’s tomb, called the “eighth wonder of the world”, shows Qin’s power and how heavily it worked its people.' },
      },
      {
        ev: 'dazexiang',
        body: { zh: '秦朝赋税沉重、徭役繁多、刑罚严酷。公元前209年，陈胜、吴广在大泽乡起义，这是我国历史上第一次大规模农民起义。', en: 'Qin taxes were heavy, labour service endless and punishments harsh. In 209 BCE Chen Sheng and Wu Guang rose at Dazexiang, the first large peasant uprising in Chinese history.' },
      },
      {
        ev: 'julu',
        body: { zh: '项羽在巨鹿之战中“破釜沉舟”，大败秦军主力；刘邦率军攻入关中。公元前207年，秦朝灭亡。', en: 'At Julu Xiang Yu “broke the cauldrons and sank the boats” and destroyed Qin’s main army, while Liu Bang led his troops into the Guanzhong. In 207 BCE the Qin dynasty fell.' },
      },
    ],
    checks: [
      {
        q: { zh: '秦统一后规定的规范文字是？', en: 'Which script did Qin make the standard after unification?' },
        options: [{ zh: '甲骨文', en: 'Oracle-bone script' }, { zh: '小篆', en: 'Small seal script' }, { zh: '楷书', en: 'Regular script' }, { zh: '行书', en: 'Running script' }],
        answer: 1, ev: 'qin_unify',
        why: { zh: '秦始皇以小篆作为规范文字在全国推行；甲骨文属于商朝，楷书、行书出现得更晚。', en: 'The First Emperor imposed small seal script across the empire; oracle-bone script is Shang, while regular and running script came much later.' },
      },
      {
        q: { zh: '秦朝开凿灵渠，沟通了哪两大水系？', en: 'Which two river systems did the Lingqu Canal connect?' },
        options: [{ zh: '黄河与淮河', en: 'Yellow and Huai' }, { zh: '黄河与长江', en: 'Yellow and Yangtze' }, { zh: '长江与淮河', en: 'Yangtze and Huai' }, { zh: '长江与珠江', en: 'Yangtze and Pearl' }],
        answer: 3, ev: 'lingqu',
        why: { zh: '灵渠沟通湘江与漓江，湘江属长江水系，漓江属珠江水系，方便了统一岭南。', en: 'Lingqu joins the Xiang, a Yangtze tributary, to the Li, part of the Pearl system, which helped Qin take Lingnan.' },
      },
      { order: ['qin_unify', 'qin_wall', 'dazexiang', 'julu'] },
      { where: 'lingqu', tol: 400, why: { zh: '灵渠在今广西桂林兴安县，越过五岭连接南北。', en: 'Lingqu is at Xing’an near Guilin in Guangxi, crossing the southern ranges.' } },
    ],
    keys: [
      { zh: '公元前221年秦灭六国，建立我国历史上第一个统一的多民族的中央集权国家。', en: 'In 221 BCE Qin conquered the six states and founded China’s first unified, multi-ethnic, centralised state.' },
      { zh: '秦朝推行郡县制，统一文字、货币和度量衡，修筑万里长城，开凿灵渠。', en: 'Qin ruled through commanderies and counties, unified script, coins and measures, built the Great Wall and dug the Lingqu Canal.' },
      { zh: '秦朝暴政引发公元前209年陈胜、吴广起义，公元前207年秦朝灭亡。', en: 'Qin’s harsh rule led to the Chen Sheng and Wu Guang uprising of 209 BCE, and Qin fell in 207 BCE.' },
    ],
  },
  {
    id: 'ch3-2', book: 'g7a', unit: 3, minutes: 8,
    title: { zh: '西汉：巩固大一统与丝绸之路', en: 'Western Han: securing the empire and the Silk Road' },
    blurb: { zh: '刘邦建立西汉，文景之治恢复经济；汉武帝巩固大一统，张骞通西域，丝绸之路开通，西域都护设立。', en: 'Liu Bang founds the Han and Wen and Jing restore the economy; Emperor Wu secures the empire, Zhang Qian opens the Western Regions and the Silk Road, and a Protectorate is set up there.' },
    steps: [
      {
        year: -206, at: [112, 34, 45],
        title: { zh: '楚汉相争', en: 'Chu against Han' },
        body: { zh: '秦朝灭亡后，项羽和刘邦为争夺天下进行了长达四年的战争，史称“楚汉之争”。', en: 'After the Qin fell, Xiang Yu and Liu Bang fought for four years over who would rule the empire: the Chu–Han contention.' },
      },
      {
        ev: 'han_found', polity: 'whan',
        body: { zh: '公元前202年项羽在垓下战败，刘邦建立汉朝，定都长安，史称西汉。汉初吸取秦亡教训，实行休养生息政策。', en: 'Xiang Yu was beaten at Gaixia in 202 BCE and Liu Bang founded the Han with its capital at Chang’an: the Western Han. Learning from Qin’s fall, the early Han let the people recover.' },
      },
      {
        ev: 'wendi_jing', polity: 'whan',
        body: { zh: '汉文帝、汉景帝重视农业生产，减轻农民的赋税和徭役，提倡节俭，社会经济得到恢复和发展，史称“文景之治”。', en: 'Emperors Wen and Jing put farming first, lightened taxes and labour service and lived frugally. The economy recovered and grew: the Rule of Wen and Jing.' },
      },
      {
        ev: 'hanwudi', polity: 'whan',
        body: { zh: '汉武帝颁布“推恩令”削弱王国势力，采纳董仲舒的建议“罢黜百家，独尊儒术”，把铸币权和盐铁经营收归中央，派卫青、霍去病北击匈奴。', en: 'Emperor Wu issued the Edict of Grace to weaken the vassal kingdoms, followed Dong Zhongshu in making Confucianism the state teaching, took coinage and the salt and iron trade under the court, and sent Wei Qing and Huo Qubing against the Xiongnu.' },
      },
      {
        ev: 'zhangqian',
        body: { zh: '公元前138年和前119年，张骞两次出使西域，加强了中原与西域的联系。此后从长安经河西走廊、西域通往西亚和欧洲的丝绸之路开通。', en: 'Zhang Qian travelled to the Western Regions in 138 and 119 BCE, tying the Central Plains to the lands beyond. A Silk Road then ran from Chang’an through the Hexi Corridor and the Western Regions to West Asia and Europe.' },
      },
      {
        ev: 'shiji',
        body: { zh: '西汉史学家司马迁著《史记》，这是我国第一部纪传体通史，记述了从传说中的黄帝到汉武帝时期约三千年的历史。', en: 'The Western Han historian Sima Qian wrote the Records of the Grand Historian, China’s first general history told through biographies, covering some three thousand years from the legendary Yellow Emperor to Emperor Wu.' },
      },
      {
        ev: 'xiyu_duhu',
        body: { zh: '公元前60年，西汉设置西域都护，从此今新疆地区正式归属中央政权管辖，成为我国不可分割的一部分。', en: 'In 60 BCE the Western Han set up the Protectorate of the Western Regions. From then on today’s Xinjiang came under the central government and became an inseparable part of China.' },
      },
      {
        ev: 'zhaojun',
        body: { zh: '汉元帝时，王昭君远嫁匈奴呼韩邪单于。此后汉匈之间几十年没有发生战争，民族关系和睦。', en: 'Under Emperor Yuan, Wang Zhaojun married the Xiongnu chanyu Huhanye. For decades afterwards Han and Xiongnu lived in peace.' },
      },
    ],
    checks: [
      {
        q: { zh: '汉武帝为削弱王国势力而采取的措施是？', en: 'Which measure did Emperor Wu use to weaken the vassal kingdoms?' },
        options: [{ zh: '罢黜百家，独尊儒术', en: 'Making Confucianism the sole state teaching' }, { zh: '盐铁官营', en: 'A state monopoly on salt and iron' }, { zh: '颁布“推恩令”', en: 'The Edict of Grace' }, { zh: '休养生息', en: 'Letting the people recover' }],
        answer: 2, ev: 'hanwudi',
        why: { zh: '“推恩令”让诸侯王把封地分给子弟，王国越分越小，势力大为削弱；其余措施分别属于思想、经济方面或汉初政策。', en: 'The Edict of Grace made kings divide their land among all their sons, so the kingdoms shrank; the other options were measures in thought or economy, or the early Han policy.' },
      },
      {
        q: { zh: '今新疆地区正式归属中央政权管辖的标志是？', en: 'What marked the formal entry of today’s Xinjiang under the central government?' },
        options: [{ zh: '西汉设置西域都护', en: 'The Han Protectorate of the Western Regions' }, { zh: '张骞第一次出使西域', en: 'Zhang Qian’s first mission west' }, { zh: '昭君出塞', en: 'Wang Zhaojun’s marriage to the Xiongnu' }, { zh: '秦修筑万里长城', en: 'Qin’s building of the Great Wall' }],
        answer: 0, ev: 'xiyu_duhu',
        why: { zh: '公元前60年西汉设置西域都护，新疆地区从此正式归属中央；张骞出使只是加强了联系。', en: 'The Protectorate set up in 60 BCE brought Xinjiang formally under the centre; Zhang Qian’s journeys only strengthened contacts.' },
      },
      { order: ['han_found', 'zhangqian', 'xiyu_duhu', 'zhaojun'] },
      { where: 'xiyu_duhu', tol: 500, why: { zh: '西域都护的治所乌垒城在今新疆轮台一带。', en: 'The Protectorate’s seat at Wulei was near today’s Luntai in Xinjiang.' } },
    ],
    keys: [
      { zh: '公元前202年刘邦建立西汉，定都长安；汉初休养生息，出现“文景之治”。', en: 'Liu Bang founded the Western Han at Chang’an in 202 BCE; the early Han let the people recover, leading to the Rule of Wen and Jing.' },
      { zh: '汉武帝从政治、思想、经济、军事上巩固大一统：推恩令、独尊儒术、盐铁官营、北击匈奴。', en: 'Emperor Wu secured the empire politically, ideologically, economically and militarily: the Edict of Grace, Confucian orthodoxy, salt and iron monopolies and war on the Xiongnu.' },
      { zh: '张骞通西域，丝绸之路开通；公元前60年设置西域都护，新疆地区正式归属中央。', en: 'Zhang Qian opened the Western Regions and the Silk Road; from 60 BCE the Protectorate placed Xinjiang under the central government.' },
    ],
  },
  {
    id: 'ch3-3', book: 'g7a', unit: 3, minutes: 7,
    title: { zh: '东汉：兴衰与科技文化', en: 'Eastern Han: rise, fall, science and culture' },
    blurb: { zh: '刘秀建立东汉，班超经营西域，佛教传入；蔡伦改进造纸术，张衡发明地动仪；黄巾起义后东汉名存实亡。', en: 'Liu Xiu founds the Eastern Han, Ban Chao holds the Western Regions and Buddhism arrives; Cai Lun improves paper and Zhang Heng builds a seismoscope; after the Yellow Turbans the dynasty survives only in name.' },
    steps: [
      {
        year: 9, at: [111, 34, 40],
        title: { zh: '西汉的衰落', en: 'The decline of the Western Han' },
        body: { zh: '西汉后期土地兼并严重，外戚专权。公元9年外戚王莽夺取皇位，建立新朝；他的改制失败，引发绿林、赤眉起义，新朝很快灭亡。', en: 'Late in the Western Han the rich swallowed up land and consort clans held power. In 9 CE the consort-clan regent Wang Mang took the throne and founded the Xin; his reforms failed, the Lulin and Red Eyebrows rose, and Xin soon fell.' },
      },
      {
        ev: 'guangwu', polity: 'ehan',
        body: { zh: '公元25年刘秀建立东汉，定都洛阳。他整顿吏治、减轻刑罚和赋役，社会逐渐安定，史称“光武中兴”。', en: 'In 25 CE Liu Xiu founded the Eastern Han with its capital at Luoyang. He cleaned up government and eased punishments, taxes and labour service, and order returned: the Guangwu Restoration.' },
      },
      {
        ev: 'baimasi',
        body: { zh: '两汉之际，佛教经西域传入中原，东汉在洛阳修建了白马寺。东汉时期，道教也逐渐形成。', en: 'Around the turn of the era Buddhism reached the Central Plains through the Western Regions, and the Eastern Han built the White Horse Temple at Luoyang. Daoism also took shape in the Eastern Han.' },
      },
      {
        ev: 'm-donghan-73',
        body: { zh: '东汉时，班超出使西域，在那里经营多年，恢复了中原与西域的联系；他还派甘英出使大秦，到达波斯湾。', en: 'In the Eastern Han, Ban Chao went to the Western Regions and spent many years there, restoring ties with the Central Plains; he also sent Gan Ying towards Rome, and Gan Ying reached the Persian Gulf.' },
      },
      {
        ev: 'cailun',
        body: { zh: '西汉时已出现麻纸。东汉蔡伦改进造纸术，用树皮、麻头、破布和旧渔网造纸，质量好、成本低，被称为“蔡侯纸”。', en: 'Hemp paper already existed in the Western Han. Cai Lun of the Eastern Han improved papermaking with bark, hemp waste, rags and old fishing nets; his cheap, good paper was called “Marquis Cai’s paper”.' },
      },
      {
        ev: 'zhangheng',
        body: { zh: '东汉张衡发明地动仪，能测知发生地震的方位。医学家张仲景著《伤寒杂病论》，被尊为“医圣”；华佗制成麻醉药“麻沸散”，创编“五禽戏”。', en: 'Zhang Heng built a seismoscope that showed the direction of an earthquake. The physician Zhang Zhongjing wrote the Treatise on Cold Damage and is honoured as the Sage of Medicine; Hua Tuo made the anaesthetic mafeisan and devised the Five Animals exercises.' },
      },
      {
        ev: 'huangjin',
        body: { zh: '东汉后期外戚、宦官交替专权，政治黑暗。184年张角领导黄巾起义，沉重打击了东汉统治，此后地方割据，东汉名存实亡。', en: 'In the late Eastern Han consort clans and eunuchs took turns in power and government decayed. In 184 Zhang Jue led the Yellow Turban rising, which shook the dynasty; regional warlords then took over and the Han survived only in name.' },
      },
    ],
    checks: [
      {
        q: { zh: '东汉时改进造纸术的是？', en: 'Who improved papermaking in the Eastern Han?' },
        options: [{ zh: '张衡', en: 'Zhang Heng' }, { zh: '张仲景', en: 'Zhang Zhongjing' }, { zh: '华佗', en: 'Hua Tuo' }, { zh: '蔡伦', en: 'Cai Lun' }],
        answer: 3, ev: 'cailun',
        why: { zh: '蔡伦用树皮、麻头、破布、旧渔网改进造纸术；张衡发明地动仪，张仲景和华佗是医学家。', en: 'Cai Lun improved paper with bark, hemp, rags and old nets; Zhang Heng built the seismoscope, and Zhang Zhongjing and Hua Tuo were physicians.' },
      },
      {
        q: { zh: '被后世尊为“医圣”的东汉医学家是？', en: 'Which Eastern Han physician is honoured as the Sage of Medicine?' },
        options: [{ zh: '华佗', en: 'Hua Tuo' }, { zh: '张仲景', en: 'Zhang Zhongjing' }, { zh: '扁鹊', en: 'Bian Que' }, { zh: '李时珍', en: 'Li Shizhen' }],
        answer: 1, ev: 'zhangheng',
        why: { zh: '张仲景著《伤寒杂病论》，被尊为“医圣”；华佗擅长外科，扁鹊是战国名医，李时珍是明朝人。', en: 'Zhang Zhongjing wrote the Treatise on Cold Damage and is called the Sage of Medicine; Hua Tuo was a surgeon, Bian Que a Warring States doctor and Li Shizhen lived in the Ming.' },
      },
      { order: ['guangwu', 'cailun', 'zhangheng', 'huangjin'] },
      { where: 'cailun', tol: 400, why: { zh: '东汉都城洛阳是蔡伦、张衡活动的中心。', en: 'The Eastern Han capital Luoyang was where Cai Lun and Zhang Heng worked.' } },
    ],
    keys: [
      { zh: '公元25年刘秀建立东汉，定都洛阳，史称“光武中兴”；184年黄巾起义后东汉名存实亡。', en: 'Liu Xiu founded the Eastern Han at Luoyang in 25 CE, the Guangwu Restoration; after the Yellow Turbans of 184 the dynasty survived only in name.' },
      { zh: '东汉蔡伦改进造纸术，造纸术是我国古代四大发明之一；张衡发明地动仪。', en: 'Cai Lun improved papermaking, one of China’s Four Great Inventions; Zhang Heng built the seismoscope.' },
      { zh: '两汉之际佛教传入中原，东汉时道教形成；东汉班超经营西域。', en: 'Buddhism reached China around the turn of the era and Daoism formed in the Eastern Han; Ban Chao held the Western Regions for the Han.' },
    ],
  },
];
