import { getCoordinatesHash } from '../getCoordinatesHash';

describe('getCoordinatesHash', () => {
    it('gets hash of coordinates that generate L shaped 2d array', () => {
        const coordinates = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 3 }];
        const expected = '[[1,0],[1,0],[1,0],[1,1]]';
        const hash = getCoordinatesHash(coordinates);

        expect(hash).toBe(expected);
    });

    it('gets hash of coordinates that generate U shaped 2d array', () => {
        const coordinates = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }];
        const expected = '[[1,0,1],[1,1,1]]';
        const hash = getCoordinatesHash(coordinates);

        expect(hash).toBe(expected);
    });
});
