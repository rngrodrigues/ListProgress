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
export const TitleLabel = styled.label`
  font-size: 2rem;
  margin-left: 1rem;
  margin-bottom: 0.25rem;
`;
export const TitleInput = styled.input`
background: transparent; 
margin: 1rem;
padding: 0.5rem;
 font-size: 1rem;
 border: 1px solid black;
 height: 1.5rem;
`;

export const CategoryLabel = styled.label`
  font-size: 2rem;
  margin-left: 1rem;
  margin-bottom: 0.25rem;
`;

export const CategoryInput = styled.input `
background: transparent; 
margin: 1rem;
padding: 0.5rem;
font-size: 1rem;
border: 1px solid black;
width: 19rem;
height: 1.5rem;
`;

export const DescriptionLabel = styled.label`
  font-size: 2rem;
  margin-left: 1rem;
  margin-bottom: 0.25rem;
`;

export const DescriptionInput = styled.textarea `
margin: 1rem;
padding: 0.5rem;
background: transparent;
font-size: 1rem; 
border: 1px solid black;
height: 6rem;
`;
export const CheckInput = styled.input `
   width: 3rem;
    height: 3rem;
    margin-right: 1.5rem;
    cursor: pointer;
`;