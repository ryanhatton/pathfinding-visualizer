import { GridType, TileType } from "../../../utils/types";
import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";

function manhattanDistance(a: TileType, b: TileType): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export const greedyBestFirstSearch = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const openSet: TileType[] = [startTile];
  const closedSet: TileType[] = [];
  const traversedTiles: TileType[] = [];

  startTile.distance = 0;
  startTile.isTraversed = true;

  while (openSet.length > 0) {
    let current = openSet[0];
    let lowestIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (
        manhattanDistance(openSet[i], endTile) <
        manhattanDistance(current, endTile)
      ) {
        current = openSet[i];
        lowestIndex = i;
      }
    }

    openSet.splice(lowestIndex, 1);
    closedSet.push(current);

    if (!current.isStart && !current.isEnd) {
      current.isTraversed = true;
      traversedTiles.push(current);
    }

    if (isEqual(current, endTile)) {
      break;
    }

    const neighbors = getUntraversedNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        if (!openSet.includes(neighbor)) {
          neighbor.distance = current.distance + 1;
          neighbor.parent = current;
          openSet.push(neighbor);
        }
      }
    }
  }

  const path = []; // Initialize an array to store the path
  let tile = grid[endTile.row][endTile.col]; // Start from the end tile
  while (tile !== null) {
    // Backtrack until the start tile
    tile.isPath = true; // Mark the tile as part of the path
    path.unshift(tile); // Add the tile to the path
    tile = tile.parent!; // Move to the parent tile
  }
  return { traversedTiles, path }; // Return the traversed tiles and the path
};
