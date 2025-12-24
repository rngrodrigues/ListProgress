import styled from "styled-components";

const getProgressColor = (value: number) => {
  if (value <= 25) return "#A8E6A1";   
  if (value <= 50) return "#76D275";   
  if (value <= 75) return "#4CAF50";  
  if (value <= 99) return "#2E7D32";   
  return "#1B5E20";                   
};

export const TaskProgressContainer = styled.div<{ $progress: number }>`
  margin-top: 5rem;
  width: 100%;
  height: clamp(1.5rem, 2.5vw, 2.3rem);
  background-color: ${({ theme }) => theme.colors.progress};
  border-radius: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: ${({ $progress }) => `${$progress}%`};
    background-color: ${({ $progress }) => getProgressColor($progress)};
    transition: width 0.4s ease-in-out;
    border-radius: inherit;
  }
`;

export const ProgressNumber = styled.p<{ $progress: number }>`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  width: ${({ $progress }) =>
    $progress === 0 ? "2.5rem" : `${$progress}%`};
  font-size: clamp(1rem, 1.2vw, 1.5rem);
  font-weight: bold;
  color: black;
  z-index: 2;
  pointer-events: none;
`;
