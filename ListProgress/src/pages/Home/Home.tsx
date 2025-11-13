import MainContainer from "../../components/MainContainer/MainContainer.tsx";
import Buttons from "../../components/Utils/Buttons/Buttons.tsx";
import Inputs from "../../components/Utils/Inputs/Inputs.tsx";
import { GridContainer, PaginationContainer, TopContainer } from "./Home.styles.ts";

const Home = () => {
  return (
    <MainContainer>
      <TopContainer>
        <Buttons />
        <Inputs />
      </TopContainer>

      <GridContainer>
        <div className="div-grid"></div>
        <div className="div-grid"></div>
        <div className="div-grid"></div>
        <div className="div-grid"></div>
        <div className="div-grid"></div>
        <div className="div-grid"></div>
      </GridContainer>

      <PaginationContainer />
    </MainContainer>
  );
};

export default Home;
