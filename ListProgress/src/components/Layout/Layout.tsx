import { Outlet, Link } from "react-router-dom";
import "./Layout.styles.ts";

const Layout = () => {
  const today = new Date().toLocaleDateString("pt-BR");

  return (
    <div>
      <header className="header">
        <h1 className="logo">Logo</h1>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/historico">Histórico</Link>
          <Link to="/comousar">Como Usar</Link>
          <Link to="/faq">FAQ</Link>
        </nav>

        <div className="date">Bem-vindo! Hoje é {today}</div>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
