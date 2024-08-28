import { MouseEventHandler } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

export function PlayButton({
  handlerRunVisualizer,
  isDisabled,
  isGraphVisualized,
}: {
  isDisabled: boolean;
  isGraphVisualized: boolean;
  handlerRunVisualizer: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={handlerRunVisualizer}
      className={`
        disabled:pointer-events-none disabled:opacity-50 
        transition ease-in rounded-full 
        w-12 h-12 
        flex items-center justify-center
        shadow-md border-none 
        focus:outline-none focus:ring focus:ring-opacity-30
        ${
          isGraphVisualized
            ? "bg-blue-500 hover:bg-blue-600 active:ring-blue-300 focus:ring-blue-300"
            : "bg-green-500 hover:bg-green-600 active:ring-green-300 focus:ring-green-300"
        }
      `}
    >
      {isGraphVisualized ? (
        <GrPowerReset className="w-6 h-6 text-white" />
      ) : (
        <BsFillPlayFill className="w-6 h-6 text-white" />
      )}
    </button>
  );
}