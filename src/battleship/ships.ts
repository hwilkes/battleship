
export type Ship = {
    length: number;
    symbol: string;
    type: ShipType;
}

export const emptySymbol = '~';

export enum ShipType {
    CA, BB, CR, SS, DD, EMPTY
}

export const Carrier: Ship = {
    length: 5,
    symbol: 'A',
    type: ShipType.CA,
}

export const Battleship: Ship = {
    length: 4,
    symbol: 'B',
    type: ShipType.BB,
}

export const Cruiser: Ship = {
    length: 3,
    symbol: 'C',
    type: ShipType.CR,
}
export const Submarine: Ship = {
    length: 3,
    symbol: 'S',
    type: ShipType.SS,
}
export const Destroyer: Ship = {
    length: 2,
    symbol: 'D',
    type: ShipType.DD,
}

export const Ships = [
    Carrier, Battleship, Cruiser, Submarine, Destroyer
]

export function getSymbol(type: ShipType): string {
    switch (type) {
        case ShipType.CA:
            return Carrier.symbol;
        case ShipType.BB:
            return Battleship.symbol;
        case ShipType.CR:
            return Cruiser.symbol;
        case ShipType.SS:
            return Submarine.symbol;
        case ShipType.DD:
            return Destroyer.symbol;
        case ShipType.EMPTY:
            return emptySymbol;

    }
}
