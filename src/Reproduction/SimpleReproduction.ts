import {IReproduction} from "./IReproduction";
import {IOrganism} from "../Organism/IOrganism";

export class SimpleReproduction implements IReproduction {

    private replaceCharAt(string, index, character) {
        return string.substr(0, index) + character + string.substr(index+character.length);
    }

    private asBinary(input: number): string {
        return ("0000000000000000000000000000000"+((input>>>0).toString(2))).slice(-32);
    }

    encode(...args: any[]): string {
        var genome = "";
        for(let i = 0; i < arguments.length; i++) {
            if( typeof arguments[i] == 'number') {
                genome += this.asBinary(arguments[i]);
            } else if( typeof arguments[i] == 'boolean' ) {
                genome += arguments[i] == true ? this.asBinary(1) : this.asBinary(0);
            }
        }
        return genome;
    }

    decode(genome: string): any[] {
        var decoded = [];
        for(let i = 0; i < genome.length; i+=32){
            decoded.push( parseInt( genome.slice(i, i+32), 2 ) );
        }
        return decoded;
    }

    reproduce(parentOne: IOrganism, parentTwo: IOrganism) {

        var my = parentOne.getGenome();
        var other = parentTwo.getGenome();

        var newGenome = other.slice( 0, other.length / 2);
        newGenome += my.slice(-newGenome.length);

        //50% chance of mutation
        if(Math.random() > 0.5) {
            let gene = Math.floor(Math.random() * newGenome.length);
            let tmp = (Math.random() > 0.5) ? '1' : '0';
            newGenome = this.replaceCharAt(newGenome, gene, tmp);
        }

        return newGenome;
    }
}