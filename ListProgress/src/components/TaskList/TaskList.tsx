import { ArrowBack, BodyList, BottomContainer, MidContainer, TopContainer, TaskCategory, TaskTitle, ItemList, IconsList, TextList, ItemDescription } from './TaskList.styles';
import type { TaskCardProps } from "../TaskCard/TaskCard";
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'; 
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as IIcon } from '../../assets/icons/i.svg';
import { ReactComponent as UpIcon } from "../../assets/icons/arrow-up.svg";
import { AddBtn } from '../Utils/Buttons'
import { CheckInput } from '../Utils/Inputs'
import { TaskProgress } from "../TaskProgress/TaskProgress";
import { ModalAddTask, ModalEditTask } from "../../components/Modals";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = "http://192.168.1.9:3001";

type TaskListProps = TaskCardProps & {
  id: string;
  title: string;
  description: string;
  category: string;
  onBack: () => void;
};

export const TaskList = ({ id, title, category, onBack }: TaskListProps) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [flipState, setFlipState] = useState<
    Record<string, { expanded: boolean; isFlipping: boolean }>
  >({});
  


  function flip(id: string, to: boolean) {
    setFlipState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isFlipping: true,
      },
    }));

    setTimeout(() => {
      setFlipState(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          expanded: to,
        },
      }));
    }, 150);
  }

useEffect(() => {
  fetch(`${API_URL}/tasks`)
    .then(res => res.json())
    .then(data => {

      const cardTasks = data.filter((task: any) => task.card_id === id);
      setTasks(cardTasks);
    })
    .catch(err => console.error("Erro ao carregar tasks:", err));
}, [id]); 


   async function handleAddTask(newTask: any) {
  console.log("newTask enviado:", newTask);
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask), 
    });

    const createdTask = await res.json();

    setTasks(prev => [...prev, createdTask]);

  } catch (err) {
    console.error("Erro ao adicionar tarefa:", err);
  }

  setOpenAdd(false);
}


async function handleDeleteTask(taskId: string) {
  try {
    await fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
    setTasks(prev => prev.filter(t => t.id !== taskId));
  } catch (err) {
    console.error("Erro ao deletar tarefa:", err);
  }
}


  function toggleTaskCompleted(id: string) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  return (
    <BodyList>
      <ModalAddTask
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
       onAddTask={handleAddTask}
       card_id={id}
      />

      {selectedTask && (
        <ModalEditTask
  isOpen={openEdit}
  onClose={() => setOpenEdit(false)}
  task={selectedTask}
  onEditTask={async (updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();
      console.log("Resposta do servidor:", data);
      setTasks(prev =>
  prev.map(t => t.id === updatedTask.id ? updatedTask : t)
);
    } catch (err) {
      console.error(err);
    }

    setOpenEdit(false);
  }}
/>

      )}

      <TopContainer>
        <TaskCategory>{category}</TaskCategory>
        <ArrowBack className="icon" onClick={onBack} />
      </TopContainer>

      <TaskTitle>{title}</TaskTitle>

      <MidContainer>
        {tasks.map((task) => {
          const expanded = flipState[task.id]?.expanded ?? false;
          const isFlipping = flipState[task.id]?.isFlipping ?? false;

          return (
            <motion.div
              key={task.id}
              animate={{ rotateX: isFlipping ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={() =>
                setFlipState(prev => ({
                  ...prev,
                  [task.id]: { ...prev[task.id], isFlipping: false }
                }))
              }
              style={{ transformStyle: "preserve-3d" }}
            >
              <ItemList>

                {expanded ? (
                  <>
                    <ItemDescription>{task.description}</ItemDescription>
                    <UpIcon
                      className="BackIcon"
                      onClick={(e) => {
                        e.stopPropagation();
                        flip(task.id, false);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TextList className={task.completed ? "completed" : ""}>
  <CheckInput
    checked={task.completed}
    onChange={() => toggleTaskCompleted(task.id)}
  />
  {task.title}
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

                      <IIcon
                        className="icon IIcon"
                        onClick={(e) => {
                          e.stopPropagation();
                          flip(task.id, true);
                        }}
                      />
                    </IconsList>
                  </>
                )}

              </ItemList>
            </motion.div>
          );
        })}
      </MidContainer>

      <BottomContainer>
        <TaskProgress tasks={tasks} />
        <AddBtn onClick={() => setOpenAdd(true)}>
          Adicionar tarefa
        </AddBtn>
      </BottomContainer>
    </BodyList>
  );
};
