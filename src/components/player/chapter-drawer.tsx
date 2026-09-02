"use client";

import React, { useState } from "react";
import { Book, Chapter, Bookmark } from "@/types/book";
import { Play, Bookmark as BookmarkIcon, CheckCircle2, Clock, Trash2, Plus } from "lucide-react";
import { formatTime, cn } from "@/lib/utils";
import { useAudio } from "@/context/audio-context";
import { useBooks } from "@/context/book-context";

interface ChapterDrawerProps {
  book: Book;
  currentChapterId?: string;
  onSelectChapter: (chapterId: string) => void;
}

export const ChapterDrawer: React.FC<ChapterDrawerProps> = ({
  book,
  currentChapterId,
  onSelectChapter,
}) => {
  const [activeTab, setActiveTab] = useState<"chapters" | "bookmarks">("chapters");
  const { isPlaying, currentTime, playBook } = useAudio();
  const { addBookmark, deleteBookmark } = useBooks();

  const handleCreateBookmark = () => {
    const currentCh = book.chapters.find((c) => c.id === currentChapterId) || book.chapters[0];
    addBookmark({
      bookId: book.id,
      chapterId: currentCh?.id || "",
      positionSeconds: Math.floor(currentTime),
      note: `Bookmark at ${formatTime(currentTime)}`,
    });
  };

  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-900/60 backdrop-blur-xl p-5 shadow-xl flex flex-col h-full">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
        <div className="flex items-center gap-2 bg-stone-950 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setActiveTab("chapters")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeTab === "chapters"
                ? "bg-amber-400 text-stone-950 shadow-sm"
                : "text-stone-400 hover:text-stone-200"
            )}
          >
            Chapters ({book.chapters.length})
          </button>
          <button
            onClick={() => setActiveTab("bookmarks")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5",
              activeTab === "bookmarks"
                ? "bg-amber-400 text-stone-950 shadow-sm"
                : "text-stone-400 hover:text-stone-200"
            )}
          >
            <BookmarkIcon className="h-3 w-3" />
            <span>Bookmarks ({book.bookmarks?.length || 0})</span>
          </button>
        </div>

        {activeTab === "bookmarks" && (
          <button
            onClick={handleCreateBookmark}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Here</span>
          </button>
        )}
      </div>

      {/* Chapters Content */}
      {activeTab === "chapters" && (
        <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1 scrollbar-thin">
          {book.chapters.map((ch, idx) => {
            const isCurrent = ch.id === currentChapterId;
            return (
              <div
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className={cn(
                  "flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer group",
                  isCurrent
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-medium"
                    : "bg-stone-950/50 border-stone-800/80 text-stone-300 hover:bg-stone-800/60 hover:border-stone-700"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-transform group-hover:scale-105",
                      isCurrent
                        ? "bg-amber-400 text-stone-950"
                        : "bg-stone-800 text-stone-400 group-hover:bg-amber-400 group-hover:text-stone-950"
                    )}
                  >
                    {isCurrent && isPlaying ? (
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-stone-950 animate-pulse" />
                        <span className="w-1 h-4 bg-stone-950 animate-pulse" />
                        <span className="w-1 h-2 bg-stone-950 animate-pulse" />
                      </div>
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate text-stone-100">{ch.title}</p>
                    {ch.urduTitle && (
                      <p className="text-xs text-stone-400 font-urdu truncate">{ch.urduTitle}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-xs text-stone-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatTime(ch.durationSeconds)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bookmarks Content */}
      {activeTab === "bookmarks" && (
        <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1">
          {(!book.bookmarks || book.bookmarks.length === 0) ? (
            <div className="text-center py-12 text-stone-500 text-sm">
              <BookmarkIcon className="h-8 w-8 mx-auto mb-2 opacity-40 text-amber-400" />
              <p>No bookmarks saved yet.</p>
              <p className="text-xs text-stone-600 mt-1">Click "Add Here" to pin memorable quotes.</p>
            </div>
          ) : (
            book.bookmarks.map((bm) => {
              const ch = book.chapters.find((c) => c.id === bm.chapterId);
              return (
                <div
                  key={bm.id}
                  className="p-3 rounded-xl border border-stone-800 bg-stone-950/60 space-y-1.5 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-400">
                      {ch?.title || "Chapter"} • {formatTime(bm.positionSeconds)}
                    </span>
                    <button
                      onClick={() => deleteBookmark(book.id, bm.id)}
                      className="text-stone-500 hover:text-rose-400 p-1 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {bm.quoteSnippet && (
                    <p className="text-xs italic text-stone-300 border-l-2 border-amber-500/50 pl-2">
                      "{bm.quoteSnippet}"
                    </p>
                  )}
                  {bm.note && <p className="text-xs text-stone-400">{bm.note}</p>}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
