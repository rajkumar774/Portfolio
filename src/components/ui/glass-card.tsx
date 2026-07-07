"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-[#c9a55c]/15 bg-[#050508]/95 transition-all duration-600 ease-out hover:border-[#c9a55c]/40 hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
    >
      {/* Subtle gold glow overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#c9a55c]/0 to-[#c9a55c]/5 opacity-0 transition-opacity duration-600 hover:opacity-100" />
      
      {/* Card Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
