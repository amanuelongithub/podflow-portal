// src/shared/components/Input.jsx
import React from "react";
import { theme } from "../../core/theme/theme";

const Input = ({
  value,
  type = "text",
  onChange,
  required = false,
  readOnly = false,
  placeholder,
  className,
}) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: theme.spacing.small,
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        fontFamily: theme.typography.fontFamily,
      }}
    />
  );
};

export default Input;
