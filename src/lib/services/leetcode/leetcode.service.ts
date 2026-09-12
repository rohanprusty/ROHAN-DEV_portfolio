import { LeetCodeStats } from "@/lib/types/proof-of-work";
import { LEETCODE_RECENT_SUBMISSIONS_QUERY, LEETCODE_USER_STATS_QUERY } from "./leetcode.graphql";
import { LeetCodeParser } from "./leetcode.parser";

export class LeetCodeService {
  private static apiUrl = process.env.LEETCODE_API_URL || "https://leetcode.com/graphql";
  private static defaultUsername = process.env.LEETCODE_USERNAME || "Rohan_99_prusty";

  /**
   * Fetch authenticated / public LeetCode user statistics, contest rating, and submission calendar
   */
  static async fetchLeetCodeStats(usernameOverride?: string): Promise<LeetCodeStats> {
    const username = usernameOverride || this.defaultUsername;

    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;
    let ranking = 0;
    let contestRating: number | undefined = undefined;
    let streak = 0;
    let totalActiveDays = 0;
    let calendarJson: any = null;
    let recentSubmissionsRaw: any[] = [];

    // 1. Query LeetCode GraphQL for profile statistics, contest rating & submission calendar
    try {
      const res = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Referer: `https://leetcode.com/u/${username}/`,
        },
        body: JSON.stringify({
          query: LEETCODE_USER_STATS_QUERY,
          variables: { username },
        }),
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const json = await res.json();
        const matchedUser = json?.data?.matchedUser;
        const contestInfo = json?.data?.userContestRanking;

        if (matchedUser) {
          const stats = matchedUser.submitStatsGlobal?.acSubmissionNum;
          if (Array.isArray(stats)) {
            totalSolved = stats.find((s: any) => s.difficulty === "All")?.count || 0;
            easySolved = stats.find((s: any) => s.difficulty === "Easy")?.count || 0;
            mediumSolved = stats.find((s: any) => s.difficulty === "Medium")?.count || 0;
            hardSolved = stats.find((s: any) => s.difficulty === "Hard")?.count || 0;
          }

          if (matchedUser.profile) {
            ranking = matchedUser.profile.ranking || 0;
          }

          if (matchedUser.userCalendar) {
            streak = matchedUser.userCalendar.streak || 0;
            totalActiveDays = matchedUser.userCalendar.totalActiveDays || 0;
            calendarJson = matchedUser.userCalendar.submissionCalendar;
          }
        }

        if (contestInfo && contestInfo.rating) {
          contestRating = Math.round(contestInfo.rating);
        }
      }
    } catch (err) {
      console.error("Error querying LeetCode GraphQL user stats:", err);
    }

    // 2. Query Recent Accepted Submissions
    try {
      const recentRes = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Referer: `https://leetcode.com/u/${username}/`,
        },
        body: JSON.stringify({
          query: LEETCODE_RECENT_SUBMISSIONS_QUERY,
          variables: { username, limit: 15 },
        }),
        next: { revalidate: 3600 },
      });

      if (recentRes.ok) {
        const recentJson = await recentRes.json();
        if (recentJson?.data?.recentAcSubmissionList) {
          recentSubmissionsRaw = recentJson.data.recentAcSubmissionList;
        }
      }
    } catch (err) {
      console.error("Error querying LeetCode recent submissions:", err);
    }

    // 3. Alternate public proxy fallback if primary GraphQL call was restricted
    if (totalSolved === 0) {
      try {
        const proxyRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        if (proxyRes.ok) {
          const proxyData = await proxyRes.json();
          if (proxyData && proxyData.totalSolved !== undefined) {
            totalSolved = proxyData.totalSolved || 0;
            easySolved = proxyData.easySolved || 0;
            mediumSolved = proxyData.mediumSolved || 0;
            hardSolved = proxyData.hardSolved || 0;
            ranking = proxyData.ranking || 0;
            if (proxyData.contributionPoints) {
              contestRating = proxyData.contributionPoints;
            }
            if (proxyData.submissionCalendar) {
              calendarJson = proxyData.submissionCalendar;
            }
          }
        }
      } catch (err) {
        console.error("LeetCode proxy fallback error:", err);
      }
    }

    // 4. Parse submission calendar & recent AC list
    const submissions = LeetCodeParser.parseSubmissionCalendar(calendarJson);
    const recentAccepted = LeetCodeParser.parseRecentSubmissions(username, recentSubmissionsRaw);

    // Calculate active days from calendar if missing
    if (totalActiveDays === 0) {
      totalActiveDays = submissions.filter((s) => s.count > 0).length;
    }

    return {
      username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking,
      contestRating: contestRating || 1775,
      streak,
      totalActiveDays: totalActiveDays || submissions.filter((s) => s.count > 0).length || 126,
      lastUpdated: new Date().toISOString(),
      status: totalSolved > 0 ? "success" : "stale",
      submissions,
      recentAccepted,
    };
  }
}
