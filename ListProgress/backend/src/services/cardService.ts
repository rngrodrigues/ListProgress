import { CardRepository } from "../repositories/cardRepository.ts";
import { TaskRepository } from "../repositories/taskRepository.ts";

export const CardService = {
  create: (card: any, userId: string) =>
    CardRepository.create({
      ...card,
      user_id: userId
    }),

  list: (userId: string) =>
    CardRepository.listByUser(userId).then(cards => 
      cards.sort((a: any, b: any) => {
        if (a.position == null) return 1;
        if (b.position == null) return -1;
        return a.position - b.position;
      })
    ),

  delete: (id: string, userId: string) =>
    CardRepository.deleteByUser(id, userId),

  update: (id: string, card: any, userId: string) =>
    CardRepository.updateByUser(id, card, userId),

  findById: (id: string, userId: string) =>
    CardRepository.findByIdByUser(id, userId),

  listTasks: (cardId: string, userId: string) =>
    TaskRepository.listByCard(cardId, userId)
};
