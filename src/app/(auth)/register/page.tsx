"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Readora AI"
              className="h-14 w-14 object-contain rounded-2xl shadow-xl shadow-amber-500/20 group-hover:scale-105 transition-transform"
            />
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Create your {APP_NAME} account
          </h2>
          <p className="text-xs text-stone-400">
            Get 60 free minutes of AI Audiobook narration every month
          </p>
        </div>

        <div className="rounded-3xl border border-stone-800 bg-stone-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ali Khan"
                className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>

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
              <label className="text-xs font-semibold text-stone-300">Password</label>
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
              Start Free Trial
            </Button>
          </form>

          <div className="text-center text-xs text-stone-400 pt-2 border-t border-stone-800">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
