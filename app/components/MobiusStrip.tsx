"use client";

import { useEffect, useRef } from "react";

export default function MobiusStrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Möbius strip parameters
    const R = 120; // Major radius (distance from center to the middle of the strip)
    const w = 40; // Width of the strip

    const drawMobiusStrip = (rotationY: number, rotationX: number) => {
      ctx.clearRect(0, 0, width, height);

      // Generate points for the Möbius strip
      const segments = 100; // Number of segments around the strip
      const strips = 20; // Number of strips across the width

      const points: Array<{
        x: number;
        y: number;
        z: number;
        u: number;
        v: number;
      }> = [];

      // Generate all points
      for (let i = 0; i <= segments; i++) {
        for (let j = 0; j <= strips; j++) {
          const u = (i / segments) * Math.PI * 2; // Parameter around the circle [0, 2π]
          const v = (j / strips - 0.5) * 2 * w; // Parameter across the width [-w, w]

          // Möbius strip parametric equations
          // The key is the u/2 in the twist, giving it the single twist characteristic
          const x = (R + v * Math.cos(u / 2)) * Math.cos(u);
          const y = (R + v * Math.cos(u / 2)) * Math.sin(u);
          const z = v * Math.sin(u / 2);

          points.push({ x, y, z, u, v });
        }
      }

      // Apply rotations and project to 2D
      const projected = points.map((p) => {
        // Rotate around Y axis
        let x = p.x * Math.cos(rotationY) - p.z * Math.sin(rotationY);
        let z = p.x * Math.sin(rotationY) + p.z * Math.cos(rotationY);
        let y = p.y;

        // Rotate around X axis
        const y2 = y * Math.cos(rotationX) - z * Math.sin(rotationX);
        const z2 = y * Math.sin(rotationX) + z * Math.cos(rotationX);

        // Perspective projection
        const distance = 400;
        const scale = distance / (distance + z2);
        const x2d = x * scale + centerX;
        const y2d = y2 * scale + centerY;

        return { x: x2d, y: y2d, z: z2, u: p.u, v: p.v };
      });

      // Draw the Möbius strip as quads
      const quads: Array<{
        points: Array<{ x: number; y: number }>;
        z: number;
        color: string;
      }> = [];

      for (let i = 0; i < segments; i++) {
        for (let j = 0; j < strips; j++) {
          const idx1 = i * (strips + 1) + j;
          const idx2 = i * (strips + 1) + (j + 1);
          const idx3 = (i + 1) * (strips + 1) + (j + 1);
          const idx4 = (i + 1) * (strips + 1) + j;

          const p1 = projected[idx1];
          const p2 = projected[idx2];
          const p3 = projected[idx3];
          const p4 = projected[idx4];

          // Calculate average z for depth sorting
          const avgZ = (p1.z + p2.z + p3.z + p4.z) / 4;

          // Color based on position - rainbow gradient
          const colorIndex = Math.floor(((i / segments) * 9) % 9);
          const colors = [
            "#F637B3",
            "#EB54F6",
            "#B25AF6",
            "#667AFF",
            "#2EA6FF",
            "#00D2FF",
            "#31DDED",
            "#60E6D5",
            "#89EC9B",
          ];
          const color = colors[colorIndex];

          // Lighting based on normal (simple approximation)
          const brightness = 0.6 + 0.4 * Math.cos(points[idx1].u / 2);

          quads.push({
            points: [
              { x: p1.x, y: p1.y },
              { x: p2.x, y: p2.y },
              { x: p3.x, y: p3.y },
              { x: p4.x, y: p4.y },
            ],
            z: avgZ,
            color: adjustBrightness(color, brightness),
          });
        }
      }

      // Sort quads by depth (painter's algorithm)
      quads.sort((a, b) => a.z - b.z);

      // Draw quads
      quads.forEach((quad) => {
        ctx.fillStyle = quad.color;
        ctx.strokeStyle = quad.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(quad.points[0].x, quad.points[0].y);
        for (let i = 1; i < quad.points.length; i++) {
          ctx.lineTo(quad.points[i].x, quad.points[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });
    };

    // Helper function to adjust brightness
    const adjustBrightness = (color: string, factor: number): string => {
      const hex = color.replace("#", "");
      const r = Math.min(
        255,
        Math.floor(parseInt(hex.slice(0, 2), 16) * factor)
      );
      const g = Math.min(
        255,
        Math.floor(parseInt(hex.slice(2, 4), 16) * factor)
      );
      const b = Math.min(
        255,
        Math.floor(parseInt(hex.slice(4, 6), 16) * factor)
      );
      return `rgb(${r}, ${g}, ${b})`;
    };

    // Animation loop
    const animate = () => {
      angleRef.current += 0.005;
      drawMobiusStrip(angleRef.current, Math.PI / 6);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} width={800} height={600} className="mx-auto" />
  );
}
