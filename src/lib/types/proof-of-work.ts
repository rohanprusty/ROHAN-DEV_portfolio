export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level?: number; // 0-4 intensity
}

export interface GitHubRepo {
  id: string;
  name: string;
  fullName: string;
  url: string;
  description?: string | null;
  isPrivate: boolean;
  isFork: boolean;
  stars: number;
  forks: number;
  language?: string | null;
}

export interface GitHubStarredRepo {
  id: string;
  name: string;
  fullName: string;
  url: string;
  starredAt?: string | null;
}

export interface GitHubStats {
  username: string;
  totalRepositories: number;
  publicRepositories: number;
  privateRepositories: number;
  starredRepositories: number;
  followers: number;
  following: number;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  lastUpdated: string;
  status: "success" | "stale" | "error";
  contributions: ContributionDay[];
  repositories?: GitHubRepo[];
  starredList?: GitHubStarredRepo[];
}

export interface LeetCodeSubmission {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: string; // unix timestamp string
  status?: string | null;
  language?: string | null;
  url: string;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contestRating?: number;
  streak: number;
  totalActiveDays: number;
  lastUpdated: string;
  status: "success" | "stale" | "error";
  submissions: ContributionDay[];
  recentAccepted: LeetCodeSubmission[];
}

export interface ProofOfWorkResponse {
  github: GitHubStats;
  leetcode: LeetCodeStats;
  codeforces?: {
    username: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
  } | null;
  lastSyncedAt: string;
  isStale?: boolean;
}

export interface SyncLogEntry {
  id?: string;
  provider: "github" | "leetcode" | "all";
  userId?: string;
  status: "SUCCESS" | "ERROR" | "IN_PROGRESS";
  startedAt: string;
  completedAt?: string;
  errorMessage?: string | null;
  recordsUpdated: number;
}
