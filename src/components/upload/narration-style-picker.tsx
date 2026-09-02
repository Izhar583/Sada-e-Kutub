"use client";

import React from "react";
import { NarrationStyle } from "@/types/book";
import { NARRATION_STYLES } from "@/lib/constants";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NarrationStylePickerProps {
  selectedStyle: NarrationStyle;
  recommendedStyle?: NarrationStyle;
  onSelectStyle: (style: NarrationStyle) => void;
}

export const NarrationStylePicker: React.FC<NarrationStylePickerProps> = ({
  selectedStyle,
  recommendedStyle,
  onSelectStyle,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-stone-200">
          Narration Pacing & Emotional Style
        </label>
        {recommendedStyle && (
          <span className="text-xs text-amber-400 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> AI Recommended: {recommendedStyle}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {NARRATION_STYLES.map((style) => {
          const isSelected = selectedStyle === style.id;
          const isRecommended = recommendedStyle === style.id;

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelectStyle(style.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40"
                  : "bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-100 text-sm">{style.name}</span>
                    <span className="text-xs font-urdu text-stone-400 font-normal">{style.urduName}</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">{style.description}</p>
                </div>
                {isSelected && (
                  <div className="h-5 w-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>

              {isRecommended && (
                <div className="mt-2.5">
                  <Badge variant="gold" className="text-[10px] py-0 px-2">
                    ★ Best for this book
                  </Badge>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
