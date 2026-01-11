import React from "react";
import { theme } from "../../core/theme/theme";
const Button = ({ children, color = "primary", onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: theme.colors[color],
        color: theme.colors.textcolor,
        padding: theme.spacing.medium,
        border: "none",
        borderRadius: theme.spacing.small,
        cursor: "pointer",
        width: "100%",
      }}
    >
      {children}
    </button>
  );
};
export default Button;
