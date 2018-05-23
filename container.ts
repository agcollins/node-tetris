import { Block } from "./block"
import { Point } from "./point"

export interface BlockContainer {
    setCurrentBlock(block: Block): Container;
    moveCursorLeft(): Container
    moveCursorRight(): Container
    moveCursorDown(): Container
    setCursor(cursor: Point): Container
    getCursorPositions(cursor: Point): Point[]
    rotateCursorClockwise(directionStategy: (newBlock: Block, directionFunction: (point: Point) => Point) => Point): Container
    rotateCursorCounterClockwise(directionStategy: (newBlock: Block, directionFunction: (point: Point) => Point) => Point): Container
    toString(): String
}

export class Container implements BlockContainer {
    private width: number
    private height: number
    private cursor: Point = null
    private currentBlock: Block = null
    private grid: boolean[][] = null

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.grid = new Array(height).fill(false).map(row => Array(width).fill(false))
        this.resetCursor()
    }

    setCurrentBlock = (block: Block): Container => {
        this.currentBlock = block
        return this
    }

    moveCursorLeft = (): Container => {
        this.moveCursor(this.cursor.left())
        return this
    }

    moveCursorRight = (): Container => {
        this.moveCursor(this.cursor.right())
        return this
    }

    moveCursorDown = (): Container => {
        if (!this.moveCursor(this.cursor.down())) {
            this.getCursorPositions().forEach(({ x, y }) => this.grid[x][y] = true)
            this.currentBlock = null
            this.resetCursor()
        }
        return this
    }

    private moveCursor = (newCursor: Point): boolean => {
        if (!this.currentBlock || this.blockCollision(newCursor, this.currentBlock)) return false

        this.cursor = newCursor
        return true
    }

    setCursor = (cursor: Point): Container => {
        this.cursor = cursor
        return this
    }

    getCursorPositions = (cursor: Point = this.cursor, block: Block = this.currentBlock): Point[] => {
        if (!block || !cursor) return []
        return block.getPositions(cursor)
    }

    private resetCursor = (): Container => {
        const column = Math.max(0, Math.floor(this.width / 2) - 1)
        const row = 0

        this.cursor = new Point(row, column)
        return this
    }

    private blockCollision = (newCursor: Point, newBlock: Block): boolean => {
        return this.getCursorPositions(newCursor, newBlock).some(position => {
            if (this.outOfBounds(position)) return true
            return this.grid[position.x][position.y] // These two conditions may not be combined because of array evaluation
        })
    }

    // Should this be a method in point -- and pass in width / height?
    private outOfBounds = (point: Point): boolean => {
        if (point.y < 0) return true
        if (point.x >= this.height) return true
        if (point.x < 0) return true
        if (point.y >= this.width) return true
        return false
    }

    // returns null if no point can be found, otherwise returns the first available spot
    private moveTwoBack = (newBlock: Block, directionFunction: (cursor: Point) => Point): Point | null => {
        // Check the current position.
        if (!this.blockCollision(this.cursor, newBlock)) return this.cursor

        // Check one position back.
        const firstTry: Point = directionFunction(this.cursor)
        if (!this.blockCollision(firstTry, newBlock)) return firstTry

        // Check two positions back.
        const secondTry: Point = directionFunction(firstTry)
        if (!this.blockCollision(secondTry, newBlock)) return secondTry

        // No open position was found
        return null
    }

    rotateCursorClockwise = () => {
        if (this.currentBlock) {
            const newBlock: Block = this.currentBlock.rotateClockwise()
            const newCursor: Point = this.moveTwoBack(newBlock, (cursor: Point) => cursor.right())

            if (newCursor !== null) {
                this.cursor = newCursor
                this.currentBlock = newBlock
            }
        }

        return this
    }

    rotateCursorCounterClockwise = () => {
        if (this.currentBlock) {
            const newBlock: Block = this.currentBlock.rotateCounterClockwise()
            const newCursor: Point = this.moveTwoBack(newBlock, (cursor: Point) => cursor.left())

            if (newCursor !== null) {
                this.cursor = newCursor
                this.currentBlock = newBlock
            }
        }

        return this
    }

    toString(): String {
        const positions = this.getCursorPositions()
        positions.forEach(position => {
            // console.log(position)
            if (this.outOfBounds(position)) return
            this.grid[position.x][position.y] = true
        })

        const buffer = Array(this.width * (this.height + 1) - 1) // height + 1 because one newline character and - 1 because no last character

        for (let i = 0; i < this.height; ++i) {
            this.grid[i].forEach(position => buffer.push(position ? 'x' : '.'))

            if (i != this.height - 1) buffer.push('\n')
        }

        positions.forEach(position => {
            if (this.outOfBounds(position)) return
            this.grid[position.x][position.y] = false
        })

        return buffer.join('')
    }
}
