import styled from "styled-components";
import { ReactComponent as ArrowBackSvg } from "../../assets/icons/close.svg";

export const BodyModal = styled.div`
  position: fixed;
  top: env(safe-area-inset-top);
  left: env(safe-area-inset-left);
  right: env(safe-area-inset-right);
  bottom: env(safe-area-inset-bottom);
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2;
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
  max-width: 33rem;
  max-height: 65rem;
  padding: 5rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 5rem;  
  @media (max-width: 460px) {
    max-width: 23rem;
  }
`;

export const IconClose = styled(ArrowBackSvg)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  position: absolute;
  top: 3rem;
  right: 3rem;
  margin-right : 0;
  cursor: pointer;
`;

export const Title = styled.h1`
font-size: clamp(1.5rem, 2.5vw + 1rem, 3rem);
width: 33rem;
display: flex;
align-items: center;
justify-content: center;
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
margin: 5rem 0;
`;
