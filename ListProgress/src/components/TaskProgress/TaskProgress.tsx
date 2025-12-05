import { TaskProgressContainer, ProgressNumber } from "./TaskProgress.styles";

export const TaskProgress = ({ tasks }: { tasks: any[] }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <TaskProgressContainer $progress={progress}>
      <ProgressNumber $progress={progress}>
        {progress}%
      </ProgressNumber>
    </TaskProgressContainer>
  );
};
