import { Block } from "./block"
import { Point } from "./point"

export class Line extends Block {
    constructor() {
        super([
            new Point(0, 0),
            new Point(0, -1),
            new Point(0, -2),
            new Point(0, -3)
        ])
    }
}

export class Square extends Block {
    constructor() {
        super([
            new Point(0, 0),
            new Point(1, 0),
            new Point(0, -1),
            new Point(1, -1)
        ])
    }
}

export class Tee extends Block {
    constructor() {
        super([
            new Point(0, 0),
            new Point(-1, 0),
            new Point(1, -1),
            new Point(-1, -1)
        ])
    }
}

export class Ess extends Block {
    constructor() {
        super([
            new Point(0, 0),
            new Point(1, 0),
            new Point(0, -1),
            new Point(-1, -1)
        ])
    }
}

export class Zee extends Block {
    constructor() {
        super([
            new Point(0, 0),
            new Point(-1, 0),
            new Point(0, -1),
            new Point(1, -1)
        ])
    }
}

export class Ell extends Block {
    constructor() {
        super([
            new Point(1, 0),
            new Point(1, -1),
            new Point(0, -1),
            new Point(-1, -1)
        ])
    }
}

export class Jay extends Block {
    constructor() {
        super([
            new Point(1, -1),
            new Point(0, -1),
            new Point(-1, 0),
            new Point(-1, -1)
        ])
    }
}
