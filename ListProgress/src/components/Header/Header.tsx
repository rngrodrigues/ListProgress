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
} from "./Header.styles";
import { ReactComponent as MetaIcon } from "../../assets/icons/meta.svg";
import { ReactComponent as DayNightIcon } from "../../assets/icons/day-and-night.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { useAuth } from "../../contexts/authContext";
import { toast } from "../Utils/Toasts/Toasts";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
          <MenuIcon onClick={() => setMobileMenuOpen(true)} />
        </MobileMenuButton>
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
          <NavLink to="/sobre">Sobre nós</NavLink>
          <DayNightIcon className="icon" />
        </MenuContainer>

      

        <LoginContainer>
          {user ? (
            <div
              ref={menuRef}
              style={{
                background: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "max-height 0.3s ease",
                maxHeight: open ? "120px" : "30px",
              }}
              onClick={() => setOpen((prev) => !prev)}
            >
              <div
                style={{
                  padding: "0.5rem",
                  textAlign: "center",
                  fontWeight: 500,
                  borderBottom: open ? "1px solid black" : "none",
                }}
              >
                {user.name ?? user.email}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  width: "100%",
                  padding: "0.5rem 0",
                  border: "none",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <LogoutIcon
                  style={{
                    width: "14px",
                    height: "14px",
                    marginRight: "4px",
                  }}
                />
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login">Fazer login</Link>
          )}
        </LoginContainer>
      </MainContainer>

      {mobileMenuOpen && (
        <MobileMenuOverlay onClick={() => setMobileMenuOpen(false)}>
          <MobileMenu onClick={(e) => e.stopPropagation()}>
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
          </MobileMenu>
        </MobileMenuOverlay>
      )}
    </>
  );
};

export default Header;
