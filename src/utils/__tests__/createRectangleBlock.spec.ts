import { createRectangleBlock } from '../createRectangleBlock';

describe('createRectangleBlock', () => {
    it('generates 2d array of 0s with 3 columns and 5 rows', () => {
        const width = 3;
        const height = 5;
        const value = 0;
        const result = createRectangleBlock(width, height, value);
        const expected = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];

        expect(result).toStrictEqual(expected);
    });

    it('generates 2d array of 1s with 5 columns and 4 rows', () => {
        const width = 5;
        const height = 4;
        const value = 1;
        const result = createRectangleBlock(width, height, value);
        const expected = [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ];

        expect(result).toStrictEqual(expected);
    });
});
