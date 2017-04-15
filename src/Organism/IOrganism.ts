export interface IOrganism {
    getGenome(): string;
    proliferate(organism: IOrganism);
    move(delta: number);
    setGenome(genome: string);
}