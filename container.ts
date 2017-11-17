import { Block } from "./block"
import { Point } from "./point"

export class Container {
    private width: number
    private height: number
    private cursor: Point = null
    private currentBlock: Block = null

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.resetCursor()
    }

    setCurrentBlock(block: Block) : Container {
        this.currentBlock = block
        return this
    }

    moveCursorLeft() : Container {
        const newCursor = new Point(this.cursor.x - 1, this.cursor.y)
        if (!this.blockCollision(newCursor))
            this.cursor = newCursor
        return this
    }

    moveCursorRight() : Container {
        const newCursor = new Point(this.cursor.x + 1, this.cursor.y)
        if (!this.blockCollision(newCursor))
            this.cursor = newCursor
        return this
    }

    moveCursorDown() : Container {
        const newCursor = new Point(this.cursor.x, this.cursor.y - 1)
        if (!this.blockCollision(newCursor))
            this.cursor = newCursor
        else {
            this.currentBlock = null
            this.resetCursor()
        }
        return this
    }

    getCursorPositions(newCursor: Point = this.cursor) : Point[] {
        if (!this.currentBlock) return []
        return this.currentBlock.getPositions(newCursor)
    }

    private resetCursor() : Container {
        const newX = Math.max(0, Math.floor(this.width / 2) - 1)
        const newY = this.height - 1

        this.cursor = new Point(newX, newY)
        return this
    }

    private blockCollision(newCursor: Point) : boolean {
        return this.getCursorPositions(newCursor).some(position => this.outOfBounds(position))
    }

    private outOfBounds(point: Point) : boolean {
        if (point.x < 0) return true
        if (point.x >= this.width) return true
        if (point.y < 0) return true
        if (point.y >= this.height) return true // not really possible
        return false
    }
}