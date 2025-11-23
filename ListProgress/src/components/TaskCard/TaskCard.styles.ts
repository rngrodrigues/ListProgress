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
width: 3.5rem;
height: 3.5rem;
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

const getProgressColor = (value: number) => {
  if (value <= 25) return "red";
  if (value <= 50) return "orange";
  if (value <= 75) return "yellow";
  if (value <= 99) return "green";
  return "darkgreen";
};

export const TaskProgress = styled.div<{ progress: number }>`
  margin-top: 10rem;
  width: 100%;
  height: 1.6rem;
  background-color: #d9d9d9;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: ${({ progress }) => `${progress}%`};
    background-color: ${({ progress }) => getProgressColor(progress)};
    transition: width 0.4s ease-in-out;
    border-radius: inherit;
  }

  span {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.5rem;
    width: ${({ progress }) => `${progress}%`};   
    font-size: clamp(1rem, 1.2vw, 1.5rem);
    font-weight: bold;
    color: black;
    z-index: 2;
    pointer-events: none;
  }
`;

export const TaskDescription = styled.p`
font-size: clamp(2rem, 3vw, 2.5rem);
Width: 100%; 
`;

