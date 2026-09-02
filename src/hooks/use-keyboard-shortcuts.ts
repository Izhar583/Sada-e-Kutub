"use client";

import { useEffect } from "react";
import { useAudio } from "@/context/audio-context";

export function useKeyboardShortcuts() {
  const { togglePlay, skipSeconds } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea or contenteditable element
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipSeconds(-15);
          break;
        case "ArrowRight":
          e.preventDefault();
          skipSeconds(15);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, skipSeconds]);
}
