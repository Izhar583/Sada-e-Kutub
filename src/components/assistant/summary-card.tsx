"use client";

import React from "react";
import { Book } from "@/types/book";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Key, Quote, BookOpen } from "lucide-react";
import { UrduTextContainer } from "@/components/reader/urdu-text-container";

interface SummaryCardProps {
  book: Book;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ book }) => {
  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="border-amber-500/30 bg-gradient-to-br from-stone-900/90 to-stone-950">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <CardTitle className="text-amber-300">Executive Book Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
            {book.shortSummary}
          </p>
          {book.urduSummary && (
            <UrduTextContainer fontSize="base" className="border-t border-stone-800/80 pt-3">
              {book.urduSummary}
            </UrduTextContainer>
          )}
        </CardContent>
      </Card>

      {/* Key Themes & Characters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Characters */}
        {book.characters && book.characters.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-sm">Key Characters</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {book.characters.map((char) => (
                <div key={char.name} className="p-3 rounded-xl bg-stone-950/60 border border-stone-800">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-stone-200">{char.name}</span>
                    <Badge variant="secondary" className="text-[10px]">{char.role}</Badge>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">{char.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Themes */}
        {book.keyThemes && book.keyThemes.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-sm">Major Themes & Concepts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {book.keyThemes.map((theme) => (
                  <Badge key={theme} variant="gold" className="px-3 py-1 text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notable Quotes */}
      {book.chapters.some((c) => c.quotes && c.quotes.length > 0) && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Quote className="h-4 w-4 text-amber-400" />
              <CardTitle className="text-sm">Memorable Quotes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {book.chapters.flatMap((c) => c.quotes || []).map((quote, idx) => (
              <blockquote
                key={idx}
                className="p-3.5 rounded-xl bg-stone-950/60 border-l-4 border-amber-400 text-stone-200 italic text-sm"
              >
                "{quote}"
              </blockquote>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
