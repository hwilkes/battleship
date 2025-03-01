import {Player} from "./player";

export default class Game {

    playerOne: Player;
    playerTwo: Player;

    constructor(playerOne: Player, playerTwo: Player) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }
}