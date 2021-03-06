import "pixi.js"
import { SimpleFood } from "./Food/SimpleFood"
import { Microbe } from "./Organism/Microbe";
import { Scene } from "./Scene";

const WIDTH = 800;
const HEIGHT = 600;

var app = new PIXI.Application(
    WIDTH,
    HEIGHT,
    { backgroundColor: 0x1099bb, resolution: 1 }
);
document.body.appendChild(app.view);

var scene = new Scene( app.stage, WIDTH, HEIGHT );
var microbe = Microbe.Create( app.stage, WIDTH/2, HEIGHT/2, scene );
scene.addOrganism( microbe );

app.ticker.add(function(delta) {
    // rotate the container!
    // use delta to create frame-independent tranform
    //container.rotation -= 0.01 * delta;
    scene.render(delta);
});

setInterval(
    () => {
        var x = Math.random() * WIDTH;
        var y = Math.random() * HEIGHT;
        SimpleFood.Create( app.stage, x, y, scene );
    },
    1000
);