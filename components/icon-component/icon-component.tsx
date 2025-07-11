import { useMemo } from "react";

// external components
import { twMerge } from "tailwind-merge";
import * as HeroIconsOutline from "@heroicons/react/24/outline";
import * as HeroIconsSolid from "@heroicons/react/24/solid";

// types
import type { IconComponentProps } from "./types";

function IconComponent({
  iconName,
  size = 24,
  variant = "outline",
  className,
  onClick,
}: IconComponentProps) {
  const HeroIcons = variant === "outline" ? HeroIconsOutline : HeroIconsSolid;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const Icon = useMemo(() => HeroIcons[iconName], [iconName, variant]);

  if (!Icon) {
    return <div>Icon not found!</div>;
  }

  return (
    <Icon
      role="img"
      style={{ height: `${size}px`, width: `${size}px` }}
      className={twMerge(onClick && "cursor-pointer", className)}
      onClick={onClick}
    />
  );
}

export default IconComponent;
