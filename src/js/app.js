import * as PIXI from 'pixi.js'
import bunny from '../static/bunny.png'

if (module.hot) {
  module.hot.accept();
}

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

app.stage.interactive = true;

const graphics = new PIXI.Graphics();
let count = 0;

graphics.x = app.renderer.width / 2;
graphics.y = app.renderer.height / 2;

app.stage.addChild(graphics);
app.ticker.add(() => {
  count += 0.1;

  graphics.clear();
  graphics.lineStyle(1, 0xffff00, 1);
  // graphics.beginFill(0xffff00, 0.5);

  graphics.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
  graphics.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
  graphics.closePath();
  
  graphics.moveTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
  graphics.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
  graphics.closePath();

  graphics.rotation = count * 0.1;
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader.add('bunny', bunny).load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new PIXI.Sprite(resources.bunny.texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);

    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });
});
