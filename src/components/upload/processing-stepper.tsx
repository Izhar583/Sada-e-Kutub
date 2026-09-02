"use client";

import React from "react";
import { CheckCircle2, Loader2, Sparkles, Languages, BookCheck, Headphones } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface ProcessingStep {
  id: string;
  label: string;
  description: string;
  status: "pending" | "processing" | "completed";
}

interface ProcessingStepperProps {
  currentStepIndex: number;
  progressPercent: number;
}

export const ProcessingStepper: React.FC<ProcessingStepperProps> = ({
  currentStepIndex,
  progressPercent,
}) => {
  const steps: Array<{ title: string; desc: string }> = [
    { title: "File Validation & Layout Check", desc: "Checking whether text-based or scanned raster PDF" },
    { title: "High-Precision Urdu & English OCR", desc: "Extracting paragraphs, typography, and clean text" },
    { title: "Language & Book Classification", desc: "Detecting Urdu / English & identifying genre (Novel/Self-Help/Poetry)" },
    { title: "Intelligent Chapter Splitting", desc: "Detecting chapter titles, sections, and pacing points" },
    { title: "Narration Audio Generation", desc: "Synthesizing AI audiobook chapters with emotional inflections" },
  ];

  return (
    <div className="rounded-3xl border border-stone-800 bg-stone-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <span>AI Book Ingestion Engine</span>
          </h3>
          <p className="text-xs text-stone-400">Transforming your document into a structured audiobook</p>
        </div>
        <span className="text-sm font-mono font-bold text-amber-400">{progressPercent}%</span>
      </div>

      <Progress value={progressPercent} />

      <div className="space-y-4 pt-2">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.title}
              className={`flex items-start gap-3.5 p-3 rounded-2xl border transition-all ${
                isCurrent
                  ? "bg-amber-500/10 border-amber-500/40 text-stone-100 shadow-sm"
                  : isDone
                  ? "bg-stone-900/40 border-stone-800/80 text-stone-400"
                  : "bg-transparent border-transparent text-stone-600 opacity-60"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-stone-700 flex items-center justify-center text-[10px] text-stone-500">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold flex items-center justify-between">
                  <span>{step.title}</span>
                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                      Processing
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-400 mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
