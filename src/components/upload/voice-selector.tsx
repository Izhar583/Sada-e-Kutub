"use client";

import React, { useState } from "react";
import { VoiceOption } from "@/types/audio";
import { AVAILABLE_VOICES } from "@/lib/constants";
import { Play, Square, Check, Mic } from "lucide-react";
import { AudioEngine } from "@/lib/audio-engine";
import { Badge } from "@/components/ui/badge";

interface VoiceSelectorProps {
  selectedVoiceId: string;
  languageFilter?: "en" | "ur" | "all";
  onSelectVoice: (voiceId: string) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoiceId,
  languageFilter = "all",
  onSelectVoice,
}) => {
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const filteredVoices = AVAILABLE_VOICES.filter((v) => {
    if (languageFilter === "all") return true;
    return v.language === languageFilter;
  });

  const handlePreview = (e: React.MouseEvent, voice: VoiceOption) => {
    e.stopPropagation();
    if (playingVoiceId === voice.id) {
      AudioEngine.stop();
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(voice.id);
      AudioEngine.speak(voice.sampleText, {
        lang: voice.language === "ur" ? "ur-PK" : "en-US",
        onEnd: () => setPlayingVoiceId(null),
        onError: () => setPlayingVoiceId(null),
      });
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-stone-200">
        Choose AI Voice Narrator
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredVoices.map((voice) => {
          const isSelected = selectedVoiceId === voice.id;
          const isPreviewing = playingVoiceId === voice.id;

          return (
            <div
              key={voice.id}
              onClick={() => onSelectVoice(voice.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/50 shadow-md ring-1 ring-amber-500/40"
                  : "bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm text-stone-100">{voice.name}</h4>
                    <p className="text-xs text-stone-400 mt-0.5">{voice.accent}</p>
                  </div>
                  <Badge variant={voice.language === "ur" ? "gold" : "secondary"}>
                    {voice.language === "ur" ? "اردو" : "English"}
                  </Badge>
                </div>

                <p
                  className={`mt-2 text-xs text-stone-300 italic ${
                    voice.language === "ur" ? "font-urdu text-right text-sm" : ""
                  }`}
                >
                  "{voice.sampleText}"
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-800/60">
                <button
                  type="button"
                  onClick={(e) => handlePreview(e, voice)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  {isPreviewing ? (
                    <>
                      <Square className="h-3.5 w-3.5 fill-amber-400" />
                      <span>Stop Preview</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-amber-400" />
                      <span>Listen Preview</span>
                    </>
                  )}
                </button>

                {isSelected && (
                  <span className="text-xs text-amber-400 flex items-center gap-1 font-semibold">
                    <Check className="h-3.5 w-3.5" /> Selected
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
