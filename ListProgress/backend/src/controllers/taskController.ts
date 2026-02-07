import type { Request, Response } from "express";
import { TaskService } from "../services/taskService.ts";

export const TaskController = {

  async create(req: Request, res: Response) {
    try {
      const userId = req.user!.id;

      const task = await TaskService.create(req.body, userId);

      res.status(201).json(task);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async listByUser(req: Request, res: Response) {
    try {
      const userId = req.user!.id;

      const tasks = await TaskService.listByUser(userId);

      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async listByCard(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const cardId = req.params.cardId;

      const tasks = await TaskService.listByCard(cardId, userId);

      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const id = req.params.id;

      const updatedTask = await TaskService.update(id, userId, req.body);

      res.json(updatedTask);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const id = req.params.id;

      const deleted = await TaskService.delete(id, userId);

      if (!deleted) {
        return res.status(404).json({ error: "Task não encontrada" });
      }

      return res.status(200).json({
        message: "Task deletada com sucesso",
        id,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
