import styled from "styled-components";

const getProgressColor = (value: number) => {
  if (value <= 25) return "red";
  if (value <= 50) return "orange";
  if (value <= 75) return "yellow";
  if (value <= 99) return "green";
  return "darkgreen";
};

export const TaskProgressContainer = styled.div<{ progress: number }>`
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