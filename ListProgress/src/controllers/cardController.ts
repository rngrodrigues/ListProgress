import type { Request, Response } from "express";
import { CardService } from "../services/cardService";

export const CardController = {
  async create(req: Request, res: Response) {
    try {
      const card = await CardService.createCard(req.body);
      res.json(card);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const cards = await CardService.listCards();
      res.json(cards);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
