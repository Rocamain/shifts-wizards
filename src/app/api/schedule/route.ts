import { NextRequest, NextResponse } from "next/server";

type WindowEntry = { timestamps: number[] };
const WINDOW_SIZE = 60_000; // 60 seconds in milliseconds
const MAX_REQUESTS = 10;
const rateMap = new Map<string, WindowEntry>();

function isAllowed(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { timestamps: [] };

  // Drop timestamps older than WINDOW_SIZE
  entry.timestamps = entry.timestamps.filter((ts) => ts > now - WINDOW_SIZE);

  if (entry.timestamps.length >= MAX_REQUESTS) {
    // Too many requests in the current window
    return false;
  }

  // Record this request
  entry.timestamps.push(now);
  rateMap.set(ip, entry);
  return true;
}

export async function POST(req: NextRequest) {
  // Only apply rate limiting in production
  if (process.env.NODE_ENV === "production") {
    const xff = req.headers.get("x-forwarded-for") || "";
    const ip =
      xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

    if (!isAllowed(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  // Proxy the request to your Flask backend
  const body = await req.json();
  const resp = await fetch(`${process.env.FLASK_URL}/api/schedule`, {
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
