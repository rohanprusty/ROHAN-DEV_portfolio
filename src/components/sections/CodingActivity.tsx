"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { ExternalLink, Code2, Activity, TrendingUp, GitCommit } from "lucide-react";
import { Github } from "@/components/icons";

export function CodingActivity() {
  const [stats, setStats] = useState<any>({
    leetcode: null,
    codeforces: null,
    github: null,
    loading: true,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats({
            leetcode: data.leetcode,
            codeforces: data.codeforces,
            github: data.github,
            loading: false,
          });
        } else {
          setStats((prev: any) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        setStats((prev: any) => ({ ...prev, loading: false }));
      }
    }

    fetchStats();
  }, []);

  return (
    <section id="coding" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h2 className="text-sm tracking-widest text-primary font-mono uppercase mb-2">Engineering Activity</h2>
          <h3 className="text-3xl font-bold">Proof of Work</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-[#FFA116]/50 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFA116]/5 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <Code2 className="text-[#FFA116]" size={24} />
                <h4 className="font-bold text-lg">LeetCode</h4>
              </div>
              <a href={profileData.codingProfiles.leetcode.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#FFA116] transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {stats.loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-white/5 rounded w-24"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                </div>
              ) : stats.leetcode ? (
                <>
                  <p className="text-4xl font-bold text-white mb-2">{stats.leetcode.totalSolved}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Solved</p>
                  <div className="flex gap-4 text-xs font-mono">
                    <span className="text-[#00b8a3]">E: {stats.leetcode.easySolved}</span>
                    <span className="text-[#ffc01e]">M: {stats.leetcode.mediumSolved}</span>
                    <span className="text-[#ff375f]">H: {stats.leetcode.hardSolved}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm mb-4">Live stats unavailable</p>
                  <a href={profileData.codingProfiles.leetcode.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#FFA116] hover:underline">View Profile ↗</a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Codeforces Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-[#1F8ACB]/50 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1F8ACB]/5 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-[#1F8ACB]" size={24} />
                <h4 className="font-bold text-lg">Codeforces</h4>
              </div>
              <a href={profileData.codingProfiles.codeforces.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#1F8ACB] transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {stats.loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-white/5 rounded w-24"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                </div>
              ) : stats.codeforces ? (
                <>
                  <p className="text-4xl font-bold text-white mb-2">{stats.codeforces.rating || "Unrated"}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Rating</p>
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Rank: {stats.codeforces.rank || "N/A"}</span>
                    <span>Max: {stats.codeforces.maxRating || "N/A"}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm mb-4">Live stats unavailable</p>
                  <a href={profileData.codingProfiles.codeforces.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#1F8ACB] hover:underline">View Profile ↗</a>
                </div>
              )}
            </div>
          </motion.div>

          {/* GeeksforGeeks Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-[#2f8D46]/50 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#2f8D46]/5 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <Activity className="text-[#2f8D46]" size={24} />
                <h4 className="font-bold text-lg">GeeksforGeeks</h4>
              </div>
              <a href={profileData.codingProfiles.geeksforgeeks.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#2f8D46] transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              <div className="text-center py-4">
                 <div className="flex items-center justify-center gap-2 mb-4">
                   <div className="w-16 h-2 bg-[#2f8D46]/20 rounded overflow-hidden">
                     <div className="w-full h-full bg-[#2f8D46] animate-[pulse_2s_ease-in-out_infinite]" />
                   </div>
                 </div>
                 <p className="text-muted-foreground text-sm mb-4">300+ Problems Solved</p>
                 <a href={profileData.codingProfiles.geeksforgeeks.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#2f8D46] hover:underline">View Profile ↗</a>
              </div>
            </div>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-white/50 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <Github size={24} className="text-white" />
                <h4 className="font-bold text-lg">GitHub</h4>
              </div>
              <a href={profileData.codingProfiles.github.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {stats.loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-white/5 rounded w-24"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                </div>
              ) : stats.github ? (
                <>
                  <p className="text-4xl font-bold text-white mb-2">{stats.github.public_repos}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Repositories</p>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <GitCommit size={14} className="text-primary" />
                    <span>{stats.github.followers} Followers</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm mb-4">Live stats unavailable</p>
                  <a href={profileData.codingProfiles.github.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:underline">View Profile ↗</a>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* GitHub Contribution Heatmap (Static/Placeholder due to CORS complexity on client) */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="mt-6 bg-card border border-border rounded-xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-lg flex items-center gap-2"><GitCommit size={20} className="text-primary"/> Contribution Activity</h4>
            <a href={profileData.codingProfiles.github.url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted-foreground hover:text-primary flex items-center gap-1">
              @{profileData.codingProfiles.github.username} <ExternalLink size={12} />
            </a>
          </div>
          
          <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
             <div className="min-w-[700px]">
                {/* A simplified visual representation of a contribution graph */}
                <div className="flex gap-[3px]">
                  {mounted && Array.from({ length: 52 }).map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, rowIndex) => {
                        // Generate random intensity for the aesthetic
                        const intensity = Math.random();
                        let bgClass = "bg-[#161b22]";
                        if (intensity > 0.8) bgClass = "bg-[#39d353]";
                        else if (intensity > 0.6) bgClass = "bg-[#26a641]";
                        else if (intensity > 0.4) bgClass = "bg-[#006d32]";
                        else if (intensity > 0.2) bgClass = "bg-[#0e4429]";

                        return (
                          <motion.div 
                            key={`${colIndex}-${rowIndex}`} 
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: colIndex * 0.01 + rowIndex * 0.005 }}
                            className={`w-3 h-3 rounded-[2px] ${bgClass} hover:ring-1 ring-white/50 transition-all`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
