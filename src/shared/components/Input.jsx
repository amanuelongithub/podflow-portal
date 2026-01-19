import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({ isPassword, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isPassword) {
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
  }

  return (
    <div className="relative w-full">
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        className={`
          w-full
          h-11
          px-4 ${props.className ? "pr-10 " + props.className : "pr-10"}
          py-3
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
        `}
        autoComplete="off"
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
      </span>
    </div>
  );
};

export default Input;
