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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color:white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.8);
  margin: 0; 
  padding: 1rem;   
  height: auto;
  z-index:1;
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
    padding: 0.5rem;
  }

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }

    @media (max-width: 800px) {
  position: absolute;
  right: 0.5rem;
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
    transition: all ease 0.5s;
  }

  a.active {
    color: white;
    background-color: black;
    border-radius: 5rem;
  }
    a:hover { 
    color: white; 
    background-color: 
    gray; 
    border-radius: 5rem; }

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
  display: inline-block;
    color: black;
    text-decoration: none;
    transition: transform ease 0.5s;
  }
    a:hover { 
    transform: scale(1.01); 
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

export const MobileMenuOverlay = styled.div<{ $open: boolean }>`
display:none;
opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.3s ease;
  @media (max-width: 800px) {
    display: flex;
    position: fixed;
    top: 6rem;
    right: 0;
    left:0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  background: #ffffffff;
  width: 100%;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 1rem 0;
transform: ${({ $open }) =>
    $open ? "translateX(0)" : "translateX(-100%)"};
 transition: transform 0.35s ease-in-out;
  will-change: transform;

  .home-mobile {
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  }

  a {
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 2rem;
    color: black;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }


a.active:not(.mobile-login) {
    background-color: black;
    color: white;
  }
    .mobile-login {
    box-shadow: 0 2px 2px 1px black;
    max-width: 9rem;
    margin: 0 auto;
    font-size: 1.6rem;
    min-height: unset;
   border-radius: 2rem;
  background-color: white;
  padding: 1rem;
  }
`;

