import { binaryTree } from "../lib/algorithms/maze/binaryTree";
import recursiveDivision from "../lib/algorithms/maze/recursiveDivision";
import { MAX_COLS, MAX_ROWS, SPEEDS } from "./constants";
import { constructBorder } from "./constructBorder";
import { GridType, MazeType, SpeedType, TileType } from "./types";
import { ellersAlgorithm } from "../lib/algorithms/maze/ellers";
import { kruskalAlgorithm } from "../lib/algorithms/maze/kruskal";
import { recursiveBacktrackerAlgorithm } from "../lib/algorithms/maze/recursiveBacktracker";

export const runMazeAlgorithm = async ({
  maze,
  grid,
  startTile,
  endTile,
  setIsDisabled,
  speed,
}: {
  maze: MazeType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
}) => {
  if (maze == "BINARY_TREE") {
    await binaryTree(grid, startTile, endTile, setIsDisabled, speed);
  } else if (maze === "RECURSIVE_DIVISION") {
    const currentSpeed = SPEEDS.find((s) => s.value === speed)!.value ?? 2;
    await constructBorder(grid, startTile, endTile);
    await recursiveDivision({
      grid,
      startTile,
      endTile,
      row: 1,
      col: 1,
      height: Math.floor((MAX_ROWS - 1) / 2),
      width: Math.floor((MAX_COLS - 1) / 2),
      setIsDisabled,
      speed,
    });
    setTimeout(() => {
      setIsDisabled(false);
    }, 800 * currentSpeed);
  } else if (maze === "ELLERS") {
    await ellersAlgorithm(grid, setIsDisabled, speed);
  } else if (maze === "KRUSKAL") {
    await kruskalAlgorithm(grid, setIsDisabled, speed);
  } else if (maze === "RECURSIVE_BACKTRACKER") {
    await recursiveBacktrackerAlgorithm(grid, startTile, endTile, setIsDisabled, speed);
  }
};
