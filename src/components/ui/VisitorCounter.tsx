"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function updateCounter() {
      if (!supabase) {
        console.warn("Supabase not configured, cannot track visits.");
        return;
      }

      // We use sessionStorage to prevent multiple DB checks on every route change in the same session
      const hasVisitedThisSession = sessionStorage.getItem("hasVisited");
      
      if (hasVisitedThisSession) {
        // Already processed in this session, just fetch the latest count
        await fetchCurrentCount();
        return;
      }

      // Check if this browser has ever visited before
      let visitorId = localStorage.getItem("portfolio_visitor_id");
      if (!visitorId) {
        // Generate a random unique ID for this browser
        visitorId = crypto.randomUUID();
        localStorage.setItem("portfolio_visitor_id", visitorId);
      }

      try {
        // Try to insert the unique visitor ID into the visitors table
        // We use ip_hash column to store our browser UUID
        const { error: insertError } = await supabase
          .from("visitors")
          .insert([{ ip_hash: visitorId }]);

        if (insertError) {
          // If there's an error (e.g., unique constraint violation), they've visited before.
          // We don't increment, just fetch the current count.
          await fetchCurrentCount();
        } else {
          // Insertion succeeded! This is a brand new unique visitor.
          // Atomically increment the global counter by exactly 2.
          const { data, error: rpcError } = await supabase.rpc("increment_visitor_count");
          
          if (!rpcError && data !== null) {
            setCount(data);
          } else {
            console.error("Error incrementing counter:", rpcError);
            await fetchCurrentCount();
          }
        }

        // Mark as visited for this session
        sessionStorage.setItem("hasVisited", "true");
        
      } catch (e) {
        console.error("Failed to update counter:", e);
        await fetchCurrentCount();
      }
    }

    async function fetchCurrentCount() {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("site_stats")
        .select("visitor_count")
        .eq("id", 1)
        .single();
      
      if (!error && data) {
        setCount(data.visitor_count);
      }
    }

    updateCounter();
  }, []);

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center border border-[#14b8a6]/40 rounded-full px-5 py-2 bg-[#050a12]/80 backdrop-blur-md shadow-[0_0_20px_rgba(20,184,166,0.15)] text-sm tracking-wide">
      <span className="text-[#14b8a6] font-medium mr-2">Total Visits</span>
      <span className="text-zinc-600 mx-2">|</span>
      <span className="text-white font-semibold">
        {count !== null ? count.toLocaleString() : "..."}
      </span>
    </div>
  );
}
