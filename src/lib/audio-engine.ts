// High-Fidelity Neural Audio Engine for Urdu & English
export class AudioEngine {
  private static currentAudio: HTMLAudioElement | null = null;
  private static synth: SpeechSynthesis | null = null;
  private static isUsingNeural = true;
  private static audioCache = new Map<string, string>(); // text+voice -> blob url

  private static getSynth(): SpeechSynthesis | null {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (!this.synth) {
        this.synth = window.speechSynthesis;
      }
      return this.synth;
    }
    return null;
  }

  public static init() {
    if (typeof window === "undefined") return;
    const synth = this.getSynth();
    if (synth && typeof synth.onvoiceschanged !== "undefined") {
      synth.onvoiceschanged = () => {
        synth.getVoices();
      };
    }
  }

  public static async speak(
    text: string,
    options: {
      voice?: string;
      lang?: string;
      rate?: number;
      pitch?: number;
      volume?: number;
      onStart?: () => void;
      onBoundary?: (charIndex: number) => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ) {
    this.stop();

    if (!text || text.trim().length === 0) {
      options.onEnd?.();
      return;
    }

    const trimmedText = text.trim();
    const rate = options.rate || 1.0;
    const voice =
      options.voice ||
      (options.lang?.startsWith("en")
        ? "en-US-ChristopherNeural"
        : "ur-PK-AsadNeural");

    const cacheKey = `${voice}_${rate}_${trimmedText}`;

    // Try Neural TTS API
    try {
      options.onStart?.();

      let audioSrc = this.audioCache.get(cacheKey);

      if (!audioSrc) {
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: trimmedText,
            voice,
            rate,
          }),
        });

        if (!response.ok) {
          throw new Error(`TTS server responded with ${response.status}`);
        }

        const blob = await response.blob();
        audioSrc = URL.createObjectURL(blob);
        this.audioCache.set(cacheKey, audioSrc);
      }

      const audio = new Audio(audioSrc);
      audio.playbackRate = rate;
      if (options.volume !== undefined) {
        audio.volume = options.volume;
      }

      audio.onended = () => {
        this.currentAudio = null;
        options.onEnd?.();
      };

      audio.onerror = (e) => {
        console.warn("Neural audio playback error, falling back to Web Speech API:", e);
        this.fallbackWebSpeech(trimmedText, options);
      };

      this.currentAudio = audio;
      await audio.play();
      return;
    } catch (error) {
      console.warn("Neural TTS fetch failed, switching to local Web Speech API fallback:", error);
      this.fallbackWebSpeech(trimmedText, options);
    }
  }

  // Fallback to local browser Web Speech API if offline
  private static fallbackWebSpeech(
    text: string,
    options: {
      lang?: string;
      rate?: number;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ) {
    const synth = this.getSynth();
    if (!synth) {
      options.onEnd?.();
      return;
    }

    try {
      synth.cancel();
    } catch (e) {}

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || "ur-PK";
    utterance.rate = options.rate || 1.0;

    const voices = synth.getVoices();
    if (voices.length > 0) {
      if (utterance.lang.startsWith("ur")) {
        const urVoice =
          voices.find((v) => v.lang.toLowerCase().includes("ur")) ||
          voices.find((v) => v.lang.toLowerCase().includes("hi")) ||
          voices[0];
        if (urVoice) utterance.voice = urVoice;
      } else {
        const enVoice =
          voices.find((v) => v.lang.toLowerCase().startsWith("en")) ||
          voices[0];
        if (enVoice) utterance.voice = enVoice;
      }
    }

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      options.onEnd?.();
    };

    synth.speak(utterance);
  }

  public static pause() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }
    const synth = this.getSynth();
    if (synth && synth.speaking) {
      synth.pause();
    }
  }

  public static resume() {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play();
    }
    const synth = this.getSynth();
    if (synth && synth.paused) {
      synth.resume();
    }
  }

  public static stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }

    const synth = this.getSynth();
    if (synth) {
      try {
        synth.cancel();
      } catch (e) {}
    }
  }

  public static isSpeaking(): boolean {
    if (this.currentAudio && !this.currentAudio.paused) {
      return true;
    }
    const synth = this.getSynth();
    return !!(synth && synth.speaking);
  }
}
