import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  MainContainer,
  LogoContainer,
  MenuContainer,
  LoginContainer
} from "./Header.styles.ts";
import { ReactComponent as MetaIcon } from "../../assets/icons/meta.svg";
import { ReactComponent as DayNightIcon } from "../../assets/icons/day-and-night.svg";
import { useAuth } from "../../contexts/authContext";

const Header = () => {
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return null;

  function handleLogout() {
    logout();
    setOpen(false);
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
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer", fontWeight: 500 }}
              onClick={() => setOpen(!open)}
            >
              {user.name ?? user.email}
            </span>

            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ddd",
                  padding: "1rem",
                  borderRadius: "6px",
                  minWidth: "120px",
                  zIndex: 10
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.6rem"
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Fazer login</Link>
        )}
      </LoginContainer>
    </MainContainer>
  );
};

export default Header;
