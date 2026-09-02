"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  Languages,
  Mic,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  ArrowRight,
  User,
  Sparkles,
} from "lucide-react";
import { AudioEngine } from "@/lib/audio-engine";
import { Footer } from "@/components/layout/footer";
import { useBooks } from "@/context/book-context";

interface TrendingBook {
  id: string;
  title: string;
  urduTitle?: string;
  author: string;
  category: string;
  coverImage: string;
  chapterTitle: string;
  sampleAudioText: string;
  lang: "ur" | "en";
}

const TRENDING_BOOKS: TrendingBook[] = [
  {
    id: "diwan-e-ghalib",
    title: "Diwan-e-Ghalib",
    urduTitle: "دیوانِ غالب",
    author: "Mirza Ghalib",
    category: "POETRY",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    chapterTitle: "Ghazal 4: Aah Ko Chahiye",
    sampleAudioText:
      "آہ کو چاہیے اک عمر اثر ہونے تک، کون جیتا ہے تری زلف کے سر ہونے تک۔ ہم نے مانا کہ تغافل نہ کرو گے لیکن، خاک ہو جائیں گے ہم تم کو خبر ہونے تک۔",
    lang: "ur",
  },
  {
    id: "reluctant-fundamentalist",
    title: "The Reluctant Fundamentalist",
    urduTitle: "دی ریلکٹنٹ فنڈامینٹلسٹ",
    author: "Mohsin Hamid",
    category: "FICTION",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    chapterTitle: "Chapter 1: The Encounter in Lahore",
    sampleAudioText:
      "Excuse me, sir, but may I be of assistance? Ah, I see I have alarmed you. Do not be frightened by my beard: I am a lover of America.",
    lang: "en",
  },
  {
    id: "aag-ka-darya",
    title: "Aag Ka Darya",
    urduTitle: "آگ کا دریا",
    author: "Qurratulain Hyder",
    category: "NOVEL",
    coverImage:
      "https://images.unsplash.com/photo-1532012164546-f432f2e3edd3?q=80&w=800&auto=format&fit=crop",
    chapterTitle: "Chapter 1: The Vedic Dawn",
    sampleAudioText:
      "وقت کا دریا بہہ رہا تھا۔ ڈھائی ہزار سال پہلے جب پاٹلی پتر کے کھنڈرات میں چمپا وتی گھوم رہی تھی، تو تاریخ نے ایک نیا موڑ لیا۔",
    lang: "ur",
  },
  {
    id: "reconstruction-religious-thought",
    title: "Reconstruction of Religious Thought",
    urduTitle: "تشکیلِ جدید الٰہیاتِ اسلامیہ",
    author: "Allama Iqbal",
    category: "PHILOSOPHY",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    chapterTitle: "Lecture 1: Knowledge & Religious Experience",
    sampleAudioText:
      "The search for rational foundations in Islam may be regarded to have begun with the Prophet himself. The teaching of the Quran that ultimate reality is spiritual.",
    lang: "en",
  },
];

export default function HomePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active playing book state
  const [currentPlayingBook, setCurrentPlayingBook] = useState<TrendingBook>(TRENDING_BOOKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    AudioEngine.init();
    return () => {
      AudioEngine.stop();
    };
  }, []);

  // Live Demo Audio State
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoLang, setDemoLang] = useState<"ur" | "en">("ur");

  const sampleUrduText =
    "رات کا سناٹا گہرا ہوتا جا رہا تھا۔ فجر کی اذان کی دلنشین آواز ہوا کے دوش پر تیرتی ہوئی سیدھی دل میں اتر گئی۔";
  const sampleEnglishText =
    "The old library held centuries of forgotten wisdom, waiting for someone to listen to its quiet secrets.";

  const toggleDemoAudio = () => {
    if (isPlayingDemo) {
      AudioEngine.stop();
      setIsPlayingDemo(false);
    } else {
      setIsPlayingDemo(true);
      const text = demoLang === "ur" ? sampleUrduText : sampleEnglishText;
      AudioEngine.speak(text, {
        lang: demoLang === "ur" ? "ur-PK" : "en-US",
        onEnd: () => setIsPlayingDemo(false),
        onError: () => setIsPlayingDemo(false),
      });
    }
  };

  const togglePlayBook = (book: TrendingBook) => {
    if (currentPlayingBook.id === book.id && isPlaying) {
      AudioEngine.stop();
      setIsPlaying(false);
    } else {
      AudioEngine.stop();
      setCurrentPlayingBook(book);
      setIsPlaying(true);
      AudioEngine.speak(book.sampleAudioText, {
        lang: book.lang === "ur" ? "ur-PK" : "en-US",
        rate: 1.0,
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  const handleWidgetPlayPause = () => {
    if (isPlaying) {
      AudioEngine.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      AudioEngine.speak(currentPlayingBook.sampleAudioText, {
        lang: currentPlayingBook.lang === "ur" ? "ur-PK" : "en-US",
        rate: 1.0,
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  const { setPendingUploadFile } = useBooks();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setPendingUploadFile(file);
      router.push("/upload");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPendingUploadFile(file);
      router.push("/upload");
    }
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen selection:bg-[#f2ca50]/30 selection:text-[#f2ca50] flex flex-col justify-between relative font-sans">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl shadow-[0_1px_40px_rgba(0,0,16,0.3)] border-b border-[#353534]/40">
        <div className="h-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-4 group">
            <img
              src="/logo.png"
              alt="Sada-e-Kutub Logo"
              className="h-10 w-auto object-contain rounded-xl shadow-[0_0_15px_rgba(242,202,80,0.2)] group-hover:scale-105 transition-transform"
            />
            <span className="font-garamond text-2xl sm:text-3xl font-semibold text-[#e5e2e1] tracking-tight">
              Sada-e-Kutub
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-[#f2ca50] font-bold transition-colors duration-300">
              Home
            </Link>
            <Link
              href="/library"
              className="text-[#d0c5af] hover:text-[#e5e2e1] transition-colors duration-300"
            >
              My Library
            </Link>
            <Link
              href="/upload"
              className="text-[#d0c5af] hover:text-[#e5e2e1] transition-colors duration-300"
            >
              Upload
            </Link>
            <Link
              href="/settings"
              className="text-[#d0c5af] hover:text-[#e5e2e1] transition-colors duration-300"
            >
              Settings
            </Link>
          </nav>

          {/* Right Profile Action */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="w-9 h-9 rounded-full bg-[#f2ca50] flex items-center justify-center shadow-[0_0_15px_rgba(242,202,80,0.25)] hover:scale-105 transition-transform"
            >
              <User className="w-4 h-4 text-[#3c2f00]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-28 pb-36 bg-gradient-to-b from-[#131313] via-[#1c1b1b] to-[#131313] flex-1">
        <div className="flex flex-col w-full relative">
          
          {/* Decorative Ambient Glow */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#f2ca50]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

          {/* Hero Section */}
          <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-10 pb-16 flex flex-col items-center justify-center text-center">
            
            {/* Headlines */}
            <div className="mb-10 max-w-3xl flex flex-col items-center">
              <h1 className="font-urdu text-4xl sm:text-6xl text-[#e5e2e1] mb-6 leading-tight">
                کتابیں اب خاموش نہیں رہیں گی
              </h1>
              <p className="text-lg sm:text-xl text-[#d0c5af] max-w-2xl font-normal leading-relaxed">
                Turn any PDF or Image into an Immersive Audiobook. Experience literature through emotion-driven AI narration.
              </p>
            </div>

            {/* Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full max-w-3xl group cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="absolute inset-0 bg-[#f2ca50]/5 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
              
              <div
                className={`relative bg-[#201f1f]/70 backdrop-blur-xl p-10 sm:p-14 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 ${
                  isDragOver
                    ? "border-[#f2ca50] bg-[#f2ca50]/10 scale-[1.01]"
                    : "border-[#4d4635]/40 group-hover:border-[#f2ca50]/60"
                }`}
              >
                <div className="w-20 h-20 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(242,202,80,0.1)] group-hover:shadow-[0_0_40px_rgba(242,202,80,0.25)]">
                  <UploadCloud className="w-9 h-9 text-[#f2ca50]" />
                </div>
                <h3 className="font-garamond text-2xl sm:text-3xl text-[#e5e2e1] font-semibold mb-2">
                  Drop your book here
                </h3>
                <p className="text-[#d0c5af] text-sm font-medium">
                  Supports PDF, EPUB, JPG, PNG (Max 50MB)
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-8 px-8 py-3.5 bg-gradient-to-b from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold tracking-wider uppercase rounded-full shadow-[0_4px_20px_rgba(242,202,80,0.3)] hover:shadow-[0_6px_25px_rgba(242,202,80,0.45)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  BROWSE FILES
                </button>
              </div>
            </div>
          </section>

          {/* Live Interactive Voice Demo */}
          <section className="w-full max-w-5xl mx-auto px-6 sm:px-12 pb-16">
            <div className="rounded-3xl border border-[#353534]/70 bg-[#1c1b1b]/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#353534]/50 pb-4">
                <div className="space-y-1">
                  <h3 className="font-garamond text-xl sm:text-2xl font-bold text-[#e5e2e1] pt-1">
                    Experience Natural AI Pronunciation & Emotion
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 bg-[#131313] p-1 rounded-xl border border-[#353534]">
                  <button
                    type="button"
                    onClick={() => {
                      setDemoLang("ur");
                      AudioEngine.stop();
                      setIsPlayingDemo(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      demoLang === "ur"
                        ? "bg-[#f2ca50] text-[#3c2f00] shadow-md"
                        : "text-[#d0c5af] hover:text-[#e5e2e1]"
                    }`}
                  >
                    Urdu (اردو داستان)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDemoLang("en");
                      AudioEngine.stop();
                      setIsPlayingDemo(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      demoLang === "en"
                        ? "bg-[#f2ca50] text-[#3c2f00] shadow-md"
                        : "text-[#d0c5af] hover:text-[#e5e2e1]"
                    }`}
                  >
                    English Storytelling
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#131313]/80 border border-[#353534]/50 space-y-6">
                <p
                  className={`text-xl sm:text-2xl text-[#e5e2e1] ${
                    demoLang === "ur"
                      ? "font-urdu text-right leading-[3.2rem]"
                      : "font-garamond leading-relaxed"
                  }`}
                >
                  {demoLang === "ur" ? sampleUrduText : sampleEnglishText}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#353534]/50">
                  <button
                    type="button"
                    onClick={toggleDemoAudio}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-bold text-xs sm:text-sm rounded-xl shadow-[0_4px_20px_rgba(242,202,80,0.35)] hover:shadow-[0_6px_25px_rgba(242,202,80,0.5)] transition-all cursor-pointer"
                  >
                    {isPlayingDemo ? (
                      <Pause className="w-4 h-4 fill-[#3c2f00]" />
                    ) : (
                      <Play className="w-4 h-4 fill-[#3c2f00] ml-0.5" />
                    )}
                    <span>{isPlayingDemo ? "Pause Voice" : "Listen AI Narration"}</span>
                  </button>

                  <Link
                    href="/dashboard"
                    className="text-xs sm:text-sm text-[#f2ca50] hover:text-[#ffe088] font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open Full Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Feature 1: Dual Language Mastery */}
              <div className="bg-[#201f1f] border border-[#353534]/60 rounded-3xl p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-8 text-[180px] text-[#393939] opacity-20 group-hover:opacity-30 transition-opacity font-urdu select-none pointer-events-none">
                  ع
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                  <div>
                    <div className="w-12 h-12 bg-[#f2ca50]/10 border border-[#f2ca50]/20 rounded-full flex items-center justify-center mb-6 text-[#f2ca50]">
                      <Languages className="w-6 h-6" />
                    </div>
                    <h3 className="font-garamond text-2xl font-semibold text-[#e5e2e1] mb-3">
                      Dual Language Mastery
                    </h3>
                    <p className="text-[#d0c5af] text-sm leading-relaxed">
                      Seamlessly transition between elegant Urdu prose and crisp English text. Our models understand context, idiom, and phonetic nuance in both languages.
                    </p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <span className="px-4 py-1.5 rounded-full bg-[#353534] text-xs font-semibold text-[#d0c5af] border border-[#4d4635]/40 font-urdu">
                      Urdu Nastaliq
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-[#353534] text-xs font-semibold text-[#d0c5af] border border-[#4d4635]/40">
                      English
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature 2: AI Emotional Voice */}
              <div className="bg-[#201f1f] border border-[#353534]/60 rounded-3xl p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f2ca50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                  <div>
                    <div className="w-12 h-12 bg-[#f2ca50]/10 border border-[#f2ca50]/20 rounded-full flex items-center justify-center mb-6 text-[#f2ca50]">
                      <Mic className="w-6 h-6" />
                    </div>
                    <h3 className="font-garamond text-2xl font-semibold text-[#e5e2e1] mb-3">
                      AI Emotional Voice
                    </h3>
                    <p className="text-[#d0c5af] text-sm leading-relaxed">
                      Not just reading, but performing. The AI analyzes sentiment to adjust cadence, tone, and pause length—perfect for poetry, biographies, and dramatic fiction.
                    </p>
                  </div>

                  {/* Animated Waveform Mock */}
                  <div className="h-8 flex items-center gap-1.5 opacity-80 pt-2">
                    <div className="w-1 bg-[#f2ca50] rounded-full animate-soundwave" style={{ height: "40%", animationDuration: "1s" }} />
                    <div className="w-1 bg-[#f2ca50] rounded-full animate-soundwave" style={{ height: "80%", animationDuration: "1.2s" }} />
                    <div className="w-1 bg-[#f2ca50] rounded-full animate-soundwave" style={{ height: "30%", animationDuration: "0.8s" }} />
                    <div className="w-1 bg-[#f2ca50] rounded-full animate-soundwave" style={{ height: "100%", animationDuration: "1.4s" }} />
                    <div className="w-1 bg-[#f2ca50] rounded-full animate-soundwave" style={{ height: "60%", animationDuration: "1.1s" }} />
                    <div className="w-1 bg-[#f2ca50] rounded-full animate-soundwave" style={{ height: "40%", animationDuration: "0.9s" }} />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Trending Masterpieces Section */}
          <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-garamond text-3xl sm:text-4xl font-semibold text-[#e5e2e1]">
                  Trending Masterpieces
                </h2>
                <p className="text-sm text-[#d0c5af] mt-1.5">
                  Discover what others are listening to
                </p>
              </div>
              <Link
                href="/library"
                className="text-xs font-bold tracking-wider text-[#f2ca50] hover:text-[#ffe088] transition-colors flex items-center gap-1.5 uppercase"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TRENDING_BOOKS.map((book) => {
                const isThisPlaying = currentPlayingBook.id === book.id && isPlaying;
                return (
                  <div
                    key={book.id}
                    onClick={() => togglePlayBook(book)}
                    className="group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-[#353534]/50">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-[#131313]/50 transition-opacity flex items-center justify-center backdrop-blur-sm ${isThisPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                          <button
                            type="button"
                            className="w-14 h-14 bg-[#f2ca50] text-[#3c2f00] rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-out"
                          >
                            {isThisPlaying ? (
                              <Pause className="w-7 h-7 fill-[#3c2f00]" />
                            ) : (
                              <Play className="w-7 h-7 fill-[#3c2f00] ml-0.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 pr-2">
                          <h4 className="text-sm font-medium text-[#e5e2e1] truncate group-hover:text-[#f2ca50] transition-colors">
                            {book.title}
                          </h4>
                          {book.urduTitle && (
                            <p className="text-xs font-urdu text-[#d0c5af] truncate">
                              {book.urduTitle}
                            </p>
                          )}
                          <p className="text-xs text-[#d0c5af]/80 truncate mt-0.5">
                            {book.author}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#2a2a2a] text-[10px] font-bold text-[#d0c5af] shrink-0 border border-[#4d4635]/30">
                          {book.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      {/* Now Playing Floating Widget */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl bg-[#353534]/90 backdrop-blur-2xl rounded-full p-2.5 pl-4 pr-6 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-[#4d4635]/40 z-50">
        
        {/* Book Thumbnail & Chapter */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#201f1f] shrink-0 shadow-inner border border-[#f2ca50]/30">
            <img
              src={currentPlayingBook.coverImage}
              alt={currentPlayingBook.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <h5 className="text-sm font-medium text-[#e5e2e1] truncate">
              {currentPlayingBook.chapterTitle}
            </h5>
            <p className="text-xs text-[#d0c5af] truncate">
              {currentPlayingBook.title} • {currentPlayingBook.author}
            </p>
          </div>
        </div>

        {/* Player Controls & Mini Waveform */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 ml-4">
          
          {/* Mini Waveform */}
          <div className="hidden sm:flex items-center gap-1 h-6 opacity-70">
            <div
              className={`w-0.5 bg-[#f2ca50] rounded-full ${isPlaying ? "animate-soundwave" : "h-2"}`}
              style={{ animationDuration: "1s" }}
            />
            <div
              className={`w-0.5 bg-[#f2ca50] rounded-full ${isPlaying ? "animate-soundwave" : "h-4"}`}
              style={{ animationDuration: "1.2s" }}
            />
            <div
              className={`w-0.5 bg-[#f2ca50] rounded-full ${isPlaying ? "animate-soundwave" : "h-5"}`}
              style={{ animationDuration: "0.8s" }}
            />
            <div
              className={`w-0.5 bg-[#f2ca50] rounded-full ${isPlaying ? "animate-soundwave" : "h-3"}`}
              style={{ animationDuration: "1.5s" }}
            />
            <div
              className={`w-0.5 bg-[#f2ca50] rounded-full ${isPlaying ? "animate-soundwave" : "h-4"}`}
              style={{ animationDuration: "0.9s" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWidgetPlayPause}
              className="w-8 h-8 flex items-center justify-center text-[#d0c5af] hover:text-[#e5e2e1] transition-colors cursor-pointer"
              title="Replay 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleWidgetPlayPause}
              className="w-11 h-11 rounded-full bg-gradient-to-b from-[#f2ca50] to-[#d4af37] text-[#3c2f00] flex items-center justify-center shadow-[0_0_15px_rgba(242,202,80,0.3)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-[#3c2f00]" />
              ) : (
                <Play className="w-5 h-5 fill-[#3c2f00] ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleWidgetPlayPause}
              className="w-8 h-8 flex items-center justify-center text-[#d0c5af] hover:text-[#e5e2e1] transition-colors cursor-pointer"
              title="Forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Shared Luxury Footer */}
      <Footer />

    </div>
  );
}
