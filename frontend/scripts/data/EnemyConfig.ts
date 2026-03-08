export interface EnemyType {
    id: string;
    name: string;
    hp: number;
    mp: number;
    attack: number;
    defense: number;
    agility: number;
    exp: number;
    gold: number;
    drops: EnemyDrop[];
    skills: string[];
    sprite: string;
    description: string;
}

export interface EnemyDrop {
    itemId: string;
    chance: number;
    quantity: [number, number];
}

export interface EnemyGroup {
    id: string;
    name: string;
    enemies: EnemySpawn[];
    minLevel: number;
    maxLevel: number;
}

export interface EnemySpawn {
    enemyId: string;
    level: number;
    position: number;
}

export const EnemyConfig: Record<string, EnemyType> = {
    'xiao_yao': {
        id: 'xiao_yao',
        name: '小妖',
        hp: 30,
        mp: 0,
        attack: 8,
        defense: 3,
        agility: 5,
        exp: 15,
        gold: 8,
        drops: [
            { itemId: 'herb', chance: 0.3, quantity: [1, 1] }
        ],
        skills: [],
        sprite: '👹',
        description: '山林中的低等妖怪，攻击力较弱'
    },
    'ye_lang': {
        id: 'ye_lang',
        name: '野狼',
        hp: 40,
        mp: 0,
        attack: 12,
        defense: 4,
        agility: 8,
        exp: 25,
        gold: 12,
        drops: [
            { itemId: 'herb', chance: 0.2, quantity: [1, 2] }
        ],
        skills: [],
        sprite: '🐺',
        description: '荒野中的凶猛狼群'
    },
    'shan_zei': {
        id: 'shan_zei',
        name: '山贼',
        hp: 55,
        mp: 10,
        attack: 14,
        defense: 6,
        agility: 6,
        exp: 35,
        gold: 25,
        drops: [
            { itemId: 'herb', chance: 0.3, quantity: [1, 2] },
            { itemId: 'niu_huang_wan', chance: 0.1, quantity: [1, 1] }
        ],
        skills: ['qiang_ji'],
        sprite: '🗡️',
        description: '占据山头的强盗'
    },
    'hu_li_jing': {
        id: 'hu_li_jing',
        name: '狐狸精',
        hp: 45,
        mp: 30,
        attack: 10,
        defense: 3,
        agility: 12,
        exp: 40,
        gold: 30,
        drops: [
            { itemId: 'niu_huang_wan', chance: 0.2, quantity: [1, 1] }
        ],
        skills: ['huo_qiu', 'mi_huo'],
        sprite: '🦊',
        description: '善于使用法术迷惑敌人'
    },
    'shu_yao': {
        id: 'shu_yao',
        name: '鼠妖',
        hp: 35,
        mp: 15,
        attack: 9,
        defense: 2,
        agility: 15,
        exp: 20,
        gold: 15,
        drops: [
            { itemId: 'herb', chance: 0.25, quantity: [1, 2] }
        ],
        skills: ['tou_xi'],
        sprite: '🐀',
        description: '行动敏捷，善于偷袭'
    },
    'she_yao': {
        id: 'she_yao',
        name: '蛇妖',
        hp: 60,
        mp: 20,
        attack: 16,
        defense: 5,
        agility: 10,
        exp: 50,
        gold: 35,
        drops: [
            { itemId: 'niu_huang_wan', chance: 0.2, quantity: [1, 1] },
            { itemId: 'jie_du_cao', chance: 0.3, quantity: [1, 1] }
        ],
        skills: ['du_yao', 'chan_rao'],
        sprite: '🐍',
        description: '口中喷吐毒雾'
    },
    'hou_jing': {
        id: 'hou_jing',
        name: '猴精',
        hp: 50,
        mp: 25,
        attack: 13,
        defense: 4,
        agility: 18,
        exp: 45,
        gold: 28,
        drops: [
            { itemId: 'herb', chance: 0.3, quantity: [1, 3] }
        ],
        skills: ['lian_ji', 'shan_bi'],
        sprite: '🐒',
        description: '身手矫健的猴妖'
    },
    'zhu_yao': {
        id: 'zhu_yao',
        name: '猪妖',
        hp: 80,
        mp: 0,
        attack: 18,
        defense: 8,
        agility: 4,
        exp: 55,
        gold: 40,
        drops: [
            { itemId: 'niu_huang_wan', chance: 0.15, quantity: [1, 1] }
        ],
        skills: ['zhuang_ji'],
        sprite: '🐗',
        description: '皮糙肉厚的野猪妖'
    },
    'niu_mo': {
        id: 'niu_mo',
        name: '牛魔',
        hp: 100,
        mp: 30,
        attack: 22,
        defense: 10,
        agility: 5,
        exp: 80,
        gold: 60,
        drops: [
            { itemId: 'liu_shen_wan', chance: 0.1, quantity: [1, 1] },
            { itemId: 'niu_huang_wan', chance: 0.25, quantity: [1, 2] }
        ],
        skills: ['di_zhen', 'meng_ji'],
        sprite: '🐂',
        description: '力大无穷的牛头魔'
    },
    'li_yu_jing': {
        id: 'li_yu_jing',
        name: '鲤鱼精',
        hp: 45,
        mp: 35,
        attack: 11,
        defense: 4,
        agility: 8,
        exp: 42,
        gold: 32,
        drops: [
            { itemId: 'niu_huang_wan', chance: 0.15, quantity: [1, 1] }
        ],
        skills: ['shui_jian', 'bing_dong'],
        sprite: '🐟',
        description: '水中修炼成精的鲤鱼'
    }
};

export const BossConfig: Record<string, EnemyType> = {
    'shi_jing_niang': {
        id: 'shi_jing_niang',
        name: '石矶娘娘',
        hp: 500,
        mp: 100,
        attack: 35,
        defense: 15,
        agility: 12,
        exp: 300,
        gold: 200,
        drops: [
            { itemId: 'liu_shen_wan', chance: 1, quantity: [2, 3] },
            { itemId: 'hun_tian_ling', chance: 0.5, quantity: [1, 1] }
        ],
        skills: ['shi_hua', 'yan_mo', 'di_ci'],
        sprite: '👹',
        description: '骷髅山白骨洞的妖王'
    },
    'shen_gong_bao': {
        id: 'shen_gong_bao',
        name: '申公豹',
        hp: 600,
        mp: 150,
        attack: 30,
        defense: 12,
        agility: 15,
        exp: 400,
        gold: 300,
        drops: [
            { itemId: 'liu_shen_wan', chance: 1, quantity: [3, 5] },
            { itemId: 'feng_huo_lun', chance: 0.3, quantity: [1, 1] }
        ],
        skills: ['lei_ji', 'feng_bao', 'huan_ying'],
        sprite: '🧙',
        description: '阐教叛徒，擅长各种法术'
    },
    'tong_tian_jiao_zhu': {
        id: 'tong_tian_jiao_zhu',
        name: '通天教主',
        hp: 2000,
        mp: 500,
        attack: 60,
        defense: 25,
        agility: 20,
        exp: 1000,
        gold: 1000,
        drops: [
            { itemId: 'liu_shen_wan', chance: 1, quantity: [5, 10] }
        ],
        skills: ['zhu_xian_jian', 'wan_jian_gui_zong', 'tian_jiang_jie_nan'],
        sprite: '👑',
        description: '截教教主，最终BOSS'
    }
};

export const EnemyGroups: EnemyGroup[] = [
    {
        id: 'chen_tang_wan_wild',
        name: '陈塘关野外',
        minLevel: 1,
        maxLevel: 5,
        enemies: [
            { enemyId: 'xiao_yao', level: 1, position: 0 },
            { enemyId: 'ye_lang', level: 2, position: 1 }
        ]
    },
    {
        id: 'qian_li_yan',
        name: '千里眼山林',
        minLevel: 3,
        maxLevel: 8,
        enemies: [
            { enemyId: 'shan_zei', level: 3, position: 0 },
            { enemyId: 'shu_yao', level: 4, position: 1 }
        ]
    },
    {
        id: 'ku_lou_shan',
        name: '骷髅山',
        minLevel: 5,
        maxLevel: 12,
        enemies: [
            { enemyId: 'hu_li_jing', level: 5, position: 0 },
            { enemyId: 'she_yao', level: 6, position: 1 },
            { enemyId: 'hou_jing', level: 7, position: 2 }
        ]
    },
    {
        id: 'wu_yi_shan',
        name: '五夷山',
        minLevel: 8,
        maxLevel: 15,
        enemies: [
            { enemyId: 'zhu_yao', level: 8, position: 0 },
            { enemyId: 'niu_mo', level: 10, position: 1 }
        ]
    },
    {
        id: 'dong_hai',
        name: '东海',
        minLevel: 6,
        maxLevel: 12,
        enemies: [
            { enemyId: 'li_yu_jing', level: 6, position: 0 },
            { enemyId: 'xiao_yao', level: 5, position: 1 }
        ]
    }
];

export function getEnemyById(id: string): EnemyType | undefined {
    return EnemyConfig[id] || BossConfig[id];
}

export function getRandomEnemyGroup(locationId: string): EnemyGroup | undefined {
    return EnemyGroups.find(g => g.id === locationId);
}

export function generateBattleEnemies(locationId: string): EnemyType[] {
    const group = getRandomEnemyGroup(locationId);
    if (!group) return [];

    const enemyCount = Math.floor(Math.random() * 3) + 1;
    const enemies: EnemyType[] = [];

    for (let i = 0; i < enemyCount; i++) {
        const spawn = group.enemies[Math.floor(Math.random() * group.enemies.length)];
        const enemy = getEnemyById(spawn.enemyId);
        if (enemy) {
            enemies.push(enemy);
        }
    }

    return enemies;
}
