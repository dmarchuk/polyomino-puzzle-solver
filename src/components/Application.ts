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
    $exampleSolutionButton: HTMLButtonElement;
    $solveButton: HTMLButtonElement;
}

export class Application implements IApplication {
    pieces = [];
    solver: Solver;
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

    createSolver = (size: BoardSize, pieces: IPiece[] = this.pieces) => {
        this.enableSolveButton();
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

    enableSolveButton = () => {
        this.$solveButton.disabled = false;
    }
}
