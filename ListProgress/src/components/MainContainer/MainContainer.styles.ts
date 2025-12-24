import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
@media(max-width:800px){
box-shadow: 0 0 0 0 black;
margin-top: 6rem;
margin-bottom: 1rem;
}
@media(max-width:1500px){
 border-radius: 1rem;
}
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  border-radius: 5rem;
  margin: 3rem auto;
  padding: 1.5rem;
  backdrop-filter: blur(0.1rem);
  -webkit-backdrop-filter: blur(0.1rem);
  box-shadow: 0 0 5px 0 ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;
