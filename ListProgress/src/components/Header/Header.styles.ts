import styled from 'styled-components';

export const MainContainer = styled.div `
max-width: 1920px;
height: 5vh;
margin: 2rem auto;
display: flex;
align-items: center;
justify-content: center;
font-size: clamp(1rem, 2rem, 2rem);
@media (max-width: 768px) {
    display: none;
  }
`;
export const LogoContainer = styled.div `
border-radius: 5rem;
font-weight: bold;
background-color: white;
margin: 0 auto 0 2rem;
padding: 0.25rem;
box-shadow: 0 1px 1px 1px black;
 a {
 display: flex;
align-items: center;
 color: black;
 text-decoration: none;
padding: 1rem;
transition: all ease 0.5s;
}
.icon {
width: 2.5rem;
height: 2.5rem;
cursor: pointer;
margin-right: 1rem;
}
`;
export const MenuContainer = styled.div `
display: flex;
align-items: center;
border-radius: 5rem;
background-color: white;
padding: 0.5rem;
margin: 0 1rem 0 1rem;
box-shadow: 0 2px 2px 1px black;
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
    .icon {
width: 2.5rem;
height: 2.5rem;
cursor: pointer;
margin: 0 1rem;
}
`;
export const LoginContainer = styled.div `
border-radius: 5rem;
background-color: white;
padding: 1.2rem;
margin: 0 2rem;
box-shadow: 0 1px 1px 1px black;
 a {
 color: black;
 text-decoration: none;
display: inline-block;
 transition: transform ease 0.5s;
 }
 a:hover {
transform: scale(1.05);
 }

`;
