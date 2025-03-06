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
        console.log("setup");
        for (const ship of Ships) {
            this.playerOne.putShip(ship)
            this.playerTwo.putShip(ship)
        }

        console.log(JSON.stringify((this.playerOne.playerGrid.occupiedCells)))

        while(true){}
        console.log("Ships placed!")
    }

    run(): void {
        console.log("run");
        this.gameRunning = true;

        let playerOneLastHit = false, playerTwoHit = false;
        let playerOneTarget: Coordinate, playerTwoTarget: Coordinate;


        while(this.gameRunning) {
            playerOneTarget = this.playerOne.chooseTarget(playerOneLastHit)
            playerOneLastHit = this.playerTwo.blowupCell(playerOneTarget);

            console.log(`Player One Target: ${playerOneTarget.x} ${playerOneTarget.y}`)
            console.log("Player One Hit?: " + playerOneLastHit)
            
            if(this.playerTwo.isDead()) {
                console.log("Player One Wins");
                break;
            }
            

            playerTwoTarget = this.playerTwo.chooseTarget(playerTwoHit)
            playerTwoHit = this.playerOne.blowupCell(playerTwoTarget);

            console.log(`Player Two Target: ${playerTwoTarget.x} ${playerTwoTarget.y}`)
            console.log("Player Two Hit?: " + playerTwoHit)

            if(this.playerOne.isDead()) {
                console.log("Player Two Wins");
                break;
            }
        }
    }
}