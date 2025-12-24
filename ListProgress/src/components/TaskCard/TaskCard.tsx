import { useEffect, useState } from "react";
import {
  IconsList,
  TaskCategory,
  TaskContainer,
  TaskDescription,
  TaskTitle
} from "./TaskCard.styles";
import { ReactComponent as IIcon } from "../../assets/icons/i.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/arrow-back.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { motion, AnimatePresence } from "framer-motion";
import { ModalEditCard, ModalConfirm } from "../../components/Modals";
import { TaskProgress } from "../TaskProgress/TaskProgress";
import { useCardService } from "../../hooks/useCardServices";
import { useTaskService } from "../../hooks/useTaskServices";
import { toast } from "../Utils/Toasts/Toasts";


export type TaskCardProps = {
  className: string;
  id: string;
  title: string;
  category: string;
  description: string;
  onClick?: () => void;
  onEdit?: (updatedCard: any) => void;
  onDelete?: (id: string) => void;
};

export const TaskCard = ({
  className,
  id,
  title,
  category,
  description,
  onClick,
  onEdit,
  onDelete
}: TaskCardProps) => {

  const [expanded, setExpanded] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [open, setOpen] = useState(false);
  const [cardTasks, setCardTasks] = useState<any[]>([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const cardService = useCardService();
  const taskService = useTaskService();

useEffect(() => {
  async function fetchTasks() {
    try {
      const data = await taskService.listByCard(id);
      setCardTasks(data);
    } catch (err) {
      console.error("Erro ao carregar tasks:", err);
    }
  }

  fetchTasks();
}, [id, taskService]);


  function flip(to: boolean) {
    setIsFlipping(true);
    setTimeout(() => setExpanded(to), 50);
  }
function handleDeleteCard() {
  setConfirmDeleteOpen(true);
}


async function handleEditCard(updatedCard: any) {
  try {
    const data = await cardService.update(id, updatedCard);

    if (onEdit) onEdit(data);

    toast.info("Lista atualizada com sucesso!");
    setOpen(false);
  } catch (err) {
    console.error(err);
    toast.error("Erro ao atualizar a lista");
  }
}




  return (
    <>
      <AnimatePresence>
        {open && (
          <ModalEditCard
            isOpen={open}
            onClose={() => setOpen(false)}
            card={{ id, title, category, description }}
              onEditCard={handleEditCard}
          />
        )}
      </AnimatePresence>
      
            <AnimatePresence>
  {confirmDeleteOpen && (
    <ModalConfirm
      isOpen={confirmDeleteOpen}
      onClose={() => setConfirmDeleteOpen(false)}
      message="Tem certeza que deseja remover essa card? Essa ação é permanente."
      confirmText="Excluir"
      cancelText="Cancelar"
      onConfirm={() => {
        if (onDelete) onDelete(id);
        setConfirmDeleteOpen(false);
      }}
    />
  )}
</AnimatePresence>


      <motion.div
        className={className}
        animate={{ rotateY: isFlipping ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        onAnimationComplete={() => setIsFlipping(false)}
        style={{ transformStyle: "preserve-3d" }}
      >
        <TaskContainer onClick={onClick} style={{ backfaceVisibility: "hidden" }}>
          {expanded ? (
            <>
              <IconsList>
                <EditIcon
                  className="icons edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                  }}
                />
               <TrashIcon
  className="icons delete"
  onClick={(e) => {
    e.stopPropagation();
    handleDeleteCard();
  }}
/>
              </IconsList>

              <BackIcon
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  flip(false);
                }}
              />

              <TaskDescription>{description}</TaskDescription>
            </>
          ) : (
            <>
              <TaskCategory>{category}</TaskCategory>
              <TaskTitle>{title}</TaskTitle>

              <TaskProgress tasks={cardTasks} />

              <IIcon
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  flip(true);
                }}
              />
            </>
          )}
        </TaskContainer>
      </motion.div>
    </>
  );
};
