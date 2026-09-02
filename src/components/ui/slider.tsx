import React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number;
  min?: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  showTooltip?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min = 0,
  max,
  step = 1,
  onChange,
  className,
}) => {
  const percentage = max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0;

  return (
    <div className={cn("relative flex items-center select-none touch-none w-full group", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-4 opacity-0 z-20 cursor-pointer"
      />
      <div className="relative w-full h-1.5 group-hover:h-2 bg-stone-800 rounded-full overflow-hidden transition-all">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className="absolute h-3.5 w-3.5 bg-amber-300 rounded-full shadow-md border-2 border-stone-900 pointer-events-none transition-transform group-hover:scale-125 duration-75"
        style={{ left: `calc(${percentage}% - 7px)` }}
      />
    </div>
  );
};
