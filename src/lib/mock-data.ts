import { Book } from "@/types/book";

export const SAMPLE_BOOKS: Book[] = [
  {
    id: "peer-e-kamil",
    title: "Peer-e-Kamil (The Perfect Mentor)",
    urduTitle: "پیرِ کامل ﷺ",
    author: "Umera Ahmed",
    urduAuthor: "عمیرہ احمد",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    language: "ur",
    bookType: "novel",
    recommendedStyle: "emotional",
    selectedVoiceId: "ur-male-1",
    selectedStyle: "emotional",
    progressPercent: 42,
    currentChapterId: "pek-ch-1",
    currentPositionSeconds: 145,
    totalPages: 520,
    totalDurationSeconds: 18400,
    shortSummary: "A transformative journey of Imama and Salar exploring redemption, inner conflict, spirituality, and purpose.",
    urduSummary: "امامہ اور سالار کی زندگی کے سفر، اندرونی کشمکش، ہدایت اور تبدیلی کی لازوال داستان۔",
    detailedSummary: "Peer-e-Kamil is one of the most celebrated Urdu novels exploring deep philosophical questions, personal redemption, and the search for peace through faith. The contrasting lives of Salar Sikandar (a prodigy with a high IQ struggling with existential void) and Imama Hashim intertwine over years of profound personal evolution.",
    characters: [
      { name: "Salar Sikandar", role: "Protagonist", description: "A brilliant young man with high IQ searching for true purpose and meaning in life." },
      { name: "Imama Hashim", role: "Protagonist", description: "A courageous medical student who stands firm in her faith against overwhelming odds." },
      { name: "Dr. Sikandar", role: "Supporting", description: "Salar's father, representing traditional upper-class worldview." }
    ],
    keyThemes: ["Redemption", "Spiritual Awakening", "True Mentorship", "Moral Responsibility"],
    chapters: [
      {
        id: "pek-ch-1",
        bookId: "peer-e-kamil",
        order: 1,
        title: "Chapter 1: The Crossroads of Fate",
        urduTitle: "باب اول: زندگی کا موڑ",
        durationSeconds: 1240,
        content: `رات کا سناٹا گہرا ہوتا جا رہا تھا۔ کمرے میں جلتی ہوئی مدہم روشنی سالار کے چہرے پر عجیب سائے ڈال رہی تھی۔ وہ خاموشی سے کھڑکی کے پاس کھڑا دور افق پر چمکتے تاروں کو دیکھ رہا تھا۔ وہ ذہین تھا، بے پناہ باصلاحیت، لیکن اس کے دل کے اندر ایک گہرا خلا تھا جس کا جواب دنیا کے کسی علم کے پاس نہیں تھا۔\n\nاسی وقت دور کہیں سے فجر کی اذان کی دلنشین آواز سنائی دی۔ وہ آواز ہوا کے دوش پر تیرتی ہوئی سیدھی اس کے دل میں اترتی چلی گئی۔ سالار نے بے اختیار اپنے ہاتھ باندھ لیے۔ کیا یہی وہ راستہ تھا جس کی تلاش میں وہ ساری زندگی بھٹکتا رہا تھا؟`,
        urduContent: `رات کا سناٹا گہرا ہوتا جا رہا تھا۔ کمرے میں جلتی ہوئی مدہم روشنی سالار کے چہرے پر عجیب سائے ڈال رہی تھی۔ وہ خاموشی سے کھڑکی کے پاس کھڑا دور افق پر چمکتے تاروں کو دیکھ رہا تھا۔ وہ ذہین تھا، بے پناہ باصلاحیت، لیکن اس کے دل کے اندر ایک گہرا خلا تھا جس کا جواب دنیا کے کسی علم کے پاس نہیں تھا۔\n\nاسی وقت دور کہیں سے فجر کی اذان کی دلنشین آواز سنائی دی۔ وہ آواز ہوا کے دوش پر تیرتی ہوئی سیدھی اس کے دل میں اترتی چلی گئی۔ سالار نے بے اختیار اپنے ہاتھ باندھ لیے۔ کیا یہی وہ راستہ تھا جس کی تلاش میں وہ ساری زندگی بھٹکتا رہا تھا؟`,
        summary: "Introduction to Salar Sikandar's internal existential struggle and the first glimpse of his spiritual transformation.",
        urduSummary: "سالار سکندر کے اندرونی خلا اور اس کے روحانی سفر کی شروعات کا تفصیلی بیان۔",
        quotes: ["انسان کی اصل آزمائش علم نہیں بلکہ اس کا صحیح استعمال ہے۔", "خلا کو دنیا کی کوئی مادی چیز نہیں بھر سکتی۔"]
      },
      {
        id: "pek-ch-2",
        bookId: "peer-e-kamil",
        order: 2,
        title: "Chapter 2: The Letter of Truth",
        urduTitle: "باب دوم: سچائی کا اعتراف",
        durationSeconds: 1560,
        content: `امامہ نے اپنے بستر پر بیٹھ کر وہ لفافہ کھولا۔ اس کے ہاتھ ہلکے سے کانپ رہے تھے لیکن اس کی آنکھوں میں عزم کی چمک تھی۔ اس نے جو فیصلہ کیا تھا وہ آسان نہیں تھا، لیکن سچائی کی راہ پر چلنے کے لیے قربانی ناگزیر تھی۔\n\nخط میں لکھے الفاظ اس کے لیے مشعلِ راہ تھے۔ اس نے ایک گہری سانس لی اور اپنے دل کو تسلی دی کہ اب واپسی کا کوئی راستہ نہیں۔`,
        summary: "Imama makes a life-altering decision and prepares for the trials ahead.",
        urduSummary: "امامہ کی زندگی کا سب سے بڑا فیصلہ اور قربانی کا آغاز۔"
      }
    ],
    bookmarks: [
      {
        id: "bm-1",
        bookId: "peer-e-kamil",
        chapterId: "pek-ch-1",
        positionSeconds: 145,
        note: "Crucial moment where Salar hears the dawn call.",
        quoteSnippet: "کیا یہی وہ راستہ تھا جس کی تلاش میں وہ ساری زندگی بھٹکتا رہا تھا؟",
        createdAt: "2026-09-02T10:15:00Z"
      }
    ],
    status: "ready",
    createdAt: "2026-09-01T14:30:00Z"
  },
  {
    id: "the-alchemist",
    title: "The Alchemist",
    urduTitle: "کیمیا گر",
    author: "Paulo Coelho",
    urduAuthor: "پاؤلو کوئلہو",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    language: "en",
    bookType: "novel",
    recommendedStyle: "storytelling",
    selectedVoiceId: "en-male-1",
    selectedStyle: "storytelling",
    progressPercent: 68,
    currentChapterId: "alc-ch-1",
    currentPositionSeconds: 420,
    totalPages: 208,
    totalDurationSeconds: 14400,
    shortSummary: "An inspiring fable about following your dream and listening to your heart through the journey of Santiago.",
    urduSummary: "اپنے خوابوں کی تکمیل، تقدیر کی نشانیوں اور دلی خواہش کی تلاش کی ایک خوبصورت داستان۔",
    detailedSummary: "The Alchemist follows the journey of an Andalusian shepherd boy named Santiago who yearns to travel in search of a worldly treasure. His quest will lead him through the markets of Tangier and across the Egyptian desert to a mystical encounter with the Alchemist.",
    characters: [
      { name: "Santiago", role: "Protagonist", description: "An adventurous Andalusian shepherd boy determined to fulfill his Personal Legend." },
      { name: "The Alchemist", role: "Mentor", description: "A powerful master of alchemy living in the oasis of Al-Fayoum." },
      { name: "King Melchizedek", role: "Guide", description: "The mysterious King of Salem who introduces Santiago to omen signs." }
    ],
    keyThemes: ["Personal Legend", "Listening to the Heart", "Omens and Destiny", "The Soul of the World"],
    chapters: [
      {
        id: "alc-ch-1",
        bookId: "the-alchemist",
        order: 1,
        title: "Chapter 1: The Shepherd's Dream",
        urduTitle: "باب ۱: چرواہے کا خواب",
        durationSeconds: 1180,
        content: `The boy's name was Santiago. Dusk was falling as the boy arrived with his herd at an abandoned church. The roof had fallen in long ago, and an enormous sycamore had grown on the spot where the sacristy had once stood.\n\nHe decided to spend the night there. He saw to it that all the sheep entered through the ruined gate, and then laid some planks across it to prevent the flock from wandering off during the night. He wrapped himself in his warm jacket and lay down on the floor, using the book he had just finished reading as a pillow.`,
        urduContent: `لڑکے کا نام سینٹیاگو تھا۔ شام کا دھندلکا چھا رہا تھا جب وہ اپنی بھیڑوں کے ریوڑ کے ساتھ ایک ویران چرچ پہنچا۔ اس کی چھت بہت پہلے گر چکی تھی اور جہاں کبھی قربان گاہ تھی وہاں انجیر کا ایک بڑا درخت اگ آیا تھا۔\n\nاس نے رات وہیں گزارنے کا فیصلہ کیا۔ اس نے تمام بھیڑوں کو اندر پہنچایا اور پھر دروازے کے سامنے لکڑی کے تختے لگا دیے۔ اس نے اپنی گرم جیکٹ اوڑھی اور اپنی پڑھی ہوئی کتاب کو تکیہ بنا کر زمین پر لیٹ گیا۔`,
        summary: "Santiago camps at an old ruined church and reflects on his life as a wandering shepherd.",
        urduSummary: "سینٹیاگو کا چرچ میں پڑاؤ اور چرواہے کی آزاد زندگی پر غور و فکر۔",
        quotes: [
          "It's the possibility of having a dream come true that makes life interesting.",
          "When you want something, all the universe conspires in helping you to achieve it."
        ]
      }
    ],
    bookmarks: [],
    status: "ready",
    createdAt: "2026-08-30T09:00:00Z"
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    urduTitle: "ایٹامک ہیبٹس (چھوٹی عادات کا جادو)",
    author: "James Clear",
    urduAuthor: "جیمز کلیئر",
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    language: "en",
    bookType: "self_help",
    recommendedStyle: "professional",
    selectedVoiceId: "en-female-1",
    selectedStyle: "educational",
    progressPercent: 20,
    currentChapterId: "ah-ch-1",
    currentPositionSeconds: 60,
    totalPages: 320,
    totalDurationSeconds: 21600,
    shortSummary: "An easy and proven way to build good habits and break bad ones using 1% daily micro-improvements.",
    urduSummary: "روزمرہ کی چھوٹی عادات سے شاندار نتائج حاصل کرنے اور بری عادات چھوڑنے کا عملی طریقہ۔",
    detailedSummary: "Atomic Habits provides a comprehensive, practical framework for improving every day. James Clear reveals how tiny changes can grow into life-altering outcomes, breaking down the 4 Laws of Behavior Change.",
    characters: [],
    keyThemes: ["1% Rule", "Systems over Goals", "Identity-Based Habits", "Habit Stacking"],
    chapters: [
      {
        id: "ah-ch-1",
        bookId: "atomic-habits",
        order: 1,
        title: "Chapter 1: The Surprising Power of Atomic Habits",
        urduTitle: "باب ۱: چھوٹی عادات کی غیرمعمولی طاقت",
        durationSeconds: 1400,
        content: `The fate of British Cycling changed one day in 2003. The organization had endured nearly one hundred years of mediocrity. Since 1908, British riders had won just a single gold medal at the Olympic Games.\n\nThen came Dave Brailsford. What made him different was his relentless commitment to a strategy that he referred to as 'the aggregation of marginal gains.' The whole principle came from the idea that if you broke down everything you could think of that goes into riding a bike, and then improve it by 1 percent, you will get a significant increase when you put them all together.`,
        urduContent: `برطانوی سائیکلنگ کی تقدیر 2003 میں اچانک بدل گئی۔ سو سال سے یہ ٹیم محض اوسط کارکردگی کا شکار تھی۔ لیکن پھر ڈیو بریلسفورڈ آئے جن کا نظریہ 'معمولی بہتری کا مجموعہ' تھا — یعنی ہر چھوٹی چیز میں محض ۱ فیصد بہتری لانا۔`,
        summary: "How the aggregation of marginal gains (1% better every day) compounds into massive long-term results.",
        urduSummary: "ہر روز ۱ فیصد بہتری کا اصول کیسے انسان کی زندگی میں انقلاب برپا کرتا ہے۔"
      }
    ],
    bookmarks: [],
    status: "ready",
    createdAt: "2026-08-25T11:00:00Z"
  }
];
