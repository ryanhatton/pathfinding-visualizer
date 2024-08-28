import { MAX_COLS, MAX_ROWS, SPEEDS, TILE_STYLE, WALL_TILE_STYLE } from "../../../utils/constants";
import { sleep } from "../../../utils/helpers";
import { GridType, SpeedType } from "../../../utils/types";

interface Edge {
  row: number;
  col: number;
  isHorizontal: boolean;
}

class DisjointSet {
  private parent: number[];

  constructor(size: number) {
    this.parent = Array(size).fill(0).map((_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      this.parent[rootY] = rootX;
    }
  }
}

export const kruskalAlgorithm = async (
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

    const edges: Edge[] = [];
    for (let row = 1; row < MAX_ROWS - 1; row += 2) {
      for (let col = 1; col < MAX_COLS - 1; col += 2) {
        if (col < MAX_COLS - 2) edges.push({ row, col, isHorizontal: true });
        if (row < MAX_ROWS - 2) edges.push({ row, col, isHorizontal: false });
      }
    }

    // Shuffle edges
    for (let i = edges.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [edges[i], edges[j]] = [edges[j], edges[i]];
    }

    const cellCount = ((MAX_ROWS - 1) / 2) * ((MAX_COLS - 1) / 2);
    const disjointSet = new DisjointSet(cellCount);

    for (const edge of edges) {
      const { row, col, isHorizontal } = edge;
      const cell1 = ((row - 1) / 2) * ((MAX_COLS - 1) / 2) + (col - 1) / 2;
      const cell2 = isHorizontal
        ? cell1 + 1
        : cell1 + (MAX_COLS - 1) / 2;

      if (disjointSet.find(cell1) !== disjointSet.find(cell2)) {
        disjointSet.union(cell1, cell2);
        await destroyWall(grid, isHorizontal ? row : row + 1, isHorizontal ? col + 1 : col, speed);
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
