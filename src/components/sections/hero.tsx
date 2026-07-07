"use client";

import React, { useEffect, useState, useRef } from "react";
import { Mail, ChevronRight, FileText } from "lucide-react";
import { Github, Linkedin } from "../ui/icons";
import { motion } from "framer-motion";

export function Hero() {
  const [typedText, setTypedText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const titles = [
    "Linux Systems Engineer",
    "DevSecOps Practitioner",
    "Python Developer",
    "AI Security Researcher",
  ];

  const typingSpeed = 90;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = titles[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && typedText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, titleIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  const techChips = [
    { label: "Linux", x: "-35%", y: "-15%", delay: 0 },
    { label: "Python", x: "80%", y: "-25%", delay: 0.5 },
    { label: "Docker", x: "-45%", y: "40%", delay: 0.2 },
    { label: "DevSecOps", x: "75%", y: "55%", delay: 0.7 },
    { label: "FastAPI", x: "90%", y: "15%", delay: 0.4 },
    { label: "ROS2", x: "-15%", y: "-48%", delay: 0.9 },
    { label: "React", x: "25%", y: "85%", delay: 1.1 },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-40 pb-32 overflow-hidden scroll-mt-32"
    >
      <div className="max-w-7xl w-full mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
        
        {/* Left Side Content - Giant Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-[1px] bg-[#c9a55c]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c9a55c] uppercase font-sans">
              UNDERGRADUATE ENGINEER
            </span>
          </motion.div>

          {/* Headline Name - Giant Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-normal font-display tracking-tight text-[#f5f5f7] mb-8 leading-[0.9]"
          >
            Rajkumar
            <span className="block text-[#e8c874] mt-2 italic">
              N S
            </span>
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="h-8 flex items-center mb-10 text-lg md:text-xl font-mono text-[#c9a55c]/80 font-normal tracking-wide"
          >
            <span className="typing-cursor text-[#c9a55c]">{typedText}</span>
          </motion.div>

          {/* One line Value Proposition - Extra spacing */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-300 font-sans font-light max-w-2xl mb-16 leading-relaxed"
          >
            Building resilient architectures, secure automation systems, and high-performance developer environments.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-6 mb-16"
          >
            <a
              href="#contact"
              className="flex items-center gap-3 px-8 py-4 bg-[#050508] border border-[#c9a55c]/40 font-semibold text-xs tracking-[0.2em] uppercase text-[#e8c874] hover:bg-[#c9a55c]/10 hover:border-[#c9a55c]/80 transition-all duration-700 hover:-translate-y-[2px] cursor-pointer"
            >
              <span>CONTACT ME</span>
              <ChevronRight size={14} strokeWidth={1.5} />
            </a>

            <a
              href="#projects"
              className="flex items-center gap-3 px-8 py-4 bg-transparent border border-white/10 font-semibold text-xs tracking-[0.2em] uppercase text-slate-300 hover:border-[#c9a55c]/30 hover:text-[#e8c874] transition-all duration-700 hover:-translate-y-[2px] cursor-pointer"
            >
              <span>VIEW PROJECTS</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="flex items-center gap-6"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase font-sans">
              DIRECT LINKS
            </span>
            <div className="w-12 h-[1px] bg-white/10" />
            <a
              href="https://github.com/rajkumarns"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/5 bg-[#020203] hover:bg-[#c9a55c]/5 hover:border-[#c9a55c]/30 hover:text-[#e8c874] text-slate-400 transition-all duration-700 cursor-pointer"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com/in/rajkumarns"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/5 bg-[#020203] hover:bg-[#c9a55c]/5 hover:border-[#c9a55c]/30 hover:text-[#e8c874] text-slate-400 transition-all duration-700 cursor-pointer"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:rajkumarns.dev@gmail.com"
              className="p-3 border border-white/5 bg-[#020203] hover:bg-[#c9a55c]/5 hover:border-[#c9a55c]/30 hover:text-[#e8c874] text-slate-400 transition-all duration-700 cursor-pointer"
            >
              <Mail size={16} strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>

        {/* Right Side Avatar Frame */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[420px] select-none">
            
            {/* Ambient gold glow behind frame */}
            <div
              className="absolute inset-0 blur-[60px] opacity-15 bg-[#c9a55c] transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${coords.x * -15}px, ${coords.y * -15}px) scale(0.95)`,
              }}
            />

            {/* Solid border frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 p-[1px] bg-[#c9a55c]/25 shadow-2xl transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${coords.x * 10}px, ${coords.y * 10}px)`,
              }}
            >
              {/* Photo Container */}
              <div className="w-full h-full bg-[#050508] overflow-hidden relative group">
                <img
                  src="/avatar.png"
                  alt="Rajkumar N S Portrait"
                  className="w-full h-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-[1.03] group-hover:opacity-95"
                  style={{
                    transform: `translate(${coords.x * 5}px, ${coords.y * 5}px)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Tech Chips List - Static Below Avatar */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-[320px]">
            {techChips.map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + i * 0.1,
                  ease: "easeOut",
                }}
                className="px-3 py-1.5 text-[9px] md:text-[10px] font-semibold tracking-widest uppercase font-sans bg-[#050508] border border-[#c9a55c]/25 text-[#c9a55c]"
              >
                {chip.label}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
