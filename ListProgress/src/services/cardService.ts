import { CardRepository } from "../repository/cardRepository.ts";

export const CardService = {
  create: (card: any) => CardRepository.create(card),
  list: () => CardRepository.list(),
  delete: (id: string) => CardRepository.delete(id),
  update: (id: string, card: any) => CardRepository.update(id, card),
};
