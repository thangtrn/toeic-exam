import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   variant?: "default" | "dangerous" | "outline" | "ghost";
   disabled?: boolean;
   className?: string;
}

const Button = ({
   children,
   className = "",
   disabled = false,
   variant = "default",
   ...rest
}: ButtonProps) => {
   const baseStyle = "p-2 font-bold rounded mr-2 h-fit";
   const variantStyles = {
      default: "bg-blue-500 text-white",
      dangerous: "bg-red-500 text-white",
      outline: "border-2 border-blue-500 text-blue-500",
      ghost: "bg-transparent text-blue-500 border-none",
   };

   const disabledStyle = disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed border-none" : "";
   const currentVariantStyle = variantStyles[variant] || variantStyles.default;

   return (
      <button
         className={`${baseStyle} ${currentVariantStyle} ${disabledStyle} ${className}`}
         disabled={disabled}
         {...rest} // Spread the remaining props here
      >
         {children}
      </button>
   );
};

export default Button;
