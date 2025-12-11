import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  border-radius: 5rem;
  margin: 5rem auto;
  padding: 1rem;
  backdrop-filter: blur(0.2rem);
  -webkit-backdrop-filter: blur(0.1rem);
  box-shadow: 0 0 5px 0 black;
  overflow: hidden;
`;
