import { Container } from "./MainContainer.styles";

interface IMainContainer {
    children: React.ReactNode;
}

const MainContainer: React.FC<IMainContainer> = ({ children }) => {
  return (
    <Container

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </Container>
  );
};



export default MainContainer;
