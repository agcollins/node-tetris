import { Block } from "./block";
import { Point } from "./point";

export interface BlockContainer {
  setCurrentBlock(block: Block): Container;
  moveLeft(): Container;
  moveRight(): Container;
  moveDown(): Container;
  toString(): String;
}

export class Container implements BlockContainer {
  private width: number;
  private height: number;
  private cursor: Point = null;
  private currentBlock: Block;
  private grid: boolean[][];
  private blockQueue: Block[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = new Array(height)
      .fill(false)
      .map(row => Array(width).fill(false));
    this.blockQueue = new Array(100);
    
    for(let i = 0; i < 7; this.blockQueue[i++] = generateRandomBlock())
  }

  setCurrentBlock(block: Block): Container {
    this.currentBlock = block;

    const column = Math.max(0, Math.floor(this.width / 2) - 1);
    const row = 0;

    this.currentBlock.move(new Point(row, column));
    return this;
  }

  moveLeft(): Container {
    //this.moveCursor(this.cursor.left());
    this.move(this.currentBlock.left());
    return this;
  }

  moveRight(): Container {
    this.move(this.currentBlock.left());
    return this;
  }

  moveDown(): Container {
    const testBlock = this.currentBlock.down();
    if (!this.move(testBlock)) {
      testBlock.getPositions().forEach(({ x, y }) => (this.grid[x][y] = true));
    }
    return this;
  }

  private move(testBlock: Block): boolean {
    if (!testBlock || this.blockCollision(testBlock)) return false;

    this.currentBlock = testBlock;
    return true;
  }

  private blockCollision(testBlock: Block): boolean {
    return testBlock
      .getPositions()
      .some(
        position =>
          this.outOfBounds(position) ||
          this.blockSettledAtPosition(position.x, position.y)
      );
  }

  private blockSettledAtPosition(row: number, column: number): boolean {
    return this.grid[row][column];
  }

  private setteBlock(row: number, column: number): void {
    this.grid[row][column] = true;
  }

  // Should this be a method in point -- and pass in width / height?
  private outOfBounds(point: Point): boolean {
    if (point.y < 0) return true;
    if (point.x >= this.height) return true;
    if (point.y >= this.width) return true;
    return false;
  }

  toString(): String {
    const positions = this.currentBlock.getPositions();
    const gridCopy = this.grid.slice();
    const buffer = Array(this.width * (this.height + 1) - 1); // height + 1 because one newline character and - 1 because no last character

    // this should probably use setteBlock
    positions.forEach(position => (gridCopy[position.x][position.y] = true));

    for (let i = 0; i < this.height; ++i) {
      gridCopy[i].forEach(position => buffer.push(position ? "x" : "."));

      if (i != this.height - 1) buffer.push("\n");
    }

    return buffer.join("");
  }
}
