import { Coordinate } from '../types';
import { formatCoordinates } from './formatCoordinates';

export const getCoordinatesHash = (coordinates: Coordinate[]) => JSON.stringify(formatCoordinates(coordinates));
