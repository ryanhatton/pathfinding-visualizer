import { MAX_COLS, MAX_ROWS, SPEEDS, TILE_STYLE, WALL_TILE_STYLE } from "../../../utils/constants";
import { sleep } from "../../../utils/helpers";
import { GridType, SpeedType } from "../../../utils/types";

export const ellersAlgorithm = async (
  grid: GridType,
  setIsDisabled: (disabled: boolean) => void,
  speed: SpeedType
) => {
  try {
    // Create initial walls
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        if (row % 2 === 0 || col % 2 === 0) {
          await createWall(grid, row, col, speed);
        }
      }
    }

    let sets: number[] = [];
    let nextSet = 1;

    for (let row = 1; row < MAX_ROWS - 1; row += 2) {
      // Initialize or update sets for the row
      if (row === 1) {
        sets = Array(MAX_COLS).fill(0).map((_, i) => i % 2 === 1 ? nextSet++ : 0);
      } else {
        for (let col = 1; col < MAX_COLS; col += 2) {
          if (sets[col] === 0) {
            sets[col] = nextSet++;
          }
        }
      }

      // Create horizontal connections
      for (let col = 3; col < MAX_COLS - 1; col += 2) {
        if (Math.random() < 0.5 && sets[col] !== sets[col - 2]) {
          const oldSet = sets[col];
          sets[col] = sets[col - 2];
          // Merge sets
          for (let i = 1; i < MAX_COLS; i += 2) {
            if (sets[i] === oldSet) {
              sets[i] = sets[col];
            }
          }
          await destroyWall(grid, row, col - 1, speed);
        }
      }

      // Create vertical connections
      if (row < MAX_ROWS - 2) {
        const connectedSets = new Set<number>();
        for (let col = 1; col < MAX_COLS - 1; col += 2) {
          if (Math.random() < 0.5 || !connectedSets.has(sets[col])) {
            await destroyWall(grid, row + 1, col, speed);
            connectedSets.add(sets[col]);
          } else {
            sets[col] = 0; // Reset the set for the next row
          }
        }
      }
    }

    // Connect any disjoint sets in the last row
    const lastRow = MAX_ROWS - 2;
    for (let col = 3; col < MAX_COLS - 1; col += 2) {
      if (sets[col] !== sets[col - 2]) {
        await destroyWall(grid, lastRow, col - 1, speed);
      }
    }
  } finally {
    const currentSpeed = SPEEDS.find((s) => s.value === speed)!.value ?? 2;
    setTimeout(() => {
      setIsDisabled(false);
    }, 800 * currentSpeed);
  }
};

const createWall = async (grid: GridType, row: number, col: number, speed: SpeedType) => {
  if (grid[row][col].isWall) return;
  grid[row][col].isWall = true;
  document.getElementById(`${row}-${col}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
  await sleep(10 * speed - 5);
};

const destroyWall = async (grid: GridType, row: number, col: number, speed: SpeedType) => {
  if (!grid[row][col].isWall) return;
  grid[row][col].isWall = false;
  document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
  await sleep(10 * speed - 5);
};

