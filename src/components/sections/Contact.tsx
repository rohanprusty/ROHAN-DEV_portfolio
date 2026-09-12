"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, GraduationCap } from "lucide-react";
import { profileData } from "@/data/profile";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 1500);
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-sm tracking-widest text-primary font-mono uppercase mb-2">Let's Talk</h2>
          <h3 className="text-3xl font-bold">Build something useful.</h3>
        </div>

        {/* Dual Email Address Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href={`mailto:${profileData.emails.personal}`}
            className="flex items-center gap-3 p-4 bg-card/80 border border-border rounded-xl hover:border-primary/50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Personal Email</span>
              <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">{profileData.emails.personal}</span>
            </div>
          </a>

          <a
            href={`mailto:${profileData.emails.college}`}
            className="flex items-center gap-3 p-4 bg-card/80 border border-border rounded-xl hover:border-primary/50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">College Email</span>
              <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{profileData.emails.college}</span>
            </div>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 shadow-xl relative overflow-hidden"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center h-[400px]">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4">
                <CheckCircle2 size={64} className="text-primary" />
              </motion.div>
              <h4 className="text-2xl font-bold mb-2">Message received ✓</h4>
              <p className="text-muted-foreground">I'll get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 px-6 py-2 border border-border rounded-full text-sm hover:bg-muted transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                  <input required id="name" name="name" type="text" className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                  <input required id="email" name="email" type="email" className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="purpose" className="text-sm font-medium text-muted-foreground">Purpose</label>
                <select id="purpose" name="purpose" className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground">
                  <option value="software">Software Opportunity</option>
                  <option value="analyst">Business Analyst Opportunity</option>
                  <option value="internship">Internship</option>
                  <option value="other">Other / Collaboration</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                <textarea required id="message" name="message" rows={4} className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="How can I help you?"></textarea>
              </div>
              <button
                disabled={status === "submitting"}
                type="submit"
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
