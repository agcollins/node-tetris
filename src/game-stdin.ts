import { Container, BlockContainer } from "./container";
import { generateRandomBlock } from "./preset-block";
import * as fs from "fs";

const blockStrategy = generateRandomBlock;
const log = true;

let container: BlockContainer = null;
let intervalReset = false;

const loadGameState = () => {
  const options = JSON.parse(fs.readFileSync(".save.json", "utf8"));
  container = new Container(options);
};

const saveGameState = (container: BlockContainer) =>
  fs.writeFileSync(".save.json", JSON.stringify(container));

try {
  loadGameState();
} catch (err) {
  console.log("no load was found");
  container = new Container({ width: 10, height: 20 }).setCurrentBlock(
    generateRandomBlock()
  );
} finally {
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
            container.setCurrentBlock(blockStrategy());
          }
          break;
        case "k":
          intervalReset = true;
          container.rotateCursorClockwise();
          break;
        case " ":
          while (container.getCursorPositions().length !== 0)
            container.moveCursorDown();
          container.setCurrentBlock(blockStrategy());
          break;
        case "x":
          saveGameState(container);
        case "q":
          process.exit(0);
          return;
      }

      if (log) {
        console.clear();
        console.log(container.toString());
        console.log(`score: ${container.getScore()}`);
      }
    }
  });

  setInterval(() => {
    if (intervalReset /* && container.isBlockNearSettle() */)
      return (intervalReset = false);

    if (log) {
      console.clear();
      console.log(container.moveCursorDown().toString());
    }

    if (container.getCursorPositions().length === 0) {
      container.setCurrentBlock(blockStrategy());
    }
  }, 1500);

  process.stdin.on("end", () => {
    process.stdout.write("end");
  });

  if (log) {
    console.clear();
    console.log(container.toString());
    console.log(`score: ${container.getScore()}`);
  }
}
