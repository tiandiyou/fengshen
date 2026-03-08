import { _decorator, Component } from 'cc';
import { CHARACTER_CONFIG } from '../data/CharacterConfig';

const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component {
    characterType: string = '';
    level: number = 1;
    exp: number = 0;
    hp: number = 0;
    mp: number = 0;
    maxHp: number = 0;
    maxMp: number = 0;
    attack: number = 0;
    defense: number = 0;
    agility: number = 0;
    stamina: number = 0;
    skills: string[] = [];

    init(type: string) {
        this.characterType = type;
        const config = CHARACTER_CONFIG[type];
        if (config) {
            this.maxHp = config.baseStats.hp;
            this.maxMp = config.baseStats.mp;
            this.hp = this.maxHp;
            this.mp = this.maxMp;
            this.attack = config.baseStats.attack;
            this.defense = config.baseStats.defense;
            this.agility = config.baseStats.agility;
            this.stamina = config.baseStats.stamina;
        }
    }

    gainExp(amount: number) {
        this.exp += amount;
        this.checkLevelUp();
    }

    checkLevelUp() {
        const expNeeded = this.getExpNeeded();
        if (this.exp >= expNeeded) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.exp -= this.getExpNeeded();
        this.maxHp += Math.floor(Math.random() * 10) + 10;
        this.attack += Math.floor(Math.random() * 3) + 2;
        this.defense += Math.floor(Math.random() * 2) + 2;
        this.agility += Math.floor(Math.random() * 2) + 1;
        this.hp = this.maxHp;
        this.mp = this.maxMp;
    }

    getExpNeeded(): number {
        return this.level * 100;
    }

    takeDamage(damage: number) {
        this.hp = Math.max(0, this.hp - damage);
    }

    heal(amount: number) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    useMp(amount: number): boolean {
        if (this.mp >= amount) {
            this.mp -= amount;
            return true;
        }
        return false;
    }

    isAlive(): boolean {
        return this.hp > 0;
    }
}
