import assert from "node:assert";

function parseSubmissionCalendar(calendarJson) {
  let rawCalendar = {};
  if (typeof calendarJson === "string") {
    try {
      rawCalendar = JSON.parse(calendarJson);
    } catch (err) {}
  } else if (calendarJson && typeof calendarJson === "object") {
    rawCalendar = calendarJson;
  }

  const countByDate = {};
  for (const [timestampStr, count] of Object.entries(rawCalendar)) {
    const ts = parseInt(timestampStr, 10);
    if (!isNaN(ts)) {
      const date = new Date(ts * 1000);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;
      countByDate[dateStr] = (countByDate[dateStr] || 0) + Number(count);
    }
  }

  const result = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    result.push({ date: dateStr, count: countByDate[dateStr] || 0 });
  }
  return result;
}

function parseRecentSubmissions(username, rawSubmissions) {
  if (!Array.isArray(rawSubmissions)) return [];
  return rawSubmissions.map((item) => {
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

console.log("Executing Proof of Work Data Normalization Tests...");

// Test 1: Calendar parsing with recent timestamps
const nowSec = Math.floor(Date.now() / 1000);
const yesterdaySec = nowSec - 86400;

const sampleCalendar = JSON.stringify({
  [nowSec]: 3,
  [yesterdaySec]: 1,
});

const parsed = parseSubmissionCalendar(sampleCalendar);
assert.strictEqual(Array.isArray(parsed), true);
assert.strictEqual(parsed.length, 365);
const activeDays = parsed.filter((d) => d.count > 0);
assert.strictEqual(activeDays.length >= 1, true);
console.log("✅ Test 1 Passed: 365-day calendar parsing verified.");

// Test 2: Null handling
const nullCalendar = parseSubmissionCalendar(null);
assert.strictEqual(nullCalendar.length, 365);
assert.strictEqual(nullCalendar.every((d) => d.count === 0), true);
console.log("✅ Test 2 Passed: Null calendar fallback verified.");

// Test 3: Recent AC Submissions
const rawSubs = [
  { id: "123456", title: "Two Sum", titleSlug: "two-sum", timestamp: String(nowSec) },
  { title: "3Sum", titleSlug: "3sum", timestamp: String(yesterdaySec) },
];
const recent = parseRecentSubmissions("Rohan_99_prusty", rawSubs);
assert.strictEqual(recent.length, 2);
assert.strictEqual(recent[0].id, "123456");
assert.strictEqual(recent[1].id.includes("Rohan_99_prusty-3sum"), true);
assert.strictEqual(recent[0].url, "https://leetcode.com/problems/two-sum/");
console.log("✅ Test 3 Passed: Recent submission formatting verified.");

console.log("==========================================");
console.log("ALL UNIT TESTS EXECUTED SUCCESSFULLY");
console.log("==========================================");
