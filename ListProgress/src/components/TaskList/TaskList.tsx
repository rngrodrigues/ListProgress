import { ArrowBack, BodyList, BottomContainer, MidContainer, TopContainer, TaskCategory, TaskTitle, ItemList, IconsList, TextList } from './TaskList.styles.ts'
import type { TaskCardProps } from "../TaskCard/TaskCard";
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'; 
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as IIcon } from '../../assets/icons/i.svg';
import { AddBtn } from '../Utils/Buttons'
import { CheckInput } from '../Utils/Inputs'
import { TaskProgress } from "../TaskCard/TaskCard.styles.ts";
import { ModalAddTask, ModalEditTask } from "../../components/Modals";
import { useState } from 'react';


type TaskListProps = TaskCardProps & {
    id: string;
  title: string;
  category: string;
  onBack: () => void;
};

export const TaskList = ({ title, category, onBack }: TaskListProps) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  function handleEditTask(updatedTask: any) {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setOpenEdit(false);
  }

  function handleDeleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <BodyList>   

      <ModalAddTask
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)} 
        onAddTask={(newTask: any) => {
          setTasks(prev => [...prev, newTask]);
          setOpenAdd(false);
        }}          
      />


      {selectedTask && (
        <ModalEditTask
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          card={selectedTask}
          onEditCard={handleEditTask}
        />
      )}

      <TopContainer>
        <TaskCategory>{ category }</TaskCategory>
        <ArrowBack className="icon" onClick={onBack}/>
      </TopContainer>

      <TaskTitle>{ title }</TaskTitle>

      <MidContainer>

        <ItemList>
          <TextList><CheckInput />Guardar 10 reais</TextList>
          <IconsList>
            <EditIcon className="icon" />
            <TrashIcon className="icon" />
            <IIcon className="icon" />
          </IconsList>
        </ItemList>


        {tasks.map((task) => (
          <ItemList key={task.id}>
            <TextList>
              <CheckInput /> {task.title}
            </TextList>
            <IconsList>
              <EditIcon 
                className="icon" 
                onClick={() => {
                  setSelectedTask(task);
                  setOpenEdit(true);
                }}
              />
              <TrashIcon 
                className="icon" 
                onClick={() => handleDeleteTask(task.id)}
              />
              <IIcon className="icon" />
            </IconsList>
          </ItemList>
        ))}                         
      </MidContainer>

      <BottomContainer>
        <TaskProgress progress={47}>
          <span>47%</span>
        </TaskProgress>
        <AddBtn onClick={() => setOpenAdd(true)}>Adicionar tarefa</AddBtn>
      </BottomContainer>
    </BodyList>
  );
};