import type { Request, Response } from "express";
import { CardService } from "../services/cardService.ts";

export const CardController = {
  async create(req: Request, res: Response) {
    try {
      const card = await CardService.create(req.body);
      res.status(201).json(card);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const cards = await CardService.list();
      res.json(cards);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await CardService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const updatedCard = await CardService.update(id, req.body);
      res.json(updatedCard);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
