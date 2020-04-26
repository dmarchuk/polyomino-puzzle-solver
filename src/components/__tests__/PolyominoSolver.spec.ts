import { PolyominoSolver } from '../PolyominoSolver';
import { Piece } from '../Piece';

let piece1;
let piece2;
let pieces;
let globalSolver;

beforeEach(() => {
    piece1 = new Piece([{ x: 0, y: 0 }, { x: 0, y: 1 }]);
    piece2 = new Piece([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }]);
    pieces = [
        piece1,
        piece2,
    ];
    globalSolver = new PolyominoSolver([3, 2], pieces);
});

describe('Solver', () => {
    const $errorElement = global.document.createElement('div');
    $errorElement.id = 'error';
    global.document.body.appendChild($errorElement);

    describe('Trivial Solver with 3x2 size', () => {
        it('sets correct width', () => {
            expect(globalSolver.width).toBe(3);
        });

        it('sets correct height', () => {
            expect(globalSolver.height).toBe(2);
        });

        it('gets correct tilesCount', () => {
            expect(globalSolver.tilesCount).toBe(6);
        });

        it('gets correct piecesTilesCount', () => {
            expect(globalSolver.piecesTilesCount).toBe(6);
        });

        it('gets correct tilesCountEqual', () => {
            expect(globalSolver.tilesCountEqual).toBe(true);
        });

        describe('logError', () => {
            const error = 'error';

            it('sets innerText of the $errorElement to given error', () => {
                globalSolver.logError(error);
                expect(globalSolver.$errorElement.innerText).toBe(error);
            });

            it('calls console.error with given error', () => {
                globalSolver.logError(error);
                expect(global.console.error).toHaveBeenCalledWith(error);
            });
        });

        describe('allPossibleCoordinates', () => {
            it('generates all possible coordinates based on size', () => {
                const expected = [
                    { x: 0, y: 0 }, { x: 0, y: 1 },
                    { x: 1, y: 0 }, { x: 1, y: 1 },
                    { x: 2, y: 0 }, { x: 2, y: 1 },
                ];
                const possibleCoordinates = globalSolver.allPossiblePositions;

                expect(possibleCoordinates).toStrictEqual(expected);
            });
        });

        describe('generatePiecePlacementColumns', () => {
            it('generates columns array for given piece placement', () => {
                const piecePlacement = {
                    piece: piece1,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 0 },
                };
                const pieceColumns = globalSolver.generatePiecePlacementColumns(piecePlacement);
                const expected = [1, 0];

                expect(pieceColumns).toStrictEqual(expected);
            });
        });

        describe('generateLocationColumns', () => {
            it('generates array of location columns for given piece placement', () => {
                const piecePlacement = {
                    piece: piece1,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 0 },
                };
                const pieceColumns = globalSolver.generateLocationColumns(piecePlacement);
                const expected = [0, 0, 1, 0, 1, 0];

                expect(pieceColumns).toStrictEqual(expected);
            });
        });

        describe('generateMatrix', () => {
            it('generates matrix from given piece placements to represent the problem as "exact cover" problem', () => {
                const piecePlacements = [
                    { piece: piece1, variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }], position: { x: 0, y: 0 } },
                    { piece: piece1, variant: [{ x: 0, y: 0 }, { x: 1, y: 1 }], position: { x: 1, y: 0 } },
                    { piece: piece1, variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }], position: { x: 0, y: 0 } },
                    { piece: piece1, variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }], position: { x: 1, y: 0 } },
                    { piece: piece2, variant: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }], position: { x: 0, y: 0 } },
                    { piece: piece2, variant: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 2, y: 0 }], position: { x: 0, y: 0 } },
                ];
                const pieceColumns = globalSolver.generateMatrix(piecePlacements);
                const expected = [
                    [
                        1, 0, 1, 0,
                        0, 0, 1, 0,
                    ],
                    [
                        1, 0, 0, 1,
                        0, 0, 0, 1,
                    ],
                    [
                        1, 0, 0, 1,
                        0, 1, 0, 0,
                    ],
                    [
                        1, 0, 0, 0,
                        1, 0, 1, 0,
                    ],
                    [
                        0, 1, 1, 1,
                        1, 1, 0, 0,
                    ],
                    [
                        0, 1, 0, 0,
                        1, 1, 1, 1,
                    ],
                ];

                expect(pieceColumns).toStrictEqual(expected);
            });
        });

        describe('allPossiblePiecePlacements', () => {
            it('generates all possible coordinates based on size', () => {
                const onePieces = [piece1];
                const onePieceSolver = new PolyominoSolver([3, 2], onePieces);
                const expected = [
                    { piece: piece1, variant: [{ x: 0, y: 0 }, { x: 0, y: 1 }], position: { x: 0, y: 0 } },
                    { piece: piece1, variant: [{ x: 0, y: 0 }, { x: 0, y: 1 }], position: { x: 0, y: 1 } },
                    { piece: piece1, variant: [{ x: 0, y: 0 }, { x: 0, y: 1 }], position: { x: 1, y: 0 } },
                    { piece: piece1, variant: [{ x: 0, y: 0 }, { x: 0, y: 1 }], position: { x: 1, y: 1 } },
                    { piece: piece1, variant: [{ x: 0, y: 0 }, { x: 0, y: 1 }], position: { x: 2, y: 0 } },
                    { piece: piece1, variant: [{ x: 0, y: 0 }, { x: 0, y: 1 }], position: { x: 2, y: 1 } },
                    { piece: piece1, variant: [{ x: 1, y: 0 }, { x: 0, y: 0 }], position: { x: 0, y: 0 } },
                    { piece: piece1, variant: [{ x: 1, y: 0 }, { x: 0, y: 0 }], position: { x: 0, y: 1 } },
                    { piece: piece1, variant: [{ x: 1, y: 0 }, { x: 0, y: 0 }], position: { x: 1, y: 0 } },
                    { piece: piece1, variant: [{ x: 1, y: 0 }, { x: 0, y: 0 }], position: { x: 1, y: 1 } },
                    { piece: piece1, variant: [{ x: 1, y: 0 }, { x: 0, y: 0 }], position: { x: 2, y: 0 } },
                    { piece: piece1, variant: [{ x: 1, y: 0 }, { x: 0, y: 0 }], position: { x: 2, y: 1 } },
                ];
                const possiblePositions = onePieceSolver.allPossiblePiecePlacements;

                expect(possiblePositions).toStrictEqual(expected);
            });
        });

        describe('getSolutions', () => {
            describe('has solutions', () => {
                it('gets row indexes of the first possible solution', () => {
                    const piecePlacements = globalSolver.validPiecePlacements;
                    const matrix = globalSolver.generateMatrix(piecePlacements);
                    globalSolver.getSolutions(matrix);
                    const expected = {
                        value: [6, 7],
                        done: false,
                    };

                    const solution = globalSolver.solutions.next();

                    expect(solution).toStrictEqual(expected);
                });

                it('gets row indexes of the second possible solution if called 2 times', () => {
                    const piecePlacements = globalSolver.validPiecePlacements;
                    const matrix = globalSolver.generateMatrix(piecePlacements);
                    globalSolver.getSolutions(matrix);
                    const expected = {
                        value: [3, 8],
                        done: false,
                    };

                    globalSolver.solutions.next();
                    const solution = globalSolver.solutions.next();

                    expect(solution).toStrictEqual(expected);
                });
            });

            it('gets no solutions when pieces do not fill the board', () => {
                const expected = {
                    value: undefined,
                    done: true,
                };
                const noSolutionSolver = new PolyominoSolver([3, 3], pieces);

                const piecePlacements = noSolutionSolver.validPiecePlacements;
                const matrix = noSolutionSolver.generateMatrix(piecePlacements);

                noSolutionSolver.getSolutions(matrix);
                const solution = noSolutionSolver.solutions.next();

                expect(solution).toStrictEqual(expected);
            });
        });

        describe('solve', () => {
            const $canvasElement = global.document.createElement('canvas');
            $canvasElement.id = 'canvas';
            global.document.body.appendChild($canvasElement);

            describe('increments "solutionCounter" after each call', () => {
                it('increments solutionCounter', () => {
                    const solver = new PolyominoSolver([3, 2], pieces);
                    solver.solve();

                    expect(solver.solutionCounter).toBe(1);
                });

                it('increments solutionCounter to 2 if called 2 times', () => {
                    const solver = new PolyominoSolver([3, 2], pieces);
                    solver.solve();
                    solver.solve();

                    expect(solver.solutionCounter).toBe(2);
                });
            });

            describe('returns correct solution', () => {
                it('returns first solution', () => {
                    const solver = new PolyominoSolver([3, 2], pieces);
                    const expected = {
                        value: [6, 7],
                        done: false,
                    };
                    const solution = solver.solve();

                    expect(solution).toStrictEqual(expected);
                });

                it('returns second solution if called 2 times', () => {
                    const solver = new PolyominoSolver([3, 2], pieces);
                    const expected = {
                        value: [3, 8],
                        done: false,
                    };
                    solver.solve();
                    const solution = solver.solve();

                    expect(solution).toStrictEqual(expected);
                });
            });

            describe('no solution', () => {
                it('returns undefined if there is no solution', () => {
                    const noSolutionSolver = new PolyominoSolver([3, 3], pieces);
                    const solution = noSolutionSolver.solve();

                    expect(solution).toBe(undefined);
                });
            });
        });

        describe('isPiecePlacementInside', () => {
            it('returns true if the given position of the piece is inside the board', () => {
                const piecePlacement = {
                    piece: piece1,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 0 },
                };
                const possibleCoordinates = globalSolver.isPiecePlacementInside(piecePlacement);

                expect(possibleCoordinates).toBe(true);
            });

            it('returns false if the given position of the piece overflows the board', () => {
                const piecePlacement = {
                    piece: piece1,
                    variant: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
                    position: { x: 1, y: 1 },
                };
                const possibleCoordinates = globalSolver.isPiecePlacementInside(piecePlacement);

                expect(possibleCoordinates).toBe(false);
            });
        });
    });
});
