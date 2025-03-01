import {Ships} from "./ships";
import {Coordinate} from "./grid";

export type MoveCommand = {
    ship: Ships;

};

export interface Player {
    placeShip(ship: Ships): void;
    getNextMove(previousHit: boolean): Coordinate;
}

