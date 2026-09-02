"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Volume2, Bot, User, HelpCircle } from "lucide-react";
import { Book } from "@/types/book";
import { ChatMessage } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { VoiceAssistantButton } from "./voice-assistant-button";
import { AudioEngine } from "@/lib/audio-engine";

interface BookChatProps {
  book: Book;
}

export const BookChat: React.FC<BookChatProps> = ({ book }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      role: "assistant",
      content: `Hello! I am your AI assistant for "${book.title}". You can ask me anything about the chapters, characters, themes, or ask me to explain concepts in Urdu or English.`,
      urduContent: `السلام علیکم! میں "${book.urduTitle || book.title}" کے لیے آپ کا AI اسسٹنٹ ہوں۔ آپ مجھ سے ابواب، کرداروں اور خلاصے کے بارے میں اردو یا انگریزی میں پوچھ سکتے ہیں۔`,
      timestamp: "Just now",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const quickPrompts = [
    "What is the main message of this book?",
    "Explain Chapter 1 in simple Urdu.",
    "Who is the main character and their struggle?",
    "Give me 3 key actionable takeaways.",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsGenerating(true);

    // Simulate AI response generation
    setTimeout(() => {
      let aiResponse = "";
      let aiUrdu = "";

      const lower = query.toLowerCase();
      if (lower.includes("urdu") || lower.includes("خلاصہ") || lower.includes("وضاحت")) {
        aiResponse = `Here is the explanation for "${book.title}": The core philosophy emphasizes perseverance, self-awareness, and spiritual clarity.`;
        aiUrdu = `اس کتاب کا بنیادی فلسفہ یہ ہے کہ انسان کا اصل امتحان اس کا اندرونی سفر اور سچائی کی تلاش ہے۔ جب انسان صدقِ دل سے اپنی منزل کی طرف بڑھتا ہے تو کائنات کی تمام قوتیں اس کی مددگار بن جاتی ہیں۔`;
      } else if (lower.includes("character") || lower.includes("protagonist")) {
        aiResponse = `The primary characters are ${book.characters?.map((c) => `${c.name} (${c.role})`).join(", ") || "the narrator and guides"}. Their journeys illustrate transformation and inner courage.`;
      } else if (lower.includes("chapter 1")) {
        aiResponse = `In Chapter 1, "${book.chapters[0]?.title}", the author establishes the foundational context and sets up the central journey of the narrative.`;
        aiUrdu = `پہلے باب میں مرکزی کردار کے اندرونی خلا اور اس کے نئے سفر کی شروعات کو تفصیلاً بیان کیا گیا ہے۔`;
      } else {
        aiResponse = `Based on the text of "${book.title}", the author explores the interplay between destiny and disciplined action. In Chapter 1, key decisions create a lasting ripple effect across subsequent events.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        urduContent: aiUrdu || undefined,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 900);
  };

  const handleSpeak = (text: string, isUrdu = false) => {
    AudioEngine.speak(text, {
      lang: isUrdu ? "ur-PK" : "en-US",
    });
  };

  return (
    <div className="flex flex-col h-[650px] rounded-3xl border border-stone-800 bg-stone-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-1.5">
              <span>Ask My Book — AI Assistant</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono px-2 py-0.5 rounded-full">
                Bilingual AI
              </span>
            </h3>
            <p className="text-xs text-stone-400">Discuss chapters, request Urdu explanations, or test your understanding</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                  isUser
                    ? "bg-amber-400 text-stone-950 font-bold"
                    : "bg-stone-800 text-amber-400 border border-stone-700"
                }`}
              >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`max-w-xl rounded-2xl p-4 text-sm space-y-2 ${
                  isUser
                    ? "bg-amber-500/20 border border-amber-500/40 text-stone-100"
                    : "bg-stone-950/80 border border-stone-800 text-stone-200"
                }`}
              >
                <p className="leading-relaxed">{m.content}</p>

                {m.urduContent && (
                  <div className="pt-2 border-t border-stone-800 font-urdu text-right text-base leading-loose text-amber-200">
                    {m.urduContent}
                  </div>
                )}

                {!isUser && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleSpeak(m.content, false)}
                      className="text-[11px] text-stone-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>Listen English</span>
                    </button>
                    {m.urduContent && (
                      <button
                        onClick={() => handleSpeak(m.urduContent!, true)}
                        className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-urdu"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>سنئے (اردو)</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isGenerating && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-stone-400 text-xs flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span>Thinking & analyzing book context...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-stone-800/60 bg-stone-950/40 overflow-x-auto flex items-center gap-2 scrollbar-none">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            className="text-xs whitespace-nowrap bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-4 border-t border-stone-800 bg-stone-950/90 flex items-center gap-2">
        <VoiceAssistantButton
          onTranscript={(text) => {
            setInputQuery(text);
          }}
        />

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask anything or speak in Urdu / English..."
          className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
        />

        <Button
          variant="primary"
          size="md"
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isGenerating}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
