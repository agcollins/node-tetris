class Block {
    constructor(offsets) {
        this.offsets = offsets
    }

    getPositions(cursor) {
        return this.offsets.map(offset => ({ x: offset.x + cursor.x, y: offset.y + cursor.y }))
    }

    rotateClockwise() {
        this.offsets = this.offsets.map(offset => ({ x: offset.y, y: -offset.x }))
        return this
    }
}

module.exports = { Block }