import { aStar } from "../lib/algorithms/pathfinding/aStar";
import { bfs } from "../lib/algorithms/pathfinding/breadthFirstSearch";
import { dfs } from "../lib/algorithms/pathfinding/depthFirstSearch";
import { dijkstra } from "../lib/algorithms/pathfinding/dijkstra";
import { AlgorithmType, GridType, TileType } from "./types";
import { greedyBestFirstSearch } from "../lib/algorithms/pathfinding/greedyBestFirstSearch";

export const runPathfindingAlgorithm = ({
  algorithm,
  grid,
  startTile,
  endTile,
}: {
  algorithm: AlgorithmType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  switch (algorithm) {
    case "BFS":
      return bfs(grid, startTile, endTile);
    case "DFS":
      return dfs(grid, startTile, endTile);
    case "DIJKSTRA":
      return dijkstra(grid, startTile, endTile);
    case "A_STAR":
      return aStar(grid, startTile, endTile); 
    case "GREEDY_BEST_FIRST":
      return greedyBestFirstSearch(grid, startTile, endTile);
    default:
      return bfs(grid, startTile, endTile);
  }
};