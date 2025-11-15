    import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
    import * as S from "./Inputs.styles.ts";
    export const SearchInput = () => {
        return (
  <S.SearchContainer tabIndex={0}>
  <SearchIcon className="icon" />
  <S.SearchInput placeholder="Pesquisar lista..." />
</S.SearchContainer>
        )
    }
