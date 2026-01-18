import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/admin/Dashboard.tsx";
import { ToastProvider } from "./shared/components/Toast";
import PersistAuth from "./shared/hooks/PersistAuth.tsx";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* PersistAuth handles token checks and redirects */}
          <Route element={<PersistAuth />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
