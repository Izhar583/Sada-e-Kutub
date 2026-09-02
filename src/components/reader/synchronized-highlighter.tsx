"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SynchronizedHighlighterProps {
  text: string;
  activeSentenceIndex: number;
  isUrdu?: boolean;
  onSentenceClick?: (index: number) => void;
  className?: string;
}

export const SynchronizedHighlighter: React.FC<SynchronizedHighlighterProps> = ({
  text,
  activeSentenceIndex,
  isUrdu = false,
  onSentenceClick,
  className,
}) => {
  // Split into sentences
  const sentences = text
    .split(/([.!?۔\n]+)/)
    .filter((s) => s.trim().length > 0);

  // Group text + punctuation
  const sentencePairs: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    sentencePairs.push(sentences[i] + (sentences[i + 1] || ""));
  }

  return (
    <div className={cn("space-y-4", className)}>
      {sentencePairs.map((sentence, idx) => {
        const isActive = idx === activeSentenceIndex;
        return (
          <p
            key={idx}
            onClick={() => onSentenceClick?.(idx)}
            className={cn(
              "transition-all duration-300 rounded-xl p-2 cursor-pointer",
              isActive
                ? "bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-medium shadow-sm"
                : "text-stone-300 hover:bg-stone-900/40 hover:text-stone-100",
              isUrdu ? (isActive ? "border-r-4 border-l-0" : "") : ""
            )}
          >
            {sentence}
          </p>
        );
      })}
    </div>
  );
};
