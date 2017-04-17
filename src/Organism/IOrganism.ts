import {IFood} from "../Food/IFood";

export interface IOrganism {
    getGenome(): string;
    setGenome(genome: string);
    proliferate(organism: IOrganism);
    move(delta: number);
    die();
    canEatFood(food: IFood)
    eatFood(food: IFood)
}