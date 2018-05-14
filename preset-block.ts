import { Block } from "./block";
import { Point } from "./point";

export const teeBlock : Block = new Block([
    new Point(0, 0),
    new Point(1, 0),
    new Point(1, 1),
    new Point(1, -1)
])