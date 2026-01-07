import { useState, useEffect } from "react";
import { useTaskService } from "./useTaskServices";
import { useCardService } from "./useCardServices";
import type { Task } from "../../../backend/src/types/Task";
import type { Card } from "../../../backend/src/types/Card";
import { toast } from "../components/Utils/Toasts/Toasts";

// Hook de gerenciamento de tarefas de um card específico, com CRUD e atualização do status do card
export function useTask(cardId: string, onCardUpdate?: (updatedCard: Card) => void) {
  const taskService = useTaskService(); 
  const cardService = useCardService(); 
  const [tasks, setTasks] = useState<Task[]>([]); 
   const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  setLoading(true); 

  taskService
    .listByCard(cardId)
    .then((data) => {
      setTasks(data);
      setLoading(false); 
    })
    .catch((err) => {
      console.error("Erro ao carregar tarefas:", err);
      toast.error("Erro ao carregar as tarefas.");
    })
    .finally(() => {
      setLoading(false); 
    });
}, [cardId, taskService]);



  const addTask = async (newTask: Partial<Task>) => {
    try {
      const payload = { ...newTask, card_id: cardId };
      const createdTask = await taskService.create(payload); // Cria tarefa 
      setTasks((prev) => [...prev, createdTask]); 
      toast.success("Tarefa criada com sucesso!"); 
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      toast.error("Erro ao criar a tarefa."); 
    }
  };

  const editTask = async (updatedTask: Task) => {
    try {
      const data = await taskService.update(updatedTask.id, updatedTask); // Atualiza tarefa no backend
      setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? data : t))); // Atualiza estado local
      toast.success("Tarefa atualizada!"); 
    } catch (err) {
      console.error("Erro ao editar tarefa:", err);
      toast.error("Erro ao editar a tarefa."); 
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskService.delete(taskId); 
      setTasks((prev) => {
        const filtered = prev.filter((t) => t.id !== taskId); 
        const reindexed = filtered.map((t, i) => ({ ...t, position: i })); // Reorganiza posições
        reindexed.forEach((t) => taskService.update(t.id, { position: t.position })); // Atualiza posições no backend
        toast.warning("Tarefa removida!"); 
        return reindexed; 
      });
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
      toast.error("Erro ao remover a tarefa."); 
    }
  };

  const toggleCompleted = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId); // Busca tarefa específica
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed }; 
    const savedTask = await taskService.update(taskId, updatedTask);

    const updatedTasks = tasks.map((t) => (t.id === taskId ? savedTask : t)); 
    setTasks(updatedTasks);

    const allCompleted = updatedTasks.every((t) => t.completed); 

    await cardService.update(cardId, { completed: allCompleted }); 
    if (onCardUpdate) onCardUpdate({ id: cardId, completed: allCompleted } as Card); 
  };

  return { tasks, addTask, editTask, deleteTask, toggleCompleted, loading }; 
}
