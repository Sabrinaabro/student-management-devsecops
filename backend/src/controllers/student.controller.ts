import { Request, Response } from "express";
import * as service from "../services/student.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getStudents = asyncHandler(
  async (_req: Request, res: Response) => {
    const students = await service.getStudents();

    res.status(200).json(students);
  }
);

export const getStudent = asyncHandler(async (req: Request, res: Response) => {
  const student = await service.getStudent(Number(req.params.id));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found.",
    });
  }

  res.status(200).json(student);
});

export const createStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const student = await service.createStudent(req.body);

    res.status(201).json({
      success: true,
      data: student,
    });
  }
);

export const updateStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const student = await service.updateStudent(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      data: student,
    });
  }
);

export const deleteStudent = asyncHandler(
  async (req: Request, res: Response) => {
    await service.deleteStudent(Number(req.params.id));

    res.status(204).send();
  }
);
