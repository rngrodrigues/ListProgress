import { Router } from "express";
import { TaskController } from "../controllers/taskController.ts";

const router = Router();

router.post("/", TaskController.create);
router.get("/:card_id", TaskController.list);
router.put("/:id", TaskController.update);

export default router;
