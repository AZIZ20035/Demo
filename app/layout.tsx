import "./globals.css";

export const metadata = {
  title: "اختبار تحديد المستوى",
  description: "اختبار قصير لتحديد مستوى القدرات",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
