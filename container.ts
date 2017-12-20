import { Block } from "./block"
import { Point } from "./point"

export class Container {
    private width: number
    private height: number
    private cursor: Point = null
    private currentBlock: Block = null
    private grid : boolean[][] = null

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.grid = new Array(height).fill(false).map(row => Array(width).fill(false))
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

    setCursor(cursor: Point) : Container {
        this.cursor = cursor
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
        return false
    }

    toString() : String {
        const positions = this.getCursorPositions()
        console.log(positions)
        console.log(this.grid)
        console.log(this.grid.map((value, index) => `(${index / this.width}, ${index % this.width})`))
        positions.forEach(position => this.grid[position.y][position.x] = true)
        
        const buffer = Array(this.width * (this.height + 1) - 1) // height + 1 because one newline character and - 1 because no last character

        for (let i = this.height - 1; i >= 0; --i) {
            this.grid[i].forEach(position => buffer.push(position ? 'x' : '.'))
            
            if (i != 0) buffer.push('\n')
        }

        this.getCursorPositions().forEach(position => this.grid[position.y][position.x] = false)

        return buffer.join('')
    }
}
