export interface Location {
    id: string;
    name: string;
    type: 'TOWN' | 'DUNGEON' | 'WILDERNESS';
    description: string;
    connections: string[];
    enemies?: string[];
    npcs?: NPC[];
    shops?: Shop[];
    treasure?: Treasure[];
}

export interface NPC {
    id: string;
    name: string;
    dialogue: string[];
    action?: string;
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

export const CHAPTER_1_LOCATIONS: Record<string, Location> = {
    chen_tang_guan: {
        id: 'chen_tang_guan',
        name: '陈塘关',
        type: 'TOWN',
        description: '哪吒的家乡,故事开始的地方',
        connections: ['chen_tang_village', 'sea_entrance'],
        npcs: [
            { id: 'li_jing', name: '李靖', dialogue: ['哪吒,你要小心行事...', '龙王们不好惹啊!'] },
            { id: 'yin_shi', name: '殷氏', dialogue: ['儿啊,娘会想你的...', '平安回来!'] },
        ],
        shops: [
            { id: 'general_store', name: '杂货铺', items: ['herb', 'niu_huang_wan'] },
        ],
        treasure: [
            { id: 't1', itemId: 'herb', quantity: 5, collected: false },
        ],
    },

    chen_tang_village: {
        id: 'chen_tang_village',
        name: '陈塘村',
        type: 'TOWN',
        description: '陈塘关附近的小村庄',
        connections: ['chen_tang_guan', 'south_sea_path'],
        npcs: [
            { id: 'villager_1', name: '村民', dialogue: ['最近海里不太平啊...', '听说龙王发怒了!'] },
        ],
        shops: [
            { id: 'weapon_shop', name: '武器店', items: ['long_sword', 'cloth_armor'] },
            { id: 'item_shop', name: '道具店', items: ['herb', 'niu_huang_wan', 'liu_shen_wan'] },
        ],
    },

    south_sea_palace: {
        id: 'south_sea_palace',
        name: '南海龙宫',
        type: 'DUNGEON',
        description: '南海龙王的宫殿,充满了虾兵蟹将',
        connections: ['south_sea_exit'],
        enemies: ['fish_soldier', 'fish_soldier', 'dragon_soldier'],
        treasure: [
            { id: 't2', itemId: 'fish_bone_sword', quantity: 1, collected: false },
        ],
    },

    west_sea_palace: {
        id: 'west_sea_palace',
        name: '西海龙宫',
        type: 'DUNGEON',
        description: '西海龙王的领地',
        connections: ['west_sea_exit'],
        enemies: ['dragon_soldier', 'dragon_soldier'],
    },

    north_sea_palace: {
        id: 'north_sea_palace',
        name: '北海龙宫',
        type: 'DUNGEON',
        description: '北海龙王居住的地方',
        connections: ['north_sea_exit'],
        enemies: ['dragon_soldier', 'dragon_soldier'],
        treasure: [
            { id: 't3', itemId: 'ding_hai_zhu', quantity: 1, collected: false },
        ],
    },

    fishing_village: {
        id: 'fishing_village',
        name: '捕鱼村',
        type: 'TOWN',
        description: '海岛上的小渔村',
        connections: ['island_path'],
        npcs: [
            { id: 'fisherman', name: '老渔夫', dialogue: ['年轻人,要出海吗?', '小心海里的妖怪!'] },
        ],
        shops: [
            { id: 'fishing_shop', name: '渔具店', items: ['fish_leather', 'fish_bone_sword'] },
        ],
    },

    crescent_island: {
        id: 'crescent_island',
        name: '新月岛',
        type: 'DUNGEON',
        description: '神秘的岛屿,小龙女在此等待',
        connections: ['crescent_exit'],
        enemies: [],
        npcs: [
            { id: 'xiao_long_nv', name: '小龙女', dialogue: ['你是谁?竟敢闯入此地!', '好,我答应加入你!'], action: 'battle_then_join' },
        ],
    },

    east_sea_palace: {
        id: 'east_sea_palace',
        name: '东海龙宫',
        type: 'DUNGEON',
        description: '东海龙王的大本营',
        connections: ['east_sea_exit'],
        enemies: ['dragon_soldier', 'dragon_soldier', 'dragon_soldier'],
    },
};

export class LocationManager {
    private currentLocation: Location | null = null;
    private visitedLocations: Set<string> = new Set();

    moveTo(locationId: string): boolean {
        const location = CHAPTER_1_LOCATIONS[locationId];
        if (!location) return false;

        if (this.currentLocation && !location.connections.includes(this.currentLocation.id)) {
            return false;
        }

        this.currentLocation = location;
        this.visitedLocations.add(locationId);
        return true;
    }

    getCurrentLocation(): Location | null {
        return this.currentLocation;
    }

    getAvailableDestinations(): Location[] {
        if (!this.currentLocation) return [];

        return this.currentLocation.connections
            .map(id => CHAPTER_1_LOCATIONS[id])
            .filter(loc => loc !== undefined);
    }

    hasVisited(locationId: string): boolean {
        return this.visitedLocations.has(locationId);
    }

    collectTreasure(treasureId: string): { itemId: string; quantity: number } | null {
        if (!this.currentLocation || !this.currentLocation.treasure) return null;

        const treasure = this.currentLocation.treasure.find(t => t.id === treasureId);
        if (!treasure || treasure.collected) return null;

        treasure.collected = true;
        return { itemId: treasure.itemId, quantity: treasure.quantity };
    }
}
