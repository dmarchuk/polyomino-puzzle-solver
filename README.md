# Welcome to Polyomino puzzle solver 
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/facebook/react/blob/master/LICENSE)

> PolyominoSolver for polyomino puzzle implemented in TypeScript with configurable pieces and board size.

#####  [See the demo](https://dmarchuk.github.io/polyomino-puzzle-solver/)

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
This can be done by calling a `Solver.addPiece()` method,  

## API
When you have the solver opened up in your browser (either locally or on demo page), `PolyominoSolver` property will be added to `window` object.
Below you'l find a list of what's available on this object.

### Types referenced in the API


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
###### `color` - string, for example `violet` or `#F0F0F0`.

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
This method will load up some example pieces to `Solver.pieces` se we can use them later.


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

## Author

**Daniel Marchuk**

* Github: [@dmarchuk](https://github.com/dmarchuk)
* LinkedIn: [@danielmarchuk](https://linkedin.com/in/danielmarchuk)


## License

Copyright © 2020 [Daniel Marchuk](https://github.com/dmarchuk).

This project is [MIT](https://github.com/facebook/react/blob/master/LICENSE) licensed.
