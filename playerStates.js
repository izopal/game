import {
            Dust,
            // Splash,
            Fire,
        } from './particles.js';


const typesOfPosition   = {
                            STADING:  0,
                            RUNNING:  1,
                            JUMPING:  2,
                            FALLING:  3,
                            SITTING:  4,
                            ROLLING:  5,
                            FAINT:    6,
                            BARK:     7,
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
// Створюємо підклас Standing до класу Position 
export class Standing extends Position {
    constructor(player){
        super('стояти');                                                                            // активне положення персонажа
        this.player = player; 
    }
    enter(){
        this.player.frameY    = 0;
        this.player.frameX    = 0;
        this.player.maxframeX = 6;
    }
    handleInput(input){
        if      (input.includes('ArrowLeft')  || 
                 input.includes('swipeLeft')  ||
                 input.includes('ArrowRight') || 
                 input.includes('swipeRight'))                                   this.player.setState(typesOfPosition.RUNNING, movementBacground.GO)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes('ArrowUp')    || input.includes('swipeUp'))      this.player.setState(typesOfPosition.JUMPING, movementBacground.GO)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes('ArrowDown')  || input.includes('swipeDown'))    this.player.setState(typesOfPosition.SITTING, movementBacground.STOP)     // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes(' ')          || input.includes('swipeRolling')) this.player.setState(typesOfPosition.ROLLING, movementBacground.NITRO)   
    }
}

// Створюємо підклас Running до класу Position 
export class Running extends Position {
    constructor(player){
        super('бігти');                                                                            // активне положення персонажа
        this.player = player;
    }
    enter(){
        this.player.frameY    = 3;
        this.player.frameX    = 0;
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
    handleInput(){
        if (this.player.onGround())    this.player.setState(typesOfPosition.RUNNING, movementBacground.GO);
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
                 input.includes('ArrowLeft'))                                    this.player.setState(typesOfPosition.RUNNING, movementBacground.GO)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes('ArrowUp')    || input.includes('swipeUp'))      this.player.setState(typesOfPosition.JUMPING, movementBacground.GO)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
        else if (input.includes(' ')          || input.includes('swipeRolling')) this.player.setState(typesOfPosition.ROLLING, movementBacground.NITRO)   
    }  
}

// Створюємо підклас Rolling до класу Position 
export class Rolling extends Position {
    constructor(player){
        super('крутитися');                                                                            // активне положення персонажа
        this.player = player; 
    }
    enter(){
        // this.speedY = 0;
        this.player.frameY    = 6;
        this.player.frameX    = 0;
        this.player.maxframeX = 6;
    }
    handleInput(input){
        this.player.game.particles.unshift(new Fire(this.player)); 
        if      (!input.includes(' ') && !input.includes('swipeRolling') &&  this.player.onGround())      this.player.setState(typesOfPosition.RUNNING, movementBacground.GO);                       // якщо персонаж на землі і відпустил клавішу " "  ми повертаємо значення RUNNING
        else if (!input.includes(' ') && !input.includes('swipeRolling') && !this.player.onGround())      this.player.setState(typesOfPosition.FALLING, movementBacground.NITRO);                       // якщо персонаж в повітрі і відпустил клавішу " "  ми повертаємо значення FALLING
        else if ( input.includes(' ') &&  input.includes('ArrowUp')      &&  this.player.onGround())      this.player.speedY -= this.player.maxSpeedY;
        if      ( input.includes('swipeRolling') && 
                  input.includes('swipeUp')      &&  
                  this.player.onGround())                                                                 this.player.speedY -= this.player.maxSpeedY;
    }
}

// Створюємо підклас Faint до класу Position 
export class Faint extends Position {
    constructor(player){
        super('знепритомніти');                                                                            // активне положення персонажа
        this.player = player; 
    }
    enter(){
        // this.player.speedX    = 0;
        this.player.frameY    = 4;
        this.player.frameX    = 0;
        this.player.maxframeX = 10;
    }
    handleInput(){
       if      (this.player.frameX >= 10 &&  this.player.onGround()) this.player.setState(typesOfPosition.STADING, movementBacground.STOP)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
       else if (this.player.frameX >= 10 && !this.player.onGround()) this.player.setState(typesOfPosition.FAINT,   movementBacground.STOP)       // ф-ція includes якщо значення відповідає вказаному в дужках повертає true в іншому випадку false 
    }
}

