import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // 1. If Multipart Form Data (File uploaded)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const userApiKey = (formData.get("apiKey") as string) || "";

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name;
      const baseTitle = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

      // A. If PDF File
      if (file.type.includes("pdf") || fileName.endsWith(".pdf")) {
        try {
          const pdf = require("pdf-parse");
          const data = await pdf(buffer);
          const extractedText = data.text?.trim() || "";

          return NextResponse.json({
            success: true,
            text: extractedText,
            pageCount: data.numpages || 1,
            title: baseTitle,
          });
        } catch (e) {
          console.error("PDF parse error:", e);
        }
      }

      // B. If Image File (Try Google Gemini Multimodal Vision like Google Lens)
      if (file.type.startsWith("image/")) {
        const apiKey = userApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (apiKey) {
          try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const base64Data = buffer.toString("base64");
            const imagePart = {
              inlineData: {
                data: base64Data,
                mimeType: file.type || "image/jpeg",
              },
            };

            const prompt =
              "You are an expert OCR system specializing in Urdu Nastaliq poetry and English text recognition. Extract ALL the text written in this image with 100% accuracy. Preserve all line breaks, stanzas, and poetry verses. Output ONLY the raw extracted text in its original language without any conversational commentary or markdown quotes.";

            const result = await model.generateContent([prompt, imagePart]);
            const responseText = result.response.text().trim();

            if (responseText && responseText.length > 3) {
              return NextResponse.json({
                success: true,
                text: responseText,
                pageCount: 1,
                title: baseTitle,
                isVisionAI: true,
              });
            }
          } catch (geminiErr) {
            console.warn("Gemini Vision OCR error:", geminiErr);
          }
        }

        // Return indicator that image needs client OCR rather than corrupt binary text
        return NextResponse.json({
          success: false,
          needsClientOcr: true,
          title: baseTitle,
        });
      }

      // C. Plain text files (.txt, .md) ONLY (NEVER binary images)
      if (file.type.includes("text") || fileName.endsWith(".txt") || fileName.endsWith(".md")) {
        const text = buffer.toString("utf-8");
        return NextResponse.json({
          success: true,
          text: text.trim(),
          pageCount: 1,
          title: baseTitle,
        });
      }

      return NextResponse.json({
        success: false,
        needsClientOcr: true,
        title: baseTitle,
      });
    }

    // 2. JSON Body request fallback
    const body = await request.json();
    return NextResponse.json({
      success: true,
      jobId: `job-${Date.now()}`,
      status: "ready",
      text: body.text || "",
    });
  } catch (error: any) {
    console.error("Process API Error:", error);
    return NextResponse.json(
      { error: error.message || "File processing failed" },
      { status: 500 }
    );
  }
}
