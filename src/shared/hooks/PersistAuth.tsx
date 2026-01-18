// import { useEffect } from "react";
// import { useNavigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const PersistAuth = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isMounted = true;

//     const checkAuth = async () => {
//       try {
//         const tokenJson = localStorage.getItem("token") || "{}";
//         const tokenObj = JSON.parse(tokenJson!);
//         const refreshToken = tokenObj.access_token;
//         // const refreshToken =null;

//         console.log("Perciste auth page");
//         if (!isMounted) return;
//         else if (!refreshToken || refreshToken === "{}") {
//           localStorage.removeItem("token");
//           navigate("/", { replace: true });
//           return;
//         } else if (isTokenExpired(refreshToken)) {
//           localStorage.removeItem("token");
//           navigate("/", { replace: true });
//         }
//       } catch {
//         if (!isMounted) return;
//         localStorage.removeItem("token");
//         navigate("/", { replace: true });
//       }
//     };

//     checkAuth();

//     return () => {
//       isMounted = false;
//     };
//     // Only run once on mount, so empty dependency array
//   }, [navigate]);

//   const isTokenExpired = (token: string) => {
//     if (!token) return true;
//     try {
//       const decoded: any = jwtDecode(token);
//       const now = Date.now() / 1000; // current time in seconds
//       return decoded.exp < now;
//     } catch (err) {
//       return true; // if token is invalid, consider it expired
//     }
//   };
//   return <Outlet />;
// };

// export default PersistAuth;

import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PersistAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const tokenJson = localStorage.getItem("token") || "{}";
        const tokenObj = JSON.parse(tokenJson);
        const accessToken = tokenObj.access_token;

        // Routes that don't need protection
        const publicPaths = ["/", "/register"];
        if (publicPaths.includes(location.pathname)) return;

        // If no token or token expired → redirect to login
        if (!accessToken || isTokenExpired(accessToken)) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
      } catch {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
    };

    checkAuth();
  }, [navigate, location]);

  const isTokenExpired = (token: string) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp! < Date.now() / 1000;
    } catch {
      return true;
    }
  };

  return <Outlet />;
};

export default PersistAuth;
