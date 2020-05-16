export default class Keyboard {
  isDown: boolean = false;
  isUp: boolean = true;
  press: (evt: KeyboardEvent) => any = null;
  release: (evt: KeyboardEvent) => any = null;

  constructor() {
    window.addEventListener("keydown", this.downHandler, false);
    window.addEventListener("keyup", this.upHandler, false);
  }

  downHandler = (evt: KeyboardEvent) => {
    evt.preventDefault();

    if (this.isUp && this.press) {
      this.press(evt);
    }

    this.isDown = true;
    this.isUp = false;
  };

  upHandler = (evt: KeyboardEvent) => {
    evt.preventDefault();

    if (this.isDown && this.release) {
      this.release(evt);
    }

    this.isDown = false;
    this.isUp = true;
  };
}
