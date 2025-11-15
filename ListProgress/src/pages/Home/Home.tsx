import MainContainer from "../../components/MainContainer";
import TaskCard from "../../components/TaskCard";
import Footer from "../../components/Footer";
import { AddBtn } from "../../components/Utils/Buttons";
import { SearchInput } from "../../components/Utils/Inputs";
import { GridContainer, PaginationContainer, TopContainer } from "./Home.styles.ts";



const Home = () => {
  
  return (
     <>
    <MainContainer>
      <TopContainer>
        <AddBtn />
        <SearchInput />
      </TopContainer>
      <GridContainer>
   <TaskCard />
   <TaskCard />
   <TaskCard />
   <TaskCard />
      </GridContainer>
      <PaginationContainer></PaginationContainer>
    </MainContainer>
<Footer />
</>
  );
};

export default Home;
