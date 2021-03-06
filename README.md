# Polyomino puzzle solver 
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/facebook/react/blob/master/LICENSE)

Polyomino solver for polyomino puzzle implemented in TypeScript with configurable pieces and board size. This was done for fun to better understand this interesting problem related to "exact cover" problem. In order to solve the "exact cover" problem here, I used [dlxlibjs](https://github.com/taylorjg/dlxlibjs) library from [taylorjg](https://github.com/taylorjg), as he did in his example.

#####  [See the demo](https://dmarchuk.github.io/polyomino-puzzle-solver/)

If you're more interested in the exact cover/dancing links, here are some resources that I found interesting:

- [Stanford Lecture: Don Knuth—"Dancing Links" (2018)](https://www.youtube.com/watch?v=_cR9zDlvP88)
- [Nice writeup on dancing links and algorithm X](https://garethrees.org/2007/06/10/zendoku-generation/#section-4)
- [Exact cover writeup (examples with python)](https://garethrees.org/2015/11/09/exact-cover/)
- [Solve the Pentomino puzzle with C++ and dancing links](https://www.codeproject.com/Articles/271634/Puzzle-Solver)

## How to get set up
```sh
# Clone the repository
git clone https://github.com/dmarchuk/polyomino-puzzle-solver

# Go to the folder
cd polyomino-puzzle-solver

# Install all the dependencies
yarn install

# Start the development server
yarn start
```

Now you should have a webpack development server running on http://localhost:8080.

## Usage
To see the solver in action, either go to [demo page](https://dmarchuk.github.io/polyomino-puzzle-solver/) or [start the development server locally](#how-to-get-set-up).

### Run example solution
To run the example solution, either click on the "Try example solution" button or open up a console and run this command:
```javascript
Solver.generateExampleSolution();
```

### Running with custom pieces and board size
To run the solver with your custom pieces and board size, you must first configure your pieces.
This can be done by calling a `Solver.addPiece()` method with the coordinates and optional color:
```javascript
Solver.addPiece([{ x: 0, y: 0 }, { x: 0, y: 1 }], 'green');
Solver.addPiece([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], 'grey');
```

This will add green piece:
```
##
```

And a grey piece:
```
###
  #
```

Once you have the desired pieces set up, create solver board by calling `Solver.createSolver();` with an array where first element is the board width and second is board height, like so:
```javascript
Solver.createSolver([2, 3]);
```

After that, you can either click on "Solve" button to generate a solution or run `Solver.solve();` command in the console. In this particular example, you should see a generated solution.
If you click on the "Solve" button again or run the `Solve.solve();` command again, you should see another generated solution.

## API
When you have the solver opened up in your browser (either locally or on demo page), `PolyominoSolver` property will be added to `window` object.
Below you'll find a list of what's available on this object.

#### **`Solver.pieces`**  
This will get you the list of the current pieces that are set up in the solver.

#### **`Solver.addPieces(coordinates: Coordinates[], color?: string)`**  
This will add the piece with given coordinates and color to the `Solver.piece` list.

###### `coordinates` - array of `Coordinate` objects, which is an object with properties `x` and `y`, both are numbers. Example:
```javascript
[{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 1, y: 3 }]
```

This generates a piece with an L-like shape:
```
# 
# 
# 
##
```
###### `color` - string, for example `violet` or `#F0F0F0`. This is optional, if not provided, random color will be generated.

#### **`Solver.createSolver(size: [number, number])`**  
This will create a solver object with defined pieces and given board size.

###### `size` - array with two numbers, first number is the board width and second number is board height. Example:
```javascript
// Create a board with width 4 and height 5 with total number of 20 tiles.
Solver.createSolver([4, 5]);
```

#### **`Solver.solve()`**
This method will try to find a solution for the given board size and given pieces, if there is a solution, it will be drawn on the canvas.
Every consecutive call will try to find the next solution.

#### **`Solver.loadExamplePieces()`**
This method will load up some example pieces to `Solver.pieces` se we can use them later. You can see these piece definitions [here](https://github.com/dmarchuk/polyomino-puzzle-solver/blob/master/src/constants.ts#L3).


#### **`Solver.generateExampleSolution()`**
This method will generate an example solution with pieces loaded by `Solver.loadExamplePieces()` and board size 8x8 and draw this solution on the canvas.


## Commands

### Install dependencies

```sh
yarn install
```

### Start a development server

```sh
yarn start
```

This will start a development server on http://localhost:8080.

### Integrate - should be called for example in case of CI (runs linter, tests and build the bundle)

```sh
yarn integrate
```

### Build the bundle

```sh
yarn build
```

### Run tests

```sh
yarn test
```

### Check test coverage

```sh
yarn test:coverage
```

### Run linter

```sh
yarn lint
```

## Some things that should be finished:
- [ ] Tests for PolyominoSolver.ts - most crucial parts are tested, but some things are not, especially the correct drawing on canvas should be tested.
- [ ] Display the current pieces in a sidebar.
- [ ] Application.ts should have an option to delete a piece by given index.
- [ ] User should be able to delete a piece from the pieces sidebar.
- [ ] Some more intuitive way of adding pieces.

## Author

**Daniel Marchuk**

* Github: [@dmarchuk](https://github.com/dmarchuk)
* LinkedIn: [@danielmarchuk](https://linkedin.com/in/danielmarchuk)


## License

Copyright © 2020 [Daniel Marchuk](https://github.com/dmarchuk).

This project is [MIT](https://github.com/facebook/react/blob/master/LICENSE) licensed.
