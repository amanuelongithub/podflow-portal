import { useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { theme } from "../../core/theme/theme";

const NotFound = () => {
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
        <h1 style={{ color: "#1F1F1F", fontWeight: 700 }}>Page not found</h1>
        <p
          style={{
            color: theme.colors.textcolor,
            margin: "12px 0 24px",
          }}
        >
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/home")}
            className='flex items-center gap-2 px-4 h-10
               border border-gray-200 hover:bg-gray-100 transition'
            style={{ borderRadius: "10px" }}
          >
            <IoIosArrowRoundBack color={theme.colors.primary} size={22} />
            <span
              style={{
                color: theme.colors.primary,
                fontWeight: 500,
              }}
            >
              Go back home
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
