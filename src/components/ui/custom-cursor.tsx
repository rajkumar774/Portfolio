"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 250, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen to hover on buttons, links, and cards
    const addHoverListeners = () => {
      const targets = document.querySelectorAll("a, button, [role='button'], .hover-target");
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setIsHovered(true));
        target.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Initial attachment
    addHoverListeners();

    // Recheck on mutations (e.g. dynamic content changes)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Background Interactive Light Glow (Behind cards) */}
      <motion.div
        className="fixed inset-0 pointer-events-none w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 mix-blend-screen bg-radial from-[#c9a55c]/30 via-[#c9a55c]/5 to-transparent"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: -5,
        }}
      />

      {/* Actual Cursor Dot Indicator */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none border border-[#c9a55c]/50 bg-[#c9a55c]/5 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? "rgba(201, 165, 92, 0.15)" : "rgba(201, 165, 92, 0.05)",
          borderColor: isHovered ? "rgba(201, 165, 92, 0.8)" : "rgba(201, 165, 92, 0.5)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
