import * as PIXI from "pixi.js";
import Blocks, { IBlockLocation, BlockLocation } from "./blocks";
import Keyboard from "./keyboard";

const grid_size = 10;

enum SwitchArrow {
  Left,
  Right,
}

export class GameGrid {
  private blocks: IBlockLocation[] = [];
  private keyboard: Keyboard = null;
  private active_block_id: string = "power";
  private pointer_x: number;
  private pointer_y: number;
  sprite: PIXI.Sprite = null;
  graphics: PIXI.Graphics = null;
  width: number = 600;
  height: number = 400;

  constructor(width: number, height: number) {
    this.blocks = [];
    this.graphics = new PIXI.Graphics();
    this.graphics.x = 0;
    this.graphics.y = 0;
    this.width = width;
    this.height = height;
    this.keyboard = new Keyboard();
    this.keyboard.press = this.onKeydown.bind(this);
    this.generateSprite();
  }

  private generateSprite() {
    const sprite = new PIXI.Sprite();

    sprite.width = this.width;
    sprite.height = this.height;
    sprite.scale.set(1);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.addListener("pointermove", (evt) => {
      const position = evt.data.global;

      this.pointer_x = position.x;
      this.pointer_y = position.y;
    });
    sprite.addListener("pointerdown", (evt) => {
      const position = evt.data.global;

      this.addBlock(this.active_block_id, position.x, position.y);
    });
    sprite.addChild(this.graphics);

    this.sprite = sprite;
  }

  private switchActiveBlock(arrow: SwitchArrow) {
    const blockIds = Object.keys(Blocks);
    let blockIdx = blockIds.findIndex((p) => p === this.active_block_id);

    if (arrow === SwitchArrow.Left) blockIdx--;
    if (arrow === SwitchArrow.Right) blockIdx++;

    if (blockIdx < 0) blockIdx = blockIds.length - 1;
    if (blockIdx >= blockIds.length) blockIdx = 0;

    this.active_block_id = blockIds[blockIdx];
  }

  private onKeydown(evt: KeyboardEvent) {
    switch (evt.keyCode) {
      case 69: // E button
        this.switchActiveBlock(SwitchArrow.Right);
        break;
      case 81: // Q button
        this.switchActiveBlock(SwitchArrow.Left);
        break;
      default:
        console.log(evt, this);
    }
  }

  private updateBlock(): void {
    this.blocks.forEach((item) => {
      item.block.onUpdate();
    });
  }

  public redraw(): void {
    this.redraw_grid();
    this.redraw_block();
    this.highlight_grid(this.pointer_x, this.pointer_y);
  }

  public tick(delta) {
    const fps = 60 / delta;

    this.updateBlock();
    this.redraw();
    // console.log(fps);
  }

  private redraw_grid() {
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

  private redraw_block() {
    this.blocks.forEach((item: IBlockLocation) => {
      this.graphics.beginFill(item.block.getRenderColor(), 0.9);
      this.graphics.drawRect(item.x, item.y, grid_size, grid_size);
      this.graphics.endFill();
    });
  }

  private highlight_grid(real_x, real_y) {
    const x = Math.floor(real_x / grid_size) * grid_size;
    const y = Math.floor(real_y / grid_size) * grid_size;

    this.graphics.beginFill(0xff0000, 0.4);
    this.graphics.drawRect(x, y, grid_size, grid_size);
    this.graphics.endFill();
  }

  private addBlock(blockId, real_x, real_y) {
    const x = Math.floor(real_x / grid_size) * grid_size;
    const y = Math.floor(real_y / grid_size) * grid_size;
    const is_exists = this.isBlockExists(x, y);
    const block_class = Blocks[blockId];
    const block = new block_class();

    if (is_exists) return; // Avoid rendundant

    this.blocks.push(new BlockLocation(block, x, y));
  }

  private isBlockExists(x, y) {
    const result = this.blocks.filter((item) => {
      return item.x === x && item.y === y;
    });

    return result.length > 0;
  }
}
export default (w: number, h: number) => {
  const gameGrid = new GameGrid(w, h);

  return gameGrid.sprite;
};
