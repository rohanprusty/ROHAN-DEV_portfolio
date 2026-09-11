"use client";

import { useState, useEffect } from "react";
import { RotateCcw, Check } from "lucide-react";

export function RevertButton() {
  const [reverted, setReverted] = useState(false);

  const handleRevert = () => {
    // 1. Reset persisted storage
    localStorage.setItem("portfolio_hero_state", JSON.stringify({
      version: "canonical",
      timestamp: Date.now(),
      imageSrc: "/rohan.png",
      layout: "canonical"
    }));

    // 2. Dispatch custom event for real-time React component re-rendering
    window.dispatchEvent(new Event("portfolio_state_reverted"));

    // 3. Visual feedback
    setReverted(true);
    setTimeout(() => setReverted(false), 2500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <button
        onClick={handleRevert}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a0a0f]/90 border border-primary/40 text-primary hover:bg-primary hover:text-black font-mono text-xs font-semibold shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 backdrop-blur-md active:scale-95"
        title="Revert Hero Section to Canonical State"
      >
        {reverted ? (
          <>
            <Check size={14} className="text-emerald-400" />
            <span>Reverted State!</span>
          </>
        ) : (
          <>
            <RotateCcw size={14} />
            <span>Revert Back</span>
          </>
        )}
      </button>
    </div>
  );
}
