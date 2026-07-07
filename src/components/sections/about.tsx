"use client";

import React from "react";
import { Terminal, ShieldCheck, Cpu, BrainCircuit, HardDrive } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";

export function About() {
  const categories = [
    {
      title: "Systems Operations",
      skills: ["Kali", "Ubuntu", "Bash Shell", "Kernel Config"],
      icon: <Terminal className="text-[#c9a55c]" size={20} strokeWidth={1.5} />,
    },
    {
      title: "Container & DevOps",
      skills: ["Docker", "Git/GitHub", "CI/CD", "Security"],
      icon: <ShieldCheck className="text-[#c9a55c]" size={20} strokeWidth={1.5} />,
    },
    {
      title: "Explainable AI",
      skills: ["PyTorch", "SHAP", "Model Introspection"],
      icon: <BrainCircuit className="text-[#c9a55c]" size={20} strokeWidth={1.5} />,
    },
    {
      title: "Autonomous Robotics",
      skills: ["ROS2", "Nav2 Stack", "EKF", "TF Mapping"],
      icon: <Cpu className="text-[#c9a55c]" size={20} strokeWidth={1.5} />,
    },
  ];

  return (
    <section id="about" className="relative py-32 md:py-48 overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Uppercase Section Label */}
        <div className="flex flex-col items-start text-left mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a55c]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c9a55c] uppercase font-sans">
              01. PROFILE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-normal font-display tracking-tight text-[#f5f5f7] mb-8">
            About Me
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Left Side: Professional bio */}
          <div className="lg:col-span-5 flex flex-col text-left text-slate-300 gap-8 leading-loose text-sm md:text-base font-light font-sans">
            <p>
              I am a 3rd year Information Technology Undergraduate at{" "}
              <span className="text-[#e8c874] font-medium">Sri Eshwar College of Engineering</span>. 
              My focus is on systems engineering, secure cloud configurations, and AI system security.
            </p>
            <p>
              I specialize in working with Linux environments, configuring containerized setups using Docker, and scripting custom system operations. I believe in establishing secure DevSecOps pipelines that guard systems without introducing latency bottlenecks.
            </p>
            <p>
              My robotics research focuses on robot locomotion and coordination using ROS2 navigation stacks and EKF sensor transforms. I also work on implementing explainable neural networks to help validate decision making in critical diagnostics.
            </p>
            
            <div className="flex flex-wrap gap-8 mt-6 border-t border-[#c9a55c]/20 pt-8">
              <div className="flex items-center gap-3">
                <HardDrive size={18} className="text-[#c9a55c]" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] font-sans">
                  Systems Core
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#c9a55c]" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] font-sans">
                  Secure Coding
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Capabilities Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              >
                <GlassCard className="p-8 h-full flex flex-col justify-between text-left">
                  <div>
                    {/* Header: Icon + Category title */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 rounded-full border border-[#c9a55c]/30 flex items-center justify-center bg-[#c9a55c]/5">
                        {cat.icon}
                      </div>
                      <h3 className="text-xs font-semibold text-[#f5f5f7] uppercase tracking-[0.15em] font-sans">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Minimal Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-sm text-[10px] font-semibold tracking-wider font-sans bg-[#020203] border border-[#c9a55c]/15 text-slate-400 hover:text-[#e8c874] hover:border-[#c9a55c]/40 transition-colors duration-500"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom indicator */}
                  <div className="w-full flex justify-end mt-10">
                    <span className="text-[9px] font-medium tracking-[0.3em] text-[#c9a55c]/40 font-sans">
                      0{i + 1}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
