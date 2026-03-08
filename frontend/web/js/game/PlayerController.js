class PlayerController {
    constructor(player, engine) {
        this.player = player;
        this.engine = engine;
        this.moveSpeed = 3;
    }
    
    update(dt, map) {
        let dx = 0;
        let dy = 0;
        
        if (this.engine.isKeyPressed('ArrowUp') || this.engine.isKeyPressed('w') || this.engine.isKeyPressed('W')) {
            dy = -this.moveSpeed;
            this.player.direction = 'up';
        }
        if (this.engine.isKeyPressed('ArrowDown') || this.engine.isKeyPressed('s') || this.engine.isKeyPressed('S')) {
            dy = this.moveSpeed;
            this.player.direction = 'down';
        }
        if (this.engine.isKeyPressed('ArrowLeft') || this.engine.isKeyPressed('a') || this.engine.isKeyPressed('A')) {
            dx = -this.moveSpeed;
            this.player.direction = 'left';
        }
        if (this.engine.isKeyPressed('ArrowRight') || this.engine.isKeyPressed('d') || this.engine.isKeyPressed('D')) {
            dx = this.moveSpeed;
            this.player.direction = 'right';
        }
        
        if (dx !== 0 && dy !== 0) {
            dx *= 0.707;
            dy *= 0.707;
        }
        
        this.player.isMoving = dx !== 0 || dy !== 0;
        
        if (dx !== 0 || dy !== 0) {
            const newX = this.player.x + dx;
            const newY = this.player.y + dy;
            
            if (!this.player.checkCollision(newX, this.player.y, map)) {
                this.player.x = newX;
            }
            if (!this.player.checkCollision(this.player.x, newY, map)) {
                this.player.y = newY;
            }
            
            this.checkExits(map);
            this.checkNPCs(map);
        }
    }
    
    checkExits(map) {
        if (!map.exits) return;
        
        const playerTileX = Math.floor((this.player.x + 16) / map.tileSize);
        const playerTileY = Math.floor((this.player.y + 40) / map.tileSize);
        
        for (const exit of map.exits) {
            if (playerTileX === exit.x && playerTileY === exit.y) {
                this.triggerExit(exit);
                break;
            }
        }
    }
    
    checkNPCs(map) {
        if (!map.npcs) return;
        
        if (this.engine.isKeyPressed(' ')) {
            const playerTileX = Math.floor((this.player.x + 16) / map.tileSize);
            const playerTileY = Math.floor((this.player.y + 40) / map.tileSize);
            
            for (const npc of map.npcs) {
                const dist = Math.abs(npc.x - playerTileX) + Math.abs(npc.y - playerTileY);
                if (dist <= 1) {
                    this.showDialogue(npc);
                    break;
                }
            }
        }
    }
    
    triggerExit(exit) {
        if (this.engine.scene && this.engine.scene.changeMap) {
            this.engine.scene.changeMap(exit.targetMap, exit.targetX, exit.targetY);
        }
    }
    
    showDialogue(npc) {
        if (this.engine.scene && this.engine.scene.showDialogue) {
            this.engine.scene.showDialogue(npc);
        }
    }
}

class GameScene {
    constructor() {
        this.engine = null;
        this.map = null;
        this.player = null;
        this.camera = { x: 0, y: 0 };
        this.dialogue = null;
        this.mapTransition = null;
    }
    
    init(engine) {
        this.engine = engine;
        
        this.player = new NeZhaSprite({
            id: 'player',
            name: '哪吒',
            x: 12 * 32,
            y: 8 * 32
        });
        
        this.playerController = new PlayerController(this.player, engine);
        
        this.loadMap('chen_tang_guan');
    }
    
    loadMap(mapId) {
        const mapConfig = MapData[mapId];
        if (mapConfig) {
            this.map = new TileMap(mapConfig);
        }
    }
    
    changeMap(mapId, targetX, targetY) {
        if (this.mapTransition) return;
        
        this.mapTransition = {
            progress: 0,
            targetMap: mapId,
            targetX: targetX,
            targetY: targetY
        };
    }
    
    update(dt) {
        if (this.mapTransition) {
            this.mapTransition.progress += dt / 500;
            if (this.mapTransition.progress >= 1) {
                this.loadMap(this.mapTransition.targetMap);
                this.player.x = this.mapTransition.targetX * 32;
                this.player.y = this.mapTransition.targetY * 32;
                this.mapTransition = null;
            }
            return;
        }
        
        if (this.dialogue) {
            if (this.engine.isKeyPressed(' ') || this.engine.isKeyPressed('Enter')) {
                this.dialogue.index++;
                if (this.dialogue.index >= this.dialogue.lines.length) {
                    this.dialogue = null;
                }
            }
            return;
        }
        
        this.playerController.update(dt, this.map);
        this.player.update(dt, this.map);
        
        this.updateCamera();
    }
    
    updateCamera() {
        const targetX = this.player.x - this.engine.width / 2 + 16;
        const targetY = this.player.y - this.engine.height / 2 + 24;
        
        this.camera.x += (targetX - this.camera.x) * 0.1;
        this.camera.y += (targetY - this.camera.y) * 0.1;
        
        const maxCameraX = this.map.width * this.map.tileSize - this.engine.width;
        const maxCameraY = this.map.height * this.map.tileSize - this.engine.height;
        
        this.camera.x = Math.max(0, Math.min(this.camera.x, maxCameraX));
        this.camera.y = Math.max(0, Math.min(this.camera.y, maxCameraY));
    }
    
    render(ctx) {
        if (!this.map) return;
        
        this.map.render(ctx, this.camera.x, this.camera.y);
        this.player.render(ctx, this.camera.x, this.camera.y);
        
        this.renderUI(ctx);
        
        if (this.mapTransition) {
            const alpha = Math.sin(this.mapTransition.progress * Math.PI);
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.fillRect(0, 0, this.engine.width, this.engine.height);
        }
        
        if (this.dialogue) {
            this.renderDialogue(ctx);
        }
    }
    
    renderUI(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 150, 60);
        
        ctx.strokeStyle = '#ffd700';
        ctx.strokeRect(10, 10, 150, 60);
        
        ctx.fillStyle = '#ffd700';
        ctx.font = '14px Microsoft YaHei';
        ctx.fillText(this.map.name, 20, 32);
        
        ctx.fillStyle = '#fff';
        ctx.font = '12px Microsoft YaHei';
        ctx.fillText(`位置: (${Math.floor(this.player.x/32)}, ${Math.floor(this.player.y/32)})`, 20, 55);
    }
    
    renderDialogue(ctx) {
        const boxHeight = 100;
        const boxY = this.engine.height - boxHeight - 20;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(20, boxY, this.engine.width - 40, boxHeight);
        
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, boxY, this.engine.width - 40, boxHeight);
        
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 14px Microsoft YaHei';
        ctx.fillText(this.dialogue.name, 40, boxY + 25);
        
        ctx.fillStyle = '#fff';
        ctx.font = '14px Microsoft YaHei';
        ctx.fillText(this.dialogue.lines[this.dialogue.index], 40, boxY + 55);
        
        ctx.fillStyle = '#888';
        ctx.font = '12px Microsoft YaHei';
        ctx.fillText('按空格键继续...', this.engine.width - 130, boxY + 80);
    }
    
    showDialogue(npc) {
        this.dialogue = {
            name: npc.name,
            lines: npc.dialogue || ['...'],
            index: 0
        };
    }
}
