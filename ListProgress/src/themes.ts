import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  colors: {
    bg: "white",
    text: "black",
    shadow: "rgba(0,0,0,0.8)",
    hover:"black",
    hoverText:"white",
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    bg: "black",
    text: "white",
    shadow: "rgba(255, 255, 255, 0.5)",
    hover:"white",
    hoverText:"black",
    
  },
};
