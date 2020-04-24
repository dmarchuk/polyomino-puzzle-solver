import { Coordinate } from '../types';
import { getY } from './getY';

export const getHeight = (coordinates: Coordinate[]) => {
    let ys = coordinates.map(getY);
    return Math.max(...ys) - Math.min(...ys) + 1;
}
