import {Ship, ShipType} from "../ships";
import {Coordinate, Grid, gridSize} from "../grid";

export abstract class Player {
    protected abstract getNextPlacement(ship: Ship): {start: Coordinate, direction: Direction};
    protected abstract getNextMove(previousHit: boolean): Coordinate;

    playerGrid: Grid;
    explodedParts: number;

    protected constructor() {
        this.explodedParts = 0;
        this.playerGrid = new Grid();
    }


    public isDead(): boolean {
        return this.explodedParts >= 17;
    }

    public blowupCell(target: Coordinate): boolean {
        const result = this.playerGrid.explodeCell(target);

        if(result) {
            this.explodedParts++;
        }

        return result
    }

    public isValidPlacement(placement: Coordinate, direction: Direction, length: number): boolean {
        if(this.playerGrid.occupiedCells.has(placement)) {
            return false;
        }

        switch (direction) {
            case Direction.UP:
                if((placement.y - length) < 0) {
                    return false;
                }
                break;
            case Direction.DOWN:
                if((placement.y + length) >= gridSize) {
                    return false;
                }
                break;
            case Direction.LEFT:
                if((placement.x - length) < gridSize) {
                    return false;
                }
                break;
            case Direction.RIGHT:
                if((placement.x + length) >= gridSize) {
                    return false;
                }
                break;
        }

        let result = true;

        for (let i = 0; i < length; i++) {
            switch (direction) {
                case Direction.UP:
                    result = result && !this.playerGrid.occupiedCells.has({x: placement.x, y: placement.y - i});
                    break;
                case Direction.DOWN:
                    result = result && !this.playerGrid.occupiedCells.has({x: placement.x, y: placement.y + i});
                    break;
                case Direction.LEFT:
                    result = result && !this.playerGrid.occupiedCells.has({x: placement.x - i, y: placement.y});
                    break;
                case Direction.RIGHT:
                    result = result && !this.playerGrid.occupiedCells.has({x: placement.x + i, y: placement.y});
                    break;
            }
        }

        return result;
    }

    public putShip(ship: Ship): void {
        
        let validPlacementFound = false;
        let startPlacement: Coordinate, directionPlacement: Direction;
        
        while(!validPlacementFound) {
            const {start, direction} = this.getNextPlacement(ship);

            validPlacementFound = this.isValidPlacement(start, direction, ship.length)
            if(validPlacementFound) {
                startPlacement = start;
                directionPlacement = direction;
            }
        }


        for (let i = 0; i < ship.length; i++) {
            switch (directionPlacement) {
                case Direction.UP:
                    this.playerGrid.setCellContents({x: startPlacement.x, y: startPlacement.y - i}, ship);
                    break;
                case Direction.DOWN:
                    this.playerGrid.setCellContents({x: startPlacement.x, y: startPlacement.y + i}, ship);
                    break;
                case Direction.LEFT:
                    this.playerGrid.setCellContents({x: startPlacement.x - i, y: startPlacement.y}, ship);
                    break;
                case Direction.RIGHT:
                    this.playerGrid.setCellContents({x: startPlacement.x + i, y: startPlacement.y}, ship);
                    break;
            }
        }
    }

    public chooseTarget(previousHit: boolean): Coordinate {

        let targetAcquired = false;
        let target: Coordinate;
        
        while(!targetAcquired) {
            target = this.getNextMove(previousHit);
            if(target.x < 0 
                || target.x > gridSize 
                || target.y < 0 
                || target.y > gridSize) {
                console.log("Bad getNextMove returned, getting another");
            }
            else {
                targetAcquired = true;
            }
        }

        return target;
    }

}


export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}