"use client";

import React from "react";
import { Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

interface VoiceAssistantButtonProps {
  onTranscript: (text: string) => void;
  lang?: string;
}

export const VoiceAssistantButton: React.FC<VoiceAssistantButtonProps> = ({
  onTranscript,
  lang = "en-US",
}) => {
  const { isListening, startListening, stopListening, isSupported } = useSpeechRecognition({
    lang,
    onResult: (text) => {
      onTranscript(text);
    },
  });

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all cursor-pointer relative ${
        isListening
          ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30 ring-4 ring-rose-500/20"
          : "bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700"
      }`}
      title={isListening ? "Listening... click to stop" : "Speak to Ask My Book"}
    >
      {isListening ? (
        <Mic className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5 text-amber-400" />
      )}
    </button>
  );
};
