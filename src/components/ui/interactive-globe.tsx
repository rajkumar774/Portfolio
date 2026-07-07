"use client";

import React, { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
  size?: number;
}

export function InteractiveGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point3D[] = [];
    const sphereRadius = 110;
    const pointCount = 180;

    // Generate random points distributed evenly on a sphere (Fibonacci lattice)
    const generateSpherePoints = () => {
      points = [];
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

      for (let i = 0; i < pointCount; i++) {
        const y = 1 - (i / (pointCount - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y); // radius at y

        const theta = phi * i; // Golden angle increment

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        // Add some major glowing hub points
        const isHub = i % 15 === 0;
        points.push({
          x: x * sphereRadius,
          y: y * sphereRadius,
          z: z * sphereRadius,
          color: isHub ? "rgba(201, 165, 92, 0.9)" : "rgba(255, 255, 255, 0.3)",
          size: isHub ? 3 : 1.2,
        });
      }
    };

    // Projection matrix function
    const project = (p: Point3D, rx: number, ry: number, width: number, height: number) => {
      // Rotate around X axis
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      let y1 = p.y * cosX - p.z * sinX;
      let z1 = p.y * sinX + p.z * cosX;

      // Rotate around Y axis
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      let x2 = p.x * cosY + z1 * sinY;
      let z2 = -p.x * sinY + z1 * cosY;

      // Perspective scale factor
      const fov = 400;
      const perspective = fov / (fov + z2);

      return {
        x: width / 2 + x2 * perspective,
        y: height / 2 + y1 * perspective,
        depth: z2, // keep depth for z-sorting or size scaling
        scale: perspective,
      };
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    generateSpherePoints();
    resizeCanvas();

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Auto rotation if not dragging - slower, elegant rotation
      if (!isDraggingRef.current) {
        rotationRef.current.y += 0.0015;
        rotationRef.current.x = rotationRef.current.x * 0.99; // return slowly to equator
      }

      // Project all points
      const projected = points.map((p) => {
        const proj = project(p, rotationRef.current.x, rotationRef.current.y, width, height);
        return {
          ...p,
          projX: proj.x,
          projY: proj.y,
          depth: proj.depth,
          scale: proj.scale,
        };
      });

      // Sort by depth (draw back points first, then front points)
      projected.sort((a, b) => b.depth - a.depth);

      // Draw connections/grid lines for front points
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.depth > 0) continue; // Skip points on the back side of the sphere for cleaner lines

        // Draw connections to nearby points
        let connectionsCount = 0;
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.depth > 0) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 45 && connectionsCount < 3) {
            const alpha = (1 - dist / 45) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.strokeStyle = `rgba(201, 165, 92, ${alpha})`;
            ctx.stroke();
            connectionsCount++;
          }
        }
      }

      // Draw points
      projected.forEach((p) => {
        const alpha = Math.max(0.1, (sphereRadius - p.depth) / (2 * sphereRadius)); // Fade back points
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, (p.size || 1) * p.scale, 0, Math.PI * 2);
        
        if (p.size && p.size > 2) {
          // Hub pulsing glow effect
          const pulse = 1 + Math.sin(Date.now() * 0.003 + p.x) * 0.2;
          ctx.arc(p.projX, p.projY, p.size * p.scale * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 165, 92, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(201, 165, 92, ${alpha * 0.5})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      rotationRef.current.y += dx * 0.003;
      rotationRef.current.x += dy * 0.003;

      // Bound pitch rotation so it doesn't flip upside down
      rotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationRef.current.x));

      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="w-[280px] h-[280px] md:w-[320px] md:h-[320px]" />
      
      {/* Soft floating radar glow behind globe */}
      <div className="absolute inset-0 pointer-events-none rounded-full blur-[80px] opacity-15 bg-radial from-[#c9a55c] to-transparent scale-[0.6]" />
    </div>
  );
}
