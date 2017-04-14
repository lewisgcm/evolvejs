import {IOrganism} from "./IOrganism";
import "pixi.js";

export class Microbe implements IOrganism {

    //GENOME properties
    private _speed: number = 6;
    private _startingEnergy: number = 500; //starting energy
    private _directionDurationDelta: number = 10; //number of deltas before we change direction
    private _size: number = 10; //The size of the organism
    private _canMoveWhilstGestating: boolean = false;
    private _gestationDuration: number = 5000; //How long it takes to gestate offspring, in MS

    //Just state management properties
    private _microbe: PIXI.Graphics;
    private _direction: number = 0;
    private _directionDelta: number; //number of deltas spent on current course
    private _energy: number = this._startingEnergy; //we die when reaching zero
    private _isGestating: boolean = false;

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

    private asBinary(input: number): string {
        return (input>>>0).toString(2);
    }

    getGenome(): string {
        var genome = `${(this.asBinary(this._speed))}${(this.asBinary(this._startingEnergy))}`;
        genome += `${(this.asBinary(this._directionDurationDelta))}${(this.asBinary(this._size))}`;
        return genome;
    }

    private replaceCharAt(string, index, character) {
      return string.substr(0, index) + character + string.substr(index+character.length);
   }

    proliferate(organism: Microbe): Promise<IOrganism[]> {
        //Will do simple 50/50 split of reproduction, this will be configurable and part of genome
        //Also number of offspring etc will be configurable ATM will only be one
        this._isGestating = true;

        var my = this.getGenome();
        var other = organism.getGenome();

        var newGenome = other.slice( 0, other.length / 2);
        newGenome += my.slice(newGenome.length, my.length - newGenome.length);

        //50% chance of mutation
        if(Math.random() > 0.5) {
            let gene = Math.floor(Math.random() * newGenome.length);
            let tmp = newGenome[gene];
            this.replaceCharAt(newGenome, gene, newGenome[newGenome.length-gene]);
            this.replaceCharAt(newGenome, newGenome.length-gene, tmp);
        }

        return new Promise<Microbe[]>(
            (success, error) => {
                setTimeout(
                    () => {
                        this._isGestating = false;

                    },
                    this._gestationDuration
                )
            }
        );
    }

    private getDirection(delta) :number {
        if(this._directionDelta < this._directionDurationDelta) {
            this._directionDelta += delta;
            return this._direction;
        }
        this._directionDelta = 0;
        this._direction = 360 * Math.random();
        return this._direction;
    }

    move(delta: number) {
        //If we are gestating we cant move
        if( this._isGestating && !this._canMoveWhilstGestating ) {
            return;
        }

        this._direction = this.getDirection(delta);
        this._x = (this._x + (Math.sin(this._direction)*this._speed*delta)) % this._viewWidth;
        this._y = (this._y + (Math.cos(this._direction)*this._speed*delta)) % this._viewHeight;
        this._x = (this._x < 0) ? this._viewWidth : this._x;
        this._y = (this._y < 0) ? this._viewHeight : this._y;
        this._microbe.x = this._x;
        this._microbe.y = this._y;
    }
}