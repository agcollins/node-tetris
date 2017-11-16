const Block = require('../block') 
const { assert } = require('chai')

describe('Block', () => {
    describe('Get position', () => {
        it('should add its offsets to a cursor and return the resulting array', () => {
            const testBlock = new Block([{ x: 1, y: -1 }])
            const cursor = { x: 3, y: 2 }
            const expected = { x: 4, y: 1 }

            assert.equal(testBlock.getPositions(cursor), expected)
        })
    })
     
    describe('Rotation', () => {
        it('should rotate all of the offsets clockwise if done once', () => {
            const offsets = [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
            ]

            const testBlock = new Block(offsets)
            const expected = [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 3, y: 0 }
            ]

            assert.equal(testBlock.rotateClockwise().getPositions({ x: 0, y: 0 }), expected)
        })

        it('should correctly rotate all of the offsets clockwise if done twice', () => {
            const offsets = [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
            ]

            const testBlock = new Block(offsets)
            const expected = [
                { x: 0, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: -2 },
                { x: 0, y: -3 }
            ]

            assert.equal(testBlock.rotateClockwise().rotateClockwise().getPositions({ x: 0, y: 0 }), expected)
        })

        it('should correctly rotate all of the offsets clockwise if done thrice', () => {
            const offsets = [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
            ]

            const testBlock = new Block(offsets)
            const expected = [
                { x: 0, y: 0 },
                { x: -1, y: 0 },
                { x: -2, y: 0 },
                { x: -3, y: 0 }
            ]

            assert.equal(testBlock.rotateClockwise().rotateClockwise().rotateClockwise().getPositions({ x: 0, y: 0 }), expected)
        })

        it('should correctly rotate the block back to its starting position if rotated clockwise four times', () => {
            const offsets = [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
            ]

            const testBlock = new Block(offsets)
            const expected = offsets

            assert.equal(testBlock.rotateClockwise().rotateClockwise().rotateClockwise().rotateClockwise().getPositions({ x: 0, y: 0 }), expected)
        })
    })
})