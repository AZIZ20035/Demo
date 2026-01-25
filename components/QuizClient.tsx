"use client";

import { useEffect, useState, useCallback } from "react";
import type { Question } from "./type";

// Timer duration in seconds (default: 60 seconds = 1 minute)
const EXAM_DURATION_SECONDS = 60;

type QuizClientProps = {
    questions: Question[];
    buyUrl: string;
};

type UserAnswer = {
    questionId: string;
    selectedAnswer: string | null;
};

export default function QuizClient({ questions, buyUrl }: QuizClientProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);

    // Initialize answers array
    useEffect(() => {
        setUserAnswers(
            questions.map((q) => ({
                questionId: q.id,
                selectedAnswer: null,
            }))
        );
    }, [questions]);

    // Timer countdown
    useEffect(() => {
        if (isFinished || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isFinished, timeLeft]);

    // Auto-submit when timer ends
    useEffect(() => {
        if (timeLeft === 0 && !isFinished) {
            setIsFinished(true);
        }
    }, [timeLeft, isFinished]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleSelectAnswer = useCallback((answer: string) => {
        setUserAnswers((prev) =>
            prev.map((ua, idx) =>
                idx === currentIndex ? { ...ua, selectedAnswer: answer } : ua
            )
        );
    }, [currentIndex]);

    const handleNext = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    }, [currentIndex, questions.length]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    }, [currentIndex]);

    const handleSubmit = useCallback(() => {
        setIsFinished(true);
    }, []);

    // Calculate score
    const calculateScore = useCallback(() => {
        let correct = 0;
        questions.forEach((q, idx) => {
            const userAnswer = userAnswers[idx]?.selectedAnswer;
            if (userAnswer && userAnswer === q.correct) {
                correct++;
            }
        });
        return correct;
    }, [questions, userAnswers]);

    const getScorePercentage = useCallback(() => {
        const score = calculateScore();
        return Math.round((score / questions.length) * 100);
    }, [calculateScore, questions.length]);

    const getScoreLabel = useCallback(() => {
        const percentage = getScorePercentage();
        if (percentage >= 80) return { text: "ممتاز! 🌟", class: "excellent" };
        if (percentage >= 60) return { text: "جيد جداً 👍", class: "good" };
        if (percentage >= 40) return { text: "متوسط 📚", class: "average" };
        return { text: "يحتاج تحسين 💪", class: "needs-improvement" };
    }, [getScorePercentage]);

    // Empty state
    if (questions.length === 0) {
        return (
            <div className="container">
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h2>لا توجد أسئلة متاحة حالياً</h2>
                    <p>يرجى المحاولة لاحقاً</p>
                </div>
            </div>
        );
    }

    // Results view
    if (isFinished) {
        const score = calculateScore();
        const scoreLabel = getScoreLabel();

        return (
            <div className="container">
                <div className="card card-body result-container">
                    <div className="result-score">
                        <span className="score-current">{score}</span>
                        <span className="score-total">/{questions.length}</span>
                    </div>
                    <div className={`result-label ${scoreLabel.class}`}>
                        {scoreLabel.text}
                    </div>
                    <p className="result-hint">
                        {getScorePercentage() >= 60
                            ? "أداء رائع! استمر في التطوير والتدريب للوصول للقمة."
                            : "لا تقلق! مع التدريب المستمر ستتحسن نتيجتك بشكل ملحوظ."}
                    </p>
                    <div className="result-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            <span>{showDetails ? "🔼" : "🔽"}</span>
                            {showDetails ? "إخفاء التفاصيل" : "عرض التفاصيل"}
                        </button>
                        <a className="btn btn-success" href={buyUrl} target="_blank" rel="noreferrer">
                            <span>🚀</span>
                            احصل على الدورة الكاملة
                        </a>
                        <a className="btn btn-ghost" href="/">
                            <span>🏠</span>
                            العودة للرئيسية
                        </a>
                    </div>

                    {/* Exam Details Section */}
                    {showDetails && (
                        <div className="exam-details">
                            <h3 className="details-title">📋 تفاصيل الإجابات</h3>
                            <div className="details-list">
                                {questions.map((q, idx) => {
                                    const userAnswer = userAnswers[idx]?.selectedAnswer;
                                    const isCorrect = userAnswer === q.correct;
                                    const isUnanswered = !userAnswer;

                                    return (
                                        <div
                                            key={q.id}
                                            className={`detail-card ${isCorrect ? "correct" : isUnanswered ? "unanswered" : "wrong"}`}
                                        >
                                            <div className="detail-header">
                                                <span className="detail-number">سؤال {idx + 1}</span>
                                                <span className={`detail-status ${isCorrect ? "correct" : isUnanswered ? "unanswered" : "wrong"}`}>
                                                    {isCorrect ? "✓ صحيح" : isUnanswered ? "⊘ لم تُجب" : "✗ خطأ"}
                                                </span>
                                            </div>
                                            <p className="detail-question">{q.text}</p>
                                            <div className="detail-answers">
                                                {userAnswer && !isCorrect && (
                                                    <p className="user-answer">
                                                        <span className="answer-label">إجابتك:</span>
                                                        <span className="answer-text wrong">{userAnswer}</span>
                                                    </p>
                                                )}
                                                <p className="correct-answer">
                                                    <span className="answer-label">الإجابة الصحيحة:</span>
                                                    <span className="answer-text correct">{q.correct}</span>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Quiz view
    const currentQuestion = questions[currentIndex];
    const currentAnswer = userAnswers[currentIndex]?.selectedAnswer;
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const isLowTime = timeLeft <= 10;

    return (
        <div className="container">
            {/* Header with Timer */}
            <header className="navbar">
                <div className="logo">
                    <div className="logo-icon">📚</div>
                    <span>PrepAcademy</span>
                </div>
                <div className={`exam-timer ${isLowTime ? "low-time" : ""}`}>
                    <span className="timer-icon">⏱️</span>
                    <span className="timer-value">{formatTime(timeLeft)}</span>
                </div>
            </header>

            {/* Progress */}
            <div className="progress-container">
                <div className="progress-info">
                    <span>السؤال {currentIndex + 1} من {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="card card-body">
                <p className="question-text">{currentQuestion.text}</p>

                <div className="options-grid">
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            className={`option-btn ${currentAnswer === option ? "selected" : ""}`}
                            onClick={() => handleSelectAnswer(option)}
                        >
                            <span className="option-radio" />
                            <span>{option}</span>
                        </button>
                    ))}
                </div>

                {/* Navigation */}
                <div className="quiz-nav">
                    <button
                        className="btn btn-ghost"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        السابق
                    </button>

                    {currentIndex === questions.length - 1 ? (
                        <button className="btn btn-success" onClick={handleSubmit}>
                            <span>✓</span>
                            إنهاء الاختبار
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleNext}>
                            التالي
                            <span>←</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
