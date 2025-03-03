import {Ship, ShipType} from "./ships";
import {Coordinate, Grid, gridSize} from "./grid";

export abstract class Player {
    abstract getNextPlacement(ship: ShipType): {start: Coordinate, direction: Direction};
    abstract getNextMove(previousHit: boolean): Coordinate;

    playerGrid: Grid;
    explodedParts: number;

    isDead(): boolean {
        return this.explodedParts >= 17;
    }

    blowupCell(target: Coordinate): boolean {
        const result = this.playerGrid.explodeCell(target);

        if(result) {
            this.explodedParts++;
        }

        return result
    }

    isValidPlacement(placement: Coordinate, direction: Direction, length: number): boolean {
        if(this.playerGrid.occupiedCells.has(placement)) {
            return false;
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

    putShip(ship: Ship): void {
        
        let validPlacementFound = false;
        let start: Coordinate, direction: Direction;
        
        while(!validPlacementFound) {
            const {start, direction} = this.getNextPlacement(ship.type);

            validPlacementFound = this.isValidPlacement(start, direction, ship.length)
        }

        for (let i = 0; i < ship.length; i++) {
            switch (direction) {
                case Direction.UP:
                    this.playerGrid.setCellContents({x: start.x, y: start.y - i}, ship);
                    break;
                case Direction.DOWN:
                    this.playerGrid.setCellContents({x: start.x, y: start.y + i}, ship);
                    break;
                case Direction.LEFT:
                    this.playerGrid.setCellContents({x: start.x - i, y: start.y}, ship);
                    break;
                case Direction.RIGHT:
                    this.playerGrid.setCellContents({x: start.x + i, y: start.y}, ship);
                    break;
            }
        }
    }

    chooseTarget(previousHit: boolean): Coordinate {

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