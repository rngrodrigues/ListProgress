import styled from "styled-components";
import { ReactComponent as ArrowBackSvg } from "../../assets/icons/arrow-back.svg";

export const BodyList = styled.div`
display:  flex;
flex-direction: column;
border-radius: 5rem;
min-height: 80rem;
background-color: white;
padding: 3rem;
box-shadow: 0 3px 5px 1px black;
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
padding: 5rem;
border-radius: 5rem;
`;
export const BottomContainer = styled.div`
flex: 2;
display: flex;
gap:2rem;
padding: 0 6qrem;
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
export const TaskProgress = styled.div`
text-align: center;
margin: 3rem;
  font-size: clamp(1.2rem, 1.5vw, 2rem);
 color: blue;
`;
export const IconsList = styled.div`
margin-left: auto;
.IIcon {
width: 3rem;
}
.icon {
    width: 3rem;
    height: 2.5rem;
    cursor: pointer;
    margin: auto 0.5rem;
  }
`;
export const ItemList = styled.ul`
border-radius: 2rem;
min-height: 5rem;
box-shadow: 0 2px 2px 1px lightgray;
display: flex;
align-items: center;
position: relative;
margin: 0 auto;
width: 100%;
max-width: 80rem;
padding: 0.3rem;
font-size: 2.4rem;
 width: 100%;
 padding-left: 1rem;
 input {
 width: 3rem;
    height: 3rem;
    margin-right: 1.5rem;
    cursor: pointer;
 }
.BackIcon {
    position: absolute;
    right: 1rem;
    margin-left: auto;
    width: 3rem;
    height: 2.5rem;
    cursor: pointer;
    }
`;
export const TextList = styled.li`
 display: flex;
 aligm-items: center;
 text-decoration: none;
`;

export const ItemDescription = styled.p`
text-align:center;
`;


