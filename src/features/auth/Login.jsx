// src/features/auth/Login.tsx
import React, { useState } from "react";
import { theme } from "../../core/theme/theme.js";
import Button from "../../shared/components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/services/auth.tsx";
import { useToast } from "../../shared/components/Toast.js";
import Input from "../../shared/components/Input.jsx";

const Login = () => {
  const { login, isLoading, isError, errorMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { success, error } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const data = await login(user); // <- use whatever login actually returns

      if (!data) {
        console.log("Login error:", errorMessage);
        error(errorMessage || "Login failed");
      } else {
        success("Login successfully!");
        navigate("/home");
      }
    } catch (err) {
      console.log("Login exception:", err);
      error(err.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
        padding: theme.spacing.medium,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.large,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium,
        }}
      >
        <h2
          style={{
            color: theme.colors.primary,
            margin: 0,
            textAlign: "center",
          }}
        >
          Login
        </h2>

        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email'
        />

        <Input
          isPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />

        <p style={{ textAlign: "center", marginTop: theme.spacing.medium }}>
          Don’t have an account?{" "}
          <span
            style={{
              color: theme.colors.primary,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

        <Button color='primary' type='submit' disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
