"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Briefcase,
  Trophy,
  Code2,
  FolderGit2,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "coding", label: "Engineering", icon: Code2 },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "contact", label: "Contact", icon: User },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-[60] w-12 h-12 bg-[#16161b] border border-white/10 rounded-full flex items-center justify-center text-white shadow-xl backdrop-blur-md"
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-[55] bg-black/80 backdrop-blur-lg transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`flex items-center gap-4 text-2xl font-medium transition-colors ${
                activeSection === id ? "text-[#ff6b6b]" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon size={28} className={activeSection === id ? "text-[#ff6b6b]" : "text-[#f39c12]"} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Collapsible Navigation */}
      <nav 
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col bg-[#16161b]/90 backdrop-blur-md rounded-[24px] border border-white/10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isExpanded ? "w-48" : "w-[72px]"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Toggle Button (Visual hint) */}
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-[#16161b] border border-white/10 rounded-full flex items-center justify-center text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
           {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </div>

        <div className="flex flex-col py-4 w-full h-full overflow-hidden">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center relative w-full group/item"
                aria-label={label}
              >
                <div className={`flex items-center w-full px-6 py-4 transition-colors duration-300 ${
                  isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-gradient-to-b from-[#ff6b6b] to-[#f39c12] rounded-r-full" />
                  )}
                  
                  <div className="flex-shrink-0">
                    <Icon size={22} className={`transition-colors duration-300 ${isActive ? "text-[#ff6b6b]" : "text-[#f39c12]"}`} />
                  </div>
                  
                  <span 
                    className={`ml-4 font-medium text-sm tracking-wide whitespace-nowrap transition-all duration-300 ${
                      isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
