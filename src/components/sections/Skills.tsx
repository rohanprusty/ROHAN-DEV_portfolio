"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { profileData } from "@/data/profile";
import { TechIcon } from "@/components/TechIcons";
import { Cpu, Terminal, Wrench, Sparkles, Code2, Layers } from "lucide-react";

export function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
  };

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-primary uppercase mb-4 shadow-inner"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>Capabilities & Stack</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Professional Skillset
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            High-performance technologies, modern frameworks, and cloud infrastructure engineered for production scale.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* GROUP 1: PROFESSIONAL SKILLSET (Languages, Frontend, Backend & Databases) */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-10"
          >
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-primary/60" />
              <span className="text-primary font-semibold flex items-center gap-2">
                <Code2 size={15} /> Professional Skillset
              </span>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-primary/60" />
            </div>
            <p className="text-xs text-zinc-500 font-mono">Languages &bull; Frontend &bull; Backend & Databases</p>
          </motion.div>

          {/* Render Groups with clear, sleek category badges */}
          <div className="space-y-12">
            {profileData.skills.professional.map((group, groupIdx) => (
              <div key={group.category} className="flex flex-col items-center">
                {/* Category Label */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {group.category}
                </div>

                {/* Circular Cards Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex flex-wrap justify-center gap-5 sm:gap-7 max-w-4xl"
                >
                  {group.items.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ y: -8, scale: 1.06 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{
                        // Custom property for dynamic glow shadow on hover
                        ["--brand-glow" as string]: skill.glow,
                        ["--brand-color" as string]: skill.color,
                      }}
                      className="group relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-zinc-900/60 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/30 hover:bg-zinc-900/80 hover:shadow-[0_0_30px_var(--brand-glow)] cursor-pointer"
                    >
                      {/* Radial Background Accent on Hover */}
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)`,
                        }}
                      />

                      {/* Icon */}
                      <div className="relative z-10 transform group-hover:scale-[1.08] transition-transform duration-300">
                        <TechIcon name={skill.name} size={36} className="sm:w-10 sm:h-10 md:w-11 md:h-11 filter drop-shadow-md" />
                      </div>

                      {/* Tech Name */}
                      <span className="relative z-10 mt-2 text-[11px] sm:text-xs font-medium text-zinc-300 group-hover:text-white transition-colors tracking-tight text-center px-2 line-clamp-1">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-16" />

        {/* ========================================================================= */}
        {/* GROUP 2: TOOLS & TECHNOLOGIES */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-10"
          >
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/60" />
              <span className="text-blue-400 font-semibold flex items-center gap-2">
                <Wrench size={15} /> Tools & Technologies
              </span>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-blue-500/60" />
            </div>
            <p className="text-xs text-zinc-500 font-mono">DevOps &bull; Cloud &bull; Version Control &bull; Infrastructure</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-5 sm:gap-7 max-w-5xl mx-auto"
          >
            {profileData.skills.tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.06 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  ["--brand-glow" as string]: tool.glow,
                  ["--brand-color" as string]: tool.color,
                }}
                className="group relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-zinc-900/60 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/30 hover:bg-zinc-900/80 hover:shadow-[0_0_30px_var(--brand-glow)] cursor-pointer"
              >
                {/* Radial Background Accent on Hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${tool.color} 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div className="relative z-10 transform group-hover:scale-[1.08] transition-transform duration-300">
                  <TechIcon name={tool.name} size={36} className="sm:w-10 sm:h-10 md:w-11 md:h-11 filter drop-shadow-md" />
                </div>

                {/* Tech Name */}
                <span className="relative z-10 mt-2 text-[11px] sm:text-xs font-medium text-zinc-300 group-hover:text-white transition-colors tracking-tight text-center px-2 line-clamp-1">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* CORE CS & FOUNDAMENTALS SUBSECTION (Clean horizontal pill strip) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-blue-500 to-emerald-500" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Cpu size={18} className="text-primary" />
                <span>Core Computer Science & Engineering Principles</span>
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Fundamental computer science concepts applied in real-world system engineering.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {profileData.skills.core.map((concept) => (
                <span
                  key={concept}
                  className="px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-primary/40 hover:bg-white/10 transition-all duration-200"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
