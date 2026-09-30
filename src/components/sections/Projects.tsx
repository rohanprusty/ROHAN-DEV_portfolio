"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";
import { ExternalLink, X, ArrowUpRight, Sparkles, FolderGit2 } from "lucide-react";
import { Github as GithubIcon } from "@/components/icons";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof profileData.projects[0] | null>(null);

  // Lock body scroll when modal is open
  if (typeof document !== "undefined") {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-[#f39c12]/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#ff6b6b]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#f39c12] uppercase mb-3 shadow-inner"
          >
            <Sparkles size={13} className="text-[#f39c12]" />
            <span>MY WORK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase"
          >
            Featured Projects
          </motion.h2>

          {/* Subtle Horizontal Accent Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-[#f39c12] to-transparent rounded-full mt-4 origin-left"
          />
        </div>

        {/* ========================================================================= */}
        {/* PROJECT SHOWCASE GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profileData.projects.map((project, index) => {
            const hasLiveLink = project.live && project.live !== "#";
            const hasGithubLink = project.github && project.github !== "#";

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-[#141418]/75 backdrop-blur-md border border-white/10 hover:border-[#f39c12]/40 rounded-[22px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(243,156,18,0.12)] transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={(e) => {
                  // If clicking directly on action buttons or links, don't open modal
                  if ((e.target as HTMLElement).closest("a")) return;
                  setSelectedProject(project);
                }}
              >
                {/* 1. LARGE PROJECT COVER IMAGE */}
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-black/50 border-b border-white/10">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-zinc-600">
                      <FolderGit2 size={48} />
                    </div>
                  )}

                  {/* Gradient Overlay for Smooth Blending */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-black/20 to-transparent pointer-events-none" />

                  {/* Hover Floating Overlay Badge */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#f39c12]/40 text-[#f39c12] shadow-lg">
                      View Case Study <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>

                {/* 2. CARD CONTENT AREA */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header Row: Title, Tagline & Date */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#f39c12] transition-colors tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400 mt-0.5">
                          {project.tagline}
                        </p>
                      </div>

                      <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-md shrink-0">
                        {project.date}
                      </span>
                    </div>

                    {/* Concise Impact Description */}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed my-3 line-clamp-3">
                      {project.summary || project.bullets[0]}
                    </p>

                    {/* Technology Stack Pills (Rounded 999px) */}
                    <div className="flex flex-wrap gap-1.5 my-4">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#f39c12]/10 text-[#f39c12] border border-[#f39c12]/20 group-hover:bg-[#f39c12]/15 group-hover:border-[#f39c12]/35 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3. ACTION BUTTONS FOOTER */}
                  <div className="pt-4 border-t border-white/10 mt-auto flex items-center gap-3">
                    {/* GitHub Button */}
                    {hasGithubLink ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:border-white/20 group/btn"
                        aria-label={`${project.title} GitHub Repository`}
                      >
                        <GithubIcon size={15} className="text-zinc-300 group-hover/btn:text-white transition-colors" />
                        <span>GitHub</span>
                        <ArrowUpRight size={13} className="text-zinc-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-500 text-xs font-mono text-center cursor-not-allowed flex items-center justify-center gap-2">
                        <GithubIcon size={15} /> Private Repo
                      </span>
                    )}

                    {/* Live View Button */}
                    {hasLiveLink ? (
                      <a
                        href={project.live!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#f39c12]/15 hover:bg-[#f39c12] border border-[#f39c12]/30 text-[#f39c12] hover:text-black text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(243,156,18,0.12)] group/btn"
                        aria-label={`${project.title} Live Demo`}
                      >
                        <ExternalLink size={14} />
                        <span>Live View</span>
                        <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-500 text-xs font-mono text-center cursor-not-allowed">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY DEEP-DIVE MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0e0e12] border border-white/10 rounded-2xl shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors z-20"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Cover Header */}
              {selectedProject.image && (
                <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/40 to-transparent" />
                </div>
              )}

              <div className="p-6 sm:p-10">
                <div className="mb-6">
                  <span className="text-xs font-mono text-[#f39c12] uppercase tracking-widest px-2.5 py-1 rounded bg-[#f39c12]/10 border border-[#f39c12]/20 inline-block mb-2">
                    {selectedProject.tagline}
                  </span>
                  <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-sm font-semibold text-[#f39c12] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]" /> Problem & Core Architecture
                    </h4>
                    <p className="text-zinc-300 leading-relaxed text-sm">
                      {selectedProject.bullets[0]}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm font-semibold text-[#f39c12] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]" /> Key Innovation & Engineering
                    </h4>
                    <p className="text-zinc-300 leading-relaxed text-sm">
                      {selectedProject.bullets[1]}
                    </p>
                  </section>

                  {selectedProject.bullets.length > 2 && (
                    <section>
                      <h4 className="text-sm font-semibold text-[#f39c12] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]" /> Scalability & Monetization
                      </h4>
                      <p className="text-zinc-300 leading-relaxed text-sm">
                        {selectedProject.bullets[2]}
                      </p>
                    </section>
                  )}

                  <section>
                    <h4 className="text-sm font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-3 py-1 bg-[#f39c12]/10 text-[#f39c12] border border-[#f39c12]/20 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Actions inside modal */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
                    {selectedProject.github && selectedProject.github !== "#" ? (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors flex items-center gap-2 text-sm"
                      >
                        <GithubIcon size={16} /> View Source Code
                      </a>
                    ) : (
                      <span className="px-5 py-2.5 bg-white/5 border border-white/5 text-zinc-500 rounded-xl font-medium flex items-center gap-2 text-sm cursor-not-allowed">
                        <GithubIcon size={16} /> Private Repository
                      </span>
                    )}

                    {selectedProject.live && selectedProject.live !== "#" ? (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-[#f39c12] text-black font-semibold rounded-xl hover:bg-[#f39c12]/90 transition-colors flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(243,156,18,0.3)]"
                      >
                        <ExternalLink size={16} /> Launch Live Demo
                      </a>
                    ) : (
                      <span className="px-5 py-2.5 bg-white/5 border border-white/5 text-zinc-500 rounded-xl font-medium flex items-center gap-2 text-sm cursor-not-allowed">
                        <ExternalLink size={16} /> Demo Unavailable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

