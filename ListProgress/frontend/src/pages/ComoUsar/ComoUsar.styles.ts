import styled from "styled-components";

export const Container = styled.section`
  padding: 2rem;
  border-radius: 1rem 5rem 5rem 1rem;
  border-left: 0.6rem solid ${({ theme }) => theme.colors.text};
  cursor: pointer;
  margin: 1rem 0;
  background: ${({ theme }) => theme.colors.bg};
`;

export const TitleContainer = styled.h2`
color:${({ theme }) => theme.colors.text};
font-size: clamp(1.6rem, 2vw, 2.6rem);
`;

export const TextContainer = styled.p<{ open: boolean }>`
  font-size: clamp(1.2rem, 3.2vw, 2.2rem);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-top: 1rem;
  overflow: hidden;
  max-height: ${({ open }) => (open ? "500px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: max-height 0.5s ease, opacity 0.5s ease;
`;


