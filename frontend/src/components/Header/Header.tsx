import { Avatar, Button, Dropdown, Flex, Typography } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onAddStudent: () => void;
};

const Header = ({ onAddStudent }: HeaderProps) => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const name = user?.name || "User";
  const role = user?.role || "User";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div style={{ padding: "4px 8px", minWidth: 180 }}>
          <Typography.Text strong>{name}</Typography.Text>
          <br />
          <Typography.Text type="secondary">
            Logged in as {role}
          </Typography.Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        background: "#7BAFD4",
        padding: "16px 24px",
        marginBottom: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography.Title level={2} style={{ margin: 0, color: "#fff" }}>
        Student Management System
      </Typography.Title>

      <Flex gap={12} align="center">
        <Button
          type="default"
          onClick={onAddStudent}
          style={{
            background: "#fff",
            borderColor: "#1677ff",
            color: "#1677ff",
          }}
        >
          Add Student
        </Button>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Avatar
            size="large"
            style={{
              cursor: "pointer",
              background: "#fff",
              borderColor: "#1677ff",
              color: "#1677ff",
            }}
            icon={name === "User" ? <UserOutlined /> : undefined}
          >
            {name !== "User" && getInitials(name)}
          </Avatar>
        </Dropdown>
      </Flex>
    </Flex>
  );
};

export default Header;
