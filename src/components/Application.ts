import { BoardSize, Coordinate } from '../types';
import { examplePieces } from '../constants';
import { IPiece, Piece } from './Piece';
import { Solver } from './Solver';

interface IApplication {
    pieces: IPiece[];
    solver: Solver;
    addPiece: (coordinates: Coordinate[], color: string) => void;
    solve: () => void;
    loadExamplePieces: () => void;
    generateExampleSolution: () => void;
    createSolver: (size: BoardSize, pieces: IPiece[]) => void;
}

export class Application implements IApplication {
    pieces = [];
    solver: Solver;

    addPiece = (coordinates: Coordinate[], color: string) => {
        const piece = new Piece(coordinates, color);
        this.pieces.push(piece);
    };

    createSolver = (size: BoardSize, pieces: IPiece[] = this.pieces) => {
        this.solver = new Solver(size, pieces);
    };

    solve = () => {
        this.solver.solve();
    };

    loadExamplePieces = () => {
        this.pieces = examplePieces;
    };

    generateExampleSolution = () => {
        this.loadExamplePieces();
        this.createSolver([8, 8], this.pieces);
        this.solve();
    };
}
