// types
import type { ReactNode } from "react";

export type ButtonProps = {
  label: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  onClick: () => void;
};
