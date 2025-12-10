import styled from "styled-components";
import { Container } from "../../components/MainContainer/MainContainer.styles.ts";


export const LoginMainContainer = styled(Container)`
flex-direction: row;
padding: 0;
box-shadow: 0 0 10px 0 black;
`;

export const WhiteContainer=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background: white;
width:50%;
min-height: 80rem;
border-radius: 5rem 0 0 5rem;
`;
export const MaxWidthContainerGray=styled.div`
margin: 0 auto;
max-width: 48rem;
padding: 3rem;
display:flex;
flex-direction: column;
justify-content: center;
box-shadow: 0 0 5px 0 black;
border-radius: 1rem;
 #gambiarra {
    margin-top: 3rem;
  }
`;
export const MaxWidthContainerWhite=styled.div`
margin: 0 auto;
max-width: 48rem;
padding: 3rem;
`;
export const TitleWhiteContainer=styled.h1`
font-size: clamp(2rem, 3vw, 3.5rem);
margin-bottom:5rem;
`;
export const TextContainer=styled.p`
font-size: clamp(1.5rem, 2vw, 2.4rem);
margin-bottom:5rem;
`;
export const AnswerContainer=styled.p`
font-size: clamp(1.5rem, 2vw, 2.3rem);
margin-bottom:2rem;
`;
export const QuestionContainer=styled.p`
font-size: clamp(1.5rem, 2vw, 2.3rem);
`; 
export const GrayContainer=styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 50%;
background: lightgray;
background: rgba(211, 211, 211, 0.25);
border-radius:0 5rem 5rem 0;
 
`;
export const TitleGrayContainer=styled.h1`
font-size: clamp(2rem, 3vw, 3.5rem);
margin-bottom:3rem;
color: black;
`;

