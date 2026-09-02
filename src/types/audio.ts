import { LanguageType, NarrationStyle } from "./book";

export interface VoiceOption {
  id: string;
  name: string;
  gender: "male" | "female";
  language: LanguageType;
  accent: string;
  previewAudioUrl?: string;
  sampleText: string;
  personality: "deep" | "calm" | "energetic" | "warm" | "clear" | "expressive";
}

export type PlaybackSpeed = 0.75 | 1.0 | 1.25 | 1.5 | 1.75 | 2.0;

export type SleepTimerOption = "off" | 10 | 20 | 30 | 45 | 60 | "end_of_chapter";

export interface AudioPlaybackState {
  currentBookId: string | null;
  currentChapterId: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  speed: PlaybackSpeed;
  sleepTimer: SleepTimerOption;
  sleepTimerSecondsRemaining: number | null;
  activeSentenceIndex: number;
}
