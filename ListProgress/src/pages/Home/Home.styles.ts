import styled from 'styled-components';

export const TopContainer = styled.div `
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  flex: 0 0 auto;
  .icon {
width: 2rem;
height: 2rem;
margin-right: 1rem;
}
`;

export const GridContainer = styled.div `
display:grid;
grid-template-columns: repeat(auto-fit, minmax(33.8rem, 1fr));
gap: 5rem;
padding: clamp(1rem, 5vw, 5rem);
flex: 1;
`;
export const PaginationContainer = styled.div `
  flex: 0 0 auto;
  width:100;
  padding: 1rem;
`;