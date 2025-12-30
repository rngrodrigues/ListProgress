import { Router } from "express";
import { CardController } from "../controllers/cardController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";


const router = Router();

router.use(authMiddleware); 


router.post("/", CardController.create);
router.get("/", CardController.list);
router.get("/:id/tasks", CardController.listTasks);
router.put("/:id", CardController.update);
router.delete("/:id", CardController.delete);


export default router;
