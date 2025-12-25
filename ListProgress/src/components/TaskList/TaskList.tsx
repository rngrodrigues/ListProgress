import {
  ArrowBack,
  BodyList,
  BottomContainer,
  MidContainer,
  TopContainer,
  TaskCategory,
  TaskTitle,
  ItemList,
  IconsList,
  TextList,
  ItemDescription
} from "./TaskList.styles";

import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as IIcon } from "../../assets/icons/i.svg";
import { ReactComponent as UpIcon } from "../../assets/icons/arrow-up.svg";
import { AddBtn } from "../Utils/Buttons";
import { CheckInput } from "../Utils/Inputs";
import { TaskProgress } from "../TaskProgress/TaskProgress";
import { ModalAddTask, ModalEditTask, ModalConfirm } from "../../components/Modals";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "../Utils/Toasts/Toasts";
import type { Task } from "../../types/Task";
import type { Card } from "../../types/Card";
import { useTask } from "../../hooks/useTask";

type TaskListProps = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  onBack: () => void;
  onCardUpdate?: (updatedCard: Card) => void;
};

export const TaskList = ({ id, title, category, onBack, onCardUpdate }: TaskListProps) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [flipState, setFlipState] = useState<Record<string, { expanded: boolean; isFlipping: boolean }>>({});
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const { tasks, addTask, editTask, deleteTask, toggleCompleted: toggleTaskCompletion } = useTask(id, onCardUpdate);

  function flip(taskId: string, to: boolean) {
    setFlipState((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], isFlipping: true }
    }));

    setTimeout(() => {
      setFlipState((prev) => ({
        ...prev,
        [taskId]: { expanded: to, isFlipping: false }
      }));
    }, 150);
  }


  async function toggleCompleted(taskId: string) {
    try {
      await toggleTaskCompletion(taskId);
      const allCompleted = tasks.every((t) => t.id === taskId ? !t.completed : t.completed);
      if (allCompleted) {
        toast.success("Parabéns! Você completou essa lista.");
        navigate("/home");
      }
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      toast.error("Erro ao atualizar tarefa");
    }
  }

  return (
    <BodyList>
      <AnimatePresence>
        {openAdd && (
          <ModalAddTask
            isOpen={openAdd}
            onClose={() => setOpenAdd(false)}
            onAddTask={async (task) => {
              await addTask(task);
              setOpenAdd(false);
            }}
            card_id={id}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openEdit && selectedTask && (
          <ModalEditTask
            isOpen={openEdit}
            onClose={() => setOpenEdit(false)}
            task={selectedTask}
            onEditTask={async (task) => {
              await editTask(task);
              setOpenEdit(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDeleteOpen && taskToDelete && (
          <ModalConfirm
            isOpen={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
            message="Tem certeza que deseja excluir essa tarefa? Essa ação é permanente."
            onConfirm={async () => {
              if (!taskToDelete) return;
              await deleteTask(taskToDelete);
              setTaskToDelete(null);
              setConfirmDeleteOpen(false);
            }}
            confirmText="Excluir"
            cancelText="Cancelar"
          />
        )}
      </AnimatePresence>

      <TopContainer>
        <TaskCategory>{category ?? ""}</TaskCategory>
        <ArrowBack className="icon" onClick={onBack} />
      </TopContainer>
      <TaskTitle>{title}</TaskTitle>

      <MidContainer>
        {tasks.map((task) => {
          const expanded = flipState[task.id]?.expanded ?? false;
          const isFlipping = flipState[task.id]?.isFlipping ?? false;

          return (
            <motion.div key={task.id} animate={{ rotateX: isFlipping ? 90 : 0 }} transition={{ duration: 0.2 }} style={{ transformStyle: "preserve-3d" }}>
              <ItemList layout transition={{ duration: 0.2, ease: "easeInOut" }}>
                {expanded ? (
                  <>
                    <ItemDescription className={task.completed ? "completed" : ""}>
                      {task.description ?? ""}
                    </ItemDescription>
                    <UpIcon className="UpIcon" onClick={(e) => { e.stopPropagation(); flip(task.id, false); }} />
                  </>
                ) : (
                  <>
                    <TextList className={task.completed ? "completed" : ""}>
                      <CheckInput checked={task.completed ?? false} onChange={() => toggleCompleted(task.id)} />
                      {task.title}
                    </TextList>
                    <IconsList>
                      <EditIcon className="icon edit" onClick={() => { setSelectedTask(task); setOpenEdit(true); }} />
                      <TrashIcon className="icon trash" onClick={() => { setTaskToDelete(task.id); setConfirmDeleteOpen(true); }} />
                      <IIcon className="icon IIcon" onClick={(e) => { e.stopPropagation(); flip(task.id, true); }} />
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
        <AddBtn onClick={() => setOpenAdd(true)}>Adicionar tarefa</AddBtn>
      </BottomContainer>
    </BodyList>
  );
};
