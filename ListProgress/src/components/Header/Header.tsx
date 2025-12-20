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
                  transition: "background 0.2s",
                }}
                 onMouseEnter={(e) =>
                (e.currentTarget.style.background = "lightgray")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "white")
              }
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

       
        <MobileMenuOverlay $open={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}>
          <MobileMenu  $open={mobileMenuOpen}
          onClick={(e) => e.stopPropagation()}>
            <NavLink className="home-mobile" to="/" end onClick={() => setMobileMenuOpen(false)}>
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
        
            <div
              style={{
                marginTop: "auto",
                padding: "2rem",
                borderTop: "1px solid rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
            >
              {user ? (
                <div
              ref={menuRef}
              style={{
                
                fontSize:"2.2rem",
                fontWeight:"bold",
                background: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "max-height 0.3s ease",
                maxWidth:"80px",
                margin: "0 auto",
                maxHeight: open ? "120px" : "30px",
              }}
              
            >
              <div
              onClick={() => setOpen((prev) => !prev)}
                style={{
                  padding: "0.5rem",
                  textAlign: "center",
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
                fontSize: "20px !important",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  width: "100%",
                  padding: "0.5rem 0",
                  border: "none",
                  background: "white",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                 onMouseEnter={(e) =>
                (e.currentTarget.style.background = "lightgray")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "white")
              }
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
                <NavLink   className="mobile-login"
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                 
                >
                  Fazer login
                </NavLink>
                
              )}
               <DayNightIcon
    style={{
      width: "3rem",
    height: "3rem",
      position: "absolute",
      bottom: "2.5rem",
      right: "1rem",
      cursor: "pointer",
    }}
  />
            </div>
          </MobileMenu>
        </MobileMenuOverlay>
      
    </>
  );
};

export default Header;
