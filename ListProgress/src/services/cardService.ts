import { CardRepository } from "../repository/cardRepository.ts";
import { TaskRepository } from "../repository/taskRepository.ts";

export const CardService = {
  create: (card: any, userId: string) =>
    CardRepository.create({
      ...card,
      user_id: userId
    }),

  list: (userId: string) =>
    CardRepository.listByUser(userId),

  delete: (id: string, userId: string) =>
    CardRepository.deleteByUser(id, userId),

  update: (id: string, card: any, userId: string) =>
    CardRepository.updateByUser(id, card, userId),

  findById: (id: string, userId: string) =>
    CardRepository.findByIdByUser(id, userId),

  listTasks: (cardId: string, userId: string) =>
    TaskRepository.listByCard(cardId, userId)
};
