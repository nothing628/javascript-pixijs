import { GameGrid } from "./grid";
import * as PIXI from "pixi.js";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();
const game = new GameGrid(app.renderer.width, app.renderer.height);

app.stage.interactive = true;
app.stage.addChild(game.sprite);
app.ticker.maxFPS = 10;
app.ticker.add((delta) => {
  game.tick(delta);
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);
