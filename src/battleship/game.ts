import { Grid } from "./grid";
import {Player} from "./player";
import {Ships, Ship} from "./ships";

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
        for (const ship of Ships) {
            this.playerOne.putShip(ship)
            this.playerTwo.putShip(ship)
        }
    }
}