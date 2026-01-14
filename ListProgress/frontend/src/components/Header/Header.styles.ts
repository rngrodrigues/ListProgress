import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 1920px;
  height: 5vh;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 800px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.bg} url('https://transparenttextures.com/patterns/xv.png') repeat;  
    box-shadow: 2px 0 10px ${({ theme }) => theme.colors.shadow};
    margin: 0;
    padding: 1rem;
    height: auto;
    z-index: 1;
  }
`;

export const LogoContainer = styled.div`
  border-radius: 5rem;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.bg};
  margin: 0 auto 0 2rem;
  padding: 0.25rem;
  box-shadow: 2px 0 5px ${({ theme }) => theme.colors.shadow};

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    padding: 0.5rem;
  }

  .icon {
    fill: ${({ theme }) => theme.colors.text};
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
  background: ${({ theme }) => theme.colors.bg} url('https://transparenttextures.com/patterns/xv.png') repeat; 
  padding: 0.5rem;
  margin: 0 1rem;
  box-shadow: 0 2px 2px 1px ${({ theme }) => theme.colors.shadow};

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    padding: 1rem;
    transition: all 0.3s ease;
  }

  a.active {
    color: ${({ theme }) => theme.colors.hoverText};
    background: ${({ theme }) => theme.colors.hover};
    border-radius: 5rem;
  }

  a:hover {
   color: white;
    background: lightgray;
    border-radius: 5rem;
  }

  .icon {
   fill: ${({ theme }) => theme.colors.text};
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 1rem;
    cursor: pointer;
      transition: transform 0.4s ease;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

export const LoginContainer = styled.div`
  border-radius: 2rem;
  background: ${({ theme }) => theme.colors.bg} url('https://transparenttextures.com/patterns/xv.png') repeat; 
  padding: 1rem;
  margin: 0 2rem;
  box-shadow: 0 2px 2px 1px ${({ theme }) => theme.colors.shadow};

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: transform 0.3s ease;

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
     fill: ${({ theme }) => theme.colors.text};
      width: 4rem;
      height: 4rem;
      cursor: pointer;
    }
  }
`;

export const MobileMenuOverlay = styled.div<{ $open: boolean }>`
  display: none;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.3s ease; 
  @media (max-width: 800px) {
    display: flex;
    position: fixed;
    top: 6rem;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  background: ${({ theme }) => theme.colors.bg} url('https://transparenttextures.com/patterns/xv.png') repeat;  
  width: 100%;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 1rem 0;
  transform: ${({ $open }) =>
    $open ? "translateX(0)" : "translateX(-100%)"};
  transition: all 0.35s ease-in-out;

  a {
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    border-bottom: 1px solid gray;
  }

  a.active:not(.mobile-login) {
    background: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.hoverText};
  }

  .mobile-login {
  font-size: 1.6rem;
    max-width: 100px;
    min-height: 35px;
    margin: 0 auto;
    border-radius: 2rem;
    box-shadow: 0 2px 2px 1px ${({ theme }) => theme.colors.shadow};
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  }
`;
interface OpenProps {
  $open: boolean;
}

export const UserDropdown = styled.div<OpenProps>`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: max-height 0.3s ease;
  max-height: ${({ $open }) => ($open ? "120px" : "30px")};
`;

export const UserName = styled.div<OpenProps>`
  padding: 0.5rem;
  text-align: center;
  font-weight: 500;
  border-bottom: ${({ $open }) => ($open ? "1px solid gray" : "none")};
`;

export const LogoutButton = styled.button`
 color:${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  background: transparent;
  &:hover {
    background: lightgray;
  }
  svg {
  fill:${({ theme }) => theme.colors.text};
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
`;


export const MobileFooter = styled.div`
  margin-top: auto;
  padding: 2rem;
  border-top: 1px solid gray;
  text-align: center;
`;

export const MobileUserDropdown = styled.div<OpenProps>`
 color:${({ theme }) => theme.colors.text};
 font-size: 2rem;
  font-weight: bold;
   border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: max-height 0.3s ease;
  max-width: 50%;
  margin: 0 auto;
  max-height: ${({ $open }) => ($open ? "120px" : "30px")};

`;

export const MobileLogoutButton = styled.button`
  color:${({ theme }) => theme.colors.text};
  background: transparent;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: gray;
  }
  svg {
    fill:${({ theme }) => theme.colors.text};
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
`;

export const MobileThemeToggle = styled.div`
 fill:${({ theme }) => theme.colors.text};
  position: absolute;
  bottom: 2.5rem;
  right: 1rem;
  cursor: pointer;
  svg {
    width: 2.2rem;
    height: 2.2rem;
      transition: transform 0.4s ease;
  }
`;

