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
    describe('cursor in the container', () => {
        let container = null

        beforeEach(() => {
            container = new Container(8, 16).addBlock(new CursorBlock())
        })

        it('should default the cursor to (4, 16)', () => {
            const expected = [{ x: 4, y: 16 }]

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move left', () => {
            const expected = [{ x: 3, y: 16 }]

            container.addBlock(new CursorBlock()).moveCursorLeft()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move right', () => {
            const expected = [{ x: 3, y: 16 }]

            container.addBlock(new CursorBlock()).moveCursorRight()

            assert.deepEqual(container.getCursorPositions(), expected)
        })

        it('should allow the cursor to move down', () => {
            const expected = [{ x: 4, y: 15 }]

            container.addBlock(new CursorBlock()).moveCursorDown()

            assert.deepEqual(container.getCursorPositions(), expected)
        })
    })
})