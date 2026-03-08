export interface User {
    id: number;
    username: string;
    avatarUrl?: string;
    email?: string;
    phone?: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
}

export interface GameSave {
    id: number;
    userId: number;
    saveName: string;
    currentChapter: number;
    currentLocation: string;
    gold: number;
    playTime: number;
    createdAt: string;
    updatedAt: string;
}

export interface CharacterData {
    id: number;
    saveId: number;
    characterType: 'NEZHA' | 'XIAO_LONG_NV' | 'YANG_JIAN' | 'JIANG_ZI_YA';
    level: number;
    exp: number;
    hp: number;
    mp: number;
    maxHp: number;
    maxMp: number;
    attack: number;
    defense: number;
    agility: number;
    stamina: number;
    equipment: any;
    skills: string[];
}

export interface InventoryItem {
    id: number;
    saveId: number;
    itemId: string;
    itemType: 'WEAPON' | 'ARMOR' | 'ACCESSORY' | 'CONSUMABLE' | 'KEY_ITEM';
    quantity: number;
    equipped: boolean;
    equippedCharacter?: string;
}

export interface ItemConfig {
    itemId: string;
    itemName: string;
    itemType: string;
    description: string;
    attack: number;
    defense: number;
    agility: number;
    hpBonus: number;
    mpBonus: number;
    effectType?: string;
    effectValue: number;
    price: number;
    sellPrice: number;
    usable: boolean;
    equippable: boolean;
    characterRestriction?: string[];
}

export interface SkillConfig {
    skillId: string;
    skillName: string;
    characterType: string;
    skillType: 'HEAL' | 'DAMAGE' | 'BUFF' | 'DEBUFF' | 'UTILITY';
    learnLevel: number;
    mpCost: number;
    baseDamage: number;
    levelScale: number;
    targetType: 'SINGLE' | 'ALL_ENEMIES' | 'ALL_ALLIES' | 'SELF';
    effectType?: string;
    effectDuration: number;
    description: string;
}
