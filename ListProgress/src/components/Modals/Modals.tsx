import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowBack, BodyModal, MainContainer, MaxWidthForm, Title } from "./Modals.styles.ts";
import { TitleInput, CategoryInput, DescriptionInput } from '../Utils/Inputs';
import { ConfirmButton } from '../Utils/Buttons';
import { ReactComponent as MetaIcon } from '../../assets/icons/meta.svg';

interface IModalAddList {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: any) => void;
}

export const ModalAddList: React.FC<IModalAddList> = ({ onClose, onAddTask }) => {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");


  function handleConfirm() {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      category,
      description,
      progress: 0
    };

    onAddTask(newTask);   
    onClose();            
  }

  return (
    <BodyModal
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.1 }}
        style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", height: "100%"
        }}
      >
        <MainContainer>
          <ArrowBack onClick={onClose} />

          <Title>
            <MetaIcon className="icon" /> Adicionar lista
          </Title>

          <MaxWidthForm>
            <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
            <CategoryInput value={category} onChange={(e) => setCategory(e.target.value)} />
            <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />
          </MaxWidthForm>

          <ConfirmButton onClick={handleConfirm} />
        </MainContainer>
      </motion.div>
    </BodyModal>
  );
};
