import React from "react";
import { cn } from "@/lib/utils";

interface UrduTextProps {
  children: React.ReactNode;
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  className?: string;
}

export const UrduTextContainer: React.FC<UrduTextProps> = ({
  children,
  fontSize = "lg",
  className,
}) => {
  const fontSizes = {
    sm: "text-base leading-loose",
    base: "text-lg leading-[2.4rem]",
    lg: "text-xl leading-[2.8rem]",
    xl: "text-2xl leading-[3.2rem]",
    "2xl": "text-3xl leading-[3.8rem]",
  };

  return (
    <div
      dir="rtl"
      className={cn(
        "font-urdu text-stone-100 text-right tracking-normal selection:bg-amber-500/30",
        fontSizes[fontSize],
        className
      )}
    >
      {children}
    </div>
  );
};
