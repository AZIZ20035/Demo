"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { Question } from "./type";
import ThemeToggle from "./ThemeToggle";
import {
    IconClock,
    IconStar,
    IconCheck,
    IconX,
    IconAlertCircle,
    IconIdea,
    IconRocket,
    IconBook,
    IconChart,
    IconTarget,
    IconBolt
} from "./Icons";

// --- Premium Components ---

const AnimatedScoreCounter = ({ value, duration = 1500 }: { value: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    useEffect(() => {
        let startTime: number | null = null;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentCount = Math.floor(progress * value);

            if (currentCount !== countRef.current) {
                setCount(currentCount);
                countRef.current = currentCount;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return <span>{count}</span>;
}

const ConfettiEffect = () => {
    return (
        <div className="confetti-container" aria-hidden="true">
            {[...Array(50)].map((_, i) => (
                <div
                    key={i}
                    className="confetti-piece"
                    style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: i % 2 === 0 ? 'var(--brand-primary)' : 'var(--accent-success)',
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}
                />
            ))}
        </div>
    );
};

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

    useEffect(() => {
        setUserAnswers(
            questions.map((q) => ({
                questionId: q.id,
                selectedAnswer: null,
            }))
        );
    }, [questions]);

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
        if (percentage >= 80) return { text: "ممتاز!", class: "excellent" };
        if (percentage >= 60) return { text: "جيد جداً", class: "good" };
        if (percentage >= 40) return { text: "متوسط", class: "average" };
        return { text: "يحتاج تحسين", class: "needs-improvement" };
    }, [getScorePercentage]);

    if (questions.length === 0) {
        return (
            <div className="container">
                <div className="empty-state">
                    <div className="empty-icon"><IconAlertCircle /></div>
                    <h2>لا توجد أسئلة متاحة حالياً</h2>
                    <p>يرجى المحاولة لاحقاً</p>
                </div>
            </div>
        );
    }

    if (isFinished) {
        const score = calculateScore();
        const scoreLabel = getScoreLabel();
        const percentage = getScorePercentage();
        const isHighScore = percentage >= 80;

        return (
            <div className="container">
                <header className="navbar">
                    <a href="/#about" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="logo-icon"><IconBook /></div>
                        <span>Prepar Academy</span>
                    </a>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <ThemeToggle />
                    </div>
                </header>

                {isHighScore && <ConfettiEffect />}
                <div className="card card-body result-container animate-reveal-pop shadow-glow">
                    <div className="result-score animate-slide-up stagger-1">
                        <span className="score-current">
                            <AnimatedScoreCounter value={score} />
                        </span>
                        <span className="score-total">/{questions.length}</span>
                    </div>
                    <div className={`result-label ${scoreLabel.class} animate-pulse-soft stagger-2`}>
                        {scoreLabel.text}
                    </div>
                    <p className="result-hint animate-fade-in stagger-3">
                        {percentage >= 60
                            ? "أداء رائع! استمر في التطوير والتدريب للوصول للقمة."
                            : "لا تقلق! مع التدريب المستمر ستتحسن نتيجتك بشكل ملحوظ."}
                    </p>
                    <div className="result-actions animate-fade-in stagger-4">
                        <button
                            className="btn btn-primary btn-animate"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            <IconChart />
                            <span>{showDetails ? "إخفاء التفاصيل" : "عرض التفاصيل"}</span>
                        </button>
                        <a className="btn btn-success btn-animate" href={buyUrl} target="_blank" rel="noreferrer">
                            <IconRocket />
                            <span>احصل على الدورة الكاملة</span>
                        </a>
                        <a className="btn btn-ghost btn-animate" href="/">
                            <IconBook />
                            <span>العودة للرئيسية</span>
                        </a>
                    </div>

                    {showDetails && (
                        <div className="exam-details animate-slide-up">
                            <h3 className="details-title">
                                <IconCheck />
                                <span>تفاصيل الإجابات</span>
                            </h3>
                            <div className="details-list">
                                {questions.map((q, idx) => {
                                    const userAnswer = userAnswers[idx]?.selectedAnswer;
                                    const isCorrect = userAnswer === q.correct;
                                    const isUnanswered = !userAnswer;
                                    const staggerClass = idx < 4 ? `stagger-${idx + 1}` : '';

                                    return (
                                        <div
                                            key={q.id}
                                            className={`detail-card ${isCorrect ? "correct animate-check" : isUnanswered ? "unanswered" : "wrong animate-shake"} animate-fade-in ${staggerClass}`}
                                        >
                                            <div className="detail-header">
                                                <span className="detail-number">سؤال {idx + 1}</span>
                                                <span className={`detail-status ${isCorrect ? "correct" : isUnanswered ? "unanswered" : "wrong"}`}>
                                                    {isCorrect ? <IconCheck /> : isUnanswered ? <IconAlertCircle /> : <IconX />}
                                                    <span>{isCorrect ? "صحيح" : isUnanswered ? "لم تُجب" : "خطأ"}</span>
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

    const currentQuestion = questions[currentIndex];
    const currentAnswer = userAnswers[currentIndex]?.selectedAnswer;
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const isLowTime = timeLeft <= 10;

    return (
        <div className="container">
            <header className="navbar">
                <div className="logo">
                    <div className="logo-icon"><IconBook /></div>
                    <span>PrepAcademy</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div className={`exam-timer ${isLowTime ? "low-time" : ""}`}>
                        <span className="timer-icon"><IconClock /></span>
                        <span className="timer-value">{formatTime(timeLeft)}</span>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

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

            <div className="card card-body animate-fade-scale">
                <p className="question-text">{currentQuestion.text}</p>

                <div className="options-grid">
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            className={`option-btn hover-lift press-scale ${currentAnswer === option ? "selected" : ""}`}
                            onClick={() => handleSelectAnswer(option)}
                        >
                            <span className="option-radio" />
                            <span>{option}</span>
                        </button>
                    ))}
                </div>

                <div className="quiz-nav">
                    <button
                        className="btn btn-ghost btn-animate"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        السابق
                    </button>

                    {currentIndex === questions.length - 1 ? (
                        <button className="btn btn-success btn-animate" onClick={handleSubmit}>
                            <IconCheck />
                            <span>إنهاء الاختبار</span>
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-animate" onClick={handleNext}>
                            <span>التالي</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
