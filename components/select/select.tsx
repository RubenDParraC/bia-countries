// external components
import { twMerge } from "tailwind-merge";

// types
import type { SelectProps } from "./types";

// component
import IconComponent from "../icon-component/icon-component";

function Select({ data, filter, className, setFilter }: SelectProps) {
  return (
    <div className="relative w-full sm:w-48">
      <select
        className={twMerge(
          "w-full appearance-none pr-10 pl-3 py-2 rounded shadow-sm cursor-pointer border-none outline-none",
          className
        )}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All</option>
        {data.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <IconComponent iconName="ChevronDownIcon" size={16} />
      </div>
    </div>
  );
}

export default Select;
