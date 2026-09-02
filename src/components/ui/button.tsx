import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

    const variantStyles = {
      primary: "bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20 hover:from-amber-500 hover:to-amber-400 hover:shadow-amber-500/30",
      secondary: "bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white border border-stone-700/60 shadow-sm",
      outline: "border border-stone-700 text-stone-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-300",
      ghost: "text-stone-400 hover:text-stone-100 hover:bg-stone-800/60",
      gold: "bg-amber-400 text-stone-950 font-bold hover:bg-amber-300 shadow-lg shadow-amber-400/25",
      danger: "bg-rose-600/90 text-white hover:bg-rose-600",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
