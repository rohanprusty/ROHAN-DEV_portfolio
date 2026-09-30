"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { Download, Mail, Sparkles, Trophy, Award, Users, CheckCircle2 } from "lucide-react";

export function RecruiterSnapshot() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#f39c12]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#f39c12] uppercase mb-3 shadow-inner"
          >
            <Sparkles size={13} className="text-[#f39c12]" />
            <span>RECRUITER SNAPSHOT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase"
          >
            The 30-Second Overview
          </motion.h2>

          {/* Subtle Orange Decorative Line + Center Element */}
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
        {/* EXECUTIVE SNAPSHOT GLASS CARD */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#141418]/70 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Header Profile Identity */}
          <div className="text-center pb-8 border-b border-white/10">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
              Executive Profile
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {profileData.name}
            </h3>
            <p className="text-sm font-mono text-zinc-300 mt-1">
              B.Tech in Electronics & Communication Engineering &bull; IIIT Jabalpur
            </p>
            <div className="mt-3">
              <span className="inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#f39c12]/15 text-[#f39c12] border border-[#f39c12]/30">
                CPI: 8.1
              </span>
            </div>

            {/* Factual Professional Positioning Statement */}
            <p className="mt-6 text-sm sm:text-base text-zinc-200 leading-relaxed max-w-2xl mx-auto font-normal">
              <span className="text-[#f39c12] font-semibold">AI & Full-Stack Developer</span> engineering{" "}
              <span className="text-[#f39c12] font-semibold">scalable web systems</span>,{" "}
              <span className="text-[#f39c12] font-semibold">real-time applications</span>, and developer-focused products — backed by strong{" "}
              <span className="text-[#f39c12] font-semibold">algorithmic problem solving</span> and hands-on product building.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* TWO-COLUMN CORE BREAKDOWN: TECHNICAL FOCUS vs PROOF OF WORK */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-white/10">
            {/* Left Column: Technical Focus */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-semibold text-[#f39c12] uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]" /> TECHNICAL FOCUS
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-200">
                <li className="flex items-center gap-2">
                  <span className="text-[#f39c12] font-bold">&bull;</span> AI-Powered Applications & Agents
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f39c12] font-bold">&bull;</span> Full-Stack MERN & Micro-Frontends
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f39c12] font-bold">&bull;</span> System Architecture & Scalability
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f39c12] font-bold">&bull;</span> Data Structures & Algorithmic Optimization
                </li>
              </ul>

              {/* Subdued Tech Line */}
              <p className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/5">
                React &bull; Node.js &bull; Express &bull; MongoDB &bull; Docker &bull; C++ &bull; Python &bull; JavaScript
              </p>
            </div>

            {/* Right Column: Proof of Work */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-semibold text-[#f39c12] uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]" /> PROOF OF WORK
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#f39c12] shrink-0" />
                  <span>
                    <strong className="text-white font-semibold">1775 Peak LeetCode Rating</strong> (Competitive Bracket)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#f39c12] shrink-0" />
                  <span>
                    <strong className="text-white font-semibold">400+ Algorithmic Problems</strong> Solved
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#f39c12] shrink-0" />
                  <span>
                    <strong className="text-white font-semibold">3 Substantial AI/Full-Stack</strong> SaaS Systems
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#f39c12] shrink-0" />
                  <span>
                    <strong className="text-white font-semibold">Gold Medalist</strong> — Inter-IIIT Sports Meet
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#f39c12] shrink-0" />
                  <span>
                    <strong className="text-white font-semibold">1st Runner-Up</strong> — E-Summit IIT Roorkee
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STRONGEST METRIC CARDS STRIP */}
          {/* ========================================================================= */}
          <div className="py-8 border-b border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Metric 1 */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#f39c12]/40 transition-all text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">8.1</p>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">CPI / CGPA</p>
              </div>

              {/* Metric 2 */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#f39c12]/40 transition-all text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#f39c12] tracking-tight">1775</p>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">PEAK LEETCODE</p>
              </div>

              {/* Metric 3 */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#f39c12]/40 transition-all text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">400+</p>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">PROBLEMS SOLVED</p>
              </div>

              {/* Metric 4 */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#f39c12]/40 transition-all text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">16+</p>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">TEAMS (INTER-IIIT GOLD)</p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DISTINCTION STRIP (BEYOND CODE) */}
          {/* ========================================================================= */}
          <div className="py-8 border-b border-white/10">
            <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest mb-4">
              DISTINCTIONS & LEADERSHIP
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start">
                <Trophy size={18} className="text-[#f39c12] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">Gold Medalist</h5>
                  <p className="text-[11px] font-mono text-[#f39c12] mt-0.5">Inter-IIIT Sports Meet 2025</p>
                  <p className="text-xs text-zinc-400 mt-1 leading-snug">1st place among 16+ collegiate teams</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start">
                <Award size={18} className="text-[#f39c12] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">1st Runner-Up</h5>
                  <p className="text-[11px] font-mono text-[#f39c12] mt-0.5">E-Summit — IIT Roorkee</p>
                  <p className="text-xs text-zinc-400 mt-1 leading-snug">Pitched tech architecture & business solution</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start">
                <Users size={18} className="text-[#f39c12] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">Team Leadership</h5>
                  <p className="text-[11px] font-mono text-[#f39c12] mt-0.5">IIIT Jabalpur Basketball Club</p>
                  <p className="text-xs text-zinc-400 mt-1 leading-snug">Led 15+ student volunteers across 7+ events</p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PROJECT TAGS PROOF & RECRUITER CTA FOOTER */}
          {/* ========================================================================= */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs text-zinc-400 font-mono mb-2">Built and shipped 3 production SaaS systems:</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#projects"
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] hover:bg-[#f39c12]/15 text-zinc-200 hover:text-[#f39c12] border border-white/10 hover:border-[#f39c12]/30 transition-colors"
                >
                  Synthora AI
                </a>
                <a
                  href="#projects"
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] hover:bg-[#f39c12]/15 text-zinc-200 hover:text-[#f39c12] border border-white/10 hover:border-[#f39c12]/30 transition-colors"
                >
                  Conversa AI
                </a>
                <a
                  href="#projects"
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] hover:bg-[#f39c12]/15 text-zinc-200 hover:text-[#f39c12] border border-white/10 hover:border-[#f39c12]/30 transition-colors"
                >
                  NextRound AI
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                className="px-6 py-3 bg-[#f39c12] text-black font-semibold rounded-xl hover:bg-[#f39c12]/90 transition-all text-xs font-mono flex items-center gap-2 shadow-[0_0_20px_rgba(243,156,18,0.25)] hover:shadow-[0_0_25px_rgba(243,156,18,0.4)] hover:-translate-y-0.5"
              >
                <Mail size={15} />
                <span>HIRE / CONTACT</span>
              </a>

              <a
                href="/resume.pdf"
                download="Rohan_Prusty_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 hover:border-white/20 hover:-translate-y-0.5"
              >
                <Download size={15} />
                <span>VIEW RESUME ↗</span>
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

