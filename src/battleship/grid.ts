import {getSymbol, Ship, ShipType} from "./ships";

export const gridSize = 10;

export class Grid {
    readonly cells: Cell[][];

    readonly occupiedCells: Set<Coordinate>;


    constructor() {
        this.cells = new Array(gridSize).fill(new Array(gridSize).fill(new Cell()))
        this.occupiedCells = new Set();
    }

    setCellContents(coord: Coordinate, ship:Ship) {
        this.cells[coord.x][coord.y].contents = ship.symbol;
        this.occupiedCells.add(coord)
    }

    explodeCell(target: Coordinate): boolean {
        if(this.occupiedCells.has(target)) {
            this.cells[target.x][target.y].exploded = true;
            return true;
        }

        return false;
    }
}

export class Cell {
    exploded: boolean;
    contents: string;

    constructor() {
        this.exploded = false;
        this.contents = getSymbol(ShipType.EMPTY);
    }
}

export type Coordinate = {x: number, y: number};