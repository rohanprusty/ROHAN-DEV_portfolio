"use client";

import { motion } from "framer-motion";

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h2 className="text-sm tracking-widest text-primary font-mono uppercase mb-2">My Journey</h2>
          <h3 className="text-3xl font-bold">Experience</h3>
        </div>

        {/* Timeline placeholder - the resume didn't have dedicated experience outside of projects & leadership */}
        <div className="relative border-l-2 border-border ml-4 md:ml-6 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-8"
          >
            {/* Timeline node */}
            <div className="absolute w-4 h-4 rounded-full bg-primary -left-[9px] top-1 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            
            <h4 className="text-xl font-bold">Independent Software Engineer</h4>
            <p className="text-sm text-primary font-mono mb-2">2023 - Present</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Architecting and building complex full-stack applications, AI platforms, and micro-frontend systems. Focusing on performance, scalability, and user experience.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-card border border-border p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-foreground">3+</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Major Apps</p>
              </div>
              <div className="bg-card border border-border p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-foreground">{'<50ms'}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Compile Latency</p>
              </div>
              <div className="bg-card border border-border p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-foreground">99.9%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Availability</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
