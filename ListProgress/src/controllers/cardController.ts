import type { Request, Response } from "express";
import { CardService } from "../services/cardService.ts";

export const CardController = {
  async create(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const card = await CardService.create(req.body, userId);
      res.status(201).json(card);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const cards = await CardService.list(userId);
      res.json(cards);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

 
  async listTasks(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const tasks = await CardService.listTasks(id, userId);

      res.json(tasks); 
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const updatedCard = await CardService.update(id, req.body, userId);

      if (!updatedCard) {
        return res.status(404).json({ error: "Card não encontrado" });
      }

      res.json(updatedCard);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

async delete(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const deleted = await CardService.delete(id, userId);
  
    console.log("DELETE CARD CHAMADO:", id);
    if (!deleted) {
      return res.status(404).json({ error: "Card não encontrado" });
    }

    return res.status(200).json({
      message: "Card deletado com sucesso",
      id,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
},
};

