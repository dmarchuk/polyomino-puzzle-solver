import { Solver } from '../Solver';
import { Piece } from '../Piece';

describe('Solver', () => {
    describe('Trivial Solver with 3x2 size', () => {
        const piece = new Piece([{x: 0, y: 0}, {x: 1, y: 1}], 'green');
        const pieces = [piece];
        const solver = new Solver([3, 2], pieces);

        it('sets correct width and height', () => {
            expect(solver.width).toBe(3);
            expect(solver.height).toBe(2);
        })

        it('sets correct tilesCount', () => {
            expect(solver.tilesCount).toBe(6);
        })

        it('sets correct piecesTilesCount', () => {
            expect(solver.piecesTilesCount).toBe(2);
        })

        it('sets correct tilesCountEqual', () => {
            expect(solver.tilesCountEqual).toBe(false);
        })

        describe('generateAllPossibleCoordinates', () => {
            it('generates all possible coordinates based on size', () => {
                const expected = [
                    {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2},
                    {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2},
                    {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}
                ]
                const possibleCoordinates = solver.getAllPossibleCoordinates();

                expect(possibleCoordinates).toEqual(expected);
            })
        })

        describe('generateAllPossiblePositions', () => {
            it('generates all possible coordinates based on size', () => {
                const expected = [
                    {
                        piece,
                        location: {x: 0, y: 0},
                        variation: [{x: 0, y: 0}, {x: 1, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 0, y: 1},
                        variation: [{x: 0, y: 0}, {x: 1, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 1, y: 0},
                        variation: [{x: 0, y: 0}, {x: 1, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 1, y: 1},
                        variation: [{x: 0, y: 0}, {x: 1, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 2, y: 0},
                        variation: [{x: 0, y: 0}, {x: 1, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 2, y: 1},
                        variation: [{x: 0, y: 0}, {x: 1, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 0, y: 0},
                        variation: [{x: 1, y: 0}, {x: 0, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 0, y: 1},
                        variation: [{x: 1, y: 0}, {x: 0, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 1, y: 0},
                        variation: [{x: 1, y: 0}, {x: 0, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 1, y: 1},
                        variation: [{x: 1, y: 0}, {x: 0, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 2, y: 0},
                        variation: [{x: 1, y: 0}, {x: 0, y: 1}]
                    },
                    {
                        piece,
                        location: {x: 2, y: 1},
                        variation: [{x: 1, y: 0}, {x: 0, y: 1}]
                    }
                ];
                const possiblePositions = solver.getAllPossiblePositions();

                expect(possiblePositions).toEqual(expected);
            })
        })
    });
});
