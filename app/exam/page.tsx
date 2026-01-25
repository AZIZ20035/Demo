import ExamFlow from "@/components/ExamFlow";

export default function ExamPage() {
  const buyUrl = "https://preparacademy.com/";

  // No server-side fetching - ExamFlow handles it client-side in parallel with countdown
  return (
    <div className="animate-fade-in">
      <ExamFlow buyUrl={buyUrl} />
    </div>
  );
}
