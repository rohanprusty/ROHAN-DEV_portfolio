import assert from "node:assert";
import { LeetCodeParser } from "../src/lib/services/leetcode/leetcode.parser.ts";

console.log("Running Proof of Work Unit Tests...");

// Test 1: Submission calendar parsing
const sampleCalendar = JSON.stringify({
  "1725840000": 3,
  "1725926400": 1,
});

const parsed = LeetCodeParser.parseSubmissionCalendar(sampleCalendar);
assert.strictEqual(Array.isArray(parsed), true, "Result should be an array");
assert.strictEqual(parsed.length, 365, "Calendar should span 365 days");

const activeDays = parsed.filter((day) => day.count > 0);
assert.strictEqual(activeDays.length, 2, "Active days count should match input timestamps");
console.log("✅ Test 1 Passed: parseSubmissionCalendar parsed 365-day array successfully.");

// Test 2: Null/empty calendar handling
const parsedNull = LeetCodeParser.parseSubmissionCalendar(null);
assert.strictEqual(parsedNull.length, 365, "Null calendar fallback should yield 365 days");
assert.strictEqual(
  parsedNull.every((d) => d.count === 0),
  true,
  "Null calendar days should all have 0 count"
);
console.log("✅ Test 2 Passed: Null calendar fallback handled cleanly.");

// Test 3: Recent submissions parsing
const rawSubs = [
  { id: "123456", title: "Two Sum", titleSlug: "two-sum", timestamp: "1725840000" },
  { title: "3Sum", titleSlug: "3sum", timestamp: "1725926400" },
];

const recent = LeetCodeParser.parseRecentSubmissions("Rohan_99_prusty", rawSubs);
assert.strictEqual(recent.length, 2, "Should parse 2 submissions");
assert.strictEqual(recent[0].id, "123456", "Should preserve explicit submission ID");
assert.strictEqual(recent[1].id.includes("Rohan_99_prusty-3sum"), true, "Should construct fallback ID");
assert.strictEqual(recent[0].url, "https://leetcode.com/problems/two-sum/", "Should form valid problem URL");
console.log("✅ Test 3 Passed: Recent submissions parsed and formatted properly.");

console.log("==========================================");
console.log("ALL PROOF OF WORK UNIT TESTS PASSED");
console.log("==========================================");
