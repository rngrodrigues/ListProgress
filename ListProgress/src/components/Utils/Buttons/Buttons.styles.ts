import styled from 'styled-components';

export const Btn =styled.button`
font-size:1.6rem;
border: none;
padding: 0.5rem 2rem;
box-shadow: 0 3px 3px 0 black;
border-radius: 5rem;
background-color: #ffffffff;
cursor: pointer;
transition: all ease 0.5s;
&:hover {
box-shadow: 0 3px 6px 3px black;
}
`;
export const BtnBlack =styled.button`
font-size:1.6rem;
border: none;
padding: 0.5rem 2rem;
border-radius: 4px;
background-color: black;
color: white;
cursor: pointer;
transition: all ease 0.5s;
&:hover {
box-shadow: 0 0 5px 3px white;
}
`;
export const AddBtn = styled.button `
border: none;
display: flex;
align-items: center;
grid-column: 2;
justify-self: center;
margin: 1rem;
padding: 0.5rem 1.25rem;
box-shadow: 0 2px 3px 0 black;
border-radius: 5rem;
background-color: #ffffffff;
cursor: pointer;
transition: all ease 0.5s;

&:hover {
box-shadow: 0 3px 6px 3px black;
}
 .icon {
width: 2rem;
height: 2rem;
margin-right: 0.6rem;
}
`;
export const ConfirmButton = styled.button `
border: none;
border-radius: 5rem;
margin: 1rem;
padding: 0.5rem 1rem;
box-shadow: 0 3px 3px 0 black;
background-color: #BAE8B1;
cursor: pointer;
transition: all ease 0.5s;
&:hover {
box-shadow: 0 3px 6px 3px black;
}
`;