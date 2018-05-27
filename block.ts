import { Point } from "./point";

export class Block {
  private offsets: Point[];
  private cursor: Point;

  constructor(offsets: Point[], initialPosition?: Point) {
    this.offsets = offsets;
    this.cursor = initialPosition || new Point(0, 0);
  }

  getPositions(): Point[] {
    return this.offsets.map(
      offset => new Point(offset.x + this.cursor.x, offset.y + this.cursor.y)
    );
  }

  move(newPosition: Point): Block {
    this.cursor = newPosition;
    return this;
  }

  left(): Block {
    return new Block(this.offsets.slice(), this.cursor.left());
  }

  right(): Block {
    return new Block(this.offsets.slice(), this.cursor.right());
  }

  down(): Block {
    return new Block(this.offsets.slice(), this.cursor.down());
  }

  rotateClockwise(): Block {
    this.offsets = this.offsets.map(offset => new Point(offset.y, -offset.x));
    return this;
  }
}
