import { Piece } from '../Piece';

describe('Piece', () => {
    describe('Piece with coordinates generating N pattern', () => {
        const coordinates = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }];
        const piece = new Piece(coordinates);

        it('counts number of tiles', () => {
            const expected = 5;

            expect(piece.numberOfTiles).toBe(expected);
        });

        it('generates all unique variants', () => {
            const expected = [
                [
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 0, y: 2 },
                    { x: 0, y: 3 },
                ],
                [
                    { x: 3, y: 1 },
                    { x: 2, y: 0 },
                    { x: 2, y: 1 },
                    { x: 1, y: 0 },
                    { x: 0, y: 0 },
                ],
                [
                    { x: 0, y: 3 },
                    { x: 1, y: 2 },
                    { x: 0, y: 2 },
                    { x: 1, y: 1 },
                    { x: 1, y: 0 },
                ],
                [
                    { x: 0, y: 0 },
                    { x: 1, y: 1 },
                    { x: 1, y: 0 },
                    { x: 2, y: 1 },
                    { x: 3, y: 1 },
                ],
            ];

            expect(piece.variants).toStrictEqual(expected);
        });
    });

    describe('Piece with coordinates generating 3x3 square pattern', () => {
        const coordinates = [
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 },
            { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
            { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 },
        ];
        const piece = new Piece(coordinates);

        it('counts number of tiles', () => {
            const expected = 9;

            expect(piece.numberOfTiles).toBe(expected);
        });

        it('generates all unique variants', () => {
            const expected = [coordinates];

            expect(piece.variants).toStrictEqual(expected);
        });
    });
});
