export default function Home() {
  return (
    <div className="container">
      {/* Header */}
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">📚</div>
          <span>PrepAcademy</span>
        </div>
        <div className="badge">
          <span className="badge-icon">⏱️</span>
          20 سؤال • 5-8 دقائق
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>اختبار تحديد المستوى</h1>
        <p className="hero-subtitle">
          اكتشف مستواك الحقيقي في القدرات خلال دقائق معدودة. اختبار مصمم بعناية
          ليساعدك على فهم نقاط قوتك وتحديد المسار الأمثل لتطويرك.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary btn-lg" href="/exam">
            <span>🚀</span>
            ابدأ الاختبار الآن
          </a>
          <a className="btn btn-ghost btn-lg" href="#features">
            <span>💡</span>
            كيف يعمل؟
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-grid">
        <article className="card feature-card animate-fade-in">
          <div className="feature-icon">🎯</div>
          <h3>تحليل دقيق</h3>
          <p>
            أسئلة مختارة بعناية تقيس مستواك الفعلي في القدرات الكمية واللفظية
            بناءً على معايير الاختبار الحقيقي.
          </p>
        </article>

        <article className="card feature-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="feature-icon">⚡</div>
          <h3>نتائج فورية</h3>
          <p>
            احصل على تقييم شامل لأدائك فور انتهاء الاختبار مع تصنيف واضح
            لمستواك (ضعيف / متوسط / متقدم).
          </p>
        </article>

        <article className="card feature-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="feature-icon">📈</div>
          <h3>خطة مخصصة</h3>
          <p>
            نوصيك بالمسار المناسب لك بناءً على نتيجتك، سواء كنت بحاجة
            لتأسيس أو تدريب مكثف أو مراجعة سريعة.
          </p>
        </article>
      </section>

      {/* How It Works */}
      <section className="card card-body mt-4">
        <h2 className="mb-2">🔍 كيف يعمل الاختبار؟</h2>
        <div className="grid grid-2" style={{ gap: '24px' }}>
          <div>
            <p className="text-muted" style={{ lineHeight: '1.9', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>خطوة 1:</strong> اضغط على "ابدأ الاختبار" وسيظهر عداد تنازلي قصير لتحضيرك.
            </p>
            <p className="text-muted" style={{ lineHeight: '1.9', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>خطوة 2:</strong> أجب على كل سؤال باختيار الإجابة الصحيحة، ثم اضغط "التالي".
            </p>
            <p className="text-muted" style={{ lineHeight: '1.9' }}>
              <strong style={{ color: 'var(--text-primary)' }}>خطوة 3:</strong> بعد الانتهاء، ستظهر نتيجتك مع توصية مخصصة لك.
            </p>
          </div>
          <div className="card" style={{ padding: '20px', background: 'var(--bg-glass)' }}>
            <h3 className="mb-1">✨ مميزات الاختبار</h3>
            <ul className="text-muted" style={{ paddingInlineStart: '20px', lineHeight: '2' }}>
              <li>متوافق مع جميع الأجهزة</li>
              <li>واجهة سهلة وسلسة</li>
              <li>تحديث مستمر للأسئلة</li>
              <li>نتائج واضحة وقابلة للمشاركة</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="card card-highlight card-body mt-4" style={{ textAlign: 'center' }}>
        <h2 className="mb-1">مستعد لتعرف مستواك؟</h2>
        <p className="text-muted mb-3">
          ابدأ الآن واكتشف أين تقف، الخطوة الأولى نحو التفوق تبدأ من هنا.
        </p>
        <a className="btn btn-success btn-lg" href="/exam">
          <span>✨</span>
          ابدأ الاختبار مجاناً
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          جميع الحقوق محفوظة © 2026 |
          <a href="https://preparacademy.com" target="_blank" rel="noreferrer"> PrepAcademy</a>
        </p>
      </footer>
    </div>
  );
}
