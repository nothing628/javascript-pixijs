import * as PIXI from "pixi.js";

export default (w, h) => {
  const graphics = new PIXI.Graphics();
  const grid_size = 10;
  const x_count = Math.ceil(w / grid_size);
  const y_count = Math.ceil(h / grid_size);

  graphics.x = 0;
  graphics.y = 0;
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

  return graphics;
};
