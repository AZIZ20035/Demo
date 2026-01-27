import QuizClient from "@/components/QuizClient";
import { mapRowToQuestion, type SheetRow } from "@/components/type";

export default async function ExamStartPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl ?? ""}/api/questions`, { cache: "no-store" });
    const json = await res.json();

    const rows: SheetRow[] = Array.isArray(json?.data) ? json.data : [];
    const questions = rows.map(mapRowToQuestion).filter(q => q.text && q.options.length === 4);

    // DEBUG: Log questions with images
    const questionsWithImages = questions.filter(q => q.imageUrl);
    console.log("=== DEBUG: Questions with imageUrl ===");
    console.log("Total questions:", questions.length);
    console.log("Questions with images:", questionsWithImages.length);
    questionsWithImages.forEach((q, i) => {
        console.log(`Question ${q.id}: ${q.text.substring(0, 40)}... → imageUrl: ${q.imageUrl}`);
    });
    console.log("=== END DEBUG ===");

    const buyUrl = "https://preparacademy.com/";

    return <QuizClient questions={questions} buyUrl={buyUrl} />;
}
