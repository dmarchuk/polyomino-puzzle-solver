import { Solver } from '../Solver';
import { Piece } from '../Piece';

describe('Solver', () => {
    describe('Trivial Solver with 3x2 size', () => {
        const piece1 = new Piece([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
        const piece2 = new Piece([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }]);
        const pieces = [
            piece1,
            piece2,
        ];
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
            expect(solver.piecesTilesCount).toBe(6);
        });

        it('gets correct tilesCountEqual', () => {
            expect(solver.tilesCountEqual).toBe(true);
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
                const piecePlacement = {
                    piece: piece1,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 0 },
                };
                const pieceColumns = solver.generatePiecePlacementColumns(piecePlacement);
                const expected = [1, 0];

                expect(pieceColumns).toStrictEqual(expected);
            });
        });

        describe('allPossiblePiecePlacements', () => {
            it('generates all possible coordinates based on size', () => {
                const onePieces = [piece1];
                const onePieceSolver = new Solver([3, 2], onePieces);
                const expected = [
                    {
                        piece: piece1,
                        position: { x: 0, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 0, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 1, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 1, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 2, y: 0 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 2, y: 1 },
                        variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 0, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 0, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 1, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 1, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 2, y: 0 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                    {
                        piece: piece1,
                        position: { x: 2, y: 1 },
                        variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    },
                ];
                const possiblePositions = onePieceSolver.allPossiblePiecePlacements;

                expect(possiblePositions).toStrictEqual(expected);
            });
        });

        describe('isPiecePlacementInside', () => {
            it('returns true if the given position of the piece is inside the board', () => {
                const piecePlacement = {
                    piece: piece1,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 0 },
                };
                const possibleCoordinates = solver.isPiecePlacementInside(piecePlacement);

                expect(possibleCoordinates).toBe(true);
            });

            it('returns false if the given position of the piece overflows the board', () => {
                const piecePlacement = {
                    piece: piece1,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 1 },
                };
                const possibleCoordinates = solver.isPiecePlacementInside(piecePlacement);

                expect(possibleCoordinates).toBe(false);
            });
        });
    });
});
