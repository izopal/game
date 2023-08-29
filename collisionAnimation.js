export default class CollisionAnimation {
    constructor (enemy, player) {
        this.enemies        = enemy;
        this.player         = player;
        // Параметр звуку вибуху
        this.soundBoom      = new Audio();
        this.soundBoom.src  = './sound/zvukBoom.wav';
        // встановлюємо зображення (а саме лівий верхній кут) в центр ворогів 
        this.enemyX         = this.enemies.x + this.enemies.enemyWidth  * .5;   
        this.enemyY         = this.enemies.y + this.enemies.enemyHeight * .5;

        // підключення текстуру зіткнення
        // this.image       = document.getElementById('boom');
        this.image          = boom;
        // параметри початквого розміру кадру (frame) зображення для персонажа
        this.width          = 100; 
        this.height         = 90;
        // параметр випадкового розміру  вибуху
        this.size           = Math.random() + .5;
        this.boomWidth      = this.width * this.size;  
        this.boomHeight     = this.width * this.size;  
        // параметри початкового розміщення на полотні (зміщаємо лівий верхній кут зображення так щоб на його місце розмістивсяцентр зображення)
        this.x              = this.enemyX - this.boomWidth  * .5;  
        this.y              = this.enemyY - this.boomHeight * .5; 
        // параметри для зміни кадрів забраження NPS
        this.frameX         = 0;
        this.maxframeX      = 4;
        // параметри швидкості відображення кадрів NPS
        this.fps            = Math.random() * 20 + 5;
        this.frameInterval  = 1000/this.fps;
        this.frameTimer     = 0;
        // маркер позначення вибухів на видалення
        this.markedForDelet = false; 
    }
    draw(ctx){
        ctx.drawImage ( this.image,
                        // параметри кадру, який обераємо 
                        this.frameX * this.width,                            
                        0,                            
                        this.width, 
                        this.height,
                        // параметри кадру, де буде розміщений і які розміри буде мати
                        this.x,                                                                                          
                        this.y, 
                        this.boomWidth, 
                        this.boomHeight);  
    }
    update(deltaTime){ 
        if (!this.player.isFacingRight){
            this.x += this.enemies.game.speed;
        } else (
            this.x -= this.enemies.game.speed)
        
        if (this.frameX === 0)
            this.soundBoom.play();
        if (this.frameTimer > this.frameInterval){
            this.frameX ++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime; 
        }
        if (this.frameX > this.maxframeX ) this.markedForDelet = true;
    }
}