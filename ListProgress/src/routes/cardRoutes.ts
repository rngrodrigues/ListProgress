import { Router } from "express";
import { CardController } from "../controllers/cardController";

const router = Router();

router.post("/", CardController.create);
router.get("/", CardController.list);

export default router;
