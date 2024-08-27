import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

// This function calculates the heuristic cost between two tiles using Manhattan distance
const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
  const manhattanDistance = 1; // Multiplier for Manhattan distance (set to 1 for this implementation)
  const r = Math.abs(currentTile.row - endTile.row); // Calculate vertical distance
  const c = Math.abs(currentTile.col - endTile.col); // Calculate horizontal distance
  return manhattanDistance * (r + c); // Return the total Manhattan distance
};

// This function initializes a 2D array of heuristic costs for the entire grid
export const initHeuristicCost = (grid: GridType, endTile: TileType) => {
  const heuristicCost = []; // Initialize an empty 2D array
  for (let i = 0; i < MAX_ROWS; i += 1) {
    const row = []; // Initialize a new row
    for (let j = 0; j < MAX_COLS; j += 1) {
      // Calculate and store the heuristic cost for each tile to the end tile
      row.push(retrieveHeuristicCost(grid[i][j], endTile));
    }
    heuristicCost.push(row); // Add the completed row to the 2D array
  }
  return heuristicCost; // Return the completed 2D array of heuristic costs
};

// This function initializes a 2D array of function costs (f-costs) for the entire grid
export const initFunctionCost = () => {
  const functionCost = []; // Initialize an empty 2D array
  for (let i = 0; i < MAX_ROWS; i += 1) {
    const row = []; // Initialize a new row
    for (let j = 0; j < MAX_COLS; j += 1) {
      row.push(Infinity); // Set initial f-cost for each tile to Infinity
    }
    functionCost.push(row); // Add the completed row to the 2D array
  }
  return functionCost; // Return the completed 2D array of function costs
};