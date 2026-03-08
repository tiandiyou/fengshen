export class InventorySystem {
    private items: Map<string, number> = new Map();
    private equipment: Map<string, string> = new Map();

    addItem(itemId: string, quantity: number = 1) {
        const current = this.items.get(itemId) || 0;
        this.items.set(itemId, current + quantity);
    }

    removeItem(itemId: string, quantity: number = 1): boolean {
        const current = this.items.get(itemId) || 0;
        if (current < quantity) return false;

        const remaining = current - quantity;
        if (remaining <= 0) {
            this.items.delete(itemId);
        } else {
            this.items.set(itemId, remaining);
        }

        return true;
    }

    getItemCount(itemId: string): number {
        return this.items.get(itemId) || 0;
    }

    equipItem(characterId: string, itemId: string): boolean {
        if (!this.hasItem(itemId)) return false;

        const currentEquipment = this.equipment.get(characterId);
        if (currentEquipment) {
            this.addItem(currentEquipment, 1);
        }

        this.removeItem(itemId, 1);
        this.equipment.set(characterId, itemId);
        return true;
    }

    unequipItem(characterId: string): boolean {
        const equipped = this.equipment.get(characterId);
        if (!equipped) return false;

        this.addItem(equipped, 1);
        this.equipment.delete(characterId);
        return true;
    }

    getEquippedItem(characterId: string): string | undefined {
        return this.equipment.get(characterId);
    }

    hasItem(itemId: string): boolean {
        return (this.items.get(itemId) || 0) > 0;
    }

    getAllItems(): Map<string, number> {
        return new Map(this.items);
    }

    clear() {
        this.items.clear();
        this.equipment.clear();
    }
}
