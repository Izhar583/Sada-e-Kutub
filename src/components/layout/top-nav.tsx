"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export const TopNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-xl shadow-[0_1px_40px_rgba(0,0,16,0.3)] border-b border-[#353534]/40 select-none">
      <div className="h-20 w-full px-6 sm:px-12 flex items-center justify-between">
        
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
          <Link
            href="/"
            className={`transition-colors duration-300 ${
              pathname === "/"
                ? "text-[#f2ca50] font-bold"
                : "text-[#d0c5af] hover:text-[#e5e2e1]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/library"
            className={`transition-colors duration-300 ${
              pathname === "/library"
                ? "text-[#f2ca50] font-bold"
                : "text-[#d0c5af] hover:text-[#e5e2e1]"
            }`}
          >
            My Library
          </Link>
          <Link
            href="/upload"
            className={`transition-colors duration-300 ${
              pathname === "/upload"
                ? "text-[#f2ca50] font-bold"
                : "text-[#d0c5af] hover:text-[#e5e2e1]"
            }`}
          >
            Upload
          </Link>
          <Link
            href="/settings"
            className={`transition-colors duration-300 ${
              pathname === "/settings"
                ? "text-[#f2ca50] font-bold"
                : "text-[#d0c5af] hover:text-[#e5e2e1]"
            }`}
          >
            Settings
          </Link>
        </nav>

        {/* Right Profile Action */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="w-9 h-9 rounded-full bg-[#f2ca50] flex items-center justify-center shadow-[0_0_15px_rgba(242,202,80,0.25)] hover:scale-105 transition-transform cursor-pointer"
          >
            <User className="w-4 h-4 text-[#3c2f00]" />
          </Link>
        </div>

      </div>
    </header>
  );
};
