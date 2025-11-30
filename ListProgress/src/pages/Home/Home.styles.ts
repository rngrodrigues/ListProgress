import styled from 'styled-components';

export const TopContainer = styled.div `
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 10%;
  .icon {
width: 2rem;
height: 2rem;
margin-right: 1rem;
}
`;

export const GridContainer = styled.div `
display: grid;
grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
gap: 5rem;
padding: clamp(1rem, 5vw, 5rem);
min-height: 80%;
 & > *:only-child {
    width: 100%;
    max-width: 58rem;
    margin: 0 auto;
  }
`;
export const MainParagrafo = styled.h1`
font-size: clamp(2.8rem, 3.4vw, 3.4rem);
text-align: center;
display: flex;
align-items: center;
justify-content: center;
min-height:50rem;
width: auto
`;
export const PaginationContainer = styled.div `
  min-height: 10%:
  width:100%;
  display: flex;
text-align: center;
justify-content: center;
align-items: center;
  padding: 1rem;
  font-size: 2.4rem;
  text-align: center;
  button {
  font-size: 2.4rem;
  cursor: pointer;
  background: transparent;
  border: none;
  margin:0 1rem;
  }
`;