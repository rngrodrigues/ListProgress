import styled from "styled-components";
import { ReactComponent as ArrowBackSvg } from "../../assets/icons/arrow-back.svg";
import { motion } from "framer-motion";

export const BodyList = styled.div`
display:  flex;
flex-direction: column;
border-radius: 5rem;
min-height: 94rem;
background-color: white;
padding: 1.5rem;
box-shadow: 0 3px 5px 1px black;
@media(max-width:800px){
margin-top: 1.5rem;
}
`;
export const ArrowBack = styled(ArrowBackSvg)`
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  position: absolute;
  top: 5rem;
  right: 5rem;
  margin-right: 0;
  cursor: pointer;
`;
export const TopContainer = styled.div`
display: flex;
align-items: center;
flex: 1;
width: 100%;
`;
export const MidContainer = styled.div`
display: flex;
flex-direction: column;
flex: 8;
gap: 1rem;
padding: 1rem;
border-radius: 5rem;
`;
export const BottomContainer = styled.div`
flex: 2;
display: flex;
gap: 2rem;
flex-direction: column;
align-items: center;
justify-content: center;
`;
export const TaskCategory = styled.h2`

  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: normal;
`;
export const TaskTitle = styled.h1`

  text-align:center;
  font-size: clamp(4rem, 3vw, 5rem);
  font-weight: 700;
  margin: 3rem;
`;

export const IconsList = styled.div`
display: flex;
  flex-wrap: nowrap;
.icon {
    max-width: 2.2rem;
    max-height: 2.2rem;
    cursor: pointer;
    margin: auto 0.5rem;
  }
`;
export const ItemList = styled(motion.ul)`
border-radius: 2rem;
min-height: 5rem;
box-shadow: 0 2px 2px 1px lightgray;
display: flex;
align-items: center;
position: relative;
margin: 0 auto;
width: 100%;
max-width: 120rem;
padding: 0.3rem;
font-size: 2.4rem;
 width: 100%;

 input {
    margin-right: 1rem;
    cursor: pointer;
    flex-shrink: 0
 }
.BackIcon {
    position: absolute;
    right: 1rem;
    margin-left: auto;
    width: 3rem;
    height: 2.5rem;
    cursor: pointer;
    }
    .UpIcon {
    cursor: pointer;
    flex-shrink: 0;
    width: 3rem;
    height: 2.5rem;
    margin-left: auto;
    }

`;
export const TextList = styled.li`
display: flex;
align-items: center;
text-align: center;
width: 100%;          
list-style: none;

 &.completed {
    text-decoration: line-through;
  }
`;

export const ItemDescription = styled.p`

text-align: center; 
white-space: pre-line;
padding: 1rem;
    
  word-break: break-word;  
 &.completed {
    text-decoration: line-through;
  }
`;


