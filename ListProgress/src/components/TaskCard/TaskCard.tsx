import { useState } from "react";
import { IconsList, TaskCategory, TaskContainer, TaskDescription, TaskProgress, TaskTitle } from "./TaskCard.styles";
import { ReactComponent as IIcon } from '../../assets/icons/i.svg';
import { ReactComponent as BackIcon } from '../../assets/icons/arrow-back.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'; 
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { motion } from "framer-motion";


export type TaskCardProps = {
  id?: string;
  title: string;
  category: string;
  description: string;
  progress?: number;
  onClick?: () => void;
};

export const TaskCard = ({ title, category, description, onClick }: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  function flip(to: boolean) {
    setIsFlipping(true); 
    setTimeout(() => setExpanded(to), 150);
  }

  return (
    <motion.div
      animate={{ rotateY: isFlipping ? 180 : 0 }}
      transition={{ duration: 0.20 }}
      onAnimationComplete={() => setIsFlipping(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <TaskContainer onClick={onClick} style={{ backfaceVisibility: "hidden" }}>
        {expanded ? (
          <>
           <IconsList>
                            <EditIcon className="icons" />
                            <TrashIcon className="icons" />
                          </IconsList>
            <BackIcon className="icon" onClick={(e) =>{ e.stopPropagation(); flip(false);}} />
            <TaskDescription>
              {description}
            </TaskDescription>
          </>
        ) : (
          <>
            <TaskCategory>{category}</TaskCategory>
            <TaskTitle>{title}</TaskTitle>
            <TaskProgress progress={47}>
              <span>47%</span>
            </TaskProgress>
            <IIcon className="icon" onClick={(e) =>{ e.stopPropagation(); flip(true);}} />
          </>
        )}
      </TaskContainer>
    </motion.div>
  );
};
