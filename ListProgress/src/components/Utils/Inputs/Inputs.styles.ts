import styled from 'styled-components';

export const SearchContainer = styled.div`
  background: transparent;
  grid-column: 3;
  justify-self: end;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5rem;
  padding: 1rem;
  &:focus-within {
    border: 2px solid black;
  }
  @media (max-width: 800px) {
    border-radius: 1.5rem;
    &:focus-within input {
    padding:0.5rem;
      width: 9rem;
      opacity: 1;
      pointer-events: auto;
    }
  }
    .icon{
width: 2rem;
height:2rem;
margin: 0;
}
`;

export const SearchInput = styled.input`
  background: transparent;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  color: black;
  font-size: 1.2rem;
  max-width: 9rem;
  transition: all 0.3s ease;

  @media (max-width: 800px) {
  padding:0;
    width: 0;
    opacity: 0;
    pointer-events: none;
  }
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
export const CheckInput = styled.input`
  width: clamp(2rem, 2vw, 3rem);
  height: clamp(2rem, 2vw, 3rem);
  margin-left: 1.5rem;
  cursor: pointer;
  appearance: none;
  border: 2px solid lightgray;
  border-radius: 4px;
  position: relative;

  &:checked {
    background-color: black;
    border-color: black;
  }

  &:checked::after {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: white;
  }
`;
export const NameContainer = styled.div `
margin: 0;
padding: 0;
position: relative;
.icon{
width: 2.3rem;
height:2.3rem;
position: absolute;
right: 1.5rem;
bottom: 1.25rem;
}
`;
export const NameInput = styled.input`
background: white;
margin: 1rem 1rem 0.5rem 0;
padding: 0.5rem;
font-size: 2rem;
  border-radius: 4px;
border: none;
height: 2.5rem;
&:has(input:focus) {
border: 2px solid black;
  }
`;
export const PasswordContainer = styled.div `
margin: 0;
padding: 0;
position: relative;
.icon{
width: 2.3rem;
height:2.3rem;
position: absolute;
right: 1.5rem;
bottom: 1.25rem;
}
`;
export const PasswordInput = styled.input`
background: white;
margin: 1rem 1rem 0.5rem 0;
  border-radius: 4px;
padding: 0.5rem;
font-size: 2rem;
border: none;
height: 2.5rem;
&:has(input:focus) {
border: 2px solid black;
  }
`;
export const EmailContainer = styled.div `
margin: 0;
padding: 0;
position: relative;
.icon{
width: 2.3rem;
height:2.3rem;
position: absolute;
right: 1.5rem;
bottom: 1.25rem;
}
`;
export const EmailInput = styled.input`
background: white;
margin: 1rem 1rem 0.5rem 0;
border-radius: 4px;
padding: 0.5rem;
font-size: 2rem;
border: none;
height: 2.5rem;
&:has(input:focus) {
border: 2px solid black;
  }
`;


