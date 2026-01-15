// src/shared/components/Input.jsx
import React from "react";
import { theme } from "../../core/theme/theme";

const Input = (props) => {
  return (
    <input
      {...props}
      className={`
        w-full
        h-11
        px-4 py-3
        rounded-lg
        border border-gray-300
        bg-white
        placeholder:text-gray-400
        focus:outline-none
        focus:border-orange-500
        focus:ring-2 focus:ring-orange-200
        transition-all duration-200
        disabled:bg-gray-100
        disabled:cursor-not-allowed
        ${props.className || ""}
      `}
    />
  );
};

export default Input;