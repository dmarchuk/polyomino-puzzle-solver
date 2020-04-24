import * as dlxlib from 'dlxlib'

import { IPiece } from './Piece';
import { createRectangleBlock } from '../utils';
import { BoardSize } from '../types';

export interface ISolver {
    size: BoardSize;
    pieces: IPiece[];
    tilesCount: number;
    piecesTilesCount: number;
}

export class Solver implements ISolver {
    size: BoardSize;
    pieces: IPiece[];
    width: number;
    height: number;
    tilesCount: number;
    piecesTilesCount: number;
    tilesCountEqual: boolean;

    constructor(size: BoardSize, pieces: IPiece[]) {
        const [columns, rows] = size;
        this.size = size;
        this.pieces = pieces;
        this.width = columns;
        this.height = rows;
        this.tilesCount = this.getBoardTilesCount();
        this.piecesTilesCount = this.getPiecesTilesCount();
        this.tilesCountEqual = this.tilesCount === this.piecesTilesCount;
    }

    getBoardTilesCount = () => this.width * this.height;

    getPiecesTilesCount = () => this.pieces.reduce((total, piece) => piece.numberOfTiles + total, 0);

    getAllPossibleCoordinates = () => {
        const result = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                result.push({x, y});
            }
        }
        return result;
    }

    getAllPossiblePositions() {
        const locations = this.getAllPossibleCoordinates();
        const result = [];
        for (const piece of this.pieces) {
            for (const variation of Array.from(piece.variants)) {
                for (const location of locations) {
                    result.push({
                        piece,
                        variation,
                        location
                    });
                }
            }
        }
        return result;
    }

    isPlacementValid = placement => {
        const location = placement.location
        for (const coordinates of placement.variation) {
            const x = location.x + coordinates.x
            const y = location.y + coordinates.y
            if (x >= this.width || y >= this.height) return false
        }
        return true
    }

    generateValidRows = () => {
        const placements = Array.from(this.getAllPossiblePositions())
        return placements.filter(this.isPlacementValid)
    }

    generatePieceColumns = placement => {
        const pieceIndex = this.pieces.findIndex(piece => piece === placement.piece);
        return createRectangleBlock(0, this.pieces.length).map((_, index) => index === pieceIndex ? 1 : 0)
    }

    generateLocationColumns = placement => {
        const location = placement.location
        const locationIndices = placement.variation.map(coords => {
            const x = location.x + coords.x
            const y = location.y + coords.y
            return y * this.height + x
        })
        return createRectangleBlock(0, this.tilesCount).map((_, index) => locationIndices.includes(index) ? 1 : 0)
    }

    generateMatrix = rows => {
        return rows.map(row => {
            const pieceColumns = this.generatePieceColumns(row)
            const locationColumns = this.generateLocationColumns(row)
            return pieceColumns.concat(locationColumns);
        })
    }

    drawSolution = (rows, solution) => {
        const cells = createRectangleBlock(this.width, this.height);
        const canvas = (<HTMLCanvasElement>document.getElementById('canvas'));
        const ctx = canvas.getContext('2d');

        canvas.width = this.width * 50;
        canvas.height = this.height * 50;

        solution.forEach(rowIndex => {
            const placement = rows[rowIndex]
            const location = placement.location
            for (const coords of placement.variation) {
                const x = location.x + coords.x
                const y = location.y + coords.y
                const size = 50;
                cells[y][x] = placement.piece.color

                ctx.fillStyle = placement.piece.color;
                ctx.beginPath();
                ctx.fillRect(x * size, y * size, size, size);
                ctx.closePath();
            }
        });
    }

    solve = () => {
        const rows = this.generateValidRows();
        const matrix = this.generateMatrix(rows);
        const errorElement = document.getElementById('error');
        errorElement.classList.add('d-none');

        if (!this.tilesCountEqual) {
            errorElement.innerText = `There's ${this.tilesCount} squares in the board, but total of squares in given pieces is ${this.piecesTilesCount}, so there's definitely no solution.`;
            errorElement.classList.remove('d-none');
            return;
        }

        const solutions = dlxlib.solve(matrix, undefined, undefined, 1)
        const solution = solutions[0];

        if (!solution) {
            errorElement.innerText = 'No solutions exist for given pieces and board size.';
            errorElement.classList.remove('d-none');
            return;
        }

        this.drawSolution(rows, solutions[0]);
    }
}
