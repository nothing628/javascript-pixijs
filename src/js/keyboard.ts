export default class keyboard {
    code: number = null
    isDown: boolean = false;
    isUp: boolean = false;
    press = null;
    release = null;

    constructor(keyCode: number) {
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