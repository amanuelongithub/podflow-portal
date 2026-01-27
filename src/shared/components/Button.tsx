import { FC, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "accent";
  fullWidth?: boolean;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  color = "primary",
  onClick,
  type = "button",
  disabled,
  fullWidth = true,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
       ${fullWidth ? "w-full" : "w-auto"}
        h-10
        px-4
        rounded-lg
        font-medium
        flex items-center justify-center
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${color === "primary" ? "bg-[#ff6b00] text-white hover:bg-[#e55a00] focus:ring-[#ff6b00]" : ""}
        ${color === "secondary" ? "bg-[#1f1f1f] text-white hover:bg-[#333333] focus:ring-[#1f1f1f]" : ""}
        ${color === "accent" ? "bg-[rgba(255,107,0,0.1)] text-[#ff6b00] hover:bg-[rgba(255,107,0,0.2)] focus:ring-[#ff6b00]" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
