"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, Image as ImageIcon, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
        isDragging
          ? "border-amber-400 bg-amber-500/10 scale-[1.01]"
          : selectedFile
          ? "border-emerald-500/60 bg-emerald-500/5"
          : "border-stone-800 bg-stone-900/40 hover:border-amber-500/50 hover:bg-stone-900/80"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,image/png,image/jpeg,image/webp"
        onChange={handleFileInput}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-amber-600/20 to-amber-400/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
          {selectedFile ? (
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          ) : (
            <UploadCloud className="h-8 w-8 text-amber-400 animate-bounce" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-stone-100">
            {selectedFile ? selectedFile.name : "Upload Book PDF or Scanned Book Pages"}
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-md mx-auto">
            Drag & drop your English or Urdu PDF, or scanned book photos (JPG, PNG). AI will extract text, detect chapters, and craft audiobook narration.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-800 text-stone-300 border border-stone-700">
            <FileText className="h-3.5 w-3.5 text-amber-400" /> PDF (Digital & Scanned)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-800 text-stone-300 border border-stone-700">
            <ImageIcon className="h-3.5 w-3.5 text-emerald-400" /> Urdu & English OCR
          </span>
        </div>
      </div>
    </div>
  );
};
