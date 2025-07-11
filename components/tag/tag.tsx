// types
import { TagProps } from "./types";

// external components
import { twMerge } from "tailwind-merge";

function Tag({ label, className }: TagProps) {
  return (
    <div
      className={twMerge(
        "px-5 py-1 bg-white rounded shadow shadow-gray-400",
        className
      )}
    >
      <span>{label}</span>
    </div>
  );
}

export default Tag;
