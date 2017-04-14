import "pixi.js"
import { SimpleFood } from "./Food/SimpleFood"
import { Microbe } from "./Organism/Microbe";
const WIDTH = 800;
const HEIGHT = 600;

var app = new PIXI.Application(
    WIDTH,
    HEIGHT,
    { backgroundColor: 0x1099bb, resolution: 1 }
);
document.body.appendChild(app.view);

var microbe = Microbe.Create( app.stage, 0, 0, WIDTH, HEIGHT );

app.ticker.add(function(delta) {
    // rotate the container!
    // use delta to create frame-independent tranform
    //container.rotation -= 0.01 * delta;
    microbe.move(delta);
});

setInterval(
    () => {
        /*var x = Math.random() * WIDTH;
        var y = Math.random() * HEIGHT;
        SimpleFood.Create( app.stage, x, y );*/
    },
    1000
);