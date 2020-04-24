import { Piece } from './Components/Piece';
import { Solver } from './Components/Solver';
import { BoardSize, Coordinate } from './types';

window.pieces = [];

window.addPiece = (coordinates: Coordinate[], color: string) => {
    const piece = new Piece(coordinates, color);
    window.pieces.push(piece);
}

window.solve = (size: BoardSize) => {
    const solver = new Solver(size, window.pieces);
    solver.solve();
}

window.loadExamplePieces = () => {
    const pieces = [
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
        [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}],
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}],
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 1, y: 3}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}],
        [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
        [{x: 0, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
        [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
        [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
    ];
    window.pieces = pieces.map(coordinates => new Piece(coordinates));
}
