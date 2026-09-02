"use client";

import React from "react";
import { PlaybackSpeed } from "@/types/audio";
import { cn } from "@/lib/utils";

interface SpeedSelectorProps {
  currentSpeed: PlaybackSpeed;
  onSpeedChange: (speed: PlaybackSpeed) => void;
  className?: string;
}

export const SpeedSelector: React.FC<SpeedSelectorProps> = ({
  currentSpeed,
  onSpeedChange,
  className,
}) => {
  const speeds: PlaybackSpeed[] = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  return (
    <div className={cn("inline-flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1 gap-1", className)}>
      {speeds.map((s) => (
        <button
          key={s}
          onClick={() => onSpeedChange(s)}
          className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer",
            currentSpeed === s
              ? "bg-amber-400 text-stone-950 shadow-sm"
              : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
          )}
        >
          {s}x
        </button>
      ))}
    </div>
  );
};
