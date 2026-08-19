import { Router } from "express";
import * as controller from "../controllers/student.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../validators/student.validator.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, controller.getStudents);

router.get("/:id", authenticate, controller.getStudent);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createStudentSchema),
  controller.createStudent
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(updateStudentSchema),
  controller.updateStudent
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.deleteStudent
);

export default router;
