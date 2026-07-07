"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/5 bg-[#030408] z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo indicator */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold bg-gradient-to-r from-[#8ab4f8] via-[#4ea8de] to-[#7209b7] bg-clip-text text-transparent">
            Rajkumar N S
          </span>
          <div className="w-1 h-1 rounded-full bg-[#8ab4f8]" />
        </div>

        {/* Copyright + credits */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1">
          <span className="text-xs text-slate-500 font-medium">
            &copy; {currentYear} Rajkumar N S. All rights reserved.
          </span>
          <span className="text-[10px] font-mono text-slate-600">
            Handcrafted with Next.js, TypeScript, & Tailwind CSS
          </span>
        </div>

      </div>
    </footer>
  );
}
