import { Container } from './container'
import { teeBlock } from './preset-block'
import { cursorTo } from 'readline';

const container = new Container(10, 20).setCurrentBlock(teeBlock)
let intervalReset = false

process.stdin.setRawMode(true)

process.stdin.on('readable', () => {
    const readCharacter: string | Buffer = process.stdin.read()

    if (readCharacter !== null) {
        switch(readCharacter.toString()) {
            case 'h':
                container.moveCursorLeft()
                break;
            case 'l':
                container.moveCursorRight()
                break;
            case 'j':
                container.moveCursorDown()
                if (container.getCursorPositions().length === 0) {
                    container.setCurrentBlock(teeBlock)
                }
                break;
            case 'k':
                intervalReset = true
                container.rotateCursorClockwise()
                break;
            case ' ':
                while(container.getCursorPositions().length != 0)
                    container.moveCursorDown()
                container.setCurrentBlock(teeBlock)
                break;
            case 'q':
                process.exit(0)
                return;
        }
        console.log(container.toString())
    }
})

setInterval(() => {
    if (intervalReset /* && container.isBlockNearSettle() */) return intervalReset = false
    console.log(container.moveCursorDown().toString())
    if (container.getCursorPositions().length === 0) {
        container.setCurrentBlock(teeBlock)
    }
}, 2000)

process.stdin.on('end', () => {
    process.stdout.write('end')
})

console.log(container.toString())