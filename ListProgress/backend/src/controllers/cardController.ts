import type { Request, Response } from "express";
import { CardService } from "../services/cardService.ts";

export const CardController = {

  async create(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      console.log("Criando card para o usuário:", userId);
      
      const card = await CardService.create(req.body, userId);
      res.status(201).json(card);
    } catch (err: any) {
      console.error("Erro ao criar card:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      console.log("Listando cards do usuário:", userId);

      const cards = await CardService.list(userId);
      res.json(cards);
    } catch (err: any) {
      console.error("Erro ao listar cards:", err.message); 
      res.status(500).json({ error: err.message });
    }
  },

  async listTasks(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      console.log(`Listando tarefas para o card ${id} do usuário ${userId}`);

      const tasks = await CardService.listTasks(id, userId);
      res.json(tasks);
    } catch (err: any) {
      console.error("Erro ao listar tarefas:", err.message); 
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      console.log(`Atualizando o card ${id} para o usuário ${userId}`); 

      const updatedCard = await CardService.update(id, req.body, userId);

      if (!updatedCard) {
        return res.status(404).json({ error: "Card não encontrado" });
      }

      console.log("UPDATE CARD CHAMADO:", id);
      return res.json(updatedCard);
    } catch (err: any) {
      console.error("Erro ao atualizar card:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      console.log(`Deletando o card ${id} para o usuário ${userId}`); 

      const deleted = await CardService.delete(id, userId);

      if (!deleted) {
        return res.status(404).json({ error: "Card não encontrado" });
      }

      console.log("DELETE CARD CHAMADO:", id);
      return res.status(200).json({
        message: "Card deletado com sucesso",
        id,
      });
    } catch (err: any) {
      console.error("Erro ao deletar card:", err.message); 
      res.status(500).json({ error: err.message });
    }
  },
};
