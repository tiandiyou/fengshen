import { Character } from './Character';
import { SKILL_CONFIG } from '../data/SkillConfig';

export class LevelSystem {
    static getExpNeededForLevel(level: number): number {
        return Math.floor(100 * Math.pow(1.5, level - 1));
    }

    static canLevelUp(character: Character): boolean {
        const expNeeded = this.getExpNeededForLevel(character.level);
        return character.exp >= expNeeded;
    }

    static levelUp(character: Character): string[] {
        if (!this.canLevelUp(character)) return [];

        const messages: string[] = [];
        const expNeeded = this.getExpNeededForLevel(character.level);
        character.exp -= expNeeded;
        character.level++;

        const hpGain = Math.floor(Math.random() * 11) + 10;
        character.maxHp += hpGain;
        character.hp = character.maxHp;
        messages.push(`HP +${hpGain}`);

        const attackGain = Math.floor(Math.random() * 4) + 2;
        character.attack += attackGain;
        messages.push(`攻击 +${attackGain}`);

        const defenseGain = Math.floor(Math.random() * 3) + 2;
        character.defense += defenseGain;
        messages.push(`防御 +${defenseGain}`);

        const agilityGain = Math.floor(Math.random() * 3) + 1;
        character.agility += agilityGain;
        messages.push(`敏捷 +${agilityGain}`);

        const newSkills = this.checkNewSkills(character);
        if (newSkills.length > 0) {
            character.skills.push(...newSkills);
            messages.push(`学会了新技能: ${newSkills.join(', ')}`);
        }

        messages.unshift(`${character.characterType} 升到了 ${character.level} 级!`);

        return messages;
    }

    static checkNewSkills(character: Character): string[] {
        const characterType = character.characterType as keyof typeof SKILL_CONFIG;
        const skillsForType = SKILL_CONFIG[characterType];
        if (!skillsForType) return [];

        const newSkills: string[] = [];
        for (const skill of skillsForType) {
            if (skill.level === character.level && !character.skills.includes(skill.id)) {
                newSkills.push(skill.id);
            }
        }

        return newSkills;
    }

    static gainExp(character: Character, amount: number): string[] {
        character.exp += amount;
        const messages: string[] = [`获得 ${amount} 点经验值`];

        while (this.canLevelUp(character)) {
            const levelUpMessages = this.levelUp(character);
            messages.push(...levelUpMessages);
        }

        return messages;
    }
}
