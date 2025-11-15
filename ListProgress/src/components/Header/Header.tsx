import { Link, NavLink } from "react-router-dom";
import { MainContainer, LogoContainer, 
  MenuContainer, LoginContainer } from "./Header.styles.ts";
import { ReactComponent as MetaIcon } from '../../assets/icons/meta.svg';
import { ReactComponent as DayNightIcon } from '../../assets/icons/day-and-night.svg';

const Header = () => {
  return (
    <MainContainer>
      <LogoContainer>
        <Link to="/">
      <MetaIcon className="icon" />
      ListProgress
        </Link>
      </LogoContainer>
      
      <MenuContainer>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/historico">Histórico</NavLink>
        <NavLink to="/comousar">Como usar?</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <DayNightIcon className="icon" />
      </MenuContainer>

      <LoginContainer>
        <Link to="/login">Entre ou Cadastre-se</Link>
      </LoginContainer>
    </MainContainer>
  );
};

export default Header;
