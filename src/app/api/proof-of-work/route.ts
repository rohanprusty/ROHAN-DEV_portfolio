import { NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db/db";
import { SyncService } from "@/lib/services/sync";
import { profileData } from "@/data/profile";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isRefresh = searchParams.get("refresh") === "true";

  const syncSecret = process.env.SYNC_SECRET || "portfolio_sync_secret_key_2026";
  const cronSecret = process.env.CRON_SECRET || "portfolio_cron_secret_key_2026";
  const authHeader = request.headers.get("authorization");
  const secretParam = searchParams.get("secret");

  const isAuthorized =
    secretParam === syncSecret ||
    secretParam === cronSecret ||
    authHeader === `Bearer ${syncSecret}` ||
    authHeader === `Bearer ${cronSecret}`;

  // 1. Force refresh requested with valid secret
  if (isRefresh && isAuthorized) {
    try {
      const freshData = await SyncService.syncAll();
      return NextResponse.json(freshData);
    } catch (err: any) {
      console.error("Forced sync error:", err);
    }
  }

  // 2. Check memory cache first for sub-5ms response speed
  const cached = DatabaseService.getMemoryCache();
  if (cached && !isRefresh) {
    return NextResponse.json(cached);
  }

  // 3. Query PostgreSQL / Supabase DB
  const dbData = await DatabaseService.getProofOfWorkFromDB("rohanprusty");
  if (dbData) {
    return NextResponse.json(dbData);
  }

  // 4. First run / cold start: perform sync on-the-fly
  try {
    const liveData = await SyncService.syncAll();
    return NextResponse.json(liveData);
  } catch (err: any) {
    console.error("Live fetch fallback error:", err);

    // 5. Ultimate fallback if external APIs fail completely on initial load
    return NextResponse.json({
      github: {
        username: profileData.codingProfiles.github.username,
        totalRepositories: 20,
        publicRepositories: 20,
        privateRepositories: 0,
        starredRepositories: 37,
        followers: 4,
        following: 2,
        totalContributions: 842,
        currentStreak: 7,
        longestStreak: 23,
        lastUpdated: new Date().toISOString(),
        status: "stale",
        contributions: [],
      },
      leetcode: {
        username: profileData.codingProfiles.leetcode.username,
        totalSolved: 312,
        easySolved: 145,
        mediumSolved: 140,
        hardSolved: 27,
        ranking: 123456,
        contestRating: 1775,
        streak: 4,
        totalActiveDays: 126,
        lastUpdated: new Date().toISOString(),
        status: "stale",
        submissions: [],
        recentAccepted: [],
      },
      lastSyncedAt: new Date().toISOString(),
      isStale: true,
    });
  }
}
