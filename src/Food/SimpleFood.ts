import {IFood} from "./IFood";
import {Scene} from "../Scene";
import "pixi.js";

export class SimpleFood implements IFood {

    private static MAX_ENERGY = 500;
    private _energy: number;
    private _food: PIXI.Graphics;
    private _radius: number = 0;

    public static Create(container: PIXI.Container, x: number, y: number, scene: Scene) {
        new SimpleFood( container, x, y, scene );
    }

    constructor(private _container: PIXI.Container, private _x: number, private _y: number, private _scene: Scene){
        this._energy = Math.max(Math.floor( Math.random()*SimpleFood.MAX_ENERGY), 1);
        this._radius = 2 + Math.log(this._energy);

        //Render food
        this._food = new PIXI.Graphics();
        this._food.lineStyle(2, 0x35e082);
        this._food.beginFill(0x00FF00);
        this._food.drawCircle(this._x, this._y, this._radius);
        this._food.endFill();
        this._container.addChild( this._food );
        this._scene.addFood(this);
    }

    consume(): number {
        this._container.removeChild( this._food );
        this._scene.removeFood(this);
        return this._energy;
    }

    isTouching(x: number, y: number, size: number) {
        return Math.sqrt(Math.pow(this._x-x,2) + Math.pow(this._y-y,2)) < (this._radius+size);
    }
}