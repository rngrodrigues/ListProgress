import { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes.ts";

const ThemeContext = createContext({ toggleTheme: () => {} });

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
