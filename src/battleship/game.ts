import {Player} from "./player";
import {ShipType} from "./ships";

export default class Game {

    playerOne: Player;
    playerTwo: Player;

    constructor(playerOne: Player, playerTwo: Player) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }

    setup(): void {
        for (const shipType in ShipType) {
            this.playerOne.placeShip(shipType);
            this.playerOne.placeShip(shipType);
        }
    }
}