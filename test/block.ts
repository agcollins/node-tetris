import { Block } from "../block"
import { assert } from "chai"
import { Point } from "../point"

describe('Block', () => {
    const cursor = new Point(0, 0)
    const offsets = [
        new Point(0, 0),
        new Point(0, 1),
        new Point(0, 2),
        new Point(0, 3)
    ]
    const testBlock = new Block(offsets)

    describe('Get position', () => {
        it('should add its offsets to a cursor and return the resulting array', () => {
            const positionTestBlock = new Block([new Point(1, -1)])
            const cursor = new Point(3, 2)
            const expected = [new Point(4, 1)]

            assert.deepEqual(positionTestBlock.getPositions(cursor), expected)
        })
    })

    describe('Rotation', () => {
        describe('Clockwise', () => {
            it('should rotate all of the offsets clockwise if done once', () => {
                const expected = [
                    new Point(0, 0),
                    new Point(1, 0),
                    new Point(2, 0),
                    new Point(3, 0)
                ]

                assert.deepEqual(testBlock.rotateClockwise().getPositions(cursor), expected)
            })

            it('should correctly rotate all of the offsets clockwise if done twice', () => {
                const expected = [
                    new Point(0, 0),
                    new Point(0, -1),
                    new Point(0, -2),
                    new Point(0, -3)
                ]

                assert.deepEqual(testBlock.rotateClockwise().rotateClockwise().getPositions(cursor), expected)
            })

            it('should correctly rotate all of the offsets clockwise if done thrice', () => {
                const expected = [
                    new Point(0, 0),
                    new Point(-1, 0),
                    new Point(-2, 0),
                    new Point(-3, 0)
                ]

                assert.deepEqual(testBlock.rotateClockwise().rotateClockwise().rotateClockwise().getPositions(cursor), expected)
            })

            it('should correctly rotate the block back to its starting position if rotated clockwise four times', () => {
                const expected = offsets

                assert.deepEqual(testBlock.rotateClockwise().rotateClockwise().rotateClockwise().rotateClockwise().getPositions(cursor), expected)
            })
        })

        describe('Counter-clockwise', () => {
            it('should correctly rotate counter-clockwise if done once', () => {
                assert.deepEqual(testBlock.rotateCounterClockwise(), testBlock.rotateClockwise().rotateClockwise().rotateClockwise())
            })

            it('should correctly rotate counter-clockwise if done twice', () => {
                assert.deepEqual(testBlock.rotateCounterClockwise().rotateCounterClockwise(), testBlock.rotateClockwise().rotateClockwise())
            })

            it('should correctly rotate counter-clockwise if done thrice', () => {
                assert.deepEqual(testBlock.rotateCounterClockwise().rotateCounterClockwise().rotateCounterClockwise(), testBlock.rotateClockwise())
            })

            it('should correctly rotate counter-clockwise if done four times', () => {
                assert.deepEqual(testBlock.rotateCounterClockwise().rotateCounterClockwise().rotateCounterClockwise().rotateCounterClockwise(), testBlock)
            })
        })
    })
})