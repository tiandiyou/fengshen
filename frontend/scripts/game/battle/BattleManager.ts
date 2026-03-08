import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    @property(Node)
    playerCharacters: Node[] = [];

    @property(Node)
    enemyCharacters: Node[] = [];

    start() {
        this.initBattle();
    }

    initBattle() {
        // TODO: 初始化战斗
    }

    executeTurn() {
        // TODO: 执行回合
    }

    calculateDamage(attacker: any, defender: any): number {
        const baseDamage = attacker.attack - defender.defense;
        const randomFactor = 0.9 + Math.random() * 0.2;
        let damage = Math.floor(baseDamage * randomFactor);

        if (Math.random() < 0.1) {
            damage = Math.floor(damage * 1.5);
        }

        return Math.max(1, damage);
    }

    checkBattleEnd(): 'WIN' | 'LOSE' | 'CONTINUE' {
        return 'CONTINUE';
    }
}
