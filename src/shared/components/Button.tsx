import { FC, ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "accent"
  fullWidth?: boolean
  loading?: boolean
  children?: ReactNode
}

const Button: FC<ButtonProps> = ({
  children,
  color = "primary",
  onClick,
  type = "button",
  disabled,
  loading = false,
  fullWidth = true,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
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
      {loading ? (
        <>
          <svg
            className='animate-spin -ml-1 mr-2 h-5 w-5 text-current'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
