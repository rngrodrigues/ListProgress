import styled from "styled-components";

interface GridProps {
  $isSingle: boolean;
}
export const GridContainer = styled.div<GridProps> `
display: grid;
grid-template-columns: repeat(auto-fit, minmax(27rem, 1fr));
gap: 5rem;
padding: clamp(1rem, 5vw, 5rem);
min-height: 80%;
 ${props => props.$isSingle && `
  & > .task-card {
    width: 100%;
    max-width: 58rem;
    margin: 0 auto;
  }
`}
`;
export const MainParagrafo = styled.h1`
font-size: clamp(2.8rem, 3.4vw, 3.4rem);
text-align: center;
display: flex;
align-items: center;
justify-content: center;
min-height:65rem;
width: auto
`;
export const PaginationContainer = styled.div `
  min-height: 10%;
  width:100%;
  display: flex;
text-align: center;
justify-content: center;
align-items: center;
  padding: 1rem;
  font-size: 2.4rem;
  text-align: center;
  button {
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.4rem;
  cursor: pointer;
  background: transparent;
  border: none;
  margin:0 1rem;
  }
   button:disabled {
    opacity: 0.5;
    cursor: default;      
    pointer-events: none;  
  }
`;