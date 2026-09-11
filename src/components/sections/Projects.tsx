"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";
import { ExternalLink, FolderGit2, X, ChevronRight } from "lucide-react";
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
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h2 className="text-sm tracking-widest text-primary font-mono uppercase mb-2">My Work</h2>
          <h3 className="text-3xl font-bold">Featured Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl flex flex-col h-full overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/5 relative cursor-pointer"
              onClick={(e) => {
                // Prevent modal if clicking links
                if ((e.target as HTMLElement).closest('a')) return;
                setSelectedProject(project);
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedProject(project);
              }}
            >
              {/* Project Top / Icons */}
              <div className="p-6 pb-4 flex justify-between items-start">
                <FolderGit2 className="text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={32} />
                <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {project.github && project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub Repository">
                      <GithubIcon size={20} />
                    </a>
                  )}
                  {project.live && project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-0 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h4>
                  <span className="text-xs font-mono text-muted-foreground">{project.date}</span>
                </div>
                <p className="text-sm font-medium text-foreground mb-4">{project.tagline}</p>
                
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 flex-1">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="line-clamp-3">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-1 bg-muted rounded-md text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-2 flex items-center gap-1">
                  View Case Study <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-full overflow-y-auto bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-primary font-mono text-sm uppercase tracking-widest">{selectedProject.tagline}</p>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> The Problem & Approach
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {selectedProject.bullets[0]}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Technical Highlights
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {selectedProject.bullets[1]}
                    </p>
                  </section>

                  {selectedProject.bullets.length > 2 && (
                    <section>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Result & Impact
                      </h4>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {selectedProject.bullets[2]}
                      </p>
                    </section>
                  )}

                  <section>
                    <h4 className="text-lg font-semibold text-white mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, i) => (
                        <span key={i} className="text-xs font-mono px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </section>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
                    {selectedProject.github && selectedProject.github !== "#" ? (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm">
                        <GithubIcon size={16} /> View Source
                      </a>
                    ) : (
                      <span className="px-5 py-2.5 bg-white/5 border border-white/5 text-zinc-500 rounded-lg font-medium flex items-center gap-2 text-sm cursor-not-allowed">
                        <GithubIcon size={16} /> Private Repo
                      </span>
                    )}
                    
                    {selectedProject.live && selectedProject.live !== "#" ? (
                      <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    ) : (
                      <span className="px-5 py-2.5 bg-white/5 border border-white/5 text-zinc-500 rounded-lg font-medium flex items-center gap-2 text-sm cursor-not-allowed">
                        <ExternalLink size={16} /> Source Unavailable
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

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
