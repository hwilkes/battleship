import {Carrier, Battleship, Cruiser, Submarine, Destroyer, ShipType} from "./ships";

export const gridSize = 10;

export class Grid {
    readonly cells: Cell[][];

    constructor() {
        this.cells = new Array(gridSize).fill(new Array(gridSize).fill(new Cell()))
    }
}

export class Cell {
    exploded: boolean;
    contents: ShipType;

    constructor() {
        this.exploded = false;
        this.contents = ShipType.EMPTY;
    }

    getSymbol(): string {
        switch (this.contents) {
            case ShipType.CA:
                return Carrier.symbol;
            case ShipType.BB:
                return Battleship.symbol;
            case ShipType.CR:
                return Cruiser.symbol;
            case ShipType.SS:
                return Submarine.symbol;
            case ShipType.DD:
                return Destroyer.symbol;
            case ShipType.EMPTY:
                return '~'

        }
    }
}

export type Coordinate = {x: number, y: number};