import { Navigation } from "@/components/layout/Navigation";
import { SocialRail } from "@/components/layout/SocialRail";
import { Hero } from "@/components/sections/Hero";
import { RecruiterSnapshot } from "@/components/sections/RecruiterSnapshot";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { CodingActivity } from "@/components/sections/CodingActivity";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { VisitorCounter } from "@/components/ui/VisitorCounter";
import { CommandPalette } from "@/components/ui/CommandPalette";
export default function Home() {
  return (
    <>
      <CommandPalette />
      <Navigation />
      <SocialRail />
      
      <VisitorCounter />

      <main className="flex flex-col min-h-screen">
        <Hero />
        <RecruiterSnapshot />
        <Experience />
        <Projects />
        <CodingActivity />
        <Skills />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border mt-12 bg-background/50">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Rohan Kumar Prusty. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-75">ECE @ IIIT Jabalpur | Building at the intersection of technology, problem solving and impact.</p>
        </div>
      </footer>
    </>
  );
}
