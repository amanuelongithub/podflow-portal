import { useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { BiLogOutCircle } from "react-icons/bi";
import { theme } from "../../core/theme";
import { loginRoute } from "../../core/routes.ts";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          padding: "32px",
          borderRadius: "20px",
          textAlign: "center",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <FiAlertCircle size={64} color='#FF6B00' />
        </div>
        <h1 style={{ color: "#1F1F1F", fontWeight: 700 }}>Unauthorized</h1>
        <p
          style={{
            color: theme.colors.textcolor,
            margin: "12px 0 24px",
          }}
        >
          You are not authorized to access this page.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate(loginRoute, { replace: true });
            }}
            className='flex items-center gap-2 px-4 h-10
               border border-gray-200 hover:bg-gray-100 transition'
            style={{ borderRadius: "10px" }}
          >
            <BiLogOutCircle color={theme.colors.primary} size={22} />
            <span
              style={{
                color: theme.colors.primary,
                fontWeight: 500,
              }}
            >
              LogOut
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
