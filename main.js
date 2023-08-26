import Player           from "./player.js";
import InputHandler     from "./input.js";
import { Background  }  from "./background.js";
import { FlyingEnemy,
         GroundEnemy,
         ClimbingEnemy,
        }               from "./enemy.js";
import DrawStatusText   from "./drawText.js";


window.addEventListener('load', function(){

    const ctx = canvasVS.getContext('2d', { willReadFrequently: true });
    
    canvasVS.width = window.screen.width;
    canvasVS.height = 500; //window.screen.height;
    

    class Game {
        constructor(width, height){
            //    
            this.width             = width;
            this.height            = height;
            this.scale             = .75;
            this.groundMargin      = 80;
            this.speed             = 0;                      // параметр швидкості руху заднього фону
            this.maxSpeed          = 10;                     // параметр швидкості руху заднього фону
            // інсталюємо  всі підкласи класу Enemy в масив
            this.enemies           = [];
            // інсталюємо  всі частинки в масив
            this.particles         = [];
            this.maxParticles      = 50;                     // регулюємо мкількість елементів в масиві this.particles 
            // створюємо масив для регулювання випадкової появи NPS
            this.enemyTypes        = ['spider', 'plant'];
            // параметри частоти появи NPS
            this.enemyTimer        = 0;
            this.enemyInterval     = 1000;
            // параметр переключення на конструктор  зіткнень (а саме промальовка області зіткнень)
            this.debug             = true;
            // параметр лічильнику кількості знищених NPS
            this.score             = 0;
            // інсталюємо імпортовані класи
            this.player            = new Player(this); 
            this.background        = new Background(this);
            this.input             = new InputHandler(this);
            this.statusText        = new DrawStatusText(this);
        }

        update(deltaTime){  
            this.player.update(this.input.keys, deltaTime);
            this.background.update();
            
            // умова частоти появи NPS
            if (this.enemyTimer > this.enemyInterval && this.player.isFacingRight) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime
            };

            // перевіряємо на наявність елементів в масиві this.enemies = [] на наявність запускаємо елементів ф-ції update і  робимо перевірку чи є в даному масиві елемент позначений на видалення
            this.enemies.forEach( (enemy) =>{
                 enemy.update(deltaTime);
                 if (enemy.markedForDelet) this.enemies.splice(this.enemies.indexOf(enemy), 1);   // видаляємо повнісю елемент з масиву якщо виконується умова  markedForDelet = true;
            })
            // console.log(this.enemies)  

            // 
            this.particles.forEach( (particle, index) => { 
                 particle.update(deltaTime);
                if (particle.markedForDelet) this.particles.splice(index, 1);
            })
            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles);
            }
        } 

        draw(ctx){
            this.background.draw(ctx);
            this.particles.forEach( particle => particle.draw(ctx) );
            this.player.draw(ctx); 
            this.enemies.forEach( enemy => enemy.draw(ctx) );
            this.statusText.draw(ctx);
        }

        // функція появи NPS на полотні (коил персонаж не рухається NPS не додаються)
        addEnemy(){
        if(this.player.movementBacground === 1){
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];    // параметри випадкової генерації числа від 0 до довжини масива this.enemyTypes[]
            // додаємо наших NPS в масив this.enemies яку створили вище
            if      (randomEnemy == 'spider' ) this.enemies.push(new GroundEnemy   (this));
            else if (randomEnemy == 'plant')   this.enemies.push(new ClimbingEnemy (this));
        }   
        this.enemies.push(new FlyingEnemy(this));                                                       // додаємо всі згнеровані enemy_fly
        // console.log(this.enemies);
        }
    }
   
    const game = new Game(canvasVS.width, canvasVS.height);
    console.log(game)

    let lastTime = 0;
    function animate(timeStamp){ 
        const deltaTime = timeStamp - lastTime;                // визначаємо параметр як часто обновлюється програма в мс буде залежити від потужності компютера
        lastTime = timeStamp;
        // console.log(deltaTime)
       
        ctx.clearRect(0, 0, canvasVS.width, canvasVS.height);
        
        game.update(deltaTime);
        game.draw(ctx);
        
        requestAnimationFrame(animate);
    }
    animate(0);
});