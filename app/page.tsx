import ThemeToggle from "@/components/ThemeToggle";
import { IconBook, IconClock, IconTarget, IconBolt, IconChart, IconRocket, IconIdea, IconSearch } from "@/components/Icons";

export default function Home() {
    return (
        <div className="container">
            {/* Header */}
            <header className="navbar">
                <a href="#about" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="logo-icon">
                        <img src="/Logo.jfif" alt="Logo" />
                    </div>
                    <span>preparacademy</span>
                </a>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div className="badge animate-pulse-soft">
                        <span className="badge-icon"><IconClock /></span>
                        20 سؤال • 10 دقائق
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-logo">
                    <img src="/Logo.jfif" alt="" />
                </div>
                <h1 className="animate-slide-up">اختبار تحديد المستوى</h1>
                <p className="hero-subtitle animate-slide-up stagger-1">
                    اكتشف مستواك الحقيقي في القدرات خلال دقائق معدودة. اختبار مصمم بعناية
                    ليساعدك على فهم نقاط قوتك وتحديد المسار الأمثل لتطويرك.
                </p>
                <div className="hero-actions animate-fade-scale stagger-2">
                    <a className="btn btn-primary btn-lg btn-animate" href="/exam">
                        <IconRocket />
                        <span>ابدأ الاختبار الآن</span>
                    </a>
                    <a className="btn btn-ghost btn-lg btn-animate" href="#features">
                        <IconIdea />
                        <span>كيف يعمل؟</span>
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-grid">
                <article className="card feature-card animate-slide-up hover-lift stagger-1">
                    <div className="feature-icon"><IconTarget /></div>
                    <h3>تحليل دقيق</h3>
                    <p>
                        أسئلة مختارة بعناية تقيس مستواك الفعلي في القدرات الكمية واللفظية
                        بناءً على معايير الاختبار الحقيقي.
                    </p>
                </article>

                <article className="card feature-card animate-slide-up hover-lift stagger-2">
                    <div className="feature-icon"><IconBolt /></div>
                    <h3>نتائج فورية</h3>
                    <p>
                        احصل على تقييم شامل لأدائك فور انتهاء الاختبار مع تصنيف واضح
                        لمستواك (ضعيف / متوسط / متقدم).
                    </p>
                </article>

                <article className="card feature-card animate-slide-up hover-lift stagger-3">
                    <div className="feature-icon"><IconChart /></div>
                    <h3>خطة مخصصة</h3>
                    <p>
                        نوصيك بالمسار المناسب لك بناءً على نتيجتك، سواء كنت بحاجة
                        لتأسيس أو تدريب مكثف أو مراجعة سريعة.
                    </p>
                </article>
            </section>

            {/* How It Works */}
            <section className="card card-body mt-4 hover-interactive">
                <h2 className="mb-2"><IconSearch /> كيف يعمل الاختبار؟</h2>
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
                        <h3 className="mb-1">مميزات الاختبار</h3>
                        <ul className="text-muted" style={{ paddingInlineStart: '20px', lineHeight: '2' }}>
                            <li>متوافق مع جميع الأجهزة</li>
                            <li>واجهة سهلة وسلسة</li>
                            <li>تحديث مستمر للأسئلة</li>
                            <li>نتائج واضحة وقابلة للمشاركة</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="about" className="card card-body mt-4 animate-slide-up stagger-4 hover-interactive">
                <div className="grid grid-2" style={{ gap: '48px', alignItems: 'center' }}>
                    <div className="card" style={{ padding: '32px', background: 'var(--brand-gradient)', color: 'white' }}>
                        <h2 className="mb-2" style={{ color: 'white' }}>عن preparacademy</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '2', opacity: '0.9' }}>
                            preparacademy منصة تعليمية متخصصة تقدم ملفات شاملة ومتكاملة،
                            مصممة لتسهيل عملية التعلم وتحقيق أفضل النتائج، من خلال محتوى مركز
                            وبسيط يساعد الطلاب والمتعلمين على توفير الوقت والجهد.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2">رسالتنا التعليمية</h3>
                        <p className="text-muted" style={{ lineHeight: '1.8', marginBottom: '20px' }}>
                            نحن نؤمن بأن التعليم يجب أن يكون بسيطاً وفعالاً. مهمتنا هي تمكين الطلاب من الوصول إلى أهدافهم الدراسية من خلال أدوات تقييم دقيقة ومحتوى تعليمي عالي الجودة.
                        </p>
                        <ul className="text-muted" style={{ paddingInlineStart: '20px', lineHeight: '2' }}>
                            <li>التميز في المحتوى الرقمي</li>
                            <li>توفير وقت وجهد المتعلم</li>
                            <li>دعم مستمر للطلاب</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="card card-highlight card-body mt-4 animate-fade-scale hover-interactive" style={{ textAlign: 'center' }}>
                <h2 className="mb-1">مستعد لتعرف مستواك؟</h2>
                <p className="text-muted mb-3">
                    ابدأ الآن واكتشف أين تقف، الخطوة الأولى نحو التفوق تبدأ من هنا.
                </p>
                <a className="btn btn-success btn-lg btn-animate" href="/exam">
                    <IconRocket />
                    <span>ابدأ الاختبار مجاناً</span>
                </a>
            </section>
        </div>
    );
}
