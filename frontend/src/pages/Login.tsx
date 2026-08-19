import { useState } from "react";
import { Button, Card, Input, message } from "antd";
import { login } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login({
        email,
        password,
      });

      // Store authentication token
      localStorage.setItem("token", data.token);

      // Store logged-in user information
      localStorage.setItem("user", JSON.stringify(data.user));

      message.success("Login successful!");

      navigate("/");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Card
      title="Login"
      style={{
        width: "50%",
        maxWidth: 800,
        minWidth: 400,
        margin: "100px auto",
      }}
    >
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

      <Button type="primary" block onClick={handleLogin}>
        Login
      </Button>

      <p style={{ marginTop: 16 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Card>
  );
};

export default Login;
