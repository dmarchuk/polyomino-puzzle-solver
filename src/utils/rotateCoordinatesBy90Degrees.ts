import { Coordinate } from '../types';
import { getX } from './getX';
import { getY } from './getY';

export const rotateCoordinatesBy90Degrees = (coordinates: Coordinate[]) => {
    const rotated = coordinates.map(({ x, y }) => ({ x: -y, y: x }));
    return normalizeRotatedCoordinates(rotated);
};

const normalizeRotatedCoordinates = (coordinates: Coordinate[]) => {
    const smallestX = Math.min(...coordinates.map(getX));
    const smallestY = Math.min(...coordinates.map(getY));
    return coordinates.map(({ x, y }) => ({ x: x + -smallestX, y: y + -smallestY }));
};
