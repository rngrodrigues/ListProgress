import styled from 'styled-components';

export const TopContainer = styled.div `
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 10%;
  .icon {
width: 2rem;
height: 2rem;
margin-right: 1rem;
}
`;

export const GridContainer = styled.div `
display: grid;
grid-template-columns: repeat(auto-fit, minmax(33.8rem, 1fr));
gap: 5rem;
padding: clamp(1rem, 5vw, 5rem);
min-height: 60vh;
 & > *:only-child {
    width: 75rem;
    margin: 0 auto;
  }
`;
export const PaginationContainer = styled.div `
  height: 10%:
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