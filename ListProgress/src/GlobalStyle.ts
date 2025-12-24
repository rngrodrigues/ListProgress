import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

body {
    overflow-wrap: break-word;
    max-height: 100vh;
    background: 
      url(${({ theme }) => theme.bgImage}),
      ${({ theme }) => theme.colors.bodyBg};
    background-repeat: repeat;
    background-size: auto;
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.5s ease;
  }
`;