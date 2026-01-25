"use client";

import { useMemo, useState } from "react";
import type { Question } from "./type";

function classify(score: number, total: number) {
  const pct = total ? score / total : 0;
  if (pct <= 0.4) return {
    label: "ضعيف",
    emoji: "📚",
    hint: "لا تقلق! كل رحلة تبدأ بخطوة. ننصحك بخطة تأسيس مركزة تبني أساساتك بشكل صحيح."
  };
  if (pct <= 0.75) return {
    label: "متوسط",
    emoji: "💪",
    hint: "أنت في الطريق الصحيح! تحتاج لتدريب مستمر وتجميعات منتظمة لتصل للمستوى المتقدم."
  };
  return {
    label: "متقدم",
    emoji: "🏆",
    hint: "مستواك ممتاز! ركز على التجميعات الحديثة وزيادة السرعة في الحل."
  };
}

export default function QuizClient({ questions, buyUrl }: { questions: Question[]; buyUrl: string }) {
  const total = questions.length;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const current = questions[step];

  const score = useMemo(() => {
    let s = 0;
    for (const q of questions) {
      const a = (answers[q.id] ?? "").trim();
      if (a && a === q.correct.trim()) s++;
    }
    return s;
  }, [answers, questions]);

  const result = classify(score, total);
  const progressPercent = total ? Math.round(((step) / total) * 100) : 0;

  if (!total) {
    return (
      <div className="container">
        <div className="card card-body empty-state animate-fade-in">
          <div className="empty-icon">📋</div>
          <h2>لا توجد أسئلة متاحة</h2>
          <p className="text-muted">
            تأكد من أن الـ API يعمل بشكل صحيح وأن البيانات متوفرة.
          </p>
          <a className="btn btn-ghost mt-3" href="/">
            العودة للرئيسية
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="navbar">
        <a className="btn btn-ghost" href="/">
          <span>→</span>
          العودة
        </a>
        <div className="badge">
          <span>📝</span>
          السؤال {step + 1} من {total}
        </div>
      </header>

      <div className="card card-body animate-fade-in">
        {!done ? (
          <>
            {/* Progress */}
            <div className="progress-container">
              <div className="progress-info">
                <span>التقدم</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div key={step} className="animate-slide-in">
              <h2 className="question-text">{current.text}</h2>
            </div>

            {/* Options */}
            <div className="options-grid">
              {current.options.map((opt, index) => {
                const selected = answers[current.id] === opt;
                return (
                  <button
                    key={opt}
                    className={`option-btn ${selected ? 'selected' : ''}`}
                    onClick={() => setAnswers((a) => ({ ...a, [current.id]: opt }))}
                  >
                    <span className="option-radio"></span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="quiz-nav">
              <button
                className="btn btn-ghost"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                <span>←</span>
                السابق
              </button>

              <button
                className="btn btn-primary"
                disabled={!answers[current.id]}
                onClick={() => {
                  if (step + 1 >= total) setDone(true);
                  else setStep((s) => s + 1);
                }}
              >
                {step + 1 >= total ? (
                  <>
                    <span>🎯</span>
                    عرض النتيجة
                  </>
                ) : (
                  <>
                    التالي
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="result-container animate-fade-in">
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
              {result.emoji}
            </div>

            <div className="result-score">
              <span className="score-current">{score}</span>
              <span className="score-total"> / {total}</span>
            </div>

            <div className="result-label">
              مستواك: {result.label}
            </div>

            <p className="result-hint">
              {result.hint}
            </p>

            <div className="result-actions">
              <a
                className="btn btn-success btn-lg"
                href={buyUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>🛒</span>
                احصل على الخطة المناسبة
              </a>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                  setDone(false);
                }}
              >
                <span>🔄</span>
                أعد الاختبار
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer" style={{ marginTop: '40px', borderTop: 'none' }}>
        <p className="text-muted">
          Powered by <a href="https://preparacademy.com" target="_blank" rel="noreferrer">PrepAcademy</a>
        </p>
      </footer>
    </div>
  );
}
