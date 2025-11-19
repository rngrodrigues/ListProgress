import styled from "styled-components";

export const TaskContainer = styled.div `
display: flex;
flex-direction: column;
justify-content: center;
border-radius: 5rem;
background-color: white;
padding: 3rem;
position: relative;
box-shadow: 0 3px 5px 1px black;
transition: all ease 0.5s;
aspect-ratio: 2 / 2;
overflow: hidden;
&:hover {
transform: scale(1.08);
}
.icon {
position: absolute;
cursor: pointer;
top: 5rem;
right: 3rem;
width: 3rem;
height: 3rem;
}
`;

export const TaskCategory = styled.h2 `
  color: gray;
  font-size: clamp(1.2rem, 1.5vw, 2rem);
  font-weight: 500;
`;
export const TaskTitle = styled.h1 `
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 700;
`;
export const TaskProgress = styled.div `
margin-top: 4rem;
  font-size: clamp(1.2rem, 1.5vw, 2rem);
 color: blue;
`;