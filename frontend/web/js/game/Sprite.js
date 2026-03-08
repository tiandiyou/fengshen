class Sprite {
    constructor(config) {
        this.id = config.id || 'sprite';
        this.name = config.name || 'Unknown';
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 32;
        this.height = config.height || 48;
        this.speed = config.speed || 2;
        
        this.direction = 'down';
        this.isMoving = false;
        
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 150;
        
        this.color = config.color || '#ff6b6b';
        this.secondaryColor = config.secondaryColor || '#ffd700';
        
        this.collisionBox = {
            x: 4,
            y: 32,
            width: 24,
            height: 16
        };
    }
    
    update(dt, map) {
        if (this.animationTimer > this.animationSpeed) {
            this.animationFrame = (this.animationFrame + 1) % 4;
            this.animationTimer = 0;
        }
        
        if (this.isMoving) {
            this.animationTimer += dt;
        } else {
            this.animationFrame = 0;
        }
    }
    
    render(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;
        
        ctx.save();
        
        this.drawCharacter(ctx, screenX, screenY);
        
        ctx.restore();
    }
    
    drawCharacter(ctx, x, y) {
        const bobOffset = this.isMoving ? Math.sin(this.animationFrame * Math.PI / 2) * 2 : 0;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(x + 16, y + 44 - bobOffset, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.secondaryColor;
        ctx.beginPath();
        ctx.arc(x + 16, y + 14 - bobOffset, 10, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffe4c4';
        ctx.beginPath();
        ctx.arc(x + 16, y + 8 - bobOffset, 8, 0, Math.PI * 2);
        ctx.fill();
        
        this.drawFace(ctx, x, y, bobOffset);
        
        ctx.fillStyle = this.color;
        ctx.fillRect(x + 4, y + 22 - bobOffset, 24, 20);
        
        this.drawLegs(ctx, x, y, bobOffset);
    }
    
    drawFace(ctx, x, y, bobOffset) {
        ctx.fillStyle = '#000';
        
        let eyeOffsetX = 0;
        if (this.direction === 'left') eyeOffsetX = -2;
        if (this.direction === 'right') eyeOffsetX = 2;
        
        if (this.direction !== 'up') {
            ctx.beginPath();
            ctx.arc(x + 13 + eyeOffsetX, y + 7 - bobOffset, 1.5, 0, Math.PI * 2);
            ctx.arc(x + 19 + eyeOffsetX, y + 7 - bobOffset, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        if (this.direction === 'down' || this.direction === 'left' || this.direction === 'right') {
            ctx.beginPath();
            ctx.arc(x + 16 + eyeOffsetX * 0.5, y + 12 - bobOffset, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawLegs(ctx, x, y, bobOffset) {
        const legOffset = this.isMoving ? Math.sin(this.animationFrame * Math.PI / 2) * 4 : 0;
        
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 8, y + 40 - bobOffset, 6, 8 + legOffset * 0.5);
        ctx.fillRect(x + 18, y + 40 - bobOffset, 6, 8 - legOffset * 0.5);
    }
    
    move(dx, dy, map) {
        if (dx !== 0 || dy !== 0) {
            this.isMoving = true;
            
            if (Math.abs(dx) > Math.abs(dy)) {
                this.direction = dx > 0 ? 'right' : 'left';
            } else {
                this.direction = dy > 0 ? 'down' : 'up';
            }
            
            const newX = this.x + dx * this.speed;
            const newY = this.y + dy * this.speed;
            
            if (!this.checkCollision(newX, this.y, map)) {
                this.x = newX;
            }
            if (!this.checkCollision(this.x, newY, map)) {
                this.y = newY;
            }
        } else {
            this.isMoving = false;
        }
    }
    
    checkCollision(newX, newY, map) {
        if (!map) return false;
        
        const collisionX = newX + this.collisionBox.x;
        const collisionY = newY + this.collisionBox.y;
        const collisionW = this.collisionBox.width;
        const collisionH = this.collisionBox.height;
        
        const corners = [
            { x: collisionX, y: collisionY },
            { x: collisionX + collisionW, y: collisionY },
            { x: collisionX, y: collisionY + collisionH },
            { x: collisionX + collisionW, y: collisionY + collisionH }
        ];
        
        for (const corner of corners) {
            const tileX = Math.floor(corner.x / map.tileSize);
            const tileY = Math.floor(corner.y / map.tileSize);
            
            if (map.isBlocked(tileX, tileY)) {
                return true;
            }
        }
        
        return false;
    }
    
    getCollisionBox() {
        return {
            x: this.x + this.collisionBox.x,
            y: this.y + this.collisionBox.y,
            width: this.collisionBox.width,
            height: this.collisionBox.height
        };
    }
}

class NeZhaSprite extends Sprite {
    constructor(config) {
        super(config);
        this.color = '#cc0000';
        this.secondaryColor = '#ff6600';
        this.hasWeapons = config.hasWeapons || false;
    }
    
    drawCharacter(ctx, x, y) {
        super.drawCharacter(ctx, x, y);
        
        if (this.hasWeapons) {
            this.drawWeapons(ctx, x, y);
        }
    }
    
    drawWeapons(ctx, x, y) {
        const bobOffset = this.isMoving ? Math.sin(this.animationFrame * Math.PI / 2) * 2 : 0;
        
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(x + 4, y + 28 - bobOffset, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + 4, y + 28 - bobOffset, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
    }
}

class DragonGirlSprite extends Sprite {
    constructor(config) {
        super(config);
        this.color = '#4169e1';
        this.secondaryColor = '#87ceeb';
    }
    
    drawCharacter(ctx, x, y) {
        super.drawCharacter(ctx, x, y);
        
        const bobOffset = this.isMoving ? Math.sin(this.animationFrame * Math.PI / 2) * 2 : 0;
        ctx.fillStyle = '#87ceeb';
        ctx.beginPath();
        ctx.moveTo(x + 6, y + 4 - bobOffset);
        ctx.lineTo(x + 16, y - 4 - bobOffset);
        ctx.lineTo(x + 26, y + 4 - bobOffset);
        ctx.closePath();
        ctx.fill();
    }
}

class YangJianSprite extends Sprite {
    constructor(config) {
        super(config);
        this.color = '#228b22';
        this.secondaryColor = '#32cd32';
        this.hasThirdEye = true;
    }
    
    drawFace(ctx, x, y, bobOffset) {
        super.drawFace(ctx, x, y, bobOffset);
        
        if (this.hasThirdEye && this.direction !== 'up') {
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.ellipse(x + 16, y + 4 - bobOffset, 2, 3, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
