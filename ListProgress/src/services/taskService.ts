import { CardRepository } from "../repository/cardRepository";
import { TaskRepository } from "../repository/taskRepository";
import type { Task } from "../types/Task";

export const TaskService = {
  async createTask(data: Partial<Task>): Promise<Task> {
    if (!data.card_id) throw new Error("card_id is required");

    const card = await CardRepository.findById(data.card_id);
    if (!card) throw new Error("Card not found");

    return await TaskRepository.createTask(data);
  },

  async listTasks(card_id: string): Promise<Task[]> {
    return await TaskRepository.findByCard(card_id);
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    return await TaskRepository.updateTask(id, data);
  }
};
