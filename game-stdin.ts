import { Container } from "./container";
import { generateRandomBlock } from "./preset-block";

const container = new Container(8, 10).setCurrentBlock(generateRandomBlock());
let intervalReset = false;

process.stdin.setRawMode(true);

process.stdin.on("readable", () => {
  const readCharacter: string | Buffer = process.stdin.read();

  if (readCharacter !== null) {
    switch (readCharacter.toString()) {
      case "h":
        container.moveCursorLeft();
        break;
      case "l":
        container.moveCursorRight();
        break;
      case "j":
        container.moveCursorDown();
        if (container.getCursorPositions().length === 0) {
          container.setCurrentBlock(generateRandomBlock());
        }
        break;
      case "k":
        intervalReset = true;
        container.rotateCursorClockwise();
        break;
      case " ":
        while (container.getCursorPositions().length !== 0)
          container.moveCursorDown();
        container.setCurrentBlock(generateRandomBlock());
        break;
      case "q":
        process.exit(0);
        return;
    }
    console.clear();
    console.log(container.toString());
    console.log(`score: ${container.getScore()}`);
  }
});

setInterval(() => {
  if (intervalReset /* && container.isBlockNearSettle() */)
    return (intervalReset = false);
  console.clear();
  console.log(container.moveCursorDown().toString());
  if (container.getCursorPositions().length === 0) {
    container.setCurrentBlock(generateRandomBlock());
  }
}, 6000);

process.stdin.on("end", () => {
  process.stdout.write("end");
});

console.clear();
console.log(container.toString());
console.log(`score: ${container.getScore()}`);
