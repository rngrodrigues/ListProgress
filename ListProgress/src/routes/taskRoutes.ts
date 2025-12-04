import { Router } from "express";
import { TaskController } from "../controllers/taskController.ts";

const router = Router();

router.post("/", TaskController.create);
router.get("/", TaskController.list);
router.delete("/:id", TaskController.delete);
router.put("/:id", TaskController.update);

export default router;