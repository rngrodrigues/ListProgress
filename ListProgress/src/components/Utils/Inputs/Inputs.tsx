    import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
    import { SearchInput, SearchContainer } from "./Inputs.styles.ts";
    const Inputs = () => {
        return (
  <SearchContainer tabIndex={0}>
  <SearchIcon className="icon" />
  <SearchInput placeholder="Pesquisar lista..." />
</SearchContainer>
        )
    }
 export default Inputs;