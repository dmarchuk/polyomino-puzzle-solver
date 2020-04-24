export const createRectangleBlock = (columns: number, rows: number, value = 0) => {
    return Array.from(Array(rows), _ => Array(columns).fill(value));
}
