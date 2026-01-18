import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../shared/services/auth.tsx";

type JWTPayload = {
  exp: number;
  [key: string]: any;
};

const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const PersistAuth = () => {
  const { refreshToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const tokenJson = await refreshToken();

      if (!tokenJson) return;

      try {
        const tokenObj = JSON.parse(tokenJson);
        const accessToken = tokenObj.access_token;

        if (!accessToken) {
          localStorage.removeItem("token");
          return;
        }

        const payload = decodeJWT(accessToken);
        if (!payload) {
          localStorage.removeItem("token");
          return;
        }

        const isValid = payload.exp * 1000 > Date.now();

        if (isValid) {
          if (
            location.pathname === "/" ||
            location.pathname === "/login" ||
            location.pathname === "/register"
          ) {
            navigate("/home", { replace: true });
          }
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    };

    checkAuth();
  }, [refreshToken, navigate, location.pathname]);

  return <Outlet />;
};

export default PersistAuth;
