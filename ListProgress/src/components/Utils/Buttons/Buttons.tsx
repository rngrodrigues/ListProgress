 import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
  import * as S from "./Buttons.styles.ts";
 
  interface IButtonProps {
  onClick?: () => void;
}

export const AddBtn: React.FC<IButtonProps> = ({ onClick }) => {
  return (
    <S.AddBtn onClick={onClick}>
      <AddIcon className="icon" /> Adicionar lista
    </S.AddBtn>
  );
};

export const ConfirmButton: React.FC<IButtonProps> = ({ onClick }) => {
return (
<S.ConfirmButton onClick={onClick}>Confirmar</S.ConfirmButton>
  );
 }

