"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Readora AI"
              className="h-14 w-14 object-contain rounded-2xl shadow-xl shadow-amber-500/20 group-hover:scale-105 transition-transform"
            />
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Welcome back to {APP_NAME}
          </h2>
          <p className="text-xs text-stone-400">
            Sign in to continue listening and chatting with your books
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-stone-800 bg-stone-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@readora.ai"
                className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300">Password</label>
                <a href="#" className="text-[11px] text-amber-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-2">
              Sign In to Studio
            </Button>
          </form>

          <div className="text-center text-xs text-stone-400 pt-2 border-t border-stone-800">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-amber-400 font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
