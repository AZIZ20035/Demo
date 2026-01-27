export type SheetRow = Record<string, any>;

export type Question = {
  id: string;
  text: string;
  image?: string;
  options: string[];
  correct: string; // هنقارن بالنص
};

export function mapRowToQuestion(row: SheetRow, index: number): Question {
  const text = String(row["السؤال"] ?? "").trim();
  const image = row["الصورة"] ? String(row["الصورة"]).trim() : undefined;

  const options = [
    row["الاختيار الأول"],
    row["الاختيار الثاني"],
    row["الاختيار الثالث"],
    row["الاختيار الرابع"],
  ].map(v => String(v ?? "").trim()).filter(Boolean);

  const correct = String(row["الاختيار الصحيح"] ?? "").trim();

  return {
    id: String(index + 1),
    text,
    image,
    options,
    correct,
  };
}
