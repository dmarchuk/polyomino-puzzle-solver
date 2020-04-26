import { Solver } from '../Solver';
import { Piece } from '../Piece';

describe('Solver', () => {
    describe('Trivial Solver with 3x2 size', () => {
        const piece = new Piece([{ x: 0, y: 0 }, { x: 1, y: 1 }], 'green');
        const pieces = [piece];
        const solver = new Solver([3, 2], pieces);

        it('sets correct width', () => {
            expect(solver.width).toBe(3);
        });

        it('sets correct height', () => {
            expect(solver.height).toBe(2);
        });

        it('gets correct tilesCount', () => {
            expect(solver.tilesCount).toBe(6);
        });

        it('gets correct piecesTilesCount', () => {
            expect(solver.piecesTilesCount).toBe(2);
        });

        it('gets correct tilesCountEqual', () => {
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

                expect(possibleCoordinates).toStrictEqual(expected);
            });
        });

        describe('generatePiecePlacementColumns', () => {
            it('generates columns array for given piece placement', () => {
                const largePiece = new Piece([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }]);
                const morePieces = [
                    piece,
                    largePiece,
                ];
                const morePiecesSolver = new Solver([3, 2], morePieces);
                const piecePlacement = {
                    piece,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 0 },
                };
                const pieceColumns = morePiecesSolver.generatePiecePlacementColumns(piecePlacement);
                const expected = [1, 0];

                expect(pieceColumns).toStrictEqual(expected);
            });
        });

        describe('allPossiblePiecePlacements', () => {
            it('generates all possible coordinates based on size', () => {
                const expected = [
                    {
                        piece,
                        position: { x: 0, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 0, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 1, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 1, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 2, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 2, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 0, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 0, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 1, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 1, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 2, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece,
                        position: { x: 2, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                ];
                const possiblePositions = solver.allPossiblePiecePlacements;

                expect(possiblePositions).toStrictEqual(expected);
            });
        });

        describe('isPiecePlacementInside', () => {
            it('returns true if the given position of the piece is inside the board', () => {
                const piecePlacement = {
                    piece,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 0 },
                };
                const possibleCoordinates = solver.isPiecePlacementInside(piecePlacement);

                expect(possibleCoordinates).toBe(true);
            });

            it('returns false if the given position of the piece overflows the board', () => {
                const piecePlacement = {
                    piece,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 1 },
                };
                const possibleCoordinates = solver.isPiecePlacementInside(piecePlacement);

                expect(possibleCoordinates).toBe(false);
            });
        });
    });
});
