import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 1920px;
  height: 5vh;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;

  @media (max-width: 800px) {
   position: relative;
  background-color:white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.8);
  margin: 0; 
  padding: 2rem;   
  height: auto;

  }
`;

export const LogoContainer = styled.div`
  border-radius: 5rem;
  font-weight: bold;
  background-color: white;
  margin: 0 auto 0 2rem;
  padding: 0.25rem;
box-shadow: 2px 0 5px rgba(0, 0, 0, 0.8);
   
  a {
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
    padding: 1rem;
  }

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }

    @media (max-width: 800px) {
position: absolute;
  right: 2rem;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5rem;
  background-color: white;
  padding: 0.5rem;
  margin: 0 1rem;
  box-shadow: 0 2px 2px 1px black;

  a {
    color: black;
    text-decoration: none;
    padding: 1rem;
  }

  a.active {
    color: white;
    background-color: black;
    border-radius: 5rem;
  }

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 1rem;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

export const LoginContainer = styled.div`
  border-radius: 2rem;
  background-color: white;
  padding: 1rem;
  margin: 0 2rem;
  box-shadow: 0 2px 2px 1px black;

  a {
    color: black;
    text-decoration: none;
  }

  @media (max-width: 800px) {
   display: none;
  }
`;

export const MobileMenuButton = styled.div`
  display: none;
  margin-right: auto;
  @media (max-width: 800px) {
    display: flex;

    svg {
    fill: black;
      width: 4rem;
      height: 4rem;
      cursor: pointer;
    }
  }
`;

export const MobileMenuOverlay = styled.div`
  display: none;
  @media (max-width: 800px) {
    display: flex;
    position: fixed;
    top: 7.9rem;
    right: 0;
    left:0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const MobileMenu = styled.div`
  background: #ffffffff;
  width: 100%;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 1rem 0;

  alig-items: center;


  a {
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 2rem;
    color: black;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
   

  }

  a.active {
    background-color: black;
    color: white;
  }
`;

