import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  age: z
    .number()
    .int()
    .min(16, "Age must be at least 16")
    .max(100, "Age cannot exceed 100"),

  department: z.string().min(2, "Department must be at least 2 characters"),

  email: z.email("Invalid email address"),
});

export const updateStudentSchema = createStudentSchema.partial();

export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
