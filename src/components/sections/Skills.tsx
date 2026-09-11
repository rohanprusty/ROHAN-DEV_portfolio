"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-sm tracking-widest text-primary font-mono uppercase mb-2">Capabilities</h2>
          <h3 className="text-3xl font-bold">Technical Arsenal</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Programming Languages */}
          <div className="bg-card border border-border p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" /> Programming
            </h4>
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
              {profileData.skills.programming.map((skill) => (
                <motion.span key={skill} variants={item} className="px-3 py-1.5 bg-muted rounded-md text-sm text-foreground font-mono">
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Frameworks & Tech */}
          <div className="bg-card border border-border p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Frameworks & Tools
            </h4>
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
              {profileData.skills.frameworks.map((skill) => (
                <motion.span key={skill} variants={item} className="px-3 py-1.5 bg-muted rounded-md text-sm text-foreground font-mono">
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Core Fundamentals */}
          <div className="bg-card border border-border p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Core CS
            </h4>
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
              {profileData.skills.core.map((skill) => (
                <motion.span key={skill} variants={item} className="px-3 py-1.5 bg-muted rounded-md text-sm text-foreground font-mono">
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
