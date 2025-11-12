import { NavLink } from "react-router-dom";
import styled from 'styled-components';

export const MainContainer = styled.div `
max-width: 1920px;
margin: 0 auto;
display: flex;
align-items: center;
justify-content: center;
font-size: clamp(1rem, 1.5vw + 1rem, 2rem);
`;
export const LogoContainer = styled.div `
border-radius: 5rem;
background-color: white;
margin: 1rem auto 1rem 2rem;
padding: 1rem;
box-shadow: 0px 3px 2px 2px black;
 a {
 color: black;
 text-decoration: none;
padding: 1rem;
transition: all ease 0.5s;
}
`;
export const MenuContainer = styled.div `
border-radius: 5rem;
background-color: white;
padding: 1.5rem;
margin: 1rem;
box-shadow: 0px 3px 2px 2px black;
 a {
 color: black;
 text-decoration: none;
padding: 1rem;
transition: all ease 0.5s;
}
a:hover {
color: white;
background-color: gray;
border-radius: 5rem;
}
 a.active {
    color: white;
    background-color: black;
    border-radius: 5rem;
  }
`;
export const LoginContainer = styled.div `
border-radius: 5rem;
background-color: white;
padding: 1.2rem;
margin: 1rem 2rem;
box-shadow: 0px 3px 2px 2px black;
 a {
 color: black;
 text-decoration: none;
display: inline-block;
 transition: transform ease 0.5s;
 }
 a:hover {
transform: scale(1.1);
 }

`;
