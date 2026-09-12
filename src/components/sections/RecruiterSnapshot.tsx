"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";
import { CheckCircle2, ChevronRight, Download, Mail, ArrowRight } from "lucide-react";

export function RecruiterSnapshot() {
  const [step, setStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  // Load from session storage
  useEffect(() => {
    const saved = sessionStorage.getItem("recruiter_mode_completed");
    if (saved === "true") {
      setHasCompleted(true);
      setStep(4);
    }
  }, []);

  const handleComplete = () => {
    setHasCompleted(true);
    setStep(4);
    sessionStorage.setItem("recruiter_mode_completed", "true");
  };

  const handleAnswer = (feedback: string, isSkip: boolean = false) => {
    if (isSkip) {
      handleComplete();
      return;
    }
    setShowFeedback(feedback);
    setTimeout(() => {
      setShowFeedback(null);
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleComplete();
      }
    }, 2000);
  };

  const skipToEnd = () => handleComplete();

  // Animated Counter component
  const Counter = ({ value, label }: { value: string | number, label: string }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-lg border border-white/10">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-xs text-zinc-400 uppercase tracking-widest mt-1">{label}</span>
      </div>
    );
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="mb-10 text-center">
          <h2 className="text-sm tracking-widest text-primary font-mono uppercase mb-2">Recruiter Snapshot</h2>
          <h3 className="text-3xl font-bold">The 30-Second Overview</h3>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl relative min-h-[400px] flex flex-col justify-center">
          
          {step < 4 && (
            <div className="absolute top-6 left-8 right-8 flex justify-between items-center text-xs font-mono text-muted-foreground">
              <span>0{step + 1} / 04</span>
              <button onClick={skipToEnd} className="hover:text-white transition-colors flex items-center gap-1">
                Skip <ChevronRight size={14} />
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 0 && !showFeedback && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <h4 className="text-2xl md:text-3xl font-semibold">Looking for someone who can actually build things?</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleAnswer("Perfect. You're in the right place.")}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    YES, SHOW ME
                  </button>
                  <button 
                    onClick={() => handleAnswer("Let's look around then.", true)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    JUST EXPLORING
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && !showFeedback && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <h4 className="text-2xl md:text-3xl font-semibold">Do you like engineers who build beyond coursework?</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleAnswer("3+ major projects. 300+ DSA. Leadership.")}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    ABSOLUTELY
                  </button>
                  <button 
                    onClick={() => handleAnswer("Wait till you see the proof.")}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    MAYBE...
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && !showFeedback && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <h4 className="text-2xl md:text-3xl font-semibold">What matters more to you?</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleAnswer("Execution is everything.")}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    TECHNICAL DEPTH
                  </button>
                  <button 
                    onClick={() => handleAnswer("Leading teams to victory.")}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    LEADERSHIP
                  </button>
                  <button 
                    onClick={() => handleAnswer("Good choice. Both are essential.")}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    BOTH
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && !showFeedback && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <h4 className="text-2xl md:text-3xl font-semibold">Be honest... do you like this portfolio?</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleAnswer("Good taste. Let's talk.")}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    YES <span className="text-lg">🔥</span>
                  </button>
                  <button 
                    onClick={() => handleAnswer("I like different.")}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    IT'S DIFFERENT
                  </button>
                  <button 
                    onClick={() => handleAnswer("Glad to hear it.")}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    I'M IMPRESSED
                  </button>
                </div>
              </motion.div>
            )}

            {showFeedback && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl md:text-3xl font-semibold text-white">
                  {showFeedback}
                </h4>
                {step === 0 && <p className="mt-4 text-muted-foreground">Full-stack development • AI • Problem Solving</p>}
                {step === 2 && showFeedback.includes("Both") && <p className="mt-4 text-muted-foreground">TECHNICAL EXECUTION + LEADERSHIP</p>}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <div className="text-center mb-8">
                  <h4 className="text-xs font-mono tracking-widest text-primary uppercase mb-2">Your 30-Second Takeaway</h4>
                  <h3 className="text-3xl font-bold text-white mb-2">{profileData.name}</h3>
                  <p className="text-muted-foreground">{profileData.role}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Focus</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Software Engineering</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> AI / Full Stack</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Problem Solving</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Proof of Work</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]"/> 400+ DSA Solved</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]"/> 3+ Featured Projects</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]"/> Leadership & Entrepreneurship</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-white/10">
                  <p className="text-white font-medium mb-6">Looks like we should talk.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#contact" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                      <Mail size={18} /> HIRE / CONTACT
                    </a>
                    <a href="/resume.pdf.pdf" target="_blank" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Download size={18} /> VIEW RESUME
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Existing "By The Numbers" visually separated below */}
        {step === 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            <Counter value={`${profileData.projects.length}+`} label="Projects" />
            <Counter value="400+" label="DSA Solved" />
            <Counter value={`${profileData.achievements.length}+`} label="Achievements" />
            <Counter value={profileData.education.cpi} label="CGPA" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
