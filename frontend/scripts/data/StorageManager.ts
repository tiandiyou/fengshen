import { GameSave, CharacterData, InventoryItem } from './types';

export class StorageManager {
    private readonly SAVE_KEY = 'fengshen_save';
    private readonly TOKEN_KEY = 'fengshen_token';

    saveToken(token: string) {
        try {
            if (typeof wx !== 'undefined') {
                wx.setStorageSync(this.TOKEN_KEY, token);
            } else {
                localStorage.setItem(this.TOKEN_KEY, token);
            }
        } catch (error) {
            console.error('Failed to save token:', error);
        }
    }

    loadToken(): string | null {
        try {
            if (typeof wx !== 'undefined') {
                return wx.getStorageSync(this.TOKEN_KEY) || null;
            } else {
                return localStorage.getItem(this.TOKEN_KEY);
            }
        } catch (error) {
            console.error('Failed to load token:', error);
            return null;
        }
    }

    clearToken() {
        try {
            if (typeof wx !== 'undefined') {
                wx.removeStorageSync(this.TOKEN_KEY);
            } else {
                localStorage.removeItem(this.TOKEN_KEY);
            }
        } catch (error) {
            console.error('Failed to clear token:', error);
        }
    }

    saveGameLocal(save: GameSave, characters: CharacterData[], inventory: InventoryItem[]) {
        try {
            const saveData = {
                save,
                characters,
                inventory,
                savedAt: Date.now(),
            };

            if (typeof wx !== 'undefined') {
                wx.setStorageSync(this.SAVE_KEY, saveData);
            } else {
                localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
            }
        } catch (error) {
            console.error('Failed to save game:', error);
        }
    }

    loadGameLocal(): { save: GameSave; characters: CharacterData[]; inventory: InventoryItem[] } | null {
        try {
            let data: any;

            if (typeof wx !== 'undefined') {
                data = wx.getStorageSync(this.SAVE_KEY);
            } else {
                const json = localStorage.getItem(this.SAVE_KEY);
                data = json ? JSON.parse(json) : null;
            }

            return data || null;
        } catch (error) {
            console.error('Failed to load game:', error);
            return null;
        }
    }

    clearGameLocal() {
        try {
            if (typeof wx !== 'undefined') {
                wx.removeStorageSync(this.SAVE_KEY);
            } else {
                localStorage.removeItem(this.SAVE_KEY);
            }
        } catch (error) {
            console.error('Failed to clear game:', error);
        }
    }

    async saveToCloud(save: GameSave, characters: CharacterData[], inventory: InventoryItem[]) {
        // TODO: 实现云存档同步
        console.log('Cloud save not implemented yet');
    }

    async loadFromCloud(): Promise<{ save: GameSave; characters: CharacterData[]; inventory: InventoryItem[] } | null> {
        // TODO: 实现云存档加载
        console.log('Cloud load not implemented yet');
        return null;
    }
}
