import { NextResponse } from "next/server";
import { profileData } from "@/data/profile";

export async function GET() {
  let github = null;
  let codeforces = null;
  let leetcode = null;

  // 1. Fetch GitHub
  try {
    const ghRes = await fetch(`https://api.github.com/users/${profileData.codingProfiles.github.username}`, {
      headers: { "User-Agent": "Portfolio-App" },
      next: { revalidate: 3600 }
    });
    if (ghRes.ok) {
      const data = await ghRes.json();
      if (data?.login) {
        github = {
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          login: data.login
        };
      }
    }
  } catch (err) {
    // Silent fail
  }

  // 2. Fetch Codeforces
  try {
    const cfRes = await fetch(`https://codeforces.com/api/user.info?handles=${profileData.codingProfiles.codeforces.username}`, {
      next: { revalidate: 3600 }
    });
    if (cfRes.ok) {
      const data = await cfRes.json();
      if (data?.status === "OK" && data.result?.[0]) {
        codeforces = data.result[0];
      }
    }
  } catch (err) {
    // Silent fail
  }

  // 3. Fetch LeetCode (via GraphQL or public proxy)
  try {
    const lcRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      body: JSON.stringify({
        query: `
          query userProblemsSolved($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username: profileData.codingProfiles.leetcode.username }
      }),
      next: { revalidate: 3600 }
    });
    if (lcRes.ok) {
      const data = await lcRes.json();
      const stats = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
      if (stats && Array.isArray(stats)) {
        const all = stats.find((s: any) => s.difficulty === "All")?.count || 0;
        const easy = stats.find((s: any) => s.difficulty === "Easy")?.count || 0;
        const medium = stats.find((s: any) => s.difficulty === "Medium")?.count || 0;
        const hard = stats.find((s: any) => s.difficulty === "Hard")?.count || 0;
        leetcode = { totalSolved: all, easySolved: easy, mediumSolved: medium, hardSolved: hard };
      }
    }
  } catch (err) {
    // Silent fail
  }

  return NextResponse.json({
    github,
    codeforces,
    leetcode
  });
}
