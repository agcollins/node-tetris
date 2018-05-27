import { Point } from "./point";

export class Block {
  private offsets: Point[];

  constructor(offsets: Point[]) {
    this.offsets = offsets;
  }

  getPositions(cursor: Point): Point[] {
    return this.offsets.map(
      offset => new Point(offset.x + cursor.x, offset.y + cursor.y)
    );
  }

  rotateClockwise(): Block {
    return new Block(
      this.offsets.map(offset => new Point(offset.y, -offset.x))
    );
  }

  rotateCounterClockwise(): Block {
    return new Block(
      this.offsets.map(offset => new Point(-offset.y, offset.x))
    );
  }
}
