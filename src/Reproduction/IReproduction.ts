import {IOrganism} from "../Organism/IOrganism";

export interface IReproduction {
    encode(...args: any[]): string;
    decode(genome: string): any[];
    reproduce(parentOne: IOrganism, parentTwo: IOrganism)
}