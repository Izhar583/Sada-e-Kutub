"use client";

import React, { useState, useEffect } from "react";
import { AudioEngine } from "@/lib/audio-engine";

interface NarratorVoice {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  sampleQuote: string;
  isUrdu: boolean;
  tier: string;
}

const NARRATORS: NarratorVoice[] = [
  {
    id: "bilal",
    name: "Bilal",
    subtitle: "Engaging • Urdu",
    badge: "Standard AI",
    sampleQuote: "کتابیں وہ خاموش دوست ہیں جو ہمیشہ سچ بولتے ہیں۔",
    isUrdu: true,
    tier: "Standard AI",
  },
  {
    id: "ayesha",
    name: "Ayesha",
    subtitle: "Academic • Urdu",
    badge: "High-Fidelity AI",
    sampleQuote: "علم ایک ایسا سمندر ہے جس کا کوئی کنارہ نہیں۔",
    isUrdu: true,
    tier: "High-Fidelity AI",
  },
  {
    id: "arthur",
    name: "Arthur",
    subtitle: "Master Storyteller • English",
    badge: "Premium ElevenLabs",
    sampleQuote: "It was the best of times, it was the worst of times...",
    isUrdu: false,
    tier: "Premium ElevenLabs",
  },
  {
    id: "elena",
    name: "Elena",
    subtitle: "Warm & Cinematic • English",
    badge: "Narrator",
    sampleQuote: "Every journey begins with a single question waiting to be answered.",
    isUrdu: false,
    tier: "Narrator",
  },
  {
    id: "marcus",
    name: "Marcus",
    subtitle: "Clear & Academic • English",
    badge: "Professor",
    sampleQuote: "In this chapter, we will analyze the key principles of modern economics.",
    isUrdu: false,
    tier: "Professor",
  },
  {
    id: "sophia",
    name: "Sophia",
    subtitle: "Calm & Reflective • English",
    badge: "Neutral Global",
    sampleQuote: "Take a deep breath and let the tranquility of the words surround you.",
    isUrdu: false,
    tier: "Neutral Global",
  },
];

export default function SettingsPage() {
  const [selectedNarratorId, setSelectedNarratorId] = useState<string>("ayesha");
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  
  // API Keys state
  const [geminiKey, setGeminiKey] = useState("");
  const [showGeminiKey, setShowGeminiKey] = useState(false);

  const [openaiKey, setOpenaiKey] = useState("sk-xxxxxxxxxxxxxxxxxxxxxxxx");
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  
  const [elevenlabsKey, setElevenlabsKey] = useState("");
  const [showElevenlabsKey, setShowElevenlabsKey] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGemini = localStorage.getItem("sada_gemini_api_key");
      if (savedGemini) setGeminiKey(savedGemini);

      const savedOpenAI = localStorage.getItem("openai_api_key");
      if (savedOpenAI) setOpenaiKey(savedOpenAI);

      const savedEleven = localStorage.getItem("elevenlabs_api_key");
      if (savedEleven) setElevenlabsKey(savedEleven);
    }
  }, []);

  const handlePlayVoice = (e: React.MouseEvent, narrator: NarratorVoice) => {
    e.stopPropagation();
    if (playingVoiceId === narrator.id) {
      AudioEngine.stop();
      setPlayingVoiceId(null);
    } else {
      AudioEngine.stop();
      setPlayingVoiceId(narrator.id);
      AudioEngine.speak(narrator.sampleQuote, {
        lang: narrator.isUrdu ? "ur-PK" : "en-US",
        onEnd: () => setPlayingVoiceId(null),
        onError: () => setPlayingVoiceId(null),
      });
    }
  };

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sada_gemini_api_key", geminiKey);
      localStorage.setItem("openai_api_key", openaiKey);
      localStorage.setItem("elevenlabs_api_key", elevenlabsKey);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <main className="flex-1 w-full pt-8 lg:pt-16 bg-[#131313] text-[#e5e2e1] selection:bg-[#f2ca50]/30 font-sans pb-32">
      <div className="flex flex-col w-full h-full pb-16 relative">
        
        {/* Background Decor Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f2ca50]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-[#dae3f7]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-16">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative">
            <div className="space-y-4 relative z-10">
              <h1 className="font-garamond text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e5e2e1]">
                Settings &amp; Preferences
              </h1>
              <p className="font-urdu text-[#d0c5af] text-xl flex items-center gap-3" dir="rtl">
                <span className="text-[#f2ca50] text-xl">✦</span>
                اپنی ترجیحات کو اپنی پسند کے مطابق بنائیں
              </p>
            </div>

            <button
              onClick={handleSave}
              className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_0_20px_rgba(242,202,80,0.2)] hover:shadow-[0_0_30px_rgba(242,202,80,0.4)] flex items-center gap-2 group relative overflow-hidden z-10 cursor-pointer"
            >
              <span className="relative z-10">
                {isSaved ? "Saved Successfully!" : "Save Preferences"}
              </span>
              <i className="fa-solid fa-arrow-right text-xs relative z-10 group-hover:translate-x-1 transition-transform"></i>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Content Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Preferred Narrators Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#d0c5af] uppercase tracking-[0.1em] font-semibold">
                    Preferred Narrator
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {NARRATORS.map((narrator) => {
                    const isSelected = selectedNarratorId === narrator.id;
                    const isPlayingThis = playingVoiceId === narrator.id;

                    return (
                      <div
                        key={narrator.id}
                        onClick={() => setSelectedNarratorId(narrator.id)}
                        className={`p-6 rounded-2xl relative group overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border ${
                          isSelected
                            ? "bg-gradient-to-b from-[#f2ca50]/10 to-[#1c1b1b] border-[#f2ca50]/40 shadow-[0_0_25px_rgba(242,202,80,0.15)]"
                            : "bg-[#1c1b1b] border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f2ca50]/5 rounded-full blur-[40px] group-hover:bg-[#f2ca50]/10 transition-colors pointer-events-none" />

                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className={`font-garamond text-2xl font-bold mb-1 transition-colors ${
                              isSelected ? "text-[#f2ca50]" : "text-[#e5e2e1] group-hover:text-[#f2ca50]"
                            }`}>
                              {narrator.name}
                            </h3>
                            <p className="text-xs uppercase tracking-wider text-[#d0c5af] font-medium">
                              {narrator.subtitle}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handlePlayVoice(e, narrator)}
                            className={`w-10 h-10 rounded-full bg-[#201f1f] flex items-center justify-center border transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#f2ca50]/40 text-[#f2ca50]"
                                : "border-white/10 text-[#d0c5af] group-hover:border-[#f2ca50]/30 group-hover:text-[#f2ca50]"
                            }`}
                          >
                            <i className={`fa-solid ${isPlayingThis ? "fa-pause" : "fa-play ml-0.5"} text-sm`}></i>
                          </button>
                        </div>

                        <div className="bg-[#131313] p-4 rounded-xl border border-white/5 mb-6">
                          <p
                            className={`text-base text-[#e5e2e1]/90 leading-relaxed ${
                              narrator.isUrdu
                                ? "font-urdu text-right text-[18px]"
                                : "font-garamond italic"
                            }`}
                            dir={narrator.isUrdu ? "rtl" : "ltr"}
                          >
                            &ldquo;{narrator.sampleQuote}&rdquo;
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#d0c5af] group-hover:text-[#e5e2e1] transition-colors">
                            {narrator.badge}
                          </span>
                          
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-[#f2ca50]"
                              : "bg-[#2a2a2a] border border-white/20 group-hover:border-[#f2ca50]"
                          }`}>
                            {isSelected ? (
                              <div className="w-2 h-2 rounded-full bg-[#1c1b1b]" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#f2ca50] transition-colors" />
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </section>

              {/* API Keys Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#d0c5af] uppercase tracking-[0.1em] font-semibold">
                    Advanced Configurations &amp; AI Engines
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="bg-[#1c1b1b] border border-white/5 p-8 rounded-2xl relative shadow-lg">
                  <div className="space-y-6">
                    
                    {/* Gemini Multimodal Key (Free Google Lens Vision Engine) */}
                    <div className="space-y-2.5 p-4 rounded-xl bg-[#201f1f] border border-[#f2ca50]/30 shadow-inner">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-[#f2ca50] uppercase tracking-wider font-bold flex items-center gap-1.5">
                          <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
                          <span>Google Gemini Vision API Key (100% Accurate Google Lens OCR)</span>
                        </label>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          100% Free
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type={showGeminiKey ? "text" : "password"}
                          value={geminiKey}
                          placeholder="Paste your Free Gemini API Key (from aistudio.google.com)"
                          onChange={(e) => setGeminiKey(e.target.value)}
                          className="w-full bg-[#131313] border border-[#f2ca50]/40 rounded-xl px-4 py-3 text-sm text-[#e5e2e1] placeholder:text-[#d0c5af]/50 focus:outline-none focus:border-[#f2ca50] transition-colors pr-12 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowGeminiKey(!showGeminiKey)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                        >
                          <i className={`fa-solid ${showGeminiKey ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                        </button>
                      </div>
                      <p className="text-xs text-[#d0c5af] leading-relaxed">
                        Enables 100% flawless Urdu Nastaliq handwriting and poetry recognition directly from photos, identical to Google Lens! Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#f2ca50] underline font-semibold">aistudio.google.com</a>.
                      </p>
                    </div>

                    {/* OpenAI Key */}
                    <div className="space-y-2.5">
                      <label className="text-xs text-[#e5e2e1] uppercase tracking-wider font-semibold">
                        OpenAI API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showOpenaiKey ? "text" : "password"}
                          value={openaiKey}
                          onChange={(e) => setOpenaiKey(e.target.value)}
                          className="w-full bg-[#131313] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#e5e2e1] placeholder:text-[#d0c5af]/50 focus:outline-none focus:border-[#f2ca50]/50 transition-colors pr-12 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                        >
                          <i className={`fa-solid ${showOpenaiKey ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                        </button>
                      </div>
                      <p className="text-xs text-[#d0c5af]">
                        Used for high-speed Urdu translation and Ask My Book conversational reasoning.
                      </p>
                    </div>

                    {/* ElevenLabs Key */}
                    <div className="space-y-2.5">
                      <label className="text-xs text-[#e5e2e1] uppercase tracking-wider font-semibold">
                        ElevenLabs API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showElevenlabsKey ? "text" : "password"}
                          value={elevenlabsKey}
                          placeholder="Enter your ElevenLabs API Key"
                          onChange={(e) => setElevenlabsKey(e.target.value)}
                          className="w-full bg-[#131313] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#e5e2e1] placeholder:text-[#d0c5af]/40 focus:outline-none focus:border-[#f2ca50]/50 transition-colors pr-12 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowElevenlabsKey(!showElevenlabsKey)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                        >
                          <i className={`fa-solid ${showElevenlabsKey ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                        </button>
                      </div>
                      <p className="text-xs text-[#d0c5af]">
                        Required for Ultra-Realistic High-Fidelity studio voices and emotion morphing.
                      </p>
                    </div>

                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar Column (Pro Plan) (4 Cols) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-8 lg:top-24 space-y-8">
                
                {/* Pro Subscription Card */}
                <div className="bg-[#201f1f] border border-white/5 p-8 rounded-[24px] relative overflow-hidden shadow-2xl">
                  {/* Gold Gradient Aura */}
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#f2ca50]/20 blur-[60px] rounded-full pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#f2ca50] to-[#d4af37]" />

                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f2ca50]/15 flex items-center justify-center border border-[#f2ca50]/30 text-[#f2ca50]">
                        <i className="fa-solid fa-crown text-base"></i>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#d0c5af] uppercase tracking-widest block mb-0.5 font-bold">
                          Current Plan
                        </span>
                        <h2 className="font-garamond text-2xl font-bold text-[#e5e2e1]">
                          Pro Subscription
                        </h2>
                      </div>
                    </div>

                    <div className="bg-[#1c1b1b] rounded-xl p-5 border border-white/5 space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-[#d0c5af] uppercase tracking-wider font-semibold">
                          Audio Generation
                        </span>
                        <span className="text-xs text-[#f2ca50] font-bold">
                          <strong className="text-[#e5e2e1] text-sm">840</strong> / 1000 mins
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-[#131313] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] rounded-full shadow-[0_0_8px_rgba(242,202,80,0.5)]"
                          style={{ width: "84%" }}
                        />
                      </div>
                      
                      <p className="text-[11px] text-[#99907c]">
                        Resets in 12 days
                      </p>
                    </div>

                    <button className="w-full bg-[#131313] border border-white/10 hover:border-[#f2ca50]/50 hover:bg-white/5 text-[#e5e2e1] hover:text-[#f2ca50] py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer shadow-sm">
                      Manage Billing
                    </button>
                  </div>
                </div>

                {/* Inspirational Quote Artwork Card */}
                <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] group border border-white/5 shadow-2xl">
                  <img
                    alt="Reference Image"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-luminosity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUjUTSEmc4dsu8IOtRJVPwM_6rvjwpV0ZfwNTrXn5LFHvEHJhbyGIic1r0upbbrbYbxiaetOqNQoEGedgHZDdXk7gTc5Xc6brfuhmH6soQXJFlncid6Lm_G_vtZqXp1Y8ITsvyVI-JDAi0us81_0RBJ4Oj3ANUH03LaHbXYKuoT2avcC9TbIAIDwgMjLOsG4CjEq1p3XWiJHiV5qeD7KOdoUJjocPwtYpz_O5rYsNpyredumUJvuQaDBU5jtMJ3ZnyNg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <p className="font-garamond text-xl text-[#e5e2e1] italic opacity-90 leading-snug">
                      &ldquo;The only limit to our realization of tomorrow will be our doubts of today.&rdquo;
                    </p>
                    <span className="text-xs text-[#f2ca50] uppercase tracking-widest font-bold block">
                      — Franklin D. Roosevelt
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
