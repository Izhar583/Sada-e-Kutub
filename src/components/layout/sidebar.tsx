"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "DASHBOARD", href: "/dashboard", iconClass: "fa-solid fa-border-all" },
    { name: "MY LIBRARY", href: "/library", iconClass: "fa-solid fa-book" },
    { name: "UPLOAD & OCR", href: "/upload", iconClass: "fa-solid fa-cloud-arrow-up" },
    { name: "SETTINGS & VOICES", href: "/settings", iconClass: "fa-solid fa-gear" },
    { name: "ASK MY BOOK (AI)", href: "/book/peer-e-kamil/ask", iconClass: "fa-regular fa-comment-dots" },
  ];

  return (
    <aside className="w-64 bg-[#0e0e0e] border-r border-[#363535] flex flex-col justify-between overflow-y-auto hidden lg:flex fixed left-0 top-18 bottom-0 z-30 select-none">
      <div className="p-6">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#d4af37] mb-2 font-garamond">
            Smart Ingestion
          </h2>
          <p className="text-[#cac4d0] text-sm leading-relaxed">
            Digitize and narrate your literary collection.
          </p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href)) ||
              (item.href.includes("/ask") && pathname.includes("/ask"));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded text-sm transition-colors cursor-pointer",
                  isActive
                    ? "bg-[#212020] border border-[#d4af37]/30 text-[#d4af37] font-medium"
                    : "hover:bg-[#212020] text-[#cac4d0] hover:text-[#e6e1e5] group"
                )}
              >
                <i
                  className={cn(
                    item.iconClass,
                    "w-5 text-center transition-colors",
                    isActive ? "text-[#d4af37]" : "group-hover:text-[#d4af37]"
                  )}
                />
                <span className="font-semibold tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-[#363535]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2b2a2a] border border-[#49454f] flex items-center justify-center text-xs text-[#cac4d0]">
            N
          </div>
          <span className="text-xs text-[#938f99] uppercase tracking-wider">
            Secured by Sada-e-Kutub AI
          </span>
        </div>
      </div>
    </aside>
  );
};
