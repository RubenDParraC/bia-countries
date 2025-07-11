// types
import type { Dispatch, SetStateAction } from "react";

export type SelectProps = {
  data: string[];
  filter: string;
  className?: string;
  setFilter: Dispatch<SetStateAction<string>>;
};
