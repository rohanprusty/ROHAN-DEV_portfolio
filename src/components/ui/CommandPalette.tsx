"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Briefcase, FolderGit2, Trophy, Code2, User, FileText, X } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { profileData } from "@/data/profile";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let typedStr = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette trigger
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }

      // 'hire' easter egg
      if (e.key && typeof e.key === "string" && e.key.length === 1) {
        typedStr += e.key.toLowerCase();
        if (typedStr.length > 4) {
          typedStr = typedStr.slice(-4);
        }
        if (typedStr === "hire") {
          alert("Excellent decision. 😉 Let's talk: " + profileData.email);
          typedStr = ""; // reset
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const commands = [
    { id: "home", label: "Home", icon: Home, action: () => scrollToSection("home") },
    { id: "about", label: "Recruiter Overview", icon: User, action: () => scrollToSection("about") },
    { id: "experience", label: "Experience", icon: Briefcase, action: () => scrollToSection("experience") },
    { id: "projects", label: "Featured Projects", icon: FolderGit2, action: () => scrollToSection("projects") },
    { id: "coding", label: "Engineering Activity", icon: Code2, action: () => scrollToSection("coding") },
    { id: "achievements", label: "Achievements", icon: Trophy, action: () => scrollToSection("achievements") },
    { id: "contact", label: "Contact Me", icon: User, action: () => scrollToSection("contact") },
    { id: "resume", label: "Download Resume", icon: FileText, action: () => window.open("/resume.pdf.pdf", "_blank") },
    { id: "github", label: "GitHub Profile", icon: Github, action: () => window.open(profileData.social.github, "_blank") },
    { id: "linkedin", label: "LinkedIn Profile", icon: Linkedin, action: () => window.open(profileData.social.linkedin, "_blank") },
    { id: "substack", label: "Substack Newsletter", icon: FileText, action: () => window.open(profileData.social.substack, "_blank") },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Search size={20} className="text-muted-foreground mr-3" />
              <input 
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground font-mono text-sm"
              />
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-white/10 text-muted-foreground transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {filteredCommands.length > 0 ? (
                <div className="space-y-1">
                  {filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center px-3 py-3 rounded-lg hover:bg-primary/10 hover:text-primary text-zinc-300 transition-colors group text-left"
                    >
                      <cmd.icon size={18} className="mr-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium text-sm">{cmd.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground text-sm">
                  No results found.
                </div>
              )}
            </div>
            
            <div className="bg-white/5 border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Use <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10">↑</kbd> <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10">↓</kbd> to navigate</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
