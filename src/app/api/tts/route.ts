import { NextRequest, NextResponse } from "next/server";
import { synthesizeEdgeTTS, NEURAL_VOICES } from "@/lib/edge-tts-server";

// Helper to check if text contains Urdu / Arabic script
function isUrduText(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice, rate, pitch } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Determine best voice
    let selectedVoice = voice;
    if (!selectedVoice) {
      selectedVoice = isUrduText(text)
        ? NEURAL_VOICES["ur-asad"]
        : NEURAL_VOICES["en-christopher"];
    }

    // Convert rate if numeric
    let rateStr = "+0%";
    if (typeof rate === "number") {
      const percentage = Math.round((rate - 1) * 100);
      rateStr = `${percentage >= 0 ? "+" : ""}${percentage}%`;
    } else if (typeof rate === "string") {
      rateStr = rate;
    }

    const audioBuffer = await synthesizeEdgeTTS(text.trim(), {
      voice: selectedVoice,
      rate: rateStr,
      pitch: pitch || "+0Hz",
    });

    return new Response(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error: any) {
    console.error("TTS API Error:", error);
    return NextResponse.json(
      { error: error.message || "TTS synthesis failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text");
    const voice = searchParams.get("voice");
    const rate = searchParams.get("rate");

    if (!text) {
      return NextResponse.json({ error: "Text parameter is required" }, { status: 400 });
    }

    let selectedVoice = voice || (isUrduText(text) ? "ur-PK-AsadNeural" : "en-US-ChristopherNeural");

    const audioBuffer = await synthesizeEdgeTTS(text, {
      voice: selectedVoice,
      rate: rate || "+0%",
    });

    return new Response(new Uint8Array(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error: any) {
    console.error("TTS GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
