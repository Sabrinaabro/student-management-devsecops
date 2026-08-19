import * as repository from "../repositories/student.repository.js";
import { Student } from "../models/student.model.js";

export const getStudents = async () => {
  return repository.getAll();
};

export const getStudent = async (id: number) => {
  return repository.getById(id);
};

export const createStudent = async (student: Omit<Student, "id">) => {
  return repository.create(student);
};

export const updateStudent = async (
  id: number,
  student: Omit<Student, "id">
) => {
  return repository.update(id, student);
};

export const deleteStudent = async (id: number) => {
  return repository.remove(id);
};
