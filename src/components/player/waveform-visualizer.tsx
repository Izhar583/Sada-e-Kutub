"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WaveformProps {
  isPlaying: boolean;
  barCount?: number;
  className?: string;
}

export const WaveformVisualizer: React.FC<WaveformProps> = ({
  isPlaying,
  barCount = 28,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-[3px] h-10 px-2", className)}>
      {Array.from({ length: barCount }).map((_, i) => {
        // Randomize initial heights
        const heightPattern = ((i * 7) % 10) / 10;
        const minHeight = 15;
        const maxHeight = 85;
        const computedHeight = minHeight + heightPattern * (maxHeight - minHeight);

        return (
          <span
            key={i}
            className={cn(
              "w-[3px] rounded-full bg-amber-400/80 transition-all duration-300",
              isPlaying ? "animate-pulse" : "opacity-40"
            )}
            style={{
              height: isPlaying ? `${Math.max(12, (computedHeight * ((i % 3) + 1)) % 100)}%` : "15%",
              animationDelay: `${(i * 0.08).toFixed(2)}s`,
              animationDuration: `${0.8 + ((i % 4) * 0.2)}s`,
            }}
          />
        );
      })}
    </div>
  );
};
