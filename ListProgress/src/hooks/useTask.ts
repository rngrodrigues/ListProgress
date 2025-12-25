import { useState, useEffect } from "react";
import { useTaskService } from "./useTaskServices";
import { useCardService } from "./useCardServices";
import type { Task } from "../types/Task";
import type { Card } from "../types/Card";

export function useTask(cardId: string, onCardUpdate?: (updatedCard: Card) => void) {
  const taskService = useTaskService();
  const cardService = useCardService();
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    taskService.listByCard(cardId)
      .then((data) => {
        const ordered = data.sort((a:any, b:any) => (a.position ?? 0) - (b.position ?? 0));
        setTasks(ordered);
      })
      .catch(console.error);
  }, [cardId, taskService]);

  const addTask = async (newTask: Partial<Task>) => {
    const payload = { ...newTask, card_id: cardId, position: tasks.length };
    const createdTask = await taskService.create(payload);
    setTasks((prev) => [...prev, createdTask].sort((a, b) => a.position - b.position));
  };

  const editTask = async (updatedTask: Task) => {
    const data = await taskService.update(updatedTask.id, updatedTask);
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? data : t)));
  };

  const deleteTask = async (taskId: string) => {
    await taskService.delete(taskId);
    setTasks((prev) => {
      const filtered = prev.filter((t) => t.id !== taskId);
      const reindexed = filtered.map((t, i) => ({ ...t, position: i }));
      reindexed.forEach((t) => taskService.update(t.id, { position: t.position }));
      return reindexed;
    });
  };

 const toggleCompleted = async (taskId: string) => {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  const updatedTask = { ...task, completed: !task.completed };
  const savedTask = await taskService.update(taskId, updatedTask);

  const updatedTasks = tasks.map((t) => (t.id === taskId ? savedTask : t));
  setTasks(updatedTasks);

  const allCompleted = updatedTasks.every((t) => t.completed);


  await cardService.update(cardId, { completed: allCompleted });
  if (onCardUpdate) onCardUpdate({ id: cardId, completed: allCompleted } as Card);
};


  return { tasks, addTask, editTask, deleteTask, toggleCompleted };
}
