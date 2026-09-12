"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { LeetCodeSubmission } from "@/lib/types/proof-of-work";

interface RecentSubmissionsProps {
  submissions: LeetCodeSubmission[];
}

export function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  if (!submissions || submissions.length === 0) return null;

  const formatTime = (timestampStr: string) => {
    const ts = parseInt(timestampStr, 10);
    if (isNaN(ts)) return "";
    const date = new Date(ts * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-6 bg-card/60 border border-border rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-sm text-zinc-200 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#00b8a3]" /> Recent Accepted LeetCode Submissions
        </h4>
        <span className="text-xs font-mono text-muted-foreground">Auto-synced</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {submissions.slice(0, 6).map((sub) => (
          <a
            key={sub.id}
            href={sub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-white/5 hover:border-[#FFA116]/40 hover:bg-zinc-900 transition-all"
          >
            <div className="truncate pr-2">
              <p className="text-xs font-medium text-zinc-200 group-hover:text-[#FFA116] truncate transition-colors">
                {sub.title}
              </p>
              <span className="text-[10px] font-mono text-zinc-500">{formatTime(sub.timestamp)}</span>
            </div>
            <ExternalLink size={14} className="text-zinc-600 group-hover:text-[#FFA116] shrink-0 transition-colors" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
