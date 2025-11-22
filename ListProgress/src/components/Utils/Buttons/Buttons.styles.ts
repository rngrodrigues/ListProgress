import styled from 'styled-components';

export const AddBtn = styled.button `
display: flex;
align-items: center;
grid-column: 2;
justify-self: center;
margin: 1rem;
padding: 0.5rem 2rem;
box-shadow: 0 1px 1px 0 black;
border-radius: 5rem;
background-color: #ffffffff;
cursor: pointer;
transition: all ease 0.5s;

&:hover {
box-shadow: 0 0 8px 0 black;
}
 .icon {
width: 2rem;
height: 2rem;
margin-right: 1rem;
}
`;
export const ConfirmButton = styled.button `
border-radius: 5rem;
margin: 1rem;
padding: 0.5rem 1rem;
box-shadow: 0 1px 1px 0 black;
background-color: #BAE8B1;
cursor: pointer;
transition: all ease 0.5s;
&:hover {
box-shadow: 0 0 5px 0 black;
}
`;