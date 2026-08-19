import prisma from "../config/prisma.js";
import { Student } from "../models/student.model.js";

export const getAll = async () => {
  return prisma.student.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getById = async (id: number) => {
  return prisma.student.findUnique({
    where: { id },
  });
};

export const create = async (student: Omit<Student, "id">) => {
  return prisma.student.create({
    data: student,
  });
};

export const update = async (id: number, student: Omit<Student, "id">) => {
  return prisma.student.update({
    where: { id },
    data: student,
  });
};

export const remove = async (id: number) => {
  return prisma.student.delete({
    where: { id },
  });
};
