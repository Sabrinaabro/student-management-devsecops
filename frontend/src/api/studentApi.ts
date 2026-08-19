import api from "./axios";
import type { Student } from "../types/Student";

export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

export const addStudent = async (student: Omit<Student, "id">) => {
  const response = await api.post("/students", student);
  return response.data;
};

export const updateStudent = async (student: Student) => {
  const response = await api.put(`/students/${student.id}`, student);
  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};
