import type { Content } from './types.ts';

/**
 * Our own chronicle events, Warring States to the Northern and Southern dynasties (403 BCE – 581 CE); see
 * docs/data/content.md. Milestones are turning points of the regime or the map (`map` when the map changes); landmarks
 * are other notable events. The Chinese title's wording decides the event kind and model (jiangshan.ts `kindOf`).
 */

type Site = readonly [zh: string, en: string, lon: number, lat: number];
type Milestone = Content['milestones'][number];
type Landmark = Content['landmarks'][number];

const m = (dyn: string, year: number, zh: string, en: string, s: Site, map?: true): Milestone => ({
  id: `m-${dyn}-${year}`, dyn, year, title: { zh, en }, site: { zh: s[0], en: s[1] }, lon: s[2], lat: s[3], ...(map ? { map } : {}),
});
const l = (dyn: string, n: number, year: number, zh: string, en: string, s: Site): Landmark => ({
  id: `l-${dyn}-${n}`, dyn, year, title: { zh, en }, site: { zh: s[0], en: s[1] }, lon: s[2], lat: s[3],
});
const site = (zh: string, en: string, lon: number, lat: number): Site => [zh, en, lon, lat];

// ------------------------------------------------------------------ recurring sites (modern coordinates)

const LUOYI = site('洛邑（今河南洛阳）', 'Luoyi (modern Luoyang, Henan)', 112.45, 34.67);
const LINZI = site('临淄（今山东淄博）', 'Linzi (modern Zibo, Shandong)', 118.35, 36.85);
const XINZHENG = site('新郑（今河南新郑）', 'Xinzheng (modern Xinzheng, Henan)', 113.74, 34.40);
const XIANYANG = site('咸阳（今陕西咸阳）', 'Xianyang (modern Xianyang, Shaanxi)', 108.71, 34.33);
const HANDAN = site('邯郸（今河北邯郸）', 'Handan (modern Handan, Hebei)', 114.49, 36.61);
const YING = site('郢（今湖北荆州）', 'Ying (modern Jingzhou, Hubei)', 112.17, 30.43);
const SHOUCHUN = site('寿春（今安徽寿县）', 'Shouchun (modern Shou County, Anhui)', 116.78, 32.57);
const CHENGDU = site('成都（今四川成都）', 'Chengdu (modern Chengdu, Sichuan)', 104.07, 30.67);
const PENGCHENG = site('彭城（今江苏徐州）', 'Pengcheng (modern Xuzhou, Jiangsu)', 117.18, 34.26);
const DINGTAO = site('定陶（今山东菏泽定陶）', 'Dingtao (modern Dingtao, Heze, Shandong)', 115.57, 35.07);
const JIUYUAN = site('九原（今内蒙古包头）', 'Jiuyuan (modern Baotou, Inner Mongolia)', 109.84, 40.65);
const CHANGAN = site('长安（今陕西西安）', 'Chang’an (modern Xi’an, Shaanxi)', 108.88, 34.30);
const PANYU = site('番禺（今广东广州）', 'Panyu (modern Guangzhou, Guangdong)', 113.26, 23.13);
const LUOYANG = site('洛阳（今河南洛阳东）', 'Luoyang (east of modern Luoyang, Henan)', 112.62, 34.72);
const JULU = site('巨鹿（今河北平乡）', 'Julu (modern Pingxiang, Hebei)', 115.03, 37.06);
const XU = site('许（今河南许昌）', 'Xu (modern Xuchang, Henan)', 113.82, 34.03);
const YE = site('邺（今河北临漳）', 'Ye (modern Linzhang, Hebei)', 114.40, 36.33);
const JIANGLING = site('江陵（今湖北荆州）', 'Jiangling (modern Jingzhou, Hubei)', 112.24, 30.33);
const QIUCI = site('龟兹（今新疆库车）', 'Qiuci (modern Kuqa, Xinjiang)', 82.96, 41.72);
const JIANYE = site('建业（今江苏南京）', 'Jianye (modern Nanjing, Jiangsu)', 118.78, 32.06);
const JIANKANG = site('建康（今江苏南京）', 'Jiankang (modern Nanjing, Jiangsu)', 118.78, 32.06);
const WUCHANG = site('武昌（今湖北鄂州）', 'Wuchang (modern Ezhou, Hubei)', 114.89, 30.39);
const GUZANG = site('姑臧（今甘肃武威）', 'Guzang (modern Wuwei, Gansu)', 102.64, 37.93);
const XIANGPING = site('襄平（今辽宁辽阳）', 'Xiangping (modern Liaoyang, Liaoning)', 123.17, 41.27);
const JINGKOU = site('京口（今江苏镇江）', 'Jingkou (modern Zhenjiang, Jiangsu)', 119.45, 32.20);
const PINGCHENG = site('平城（今山西大同）', 'Pingcheng (modern Datong, Shanxi)', 113.30, 40.08);
const LONGCHENG = site('龙城（今辽宁朝阳）', 'Longcheng (modern Chaoyang, Liaoning)', 120.45, 41.57);
const MOBEI = site('漠北（今蒙古国）', 'north of the Gobi (modern Mongolia)', 103.0, 46.5);

// ------------------------------------------------------------------ milestones

export const MILESTONES_EARLY: Content['milestones'] = [
  // 战国
  m('zhanguo', -403, '周威烈王册命韩、赵、魏三家为诸侯，晋国三分', 'King Weilie of Zhou makes the houses of Han, Zhao and Wei feudal lords; Jin is split three ways', LUOYI, true),
  m('zhanguo', -386, '周安王承认田和为齐侯，田氏取代姜姓统治齐国', 'King An of Zhou recognises Tian He as lord of Qi; the Tian clan replaces the house of Jiang', LINZI),
  m('zhanguo', -376, '韩、赵、魏废黜晋静公，瓜分晋国剩余土地', 'Han, Zhao and Wei depose Duke Jing of Jin and divide what was left of Jin', site('绛（今山西侯马）', 'Jiang (modern Houma, Shanxi)', 111.37, 35.62), true),
  m('zhanguo', -375, '韩国攻灭郑国，迁都新郑', 'Han conquers Zheng and moves its capital to Xinzheng', XINZHENG, true),
  m('zhanguo', -350, '秦孝公迁都咸阳，商鞅推行第二次变法', 'Duke Xiao of Qin moves the capital to Xianyang; Shang Yang’s second round of reforms', XIANYANG),
  m('zhanguo', -316, '秦将司马错攻灭巴、蜀，秦得天府之地', 'The Qin general Sima Cuo conquers Ba and Shu, giving Qin the Sichuan basin', CHENGDU, true),
  m('zhanguo', -296, '赵武灵王攻灭中山国', 'King Wuling of Zhao conquers the state of Zhongshan', site('灵寿（今河北平山）', 'Lingshou (modern Pingshan, Hebei)', 114.20, 38.30), true),
  m('zhanguo', -286, '齐湣王攻灭宋国', 'King Min of Qi conquers the state of Song', site('睢阳（今河南商丘）', 'Suiyang (modern Shangqiu, Henan)', 115.65, 34.41), true),
  m('zhanguo', -284, '乐毅统率燕、秦等五国联军攻破齐都临淄', 'Yue Yi leads Yan, Qin and three other states against Qi and takes its capital Linzi', LINZI, true),
  m('zhanguo', -278, '秦将白起攻破楚都郢，楚东迁陈城', 'The Qin general Bai Qi takes Ying, the Chu capital; Chu moves east to Chen', YING, true),
  m('zhanguo', -256, '秦攻灭西周国，周赧王去世，周室名存实亡', 'Qin conquers the Western Zhou principality; King Nan dies and the Zhou royal line ends in all but name', LUOYI, true),
  m('zhanguo', -249, '楚考烈王攻灭鲁国', 'King Kaolie of Chu conquers the state of Lu', site('曲阜（今山东曲阜）', 'Qufu (modern Qufu, Shandong)', 116.99, 35.58), true),
  m('zhanguo', -230, '秦王嬴政攻灭韩国，设颍川郡', 'Ying Zheng, King of Qin, conquers Han and makes it the commandery of Yingchuan', XINZHENG, true),
  m('zhanguo', -228, '秦军攻破邯郸，俘赵王迁', 'Qin takes Handan and captures Qian, King of Zhao', HANDAN, true),
  m('zhanguo', -225, '秦将王贲引河水灌大梁，魏国灭亡', 'The Qin general Wang Ben floods Daliang with river water and Wei falls', site('大梁（今河南开封）', 'Daliang (modern Kaifeng, Henan)', 114.31, 34.80), true),
  m('zhanguo', -223, '秦将王翦攻灭楚国', 'The Qin general Wang Jian conquers Chu', SHOUCHUN, true),
  m('zhanguo', -222, '秦军攻入辽东俘燕王喜，燕、代相继灭亡', 'Qin captures Xi, King of Yan, in Liaodong; Yan and Dai fall', XIANGPING, true),

  // 秦
  m('qin', -221, '秦灭齐国，嬴政统一六国，自称始皇帝', 'Qin conquers Qi, the last of the six states; Ying Zheng unifies China and takes the title First Emperor', LINZI, true),
  m('qin', -215, '蒙恬率三十万大军征讨匈奴，收取河南地', 'Meng Tian leads 300,000 men against the Xiongnu and takes the land south of the Yellow River bend', site('河南地（今内蒙古鄂尔多斯）', 'the land within the river bend (modern Ordos, Inner Mongolia)', 109.78, 39.61), true),
  m('qin', -214, '秦军平定岭南，设桂林、南海、象郡', 'Qin conquers the far south and sets up the commanderies of Guilin, Nanhai and Xiang', PANYU, true),
  m('qin', -210, '秦始皇死于沙丘，赵高、李斯矫诏立胡亥', 'The First Emperor dies at Shaqiu; Zhao Gao and Li Si forge his will to enthrone Huhai', site('沙丘（今河北广宗）', 'Shaqiu (modern Guangzong, Hebei)', 115.15, 37.07)),
  m('qin', -209, '陈胜、吴广在大泽乡起兵反秦', 'Chen Sheng and Wu Guang rise against Qin at Dazexiang', site('大泽乡（今安徽宿州）', 'Dazexiang (modern Suzhou, Anhui)', 117.20, 33.50)),
  m('qin', -207, '项羽破釜沉舟，在巨鹿之战大破秦军主力', 'Xiang Yu burns his boats and crushes the main Qin army at Julu', JULU),
  m('qin', -206, '刘邦进入咸阳，秦王子婴出降，秦朝灭亡', 'Liu Bang enters Xianyang; Ziying, King of Qin, surrenders and the Qin dynasty ends', XIANYANG, true),

  // 西汉（含新莽）
  m('xihan', -202, '刘邦在定陶称帝，建立汉朝', 'Liu Bang proclaims himself emperor at Dingtao, founding the Han dynasty', DINGTAO, true),
  m('xihan', -200, '刘邦定都长安，萧何主持营建宫室', 'Liu Bang makes Chang’an his capital, with Xiao He building the palaces', CHANGAN),
  m('xihan', -180, '周勃、陈平诛灭诸吕，迎立汉文帝', 'Zhou Bo and Chen Ping destroy the Lü clan and enthrone Emperor Wen', CHANGAN),
  m('xihan', -154, '吴王刘濞联合七国起兵叛乱，周亚夫三月平定', 'Liu Pi, King of Wu, leads seven kingdoms in revolt; Zhou Yafu crushes them in three months', site('广陵（今江苏扬州）', 'Guangling (modern Yangzhou, Jiangsu)', 119.42, 32.39)),
  m('xihan', -127, '卫青击败匈奴，收复河南地，汉设朔方郡', 'Wei Qing defeats the Xiongnu and retakes the land within the river bend; Han sets up the commandery of Shuofang', site('朔方（今内蒙古鄂尔多斯西北）', 'Shuofang (northwest of modern Ordos, Inner Mongolia)', 107.60, 40.30), true),
  m('xihan', -121, '霍去病两次西征河西，匈奴浑邪王降汉', 'Huo Qubing strikes twice into the Hexi corridor; the Xiongnu King Hunye surrenders to Han', site('河西（今甘肃张掖）', 'Hexi (modern Zhangye, Gansu)', 100.45, 38.93), true),
  m('xihan', -111, '汉武帝攻灭南越，设南海等九郡', 'Emperor Wu conquers Nanyue and sets up Nanhai and eight other commanderies', PANYU, true),
  m('xihan', -109, '汉军兵临滇国，滇王归降，汉设益州郡', 'Han troops reach Dian; the King of Dian submits and Han sets up the commandery of Yizhou', site('滇池（今云南晋宁）', 'Lake Dian (modern Jinning, Yunnan)', 102.60, 24.67), true),
  m('xihan', -108, '汉武帝攻灭卫氏朝鲜，设乐浪等四郡', 'Emperor Wu conquers Wiman Joseon and sets up Lelang and three other commanderies', site('王险城（今朝鲜平壤）', 'Wangxian (modern Pyongyang)', 125.75, 39.03), true),
  m('xihan', -60, '汉宣帝设西域都护府，郑吉为首任都护', 'Emperor Xuan sets up the Protectorate of the Western Regions, with Zheng Ji as first Protector', site('乌垒（今新疆轮台）', 'Wulei (modern Luntai, Xinjiang)', 84.25, 41.78), true),
  m('xihan', 9, '王莽代汉称帝，改国号为新', 'Wang Mang takes the throne from Han and names his dynasty Xin', CHANGAN),
  m('xihan', 23, '绿林军攻入长安，王莽被杀，新朝灭亡', 'The Lülin army storms Chang’an; Wang Mang is killed and the Xin dynasty ends', CHANGAN, true),

  // 东汉
  m('donghan', 25, '刘秀在鄗城即位称帝，建立东汉', 'Liu Xiu proclaims himself emperor at Hao, founding the Eastern Han', site('鄗（今河北柏乡）', 'Hao (modern Baixiang, Hebei)', 114.63, 37.55)),
  m('donghan', 36, '吴汉攻破成都，公孙述败亡，东汉统一全国', 'Wu Han takes Chengdu; Gongsun Shu dies and the Eastern Han reunites the country', CHENGDU, true),
  m('donghan', 48, '匈奴分裂为南北两部，南匈奴归附东汉', 'The Xiongnu split into north and south; the Southern Xiongnu submit to the Eastern Han', site('五原塞（今内蒙古包头）', 'Wuyuan frontier (modern Baotou, Inner Mongolia)', 109.80, 40.60), true),
  m('donghan', 73, '班超出使西域，在鄯善斩杀匈奴使者', 'Ban Chao goes on a mission to the Western Regions and kills the Xiongnu envoys at Shanshan', site('鄯善（今新疆若羌）', 'Shanshan (modern Ruoqiang, Xinjiang)', 88.17, 39.02)),
  m('donghan', 91, '东汉重设西域都护，以班超为都护', 'The Eastern Han restores the Protectorate of the Western Regions, with Ban Chao as Protector', QIUCI, true),
  m('donghan', 184, '张角以太平道发动黄巾起义，攻掠州郡', 'Zhang Jiao leads the Way of Great Peace in the Yellow Turban rising, attacking provinces and commanderies', JULU),
  m('donghan', 189, '董卓率兵入洛阳，废少帝，立汉献帝', 'Dong Zhuo marches into Luoyang, deposes the young emperor and enthrones Emperor Xian', LUOYANG),
  m('donghan', 190, '董卓焚毁洛阳，挟汉献帝迁都长安', 'Dong Zhuo burns Luoyang and moves the court of Emperor Xian to Chang’an', CHANGAN),
  m('donghan', 196, '曹操迎汉献帝迁都许县，挟天子以令诸侯', 'Cao Cao brings Emperor Xian to Xu and makes it the capital, ruling in the emperor’s name', XU),
  m('donghan', 200, '官渡之战，曹操以少胜多击败袁绍', 'At Guandu, Cao Cao defeats the larger army of Yuan Shao', site('官渡（今河南中牟）', 'Guandu (modern Zhongmou, Henan)', 114.00, 34.75), true),
  m('donghan', 208, '赤壁之战，孙权、刘备联军火攻大败曹操', 'At the Red Cliffs, the allied armies of Sun Quan and Liu Bei rout Cao Cao with fire', site('赤壁（今湖北赤壁）', 'Chibi (modern Chibi, Hubei)', 113.65, 29.87), true),
  m('donghan', 214, '刘备攻取益州，刘璋出降', 'Liu Bei takes Yi province; Liu Zhang surrenders at Chengdu', CHENGDU, true),
  m('donghan', 219, '吕蒙白衣渡江攻取荆州，关羽兵败被杀', 'Lü Meng crosses the river in disguise and takes Jing province; Guan Yu is defeated and killed', JIANGLING, true),

  // 三国
  m('sanguo', 220, '曹丕代汉称帝，建立魏国，东汉结束', 'Cao Pi takes the throne from Han and founds Wei; the Eastern Han ends', LUOYANG, true),
  m('sanguo', 221, '刘备在成都称帝，国号汉，史称蜀汉', 'Liu Bei proclaims himself emperor of Han at Chengdu; history calls his state Shu Han', CHENGDU),
  m('sanguo', 229, '孙权称帝，迁都建业，三国鼎立正式形成', 'Sun Quan proclaims himself emperor and moves to Jianye; the Three Kingdoms stand complete', JIANYE),
  m('sanguo', 249, '司马懿发动高平陵之变，掌握曹魏大权', 'Sima Yi stages the Gaopingling coup and seizes power in Wei', LUOYANG),
  m('sanguo', 263, '魏将邓艾、钟会伐蜀，刘禅出降，蜀汉灭亡', 'The Wei generals Deng Ai and Zhong Hui invade Shu; Liu Shan surrenders and Shu Han falls', CHENGDU, true),
  m('sanguo', 265, '司马炎代魏称帝，建立西晋', 'Sima Yan takes the throne from Wei and founds the Jin dynasty', LUOYANG, true),

  // 西晋
  m('xijin', 280, '西晋攻灭东吴，孙皓出降，全国重归统一', 'Jin conquers Wu; Sun Hao surrenders and the country is reunited', JIANYE, true),
  m('xijin', 291, '八王之乱爆发，宗室诸王相互攻杀', 'The War of the Eight Princes begins as the imperial princes attack one another', LUOYANG),
  m('xijin', 304, '匈奴人刘渊在左国城起兵称汉王，十六国时期开始', 'The Xiongnu leader Liu Yuan rises at Zuoguo and calls himself King of Han; the Sixteen Kingdoms begin', site('左国城（今山西离石）', 'Zuoguo (modern Lishi, Shanxi)', 111.13, 37.52), true),
  m('xijin', 311, '永嘉之乱，刘曜、石勒等攻陷洛阳，俘晋怀帝', 'The Yongjia disaster: Liu Yao and Shi Le take Luoyang and capture Emperor Huai', LUOYANG, true),
  m('xijin', 316, '刘曜攻陷长安，晋愍帝出降，西晋灭亡', 'Liu Yao takes Chang’an; Emperor Min surrenders and the Western Jin ends', CHANGAN, true),

  // 东晋（含十六国）
  m('dongjin', 317, '司马睿在建康即晋王位，东晋建立', 'Sima Rui takes the title King of Jin at Jiankang, founding the Eastern Jin', JIANKANG, true),
  m('dongjin', 319, '石勒在襄国称赵王，建立后赵', 'Shi Le declares himself King of Zhao at Xiangguo, founding the Later Zhao', site('襄国（今河北邢台）', 'Xiangguo (modern Xingtai, Hebei)', 114.50, 37.07), true),
  m('dongjin', 329, '后赵攻灭前赵，统一北方大部', 'The Later Zhao conquers the Former Zhao and holds most of the north', site('上邽（今甘肃天水）', 'Shanggui (modern Tianshui, Gansu)', 105.72, 34.58), true),
  m('dongjin', 347, '桓温西征攻灭成汉', 'Huan Wen marches west and conquers Cheng Han', CHENGDU, true),
  m('dongjin', 350, '冉闵夺取后赵政权，建立冉魏', 'Ran Min seizes the Later Zhao state and founds Ran Wei', YE, true),
  m('dongjin', 351, '苻健在长安称天王，建立前秦', 'Fu Jian (the elder) proclaims himself Heavenly King at Chang’an, founding the Former Qin', CHANGAN, true),
  m('dongjin', 370, '前秦王猛攻灭前燕', 'Wang Meng of the Former Qin conquers the Former Yan', YE, true),
  m('dongjin', 376, '前秦攻灭前凉与代国，统一北方', 'The Former Qin conquers the Former Liang and Dai and unifies the north', GUZANG, true),
  m('dongjin', 383, '淝水之战，谢安、谢玄指挥晋军大败前秦苻坚', 'At the Fei River, Jin forces under Xie An and Xie Xuan rout Fu Jian of the Former Qin', site('淝水（今安徽寿县）', 'Fei River (modern Shou County, Anhui)', 116.80, 32.62)),
  m('dongjin', 384, '慕容垂、姚苌相继自立，前秦瓦解', 'Murong Chui and Yao Chang break away in turn and the Former Qin falls apart', CHANGAN, true),
  m('dongjin', 386, '拓跋珪即代王位，不久改称魏王，北魏建立', 'Tuoba Gui becomes King of Dai, soon renamed Wei: the Northern Wei is founded', site('盛乐（今内蒙古和林格尔）', 'Shengle (modern Horinger, Inner Mongolia)', 111.85, 40.40), true),
  m('dongjin', 398, '北魏迁都平城，拓跋珪称帝', 'The Northern Wei moves its capital to Pingcheng and Tuoba Gui proclaims himself emperor', PINGCHENG),
  m('dongjin', 403, '桓玄篡晋称帝，国号楚', 'Huan Xuan usurps the Jin throne and names his state Chu', JIANKANG),
  m('dongjin', 407, '赫连勃勃建立大夏', 'Helian Bobo founds the state of Xia', site('统万城（今陕西靖边）', 'Tongwan (modern Jingbian, Shaanxi)', 108.85, 37.99), true),
  m('dongjin', 410, '刘裕北伐攻灭南燕', 'Liu Yu marches north and conquers the Southern Yan', site('广固（今山东青州）', 'Guanggu (modern Qingzhou, Shandong)', 118.47, 36.70), true),
  m('dongjin', 417, '刘裕攻入长安，后秦灭亡', 'Liu Yu takes Chang’an and the Later Qin falls', CHANGAN, true),

  // 南北朝
  m('nanbei', 420, '刘裕代晋称帝，建立宋，南朝开始', 'Liu Yu takes the throne from Jin and founds the Song; the Southern dynasties begin', JIANKANG, true),
  m('nanbei', 436, '北魏攻灭北燕', 'The Northern Wei conquers the Northern Yan', LONGCHENG, true),
  m('nanbei', 439, '北魏太武帝攻灭北凉，统一北方', 'Emperor Taiwu of the Northern Wei conquers the Northern Liang and unifies the north', GUZANG, true),
  m('nanbei', 479, '萧道成代宋称帝，建立齐', 'Xiao Daocheng takes the throne from Song and founds the Qi', JIANKANG),
  m('nanbei', 485, '北魏孝文帝颁布均田令，推行均田制', 'Emperor Xiaowen of the Northern Wei issues the equal-field edict', PINGCHENG),
  m('nanbei', 494, '北魏孝文帝迁都洛阳，推行汉化', 'Emperor Xiaowen moves the Northern Wei capital to Luoyang and turns to Han ways', LUOYANG),
  m('nanbei', 502, '萧衍代齐称帝，建立梁', 'Xiao Yan takes the throne from Qi and founds the Liang', JIANKANG),
  m('nanbei', 523, '北方六镇军民起兵反魏', 'Soldiers and settlers of the six northern garrisons rise against the Northern Wei', site('沃野镇（今内蒙古五原）', 'Woye garrison (modern Wuyuan, Inner Mongolia)', 108.27, 41.09)),
  m('nanbei', 534, '北魏分裂，高欢立孝静帝迁都邺城，东魏建立', 'The Northern Wei splits: Gao Huan enthrones Emperor Xiaojing at Ye, founding the Eastern Wei', YE, true),
  m('nanbei', 535, '宇文泰在长安立元宝炬为帝，西魏建立', 'Yuwen Tai enthrones Yuan Baoju at Chang’an, founding the Western Wei', CHANGAN, true),
  m('nanbei', 548, '侯景起兵叛梁，次年攻破建康', 'Hou Jing revolts against Liang and takes Jiankang the next year', JIANKANG),
  m('nanbei', 550, '高洋代东魏称帝，建立北齐', 'Gao Yang takes the throne from the Eastern Wei and founds the Northern Qi', YE),
  m('nanbei', 554, '西魏攻破江陵，梁元帝被杀', 'The Western Wei takes Jiangling and Emperor Yuan of Liang is killed', JIANGLING, true),
  m('nanbei', 557, '陈霸先代梁称帝，建立陈', 'Chen Baxian takes the throne from Liang and founds the Chen', JIANKANG),
  m('nanbei', 577, '北周武帝攻灭北齐，统一北方', 'Emperor Wu of the Northern Zhou conquers the Northern Qi and unifies the north', YE, true),
];

// ------------------------------------------------------------------ landmarks

export const LANDMARKS_EARLY: Content['landmarks'] = [
  // 战国
  l('zhanguo', 1, -382, '楚悼王任用吴起变法', 'King Dao of Chu has Wu Qi reform the state', YING),
  l('zhanguo', 2, -356, '秦孝公任用商鞅，开始变法', 'Duke Xiao of Qin puts Shang Yang in charge and the reforms begin', site('栎阳（今陕西西安阎良）', 'Yueyang (modern Yanliang, Xi’an, Shaanxi)', 109.23, 34.66)),
  l('zhanguo', 3, -355, '韩昭侯任用申不害改革政治', 'Marquis Zhao of Han has Shen Buhai reform the government', XINZHENG),
  l('zhanguo', 4, -353, '桂陵之战，齐将田忌、孙膑围魏救赵', 'At Guiling, Tian Ji and Sun Bin of Qi save Zhao by marching on Wei', site('桂陵（今河南长垣）', 'Guiling (modern Changyuan, Henan)', 114.67, 35.20)),
  l('zhanguo', 5, -341, '马陵之战，孙膑设伏大败魏军，庞涓自杀', 'At Maling, Sun Bin ambushes and routs the Wei army; Pang Juan kills himself', site('马陵（今河南范县）', 'Maling (modern Fan County, Henan)', 115.50, 35.85)),
  l('zhanguo', 6, -334, '齐、魏两国君主在徐州会盟，互尊为王', 'The rulers of Qi and Wei meet at Xuzhou and recognise each other as kings', site('徐州（今山东滕州）', 'Xuzhou (modern Tengzhou, Shandong)', 117.16, 35.08)),
  l('zhanguo', 7, -325, '秦惠文君称王', 'Lord Huiwen of Qin takes the title of king', XIANYANG),
  l('zhanguo', 8, -319, '齐宣王广招学者，稷下学宫盛极一时', 'King Xuan of Qi gathers scholars and the Jixia Academy flourishes', LINZI),
  l('zhanguo', 9, -318, '魏、赵、韩、燕、楚五国合纵攻秦，败于函谷关', 'Wei, Zhao, Han, Yan and Chu attack Qin together and are beaten at the Hangu Pass', site('函谷关（今河南灵宝）', 'Hangu Pass (modern Lingbao, Henan)', 110.87, 34.63)),
  l('zhanguo', 10, -314, '齐宣王乘燕国内乱伐燕', 'King Xuan of Qi invades Yan during its civil strife', site('蓟（今北京）', 'Ji (modern Beijing)', 116.40, 39.90)),
  l('zhanguo', 11, -312, '秦军在丹阳击败楚军，夺取汉中', 'Qin routs Chu at Danyang and takes Hanzhong', site('丹阳（今河南淅川）', 'Danyang (modern Xichuan, Henan)', 111.49, 33.14)),
  l('zhanguo', 12, -307, '赵武灵王推行胡服骑射', 'King Wuling of Zhao has his army adopt nomad dress and mounted archery', HANDAN),
  l('zhanguo', 13, -299, '楚怀王应约入秦，被扣留于武关', 'King Huai of Chu goes to meet the King of Qin and is held at the Wu Pass', site('武关（今陕西丹凤）', 'Wu Pass (modern Danfeng, Shaanxi)', 110.73, 33.70)),
  l('zhanguo', 14, -293, '伊阙之战，白起大破韩、魏联军', 'At Yique, Bai Qi crushes the allied armies of Han and Wei', site('伊阙（今河南洛阳龙门）', 'Yique (modern Longmen, Luoyang, Henan)', 112.47, 34.56)),
  l('zhanguo', 15, -279, '田单以火牛阵反攻燕军，收复齐国失地', 'Tian Dan counter-attacks the Yan army with fire-tailed oxen and wins back Qi', site('即墨（今山东平度）', 'Jimo (modern Pingdu, Shandong)', 119.96, 36.62)),
  l('zhanguo', 16, -279, '秦、赵两王在渑池会盟，蔺相如护主有功', 'The kings of Qin and Zhao meet at Mianchi, where Lin Xiangru stands up for his lord', site('渑池（今河南渑池）', 'Mianchi (modern Mianchi, Henan)', 111.76, 34.77)),
  l('zhanguo', 17, -278, '屈原自沉汨罗江，其《离骚》等诗篇传世', 'Qu Yuan drowns himself in the Miluo; his Li Sao and other poems live on', site('汨罗（今湖南汨罗）', 'Miluo (modern Miluo, Hunan)', 113.07, 28.80)),
  l('zhanguo', 18, -270, '阏与之战，赵奢击败秦军', 'At Yuyu, Zhao She defeats the Qin army', site('阏与（今山西和顺）', 'Yuyu (modern Heshun, Shanxi)', 113.57, 37.33)),
  l('zhanguo', 19, -260, '长平之战，白起大败赵括，赵军四十万被坑杀', 'At Changping, Bai Qi destroys Zhao Kuo’s army; some 400,000 Zhao soldiers are put to death', site('长平（今山西高平）', 'Changping (modern Gaoping, Shanxi)', 112.90, 35.79)),
  l('zhanguo', 20, -257, '邯郸之战，信陵君窃符救赵，秦军败退', 'Battle of Handan: Lord Xinling steals the tally to save Zhao and Qin falls back', HANDAN),
  l('zhanguo', 21, -256, '蜀郡守李冰主持修建都江堰', 'Li Bing, governor of Shu, builds the Dujiangyan irrigation works', site('湔堋（今四川都江堰）', 'Jianpeng (modern Dujiangyan, Sichuan)', 103.62, 31.00)),
  l('zhanguo', 22, -246, '秦国采用韩国水工郑国之策，开凿郑国渠', 'Qin starts digging the Zhengguo Canal, planned by Zheng Guo, a hydraulic engineer from Han', site('泾阳（今陕西泾阳）', 'Jingyang (modern Jingyang, Shaanxi)', 108.84, 34.53)),
  l('zhanguo', 23, -241, '楚、赵等五国最后一次合纵攻秦，失败后楚迁都寿春', 'Chu, Zhao and three others join against Qin for the last time; after the defeat Chu moves to Shouchun', SHOUCHUN),
  l('zhanguo', 24, -239, '吕不韦主持编成《吕氏春秋》', 'Lü Buwei has his retainers compile the Lüshi Chunqiu', XIANYANG),
  l('zhanguo', 25, -238, '嬴政亲政，平定嫪毐之乱', 'Ying Zheng takes personal rule and puts down Lao Ai’s revolt', site('雍（今陕西凤翔）', 'Yong (modern Fengxiang, Shaanxi)', 107.39, 34.52)),
  l('zhanguo', 26, -237, '李斯上《谏逐客书》，秦王收回逐客令', 'Li Si’s Memorial against Expelling Guest Officials makes the King of Qin withdraw his order', XIANYANG),
  l('zhanguo', 27, -233, '韩非出使秦国，遭李斯等陷害死于狱中，其书《韩非子》传世', 'Han Fei goes to Qin as envoy and dies in prison after Li Si turns the king against him; his book survives', site('云阳（今陕西淳化）', 'Yunyang (modern Chunhua, Shaanxi)', 108.58, 34.79)),
  l('zhanguo', 28, -227, '荆轲受燕太子丹之托行刺秦王，未成被杀', 'Jing Ke, sent by Crown Prince Dan of Yan, tries to kill the King of Qin and dies', XIANYANG),

  // 秦
  l('qin', 1, -221, '推行郡县制，统一文字、度量衡和货币', 'The empire is run through commanderies and counties; script, weights, measures and coinage are unified', XIANYANG),
  l('qin', 2, -220, '修筑以咸阳为中心通往各地的驰道', 'Imperial highways are built radiating from Xianyang', XIANYANG),
  l('qin', 3, -219, '秦始皇东巡，登泰山封禅刻石', 'The First Emperor tours the east and performs the feng and shan rites on Mount Tai', site('泰山（今山东泰安）', 'Mount Tai (modern Tai’an, Shandong)', 117.10, 36.25)),
  l('qin', 4, -214, '史禄主持开凿灵渠，沟通湘江与漓江', 'Shi Lu digs the Lingqu Canal, linking the Xiang and Li rivers', site('灵渠（今广西兴安）', 'Lingqu (modern Xing’an, Guangxi)', 110.67, 25.61)),
  l('qin', 5, -214, '蒙恬连接秦、赵、燕旧城墙，筑成万里长城', 'Meng Tian links the old walls of Qin, Zhao and Yan into the Great Wall', JIUYUAN),
  l('qin', 6, -213, '秦始皇采纳李斯建议，焚毁《诗》《书》和百家著作', 'On Li Si’s advice the First Emperor burns the Odes, the Documents and the works of the hundred schools', XIANYANG),
  l('qin', 7, -212, '秦始皇在咸阳坑杀方士儒生四百余人', 'The First Emperor has more than 400 scholars and magicians buried at Xianyang', XIANYANG),
  l('qin', 8, -212, '蒙恬修筑自九原直达云阳的直道', 'Meng Tian builds the Straight Road from Jiuyuan to Yunyang', JIUYUAN),
  l('qin', 9, -209, '陈胜在陈县称王，国号张楚', 'Chen Sheng makes himself king at Chen, naming his state Zhangchu', site('陈（今河南淮阳）', 'Chen (modern Huaiyang, Henan)', 114.88, 33.73)),
  l('qin', 10, -209, '刘邦在沛县起兵反秦', 'Liu Bang rises against Qin at Pei', site('沛（今江苏沛县）', 'Pei (modern Pei County, Jiangsu)', 116.94, 34.72)),
  l('qin', 11, -209, '项梁、项羽在吴中起兵反秦', 'Xiang Liang and Xiang Yu rise against Qin at Wu', site('吴（今江苏苏州）', 'Wu (modern Suzhou, Jiangsu)', 120.62, 31.32)),
  l('qin', 12, -208, '赵高诬陷李斯谋反，李斯被腰斩于咸阳', 'Zhao Gao falsely accuses Li Si of treason and Li Si is cut in two at Xianyang', XIANYANG),
  l('qin', 13, -208, '项梁拥立楚怀王之孙熊心为楚王', 'Xiang Liang enthrones Xiong Xin, grandson of King Huai, as King of Chu', site('盱眙（今江苏盱眙）', 'Xuyi (modern Xuyi, Jiangsu)', 118.54, 33.00)),
  l('qin', 14, -208, '章邯在定陶击败项梁，项梁战死', 'Zhang Han defeats Xiang Liang at Dingtao and Xiang Liang falls', DINGTAO),
  l('qin', 15, -207, '赵高逼杀秦二世，改立子婴', 'Zhao Gao forces the Second Emperor to his death and puts Ziying in his place', XIANYANG),
  l('qin', 16, -206, '鸿门宴上项羽放走刘邦', 'At the feast of Hongmen, Xiang Yu lets Liu Bang slip away', site('鸿门（今陕西西安临潼）', 'Hongmen (modern Lintong, Xi’an, Shaanxi)', 109.27, 34.37)),
  l('qin', 17, -206, '项羽分封十八诸侯，自立为西楚霸王，都彭城', 'Xiang Yu parcels the empire among eighteen kings and rules from Pengcheng as Hegemon-King of Western Chu', PENGCHENG),
  l('qin', 18, -205, '彭城之战，项羽以三万骑兵大破刘邦', 'At Pengcheng, Xiang Yu’s 30,000 horsemen rout Liu Bang', PENGCHENG),
  l('qin', 19, -204, '井陉之战，韩信背水列阵破赵', 'At Jingxing, Han Xin fights with a river at his back and destroys Zhao', site('井陉（今河北井陉）', 'Jingxing (modern Jingxing, Hebei)', 114.15, 38.03)),
  l('qin', 20, -203, '楚汉以鸿沟为界议和，中分天下', 'Chu and Han make peace along the Honggou canal, splitting the realm', site('鸿沟（今河南荥阳）', 'Honggou (modern Xingyang, Henan)', 113.38, 34.79)),

  // 西汉（含新莽）
  l('xihan', 1, -202, '垓下之战，汉军围困项羽，项羽自刎乌江', 'At Gaixia, Han surrounds Xiang Yu, who takes his own life by the Wu River', site('垓下（今安徽灵璧）', 'Gaixia (modern Lingbi, Anhui)', 117.70, 33.42)),
  l('xihan', 2, -200, '刘邦亲征匈奴，被冒顿单于围困于白登', 'Liu Bang marches against the Xiongnu and is surrounded by Modu Chanyu at Baideng', site('白登（今山西大同）', 'Baideng (modern Datong, Shanxi)', 113.30, 40.10)),
  l('xihan', 3, -198, '刘敬出使匈奴，汉匈和亲', 'Liu Jing goes to the Xiongnu and a marriage alliance is made', CHANGAN),
  l('xihan', 4, -196, '陆贾出使南越，赵佗接受汉朝册封', 'Lu Jia goes to Nanyue and Zhao Tuo accepts investiture from Han', PANYU),
  l('xihan', 5, -167, '缇萦上书救父，汉文帝废除肉刑', 'After Tiying’s plea for her father, Emperor Wen abolishes mutilating punishments', CHANGAN),
  l('xihan', 6, -138, '张骞奉汉武帝之命出使西域，联络大月氏', 'Zhang Qian is sent by Emperor Wu to the Western Regions to seek out the Yuezhi', CHANGAN),
  l('xihan', 7, -134, '董仲舒对策，汉武帝罢黜百家、独尊儒术', 'After Dong Zhongshu’s answers to the throne, Emperor Wu makes Confucian learning the state orthodoxy', CHANGAN),
  l('xihan', 8, -133, '汉军伏兵马邑诱攻匈奴未成，汉匈战争开始', 'A Han ambush at Mayi fails to trap the Xiongnu, and war between Han and Xiongnu begins', site('马邑（今山西朔州）', 'Mayi (modern Shuozhou, Shanxi)', 112.43, 39.33)),
  l('xihan', 9, -127, '主父偃献策，汉武帝颁布推恩令', 'On Zhufu Yan’s advice, Emperor Wu issues the edict letting princes divide their fiefs among all sons', CHANGAN),
  l('xihan', 10, -119, '卫青、霍去病远征漠北，大破匈奴', 'Wei Qing and Huo Qubing strike north of the Gobi and crush the Xiongnu', site('狼居胥山（今蒙古国肯特山）', 'Mount Langjuxu (modern Khentii, Mongolia)', 108.50, 48.50)),
  l('xihan', 11, -119, '桑弘羊等主持盐铁官营', 'Sang Hongyang and others bring salt and iron under state monopoly', CHANGAN),
  l('xihan', 12, -118, '汉朝开始铸行五铢钱', 'Han begins casting the wuzhu coin', CHANGAN),
  l('xihan', 13, -105, '细君公主远嫁乌孙和亲', 'Princess Xijun is married to the ruler of the Wusun to seal an alliance', site('赤谷城（今吉尔吉斯斯坦伊塞克湖东南）', 'Chigu (southeast of Lake Issyk-Kul, modern Kyrgyzstan)', 78.40, 42.20)),
  l('xihan', 14, -104, '汉朝改用落下闳等制定的太初历法', 'Han adopts the Taichu calendar drawn up by Luoxia Hong and others', CHANGAN),
  l('xihan', 15, -102, '李广利率军远征大宛，夺得汗血宝马', 'Li Guangli marches on Dayuan and brings back its famous horses', site('大宛（今乌兹别克斯坦费尔干纳）', 'Dayuan (modern Fergana, Uzbekistan)', 71.80, 40.40)),
  l('xihan', 16, -100, '苏武出使匈奴，被扣留北海牧羊十九年', 'Su Wu goes as envoy to the Xiongnu and is held nineteen years herding sheep by the Northern Sea', site('北海（今贝加尔湖）', 'the Northern Sea (modern Lake Baikal)', 107.00, 52.50)),
  l('xihan', 17, -91, '巫蛊之祸，太子刘据兵败自杀', 'The witchcraft affair: Crown Prince Liu Ju is defeated and takes his own life', site('湖（今河南灵宝西）', 'Hu (west of modern Lingbao, Henan)', 110.70, 34.50)),
  l('xihan', 18, -91, '司马迁著成《史记》', 'Sima Qian completes the Records of the Grand Historian', CHANGAN),
  l('xihan', 19, -89, '汉武帝下轮台诏，停止西域屯田扩张', 'Emperor Wu’s Luntai edict halts expansion and military farming in the Western Regions', CHANGAN),
  l('xihan', 20, -81, '汉昭帝召开盐铁会议，辩论盐铁专营', 'Emperor Zhao convenes the salt and iron debate on the state monopolies', CHANGAN),
  l('xihan', 21, -74, '霍光废黜刘贺，迎立汉宣帝', 'Huo Guang deposes Liu He and enthrones Emperor Xuan', CHANGAN),
  l('xihan', 22, -51, '匈奴呼韩邪单于到甘泉宫朝贡称臣', 'Huhanye Chanyu of the Xiongnu comes to the Ganquan Palace to pay tribute as a vassal', site('甘泉宫（今陕西淳化）', 'Ganquan Palace (modern Chunhua, Shaanxi)', 108.50, 34.90)),
  l('xihan', 23, -36, '陈汤、甘延寿远征康居，斩郅支单于', 'Chen Tang and Gan Yanshou march into Kangju and kill Zhizhi Chanyu', site('郅支城（今哈萨克斯坦塔拉兹）', 'Zhizhi’s city (modern Taraz, Kazakhstan)', 71.37, 42.90)),
  l('xihan', 24, -33, '王昭君出塞，嫁呼韩邪单于和亲', 'Wang Zhaojun leaves the frontier to marry Huhanye Chanyu', site('漠南（今内蒙古呼和浩特一带）', 'south of the Gobi (around modern Hohhot, Inner Mongolia)', 111.66, 40.73)),
  l('xihan', 25, -26, '刘向、刘歆父子校理宫廷藏书，编成《别录》《七略》', 'Liu Xiang and his son Liu Xin collate the palace library and catalogue it', CHANGAN),
  l('xihan', 26, -2, '大月氏使者伊存口授佛经，佛教初传中原', 'Yicun, envoy of the Yuezhi, recites Buddhist scripture at court: Buddhism first reaches China', CHANGAN),
  l('xihan', 27, 2, '汉朝统计全国户口，约五千九百万人', 'A Han census counts some 59 million people', CHANGAN),
  l('xihan', 28, 10, '王莽推行五均六筦和币制改革', 'Wang Mang introduces state price controls, monopolies and a new coinage', CHANGAN),
  l('xihan', 29, 17, '王匡、王凤聚众绿林山，起兵反抗新朝', 'Wang Kuang and Wang Feng gather followers in the Lülin hills and rise against Xin', site('绿林山（今湖北京山）', 'Lülin hills (modern Jingshan, Hubei)', 112.90, 31.10)),
  l('xihan', 30, 18, '樊崇在莒县起兵，部众以赤色涂眉', 'Fan Chong rises at Ju; his followers paint their eyebrows red', site('莒（今山东莒县）', 'Ju (modern Ju County, Shandong)', 118.83, 35.58)),
  l('xihan', 31, 23, '昆阳之战，刘秀以少胜多击溃王莽大军', 'At Kunyang, Liu Xiu’s small force routs Wang Mang’s great army', site('昆阳（今河南叶县）', 'Kunyang (modern Ye County, Henan)', 113.36, 33.62)),

  // 东汉
  l('donghan', 1, 25, '刘秀定都洛阳', 'Liu Xiu makes Luoyang his capital', LUOYANG),
  l('donghan', 2, 43, '马援平定交趾征侧、征贰之乱', 'Ma Yuan puts down the rising of the Trưng sisters in Jiaozhi', site('交趾（今越南河内）', 'Jiaozhi (modern Hanoi, Vietnam)', 105.85, 21.03)),
  l('donghan', 3, 57, '倭奴国遣使朝贡，光武帝赐以金印', 'The Wa state of Na sends envoys with tribute; Emperor Guangwu grants a gold seal', LUOYANG),
  l('donghan', 4, 68, '汉明帝在洛阳建白马寺', 'Emperor Ming builds the White Horse Temple at Luoyang', site('白马寺（今河南洛阳）', 'White Horse Temple (modern Luoyang, Henan)', 112.60, 34.72)),
  l('donghan', 5, 69, '王景、王吴治理黄河与汴渠', 'Wang Jing and Wang Wu tame the Yellow River and the Bian canal', site('荥阳（今河南荥阳）', 'Xingyang (modern Xingyang, Henan)', 113.38, 34.79)),
  l('donghan', 6, 79, '白虎观会议议定五经异同，后编成《白虎通义》', 'The White Tiger Hall conference settles readings of the Five Classics, later written up as the Baihu Tongyi', LUOYANG),
  l('donghan', 7, 82, '班固撰《汉书》大体完成', 'Ban Gu largely completes the History of the Han', LUOYANG),
  l('donghan', 8, 89, '窦宪大破北匈奴，在燕然山刻石记功', 'Dou Xian crushes the Northern Xiongnu and carves an inscription on Mount Yanran', site('燕然山（今蒙古国杭爱山）', 'Mount Yanran (modern Khangai, Mongolia)', 105.60, 45.70)),
  l('donghan', 9, 97, '班超派甘英出使大秦，至条支海边而还', 'Ban Chao sends Gan Ying as envoy toward Rome; he turns back at the sea of Tiaozhi', QIUCI),
  l('donghan', 10, 100, '许慎编成《说文解字》', 'Xu Shen finishes the Shuowen Jiezi dictionary', LUOYANG),
  l('donghan', 11, 105, '蔡伦改进造纸术，献于汉和帝', 'Cai Lun presents his improved papermaking to Emperor He', LUOYANG),
  l('donghan', 12, 107, '西羌大规模起兵，攻掠凉州和三辅', 'The Western Qiang rise in force and raid Liang province and the capital region', site('汉阳（今甘肃天水）', 'Hanyang (modern Tianshui, Gansu)', 105.72, 34.58)),
  l('donghan', 13, 125, '宦官孙程等拥立汉顺帝', 'The eunuch Sun Cheng and others put Emperor Shun on the throne', LUOYANG),
  l('donghan', 14, 132, '张衡制成候风地动仪', 'Zhang Heng builds his seismoscope', LUOYANG),
  l('donghan', 15, 159, '汉桓帝依靠宦官诛杀外戚梁冀', 'Emperor Huan, with the help of eunuchs, destroys the consort kinsman Liang Ji', LUOYANG),
  l('donghan', 16, 166, '第一次党锢之祸，李膺等士人被捕禁锢', 'The first Proscription: Li Ying and other scholar-officials are arrested and barred from office', LUOYANG),
  l('donghan', 17, 166, '大秦王安敦遣使经日南来献', 'Envoys claiming to come from Andun, King of Rome, arrive by way of Rinan', site('日南（今越南中部）', 'Rinan (modern central Vietnam)', 107.10, 16.80)),
  l('donghan', 18, 175, '蔡邕等校正儒家经书，刻成熹平石经', 'Cai Yong and others edit the Confucian classics and carve them in stone', LUOYANG),
  l('donghan', 19, 190, '关东诸侯起兵讨伐董卓', 'The lords east of the passes raise armies against Dong Zhuo', site('酸枣（今河南延津）', 'Suanzao (modern Yanjin, Henan)', 114.20, 35.20)),
  l('donghan', 20, 192, '王允联合吕布诛杀董卓', 'Wang Yun and Lü Bu kill Dong Zhuo', CHANGAN),
  l('donghan', 21, 195, '孙策渡江攻取江东', 'Sun Ce crosses the Yangtze and takes the lands to the east', site('曲阿（今江苏丹阳）', 'Qu’e (modern Danyang, Jiangsu)', 119.60, 32.00)),
  l('donghan', 22, 198, '曹操围攻下邳，擒杀吕布', 'Cao Cao besieges Xiapi and captures and kills Lü Bu', site('下邳（今江苏睢宁）', 'Xiapi (modern Suining, Jiangsu)', 118.00, 34.10)),
  l('donghan', 23, 205, '张仲景著医书《伤寒杂病论》', 'Zhang Zhongjing writes his Treatise on Cold Damage and Miscellaneous Disorders', site('南阳（今河南南阳）', 'Nanyang (modern Nanyang, Henan)', 112.53, 33.00)),
  l('donghan', 24, 207, '曹操北征乌桓，在白狼山大破乌桓骑兵', 'Cao Cao marches north against the Wuhuan and routs their horsemen at White Wolf Mountain', LONGCHENG),
  l('donghan', 25, 207, '刘备三顾茅庐，诸葛亮提出隆中对策', 'Liu Bei calls three times on Zhuge Liang, who lays out his Longzhong plan', site('隆中（今湖北襄阳）', 'Longzhong (modern Xiangyang, Hubei)', 112.07, 32.01)),
  l('donghan', 26, 210, '曹操在邺城修建铜雀台', 'Cao Cao builds the Bronze Sparrow Terrace at Ye', YE),
  l('donghan', 27, 215, '合肥之战，张辽击退孙权大军', 'At Hefei, Zhang Liao drives back Sun Quan’s great army', site('合肥（今安徽合肥）', 'Hefei (modern Hefei, Anhui)', 117.27, 31.86)),
  l('donghan', 28, 216, '曹操受封魏王', 'Cao Cao is made King of Wei', YE),
  l('donghan', 29, 219, '定军山之战，刘备斩夏侯渊，夺取汉中', 'At Mount Dingjun, Liu Bei’s army kills Xiahou Yuan and takes Hanzhong', site('汉中（今陕西汉中）', 'Hanzhong (modern Hanzhong, Shaanxi)', 107.03, 33.07)),

  // 三国
  l('sanguo', 1, 222, '夷陵之战，陆逊火烧连营大败刘备', 'At Yiling, Lu Xun burns Liu Bei’s line of camps and routs him', site('夷陵（今湖北宜昌）', 'Yiling (modern Yichang, Hubei)', 111.29, 30.70)),
  l('sanguo', 2, 223, '刘备在白帝城病逝，托孤于诸葛亮', 'Liu Bei dies at Baidi, leaving his son in Zhuge Liang’s care', site('白帝城（今重庆奉节）', 'Baidi (modern Fengjie, Chongqing)', 109.57, 31.04)),
  l('sanguo', 3, 223, '邓芝出使东吴，蜀吴重新结盟', 'Deng Zhi goes to Wu and Shu and Wu renew their alliance', WUCHANG),
  l('sanguo', 4, 225, '诸葛亮南征，平定南中雍闿、孟获等叛乱', 'Zhuge Liang marches south and puts down Yong Kai, Meng Huo and the southern risings', site('南中（今云南曲靖一带）', 'Nanzhong (around modern Qujing, Yunnan)', 103.80, 25.50)),
  l('sanguo', 5, 227, '诸葛亮上《出师表》，屯兵汉中', 'Zhuge Liang submits his memorial on the campaign and moves the army to Hanzhong', CHENGDU),
  l('sanguo', 6, 228, '诸葛亮首次北伐，马谡失守街亭', 'Zhuge Liang’s first northern campaign: Ma Su loses Jieting', site('街亭（今甘肃秦安）', 'Jieting (modern Qin’an, Gansu)', 106.05, 34.95)),
  l('sanguo', 7, 230, '孙权派卫温、诸葛直率船队航行到夷洲', 'Sun Quan sends Wei Wen and Zhuge Zhi with a fleet to Yizhou (Taiwan)', site('夷洲（今台湾）', 'Yizhou (modern Taiwan)', 121.00, 23.80)),
  l('sanguo', 8, 234, '诸葛亮最后一次北伐，病逝于五丈原', 'On his last northern campaign Zhuge Liang dies at Wuzhangyuan', site('五丈原（今陕西岐山）', 'Wuzhangyuan (modern Qishan, Shaanxi)', 107.63, 34.29)),
  l('sanguo', 9, 238, '司马懿远征辽东，攻灭公孙渊', 'Sima Yi marches on Liaodong and destroys Gongsun Yuan', XIANGPING),
  l('sanguo', 10, 239, '曹魏册封倭女王卑弥呼为亲魏倭王', 'Wei names Himiko, queen of Wa, “King of Wa, friend of Wei”', LUOYANG),
  l('sanguo', 11, 244, '毌丘俭出征高句丽，攻破丸都', 'Guanqiu Jian campaigns against Goguryeo and takes Wandu', site('丸都（今吉林集安）', 'Wandu (modern Ji’an, Jilin)', 126.18, 41.13)),
  l('sanguo', 12, 247, '康僧会到建业传播佛法，孙权为其建建初寺', 'Kang Senghui brings Buddhism to Jianye and Sun Quan builds the Jianchu Temple for him', JIANYE),
  l('sanguo', 13, 260, '魏帝曹髦率宿卫讨伐司马昭，被杀', 'Cao Mao, Emperor of Wei, leads his guards against Sima Zhao and is killed', LUOYANG),
  l('sanguo', 14, 262, '嵇康被司马昭杀害，《广陵散》成绝响', 'Ji Kang is put to death by Sima Zhao, and his tune Guangling San dies with him', LUOYANG),
  l('sanguo', 15, 270, '裴秀编绘《禹贡地域图》，提出制图六体', 'Pei Xiu draws his maps of the Yu Gong regions and sets out six principles of cartography', LUOYANG),
  l('sanguo', 16, 279, '王濬率楼船自益州顺江东下伐吴', 'Wang Jun sails a fleet of tower ships down the Yangtze from Yi province against Wu', CHENGDU),

  // 西晋
  l('xijin', 1, 280, '西晋颁布占田制和户调式', 'Jin issues the land-holding allotments and household tax rules', LUOYANG),
  l('xijin', 2, 281, '汲郡古墓出土竹简古书，经整理成《竹书纪年》等', 'Bamboo books are dug up from an ancient tomb at Ji, among them the Bamboo Annals', site('汲（今河南卫辉）', 'Ji (modern Weihui, Henan)', 114.06, 35.40)),
  l('xijin', 3, 290, '陈寿撰成《三国志》', 'Chen Shou completes the Records of the Three Kingdoms', LUOYANG),
  l('xijin', 4, 301, '张轨出任凉州刺史，保境安民', 'Zhang Gui becomes governor of Liang province and keeps it at peace', GUZANG),
  l('xijin', 5, 304, '李雄在成都称成都王，建立成汉', 'Li Xiong makes himself King of Chengdu, founding Cheng Han', CHENGDU),
  l('xijin', 6, 307, '琅琊王司马睿在王导辅佐下出镇建邺', 'Sima Rui, Prince of Langya, guided by Wang Dao, takes command at Jianye', JIANYE),
  l('xijin', 7, 310, '西域僧人佛图澄来到洛阳弘传佛法', 'Fotudeng, a monk from the Western Regions, comes to Luoyang to teach Buddhism', LUOYANG),
  l('xijin', 8, 313, '祖逖率部北伐，中流击楫立誓', 'Zu Ti crosses the Yangtze on a northern campaign, striking his oar mid-river in a vow', JINGKOU),

  // 东晋（含十六国）
  l('dongjin', 1, 322, '王敦自武昌起兵攻入建康', 'Wang Dun rises at Wuchang and storms Jiankang', WUCHANG),
  l('dongjin', 2, 353, '王羲之兰亭宴集作序，书法名作《兰亭集序》由此传世', 'At the Orchid Pavilion gathering Wang Xizhi writes his famous preface in calligraphy', site('兰亭（今浙江绍兴）', 'Orchid Pavilion (modern Shaoxing, Zhejiang)', 120.48, 29.92)),
  l('dongjin', 3, 354, '桓温第一次北伐，进抵灞上', 'Huan Wen’s first northern campaign reaches Bashang outside Chang’an', site('灞上（今陕西西安东）', 'Bashang (east of modern Xi’an, Shaanxi)', 109.10, 34.30)),
  l('dongjin', 4, 357, '苻坚即位，重用王猛整顿吏治', 'Fu Jian takes the throne and puts Wang Meng in charge of reforming the government', CHANGAN),
  l('dongjin', 5, 366, '僧人乐僔在鸣沙山开凿石窟，莫高窟由此开始', 'The monk Le Zun cuts the first cave at Mingsha Hill: the Mogao caves begin', site('鸣沙山（今甘肃敦煌）', 'Mingsha Hill (modern Dunhuang, Gansu)', 94.81, 40.04)),
  l('dongjin', 6, 369, '桓温第三次北伐前燕，在枋头大败', 'Huan Wen’s third northern campaign against the Former Yan ends in defeat at Fangtou', site('枋头（今河南浚县）', 'Fangtou (modern Xun County, Henan)', 114.55, 35.67)),
  l('dongjin', 7, 385, '吕光西征龟兹归来，割据凉州', 'Lü Guang returns from his western campaign against Qiuci and takes Liang province for himself', GUZANG),
  l('dongjin', 8, 399, '法显从长安出发，西行天竺求取佛经', 'Faxian sets out from Chang’an for India in search of Buddhist scriptures', CHANGAN),
  l('dongjin', 9, 401, '后秦迎鸠摩罗什至长安，主持翻译佛经', 'The Later Qin brings Kumarajiva to Chang’an to lead the translation of Buddhist scripture', site('长安草堂寺（今陕西西安鄠邑）', 'Caotang Temple, Chang’an (modern Huyi, Xi’an, Shaanxi)', 108.62, 34.04)),
  l('dongjin', 10, 404, '刘裕在京口起兵讨伐桓玄', 'Liu Yu raises troops at Jingkou against Huan Xuan', JINGKOU),
  l('dongjin', 11, 405, '陶渊明辞去彭泽县令，归隐田园作诗', 'Tao Yuanming resigns as magistrate of Pengze and retires to the fields to write poetry', site('柴桑（今江西九江）', 'Chaisang (modern Jiujiang, Jiangxi)', 116.00, 29.70)),
  l('dongjin', 12, 412, '法显由海路回国，后撰《佛国记》', 'Faxian returns home by sea and later writes the Record of Buddhist Kingdoms', site('崂山（今山东青岛）', 'Laoshan (modern Qingdao, Shandong)', 120.60, 36.15)),

  // 南北朝
  l('nanbei', 1, 429, '北魏太武帝大举北伐柔然', 'Emperor Taiwu of the Northern Wei launches a great campaign against the Rouran', MOBEI),
  l('nanbei', 2, 445, '范晔撰写《后汉书》', 'Fan Ye writes the History of the Later Han', JIANKANG),
  l('nanbei', 3, 446, '北魏太武帝下诏禁佛，毁寺焚经', 'Emperor Taiwu of the Northern Wei bans Buddhism, tearing down temples and burning scriptures', PINGCHENG),
  l('nanbei', 4, 450, '宋文帝元嘉北伐失利，北魏军南下直抵瓜步', 'Emperor Wen of Song’s northern campaign fails and the Northern Wei army pushes south to Guabu', site('瓜步（今江苏南京六合）', 'Guabu (modern Luhe, Nanjing, Jiangsu)', 118.90, 32.30)),
  l('nanbei', 5, 460, '北魏在平城西武州山开凿云冈石窟', 'The Northern Wei begins the Yungang caves in the Wuzhou hills west of Pingcheng', site('武州山（今山西大同云冈）', 'Wuzhou hills (modern Yungang, Datong, Shanxi)', 113.12, 40.11)),
  l('nanbei', 6, 462, '祖冲之编成《大明历》，把圆周率推算到小数点后七位', 'Zu Chongzhi draws up the Daming calendar and works out pi to seven decimal places', JIANKANG),
  l('nanbei', 7, 495, '北魏开凿龙门石窟', 'The Northern Wei begins carving the Longmen caves', site('龙门（今河南洛阳）', 'Longmen (modern Luoyang, Henan)', 112.47, 34.56)),
  l('nanbei', 8, 496, '孝文帝推行汉化改革，改鲜卑姓为汉姓', 'Emperor Xiaowen presses on with adopting Han ways, turning Xianbei surnames into Chinese ones', LUOYANG),
  l('nanbei', 9, 501, '刘勰著成《文心雕龙》', 'Liu Xie completes The Literary Mind and the Carving of Dragons', JIANKANG),
  l('nanbei', 10, 527, '梁武帝在同泰寺舍身为僧', 'Emperor Wu of Liang gives himself to the Tongtai Temple as a monk', JIANKANG),
  l('nanbei', 11, 527, '郦道元遇害，所著《水经注》传世', 'Li Daoyuan is killed; his Commentary on the Water Classic survives', LUOYANG),
  l('nanbei', 12, 528, '尔朱荣攻入洛阳，在河阴杀害朝臣二千余人', 'Erzhu Rong takes Luoyang and kills more than two thousand courtiers at Heyin', site('河阴（今河南孟津）', 'Heyin (modern Mengjin, Henan)', 112.45, 34.83)),
  l('nanbei', 13, 540, '贾思勰著农书《齐民要术》', 'Jia Sixie writes the farming manual Qimin Yaoshu', site('青州（今山东寿光一带）', 'Qing province (around modern Shouguang, Shandong)', 118.73, 36.86)),
  l('nanbei', 14, 546, '玉壁之战，韦孝宽击退高欢围攻', 'At Yubi, Wei Xiaokuan holds out against Gao Huan’s siege', site('玉壁（今山西稷山）', 'Yubi (modern Jishan, Shanxi)', 110.96, 35.55)),
  l('nanbei', 15, 550, '宇文泰确立府兵制度', 'Yuwen Tai establishes the militia (fubing) system', CHANGAN),
  l('nanbei', 16, 552, '王僧辩、陈霸先攻破建康，侯景败亡', 'Wang Sengbian and Chen Baxian take Jiankang and Hou Jing is destroyed', JIANKANG),
  l('nanbei', 17, 552, '阿史那土门击败柔然，建立突厥汗国', 'Ashina Tumen defeats the Rouran and founds the Turkic khaganate', site('漠北（今蒙古国鄂尔浑河流域）', 'north of the Gobi (Orkhon valley, modern Mongolia)', 102.50, 47.50)),
  l('nanbei', 18, 557, '宇文觉代西魏称天王，建立北周', 'Yuwen Jue replaces the Western Wei and founds the Northern Zhou', CHANGAN),
  l('nanbei', 19, 574, '北周武帝下诏禁断佛、道二教', 'Emperor Wu of the Northern Zhou bans both Buddhism and Daoism', CHANGAN),
  l('nanbei', 20, 580, '尉迟迥在相州起兵反对杨坚专权，被平定', 'Yuchi Jiong rises at Xiang province against Yang Jian’s grip on power and is crushed', YE),
];
