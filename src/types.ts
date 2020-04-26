import { IPiece } from './Components/Piece';
import { Solver } from './Components/Solver';

declare global {
    interface Window {
        pieces: IPiece[];
        addPiece: (coordinates: Coordinate[], color: string) => void;
        solve: () => void;
        loadExamplePieces: () => void;
        createSolver: (size: BoardSize, pieces: IPiece[]) => void;
        solver: Solver;
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
