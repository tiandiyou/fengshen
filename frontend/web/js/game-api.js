class GameApi {
    constructor() {
        this.gameBaseUrl = 'http://localhost:8082/game';
    }

    async request(method, url, data) {
        const headers = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem('auth_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(this.gameBaseUrl + url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Game API request error:', error);
            return {
                code: 500,
                message: '网络请求失败',
                data: null,
            };
        }
    }

    async getSaveList() {
        return await this.request('GET', '/save/list');
    }

    async getSaveDetail(saveId) {
        return await this.request('GET', `/save/${saveId}`);
    }

    async createSave(saveName) {
        return await this.request('POST', '/save', { saveName });
    }

    async updateSave(saveId, data) {
        return await this.request('PUT', `/save/${saveId}`, data);
    }

    async deleteSave(saveId) {
        return await this.request('DELETE', `/save/${saveId}`);
    }

    async getCharacters(saveId) {
        return await this.request('GET', `/character?saveId=${saveId}`);
    }

    async getCharacter(characterId) {
        return await this.request('GET', `/character/${characterId}`);
    }

    async updateCharacter(characterId, data) {
        return await this.request('PUT', `/character/${characterId}`, data);
    }

    async levelUp(characterId) {
        return await this.request('POST', `/character/${characterId}/level-up`);
    }

    async updateEquipment(characterId, equipment) {
        return await this.request('PUT', `/character/${characterId}/equipment`, { equipment });
    }

    async updateSkills(characterId, skills) {
        return await this.request('PUT', `/character/${characterId}/skills`, { skills });
    }
}

const gameApi = new GameApi();
