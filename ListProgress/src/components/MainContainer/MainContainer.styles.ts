import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  min-height: 80rem;
  border-radius: 5rem;
  margin: 3rem auto;
  padding: 1rem;
  backdrop-filter: blur(0.2rem); 
  -webkit-backdrop-filter: blur(0.2rem);
  border: 1px solid gray;
`;
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
export const AddBtn = styled.button `
display: flex;
align-items: center;
grid-column: 2;
justify-self: center;
margin: 1rem;
padding: 0.5rem 2rem;
box-shadow: 0 1px 1px 0 black;
border-radius: 5rem;
background-color: #c7c6c6ff;
cursor: pointer;

 .icon {
width: 2rem;
height: 2rem;
margin-right: 1rem;
}
`;
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
export const GridContainer = styled.div `
display:grid;
grid-template-columns: repeat(auto-fit, minmax(33.8rem, 1fr));
gap: 5rem;
padding: clamp(1rem, 5vw, 5rem);
flex: 1;


.div-grid {
min-height: 400px;
border-radius: 5rem;
  background-color: white;
  box-shadow: 0 3px 2px 1px black;
  transition: all ease 0.5s;
}
  .div-grid:hover {
  transform: scale(1.08);
  }
`;
export const PaginationContainer = styled.div `
  flex: 0 0 auto;
`;

