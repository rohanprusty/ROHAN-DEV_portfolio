import { supabase } from "@/lib/supabase";
import { GitHubStats, LeetCodeStats, ProofOfWorkResponse, SyncLogEntry } from "@/lib/types/proof-of-work";

// In-memory cache for ultra-fast local response
let cachedData: ProofOfWorkResponse | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory TTL

export class DatabaseService {
  /**
   * Get or create standard user record
   */
  static async getOrCreateUser(username: string, githubUsername: string, leetcodeUsername: string) {
    if (!supabase) return null;

    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (existingUser) {
        // Update handles if needed
        if (existingUser.github_username !== githubUsername || existingUser.leetcode_username !== leetcodeUsername) {
          await supabase
            .from("users")
            .update({ github_username: githubUsername, leetcode_username: leetcodeUsername, updated_at: new Date().toISOString() })
            .eq("id", existingUser.id);
        }
        return existingUser;
      }

      const { data: newUser, error } = await supabase
        .from("users")
        .insert({
          username,
          github_username: githubUsername,
          leetcode_username: leetcodeUsername,
        })
        .select()
        .single();

      if (error) {
        return null;
      }
      return newUser;
    } catch (err) {
      return null;
    }
  }

  /**
   * Upsert GitHub statistics and daily contributions
   */
  static async saveGitHubStats(userId: string, stats: GitHubStats) {
    if (!supabase) return;

    try {
      // 1. Upsert github_stats
      await supabase.from("github_stats").upsert(
        {
          user_id: userId,
          total_repositories: stats.totalRepositories,
          public_repositories: stats.publicRepositories,
          private_repositories: stats.privateRepositories,
          starred_repositories: stats.starredRepositories,
          followers: stats.followers,
          following: stats.following,
          total_contributions: stats.totalContributions,
          current_streak: stats.currentStreak,
          longest_streak: stats.longestStreak,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      // 2. Upsert daily contributions in batches
      if (stats.contributions && stats.contributions.length > 0) {
        const rows = stats.contributions.map((c) => ({
          user_id: userId,
          date: c.date,
          contribution_count: c.count,
          updated_at: new Date().toISOString(),
        }));
        await supabase.from("github_contributions").upsert(rows, { onConflict: "user_id,date" });
      }

      // 3. Upsert Repositories if present
      if (stats.repositories && stats.repositories.length > 0) {
        const repoRows = stats.repositories.map((r) => ({
          user_id: userId,
          github_repo_id: r.id,
          name: r.name,
          full_name: r.fullName,
          url: r.url,
          description: r.description || null,
          is_private: r.isPrivate,
          is_fork: r.isFork,
          stars: r.stars,
          forks: r.forks,
          language: r.language || null,
          updated_at: new Date().toISOString(),
        }));
        await supabase.from("github_repositories").upsert(repoRows, { onConflict: "user_id,github_repo_id" });
      }

      // 4. Upsert Starred Repositories if present
      if (stats.starredList && stats.starredList.length > 0) {
        const starredRows = stats.starredList.map((s) => ({
          user_id: userId,
          github_repo_id: s.id,
          name: s.name,
          full_name: s.fullName,
          url: s.url,
          starred_at: s.starredAt || null,
          updated_at: new Date().toISOString(),
        }));
        await supabase.from("github_starred_repositories").upsert(starredRows, { onConflict: "user_id,github_repo_id" });
      }
    } catch (err) {
      console.error("Error saving GitHub stats to DB:", err);
    }
  }

  /**
   * Upsert LeetCode statistics, submission calendar, and recent AC submissions
   */
  static async saveLeetCodeStats(userId: string, stats: LeetCodeStats) {
    if (!supabase) return;

    try {
      // 1. Upsert leetcode_stats
      await supabase.from("leetcode_stats").upsert(
        {
          user_id: userId,
          total_solved: stats.totalSolved,
          easy_solved: stats.easySolved,
          medium_solved: stats.mediumSolved,
          hard_solved: stats.hardSolved,
          ranking: stats.ranking,
          streak: stats.streak,
          total_active_days: stats.totalActiveDays,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      // 2. Upsert submission calendar
      if (stats.submissions && stats.submissions.length > 0) {
        const rows = stats.submissions.map((s) => ({
          user_id: userId,
          date: s.date,
          submission_count: s.count,
          updated_at: new Date().toISOString(),
        }));
        await supabase.from("leetcode_contributions").upsert(rows, { onConflict: "user_id,date" });
      }

      // 3. Upsert recent accepted submissions
      if (stats.recentAccepted && stats.recentAccepted.length > 0) {
        const subRows = stats.recentAccepted.map((sub) => ({
          user_id: userId,
          submission_id: sub.id,
          title: sub.title,
          title_slug: sub.titleSlug,
          timestamp: sub.timestamp,
          status: sub.status || "Accepted",
          language: sub.language || null,
        }));
        await supabase.from("leetcode_submissions").upsert(subRows, { onConflict: "user_id,submission_id" });
      }
    } catch (err) {
      console.error("Error saving LeetCode stats to DB:", err);
    }
  }

  /**
   * Write execution entry to sync_logs
   */
  static async logSync(entry: SyncLogEntry) {
    if (!supabase) return;
    try {
      await supabase.from("sync_logs").insert({
        provider: entry.provider,
        user_id: entry.userId || null,
        status: entry.status,
        started_at: entry.startedAt,
        completed_at: entry.completedAt || new Date().toISOString(),
        error_message: entry.errorMessage || null,
        records_updated: entry.recordsUpdated,
      });
    } catch (err) {
      console.error("Error writing sync log:", err);
    }
  }

  /**
   * Fetch complete normalized proof-of-work payload from DB
   */
  static async getProofOfWorkFromDB(username: string): Promise<ProofOfWorkResponse | null> {
    if (!supabase) return null;

    try {
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (!user) return null;

      // GitHub stats & contributions
      const { data: ghStatsRow } = await supabase
        .from("github_stats")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: ghContribRows } = await supabase
        .from("github_contributions")
        .select("date, contribution_count")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

      // LeetCode stats, contributions & submissions
      const { data: lcStatsRow } = await supabase
        .from("leetcode_stats")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: lcContribRows } = await supabase
        .from("leetcode_contributions")
        .select("date, submission_count")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

      const { data: lcSubRows } = await supabase
        .from("leetcode_submissions")
        .select("*")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false })
        .limit(15);

      if (!ghStatsRow && !lcStatsRow) return null;

      const githubContributions = (ghContribRows || []).map((c: any) => ({
        date: c.date,
        count: c.contribution_count,
      }));

      const leetcodeSubmissions = (lcContribRows || []).map((c: any) => ({
        date: c.date,
        count: c.submission_count,
      }));

      const recentAccepted = (lcSubRows || []).map((s: any) => ({
        id: s.submission_id,
        title: s.title,
        titleSlug: s.title_slug,
        timestamp: s.timestamp,
        status: s.status,
        language: s.language,
        url: `https://leetcode.com/problems/${s.title_slug}/`,
      }));

      const result: ProofOfWorkResponse = {
        github: {
          username: user.github_username || "rohanprusty",
          totalRepositories: ghStatsRow?.total_repositories || 0,
          publicRepositories: ghStatsRow?.public_repositories || 0,
          privateRepositories: ghStatsRow?.private_repositories || 0,
          starredRepositories: ghStatsRow?.starred_repositories || 0,
          followers: ghStatsRow?.followers || 0,
          following: ghStatsRow?.following || 0,
          totalContributions: ghStatsRow?.total_contributions || 0,
          currentStreak: ghStatsRow?.current_streak || 0,
          longestStreak: ghStatsRow?.longest_streak || 0,
          lastUpdated: ghStatsRow?.updated_at || new Date().toISOString(),
          status: ghStatsRow ? "success" : "stale",
          contributions: githubContributions,
        },
        leetcode: {
          username: user.leetcode_username || "Rohan_99_prusty",
          totalSolved: lcStatsRow?.total_solved || 0,
          easySolved: lcStatsRow?.easy_solved || 0,
          mediumSolved: lcStatsRow?.medium_solved || 0,
          hardSolved: lcStatsRow?.hard_solved || 0,
          ranking: lcStatsRow?.ranking || 0,
          streak: lcStatsRow?.streak || 0,
          totalActiveDays: lcStatsRow?.total_active_days || 0,
          lastUpdated: lcStatsRow?.updated_at || new Date().toISOString(),
          status: lcStatsRow ? "success" : "stale",
          submissions: leetcodeSubmissions,
          recentAccepted,
        },
        lastSyncedAt: new Date().toISOString(),
      };

      // Store in memory cache
      cachedData = result;
      lastCacheTime = Date.now();

      return result;
    } catch (err) {
      console.error("Error reading proof of work from DB:", err);
      return null;
    }
  }

  /**
   * Set and get in-memory cache
   */
  static getMemoryCache(): ProofOfWorkResponse | null {
    if (cachedData && Date.now() - lastCacheTime < CACHE_TTL_MS) {
      return cachedData;
    }
    return null;
  }

  static setMemoryCache(data: ProofOfWorkResponse) {
    cachedData = data;
    lastCacheTime = Date.now();
  }
}
