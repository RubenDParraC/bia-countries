"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// types
import type { ContextProps } from "./types";

const ThemeContext = createContext<ContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<boolean>(false); // false = light, true = dark

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  }
  return context;
};
