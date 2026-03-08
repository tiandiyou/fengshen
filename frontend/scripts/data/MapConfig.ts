export interface Location {
    id: string;
    name: string;
    chapter: number;
    description: string;
    connections: string[];
    npcs: NPC[];
    shops: Shop[];
    treasures: Treasure[];
    enemies: string;
    isDungeon: boolean;
    isTown: boolean;
    requiredLevel: number;
}

export interface NPC {
    id: string;
    name: string;
    dialogue: string[];
    quest?: string;
}

export interface Shop {
    id: string;
    name: string;
    items: string[];
}

export interface Treasure {
    id: string;
    itemId: string;
    quantity: number;
    collected: boolean;
}

export interface Chapter {
    id: number;
    name: string;
    description: string;
    locations: string[];
    boss: string;
    requiredLevel: number;
}

export const MapConfig: Record<string, Location> = {
    'chen_tang_guan': {
        id: 'chen_tang_guan',
        name: '陈塘关',
        chapter: 1,
        description: '东海之滨的重镇，哪吒的故乡。城中有热闹的集市和繁华的商铺。',
        connections: ['chen_tang_wai', 'li_jing_fu'],
        npcs: [
            { id: 'old_man', name: '老者', dialogue: ['年轻人，你可是要去降妖除魔？', '这陈塘关最近有些不太平啊...'] },
            { id: 'merchant', name: '商人', dialogue: ['客官要买点什么？', '我这里有上好的药草！'] }
        ],
        shops: [
            { id: 'item_shop', name: '杂货铺', items: ['herb', 'niu_huang_wan', 'liu_shen_wan'] }
        ],
        treasures: [],
        enemies: '',
        isDungeon: false,
        isTown: true,
        requiredLevel: 1
    },
    'li_jing_fu': {
        id: 'li_jing_fu',
        name: '李靖府',
        chapter: 1,
        description: '陈塘关总兵李靖的府邸，气势恢宏。',
        connections: ['chen_tang_guan'],
        npcs: [
            { id: 'li_jing', name: '李靖', dialogue: ['哪吒，你要好生修炼，将来必成大器。', '最近东海不太平，你要多加小心。'] },
            { id: 'yin_shi', name: '殷氏', dialogue: ['孩儿，母亲总是担心你...', '你要照顾好自己。'] }
        ],
        shops: [],
        treasures: [],
        enemies: '',
        isDungeon: false,
        isTown: false,
        requiredLevel: 1
    },
    'chen_tang_wai': {
        id: 'chen_tang_wai',
        name: '陈塘关外',
        chapter: 1,
        description: '陈塘关外的荒野，偶有小妖出没。',
        connections: ['chen_tang_guan', 'dong_hai_bian'],
        npcs: [],
        shops: [],
        treasures: [
            { id: 't1', itemId: 'herb', quantity: 3, collected: false }
        ],
        enemies: 'chen_tang_wan_wild',
        isDungeon: false,
        isTown: false,
        requiredLevel: 1
    },
    'dong_hai_bian': {
        id: 'dong_hai_bian',
        name: '东海边',
        chapter: 1,
        description: '浩瀚的东海之滨，波涛汹涌。传说海中有龙王宫殿。',
        connections: ['chen_tang_wai', 'dong_hai_long_gong'],
        npcs: [
            { id: 'fisherman', name: '渔夫', dialogue: ['最近海上风浪很大，都不敢出海了。', '听说龙王的儿子又在作怪了！'] }
        ],
        shops: [],
        treasures: [],
        enemies: 'dong_hai',
        isDungeon: false,
        isTown: false,
        requiredLevel: 3
    },
    'dong_hai_long_gong': {
        id: 'dong_hai_long_gong',
        name: '东海龙宫',
        chapter: 1,
        description: '深海之中的龙族宫殿，金碧辉煌。这里是东海龙王的居所。',
        connections: ['dong_hai_bian'],
        npcs: [
            { id: 'long_wang', name: '东海龙王', dialogue: ['你是何人，竟敢闯入本王宫殿！', '我儿敖丙死得冤枉啊！'] }
        ],
        shops: [],
        treasures: [
            { id: 't2', itemId: 'liu_shen_wan', quantity: 2, collected: false }
        ],
        enemies: 'dong_hai',
        isDungeon: true,
        isTown: false,
        requiredLevel: 5
    },
    'qian_li_yan': {
        id: 'qian_li_yan',
        name: '千里眼山林',
        chapter: 2,
        description: '传说中千里眼修炼的山林，树木茂密，迷雾重重。',
        connections: ['chen_tang_wai', 'shun_feng_er_feng'],
        npcs: [],
        shops: [],
        treasures: [],
        enemies: 'qian_li_yan',
        isDungeon: false,
        isTown: false,
        requiredLevel: 5
    },
    'shun_feng_er_feng': {
        id: 'shun_feng_er_feng',
        name: '顺风耳峰',
        chapter: 2,
        description: '高耸入云的山峰，山顶据说住着顺风耳。',
        connections: ['qian_li_yan'],
        npcs: [
            { id: 'shun_feng_er', name: '顺风耳', dialogue: ['我能听到千里之外的声音...', '你想知道什么消息？'] }
        ],
        shops: [],
        treasures: [],
        enemies: 'qian_li_yan',
        isDungeon: false,
        isTown: false,
        requiredLevel: 8
    },
    'ku_lou_shan': {
        id: 'ku_lou_shan',
        name: '骷髅山',
        chapter: 3,
        description: '阴森恐怖的山脉，白骨遍地。石矶娘娘的白骨洞就在此处。',
        connections: ['bai_gu_dong', 'wu_yi_shan'],
        npcs: [],
        shops: [],
        treasures: [],
        enemies: 'ku_lou_shan',
        isDungeon: true,
        isTown: false,
        requiredLevel: 10
    },
    'bai_gu_dong': {
        id: 'bai_gu_dong',
        name: '白骨洞',
        chapter: 3,
        description: '石矶娘娘的洞府，弥漫着诡异的气息。',
        connections: ['ku_lou_shan'],
        npcs: [
            { id: 'shi_jing_niang', name: '石矶娘娘', dialogue: ['你是来找死的吗？', '今日就是你的死期！'] }
        ],
        shops: [],
        treasures: [
            { id: 't3', itemId: 'hun_tian_ling', quantity: 1, collected: false }
        ],
        enemies: 'ku_lou_shan',
        isDungeon: true,
        isTown: false,
        requiredLevel: 12
    },
    'wu_yi_shan': {
        id: 'wu_yi_shan',
        name: '五夷山',
        chapter: 4,
        description: '风景秀丽的仙山，山上住着许多修仙之人。',
        connections: ['ku_lou_shan', 'fei_lian_dong'],
        npcs: [
            { id: 'hermit', name: '隐士', dialogue: ['年轻人，你身上的气息不凡。', '五夷山乃仙家福地。'] }
        ],
        shops: [
            { id: 'weapon_shop', name: '兵器铺', items: ['tong_jian', 'tie_jia'] }
        ],
        treasures: [],
        enemies: 'wu_yi_shan',
        isDungeon: false,
        isTown: false,
        requiredLevel: 15
    },
    'fei_lian_dong': {
        id: 'fei_lian_dong',
        name: '飞廉洞',
        chapter: 4,
        description: '风神飞廉的居所，洞中风声呼啸。',
        connections: ['wu_yi_shan'],
        npcs: [],
        shops: [],
        treasures: [],
        enemies: 'wu_yi_shan',
        isDungeon: true,
        isTown: false,
        requiredLevel: 18
    }
};

export const ChapterConfig: Chapter[] = [
    {
        id: 1,
        name: '哪吒出世',
        description: '陈塘关总兵李靖之子哪吒出生，天生神力。在东海与龙王三太子敖丙发生冲突。',
        locations: ['chen_tang_guan', 'li_jing_fu', 'chen_tang_wai', 'dong_hai_bian', 'dong_hai_long_gong'],
        boss: 'ao_bing',
        requiredLevel: 1
    },
    {
        id: 2,
        name: '寻访仙山',
        description: '哪吒踏上寻找仙人的旅途，途中遇到千里眼、顺风耳等神仙。',
        locations: ['qian_li_yan', 'shun_feng_er_feng'],
        boss: 'ye_cha_wang',
        requiredLevel: 5
    },
    {
        id: 3,
        name: '大战石矶',
        description: '石矶娘娘作恶多端，哪吒前往骷髅山除妖。',
        locations: ['ku_lou_shan', 'bai_gu_dong'],
        boss: 'shi_jing_niang',
        requiredLevel: 10
    },
    {
        id: 4,
        name: '五夷仙山',
        description: '前往五夷山修炼，途中遇到各种妖魔。',
        locations: ['wu_yi_shan', 'fei_lian_dong'],
        boss: 'fei_lian',
        requiredLevel: 15
    }
];

export function getLocationById(id: string): Location | undefined {
    return MapConfig[id];
}

export function getChapterById(id: number): Chapter | undefined {
    return ChapterConfig.find(c => c.id === id);
}

export function getConnectedLocations(locationId: string): Location[] {
    const location = MapConfig[locationId];
    if (!location) return [];
    
    return location.connections
        .map(id => MapConfig[id])
        .filter(l => l !== undefined);
}

export function getLocationsByChapter(chapterId: number): Location[] {
    return Object.values(MapConfig).filter(l => l.chapter === chapterId);
}

export function canTravelTo(locationId: string, playerLevel: number): boolean {
    const location = MapConfig[locationId];
    if (!location) return false;
    return playerLevel >= location.requiredLevel;
}
