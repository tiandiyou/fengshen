export enum BattleState {
    INIT = 'INIT',
    PLAYER_TURN = 'PLAYER_TURN',
    ENEMY_TURN = 'ENEMY_TURN',
    VICTORY = 'VICTORY',
    DEFEAT = 'DEFEAT',
}

export enum ActionType {
    ATTACK = 'ATTACK',
    SKILL = 'SKILL',
    ITEM = 'ITEM',
    FLEE = 'FLEE',
}

export interface BattleAction {
    type: ActionType;
    sourceId: string;
    targetId?: string;
    skillId?: string;
    itemId?: string;
}

export interface BattleUnit {
    id: string;
    name: string;
    type: 'PLAYER' | 'ENEMY';
    level: number;
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;
    attack: number;
    defense: number;
    agility: number;
    stamina: number;
    skills: string[];
    status: StatusEffect[];
}

export interface StatusEffect {
    type: string;
    duration: number;
    value?: number;
}

export interface BattleResult {
    victory: boolean;
    expGained: number;
    goldGained: number;
    itemsDropped: string[];
}
