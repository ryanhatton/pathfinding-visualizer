import { FaGithub, FaHeart } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#131416] text-white py-4 mt-auto">
      <div className="container mx-auto text-center space-y-4">
        <a
          href="https://github.com/ryanhatton/pathfinding-visualizer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          <FaGithub className="mr-2" /> View on GitHub
        </a>
        <p className="mb-2 flex items-center justify-center">
          Made with <FaHeart className="text-red-500 mx-1" /> by Ryan Hatton
        </p>
        <p className="text-xs text-gray-500">
          This project is licensed under the MIT License.
        </p>
      </div>
    </footer>
  );
}
