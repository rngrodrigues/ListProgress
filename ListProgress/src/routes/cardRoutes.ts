import { Router } from "express";
import { CardController } from "../controllers/cardController.ts";

const router = Router();

router.post("/", CardController.create);
router.get("/", CardController.list);
router.delete("/:id", CardController.delete);
router.put("/:id", CardController.update);

export default router;
