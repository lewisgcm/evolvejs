import {IOrganism} from "./IOrganism";
import {IReproduction} from "../Reproduction/IReproduction";
import {SimpleReproduction} from "../Reproduction/SimpleReproduction";
import {Scene} from "../Scene";
import {IFood} from "../Food/IFood";
import "pixi.js";

export class Microbe implements IOrganism {

    //GENOME properties
    private _speed: number = 4;
    private _startingEnergy: number = 500; //starting energy
    private _directionDurationDelta: number = 50; //number of deltas before we change direction
    private _size: number = 15; //The size of the organism
    private _canMoveWhilstGestating: boolean = false;
    private _gestationDuration: number = 5000; //How long it takes to gestate offspring, in MS
    private _offSpringCount: number = 0;

    //Just state management properties
    private _microbe: PIXI.Graphics;
    private _direction: number = 0;
    private _directionDelta: number; //number of deltas spent on current course
    private _energy: number = this._startingEnergy; //we die when reaching zero
    private _isGestating: boolean = false;
    private _reproduction: IReproduction = new SimpleReproduction();
    private _deltaAge = 0;

    public static Create(container: PIXI.Container, x: number, y: number, scene: Scene, genome? :string): Microbe {
        return new Microbe( container, x, y, scene, genome );
    }

    constructor(
        private _container: PIXI.Container,
        private _x: number,
        private _y: number,
        private _scene: Scene,
        genome?: string) {

        if( genome ) {
            this.setGenome(genome);
        }

        this._microbe = new PIXI.Graphics();
        this._microbe.lineStyle(2, 0x35eFFF);
        this._microbe.beginFill(0xFFFF00);
        this._microbe.drawCircle(0, 0, this._size);
        this._microbe.setTransform(this._x, this._y);
        this._microbe.endFill();
        this._container.addChild(this._microbe);
        this._scene.addOrganism(this);
    }

    private restrict( value: number, min: number, max: number ) {
        return Math.max(Math.min(value, max), min);
    }

    private getDirection(delta) :number {

        if( this._x < 0 || this._x > this._scene.width() || this._y < 0 || this._y > this._scene.height() ) {
            this._direction = this._direction - 180;
            return this._direction;
        }

        if(this._directionDelta < this._directionDurationDelta) {
            this._directionDelta += delta;
            return this._direction;
        }
        this._directionDelta = 0;
        this._direction = 360 * Math.random();
        return this._direction;
    }

    setGenome(genome: string) {
        var data = this._reproduction.decode(genome);
        this._speed                  = this.restrict(data[0], 1,   this._speed*1.5);
        this._startingEnergy         = this.restrict(data[1], 500, this._startingEnergy*1.5);
        this._directionDurationDelta = this.restrict(data[2], 1,   this._directionDurationDelta*1.5);
        this._size                   = this.restrict(data[3], 1,   this._size*1.5);
        this._gestationDuration      = this.restrict(data[4], 1,   this._gestationDuration*1.5);
        this._canMoveWhilstGestating = (data[5] & 0x1) === 1;
    }

    getGenome(): string {
        return this._reproduction.encode(
            this._speed,
            this._startingEnergy,
            this._directionDurationDelta,
            this._size,
            this._gestationDuration,
            this._canMoveWhilstGestating
        );
    }

    proliferate(organism: Microbe) {
        //Will do simple 50/50 split of reproduction, this will be configurable and part of genome
        //Also number of offspring etc will be configurable ATM will only be one
        if( this._isGestating ) return;

        this._isGestating = true;
        this._offSpringCount++;
        var newGenome = this
            ._reproduction
            .reproduce(this, organism);
        
        setTimeout(
            () => {
                this._isGestating = false;
                Microbe.Create(this._container, this._x, this._y, this._scene, newGenome);
                if( this._offSpringCount == 2) {
                    this.die();
                }
            },
            this._gestationDuration
        );
    }

    move(delta: number) {
        this._deltaAge = (this._deltaAge + delta) % 5000;

        if( this._deltaAge > 500 && this._energy > 500){
            this.proliferate(this);
            this._deltaAge = 0;
        }

        this._energy -= (delta/4.0);

        if(this._energy < 0) {
            this.die();
            return;
        }

        //If we are gestating we cant move
        if( this._isGestating && !this._canMoveWhilstGestating ) {
            return;
        }

        this._direction = this.getDirection(delta);
        this._x = (this._x + (Math.sin(this._direction)*this._speed*delta)) | 0;
        this._y = (this._y + (Math.cos(this._direction)*this._speed*delta)) | 0;
        this._microbe.x = this._x;
        this._microbe.y = this._y;
    }

    die() {
        this._scene.removeOrganism( this );
        this._container.removeChild(this._microbe);
    }

    canEatFood(food: IFood) {
        return food.isTouching(this._x, this._y, this._size);
    }

    eatFood(food: IFood) {
        this._energy += food.consume();
    }
}