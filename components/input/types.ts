// types
import type { Dispatch, SetStateAction } from "react";

export type InputProps = {
  searchTerm: string;
  placeholder: string;
  className?: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};
