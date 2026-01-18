import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type JWTPayload = {
  exp: number;
  [key: string]: any;
};

const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenJson = localStorage.getItem("token");
    
    if (!tokenJson) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const tokenObj = JSON.parse(tokenJson);
      const accessToken = tokenObj.access_token;
      
      if (!accessToken) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      const payload = decodeJWT(accessToken);
      
      if (!payload || payload.exp * 1000 <= Date.now()) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
};

export default ProtectedRoute;