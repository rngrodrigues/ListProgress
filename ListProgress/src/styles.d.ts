import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: string;
      text: string;
      shadow: string;
      hover: string;
      hoverText: string;
      bodyBg: string;
      card:string;
      progress:string;
      itemList:string;
    };
    bgImage: string;
  }
}
