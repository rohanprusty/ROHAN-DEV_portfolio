import { NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db/db";
import { SyncService } from "@/lib/services/sync";
import { profileData } from "@/data/profile";

export async function GET() {
  try {
    // Attempt memory cache or DB fetch first
    let cached = DatabaseService.getMemoryCache();
    if (!cached) {
      cached = await DatabaseService.getProofOfWorkFromDB("rohanprusty");
    }

    if (!cached) {
      cached = await SyncService.syncAll();
    }

    // Codeforces live stats fetch
    let codeforces = null;
    try {
      const cfRes = await fetch(
        `https://codeforces.com/api/user.info?handles=${profileData.codingProfiles.codeforces.username}`,
        { next: { revalidate: 3600 } }
      );
      if (cfRes.ok) {
        const cfData = await cfRes.json();
        if (cfData?.status === "OK" && cfData.result?.[0]) {
          codeforces = cfData.result[0];
        }
      }
    } catch (err) {
      // Silent catch
    }

    return NextResponse.json({
      github: {
        public_repos: cached.github.totalRepositories,
        followers: cached.github.followers,
        following: cached.github.following,
        starred_repos: cached.github.starredRepositories,
        total_contributions: cached.github.totalContributions,
        current_streak: cached.github.currentStreak,
        longest_streak: cached.github.longestStreak,
        contributions: cached.github.contributions,
        status: cached.github.status,
      },
      leetcode: {
        totalSolved: cached.leetcode.totalSolved,
        easySolved: cached.leetcode.easySolved,
        mediumSolved: cached.leetcode.mediumSolved,
        hardSolved: cached.leetcode.hardSolved,
        ranking: cached.leetcode.ranking,
        streak: cached.leetcode.streak,
        activeDays: cached.leetcode.totalActiveDays,
        submissions: cached.leetcode.submissions,
        recentAccepted: cached.leetcode.recentAccepted,
        status: cached.leetcode.status,
      },
      codeforces,
      lastSyncedAt: cached.lastSyncedAt,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch stats", details: String(err) },
      { status: 500 }
    );
  }
}
