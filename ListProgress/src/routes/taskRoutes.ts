import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { TaskController } from "../controllers/taskController.ts";

const router = Router();

router.use(authMiddleware);

router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
