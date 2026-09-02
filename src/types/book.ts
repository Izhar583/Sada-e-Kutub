export type LanguageType = "en" | "ur" | "mixed";

export type BookGenre =
  | "novel"
  | "short_story"
  | "biography"
  | "autobiography"
  | "poetry"
  | "history"
  | "educational"
  | "business"
  | "self_help"
  | "children"
  | "religious";

export type NarrationStyle =
  | "storytelling"
  | "cinematic"
  | "calm"
  | "emotional"
  | "professional"
  | "educational"
  | "poetic"
  | "children";

export interface Chapter {
  id: string;
  bookId: string;
  order: number;
  title: string;
  urduTitle?: string;
  content: string;
  urduContent?: string;
  durationSeconds: number;
  audioUrl?: string;
  summary?: string;
  urduSummary?: string;
  keyConcepts?: string[];
  quotes?: string[];
}

export interface CharacterInfo {
  name: string;
  role: string;
  description: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  chapterId: string;
  positionSeconds: number;
  note?: string;
  quoteSnippet?: string;
  createdAt: string;
}

export interface Book {
  id: string;
  userId?: string;
  title: string;
  urduTitle?: string;
  author: string;
  urduAuthor?: string;
  coverUrl: string;
  language: LanguageType;
  bookType: BookGenre;
  recommendedStyle: NarrationStyle;
  selectedVoiceId: string;
  selectedStyle: NarrationStyle;
  progressPercent: number;
  currentChapterId: string;
  currentPositionSeconds: number;
  totalPages: number;
  totalDurationSeconds: number;
  shortSummary: string;
  detailedSummary: string;
  urduSummary?: string;
  characters?: CharacterInfo[];
  keyThemes?: string[];
  chapters: Chapter[];
  bookmarks: Bookmark[];
  status: "ready" | "processing" | "failed";
  createdAt: string;
}
