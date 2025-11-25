import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowBack, BodyModal, MainContainer, MaxWidthForm, Title } from "./Modals.styles.ts";
import { TitleInput, CategoryInput, DescriptionInput } from '../Utils/Inputs';
import { ConfirmButton } from '../Utils/Buttons';
import { ReactComponent as MetaIcon } from '../../assets/icons/meta.svg';

interface IModalAddCard {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: any) => void;
}

export const ModalAddCard: React.FC<IModalAddCard> = ({ isOpen, onClose, onAddCard }) => {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
   if (!isOpen) return null;

  function handleConfirm() {
    const newCard = {
  id: Date.now().toString(),
  title,
  category,
  description,
  progress: 0
   };
    onAddCard(newCard);   
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
            <CategoryInput value={category} onChange={(e) => setCategory(e.target.value)} />
            <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
            <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />
          </MaxWidthForm>

          <ConfirmButton onClick={handleConfirm} />
        </MainContainer>
      </motion.div>
    </BodyModal>
  );
};

interface IModalEditCard {
  isOpen: boolean;
  onClose: () => void;
  card: {
    id: string;
    title: string;
    category: string;
    description: string;
  };
  onEditCard: (updatedCard: any) => void;
}

export const ModalEditCard: React.FC<IModalEditCard> = ({ isOpen, onClose, card, onEditCard }) => {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  if (!isOpen) return null;
  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setCategory(card.category);
      setDescription(card.description);
    }
  }, [card, isOpen]);

  function handleConfirm() {
    const updatedCard = {
      ...card,
      title,
      category,
      description
    };

    onEditCard(updatedCard);
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
            <MetaIcon className="icon" /> Editar lista
          </Title>

          <MaxWidthForm>
            <CategoryInput value={category} onChange={(e) => setCategory(e.target.value)} />
            <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
            <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />
          </MaxWidthForm>

          <ConfirmButton onClick={handleConfirm} />
        </MainContainer>
      </motion.div>
    </BodyModal>
  );
};

interface IModalAddTask {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: any) => void;
}

export const ModalAddTask: React.FC<IModalAddTask> = ({ isOpen, onClose, onAddTask }) => {
 const [description, setDescription] = useState("");
 const [title, setTitle] = useState("");

 if (!isOpen) return null;
 
  function handleConfirm() {
    const newTask = {
  id: Date.now().toString(),
  description,
  title,
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
            <MetaIcon className="icon" /> Adicionar tarefa
          </Title>

          <MaxWidthForm>
            <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
            <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />
          </MaxWidthForm>

          <ConfirmButton onClick={handleConfirm} />
        </MainContainer>
      </motion.div>
    </BodyModal>
);
};
interface IModalEditTask {
  isOpen: boolean;
  onClose: () => void;
  card: {
    id: string;
    title: string;
    description: string;
  };
  onEditCard: (updatedTask: any) => void;
}

export const ModalEditTask: React.FC<IModalEditTask> = ({ isOpen, onClose, card, onEditCard }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
    }
  }, [card, isOpen]);

  if (!isOpen) return null;

  function handleConfirm() {
    const updatedTask = {
      ...card,
      title,
      description
    };

    onEditCard(updatedTask);
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
            <MetaIcon className="icon" /> Editar tarefa
          </Title>

          <MaxWidthForm>
            <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
            <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />
          </MaxWidthForm>

          <ConfirmButton onClick={handleConfirm} />
        </MainContainer>
      </motion.div>
    </BodyModal>
  );
};
