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
  Bookmark,
  Volume2,
  VolumeX,
  Moon,
  Sparkles,
  BookOpen,
  BotMessageSquare,
  Share2,
} from "lucide-react";
import { useAudio } from "@/context/audio-context";
import { useBooks } from "@/context/book-context";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import { WaveformVisualizer } from "./waveform-visualizer";
import { SpeedSelector } from "./speed-selector";
import { SleepTimerModal } from "./sleep-timer-modal";
import { ChapterDrawer } from "./chapter-drawer";

export const FullScreenPlayer: React.FC = () => {
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
    setSpeed,
    setVolume,
    setSleepTimer,
    playBook,
  } = useAudio();

  const { addBookmark } = useBooks();
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  if (!currentBook) return null;

  const isUrdu = currentBook.language === "ur";
  const contentToDisplay = isUrdu
    ? currentChapter?.urduContent || currentChapter?.content
    : currentChapter?.content;

  const handleBookmarkCurrent = () => {
    if (!currentChapter) return;
    addBookmark({
      bookId: currentBook.id,
      chapterId: currentChapter.id,
      positionSeconds: Math.floor(currentTime),
      note: `Bookmark at ${formatTime(currentTime)}`,
      quoteSnippet: contentToDisplay?.slice(0, 120),
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-28 pt-4 px-4 sm:px-8">
      {/* Top Bar Navigation */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 border-b border-stone-800/80 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-stone-400 hover:text-stone-100 text-sm flex items-center gap-1.5 transition-colors"
          >
            ← Library
          </Link>
          <span className="text-stone-700">|</span>
          <div className="flex items-center gap-2">
            <Badge variant="gold">
              {isUrdu ? "Urdu AI Narration" : "English AI Narration"}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              Style: {currentBook.selectedStyle || "Storytelling"}
            </Badge>
          </div>
        </div>

        {/* View Switchers: Read | Listen | Ask */}
        <div className="flex items-center gap-2">
          <Link href={`/book/${currentBook.id}/read`}>
            <Button variant="secondary" size="sm" className="gap-1.5">
              <BookOpen className="h-4 w-4 text-stone-400" />
              <span>Read Text</span>
            </Button>
          </Link>
          <Link href={`/book/${currentBook.id}/ask`}>
            <Button variant="secondary" size="sm" className="gap-1.5">
              <BotMessageSquare className="h-4 w-4 text-amber-400" />
              <span>Ask My Book</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Left Listening Stage | Right Chapter Drawer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Stage */}
        <div className="lg:col-span-7 flex flex-col items-center text-center space-y-6">
          
          {/* Cover Art with Glow */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-35 transition-opacity" />
            <img
              src={currentBook.coverUrl}
              alt={currentBook.title}
              className="relative h-72 w-56 sm:h-80 sm:w-64 rounded-2xl object-cover shadow-2xl border border-stone-800"
            />
          </div>

          {/* Book Titles */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {currentBook.title}
            </h1>
            {currentBook.urduTitle && (
              <h2 className="text-xl font-urdu text-amber-300 font-normal">
                {currentBook.urduTitle}
              </h2>
            )}
            <p className="text-stone-400 text-sm">
              by <span className="text-stone-200 font-medium">{currentBook.author}</span>
            </p>
          </div>

          {/* Dynamic Waveform Visualizer */}
          <div className="py-2">
            <WaveformVisualizer isPlaying={isPlaying} barCount={36} />
          </div>

          {/* Active Chapter Badge */}
          <div className="px-4 py-2 rounded-xl bg-stone-900/80 border border-stone-800 inline-block">
            <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Currently Narrating
            </p>
            <p className="text-sm font-medium text-stone-200">
              {currentChapter?.title || "Chapter 1"}
            </p>
          </div>

          {/* Live Subtitles Card */}
          {showSubtitles && contentToDisplay && (
            <div
              className={`w-full max-w-xl p-5 rounded-2xl bg-stone-900/40 border border-stone-800/80 text-left transition-all ${
                isUrdu ? "text-right font-urdu text-base leading-loose" : "text-sm text-stone-300 leading-relaxed"
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-800/60 mb-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-sans">
                  Live Narration Transcript
                </span>
                <button
                  onClick={handleBookmarkCurrent}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-sans"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>Pin Quote</span>
                </button>
              </div>
              <p className="line-clamp-4 text-stone-300">{contentToDisplay}</p>
            </div>
          )}

          {/* Scrub Bar */}
          <div className="w-full max-w-xl space-y-2">
            <Slider
              value={currentTime}
              max={duration || 100}
              onChange={(val) => seekTo(val)}
            />
            <div className="flex justify-between text-xs font-mono text-stone-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={previousChapter}
              className="p-3 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
              title="Previous Chapter"
            >
              <SkipBack className="h-6 w-6" />
            </button>

            <button
              onClick={() => skipSeconds(-15)}
              className="p-3 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer relative"
              title="Rewind 15s"
            >
              <RotateCcw className="h-6 w-6" />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-amber-400">
                15
              </span>
            </button>

            <button
              onClick={togglePlay}
              className="h-16 w-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 fill-stone-950" />
              ) : (
                <Play className="h-7 w-7 fill-stone-950 ml-1" />
              )}
            </button>

            <button
              onClick={() => skipSeconds(15)}
              className="p-3 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer relative"
              title="Forward 15s"
            >
              <RotateCw className="h-6 w-6" />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-amber-400">
                15
              </span>
            </button>

            <button
              onClick={nextChapter}
              className="p-3 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
              title="Next Chapter"
            >
              <SkipForward className="h-6 w-6" />
            </button>
          </div>

          {/* Speed & Aux Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <SpeedSelector currentSpeed={speed} onSpeedChange={setSpeed} />

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTimerModalOpen(true)}
              className="gap-2"
            >
              <Moon className="h-4 w-4 text-amber-400" />
              <span>{sleepTimer !== "off" ? `Timer: ${sleepTimer}m` : "Sleep Timer"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmarkCurrent}
              className="gap-2"
            >
              <Bookmark className="h-4 w-4 text-amber-400" />
              <span>Bookmark Quote</span>
            </Button>
          </div>
        </div>

        {/* Right Stage: Chapter & Bookmarks Playlist */}
        <div className="lg:col-span-5">
          <ChapterDrawer
            book={currentBook}
            currentChapterId={currentChapter?.id}
            onSelectChapter={(chId) => playBook(currentBook, chId)}
          />
        </div>
      </div>

      <SleepTimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        currentTimer={sleepTimer}
        remainingSeconds={sleepTimerRemaining}
        onSelectTimer={setSleepTimer}
      />
    </div>
  );
};
