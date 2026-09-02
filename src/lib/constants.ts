import { BookGenre, NarrationStyle } from "@/types/book";
import { VoiceOption } from "@/types/audio";

export const APP_NAME = "Readora AI";
export const APP_TAGLINE = "Turn Any Book Into an Intelligent AI Audiobook";

export const GENRE_STYLE_MAPPING: Record<BookGenre, { label: string; recommendedStyle: NarrationStyle; icon: string }> = {
  novel: { label: "Novel / Fiction", recommendedStyle: "cinematic", icon: "BookOpen" },
  short_story: { label: "Short Story", recommendedStyle: "storytelling", icon: "Feather" },
  biography: { label: "Biography", recommendedStyle: "professional", icon: "UserCheck" },
  autobiography: { label: "Autobiography", recommendedStyle: "calm", icon: "User" },
  poetry: { label: "Poetry (Shayari)", recommendedStyle: "poetic", icon: "Sparkles" },
  history: { label: "History", recommendedStyle: "professional", icon: "Hourglass" },
  educational: { label: "Educational / Academic", recommendedStyle: "educational", icon: "GraduationCap" },
  business: { label: "Business & Finance", recommendedStyle: "professional", icon: "Briefcase" },
  self_help: { label: "Self Help & Growth", recommendedStyle: "storytelling", icon: "Sun" },
  children: { label: "Children's Story", recommendedStyle: "children", icon: "Smile" },
  religious: { label: "Religious & Spiritual", recommendedStyle: "calm", icon: "Compass" },
};

export const NARRATION_STYLES: Array<{
  id: NarrationStyle;
  name: string;
  urduName: string;
  description: string;
  badge: string;
}> = [
  {
    id: "storytelling",
    name: "Storytelling",
    urduName: "داستان گوئی",
    description: "Natural, engaging narrative with balanced pacing and warmth.",
    badge: "Most Popular",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    urduName: "سنیما انداز",
    description: "Dramatic pacing, immersive pauses, and tension-aware modulation.",
    badge: "Immersive",
  },
  {
    id: "calm",
    name: "Calm & Relaxing",
    urduName: "پُرسکون",
    description: "Soft, tranquil cadence perfect for bedtime reading and philosophy.",
    badge: "Night Mode",
  },
  {
    id: "emotional",
    name: "Emotional",
    urduName: "جذباتی و پُراثر",
    description: "Rich emotional inflection for poignant, deeply touching scenes.",
    badge: "Expressive",
  },
  {
    id: "professional",
    name: "Professional",
    urduName: "پیشہ ورانہ",
    description: "Clear, authoritative, and structured for non-fiction & business.",
    badge: "Documentary",
  },
  {
    id: "educational",
    name: "Educational (Teacher)",
    urduName: "تعلیمی و تدریسی",
    description: "Emphasis on key terms with pedagogical pauses and clarity.",
    badge: "Study Mode",
  },
  {
    id: "poetic",
    name: "Poetic (Shayari)",
    urduName: "شعری و ترنم",
    description: "Rhythmic cadence, respectful pauses, and musical intonation for Urdu ghazals & poetry.",
    badge: "Urdu Special",
  },
  {
    id: "children",
    name: "Children's Story",
    urduName: "بچوں کی کہانی",
    description: "Playful, energetic voice inflections and character expressions.",
    badge: "Fun & Playful",
  },
];

export const AVAILABLE_VOICES: VoiceOption[] = [
  // Urdu Voices
  {
    id: "ur-male-1",
    name: "Zia Mohyeddin Style (Hamza)",
    gender: "male",
    language: "ur",
    accent: "Urdu (Classical / Eloquent)",
    sampleText: "زندگی کی حقیقت کو سمجھنے کے لیے کتاب کا ساتھ سب سے بہترین ہے۔",
    personality: "deep",
  },
  {
    id: "ur-female-1",
    name: "Zainab (Smooth & Poetic)",
    gender: "female",
    language: "ur",
    accent: "Urdu (Modern Standard)",
    sampleText: "صبح کی روشنی میں پہاڑوں کی چوٹیاں سنہری لگ رہی تھیں۔",
    personality: "warm",
  },
  {
    id: "ur-male-2",
    name: "Bilal (Engaging Narrator)",
    gender: "male",
    language: "ur",
    accent: "Urdu (Energetic / Novelist)",
    sampleText: "اس نے دروازہ کھولا تو سامنے ایک پُراسرار خط پڑا تھا۔",
    personality: "expressive",
  },
  {
    id: "ur-female-2",
    name: "Ayesha (Academic & Clear)",
    gender: "female",
    language: "ur",
    accent: "Urdu (Informative / Teacher)",
    sampleText: "اس باب میں ہم بنیادی سائنسی نظریات کا جائزہ لیں گے۔",
    personality: "clear",
  },

  // English Voices
  {
    id: "en-male-1",
    name: "Arthur (British Master Storyteller)",
    gender: "male",
    language: "en",
    accent: "British English (Oxford)",
    sampleText: "The old library was quiet, holding centuries of forgotten secrets.",
    personality: "deep",
  },
  {
    id: "en-female-1",
    name: "Elena (Warm & Cinematic)",
    gender: "female",
    language: "en",
    accent: "American English (Narrator)",
    sampleText: "Every journey begins with a single question waiting to be answered.",
    personality: "warm",
  },
  {
    id: "en-male-2",
    name: "Marcus (Clear & Academic)",
    gender: "male",
    language: "en",
    accent: "American English (Professor)",
    sampleText: "In this chapter, we will analyze the key principles of modern economics.",
    personality: "clear",
  },
  {
    id: "en-female-2",
    name: "Sophia (Calm & Reflective)",
    gender: "female",
    language: "en",
    accent: "Neutral Global English",
    sampleText: "Take a deep breath and let the tranquility of the words surround you.",
    personality: "calm",
  },
];
