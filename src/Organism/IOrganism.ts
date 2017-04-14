export interface IOrganism {
    getGenome(): string;
    
    proliferate(organism: IOrganism): Promise<IOrganism[]>;

    move(delta: number);
}