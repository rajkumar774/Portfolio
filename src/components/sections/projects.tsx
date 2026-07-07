"use client";

import React, { useState } from "react";
import { ExternalLink, X, Shield, Cpu, Layers, ArrowRight } from "lucide-react";
import { Github } from "../ui/icons";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudyDetails {
  challenge: string;
  solution: string;
  architecture: string[];
}

interface Project {
  id: number;
  title: string;
  outcome: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  caseStudy: CaseStudyDetails;
}

export function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  const projectsData: Project[] = [
    {
      id: 1,
      title: "AegisAI Trinity",
      outcome: "Mitigated 99.8% of semantic injection exploits on active Linux firewalls.",
      description: "Enterprise AI Security Suite executing raw semantic middleware analysis to block prompt injections and automated threats on production servers.",
      image: "/project_aegis.png",
      tags: ["Python", "FastAPI", "React", "MongoDB", "Linux Ops"],
      github: "https://github.com/rajkumarns/aegisai-trinity",
      live: "https://aegisai-trinity.vercel.app",
      caseStudy: {
        challenge: "AI models in production are susceptible to prompt injection, data poisoning, and unauthorized system commands. Traditional network firewalls cannot inspect semantic meaning.",
        solution: "Engineered AegisAI Trinity, integrating raw semantic analysis middleware using lightweight PyTorch layers with FastAPI. It intercepts API traffic, runs explainable vector mapping, and triggers immediate automated defense rules on Linux firewalls (iptables) when anomalies spike.",
        architecture: [
          "Dual-stage token classification to check input integrity.",
          "Automated Python shell scripts deployed on edge nodes to isolate threat vectors.",
          "FastAPI high-speed middleware for sub-5ms request introspection.",
          "MongoDB database mapping anomalous requests for forensic audits.",
        ],
      },
    },
    {
      id: 2,
      title: "NeoGuard",
      outcome: "Delivered explainable, real-time vital telemetry justification for clinical teams.",
      description: "AI-powered neonatal monitoring platform designed to analyze patient vitals and forecast sudden clinical events with zero-shot learning frameworks.",
      image: "/project_neoguard.png",
      tags: ["Python", "PyTorch", "SHAP", "FastAPI", "PostgreSQL"],
      github: "https://github.com/rajkumarns/neoguard-monitoring",
      live: "https://neoguard-neonatal.vercel.app",
      caseStudy: {
        challenge: "Clinicians face alert fatigue from simple thresholds. There is a critical need to understand *why* an AI model predicts a neonatal cardiac or respiratory event, rather than just showing a binary alarm.",
        solution: "Developed NeoGuard, applying PyTorch models on multi-modal temporal datasets. Utilized SHAP (SHapley Additive exPlanations) to dynamically map local feature contributions. Created an elegant React dashboard connected to FastAPI to show clinicians visual weightings of heart rate variability and blood oxygen fluctuations in real-time.",
        architecture: [
          "SHAP values computed dynamically to justify alert criteria.",
          "Zero-shot classification for identifying unclassified anomalous anomalies.",
          "FastAPI back-end streaming patient telemetry securely.",
          "PostgreSQL database structuring demographic and historical vital records.",
        ],
      },
    },
    {
      id: 3,
      title: "Autonomous Rover Software",
      outcome: "Achieved sub-10cm drift localization and collision-free outdoor navigation.",
      description: "ROS2 navigation software stack built in C++ and Python, executing sensor fusion, tf transformations, costmap updates, and custom path planning.",
      image: "/project_rover.png",
      tags: ["ROS2", "C++", "Python", "Linux Node", "Nav2 Stack", "EKF"],
      github: "https://github.com/rajkumarns/autonomous-rover-ros2",
      live: "https://autonomous-rover.vercel.app",
      caseStudy: {
        challenge: "Achieving precise localization and collision-free navigation on variable outdoor terrains under hardware processing limitations.",
        solution: "Built a robust ROS2 nodes architecture in C++ and Python on Linux nodes. Integrated an Extended Kalman Filter (EKF) to fuse IMU, wheel odometry, and wheel velocities. Programmed Nav2 navigation plugins for costmap updates and custom path planning.",
        architecture: [
          "EKF sensor fusion for high-fidelity coordinate tracking.",
          "TF transform tree mapping joints and sensor offsets in real-time.",
          "Nav2 behavioral trees optimized for low latency obstacles bypass.",
          "Linux system services wrapper starting ROS2 nodes automatically on boot.",
        ],
      },
    },
  ];

  return (
    <section id="projects" className="relative py-32 md:py-48 overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Uppercase Section Label */}
        <div className="flex flex-col items-start text-left mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a55c]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c9a55c] uppercase font-sans">
              03. SELECTED WORK
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-normal font-display tracking-tight text-[#f5f5f7] mb-8">
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid - Minimal Borders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {projectsData.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
              className="flex flex-col group"
            >
              {/* Image Container - Full bleed over card edge */}
              <div className="relative h-64 w-full overflow-hidden bg-[#020203] border border-[#c9a55c]/15 mb-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-85 transition-transform duration-1000 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/50 to-transparent pointer-events-none" />
                
                {/* View Case Study Hover Overlay */}
                <div className="absolute inset-0 bg-[#050508]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out backdrop-blur-[2px]">
                  <button
                    onClick={() => setActiveCaseStudy(project)}
                    className="px-6 py-3 border border-[#c9a55c]/60 bg-[#020203]/90 text-[#e8c874] text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 hover:bg-[#c9a55c]/10 transition-colors duration-500"
                  >
                    <span>Read Case Study</span>
                  </button>
                </div>
              </div>

              {/* Project Details - Understated */}
              <div className="flex flex-col flex-grow text-left">
                <h3 className="text-2xl font-normal font-display text-[#f5f5f7] mb-3 group-hover:text-[#e8c874] transition-colors duration-700">
                  {project.title}
                </h3>
                
                {/* Outcome line */}
                <div className="text-[11px] font-semibold text-[#c9a55c] uppercase tracking-wider mb-4">
                  Outcome: {project.outcome}
                </div>

                <p className="text-sm text-slate-400 mb-8 leading-loose font-light">
                  {project.description}
                </p>

                <div className="mt-auto">
                  {/* Frosted Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest bg-transparent border border-[#c9a55c]/20 text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-4 border-t border-[#c9a55c]/15 pt-5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-[#c9a55c]/20 bg-[#050508] hover:bg-[#c9a55c]/10 hover:border-[#c9a55c]/40 transition-all duration-700 text-slate-400 hover:text-[#e8c874] cursor-pointer"
                      aria-label="GitHub Repository"
                    >
                      <Github size={14} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-[#c9a55c]/20 bg-[#050508] hover:bg-[#c9a55c]/10 hover:border-[#c9a55c]/40 transition-all duration-700 text-slate-400 hover:text-[#e8c874] cursor-pointer"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={14} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Lightbox Modal - Luxury Royal Edition */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onClick={() => setActiveCaseStudy(null)}
              className="absolute inset-0 bg-[#020203]/90 backdrop-blur-md"
            />

            {/* Case Study Window */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#050508] border border-[#c9a55c]/30 p-8 md:p-12 z-10 text-left shadow-[0_20px_60px_rgba(0,0,0,0.8)] custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#c9a55c]/20 bg-[#020203] hover:bg-[#c9a55c]/10 hover:border-[#c9a55c]/60 hover:text-[#e8c874] text-slate-400 transition-all duration-500 cursor-pointer"
                aria-label="Close Case Study"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              {/* Title Section */}
              <div className="mb-12 border-b border-[#c9a55c]/15 pb-8">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c9a55c] uppercase mb-4 block">
                  TECHNICAL CASE STUDY
                </span>
                <h3 className="text-4xl md:text-5xl font-normal font-display text-[#f5f5f7]">
                  {activeCaseStudy.title}
                </h3>
              </div>

              {/* Content sections */}
              <div className="space-y-12 text-sm text-slate-300 leading-loose font-sans font-light">
                
                {/* Challenge */}
                <div className="pl-6 border-l border-[#c9a55c]/40">
                  <h4 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8c874] mb-3">
                    <Shield size={14} strokeWidth={1.5} />
                    The Challenge
                  </h4>
                  <p className="text-sm md:text-base text-slate-300">
                    {activeCaseStudy.caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="pl-6 border-l border-[#c9a55c]/40">
                  <h4 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8c874] mb-3">
                    <Cpu size={14} strokeWidth={1.5} />
                    The Solution
                  </h4>
                  <p className="text-sm md:text-base text-slate-300">
                    {activeCaseStudy.caseStudy.solution}
                  </p>
                </div>

                {/* Architecture Breakdown */}
                <div className="pl-6 border-l border-[#c9a55c]/40">
                  <h4 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8c874] mb-4">
                    <Layers size={14} strokeWidth={1.5} />
                    Technical Architecture
                  </h4>
                  <ul className="space-y-3">
                    {activeCaseStudy.caseStudy.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#c9a55c] mt-1 text-[9px]">✦</span>
                        <span className="text-sm md:text-base text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end mt-16 border-t border-[#c9a55c]/15 pt-8">
                <a
                  href={activeCaseStudy.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs font-semibold tracking-[0.15em] uppercase text-[#c9a55c] hover:text-[#e8c874] transition-colors duration-500 cursor-pointer group"
                >
                  <Github size={15} />
                  <span>Inspect Source Code</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
