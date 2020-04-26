import { IPiece } from './components/Piece';
import { Application } from './components/Application';

declare global {
    interface Window {
        Solver: Application;
    }

    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
        }
    }
}

export interface Coordinate {
    x: number;
    y: number;
}

export type Variants = Coordinate[][];

export type BoardSize = [number, number];

export type Solution = number[];

export interface PiecePlacement {
    piece: IPiece;
    variant: Coordinate[];
    position: Coordinate;
}
