"use client";

import { Github, Linkedin, Instagram, Twitter, Gmail } from "@/components/icons";
import { profileData } from "@/data/profile";

export function SocialRail() {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
      {/* GitHub */}
      <a
        href={profileData.social.github}
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-white text-black border-2 border-black flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="GitHub"
      >
        <Github size={22} />
      </a>
      
      {/* LinkedIn */}
      <a
        href={profileData.social.linkedin}
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} />
      </a>

      {/* Instagram */}
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="Instagram"
      >
        <Instagram size={20} />
      </a>

      {/* Twitter */}
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-600 text-[#1da1f2] flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="Twitter"
      >
        <Twitter size={20} />
      </a>

      {/* Gmail */}
      <a
        href={`mailto:${profileData.email || "rohansen856@gmail.com"}`}
        className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-600 text-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 relative overflow-hidden group"
        aria-label="Email"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity" />
        <Gmail size={20} className="relative z-10" />
      </a>
      
      {/* Decorative Line (if it was attached to social rail, but image shows line below about section, we'll keep the social rail clean) */}
    </div>
  );
}
