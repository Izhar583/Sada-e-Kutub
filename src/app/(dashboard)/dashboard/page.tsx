"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBooks } from "@/context/book-context";
import { AudioEngine } from "@/lib/audio-engine";

export default function DashboardPage() {
  const { books } = useBooks();
  const [isPlayingPeer, setIsPlayingPeer] = useState(false);

  const handlePlayPeerEKamil = () => {
    if (isPlayingPeer) {
      AudioEngine.stop();
      setIsPlayingPeer(false);
    } else {
      setIsPlayingPeer(true);
      AudioEngine.speak(
        "پیر کامل ﷺ۔ زندگی کے دو راستے تھے، ایک آسان اور دنیاوی، دوسرا کٹھن مگر ابدی سکون کا۔ امامہ اور سالار کی کہانی یہیں سے شروع ہوئی۔",
        {
          lang: "ur-PK",
          onEnd: () => setIsPlayingPeer(false),
          onError: () => setIsPlayingPeer(false),
        }
      );
    }
  };

  const handlePlayTheAlchemist = () => {
    AudioEngine.speak(
      "The boy's name was Santiago. Dusk was falling as the boy arrived with his herd at an abandoned church.",
      { lang: "en-US" }
    );
  };

  const handlePlayAtomicHabits = () => {
    AudioEngine.speak(
      "Changes that seem small and unimportant at first will compound into remarkable results if you are willing to stick with them for years.",
      { lang: "en-US" }
    );
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#131313] p-6 lg:p-10 pb-32">
      {/* Greeting Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-[#e6e1e5]">
              Good Evening
            </h1>

          </div>
          <p className="text-xl font-urdu text-[#cac4d0] mt-2" dir="rtl">
            خوش آمدید، اپنی کتابیں سننا جاری رکھیں
          </p>
        </div>

        <Link
          href="/upload"
          className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-[#382900] rounded font-semibold hover:bg-[#f5d675] transition-colors shadow-lg shadow-[#d4af37]/20"
        >
          <i className="fa-solid fa-cloud-arrow-up"></i>
          Upload Book / Photo
        </Link>
      </header>

      {/* Featured / Continue Listening Card */}
      <section className="mb-16">
        <div className="bg-[#1c1b1b] border border-[#363535] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Book Cover Side */}
          <div className="w-full lg:w-1/3 relative bg-[#212020] p-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent"></div>
            <div className="relative group">
              <img
                alt="Peer-e-Kamil Book Cover"
                className="w-48 md:w-64 rounded shadow-2xl border border-[#363535] transition-transform duration-500 group-hover:scale-105 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3nhaHBXUVrJcI7PaJ9pkA79yoLCsUA3wrqXQdXtgix38gaDpvCT2Y42ynEudayoq4sKD7Ti_uMeT5Rm1NZFzreSgSdpX4GDj80qJ0HZ0eaqSOj1z-A_Z6YGYqeNHVx9UKDJmt6Yi9QMpUw3y-85w_1zqKeksy2x_5tb_Zwy2JhTgvMzvD8Xc6CMwO6O6dWlbmZiD-YZgiRke8RUV3oyYXQ3Yh-W3YdPdTQg876NEYrVMwdowieNmE"
              />
              <button
                onClick={handlePlayPeerEKamil}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#d4af37] text-[#382900] rounded-full flex items-center justify-center text-2xl shadow-xl shadow-[#d4af37]/30 hover:scale-110 transition-transform cursor-pointer"
              >
                <i className={`fa-solid ${isPlayingPeer ? "fa-pause" : "fa-play ml-1"}`}></i>
              </button>
            </div>
          </div>

          {/* Details Side */}
          <div className="w-full lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold border-b border-[#d4af37] pb-1">
                Continue Listening
              </span>
              <span className="text-xs uppercase tracking-widest text-[#cac4d0] border-b border-transparent pb-1">
                Urdu Novel
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#e6e1e5] mb-2 leading-tight">
              Peer-e-Kamil <br />
              <span className="text-2xl md:text-3xl font-normal text-[#cac4d0]">
                (The Perfect Mentor)
              </span>
            </h2>

            <p className="text-3xl text-[#d4af37] font-urdu mt-2 mb-6" dir="rtl">
              پیر کامل ﷺ
            </p>

            <p className="text-lg text-[#cac4d0] mb-8">
              <span className="font-medium text-[#e6e1e5]">Author:</span> Umera Ahmed
            </p>

            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#e6e1e5]">Chapter 1: The Crossroads of Fate</span>
                <span className="text-[#d4af37] font-medium">33% Completed</span>
              </div>
              <div className="h-1.5 w-full bg-[#363535] rounded-full overflow-hidden">
                <div className="h-full bg-[#d4af37] w-1/3 rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handlePlayPeerEKamil}
                className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-[#382900] rounded font-medium hover:bg-[#f5d675] transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-headphones"></i> Resume Audiobook
              </button>

              <Link
                href="/book/peer-e-kamil/read"
                className="flex items-center gap-2 px-6 py-3 border border-[#49454f] text-[#e6e1e5] rounded font-medium hover:bg-[#2b2a2a] hover:border-[#d4af37]/50 transition-colors"
              >
                <i className="fa-solid fa-book-open"></i> Read Text
              </Link>

              <Link
                href="/book/peer-e-kamil/ask"
                className="flex items-center gap-2 px-6 py-3 border border-[#d4af37]/30 text-[#d4af37] bg-[#d4af37]/5 rounded font-medium hover:bg-[#d4af37]/10 transition-colors"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i> Ask AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My Book Collection Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-fire text-[#d4af37] text-xl"></i>
            <h3 className="text-2xl font-bold text-[#e6e1e5]">My Book Collection</h3>
            <span className="text-xl font-urdu text-[#cac4d0] ml-2" dir="rtl">
              آپکی کتب
            </span>
          </div>

          <Link
            className="text-[#d4af37] hover:text-[#f5d675] font-medium text-sm flex items-center gap-1 transition-colors"
            href="/library"
          >
            View All (3) <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Book Card 1 */}
          <div className="bg-[#1c1b1b] border border-[#363535] rounded-xl p-5 hover:border-[#d4af37]/40 transition-colors group flex flex-col">
            <div className="flex gap-5 mb-5">
              <div className="w-1/3 shrink-0">
                <img
                  alt="Book Cover"
                  className="w-full rounded shadow-md border border-[#363535] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXANuscH2ABLNTwqt-bNOAHLMhFIaQbY0kmUaVFz1re8IawSl5pnu16HRV2t5IZyyBN0smtQpwNhGu2afDt9v1_k8oZTJo9pdt0jUb5d72I0-Cwt_6tyT3H9V_oOoPR3j0flvwyAd-WuyXE_OQ5JKUNoxUgWZ6fHqaSAf6F_lqJ8HFHrOPSnwVc0DfPepXBz3LsPOsoW2lRpyTwARR067dZ96moJlvkVaxMow8QchSZTsseFUgrSVq"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-center">
                <span className="self-start px-2 py-0.5 rounded border border-[#d4af37]/30 text-[#d4af37] font-urdu text-sm mb-2">
                  اردو ادب
                </span>
                <h4 className="font-bold text-lg text-[#e6e1e5] leading-tight mb-1 truncate">
                  Peer-e-Kamil
                </h4>
                <p className="text-[#cac4d0] text-sm mb-4">Umera Ahmed</p>
                <div className="mt-auto">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#cac4d0]">Progress</span>
                    <span className="text-[#e6e1e5]">33%</span>
                  </div>
                  <div className="h-1 w-full bg-[#363535] rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4af37] w-1/3 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button
                onClick={handlePlayPeerEKamil}
                className="py-2 bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 rounded font-medium hover:bg-[#d4af37] hover:text-[#382900] transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-headphones"></i> Listen
              </button>
              <Link
                href="/book/peer-e-kamil/read"
                className="py-2 bg-[#212020] text-[#e6e1e5] border border-[#49454f] rounded font-medium hover:bg-[#2b2a2a] transition-colors text-sm flex items-center justify-center gap-2 text-center"
              >
                <i className="fa-solid fa-book-open"></i> Read
              </Link>
            </div>
          </div>

          {/* Book Card 2 */}
          <div className="bg-[#1c1b1b] border border-[#363535] rounded-xl p-5 hover:border-[#d4af37]/40 transition-colors group flex flex-col">
            <div className="flex gap-5 mb-5">
              <div className="w-1/3 shrink-0">
                <img
                  alt="Book Cover"
                  className="w-full rounded shadow-md border border-[#363535] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCkpDGpZYZKCi9zXtKRL1kDBxzyTmCSke-F0M3-216Fqybq2_QHAnJHQvzm6synLIvNzYp6EKy58tV9W8R8mks70UwVA4y-qljzcQOtdCE6LNylzd0hN5x99BvirqqSpLdxluTD6NwLpikVtyGA9k1DpP5Fj9eL4FRD_UNLmWYKzk8YGLBAl3WNi0DVLIR0QmgLQFIvsYDYsVgBd2M8e6yyywdI36os6aPmFc7cuhm2eZTt26-62L-"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-center">
                <span className="self-start px-2 py-0.5 rounded border border-[#49454f] text-[#cac4d0] text-xs uppercase tracking-wider mb-2">
                  English
                </span>
                <h4 className="font-bold text-lg text-[#e6e1e5] leading-tight mb-1 truncate">
                  The Alchemist
                </h4>
                <p className="text-[#cac4d0] text-sm mb-4">Paulo Coelho</p>
                <div className="mt-auto">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#cac4d0]">Progress</span>
                    <span className="text-[#e6e1e5]">68%</span>
                  </div>
                  <div className="h-1 w-full bg-[#363535] rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4af37] w-[68%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button
                onClick={handlePlayTheAlchemist}
                className="py-2 bg-[#d4af37] text-[#382900] rounded font-medium hover:bg-[#f5d675] transition-colors text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
              >
                <i className="fa-solid fa-headphones"></i> Listen
              </button>
              <Link
                href="/book/the-alchemist/read"
                className="py-2 bg-[#212020] text-[#e6e1e5] border border-[#49454f] rounded font-medium hover:bg-[#2b2a2a] transition-colors text-sm flex items-center justify-center gap-2 text-center"
              >
                <i className="fa-solid fa-book-open"></i> Read
              </Link>
            </div>
          </div>

          {/* Book Card 3 */}
          <div className="bg-[#1c1b1b] border border-[#363535] rounded-xl p-5 hover:border-[#d4af37]/40 transition-colors group flex flex-col">
            <div className="flex gap-5 mb-5">
              <div className="w-1/3 shrink-0">
                <img
                  alt="Book Cover"
                  className="w-full rounded shadow-md border border-[#363535] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8O19pcdhQeTujCbUmLvRUwMYiAejbjaVmJAd7hqCREW9keNRWLf0xWtAtx6S9KdzwYoy9fnFtEZu7fA52MRMok5pdc4_Me3salqDKjeW7qVIL9NR3ciosUo8-7vapQtyc9wFD9vmCTZ_lCm42kIZ4vqYNNJPMWAUc6549wPYuwRI2HDDodaUqP-T21ZTYQ_KnlN0v6eKKm1kec1Higft-GIjPSvpUez0KcW7D2g1611WJHy1fQ-sz"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-center">
                <span className="self-start px-2 py-0.5 rounded border border-[#49454f] text-[#cac4d0] text-xs uppercase tracking-wider mb-2">
                  English
                </span>
                <h4 className="font-bold text-lg text-[#e6e1e5] leading-tight mb-1 truncate">
                  Atomic Habits
                </h4>
                <p className="text-[#cac4d0] text-sm mb-4">James Clear</p>
                <div className="mt-auto">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#cac4d0]">Progress</span>
                    <span className="text-[#e6e1e5]">20%</span>
                  </div>
                  <div className="h-1 w-full bg-[#363535] rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4af37] w-[20%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button
                onClick={handlePlayAtomicHabits}
                className="py-2 bg-[#d4af37] text-[#382900] rounded font-medium hover:bg-[#f5d675] transition-colors text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
              >
                <i className="fa-solid fa-headphones"></i> Listen
              </button>
              <Link
                href="/book/atomic-habits/read"
                className="py-2 bg-[#212020] text-[#e6e1e5] border border-[#49454f] rounded font-medium hover:bg-[#2b2a2a] transition-colors text-sm flex items-center justify-center gap-2 text-center"
              >
                <i className="fa-solid fa-book-open"></i> Read
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
