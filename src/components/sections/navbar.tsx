"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      let currentSection = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? "py-4 bg-[#020203]/95 backdrop-blur-md border-b border-[#c9a55c]/15 shadow-xl"
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <span className="text-2xl font-bold font-display tracking-wide text-[#f5f5f7] group-hover:text-[#e8c874] transition-colors duration-500">
            Rajkumar N S
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a55c] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative py-2 text-xs font-semibold font-sans tracking-[0.15em] uppercase transition-all duration-500 ${
                  isActive
                    ? "text-[#e8c874]"
                    : "text-slate-400 hover:text-[#f5f5f7]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c9a55c]"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                )}
                {/* Subtle hover underline */}
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a55c]/50 transition-all duration-500 hover-underline" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-slate-400 hover:text-[#e8c874] transition-colors duration-500 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>

          {/* Resume button (Royal Style) */}
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase text-[#e8c874] border border-[#c9a55c]/30 hover:border-[#c9a55c]/80 hover:bg-[#c9a55c]/5 transition-all duration-500 cursor-pointer"
          >
            <FileText size={14} strokeWidth={1.5} />
            <span>RESUME</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-5">
          <button
            onClick={toggleTheme}
            className="text-slate-400 hover:text-[#e8c874] transition-colors duration-500"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-400 hover:text-[#e8c874] transition-colors duration-500"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:hidden w-full bg-[#020203]/98 border-b border-[#c9a55c]/15 overflow-hidden"
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xs font-semibold tracking-[0.15em] uppercase py-3 border-b border-white/5 transition-colors duration-500 ${
                    activeSection === item.href.substring(1)
                      ? "text-[#e8c874] border-[#c9a55c]/30"
                      : "text-slate-400 hover:text-[#f5f5f7]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 mt-4 w-full py-4 text-xs font-semibold tracking-[0.15em] uppercase text-[#e8c874] border border-[#c9a55c]/30 hover:bg-[#c9a55c]/5 transition-all duration-500"
              >
                <FileText size={15} strokeWidth={1.5} />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        nav a:hover .hover-underline {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
