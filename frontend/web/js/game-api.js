class GameApi {
    constructor() {
        this.gameBaseUrl = 'http://localhost:8082/game';
    }

    async getSaveList() {
        return await httpClient.get('/save/list');
    }

    async getSaveDetail(saveId) {
        return await httpClient.get(`/save/${saveId}`);
    }

    async createSave(saveName) {
        return await httpClient.post('/save', { saveName });
    }

    async updateSave(saveId, data) {
        return await httpClient.put(`/save/${saveId}`, data);
    }

    async deleteSave(saveId) {
        return await httpClient.delete(`/save/${saveId}`);
    }

    async getCharacters(saveId) {
        return await httpClient.get('/character', { saveId });
    }

    async getCharacter(characterId) {
        return await httpClient.get(`/character/${characterId}`);
    }

    async updateCharacter(characterId, data) {
        return await httpClient.put(`/character/${characterId}`, data);
    }

    async levelUp(characterId) {
        return await httpClient.post(`/character/${characterId}/level-up`);
    }

    async updateEquipment(characterId, equipment) {
        return await httpClient.put(`/character/${characterId}/equipment`, { equipment });
    }

    async updateSkills(characterId, skills) {
        return await httpClient.put(`/character/${characterId}/skills`, { skills });
    }
}

const gameApi = new GameApi();
