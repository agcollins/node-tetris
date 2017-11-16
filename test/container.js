const { Container } = require('../container')
const { Block } = require('../block')
const { assert } = require('chai')

// A simple 1x1 block for testing
class CursorBlock extends Block {
    constructor() {
        super({ x: 0, y: 0 })
    }
}

describe('Container', () => {
    describe('valid cursor movement in the bounds of the container', () => {
        let container = null

        beforeEach(() => {
            container = new Container(8, 16).addBlock(new CursorBlock())
        })

        it('should default the cursor to (3, 15)', () => {
            const expected = [{ x: 3, y: 15 }]

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move left', () => {
            const expected = [{ x: 2, y: 15 }]

            container.moveCursorLeft()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move right', () => {
            const expected = [{ x: 4, y: 15 }]

            container.moveCursorRight()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move down', () => {
            const expected = [{ x: 4, y: 14 }]

            container.moveCursorDown()

            assert.deepEqual(container.getCursorPositions(), expected)
        })
    })

    describe('cursor movement which is blocked by the bounds of the container', () => {
        let container = null
        const expected = [{ x: 0, y: 1 }]

        beforEach(() => {
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

            assert.equal(container.getCursorPositions(), null)
        })
    })
})