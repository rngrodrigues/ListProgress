import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

import {
  IconClose,
  BodyModal,
  MainContainer,
  MaxWidthForm,
  Title
} from "./Modals.styles.ts";

import {
  TitleInput,
  CategoryInput,
  DescriptionInput
} from "../Utils/Inputs";
import { ConfirmButton } from "../Utils/Buttons";
import { ReactComponent as MetaIcon } from "../../assets/icons/meta.svg";

// Portal
function ModalPortal({ children }: { children: React.ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

// BaseModal reutilizável
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <BodyModal
        as={motion.div}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.1 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          {children}
        </motion.div>
      </BodyModal>
    </ModalPortal>
  );
};

// ----------------- MODAIS -----------------

// ModalAddCard
interface IModalAddCard {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: any) => void;
}

export const ModalAddCard: React.FC<IModalAddCard> = ({ isOpen, onClose, onAddCard }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setCategory("");
      setDescription("");
    }
  }, [isOpen]);

  function handleConfirm() {
    onAddCard({ title, category, description });
    onClose();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <MainContainer>
        <IconClose onClick={onClose} />

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
    </BaseModal>
  );
};

// ModalEditCard
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

  useEffect(() => {
    if (card && isOpen) {
      setTitle(card.title);
      setCategory(card.category);
      setDescription(card.description);
    }
  }, [card, isOpen]);

  function handleConfirm() {
    onEditCard({ ...card, title, category, description });
    onClose();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <MainContainer>
        <IconClose onClick={onClose} />

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
    </BaseModal>
  );
};

// ModalAddTask
interface IModalAddTask {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: any) => void;
  card_id: string;
}

export const ModalAddTask: React.FC<IModalAddTask> = ({ isOpen, onClose, onAddTask, card_id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
    }
  }, [isOpen]);

  function handleConfirm() {
    onAddTask({ title, description, card_id });
    onClose();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <MainContainer>
        <IconClose onClick={onClose} />

        <Title>
          <MetaIcon className="icon" /> Adicionar tarefa
        </Title>

        <MaxWidthForm>
          <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
          <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />
        </MaxWidthForm>

        <ConfirmButton onClick={handleConfirm} />
      </MainContainer>
    </BaseModal>
  );
};

// ModalEditTask
interface IModalEditTask {
  isOpen: boolean;
  onClose: () => void;
  task: {
    title: string;
    description: string;
  };
  onEditTask: (updatedTask: any) => void;
}

export const ModalEditTask: React.FC<IModalEditTask> = ({ isOpen, onClose, task, onEditTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task, isOpen]);

  function handleConfirm() {
    onEditTask({ ...task, title, description });
    onClose();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <MainContainer>
        <IconClose onClick={onClose} />

        <Title>
          <MetaIcon className="icon" /> Editar tarefa
        </Title>

        <MaxWidthForm>
          <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
          <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />
        </MaxWidthForm>

        <ConfirmButton onClick={handleConfirm} />
      </MainContainer>
    </BaseModal>
  );
};
