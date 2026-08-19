import { Router } from "express";
import { chat } from "./ai.controller.js";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/chat", authenticate, chat);

export default router;
