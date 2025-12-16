import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  MainContainer,
  LogoContainer,
  MenuContainer,
  LoginContainer
} from "./Header.styles.ts";
import { ReactComponent as MetaIcon } from "../../assets/icons/meta.svg";
import { ReactComponent as DayNightIcon } from "../../assets/icons/day-and-night.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { useAuth } from "../../contexts/authContext";
import { toast } from "../Utils/Toasts/Toasts.ts";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
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
  );
};

export default Header;
