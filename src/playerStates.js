import {
            Dust,
            Fire,
        } from './particles.js';


const typesOfPosition   = {
                            RUNNING:  0,
                            JUMPING:  1,
                            FALLING:  2,
                            SITTING:  3,
                            ROLLING:  4,
                            DIVING:   5,
                            HIT:      6,
                            };
                        
const movementBacground = { 
                            STOP:     0,
                            GO:       1,
                            NITRO:    5,
                            };   

// Створюємо клас 
class Position {
    constructor(state){ 
        this.activPosition = state;                           // присвоюємо значення super('') в залежності від підкласу;
        console.log(this.activPosition)                     
    } 
    enter(){ 
    }
    
}   

// ========================================= Блок управління з правої сторони =====================================>
// Створюємо підклас Running до класу Position 
export class Running extends Position {
    constructor(player){
        super('бігти');                                                                            // активне положення персонажа
        this.player = player;
    }
    enter(){
        this.player.frameY    = 3;
        this.player.maxframeX = 8;
    }
    handleInput(input){ 
        this.player.game.particles.unshift(new Dust(this.player));
        if      (input.includes('ArrowUp')   || input.includes('swipeUp'))      this.player.setState(typesOfPosition.JUMPING, movementBacground.GO)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes('ArrowDown') || input.includes('swipeDown'))    this.player.setState(typesOfPosition.SITTING, movementBacground.STOP)     // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes(' ')         || input.includes('swipeRolling')) this.player.setState(typesOfPosition.ROLLING, movementBacground.NITRO)   
    }
}

// Створюємо підклас Jumping до класу Position 
export class Jumping extends Position {
    constructor(player){
        super('стрибати');                                                                                          // активне положення персонажа
        this.player = player;                                                                          
    }
    enter(){
        this.player.frameY    = 1;   
        this.player.frameX    = 0;
        this.player.maxframeX = 6;
        if  ( this.player.onGround() )      this.player.speedY = -this.player.maxSpeedY;                            // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
    }
    handleInput(input){
        this.input = input;                                                                                         // присвоюємо значення const input = new InputHandler(); 
        if      ( this.player.speedY >= 0 ) this.player.setState(typesOfPosition.FALLING, movementBacground.GO) 
        else if ( input.includes(' ') )     this.player.setState(typesOfPosition.ROLLING, movementBacground.NITRO)  // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
    }
}

// Створюємо підклас Falling до класу Position 
export class Falling extends Position {
    constructor(player){
        super('падіння');                                                                           // активне положення персонажа
        this.player = player;                                                                           
    }
    enter(){
        this.player.frameY    = 2; 
        this.player.frameX    = 0;
        this.player.maxframeX = 6;
    }
    handleInput(input){
        this.input = input;                                                                         // присвоюємо значення const input = new InputHandler(); 
        if ( this.player.onGround() ) this.player.setState(typesOfPosition.RUNNING, movementBacground.GO)                     
    }
}

// Створюємо підклас Sitting до класу Position 
export class Sitting extends Position {
    constructor(player){
        super('сидіти');                                                                            // активне положення персонажа
        this.player = player;                                                                            
    }
    enter(){
        this.player.frameY    = 5;
        this.player.frameX    = 0;
        this.player.maxframeX = 4;
    }
    handleInput(input){
        if      (input.includes('ArrowRight') || 
                 input.includes('swipeRight') || 
                 input.includes('swipeLeft')  || 
                 input.includes('ArrowLeft'))                                this.player.setState(typesOfPosition.RUNNING, movementBacground.GO)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes('ArrowUp')|| input.includes('swipeUp'))      this.player.setState(typesOfPosition.JUMPING, movementBacground.GO)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes(' ')      || input.includes('swipeRolling')) this.player.setState(typesOfPosition.ROLLING, movementBacground.NITRO)   
    }  
}

// Створюємо підклас Rolling до класу Position 
export class Rolling extends Position {
    constructor(player){
        super('крутитися');                                                                            // активне положення персонажа
        this.player = player; 
        console.log(this.player)                                                                           
    }
    enter(){
        this.speedY = 0;
        this.player.frameY    = 6;
        this.player.frameX    = 0;
        this.player.maxframeX = 6;
    }
    handleInput(input){
        this.player.game.particles.unshift(new Fire(this.player));
        if      (!input.includes(' ') && !input.includes('swipeRolling') &&  this.player.onGround()) this.player.setState(typesOfPosition.RUNNING, movementBacground.GO);                       // якщо персонаж на землі і відпустил клавішу " "  ми повертаємо значення RUNNING
        if      (!input.includes(' ') && !input.includes('swipeRolling') && !this.player.onGround()) this.player.setState(typesOfPosition.FALLING, movementBacground.NITRO);                       // якщо персонаж в повітрі і відпустил клавішу " "  ми повертаємо значення FALLING
        else if ( input.includes(' ') && input.includes('ArrowUp') &&  this.player.onGround()) this.player.speedY -= this.player.maxSpeedY;
      if ( input.includes('swipeRolling') && input.includes('swipeUp') &&  this.player.onGround()) this.player.speedY -= this.player.maxSpeedY;
    
        // if (!input.includes('swipeRolling') &&  this.player.onGround())                        this.player.setState(typesOfPosition.RUNNING, movementBacground.GO);                       // якщо персонаж на землі і відпустил клавішу " "  ми повертаємо значення RUNNING

    
        //    if        ( input.includes(' ')           && 
    //                input.includes('ArrowRight')  && 
    //                input.includes('ArrowUp')     && 
    //                this.player.onGround()          ) 
    //         this.player.speedY -=  this.player.maxSpeedY,
    //         this.player.speedX  =  this.player.maxSpeedX;
    //     else if  ( input.includes(' ')           && 
    //                input.includes('ArrowUp')     && 
    //                input.includes('ArrowLeft')   && 
    //                this.player.onGround()          )
    //         this.player.speedY -=  this.player.maxSpeedY,
    //         this.player.speedX  = -this.player.maxSpeedX;
    }
}
// Створюємо підклас Diving до класу Position 
// export class Diving extends Position {
//     constructor(player){
//         super('знепретомлення');                                                                            // активне положення персонажа
//         this.player = player; 
//         console.log(this.player)                                                                           
//     }
//     enter(){
//         this.speedY = 0;
//         this.player.frameY    = 6;
//         this.player.frameX    = 0;
//         this.player.maxframeX = 6;

//     }
//     handleInput(input){
//         this.player.game.particles.unshift(new Fire(this.player));
//         if      ( !input.includes(' ') &&  this.player.onGround() )                             this.player.setState(typesOfPosition.RUNNING, movementBacground.GO);                       // якщо персонаж на землі і відпустил клавішу " "  ми повертаємо значення RUNNING
//         else if ( !input.includes(' ') && !this.player.onGround() )                             this.player.setState(typesOfPosition.FALLING, movementBacground.NITRO);                       // якщо персонаж в повітрі і відпустил клавішу " "  ми повертаємо значення FALLING
//         else if (  input.includes(' ') && input.includes('ArrowUp') && this.player.onGround())  this.player.speedY -= this.player.maxSpeedY;
//     }
// } 
