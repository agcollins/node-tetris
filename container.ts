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
    getScore(): number
    toString(): String
}

export class Container implements BlockContainer {
    private width: number
    private height: number
    private cursor: Point = null
    private currentBlock: Block = null
    private grid: boolean[][] = null
    private score: number

    constructor(width: number, height: number) {
        this.score = 0
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
            this.score += this.scanRows()
        }
        return this
    }

    // Naive row scanning and clearing algorithm
    private scanRows = (): number => {
        let count = 0
        this.grid.forEach((row: boolean[], rowIndex: number) => {
            if (row.every((value: boolean, columnIndex: number) => value)) {
                ++count
                for (let i = rowIndex; i > 0; --i) {
                    for (let j = 0; j < this.width; ++j) {
                        this.grid[i][j] = this.grid[i - 1][j] // maybe?
                    }
                }
            }
        })

        return count
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
            if (this.outOfBoundsNonTop(position)) return true
            if (this.outOfBoundsTop(position)) return false
            return this.grid[position.x][position.y] // This condition may not be combined because of array evaluation
        })
    }

    // Should this be a method in point -- and pass in width / height?
    private outOfBoundsTop = (point: Point): boolean => {
        if (point.x < 0) return true
        return false
    }
    
    private outOfBoundsNonTop = (point: Point): boolean => {
        if (point.y < 0) return true
        if (point.x >= this.height) return true
        if (point.y >= this.width) return true
        return false
    }

    // returns null if no point can be found, otherwise returns the first available point relative to the cursor
    private moveTwoBack = (rotatedBlock: Block, directionFunction: (cursor: Point) => Point): Point | null => {
        // Check the current position.
        if (!this.blockCollision(this.cursor, rotatedBlock)) return this.cursor

        // Check one position back.
        const firstTry: Point = directionFunction(this.cursor)
        if (!this.blockCollision(firstTry, rotatedBlock)) return firstTry

        // Check two positions back.
        const secondTry: Point = directionFunction(firstTry)
        if (!this.blockCollision(secondTry, rotatedBlock)) return secondTry

        // No open position was found
        return null
    }

    rotateCursorClockwise = () => {
        if (this.currentBlock) {
            const newBlock: Block = this.currentBlock.rotateClockwise()
            let newCursor: Point = this.moveTwoBack(newBlock, (cursor: Point) => cursor.right())

            if (newCursor !== null) {
                this.cursor = newCursor
                this.currentBlock = newBlock
            } else if (newCursor = this.moveTwoBack(newBlock, (cursor: Point) => cursor.up())) {
                this.cursor = newCursor
                this.currentBlock = newBlock
            } else if (newCursor = this.moveTwoBack(newBlock, (cursor: Point) => cursor.left())) {
                this.cursor = newCursor
                this.currentBlock = newBlock
            }
        }

        return this
    }

    rotateCursorCounterClockwise = () => {
        if (this.currentBlock) {
            const newBlock: Block = this.currentBlock.rotateCounterClockwise()
            let newCursor: Point = this.moveTwoBack(newBlock, (cursor: Point) => cursor.left())

            if (newCursor !== null) {
                this.cursor = newCursor
                this.currentBlock = newBlock
            } else if (newCursor = this.moveTwoBack(newBlock, (cursor: Point) => cursor.up())) {
                this.cursor = newCursor
                this.currentBlock = newBlock
            } else if (newCursor = this.moveTwoBack(newBlock, (cursor: Point) => cursor.right())) {
                this.cursor = newCursor
                this.currentBlock = newBlock
            }
        }

        return this
    }

    toString(): String {
        const positions = this.getCursorPositions()
        positions.forEach(position => {
            if (this.outOfBoundsNonTop(position) || this.outOfBoundsTop(position)) return
            this.grid[position.x][position.y] = true
        })

        const buffer = Array(this.width * (this.height + 1) - 1) // height + 1 because one newline character and - 1 because no last character

        for (let i = 0; i < this.height; ++i) {
            this.grid[i].forEach(position => buffer.push(position ? 'x' : '.'))

            if (i != this.height - 1) buffer.push('\n')
        }

        positions.forEach(position => {
            if (this.outOfBoundsNonTop(position) || this.outOfBoundsTop(position)) return
            this.grid[position.x][position.y] = false
        })

        return buffer.join('')
    }

    getScore = (): number =>  {
        return this.score
    }
}
