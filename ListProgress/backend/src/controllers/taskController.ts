import type { Request, Response } from "express";
import { TaskService } from "../services/taskService.ts";

export const TaskController = {

  // Cria uma nova tarefa para o usuário logado
  async create(req: Request, res: Response) {
    try {
      const userId = req.user!.id; // Pega ID do usuário autenticado

      const task = await TaskService.create(req.body, userId); // Chama serviço para criar a tarefa

      res.status(201).json(task); // Retorna a tarefa criada com status 201
    } catch (err: any) {
      res.status(500).json({ error: err.message }); // Erro genérico
    }
  },

  // Lista todas as tarefas do usuário logado
  async listByUser(req: Request, res: Response) {
    try {
      const userId = req.user!.id;

      const tasks = await TaskService.listByUser(userId); // Busca todas as tarefas do usuário

      res.json(tasks); // Retorna lista de tarefas
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lista todas as tarefas de um card específico do usuário
  async listByCard(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const cardId = req.params.cardId; // ID do card

      const tasks = await TaskService.listByCard(cardId, userId); // Busca tarefas do card específico

      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza uma tarefa específica do usuário
  async update(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const id = req.params.id; // ID da tarefa

      const updatedTask = await TaskService.update(id, userId, req.body); // Atualiza a tarefa

      res.json(updatedTask); // Retorna a tarefa atualizada
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta uma tarefa específica do usuário
  async delete(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const id = req.params.id; // ID da tarefa a ser deletada

      const deleted = await TaskService.delete(id, userId); // Chama serviço para deletar a tarefa

      if (!deleted) {
        return res.status(404).json({ error: "Task não encontrada" }); // Tarefa não existe
      }

      return res.status(200).json({
        message: "Task deletada com sucesso",
        id, // Retorna ID da tarefa deletada
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
