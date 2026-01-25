import React, { useState } from "react";
import { theme } from "../../core/theme.js";
import Button from "../../shared/components/Button.tsx";
import Input from "../../shared/components/Input.tsx";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../shared/services/auth.tsx";
import { useToast } from "../../shared/components/Toast";
import { homeRoute, loginRoute } from "../../core/routes.ts";

const Register = () => {
  const { register, isLoading, isError, errorMessage } = useAuthStore();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("creator");
  var [full_name, setFullName] = useState("");
  const { success, error } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      error("Passwords do not match!");
      return;
    }
    full_name = firstName + " " + lastName;
    const user = {
      full_name,
      company_name,
      email,
      phone_number,
      password,
      role,
    };
    const data = await register(user);
    if (isError) {
      error(errorMessage);
    } else if (data) {
      success("Registered successfully!");
      navigate(homeRoute);
    }
  };

  // const handleAutoFill = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   setFirstName("John");
  //   setLastName("Doe");
  //   setFullName("John Doe");
  //   setCompanyName("Acme Corp");
  //   setEmail("john.doe@example.com");
  //   setPhone("1234567890");
  //   setPassword("password123");
  //   setConfirmPassword("password123");
  // };

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
          Register
        </h2>

        {/* First/Last Name Row */}
        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <Input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder='First Name'
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder='Last Name'
            />
          </div>
        </div>

        <Input
          type='text'
          value={company_name}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          placeholder='Company Name'
        />
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email'
        />
        <Input
          type='tel'
          value={phone_number}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder='Phone Number'
        />
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
        />
        <Input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder='Confirm Password'
        />

        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <Button color='primary' type='submit' disabled={isLoading}>
            {isLoading ? "Loading..." : "Create Account"}
          </Button>
        </div>

        <p style={{ textAlign: "center", marginTop: theme.spacing.medium }}>
          Already have an account?{" "}
          <span
            style={{
              color: theme.colors.primary,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate(loginRoute)}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
