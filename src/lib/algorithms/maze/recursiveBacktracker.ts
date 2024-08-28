import {
  MAX_COLS,
  MAX_ROWS,
  SPEEDS,
  TILE_STYLE,
  WALL_TILE_STYLE,
} from "../../../utils/constants";
import { sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";

interface Cell {
  row: number;
  col: number;
}

export const recursiveBacktrackerAlgorithm = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  setIsDisabled: (disabled: boolean) => void,
  speed: SpeedType
) => {
  try {
    // Create initial walls
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        if (
          (row !== startTile.row || col !== startTile.col) &&
          (row !== endTile.row || col !== endTile.col)
        ) {
          await createWall(grid, row, col, speed);
        }
      }
    }

    const stack: Cell[] = [];
    const startCell: Cell = { row: startTile.row, col: startTile.col };
    stack.push(startCell);
    const visited = new Set<string>();
    visited.add(`${startCell.row},${startCell.col}`);

    while (stack.length > 0) {
      const currentCell = stack[stack.length - 1];
      const unvisitedNeighbors = getUnvisitedNeighbors(
        currentCell,
        startTile,
        visited
      );

      if (unvisitedNeighbors.length > 0) {
        const randomNeighbor =
          unvisitedNeighbors[
            Math.floor(Math.random() * unvisitedNeighbors.length)
          ];
        await destroyWall(grid, randomNeighbor.row, randomNeighbor.col, speed);
        await destroyWall(
          grid,
          (currentCell.row + randomNeighbor.row) / 2,
          (currentCell.col + randomNeighbor.col) / 2,
          speed
        );
        stack.push(randomNeighbor);
        visited.add(`${randomNeighbor.row},${randomNeighbor.col}`);
      } else {
        stack.pop();
      }
    }

    // Ensure end tile is connected if not already
    if (!visited.has(`${endTile.row},${endTile.col}`)) {
      await connectToEndTile(grid, endTile, speed);
    }
  } finally {
    const currentSpeed = SPEEDS.find((s) => s.value === speed)!.value ?? 2;
    setTimeout(() => {
      setIsDisabled(false);
    }, 800 * currentSpeed);
  }
};

const createWall = async (
  grid: GridType,
  row: number,
  col: number,
  speed: SpeedType
) => {
  if (grid[row][col].isWall) return;
  grid[row][col].isWall = true;
  document.getElementById(
    `${row}-${col}`
  )!.className = `${WALL_TILE_STYLE} animate-wall`;
  await sleep(10 * speed - 5);
};

const destroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  speed: SpeedType
) => {
  if (!grid[row][col].isWall) return;
  grid[row][col].isWall = false;
  document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
  await sleep(10 * speed - 5);
};

const getUnvisitedNeighbors = (
  cell: Cell,
  startTile: TileType,
  visited: Set<string>
): Cell[] => {
  const neighbors: Cell[] = [];
  const directions = [
    { row: -2, col: 0 },
    { row: 2, col: 0 },
    { row: 0, col: -2 },
    { row: 0, col: 2 },
  ];

  for (const direction of directions) {
    const newRow = cell.row + direction.row;
    const newCol = cell.col + direction.col;

    if (
      newRow > 0 &&
      newRow < MAX_ROWS - 1 &&
      newCol > 0 &&
      newCol < MAX_COLS - 1 &&
      !visited.has(`${newRow},${newCol}`) &&
      (newRow !== startTile.row || newCol !== startTile.col)
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
};

const connectToEndTile = async (
  grid: GridType,
  endTile: TileType,
  speed: SpeedType
) => {
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ];

  for (const direction of directions) {
    const newRow = endTile.row + direction.row;
    const newCol = endTile.col + direction.col;

    if (
      newRow > 0 &&
      newRow < MAX_ROWS - 1 &&
      newCol > 0 &&
      newCol < MAX_COLS - 1 &&
      !grid[newRow][newCol].isWall
    ) {
      await destroyWall(grid, endTile.row, endTile.col, speed);
      return;
    }
  }

  // If no open path found, create one
  const randomDirection =
    directions[Math.floor(Math.random() * directions.length)];
  await destroyWall(
    grid,
    endTile.row + randomDirection.row,
    endTile.col + randomDirection.col,
    speed
  );
  await destroyWall(grid, endTile.row, endTile.col, speed);
};
