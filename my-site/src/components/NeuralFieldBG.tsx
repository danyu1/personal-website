'use client';

import React, { useRef, useEffect, useMemo } from "react";

function usePrefersReducedMotion() {
  const prefers = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    []
  );
  return prefers;
}

export default function NeuralFieldBG() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const pr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.floor(window.innerWidth * pr);
      c.height = Math.floor(window.innerHeight * pr);
      c.style.width = "100%";
      c.style.height = "100%";
    };
    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      // 🔹 Static fallback for reduced motion
      const bg = ctx.createLinearGradient(0, 0, c.width, c.height);
      bg.addColorStop(0, "#0b0614");
      bg.addColorStop(1, "#140a04");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, c.width, c.height);

      const waves = 6;
      for (let k = 0; k < waves; k++) {
        const amp = 40 + k * 12;
        const yBase = (c.height / (waves + 1)) * (k + 1);
        ctx.beginPath();
        for (let x = 0; x <= c.width; x += 6) {
          const y = yBase + Math.sin(x * 0.005) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, yBase - amp, c.width, yBase + amp);
        grad.addColorStop(0, "rgba(168, 85, 247, 0.35)");
        grad.addColorStop(0.5, "rgba(236, 72, 153, 0.25)");
        grad.addColorStop(1, "rgba(245, 158, 11, 0.35)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2 + k * 0.6;
        ctx.globalCompositeOperation = "lighter";
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
      }

      return () => window.removeEventListener("resize", resize);
    }

    // 🔹 Animated version
    let t = 0;
    let raf = 0 as number;
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, c.width, c.height);

      const bg = ctx.createLinearGradient(0, 0, c.width, c.height);
      bg.addColorStop(0, "#0b0614");
      bg.addColorStop(1, "#140a04");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, c.width, c.height);

      const waves = 6;
      for (let k = 0; k < waves; k++) {
        const amp = 40 + k * 12;
        const speed = 0.6 + k * 0.12;
        const yBase = (c.height / (waves + 1)) * (k + 1);
        ctx.beginPath();
        for (let x = 0; x <= c.width; x += 6) {
          const y =
            yBase + Math.sin(x * 0.005 + t * speed) * amp * Math.cos(t * 0.7 + k);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, yBase - amp, c.width, yBase + amp);
        grad.addColorStop(0, "rgba(168, 85, 247, 0.35)");
        grad.addColorStop(0.5, "rgba(236, 72, 153, 0.25)");
        grad.addColorStop(1, "rgba(245, 158, 11, 0.35)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2 + k * 0.6;
        ctx.globalCompositeOperation = "lighter";
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-95"
      aria-hidden
    />
  );
}
