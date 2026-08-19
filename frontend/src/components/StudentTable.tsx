import type { ColumnsType } from "antd/es/table";
import { Button, Popconfirm, Space, Table } from "antd";
import type { Student } from "../types/Student";

type StudentTableProps = {
  students: Student[];
  onDelete: (id: number) => void;
  onEdit: (student: Student) => void;
};

const StudentTable = ({ students, onDelete, onEdit }: StudentTableProps) => {
  const columns: ColumnsType<Student> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete Student"
            description="Are you sure you want to delete this student?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={students}
      pagination={{ pageSize: 5 }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default StudentTable;
