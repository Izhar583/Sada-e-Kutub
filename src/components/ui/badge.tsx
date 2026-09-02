import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "secondary" | "success" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-stone-800 text-stone-300 border border-stone-700/60",
    gold: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
    secondary: "bg-stone-900 text-stone-400 border border-stone-800",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    outline: "bg-transparent text-stone-300 border border-stone-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
