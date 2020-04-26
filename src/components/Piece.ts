import { generateRandomColor, getCoordinatesHash, rotateCoordinatesBy90Degrees } from '../utils';
import { Coordinate, Variants } from '../types';

export interface IPiece {
    coordinates: Coordinate[];
    numberOfTiles: number;
    variants: Variants;
    color: string;
}

export class Piece implements IPiece {
    coordinates: Coordinate[];
    numberOfTiles: number;
    variants: Variants;
    color: string;

    constructor(coordinates: Coordinate[], color = generateRandomColor()) {
        this.coordinates = coordinates;
        this.numberOfTiles = this.coordinates.length;
        this.variants = this.generateUniqueVariants();
        this.color = color;
    }

    private generateAllVariants() {
        const north = this.coordinates;
        const west = rotateCoordinatesBy90Degrees(north);
        const south = rotateCoordinatesBy90Degrees(west);
        const east = rotateCoordinatesBy90Degrees(south);
        return [
            north,
            west,
            south,
            east,
        ];
    }

    private generateUniqueVariants() {
        const hashes = new Set();
        const variants = this.generateAllVariants();
        return variants.filter(variant => {
            const hash = getCoordinatesHash(variant);
            const doesHashExist = !hashes.has(hash);
            hashes.add(hash);
            return doesHashExist;
        });
    }
}
