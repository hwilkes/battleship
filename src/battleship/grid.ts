
export class Grid {
    cells: Cell[][];
}

export class Cell {
    exploded: boolean;
    contents: string;
}

export type Coordinate = {x: number, y: number};