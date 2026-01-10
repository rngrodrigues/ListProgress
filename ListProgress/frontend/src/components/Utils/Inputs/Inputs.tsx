import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as NameIcon } from '../../../assets/icons/name.svg';
import { ReactComponent as EmailIcon } from '../../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../../assets/icons/password.svg';
import * as S from "./Inputs.styles";
import React from "react";

type IInputProps<T extends HTMLElement> =
  React.InputHTMLAttributes<T> & {
    value: string;
  };

export const SearchInput = ({ value, onChange }: IInputProps<HTMLInputElement>) => {
  return (
    <S.SearchContainer tabIndex={0}>
      <SearchIcon className="icon" />
      <S.SearchInput
      value={value}
        onChange={onChange}
        type="text"
        aria-label="Pesquisar"
        placeholder="Pesquisar lista..."
        autoComplete="off"
      />
    </S.SearchContainer>
  );
};

export const TitleInput = ({ value, onChange }: IInputProps<HTMLInputElement>) => {
  return (
    <>
      <S.TitleLabel>Título</S.TitleLabel>
      <S.TitleInput
        required
        type="text"
        aria-label="Título"
        placeholder="Escreva um título..."
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </>
  );
};

export const CategoryInput = ({ value, onChange }: IInputProps<HTMLInputElement>) => {
  return (
    <>
      <S.CategoryLabel>Categoria</S.CategoryLabel>
      <S.CategoryInput
        required
        type="text"
        aria-label="Categoria"
        placeholder="Escreva uma categoria..."
        value={value}
        onChange={onChange}
        autoComplete="off"
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
        autoComplete="off"
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

export const NameInput = ({ value, onChange }: IInputProps<HTMLInputElement>) => {
  return (
    <S.NameContainer>
      <NameIcon className="icon" />
      <S.NameInput
        required
        type="text"
        aria-label="Nome"
        placeholder="Nome"
        value={value}
        onChange={onChange}
        autoComplete="name"
      />
    </S.NameContainer>
  );
};

export const EmailInput = ({ value, onChange }: IInputProps<HTMLInputElement>) => {
  return (
    <S.EmailContainer>
      <EmailIcon className="icon" />
      <S.EmailInput
        required
        type="email"
        aria-label="Email"
        placeholder="Email"
        value={value}
        onChange={onChange}
        autoComplete="email"
      />
    </S.EmailContainer>
  );
};

export const PasswordInput = ({ value, onChange, isLogin = true }: IInputProps<HTMLInputElement> & { isLogin?: boolean }) => {
  return (
    <S.PasswordContainer>
      <PasswordIcon className="icon" />
      <S.PasswordInput
        required
        type="password"
        aria-label="Senha"
        placeholder="Senha"
        value={value}
        onChange={onChange}
        autoComplete={isLogin ? "current-password" : "new-password"}
      />
    </S.PasswordContainer>
  );
};
