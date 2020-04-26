import { solutionGenerator } from 'dlxlib';

import { BoardSize, Coordinate, PiecePlacement, Solution } from '../types';
import { createRectangleBlock } from '../utils';
import { IPiece } from './Piece';

export interface ISolver {
    pieces: IPiece[];
    width: number;
    height: number;
    solutionCounter: number;
    tilesCount: number;
    tilesCountEqual: boolean;
    solutions: Generator<number[], Solution>;
    $errorElement: HTMLElement;
}

export class Solver implements ISolver {
    pieces: IPiece[];
    width: number;
    height: number;
    solutionCounter: number;
    tilesCountEqual: boolean;
    solutions: Generator<number[], Solution>;
    $errorElement: HTMLElement;

    constructor(size: BoardSize, pieces: IPiece[]) {
        const [columns, rows] = size;
        this.pieces = pieces;
        this.width = columns;
        this.height = rows;
        this.solutionCounter = 0;
        this.tilesCountEqual = this.tilesCount === this.piecesTilesCount;
        this.$errorElement = document.getElementById('error');
    }

    logError = (error: string) => {
        this.$errorElement.innerText = error;
        this.$errorElement.classList.remove('d-none');

        // eslint-disable-next-line no-console
        console.error(error);
    }

    isPiecePlacementInside = (piecePlacement: PiecePlacement) => {
        const { position } = piecePlacement;
        for (const coordinates of piecePlacement.variant) {
            const x = position.x + coordinates.x;
            const y = position.y + coordinates.y;

            if (x >= this.width || y >= this.height) {
                return false;
            }
        }
        return true;
    }

    generatePiecePlacementColumns = (piecePlacement: PiecePlacement) => {
        const pieceIndex = this.pieces.findIndex(piece => piece === piecePlacement.piece);
        return createRectangleBlock(0, this.pieces.length).map((_, index) => (index === pieceIndex ? 1 : 0));
    }

    generateLocationColumns = (piecePlacement: PiecePlacement) => {
        const { position } = piecePlacement;
        const locationIndices = piecePlacement.variant.map(coordinates => {
            const x = position.x + coordinates.x;
            const y = position.y + coordinates.y;
            return y * this.width + x;
        });
        return createRectangleBlock(0, this.tilesCount).map((_, index) => (locationIndices.includes(index) ? 1 : 0));
    }

    generateMatrix = (piecePlacements: PiecePlacement[]) => piecePlacements.map(piecePlacement => {
        const pieceColumns = this.generatePiecePlacementColumns(piecePlacement);
        const locationColumns = this.generateLocationColumns(piecePlacement);
        return pieceColumns.concat(locationColumns);
    })

    drawSolution = (piecePlacements: PiecePlacement[], solution: number[]) => {
        const canvas = (<HTMLCanvasElement>document.getElementById('canvas'));
        const context = canvas.getContext('2d');
        const size = 50;

        canvas.width = this.width * size;
        canvas.height = this.height * size;

        context.clearRect(0, 0, this.width, this.height);

        solution.forEach(rowIndex => {
            const piecePlacement: PiecePlacement = piecePlacements[rowIndex];
            const { position } = piecePlacement;
            for (const coordinates of piecePlacement.variant) {
                const { color } = piecePlacement.piece;
                const x = position.x + coordinates.x;
                const y = position.y + coordinates.y;

                context.fillStyle = color;
                context.beginPath();
                context.fillRect(x * size, y * size, size, size);
                context.closePath();
            }
        });
    }

    getSolutions = (matrix: number[][]) => {
        this.solutions = solutionGenerator(matrix);
    }

    solve = () => {
        const piecePlacements = this.validPiecePlacements;
        const matrix = this.generateMatrix(piecePlacements);
        this.$errorElement.classList.add('d-none');

        if (!this.tilesCountEqual) {
            const error = `There's ${this.tilesCount} squares in the board, but total of squares in given pieces is ${this.piecesTilesCount}, so there's definitely no solution.`;
            this.logError(error);
            return;
        }

        if (!this.solutions) {
            this.getSolutions(matrix);
        }

        const solution = this.solutions.next();

        if (!solution.value) {
            const moreText = this.solutionCounter === 0 ? '' : ' more';
            const error = `No${moreText} solutions exist for given pieces and board size.`;
            this.logError(error);
            return;
        }

        this.solutionCounter++;

        this.drawSolution(piecePlacements, solution.value);

        return solution;
    }

    get allPossiblePositions() {
        const result: Coordinate[] = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                result.push({ x, y });
            }
        }
        return result;
    }

    get allPossiblePiecePlacements(): PiecePlacement[] {
        const positions = this.allPossiblePositions;
        const result: PiecePlacement[] = [];
        for (const piece of this.pieces) {
            for (const variant of piece.variants) {
                for (const position of positions) {
                    result.push({
                        piece,
                        variant,
                        position,
                    });
                }
            }
        }
        return result;
    }

    get validPiecePlacements() {
        const piecePlacements = this.allPossiblePiecePlacements;
        return piecePlacements.filter(this.isPiecePlacementInside);
    }

    get tilesCount() {
        return this.width * this.height;
    }

    get piecesTilesCount() {
        return this.pieces.reduce((total, { numberOfTiles }) => numberOfTiles + total, 0);
    }
}
