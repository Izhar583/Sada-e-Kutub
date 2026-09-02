"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#131313] border-t border-white/10 pt-16 pb-8 mt-auto relative z-10 select-none">
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Identity */}
          <div className="md:col-span-12 lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                alt="Sada-e-Kutub Logo"
                className="h-10 w-auto object-contain rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                src="/logo.png"
              />
              <span className="font-garamond text-[24px] tracking-tight text-[#d4af37] font-bold">
                Sada-e-Kutub
              </span>
            </div>

            <p className="font-garamond text-base text-[#cac4d0] max-w-md italic leading-relaxed">
              &ldquo;An immersive auditory sanctuary for literature, where every book finds its unique voice.&rdquo;
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                className="text-[#cac4d0] hover:text-[#d4af37] transition-colors p-2 rounded-full hover:bg-white/5"
                href="#"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              <a
                className="text-[#cac4d0] hover:text-[#d4af37] transition-colors p-2 rounded-full hover:bg-white/5"
                href="#"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              <a
                className="text-[#cac4d0] hover:text-[#d4af37] transition-colors p-2 rounded-full hover:bg-white/5"
                href="mailto:contact@sadaekutub.com"
                aria-label="Email"
              >
                <i className="fa-regular fa-envelope text-lg"></i>
              </a>
            </div>
          </div>

          {/* Navigational Map */}
          <div className="md:col-span-4 lg:col-span-3 space-y-5">
            <h4 className="font-garamond text-xl text-[#d4af37] font-bold">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="text-[#cac4d0] hover:text-white transition-colors" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-[#cac4d0] hover:text-white transition-colors" href="/library">
                  My Library
                </Link>
              </li>
              <li>
                <Link className="text-[#cac4d0] hover:text-white transition-colors" href="/upload">
                  Upload &amp; OCR
                </Link>
              </li>
              <li>
                <Link className="text-[#cac4d0] hover:text-white transition-colors" href="/settings">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div className="md:col-span-4 lg:col-span-4 space-y-5">
            <h4 className="font-garamond text-xl text-[#d4af37] font-bold">
              Legal &amp; Ethics
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="text-[#cac4d0] hover:text-white transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-[#cac4d0] hover:text-white transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="text-[#cac4d0] hover:text-white transition-colors" href="#">
                  Copyright Ethics
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center">
          <p className="text-[11px] text-[#cac4d0]/60 uppercase tracking-[0.2em] font-semibold">
            © 2024 SADA-E-KUTUB. THE VOICE OF BOOKS.
          </p>
        </div>
      </div>
    </footer>
  );
};
