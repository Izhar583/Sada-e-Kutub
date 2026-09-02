"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { Book, Chapter } from "@/types/book";
import { PlaybackSpeed, SleepTimerOption } from "@/types/audio";
import { AudioEngine } from "@/lib/audio-engine";
import { useBooks } from "./book-context";

interface AudioContextType {
  currentBook: Book | null;
  currentChapter: Chapter | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  speed: PlaybackSpeed;
  sleepTimer: SleepTimerOption;
  sleepTimerRemaining: number | null;
  activeSentenceIndex: number;
  playBook: (book: Book, chapterId?: string) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seekTo: (timeInSeconds: number) => void;
  skipSeconds: (seconds: number) => void;
  nextChapter: () => void;
  previousChapter: () => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  setVolume: (vol: number) => void;
  setSleepTimer: (timer: SleepTimerOption) => void;
  isMiniPlayerOpen: boolean;
  setIsMiniPlayerOpen: (open: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { updateBookProgress } = useBooks();

  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1200);
  const [volume, setVolume] = useState<number>(1.0);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1.0);
  const [sleepTimer, setSleepTimerState] = useState<SleepTimerOption>("off");
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState<boolean>(true);

  const currentChapter = currentBook?.chapters.find((c) => c.id === currentChapterId) || currentBook?.chapters[0] || null;

  // Sync duration with active chapter
  useEffect(() => {
    if (currentChapter) {
      setDuration(currentChapter.durationSeconds || 1200);
    }
  }, [currentChapter]);

  // Handle Playback ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1 * speed;
          if (next >= duration) {
            handleChapterEnd();
            return duration;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, speed]);

  // Handle sleep timer countdown
  useEffect(() => {
    let sleepInterval: NodeJS.Timeout;
    if (isPlaying && sleepTimerRemaining !== null && sleepTimerRemaining > 0) {
      sleepInterval = setInterval(() => {
        setSleepTimerRemaining((prev) => {
          if (prev === null || prev <= 1) {
            AudioEngine.stop();
            setIsPlaying(false);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(sleepInterval);
  }, [isPlaying, sleepTimerRemaining]);

  // Save progress periodically
  useEffect(() => {
    if (currentBook && currentChapter && currentTime > 0) {
      updateBookProgress(currentBook.id, currentChapter.id, Math.floor(currentTime));
    }
  }, [Math.floor(currentTime / 5)]);

  const handleChapterEnd = useCallback(() => {
    if (sleepTimer === "end_of_chapter") {
      AudioEngine.stop();
      setIsPlaying(false);
      setSleepTimerState("off");
      setSleepTimerRemaining(null);
      return;
    }
    nextChapter();
  }, [sleepTimer]);

  const playBook = (book: Book, chapterId?: string) => {
    const targetChapterId = chapterId || book.currentChapterId || book.chapters[0]?.id;
    setCurrentBook(book);
    setCurrentChapterId(targetChapterId);
    
    const targetChapter = book.chapters.find((c) => c.id === targetChapterId) || book.chapters[0];
    if (targetChapter) {
      setDuration(targetChapter.durationSeconds || 1200);
    }

    const startPos = chapterId ? 0 : book.currentPositionSeconds || 0;
    setCurrentTime(startPos);
    setIsPlaying(true);

    // Trigger Web Speech synthesis
    if (targetChapter) {
      const isUrdu = book.language === "ur";
      const textToSpeak = isUrdu ? (targetChapter.urduContent || targetChapter.content) : targetChapter.content;
      AudioEngine.speak(textToSpeak, {
        lang: isUrdu ? "ur-PK" : "en-US",
        rate: speed,
        volume: volume,
        onBoundary: (charIdx: number) => {
          // Rough calculation for active sentence
          const charPercent = charIdx / Math.max(1, textToSpeak.length);
          setActiveSentenceIndex(Math.floor(charPercent * 10));
        },
        onEnd: () => {
          handleChapterEnd();
        },
      });
    }
  };

  const togglePlay = () => {
    if (!currentBook) return;
    if (isPlaying) {
      AudioEngine.pause();
      setIsPlaying(false);
    } else {
      if (typeof window !== "undefined" && window.speechSynthesis?.paused) {
        AudioEngine.resume();
      } else {
        if (currentChapter) {
          const isUrdu = currentBook.language === "ur";
          const textToSpeak = isUrdu ? (currentChapter.urduContent || currentChapter.content) : currentChapter.content;
          AudioEngine.speak(textToSpeak, {
            lang: isUrdu ? "ur-PK" : "en-US",
            rate: speed,
            volume: volume,
            onEnd: () => handleChapterEnd(),
          });
        }
      }
      setIsPlaying(true);
    }
  };

  const pause = () => {
    AudioEngine.pause();
    setIsPlaying(false);
  };

  const resume = () => {
    AudioEngine.resume();
    setIsPlaying(true);
  };

  const seekTo = (timeInSeconds: number) => {
    const clamped = Math.max(0, Math.min(duration, timeInSeconds));
    setCurrentTime(clamped);
  };

  const skipSeconds = (secs: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + secs)));
  };

  const nextChapter = () => {
    if (!currentBook) return;
    const currentIndex = currentBook.chapters.findIndex((c) => c.id === currentChapter?.id);
    if (currentIndex < currentBook.chapters.length - 1) {
      const nextCh = currentBook.chapters[currentIndex + 1];
      setCurrentChapterId(nextCh.id);
      setCurrentTime(0);
      setDuration(nextCh.durationSeconds || 1200);
      playBook(currentBook, nextCh.id);
    } else {
      setIsPlaying(false);
      AudioEngine.stop();
    }
  };

  const previousChapter = () => {
    if (!currentBook) return;
    const currentIndex = currentBook.chapters.findIndex((c) => c.id === currentChapter?.id);
    if (currentIndex > 0) {
      const prevCh = currentBook.chapters[currentIndex - 1];
      setCurrentChapterId(prevCh.id);
      setCurrentTime(0);
      setDuration(prevCh.durationSeconds || 1200);
      playBook(currentBook, prevCh.id);
    } else {
      setCurrentTime(0);
    }
  };

  const setSleepTimer = (timer: SleepTimerOption) => {
    setSleepTimerState(timer);
    if (timer === "off" || timer === "end_of_chapter") {
      setSleepTimerRemaining(null);
    } else {
      setSleepTimerRemaining(timer * 60);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentBook,
        currentChapter,
        isPlaying,
        currentTime,
        duration,
        volume,
        speed,
        sleepTimer,
        sleepTimerRemaining,
        activeSentenceIndex,
        playBook,
        togglePlay,
        pause,
        resume,
        seekTo,
        skipSeconds,
        nextChapter,
        previousChapter,
        setSpeed,
        setVolume,
        setSleepTimer,
        isMiniPlayerOpen,
        setIsMiniPlayerOpen,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within an AudioProvider");
  return context;
};
