export type SheetRow = Record<string, any>;

export type Question = {
  id: string;
  text: string;
  options: string[];
  correct: string; // هنقارن بالنص
  image?: string; // رابط الصورة الاختياري
};

export function mapRowToQuestion(row: SheetRow, index: number): Question {
  const text = String(row["السؤال"] ?? "").trim();

  const options = [
    row["الاختيار الأول"],
    row["الاختيار الثاني"],
    row["الاختيار الثالث"],
    row["الاختيار الرابع"],
  ].map(v => String(v ?? "").trim()).filter(Boolean);

  const correct = String(row["الاختيار الصحيح"] ?? "").trim();
  const image = String(row["الصورة"] ?? "").trim();

  return {
    id: String(index + 1),
    text,
    options,
    correct,
    image: image || undefined,
  };
}
