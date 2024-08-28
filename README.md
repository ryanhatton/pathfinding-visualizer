## Features

- Visualize multiple pathfinding algorithms:
  * A* (A-star)
  * Breadth-First Search (BFS)
  * Depth-First Search (DFS)
  * Dijkstra's Algorithm
  * Greedy Best-First Search
- Generate mazes using different algorithms:
  * Binary Tree
  * Recursive Division
  * **Eller's Algorithm**
  * **Kruskal's Algorithm**
  * **Recursive Backtracker**
- Adjustable visualization speed
- Interactive grid for creating custom obstacles

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
- **Context API**: For state management across components

## Project Structure

- `src/`: Contains the source code for the application
  - `components/`: React components used in the application
  - `context/`: React context providers for state management
  - `hooks/`: Custom React hooks
  - `lib/`: Contains the implementation of pathfinding and maze generation algorithms
  - `utils/`: Utility functions and constants

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```

## Next Updates
- Add more robust drawing functionality for manually creating obstacles
- Add intermediate destinations for pathfinding
- Add support for custom weights for different terrain
- Terrain based map generation
- Add support for custom heuristics for A*
- Add support for custom start and end points

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
