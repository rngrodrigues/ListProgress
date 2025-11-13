import { AddBtn, Container, GridContainer, 
    PaginationContainer, TopContainer, 
    SearchInput,
    SearchContainer} from "./MainContainer.styles.ts";
    import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
    import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const MainContainer = () => {
 return (
 <Container>
<TopContainer>
    <AddBtn> <AddIcon className="icon" />Adicionar lista</AddBtn>
  <SearchContainer tabIndex={0}>
  <SearchIcon className="icon" />
  <SearchInput placeholder="Pesquisar lista..." />
</SearchContainer>

</TopContainer>
<GridContainer>
    <div className="div-grid"></div>
    <div className="div-grid"></div>
    <div className="div-grid"></div>
    <div className="div-grid"></div>
    <div className="div-grid"></div>
    <div className="div-grid"></div>
</GridContainer>
<PaginationContainer>
</PaginationContainer>
 </Container>

)};

export default MainContainer;