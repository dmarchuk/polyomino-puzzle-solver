import { Solver } from '../Solver';
import { Piece } from '../Piece';

describe('Solver', () => {
    describe('Trivial Solver with 3x2 size', () => {
        const piece = new Piece([{ x: 0, y: 0 }, { x: 1, y: 1 }], 'green');
        const pieces = [piece];
        const solver = new Solver([3, 2], pieces);

        it('sets correct width and height', () => {
            expect(solver.width).toBe(3);
            expect(solver.height).toBe(2);
        });

        it('sets correct tilesCount', () => {
            expect(solver.tilesCount).toBe(6);
        });

        it('sets correct piecesTilesCount', () => {
            expect(solver.piecesTilesCount).toBe(2);
        });

        it('sets correct tilesCountEqual', () => {
            expect(solver.tilesCountEqual).toBe(false);
        });

        describe('allPossibleCoordinates', () => {
            it('generates all possible coordinates based on size', () => {
                const expected = [
                    { x: 0, y: 0 }, { x: 0, y: 1 },
                    { x: 1, y: 0 }, { x: 1, y: 1 },
                    { x: 2, y: 0 }, { x: 2, y: 1 },
                ];
                const possibleCoordinates = solver.allPossiblePositions;

                expect(possibleCoordinates).toEqual(expected);
            });
        });

        describe('allPossiblePiecePositions', () => {
            it('generates all possible coordinates based on size', () => {
                const expected = [
                    {
                        piece,
                        coordinate: { x: 0, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 0, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 1, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 1, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 2, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 2, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 0, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 0, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 1, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 1, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 2, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        coordinate: { x: 2, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                ];
                const possiblePositions = solver.allPossiblePiecePlacements;

                expect(possiblePositions).toEqual(expected);
            });
        });

        describe('isPositionValid', () => {
            it('returns true if the given position of the piece is inside the board', () => {
                const piecePlacement = {
                    piece,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 0 },
                };
                const possibleCoordinates = solver.isPiecePlacementValid(piecePlacement);

                expect(possibleCoordinates).toBe(true);
            });

            it('returns false if the given position of the piece overflows the board', () => {
                const piecePlacement = {
                    piece,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 1 },
                };
                const possibleCoordinates = solver.isPiecePlacementValid(piecePlacement);

                expect(possibleCoordinates).toBe(false);
            });
        });
    });
});
