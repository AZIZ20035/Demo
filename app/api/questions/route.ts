import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.QUESTIONS_API_URL;
  if (!url) {
    return NextResponse.json({ ok: false, error: "Missing QUESTIONS_API_URL" }, { status: 500 });
  }

  const res = await fetch(url, {
    // caching بسيط: يحدث كل 10 دقايق
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Upstream fetch failed" }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
