import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  adminRoute,
  creatorRoute,
  forgotpasswordRoute,
  homeRoute,
  loginRoute,
  registerRoute,
  unAuthorizedRoute,
} from "../../core/routes.ts";

const PersistAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const tokenJson = localStorage.getItem("token");
        const tokenObj = tokenJson ? JSON.parse(tokenJson) : null;
        const refreshToken = tokenObj?.refresh_token;

        const publicPaths = [
          homeRoute,
          loginRoute,
          registerRoute,
          forgotpasswordRoute,
        ];

        // logged in & token valid
        if (refreshToken && !isTokenExpired(refreshToken)) {
          if (publicPaths.includes(location.pathname)) {
            const role = userRole(refreshToken);
            console.log("User role detected:", role);
            if (role === "admin") {
              navigate(adminRoute, { replace: true });
            } else if (role === "creator") {
              navigate(creatorRoute, { replace: true });
            } else {
              navigate(unAuthorizedRoute, { replace: true });
            }
          }
          return;
        }

        // allow public pages when NOT logged in
        if (publicPaths.includes(location.pathname)) return;

        // not logged in & protected route
        localStorage.removeItem("token");
        navigate(homeRoute, { replace: true });
      } catch {
        localStorage.removeItem("token");
        navigate(homeRoute, { replace: true });
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
