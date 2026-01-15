// src/features/auth/Login.jsx
import React, { useState } from "react";
import { theme } from "../../core/theme/theme";
import Button from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { useToast } from "../../shared/components/Toast";
import Input from "../../shared/components/Input";

const Login = () => {
  const { login, isLoading, isError, errorMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { success, error } = useToast();

  const navigate = useNavigate(); // hook to navigate programmatically

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const data = await login(user);
    if (isError) {
      error(errorMessage);
    } else if (data) {
      success("Login successfully!");
      navigate("/home"); // redirect to login
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
        padding: theme.spacing.medium, // ensures spacing on small screens
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
          maxWidth: "400px", // container scales nicely
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.medium, // spaces between inputs/buttons
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
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
            onClick={() => navigate("/register")} // navigate to Register page
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
