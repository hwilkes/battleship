import {Ships} from "./ships";
import {Coordinate, Grid} from "./grid";

export type MoveCommand = {
    ship: Ships;
    startX: number;
    startY: number;
    direction: Direction;
};

export interface Player {
    placeShip(ship: Ships): MoveCommand;
    getNextMove(previousHit: boolean): Coordinate;

    playerGrid: Grid;
}


export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}