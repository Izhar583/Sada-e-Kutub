import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className,
  indicatorClassName,
  showLabel,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between text-xs text-stone-400">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-stone-800", className)}>
        <div
          className={cn(
            "h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 ease-in-out",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
