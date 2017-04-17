export interface IFood {
    consume(): number;
    isTouching(x: number, y: number, size: number);
}