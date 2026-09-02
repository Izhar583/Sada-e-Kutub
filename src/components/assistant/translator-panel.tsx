"use client";

import React, { useState } from "react";
import { Languages, Volume2, ArrowRightLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioEngine } from "@/lib/audio-engine";

export const TranslatorPanel: React.FC = () => {
  const [sourceText, setSourceText] = useState(
    "The old man walked slowly toward the village, carrying a bundle of old books."
  );
  const [direction, setDirection] = useState<"en-to-ur" | "ur-to-en">("en-to-ur");
  const [translatedText, setTranslatedText] = useState(
    "بوڑھا آدمی پرانی کتابوں کا ایک گٹھا اٹھائے آہستہ آہستہ گاؤں کی طرف بڑھ رہا تھا۔"
  );
  const [isCopied, setIsCopied] = useState(false);

  const handleTranslate = () => {
    // Interactive mock translation handler for instant responsiveness
    if (direction === "en-to-ur") {
      setTranslatedText("بوڑھا آدمی پرانی کتابوں کا ایک گٹھا اٹھائے آہستہ آہستہ گاؤں کی طرف بڑھ رہا تھا۔");
    } else {
      setTranslatedText("The elderly person was steadily moving towards the village holding the sacred manuscript.");
    }
  };

  const handleSwapDirection = () => {
    setDirection(direction === "en-to-ur" ? "ur-to-en" : "en-to-ur");
    const temp = sourceText;
    setSourceText(translatedText);
    setTranslatedText(temp);
  };

  const handleSpeakTranslation = () => {
    const isUrdu = direction === "en-to-ur";
    AudioEngine.speak(translatedText, {
      lang: isUrdu ? "ur-PK" : "en-US",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-900/60 backdrop-blur-xl p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-stone-100">
            Book Translator & Live Voice Pronunciation
          </h3>
        </div>

        <button
          onClick={handleSwapDirection}
          className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700 cursor-pointer transition-colors"
        >
          <ArrowRightLeft className="h-3.5 w-3.5" />
          <span>{direction === "en-to-ur" ? "English → اردو" : "اردو → English"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
            {direction === "en-to-ur" ? "English Source Text" : "اردو عبارت"}
          </label>
          <textarea
            rows={5}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className={`w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500/50 resize-none ${
              direction === "ur-to-en" ? "font-urdu text-right text-base leading-relaxed" : ""
            }`}
          />
        </div>

        {/* Target Box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            {direction === "en-to-ur" ? "اردو ترجمہ (Urdu Translation)" : "English Translation"}
          </label>
          <div
            className={`w-full h-[134px] p-3.5 rounded-xl bg-stone-950/80 border border-amber-500/30 text-amber-200 text-sm overflow-y-auto ${
              direction === "en-to-ur" ? "font-urdu text-right text-base leading-loose" : ""
            }`}
          >
            {translatedText}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="primary" size="sm" onClick={handleTranslate}>
          Translate Sentence
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSpeakTranslation}
            className="gap-1.5"
          >
            <Volume2 className="h-4 w-4 text-amber-400" />
            <span>Listen Pronunciation</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-1.5"
          >
            {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{isCopied ? "Copied" : "Copy"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
