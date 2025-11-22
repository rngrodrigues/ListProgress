 import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
  import * as S from "./Buttons.styles.ts";
 
  interface IButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export const AddBtn: React.FC<IButtonProps> = ({ onClick, children }) => {
  return (
    <S.AddBtn onClick={onClick}>
      <AddIcon className="icon" /> {children}
    </S.AddBtn>
  );
};

export const ConfirmButton: React.FC<IButtonProps> = ({ onClick }) => {
return (
<S.ConfirmButton onClick={onClick}>Confirmar</S.ConfirmButton>
  );
 }

