import * as PIXI from "pixi.js";
import blocks from "./blocks";
import keyboard from './keyboard';

const grid_size = 10;

class GameGrid {
  #blocks = [];
  #keyboard = null;
  graphics = null;
  width = 600;
  height = 400;

  constructor(width, height) {
    this.#blocks = [];
    this.graphics = new PIXI.Graphics();
    this.graphics.x = 0;
    this.graphics.y = 0;
    this.width = width;
    this.height = height;
    this.keyboard = new keyboard(37);
    this.keyboard.press = () => {
      console.log("Left pressed");
    }
    this.redraw();
  }

  redraw() {
    this.redraw_grid();
    this.redraw_block();
  }

  redraw_grid() {
    const x_count = Math.ceil(this.width / grid_size);
    const y_count = Math.ceil(this.height / grid_size);

    this.graphics.clear();
    this.graphics.lineStyle(1, 0x5f5f5f, 0.5);

    // Draw horizontal line
    for (let i = 1; i <= y_count; i++) {
      this.graphics.moveTo(0, i * grid_size);
      this.graphics.lineTo(this.width, i * grid_size);
      this.graphics.closePath();
    }

    // Draw vertical line
    for (let i = 1; i <= x_count; i++) {
      this.graphics.moveTo(i * grid_size, 0);
      this.graphics.lineTo(i * grid_size, this.height);
      this.graphics.closePath();
    }
  }

  redraw_block() {
    this.#blocks.forEach((item) => {
      const block = blocks[item.blockId];

      this.graphics.beginFill(block.color, 0.9);
      this.graphics.drawRect(item.x, item.y, grid_size, grid_size);
      this.graphics.endFill();
    });
  }

  highlight_grid(real_x, real_y) {
    const x = Math.floor(real_x / grid_size) * grid_size;
    const y = Math.floor(real_y / grid_size) * grid_size;

    this.graphics.beginFill(0xff0000, 0.4);
    this.graphics.drawRect(x, y, grid_size, grid_size);
    this.graphics.endFill();
  }

  addBlock(blockId, real_x, real_y) {
    const x = Math.floor(real_x / grid_size) * grid_size;
    const y = Math.floor(real_y / grid_size) * grid_size;
    const is_exists = this.isBlockExists(x,y);

    if (is_exists) return;  // Avoid rendundant

    this.#blocks.push({
      blockId,
      x,
      y,
    });
  }

  isBlockExists(x, y) {
    const result = this.#blocks.filter(item => {
      return item.x === x && item.y === y
    })

    return result.length > 0;
  }
}

export default (w, h) => {
  const gameGrid = new GameGrid(w, h);
  const sprite = new PIXI.Sprite();

  sprite.width = w;
  sprite.height = h;
  sprite.scale.set(1);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.addListener("pointermove", (evt) => {
    const position = evt.data.global;

    gameGrid.redraw();
    gameGrid.highlight_grid(position.x, position.y);
  });
  sprite.addListener("pointerdown", (evt) => {
    const position = evt.data.global;

    gameGrid.addBlock("copper", position.x, position.y);
  });
  sprite.addChild(gameGrid.graphics);

  return sprite;
};