class Game {
    constructor() {
        this.currentSave = null;
        this.characters = [];
        this.currentLocation = '陈塘关';
        this.currentChapter = 1;
        
        this.init();
    }

    async init() {
        if (!authService.isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }

        this.bindEvents();
        await this.loadGameData();
    }

    bindEvents() {
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        document.getElementById('saveBtn').addEventListener('click', () => this.showSaveModal());
        document.getElementById('inventoryBtn').addEventListener('click', () => this.showInventory());
        document.getElementById('skillsBtn').addEventListener('click', () => this.showSkills());
        document.getElementById('mapBtn').addEventListener('click', () => this.showMap());
        document.getElementById('questBtn').addEventListener('click', () => this.showQuests());
        document.getElementById('modalClose').addEventListener('click', () => this.hideModal());

        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAction(e.target.dataset.action));
        });
    }

    async loadGameData() {
        try {
            const userInfo = await authService.getUserInfo();
            if (userInfo.code === 200) {
                document.getElementById('playerName').textContent = userInfo.data.username;
            }

            const savesResponse = await gameApi.getSaveList();
            if (savesResponse.code === 200 && savesResponse.data && savesResponse.data.length > 0) {
                this.currentSave = savesResponse.data[0];
                await this.loadSaveData(this.currentSave.id);
            } else {
                await this.createNewSave();
            }
        } catch (error) {
            console.error('加载游戏数据失败:', error);
            this.addMessage('加载数据失败，请刷新页面重试', 'system');
        }
    }

    async createNewSave() {
        try {
            const response = await gameApi.createSave('存档1');
            if (response.code === 200) {
                this.currentSave = response.data;
                await this.loadSaveData(this.currentSave.id);
                this.addMessage('创建新存档成功！', 'system');
            }
        } catch (error) {
            console.error('创建存档失败:', error);
        }
    }

    async loadSaveData(saveId) {
        try {
            const response = await gameApi.getSaveDetail(saveId);
            if (response.code === 200) {
                const { save, characters } = response.data;
                this.currentSave = save;
                this.characters = characters;
                
                this.updateUI();
                this.addMessage(`载入存档: ${save.saveName}`, 'system');
            }
        } catch (error) {
            console.error('加载存档数据失败:', error);
        }
    }

    updateUI() {
        if (!this.currentSave) return;

        document.getElementById('currentChapter').textContent = this.currentSave.currentChapter;
        document.getElementById('currentLocation').textContent = this.currentSave.currentLocation;
        document.getElementById('playerGold').textContent = this.currentSave.gold;

        if (this.characters.length > 0) {
            const mainChar = this.characters[0];
            this.updateCharacterUI(mainChar);
            this.updateMemberList();
        }
    }

    updateCharacterUI(character) {
        document.getElementById('playerLevel').textContent = character.level;
        
        const hpPercent = (character.hp / character.maxHp) * 100;
        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('hpText').textContent = `${character.hp}/${character.maxHp}`;
        
        const mpPercent = (character.mp / character.maxMp) * 100;
        document.getElementById('mpBar').style.width = mpPercent + '%';
        document.getElementById('mpText').textContent = `${character.mp}/${character.maxMp}`;
        
        const expNeeded = this.getExpNeededForLevel(character.level + 1);
        const expPercent = (character.exp / expNeeded) * 100;
        document.getElementById('expBar').style.width = expPercent + '%';
        document.getElementById('expText').textContent = `${character.exp}/${expNeeded}`;
        
        document.getElementById('attackValue').textContent = character.attack;
        document.getElementById('defenseValue').textContent = character.defense;
        document.getElementById('agilityValue').textContent = character.agility;
        document.getElementById('staminaValue').textContent = character.stamina;
    }

    updateMemberList() {
        const memberList = document.getElementById('memberList');
        memberList.innerHTML = '';
        
        this.characters.forEach((char, index) => {
            const memberItem = document.createElement('div');
            memberItem.className = 'member-item' + (index === 0 ? ' active' : '');
            memberItem.innerHTML = `
                <div class="member-avatar">${this.getCharacterInitial(char.characterType)}</div>
                <div class="member-info">
                    <span class="member-name">${this.getCharacterName(char.characterType)}</span>
                    <span class="member-level">Lv.${char.level}</span>
                </div>
            `;
            memberItem.addEventListener('click', () => this.selectCharacter(index));
            memberList.appendChild(memberItem);
        });
    }

    selectCharacter(index) {
        document.querySelectorAll('.member-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        if (this.characters[index]) {
            this.updateCharacterUI(this.characters[index]);
        }
    }

    getCharacterName(type) {
        const names = {
            'NE_ZHA': '哪吒',
            'XIAO_LONG_NV': '小龙女',
            'YANG_JIAN': '杨戬'
        };
        return names[type] || type;
    }

    getCharacterInitial(type) {
        const initials = {
            'NE_ZHA': '哪',
            'XIAO_LONG_NV': '龙',
            'YANG_JIAN': '杨'
        };
        return initials[type] || type.charAt(0);
    }

    getExpNeededForLevel(level) {
        return level * level * 100;
    }

    async handleAction(action) {
        switch (action) {
            case 'explore':
                this.explore();
                break;
            case 'talk':
                this.talk();
                break;
            case 'shop':
                this.shop();
                break;
            case 'rest':
                this.rest();
                break;
        }
    }

    explore() {
        this.addMessage('你开始探索周围的环境...', 'system');
        const encounterChance = Math.random();
        
        if (encounterChance < 0.3) {
            this.addMessage('遇到了敌人！战斗开始！', 'battle');
        } else if (encounterChance < 0.5) {
            this.addMessage('发现了一个宝箱！', 'item');
        } else {
            this.addMessage('这里没有什么特别的发现。', 'system');
        }
    }

    talk() {
        this.addMessage('你四处张望，寻找可以交谈的人...', 'system');
        this.showModal('对话', '<p>这里暂时没有人可以交谈。</p>');
    }

    shop() {
        this.showModal('商店', `
            <div class="shop-items">
                <div class="shop-item">
                    <span>药草</span>
                    <span>10 金币</span>
                    <button onclick="game.buyItem('herb')">购买</button>
                </div>
                <div class="shop-item">
                    <span>牛黄丸</span>
                    <span>50 金币</span>
                    <button onclick="game.buyItem('niu_huang_wan')">购买</button>
                </div>
                <div class="shop-item">
                    <span>六神丸</span>
                    <span>200 金币</span>
                    <button onclick="game.buyItem('liu_shen_wan')">购买</button>
                </div>
            </div>
        `);
    }

    buyItem(itemId) {
        const prices = {
            'herb': 10,
            'niu_huang_wan': 50,
            'liu_shen_wan': 200
        };
        
        const price = prices[itemId];
        if (this.currentSave.gold >= price) {
            this.currentSave.gold -= price;
            document.getElementById('playerGold').textContent = this.currentSave.gold;
            this.addMessage(`购买了物品！花费 ${price} 金币`, 'item');
        } else {
            this.addMessage('金币不足！', 'system');
        }
    }

    async rest() {
        this.addMessage('你找了个地方休息...', 'system');
        
        if (this.characters.length > 0) {
            const char = this.characters[0];
            char.hp = char.maxHp;
            char.mp = char.maxMp;
            
            try {
                await gameApi.updateCharacter(char.id, {
                    hp: char.hp,
                    mp: char.mp
                });
                this.updateCharacterUI(char);
                this.addMessage('HP和MP已完全恢复！', 'item');
            } catch (error) {
                console.error('更新角色数据失败:', error);
            }
        }
    }

    addMessage(text, type = 'system') {
        const messageLog = document.getElementById('messageLog');
        const p = document.createElement('p');
        p.className = type + '-message';
        p.textContent = text;
        messageLog.appendChild(p);
        messageLog.scrollTop = messageLog.scrollHeight;
    }

    showModal(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        document.getElementById('modal').classList.remove('hidden');
    }

    hideModal() {
        document.getElementById('modal').classList.add('hidden');
    }

    showSaveModal() {
        this.showModal('存档管理', `
            <p>当前存档: ${this.currentSave ? this.currentSave.saveName : '无'}</p>
            <button onclick="game.saveGame()">保存游戏</button>
        `);
    }

    async saveGame() {
        if (!this.currentSave) return;
        
        try {
            await gameApi.updateSave(this.currentSave.id, {
                chapter: this.currentSave.currentChapter,
                location: this.currentSave.currentLocation,
                gold: this.currentSave.gold
            });
            this.addMessage('游戏已保存！', 'system');
            this.hideModal();
        } catch (error) {
            console.error('保存失败:', error);
            this.addMessage('保存失败！', 'system');
        }
    }

    showInventory() {
        this.showModal('背包', '<p>背包功能开发中...</p>');
    }

    showSkills() {
        if (this.characters.length > 0) {
            const skills = JSON.parse(this.characters[0].skills || '[]');
            let content = '<div class="skills-list">';
            if (skills.length === 0) {
                content += '<p>暂未学习技能</p>';
            } else {
                skills.forEach(skill => {
                    content += `<div class="skill-item">${skill}</div>`;
                });
            }
            content += '</div>';
            this.showModal('技能', content);
        }
    }

    showMap() {
        this.showModal('地图', '<p>地图功能开发中...</p>');
    }

    showQuests() {
        this.showModal('任务', '<p>当前任务: 探索陈塘关</p>');
    }

    logout() {
        authService.logout();
        window.location.href = 'login.html';
    }
}

const game = new Game();
