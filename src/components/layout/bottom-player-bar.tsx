"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAudio } from "@/context/audio-context";
import { useBooks } from "@/context/book-context";
import { formatTime } from "@/lib/utils";

export const BottomPlayerBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const {
    currentBook,
    currentChapter,
    isPlaying,
    currentTime,
    duration,
    speed,
    volume,
    togglePlay,
    seekTo,
    nextChapter,
    previousChapter,
    setSpeed,
    setVolume,
    playBook,
  } = useAudio();

  const { activeBook } = useBooks();

  if (!isVisible) return null;

  // Resolved active item
  const book = currentBook || activeBook;
  const chapter = currentChapter || book?.chapters[0];

  const handleTogglePlay = () => {
    if (!currentBook && book) {
      playBook(book);
    } else {
      togglePlay();
    }
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2] as const;
    const currentIndex = speeds.indexOf(speed as any);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 1);
  };

  const handleClose = () => {
    if (isPlaying) {
      togglePlay();
    }
    setIsVisible(false);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const defaultCover =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuADsM9kZe2IQuiqCGFkkOhI3Ww0t4nH_GHnVWeaB3HggWR6xWel5eQoSflk3z_hW-eVXs20QATsdbholiUUZZXfm0pfBMlzhcpyvJY8UOAoPb5FTuMvRfFfGUZuyl3WFnRnBCBM9ciQINHRbUQ9Ii3b2O6NTMKMr7AhH1J-Yw6bNBnJK8WJXQ_-_BSQNtwXqltl_V9QIulg4PdBHzWvZDhQxzYpWS0N9a_aIClAneq8aO00Hl0BaodK";

  return (
    <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-[#1c1b1b] border-t border-[#363535] p-3.5 sm:p-4 z-40 flex items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all animate-fade-in select-none">
      
      {/* Player: Track Info */}
      <div className="flex items-center gap-3.5 w-1/4 min-w-[180px]">
        <img
          alt="Now Playing Thumbnail"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded border border-[#363535] object-cover shrink-0"
          src={book?.coverUrl || defaultCover}
        />
        <div className="overflow-hidden">
          <h5 className="text-[#e6e1e5] font-semibold text-xs sm:text-sm truncate">
            {chapter?.title || chapter?.urduTitle || "Chapter 1"}
          </h5>
          <p className="text-[#cac4d0] text-[11px] sm:text-xs truncate">
            {book?.title || "Sada-e-Kutub Audiobook"} {book?.author ? `• ${book.author}` : ""}
          </p>
        </div>
      </div>

      {/* Player: Controls & Range */}
      <div className="flex flex-col items-center flex-1 max-w-xl sm:max-w-2xl px-2">
        <div className="flex items-center gap-5 sm:gap-6 mb-1.5">
          <button
            type="button"
            className="text-[#cac4d0] hover:text-[#d4af37] transition-colors cursor-pointer text-xs sm:text-sm"
          >
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button
            type="button"
            onClick={previousChapter}
            className="text-[#cac4d0] hover:text-[#e6e1e5] transition-colors text-sm sm:text-base cursor-pointer"
          >
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button
            type="button"
            onClick={handleTogglePlay}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-[#d4af37] text-[#382900] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md shadow-[#d4af37]/20 cursor-pointer"
          >
            <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play ml-0.5"} text-xs sm:text-sm`}></i>
          </button>
          <button
            type="button"
            onClick={nextChapter}
            className="text-[#cac4d0] hover:text-[#e6e1e5] transition-colors text-sm sm:text-base cursor-pointer"
          >
            <i className="fa-solid fa-forward-step"></i>
          </button>
          <button
            type="button"
            className="text-[#cac4d0] hover:text-[#d4af37] transition-colors cursor-pointer text-xs sm:text-sm"
          >
            <i className="fa-solid fa-repeat"></i>
          </button>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 w-full text-[10px] sm:text-xs text-[#cac4d0] font-sans">
          <span>{formatTime(currentTime)}</span>
          <input
            className="w-full accent-[#d4af37] bg-[#363535] h-1 rounded-full appearance-none cursor-pointer"
            max={duration || 100}
            min="0"
            type="range"
            value={currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
          />
          <span>{formatTime(duration || 120)}</span>
        </div>
      </div>

      {/* Player: Extra Options & Cancel Button */}
      <div className="flex items-center justify-end gap-3 sm:gap-4 w-1/4 min-w-[130px] sm:min-w-[150px]">
        <button
          type="button"
          onClick={toggleSpeed}
          className="text-[#cac4d0] hover:text-[#e6e1e5] transition-colors text-xs border border-[#49454f] px-2 py-0.5 rounded cursor-pointer font-medium"
        >
          {speed}x
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="text-[#cac4d0] hover:text-[#e6e1e5] transition-colors cursor-pointer text-sm"
        >
          <i className={`fa-solid ${volume === 0 ? "fa-volume-xmark" : "fa-volume-high"}`}></i>
        </button>
        <Link
          href={book ? `/book/${book.id}/listen` : "/book/peer-e-kamil/listen"}
          className="text-[#cac4d0] hover:text-[#e6e1e5] transition-colors hidden md:block text-sm"
          title="Fullscreen Player"
        >
          <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
        </Link>

        {/* Cancel / Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2a2a2a] hover:bg-[#363535] text-[#cac4d0] hover:text-[#e6e1e5] flex items-center justify-center transition-all cursor-pointer border border-[#49454f]/50 ml-1 shrink-0"
          title="Close Player"
        >
          <i className="fa-solid fa-xmark text-xs sm:text-sm"></i>
        </button>
      </div>

    </div>
  );
};
