import React, { useState } from "react";
import { theme } from "../../core/theme/theme";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

const Register = () => {
  const { registerCompany, isLoading, isError, errorMessage } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = { firstName, lastName, companyName, email, phone, password };
    const data = await registerCompany(user);
    if (data) {
      alert("Registered successfully!");
      navigate("/"); // redirect to login
    }
  };

  const handleAutoFill = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setFirstName("John");
    setLastName("Doe");
    setCompanyName("Acme Corp");
    setEmail("john.doe@example.com");
    setPhone("1234567890");
    setPassword("password123");
    setConfirmPassword("password123");
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
          value={companyName}
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
          value={phone}
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

        {isError && <p style={{ color: "red" }}>{errorMessage}</p>}

        <p style={{ textAlign: "center", marginTop: theme.spacing.medium }}>
          Already have an account?{" "}
          <span
            style={{
              color: theme.colors.primary,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <Button color='primary' type='submit' disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <Button
            color='secondary'
            type='button'
            onClick={handleAutoFill}
            disabled={isLoading}
          >
            Auto Fill
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
