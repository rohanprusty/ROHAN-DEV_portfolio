import { DatabaseService } from "@/lib/db/db";
import { GitHubService } from "@/lib/services/github/github.service";
import { LeetCodeService } from "@/lib/services/leetcode/leetcode.service";
import { ProofOfWorkResponse } from "@/lib/types/proof-of-work";

export class SyncService {
  private static defaultUsername = "rohanprusty";
  private static githubUsername = process.env.GITHUB_USERNAME || "rohanprusty";
  private static leetcodeUsername = process.env.LEETCODE_USERNAME || "Rohan_99_prusty";

  /**
   * Synchronize GitHub user stats and contribution activity
   */
  static async syncGitHub(userRecordId?: string) {
    const startedAt = new Date().toISOString();
    try {
      const stats = await GitHubService.fetchGitHubStats(this.githubUsername);

      if (userRecordId) {
        await DatabaseService.saveGitHubStats(userRecordId, stats);
      }

      await DatabaseService.logSync({
        provider: "github",
        userId: userRecordId,
        status: "SUCCESS",
        startedAt,
        recordsUpdated: stats.totalContributions,
      });

      return stats;
    } catch (err: any) {
      console.error("syncGitHub error:", err);
      await DatabaseService.logSync({
        provider: "github",
        userId: userRecordId,
        status: "ERROR",
        startedAt,
        errorMessage: err?.message || String(err),
        recordsUpdated: 0,
      });
      throw err;
    }
  }

  /**
   * Synchronize LeetCode stats and submission calendar
   */
  static async syncLeetCode(userRecordId?: string) {
    const startedAt = new Date().toISOString();
    try {
      const stats = await LeetCodeService.fetchLeetCodeStats(this.leetcodeUsername);

      if (userRecordId) {
        await DatabaseService.saveLeetCodeStats(userRecordId, stats);
      }

      await DatabaseService.logSync({
        provider: "leetcode",
        userId: userRecordId,
        status: "SUCCESS",
        startedAt,
        recordsUpdated: stats.totalSolved,
      });

      return stats;
    } catch (err: any) {
      console.error("syncLeetCode error:", err);
      await DatabaseService.logSync({
        provider: "leetcode",
        userId: userRecordId,
        status: "ERROR",
        startedAt,
        errorMessage: err?.message || String(err),
        recordsUpdated: 0,
      });
      throw err;
    }
  }

  /**
   * Perform complete background synchronization for all services
   */
  static async syncAll(): Promise<ProofOfWorkResponse> {
    const startedAt = new Date().toISOString();

    // 1. Ensure user record in DB
    const user = await DatabaseService.getOrCreateUser(
      this.defaultUsername,
      this.githubUsername,
      this.leetcodeUsername
    );

    const userId = user?.id;

    // 2. Execute parallel sync tasks
    const [githubStats, leetcodeStats] = await Promise.all([
      this.syncGitHub(userId).catch((err) => {
        console.error("GitHub sync failed during syncAll:", err);
        return null;
      }),
      this.syncLeetCode(userId).catch((err) => {
        console.error("LeetCode sync failed during syncAll:", err);
        return null;
      }),
    ]);

    // 3. Fallback to existing database records or fresh fetched data
    let existingFromDB = userId ? await DatabaseService.getProofOfWorkFromDB(this.defaultUsername) : null;

    const finalGitHub = githubStats || existingFromDB?.github || (await GitHubService.fetchGitHubStats(this.githubUsername));
    const finalLeetCode = leetcodeStats || existingFromDB?.leetcode || (await LeetCodeService.fetchLeetCodeStats(this.leetcodeUsername));

    const response: ProofOfWorkResponse = {
      github: finalGitHub,
      leetcode: finalLeetCode,
      lastSyncedAt: new Date().toISOString(),
    };

    // Update memory cache
    DatabaseService.setMemoryCache(response);

    await DatabaseService.logSync({
      provider: "all",
      userId,
      status: "SUCCESS",
      startedAt,
      recordsUpdated: (finalGitHub.totalContributions || 0) + (finalLeetCode.totalSolved || 0),
    });

    return response;
  }
}
