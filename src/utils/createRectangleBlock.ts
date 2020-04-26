// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createRectangleBlock = (columns: number, rows: number, value = 0) => Array.from(Array(rows), _ => Array(columns).fill(value));
