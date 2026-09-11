"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { Award, Trophy, Users } from "lucide-react";

export function Achievements() {
  return (
    <section id="achievements" className="py-24 relative bg-muted/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h2 className="text-sm tracking-widest text-primary font-mono uppercase mb-2">Beyond Code</h2>
          <h3 className="text-3xl font-bold">Leadership & Competitive Edge</h3>
        </div>

        <div className="space-y-8">
          {/* Competitive Programming */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 p-6 border-l-2 border-primary bg-card/50 rounded-r-xl"
          >
            <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-primary/20 items-center justify-center">
              <CodeIcon className="text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Algorithmic Problem Solving</h4>
              <p className="text-sm text-primary font-mono mb-4">LeetCode | Codeforces | GeeksforGeeks</p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {profileData.competitive.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Achievements Map */}
          {profileData.achievements.map((ach, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 p-6 border-l-2 border-primary bg-card/50 rounded-r-xl"
            >
              <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-primary/20 items-center justify-center">
                {index === 0 ? <Trophy className="text-primary" /> : index === 1 ? <Users className="text-primary" /> : <Award className="text-primary" />}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{ach.title}</h4>
                <p className="text-sm text-primary font-mono mb-4">{ach.event}</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {ach.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeIcon(props: any) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
