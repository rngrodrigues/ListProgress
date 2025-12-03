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
transition: all ease 0.3s;
aspect-ratio: 1 / 1;
overflow: hidden;
&:hover {
box-shadow: 0 3px 15px 5px black;;
}
.icon {
position: absolute;
cursor: pointer;
top: 3rem;
right: 2rem;
width: 4rem;
height: 4rem;
}
`;

export const TaskCategory = styled.h2 `
  color: gray;
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-weight: 500;
`;
export const TaskTitle = styled.h1 `
  font-size: clamp(2rem, 2vw, 2.8rem);
  font-weight: 700;
  margin-bottom: 5rem;
`;

export const TaskDescription = styled.p`
font-size: clamp(2rem, 3vw, 2.5rem);
width: 100%; 
word-break: break-word; 
`;
export const IconsList = styled.div`
position: absolute;
top: 2rem;
left: 2rem;
.icons {
cursor: pointer;
width: 3rem;
height: 3rem;
margin: 1rem;
}
`;
