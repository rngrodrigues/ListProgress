import { TaskCategory, TaskContainer, TaskProgress, TaskTitle } from "./TaskCard.styles.ts";
import { ReactComponent as IIcon } from '../../assets/icons/i.svg';

export type TaskCardProps = {
  id?: string;
  title: string;
  category: string;
  progress?: number;
  onClick?: () => void;
};

export const TaskCard = ({ title, category, onClick }: TaskCardProps) => {
  return (
    <TaskContainer onClick={onClick}>
      <TaskCategory>{category}</TaskCategory>
      <IIcon className="icon" />
      <TaskTitle>{title}</TaskTitle>

      <TaskProgress progress={80}>
        <span>{80}%</span>
      </TaskProgress>
    </TaskContainer>
  );
};

