import { BattleUnit, StatusEffect } from './BattleTypes';

export class SkillSystem {
    static executeSkill(
        skillId: string,
        source: BattleUnit,
        targets: BattleUnit[]
    ): { success: boolean; message: string } {
        return { success: true, message: '技能执行成功' };
    }

    static calculateSkillDamage(
        baseDamage: number,
        levelScale: number,
        sourceLevel: number
    ): number {
        return baseDamage + levelScale * sourceLevel;
    }

    static applyStatusEffect(
        target: BattleUnit,
        effect: StatusEffect
    ): void {
        const existingEffect = target.status.find(e => e.type === effect.type);
        if (existingEffect) {
            existingEffect.duration = Math.max(existingEffect.duration, effect.duration);
        } else {
            target.status.push(effect);
        }
    }

    static processStatusEffects(unit: BattleUnit): string[] {
        const messages: string[] = [];

        unit.status = unit.status.filter(effect => {
            switch (effect.type) {
                case 'POISON':
                    if (effect.value) {
                        unit.hp = Math.max(0, unit.hp - effect.value);
                        messages.push(`${unit.name} 受到 ${effect.value} 点中毒伤害!`);
                    }
                    break;
            }

            effect.duration--;
            return effect.duration > 0;
        });

        return messages;
    }
}
