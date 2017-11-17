import { Block } from "../block"
import { assert } from "chai";
import { Point } from "../point"

describe('Block', () => {
    const cursor = new Point(0, 0)

    describe('Get position', () => {
        it('should add its offsets to a cursor and return the resulting array', () => {
            const testBlock = new Block([ new Point(1, -1) ])
            const cursor = new Point(3, 2)
            const expected = [ new Point(4, 1) ]

            assert.deepEqual(testBlock.getPositions(cursor), expected)
        })
    })
     
    describe('Rotation', () => {
        it('should rotate all of the offsets clockwise if done once', () => {
            const offsets = [
                new Point(0, 0),
                new Point(0, 1),
                new Point(0, 2),
                new Point(0, 3)
            ]

            const testBlock = new Block(offsets)
            const expected = [
                new Point(0, 0),
                new Point(1, 0),
                new Point(2, 0),
                new Point(3, 0)
            ]

            assert.deepEqual(testBlock.rotateClockwise().getPositions(cursor), expected)
        })

        it('should correctly rotate all of the offsets clockwise if done twice', () => {
            const offsets = [
                new Point(0, 0),
                new Point(0, 1),
                new Point(0, 2),
                new Point(0, 3)
            ]

            const testBlock = new Block(offsets)
            const expected = [
                new Point(0, 0),
                new Point(0, -1),
                new Point(0, -2),
                new Point(0, -3)
            ]

            assert.deepEqual(testBlock.rotateClockwise().rotateClockwise().getPositions(cursor), expected)
        })

        it('should correctly rotate all of the offsets clockwise if done thrice', () => {
            const offsets = [
                new Point(0, 0),
                new Point(0, 1),
                new Point(0, 2),
                new Point(0, 3)
            ]

            const testBlock = new Block(offsets)
            const expected = [
                new Point(0, 0),
                new Point(-1, 0),
                new Point(-2, 0),
                new Point(-3, 0)
            ]

            assert.deepEqual(testBlock.rotateClockwise().rotateClockwise().rotateClockwise().getPositions(cursor), expected)
        })

        it('should correctly rotate the block back to its starting position if rotated clockwise four times', () => {
            const offsets = [
                new Point(0, 0),
                new Point(0, 1),
                new Point(0, 2),
                new Point(0, 3)
            ]

            const testBlock = new Block(offsets)
            const expected = offsets

            assert.deepEqual(testBlock.rotateClockwise().rotateClockwise().rotateClockwise().rotateClockwise().getPositions(cursor), expected)
        })
    })
})