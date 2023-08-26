class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game          = game;
        // підключення зображення заднього фону 
        this.image         = image;
        // параметри початквого розміру зображення заднього фону 
        this.width         = width;
        this.height        = height;
        // параметри початкового розміщення на полотні
        this.x             = 0;
        this.y             = 0;
        // 
        this.speedModifier = speedModifier;
    }   
 
    upadate(){
        // змінюємо напрямок руху заднього фону взалежності від напрямку руху персонажа
        if (this.game.player.isFacingRight){
            if      (this.x < -this.width )  this.x  = 0;
            else                             this.x -= this.game.speed * this.speedModifier; 
        }
        else {
            if      (this.x > this.width )   this.x  = 0;
            else                             this.x += this.game.speed * this.speedModifier;
        }
    }
 
    draw(ctx){
        ctx.drawImage( this.image, this.x - this.width * 2, this.y, this.width, this.height );
        ctx.drawImage( this.image, this.x - this.width,     this.y, this.width, this.height );
        ctx.drawImage( this.image, this.x,                  this.y, this.width, this.height );
        ctx.drawImage( this.image, this.x + this.width,     this.y, this.width, this.height );
        console.log(this.game.speed )
    }
}


export class Background { 
    constructor(game){
        this.game               = game;
        // параметри початквого розміру зображення для заднього фону
        this.layerWidth         = 1667;
        this.layerHeight        = 500;
        // підключаємо задній фон вигляд - ЛІС
        this.Image1             = forestLayer1;
        this.Image2             = forestLayer2;
        this.Image3             = forestLayer3;
        this.Image4             = forestLayer4;
        this.Image5             = forestLayer5;
        // підключаємо задній фон вигляд - МІСТО
        // this.Image1       = cityLayer1;
        // this.Image2       = cityLayer2;
        // this.Image3       = cityLayer3;
        // this.Image4       = cityLayer4;
        // this.Image5       = cityLayer5;
        // підключаємо class Layer з його параметрами  і функціями
        this.layer1             = new Layer ( this.game, this.layerWidth, this.layerHeight,  0, this.Image1);
        this.layer2             = new Layer ( this.game, this.layerWidth, this.layerHeight, .2, this.Image2);
        this.layer3             = new Layer ( this.game, this.layerWidth, this.layerHeight, .6, this.Image3);
        this.layer4             = new Layer ( this.game, this.layerWidth, this.layerHeight, .8, this.Image4);
        this.layer5             = new Layer ( this.game, this.layerWidth, this.layerHeight,  1, this.Image5);
        // поміщаємо шари заднього фону до обєкту this.backgroundLayers
        this.backgroundLayers   = [ this.layer1, 
                                    this.layer2, 
                                    this.layer3, 
                                    this.layer4, 
                                    this.layer5
                                ];
    }  
    
    update(){
        // знаходимо в нашому масиві шар  і запускаємо функцію upadate() даного шару
        this.backgroundLayers.forEach(layer => {
            layer.upadate();
        }) 
    }

    draw(ctx){
        // знаходимо в нашому масиві шар  і запускаємо функцію draw(ctx) даного шару
        this.backgroundLayers.forEach(layer => {
            layer.draw(ctx);
        }) 
    }
}

 