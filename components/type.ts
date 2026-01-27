export type SheetRow = Record<string, any>;

export type Question = {
  id: string;
  text: string;
  options: string[];
  correct: string;
  imageUrl?: string;
};

/**
 * Transforms a Google Drive view link to a direct image URL.
 * Example: https://drive.google.com/file/d/1zQQsKF7eyZmS3UkIlDr1VZfxJo_fejsA/view?usp=sharing
 * to: https://drive.google.com/uc?export=view&id=1zQQsKF7eyZmS3UkIlDr1VZfxJo_fejsA
 */
function getDirectImageUrl(url: string): string {
  if (!url) return "";
  const match = url.match(/\/d\/([^/]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

export function mapRowToQuestion(row: SheetRow, index: number): Question {
  const text = String(row["السؤال"] ?? "").trim();

  const options = [
    row["الاختيار الأول"],
    row["الاختيار الثاني"],
    row["الاختيار الثالث"],
    row["الاختيار الرابع"],
  ].map(v => String(v ?? "").trim()).filter(Boolean);

  const correct = String(row["الاختيار الصحيح"] ?? "").trim();

  // جلب آخر قيمة في الصف كـ URL صورة إذا كانت موجودة
  const keys = Object.keys(row);
  const lastKey = keys[keys.length - 1];
  const lastValue = String(row[lastKey] ?? "").trim();
  const imageUrl = lastValue.startsWith("http") ? getDirectImageUrl(lastValue) : undefined;

  return {
    id: String(index + 1),
    text,
    options,
    correct,
    imageUrl,
  };
}
