import { ArrowBack, BodyList, BottomContainer, MidContainer, TopContainer, TaskCategory, TaskTitle, ItemList, TaskProgress, IconsList, TextList } from './TaskList.styles.ts'
import type { TaskCardProps } from "../TaskCard/TaskCard";
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'; 
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { AddBtn } from '../Utils/Buttons'
import { CheckInput} from '../Utils/Inputs'


export const TaskList = ({ title, category, progress }: TaskCardProps) => {
    return (
        <BodyList>
            <TopContainer><TaskCategory>{ category }</TaskCategory><ArrowBack className="icon"/></TopContainer>
            <TaskTitle>{ title }</TaskTitle>
            <MidContainer>
            
  <ItemList>
                           <TextList> <CheckInput /> Guardar 10 reais</TextList>
                 
                 <IconsList>
    <EditIcon className="icon" />
    <TrashIcon className="icon" />
  </IconsList>
  </ItemList>

            </MidContainer>
            <BottomContainer>
                <TaskProgress>{ progress }</TaskProgress>
                <AddBtn /></BottomContainer>

        </BodyList>
    )
}