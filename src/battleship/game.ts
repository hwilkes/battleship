import { Grid } from "./grid";
import {MoveCommand, Player} from "./player";
import {ShipType} from "./ships";

export default class Game {

    playerOne: Player;
    playerTwo: Player;

    playerOneGrid: Grid;
    playerTwoGrid: Grid;

    constructor(playerOne: Player, playerTwo: Player) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }

    setup(): void {
        for (const shipType in ShipType) {
            let playerOneCommand: MoveCommand = this.playerOne.placeShip(shipType);
            this.playerOne.placeShip(shipType);
        }
    }
}