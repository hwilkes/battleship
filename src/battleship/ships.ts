export type Ships = Carrier | Battleship | Cruiser | Submarine | Destroyer;

interface Ship {
    length: number;
    symbol: string;
}

interface Carrier extends Ship {
    length: 5,
    symbol: 'A'
}

interface Battleship extends Ship {
    length: 4,
    symbol: 'B'
}

interface Cruiser extends Ship {
    length: 3,
    symbol: 'C'
}
interface Submarine extends Ship {
    length: 3,
    symbol: 'S'
}
interface Destroyer extends Ship {
    length: 2,
    symbol: 'D'
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}