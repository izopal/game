export default class InputHandler {
    constructor(game) {
        this.keys          = [];
        this.touchY        = '';
        this.touchX        = '';
        this.touchTresholdX = 150; // відстань на яку треба свайпнути щоб виконувалися умови вліво-вправо
        this.touchTresholdY = 50;  // відстань на яку треба свайпнути щоб виконувалися умови вгору-вниз
        this.game = game;
// ==========================Логіка керування за допомогою клавіатури=============================>
        // Додаємо до маиву this.keys інформацію яку натисненули клавішу (keydown' - натискання клавіші)
        window.addEventListener('keydown', (e) => {
            if      ((e.key === 'ArrowDown'  ||
                      e.key === 'ArrowUp'    ||
                      e.key === 'ArrowLeft'  ||
                      e.key === 'ArrowRight' ||
                      e.key === ' ')         && 
                     this.keys.indexOf(e.key) === -1)             // якщо елемент відсутній в масиві (елмент в масиві котрий відсутній позначається -1)
                this.keys.push(e.key);                                // додаємо до масиву
            else if ( e.key === 'D' || 
                      e.key === 'd' ||
                      e.key === 'В' ||
                      e.key === 'в')    
                this.game.debug = !this.game.debug
        });
        // Видаляємо з обєкту this.keys інформацію про натиснену клавішу ('keyup' - відпускання клавіші)
        window.addEventListener('keyup', (e) => {
            if (    e.key === 'ArrowDown'  ||
                    e.key === 'ArrowUp'    ||
                    e.key === 'ArrowLeft'  ||
                    e.key === 'ArrowRight' ||
                    e.key === ' ')
                this.keys.splice(this.keys.indexOf(e.key), 1);    //умова видалення елементу з масиву this.keys. (отримуємо індекс натиснутої клавіші в масиві this.keys і видалаємо тільки 1 елемент)
        });
    
    // ==========================Логіка керування за допомогою тачпада=============================>
        //  блок наведення пальця на екран
        window.addEventListener('touchstart', (e) => {
            this.touchX = e.changedTouches[0].pageX;                                   // витягуємо значення X 
            this.touchY = e.changedTouches[0].pageY - e.changedTouches[0].radiusY * 2;                                   // витягуємо значення Y 
            if      ( this.touchY > this.game.height - this.game.groundMargin  && this.keys.indexOf('swipeDown') === -1)  this.keys.push('swipeDown');   // перевіряємо, чи проведено пальцем  вправо (swipeRight) на відстань, яка більша за this.touchTreshold (тобто фактично визначається рух вправо). 
            else if ( this.touchX > this.game.player.x + this.game.player.dogWidth * .5 && this.keys.indexOf('swipeRight') === -1) this.keys.push('swipeRight'); // перевіряємо, чи проведено пальцем  вправо (swipeRight) на відстань, яка більша за this.touchTreshold (тобто фактично визначається рух вправо). 
            else if ( this.touchX < this.game.player.x + this.game.player.dogWidth * .5 && this.keys.indexOf('swipeLeft') === -1)  this.keys.push('swipeLeft');   // перевіряємо, чи проведено пальцем  вправо (swipeRight) на відстань, яка більша за this.touchTreshold (тобто фактично визначається рух вправо). 
        //   console.log(e.changedTouches[0]);
        });

        //  блок руху пальця на екрані.
        //  блок керування пальцем по горизонталі 
        window.addEventListener('touchmove', (e) => {
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;             // параметр визначення на яку відстань змістився палець по горизонталі
            if      (swipeDistanceX >  this.touchTresholdX && this.keys.indexOf('swipeRolling') === -1) this.keys.push('swipeRolling'); // перевіряємо, чи проведено пальцем  вправо (swipeRight) на відстань, яка більша за this.touchTreshold (тобто фактично визначається рух вправо). 
            else if (swipeDistanceX < -this.touchTresholdX && this.keys.indexOf('swipeRolling') === -1) this.keys.push('swipeRolling');  // перевіряємо, чи проведено пальцем  вліво (swipeLeft) на відстань, яка менше за -this.touchTreshold (тобто фактично визначається рух вліво)
        }); 
        // //  блок керуванням пальцем по вертикалі 
        window.addEventListener('touchmove', (e) => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            if      (swipeDistanceY < -this.touchTresholdY && this.keys.indexOf('swipeUp')   === -1) this.keys.push('swipeUp');
            // else if (swipeDistanceY >  this.touchTresholdY && this.keys.indexOf('swipeDown') === -1) this.keys.push('swipeDown');
        }); 
        //  блок відведення пальця від екрану
        window.addEventListener('touchend', () => {
            // console.log(this.keys);
            this.keys.splice(this.keys.indexOf('swipeRight'), 1);
            this.keys.splice(this.keys.indexOf('swipeLeft'), 1);
            this.keys.splice(this.keys.indexOf('swipeDown'), 1);
            this.keys.splice(this.keys.indexOf('swipeRolling'), 1);
            this.keys.splice(this.keys.indexOf('swipeUp'), 1);
            // console.log(this.keys);
        }); 
    }
}