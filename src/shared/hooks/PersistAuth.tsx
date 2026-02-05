import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  adminRoute,
  creatorRoute,
  forgotpasswordRoute,
  // loginRoute,
  loginRoute,
  registerRoute,
  unAuthorizedRoute,
  homeRoute,
} from "../../core/routes.ts";

const PersistAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const tokenJson = localStorage.getItem("token");
        const tokenObj = tokenJson ? JSON.parse(tokenJson) : null;
        const accessToken = tokenObj?.access_token;

        const publicPaths = [
          loginRoute,
          registerRoute,
          forgotpasswordRoute,
          homeRoute,
        ];

        if (accessToken && !isTokenExpired(accessToken)) {
          const role = userRole(accessToken);

          if (publicPaths.includes(location.pathname)) {
            console.log("User role detected:", role);
            if (role === "admin") {
              navigate(adminRoute, { replace: true });
            } else if (role === "creator") {
              navigate(creatorRoute, { replace: true });
            } else {
              navigate(unAuthorizedRoute, { replace: true });
            }
          } else {
            // Protect Admin Routes
            if (location.pathname.startsWith("/admin") && role !== "admin") {
              if (role === "creator") {
                navigate(creatorRoute, { replace: true });
              } else {
                navigate(unAuthorizedRoute, { replace: true });
              }
            }
            // Protect Creator Routes
            else if (
              location.pathname.startsWith("/creator") &&
              role !== "creator"
            ) {
              if (role === "admin") {
                navigate(adminRoute, { replace: true });
              } else {
                navigate(unAuthorizedRoute, { replace: true });
              }
            }
          }
          return;
        }

        // allow public pages when NOT logged in
        if (publicPaths.includes(location.pathname)) return;

        // not logged in & protected route
        localStorage.removeItem("token");
        navigate(loginRoute, { replace: true });
      } catch {
        localStorage.removeItem("token");
        navigate(loginRoute, { replace: true });
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);

  const isTokenExpired = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  };

  const userRole = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    } catch {
      return null;
    }
  };

  return <Outlet />;
};

export default PersistAuth;
