import * as PIXI from "pixi.js";

const redraw_grid = (graphics, w, h) => {
  const grid_size = 10;
  const x_count = Math.ceil(w / grid_size);
  const y_count = Math.ceil(h / grid_size);

  graphics.clear();
  graphics.lineStyle(1, 0x5f5f5f, 0.5);

  // Draw horizontal line
  for (let i = 1; i <= y_count; i++) {
    graphics.moveTo(0, i * grid_size);
    graphics.lineTo(w, i * grid_size);
    graphics.closePath();
  }

  // Draw vertical line
  for (let i = 1; i <= x_count; i++) {
    graphics.moveTo(i * grid_size, 0);
    graphics.lineTo(i * grid_size, h);
    graphics.closePath();
  }
};

const highlight_grid = (graphics, real_x, real_y) => {
  const grid_size = 10;
  const x = Math.floor(real_x / grid_size) * grid_size;
  const y = Math.floor(real_y / grid_size) * grid_size;

  graphics.beginFill(0xff0000, 0.4);
  graphics.drawRect(x, y, grid_size, grid_size);
  graphics.endFill();
}

export default (w, h) => {
  const sprite = new PIXI.Sprite();
  const graphics = new PIXI.Graphics();

  graphics.x = 0;
  graphics.y = 0;
  
  redraw_grid(graphics, w, h);

  sprite.width = w;
  sprite.height = h;
  sprite.scale.set(1);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.addListener("pointermove", (evt) => {
    const position = evt.data.global;

    redraw_grid(graphics, w, h);
    highlight_grid(graphics, position.x, position.y);
  });
  sprite.addChild(graphics);

  return sprite;
};
