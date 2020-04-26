import { Coordinate } from '../types';
import { getX } from './getX';

export const getWidth = (coordinates: Coordinate[]) => {
    const xs = coordinates.map(getX);
    return Math.max(...xs) - Math.min(...xs) + 1;
};
