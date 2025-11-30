import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import * as S from "./Inputs.styles.ts";
import React from "react";

interface IInputProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<T>) => void;
}

export const SearchInput = () => {
  return (
    <S.SearchContainer tabIndex={0}>
      <SearchIcon className="icon" />
      <S.SearchInput
        type="text"
        aria-label="Pesquisar"
        placeholder="Pesquisar lista..."
      />
    </S.SearchContainer>
  );
};

export const TitleInput = ({ value, onChange }: IInputProps<HTMLInputElement>) => {
  return (
    <>
      <S.TitleLabel>Título</S.TitleLabel>
      <S.TitleInput
        type="text"
        aria-label="Título"
        placeholder="Escreva um título..."
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export const CategoryInput = ({ value, onChange }: IInputProps<HTMLInputElement>) => {
  return (
    <>
      <S.CategoryLabel>Categoria</S.CategoryLabel>
      <S.CategoryInput
        type="text"
        aria-label="Categoria"
        placeholder="Escreva uma categoria..."
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export const DescriptionInput = ({ value, onChange }: IInputProps<HTMLTextAreaElement>) => {
  return (
    <>
      <S.DescriptionLabel>Descrição</S.DescriptionLabel>
      <S.DescriptionInput
        rows={5}
        aria-label="Descrição"
        placeholder="Uma breve descrição..."
        value={value}
        onChange={onChange}
      />
    </>
  );
};

interface CheckInputProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckInput = ({ checked, onChange }: CheckInputProps) => {
  return <S.CheckInput type="checkbox" checked={checked} onChange={onChange} />;
};

