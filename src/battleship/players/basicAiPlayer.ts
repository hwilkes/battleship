import {Direction, Player} from "./player";
import {Coordinate, gridSize} from "../grid";
import {Ship} from "../ships";

export default class BasicAiPlayer extends Player {

    private previousTargets: Set<Coordinate>;

    constructor() {
        super();
        this.previousTargets = new Set<Coordinate>();
    }

    protected getNextMove(previousHit: boolean): Coordinate {

/*        if(previousHit) {
            //0 is up, 1, is down, 2 is left, 3 is right
            const direction = this.getRandomInt(4)
            switch(direction) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        }
        else {*/
        let target: Coordinate;
        let foundTarget = false;
        while(!foundTarget) {
            target = {x:this.getRandomInt(0,gridSize), y:this.getRandomInt(0,gridSize)}
            if(!this.previousTargets.has(target)) {
                foundTarget = true;
            }
        }
        this.previousTargets.add(target)
        return target;

        //}
    }

    protected getNextPlacement(ship: Ship): { start: Coordinate; direction: Direction } {

        let foundValidPlacement = false;
        let direction;
        let x, y;


        while(!foundValidPlacement) {
            direction = this.getRandomDirection();
            x = this.getRandomInt(0,gridSize)
            y = this.getRandomInt(0,gridSize)

            if(this.isValidPlacement({x:x,y:y}, direction, ship.length)) {
                foundValidPlacement = true;
            }

        }

        return {direction: direction, start: {x:x,y:y}};
    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    private getRandomDirection(): Direction {
        const rand = this.getRandomInt(0,4);
        if(rand == 0) {
            return Direction.UP;
        }
        else if(rand == 1) {
            return Direction.DOWN;
        }
        else if(rand == 2) {
            return Direction.LEFT;
        }
        else{
            return Direction.RIGHT;
        }
    }
}