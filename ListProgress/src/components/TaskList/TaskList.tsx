import { ArrowBack, BodyList, BottomContainer, MidContainer, TopContainer, TaskCategory, TaskTitle, ItemList, IconsList, TextList } from './TaskList.styles.ts'
import type { TaskCardProps } from "../TaskCard/TaskCard";
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'; 
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as IIcon } from '../../assets/icons/i.svg';
import { AddBtn } from '../Utils/Buttons'
import { CheckInput } from '../Utils/Inputs'
import { TaskProgress } from "../TaskCard/TaskCard.styles.ts";
import { ModalAddTask } from "../../components/Modals";
import { useState } from 'react';

type TaskListProps = TaskCardProps & {
  onBack: () => void;
};

export const TaskList = ({ title, category, progress = 0, onBack }: TaskListProps) => {
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState<any[]>([]);
  
    return (
    
        <BodyList>   
           <ModalAddTask
                      isOpen={open}
                      onClose={() => setOpen(false)} 
                       onAddTask={(newTask: any) => {
              setTasks(prev => [...prev, newTask]);
              setOpen(false);
            }}          
                    />      
            <TopContainer>
              <TaskCategory>{ category }</TaskCategory>
              <ArrowBack className="icon" onClick={onBack}/>
            </TopContainer>

            <TaskTitle>{ title }</TaskTitle>

            <MidContainer>
              <ItemList>
                <TextList> <CheckInput />Guardar 10 reais</TextList>
                <IconsList>
                  <EditIcon className="icon" />
                  <TrashIcon className="icon" />
                  <IIcon className="icon" />
                </IconsList>
              </ItemList>
               {tasks.map((task, index) => (
    <ItemList key={index}>
      <TextList>
        <CheckInput /> {task.title}
      </TextList>

      <IconsList>
        <EditIcon className="icon" />
        <TrashIcon className="icon" />
        <IIcon className="icon" />
      </IconsList>
    </ItemList>
  ))}                         
            </MidContainer>

            <BottomContainer>
                 <TaskProgress progress={47}>
                        <span>{47}%</span>
                      </TaskProgress>
                <AddBtn onClick={() => setOpen(true)}>Adicionar tarefa</AddBtn>
            </BottomContainer>
        </BodyList>
    )
}
