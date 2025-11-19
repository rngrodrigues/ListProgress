import { TaskCategory, TaskContainer, 
    TaskProgress, TaskTitle } from "./TaskCard.styles.ts";
import { ReactComponent as IIcon } from '../../assets/icons/i.svg';

const TaskCard = () => {
return(
<TaskContainer>
    <IIcon className="icon"></IIcon>
    <TaskCategory>Finanças </TaskCategory>
    <TaskTitle>Juntar 10 Mil Reais </TaskTitle>
    <TaskProgress>___________</TaskProgress>

</TaskContainer>
);
};

export default TaskCard;