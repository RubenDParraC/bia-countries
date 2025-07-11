// external components
import { twMerge } from "tailwind-merge";

// types
import type { InputProps } from "./types";

// components
import IconComponent from "../icon-component/icon-component";

function Input({
  searchTerm,
  placeholder,
  className,
  setSearchTerm,
}: InputProps) {
  return (
    <div className={twMerge("relative flex items-center shadow-sm", className)}>
      <IconComponent
        iconName="MagnifyingGlassIcon"
        className="absolute left-3 text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        className={twMerge(
          "w-full ml-10 border-none outline-none focus:outline-none focus:ring-0 text-sm"
        )}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Input;
