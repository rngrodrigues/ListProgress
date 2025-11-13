
import { Container } from "./MainContainer.styles";

interface IMainContainer {
    children: React.ReactNode;
}

const MainContainer:React.FC<IMainContainer> = ({children}) => {
  return <Container>{children}</Container>;
};

export default MainContainer;
