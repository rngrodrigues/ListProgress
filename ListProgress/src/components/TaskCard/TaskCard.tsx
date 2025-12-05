import { useEffect, useState } from "react";
import { IconsList, TaskCategory, TaskContainer, TaskDescription, TaskTitle } from "./TaskCard.styles";
import { ReactComponent as IIcon } from "../../assets/icons/i.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/arrow-back.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { motion, AnimatePresence } from "framer-motion";
import { ModalEditCard } from "../../components/Modals";
import { TaskProgress } from "../TaskProgress/TaskProgress";


const API_URL = "http://192.168.1.9:3001"; 

export type TaskCardProps = {
  id: string;
  title: string;
  category: string;
  description: string;
  tasks: any[]; 
  onClick?: () => void;
  onEdit?: (updatedCard: any) => void; 
  onDelete?: (id: string) => void;     
};

export const TaskCard = ({id, title, category, description, onClick, onEdit, onDelete,}: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [open, setOpen] = useState(false); 
  const [cardTasks, setCardTasks] = useState<any[]>([]);

   useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        const data = await res.json();
        setCardTasks(data.filter((t: any) => t.card_id === id));
      } catch (err) {
        console.error("Erro ao carregar tasks:", err);
      }
    }
    fetchTasks();
  }, [id]);

  function flip(to: boolean) {
    setIsFlipping(true);
    setTimeout(() => setExpanded(to), 150);
  }

  async function handleDeleteCard() {
    if (onDelete) {
      await fetch(`${API_URL}/cards/${id}`, { method: "DELETE" });
      onDelete(id);
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
            onEditCard={async (updatedCard) => {
              try {
                await fetch(`${API_URL}/cards/${id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(updatedCard),
                });
                if (onEdit) onEdit(updatedCard);
              } catch (err) {
                console.error(err);
              }
              setOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
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
                  className="icons"
                  onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                />
                <TrashIcon
                  className="icons"
                  onClick={(e) => { e.stopPropagation(); handleDeleteCard(); }}
                />
              </IconsList>

              <BackIcon
                className="icon"
                onClick={(e) => { e.stopPropagation(); flip(false); }}
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
                onClick={(e) => { e.stopPropagation(); flip(true); }}
              />
            </>
          )}
        </TaskContainer>
      </motion.div>
    </>
  );
};
