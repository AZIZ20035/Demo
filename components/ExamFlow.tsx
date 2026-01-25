"use client";

import { useEffect, useState } from "react";
import type { Question } from "./type";
import QuizClient from "./QuizClient";

type ExamFlowProps = {
    buyUrl: string;
};

export default function ExamFlow({ buyUrl }: ExamFlowProps) {
    const [phase, setPhase] = useState<"countdown" | "quiz">("countdown");
    const [count, setCount] = useState(3);
    const [showReady, setShowReady] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch questions in background while countdown is running
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch("/api/questions");
                const json = await res.json();

                if (Array.isArray(json?.data)) {
                    const mappedQuestions = json.data
                        .map((row: Record<string, string>, index: number) => {
                            const text = String(row["السؤال"] ?? "").trim();
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
                                options,
                                correct,
                            };
                        })
                        .filter((q: Question) => q.text && q.options.length === 4);

                    setQuestions(mappedQuestions);
                }
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Countdown timer
    useEffect(() => {
        if (phase !== "countdown") return;

        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (count === 0 && !showReady) {
            setShowReady(true);
            const readyTimer = setTimeout(() => {
                // Only start quiz when questions are loaded
                if (!isLoading) {
                    setPhase("quiz");
                }
            }, 600);
            return () => clearTimeout(readyTimer);
        }
    }, [count, showReady, phase, isLoading]);

    // Start quiz when both countdown finished AND questions loaded
    useEffect(() => {
        if (showReady && !isLoading && phase === "countdown") {
            const timer = setTimeout(() => {
                setPhase("quiz");
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [showReady, isLoading, phase]);

    // Show countdown
    if (phase === "countdown") {
        return (
            <div className="countdown-container">
                {!showReady ? (
                    <>
                        <div key={count} className="countdown-number">
                            {count}
                        </div>
                        <p className="countdown-text">استعد للاختبار...</p>
                    </>
                ) : (
                    <>
                        <div className="countdown-ready">انطلق! 🚀</div>
                        <p className="countdown-text">
                            {isLoading ? "جاري تحميل الأسئلة..." : "جاري البدء..."}
                        </p>
                    </>
                )}
            </div>
        );
    }

    // Show quiz directly - questions already loaded!
    return <QuizClient questions={questions} buyUrl={buyUrl} />;
}
