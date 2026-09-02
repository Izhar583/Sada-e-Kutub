"use client";

import React from "react";
import { TopNav } from "@/components/layout/top-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomPlayerBar } from "@/components/layout/bottom-player-bar";
import { Footer } from "@/components/layout/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col antialiased bg-[#131313] text-[#e6e1e5] selection:bg-[#d4af37] selection:text-[#382900] font-sans">
      {/* Persistent Top Navigation */}
      <TopNav />

      {/* Main App Stage with Fixed Sidebar and Dynamic Children */}
      <div className="flex flex-1">
        {/* Persistent Left Sidebar */}
        <Sidebar />

        {/* Dynamic Route Content (Changes on navigation while sidebar & player stay anchored) */}
        <div className="flex-1 lg:pl-64 flex flex-col min-h-[calc(100vh-4.5rem)] justify-between">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </div>

      {/* Persistent Fixed Bottom Audio Player */}
      <BottomPlayerBar />
    </div>
  );
}
