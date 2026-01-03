import type { Request, Response } from "express";
import { CardService } from "../services/cardService.ts";

export const CardController = {

  // Cria um novo card para o usuário logado
  async create(req: Request, res: Response) {
    try {
      const userId = req.user!.id; // Pega o ID do usuário logado (autenticado)
      console.log("Criando card para o usuário:", userId); 
      
      const card = await CardService.create(req.body, userId); // Chama serviço para criar card
      res.status(201).json(card); // Retorna o card criado com status 201
    } catch (err: any) {
      console.error("Erro ao criar card:", err.message); 
      res.status(500).json({ error: err.message }); // Erro genérico
    }
  },

  // Lista todos os cards do usuário logado
  async list(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      console.log("Listando cards do usuário:", userId); 

      const cards = await CardService.list(userId); // Chama serviço para buscar cards
      res.json(cards); // Retorna lista de cards
    } catch (err: any) {
      console.error("Erro ao listar cards:", err.message); 
      res.status(500).json({ error: err.message });
    }
  },

  // Lista todas as tarefas de um card específico do usuário
  async listTasks(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params; // ID do card
      console.log(`Listando tarefas para o card ${id} do usuário ${userId}`); 

      const tasks = await CardService.listTasks(id, userId); // Busca tarefas do card
      res.json(tasks);
    } catch (err: any) {
      console.error("Erro ao listar tarefas:", err.message); 
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza um card específico do usuário
  async update(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      console.log(`Atualizando o card ${id} para o usuário ${userId}`); 

      const updatedCard = await CardService.update(id, req.body, userId);

      if (!updatedCard) {
        return res.status(404).json({ error: "Card não encontrado" }); // Card não existe
      }

      console.log("UPDATE CARD CHAMADO:", id); 
      return res.json(updatedCard); // Retorna o card atualizado
    } catch (err: any) {
      console.error("Erro ao atualizar card:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta um card específico do usuário
  async delete(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      console.log(`Deletando o card ${id} para o usuário ${userId}`); 

      const deleted = await CardService.delete(id, userId);

      if (!deleted) {
        return res.status(404).json({ error: "Card não encontrado" }); // Card não existe
      }

      console.log("DELETE CARD CHAMADO:", id); 
      return res.status(200).json({
        message: "Card deletado com sucesso",
        id, // Retorna ID do card deletado
      });
    } catch (err: any) {
      console.error("Erro ao deletar card:", err.message); 
      res.status(500).json({ error: err.message });
    }
  },
};
