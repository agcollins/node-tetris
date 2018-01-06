import { Container } from "../container"
import { Block } from "../block"
import { assert } from "chai"
import { Point } from '../point'

// A simple 1x1 block for testing
class CursorBlock extends Block {
    constructor() {
        super([ new Point(0, 0) ])
    }
}

describe('Container movement', () => {
    describe('get cursor position', () => {
        it('should sum the x and y', () => {
            const container = new Container(10, 24).setCurrentBlock(new CursorBlock)
            const expected = [ new Point(3, 3) ]
            
            assert.deepEqual(container.getCursorPositions(new Point(3, 3)), expected)
        })
    })

    describe('valid cursor movement in the bounds of the container', () => {
        let container: Container = null

        beforeEach(() => {
            container = new Container(10, 24).setCurrentBlock(new CursorBlock())
        })

        const startPoint = new Point(0, 4) 

        it('should default the cursor to asdfasdf', () => {
            const expected = [ startPoint ]

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move left', () => {
            const expected = [ startPoint.left() ]

            container.moveCursorLeft()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move right', () => {
            const expected = [ startPoint.right() ]

            container.moveCursorRight()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move down', () => {
            const expected = [ startPoint.down() ]

            container.moveCursorDown()

            assert.deepEqual(container.getCursorPositions(), expected)
        })
    })

    describe('cursor movement which is blocked by the bounds of the container', () => {
        let container: Container = null
        const expected = [ new Point(0, 0) ]

        beforeEach(() => {
            container = new Container(1, 1).setCurrentBlock(new CursorBlock())
        })

        it('should place the cursor at (0, 0)', () => {
            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should not allow movement left', () => {
            container.moveCursorLeft()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should not allow movement right', () => {
            container.moveCursorRight()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should have no cursor after moving down (collision)', () => {
            container.moveCursorDown()

            assert.deepEqual(container.getCursorPositions(), [])
        })
    })
})