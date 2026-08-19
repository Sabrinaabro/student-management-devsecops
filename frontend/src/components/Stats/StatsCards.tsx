import { Card, Col, Row, Statistic } from "antd";
import type { Student } from "../../types/Student";

type StatsCardsProps = {
  students: Student[];
};

const StatsCards = ({ students }: StatsCardsProps) => {
  const totalStudents = students.length;

  const averageAge =
    students.length > 0
      ? (
          students.reduce((sum, student) => sum + student.age, 0) /
          students.length
        ).toFixed(1)
      : "0";

  const totalDepartments = new Set(
    students.map((student) => student.department)
  ).size;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={8}>
        <Card>
          <Statistic title="Total Students" value={totalStudents} />
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card>
          <Statistic title="Average Age" value={averageAge} />
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card>
          <Statistic title="Departments" value={totalDepartments} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;
