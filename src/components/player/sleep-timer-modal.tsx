"use client";

import React from "react";
import { Moon, Check } from "lucide-react";
import { SleepTimerOption } from "@/types/audio";
import { Modal } from "@/components/ui/modal";
import { formatTime } from "@/lib/utils";

interface SleepTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTimer: SleepTimerOption;
  remainingSeconds: number | null;
  onSelectTimer: (timer: SleepTimerOption) => void;
}

export const SleepTimerModal: React.FC<SleepTimerModalProps> = ({
  isOpen,
  onClose,
  currentTimer,
  remainingSeconds,
  onSelectTimer,
}) => {
  const options: Array<{ label: string; value: SleepTimerOption; description?: string }> = [
    { label: "Off", value: "off" },
    { label: "10 Minutes", value: 10 },
    { label: "20 Minutes", value: 20 },
    { label: "30 Minutes", value: 30 },
    { label: "45 Minutes", value: 45 },
    { label: "60 Minutes", value: 60 },
    { label: "End of Chapter", value: "end_of_chapter", description: "Stops automatically when current chapter ends" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Audiobook Sleep Timer">
      <div className="space-y-4">
        {remainingSeconds !== null && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-amber-300 text-sm">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-amber-400" />
              <span>Timer active:</span>
            </div>
            <span className="font-mono font-bold text-base">{formatTime(remainingSeconds)}</span>
          </div>
        )}

        <div className="space-y-1.5">
          {options.map((opt) => {
            const isSelected = currentTimer === opt.value;
            return (
              <button
                key={String(opt.value)}
                onClick={() => {
                  onSelectTimer(opt.value);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-medium"
                    : "bg-stone-800/40 border-stone-800 text-stone-300 hover:bg-stone-800 hover:border-stone-700"
                }`}
              >
                <div>
                  <div className="text-sm font-semibold">{opt.label}</div>
                  {opt.description && <div className="text-xs text-stone-400">{opt.description}</div>}
                </div>
                {isSelected && <Check className="h-4 w-4 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
