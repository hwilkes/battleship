import {Ship} from "./ships";
import {Coordinate, Grid} from "./grid";

export type PlaceCommand = {
    ship: Ships;
};

export interface Player {
    placeShip(ship: Ship): MoveCommand;
    getNextMove(previousHit: boolean): Coordinate;

    playerGrid: Grid;
}


export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}