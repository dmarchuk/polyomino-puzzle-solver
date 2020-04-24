import { getHeight } from '../getHeight';

describe('getHeight', () => {
    it('gets height of coordinates that generate L shaped 2d array', () => {
        const coordinates = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 1, y: 3}];
        const expected = 4;
        const height = getHeight(coordinates);

        expect(height).toBe(expected);
    });
    
    it('gets height of coordinates that generate U shaped 2d array', () => {
        const coordinates = [{x: 0, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}];
        const expected = 2;
        const height = getHeight(coordinates);

        expect(height).toBe(expected);
    });
});
