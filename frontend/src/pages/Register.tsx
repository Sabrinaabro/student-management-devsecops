import { useState } from "react";
import { Button, Card, Input, message } from "antd";
import { register } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register({
        name,
        email,
        password,
      });

      message.success("Registration successful!");

      navigate("/login");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const apiError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        message.error(apiError.response?.data?.message ?? "Login failed");
      } else {
        message.error("Registration failed");
      }
    }
  };

  return (
    <Card
      title="Register"
      style={{
        width: "50%",
        maxWidth: 800,
        minWidth: 400,
        margin: "100px auto",
      }}
    >
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <Button block type="primary" onClick={handleRegister}>
        Register
      </Button>
      <p style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Card>
  );
}
