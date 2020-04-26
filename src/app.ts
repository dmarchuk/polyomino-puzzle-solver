import { IPiece, Piece } from './Components/Piece';
import { Solver } from './Components/Solver';
import { BoardSize, Coordinate } from './types';
import { examplePieces } from './constants';

window.pieces = [];

window.addPiece = (coordinates: Coordinate[], color: string) => {
    const piece = new Piece(coordinates, color);
    window.pieces.push(piece);
};

window.createSolver = (size: BoardSize, pieces: IPiece[] = window.pieces) => {
    window.solver = new Solver(size, pieces);
};

window.solve = () => {
    const { solver } = window;
    solver.solve();
};

window.loadExamplePieces = () => {
    window.pieces = examplePieces;
};
