import { Point } from "./point"

export class Block {
    private offsets: Point[]

    constructor(offsets: Point[]) {
        this.offsets = offsets
    }

    getPositions(cursor: Point) : Point[] {
        return this.offsets.map(offset => ({ x: offset.x + cursor.x, y: offset.y + cursor.y }))
    }

    rotateClockwise() : Block {
        this.offsets = this.offsets.map(offset => new Point(offset.y, - offset.x))
        return this
    }
}