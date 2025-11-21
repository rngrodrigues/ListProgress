import { TaskCategory, TaskContainer, TaskProgress, TaskTitle } from "./TaskCard.styles.ts";
import { ReactComponent as IIcon } from '../../assets/icons/i.svg';

export type TaskCardProps = {
  title: string;
  category: string;
  progress?: number; 
};

export const TaskCard = ({ title, category, progress }: TaskCardProps) => {
  return (
    <TaskContainer>
      <TaskCategory>{category}</TaskCategory>
      <IIcon className="icon" />
      <TaskTitle>{title}</TaskTitle>
      <TaskProgress>
        {progress !== undefined ? `${progress}%` : "___________"}
      </TaskProgress>
    </TaskContainer>
  );
};

