import type { Hold, OwnEra, Seat } from './types.ts';

/**
 * 唐 (618–907): seats and holdings for our own Tang maps. Seats are the 州 / 府 seats of the 道 named in the geography
 * treatises (《旧唐书·地理志》, 《新唐书·地理志》), the protectorates (都护府) and their garrisons, the seats of the rivals
 * of the founding years and of the late-Tang 藩镇, and a few large-reach centres for each neighbouring people, all at
 * their modern sites. The holdings are written as a chronicle (who took which seats in which year, with the chapter
 * that records it; `est` marks a date we infer where the sources are silent or disagree).
 */
const S = (id: string, zh: string, en: string, lon: number, lat: number, modern: string, o: Partial<Seat> = {}): Seat =>
  ({ id, name: { zh, en }, at: [lon, lat], modern, ...o });

const seats: Seat[] = [
  // 关内道
  S('changan', '长安（京兆府）', 'Chang’an (Jingzhao)', 108.94, 34.26, '陕西西安', { b: 40 }),
  S('huazhou', '华州', 'Hua prefecture', 109.76, 34.51, '陕西渭南华州区'),
  S('tongzhou', '同州', 'Tong prefecture', 109.94, 34.80, '陕西大荔'),
  S('fengxiang', '岐州（凤翔府）', 'Qi prefecture (Fengxiang)', 107.40, 34.52, '陕西凤翔'),
  S('binzhou', '邠州', 'Bin prefecture', 108.08, 35.05, '陕西彬州'),
  S('jingzhou_g', '泾州', 'Jing prefecture', 107.35, 35.33, '甘肃泾川'),
  S('yuanzhou', '原州', 'Yuan prefecture', 106.28, 36.00, '宁夏固原'),
  S('ningzhou', '宁州', 'Ning prefecture', 107.92, 35.50, '甘肃宁县'),
  S('qingzhou_g', '庆州', 'Qing prefecture', 107.88, 36.00, '甘肃庆城'),
  S('fuzhou_f', '鄜州', 'Fu prefecture', 109.43, 35.99, '陕西富县'),
  S('danzhou_g', '丹州', 'Dan prefecture', 110.15, 36.09, '陕西宜川'),
  S('yanzhou_g', '延州', 'Yan prefecture', 109.49, 36.60, '陕西延安'),
  S('suizhou_g', '绥州', 'Sui prefecture', 110.25, 37.50, '陕西绥德'),
  S('yinzhou', '银州', 'Yin prefecture', 109.98, 37.97, '陕西横山党岔'),
  S('xiazhou', '夏州（统万城）', 'Xia prefecture (Tongwan)', 108.85, 37.99, '陕西靖边白城子', { r: 300 }),
  S('youzhou_x', '宥州', 'You prefecture', 108.17, 37.73, '内蒙古鄂托克前旗城川'),
  S('yanzhou_y', '盐州', 'Yan prefecture (salt)', 107.60, 37.59, '陕西定边'),
  S('lingzhou', '灵州', 'Ling prefecture', 106.30, 37.95, '宁夏吴忠', { r: 330 }),
  S('huizhou', '会州', 'Hui prefecture', 104.67, 36.57, '甘肃靖远'),
  S('fengzhou', '丰州', 'Feng prefecture', 108.27, 41.05, '内蒙古五原南', { r: 300 }),
  S('shengzhou', '胜州', 'Sheng prefecture', 111.08, 39.97, '内蒙古准格尔旗十二连城'),
  S('linzhou', '麟州', 'Lin prefecture', 110.50, 38.85, '陕西神木'),
  S('danyu', '单于都护府（振武军）', 'Chanyu Protectorate (Zhenwu army)', 111.82, 40.38, '内蒙古和林格尔', { r: 300 }),
  S('shouxiang_w', '西受降城', 'Western Shouxiang fort', 107.30, 40.85, '内蒙古杭锦后旗、乌拉特一带', { r: 300 }),
  S('shouxiang_m', '中受降城', 'Middle Shouxiang fort', 109.95, 40.58, '内蒙古包头', { r: 300 }),
  S('shouxiang_e', '东受降城', 'Eastern Shouxiang fort', 111.45, 40.25, '内蒙古托克托', { r: 260 }),
  // 河东道
  S('taiyuan', '并州（太原府）', 'Bing prefecture (Taiyuan)', 112.48, 37.82, '山西太原', { b: 20 }),
  S('fenzhou', '汾州', 'Fen prefecture', 111.79, 37.27, '山西汾阳'),
  S('qinzhou_s', '沁州', 'Qin prefecture (Shanxi)', 112.33, 36.75, '山西沁源'),
  S('liaozhou', '仪州（辽州）', 'Yi (Liao) prefecture', 113.37, 37.07, '山西左权'),
  S('luzhou', '潞州', 'Lu prefecture', 113.10, 36.20, '山西长治'),
  S('zezhou', '泽州', 'Ze prefecture', 112.85, 35.50, '山西晋城'),
  S('jinzhou_s', '晋州', 'Jin prefecture', 111.52, 36.08, '山西临汾'),
  S('jiangzhou', '绛州', 'Jiang prefecture', 111.21, 35.61, '山西新绛'),
  S('cizhou_s', '慈州', 'Ci prefecture', 110.68, 36.10, '山西吉县'),
  S('xizhou_s', '隰州', 'Xi prefecture', 110.94, 36.69, '山西隰县'),
  S('puzhou', '蒲州（河中府）', 'Pu prefecture (Hezhong)', 110.33, 34.83, '山西永济'),
  S('shizhou', '石州', 'Shi prefecture', 111.14, 37.52, '山西吕梁离石'),
  S('lanzhou_s', '岚州', 'Lan prefecture', 111.65, 38.29, '山西岚县'),
  S('xinzhou', '忻州', 'Xin prefecture', 112.73, 38.42, '山西忻州'),
  S('daizhou', '代州', 'Dai prefecture', 112.96, 39.07, '山西代县'),
  S('shuozhou', '朔州', 'Shuo prefecture', 112.43, 39.33, '山西朔州'),
  S('yunzhou', '云州', 'Yun prefecture', 113.30, 40.08, '山西大同', { r: 280 }),
  S('weizhou_y', '蔚州', 'Yu prefecture', 114.55, 39.84, '河北蔚县'),
  // 关内 · 陇右 · 西域
  S('qinzhou', '秦州', 'Qin prefecture', 105.72, 34.58, '甘肃天水'),
  S('weizhou', '渭州', 'Wei prefecture', 104.62, 35.00, '甘肃陇西'),
  S('chengzhou', '成州', 'Cheng prefecture', 105.73, 33.74, '甘肃成县'),
  S('wuzhou_l', '武州', 'Wu prefecture (Longyou)', 104.92, 33.39, '甘肃陇南武都'),
  S('dangzhou', '宕州', 'Dang prefecture', 104.38, 34.03, '甘肃宕昌'),
  S('minzhou', '岷州', 'Min prefecture', 104.03, 34.43, '甘肃岷县'),
  S('taozhou', '洮州', 'Tao prefecture', 103.35, 34.69, '甘肃临潭'),
  S('diezhou', '叠州', 'Die prefecture', 103.22, 34.05, '甘肃迭部', { r: 250 }),
  S('linzhou_l', '临州（狄道）', 'Lin prefecture (Didao)', 103.86, 35.38, '甘肃临洮'),
  S('lanzhou', '兰州', 'Lan prefecture', 103.83, 36.06, '甘肃兰州'),
  S('hezhou', '河州', 'He prefecture', 103.21, 35.60, '甘肃临夏'),
  S('kuozhou', '廓州', 'Kuo prefecture', 102.05, 35.95, '青海化隆、尖扎一带', { r: 260 }),
  S('shanzhou', '鄯州', 'Shan prefecture', 102.40, 36.48, '青海乐都'),
  S('shancheng', '鄯城（西平）', 'Shancheng (Xiping)', 101.78, 36.62, '青海西宁', { r: 280 }),
  S('liangzhou', '凉州', 'Liang prefecture', 102.64, 37.93, '甘肃武威', { r: 320 }),
  S('ganzhou', '甘州', 'Gan prefecture', 100.45, 38.93, '甘肃张掖', { r: 320 }),
  S('suzhou_l', '肃州', 'Su prefecture', 98.50, 39.74, '甘肃酒泉', { r: 340 }),
  S('guazhou', '瓜州', 'Gua prefecture', 96.20, 40.30, '甘肃瓜州锁阳城', { r: 380 }),
  S('shazhou', '沙州', 'Sha prefecture (Dunhuang)', 94.66, 40.14, '甘肃敦煌', { r: 420 }),
  S('tongcheng', '同城（居延）', 'Tongcheng (Juyan)', 101.07, 41.95, '内蒙古额济纳', { r: 350 }),
  S('yizhou_l', '伊州', 'Yi prefecture (Hami)', 93.51, 42.83, '新疆哈密', { r: 340 }),
  S('pulei', '伊吾军（蒲类）', 'Yiwu army (Pulei)', 93.00, 43.60, '新疆巴里坤', { r: 260 }),
  S('xizhou', '西州（高昌）', 'Xi prefecture (Gaochang)', 89.53, 42.85, '新疆吐鲁番高昌故城', { r: 300 }),
  S('jiaohe', '交河城', 'Jiaohe', 89.06, 42.95, '新疆吐鲁番交河故城', { r: 250 }),
  S('tingzhou', '庭州（北庭）', 'Ting prefecture (Beiting)', 89.17, 44.10, '新疆吉木萨尔北庭故城', { r: 500 }),
  S('luntai', '轮台', 'Luntai', 87.60, 43.82, '新疆乌鲁木齐', { r: 450 }),
  S('yanqi', '焉耆', 'Karashahr (Yanqi)', 86.57, 42.06, '新疆焉耆', { r: 450 }),
  S('qiuci', '龟兹（安西）', 'Kucha (Anxi)', 82.96, 41.72, '新疆库车', { r: 650 }),
  S('yutian', '于阗', 'Khotan', 79.93, 37.11, '新疆和田', { r: 650 }),
  S('shule', '疏勒', 'Kashgar (Shule)', 75.99, 39.47, '新疆喀什', { r: 600 }),
  S('congling', '葱岭守捉', 'Congling post', 75.23, 37.77, '新疆塔什库尔干', { r: 300 }),
  S('shicheng', '石城镇（鄯善）', 'Shicheng (Shanshan)', 88.17, 39.02, '新疆若羌', { r: 500 }),
  S('boxian', '播仙镇（且末）', 'Boxian (Qiemo)', 85.53, 38.13, '新疆且末', { r: 450 }),
  S('suiye', '碎叶', 'Suyab', 75.20, 42.80, '吉尔吉斯斯坦托克马克阿克别希姆', { r: 500 }),
  S('gongyue', '弓月城', 'Gongyue', 80.87, 44.05, '新疆霍城', { r: 600 }),
  S('talas', '怛罗斯', 'Talas', 71.37, 42.90, '哈萨克斯坦塔拉兹', { r: 650 }),
  S('otrar', '锡尔河下游', 'Lower Syr Darya', 68.27, 42.85, '哈萨克斯坦突厥斯坦一带', { r: 700 }),
  S('balkhash', '巴尔喀什湖南', 'South of Lake Balkhash', 78.37, 45.00, '哈萨克斯坦塔尔迪库尔干', { r: 600 }),
  S('geluolu', '金山之西（葛逻禄）', 'West of the Altai (Karluks)', 82.98, 46.75, '新疆塔城', { r: 700 }),
  S('kangguo', '康国', 'Samarkand (Kang)', 66.96, 39.65, '乌兹别克斯坦撒马尔罕', { r: 350 }),
  S('anguo', '安国', 'Bukhara (An)', 64.42, 39.77, '乌兹别克斯坦布哈拉', { r: 400 }),
  S('shiguo', '石国', 'Chach (Shi)', 69.24, 41.30, '乌兹别克斯坦塔什干', { r: 280 }),
  S('bahanna', '拔汗那（宁远）', 'Ferghana', 71.48, 40.95, '乌兹别克斯坦纳曼干一带', { r: 300 }),
  S('tuhuoluo', '吐火罗', 'Tokharistan', 68.86, 36.73, '阿富汗昆都士', { r: 450 }),
  S('jibin', '迦毕试（罽宾）', 'Kapisa', 69.27, 34.95, '阿富汗贝格拉姆', { r: 400 }),
  S('xiaobolu', '小勃律', 'Little Balur (Gilgit)', 74.31, 35.92, '巴基斯坦吉尔吉特', { r: 220 }),
  S('dabolu', '大勃律', 'Great Balur (Baltistan)', 75.63, 35.30, '巴基斯坦斯卡杜', { r: 220 }),
  S('bosi', '木鹿（波斯东境）', 'Merv', 61.83, 37.66, '土库曼斯坦马雷', { r: 700 }),
  S('xwarizm', '花剌子模', 'Khwarazm', 60.36, 41.38, '乌兹别克斯坦希瓦', { r: 400 }),
  // 天竺
  S('tianzhu_n', '曲女城（中天竺）', 'Kanyakubja', 79.92, 27.05, '印度卡瑙季', { r: 1300 }),
  S('tianzhu_e', '摩揭陀', 'Magadha', 85.14, 25.60, '印度巴特那', { r: 900 }),
  S('multan', '信度', 'Sindh (Multan)', 71.47, 30.20, '巴基斯坦木尔坦', { r: 800 }),
  S('kashmir', '迦湿弥罗', 'Kashmir', 74.80, 34.08, '斯利那加', { r: 350 }),
  S('nipoluo', '泥婆罗', 'Nepal', 85.32, 27.70, '尼泊尔加德满都', { r: 220 }),
  S('kamarupa', '迦摩缕波', 'Kamarupa', 91.75, 26.18, '印度古瓦哈提', { r: 500 }),
  // 草原
  S('yinshan', '白道（阴山之南）', 'Baidao (south of the Yin mountains)', 111.65, 40.82, '内蒙古呼和浩特', { r: 450 }),
  S('qikou', '碛口（漠南）', 'Qikou (south of the Gobi)', 111.97, 43.65, '内蒙古二连浩特', { r: 650 }),
  S('xilin', '霫（漠南东部）', 'Xi (eastern steppe)', 116.08, 43.93, '内蒙古锡林浩特', { r: 550 }),
  S('otuken', '于都斤山（漠北牙帐）', 'Ötüken (court north of the Gobi)', 102.50, 47.50, '蒙古杭爱山东麓', { r: 1100 }),
  S('kerulen', '胪朐河（漠北东部）', 'Kherlen (eastern Mongolia)', 110.66, 47.32, '蒙古温都尔汗', { r: 850 }),
  S('altai', '金山（阿尔泰）', 'Altai', 91.64, 48.00, '蒙古科布多', { r: 800 }),
  S('xiajiasi', '坚昆（黠戛斯）', 'Kyrgyz (Jiankun)', 91.70, 53.70, '俄罗斯米努辛斯克', { r: 900 }),
  S('shiwei', '室韦', 'Shiwei', 119.70, 49.20, '内蒙古海拉尔', { r: 900 }),
  S('heishui', '黑水靺鞨', 'Heishui Mohe', 129.60, 46.30, '黑龙江依兰', { r: 900 }),
  S('qidan', '契丹（松漠）', 'Khitan (Songmo)', 119.39, 43.98, '内蒙古巴林左旗', { r: 380 }),
  S('xi', '奚（饶乐）', 'Xi (Raole)', 119.30, 41.60, '内蒙古宁城', { r: 300 }),
  // 河北道
  S('youzhou', '幽州', 'You prefecture', 116.35, 39.88, '北京', { b: 20 }),
  S('zhuozhou', '涿州', 'Zhuo prefecture', 115.97, 39.49, '河北涿州'),
  S('tanzhou', '檀州', 'Tan prefecture', 116.84, 40.38, '北京密云'),
  S('jizhou_y', '蓟州', 'Ji prefecture', 117.40, 40.05, '天津蓟州'),
  S('pingzhou', '平州', 'Ping prefecture', 118.87, 39.88, '河北卢龙'),
  S('guizhou_y', '妫州', 'Gui prefecture', 115.50, 40.40, '河北怀来', { r: 230 }),
  S('yizhou_h', '易州', 'Yi prefecture', 115.50, 39.35, '河北易县'),
  S('dingzhou', '定州', 'Ding prefecture', 115.00, 38.52, '河北定州'),
  S('zhenzhou', '恒州（镇州）', 'Heng (Zhen) prefecture', 114.57, 38.15, '河北正定'),
  S('zhaozhou', '赵州', 'Zhao prefecture', 114.80, 37.75, '河北赵县'),
  S('xingzhou', '邢州', 'Xing prefecture', 114.50, 37.07, '河北邢台'),
  S('mingzhou_h', '洺州', 'Ming prefecture', 114.70, 36.78, '河北永年'),
  S('xiangzhou', '相州', 'Xiang prefecture', 114.35, 36.10, '河南安阳'),
  S('weizhou_h', '卫州', 'Wei prefecture (Henan)', 114.07, 35.40, '河南卫辉'),
  S('weizhou_m', '魏州', 'Wei prefecture (Weibo)', 115.30, 36.30, '河北大名'),
  S('bozhou_h', '博州', 'Bo prefecture', 115.98, 36.45, '山东聊城'),
  S('beizhou', '贝州', 'Bei prefecture', 115.67, 37.05, '河北清河'),
  S('jizhou_h', '冀州', 'Ji prefecture (Hebei)', 115.57, 37.57, '河北冀州'),
  S('shenzhou', '深州', 'Shen prefecture', 115.55, 38.00, '河北深州'),
  S('yingzhou_h', '瀛州', 'Ying prefecture (Hebei)', 116.10, 38.43, '河北河间'),
  S('mozhou', '莫州', 'Mo prefecture', 116.17, 38.72, '河北任丘北'),
  S('cangzhou', '沧州', 'Cang prefecture', 116.87, 38.30, '河北沧县'),
  S('dezhou', '德州', 'De prefecture', 116.30, 37.45, '山东陵城'),
  S('dizhou', '棣州', 'Di prefecture', 117.60, 37.47, '山东惠民'),
  S('huaizhou', '怀州', 'Huai prefecture', 112.93, 35.10, '河南沁阳'),
  S('yingzhou', '营州（柳城）', 'Ying prefecture (Liucheng)', 120.45, 41.57, '辽宁朝阳', { r: 300 }),
  // 河南道
  S('luoyang', '洛阳（河南府）', 'Luoyang (Henan)', 112.45, 34.68, '河南洛阳', { b: 20 }),
  S('shanzhou_h', '陕州', 'Shan prefecture (Henan)', 111.20, 34.77, '河南三门峡'),
  S('guozhou', '虢州', 'Guo prefecture', 110.87, 34.52, '河南灵宝'),
  S('ruzhou', '汝州', 'Ru prefecture', 112.84, 34.17, '河南汝州'),
  S('zhengzhou', '郑州', 'Zheng prefecture', 113.65, 34.75, '河南郑州'),
  S('bianzhou', '汴州', 'Bian prefecture', 114.35, 34.80, '河南开封', { b: 10 }),
  S('huazhou_h', '滑州', 'Hua prefecture (Henan)', 114.65, 35.55, '河南滑县'),
  S('xuzhou_h', '许州', 'Xu prefecture', 113.85, 34.03, '河南许昌'),
  S('chenzhou_h', '陈州', 'Chen prefecture', 114.88, 33.73, '河南淮阳'),
  S('caizhou', '蔡州', 'Cai prefecture', 114.37, 33.00, '河南汝南'),
  S('yingzhou_y', '颍州', 'Ying prefecture (Huai)', 115.80, 32.90, '安徽阜阳'),
  S('bozhou', '亳州', 'Bo prefecture (Huai)', 115.78, 33.85, '安徽亳州'),
  S('songzhou', '宋州', 'Song prefecture', 115.65, 34.42, '河南商丘'),
  S('caozhou', '曹州', 'Cao prefecture', 115.50, 34.83, '山东曹县、定陶一带'),
  S('puzhou_h', '濮州', 'Pu prefecture (Henan)', 115.50, 35.57, '山东鄄城'),
  S('yunzhou_h', '郓州', 'Yun prefecture', 116.30, 35.95, '山东东平'),
  S('yanzhou', '兖州', 'Yan prefecture (Shandong)', 116.83, 35.55, '山东兖州'),
  S('xuzhou', '徐州', 'Xu prefecture (Pengcheng)', 117.18, 34.26, '江苏徐州'),
  S('suzhou_h', '宿州', 'Su prefecture (Huai)', 116.98, 33.64, '安徽宿州'),
  S('sizhou', '泗州', 'Si prefecture', 118.50, 33.20, '江苏盱眙北'),
  S('haizhou', '海州', 'Hai prefecture', 119.20, 34.60, '江苏连云港'),
  S('yizhou_s', '沂州', 'Yi prefecture (Shandong)', 118.35, 35.05, '山东临沂'),
  S('mizhou', '密州', 'Mi prefecture', 119.40, 36.00, '山东诸城'),
  S('qingzhou', '青州', 'Qing prefecture', 118.47, 36.69, '山东青州'),
  S('zizhou', '淄州', 'Zi prefecture', 117.85, 36.65, '山东淄川'),
  S('qizhou', '齐州', 'Qi prefecture', 117.00, 36.67, '山东济南'),
  S('laizhou', '莱州', 'Lai prefecture', 119.94, 37.18, '山东莱州'),
  S('dengzhou', '登州', 'Deng prefecture', 120.75, 37.80, '山东蓬莱'),
  // 山南道
  S('shangzhou', '商州', 'Shang prefecture', 109.93, 33.87, '陕西商洛'),
  S('jinzhou', '金州', 'Jin prefecture', 109.02, 32.70, '陕西安康'),
  S('liangzhou_s', '梁州（兴元府）', 'Liang prefecture (Xingyuan)', 107.03, 33.07, '陕西汉中'),
  S('yangzhou_s', '洋州', 'Yang prefecture', 107.55, 33.22, '陕西洋县'),
  S('fengzhou_s', '凤州', 'Feng prefecture (Qinling)', 106.52, 33.92, '陕西凤县'),
  S('xingzhou_s', '兴州', 'Xing prefecture', 106.15, 33.24, '陕西略阳'),
  S('lizhou', '利州', 'Li prefecture', 105.84, 32.44, '四川广元'),
  S('bazhou', '巴州', 'Ba prefecture', 106.75, 31.86, '四川巴中'),
  S('tongzhou_s', '通州', 'Tong prefecture (Ba)', 107.48, 31.21, '四川达州'),
  S('kaizhou', '开州', 'Kai prefecture', 108.42, 31.16, '重庆开州'),
  S('wanzhou', '万州', 'Wan prefecture', 108.38, 30.81, '重庆万州'),
  S('zhongzhou', '忠州', 'Zhong prefecture', 108.03, 30.30, '重庆忠县'),
  S('kuizhou', '夔州', 'Kui prefecture', 109.50, 31.04, '重庆奉节'),
  S('guizhou_s', '归州', 'Gui prefecture (Gorges)', 110.69, 30.83, '湖北秭归'),
  S('xiazhou_s', '峡州', 'Xia prefecture (Yiling)', 111.29, 30.70, '湖北宜昌'),
  S('jiangling', '荆州（江陵府）', 'Jing prefecture (Jiangling)', 112.19, 30.35, '湖北荆州', { b: 15 }),
  S('lizhou_x', '澧州', 'Li prefecture (Xiang)', 111.75, 29.63, '湖南澧县'),
  S('langzhou', '朗州', 'Lang prefecture', 111.69, 29.04, '湖南常德'),
  S('yuezhou', '岳州', 'Yue prefecture', 113.13, 29.37, '湖南岳阳'),
  S('ezhou', '鄂州', 'E prefecture', 114.30, 30.55, '湖北武汉武昌'),
  S('anzhou', '安州', 'An prefecture', 113.68, 31.26, '湖北安陆'),
  S('suizhou', '随州', 'Sui prefecture', 113.38, 31.72, '湖北随州'),
  S('yingzhou_s', '郢州', 'Ying prefecture (Han)', 112.57, 31.17, '湖北钟祥'),
  S('fuzhou_h', '复州', 'Fu prefecture (Han)', 113.15, 30.65, '湖北天门'),
  S('xiangzhou_s', '襄州', 'Xiang prefecture (Xiangyang)', 112.14, 32.04, '湖北襄阳'),
  S('dengzhou_s', '邓州', 'Deng prefecture', 112.08, 32.69, '河南邓州'),
  S('tangzhou', '唐州', 'Tang prefecture', 113.30, 32.73, '河南泌阳'),
  S('junzhou', '均州', 'Jun prefecture', 111.00, 32.55, '湖北丹江口'),
  S('fangzhou_s', '房州', 'Fang prefecture', 110.73, 32.05, '湖北房县'),
  S('yuzhou', '渝州', 'Yu prefecture', 106.55, 29.56, '重庆'),
  S('fuzhou_c', '涪州', 'Fu prefecture (Fuling)', 107.38, 29.70, '重庆涪陵'),
  S('qianzhou', '黔州', 'Qian prefecture', 108.17, 29.29, '重庆彭水', { r: 300 }),
  S('sizhou_q', '思州', 'Si prefecture (Qian)', 108.25, 27.95, '贵州思南一带', { r: 260 }),
  S('bozhou_q', '播州', 'Bo prefecture (Qian)', 106.92, 27.72, '贵州遵义', { r: 300 }),
  S('zangke', '牂柯（矩州）', 'Zangke (Ju prefecture)', 106.71, 26.57, '贵州贵阳', { r: 320 }),
  // 淮南道
  S('yangzhou', '扬州', 'Yang prefecture', 119.43, 32.40, '江苏扬州', { b: 10 }),
  S('chuzhou', '楚州', 'Chu prefecture', 119.15, 33.50, '江苏淮安'),
  S('hezhou_h', '和州', 'He prefecture', 118.35, 31.72, '安徽和县'),
  S('chuzhou_c', '滁州', 'Chu prefecture (Chuzhou)', 118.30, 32.30, '安徽滁州'),
  S('luzhou_h', '庐州', 'Lu prefecture (Hefei)', 117.27, 31.86, '安徽合肥'),
  S('shouzhou', '寿州', 'Shou prefecture', 116.79, 32.58, '安徽寿县'),
  S('haozhou', '濠州', 'Hao prefecture', 117.55, 32.90, '安徽凤阳'),
  S('guangzhou_h', '光州', 'Guang prefecture', 115.05, 32.13, '河南潢川'),
  S('shenzhou_h', '申州', 'Shen prefecture', 114.07, 32.13, '河南信阳'),
  S('huangzhou', '黄州', 'Huang prefecture', 114.87, 30.45, '湖北黄冈'),
  S('qizhou_h', '蕲州', 'Qi prefecture (Huai)', 115.40, 30.13, '湖北蕲春'),
  S('shuzhou', '舒州', 'Shu prefecture', 116.57, 30.63, '安徽潜山'),
  // 江南东道
  S('jiangning', '江宁（升州）', 'Jiangning (Sheng prefecture)', 118.78, 32.05, '江苏南京'),
  S('runzhou', '润州', 'Run prefecture', 119.43, 32.20, '江苏镇江'),
  S('changzhou', '常州', 'Chang prefecture', 119.95, 31.78, '江苏常州'),
  S('suzhou', '苏州', 'Su prefecture', 120.62, 31.30, '江苏苏州'),
  S('huzhou', '湖州', 'Hu prefecture', 120.10, 30.87, '浙江湖州'),
  S('hangzhou', '杭州', 'Hang prefecture', 120.16, 30.25, '浙江杭州'),
  S('muzhou', '睦州', 'Mu prefecture', 119.40, 29.55, '浙江建德梅城'),
  S('yuezhou_z', '越州', 'Yue prefecture', 120.58, 30.00, '浙江绍兴'),
  S('mingzhou', '明州', 'Ming prefecture', 121.55, 29.87, '浙江宁波'),
  S('taizhou', '台州', 'Tai prefecture', 121.13, 28.85, '浙江临海'),
  S('wuzhou', '婺州', 'Wu prefecture', 119.65, 29.08, '浙江金华'),
  S('quzhou', '衢州', 'Qu prefecture', 118.87, 28.97, '浙江衢州'),
  S('chuzhou_z', '括州（处州）', 'Kuo (Chu) prefecture', 119.92, 28.45, '浙江丽水'),
  S('wenzhou', '温州', 'Wen prefecture', 120.65, 28.00, '浙江温州'),
  S('fuzhou', '福州', 'Fu prefecture', 119.30, 26.08, '福建福州', { r: 300 }),
  S('jianzhou', '建州', 'Jian prefecture', 118.32, 27.05, '福建建瓯', { r: 280 }),
  S('quanzhou', '泉州', 'Quan prefecture', 118.58, 24.90, '福建泉州', { r: 280 }),
  S('zhangzhou', '漳州', 'Zhang prefecture', 117.65, 24.50, '福建漳州', { r: 280 }),
  S('tingzhou_f', '汀州', 'Ting prefecture (Fujian)', 116.36, 25.82, '福建长汀', { r: 280 }),
  S('xuanzhou', '宣州', 'Xuan prefecture', 118.75, 30.95, '安徽宣城'),
  S('shezhou', '歙州', 'She prefecture', 118.43, 29.87, '安徽歙县'),
  S('chizhou', '池州', 'Chi prefecture', 117.48, 30.66, '安徽池州'),
  // 江南西道
  S('hongzhou', '洪州', 'Hong prefecture', 115.89, 28.68, '江西南昌'),
  S('jiangzhou_x', '江州', 'Jiang prefecture (Xunyang)', 116.00, 29.71, '江西九江'),
  S('raozhou', '饶州', 'Rao prefecture', 116.68, 29.00, '江西鄱阳'),
  S('xinzhou_x', '信州', 'Xin prefecture (Shangrao)', 117.97, 28.45, '江西上饶'),
  S('fuzhou_x', '抚州', 'Fu prefecture (Linchuan)', 116.36, 27.95, '江西抚州'),
  S('jizhou_x', '吉州', 'Ji prefecture (Luling)', 114.99, 27.11, '江西吉安'),
  S('yuanzhou_x', '袁州', 'Yuan prefecture', 114.38, 27.80, '江西宜春'),
  S('qianzhou_x', '虔州', 'Qian prefecture (Gan)', 114.93, 25.85, '江西赣州', { r: 280 }),
  S('tanzhou_x', '潭州', 'Tan prefecture (Changsha)', 112.94, 28.23, '湖南长沙', { b: 10 }),
  S('hengzhou', '衡州', 'Heng prefecture', 112.60, 26.90, '湖南衡阳'),
  S('yongzhou', '永州', 'Yong prefecture', 111.62, 26.22, '湖南永州'),
  S('daozhou', '道州', 'Dao prefecture', 111.60, 25.53, '湖南道县'),
  S('chenzhou_x', '郴州', 'Chen prefecture', 113.02, 25.78, '湖南郴州'),
  S('shaozhou_x', '邵州', 'Shao prefecture', 111.47, 27.24, '湖南邵阳'),
  S('chenzhou_y', '辰州', 'Chen prefecture (Yuan river)', 110.39, 28.47, '湖南沅陵', { r: 260 }),
  S('wuzhou_x', '巫州（叙州）', 'Wu (Xu) prefecture', 109.97, 27.33, '湖南洪江', { r: 260 }),
  // 剑南道
  S('chengdu', '益州（成都府）', 'Yi prefecture (Chengdu)', 104.07, 30.67, '四川成都', { b: 20 }),
  S('pengzhou', '彭州', 'Peng prefecture', 103.94, 31.00, '四川彭州'),
  S('shuzhou_j', '蜀州', 'Shu prefecture', 103.67, 30.63, '四川崇州'),
  S('hanzhou', '汉州', 'Han prefecture', 104.27, 30.98, '四川广汉'),
  S('meizhou', '眉州', 'Mei prefecture', 103.84, 30.05, '四川眉山'),
  S('jiazhou', '嘉州', 'Jia prefecture', 103.76, 29.56, '四川乐山'),
  S('qiongzhou', '邛州', 'Qiong prefecture', 103.46, 30.41, '四川邛崃'),
  S('yazhou', '雅州', 'Ya prefecture', 103.00, 29.98, '四川雅安', { r: 250 }),
  S('lizhou_j', '黎州', 'Li prefecture (Qingxi)', 102.65, 29.35, '四川汉源', { r: 230 }),
  S('maozhou', '茂州', 'Mao prefecture', 103.85, 31.68, '四川茂县', { r: 230 }),
  S('weizhou_j', '维州', 'Wei prefecture (Xishan)', 103.42, 31.50, '四川理县', { r: 230 }),
  S('songzhou_j', '松州', 'Song prefecture', 103.60, 32.64, '四川松潘', { r: 280 }),
  S('xizhou_j', '嶲州', 'Xi prefecture (Yuexi)', 102.27, 27.89, '四川西昌', { r: 300 }),
  S('rongzhou', '戎州', 'Rong prefecture', 104.63, 28.77, '四川宜宾', { r: 350 }),
  S('luzhou_j', '泸州', 'Lu prefecture (Jiannan)', 105.44, 28.87, '四川泸州'),
  S('zizhou_j', '资州', 'Zi prefecture', 104.65, 29.78, '四川资中'),
  S('jianzhou_j', '简州', 'Jian prefecture', 104.55, 30.39, '四川简阳'),
  S('lingzhou_j', '陵州', 'Ling prefecture (Renshou)', 104.13, 30.00, '四川仁寿'),
  S('rongzhou_j', '荣州', 'Rong prefecture (Rongxian)', 104.42, 29.35, '四川荣县'),
  S('zizhou_d', '梓州', 'Zi prefecture (Dongchuan)', 105.10, 31.10, '四川三台'),
  S('mianzhou', '绵州', 'Mian prefecture', 104.74, 31.47, '四川绵阳'),
  S('jianzhou_g', '剑州', 'Jian prefecture (Jiange)', 105.52, 32.05, '四川剑阁'),
  S('longzhou', '龙州', 'Long prefecture', 104.53, 32.40, '四川平武', { r: 230 }),
  S('suizhou_j', '遂州', 'Sui prefecture (Suining)', 105.58, 30.53, '四川遂宁'),
  S('hezhou_j', '合州', 'He prefecture (Hechuan)', 106.27, 29.99, '重庆合川'),
  S('guozhou_j', '果州', 'Guo prefecture', 106.08, 30.80, '四川南充'),
  S('langzhou_j', '阆州', 'Lang prefecture (Langzhong)', 105.98, 31.58, '四川阆中'),
  // 岭南道
  S('guangzhou', '广州', 'Guang prefecture', 113.26, 23.13, '广东广州', { b: 15 }),
  S('shaozhou', '韶州', 'Shao prefecture', 113.60, 24.81, '广东韶关'),
  S('xunzhou', '循州', 'Xun prefecture', 114.42, 23.08, '广东惠州'),
  S('chaozhou', '潮州', 'Chao prefecture', 116.63, 23.66, '广东潮州'),
  S('duanzhou', '端州', 'Duan prefecture', 112.47, 23.05, '广东肇庆'),
  S('kangzhou', '康州', 'Kang prefecture', 111.77, 23.14, '广东德庆'),
  S('fengzhou_l', '封州', 'Feng prefecture (Lingnan)', 111.50, 23.43, '广东封开'),
  S('xinzhou_l', '新州', 'Xin prefecture (Lingnan)', 112.20, 22.70, '广东新兴'),
  S('gaozhou', '高州', 'Gao prefecture', 111.10, 22.00, '广东高州'),
  S('luozhou', '罗州', 'Luo prefecture', 110.28, 21.60, '广东廉江'),
  S('leizhou', '雷州', 'Lei prefecture', 110.08, 20.92, '广东雷州'),
  S('yazhou_h', '崖州', 'Ya prefecture (Hainan)', 110.35, 20.00, '海南海口', { r: 200 }),
  S('danzhou_h', '儋州', 'Dan prefecture (Hainan)', 109.58, 19.52, '海南儋州', { r: 200 }),
  S('zhenzhou_h', '振州', 'Zhen prefecture', 109.17, 18.36, '海南三亚崖城', { r: 200 }),
  S('lianzhou', '连州', 'Lian prefecture', 112.38, 24.78, '广东连州'),
  S('guizhou', '桂州', 'Gui prefecture (Guilin)', 110.28, 25.28, '广西桂林', { r: 280 }),
  S('zhaozhou_l', '昭州', 'Zhao prefecture (Pingle)', 110.64, 24.63, '广西平乐'),
  S('hezhou_l', '贺州', 'He prefecture (Linhe)', 111.57, 24.40, '广西贺州'),
  S('wuzhou_l2', '梧州', 'Wu prefecture (Cangwu)', 111.28, 23.48, '广西梧州'),
  S('liuzhou', '柳州', 'Liu prefecture', 109.41, 24.33, '广西柳州', { r: 280 }),
  S('rongzhou_l', '融州', 'Rong prefecture (Guangxi)', 109.40, 25.08, '广西融水', { r: 250 }),
  S('xiangzhou_l', '象州', 'Xiang prefecture (Guangxi)', 109.68, 23.97, '广西象州'),
  S('xunzhou_l', '浔州', 'Xun prefecture (Guiping)', 110.08, 23.40, '广西桂平'),
  S('rongzhou_r', '容州', 'Rong prefecture (Beiliu)', 110.35, 22.70, '广西北流', { r: 280 }),
  S('yongzhou_l', '邕州', 'Yong prefecture', 108.32, 22.82, '广西南宁', { r: 350 }),
  S('qinzhou_l', '钦州', 'Qin prefecture (Lingnan)', 108.62, 21.97, '广西钦州'),
  S('lianzhou_l', '廉州', 'Lian prefecture (Hepu)', 109.20, 21.66, '广西合浦'),
  S('jiaozhou', '交州（安南都护府）', 'Jiao prefecture (Annan Protectorate)', 105.85, 21.03, '越南河内', { r: 330, b: 10 }),
  S('fengzhou_a', '峰州', 'Feng prefecture (Annan)', 105.20, 21.30, '越南富寿一带', { r: 280 }),
  S('aizhou', '爱州', 'Ai prefecture', 105.77, 19.80, '越南清化', { r: 250 }),
  S('huanzhou', '驩州', 'Huan prefecture', 105.68, 18.67, '越南荣市', { r: 260 }),
  // 西南
  S('yaozhou', '姚州', 'Yao prefecture', 101.24, 25.50, '云南姚安', { r: 300 }),
  S('nanning', '南宁州（郎州）', 'Nanning (Lang) prefecture', 103.80, 25.50, '云南曲靖', { r: 350 }),
  S('kunzhou', '昆州（拓东城）', 'Kun prefecture (Tuodong)', 102.70, 25.04, '云南昆明', { r: 300 }),
  S('taihe', '太和城', 'Taihe', 100.15, 25.62, '云南大理', { r: 450, b: 15 }),
  S('mengshe', '蒙舍诏', 'Mengshe', 100.31, 25.23, '云南巍山', { r: 250 }),
  S('yongchang', '永昌', 'Yongchang', 99.17, 25.11, '云南保山', { r: 500 }),
  S('yinsheng', '银生城', 'Yinsheng', 100.85, 24.45, '云南景东', { r: 500 }),
  S('tieqiao', '铁桥（神川）', 'Iron Bridge (Shenchuan)', 99.60, 27.60, '云南丽江塔城', { r: 400 }),
  S('lhasa', '逻些', 'Rasa (Lhasa)', 91.13, 29.65, '西藏拉萨', { r: 3200, b: 100 }),
  S('supi', '苏毗', 'Sumpa', 92.05, 31.48, '西藏那曲', { r: 3000 }),
  S('xiangxiong', '羊同（象雄）', 'Zhangzhung', 80.10, 32.50, '西藏噶尔', { r: 3200 }),
  S('bailan', '白兰', 'Bailan', 97.00, 33.00, '青海玉树一带', { r: 2000 }),
  S('dangxiang', '党项（河曲）', 'Dangxiang (Yellow river bend)', 102.07, 34.00, '甘肃玛曲', { r: 400 }),
  S('fusi', '伏俟城（吐谷浑）', 'Fusi (Tuyuhun court)', 99.55, 36.97, '青海共和', { r: 1400, b: 20 }),
  S('tuyuhun_w', '柴达木（吐谷浑）', 'Qaidam (Tuyuhun)', 98.10, 36.30, '青海都兰', { r: 1400 }),
  // 朝鲜半岛 · 东北
  S('liaodong', '辽东城', 'Liaodong', 123.17, 41.27, '辽宁辽阳', { r: 220 }),
  S('anshi', '安市城', 'Anshi', 122.75, 40.85, '辽宁海城', { r: 180 }),
  S('xincheng', '新城', 'Xincheng', 123.90, 41.88, '辽宁抚顺', { r: 250 }),
  S('beisha', '卑沙城', 'Beisha', 121.70, 39.10, '辽宁大连金州', { r: 180 }),
  S('fuyu_g', '扶余城', 'Buyeo fort', 124.37, 43.17, '吉林四平', { r: 400 }),
  S('sumo', '粟末', 'Sumo', 126.55, 43.84, '吉林吉林市', { r: 400 }),
  S('guonei', '国内城', 'Gungnae', 126.18, 41.12, '吉林集安', { r: 320 }),
  S('pyongyang', '平壤', 'Pyongyang', 125.75, 39.03, '朝鲜平壤', { r: 280, b: 20 }),
  S('zhacheng', '栅城', 'Chaekseong', 130.37, 42.86, '吉林珲春', { r: 400 }),
  S('nanhai', '东海岸（南海府）', 'East coast (Namhae)', 128.33, 40.00, '朝鲜北青', { r: 300 }),
  S('haeju', '浿江以南（海州）', 'South of the Taedong (Haeju)', 125.72, 38.04, '朝鲜海州', { r: 200 }),
  S('gyeongju', '金城（新罗）', 'Geumseong (Silla)', 129.21, 35.84, '韩国庆州', { r: 300, b: 20 }),
  S('hanzhou_s', '汉山州', 'Hansan', 127.00, 37.55, '韩国首尔', { r: 230 }),
  S('myeongju', '溟州', 'Myeongju', 128.90, 37.75, '韩国江陵', { r: 230 }),
  S('sangju', '尚州', 'Sangju', 128.16, 36.41, '韩国尚州', { r: 200 }),
  S('sabi', '泗沘（百济）', 'Sabi (Baekje)', 126.91, 36.28, '韩国扶余', { r: 230, b: 10 }),
  S('wansan', '完山州', 'Wansan', 127.15, 35.82, '韩国全州', { r: 200 }),
  S('mujin', '武珍州', 'Mujin', 126.85, 35.16, '韩国光州', { r: 220 }),
  S('bohai_old', '旧国（敖东城）', 'Old capital of Balhae', 128.23, 43.37, '吉林敦化', { r: 400 }),
  S('bohai_up', '上京龙泉府', 'Upper capital of Balhae', 129.00, 44.00, '黑龙江宁安', { r: 450 }),
  S('bohai_e', '率宾府', 'Solbin', 131.95, 43.80, '俄罗斯乌苏里斯克', { r: 350 }),
  S('fuyu_b', '扶余府', 'Buyeo prefecture', 125.17, 44.43, '吉林农安', { r: 380 }),
  // 日本 · 南海
  S('nara', '平城京', 'Heijō-kyō', 135.80, 34.68, '日本奈良', { r: 700 }),
  S('dazaifu', '大宰府', 'Dazaifu', 130.52, 33.52, '日本太宰府', { r: 400 }),
  S('tagajo', '多贺城', 'Taga fort', 140.98, 38.30, '日本多贺城', { r: 350 }),
  S('linyi', '林邑（环王）', 'Linyi (Champa)', 108.25, 15.85, '越南茶荞', { r: 600 }),
  S('piao', '骠国', 'Pyu', 95.29, 18.80, '缅甸卑谬', { r: 450 }),
];

const T = 'tang';
const ANXI = 'tang_anxi', BEITING = 'tang_beiting', ANBEI = 'tang_anbei', DANYU = 'tang_danyu', ANDONG = 'tang_andong',
  ANNAN = 'tang_annan', KUNMENG = 'tang_kunmeng', GUIYI = 'tang_guiyi';
const XTJ = 'tang_xitujue', XYT = 'tang_xueyantuo', XIYU = 'tang_xiyu', TQS = 'tang_tuqishi', GLL = 'tang_geluolu',
  DASHI = 'tang_dashi', QIDAN = 'tang_qidan', YAN = 'tang_yan';

const holds: Record<string, Hold[]> = {};
/** From `year`, `polity` holds the seats (space-separated ids), per `src`. */
const ev = (year: number, polity: string | null, src: string, ids: string) => {
  for (const id of ids.trim().split(/\s+/)) (holds[id] ??= []).push([year, polity, src]);
};

// ── 618: the Tang core, and everyone else ────────────────────────────────────────────────────────────────────────────
ev(618, T, 'jts.gaozu', `changan huazhou tongzhou fengxiang binzhou jingzhou_g ningzhou qingzhou_g fuzhou_f danzhou_g yanzhou_g
  suizhou_g lingzhou huizhou yanzhou_y youzhou_x yuanzhou qinzhou weizhou chengzhou wuzhou_l dangzhou minzhou taozhou diezhou
  linzhou_l lanzhou hezhou kuozhou shanzhou shancheng puzhou jinzhou_s jiangzhou cizhou_s xizhou_s luzhou zezhou qinzhou_s
  liaozhou shangzhou jinzhou liangzhou_s yangzhou_s fengzhou_s xingzhou_s lizhou bazhou tongzhou_s kaizhou wanzhou zhongzhou
  kuizhou yuzhou fuzhou_c qianzhou chengdu pengzhou shuzhou_j hanzhou meizhou jiazhou qiongzhou yazhou lizhou_j maozhou
  weizhou_j songzhou_j xizhou_j rongzhou luzhou_j zizhou_j jianzhou_j lingzhou_j rongzhou_j zizhou_d mianzhou jianzhou_g longzhou
  suizhou_j hezhou_j guozhou_j langzhou_j shanzhou_h guozhou anzhou suizhou youzhou zhuozhou jizhou_y guizhou_y yingzhou
  sizhou_q bozhou_q zangke yaozhou nanning kunzhou`);
ev(618, 'tang_lg', 'jts.lg', 'liangzhou ganzhou suzhou_l guazhou shazhou');
ev(619, T, 'jts.lg', 'liangzhou ganzhou suzhou_l guazhou shazhou');
ev(618, 'tang_lwz', 'jts.lwz', 'shuozhou daizhou yunzhou weizhou_y');
ev(619, 'tang_lwz', 'jts.lwz', 'taiyuan fenzhou xinzhou lanzhou_s shizhou jinzhou_s');
ev(618, T, 'jts.gaozu', 'taiyuan fenzhou xinzhou lanzhou_s shizhou');
ev(620, T, 'jts.lwz', 'taiyuan fenzhou xinzhou lanzhou_s shizhou jinzhou_s daizhou weizhou_y');
ev(620, 'tujue', 'jts.lwz', 'shuozhou yunzhou');
ev(628, T, 'jts.taizong', 'shuozhou');
ev(618, 'tang_lsd', 'jts.lsd', 'xiazhou yinzhou linzhou');
ev(628, T, 'jts.lsd', 'xiazhou yinzhou linzhou');
ev(618, 'tujue', 'jts.tujue', 'fengzhou shengzhou danyu yinshan qikou xilin otuken kerulen shouxiang_e');
ev(629, T, 'jts.taizong', 'shengzhou fengzhou yunzhou');
ev(618, 'tang_wsc', 'jts.wsc', `luoyang zhengzhou bianzhou xuzhou_h ruzhou chenzhou_h caizhou yingzhou_y songzhou bozhou huaizhou
  xiangzhou_s dengzhou_s tangzhou shenzhou_h guangzhou_h junzhou fangzhou_s caozhou puzhou_h yunzhou_h yanzhou`);
ev(621, T, 'jts.wsc', `luoyang zhengzhou bianzhou xuzhou_h ruzhou chenzhou_h caizhou yingzhou_y songzhou bozhou huaizhou
  xiangzhou_s dengzhou_s tangzhou shenzhou_h guangzhou_h junzhou fangzhou_s caozhou puzhou_h yunzhou_h yanzhou`);
ev(618, 'tang_djd', 'jts.djd', `weizhou_m bozhou_h xiangzhou weizhou_h huazhou_h mingzhou_h xingzhou zhaozhou zhenzhou dingzhou
  yizhou_h jizhou_h shenzhou beizhou yingzhou_h mozhou cangzhou dezhou dizhou`);
ev(621, T, 'jts.djd', `weizhou_m bozhou_h xiangzhou weizhou_h huazhou_h mingzhou_h xingzhou zhaozhou zhenzhou dingzhou
  yizhou_h jizhou_h shenzhou beizhou yingzhou_h mozhou cangzhou dezhou dizhou`);
ev(618, 'tang_gkd', 'jts.gkd', 'pingzhou tanzhou');
ev(624, T, 'jts.gkd', 'pingzhou tanzhou');
ev(618, null, 'est', 'qingzhou zizhou qizhou laizhou dengzhou mizhou yizhou_s haizhou xuzhou suzhou_h sizhou');
ev(621, T, 'jts.gaozu', 'qingzhou zizhou qizhou laizhou dengzhou mizhou yizhou_s haizhou xuzhou suzhou_h sizhou');
ev(618, 'tang_xx', 'jts.xx', `jiangling xiazhou_s guizhou_s lizhou_x langzhou yuezhou ezhou yingzhou_s fuzhou_h tanzhou_x hengzhou
  yongzhou daozhou chenzhou_x shaozhou_x chenzhou_y wuzhou_x lianzhou huangzhou qizhou_h guizhou zhaozhou_l hezhou_l wuzhou_l2
  liuzhou rongzhou_l xiangzhou_l xunzhou_l rongzhou_r yongzhou_l qinzhou_l lianzhou_l guangzhou shaozhou xunzhou chaozhou
  duanzhou kangzhou fengzhou_l xinzhou_l`);
ev(621, T, 'jts.xx', `jiangling xiazhou_s guizhou_s lizhou_x langzhou yuezhou ezhou yingzhou_s fuzhou_h tanzhou_x hengzhou
  yongzhou daozhou chenzhou_x shaozhou_x chenzhou_y wuzhou_x lianzhou huangzhou qizhou_h`);
ev(622, T, 'jts.gaozu', `guizhou zhaozhou_l hezhou_l wuzhou_l2 liuzhou rongzhou_l xiangzhou_l xunzhou_l rongzhou_r yongzhou_l
  qinzhou_l lianzhou_l guangzhou shaozhou xunzhou chaozhou duanzhou kangzhou fengzhou_l xinzhou_l`);
ev(618, null, 'est', 'gaozhou luozhou leizhou yazhou_h danzhou_h zhenzhou_h jiaozhou fengzhou_a aizhou huanzhou');
ev(622, T, 'jts.gaozu', 'gaozhou luozhou leizhou yazhou_h danzhou_h zhenzhou_h jiaozhou fengzhou_a aizhou huanzhou');
ev(618, 'tang_lsh', 'jts.lsh', 'hongzhou jiangzhou_x fuzhou_x jizhou_x yuanzhou_x qianzhou_x');
ev(622, T, 'jts.lsh', 'hongzhou jiangzhou_x fuzhou_x jizhou_x yuanzhou_x qianzhou_x');
ev(618, 'tang_dfw', 'jts.dfw', 'hezhou_h chuzhou_c luzhou_h shuzhou shouzhou haozhou');
ev(619, 'tang_lzt', 'jts.lzt', 'yangzhou chuzhou');
ev(618, 'tang_sfx', 'jts.lzt', 'runzhou changzhou suzhou huzhou hangzhou yuezhou_z jiangning');
ev(620, 'tang_lzt', 'jts.lzt', 'runzhou changzhou suzhou huzhou hangzhou yuezhou_z jiangning');
ev(621, 'tang_dfw', 'jts.dfw', 'yangzhou chuzhou runzhou changzhou suzhou huzhou hangzhou yuezhou_z jiangning');
ev(618, 'tang_wh', 'jts.gaozu', 'xuanzhou shezhou muzhou wuzhou quzhou raozhou chizhou xinzhou_x');
ev(621, T, 'jts.gaozu', 'xuanzhou shezhou muzhou wuzhou quzhou raozhou chizhou xinzhou_x');
ev(618, null, 'est', 'mingzhou taizhou chuzhou_z wenzhou fuzhou jianzhou quanzhou zhangzhou tingzhou_f');
ev(622, T, 'est', 'mingzhou taizhou chuzhou_z wenzhou fuzhou jianzhou quanzhou zhangzhou tingzhou_f');
// 杜伏威 enters court (622); 辅公祏 rises at 丹阳 (623) and is put down (624)
ev(622, T, 'jts.dfw', 'hezhou_h chuzhou_c luzhou_h shuzhou shouzhou haozhou yangzhou chuzhou');
ev(623, 'tang_dfw', 'jts.dfw', 'runzhou changzhou suzhou huzhou hangzhou yuezhou_z jiangning xuanzhou');
ev(624, T, 'jts.dfw', 'runzhou changzhou suzhou huzhou hangzhou yuezhou_z jiangning xuanzhou');

// ── the north and west: Turks, Tiele, the Western Regions ────────────────────────────────────────────────────────────
ev(618, 'tang_gaochang', 'jts.xirong', 'xizhou jiaohe');
ev(618, XIYU, 'jts.xirong', 'yizhou_l pulei yanqi qiuci yutian shule congling kangguo anguo shiguo bahanna jibin xiaobolu dabolu');
ev(618, 'tuyuhun', 'jts.xirong', 'fusi tuyuhun_w shicheng boxian');
ev(618, XTJ, 'jts.tujue', 'tingzhou luntai suiye gongyue talas otrar balkhash geluolu tuhuoluo altai');
ev(618, 'tang_bosi', 'jts.xirong', 'bosi');
ev(618, XIYU, 'est', 'xwarizm');
ev(618, 'tang_xiajiasi', 'xts.huihu', 'xiajiasi');
ev(618, 'tang_shiwei', 'jts.beidi', 'shiwei');
ev(618, 'tang_mohe', 'jts.beidi', 'heishui');
ev(618, QIDAN, 'jts.beidi', 'qidan xi');
ev(618, null, 'est', 'tongcheng shouxiang_w shouxiang_m');
// 630: 李靖 breaks the Eastern Turks; the south of the Gobi becomes 羁縻府州, the north goes to the 薛延陀
ev(628, XYT, 'jts.beidi', 'otuken kerulen');
ev(630, DANYU, 'jts.tujue', 'danyu yinshan qikou xilin');
ev(630, T, 'jts.taizong', 'yizhou_l pulei shouxiang_e');
ev(630, XYT, 'jts.beidi', 'tongcheng');
// 640: 侯君集 takes 高昌 (西州, 安西都护府 at 交河); 庭州 set up
ev(640, T, 'jts.taizong', 'xizhou tingzhou luntai');
ev(640, ANXI, 'jts.taizong', 'jiaohe');
ev(644, ANXI, 'jts.taizong', 'yanqi');
// 646: the 薛延陀 destroyed; 647 燕然都护府 over the Tiele 府州 north of the Gobi
ev(646, ANBEI, 'jts.beidi', 'otuken kerulen tongcheng');
ev(650, ANBEI, 'jts.gaozong', 'altai');
// 648: 阿史那社尔 takes 龟兹; the four garrisons
ev(648, ANXI, 'jts.taizong', 'qiuci yutian shule congling');
ev(648, T, 'xts.beidi', 'qidan xi');
// 651–657 阿史那贺鲁; 657 苏定方 ends the Western Turks: 昆陵、濛池都护府; 658–661 都督府 to the Oxus
ev(657, KUNMENG, 'jts.gaozong', 'suiye gongyue talas otrar balkhash geluolu');
ev(658, T, 'xts.dili', 'jiaohe');
ev(658, ANXI, 'xts.xiyu', 'kangguo anguo shiguo bahanna');
ev(661, ANXI, 'xts.dili', 'tuhuoluo jibin');
ev(651, 'tang_dashi', 'xts.xiyu', 'bosi');
// 663 吐蕃 takes the 吐谷浑; 670 the four garrisons fall; 679 裴行俭 restores them with 碎叶; 686 given up; 692 王孝杰
ev(663, 'tubo', 'jts.tubo', 'fusi tuyuhun_w shicheng boxian');
ev(670, 'tubo', 'jts.gaozong', 'qiuci yutian shule congling yanqi');
ev(670, XTJ, 'est', 'gongyue talas otrar balkhash geluolu suiye');
ev(674, T, 'est', 'shicheng boxian');
ev(674, ANXI, 'jts.gaozong', 'yutian');
ev(679, ANXI, 'jts.pxj', 'qiuci shule congling suiye yanqi');
ev(686, 'tubo', 'est', 'qiuci yutian shule congling yanqi');
ev(686, XTJ, 'est', 'suiye');
ev(692, ANXI, 'jts.zetian', 'qiuci yutian shule congling yanqi suiye');
// 682 the Turks rise again (后突厥): the south of the Gobi, then (687) the north
ev(682, 'tujue', 'jts.tujue', 'qikou xilin yinshan');
ev(687, 'tujue', 'jts.tujue', 'otuken kerulen');
ev(687, ANBEI, 'xts.dili', 'tongcheng');
ev(698, 'tujue', 'est', 'altai geluolu');
// 699–703 the 突骑施 take the Western Turk lands; 702 北庭都护府
ev(699, TQS, 'xts.tujue', 'gongyue talas balkhash otrar');
ev(703, TQS, 'xts.tujue', 'suiye');
ev(702, BEITING, 'jts.zetian', 'tingzhou luntai');
// 708 张仁愿 builds the three 受降城 north of the Yellow river; 714 安北 at 中受降城
ev(708, T, 'jts.zry', 'shouxiang_w shouxiang_m yinshan');
ev(714, ANBEI, 'xts.dili', 'shouxiang_m');
// 大食 over the Oxus and Sogdiana (705–715)
ev(705, DASHI, 'est', 'tuhuoluo');
ev(709, DASHI, 'est', 'anguo');
ev(712, DASHI, 'est', 'kangguo xwarizm');
ev(700, XIYU, 'est', 'jibin');
// 小勃律 between 吐蕃 and 安西
ev(700, 'tubo', 'est', 'dabolu');
ev(737, 'tubo', 'xts.tubo', 'xiaobolu');
ev(747, ANXI, 'jts.xuanzong', 'xiaobolu');
// 739 盖嘉运 breaks the 突骑施
ev(739, ANXI, 'jts.xuanzong', 'suiye');
ev(739, BEITING, 'est', 'gongyue');
// 744 回纥 replace the Turks north of the Gobi
ev(744, 'huihe', 'jts.huihe', 'otuken kerulen qikou xilin altai');
ev(744, GLL, 'est', 'geluolu');
ev(751, DASHI, 'zztj', 'shiguo');
ev(756, XIYU, 'est', 'bahanna');
ev(766, GLL, 'est', 'suiye gongyue talas balkhash otrar');
ev(790, 'huihe', 'est', 'tongcheng');

// ── the north-east and Korea ─────────────────────────────────────────────────────────────────────────────────────────
ev(618, 'goguryeo', 'jts.dongyi', 'liaodong anshi xincheng beisha fuyu_g sumo guonei pyongyang zhacheng nanhai haeju');
ev(618, 'silla', 'jts.dongyi', 'gyeongju hanzhou_s myeongju sangju');
ev(618, 'tang_baekje', 'jts.dongyi', 'sabi wansan mujin');
ev(660, T, 'jts.gaozong', 'sabi wansan mujin');
ev(668, ANDONG, 'jts.gaozong', 'liaodong anshi xincheng beisha fuyu_g sumo guonei pyongyang zhacheng nanhai haeju');
ev(671, 'silla', 'est', 'sabi wansan mujin');
ev(676, null, 'est', 'pyongyang nanhai haeju');
ev(676, ANDONG, 'xts.dili', 'liaodong');
ev(696, QIDAN, 'jts.zetian', 'qidan xi yingzhou');
ev(717, T, 'jts.xuanzong', 'qidan xi yingzhou');
ev(730, QIDAN, 'jts.beidi', 'qidan xi');
ev(698, 'bohai', 'jts.beidi', 'bohai_old sumo zhacheng');
ev(720, 'bohai', 'est', 'bohai_up bohai_e fuyu_b guonei nanhai fuyu_g');
ev(618, 'tang_mohe', 'est', 'bohai_old bohai_up bohai_e fuyu_b');
ev(735, 'silla', 'jts.dongyi', 'haeju');
ev(761, 'bohai', 'est', 'liaodong anshi xincheng beisha');
ev(762, QIDAN, 'est', 'yingzhou');

// ── the south-west: 吐蕃, 吐谷浑, 南诏 ─────────────────────────────────────────────────────────────────────────────────
ev(618, 'tubo', 'jts.tubo', 'lhasa supi');
ev(618, 'tang_yangtong', 'xts.xiyu', 'xiangxiong');
ev(644, 'tubo', 'est', 'xiangxiong');
ev(618, null, 'est', 'bailan tieqiao');
ev(618, 'tang_liuzhao', 'xts.nanzhao', 'taihe yongchang yinsheng');
ev(640, 'tubo', 'est', 'bailan');
ev(618, 'tuyuhun', 'est', 'dangxiang');
ev(631, T, 'jts.xirong', 'dangxiang');
ev(680, 'tubo', 'est', 'dangxiang tieqiao');
ev(649, 'nanzhao', 'xts.nanzhao', 'mengshe');
ev(738, 'nanzhao', 'xts.nanzhao', 'taihe yongchang yinsheng');
ev(750, 'nanzhao', 'xts.nanzhao', 'yaozhou');
ev(757, 'nanzhao', 'xts.nanzhao', 'xizhou_j kunzhou nanning');
ev(794, 'nanzhao', 'xts.nanzhao', 'tieqiao');
ev(794, T, 'est', 'xizhou_j');
ev(869, 'nanzhao', 'xts.nanzhao', 'xizhou_j');
// the 吐蕃 over 河西 and 陇右 after 755
ev(763, 'tubo', 'xts.tubo', 'lanzhou hezhou shanzhou shancheng kuozhou taozhou minzhou qinzhou chengzhou weizhou linzhou_l dangzhou diezhou wuzhou_l songzhou_j weizhou_j yuanzhou huizhou');
ev(764, 'tubo', 'xts.tubo', 'liangzhou');
ev(766, 'tubo', 'xts.tubo', 'ganzhou suzhou_l');
ev(776, 'tubo', 'est', 'guazhou');
ev(781, 'tubo', 'est', 'yizhou_l pulei');
ev(786, 'tubo', 'est', 'shazhou yanzhou_y');
ev(793, T, 'jts.dezong', 'yanzhou_y');
ev(790, 'tubo', 'xts.tubo', 'tingzhou luntai');
ev(792, 'huihe', 'xts.huihu', 'tingzhou luntai');
ev(791, 'tubo', 'est', 'qiuci yanqi shule congling shicheng boxian xiaobolu');
ev(792, 'tubo', 'est', 'yutian xizhou jiaohe');
// 840 the 黠戛斯 end the Uyghur khaganate; 842 the Tibetan empire breaks up
ev(840, 'tang_xiajiasi', 'xts.huihu', 'otuken kerulen altai');
ev(840, null, 'est', 'qikou xilin tongcheng');
ev(840, 'huihu_w', 'est', 'qiuci yanqi');
ev(842, 'tubo_bu', 'xts.tubo', `lhasa supi xiangxiong bailan dangxiang fusi tuyuhun_w lanzhou hezhou shanzhou shancheng kuozhou
  taozhou minzhou linzhou_l dangzhou diezhou shicheng boxian guazhou shazhou ganzhou suzhou_l liangzhou yizhou_l pulei
  yutian shule congling xiaobolu dabolu`);
// 848–851 张议潮's 归义军 takes back 河西; 849 秦、原 and the passes return; 861 凉州; 866 the Uyghurs at 西州
ev(849, T, 'jts.xuanzong2', 'qinzhou yuanzhou weizhou chengzhou wuzhou_l huizhou');
ev(848, GUIYI, 'xts.tubo', 'shazhou guazhou');
ev(851, GUIYI, 'xts.tubo', 'ganzhou suzhou_l yizhou_l pulei xizhou jiaohe lanzhou shanzhou hezhou minzhou kuozhou');
ev(861, GUIYI, 'xts.tubo', 'liangzhou');
ev(866, 'huihu_w', 'xts.huihu', 'xizhou jiaohe tingzhou luntai');
ev(866, 'tang_xiyu', 'est', 'yutian');
ev(870, 'tatar', 'est', 'qikou');
ev(884, 'tang_ganzhou', 'est', 'ganzhou');
ev(890, 'tubo_bu', 'est', 'lanzhou shanzhou hezhou minzhou kuozhou liangzhou');

// ── 安南, 林邑 and the far neighbours ────────────────────────────────────────────────────────────────────────────────
ev(679, ANNAN, 'jts.gaozong', 'jiaozhou fengzhou_a aizhou huanzhou');
ev(863, 'nanzhao', 'xts.nanzhao', 'jiaozhou fengzhou_a');
ev(866, ANNAN, 'xts.nanzhao', 'jiaozhou fengzhou_a');
ev(618, 'tang_linyi', 'jts.nanman', 'linyi');
ev(618, 'tang_piao', 'xts.nanzhao', 'piao');
ev(618, 'tang_tianzhu', 'jts.xirong', 'tianzhu_n tianzhu_e multan kashmir nipoluo kamarupa');
ev(618, 'japan', 'jts.dongyi', 'nara dazaifu');
ev(618, null, 'est', 'tagajo');
ev(724, 'japan', 'est', 'tagajo');

// ── 安史之乱 (755–763) ───────────────────────────────────────────────────────────────────────────────────────────────
const HEBEI = `youzhou zhuozhou tanzhou jizhou_y pingzhou guizhou_y yizhou_h dingzhou zhenzhou zhaozhou xingzhou mingzhou_h xiangzhou
  weizhou_h weizhou_m bozhou_h beizhou jizhou_h shenzhou yingzhou_h mozhou cangzhou dezhou dizhou yingzhou`;
ev(755, YAN, 'jts.als', HEBEI + ' yunzhou weizhou_y');
ev(756, YAN, 'jts.als', `luoyang zhengzhou bianzhou huazhou_h shanzhou_h guozhou ruzhou xuzhou_h chenzhou_h caizhou caozhou puzhou_h
  yunzhou_h huaizhou changan huazhou tongzhou`);
ev(757, T, 'jts.suzong', `luoyang zhengzhou bianzhou huazhou_h shanzhou_h guozhou ruzhou xuzhou_h chenzhou_h caizhou caozhou
  puzhou_h yunzhou_h huaizhou changan huazhou tongzhou`);
ev(759, YAN, 'jts.suzong', 'luoyang zhengzhou bianzhou huazhou_h ruzhou xuzhou_h huaizhou caozhou puzhou_h yunzhou_h');
ev(762, T, 'jts.daizong', 'luoyang zhengzhou bianzhou huazhou_h ruzhou xuzhou_h huaizhou caozhou puzhou_h yunzhou_h');
ev(763, T, 'jts.daizong', HEBEI.split(/\s+/).filter(id => id !== 'yingzhou').join(' ') + ' yunzhou weizhou_y');

// ── 黄巢 (880–884) ───────────────────────────────────────────────────────────────────────────────────────────────────
ev(881, 'tang_daqi', 'jts.huangchao', 'changan huazhou tongzhou shangzhou');
ev(883, T, 'jts.xizong', 'changan huazhou tongzhou shangzhou');

// ── the 藩镇 tear the empire apart (885–907) ─────────────────────────────────────────────────────────────────────────
ev(887, 'tang_xuanwu', 'zztj', `bianzhou songzhou bozhou yingzhou_y xuzhou_h chenzhou_h caizhou zhengzhou huazhou_h caozhou puzhou_h`);
ev(893, 'tang_xuanwu', 'zztj', 'xuzhou suzhou_h sizhou haizhou');
ev(897, 'tang_xuanwu', 'zztj', 'yunzhou_h yanzhou yizhou_s mizhou luoyang ruzhou huaizhou');
ev(898, 'tang_xuanwu', 'zztj', 'xingzhou mingzhou_h weizhou_m bozhou_h beizhou xiangzhou weizhou_h');
ev(900, 'tang_xuanwu', 'zztj', 'zhenzhou zhaozhou jizhou_h shenzhou dingzhou yizhou_h');
ev(901, 'tang_xuanwu', 'zztj', 'puzhou jinzhou_s jiangzhou cizhou_s xizhou_s shanzhou_h guozhou huazhou tongzhou');
ev(890, 'tang_hedong', 'zztj', `taiyuan fenzhou qinzhou_s liaozhou xinzhou daizhou lanzhou_s shizhou shuozhou yunzhou weizhou_y
  danyu shengzhou linzhou luzhou zezhou`);
ev(893, 'tang_lulong', 'zztj', 'youzhou zhuozhou tanzhou jizhou_y pingzhou guizhou_y yingzhou_h mozhou');
ev(898, 'tang_lulong', 'zztj', 'cangzhou dezhou dizhou');
ev(891, 'tang_xichuan', 'zztj', `chengdu pengzhou shuzhou_j hanzhou meizhou jiazhou qiongzhou yazhou lizhou_j maozhou zizhou_j
  jianzhou_j lingzhou_j rongzhou_j`);
ev(897, 'tang_xichuan', 'zztj', `zizhou_d mianzhou jianzhou_g longzhou suizhou_j hezhou_j guozhou_j langzhou_j luzhou_j rongzhou
  yuzhou fuzhou_c`);
ev(902, 'tang_xichuan', 'zztj', 'liangzhou_s yangzhou_s lizhou bazhou tongzhou_s xingzhou_s fengzhou_s');
ev(892, 'tang_huainan', 'zztj', `yangzhou chuzhou hezhou_h chuzhou_c luzhou_h shouzhou haozhou shuzhou xuanzhou runzhou changzhou
  jiangning shezhou chizhou guangzhou_h`);
ev(902, 'tang_huainan', 'zztj', 'huangzhou qizhou_h');
ev(893, 'tang_zhenhai', 'zztj', 'hangzhou huzhou muzhou suzhou');
ev(896, 'tang_zhenhai', 'zztj', 'yuezhou_z mingzhou taizhou wuzhou quzhou chuzhou_z wenzhou');
ev(896, 'tang_wuan', 'zztj', 'tanzhou_x hengzhou yongzhou daozhou chenzhou_x shaozhou_x lianzhou');
ev(899, 'tang_wuan', 'zztj', 'guizhou zhaozhou_l hezhou_l');
ev(899, 'tang_wuan', 'est', 'liuzhou xiangzhou_l rongzhou_l chenzhou_y wuzhou_x');
ev(896, 'tang_lingnan', 'est', 'yongzhou_l xunzhou_l qinzhou_l lianzhou_l');
ev(880, null, 'est', 'sizhou_q bozhou_q zangke');
ev(893, 'tang_weiwu', 'zztj', 'fuzhou jianzhou quanzhou zhangzhou tingzhou_f');
ev(896, 'tang_lingnan', 'zztj', `guangzhou shaozhou xunzhou chaozhou duanzhou kangzhou fengzhou_l xinzhou_l gaozhou luozhou leizhou
  yazhou_h danzhou_h zhenzhou_h wuzhou_l2 rongzhou_r`);
ev(887, 'tang_qiguo', 'zztj', 'fengxiang qinzhou weizhou chengzhou wuzhou_l');
ev(895, 'tang_qiguo', 'zztj', 'binzhou ningzhou qingzhou_g jingzhou_g yuanzhou fuzhou_f danzhou_g yanzhou_g');
ev(881, 'tang_dingnan', 'zztj', 'xiazhou yinzhou suizhou_g youzhou_x');
ev(886, 'tang_jiangxi', 'zztj', 'hongzhou jiangzhou_x raozhou xinzhou_x fuzhou_x jizhou_x yuanzhou_x qianzhou_x');
ev(888, 'tang_jingxiang', 'zztj', `jiangling xiazhou_s guizhou_s xiangzhou_s dengzhou_s tangzhou junzhou fangzhou_s yingzhou_s fuzhou_h
  suizhou anzhou lizhou_x langzhou yuezhou ezhou kuizhou`);

for (const h of Object.values(holds)) h.sort((a, b) => a[0] - b[0]);

export const TANG: OwnEra = {
  replaces: 'tang',
  reach: 250,
  polities: [
    { id: ANXI, name: { zh: '安西都护府', en: 'Anxi Protectorate' }, color: '#d98a7e', role: 'protectorate' },
    { id: BEITING, name: { zh: '北庭都护府', en: 'Beiting Protectorate' }, color: '#d9a08e', role: 'protectorate' },
    { id: ANBEI, name: { zh: '安北都护府', en: 'Anbei Protectorate' }, color: '#cf9a86', role: 'protectorate' },
    { id: DANYU, name: { zh: '单于都护府', en: 'Chanyu Protectorate' }, color: '#d6a58c', role: 'protectorate' },
    { id: ANDONG, name: { zh: '安东都护府', en: 'Andong Protectorate' }, color: '#d39486', role: 'protectorate' },
    { id: ANNAN, name: { zh: '安南都护府', en: 'Annan Protectorate' }, color: '#dd9c82', role: 'protectorate' },
    { id: KUNMENG, name: { zh: '昆陵 · 濛池都护府', en: 'Kunling and Mengchi Protectorates' }, color: '#dbb19c', role: 'protectorate' },
    { id: GUIYI, name: { zh: '归义军', en: 'Guiyi Army' }, color: '#c98b6b', role: 'protectorate' },
    { id: 'tang_lg', name: { zh: '凉（李轨）', en: 'Liang (Li Gui)' }, color: '#8e7cc3', role: 'rival' },
    { id: 'tang_lwz', name: { zh: '刘武周', en: 'Liu Wuzhou' }, color: '#7d6b5a', role: 'rival' },
    { id: 'tang_lsd', name: { zh: '梁（梁师都）', en: 'Liang (Liang Shidu)' }, color: '#9b7653', role: 'rival' },
    { id: 'tang_wsc', name: { zh: '郑（王世充）', en: 'Zheng (Wang Shichong)' }, color: '#8c3b3b', role: 'rival' },
    { id: 'tang_djd', name: { zh: '夏（窦建德）', en: 'Xia (Dou Jiande)' }, color: '#3f8f6a', role: 'rival' },
    { id: 'tang_gkd', name: { zh: '燕（高开道）', en: 'Yan (Gao Kaidao)' }, color: '#6b8e9b', role: 'rival' },
    { id: 'tang_xx', name: { zh: '梁（萧铣）', en: 'Liang (Xiao Xian)' }, color: '#5b7fa6', role: 'rival' },
    { id: 'tang_lsh', name: { zh: '楚（林士弘）', en: 'Chu (Lin Shihong)' }, color: '#b5632a', role: 'rival' },
    { id: 'tang_dfw', name: { zh: '吴（杜伏威 · 辅公祏）', en: 'Wu (Du Fuwei, Fu Gongshi)' }, color: '#6b5b95', role: 'rival' },
    { id: 'tang_lzt', name: { zh: '吴（李子通）', en: 'Wu (Li Zitong)' }, color: '#17a589', role: 'rival' },
    { id: 'tang_sfx', name: { zh: '梁（沈法兴）', en: 'Liang (Shen Faxing)' }, color: '#a569bd', role: 'rival' },
    { id: 'tang_wh', name: { zh: '吴（汪华）', en: 'Wu (Wang Hua)' }, color: '#d4ac0d', role: 'rival' },
    { id: YAN, name: { zh: '大燕（安史）', en: 'Great Yan (An Lushan, Shi Siming)' }, color: '#5d4e75', role: 'rival' },
    { id: 'tang_daqi', name: { zh: '大齐（黄巢）', en: 'Great Qi (Huang Chao)' }, color: '#8c3b3b', role: 'rival' },
    { id: 'tang_xuanwu', name: { zh: '宣武（朱温）', en: 'Xuanwu (Zhu Wen)' }, color: '#b5632a', role: 'rival' },
    { id: 'tang_hedong', name: { zh: '河东（李克用）', en: 'Hedong (Li Keyong)' }, color: '#5b6fa8', role: 'rival' },
    { id: 'tang_lulong', name: { zh: '卢龙（刘仁恭）', en: 'Lulong (Liu Rengong)' }, color: '#6b8e9b', role: 'rival' },
    { id: 'tang_qiguo', name: { zh: '岐（李茂贞）', en: 'Qi (Li Maozhen)' }, color: '#a04f6b', role: 'rival' },
    { id: 'tang_xichuan', name: { zh: '西川（王建）', en: 'Xichuan (Wang Jian)' }, color: '#d47a27', role: 'rival' },
    { id: 'tang_huainan', name: { zh: '淮南（杨行密）', en: 'Huainan (Yang Xingmi)' }, color: '#3f8f6a', role: 'rival' },
    { id: 'tang_zhenhai', name: { zh: '镇海 · 镇东（钱镠）', en: 'Zhenhai and Zhendong (Qian Liu)' }, color: '#17a589', role: 'rival' },
    { id: 'tang_wuan', name: { zh: '武安（马殷）', en: 'Wu’an (Ma Yin)' }, color: '#dc7633', role: 'rival' },
    { id: 'tang_weiwu', name: { zh: '威武（王审知）', en: 'Weiwu (Wang Shenzhi)' }, color: '#a569bd', role: 'rival' },
    { id: 'tang_lingnan', name: { zh: '清海（刘隐）', en: 'Qinghai (Liu Yin)' }, color: '#d4ac0d', role: 'rival' },
    { id: 'tang_jiangxi', name: { zh: '镇南（钟传）', en: 'Zhennan (Zhong Chuan)' }, color: '#7fb3a6', role: 'rival' },
    { id: 'tang_jingxiang', name: { zh: '荆襄诸镇（赵匡凝 · 成汭等）', en: 'Jing–Xiang commands (Zhao Kuangning, Cheng Rui and others)' }, color: '#cd6155', role: 'rival' },
    { id: 'tang_dingnan', name: { zh: '定难军（党项拓跋）', en: 'Dingnan army (Tangut Tuoba)' }, color: '#9b7653', role: 'rival' },
    { id: 'tang_liuzhao', name: { zh: '六诏（洱海诸蛮）', en: 'The Six Zhao (peoples of Erhai)' }, color: '#c4b7d9', role: 'neighbor' },
    { id: 'tang_gaochang', name: { zh: '高昌', en: 'Gaochang' }, color: '#c2b59b', role: 'neighbor' },
    { id: XIYU, name: { zh: '西域诸国', en: 'Kingdoms of the Western Regions' }, color: '#c9bfa5', role: 'neighbor' },
    { id: XTJ, name: { zh: '西突厥', en: 'Western Turks' }, color: '#b0b4a8', role: 'neighbor' },
    { id: XYT, name: { zh: '薛延陀', en: 'Xueyantuo' }, color: '#a9ad9f', role: 'neighbor' },
    { id: TQS, name: { zh: '突骑施', en: 'Türgesh' }, color: '#aab2a4', role: 'neighbor' },
    { id: GLL, name: { zh: '葛逻禄', en: 'Karluks' }, color: '#b4b8a6', role: 'neighbor' },
    { id: 'tang_xiajiasi', name: { zh: '黠戛斯', en: 'Kyrgyz' }, color: '#a3aba6', role: 'neighbor' },
    { id: 'tang_shiwei', name: { zh: '室韦', en: 'Shiwei' }, color: '#b5bab0', role: 'neighbor' },
    { id: 'tang_mohe', name: { zh: '靺鞨诸部', en: 'Mohe tribes' }, color: '#b2b9b0', role: 'neighbor' },
    { id: QIDAN, name: { zh: '契丹 · 奚', en: 'Khitan and Xi' }, color: '#a7aeb0', role: 'neighbor' },
    { id: 'tang_baekje', name: { zh: '百济', en: 'Baekje' }, color: '#c3cbc6', role: 'neighbor' },
    { id: 'tang_yangtong', name: { zh: '羊同（象雄）', en: 'Zhangzhung' }, color: '#c8ab8c', role: 'neighbor' },
    { id: 'tang_bosi', name: { zh: '波斯（萨珊）', en: 'Persia (Sasanian)' }, color: '#c2b8a8', role: 'neighbor' },
    { id: DASHI, name: { zh: '大食', en: 'Arab Caliphate (Dashi)' }, color: '#bdb39d', role: 'neighbor' },
    { id: 'tang_tianzhu', name: { zh: '天竺诸国', en: 'Kingdoms of India' }, color: '#c7bba0', role: 'neighbor' },
    { id: 'tang_linyi', name: { zh: '林邑（环王）', en: 'Linyi (Champa)' }, color: '#b7c2a8', role: 'neighbor' },
    { id: 'tang_piao', name: { zh: '骠国', en: 'Pyu' }, color: '#bcc3a9', role: 'neighbor' },
    { id: 'tang_ganzhou', name: { zh: '甘州回鹘', en: 'Ganzhou Uyghurs' }, color: '#a6acaf', role: 'neighbor' },
  ],
  seats,
  holds,
  phases: [
    { id: 'o_tang_1', from: 618, to: 620, at: 619, title: { zh: '唐初群雄（619年 · 关中、巴蜀入唐，郑、夏、梁割据）', en: 'Tang and the rival regimes (619; Guanzhong and Sichuan held; Zheng, Xia and Liang still standing)' } },
    { id: 'o_tang_2', from: 621, to: 629, at: 625, title: { zh: '虎牢之后（625年 · 中原、江南、岭南归一，唯梁师都与突厥）', en: 'After Hulao (625; the plains, the south and Lingnan united; only Liang Shidu and the Turks remain)' } },
    { id: 'o_tang_3', from: 630, to: 639, at: 635, title: { zh: '东突厥亡后（635年 · 630年颉利被擒；漠南羁縻，薛延陀据漠北）', en: 'After the Eastern Turks fall (635; Illig Qaghan captured in 630; loose-rein prefectures south of the Gobi, Xueyantuo to the north)' } },
    { id: 'o_tang_4', from: 640, to: 646, at: 643, title: { zh: '平高昌之后（643年 · 640年平高昌，置西州、庭州与安西都护府）', en: 'After Gaochang is taken (643; Gaochang taken in 640; Xi and Ting prefectures, the Anxi Protectorate)' } },
    { id: 'o_tang_5', from: 647, to: 656, at: 650, title: { zh: '漠北与四镇（650年 · 燕然都护府，安西四镇）', en: 'The steppe and the Four Garrisons (650; Yanran Protectorate; the Four Garrisons of Anxi)' } },
    { id: 'o_tang_6', from: 657, to: 667, at: 661, title: { zh: '西突厥亡后（661年 · 657年灭西突厥；昆陵、濛池二都护府，羁縻府州远及葱岭以西）', en: 'After the Western Turks fall (661; conquered in 657; Kunling and Mengchi Protectorates, loose-rein prefectures beyond the Pamirs)' } },
    { id: 'o_tang_7', from: 668, to: 669, at: 669, title: { zh: '高句丽亡后（669年 · 668年平壤陷落；安东都护府治平壤）', en: 'After Goguryeo falls (669; Pyongyang fell in 668; the Andong Protectorate at Pyongyang)' } },
    { id: 'o_tang_8', from: 670, to: 691, at: 687, title: { zh: '吐蕃东进，突厥复兴（687年 · 四镇再失，安东内迁）', en: 'Tibet advances, the Turks rise again (687; the Four Garrisons lost again; Andong withdrawn)' } },
    { id: 'o_tang_9', from: 692, to: 712, at: 703, title: { zh: '武周（703年 · 复四镇，置北庭，渤海立国）', en: 'Wu Zhou (703; the Four Garrisons regained, Beiting set up; Balhae founded)' } },
    { id: 'o_tang_10', from: 713, to: 741, at: 735, title: { zh: '开元盛世（735年 · 大食据河中，突骑施雄踞碎叶以西）', en: 'The Kaiyuan years (735; the Arabs in Transoxiana, the Türgesh west of Suyab)' } },
    { id: 'o_tang_11', from: 742, to: 754, at: 753, title: { zh: '天宝（753年 · 744年回纥代突厥，750年后南诏叛唐附吐蕃）', en: 'The Tianbao years (753; the Uyghurs replaced the Turks in 744; Nanzhao broke with Tang after 750 and went over to Tibet)' } },
    { id: 'o_tang_12', from: 755, to: 757, at: 756, title: { zh: '安史之乱（756年 · 大燕据河北、河南与两京）', en: 'The An Lushan rebellion (756; Great Yan holds Hebei, Henan and both capitals)' } },
    { id: 'o_tang_13', from: 758, to: 763, at: 760, title: { zh: '史思明再陷洛阳（760年 · 洛阳759年再陷，长安仍在唐，河北仍为燕）', en: 'Shi Siming retakes Luoyang (760; Luoyang lost again in 759; Chang’an still Tang, Hebei still Yan)' } },
    { id: 'o_tang_14', from: 764, to: 785, at: 780, title: { zh: '河陇陷蕃（780年 · 安西、北庭孤悬，沙州犹守）', en: 'Hexi and Longyou lost to Tibet (780; Anxi and Beiting cut off, Dunhuang still holding)' } },
    { id: 'o_tang_15', from: 786, to: 847, at: 810, title: { zh: '西域尽失（810年 · 吐蕃据河西、塔里木，回鹘据北庭）', en: 'The west lost (810; Tibet holds Hexi and the Tarim, the Uyghurs Beiting)' } },
    { id: 'o_tang_16', from: 848, to: 877, at: 870, title: { zh: '归义军复河西（870年 · 848年起事，861年收凉州；吐蕃瓦解，黠戛斯据漠北）', en: 'The Guiyi Army retakes Hexi (870; risen in 848, Liangzhou taken in 861; Tibet broken up, the Kyrgyz on the steppe)' } },
    { id: 'o_tang_17', from: 878, to: 884, at: 881, title: { zh: '黄巢入长安（881年 · 大齐据关中，僖宗幸蜀）', en: 'Huang Chao in Chang’an (881; Great Qi holds the capital, Xizong flees to Sichuan)' } },
    { id: 'o_tang_18', from: 885, to: 907, at: 902, title: { zh: '藩镇割据（902年 · 朱温、李克用、王建、杨行密、钱镠等分立）', en: 'The warlords (902; Zhu Wen, Li Keyong, Wang Jian, Yang Xingmi, Qian Liu and others)' } },
  ],
  sources: {
    'jts.gaozu': { zh: '《旧唐书·高祖纪》', en: 'Old Book of Tang, Annals of Gaozu' },
    'jts.taizong': { zh: '《旧唐书·太宗纪》', en: 'Old Book of Tang, Annals of Taizong' },
    'jts.gaozong': { zh: '《旧唐书·高宗纪》', en: 'Old Book of Tang, Annals of Gaozong' },
    'jts.zetian': { zh: '《旧唐书·则天皇后纪》', en: 'Old Book of Tang, Annals of Empress Wu' },
    'jts.xuanzong': { zh: '《旧唐书·玄宗纪》', en: 'Old Book of Tang, Annals of Xuanzong' },
    'jts.suzong': { zh: '《旧唐书·肃宗纪》', en: 'Old Book of Tang, Annals of Suzong' },
    'jts.daizong': { zh: '《旧唐书·代宗纪》', en: 'Old Book of Tang, Annals of Daizong' },
    'jts.dezong': { zh: '《旧唐书·德宗纪》', en: 'Old Book of Tang, Annals of Dezong' },
    'jts.xuanzong2': { zh: '《旧唐书·宣宗纪》', en: 'Old Book of Tang, Annals of Xuānzong' },
    'jts.xizong': { zh: '《旧唐书·僖宗纪》', en: 'Old Book of Tang, Annals of Xizong' },
    'jts.lg': { zh: '《旧唐书·李轨传》', en: 'Old Book of Tang, Biography of Li Gui' },
    'jts.lwz': { zh: '《旧唐书·刘武周传》', en: 'Old Book of Tang, Biography of Liu Wuzhou' },
    'jts.lsd': { zh: '《旧唐书·梁师都传》', en: 'Old Book of Tang, Biography of Liang Shidu' },
    'jts.wsc': { zh: '《旧唐书·王世充传》', en: 'Old Book of Tang, Biography of Wang Shichong' },
    'jts.djd': { zh: '《旧唐书·窦建德传》', en: 'Old Book of Tang, Biography of Dou Jiande' },
    'jts.gkd': { zh: '《旧唐书·高开道传》', en: 'Old Book of Tang, Biography of Gao Kaidao' },
    'jts.xx': { zh: '《旧唐书·萧铣传》', en: 'Old Book of Tang, Biography of Xiao Xian' },
    'jts.lsh': { zh: '《旧唐书·林士弘传》', en: 'Old Book of Tang, Biography of Lin Shihong' },
    'jts.dfw': { zh: '《旧唐书·杜伏威传》（附辅公祏）', en: 'Old Book of Tang, Biography of Du Fuwei (with Fu Gongshi)' },
    'jts.lzt': { zh: '《旧唐书·李子通传》（附沈法兴）', en: 'Old Book of Tang, Biography of Li Zitong (with Shen Faxing)' },
    'jts.pxj': { zh: '《旧唐书·裴行俭传》', en: 'Old Book of Tang, Biography of Pei Xingjian' },
    'jts.zry': { zh: '《旧唐书·张仁愿传》', en: 'Old Book of Tang, Biography of Zhang Renyuan' },
    'jts.als': { zh: '《旧唐书·安禄山传》（附史思明）', en: 'Old Book of Tang, Biography of An Lushan (with Shi Siming)' },
    'jts.huangchao': { zh: '《旧唐书·黄巢传》', en: 'Old Book of Tang, Biography of Huang Chao' },
    'jts.tujue': { zh: '《旧唐书·突厥传》', en: 'Old Book of Tang, Account of the Turks' },
    'jts.beidi': { zh: '《旧唐书·北狄传》', en: 'Old Book of Tang, Account of the Northern Peoples' },
    'jts.huihe': { zh: '《旧唐书·回纥传》', en: 'Old Book of Tang, Account of the Uyghurs' },
    'jts.tubo': { zh: '《旧唐书·吐蕃传》', en: 'Old Book of Tang, Account of Tibet' },
    'jts.xirong': { zh: '《旧唐书·西戎传》', en: 'Old Book of Tang, Account of the Western Peoples' },
    'jts.nanman': { zh: '《旧唐书·南蛮西南蛮传》', en: 'Old Book of Tang, Account of the Southern Peoples' },
    'jts.dongyi': { zh: '《旧唐书·东夷传》', en: 'Old Book of Tang, Account of the Eastern Peoples' },
    'xts.dili': { zh: '《新唐书·地理志》', en: 'New Book of Tang, Treatise on Geography' },
    'xts.tubo': { zh: '《新唐书·吐蕃传》', en: 'New Book of Tang, Account of Tibet' },
    'xts.tujue': { zh: '《新唐书·突厥传》', en: 'New Book of Tang, Account of the Turks' },
    'xts.huihu': { zh: '《新唐书·回鹘传》', en: 'New Book of Tang, Account of the Uyghurs' },
    'xts.xiyu': { zh: '《新唐书·西域传》', en: 'New Book of Tang, Account of the Western Regions' },
    'xts.beidi': { zh: '《新唐书·北狄传》', en: 'New Book of Tang, Account of the Northern Peoples' },
    'xts.nanzhao': { zh: '《新唐书·南蛮传·南诏》', en: 'New Book of Tang, Account of the Southern Peoples: Nanzhao' },
    zztj: { zh: '《资治通鉴·唐纪》', en: 'Zizhi Tongjian, Records of Tang' },
    est: { zh: '推定（史料无明确年份或诸说不一）', en: 'inferred (no clear date in the sources, or they disagree)' },
  },
};
