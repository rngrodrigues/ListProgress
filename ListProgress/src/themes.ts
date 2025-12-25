import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  colors: {
    bodyBg: "lightgray",
    bg: "white",
    text: "black",
    shadow: "rgba(0,0,0,0.8)",
    hover: "black",
    hoverText: "white",
    card: "linear-gradient(to left, white, ghostwhite)",
    progress:"#d9d9d9",
    itemList:"white",
  },
  bgImage: "https://transparenttextures.com/patterns/asfalt-dark.png",
};

export const darkTheme: DefaultTheme = {
  colors: {
    bodyBg: "black",
    bg: "#000000ff",
    text: "whitesmoke",
    shadow: "rgba(255, 255, 255, 0.5)",
    hover: "white",
    hoverText: "black",
    card: "linear-gradient(to left, #000000ff, #333333ff)",
    progress:"rgba(255, 255, 255, 0.5)",
    itemList:"rgb(0, 0, 15)",
  },
 bgImage:
  "https://transparenttextures.com/patterns/brushed-alum-dark.png",
};
