import { Container } from "../container"
import { Block } from "../block"
import { Point } from '../point'
import { assert } from "chai"

// A simple 1x1 block for testing
class CursorBlock extends Block {
    constructor() {
        super([new Point(0, 0)])
    }
}

describe('Container', () => {
    describe('get cursor position', () => {
        it('should sum the x and y', () => {
            const container = new Container(10, 24).setCurrentBlock(new CursorBlock)
            const expected = [new Point(3, 3)]

            assert.deepEqual(container.getCursorPositions(new Point(3, 3)), expected)
        })
    })

    describe('valid cursor movement in the bounds of the container', () => {
        let container: Container = null
        const width = 10, height = 24
        const expectedPoint = new Point(Math.max(0, width / 2 - 1), height - 1)

        beforeEach(() => {
            container = new Container(width, height).setCurrentBlock(new CursorBlock())
        })

        it('should default the cursor to (4, 23)', () => {
            const expected = [expectedPoint]

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move left', () => {
            const expected = [expectedPoint.left()]

            container.moveCursorLeft()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move right', () => {
            const expected = [expectedPoint.right()]

            container.moveCursorRight()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move down', () => {
            const expected = [expectedPoint.down()]

            container.moveCursorDown()

            assert.deepEqual(container.getCursorPositions(), expected)
        })
    })

    describe('cursor movement which is blocked by the bounds of the container', () => {
        let container: Container = null
        const expected = [new Point(0, 0)]

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

    describe('tee tests', () => {
        let container: Container = null
        const expected = [new Point(0, 0)]

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

    describe('printing', () => {
        it('prints empty grid correctly', () => {
            const container = new Container(2, 3)
            const expected = '..\n..\n..'

            assert.deepEqual(expected, container.toString())
        })

        it('prints a square correctly', () => {
            const container = new Container(6, 2).setCurrentBlock(new Block([
                new Point(0, 0),
                new Point(0, -1),
                new Point(1, 0),
                new Point(1, -1)
            ]))
            const expected = '..xx..\n..xx..'

            assert.deepEqual(expected, container.toString())
        })

        it('prints block correctly', () => {
            const tee = new Block([
                new Point(0, 0),
                new Point(-1, 0),
                new Point(1, -1),
                new Point(-1, 1)
            ])
            const container = new Container(4, 3).setCurrentBlock(tee)

            const expected = '.x..\nxxx.\n....'
            assert.deepEqual(container.toString(), expected)
        })
    })
})