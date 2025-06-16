import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
});

export async function POST(req: NextRequest) {
  // Only apply rate limiting in production
  if (process.env.NODE_ENV === "production") {
    const xff = req.headers.get("x-forwarded-for") || "";
    const ip =
      xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const { success } = await limiter.limit(ip);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  const body = await req.json();
  const resp = await fetch(process.env.FLASK_URL + "/api/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.FLASK_SECRET_KEY!,
    },
    body: JSON.stringify(body),
  });

  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}
