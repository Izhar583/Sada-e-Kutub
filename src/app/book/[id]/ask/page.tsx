"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Sparkles,
  BotMessageSquare,
  FileText,
  Languages,
  GraduationCap,
  BookOpen,
  Headphones,
} from "lucide-react";
import { useBooks } from "@/context/book-context";
import { BookChat } from "@/components/assistant/book-chat";
import { SummaryCard } from "@/components/assistant/summary-card";
import { TranslatorPanel } from "@/components/assistant/translator-panel";
import { QuizFlashcards } from "@/components/assistant/quiz-flashcards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BookAskPage() {
  const params = useParams();
  const bookId = params.id as string;
  const { books, setActiveBookId } = useBooks();
  const [activeTab, setActiveTab] = useState<"chat" | "summary" | "translate" | "study">("chat");

  const targetBook = books.find((b) => b.id === bookId) || books[0];

  useEffect(() => {
    if (targetBook) {
      setActiveBookId(targetBook.id);
    }
  }, [bookId]);

  if (!targetBook) return null;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-28 pt-4 px-4 sm:px-8">
      {/* Top Bar Navigation */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 border-b border-stone-800/80 mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-stone-400 hover:text-stone-100 text-sm flex items-center gap-1.5 transition-colors"
          >
            ← Library
          </Link>
          <span className="text-stone-700">|</span>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-stone-100 truncate max-w-xs">
              {targetBook.title}
            </h1>
            <Badge variant="gold">Ask My Book AI</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/book/${targetBook.id}/listen`}>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Headphones className="h-4 w-4" />
              <span>Listen</span>
            </Button>
          </Link>
          <Link href={`/book/${targetBook.id}/read`}>
            <Button variant="secondary" size="sm" className="gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>Read</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center gap-2">
        {[
          { id: "chat", label: "Ask Book (Q&A)", icon: BotMessageSquare },
          { id: "summary", label: "Executive Summary & Characters", icon: FileText },
          { id: "translate", label: "Urdu ↔ English Translator", icon: Languages },
          { id: "study", label: "Student Mode (Quiz & Flashcards)", icon: GraduationCap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-amber-400 text-stone-950 shadow-md shadow-amber-400/20"
                  : "bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Stage */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "chat" && <BookChat book={targetBook} />}
        {activeTab === "summary" && <SummaryCard book={targetBook} />}
        {activeTab === "translate" && <TranslatorPanel />}
        {activeTab === "study" && <QuizFlashcards bookTitle={targetBook.title} />}
      </div>
    </div>
  );
}
