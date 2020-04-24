import { IPiece } from './Components/Piece';

declare global {
    interface Window {
        pieces: IPiece[];
        addPiece: (coordinates: Coordinate[], color: string) => void;
        solve: (size: BoardSize, pieces: IPiece[]) => void;
        loadExamplePieces: () => void;
    }
}

export interface Coordinate {
    x: number;
    y: number;
}

export type Variants = Coordinate[][];

export type BoardSize = [number, number];
