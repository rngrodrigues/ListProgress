import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  MainContainer,
  LogoContainer,
  MenuContainer,
  LoginContainer,
  MobileMenuButton,
  MobileMenuOverlay,
  MobileMenu,
  MobileThemeToggle,
  MobileFooter,
  MobileUserDropdown,
  MobileLogoutButton,
  UserName,
  LogoutButton,
  UserDropdown,
} from "./Header.styles";
import { ReactComponent as MetaIcon } from "../../assets/icons/meta.svg";
import { ReactComponent as DayNightIcon } from "../../assets/icons/day-and-night.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { useAuth } from "../../contexts/authContext";
import { toast } from "../Utils/Toasts/Toasts";
import { useThemeContext } from "../../contexts/themeContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { toggleTheme } = useThemeContext();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedDesktop =
        desktopMenuRef.current?.contains(target);

      const clickedMobile =
        mobileMenuRef.current?.contains(target);

      if (!clickedDesktop && !clickedMobile) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    logout();
    setOpen(false);
    toast.successDelete("Sessão encerrada!");
    navigate("/login");
  }

  return (
    <>
      <MainContainer>
        <MobileMenuButton>
          <MenuIcon onClick={() => setMobileMenuOpen(prev => !prev)} />
        </MobileMenuButton>

        <LogoContainer>
          <Link to="/">
            <MetaIcon className="icon" />
            ListProgress
          </Link>
        </LogoContainer>

        <MenuContainer>
          <NavLink className="home" to="/" end>
            Home
          </NavLink>
          <NavLink to="/historico">Histórico</NavLink>
          <NavLink to="/comousar">Como usar?</NavLink>
          <NavLink to="/sobre">Sobre nós</NavLink>
          <DayNightIcon className="icon" onClick={toggleTheme} />
        </MenuContainer>

        <LoginContainer>
          {user ? (
            <UserDropdown
              ref={desktopMenuRef}   
              $open={open}
            >
              <UserName
                $open={open}
                onClick={() => setOpen(prev => !prev)}
              >
                {user.name ?? user.email}
              </UserName>

              <LogoutButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
              >
                <LogoutIcon />
                Sair
              </LogoutButton>
            </UserDropdown>
          ) : (
            <Link to="/login">Fazer login</Link>
          )}
        </LoginContainer>
      </MainContainer>

      <MobileMenuOverlay
        $open={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      >
        <MobileMenu
          $open={mobileMenuOpen}
          onClick={(e) => e.stopPropagation()}
        >
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/historico" onClick={() => setMobileMenuOpen(false)}>
            Histórico
          </NavLink>
          <NavLink to="/comousar" onClick={() => setMobileMenuOpen(false)}>
            Como usar?
          </NavLink>
          <NavLink to="/sobre" onClick={() => setMobileMenuOpen(false)}>
            Sobre nós
          </NavLink>

          <MobileFooter>
            {user ? (
              <MobileUserDropdown
                ref={mobileMenuRef}  
                $open={open}
              >
                <UserName
                  $open={open}
                  onClick={() => setOpen(prev => !prev)}
                >
                  {user.name ?? user.email}
                </UserName>

                <MobileLogoutButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                >
                  <LogoutIcon />
                  Sair
                </MobileLogoutButton>
              </MobileUserDropdown>
            ) : (
              <NavLink
                className="mobile-login"
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fazer login
              </NavLink>
            )}

            <MobileThemeToggle>
              <DayNightIcon onClick={toggleTheme} />
            </MobileThemeToggle>
          </MobileFooter>
        </MobileMenu>
      </MobileMenuOverlay>
    </>
  );
};

export default Header;
