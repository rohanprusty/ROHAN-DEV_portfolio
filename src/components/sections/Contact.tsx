"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, MapPin, ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { Github as GithubIcon, Linkedin as LinkedinIcon } from "@/components/icons";
import { profileData } from "@/data/profile";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        console.error("Failed to send message via API:", data.error);
        setErrorMessage(data.error || "Failed to send message. Please try sending directly via email.");
        setStatus("error");
      }
    } catch (err: any) {
      console.error("Network error during contact submission:", err);
      setErrorMessage("Network error occurred. Please try again or email directly.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-[#f39c12]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#ff6b6b]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest text-[#f39c12] uppercase mb-3 shadow-inner"
          >
            <Sparkles size={13} className="text-[#f39c12]" />
            <span>LET'S TALK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase"
          >
            Get In Touch
          </motion.h2>

          {/* Subtle Orange Decorative Line + Circular Center Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-4 mb-4"
          >
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#f39c12]" />
            <div className="w-3 h-3 rounded-full border-2 border-[#f39c12] bg-[#07070c] shadow-[0_0_10px_rgba(243,156,18,0.8)]" />
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#f39c12]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* TWO-COLUMN CONTACT COMPOSITION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ------------------------------------------------------------------------- */}
          {/* LEFT COLUMN: ROHAN PERSONAL / PROFILE CARD (~40% desktop) */}
          {/* ------------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-[#141418]/65 backdrop-blur-md border border-white/10 rounded-2xl p-7 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between items-center text-center relative overflow-hidden h-full"
          >
            <div className="w-full flex flex-col items-center">
              {/* Rohan Circular Photo */}
              <div className="relative mb-6 group">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#f39c12] shadow-[0_0_0_4px_rgba(243,156,18,0.08),0_8px_30px_rgba(0,0,0,0.5)] relative">
                  <Image
                    src="/rohan.png"
                    alt={profileData.name}
                    fill
                    sizes="150px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority
                  />
                </div>
              </div>

              {/* Title & Short Bio */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Let's Work Together
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 max-w-sm">
                I’m always open to discussing new opportunities, interesting ideas, collaborations, and projects that create meaningful impact.
              </p>

              {/* Contact Details List */}
              <div className="w-full space-y-3.5 pt-5 border-t border-white/10 text-left mb-6">
                {/* Personal Email */}
                <a
                  href={`mailto:${profileData.emails.personal}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-[#f39c12]/30 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-lg bg-[#f39c12]/10 text-[#f39c12] group-hover:scale-110 transition-transform shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Personal Email
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white group-hover:text-[#f39c12] transition-colors truncate block">
                      {profileData.emails.personal}
                    </span>
                  </div>
                </a>

                {/* College Email */}
                {profileData.emails.college && (
                  <a
                    href={`mailto:${profileData.emails.college}`}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-[#f39c12]/30 transition-all duration-300 group"
                  >
                    <div className="p-2.5 rounded-lg bg-[#f39c12]/10 text-[#f39c12] group-hover:scale-110 transition-transform shrink-0">
                      <GraduationCap size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                        College Email
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-white group-hover:text-[#f39c12] transition-colors truncate block">
                        {profileData.emails.college}
                      </span>
                    </div>
                  </a>
                )}

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="p-2.5 rounded-lg bg-[#f39c12]/10 text-[#f39c12] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white block">
                      {profileData.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Footer */}
            <div className="w-full pt-4 border-t border-white/10 flex items-center justify-center gap-5 mt-auto">
              {profileData.social.github && (
                <a
                  href={profileData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/[0.04] text-zinc-300 hover:text-[#f39c12] hover:bg-[#f39c12]/10 hover:border-[#f39c12]/30 border border-white/10 hover:-translate-y-1 transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={18} />
                </a>
              )}

              {profileData.social.linkedin && (
                <a
                  href={profileData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/[0.04] text-zinc-300 hover:text-[#f39c12] hover:bg-[#f39c12]/10 hover:border-[#f39c12]/30 border border-white/10 hover:-translate-y-1 transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                </a>
              )}

              <a
                href={`mailto:${profileData.email}`}
                className="p-3 rounded-full bg-white/[0.04] text-zinc-300 hover:text-[#f39c12] hover:bg-[#f39c12]/10 hover:border-[#f39c12]/30 border border-white/10 hover:-translate-y-1 transition-all duration-200"
                aria-label="Send Direct Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* ------------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: CONTACT FORM (~60% desktop) */}
          {/* ------------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 bg-[#141418]/40 backdrop-blur-md border border-white/10 rounded-2xl p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-xs font-mono tracking-widest text-[#f39c12] uppercase font-semibold mb-6">
                SEND ME A MESSAGE
              </h3>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full my-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-4 p-4 rounded-full bg-[#f39c12]/10 border border-[#f39c12]/30 text-[#f39c12]"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-2">Message Sent Successfully</h4>
                <p className="text-zinc-400 text-sm max-w-sm">
                  Thank you for reaching out! I've received your email and will reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-8 px-6 py-2.5 border border-white/10 hover:border-[#f39c12]/40 rounded-xl text-xs font-mono text-white hover:text-[#f39c12] bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-200"
                >
                  Send another message
                </button>
              </div>
            ) : status === "error" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full my-auto">
                <div className="mb-4 p-4 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
                  <Mail size={48} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Unable to Send via API</h4>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mb-6">
                  {errorMessage || "Something went wrong while sending the email."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:rohanprusty28@gmail.com?subject=${encodeURIComponent(formData.subject || "Inquiry")}&body=${encodeURIComponent(`Hi Rohan,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`}
                    className="px-6 py-2.5 bg-[#f39c12] text-black font-semibold rounded-xl text-xs font-mono hover:bg-[#f39c12]/90 transition-all shadow-[0_0_15px_rgba(243,156,18,0.25)]"
                  >
                    Open Direct Email Client ↗
                  </a>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 border border-white/10 hover:border-white/20 rounded-xl text-xs font-mono text-white bg-white/[0.03] hover:bg-white/[0.08] transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-medium text-zinc-300">
                        Name
                      </label>
                      <input
                        required
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-[#0c0c10]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#f39c12] focus:ring-1 focus:ring-[#f39c12]/40 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-medium text-zinc-300">
                        Email
                      </label>
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-[#0c0c10]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#f39c12] focus:ring-1 focus:ring-[#f39c12]/40 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-medium text-zinc-300">
                      Subject
                    </label>
                    <input
                      required
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What can I help you with?"
                      className="w-full bg-[#0c0c10]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#f39c12] focus:ring-1 focus:ring-[#f39c12]/40 transition-all duration-200"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-medium text-zinc-300">
                      Message
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className="w-full bg-[#0c0c10]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#f39c12] focus:ring-1 focus:ring-[#f39c12]/40 transition-all duration-200 resize-none"
                    />
                  </div>
                </div>

                {/* Submit CTA Button */}
                <div className="pt-3 mt-auto">
                  <button
                    disabled={status === "submitting"}
                    type="submit"
                    className="px-7 py-3.5 rounded-xl bg-[#f39c12] text-black font-semibold hover:bg-[#f39c12]/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(243,156,18,0.25)] hover:shadow-[0_0_25px_rgba(243,156,18,0.4)] hover:-translate-y-0.5 group/btn disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {status === "submitting" ? (
                      "Sending..."
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}

