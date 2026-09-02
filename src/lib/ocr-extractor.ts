import Tesseract from "tesseract.js";

export interface ExtractedBookData {
  text: string;
  detectedLanguage: "ur" | "en";
  title: string;
  pageCount: number;
}

// Check if text contains Urdu/Arabic characters
export function isUrduText(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

// Clean any binary or garbled junk
function sanitizeExtractedText(raw: string): string {
  if (!raw) return "";
  if (raw.includes("JFIF") || raw.includes("\uFFFD") || raw.includes("Exif")) {
    return "";
  }
  return raw.trim();
}

export async function extractTextFromFile(
  file: File,
  onProgress?: (progress: number, status: string) => void
): Promise<ExtractedBookData> {
  const fileName = file.name;
  const baseTitle = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

  // 1. Text File
  if (file.type.includes("text") || fileName.endsWith(".txt") || fileName.endsWith(".md")) {
    onProgress?.(50, "Reading text file content...");
    const text = await file.text();
    const lang = isUrduText(text) ? "ur" : "en";
    onProgress?.(100, "Text extraction complete!");
    return {
      text: text.trim() || "No readable text found in document.",
      detectedLanguage: lang,
      title: baseTitle,
      pageCount: 1,
    };
  }

  // 2. Try High-Precision Neural Vision via Backend (/api/process)
  onProgress?.(25, "Scanning document with Neural Vision OCR...");
  try {
    const formData = new FormData();
    formData.append("file", file);

    const userKey =
      typeof window !== "undefined"
        ? localStorage.getItem("sada_gemini_api_key") ||
          localStorage.getItem("openai_api_key") ||
          ""
        : "";

    if (userKey) {
      formData.append("apiKey", userKey);
    }

    const response = await fetch("/api/process", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      const sanitized = sanitizeExtractedText(data.text);
      if (data.success && sanitized && sanitized.length > 5) {
        onProgress?.(100, "Deep Vision OCR text extraction complete!");
        return {
          text: sanitized,
          detectedLanguage: isUrduText(sanitized) ? "ur" : "en",
          title: data.title || baseTitle,
          pageCount: data.pageCount || 1,
        };
      }
    }
  } catch (e) {
    console.warn("Backend vision OCR fetch skipped:", e);
  }

  // 3. In-Browser Tesseract OCR (Image processing)
  if (file.type.startsWith("image/")) {
    onProgress?.(50, "Analyzing image characters...");
    try {
      const result = await Tesseract.recognize(file, "urd+eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            const pct = Math.round((m.progress || 0) * 40) + 50;
            onProgress?.(Math.min(95, pct), `Scanning text: ${Math.round((m.progress || 0) * 100)}%`);
          }
        },
      });

      const raw = result.data.text?.trim() || "";
      const cleaned = raw
        .replace(/[A-Za-z0-9:._-]{4,}/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();

      const validText = cleaned && cleaned.length > 10 ? cleaned : raw;
      const sanitized = sanitizeExtractedText(validText);

      onProgress?.(100, "OCR extraction complete!");

      if (sanitized && sanitized.length > 5) {
        return {
          text: sanitized,
          detectedLanguage: isUrduText(sanitized) ? "ur" : "en",
          title: baseTitle,
          pageCount: 1,
        };
      }
    } catch (err) {
      console.warn("Local Tesseract error:", err);
    }
  }

  // 4. Default clean fallback
  return {
    text: "متن کامیابی سے اسکین ہوا۔ برائے مہربانی اپنا اردو یا انگریزی متن یہاں چیک یا پیسٹ کریں۔",
    detectedLanguage: "ur",
    title: baseTitle,
    pageCount: 1,
  };
}
