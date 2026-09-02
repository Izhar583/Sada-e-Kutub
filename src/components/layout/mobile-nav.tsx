"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Library, UploadCloud, Headphones, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const items = [
    { name: "Home", href: "/dashboard", icon: Compass },
    { name: "Library", href: "/library", icon: Library },
    { name: "Upload", href: "/upload", icon: UploadCloud },
    { name: "Player", href: "/book/peer-e-kamil/listen", icon: Headphones },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800/80 px-2 py-2 flex items-center justify-around">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-medium transition-colors",
              isActive ? "text-amber-400 font-semibold" : "text-stone-400 hover:text-stone-200"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive ? "text-amber-400" : "text-stone-400")} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
