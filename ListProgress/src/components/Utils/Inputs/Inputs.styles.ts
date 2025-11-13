import styled from 'styled-components';

export const SearchContainer = styled.div `
  grid-column: 3;
  justify-self: end;
display: flex;
align-items: center;
border: 1px solid gray;
border-radius: 5rem;
padding: 0.5rem 2rem;
 &:has(input:focus) {
border: 2px solid black;
  }
`;
export const SearchInput = styled.input`
  padding: 0.5rem;
  background: transparent; 
  border: none; 
  border-bottom: 2px solid black; 
  outline: none; 
  color: black;
  font-size: 1rem;
  width: 10rem;
  transition: border-color 0.3s ease;  
`;