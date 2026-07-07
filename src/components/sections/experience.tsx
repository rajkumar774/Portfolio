"use client";

import React, { useRef } from "react";
import { Landmark, Calendar } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

interface ExperienceItem {
  id: number;
  role: string;
  organization: string;
  period: string;
  outcome: string;
  details: string[];
  logo: React.ReactNode;
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const experienceData: ExperienceItem[] = [
    {
      id: 1,
      role: "Autonomy Software Lead (Winner)",
      organization: "Caterpillar Autonomy Challenge",
      period: "2024 – 2025",
      outcome: "Designed and deployed custom ROS2 autonomous navigation stack, winning 1st place nationally.",
      details: [
        "Programmed Extended Kalman Filter (EKF) sensor fusion algorithms merging IMU and wheel odometry.",
        "Constructed obstacle avoidance costmap models, deployed and tested live on a physical rover platform.",
      ],
      logo: (
        <span className="text-xs font-semibold tracking-tight text-[#c9a55c] font-sans uppercase">
          CAT
        </span>
      ),
    },
    {
      id: 2,
      role: "Information Technology Undergrad",
      organization: "Sri Eshwar College of Engineering",
      period: "2024 – 2028",
      outcome: "Acquiring core systems knowledge (CGPA: 8.2), focusing on Cloud architectures and AI security.",
      details: [
        "Leading autonomous system research models at the Centre for Innovation (CFI).",
        "Elected as Department President, coordinating student representations and hosting 2+ national hackathons.",
      ],
      logo: (
        <span className="text-xs font-semibold tracking-tight text-[#c9a55c] font-sans uppercase">
          SECE
        </span>
      ),
    },
    {
      id: 3,
      role: "Vice President Public Relations",
      organization: "Toastmasters International",
      period: "2024 – 2025",
      outcome: "Directed public communication campaigns, expanding active student membership profiles by 35%.",
      details: [
        "Structured weekly public speaking outlines and curated media newsletters.",
        "Managed communications, coordinating joint Toastmasters symposiums across regional clubs.",
      ],
      logo: (
        <span className="text-xs font-semibold tracking-tight text-[#c9a55c] font-sans uppercase">
          TI
        </span>
      ),
    },
    {
      id: 4,
      role: "Media & Content Lead",
      organization: "Centre for Innovation (CFI)",
      period: "2024 – Present",
      outcome: "Cataloged software developments, leading visual promo designs for high-tier research projects.",
      details: [
        "Curated visual diagrams and flow blueprints for robotics and AI projects.",
        "Collaborated with hardware developers to present technical specifications for design reviews.",
      ],
      logo: (
        <span className="text-xs font-semibold tracking-tight text-[#c9a55c] font-sans uppercase">
          CFI
        </span>
      ),
    },
  ];

  return (
    <section id="experience" ref={containerRef} className="relative py-32 md:py-48 overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Uppercase section label */}
        <div className="flex flex-col items-start text-left mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a55c]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c9a55c] uppercase font-sans">
              02. CHRONOLOGY
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-normal font-display tracking-tight text-[#f5f5f7] mb-8">
            Experience & Roles
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto flex flex-col gap-16">
          
          {/* Vertical background line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-[#c9a55c]/10 -translate-x-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#c9a55c]/20 via-[#c9a55c]/80 to-[#c9a55c]/20 origin-top -translate-x-1/2"
          />

          {/* Cards list */}
          {experienceData.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start w-full ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Logo Badge Circle */}
                <div className="absolute left-4 md:left-1/2 top-8 w-12 h-12 rounded-full bg-[#050508] border border-[#c9a55c]/30 -translate-x-1/2 flex items-center justify-center z-10">
                  {item.logo}
                </div>

                {/* Glass card wrap */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`w-full md:w-[48%] pl-16 md:pl-0 ${
                    isEven ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <GlassCard className="p-8 text-left group">
                    
                    {/* Role & Date */}
                    <div className="flex flex-col mb-6">
                      <span className="text-[10px] font-sans font-semibold text-[#c9a55c] uppercase tracking-[0.2em] flex items-center gap-2 mb-3">
                        <Calendar size={12} strokeWidth={1.5} />
                        {item.period}
                      </span>
                      <h3 className="text-xl md:text-2xl font-medium font-display text-[#f5f5f7] group-hover:text-[#e8c874] transition-colors duration-500">
                        {item.role}
                      </h3>
                    </div>

                    {/* Organization */}
                    <span className="text-xs font-light text-slate-400 flex items-center gap-2 mb-6 tracking-wide font-sans">
                      <Landmark size={14} className="text-[#c9a55c]/70" strokeWidth={1.5} />
                      {item.organization}
                    </span>

                    {/* One line outcome highlight */}
                    <div className="p-4 bg-[#c9a55c]/5 border border-[#c9a55c]/15 mb-6 text-xs font-light text-slate-300 leading-relaxed italic font-display tracking-wide">
                      {item.outcome}
                    </div>

                    {/* Specific details */}
                    <ul className="space-y-2 border-t border-[#c9a55c]/10 pt-6">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="text-[11px] text-slate-400 font-sans leading-relaxed flex items-start gap-2">
                          <span className="text-[#c9a55c] mt-1 text-[8px]">✦</span>
                          {detail}
                        </li>
                      ))}
                    </ul>

                  </GlassCard>
                </motion.div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
