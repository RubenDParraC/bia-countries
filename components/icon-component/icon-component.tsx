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
  const Icon = useMemo(() => {
    const icons = variant === "outline" ? HeroIconsOutline : HeroIconsSolid;
    return icons[iconName];
  }, [iconName, variant]);

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
