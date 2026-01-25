import type { DefaultTheme } from "styled-components";
import bgImage from "@/assets/icons/img/brushed-alum-dark.png";
import bgImageLight from "@/assets/icons/img/brushed-alum-dark.png";

export const lightTheme: DefaultTheme = {
  colors: {
    bodyBg: "lightgray",
    bg: "white",
    text: "black",
    shadow: "rgba(0,0,0,0.8)",
    hover: "black",
    hoverText: "white",
    card: "linear-gradient(135deg, #ffffff, #f5f5f5)",
    progress:"#d9d9d9",
    itemList:"white",
  },
  bgImage: bgImageLight,
};

export const darkTheme: DefaultTheme = {
  colors: {
    bodyBg: "#020202ff",
    bg: "#111111ff",
    text: "white",
    shadow: "rgba(255, 255, 255, 0.5)",
    hover: "white",
    hoverText: "black",
    card: "linear-gradient(145deg, #000000ff, #1f1f1f, #2e2e2e)",
    progress:"rgba(255, 255, 255, 0.5)",
    itemList:"#111111ff",
  },
  bgImage: bgImage,
};
