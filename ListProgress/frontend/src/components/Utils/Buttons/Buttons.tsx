import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
import * as S from "./Buttons.styles.ts";

export type IButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const GenericBtn: React.FC<IButtonProps> = ({
  onClick,
  children,
  disabled
}) => {
  return (
    <S.Btn onClick={onClick} disabled={disabled}>
      {children}
    </S.Btn>
  );
};

export const GenericBtnBlack: React.FC<IButtonProps> = ({
  onClick,
  children,
  disabled
}) => {
  return (
    <S.BtnBlack onClick={onClick} disabled={disabled}>
      {children}
    </S.BtnBlack>
  );
};

export const AddBtn: React.FC<IButtonProps> = ({
  onClick,
  children,
  disabled
}) => {
  return (
    <S.AddBtn onClick={onClick} disabled={disabled}>
      <AddIcon className="icon" /> {children}
    </S.AddBtn>
  );
};

export const ConfirmButton: React.FC<IButtonProps> = ({
  onClick,
  disabled
}) => {
  return (
    <S.ConfirmButton onClick={onClick} disabled={disabled}>
      Confirmar
    </S.ConfirmButton>
  );
};
