// types
import { twMerge } from "tailwind-merge";

// external components
import { ButtonProps } from "./types";

function Button({
  label,
  className,
  iconLeft,
  iconRight,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={twMerge(
        "flex flex-row items-center gap-2 cursor-pointer p-2 rounded hover:shadow",
        className
      )}
    >
      {iconLeft ? iconLeft : null}
      <span className="text-sm font-semibold">{label}</span>
      {iconRight ? iconRight : null}
    </button>
  );
}

export default Button;
