import React, { useEffect, useState } from "react";
import type { Student } from "../types/Student";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { Input, Modal, Select, Space, message } from "antd";
import Header from "../components/Header/Header";
import StatsCards from "../components/Stats/StatsCards";
import { departments } from "../data/departments";

import {
  getStudents,
  addStudent as addStudentApi,
  updateStudent as updateStudentApi,
  deleteStudent as deleteStudentApi,
} from "../api/studentApi";
import AIAssistant from "../components/AIAssistant";

function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Load Students

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load students.");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Modal
  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const editStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingStudent(null);
    setErrors({});
    setIsModalOpen(false);
  };

  // CRUD Operations

  const addStudent = async (student: Omit<Student, "id">) => {
    try {
      await addStudentApi(student);

      await loadStudents();

      setErrors({});

      message.success("Student added successfully.");

      closeModal();
    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        message.error("Failed to add student.");
      }
      throw error;
    }
  };

  const updateStudent = async (student: Student) => {
    try {
      await updateStudentApi(student);

      await loadStudents();

      setErrors({});

      message.success("Student updated successfully.");

      closeModal();
    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        message.error("Failed to update student.");
      }
      throw error;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await deleteStudentApi(id);

      await loadStudents();

      message.success("Student deleted successfully.");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete student.");
    }
  };

  // Search & Filter

  const filteredStudents = students.filter((student) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.department.toLowerCase().includes(query);

    const matchesDepartment =
      selectedDepartment === "All" || student.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  // UI

  return (
    <div style={{ padding: "40px" }}>
      <Header onAddStudent={openAddModal} />

      <StatsCards students={students} />

      <Space
        wrap
        style={{
          width: "100%",
          marginBottom: 20,
          justifyContent: "space-between",
        }}
      >
        <Input.Search
          placeholder="Search students..."
          allowClear
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 350 }}
        />

        <Select
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          style={{ width: 250 }}
          options={[
            {
              value: "All",
              label: "All Departments",
            },
            ...departments.map((dept) => ({
              value: dept,
              label: dept,
            })),
          ]}
        />
      </Space>

      <StudentTable
        students={filteredStudents}
        onDelete={deleteStudent}
        onEdit={editStudent}
      />

      <AIAssistant />

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        title={editingStudent ? "Update Student" : "Add Student"}
        destroyOnHidden={!editingStudent}
        forceRender
      >
        <StudentForm
          onAddStudent={addStudent}
          onUpdateStudent={updateStudent}
          editingStudent={editingStudent}
          onClose={closeModal}
          errors={errors}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
