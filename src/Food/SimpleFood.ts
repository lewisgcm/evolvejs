import {IFood} from "./IFood";
import "pixi.js";

export class SimpleFood implements IFood {

    private static MAX_ENERGY = 500;
    private _energy: number;
    private _food: PIXI.Graphics;

    public static Create(container: PIXI.Container, x: number, y: number) {
        new SimpleFood( container, x, y );
    }

    constructor(private _container: PIXI.Container, private _x: number, private _y: number){
        this._energy = Math.max(Math.floor( Math.random()*SimpleFood.MAX_ENERGY), 1);

        //Render food
        this._food = new PIXI.Graphics();
        this._food.lineStyle(2, 0x35e082);
        this._food.beginFill(0x00FF00);
        this._food.drawCircle(this._x, this._y, 2 + Math.log(this._energy));
        this._food.endFill();
        this._container.addChild( this._food );
    }

    consume(): number {
        this._container.removeChild( this._food );
        return this._energy;
    }
}