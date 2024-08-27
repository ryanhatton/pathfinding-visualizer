import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { createWall } from "../../../utils/createWall";
import { destroyWall } from "../../../utils/destroyWall";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";

export const binaryTree = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  setIsDisabled: (disabled: boolean) => void,
  speed: SpeedType
) => {
  createWall(startTile, endTile, speed); // Make initial wall setup
  await sleep(MAX_ROWS * MAX_COLS); // Wait for the wall setup to complete

  for (const row of grid) {
    // Iterate through each row in the grid
    for (const node of row) {
      // Iterate through each node in the row
      if (node.row % 2 === 0 || node.col % 2 === 0) {
        // Check if the node is on an even row or column
        if (!isEqual(node, startTile) && !isEqual(node, endTile)) {
          // Check if the node is not the start or end tile
          node.isWall = true; // Set the node as a wall
        }
      }
    }
  }

  for (let row = 1; row < MAX_ROWS; row += 2) {
    // Iterate through odd rows starting from 1
    for (let col = 1; col < MAX_COLS; col += 2) {
      // Iterate through odd columns starting from 1
      if (row === MAX_ROWS - 2 && col === MAX_COLS - 2) {
        // Skip the bottom-right corner
        continue;
      } else if (row === MAX_ROWS - 2) {
        // If it's the last row, destroy a wall to the right
        await destroyWall(grid, row, col, 1, speed);
      } else if (col === MAX_COLS - 2) {
        // If it's the last column, destroy a wall below
        await destroyWall(grid, row, col, 0, speed);
      } else {
        // Otherwise, randomly destroy a wall to the right or below
        await destroyWall(grid, row, col, getRandInt(0, 2), speed);
      }
    }
  }
  setIsDisabled(false); // Re-enable the UI
};
