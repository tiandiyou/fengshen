class Battle {
    constructor() {
        this.turn = 1;
        this.isPlayerTurn = true;
        this.selectedAction = null;
        this.selectedTarget = null;
        
        this.party = [
            { id: 1, name: '哪吒', hp: 120, maxHp: 120, mp: 60, maxMp: 60, attack: 13, defense: 7, agility: 11, skills: ['attack'] }
        ];
        
        this.enemies = [];
        this.currentCharacterIndex = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.generateEnemies();
        this.render();
        this.addLog('战斗开始！', 'system');
    }

    bindEvents() {
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAction(e.target.dataset.action));
        });

        document.getElementById('skillBackBtn').addEventListener('click', () => this.showActionMenu());
        document.getElementById('itemBackBtn').addEventListener('click', () => this.showActionMenu());
        document.getElementById('continueBtn').addEventListener('click', () => this.endBattle(true));
        document.getElementById('retryBtn').addEventListener('click', () => location.reload());
    }

    generateEnemies() {
        const enemyTypes = [
            { name: '小妖', hp: 30, maxHp: 30, attack: 8, defense: 3, exp: 20, gold: 10 },
            { name: '野狼', hp: 40, maxHp: 40, attack: 10, defense: 4, exp: 30, gold: 15 },
            { name: '山贼', hp: 50, maxHp: 50, attack: 12, defense: 5, exp: 40, gold: 25 }
        ];

        const count = Math.floor(Math.random() * 2) + 1;
        
        for (let i = 0; i < count; i++) {
            const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
            this.enemies.push({
                id: i + 1,
                ...type,
                name: count > 1 ? `${type.name} ${i + 1}` : type.name
            });
        }
    }

    render() {
        this.renderEnemies();
        this.renderParty();
        this.updateTurnDisplay();
    }

    renderEnemies() {
        const container = document.getElementById('enemyContainer');
        container.innerHTML = '';

        this.enemies.forEach(enemy => {
            const hpPercent = (enemy.hp / enemy.maxHp) * 100;
            const unit = document.createElement('div');
            unit.className = 'enemy-unit' + (enemy.hp <= 0 ? ' dead' : '');
            unit.dataset.enemyId = enemy.id;
            unit.innerHTML = `
                <div class="enemy-sprite">👹</div>
                <div class="enemy-name">${enemy.name}</div>
                <div class="enemy-hp-bar">
                    <div class="enemy-hp-fill" style="width: ${hpPercent}%"></div>
                </div>
            `;
            
            if (enemy.hp > 0) {
                unit.addEventListener('click', () => this.selectTarget(enemy.id));
            }
            
            container.appendChild(unit);
        });
    }

    renderParty() {
        const container = document.getElementById('partyContainer');
        container.innerHTML = '';

        this.party.forEach((char, index) => {
            const hpPercent = (char.hp / char.maxHp) * 100;
            const mpPercent = (char.mp / char.maxMp) * 100;
            
            const unit = document.createElement('div');
            unit.className = 'party-unit' + 
                (index === this.currentCharacterIndex ? ' active' : '') +
                (char.hp <= 0 ? ' dead' : '');
            unit.innerHTML = `
                <div class="party-avatar">哪</div>
                <div class="party-name">${char.name}</div>
                <div class="party-hp">
                    <label>HP</label>
                    <div class="bar"><div class="bar-fill" style="width: ${hpPercent}%"></div></div>
                </div>
                <div class="party-mp">
                    <label>MP</label>
                    <div class="bar"><div class="bar-fill" style="width: ${mpPercent}%"></div></div>
                </div>
            `;
            container.appendChild(unit);
        });
    }

    updateTurnDisplay() {
        document.getElementById('turnCount').textContent = this.turn;
        document.getElementById('battleStatus').textContent = 
            this.isPlayerTurn ? '选择行动' : '敌人回合';
    }

    handleAction(action) {
        if (!this.isPlayerTurn) return;

        switch (action) {
            case 'attack':
                this.selectedAction = 'attack';
                this.showMessage('选择攻击目标');
                break;
            case 'skill':
                this.showSkillMenu();
                break;
            case 'item':
                this.showItemMenu();
                break;
            case 'defend':
                this.defend();
                break;
            case 'flee':
                this.tryFlee();
                break;
        }
    }

    showActionMenu() {
        document.getElementById('actionMenu').classList.remove('hidden');
        document.getElementById('skillMenu').classList.add('hidden');
        document.getElementById('itemMenu').classList.add('hidden');
    }

    showSkillMenu() {
        document.getElementById('actionMenu').classList.add('hidden');
        document.getElementById('skillMenu').classList.remove('hidden');

        const skillList = document.getElementById('skillList');
        skillList.innerHTML = `
            <button class="skill-item" data-skill="powerStrike">强力攻击 (MP: 10)</button>
            <button class="skill-item" data-skill="heal">治疗 (MP: 15)</button>
        `;

        skillList.querySelectorAll('.skill-item').forEach(btn => {
            btn.addEventListener('click', (e) => this.useSkill(e.target.dataset.skill));
        });
    }

    showItemMenu() {
        document.getElementById('actionMenu').classList.add('hidden');
        document.getElementById('itemMenu').classList.remove('hidden');

        const itemList = document.getElementById('itemList');
        itemList.innerHTML = `
            <button class="item-btn" data-item="herb">药草 x3</button>
            <button class="item-btn" data-item="niu_huang_wan">牛黄丸 x1</button>
        `;

        itemList.querySelectorAll('.item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.useItem(e.target.dataset.item));
        });
    }

    selectTarget(enemyId) {
        if (!this.selectedAction) return;

        const enemy = this.enemies.find(e => e.id === enemyId);
        if (!enemy || enemy.hp <= 0) return;

        this.selectedTarget = enemy;

        if (this.selectedAction === 'attack') {
            this.attack(enemy);
        }
    }

    attack(target) {
        const attacker = this.party[this.currentCharacterIndex];
        const damage = Math.max(1, attacker.attack - target.defense + Math.floor(Math.random() * 5));
        
        target.hp = Math.max(0, target.hp - damage);
        
        this.showDamageNumber(target.id, damage, 'enemy');
        this.addLog(`${attacker.name} 攻击 ${target.name}，造成 ${damage} 点伤害！`, 'player-action');
        
        this.renderEnemies();
        
        if (target.hp <= 0) {
            this.addLog(`${target.name} 被击败了！`, 'system');
        }

        this.selectedAction = null;
        this.selectedTarget = null;
        
        this.checkBattleEnd();
    }

    useSkill(skillId) {
        const character = this.party[this.currentCharacterIndex];
        
        const skills = {
            powerStrike: { mpCost: 10, damage: 25, name: '强力攻击' },
            heal: { mpCost: 15, heal: 50, name: '治疗' }
        };

        const skill = skills[skillId];
        if (!skill) return;

        if (character.mp < skill.mpCost) {
            this.addLog('MP不足！', 'system');
            return;
        }

        character.mp -= skill.mpCost;

        if (skill.heal) {
            character.hp = Math.min(character.maxHp, character.hp + skill.heal);
            this.addLog(`${character.name} 使用 ${skill.name}，恢复 ${skill.heal} HP！`, 'player-action');
            this.showDamageNumber(character.id, skill.heal, 'heal');
        } else {
            this.selectedAction = 'skill';
            this.showMessage('选择技能目标');
            this.showActionMenu();
            return;
        }

        this.renderParty();
        this.showActionMenu();
        this.checkBattleEnd();
    }

    useItem(itemId) {
        const character = this.party[this.currentCharacterIndex];
        
        const items = {
            herb: { heal: 30, name: '药草' },
            niu_huang_wan: { heal: 80, name: '牛黄丸' }
        };

        const item = items[itemId];
        if (!item) return;

        character.hp = Math.min(character.maxHp, character.hp + item.heal);
        this.addLog(`${character.name} 使用 ${item.name}，恢复 ${item.heal} HP！`, 'player-action');
        this.showDamageNumber(character.id, item.heal, 'heal');

        this.renderParty();
        this.showActionMenu();
        this.checkBattleEnd();
    }

    defend() {
        this.addLog('防御中...', 'player-action');
        this.endPlayerTurn();
    }

    tryFlee() {
        const fleeChance = Math.random();
        if (fleeChance < 0.5) {
            this.addLog('逃跑成功！', 'system');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            this.addLog('逃跑失败！', 'system');
            this.endPlayerTurn();
        }
    }

    showDamageNumber(targetId, amount, type) {
        const effects = document.getElementById('battleEffects');
        const number = document.createElement('div');
        number.className = `damage-number ${type}`;
        number.textContent = type === 'heal' ? `+${amount}` : `-${amount}`;
        number.style.left = Math.random() * 100 + 'px';
        number.style.top = Math.random() * 50 + 'px';
        effects.appendChild(number);

        setTimeout(() => number.remove(), 1000);
    }

    showMessage(msg) {
        document.getElementById('battleStatus').textContent = msg;
    }

    addLog(message, type = '') {
        const log = document.getElementById('battleLog');
        const p = document.createElement('p');
        p.className = type;
        p.textContent = message;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }

    endPlayerTurn() {
        this.isPlayerTurn = false;
        this.updateTurnDisplay();
        
        setTimeout(() => this.enemyTurn(), 1000);
    }

    enemyTurn() {
        const aliveEnemies = this.enemies.filter(e => e.hp > 0);
        const aliveParty = this.party.filter(c => c.hp > 0);

        if (aliveParty.length === 0) {
            this.endBattle(false);
            return;
        }

        let delay = 0;
        aliveEnemies.forEach(enemy => {
            setTimeout(() => {
                const target = aliveParty[Math.floor(Math.random() * aliveParty.length)];
                const damage = Math.max(1, enemy.attack - target.defense + Math.floor(Math.random() * 3));
                
                target.hp = Math.max(0, target.hp - damage);
                
                this.showDamageNumber(target.id, damage, 'player');
                this.addLog(`${enemy.name} 攻击 ${target.name}，造成 ${damage} 点伤害！`, 'enemy-action');
                
                this.renderParty();
            }, delay);
            delay += 800;
        });

        setTimeout(() => {
            this.turn++;
            this.isPlayerTurn = true;
            this.updateTurnDisplay();
            this.checkBattleEnd();
        }, delay + 500);
    }

    checkBattleEnd() {
        const aliveEnemies = this.enemies.filter(e => e.hp > 0);
        const aliveParty = this.party.filter(c => c.hp > 0);

        if (aliveEnemies.length === 0) {
            this.showVictory();
        } else if (aliveParty.length === 0) {
            this.showDefeat();
        } else if (this.isPlayerTurn) {
            // Continue battle
        }
    }

    showVictory() {
        const totalExp = this.enemies.reduce((sum, e) => sum + e.exp, 0);
        const totalGold = this.enemies.reduce((sum, e) => sum + e.gold, 0);

        document.getElementById('expGained').textContent = totalExp;
        document.getElementById('goldGained').textContent = totalGold;
        document.getElementById('victoryScreen').classList.remove('hidden');
    }

    showDefeat() {
        document.getElementById('defeatScreen').classList.remove('hidden');
    }

    endBattle(victory) {
        if (victory) {
            window.location.href = 'index.html';
        }
    }
}

const battle = new Battle();
