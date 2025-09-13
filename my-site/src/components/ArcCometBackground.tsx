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

export default function ArcCometBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let DPR = 1, W = 0, H = 0;
    let raf = 0 as number;

    // curve control points
    let p0 = { x: 0, y: 0 };
    let p1 = { x: 0, y: 0 };
    let p2 = { x: 0, y: 0 };

    // stars + trail
    const LAYERS = 3;
    const stars: Array<{ x: number; y: number; r: number; a: number; z: number }> = [];
    const trail: Array<{ x: number; y: number; life: number }> = [];

    // shooting star
    let shoot = 0;
    let shootPos = { x: 0, y: 0 };
    let shootVel = { x: 0, y: 0 };

    // comet param and continuous star drift
    let cometT = 0;                 // 0..1 for Bezier position (wraps)
    let starOffset = 0;             // keeps increasing (never resets)
    let lastTs = 0;                 // for dt timing

    const B = (k: number) => ({
      x: (1 - k) * (1 - k) * p0.x + 2 * (1 - k) * k * p1.x + k * k * p2.x,
      y: (1 - k) * (1 - k) * p0.y + 2 * (1 - k) * k * p1.y + k * k * p2.y,
    });

    const setCanvas = () => {
      const rect = container.getBoundingClientRect();
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // arc across this section
      p0 = { x: -W * 0.05, y: H - 24 };
      p1 = { x: W * 0.5, y: 18 };
      p2 = { x: W * 1.05, y: H - 24 };

      // starfield (positions fixed; drift comes from starOffset)
      stars.length = 0;
      for (let l = 0; l < LAYERS; l++) {
        const count = Math.round((W / 10) * (l + 1) * 0.06);
        for (let i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: (Math.random() * (l + 1)) * 0.9 + 0.3,
            a: Math.random() * Math.PI * 2,
            z: 0.35 + l * 0.35, // parallax factor
          });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#0b0614");
      bg.addColorStop(1, "#140a04");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const { x, y } = B(0.62);
      const g = ctx.createRadialGradient(x, y, 0, x, y, 22);
      g.addColorStop(0, "rgba(255,255,255,0.9)");
      g.addColorStop(0.35, "rgba(236,72,153,0.5)");
      g.addColorStop(1, "rgba(245,158,11,0.0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      // advance comet param (wraps 0..1)
      cometT += 0.30 * dt;
      if (cometT > 1) cometT -= 1;

      // advance star offset
      starOffset += 40 * dt;

      // background
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#0b0614");
      bg.addColorStop(1, "#140a04");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // stars
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(s.a + ts * 0.0015 * (1.5 + s.z));
        const px = (s.x - (starOffset * s.z)) % (W + 100);
        const sx = px < -50 ? px + W + 100 : px;
        ctx.globalAlpha = 0.3 + 0.7 * twinkle;
        ctx.beginPath();
        ctx.arc(sx, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226,232,240,0.9)";
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // comet trail
      const { x, y } = B(cometT);
      trail.push({ x, y, life: 1 });
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.028 - 0.01 * dt;
        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        const r = 12 * p.life + 4;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, "rgba(255,255,255,0.22)");
        g.addColorStop(0.35, "rgba(167,139,250,0.45)");
        g.addColorStop(0.7, "rgba(236,72,153,0.30)");
        g.addColorStop(1, "rgba(245,158,11,0.0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // comet head
      const head = ctx.createRadialGradient(x, y, 0, x, y, 20);
      head.addColorStop(0, "rgba(255,255,255,0.98)");
      head.addColorStop(0.35, "rgba(236,72,153,0.85)");
      head.addColorStop(1, "rgba(245,158,11,0.00)");
      ctx.fillStyle = head;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      // shooting star
      if (shoot === 0 && Math.random() < 0.006) {
        shoot = 0.0001;
        shootPos = { x: Math.random() * W * 0.6 + W * 0.2, y: Math.random() * H * 0.5 + 10 };
        const ang = (-25 + Math.random() * 10) * (Math.PI / 180);
        const speed = 12 + Math.random() * 10;
        shootVel = { x: Math.cos(ang) * speed, y: Math.sin(ang) * speed };
      }
      if (shoot > 0) {
        shoot += 1.2 * dt;
        shootPos.x += shootVel.x * dt * 60;
        shootPos.y += shootVel.y * dt * 60;
        ctx.globalCompositeOperation = "lighter";
        const sg = ctx.createLinearGradient(
          shootPos.x - shootVel.x * 2,
          shootPos.y - shootVel.y * 2,
          shootPos.x,
          shootPos.y
        );
        sg.addColorStop(0, "rgba(167,139,250,0.0)");
        sg.addColorStop(0.6, "rgba(236,72,153,0.5)");
        sg.addColorStop(1, "rgba(255,255,255,0.9)");
        ctx.strokeStyle = sg;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootPos.x - shootVel.x * 12, shootPos.y - shootVel.y * 12);
        ctx.lineTo(shootPos.x, shootPos.y);
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
        if (
          shootPos.x < -50 || shootPos.x > W + 50 ||
          shootPos.y < -50 || shootPos.y > H + 50
        ) shoot = 0;
      }

      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf);
      trail.length = 0;
      setCanvas();
      lastTs = 0;
      if (reduced) {
        drawStatic();
      } else {
        raf = requestAnimationFrame(frame);
      }
    });

    setCanvas();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }
    ro.observe(container);

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,16,0.5), transparent 20%, transparent 80%, rgba(10,10,16,0.6))",
        }}
      />
    </div>
  );
}
