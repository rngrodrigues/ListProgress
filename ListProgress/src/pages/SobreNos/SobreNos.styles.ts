import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`

max-width: 900px;
  border-radius: 5rem;
  margin: 5rem auto;
  background: whitesmoke;
   box-shadow: 0 0 5px 0 black;
  padding: 2rem 2rem;
  display: flex;
  align-items: center;
  jusitfy-content: center;
  flex-direction: column;
  @media(max-width:800px){
box-shadow: 0 0 1px 0 black;
 border-radius: 0;
  margin-top: 0;
}
`;

export const Title = styled.h1`
  text-align: center;
  letter-spacing: 1px;
    font-size: clamp(1.6rem, 2vw, 3.5rem);
    margin: 3rem;
`;


export const Subtitle = styled.h2`
    font-size: clamp(1.4rem, 2vw, 3rem);
  text-align: center;
  letter-spacing: 1px;
      margin: 3rem;
`;

export const Text = styled.p`
  font-size: clamp(1.5rem, 2vw, 2.3rem);
  color: #444;
margin: 1rem auto;
  padding-left: 1rem;
`;

export const TeamSection = styled.div`
  margin-top: 1rem;
`;

export const Equipe = styled.p`
  text-align: center;
    font-size: clamp(1.5rem, 2vw, 2rem);
`;

export const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

export const TeamCard = styled.div`
  padding: 20px;
  border-radius: 12px;
  width: 220px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  text-align: center;
  transition: 0.3s;
  h3 {
  font-size: clamp(1.2rem, 2vw, 2.7rem);
  }

  p 

  {
  font-size: clamp(1.6rem, 2vw, 1.8rem);
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

export const TeamImage = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const Button = styled.button`
  display: block;
  margin: 30px auto 0;
  padding: 12px 22px;
  border: none;
  background: white;
box-shadow: 0 2px 3px 0 black;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 3px 6px 3px black;
  }
`;
