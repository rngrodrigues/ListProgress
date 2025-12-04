import { TaskRepository } from "../repository/taskRepository.ts";

export const TaskService = {
  create: (card: any) => TaskRepository.create(card),
  list: () => TaskRepository.list(),
  delete: (id: string) => TaskRepository.delete(id),
  update: (id: string, card: any) => TaskRepository.update(id, card),
};