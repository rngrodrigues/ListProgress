import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as NameIcon } from '../../../assets/icons/name.svg';
import { ReactComponent as EmailIcon } from '../../../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../../../assets/icons/password.svg';
import * as S from "./Inputs.styles";
import React from "react";

type IInputProps<T extends HTMLElement> =
  React.InputHTMLAttributes<T> & {
    value: string;
    name: string;
  };

export const SearchInput = ({ value, onChange, name }: IInputProps<HTMLInputElement>) => {
  return (
    <S.SearchContainer tabIndex={0}>
      <SearchIcon className="icon" />
      <S.SearchInput
        id={name}
        name={name}
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

export const TitleInput = ({ value, onChange, name }: IInputProps<HTMLInputElement>) => {
  return (
    <>
      <S.TitleLabel htmlFor={name}>Título</S.TitleLabel>
      <S.TitleInput
        id={name}
        name={name}
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

export const CategoryInput = ({ value, onChange, name }: IInputProps<HTMLInputElement>) => {
  return (
    <>
      <S.CategoryLabel htmlFor={name}>Categoria</S.CategoryLabel>
      <S.CategoryInput
        id={name}
        name={name}
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

export const DescriptionInput = ({ value, onChange, name }: IInputProps<HTMLTextAreaElement>) => {
  return (
    <>
      <S.DescriptionLabel htmlFor={name}>Descrição</S.DescriptionLabel>
      <S.DescriptionInput
        id={name}
        name={name}
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
  name: string;
}

export const CheckInput = ({ checked, onChange, name }: CheckInputProps) => {
  return (
    <S.CheckInput
      id={name}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export const NameInput = ({ value, onChange, name }: IInputProps<HTMLInputElement>) => {
  return (
    <S.NameContainer>
      <NameIcon className="icon" />
      <S.NameInput
        id={name}
        name={name}
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

export const EmailInput = ({ value, onChange, name }: IInputProps<HTMLInputElement>) => {
  return (
    <S.EmailContainer>
      <EmailIcon className="icon" />
      <S.EmailInput
        id={name}
        name={name}
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

export const PasswordInput = ({
  value,
  onChange,
  name,
  isLogin = true
}: IInputProps<HTMLInputElement> & { isLogin?: boolean }) => {
  return (
    <S.PasswordContainer>
      <PasswordIcon className="icon" />
      <S.PasswordInput
        id={name}
        name={name}
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
