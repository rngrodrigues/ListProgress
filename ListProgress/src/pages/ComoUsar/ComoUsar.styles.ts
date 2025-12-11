import styled from "styled-components";

export const Title = styled.h1`
  font-size: clamp(2.5rem, 3.2vw, 3.8rem);
  text-align: center;
  margin: 2.5rem 0;
`;

export const Container = styled.section`
  padding: 2rem;
  border-radius: 1rem 5rem 5rem 1rem;
  border-left: 0.6rem solid darkgreen;
  cursor: pointer;
  margin: 1rem 0;
  background: white;
`;

export const TitleContainer = styled.h2`
  font-size: clamp(2rem, 3vw, 3rem);
`;

export const TextContainer = styled.p<{ open: boolean }>`
  font-size: clamp(1.2rem, 3.2vw, 2.2rem);
  color: #333;
  line-height: 1.6;
  margin-top: 10px;
  overflow: hidden;
  max-height: ${({ open }) => (open ? "500px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: max-height 0.5s ease, opacity 0.5s ease;
`;

export const MaxWidthContainer = styled.div`
max-width: 80rem;
margin: 0 auto;
`;
