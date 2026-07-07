"use client";

import React, { useEffect, useState, useRef } from "react";
import { Award, Briefcase, GraduationCap, TrendingUp, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  icon: React.ReactNode;
}

function StatCounter({ label, value, suffix, decimals = 0, icon }: StatItem) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1800; // Slower, elegant counter
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      
      const easeProgress = progress * (2 - progress);
      const currentCount = easeProgress * (end - start) + start;
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center p-8 text-center group"
    >
      <div className="mb-4 text-[#c9a55c] opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-700 ease-out">
        {icon}
      </div>

      <span className="text-4xl md:text-5xl font-normal font-display tracking-tight text-[#f5f5f7] mb-2 group-hover:text-[#e8c874] transition-colors duration-700">
        {count.toFixed(decimals)}
        {suffix}
      </span>
      
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a55c]/70 font-sans">
        {label}
      </span>
    </motion.div>
  );
}

export function Stats() {
  const statsData: StatItem[] = [
    {
      label: "CGPA",
      value: 8.2,
      suffix: "",
      decimals: 1,
      icon: <GraduationCap size={24} strokeWidth={1} />,
    },
    {
      label: "Projects Completed",
      value: 3,
      suffix: "+",
      icon: <Briefcase size={24} strokeWidth={1} />,
    },
    {
      label: "Achievements",
      value: 6,
      suffix: "+",
      icon: <Award size={24} strokeWidth={1} />,
    },
    {
      label: "Skillrack Solved",
      value: 750,
      suffix: "+",
      icon: <TrendingUp size={24} strokeWidth={1} />,
    },
    {
      label: "Leadership Roles",
      value: 3,
      suffix: "+",
      icon: <Users size={24} strokeWidth={1} />,
    },
  ];

  return (
    <section className="relative w-full py-12 border-y border-[#c9a55c]/20 bg-[#050508]/90 z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-[#c9a55c]/10">
          {statsData.map((stat, idx) => (
            <div key={stat.label} className={idx === statsData.length - 1 ? "col-span-2 lg:col-span-1" : ""}>
              <StatCounter
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                icon={stat.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
