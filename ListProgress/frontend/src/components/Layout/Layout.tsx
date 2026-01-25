import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <>
      <Header />

      <main id="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
