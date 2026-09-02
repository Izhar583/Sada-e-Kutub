"use client";

import React, { useState } from "react";
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuizProps {
  bookTitle: string;
}

export const QuizFlashcards: React.FC<QuizProps> = ({ bookTitle }) => {
  const [activeMode, setActiveMode] = useState<"quiz" | "flashcards">("quiz");
  
  // Sample MCQs
  const questions = [
    {
      id: "q1",
      question: "What is the core driving force behind Salar Sikandar's transformation in Peer-e-Kamil?",
      options: [
        "A search for material wealth and academic awards",
        "An internal existential void and quest for moral redemption",
        "Pressure from his father Dr. Sikandar",
        "A desire to settle abroad in Europe"
      ],
      correctIndex: 1,
      explanation: "Salar possesses an extraordinary IQ but struggles with emptiness until spiritual truth transforms him.",
    },
    {
      id: "q2",
      question: "What is the primary message of Dave Brailsford's 'marginal gains' principle?",
      options: [
        "Focus only on one single huge breakthrough",
        "Improve everything you do by just 1% for compounding growth",
        "Never change an established tradition",
        "Rely solely on advanced technology"
      ],
      correctIndex: 1,
      explanation: "A 1% daily micro-improvement in multiple areas creates exponential long-term compound results.",
    },
  ];

  const flashcards = [
    { term: "Aggregation of Marginal Gains", definition: "The philosophy of searching for a tiny margin of improvement in everything you do." },
    { term: "Personal Legend", definition: "Paulo Coelho's concept of what you have always wanted to accomplish in life." },
    { term: "Ruhani Rehnumai (Spiritual Mentorship)", definition: "Guidance of a true mentor leading the soul from darkness to clarity." },
  ];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Flashcard flip state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === questions[currentQIndex].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((q) => q + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
  };

  const q = questions[currentQIndex];

  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-900/60 backdrop-blur-xl p-6 space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-stone-100">Student AI Study Mode</h3>
        </div>

        <div className="flex items-center gap-2 bg-stone-950 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setActiveMode("quiz")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMode === "quiz" ? "bg-amber-400 text-stone-950" : "text-stone-400 hover:text-stone-200"
            }`}
          >
            Interactive Quiz
          </button>
          <button
            onClick={() => setActiveMode("flashcards")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMode === "flashcards" ? "bg-amber-400 text-stone-950" : "text-stone-400 hover:text-stone-200"
            }`}
          >
            Flashcards
          </button>
        </div>
      </div>

      {activeMode === "quiz" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Question {currentQIndex + 1} of {questions.length}</span>
            <span className="text-amber-400 font-semibold">Score: {score}</span>
          </div>

          <p className="text-base font-semibold text-stone-100">{q.question}</p>

          <div className="space-y-2.5">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = isSubmitted && idx === q.correctIndex;
              const isWrong = isSubmitted && isSelected && idx !== q.correctIndex;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all cursor-pointer flex items-center justify-between ${
                    isCorrect
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-medium"
                      : isWrong
                      ? "bg-rose-500/20 border-rose-500 text-rose-300 font-medium"
                      : isSelected
                      ? "bg-amber-500/15 border-amber-500/60 text-amber-300"
                      : "bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700"
                  }`}
                >
                  <span>{opt}</span>
                  {isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 ml-2" />}
                  {isWrong && <XCircle className="h-5 w-5 text-rose-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300">
              <span className="font-bold text-amber-400">Explanation: </span>
              {q.explanation}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {!isSubmitted ? (
              <Button
                variant="primary"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
              >
                Submit Answer
              </Button>
            ) : currentQIndex < questions.length - 1 ? (
              <Button variant="primary" onClick={handleNextQuestion}>
                Next Question →
              </Button>
            ) : (
              <Button variant="outline" onClick={handleRestartQuiz} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                <span>Restart Quiz</span>
              </Button>
            )}
          </div>
        </div>
      )}

      {activeMode === "flashcards" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Card {activeCardIndex + 1} of {flashcards.length}</span>
            <span>Click card to reveal definition</span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[180px] p-8 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-tr from-stone-900 to-stone-950 flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-400 transition-all shadow-xl"
          >
            <Badge variant="gold" className="mb-3">
              {isFlipped ? "Definition" : "Key Term"}
            </Badge>
            <p className="text-lg font-bold text-stone-100">
              {isFlipped ? flashcards[activeCardIndex].definition : flashcards[activeCardIndex].term}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={activeCardIndex === 0}
              onClick={() => {
                setIsFlipped(false);
                setActiveCardIndex((i) => Math.max(0, i - 1));
              }}
            >
              ← Previous Card
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={activeCardIndex === flashcards.length - 1}
              onClick={() => {
                setIsFlipped(false);
                setActiveCardIndex((i) => Math.min(flashcards.length - 1, i + 1));
              }}
            >
              Next Card →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
