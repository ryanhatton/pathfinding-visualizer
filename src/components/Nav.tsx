import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import {
  EXTENDED_SLEEP_TIME,
  MAZES,
  PATHFINDING_ALGORITHMS,
  SLEEP_TIME,
  SPEEDS,
} from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";
import '../styles/fonts.css';

export function Nav({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    isGraphVisualized,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
    isVisualizationComplete,
    setIsVisualizationComplete,
  } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = (maze: MazeType) => {
    setMaze(maze);
    resetGrid({ grid, startTile, endTile });
    setIsGraphVisualized(false);
    setIsVisualizationComplete(false);

    if (maze !== "NONE") {
      setIsDisabled(true);
      runMazeAlgorithm({
        maze,
        grid,
        startTile,
        endTile,
        setIsDisabled,
        speed,
      });
    }
  };

  const handlerRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      setIsVisualizationComplete(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
      setMaze("NONE");
      setAlgorithm("BFS");
      setSpeed(0.5);
      return;
    }

    isVisualizationRunningRef.current = true;
    setIsDisabled(true);

    const { traversedTiles, path } = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
    });

    animatePath(traversedTiles, path, startTile, endTile, speed);
    
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
      setIsVisualizationComplete(true);
    }, SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[6rem] px-5 pt-6">
      <h1 className="text-6xl font-bold mb-4 text-center w-full text-sky-500" style={{ fontFamily: 'MazeFont, sans-serif' }}>
        Pathfinding Visualizer
      </h1>
      <div className="flex sm:flex-row flex-col sm:space-x-4 space-y-3 sm:space-y-0 items-end w-full max-w-4xl justify-center">
        <Select
          label="Maze Algorithm"
          value={maze}
          options={MAZES}
          onChange={(e) => {
            handleGenerateMaze(e.target.value as MazeType);
          }}
          isDisabled={isVisualizationRunningRef.current || isVisualizationComplete}
        />
        <Select
          label="Pathfinding Algorithm"
          value={algorithm}
          isDisabled={isVisualizationRunningRef.current || isDisabled || isVisualizationComplete}
          options={PATHFINDING_ALGORITHMS}
          onChange={(e) => {
            setAlgorithm(e.target.value as AlgorithmType);
          }}
        />
        <Select
          label="Speed"
          value={speed}
          options={SPEEDS}
          isDisabled={isVisualizationRunningRef.current || isDisabled || isVisualizationComplete}
          onChange={(e) => {
            setSpeed(parseInt(e.target.value) as SpeedType);
          }}
        />
        <PlayButton
          isDisabled={isDisabled}
          isGraphVisualized={isGraphVisualized}
          handlerRunVisualizer={handlerRunVisualizer}
        />
      </div>
    </div>
  );
}
