import { useEffect, useState } from "react";
import type { Student } from "../types/Student";
import { Button, Input, InputNumber, Select, Typography, message } from "antd";
import { departments } from "../data/departments";

type StudentFormProps = {
  onAddStudent: (student: Omit<Student, "id">) => void;
  onUpdateStudent: (student: Student) => Promise<void>;
  editingStudent: Student | null;
  onClose: () => void;
  errors: Record<string, string[]>;
};

const StudentForm = ({
  onAddStudent,
  onUpdateStudent,
  editingStudent,
  errors,
}: StudentFormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setDepartment(editingStudent.department);
      setEmail(editingStudent.email);
    } else {
      setName("");
      setAge("");
      setDepartment("");
      setEmail("");
    }
  }, [editingStudent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || age === "" || !department || !email) {
      return;
    }

    try {
      if (editingStudent) {
        await onUpdateStudent({
          id: editingStudent.id,
          name,
          age: Number(age),
          department,
          email,
        });

        // Don't clear fields after update.
        return;
      }

      await onAddStudent({
        name,
        age: Number(age),
        department,
        email,
      });

      setName("");
      setAge("");
      setDepartment("");
      setEmail("");
    } catch {
      // Parent already handles errors.
      // Do nothing so the user's input stays.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Name"
        value={name}
        status={errors.name ? "error" : ""}
        onChange={(e) => setName(e.target.value)}
      />

      {errors.name && (
        <Typography.Text type="danger">{errors.name[0]}</Typography.Text>
      )}

      <br />
      <br />

      <InputNumber
        placeholder="Age"
        value={age}
        status={errors.age ? "error" : ""}
        onChange={(value) => setAge(value ?? "")}
        style={{ width: "100%" }}
      />

      {errors.age && (
        <Typography.Text type="danger">{errors.age[0]}</Typography.Text>
      )}

      <br />
      <br />

      <Select
        placeholder="Select Department"
        value={department || undefined}
        status={errors.department ? "error" : ""}
        onChange={(value) => setDepartment(value)}
        style={{ width: "100%" }}
        options={departments.map((dept) => ({
          value: dept,
          label: dept,
        }))}
      />

      {errors.department && (
        <Typography.Text type="danger">{errors.department[0]}</Typography.Text>
      )}

      <br />
      <br />

      <Input
        type="email"
        placeholder="Email"
        value={email}
        status={errors.email ? "error" : ""}
        onChange={(e) => setEmail(e.target.value)}
      />

      {errors.email && (
        <Typography.Text type="danger">{errors.email[0]}</Typography.Text>
      )}
      <br />
      <br />

      <Button type="primary" htmlType="submit" block>
        {editingStudent ? "Update Student" : "Add Student"}
      </Button>
    </form>
  );
};

export default StudentForm;
