import { ContributionDay, GitHubRepo, GitHubStarredRepo, GitHubStats } from "@/lib/types/proof-of-work";

export class GitHubService {
  private static token = process.env.GITHUB_TOKEN || "";
  private static username = process.env.GITHUB_USERNAME || "rohanprusty";

  private static getHeaders() {
    const headers: Record<string, string> = {
      "User-Agent": "Portfolio-App-RohanPrusty",
      Accept: "application/vnd.github.v3+json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  /**
   * Fetch authenticated or public GitHub statistics
   */
  static async fetchGitHubStats(usernameOverride?: string): Promise<GitHubStats> {
    const username = usernameOverride || this.username;

    let userPublicRepos = 0;
    let followers = 0;
    let following = 0;

    // 1. Fetch User Profile
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: this.getHeaders(),
        next: { revalidate: 3600 },
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        userPublicRepos = userData.public_repos || 0;
        followers = userData.followers || 0;
        following = userData.following || 0;
      }
    } catch (err) {
      console.error("Error fetching GitHub user profile:", err);
    }

    // 2. Fetch Repositories with Pagination
    const repositories: GitHubRepo[] = [];
    let page = 1;
    let hasMoreRepos = true;
    const repoEndpoint = this.token
      ? `https://api.github.com/user/repos?per_page=100&type=all&sort=updated`
      : `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

    try {
      while (hasMoreRepos && page <= 5) {
        const res = await fetch(`${repoEndpoint}&page=${page}`, {
          headers: this.getHeaders(),
          next: { revalidate: 3600 },
        });

        if (!res.ok) break;

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          hasMoreRepos = false;
        } else {
          for (const item of data) {
            repositories.push({
              id: String(item.id),
              name: item.name,
              fullName: item.full_name,
              url: item.html_url,
              description: item.description,
              isPrivate: Boolean(item.private),
              isFork: Boolean(item.fork),
              stars: item.stargazers_count || 0,
              forks: item.forks_count || 0,
              language: item.language,
            });
          }
          if (data.length < 100) hasMoreRepos = false;
          else page++;
        }
      }
    } catch (err) {
      console.error("Error fetching GitHub repositories:", err);
    }

    const publicCount = repositories.filter((r) => !r.isPrivate).length || userPublicRepos;
    const privateCount = repositories.filter((r) => r.isPrivate).length;
    const totalRepos = Math.max(repositories.length, userPublicRepos);

    // 3. Fetch Starred Repositories with Pagination
    const starredRepos: GitHubStarredRepo[] = [];
    let starredPage = 1;
    let hasMoreStarred = true;
    const starredEndpoint = this.token
      ? `https://api.github.com/user/starred?per_page=100`
      : `https://api.github.com/users/${username}/starred?per_page=100`;

    try {
      while (hasMoreStarred && starredPage <= 5) {
        const starredRes = await fetch(`${starredEndpoint}&page=${starredPage}`, {
          headers: this.getHeaders(),
          next: { revalidate: 3600 },
        });

        if (!starredRes.ok) break;

        const starredData = await starredRes.json();
        if (!Array.isArray(starredData) || starredData.length === 0) {
          hasMoreStarred = false;
        } else {
          for (const item of starredData) {
            starredRepos.push({
              id: String(item.id),
              name: item.name,
              fullName: item.full_name,
              url: item.html_url,
            });
          }
          if (starredData.length < 100) hasMoreStarred = false;
          else starredPage++;
        }
      }
    } catch (err) {
      console.error("Error fetching GitHub starred repos:", err);
    }

    // 4. Fetch GitHub Contribution Calendar via GraphQL or fallback REST
    const { contributions, totalContributions } = await this.fetchContributionCalendar(username);

    // 5. Calculate Streaks
    const { currentStreak, longestStreak } = this.calculateStreaks(contributions);

    return {
      username,
      totalRepositories: totalRepos,
      publicRepositories: publicCount,
      privateRepositories: privateCount,
      starredRepositories: starredRepos.length,
      followers,
      following,
      totalContributions,
      currentStreak,
      longestStreak,
      lastUpdated: new Date().toISOString(),
      status: "success",
      contributions,
      repositories: repositories.slice(0, 20),
      starredList: starredRepos.slice(0, 20),
    };
  }

  /**
   * GraphQL contribution calendar fetcher with deterministic daily fallback generator
   */
  private static async fetchContributionCalendar(
    username: string
  ): Promise<{ contributions: ContributionDay[]; totalContributions: number }> {
    if (this.token) {
      try {
        const query = `
          query ($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
            "User-Agent": "Portfolio-App-RohanPrusty",
          },
          body: JSON.stringify({ query, variables: { username } }),
        });

        if (res.ok) {
          const json = await res.json();
          const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
          if (calendar && calendar.weeks) {
            const contributions: ContributionDay[] = [];
            for (const week of calendar.weeks) {
              for (const day of week.contributionDays) {
                contributions.push({
                  date: day.date,
                  count: day.contributionCount,
                });
              }
            }
            return {
              contributions,
              totalContributions: calendar.totalContributions || 0,
            };
          }
        }
      } catch (err) {
        console.error("GitHub GraphQL calendar fetch error:", err);
      }
    }

    // Public HTML SVG fallback scraper / proxy fallback for unauthenticated queries
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.contributions && Array.isArray(data.contributions)) {
          const contributions: ContributionDay[] = data.contributions.map((c: any) => ({
            date: c.date,
            count: c.count,
            level: c.level,
          }));
          const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);
          return { contributions, totalContributions };
        }
      }
    } catch (err) {
      console.error("Public contribution API fallback error:", err);
    }

    // Fallback: Generate empty 365 days calendar
    const fallbackDays: ContributionDay[] = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      fallbackDays.push({
        date: d.toISOString().split("T")[0],
        count: 0,
      });
    }
    return { contributions: fallbackDays, totalContributions: 0 };
  }

  /**
   * Compute current and longest streaks from contribution days
   */
  private static calculateStreaks(contributions: ContributionDay[]): { currentStreak: number; longestStreak: number } {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Sort ascending by date
    const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));

    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    // Current streak working backwards from today
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].count > 0) {
        currentStreak++;
      } else {
        // If today has 0 contributions, check if yesterday had contributions before breaking
        if (i === sorted.length - 1) {
          continue;
        }
        break;
      }
    }

    return { currentStreak, longestStreak };
  }
}
