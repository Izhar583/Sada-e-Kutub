export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  urduContent?: string;
  timestamp: string;
  sourceChapterId?: string;
  sourceTimestampSeconds?: number;
  audioUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  urduQuestion?: string;
  options: string[];
  urduOptions?: string[];
  correctAnswerIndex: number;
  explanation: string;
  urduExplanation?: string;
}

export interface Flashcard {
  id: string;
  term: string;
  urduTerm?: string;
  definition: string;
  urduDefinition?: string;
  example?: string;
}
