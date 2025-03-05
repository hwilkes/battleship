import {Coordinate, Grid} from "./grid";
import {Player} from "./players/player";
import {Ships} from "./ships";

export default class Game {

    playerOne: Player;
    playerTwo: Player;
    
    gameRunning: boolean;

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

    run(): void {

        this.gameRunning = true;

        let playerOneLastHit = false, playerTwoHit = false;
        let playerOneTarget: Coordinate, playerTwoTarget: Coordinate;


        while(this.gameRunning) {
            playerOneTarget = this.playerOne.chooseTarget(playerOneLastHit)
            playerOneLastHit = this.playerTwo.blowupCell(playerOneTarget);
            
            if(this.playerTwo.isDead()) {
                console.log("Player One Wins");
                break;
            }
            

            playerTwoTarget = this.playerTwo.chooseTarget(playerTwoHit)
            playerTwoHit = this.playerOne.blowupCell(playerTwoTarget);

            if(this.playerOne.isDead()) {
                console.log("Player Two Wins");
                break;
            }
        }
    }
}