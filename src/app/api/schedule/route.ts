import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 10, // 10 points
  duration: 60, // per 60 seconds
});

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const xff = req.headers.get("x-forwarded-for") || "";
    const ip =
      xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    try {
      await limiter.consume(ip);
    } catch {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  // …your existing proxy logic…
}
