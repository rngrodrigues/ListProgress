import { Outlet } from "react-router-dom";
import Header from "../Header";
import MainContainer from "../MainContainer"

const Layout = () => {

  return (
         <>
         <Header />
          <MainContainer />
        <Outlet />
        </>
  
  );
};

export default Layout;
