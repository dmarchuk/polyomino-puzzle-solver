import { formatCoordinates } from '../formatCoordinates';

describe('formatCoordinates', () => {
    it('generates formatted 2d array with L pattern', () => {
        const coordinates = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 3 }];
        const result = formatCoordinates(coordinates);
        const expected = [
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        expect(result).toStrictEqual(expected);
    });

    it('generates formatted 2d array with U pattern', () => {
        const coordinates = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }];
        const result = formatCoordinates(coordinates);
        const expected = [
            [1, 0, 1],
            [1, 1, 1],
        ];

        expect(result).toStrictEqual(expected);
    });
});
