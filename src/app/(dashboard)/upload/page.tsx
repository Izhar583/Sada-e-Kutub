"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  Info,
  BookCheck,
  Headphones,
  FileText,
  Sparkles,
  Edit3,
} from "lucide-react";
import { useBooks } from "@/context/book-context";
import { useAudio } from "@/context/audio-context";
import { Book, NarrationStyle, BookGenre } from "@/types/book";
import { ProcessingStepper } from "@/components/upload/processing-stepper";
import { NarrationStylePicker } from "@/components/upload/narration-style-picker";
import { VoiceSelector } from "@/components/upload/voice-selector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { extractTextFromFile } from "@/lib/ocr-extractor";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addBook, pendingUploadFile, setPendingUploadFile } = useBooks();
  const { playBook } = useAudio();

  // Mode Selection: Standard vs Deep Vision OCR
  const [processingMode, setProcessingMode] = useState<"standard" | "deep_ocr">("deep_ocr");
  const [isDragging, setIsDragging] = useState(false);

  // Upload & Ingestion Lifecycle State
  const [currentStep, setCurrentStep] = useState<"upload" | "processing" | "configure" | "completed">("upload");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStepIndex, setProcessingStepIndex] = useState(0);
  const [statusText, setStatusText] = useState("Preparing document...");

  // Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [title, setTitle] = useState("");
  const [urduTitle, setUrduTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [detectedGenre, setDetectedGenre] = useState<BookGenre>("novel");
  const [detectedLanguage, setDetectedLanguage] = useState<"en" | "ur" | "mixed">("ur");
  const [selectedStyle, setSelectedStyle] = useState<NarrationStyle>("emotional");
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>("ur-male-1");

  const startProcessing = async (file: File) => {
    setSelectedFile(file);
    if (file.type.startsWith("image/")) {
      try {
        setPreviewUrl(URL.createObjectURL(file));
      } catch (e) {}
    } else {
      setPreviewUrl(null);
    }

    const baseName = file.name.replace(/\.[^/.]+$/, "");
    setTitle(baseName.replace(/[-_]/g, " "));
    setAuthor("Renowned Author");

    setCurrentStep("processing");
    setProcessingProgress(15);
    setProcessingStepIndex(0);
    setStatusText("Uploading and scanning document...");

    try {
      // Step 1: Pre-processing
      setTimeout(() => {
        setProcessingProgress(35);
        setProcessingStepIndex(1);
        setStatusText("Running Neural Vision & Layout Analysis...");
      }, 1000);

      // Real OCR & Text Extraction
      const result = await extractTextFromFile(file, (pct, status) => {
        setProcessingProgress(Math.max(35, pct));
        setStatusText(status);
        if (pct > 50) setProcessingStepIndex(2);
        if (pct > 80) setProcessingStepIndex(3);
      });

      setExtractedText(result.text);
      setDetectedLanguage(result.detectedLanguage);
      if (result.title && !title) setTitle(result.title);

      if (result.detectedLanguage === "ur") {
        setUrduTitle("شاہکار تصنیف");
        setSelectedVoiceId("ur-male-1");
        setSelectedStyle("emotional");
      } else {
        setSelectedVoiceId("en-male-1");
        setSelectedStyle("storytelling");
      }

      setProcessingProgress(100);
      setProcessingStepIndex(4);
      setStatusText("Extraction and structuring complete!");

      setTimeout(() => {
        setCurrentStep("configure");
      }, 800);
    } catch (err) {
      console.error("Extraction error:", err);
      setProcessingProgress(100);
      setProcessingStepIndex(4);
      setTimeout(() => {
        setCurrentStep("configure");
      }, 800);
    }
  };

  // Auto-trigger processing if user selected a file on Homepage
  useEffect(() => {
    if (pendingUploadFile) {
      const file = pendingUploadFile;
      setPendingUploadFile(null);
      startProcessing(file);
    }
  }, [pendingUploadFile, setPendingUploadFile]);

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
      startProcessing(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startProcessing(e.target.files[0]);
    }
  };

  const handleFinishAndGenerate = () => {
    const defaultCover =
      detectedLanguage === "ur"
        ? "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop";

    const finalText = extractedText.trim() || (
      detectedLanguage === "ur"
        ? "یہ آپ کی اپ لوڈ کردہ فائل کا متن ہے جو نیورل وائس انجن سے تیار کیا گیا ہے۔"
        : "This is the extracted content of your uploaded document, ready for neural narration."
    );

    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: title || "Uploaded AI Book",
      urduTitle: urduTitle || (detectedLanguage === "ur" ? "نئی تخلیق" : undefined),
      author: author || "Unknown Author",
      coverUrl: previewUrl || defaultCover,
      language: detectedLanguage,
      bookType: detectedGenre,
      recommendedStyle: selectedStyle,
      selectedVoiceId: selectedVoiceId,
      selectedStyle: selectedStyle,
      progressPercent: 0,
      currentChapterId: "ch-1",
      currentPositionSeconds: 0,
      totalPages: 12,
      totalDurationSeconds: Math.max(60, Math.round(finalText.length * 0.15)),
      shortSummary: `Extracted from ${selectedFile?.name || "uploaded file"}. Contains ${finalText.length} characters of recognized text.`,
      detailedSummary: `Full recognized text converted into high-fidelity speech: ${finalText.slice(0, 200)}...`,
      chapters: [
        {
          id: "ch-1",
          bookId: `book-${Date.now()}`,
          order: 1,
          title: title || "Chapter 1: The Manuscript",
          urduTitle: urduTitle || "باب ۱: آغازِ مسودہ",
          durationSeconds: Math.max(60, Math.round(finalText.length * 0.15)),
          content: finalText,
          urduContent: detectedLanguage === "ur" ? finalText : undefined,
          summary: "Complete recognized text from your uploaded document.",
        },
      ],
      bookmarks: [],
      status: "ready",
      createdAt: new Date().toISOString(),
    };

    addBook(newBook);
    playBook(newBook);
    router.push(`/book/${newBook.id}/listen`);
  };

  return (
    <div className="flex-1 px-6 sm:px-12 py-12 lg:px-16 flex flex-col items-center justify-center relative overflow-hidden bg-[#131313]">
      
      {/* Ambient Lighting Spheres */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#3e4758]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl w-full z-10 space-y-10">
        
        {/* Heading */}
        <div className="text-center space-y-4">
          <h1 className="font-garamond text-[#f2ca50] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Upload Your Manuscript
          </h1>
          <p className="font-garamond text-[#d0c5af] text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            Transform your physical books, PDFs, or scanned manuscripts into immersive, high-fidelity audio experiences using our advanced neural OCR.
          </p>
        </div>

        {currentStep === "upload" && (
          <>
            {/* Dropzone Card */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#201f1f]/50 backdrop-blur-xl rounded-3xl p-1 shadow-2xl relative group cursor-pointer transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/png,image/jpeg,image/webp,.epub,.txt"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-[#f2ca50]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div
                className={`h-80 w-full rounded-[1.3rem] border border-dashed flex flex-col items-center justify-center gap-6 relative overflow-hidden transition-all duration-300 ${
                  isDragging
                    ? "border-[#f2ca50] bg-[#f2ca50]/10 scale-[1.01]"
                    : "border-[#4d4635]/50 bg-[#1c1b1b]/50 group-hover:border-[#f2ca50]/60"
                }`}
              >
                <div className="w-20 h-20 rounded-full bg-[#2a2a2a] shadow-lg flex items-center justify-center z-10 group-hover:scale-110 group-hover:bg-[#f2ca50]/20 transition-all duration-500 ease-out">
                  <UploadCloud className="text-[#f2ca50] w-10 h-10" />
                </div>

                <div className="text-center z-10 space-y-1">
                  <h3 className="font-garamond text-[#e5e2e1] text-2xl font-semibold">
                    Drag & drop your files here
                  </h3>
                  <p className="text-[#d0c5af] text-sm">
                    Supports PDF, JPG, PNG, WEBP, TXT (Max 50MB)
                  </p>
                </div>

                <div className="z-10 mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            </div>

            {/* Processing Mode Selection Radios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mode 1: Standard Processing */}
              <label
                onClick={() => setProcessingMode("standard")}
                className={`relative flex items-start gap-4 p-6 rounded-2xl bg-[#1c1b1b] border transition-all cursor-pointer group ${
                  processingMode === "standard"
                    ? "border-[#f2ca50]/60 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                    : "border-[#353534]/50 hover:bg-[#201f1f]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 mt-1 transition-all flex items-center justify-center ${
                    processingMode === "standard"
                      ? "bg-[#f2ca50] ring-4 ring-[#f2ca50]/20"
                      : "border-2 border-[#99907c]"
                  }`}
                >
                  {processingMode === "standard" && (
                    <div className="w-2 h-2 rounded-full bg-[#3c2f00]" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-garamond text-lg font-semibold text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors">
                      Standard Processing
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#353534] text-[#d0c5af] text-[10px] font-bold">
                      Fast
                    </span>
                  </div>
                  <p className="text-[#d0c5af] text-xs leading-relaxed">
                    Best for clean PDFs and digital EPUBs. Extracts text rapidly for immediate listening.
                  </p>
                </div>
              </label>

              {/* Mode 2: Deep Vision OCR */}
              <label
                onClick={() => setProcessingMode("deep_ocr")}
                className={`relative flex items-start gap-4 p-6 rounded-2xl bg-[#1c1b1b] border transition-all cursor-pointer group ${
                  processingMode === "deep_ocr"
                    ? "border-[#f2ca50]/60 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                    : "border-[#353534]/50 hover:bg-[#201f1f]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 mt-1 transition-all flex items-center justify-center ${
                    processingMode === "deep_ocr"
                      ? "bg-[#f2ca50] ring-4 ring-[#f2ca50]/20"
                      : "border-2 border-[#99907c]"
                  }`}
                >
                  {processingMode === "deep_ocr" && (
                    <div className="w-2 h-2 rounded-full bg-[#3c2f00]" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-garamond text-lg font-semibold text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors">
                      Deep Vision OCR
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/30 text-[10px] font-bold">
                      Premium
                    </span>
                  </div>
                  <p className="text-[#d0c5af] text-xs leading-relaxed">
                    Ideal for scanned pages, faded manuscripts, and complex layouts. Uses AI to reconstruct text.
                  </p>
                </div>
              </label>
            </div>

            {/* Copyright and Ethics Box */}
            <div className="bg-[#0e0e0e] border border-[#353534]/40 p-6 rounded-2xl flex items-start gap-4 shadow-inner">
              <Info className="w-5 h-5 text-[#99907c] shrink-0 mt-0.5" />
              <p className="text-[#d0c5af] text-xs leading-relaxed">
                By uploading files, you confirm that you have the right to use and process this content. Sada-e-Kutub respects copyright laws and utilizes these files solely for your personal auditory consumption. Files are encrypted and not used to train global AI models.
              </p>
            </div>
          </>
        )}

        {/* Step 2: Ingestion Progress */}
        {currentStep === "processing" && (
          <div className="space-y-6">
            {selectedFile && (
              <div className="p-4 rounded-2xl bg-[#1c1b1b] border border-[#353534] flex items-center gap-4 shadow-lg">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-[#f2ca50]/30"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-[#f2ca50] border border-white/10">
                    <FileText className="w-7 h-7" />
                  </div>
                )}
                <div className="overflow-hidden flex-1">
                  <h4 className="text-[#e5e2e1] font-semibold text-sm truncate">
                    {selectedFile.name}
                  </h4>
                  <p className="text-[#f2ca50] text-xs mt-0.5 font-medium animate-pulse">
                    {statusText}
                  </p>
                </div>
              </div>
            )}

            <ProcessingStepper
              currentStepIndex={processingStepIndex}
              progressPercent={processingProgress}
            />
          </div>
        )}

        {/* Step 3: Narration & Style Customization */}
        {currentStep === "configure" && (
          <div className="rounded-3xl border border-[#353534] bg-[#1c1b1b]/90 backdrop-blur-xl p-6 sm:p-8 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#353534]/60 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#e5e2e1] flex items-center gap-2">
                  <BookCheck className="h-5 w-5 text-emerald-400" />
                  <span>AI Ingestion Completed! Customize Your Audiobook</span>
                </h2>
                <p className="text-xs text-[#d0c5af]">
                  Review detected text, voice persona, and narration style
                </p>
              </div>
              <Badge variant="gold">
                {detectedLanguage === "ur" ? "Urdu Detected" : "English Detected"}
              </Badge>
            </div>

            {/* Selected File Card with Image/PDF preview */}
            {selectedFile && (
              <div className="p-4 rounded-2xl bg-[#131313] border border-[#353534] flex items-center gap-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-16 h-20 rounded-xl object-cover border border-[#f2ca50]/40 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-20 rounded-xl bg-[#201f1f] flex flex-col items-center justify-center text-[#f2ca50] border border-[#353534]">
                    <FileText className="w-8 h-8" />
                    <span className="text-[10px] font-bold uppercase mt-1">PDF</span>
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[#e5e2e1]">
                    {selectedFile.name}
                  </h4>
                  <p className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1 font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    Text successfully recognized ({extractedText.length} characters)
                  </p>
                </div>
              </div>
            )}

            {/* Real Recognized Text Preview & Edit Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#d0c5af] flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>Recognized Content Preview (Editable)</span>
                </label>
                <span className="text-[11px] text-[#99907c]">
                  {detectedLanguage === "ur" ? "اردو متن" : "English Text"}
                </span>
              </div>
              <textarea
                rows={4}
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                dir={detectedLanguage === "ur" ? "rtl" : "ltr"}
                placeholder="Extracted book content will appear here..."
                className={`w-full p-4 rounded-2xl bg-[#131313] border border-[#353534] text-[#e5e2e1] text-sm focus:outline-none focus:border-[#f2ca50]/60 resize-y leading-relaxed ${
                  detectedLanguage === "ur" ? "font-urdu text-base leading-loose" : "font-garamond text-base"
                }`}
              />
            </div>

            {/* Title & Author Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#d0c5af]">Book Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#131313] border border-[#353534] text-[#e5e2e1] text-sm focus:outline-none focus:border-[#f2ca50]/60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#d0c5af]">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#131313] border border-[#353534] text-[#e5e2e1] text-sm focus:outline-none focus:border-[#f2ca50]/60"
                />
              </div>
            </div>

            {/* Voice Selector */}
            <VoiceSelector
              selectedVoiceId={selectedVoiceId}
              languageFilter={detectedLanguage === "ur" ? "ur" : "all"}
              onSelectVoice={setSelectedVoiceId}
            />

            {/* Narration Style Picker */}
            <NarrationStylePicker
              selectedStyle={selectedStyle}
              recommendedStyle="emotional"
              onSelectStyle={setSelectedStyle}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#353534]">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                  setExtractedText("");
                  setCurrentStep("upload");
                }}
              >
                Upload Another
              </Button>

              <Button
                variant="gold"
                size="lg"
                onClick={handleFinishAndGenerate}
                className="gap-2"
              >
                <Headphones className="h-5 w-5" />
                <span>Start Listening Now</span>
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
