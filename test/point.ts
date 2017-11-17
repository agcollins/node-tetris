import { Point } from "../point"
import { assert } from "chai"

describe('Point', () => {
    describe('left', () => {
        it('should get a position', () => {
            const startPoint = new Point(0, 0)

            assert.deepEqual(startPoint.left(), new Point(-1, 0))
        })

        it('should not modify the original point', () => {
            const startPoint = new Point(0, 0)

            startPoint.left()

            assert.deepEqual(startPoint, new Point(0, 0))
        })
    })

    describe('right', () => {
        it('should get a position', () => {
            const startPoint = new Point(0, 0)

            assert.deepEqual(startPoint.right(), new Point(1, 0))
        })

        it('should not modify the original point', () => {
            const startPoint = new Point(0, 0)

            startPoint.left()

            assert.deepEqual(startPoint, new Point(0, 0))
        })
    })

    describe('down', () => {
        it('should get a position', () => {
            const startPoint = new Point(0, 0)

            assert.deepEqual(startPoint.down(), new Point(0, -1))
        })

        it('should not modify the original point', () => {
            const startPoint = new Point(0, 0)

            startPoint.down()

            assert.deepEqual(startPoint, new Point(0, 0))
        })
    })
})