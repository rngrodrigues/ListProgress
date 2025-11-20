import { TaskCategory, TaskContainer, TaskProgress, TaskTitle } from "./TaskCard.styles.ts";
import { ReactComponent as IIcon } from '../../assets/icons/i.svg';

type TaskCardProps = {
  title: string;
  category: string;
  progress?: number; 
};

const TaskCard = ({ title, category, progress }: TaskCardProps) => {
  return (
    <TaskContainer>
      <IIcon className="icon" />

      <TaskCategory>{category}</TaskCategory>
      <TaskTitle>{title}</TaskTitle>
      <TaskProgress>
        {progress !== undefined ? `${progress}%` : "___________"}
      </TaskProgress>
    </TaskContainer>
  );
};

export default TaskCard;
