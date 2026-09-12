import { ContributionDay, LeetCodeSubmission } from "@/lib/types/proof-of-work";

export class LeetCodeParser {
  /**
   * Parse submissionCalendar JSON string ("{ 1725840000: 3, 1725926400: 1 }")
   * Returns a complete 365-day array of daily submission counts.
   */
  static parseSubmissionCalendar(calendarJson: string | object | null | undefined): ContributionDay[] {
    let rawCalendar: Record<string, number> = {};

    if (typeof calendarJson === "string") {
      try {
        rawCalendar = JSON.parse(calendarJson);
      } catch (err) {
        console.error("Failed to parse submissionCalendar JSON:", err);
      }
    } else if (calendarJson && typeof calendarJson === "object") {
      rawCalendar = calendarJson as Record<string, number>;
    }

    // Map timestamps to YYYY-MM-DD date strings
    const countByDate: Record<string, number> = {};
    for (const [timestampStr, count] of Object.entries(rawCalendar)) {
      const ts = parseInt(timestampStr, 10);
      if (!isNaN(ts)) {
        // Unix timestamp in seconds -> milliseconds
        const date = new Date(ts * 1000);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;
        countByDate[dateStr] = (countByDate[dateStr] || 0) + Number(count);
      }
    }

    // Build 365-day calendar array ending today
    const result: ContributionDay[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const count = countByDate[dateStr] || 0;
      result.push({
        date: dateStr,
        count,
      });
    }

    return result;
  }

  /**
   * Parse raw GraphQL submission list into normalized LeetCodeSubmission array
   */
  static parseRecentSubmissions(username: string, rawSubmissions: any[]): LeetCodeSubmission[] {
    if (!Array.isArray(rawSubmissions)) return [];

    return rawSubmissions.map((item) => {
      // Deterministic fallback ID if real ID is missing
      const id = item.id ? String(item.id) : `${username}-${item.titleSlug}-${item.timestamp}`;
      return {
        id,
        title: item.title || "Algorithm Problem",
        titleSlug: item.titleSlug || "",
        timestamp: String(item.timestamp || Math.floor(Date.now() / 1000)),
        status: "Accepted",
        url: `https://leetcode.com/problems/${item.titleSlug}/`,
      };
    });
  }
}
