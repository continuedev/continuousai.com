"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  rotation: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  colorIndex: number;
}

const COLORS = [
  "#F637B3", // fuscia
  "#EB54F6", // pink
  "#B25AF6", // purple
  "#667AFF", // violet
  "#2EA6FF", // blue
  "#00D2FF", // light-blue
  "#31DDED", // teal
  "#60E6D5", // mint
  "#89EC9B", // green
];

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const colorIndexRef = useRef(0);
  const colorTransitionRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Transition between colors faster
      colorTransitionRef.current++;
      if (colorTransitionRef.current > 15) {
        // Change color every 15 particles
        colorTransitionRef.current = 0;
        colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length;
      }

      // Create wispy, elongated particles for smoke effect
      const maxLife = Math.random() * 100 + 80; // Longer life
      particlesRef.current.push({
        x: e.clientX + (Math.random() - 0.5) * 8,
        y: e.clientY + (Math.random() - 0.5) * 8,
        sizeX: Math.random() * 60 + 40, // Elongated width
        sizeY: Math.random() * 25 + 15, // Thinner height for wisps
        rotation: Math.random() * Math.PI * 2, // Random rotation
        speedX: (Math.random() - 0.5) * 0.8, // More drift
        speedY: (Math.random() - 0.5) * 0.6 - 0.5, // More upward drift
        life: maxLife,
        maxLife: maxLife,
        colorIndex: colorIndexRef.current,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life--;
        particle.sizeX *= 1.01; // Grow and stretch out
        particle.sizeY *= 0.98; // Get thinner
        particle.rotation += 0.01; // Slight rotation

        // Calculate opacity based on life
        const opacity = particle.life / particle.maxLife;

        if (particle.life <= 0) {
          return false; // Remove particle
        }

        // Get color for this particle
        const color = COLORS[particle.colorIndex];

        // Save context state
        ctx.save();

        // Move to particle position and rotate
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        // Create elliptical gradient for wispy smoke
        const gradient = ctx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          particle.sizeX * 0.8
        );

        // Very soft, wispy smoke effect
        const alpha = opacity * 0.25;
        gradient.addColorStop(
          0,
          `${color}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(
          0.3,
          `${color}${Math.floor(alpha * 0.6 * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(
          0.7,
          `${color}${Math.floor(alpha * 0.2 * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(1, `${color}00`);

        // Draw elongated ellipse for wisp effect
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.sizeX, particle.sizeY, 0, 0, Math.PI * 2);
        ctx.fill();

        // Restore context state
        ctx.restore();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
