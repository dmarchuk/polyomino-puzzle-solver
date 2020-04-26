import { generateRandomColor } from '../generateRandomColor';

describe('generateRandomColor', () => {
    it('returns valid HEX color', () => {
        const color = generateRandomColor();
        const matcher = /^#([0-9A-F]{3}){1,2}$/i;

        expect(matcher.test(color)).toBe(true);
    });
});
