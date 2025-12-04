import { CardRepository } from "../repository/cardRepository";
import type { Card } from "../types/Card";

export const CardService = {
  async createCard(data: Partial<Card>): Promise<Card> {
    if (!data.title) throw new Error("Title is required");
    return await CardRepository.createCard(data);
  },

  async listCards(): Promise<Card[]> {
    return await CardRepository.getAll();
  }
};
