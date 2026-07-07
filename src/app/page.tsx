"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";

import { CanvasMesh } from "@/components/ui/canvas-mesh";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.5, // Even slower, royal scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Apply default dark theme to html root on mount
    document.documentElement.classList.add("dark");

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans selection:bg-[#c9a55c]/30 selection:text-white transition-colors duration-700 ease-out">
      {/* Noise filter background overlay */}
      <div className="noise-overlay" />

      {/* Royal Subtle Glowing Ambient Blobs */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#c9a55c]/3 blur-[140px] pointer-events-none" />
      <div className="absolute top-[45%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#e8c874]/3 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[5%] w-[55vw] h-[55vw] rounded-full bg-[#c9a55c]/2 blur-[160px] pointer-events-none" />

      {/* Subtle stardust particles */}
      <CanvasMesh />

      {/* Ambient champagne glow cursor */}
      <CustomCursor />

      {/* Elegant Header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Royal Page Sections */}
      <main className="w-full flex flex-col relative z-10">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
