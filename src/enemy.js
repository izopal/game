export class Enemy {
    constructor (){
        // параметри для зміни кадрів забраження NPS
        this.frameX               = 0;
        this.frameY               = 3;
        // параметри швидкості відображення кадрів NPS
        this.fps                  = 20;
        this.frameInterval        = 1000/this.fps;
        this.frameTimer           = 0;
        // маркер позначення NPS на видалення
        this.markedForDelet       = false;
        // коефіціїнт збільшення/зменшення області (де ми не позначаємо NPS на видалення)
        this.multiplierEnemyArea  = 3;
    }

    update(deltaTime){
        // параметри горизонтальної швидкості NPS (вказуємо умову руху NPS при різних напрямках персонажа)
        if(this.game.player.isFacingRight) {
            this.x -= this.speedX + this.game.speed;       // регулюємо швидкість NPS параметром this.game.speed (а саме коли в положені неасктивному швидкість 0, в інших випадках 3)
        } else {
            this.x += this.game.speed - this.speedX;
        }
       
        // частота відображення і зміна кадрів NPS
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxframeX) this.frameX ++;
            else                              this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        //створюємо умову при яккій NPS що вийшов за межі екрану позначає  маркером на видалення
        if ( this.x + this.enemyWidth  < - this.multiplierEnemyArea * this.game.width || 
             this.x                    >   this.multiplierEnemyArea * this.game.width && !this.game.player.isFacingRight
        )
             this.markedForDelet = true;
        // console.log(this.markedForDelet);
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
                        this.enemyWidth, 
                        this.enemyHeight,
                    );
    }
    debugDraw(ctx){
        if(!this.game.debug) {
            // малюємо квадрат
            ctx.strokeStyle = 'red';
            ctx.strokeRect (
                            this.x,  
                            this.y, 
                            this.enemyWidth, 
                            this.enemyHeight, 
                            ); 
        }
    }
}

// Для стоврення різних типів NPS прописуємо підкласи
// Літаючі NPS
export class FlyingEnemy extends Enemy {
    constructor(game){
        super();
        this.game         = game;
        // підключення зображення NPS
        this.image        = enemy_fly;
        // параметри початквого розміру кадру (frame) зображення для персонажа
        this.width        = 60; 
        this.height       = 44;
        // параметри кінцевого розміру кадру (frame) зображення для персонажа
        this.sizeX        = 1;
        this.sizeY        = 1;
        this.enemyWidth   = this.width  * this.sizeX;
        this.enemyHeight  = this.height * this.sizeY;
        // параметри початкового розміщення NPS на полотні
        this.x            = this.game.width + Math.random() * this.game.width * .3;              // задаємо випадкові координати  появи NPS по осі X
        this.y            = Math.random() * this.game.height * .6;                               // задаємо випадкові координати  появи NPS по осі Y
        // параметри для зміни кадрів забраження NPS
        this.frameX       = 0;
        this.maxframeX    = 5;
        // параметри швидкості руху NPS
        this.minSpeedX    = 1;                                                                    // задаємо мінімальну випадкову початкову горизонтальна швидкість для кожного нового NPS
        this.maxSpeedX    = 5;                                                                    // задаємо максимальну випадкову початкову горизонтальна швидкість для кожного нового NPS
        this.speedX       = Math.random() * (this.maxSpeedX - this.minSpeedX)  + this.minSpeedX;  // задаємо випадкову початкову горизонтальна швидкість для кожного нового NPS
        this.speedY       = Math.random() * 5 + 2;                                                // початкова вертикальна швидкість
        // параметри амплітуди горизонтального руху
        this.angle        = 0;
        this.va           = Math.random() * .1 + .1;                                              // частота амплітуд горизонтального руху                                  
    }
    update(deltaTime){
        super.update(deltaTime);
        //  обнововлюємо амплітуду горизонтального руху кожні deltaTime часу
        this.angle += this.va;
        this.y += Math.sin(this.angle) * this.speedY;
    }
    draw(ctx){
        super.draw(ctx);
        super.debugDraw(ctx);
    }
}

// Назмемні NPS
export class GroundEnemy extends Enemy {
    constructor(game){
        super();
        this.game         = game;
        // підключення зображення NPS
        this.image        = enemy_plant;
        // параметри початквого розміру кадру (frame) зображення для персонажа
        this.width        = 60; 
        this.height       = 87;
        // параметри кінцевого розміру кадру (frame) зображення для персонажа
        this.sizeX        = 1;
        this.sizeY        = 1;
        this.enemyWidth   = this.width  * this.sizeX;
        this.enemyHeight  = this.height * this.sizeY;
        // параметри початкового розміщення NPS на полотні
        this.x            = this.game.width  * this.multiplierEnemyArea;
        this.y            = this.game.height - this.game.groundMargin - this.enemyHeight;
        // параметри для зміни кадрів забраження NPS
        this.frameX       = 0;
        this.maxframeX    = 1;
        // параметри швидкості руху NPS
        this.speedX       = 0;
        this.speedY       = 0;
    }
    update(deltaTime){
        super.update(deltaTime);
    }
    draw(ctx){
        super.draw(ctx);
        super.debugDraw(ctx);
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game){
        super();
        this.game         = game;
        // підключення зображення NPS
        this.image        = enemy_spider_big;
        // параметри початквого розміру кадру (frame) зображення для персонажа
        this.width        = 120; 
        this.height       = 144;
        // параметри кінцевого розміру кадру (frame) зображення для персонажа
        this.size         = Math.random() * .5 + .5;
        this.enemyWidth   = this.width  * this.size;
        this.enemyHeight  = this.height * this.size;
        // параметри початкового розміщення NPS на полотні
        this.x            = this.game.width * this.multiplierEnemyArea;
        this.y            = 0 - this.enemyHeight;
        // параметри для зміни кадрів забраження NPS
        this.frameX       = 0;
        this.maxframeX    = 5;
        // параметри швидкості руху NPS
        this.speedX       = 0;
        this.speedY       = Math.random() * 12 + 5;     // 
        // Параметри для регулюваня області вертикального руху NPS 
        this.maxLenght    = Math.floor(this.game.height - this.game.groundMargin);
        // Параметр зміни прозорості для NPS
        this.minAlpha     = 0.4;
        this.maxAlpha     = 1;
        this.opacity      = Math.random() * (this.maxAlpha - this.minAlpha) + this.minAlpha; 
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y           += this.speedY;
        // створюємо умову щоб NPS повертався на початкову позицію
        if       (this.y + this.enemyHeight > this.maxLenght) this.speedY *= -1;
        else  if (this.y + this.enemyHeight < 0)              this.speedY *= -1;
        // console.log(this.speedY);
    }  
    draw(ctx){
        super.debugDraw(ctx);
        ctx.save();

        ctx.globalAlpha = this.opacity;     // Змінюємо прозорість NPS
        super.draw(ctx);                    // Зарпускаємо draw(ctx) з класу Enemy для промальовки NPS (павук)
        ctx.lineWidth = 2 * this.size;      // Змінюємо товщину лінії 
        
        // малюємо вертикальну лінію
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(this.x + this.enemyWidth/2, 0);
        ctx.lineTo(this.x + this.enemyWidth/2, this.y + 50 * this.size);
        ctx.stroke();

        ctx.restore();
    }
}