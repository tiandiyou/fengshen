import { BattleUnit } from './BattleTypes';

export interface EnemyConfig {
    id: string;
    name: string;
    level: number;
    baseStats: {
        hp: number;
        mp: number;
        attack: number;
        defense: number;
        agility: number;
        stamina: number;
    };
    expReward: number;
    goldReward: number;
    drops: { itemId: string; chance: number }[];
}

export const ENEMY_CONFIG: Record<string, EnemyConfig> = {
    fish_soldier: {
        id: 'fish_soldier',
        name: '鱼兵',
        level: 3,
        baseStats: { hp: 50, mp: 0, attack: 12, defense: 8, agility: 10, stamina: 5 },
        expReward: 15,
        goldReward: 10,
        drops: [],
    },
    dragon_soldier: {
        id: 'dragon_soldier',
        name: '龙兵',
        level: 5,
        baseStats: { hp: 80, mp: 0, attack: 18, defense: 12, agility: 12, stamina: 8 },
        expReward: 30,
        goldReward: 25,
        drops: [],
    },
    south_sea_dragon_king: {
        id: 'south_sea_dragon_king',
        name: '南海龙王',
        level: 8,
        baseStats: { hp: 200, mp: 50, attack: 30, defense: 20, agility: 15, stamina: 12 },
        expReward: 150,
        goldReward: 200,
        drops: [{ itemId: 'long_sword', chance: 0.5 }],
    },
    ghost: {
        id: 'ghost',
        name: '鬼魂',
        level: 12,
        baseStats: { hp: 60, mp: 30, attack: 15, defense: 5, agility: 18, stamina: 3 },
        expReward: 25,
        goldReward: 15,
        drops: [],
    },
};

export class EnemyFactory {
    static createEnemy(configId: string): BattleUnit {
        const config = ENEMY_CONFIG[configId];
        if (!config) {
            throw new Error(`Enemy config not found: ${configId}`);
        }

        return {
            id: `enemy_${Date.now()}_${Math.random()}`,
            name: config.name,
            type: 'ENEMY',
            level: config.level,
            hp: config.baseStats.hp,
            maxHp: config.baseStats.hp,
            mp: config.baseStats.mp,
            maxMp: config.baseStats.mp,
            attack: config.baseStats.attack,
            defense: config.baseStats.defense,
            agility: config.baseStats.agility,
            stamina: config.baseStats.stamina,
            skills: [],
            status: [],
        };
    }

    static createEnemyGroup(configIds: string[]): BattleUnit[] {
        return configIds.map(id => this.createEnemy(id));
    }
}
