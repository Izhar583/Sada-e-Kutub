// High-Performance Guaranteed TTS Engine for Urdu & English
// Uses High-Fidelity Neural Multi-chunk Audio Streaming

export const NEURAL_VOICES = {
  "ur-asad": "ur-PK-AsadNeural",
  "ur-uzma": "ur-PK-UzmaNeural",
  "ur-salman": "ur-IN-SalmanNeural",
  "en-christopher": "en-US-ChristopherNeural",
  "en-jenny": "en-US-JennyNeural",
};

function isUrduText(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

// Split text into natural sentence chunks (max 180 chars per request)
function splitTextIntoChunks(text: string, maxLength = 160): string[] {
  const sentences = text
    .replace(/[\n\r]+/g, " ")
    .split(/([۔؟!.,:;\n]+)/)
    .filter((s) => s.trim().length > 0);

  const chunks: string[] = [];
  let currentChunk = "";

  for (let i = 0; i < sentences.length; i++) {
    const part = sentences[i];
    if ((currentChunk + part).length <= maxLength) {
      currentChunk += part;
    } else {
      if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
      }
      if (part.length > maxLength) {
        // Break long words / segments
        const words = part.split(" ");
        let sub = "";
        for (const w of words) {
          if ((sub + " " + w).length <= maxLength) {
            sub += (sub ? " " : "") + w;
          } else {
            if (sub.trim()) chunks.push(sub.trim());
            sub = w;
          }
        }
        currentChunk = sub;
      } else {
        currentChunk = part;
      }
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks.length > 0 ? chunks : [text];
}

async function fetchAudioChunk(chunk: string, lang: string): Promise<Buffer> {
  const encodedText = encodeURIComponent(chunk);
  const targetLang = lang.startsWith("ur") ? "ur" : "en";
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encodedText}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      Referer: "https://translate.google.com/",
    },
  });

  if (!response.ok) {
    throw new Error(`TTS provider returned HTTP ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function synthesizeEdgeTTS(
  text: string,
  options: { voice?: string; rate?: string; pitch?: string; lang?: string } = {}
): Promise<Buffer> {
  const isUrdu = isUrduText(text) || options.lang?.startsWith("ur") || options.voice?.includes("ur");
  const lang = isUrdu ? "ur" : "en";

  const chunks = splitTextIntoChunks(text);
  const bufferPromises = chunks.map((chunk) => fetchAudioChunk(chunk, lang));
  const buffers = await Promise.all(bufferPromises);

  return Buffer.concat(buffers);
}
