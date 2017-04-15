import "pixi.js"
import {IOrganism} from "./Organism/IOrganism"

export class Scene {

    private _organisms: IOrganism[] = [];

    constructor(
        private _container: PIXI.Container,
        private _width: number,
        private _height: number
    ) {
    }

    width(): number {
        return this._width;
    }

    height(): number {
        return this._height;
    }

    add(organism: IOrganism) {
        this._organisms.push( organism );
    }

    render(delta) {
        for(let i = 0; i < this._organisms.length; i++){
            this._organisms[i].move(delta);
        }
    }
}