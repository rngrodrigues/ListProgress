import { TaskRepository } from "../repositories/taskRepository.ts";

export const TaskService = {
  async create(task: any, userId: string) {
    
    return TaskRepository.create({
      ...task,
      user_id: userId,
    });
  },

  async listByUser(userId: string) {
    return TaskRepository.listByUser(userId);
  },

  async listByCard(cardId: string, userId: string) {
    return TaskRepository.listByCard(cardId, userId);
  },

  async delete(id: string, userId: string) {
    return TaskRepository.delete(id, userId);
  },

  async update(id: string, userId: string, task: any) {
    return TaskRepository.update(id, userId, task);
  },
};
