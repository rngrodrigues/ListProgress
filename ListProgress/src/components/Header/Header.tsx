import { Link, NavLink } from "react-router-dom";
import { MainContainer, LogoContainer, MenuContainer, LoginContainer } from "./Header.styles.ts";

const Header = () => {
  return (
    <MainContainer>
      <LogoContainer><Link to="/">ListProgress</Link></LogoContainer>
      
 <MenuContainer>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/historico">Histórico</NavLink>
      <NavLink to="/comousar">Como Usar</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
    </MenuContainer>

      <LoginContainer>
        <Link to="/login">Entre ou Cadastre-se</Link>
      </LoginContainer>
    </MainContainer>
  );
};

export default Header;
