import fetch from "node:fetch";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const SYNC_SECRET = process.env.SYNC_SECRET || "portfolio_sync_secret_key_2026";

async function runSync() {
  const target = process.argv[2] || "all";
  console.log(`[SYNC CLI] Initiating portfolio activity sync (${target})...`);

  try {
    const res = await fetch(`${API_BASE}/api/proof-of-work?refresh=true&secret=${SYNC_SECRET}`, {
      headers: {
        Authorization: `Bearer ${SYNC_SECRET}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("==========================================");
      console.log("SUCCESSFULLY SYNCHRONIZED PORTFOLIO METRICS");
      console.log("==========================================");
      console.log(`GitHub Repositories: ${data.github?.totalRepositories || 0}`);
      console.log(`GitHub Starred:      ${data.github?.starredRepositories || 0}`);
      console.log(`GitHub Contributions: ${data.github?.totalContributions || 0}`);
      console.log(`LeetCode Solved:      ${data.leetcode?.totalSolved || 0} (Easy: ${data.leetcode?.easySolved}, Med: ${data.leetcode?.mediumSolved}, Hard: ${data.leetcode?.hardSolved})`);
      console.log(`LeetCode Active Days: ${data.leetcode?.totalActiveDays || 0}`);
      console.log(`Last Synced Timestamp: ${data.lastSyncedAt}`);
      console.log("==========================================");
    } else {
      const errText = await res.text();
      console.error(`[SYNC ERROR] Response failed (${res.status}): ${errText}`);
    }
  } catch (err) {
    console.error("[SYNC CLI ERROR] Network or server error:", err.message);
  }
}

runSync();
