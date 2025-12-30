import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../../frontend/src/themes";

interface ThemeContextType {
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    setThemeName(prev => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const theme = themeName === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
