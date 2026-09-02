"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Modal Box */}
      <div
        className={cn(
          "relative z-50 w-full max-w-lg rounded-2xl border border-stone-800 bg-stone-900 p-6 shadow-2xl text-stone-100 animate-scale-up",
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          {title && <h3 className="text-lg font-semibold text-stone-100">{title}</h3>}
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors ml-auto cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
