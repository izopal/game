import { 
            Running, 
            Jumping,
            Falling,
            Sitting,
            Rolling,
        } from './playerStates.js';

export default class Player {
    constructor(game){
        this.game              = game;
        // підключення зображення персонажа
        this.image             = dogImage;
        // параметр всіx положень персонажа
        this.states            = [ 
                                    new Running (this),  
                                    new Jumping (this),
                                    new Falling (this),
                                    new Sitting (this),
                                    new Rolling (this),
                                ]; 
        // параметри початкового положеня персонажа                          
        this.currrenState      = this.states[3]; 
        this.currrenState.enter();                       // викликаємо ф-цію enter() початкови кадр

        // параметри початквого розміру кадру (frame) зображення для персонажа
        this.width             = 100; 
        this.height            = 91.3;
        // параметри кінцевого розміру кадру (frame) зображення для персонажа
        this.sizeX             = 1;
        this.sizeY             = 1;
        this.dogWidth          = this.width * this.sizeX;
        this.dogHeight         = this.height * this.sizeY;
        // параметри початкового розміщення на полотні
        this.x                 = 300;
        this.y                 = this.game.height - this.dogHeight - this.game.groundMargin;
        // параметри для зміни кадрів забраження персонажа
        this.frameX            = 0;
        this.maxframeX         = 5;
        this.frameY            = 0;  
        // параметри швидкості відображення кадрів
        this.fps = 100;
        this.frameInterval     = 1000/this.fps;
        this.frameTimer        = 0;
        // параметри швидкості руху персонажа
        this.speedX            = 0;                                   // початкова горизонтальна швидкість
        this.maxSpeedX         = 10   * this.game.scale;              // максимальна горизонтальна швидкість
        this.speedY            = 0;                                   // початкова вертикальна швидкість
        this.maxSpeedY         = 30   * this.game.scale;              // максимальна вертикальна висота на яку пригає персонаж
        this.weight            = 1.5  * this.game.scale;              // сила тяжіння/вага персонажа
        // параметри відзеркалення персонажа
        this.isFacingRight     = true; 

    };
    
    
    update(input, deltaTime){
        this.checkCollision()
        this.currrenState.handleInput(input);                          //обновлюємо положення персонажа в заледності від обрали клавіші

        // горизонтальна швидкість
        this.x += this.speedX; 
        if      (input.includes('ArrowRight') || input.includes('swipeRight')) { this.isFacingRight =  true; 
                                                                                 this.speedX        =  this.maxSpeedX;            // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        }
        else if (input.includes('ArrowLeft')  || input.includes('swipeLeft'))  { this.isFacingRight =  false; 
                                                                                 this.speedX        = -this.maxSpeedX;
        }                                                       
        else                                                                     this.speedX       = 0; 
        //  умова не виходу персонажа за межі горизонтальної площини екрану
        if      (this.x < 0)                                 this.x = 0;                                      // умова щоб персонаж не виходив за межі лівої сторони екрану
        else if (this.x > this.game.width - this.dogWidth)   this.x = this.game.width - this.dogWidth;        // умова щоб персонаж не виходив за межі правої сторони екрану
       

        // вертикальна швидкість  
        this.y += this.speedY;                                                                                // оновлюємо положення персонажа зарахунок додавання до початкової координвти Y парамету швидкості який змінюються при натисканні клавіш вгору/вниз в state.js
        if      (!this.onGround())                         this.speedY += this.weight;                                                 // якщо персонаж не на землі (в повіртрі) швидкість руху персонажа буде направлена до низу і залежитиме від параметру this.weight                 
        else                                                 this.speedY = 0;                                                            // в іншому випадку (якщо персонаж на землі) швидкість руху 0                               
        //  умова не виходу персонажа за межі вертикальної площини екрану                                                    
        if      (this.y < 0)                               { this.y = 0;                                      // умова перевірки щоб персонаж не виходив за верх екрану
                                                             this.speedY = this.weight; }
        else if (this.y > this.gameHeight - this.dogHeight)  this.y = this.gameHeight - this.dogHeight;        // умова перевірки щоб персонаж не виходив за низ екрану
        
        // відображення кадрів персонажа
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxframeX) this.frameX ++;
            else                              this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    };

    draw(ctx){
        //умова показу (малює) перснонажа на полотні в залежності від параметрів
        if (this.isFacingRight) {
            this.debugDraw(ctx);
            ctx.drawImage ( this.image, 
                            // параметри кадру, який обераємо
                            this.frameX * this.width, 
                            this.frameY * this.height, 
                            this.width, 
                            this.height, 
                            // параметри кадру, де буде розміщений і які розміри буде мати
                            this.x,                                                                // відображаємо зображення в оригінальному вигляді                             
                            this.y, 
                            this.dogWidth, 
                            this.dogHeight 
                );
        } else {
            this.debugDraw(ctx);
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage (
                            this.image, 
                            // параметри кадру, який обераємо
                            this.frameX * this.width, 
                            this.frameY * this.height, 
                            this.width, 
                            this.height,
                            // параметри кадру, де буде розміщений і які розміри буде мати
                            -this.x - this.dogWidth,          // відображаємо зображення в дезркальному вигляді по осі X
                            this.y, 
                            this.dogWidth, 
                            this.dogHeight,
            );
            ctx.restore();
        }
    };

    // фyнкція перевірки стану персонажа, якщо переснож на землі присвоюює значення true, якщо персонаж в повітрі - false.
    onGround(){ 
        return this.y > this.game.height - this.game.groundMargin - this.dogHeight ;
    };
    
    // Функція для зміни положення персонажа (отримуємо нове значення підкласу в залежності від typesOfPosition і викликаємо новий підклас за допомогою this.currrenState.enter())
    setState(typesOfPosition, movementBacground){
    
        this.currrenState      = this.states[typesOfPosition];     // отримуємо положення персонажа this.states в залежності від значення яке приходить з typesOfPosition
        this.movementBacground = movementBacground;
        this.game.speed        = this.game.maxSpeed * this.movementBacground;
        this.currrenState.enter();                                 // виклаємо ф-цію enter() взалежності від положення this.states[]
        // console.log( th is.currrenState);                             
    };
    
    

    checkCollision(){
        // Параметри регулювання зони персонажа
        this.ArcRight   = this.dogWidth * .5,  // кофіцієнт розміщення з правої сторони по відношеню до квадрату
        this.ArcX       = 5;                   // коефіцієнт зміщення кола по осі X (регулювання положання на квадраті)
        this.drawCircle = true                 // параметр малювання кола чи ні
        this.ArcY       = 5;                   // параметр зміщення кола по осі Y (регулювання положання на квадраті)
        this.RectX      = .5;                  // кофіцієнт регулювання ширини квадрата     
        this.RectY      = .5;                  // кофіцієнт регулювання висоти квадрата      
        
        this.isFacingRight                               ?  this.ArcRight = this.ArcRight - this.ArcX  : 
                                                            this.ArcRight = 0 + this.ArcX ; 
        this.currrenState.activPosition ===  'сидіти'    ?  this.RectY = .65 :  
                                                            this.RectY; 
        this.currrenState.activPosition ===  'крутитися' ?  ( this.RectY = .4, this.drawCircle = false) : 
                                                            ( this.RectY,      this.drawCircle = true);
        
        this.x1 = this.x  + this.dogWidth  * .25;                          // лівий верхній кут персонажа координата X
        this.y1 = this.y  + this.dogHeight * this.RectY;  // лівий верхній кут персонажа координата Y
        this.x2 = this.x1 + this.dogWidth  * this.RectX                    // правий верхній кут персонажа координата X
        this.y2 = this.y1 + this.dogHeight * (1 - this.RectY);                   // лівий нижній кут персонажа координата Y

        this.game.enemies.forEach(enemy => {
            // умова зіткнення (а саме все що виконується даною умовою, зіткнення не відбулося в ішому випадку зікнення авдбулося)
            if ( enemy.x + enemy.width  > this.x1  && 
                 enemy.x                < this.x2  && 
                 enemy.y + enemy.height > this.y1  &&
                 enemy.y                < this.y2 
            ){
                 enemy.markedForDelet = true;                               // позначаємо маркером на видалення
                 this.game.score ++;                                        // збільшуємо лічильник на 1 якщо умова не відбулася 
                }else{

            }
        });
    }
    debugDraw(ctx){
        if(!this.game.debug) {
            // малюємо квадрат
            ctx.strokeStyle = 'blue';
            ctx.strokeRect (
                            this.x,  
                            this.y, 
                            this.dogWidth, 
                            this.dogHeight, 
                            ); 
            ;
            // малюємо квадрат
            ctx.strokeStyle = 'red';
            ctx.strokeRect (
                            this.x1,  
                            this.y1, 
                            this.dogWidth  * this.RectX, 
                            this.dogHeight * (1 - this.RectY), 
                            ); 
                            
            // малюємо коло
            if (this.drawCircle){
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.arc        (        
                                this.x1 + this.ArcRight, 
                                this.y1 - this.ArcY,
                                this.dogWidth * .2, 
                                0,
                                Math.PI * 2
                                ); 
                ctx.stroke();    
            }
        } 
    };
}
