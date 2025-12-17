import styled from "styled-components";
import { ReactComponent as ArrowBackSvg } from "../../assets/icons/close.svg";


export const BodyModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;



export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 25rem;
  max-height: 65rem;
  padding: 2.5rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 2rem;  
  @media (max-width: 460px) {
    max-width: 23rem;
  }
`;

export const IconClose = styled(ArrowBackSvg)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin-right : 0;
  cursor: pointer;
`;

export const Title = styled.h1`
font-size: clamp(1.5rem, 2.5vw + 1rem, 3rem);
width: 26rem;
display: flex;
align-items: center;

gap: 1rem;
  .icon {
   stroke: currentColor;
   stroke-width: 3;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
`;

export const MaxWidthForm = styled.div `
display: flex;
flex-direction: column;
justify-content: center;
margin: 1.5rem 0;
`;

export const ConfirmContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 1rem;
  margin: 0.2rem;
`;


export const ConfirmMessage = styled.p`
  font-size: 16px;
  margin: 2.5rem 0;
  color: #333;
`;

export const ModalConfirmBtn = styled.button<{ disabled?: boolean }>`
  padding: 5px 10px;
  background-color: #ff0000ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  transition: background-color 0.2s;
  &:hover {
    background-color: #45a049;
  }
`;

export const ModalCancelBtn = styled.button`
  padding: 5px 10px;
  background-color: #ccc;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b3b3b3;
  }
`;