import { Block } from "./block";
import { Point } from "./point";

export const teeBlock: Block = new Block([
    new Point(0, 0),
    new Point(1, 0),
    new Point(1, 1),
    new Point(1, -1)
])

// A simple 1x1 block for testing - might need to be put
// somewhere else, though.
export const singleBlock: Block = new Block([
    new Point(0, 0)
])