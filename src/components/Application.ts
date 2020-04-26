import { BoardSize, Coordinate } from '../types';
import { examplePieces } from '../constants';
import { IPiece, Piece } from './Piece';
import { PolyominoSolver } from './PolyominoSolver';

interface IApplication {
    pieces: IPiece[];
    solver: PolyominoSolver;
    addPiece: (coordinates: Coordinate[], color: string) => void;
    solve: () => void;
    loadExamplePieces: () => void;
    generateExampleSolution: () => void;
    createSolver: (size: BoardSize) => void;
    $exampleSolutionButton: HTMLButtonElement;
    $solveButton: HTMLButtonElement;
}

export class Application implements IApplication {
    pieces = [];
    solver: PolyominoSolver;
    $exampleSolutionButton: HTMLButtonElement;
    $solveButton: HTMLButtonElement;

    constructor() {
        this.$exampleSolutionButton = (<HTMLButtonElement>document.getElementById('example-solution-button'));
        this.$solveButton = (<HTMLButtonElement>document.getElementById('solve-button'));

        this.$exampleSolutionButton.addEventListener('click', this.generateExampleSolution);
        this.$solveButton.addEventListener('click', this.solve);
    }

    addPiece = (coordinates: Coordinate[], color: string) => {
        const piece = new Piece(coordinates, color);
        this.pieces.push(piece);
    };

    createSolver = (size: BoardSize) => {
        this.enableSolveButton();
        this.solver = new PolyominoSolver(size, this.pieces);
    };

    solve = () => {
        if (!this.solver) {
            throw Error('You need to create a solver with Solver.createSolver(size: [number, number]) first.');
        }

        this.solver.solve();
    };

    loadExamplePieces = () => {
        this.pieces = examplePieces;
    };

    generateExampleSolution = () => {
        this.loadExamplePieces();
        this.createSolver([8, 8]);
        this.solve();
    };

    enableSolveButton = () => {
        this.$solveButton.disabled = false;
    }
}
