import { NextResponse } from "next/server";
import { SyncService } from "@/lib/services/sync";

export async function GET(request: Request) {
  return handleCronSync(request);
}

export async function POST(request: Request) {
  return handleCronSync(request);
}

async function handleCronSync(request: Request) {
  const cronSecret = process.env.CRON_SECRET || "portfolio_cron_secret_key_2026";
  const { searchParams } = new URL(request.url);
  const secretParam = searchParams.get("secret");
  const authHeader = request.headers.get("authorization");

  // Vercel Cron header or token check
  const isVercelCron = request.headers.get("x-vercel-cron") === "1";
  const isValidAuth =
    isVercelCron ||
    secretParam === cronSecret ||
    authHeader === `Bearer ${cronSecret}`;

  if (!isValidAuth) {
    return NextResponse.json({ error: "Unauthorized cron request" }, { status: 401 });
  }

  try {
    const startTime = Date.now();
    const result = await SyncService.syncAll();
    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: "Cron sync executed successfully",
      durationMs,
      github: {
        totalRepositories: result.github.totalRepositories,
        starredRepositories: result.github.starredRepositories,
        totalContributions: result.github.totalContributions,
      },
      leetcode: {
        totalSolved: result.leetcode.totalSolved,
        totalActiveDays: result.leetcode.totalActiveDays,
      },
      lastSyncedAt: result.lastSyncedAt,
    });
  } catch (err: any) {
    console.error("Cron sync execution failed:", err);
    return NextResponse.json(
      { error: "Cron sync failed", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
