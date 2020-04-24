import { rotateCoordinatesBy90Degrees } from '../rotateCoordinatesBy90Degrees';

describe('rotateCoordinatesBy90Degrees', () => {
    it('gets width of coordinates that generate L shaped 2d array', () => {
        const coordinates = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 1, y: 3}];
        const expected = [{x: 3, y: 0}, {x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}];
        const rotated = rotateCoordinatesBy90Degrees(coordinates);
        console.log(rotated)

        expect(rotated).toStrictEqual(expected);
    });

    it('gets width of coordinates that generate U shaped 2d array', () => {
        const coordinates = [{x: 0, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}];
        const expected = [{x: 1, y: 0}, {x: 1, y: 2}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];
        const rotated = rotateCoordinatesBy90Degrees(coordinates);

        expect(rotated).toStrictEqual(expected);
    });
});
