export default class keyboard {
    code = null
    isDown = false;
    isUp  =false;
    press = null;
    release = null;

    constructor(keyCode) {
        this.code = keyCode;
        
        window.addEventListener("keydown", this.downHandler, false);
        window.addEventListener("keyup", this.upHandler, false);
    }

    downHandler = evt => {
        if (evt.keyCode === this.code) {
            if (this.isUp && this.press) {
                this.press();
            }

            this.isDown = true;
            this.isUp = false;
        }

        evt.preventDefault();
    }

    upHandler = evt => {
        if (evt.keyCode === this.code) {
            if (this.isDown && this.release) {
                this.release();
            }

            this.isDown = false;
            this.isUp = true;
        }

        evt.preventDefault();
    }
}