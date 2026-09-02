"use client";

import { useState, useEffect, useCallback } from "react";

interface SpeechRecognitionHookOptions {
  lang?: string;
  onResult?: (transcript: string) => void;
  onError?: (error: any) => void;
}

export function useSpeechRecognition({ lang = "en-US", onResult, onError }: SpeechRecognitionHookOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      setIsSupported(true);
    }
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert("Speech recognition is not supported in this browser. You can type your query instead.");
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        if (event.results[0].isFinal) {
          onResult?.(currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        onError?.(event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error("Speech recognition start error", e);
      setIsListening(false);
    }
  }, [lang, onResult, onError]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  };
}
