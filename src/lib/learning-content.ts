export type Lesson = {
  id: string;
  title: string;
  chapter: number;
  page: number;
  description: string;
  explanation?: string;
  examples: string[];
  status: "verified" | "review";
};
export const lessons: Lesson[] = [
  {
    id: "alphabet",
    title: "Arab alifbosi",
    chapter: 1,
    page: 2,
    description: "Arab harflari va ularning yozilishi",
    explanation:
      "Араб алифбосида 28 та харф бор. Араб алифбоси бизнинг харфларимиздан ўнгдан чапга қараб ёзилиши ва ўқилиши, бош хамда кичик харфлари йўқлиги, хар бир харф алохида, сўз бошида, ўртаси ва охирида келадиган шаклларга эга эканлиги жихатидан фарқ қилади.",
    examples: [
      "ا",
      "ب",
      "ت",
      "ث",
      "ج",
      "ح",
      "خ",
      "د",
      "ذ",
      "ر",
      "ز",
      "س",
      "ش",
      "ص",
      "ض",
      "ط",
      "ظ",
      "ع",
      "غ",
      "ف",
      "ق",
      "ك",
      "ل",
      "م",
      "ن",
      "و",
      "ه",
      "لا",
      "ي",
    ],
    status: "verified",
  },
  {
    id: "alif",
    title: "«Alif» harfi va harakatlar",
    chapter: 1,
    page: 3,
    description: "Fatha, kasra va damma",
    explanation:
      "Унли товушларни ифода этувчи белгилар «харакат» дейилади. Харакатлар ўзбек тилидаги «а», «и», «у» унлилари каби талаффуз этилади. Алиф харфи шу харакатлар билан «а», «и», «у» товушларини ифодалайди.",
    examples: ["اَ", "اِ", "اُ"],
    status: "verified",
  },
  {
    id: "ro",
    title: "«Ro» harfi",
    chapter: 1,
    page: 3,
    description: "Tafxim va tarqiq",
    explanation:
      "«Ро» харфининг талаффузи ўзбек тилидаги «р» товуши кабидир. Бу ундош касра билан келганда ингичкароқ қилиб ўқилади, бу тарқиқ дейилади. Фатха ёки замма билан келганда йўғонроқ талаффуз этилади, бу тафхим деб аталади. «Ро» харфи фатхали бўлиб келганда, «ро» деб ўқилади.",
    examples: ["رَ", "رِ", "رُ"],
    status: "verified",
  },
  ...[
    ["za", "«Za» harfi", 4],
    ["mim", "«Mim» harfi", 4],
    ["ta", "«Ta» harfi", 5],
    ["nun", "«Nun» harfi", 5],
    ["ya", "«Ya» harfi", 6],
    ["ba", "«Ba» harfi", 6],
    ["kaf", "«Kaf» harfi", 7],
    ["lam", "«Lam» harfi", 8],
    ["vav", "«Vav» harfi", 8],
    ["ha-first", "«Ha» harfi", 9],
    ["fa", "«Fa» harfi", 9],
    ["qof", "«Qof» harfi", 10],
    ["shin", "«Shin» harfi", 11],
    ["sin", "«Sin» harfi", 11],
    ["sa", "«Sa» harfi", 12],
    ["sod", "«Sod» harfi", 13],
    ["to", "«To» harfi", 13],
    ["jim", "«Jim» harfi", 14],
    ["xo", "«Xo» harfi", 15],
    ["ha", "«Ha» harfi", 15],
    ["ghayn", "«G‘ayn» harfi", 16],
    ["ayn", "«Ayn» harfi", 17],
    ["dal", "«Dal» harfi", 17],
    ["zod", "«Zod» harfi", 18],
    ["zal", "«Zal» harfi", 19],
    ["zo", "«Zo» harfi", 19],
  ].map(([id, title, page]) => ({
    id: String(id),
    title: String(title),
    page: Number(page),
    chapter: 1,
    description: "Harflar va talaffuz mashqlari",
    examples: [],
    status: "review" as const,
  })),
  ...[
    ["madd", "Mad harflari", 21, 2],
    ["tashdid", "Tashdid", 25, 2],
    ["tanwin", "Tanvin", 27, 2],
    ["tanwin-tashdid", "Tanvinli tashdid", 29, 2],
    ["hamza", "Alif va hamza", 29, 2],
    ["marbuta", "Toi marbuta", 32, 2],
    ["special-spelling", "Maxsus yozilish va o‘qilish qoidalari", 32, 2],
    ["wasl", "Vasl", 36, 3],
    ["waqf", "Vaqf (to‘xtash)", 37, 3],
    ["idgham", "Idg‘om", 38, 3],
    ["iqlab", "Iqlob", 39, 3],
    ["iman", "Imon kalimalari", 40, 4],
    ["istila", "Isti’lo va qalqala", 44, 3],
    ["ikhfa", "Ixfo va izhor", 46, 3],
    ["madd-types", "Mad turlari", 47, 3],
    ["lam-types", "Quyosh va oy lomi", 48, 3],
    ["madd-lin", "Mad lin", 51, 3],
    ["allah-lafz", "«Alloh» lafzi", 51, 3],
    ["ro-rules", "«Ro» harfi: tafxim va tarqiq", 52, 3],
    ["makharij", "Harflarning maxrajlari", 54, 3],
    ["khatm", "Xatmi Qur’on duosi", 55, 4],
  ].map(([id, title, page, chapter]) => ({
    id: String(id),
    title: String(title),
    page: Number(page),
    chapter: Number(chapter),
    description: "Muallimi Soniy kitobidan",
    examples: [],
    status: "review" as const,
  })),
];
export const chapters = [
  {
    id: 1,
    title: "Arab alifbosi",
    subtitle: "Harflar bilan ilk tanishuv",
    symbol: "ا",
    tone: "blue",
  },
  {
    id: 2,
    title: "Harakatlar va o‘qish",
    subtitle: "To‘g‘ri o‘qish sari bir qadam",
    symbol: "بَ",
    tone: "coral",
  },
  {
    id: 3,
    title: "Tajvid asoslari",
    subtitle: "Talaffuz va o‘qish qoidalari",
    symbol: "ع",
    tone: "teal",
  },
  { id: 4, title: "Imon va duolar", subtitle: "Kalimalar va duolar", symbol: "م", tone: "gold" },
];
export type Question = { prompt: string; options: string[]; answer: number; page: number };
export const questions: Question[] = [
  { prompt: "«Alif» harfini toping.", options: ["ب", "ا", "ر", "م"], answer: 1, page: 2 },
  { prompt: "«Ro» harfini toping.", options: ["ز", "د", "ر", "و"], answer: 2, page: 3 },
  {
    prompt: "Fatha bilan yozilgan alifni toping.",
    options: ["اِ", "اُ", "اَ"],
    answer: 2,
    page: 3,
  },
  {
    prompt: "Kasra bilan yozilgan alifni toping.",
    options: ["اُ", "اَ", "اِ"],
    answer: 2,
    page: 3,
  },
  {
    prompt: "Damma bilan yozilgan alifni toping.",
    options: ["اُ", "اِ", "اَ"],
    answer: 0,
    page: 3,
  },
];
export function scoreAnswers(answers: number[]) {
  return answers.reduce(
    (total, answer, index) => total + (questions[index]?.answer === answer ? 1 : 0),
    0,
  );
}
export function clampZoom(value: number) {
  return Math.max(0, Math.min(4, value));
}
