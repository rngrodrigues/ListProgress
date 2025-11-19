 import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
  import * as S from "./Buttons.styles.ts";
 
  interface ButtonProps {
  onClick?: () => void;
}

export const AddBtn: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <S.AddBtn onClick={onClick}>
      <AddIcon className="icon" /> Adicionar lista
    </S.AddBtn>
  );
};

 export const ConfirmButton = () => {
return (
<S.ConfirmButton>Confirmar</S.ConfirmButton>
  );
 }

