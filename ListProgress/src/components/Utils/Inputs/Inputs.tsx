    import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
    import * as S from "./Inputs.styles.ts";

    export const SearchInput = () => {
        return (
  <S.SearchContainer tabIndex={0}>
  <SearchIcon className="icon" />
  <S.SearchInput type="text" aria-label="Pesquisar" placeholder="Pesquisar lista..." />
  </S.SearchContainer>
        )
    }

    export const TitleInput = () => {
        return (
            <>
            <S.TitleLabel>Titulo</S.TitleLabel>
<S.TitleInput type="text" aria-label="Titulo" placeholder="Escreva um titulo..." />
            </>
        );
    }
    export const CategoryInput = () => {
        return (
            <>
            <S.CategoryLabel>Categoria</S.CategoryLabel>
<S.CategoryInput type="text" aria-label="Categoria" placeholder="Escreva uma categoria..." />
            </>
        );
    }
    export const DescriptionInput = () => {
        return (
            <>
            <S.DescriptionLabel>Descrição</S.DescriptionLabel>
<S.DescriptionInput rows={5}  aria-label="Descrição" placeholder="Uma breve descrição..." />
            </>
        );
    }