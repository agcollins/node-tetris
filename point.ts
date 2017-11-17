export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    left() : Point {
        return new Point(this.x - 1, this.y)
    }

    right() : Point {
        return new Point(this.x + 1, this.y)
    }

    down() : Point {
        return new Point(this.x, this.y - 1)
    }
}