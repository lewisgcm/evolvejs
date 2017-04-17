import "pixi.js"
import {IOrganism} from "./Organism/IOrganism"
import {IFood} from "./Food/IFood";

export class Scene {

    private _organisms: IOrganism[] = [];
    private _food: IFood[] = [];

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

    addOrganism(organism: IOrganism) {
        this._organisms.push( organism );
    }

    addFood(food: IFood) {
        this._food.push( food );
    }

    removeFood(food: IFood) {
        var index = this
            ._food
            .indexOf(food);
        
        if( index != -1 ) {
            this._food.splice(index, 1);
        }
    }

    removeOrganism(organism: IOrganism) {
        var index = this
            ._organisms
            .indexOf(organism);
        
        if( index != -1 ) {
            this._organisms.splice(index, 1);
        }
    }

    render(delta) {
        for(let i = 0; i < this._organisms.length; i++){
            this._organisms[i].move(delta);
        }
        for(let i = 0; i < this._organisms.length; i++){
            for(let j = 0; j < this._food.length; j++){
                if (this._organisms[i].canEatFood(this._food[j])) {
                    this._organisms[i].eatFood(this._food[j]);
                }
            }
        }
    }
}