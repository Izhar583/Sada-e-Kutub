"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  BotMessageSquare,
  Bookmark,
  Sparkles,
  Languages,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Volume2,
} from "lucide-react";
import { Book } from "@/types/book";
import { useAudio } from "@/context/audio-context";
import { useBooks } from "@/context/book-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UrduTextContainer } from "./urdu-text-container";
import { SynchronizedHighlighter } from "./synchronized-highlighter";

interface BookReaderViewProps {
  book: Book;
  initialChapterId?: string;
}

export const BookReaderView: React.FC<BookReaderViewProps> = ({ book, initialChapterId }) => {
  const [currentChapterId, setCurrentChapterId] = useState(initialChapterId || book.chapters[0]?.id);
  const [fontSizeLevel, setFontSizeLevel] = useState<"sm" | "base" | "lg" | "xl">("lg");
  const [showUrduTranslation, setShowUrduTranslation] = useState(book.language === "ur");

  const { isPlaying, togglePlay, playBook, activeSentenceIndex } = useAudio();
  const { addBookmark } = useBooks();

  const currentChapterIndex = book.chapters.findIndex((c) => c.id === currentChapterId);
  const currentChapter = book.chapters[currentChapterIndex] || book.chapters[0];

  const handleNextChapter = () => {
    if (currentChapterIndex < book.chapters.length - 1) {
      setCurrentChapterId(book.chapters[currentChapterIndex + 1].id);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterId(book.chapters[currentChapterIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0c] text-stone-200 pb-32">
      {/* Top Reader Navigation Bar */}
      <div className="sticky top-0 z-20 border-b border-stone-800 bg-stone-950/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-stone-400 hover:text-stone-100 text-sm flex items-center gap-1 transition-colors"
          >
            ← Library
          </Link>
          <span className="text-stone-700">|</span>
          <div>
            <h1 className="text-sm font-semibold text-stone-100 truncate max-w-[200px] sm:max-w-md">
              {book.title}
            </h1>
            <p className="text-xs text-stone-500">{currentChapter?.title}</p>
          </div>
        </div>

        {/* Reader Action Controls */}
        <div className="flex items-center gap-2">
          {/* Urdu / English toggle */}
          {book.chapters.some((c) => c.urduContent) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUrduTranslation(!showUrduTranslation)}
              className="gap-1.5 text-xs border-amber-500/30 text-amber-300"
            >
              <Languages className="h-3.5 w-3.5" />
              <span>{showUrduTranslation ? "Show Original" : "اردو ترجمہ"}</span>
            </Button>
          )}

          {/* Font Resizing */}
          <div className="hidden sm:flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setFontSizeLevel("sm")}
              className="px-2 py-1 text-xs text-stone-400 hover:text-stone-100 cursor-pointer"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel("lg")}
              className="px-2 py-1 text-xs text-stone-400 hover:text-stone-100 cursor-pointer"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel("xl")}
              className="px-2 py-1 text-xs text-stone-400 hover:text-stone-100 cursor-pointer"
            >
              A+
            </button>
          </div>

          {/* Listen Mode */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => playBook(book, currentChapter?.id)}
            className="gap-1.5"
          >
            <Headphones className="h-4 w-4" />
            <span className="hidden sm:inline">{isPlaying ? "Listening" : "Listen Chapter"}</span>
          </Button>

          {/* Ask AI */}
          <Link href={`/book/${book.id}/ask`}>
            <Button variant="secondary" size="sm" className="gap-1.5">
              <BotMessageSquare className="h-4 w-4 text-amber-400" />
              <span className="hidden md:inline">Ask AI</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Reading Canvas */}
      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-10">
        
        {/* Chapter Header */}
        <div className="text-center pb-8 border-b border-stone-800/80 mb-8 space-y-2">
          <Badge variant="gold" className="mb-1">
            Chapter {currentChapterIndex + 1} of {book.chapters.length}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100">
            {currentChapter?.title}
          </h2>
          {currentChapter?.urduTitle && (
            <h3 className="text-xl font-urdu text-amber-300">
              {currentChapter.urduTitle}
            </h3>
          )}
        </div>

        {/* Chapter Text Display (Supports Synchronized Audio Highlighting) */}
        <div className="prose prose-invert max-w-none">
          {showUrduTranslation ? (
            <UrduTextContainer fontSize={fontSizeLevel}>
              <SynchronizedHighlighter
                text={currentChapter?.urduContent || currentChapter?.content || ""}
                activeSentenceIndex={activeSentenceIndex}
                isUrdu={true}
              />
            </UrduTextContainer>
          ) : (
            <div className={`leading-relaxed text-stone-300 font-serif ${fontSizeLevel === "xl" ? "text-xl leading-9" : fontSizeLevel === "sm" ? "text-sm leading-6" : "text-base leading-8"}`}>
              <SynchronizedHighlighter
                text={currentChapter?.content || ""}
                activeSentenceIndex={activeSentenceIndex}
                isUrdu={false}
              />
            </div>
          )}
        </div>

        {/* Chapter Navigation Bottom Buttons */}
        <div className="flex items-center justify-between pt-12 border-t border-stone-800 mt-12">
          <Button
            variant="outline"
            onClick={handlePrevChapter}
            disabled={currentChapterIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Chapter</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleNextChapter}
            disabled={currentChapterIndex === book.chapters.length - 1}
            className="gap-2"
          >
            <span>Next Chapter</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};
