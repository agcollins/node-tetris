import { Block } from "./block";
import { Point } from "./point";

export const teeBlock = new Block([
    new Point(0, 0),
    new Point(1, 0),
    new Point(1, 1),
    new Point(1, -1)
])

export const ellBlock = new Block([
    new Point(0, 0),
    new Point(0, 1),
    new Point(0, 2),
    new Point(0, 3)
])

// A simple 1x1 block for testing - might need to be put
// somewhere else, though.
export const singleBlock = new Block([
    new Point(0, 0)
])