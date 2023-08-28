export default class DrawStatusText {
    constructor (game) {
        this.game       = game;
        // параметри типу, розміру і кольору тексту
        this.fontFamily = 'Helvetica';
        this.fontSize   =  30; 
        this.fontColor  = 'black';
        this.fontColor2 = 'white';
        // параметри типу і розміщення повідомлення 
        this.text       = 'Рахунок: ';                             // тип повідомлення
        this.textX      = 20;                                      // відступ з лівої сторони екрана
        this.textY      = 50;                                      // відступ з верху екрана
        this.textXY     = 2;                                       // зміщення             
    }
    draw(ctx) {
        ctx.font       = this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign  = 'left'                                                                                 // встановлюємо розміщення тексту з лівої сторони                 
        ctx.fillStyle  = this.fontColor                                                                         // встановлюємо колір тексту
        ctx.fillText(this.text + this.game.score, this.textX, this.textY)                                       // створюємо ефект тіні змініщуючи текст на параметр this.textXY
        ctx.fillStyle  = this.fontColor2                                                                        // встановлюємо колір тексту
        ctx.fillText(this.text + this.game.score, this.textX + this.textXY, this.textY + this.textXY)           // встановлюємо текст рахунку
    }
}