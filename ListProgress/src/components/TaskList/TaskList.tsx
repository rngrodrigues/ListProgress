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
import type { TaskCardProps } from "../TaskCard/TaskCard";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as IIcon } from "../../assets/icons/i.svg";
import { ReactComponent as UpIcon } from "../../assets/icons/arrow-up.svg";
import { AddBtn } from "../Utils/Buttons";
import { CheckInput } from "../Utils/Inputs";
import { TaskProgress } from "../TaskProgress/TaskProgress";
import { ModalAddTask, ModalEditTask } from "../../components/Modals";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "../../services/apiFetch";

type TaskListProps = TaskCardProps & {
  id: string;
  title: string;
  description: string;
  category: string;
  onBack: () => void;
  onCardUpdate?: (updatedCard: any) => void;
};

export const TaskList = ({
  id,
  title,
  category,
  onBack,
  onCardUpdate
}: TaskListProps) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [flipState, setFlipState] = useState<
    Record<string, { expanded: boolean; isFlipping: boolean }>
  >({});

  function flip(taskId: string, to: boolean) {
    setFlipState((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], isFlipping: true }
    }));

    setTimeout(() => {
      setFlipState((prev) => ({
        ...prev,
        [taskId]: {
          expanded: to,
          isFlipping: false
        }
      }));
    }, 150);
  }

  useEffect(() => {
    apiFetch("/tasks")
      .then((data) => {
        const cardTasks = data
          .filter((task: any) => task.card_id === id)
          .sort((a: any, b: any) => {
            if (a.position == null) return 1;
            if (b.position == null) return -1;
            return a.position - b.position;
          });

        setTasks(cardTasks);
      })
      .catch((err) => console.error("Erro ao carregar tasks:", err));
  }, [id]);

  async function handleAddTask(newTask: any) {
    try {
      const nextPosition = tasks.length;
      const payload = { ...newTask, position: nextPosition, card_id: id };

      const createdTask = await apiFetch("/tasks", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      setTasks((prev) =>
        [...prev, createdTask].sort((a, b) => a.position - b.position)
      );
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
    }

    setOpenAdd(false);
  }

  async function handleDeleteTask(taskId: string) {
    try {
      await apiFetch(`/tasks/${taskId}`, { method: "DELETE" });

      setTasks((prev) => {
        const filtered = prev.filter((t) => t.id !== taskId);
        const reindexed = filtered.map((t, index) => ({
          ...t,
          position: index
        }));

        reindexed.forEach(async (t) => {
          await apiFetch(`/tasks/${t.id}`, {
            method: "PUT",
            body: JSON.stringify(t)
          });
        });

        return reindexed;
      });
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  }

  async function toggleTaskCompleted(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    try {
      const dataTask = await apiFetch(`/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask)
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? dataTask : t))
      );

      const allCompleted = tasks
        .map((t) => (t.id === taskId ? updatedTask : t))
        .every((t) => t.completed);

      const updatedCard = { completed: allCompleted };

      await apiFetch(`/cards/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedCard)
      });

      if (onCardUpdate) onCardUpdate({ id, ...updatedCard });
    } catch (err) {
      console.error("Erro ao atualizar tarefa ou card:", err);
    }
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
              const data = await apiFetch(`/tasks/${updatedTask.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedTask)
              });

              setTasks((prev) =>
                prev.map((t) =>
                  t.id === updatedTask.id ? data : t
                )
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
