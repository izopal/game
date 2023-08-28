class Particle {
    constructor(player) {
        this.player      = player;
        this.movement    = this.player.movementBacground;
        // console.log(this.input)
        // маркер позначення на видалення
        this.markedForDelet = false;
    }
    update(){
        this.size   *= .95;                                                              // при русі розмір частинки з кожним кадром зменшується на .95                                
        if (this.player.onGround() && this.size  < .5)
        this.markedForDelet = true;                                                      // позначаємо всі частинки на видалення розмір яких зменшився до .5
        !this.player.onGround() ?  this.player.game.maxParticles = 10:                       
                                   this.player.game.maxParticles = 50;   
    }
}

export class Dust extends Particle {
    constructor(player){
        super(player);
        // параметри початкового розміщення на полотні
        this.x1        = this.player.x1;                             // лівий верхній кут персонажа координата X
        this.x2        = this.player.x2;                             // правий верхній кут  персонажа координата X
        this.dx        = 30;                                         // параметр зміщення частинки по осі X (регулювання положання)
        this.y         = this.player.y2;                             // лівий нижній кут персонажа координата Y
        // параметр випадкового розміру чатинок
        this.size      = Math.random() * 10 + 10;
        // параметри швидкості руху частинок
        this.speedX    = Math.random();                    // початкова горизонтальна швидкість
        this.speedY    = Math.random();                    // початкова вертикальна швидкість
        // параметри кольору частинок
        this.color = 'rgba(0, 0, 0, 0.2)'
    }
    update(){
        super.update();
         // Міняємо напрямок руху частинок горизонтальинй момент
         if(this.player.isFacingRight){
            this.x1 -= this.speedX + this.player.game.speed;        // зправа наліво 
        }else {
            this.x2 -= this.speedX - this.player.game.speed;        // зліва направо 
        }
        // Вертикальний момент руху частинок
        this.y      -= this.speedY;                                 // при русі частинки  піднімаються догори

    }
    draw(ctx) {
        this.player.isFacingRight ? this.x = this.x1 + this.dx:
                                    this.x = this.x2 - this.dx;
        ctx.fillStyle = this.color;
        ctx.save      ();
        // малюємо коло
        ctx.beginPath ();
        ctx.arc       ( this.x, 
                        this.y, 
                        this.size, 
                         0, 
                        Math.PI * 2
        );
        ctx.fill      ();
        ctx.restore   ();
    }
}

export class Splash extends Particle {
 
}

export class Fire extends Particle {
    constructor(player){
        super(player);
        // підключення текстуру зіткнення
        this.image     = fire;
        // параметри початкового розміщення на полотні
        this.x         = this.player.x + this.player.dogWidth  * .5;    // лівий верхній кут персонажа координата X
        this.y         = this.player.y + this.player.dogHeight * .6;    // лівий нижній кут персонажа координата Y
        // параметр випадкового розміру чатинок
        this.size      = Math.random() * 100 + 50;
        // параметри швидкості руху частинок
        this.speedX    = 2;                                               // початкова горизонтальна швидкість
        this.speedY    = .25;                                              // початкова вертикальна швидкість
        // параметри амплітудного (коливального) руху
        this.angle     = 0;
        this.va        = Math.random() * .2 - .1;  
    }
    update(){
        super.update();
        this.angle    += this.va;                                         // обновлюємо з кожним новим фреймом
        // Міняємо напрямок руху частинок горизонтальинй момент
        this.player.isFacingRight ? this.x -= this.speedX:                // зправа наліво 
                                    this.x += this.speedX;                // зліва направо 
        this.x        += Math.cos(this.angle * 5);
        // Вертикальний момент руху частинок
        this.y        -= this.speedY;                                       // при русі частинки  піднімають догори
    }
    draw(ctx) {
        ctx.save      ();
        ctx.translate (this.x, this.y);                                    // ф-ція translate переміщаємо зображення(лівий верхній кут) частинки з положення (0,0) на полотні в центр персонажа 
        ctx.rotate    (this.angle);                                        // ф-ція rotate повертає зображення за/проти годинникової стрілки в залежності від знаку (angle)
        // малюємо наша зображення
        ctx.drawImage (  this.image, 
                        -this.size * .5,                                   // зміщаємо вліво центр зображення частинки 
                        -this.size * .5,                                   // піднімаємо  центр зображення частинки 
                         this.size, 
                         this.size, 
        );
        ctx.restore   ();
    } 
}