import { useState } from "react";
import {
  IconsList, TaskCategory, TaskContainer, 
  TaskDescription, TaskTitle,} from "./TaskCard.styles";
import { ReactComponent as IIcon } from "../../assets/icons/i.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/arrow-back.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { motion, AnimatePresence } from "framer-motion";
import { ModalEditCard } from "../../components/Modals";
import { TaskProgress } from "../TaskProgress/TaskProgress"

export type TaskCardProps = {
  id: string;
  title: string;
  category: string;
  description: string;
  progress?: number;
  onClick?: () => void;
  onEdit?: (updatedCard: any) => void; 
  onDelete?: (id: string) => void;     
};

export const TaskCard = ({id, title, category, description, onClick, onEdit, onDelete,}: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [open, setOpen] = useState(false); 

  function flip(to: boolean) {
    setIsFlipping(true);
    setTimeout(() => setExpanded(to), 150);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <ModalEditCard
            isOpen={open}
            onClose={() => setOpen(false)}
            card={{ id, title, category, description }}
            onEditCard={(updatedCard) => {
              if (onEdit) onEdit(updatedCard); 
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                  }}
                />
                <TrashIcon
                  className="icons"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDelete) onDelete(id);
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
              <TaskProgress />
              
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
