class TileMap {
    constructor(config) {
        this.id = config.id || 'map';
        this.name = config.name || 'Unknown';
        this.width = config.width || 25;
        this.height = config.height || 15;
        this.tileSize = 32;
        
        this.tiles = config.tiles || this.generateEmptyMap();
        this.collisions = config.collisions || [];
        this.npcs = config.npcs || [];
        this.exits = config.exits || [];
        this.treasures = config.treasures || [];
        
        this.tileColors = {
            0: '#2d5a27',
            1: '#8b4513',
            2: '#4682b4',
            3: '#808080',
            4: '#1a1a1a',
            5: '#8b0000',
            6: '#daa520',
            7: '#4a4a4a',
            8: '#228b22',
            9: '#a0522d'
        };
        
        this.tileTypes = {
            0: 'grass',
            1: 'wall',
            2: 'water',
            3: 'path',
            4: 'building',
            5: 'door',
            6: 'floor',
            7: 'stone',
            8: 'tree',
            9: 'bridge'
        };
    }
    
    generateEmptyMap() {
        const tiles = [];
        for (let y = 0; y < this.height; y++) {
            tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                tiles[y][x] = 0;
            }
        }
        return tiles;
    }
    
    render(ctx, cameraX, cameraY) {
        const startX = Math.floor(cameraX / this.tileSize);
        const startY = Math.floor(cameraY / this.tileSize);
        const endX = Math.min(startX + 26, this.width);
        const endY = Math.min(startY + 16, this.height);
        
        for (let y = Math.max(0, startY); y < endY; y++) {
            for (let x = Math.max(0, startX); x < endX; x++) {
                const tile = this.tiles[y] && this.tiles[y][x] !== undefined ? this.tiles[y][x] : 0;
                const screenX = x * this.tileSize - cameraX;
                const screenY = y * this.tileSize - cameraY;
                
                this.drawTile(ctx, screenX, screenY, tile);
            }
        }
        
        this.npcs.forEach(npc => {
            const screenX = npc.x * this.tileSize - cameraX;
            const screenY = npc.y * this.tileSize - cameraY;
            this.drawNPC(ctx, screenX, screenY, npc);
        });
    }
    
    drawTile(ctx, x, y, type) {
        const color = this.tileColors[type] || this.tileColors[0];
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.tileSize, this.tileSize);
        
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
        
        switch(type) {
            case 0:
                this.drawGrass(ctx, x, y);
                break;
            case 1:
                this.drawWall(ctx, x, y);
                break;
            case 2:
                this.drawWater(ctx, x, y);
                break;
            case 3:
                this.drawPath(ctx, x, y);
                break;
            case 5:
                this.drawDoor(ctx, x, y);
                break;
            case 8:
                this.drawTree(ctx, x, y);
                break;
        }
    }
    
    drawGrass(ctx, x, y) {
        ctx.fillStyle = '#1a4a14';
        for (let i = 0; i < 3; i++) {
            const gx = x + 5 + Math.random() * 22;
            const gy = y + 5 + Math.random() * 22;
            ctx.fillRect(gx, gy, 2, 4);
        }
    }
    
    drawWall(ctx, x, y) {
        ctx.fillStyle = '#654321';
        ctx.fillRect(x + 2, y + 2, 12, 12);
        ctx.fillRect(x + 18, y + 18, 12, 12);
    }
    
    drawWater(ctx, x, y) {
        ctx.strokeStyle = '#6495ed';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + 16);
        ctx.quadraticCurveTo(x + 8, y + 12, x + 16, y + 16);
        ctx.quadraticCurveTo(x + 24, y + 20, x + 32, y + 16);
        ctx.stroke();
    }
    
    drawPath(ctx, x, y) {
        ctx.fillStyle = '#a0522d';
        ctx.fillRect(x + 8, y + 8, 16, 16);
    }
    
    drawDoor(ctx, x, y) {
        ctx.fillStyle = '#8b0000';
        ctx.fillRect(x + 8, y + 4, 16, 28);
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(x + 20, y + 18, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawTree(ctx, x, y) {
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 12, y + 20, 8, 12);
        ctx.fillStyle = '#228b22';
        ctx.beginPath();
        ctx.arc(x + 16, y + 14, 12, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawNPC(ctx, x, y, npc) {
        ctx.fillStyle = npc.color || '#ff69b4';
        ctx.beginPath();
        ctx.arc(x + 16, y + 16, 12, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x + 12, y + 14, 2, 0, Math.PI * 2);
        ctx.arc(x + 20, y + 14, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(x + 16, y + 20, 4, 0, Math.PI);
        ctx.fill();
    }
    
    isBlocked(tileX, tileY) {
        if (tileX < 0 || tileX >= this.width || tileY < 0 || tileY >= this.height) {
            return true;
        }
        
        const tile = this.tiles[tileY] && this.tiles[tileY][tileX];
        if (tile === undefined) return true;
        
        const blockedTiles = [1, 2, 4, 8];
        return blockedTiles.includes(tile);
    }
    
    getTileAt(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        return {
            x: tileX,
            y: tileY,
            type: this.tiles[tileY] && this.tiles[tileY][tileX]
        };
    }
}

const Maps = {
    chen_tang_guan: {
        id: 'chen_tang_guan',
        name: '陈塘关',
        width: 25,
        height: 15,
        tiles: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,1],
            [1,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,1],
            [1,0,4,6,5,3,3,3,0,0,0,0,0,0,0,0,3,3,3,5,6,4,4,0,1],
            [1,0,4,6,6,3,0,3,0,0,0,0,0,0,0,0,3,0,3,6,6,4,4,0,1],
            [1,0,0,0,0,3,0,3,0,0,0,0,0,0,0,0,3,0,3,0,0,0,0,0,1],
            [1,0,0,0,0,3,0,3,0,0,0,0,0,0,0,0,3,0,3,0,0,0,0,0,1],
            [1,0,8,0,0,3,0,3,3,3,3,3,3,3,3,3,3,0,3,0,0,0,8,0,1],
            [1,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,1],
            [1,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,1],
            [1,0,0,0,0,3,0,0,0,0,0,3,3,3,9,3,3,0,3,0,0,0,0,0,1],
            [1,0,0,0,0,3,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,0,0,1],
            [1,0,0,0,0,3,3,3,3,3,3,3,0,0,2,0,0,3,3,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,3,0,0,2,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ],
        npcs: [
            { id: 'old_man', name: '老者', x: 5, y: 7, color: '#a0a0a0', dialogue: ['年轻人，你可是要去降妖除魔？'] },
            { id: 'merchant', name: '商人', x: 20, y: 5, color: '#ffd700', dialogue: ['客官要买点什么？'] },
            { id: 'guard', name: '守卫', x: 12, y: 3, color: '#c0c0c0', dialogue: ['陈塘关欢迎你！'] }
        ],
        exits: [
            { x: 12, y: 14, targetMap: 'chen_tang_wai', targetX: 12, targetY: 1 }
        ]
    },
    
    chen_tang_wai: {
        id: 'chen_tang_wai',
        name: '陈塘关外',
        width: 30,
        height: 20,
        tiles: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,8,0,0,0,0,0,0,0,8,0,0,0,0,8,0,0,0,0,0,0,8,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,8,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,8,0,0,0,0,8,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ],
        npcs: [
            { id: 'fisherman', name: '渔夫', x: 25, y: 10, color: '#87ceeb', dialogue: ['最近海上风浪很大...'] }
        ],
        exits: [
            { x: 12, y: 0, targetMap: 'chen_tang_guan', targetX: 12, targetY: 13 }
        ]
    }
};
