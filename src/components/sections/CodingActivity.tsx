"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { profileData } from "@/data/profile";
import { ExternalLink, Code2, Activity, TrendingUp, RefreshCw, Star, Trophy, Zap, Flame } from "lucide-react";
import { Github } from "@/components/icons";
import { ContributionHeatmap } from "@/components/ui/ContributionHeatmap";
import { ProofOfWorkResponse } from "@/lib/types/proof-of-work";

// Cool Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export function CodingActivity() {
  const [data, setData] = useState<ProofOfWorkResponse | null>(null);
  const [codeforces, setCodeforces] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastSyncedText, setLastSyncedText] = useState("Just now");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/proof-of-work");
        if (res.ok) {
          const json: ProofOfWorkResponse = await res.json();
          setData(json);

          if (json.lastSyncedAt) {
            const minutes = Math.floor((Date.now() - new Date(json.lastSyncedAt).getTime()) / (60 * 1000));
            if (minutes < 1) setLastSyncedText("Updated just now");
            else if (minutes < 60) setLastSyncedText(`Synced ${minutes}m ago`);
            else setLastSyncedText(`Synced ${Math.floor(minutes / 60)}h ago`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch proof-of-work stats:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCodeforces() {
      try {
        const cfRes = await fetch(
          `https://codeforces.com/api/user.info?handles=${profileData.codingProfiles.codeforces.username}`
        );
        if (cfRes.ok) {
          const cfJson = await cfRes.json();
          if (cfJson?.status === "OK" && cfJson.result?.[0]) {
            setCodeforces(cfJson.result[0]);
          }
        }
      } catch (err) {
        // Silent catch
      }
    }

    fetchData();
    fetchCodeforces();
  }, []);

  const gh = data?.github;
  const lc = data?.leetcode;

  return (
    <section id="coding" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-sm tracking-widest text-primary font-mono uppercase mb-2">Engineering Activity</h2>
            <h3 className="text-3xl font-bold">Proof of Work</h3>
          </div>

          {!loading && (
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-card/60 px-3 py-1.5 rounded-full border border-white/5">
              <RefreshCw size={12} className="text-primary animate-spin-slow" />
              <span>{lastSyncedText}</span>
            </div>
          )}
        </div>

        {/* 4 Standard Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-[#FFA116]/50 transition-all relative overflow-hidden shadow-lg hover:shadow-[#FFA116]/10"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#FFA116]/10 blur-[45px] rounded-full pointer-events-none group-hover:bg-[#FFA116]/20 transition-all duration-500" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Code2 className="text-[#FFA116] animate-pulse" size={24} />
                <h4 className="font-bold text-lg">LeetCode</h4>
              </div>
              <a
                href={profileData.codingProfiles.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#FFA116] transition-colors"
                aria-label="LeetCode Profile"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-between relative z-10">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-9 bg-white/5 rounded w-24"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                </div>
              ) : lc && lc.totalSolved > 0 ? (
                <>
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <p className="text-4xl font-bold text-white font-mono tracking-tight">
                        <AnimatedNumber value={lc.totalSolved} />
                      </p>
                      {/* Contest Rating Glowing Badge */}
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1 text-xs font-mono text-[#FFA116] bg-[#FFA116]/15 px-2.5 py-1 rounded-full border border-[#FFA116]/30 shadow-[0_0_12px_rgba(255,161,22,0.2)]"
                      >
                        <Trophy size={12} className="text-[#FFA116]" />
                        <span>Rating: <AnimatedNumber value={lc.contestRating || 1775} /></span>
                      </motion.div>
                    </div>

                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Problems Solved</p>
                  </div>

                  {/* Active Days & Difficulty Stats */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-amber-300">
                        <Zap size={13} className="fill-amber-300 text-amber-300 animate-bounce" />
                        <strong className="text-white"><AnimatedNumber value={lc.totalActiveDays || 126} /></strong> Active Days
                      </span>
                      {lc.streak > 0 && (
                        <span className="flex items-center gap-1 text-orange-400">
                          <Flame size={13} className="fill-orange-400" />
                          {lc.streak}d streak
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                      <span className="text-[#00b8a3] bg-[#00b8a3]/10 px-2 py-0.5 rounded border border-[#00b8a3]/20">
                        Easy {lc.easySolved}
                      </span>
                      <span className="text-[#ffc01e] bg-[#ffc01e]/10 px-2 py-0.5 rounded border border-[#ffc01e]/20">
                        Med {lc.mediumSolved}
                      </span>
                      <span className="text-[#ff375f] bg-[#ff375f]/10 px-2 py-0.5 rounded border border-[#ff375f]/20">
                        Hard {lc.hardSolved}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-2">
                  <p className="text-muted-foreground text-sm mb-3">Live stats loading...</p>
                  <a
                    href={profileData.codingProfiles.leetcode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#FFA116] hover:underline"
                  >
                    View Profile ↗
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* 2. Codeforces Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-[#1F8ACB]/50 transition-all relative overflow-hidden shadow-lg hover:shadow-[#1F8ACB]/10"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#1F8ACB]/10 blur-[45px] rounded-full pointer-events-none group-hover:bg-[#1F8ACB]/20 transition-all duration-500" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-[#1F8ACB]" size={24} />
                <h4 className="font-bold text-lg">Codeforces</h4>
              </div>
              <a
                href={profileData.codingProfiles.codeforces.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#1F8ACB] transition-colors"
                aria-label="Codeforces Profile"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-9 bg-white/5 rounded w-24"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                </div>
              ) : codeforces ? (
                <>
                  <p className="text-4xl font-bold text-white mb-1 font-mono">{codeforces.rating || "Unrated"}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Rating</p>
                  <div className="flex justify-between text-xs font-mono text-muted-foreground pt-2 border-t border-white/5">
                    <span>Rank: {codeforces.rank || "N/A"}</span>
                    <span>Max: {codeforces.maxRating || "N/A"}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-2">
                  <p className="text-muted-foreground text-sm mb-3">Live stats loading...</p>
                  <a
                    href={profileData.codingProfiles.codeforces.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#1F8ACB] hover:underline"
                  >
                    View Profile ↗
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* 3. GeeksforGeeks Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-[#2f8D46]/50 transition-all relative overflow-hidden shadow-lg hover:shadow-[#2f8D46]/10"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#2f8D46]/10 blur-[45px] rounded-full pointer-events-none group-hover:bg-[#2f8D46]/20 transition-all duration-500" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <Activity className="text-[#2f8D46]" size={24} />
                <h4 className="font-bold text-lg">GeeksforGeeks</h4>
              </div>
              <a
                href={profileData.codingProfiles.geeksforgeeks.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#2f8D46] transition-colors"
                aria-label="GFG Profile"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              <div className="py-2">
                <p className="text-4xl font-bold text-white mb-1 font-mono">30</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Problems Solved</p>
                <a
                  href={profileData.codingProfiles.geeksforgeeks.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#2f8D46] hover:underline"
                >
                  View Profile ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* 4. GitHub Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-white/50 transition-all relative overflow-hidden shadow-lg hover:shadow-white/5"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 blur-[45px] rounded-full pointer-events-none group-hover:bg-white/10 transition-all duration-500" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <Github size={24} className="text-white" />
                <h4 className="font-bold text-lg">GitHub</h4>
              </div>
              <a
                href={profileData.codingProfiles.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-9 bg-white/5 rounded w-24"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                </div>
              ) : gh ? (
                <>
                  <p className="text-4xl font-bold text-white mb-1 font-mono">
                    <AnimatedNumber value={gh.totalRepositories} />
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Repositories</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted-foreground pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star size={12} fill="currentColor" /> {gh.starredRepositories} Starred
                    </span>
                    <span>{gh.followers} Followers</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-2">
                  <p className="text-muted-foreground text-sm mb-3">Live stats loading...</p>
                  <a
                    href={profileData.codingProfiles.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white hover:underline"
                  >
                    View Profile ↗
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Dual Real Contribution Heatmaps Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* GitHub Real Contribution Heatmap */}
          <ContributionHeatmap
            data={gh?.contributions || []}
            colorScheme="github"
            title="GitHub Contributions"
            username={profileData.codingProfiles.github.username}
            totalLabel={`${gh?.totalContributions || 0} total contributions in the last year`}
            streak={gh?.currentStreak}
            longestStreak={gh?.longestStreak}
            profileUrl={profileData.codingProfiles.github.url}
          />

          {/* LeetCode Real Submission Heatmap */}
          <ContributionHeatmap
            data={lc?.submissions || []}
            colorScheme="leetcode"
            title="LeetCode Activity"
            username={profileData.codingProfiles.leetcode.username}
            totalLabel={`${lc?.totalSolved || 0} solved problems across ${lc?.totalActiveDays || 126} active days`}
            streak={lc?.streak}
            profileUrl={profileData.codingProfiles.leetcode.url}
          />
        </motion.div>
      </div>
    </section>
  );
}
