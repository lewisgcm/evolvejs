import {IOrganism} from "./IOrganism";
import "pixi.js";

export class Microbe implements IOrganism {

    private _microbe: PIXI.Graphics;
    private _direction: number = 0;

    //These can make up genome
    private _speed: number = 6;
    private _startingEnergy: number = 500; //starting energy
    private _energy: number = this._startingEnergy; //we die when reaching zero
    private _directionDuration: number = 10; //number of deltas before we change direction
    private _changeDirectionAfterFood: boolean = false; // change direction after we find food
    private _size: number = 10; //The size of the organism

    public static Create(container: PIXI.Container, x: number, y: number, viewWidth: number, viewHeight: number): Microbe {
        return new Microbe( container, x, y, viewWidth, viewHeight );
    }

    constructor(
        private _container: PIXI.Container,
        private _x: number,
        private _y: number,
        private _viewWidth: number,
        private _viewHeight: number) {

        this._microbe = new PIXI.Graphics();
        this._microbe.lineStyle(2, 0x35eFFF);
        this._microbe.beginFill(0xFFFF00);
        this._microbe.drawCircle(this._x, this._y, this._size);
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
        this._direction += 0.1;
        this._x = (this._x + (Math.sin(this._direction)*this._speed*delta)) % this._viewWidth;
        this._y = (this._y + (Math.cos(this._direction)*this._speed*delta)) % this._viewHeight;
        this._x = (this._x < 0) ? this._viewWidth : this._x;
        this._y = (this._y < 0) ? this._viewHeight : this._y;
        this._microbe.x = this._x;
        this._microbe.y = this._y;
    }
}