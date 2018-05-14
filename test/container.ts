import { Container } from "../container"
import { Block } from "../block"
import { assert } from "chai"
import { Point } from '../point'
import { teeBlock } from '../preset-block'

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
        const startPoint = new Point(0, 4) 

        beforeEach(() => {
            container = new Container(10, 24).setCurrentBlock(new CursorBlock())
        })

        it('should default the cursor to (0, 4)', () => {
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

describe('Container printing', () => {
    describe('empty container', () => {
        const container = new Container(4, 2)

        it('should print an empty grid', () => {
            const expected = '....\n....'

            assert.deepEqual(container.toString(), expected)
        })
    })

    describe('with a 1x1 block', () => {
        let container : Container = null

        beforeEach(() => {
            container = new Container(4, 2)
            container.setCurrentBlock(new Block([ new Point(0, 0) ]))
        })

        it('should print the grid and block', () => {
            const expected = '.x..\n....'

            assert.deepEqual(container.toString(), expected)
        })

        it('should print after moving down', () => {
            const expected = '....\n.x..'
            container.moveCursorDown()

            assert.deepEqual(container.toString(), expected)
        })

        it('should print after moving right', () => {
            const expected = '..x.\n....'
            container.moveCursorRight()

            assert.deepEqual(container.toString(), expected)
        })

        it('should print after moving left', () => {
            const expected = 'x...\n....'
            container.moveCursorLeft()

            assert.deepEqual(container.toString(), expected)
        })
    })

    describe('with a tee block', () => {
        let container : Container = null

        beforeEach(() => {
            container = new Container(4, 3)
            container.setCurrentBlock(teeBlock)
        })

        it('should print the grid and block', () => {
            const expected = '.x..\nxxx.\n....'

            assert.deepEqual(container.toString(), expected)
        })

        it('should print after moving right', () => {
            const expected = '..x.\n.xxx\n....'
            container.moveCursorRight()

            assert.deepEqual(container.toString(), expected)
        })

        it('should print after moving left (should not move)', () => {
            const expected = '.x..\nxxx.\n....'
            container.moveCursorLeft()

            assert.deepEqual(container.toString(), expected)
        })

        it('should print after moving down', () => {
            const expected = '....\n.x..\nxxx.'
            container.moveCursorDown()

            assert.deepEqual(container.toString(), expected)
        })
    })

    describe('container set cursor', () => {
        let container: Container = null

        beforeEach(() => container = new Container(3, 3))

        it('should set the cursor', () => {
            const expected = new Point(0, 0)

            container.setCursor(expected)
            const actual: Point = container.setCurrentBlock(new CursorBlock()).getCursorPositions()[0]

            assert.deepEqual(actual, expected)
        }) 
    })
})
