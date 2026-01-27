export type SheetRow = Record<string, any>;

export type Question = {
  id: string;
  text: string;
  options: string[];
  correct: string; // هنقارن بالنص
  imageUrl?: string;
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

  // معالجة رابط الصورة
  let imageUrl: string | undefined = undefined;
  const rawImageUrl = row["صورة السؤال"] ?? row["Image"] ?? row["صورة"];
  if (rawImageUrl && String(rawImageUrl).trim()) {
    const urlStr = String(rawImageUrl).trim();
    // تحويل روابط Google Drive للصيغة المباشرة
    const driveMatch = urlStr.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      imageUrl = `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
    } else {
      imageUrl = urlStr;
    }
  }

  return {
    id: String(index + 1),
    text,
    options,
    correct,
    imageUrl,
  };
}
