"use client";

import React from "react";
import Link from "next/link";
import { Search, Sparkles, User, Bell, Headphones } from "lucide-react";
import { useBooks } from "@/context/book-context";
import { useAudio } from "@/context/audio-context";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery, activeBook } = useBooks();
  const { isPlaying, togglePlay } = useAudio();

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative max-w-md w-full hidden sm:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
        <input
          type="text"
          placeholder="Search books, Urdu novels, chapters, authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-stone-900/80 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {activeBook && (
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlay}
            className="hidden md:flex items-center gap-2 border-amber-500/30 text-amber-300"
          >
            <Headphones className={`h-4 w-4 ${isPlaying ? "animate-pulse text-amber-400" : ""}`} />
            <span>{isPlaying ? "Playing: " : "Resume: "}</span>
            <span className="font-semibold truncate max-w-[120px]">{activeBook.title}</span>
          </Button>
        )}

        <Link href="/upload">
          <Button variant="primary" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Upload Book</span>
          </Button>
        </Link>

        <button className="h-9 w-9 rounded-xl border border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:text-stone-100 transition-colors">
          <Bell className="h-4 w-4" />
        </button>

        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold text-xs shadow-md">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
};
