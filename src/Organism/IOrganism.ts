export interface IOrganism {
    getGenome(): string;
    setGenome(genome: string);
    proliferate(organism: IOrganism);

    move(delta: number);
}