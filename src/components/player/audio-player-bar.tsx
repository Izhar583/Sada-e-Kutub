"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Moon,
  Maximize2,
  ListMusic,
} from "lucide-react";
import { useAudio } from "@/context/audio-context";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/utils";
import { SleepTimerModal } from "./sleep-timer-modal";

export const AudioPlayerBar: React.FC = () => {
  const {
    currentBook,
    currentChapter,
    isPlaying,
    currentTime,
    duration,
    volume,
    speed,
    sleepTimer,
    sleepTimerRemaining,
    togglePlay,
    seekTo,
    skipSeconds,
    nextChapter,
    previousChapter,
    setVolume,
    setSpeed,
    setSleepTimer,
  } = useAudio();

  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!currentBook) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-stone-950/95 backdrop-blur-2xl border-t border-stone-800/90 px-4 py-2.5 shadow-2xl transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Book & Chapter Meta */}
          <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0">
            <img
              src={currentBook.coverUrl}
              alt={currentBook.title}
              className="h-12 w-12 rounded-xl object-cover border border-stone-800 shadow-md shrink-0"
            />
            <div className="min-w-0 flex-1">
              <Link
                href={`/book/${currentBook.id}/listen`}
                className="text-xs sm:text-sm font-semibold text-stone-100 truncate hover:text-amber-400 block transition-colors"
              >
                {currentBook.title}
              </Link>
              <p className="text-[11px] text-stone-400 truncate">
                {currentChapter?.title || "Chapter 1"} • {currentBook.author}
              </p>
            </div>
          </div>

          {/* Player Core Controls & Scrub Bar */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                onClick={previousChapter}
                title="Previous Chapter"
                className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={() => skipSeconds(-15)}
                title="Rewind 15s"
                className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-0.5 cursor-pointer text-xs"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="text-[10px] font-bold">15</span>
              </button>

              <button
                onClick={togglePlay}
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-stone-950" /> : <Play className="h-5 w-5 fill-stone-950 ml-0.5" />}
              </button>

              <button
                onClick={() => skipSeconds(15)}
                title="Forward 15s"
                className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-0.5 cursor-pointer text-xs"
              >
                <span className="text-[10px] font-bold">15</span>
                <RotateCw className="h-4 w-4" />
              </button>

              <button
                onClick={nextChapter}
                title="Next Chapter"
                className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            {/* Scrubber */}
            <div className="w-full flex items-center gap-2 max-w-lg">
              <span className="text-[10px] font-mono text-stone-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={currentTime}
                max={duration || 100}
                onChange={(val) => seekTo(val)}
                className="flex-1"
              />
              <span className="text-[10px] font-mono text-stone-400 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Quick Aux Actions */}
          <div className="hidden md:flex items-center gap-3 w-1/4 justify-end">
            {/* Speed toggle */}
            <button
              onClick={() => {
                const nextSpeeds: Record<number, any> = { 0.75: 1.0, 1.0: 1.25, 1.25: 1.5, 1.5: 2.0, 2.0: 0.75 };
                setSpeed(nextSpeeds[speed] || 1.0);
              }}
              className="text-xs font-semibold text-stone-400 hover:text-amber-400 border border-stone-800 rounded-lg px-2 py-1 bg-stone-900 cursor-pointer"
            >
              {speed}x
            </button>

            {/* Sleep timer button */}
            <button
              onClick={() => setIsTimerModalOpen(true)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                sleepTimer !== "off"
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-100"
              }`}
              title="Sleep Timer"
            >
              <Moon className="h-4 w-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 w-24">
              <button
                onClick={() => {
                  if (isMuted) {
                    setVolume(1.0);
                    setIsMuted(false);
                  } else {
                    setVolume(0);
                    setIsMuted(true);
                  }
                }}
                className="text-stone-400 hover:text-stone-100 cursor-pointer"
              >
                {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <Slider
                value={isMuted ? 0 : volume * 100}
                max={100}
                onChange={(val) => {
                  setVolume(val / 100);
                  setIsMuted(val === 0);
                }}
              />
            </div>

            {/* Fullscreen Player Link */}
            <Link
              href={`/book/${currentBook.id}/listen`}
              className="p-2 rounded-lg border border-stone-800 bg-stone-900 text-stone-400 hover:text-amber-400 transition-colors"
              title="Open Fullscreen Listening Room"
            >
              <Maximize2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <SleepTimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        currentTimer={sleepTimer}
        remainingSeconds={sleepTimerRemaining}
        onSelectTimer={setSleepTimer}
      />
    </>
  );
};
