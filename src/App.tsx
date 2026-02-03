import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/admin/Dashboard.tsx";
import { ToastProvider } from "./shared/components/Toast";
import PersistAuth from "./shared/hooks/PersistAuth.tsx";
import ForgotPassword from "./features/auth/Forgot_Passsword.jsx";
import NotFound from "./shared/components/Notfound.jsx";
import Unauthorized from "./shared/components/Unauthorized.jsx";
import CreatorDashboard from "./features/creator/Creator_Dashboard.tsx";
import {
  creatorRoute,
  forgotpasswordRoute,
  // loginRoute,
  loginRoute,
  registerRoute,
  unAuthorizedRoute,
  adminRoute,
  editprofileRoute,
} from "./core/routes.ts";
import EditProfile from "./shared/components/Edit_Profile.tsx";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* PersistAuth handles token checks and redirects */}
          <Route element={<PersistAuth />}>
            {/* <Route path={loginRoute} element={<Login />} /> */}
            <Route path={loginRoute} element={<Login />} />
            <Route path={registerRoute} element={<Register />} />
            <Route path={forgotpasswordRoute} element={<ForgotPassword />} />
            <Route path={unAuthorizedRoute} element={<Unauthorized />} />
            <Route path={editprofileRoute} element={<EditProfile />} />

            {/* admin section */}
            <Route path={adminRoute} element={<Dashboard />} />
            {/* creator section */}
            <Route path={creatorRoute} element={<CreatorDashboard />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
