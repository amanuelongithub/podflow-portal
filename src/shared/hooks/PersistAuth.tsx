import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PersistAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const tokenJson = localStorage.getItem("token");
        const tokenObj = tokenJson ? JSON.parse(tokenJson) : null;
        const refreshToken = tokenObj?.refresh_token;

        const publicPaths = ["/", "/login", "/register","/forgotpassword"];

        // ✅ logged in & token valid
        if (refreshToken && !isTokenExpired(refreshToken)) {
          if (publicPaths.includes(location.pathname)) {
            navigate("/home", { replace: true });
          }
          return;
        }

        // ✅ allow public pages when NOT logged in
        if (publicPaths.includes(location.pathname)) return;

        // ❌ not logged in & protected route
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } catch {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
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

  return <Outlet />;
};

export default PersistAuth;
