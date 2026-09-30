"use client";

import { motion } from "framer-motion";
import { Terminal, Trophy, Users, Award, Sparkles, FolderGit2, Cpu } from "lucide-react";

interface TimelineItem {
  id: string;
  category: "EXPERIENCE" | "TECHNICAL MILESTONE" | "LEADERSHIP & ACHIEVEMENT";
  title: string;
  subtitle?: string;
  date: string;
  tech?: string[];
  metricPill?: string;
  icon?: any;
  bullets: Array<{
    text: string;
    highlights: string[];
  }>;
}

const TIMELINE_DATA: TimelineItem[] = [
  // CATEGORY 1: EXPERIENCE
  {
    id: "synthora-ai",
    category: "EXPERIENCE",
    title: "Synthora AI — AI-Powered SaaS Platform",
    date: "Aug. 2025",
    tech: ["React 19", "Node.js", "OpenRouter API", "MongoDB", "Razorpay"],
    bullets: [
      {
        text: "Engineered an AI-powered SaaS platform using text prompts and vision-to-code models to dynamically generate production-ready React components, backed by an in-browser sandbox with sub-50ms compile latency.",
        highlights: ["AI-powered SaaS", "vision-to-code", "sub-50ms compile latency"],
      },
      {
        text: "Published a custom Node.js CLI utility to the npm registry, enabling developers to inject generated UI assets directly into local workspaces and reducing repetitive project scaffolding.",
        highlights: ["Node.js CLI", "npm"],
      },
      {
        text: "Architected a full-stack MERN infrastructure with stateless JWT authentication and Razorpay webhooks, supporting a tiered credit-based monetization system.",
        highlights: ["MERN", "JWT authentication", "Razorpay"],
      },
    ],
  },
  {
    id: "conversa-ai",
    category: "EXPERIENCE",
    title: "Conversa AI — Voice AI Fleet Management Platform",
    date: "Jun. 2025",
    tech: ["Node.js", "React 19", "Docker", "Web Speech API", "MongoDB"],
    bullets: [
      {
        text: "Architected a scalable micro-frontend system using custom Vite ES-module bundling, achieving O(1) widget injection through a single script tag with 100% CSS isolation across 50+ host DOMs.",
        highlights: ["micro-frontend", "O(1) widget injection", "100% CSS isolation"],
      },
      {
        text: "Integrated the Web Speech API with an optimized intent-parsing engine, achieving sub-150ms voice-to-text latency and 95% contextual navigation accuracy using hash-map routing.",
        highlights: ["sub-150ms latency", "95% contextual accuracy"],
      },
      {
        text: "Engineered a concurrent 3-stage CI/CD pipeline with GitHub Actions and Docker, reducing container build times by 40% and enabling zero-downtime deployment hooks targeting 99.9% backend availability.",
        highlights: ["CI/CD", "Docker", "99.9% availability"],
      },
    ],
  },
  {
    id: "nextround-ai",
    category: "EXPERIENCE",
    title: "NextRound AI — Enterprise B2B Mock Interview OS",
    date: "Apr. 2025",
    tech: ["MERN Stack", "OpenRouter API", "Monaco Editor", "face-api.js", "TailwindCSS"],
    bullets: [
      {
        text: "Built an AI-powered mock interview environment integrating OpenRouter/GPT-4o-mini for dynamic voice interactions alongside a live Monaco Editor for real-time code evaluation and Big-O analysis.",
        highlights: ["AI-powered mock interviews", "GPT-4o-mini", "Monaco Editor", "Big-O analysis"],
      },
      {
        text: "Developed an enterprise proctoring engine using face-api.js for continuous facial/posture telemetry, combined with tab-switch monitoring and IDE copy/paste prevention.",
        highlights: ["face-api.js"],
      },
      {
        text: "Built automated backend pipelines for real-time audio processing and AST-based code analysis, generating personalized PDF performance reports and supporting tiered Razorpay subscriptions.",
        highlights: ["AST parsing", "real-time audio", "Razorpay"],
      },
    ],
  },
  // CATEGORY 2: TECHNICAL MILESTONE
  {
    id: "cp-dsa",
    category: "TECHNICAL MILESTONE",
    title: "Competitive Programming & DSA",
    subtitle: "LeetCode · Codeforces · GeeksforGeeks",
    date: "Ongoing",
    metricPill: "Peak LeetCode Rating — 1775",
    icon: Terminal,
    bullets: [
      {
        text: "Achieved a peak LeetCode rating of 1775 and solved 400+ algorithmic problems across LeetCode, Codeforces, and GeeksforGeeks.",
        highlights: ["1775", "400+ problems"],
      },
      {
        text: "Applied optimized approaches across tree traversal, dynamic programming, graph algorithms, and advanced array manipulation under time-constrained conditions.",
        highlights: ["Trees", "Dynamic Programming", "Graph Algorithms", "Algorithmic Problem Solving"],
      },
    ],
  },
  // CATEGORY 3: LEADERSHIP & ACHIEVEMENT
  {
    id: "gold-medalist",
    category: "LEADERSHIP & ACHIEVEMENT",
    title: "Gold Medalist — Inter-IIIT Sports Meet 2025",
    subtitle: "Basketball",
    date: "2025",
    icon: Trophy,
    bullets: [
      {
        text: "Won 1st place among 16+ collegiate teams in a high-stakes national-level tournament.",
        highlights: ["Gold Medalist", "1st Place", "16+ Teams"],
      },
      {
        text: "Demonstrated leadership, strategic coordination, and high-performance execution under pressure.",
        highlights: ["Leadership", "Strategic Coordination"],
      },
    ],
  },
  {
    id: "basketball-team-captain",
    category: "LEADERSHIP & ACHIEVEMENT",
    title: "Team Captain — IIIT Jabalpur Basketball Club",
    subtitle: "Basketball Club",
    date: "2024 – Present",
    icon: Users,
    bullets: [
      {
        text: "Managed end-to-end operations for 7+ inter-collegiate and intra-collegiate events.",
        highlights: ["7+ Events", "Event Operations"],
      },
      {
        text: "Led and mentored 15+ student volunteers, coordinating tournament execution and day-to-day club operations.",
        highlights: ["15+ Volunteers", "Team Leadership"],
      },
    ],
  },
  {
    id: "esummit-runner-up",
    category: "LEADERSHIP & ACHIEVEMENT",
    title: "1st Runner-Up — E-Summit, IIT Roorkee",
    subtitle: "MTP",
    date: "2024",
    icon: Award,
    bullets: [
      {
        text: "Led a multidisciplinary team to pitch technical architecture and innovative business solutions before a panel of industry experts.",
        highlights: ["1st Runner-Up", "IIT Roorkee", "Multidisciplinary Team", "Technical Architecture", "Business Solutions"],
      },
      {
        text: "Demonstrated entrepreneurial problem-solving, technical communication, and decision-making under competitive pressure.",
        highlights: ["entrepreneurial problem-solving"],
      },
    ],
  },
];

// Helper to highlight specific terms in text
function renderHighlightedText(text: string, highlights: string[]) {
  if (!highlights || highlights.length === 0) return text;

  // Sort highlights by length descending to prevent partial match overwrites
  const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
  const regexPattern = new RegExp(`(${sortedHighlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");

  const parts = text.split(regexPattern);

  return parts.map((part, idx) => {
    const isMatched = sortedHighlights.some((h) => h.toLowerCase() === part.toLowerCase());
    if (isMatched) {
      return (
        <span key={idx} className="font-semibold text-[#f39c12]">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f39c12]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-[#ff6b6b]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#f39c12] uppercase mb-3 shadow-inner"
          >
            <Sparkles size={13} className="text-[#f39c12]" />
            <span>Track Record & Accomplishments</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase"
          >
            EXPERIENCE
          </motion.h2>

          {/* Subtle Orange Decorative Line + Circular Center Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#f39c12]" />
            <div className="w-3 h-3 rounded-full border-2 border-[#f39c12] bg-[#07070c] shadow-[0_0_10px_rgba(243,156,18,0.8)]" />
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#f39c12]" />
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* INTRODUCTION CARD */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-20 p-6 sm:p-8 rounded-2xl bg-[#141418]/65 backdrop-blur-md border border-white/10 border-l-4 border-l-[#f39c12] shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
        >
          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
            I build{" "}
            <span className="text-[#f39c12] font-semibold">AI-powered systems</span> with a focus on{" "}
            <span className="text-[#f39c12] font-semibold">full-stack development</span>,{" "}
            <span className="text-[#f39c12] font-semibold">scalable architecture</span>,{" "}
            <span className="text-[#f39c12] font-semibold">real-time applications</span>, and developer-focused tooling — combining modern web technologies with strong{" "}
            <span className="text-[#f39c12] font-semibold">algorithmic problem solving</span>.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* CENTRAL VERTICAL TIMELINE */}
        {/* ========================================================================= */}
        <div className="relative">
          {/* Central Vertical Line (Desktop: centered; Mobile: left-aligned at left-6) */}
          <div className="absolute left-6 lg:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#f39c12]/80 via-[#f39c12]/30 to-[#f39c12]/80 pointer-events-none" />

          {/* Render Items */}
          <div className="space-y-12 lg:space-y-16">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0; // Even index -> Left on desktop; Odd index -> Right on desktop
              const Icon = item.icon || FolderGit2;

              // Check if we should insert a category marker badge before this item
              const showCategoryHeader =
                index === 0 || TIMELINE_DATA[index - 1].category !== item.category;

              return (
                <div key={item.id} className="relative">
                  {/* Category Marker Badge along Timeline */}
                  {showCategoryHeader && (
                    <motion.div
                      id={item.category === "LEADERSHIP & ACHIEVEMENT" ? "achievements" : undefined}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="flex justify-start lg:justify-center mb-8 pl-12 lg:pl-0 scroll-mt-28"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181c] border border-[#f39c12]/40 text-xs font-mono tracking-widest text-[#f39c12] uppercase shadow-[0_0_15px_rgba(243,156,18,0.2)] z-10">
                        <span className="w-2 h-2 rounded-full bg-[#f39c12] animate-pulse" />
                        {item.category}
                      </div>
                    </motion.div>
                  )}

                  {/* Main Timeline Row */}
                  <div
                    className={`relative flex flex-col lg:flex-row items-center ${
                      isEven ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline Node Center Circle */}
                    <div className="absolute left-6 lg:left-1/2 top-6 -translate-x-1/2 z-20">
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        className="w-4 h-4 rounded-full border-2 border-[#f39c12] bg-[#07070c] shadow-[0_0_12px_rgba(243,156,18,0.8)] transition-all duration-300"
                      />
                    </div>

                    {/* Card Container (Occupies ~44% width on desktop) */}
                    <div className="w-full lg:w-[46%] pl-14 lg:pl-0">
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: isEven ? -30 : 30,
                          y: 10,
                        }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-[#141418]/65 backdrop-blur-md border border-white/10 hover:border-[#f39c12]/40 rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(243,156,18,0.12)] border-l-4 border-l-[#f39c12]"
                      >
                        {/* Header Row: Title & Icon/Date */}
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#f39c12] group-hover:bg-[#f39c12]/10 group-hover:border-[#f39c12]/30 transition-colors shrink-0">
                              <Icon size={18} />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#f39c12] transition-colors leading-snug">
                                {item.title}
                              </h3>
                              {item.subtitle && (
                                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded-md">
                              {item.date}
                            </span>
                          </div>
                        </div>

                        {/* Technology Stack / Metric Tag */}
                        {item.tech && item.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 my-3.5">
                            {item.tech.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] font-mono px-2.5 py-0.5 bg-[#f39c12]/10 text-[#f39c12] border border-[#f39c12]/20 rounded-md"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.metricPill && (
                          <div className="my-3">
                            <span className="inline-block text-xs font-mono px-3 py-1 bg-[#f39c12]/15 text-[#f39c12] border border-[#f39c12]/30 rounded-md font-semibold">
                              {item.metricPill}
                            </span>
                          </div>
                        )}

                        {/* Concise Bullets */}
                        <ul className="space-y-2.5 mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          {item.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5">
                              <span className="text-[#f39c12] font-bold text-sm shrink-0 mt-0.5">
                                •
                              </span>
                              <span>
                                {renderHighlightedText(bullet.text, bullet.highlights)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Empty Space for the opposite column on Desktop */}
                    <div className="hidden lg:block lg:w-[46%]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

