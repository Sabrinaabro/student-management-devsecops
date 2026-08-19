import { Router } from "express";
import * as controller from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), controller.register);

router.post("/login", validate(loginSchema), controller.login);

export default router;
