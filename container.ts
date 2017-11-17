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
        this.moveCursor(this.cursor.left())
        return this
    }

    moveCursorRight() : Container {
        this.moveCursor(this.cursor.right())
        return this
    }

    moveCursorDown() : Container {
        if (!this.moveCursor(this.cursor.down())) {
            this.currentBlock = null
            this.resetCursor()
        }
        return this
    }
    
    private moveCursor(newCursor: Point) : boolean {
        if (this.blockCollision(newCursor)) return false
 
        this.cursor = newCursor
        return true
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
        return false
    }
}
