"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "competitive programming";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const [, setRevertTick] = useState(0);

  useEffect(() => {
    const handleRevertEvent = () => {
      setRevertTick(prev => prev + 1);
    };

    window.addEventListener("portfolio_state_reverted", handleRevertEvent);
    return () => window.removeEventListener("portfolio_state_reverted", handleRevertEvent);
  }, []);

  const [firstName, lastName] = profileData.name.split(" ");

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10 max-w-6xl">
        
        {/* Left Side: Large Photographic Portrait Anchor */}
        <motion.div 
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col justify-end items-center h-[520px] lg:h-[600px] w-full max-w-[460px] mx-auto group z-10 -translate-y-12 sm:-translate-y-16"
        >
          {/* Broad Diffused Atmospheric Backlight (Behind Head & Shoulders) */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] bg-gradient-to-b from-slate-200/20 via-zinc-400/10 to-transparent blur-[90px] rounded-full pointer-events-none z-0" />
          
          {/* Main Person Cutout - Prominent 45-50% scale, standing inside website */}
          <div className="relative w-[320px] sm:w-[380px] h-[480px] sm:h-[550px] z-10 pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] flex justify-center items-end">
            <Image 
              src="/rohan.png" 
              alt={profileData.name}
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              priority
              quality={100}
            />
          </div>
        </motion.div>

        {/* Right Side: Text & Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white">
              Hi, I am <span className="text-[#00f0ff]">{firstName}</span> <span className="text-[#3b82f6]">{lastName}</span>
            </h1>
            <a 
              href={`mailto:${profileData.email}`} 
              className="text-lg text-blue-500 hover:text-blue-400 font-medium inline-flex items-center gap-1 transition-colors underline underline-offset-4 decoration-blue-500/50 hover:decoration-blue-400"
            >
              {profileData.email || "rohansen856@gmail.com"}
              <ArrowUpRight size={20} />
            </a>
          </div>

          {/* Terminal Card */}
          <div className="bg-black/80 border border-[#2a2a2a] rounded-lg p-5 font-mono text-sm max-w-[500px] shadow-2xl backdrop-blur-sm mt-6 relative overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-xs text-zinc-500">bash</span>
            </div>
            
            {/* Terminal Body */}
            <div className="space-y-2 text-zinc-300 leading-relaxed">
              <p>
                <span className="text-[#27c93f]">$</span> npm run intro
              </p>
              <p className="text-zinc-400">
                + {firstName.toLowerCase()}@21.10.14
              </p>
              <p>
                Software Engineering, Business Analysis, 
                System Thinking and Leadership.
              </p>
              <p className="mt-4">
                <span className="text-[#27c93f]">$</span> flutter pub get skills
              </p>
              <p className="flex items-center">
                {typedText}
                <span className="inline-block w-[8px] h-[16px] bg-zinc-300 ml-1 animate-pulse" />
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
