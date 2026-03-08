class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = 800;
        this.height = 480;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.lastTime = 0;
        this.deltaTime = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        
        this.running = false;
        this.scene = null;
        
        this.keys = {};
        this.setupInput();
    }
    
    setupInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }
    
    isKeyPressed(key) {
        return this.keys[key] || false;
    }
    
    start() {
        this.running = true;
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    stop() {
        this.running = false;
    }
    
    gameLoop(currentTime) {
        if (!this.running) return;
        
        this.deltaTime = currentTime - this.lastTime;
        
        if (this.deltaTime >= this.frameInterval) {
            this.lastTime = currentTime - (this.deltaTime % this.frameInterval);
            
            this.update(this.deltaTime);
            this.render();
        }
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(dt) {
        if (this.scene && this.scene.update) {
            this.scene.update(dt);
        }
    }
    
    render() {
        this.ctx.fillStyle = '#1a0a0a';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        if (this.scene && this.scene.render) {
            this.scene.render(this.ctx);
        }
    }
    
    setScene(scene) {
        this.scene = scene;
        if (scene.init) {
            scene.init(this);
        }
    }
}
