import type { Request, Response } from "express";
import { TaskService } from "../services/taskService.ts";

export const TaskController = {
  async create(req: Request, res: Response) {
    try {
      const task = await TaskService.create(req.body);
      res.status(201).json(task);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const tasks = await TaskService.list();
      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await TaskService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const updatedTask = await TaskService.update(id, req.body);
      res.json(updatedTask);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
