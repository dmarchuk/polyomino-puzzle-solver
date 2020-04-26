import { Coordinate } from '../types';
import { createRectangleBlock } from './createRectangleBlock';
import { getWidth } from './getWidth';
import { getHeight } from './getHeight';

export const formatCoordinates = (coordinates: Coordinate[]) => {
    const width = getWidth(coordinates);
    const height = getHeight(coordinates);
    const result = createRectangleBlock(width, height);

    coordinates.forEach(({ x, y }) => {
        result[y][x] = 1;
    });

    return result;
};
