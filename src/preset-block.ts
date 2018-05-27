import { Block } from "./block";
import { Point } from "./point";

export const teeBlock = new Block([
  new Point(0, 0),
  new Point(1, 0),
  new Point(1, 1),
  new Point(1, -1)
]);

export const ellBlock = new Block([
  new Point(1, 0),
  new Point(1, -1),
  new Point(0, -1),
  new Point(-1, -1)
]);

export const reverseEllBlock = new Block([
  new Point(1, 0),
  new Point(1, 1),
  new Point(0, 1),
  new Point(-1, 1)
]);

class SquareBlock extends Block {
  constructor() {
    super([new Point(0, 0), new Point(0, 1), new Point(1, 0), new Point(1, 1)]);
  }

  rotateClockwise() {
    return this;
  }

  rotateCounterClockwise() {
    return this;
  }
}

export const squareBlock = new SquareBlock();

export const essBlock = new Block([
  new Point(0, 0),
  new Point(0, 1),
  new Point(1, 0),
  new Point(1, -1)
]);

export const zeeBlock = new Block([
  new Point(0, 0),
  new Point(1, 0),
  new Point(0, 1),
  new Point(-1, 1)
]);

class LineBlock extends Block {
  constructor() {
    super([
      new Point(-1, 0),
      new Point(0, 0),
      new Point(1, 0),
      new Point(2, 0)
    ]);
  }
}

export const lineBlock = new LineBlock();

const generatorBlocks = [
  teeBlock,
  ellBlock,
  squareBlock,
  reverseEllBlock,
  essBlock,
  zeeBlock,
  lineBlock
];

export const generateRandomBlock = () => {
  const getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));
  return generatorBlocks[getRandomInt(generatorBlocks.length)];
};

// A simple 1x1 block for testing - might need to be put
// somewhere else, though.
export const singleBlock = new Block([new Point(0, 0)]);
