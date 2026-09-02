"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AudioEngine } from "@/lib/audio-engine";

interface LibraryBookItem {
  id: string;
  title: string;
  urduTitle?: string;
  author: string;
  coverImage: string;
  lang: "ur" | "en";
  category: "urdu" | "english" | "poetry" | "recent";
  progressPercent: number;
  durationLeft: string;
  isStarted: boolean;
  sampleAudio: string;
}

const LIBRARY_BOOKS: LibraryBookItem[] = [
  {
    id: "dewan-e-ghalib",
    title: "Diwan-e-Ghalib",
    urduTitle: "دیوانِ غالب",
    author: "Mirza Ghalib",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoYPbli7HZg_stS_kHG_kxLwGBdy22Kpm8llek9LgiKrgU8IWVjhFKy0bIh8K3VIHFYwQ_PzVVkFIlyBh8GDAvDJHTZ67vrtdrohIrQM7pP2jbanuNcb8tR2uIQXuLk6UZdKs7KSeW01sCazBCHhNXSYMKycvTly8ftf8wqsRUzdS4od-S4GmF5FA4PQf7O0oFEkq-gnPPRurQJ_LSpmUCucH4snpyL8YoKn4NbQL4UmcLQANuIxyy",
    lang: "ur",
    category: "poetry",
    progressPercent: 45,
    durationLeft: "2h 15m left",
    isStarted: true,
    sampleAudio:
      "آہ کو چاہیے اک عمر اثر ہونے تک، کون جیتا ہے تری زلف کے سر ہونے تک۔ ہم نے مانا کہ تغافل نہ کرو گے لیکن، خاک ہو جائیں گے ہم تم کو خبر ہونے تک۔",
  },
  {
    id: "art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANGlODhxuxqxb9kJovPiVdwtlji91YfHz3yz3O8buKvTfCBGhr9R95NVpO3qYsdnFdLqJMSA-CCauEV8gXafXM8WADRQDTH8UeTOgvMRXYEF1UTto1s6hclJzIc4RA3uiiFWKVMvMwBcEdSsR9EUygJnaSOtMdB9x24Pkj3Hfy9YXNKSwUAJX_ijgVMnats8WKp-7XHmPzqBsx6lk7sPjT9_rKyGkjF220_V05tuLul869R5VVA-ly",
    lang: "en",
    category: "english",
    progressPercent: 12,
    durationLeft: "4h 30m left",
    isStarted: true,
    sampleAudio:
      "The art of war is of vital importance to the State. It is a matter of life and death, a road either to safety or to ruin.",
  },
  {
    id: "udaas-naslain",
    title: "Udaas Naslain",
    urduTitle: "اداس نسلیں",
    author: "Abdullah Hussein",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8WF9yHW93EiQVoMACn5NlWvNKGrcsasV87dQjBZ57OC3EcMmMvUNPuKh6rxQC7YJt5vdqPb7o4TgEzTHiV4O0jOm0v07zk1KDrPEyb_hV5cq6ccNTwpPPonJG7HolMSg8vd4xSaWe1_p5XM8lFiIsX52CNmyki37-CQAJ4740_mqHBxm9kXU-KvN6o6oz-sVn48Hotw6JSFdG5WuZJOi1HrXrEybh1H32FfuK0i03Hy0krcEBmjef",
    lang: "ur",
    category: "urdu",
    progressPercent: 0,
    durationLeft: "14h 20m",
    isStarted: false,
    sampleAudio:
      "اداس نسلیں برصغیر کے تاریخی پس منظر میں لکھی گئی وہ داستان ہے جو انسان کے باطن اور زمانے کے دکھ کو بیان کرتی ہے۔",
  },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"all" | "urdu" | "english" | "poetry" | "recent">("all");
  const [playingBookId, setPlayingBookId] = useState<string | null>(null);

  const filteredBooks = LIBRARY_BOOKS.filter((b) => {
    if (activeTab === "all") return true;
    if (activeTab === "urdu") return b.lang === "ur";
    if (activeTab === "english") return b.lang === "en";
    if (activeTab === "poetry") return b.category === "poetry";
    if (activeTab === "recent") return b.isStarted;
    return true;
  });

  const handlePlayBook = (book: LibraryBookItem) => {
    if (playingBookId === book.id) {
      AudioEngine.stop();
      setPlayingBookId(null);
    } else {
      AudioEngine.stop();
      setPlayingBookId(book.id);
      AudioEngine.speak(book.sampleAudio, {
        lang: book.lang === "ur" ? "ur-PK" : "en-US",
        onEnd: () => setPlayingBookId(null),
        onError: () => setPlayingBookId(null),
      });
    }
  };

  return (
    <main className="w-full bg-gradient-to-b from-[#131313] via-[#1c1b1b] to-[#131313] min-h-screen text-[#e5e2e1] selection:bg-[#f2ca50]/30 font-sans pb-32">
      <div className="flex flex-col w-full h-full relative">
        <div className="w-full px-6 sm:px-12 lg:px-16 py-12 flex flex-col gap-10">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2a2a2a] pb-8 relative">
            <div className="flex flex-col gap-2">
              <h1 className="font-garamond text-4xl md:text-5xl font-bold text-[#e5e2e1] tracking-tight">
                My Library
              </h1>
              <p className="font-garamond text-[#d0c5af] text-xl opacity-80" dir="rtl">
                آپ کی اپنی ڈیجیٹل لائبریری
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs uppercase tracking-widest text-[#99907c] px-4 py-2 bg-[#1c1b1b] rounded-full border border-[#353534]/60 font-semibold">
                {LIBRARY_BOOKS.length} Volumes
              </div>

              <Link href="/upload">
                <button className="bg-[#f2ca50]/10 hover:bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/30 text-sm font-semibold px-6 py-2.5 rounded-full transition-all flex items-center gap-2 group cursor-pointer">
                  <i className="fa-solid fa-plus text-xs group-hover:rotate-90 transition-transform"></i>
                  <span>New Volume</span>
                </button>
              </Link>
            </div>

            <div className="absolute -bottom-px left-0 w-32 h-[1px] bg-gradient-to-r from-[#f2ca50] to-transparent" />
          </header>

          {/* Filter Tabs */}
          <nav className="flex flex-wrap items-center gap-3">
            {[
              { id: "all", label: "All Collection" },
              { id: "urdu", label: "Urdu Literature" },
              { id: "english", label: "English Classics" },
              { id: "poetry", label: "Poetry" },
              { id: "recent", label: "Recently Read" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_15px_rgba(242,202,80,0.25)] font-bold"
                      : "bg-[#201f1f] hover:bg-[#2a2a2a] text-[#d0c5af] hover:text-[#e5e2e1] ring-1 ring-inset ring-[#4d4635]/30"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
            {filteredBooks.map((book) => {
              const isThisPlaying = playingBookId === book.id;
              return (
                <article
                  key={book.id}
                  className="group relative flex flex-col bg-[#1c1b1b] border border-[#353534]/60 rounded-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-2 shadow-xl"
                >
                  {/* Aspect Ratio 3/4 Cover Area */}
                  <div className="aspect-[3/4] w-full relative overflow-hidden bg-[#201f1f]">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url('${book.coverImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-85" />

                    {/* Language Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#131313]/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider text-[#e5e2e1] uppercase ring-1 ring-white/10">
                        {book.lang === "ur" ? "Urdu" : "English"}
                      </span>
                    </div>

                    {/* Hover Action Buttons */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      <Link
                        href={`/book/${book.id}/read`}
                        className="w-10 h-10 rounded-full bg-[#353534]/90 text-[#e5e2e1] hover:text-[#f2ca50] flex items-center justify-center shadow-lg transition-colors ring-1 ring-white/10 backdrop-blur-md cursor-pointer"
                        title="Read Text"
                      >
                        <i className="fa-solid fa-book-open text-sm"></i>
                      </Link>

                      <button
                        onClick={() => handlePlayBook(book)}
                        className="w-10 h-10 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                        title="Play Audiobook"
                      >
                        <i className={`fa-solid ${isThisPlaying ? "fa-pause" : "fa-play ml-0.5"} text-sm`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Book Metadata */}
                  <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
                    <div className="flex flex-col gap-1">
                      {book.urduTitle ? (
                        <h3 className="font-urdu text-[#e5e2e1] text-xl line-clamp-1" dir="rtl">
                          {book.urduTitle}
                        </h3>
                      ) : (
                        <h3 className="font-garamond text-[#e5e2e1] text-xl font-bold line-clamp-1">
                          {book.title}
                        </h3>
                      )}
                      <p className="text-[#d0c5af] text-sm line-clamp-1">
                        {book.author}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-[#353534]/40">
                      <div className="flex justify-between items-center text-xs text-[#99907c]">
                        <span>{book.progressPercent > 0 ? `${book.progressPercent}% Completed` : "Not started"}</span>
                        <span>{book.durationLeft}</span>
                      </div>
                      <div className="h-1 w-full bg-[#353534] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#f2ca50] rounded-full shadow-[0_0_8px_rgba(242,202,80,0.5)] transition-all duration-300"
                          style={{ width: `${book.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Add New Volume Card */}
            <Link
              href="/upload"
              className="aspect-[3/4] w-full rounded-2xl border border-dashed border-[#4d4635]/50 flex flex-col items-center justify-center gap-4 hover:border-[#f2ca50]/60 hover:bg-[#f2ca50]/5 transition-all cursor-pointer group bg-[#1c1b1b]/40"
            >
              <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#f2ca50]/20 transition-all duration-300 shadow-md">
                <i className="fa-solid fa-plus text-[#99907c] group-hover:text-[#f2ca50] text-2xl transition-colors"></i>
              </div>
              <div className="text-center">
                <p className="font-garamond text-lg font-bold text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors">
                  Add New Volume
                </p>
                <p className="text-xs text-[#99907c] mt-1">
                  Upload PDF or EPUB
                </p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
