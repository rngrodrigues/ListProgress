import type { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export const TaskController = {
  async create(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req.body);
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const tasks = await TaskService.listTasks(req.params.card_id);
      res.json(tasks);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updated = await TaskService.updateTask(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
