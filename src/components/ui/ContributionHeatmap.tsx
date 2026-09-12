"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ContributionDay } from "@/lib/types/proof-of-work";

interface ContributionHeatmapProps {
  data: ContributionDay[];
  colorScheme: "github" | "leetcode";
  title: string;
  username: string;
  totalLabel?: string;
  streak?: number;
  longestStreak?: number;
  profileUrl: string;
}

export function ContributionHeatmap({
  data = [],
  colorScheme = "github",
  title,
  username,
  totalLabel,
  streak,
  longestStreak,
  profileUrl,
}: ContributionHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Month labels for calendar header
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Ensure data has 365 days formatted into 52+ weeks (7 days per column)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  // Group into weeks of 7 days
  data.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === data.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getCellColor = (count: number) => {
    if (count === 0) return "bg-[#161b22] border-white/5";

    if (colorScheme === "github") {
      if (count >= 9) return "bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.4)]";
      if (count >= 6) return "bg-[#26a641]";
      if (count >= 3) return "bg-[#006d32]";
      return "bg-[#0e4429]";
    } else {
      // LeetCode accent scheme (Amber / Orange)
      if (count >= 7) return "bg-[#FFA116] shadow-[0_0_8px_rgba(255,161,22,0.5)]";
      if (count >= 5) return "bg-[#f59e0b]";
      if (count >= 3) return "bg-[#d97706]";
      return "bg-[#92400e]";
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const unitLabel = colorScheme === "github" ? "contributions" : "submissions";

  return (
    <div className="bg-card/80 border border-border rounded-xl p-5 relative overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="font-bold text-base flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                colorScheme === "github" ? "bg-[#39d353]" : "bg-[#FFA116]"
              }`}
            />
            {title}
          </h4>
          {totalLabel && <p className="text-xs text-muted-foreground mt-0.5">{totalLabel}</p>}
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-muted-foreground hover:text-white flex items-center gap-1 transition-colors"
        >
          @{username} <ExternalLink size={12} />
        </a>
      </div>

      {/* Heatmap Grid Wrapper */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="min-w-[660px]">
          {/* Heatmap Grid */}
          <div className="flex gap-[3.5px]">
            {weeks.map((week, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[3.5px]">
                {week.map((day, rowIdx) => (
                  <div
                    key={`${colIdx}-${rowIdx}`}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredDay({
                        date: day.date,
                        count: day.count,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                      });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-3 h-3 rounded-[2.5px] border ${getCellColor(
                      day.count
                    )} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Footer Legend & Streaks */}
          <div className="flex flex-wrap items-center justify-between mt-4 text-[11px] font-mono text-muted-foreground gap-3">
            <div className="flex items-center gap-4">
              {streak !== undefined && (
                <span>
                  Current Streak: <strong className="text-white font-mono">{streak} days</strong>
                </span>
              )}
              {longestStreak !== undefined && (
                <span>
                  Longest Streak: <strong className="text-white font-mono">{longestStreak} days</strong>
                </span>
              )}
            </div>

            {/* Scale Legend */}
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-white/5" />
              <div
                className={`w-2.5 h-2.5 rounded-[2px] ${
                  colorScheme === "github" ? "bg-[#0e4429]" : "bg-[#92400e]"
                }`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-[2px] ${
                  colorScheme === "github" ? "bg-[#006d32]" : "bg-[#d97706]"
                }`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-[2px] ${
                  colorScheme === "github" ? "bg-[#26a641]" : "bg-[#f59e0b]"
                }`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-[2px] ${
                  colorScheme === "github" ? "bg-[#39d353]" : "bg-[#FFA116]"
                }`}
              />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              left: hoveredDay.x,
              top: hoveredDay.y,
              transform: "translate(-50%, -100%)",
            }}
            className="z-50 pointer-events-none bg-zinc-900 border border-zinc-700 text-white text-xs py-1.5 px-3 rounded-md shadow-xl whitespace-nowrap text-center font-sans"
          >
            <p className="font-semibold text-zinc-100">
              {hoveredDay.count === 0
                ? `No ${unitLabel}`
                : `${hoveredDay.count} ${unitLabel}`}
            </p>
            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{formatDate(hoveredDay.date)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
