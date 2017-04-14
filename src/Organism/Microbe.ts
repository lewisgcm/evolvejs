import {IOrganism} from "./IOrganism";
import "pixi.js";

export class Microbe implements IOrganism {

    private _microbe: PIXI.Graphics;

    public static Create(container: PIXI.Container, x: number, y: number): Microbe {
        return new Microbe( container, x, y );
    }

    constructor(
        private _container: PIXI.Container,
        private _x: number,
        private _y: number) {

        this._microbe = new PIXI.Graphics();
        this._microbe.lineStyle(2, 0x35eFFF);
        this._microbe.beginFill(0xFFFF00);
        this._microbe.drawCircle(this._x, this._y, 10);
        this._microbe.endFill();
        this._container.addChild(this._microbe);
    }

    getGenome(): string {
        throw new Error('Method not implemented.');
    }

    proliferate(organism: IOrganism): Promise<IOrganism[]> {
        throw new Error('Method not implemented.');
    }

    move(delta: number) {
        //console.log(this._container)
        this._x = (this._x + 1) % 800;//this._container.width;
        this._y = (this._y + 1) % 600;//this._container.height;
        this._microbe.x = this._x;
        this._microbe.y = this._y;
    }
}