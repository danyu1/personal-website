'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Github,
  GraduationCap,
  Award,
  Sparkles,
  ChevronUp,
  Brain,
  Layers3,
  Waves,
  Trophy,
  PersonStanding,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Latent3DPlot from "@/components/Latent3DPlot";

const FALLBACK_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(
'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="100%" height="100%" fill="#111"/><text x="50%" y="50%" fill="#aaa" font-family="sans-serif" font-size="24" text-anchor="middle" dominant-baseline="middle">Image not found</text></svg>'
)}`;

//Simple Tag component for pill-like labels
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-sm">
      {children}
    </span>
  );
}

/* === Reduced-motion hook === */
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

function CourseworkMarquee({ items }: { items: string[] }) {
  return (
  <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-4">
      {/* soft blend to sections above/below */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent to-black/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-transparent to-black/20" />
      <div className="overflow-hidden">
        <div className="flex gap-3 animate-[scrollX_22s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none px-4">
          {items.concat(items, items).map((c, idx) => (
            <span
              key={`${c}-${idx}`}
              className="shrink-0 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-sm whitespace-nowrap"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes scrollX { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function TiltSpotlightCard({
  project,
  className = "",
  active = true,
}: {
  project: { title: string; img: string; desc: string; stack: string[]; repo: string};
  className?: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ transform: "translateZ(0)" });
  const [imgSrc, setImgSrc] = useState<string>(project?.img || FALLBACK_IMG);
  const [moving, setMoving] = useState(false);
  const idleRef = useRef<number | null>(null);


  // keep img src in sync with project changes
  useEffect(() => {
  setImgSrc(project?.img || FALLBACK_IMG);
  }, [project]);


  // tiny dev test to ensure math doesn't produce NaN
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const testRect = { width: 800, height: 400 } as const;
    const px = 200, py = 100;
    const nx = px / testRect.width - 0.5;
    const ny = py / testRect.height - 0.5;
    const rx = ny * -16; const ry = nx * 18;
    console.assert(Number.isFinite(rx) && Number.isFinite(ry), '[TiltSpotlightCard test] rx/ry should be finite');
}, []);


const onMove = (e: React.MouseEvent) => {
  const el = ref.current; if (!el) return;
  const r = el.getBoundingClientRect();
  const px = e.clientX - r.left;
  const py = e.clientY - r.top;
  const nx = px / r.width - 0.5; // -0.5 .. 0.5
  const ny = py / r.height - 0.5; // -0.5 .. 0.5


  //tilt angles
  const rx = (ny) * -16;
  const ry = (nx) * 18;


  // parallax offset for background image (move opposite to cursor)
  const tx = -nx * 24; // px (image parallax)
  const ty = -ny * 16; // px


  //whole card subtle translation (move with cursor)
  const ctx = nx * 10; // px
  const cty = ny * 8; // px

  setMoving(true);
  if (idleRef.current) window.clearTimeout(idleRef.current);
  setStyle({
    transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`,
    ["--px"]: `${px}px`,
    ["--py"]: `${py}px`,
    ["--ox"]: `${tx}px`,
    ["--oy"]: `${ty}px`,
    ["--tx"]: `${ctx}px`,
    ["--ty"]: `${cty}px`,
    transition: 'none',
  } as React.CSSProperties);
  idleRef.current = window.setTimeout(() => setMoving(false), 100);
};
const onEnter = (e: React.MouseEvent) => {
  onMove(e);
};
const onLeave = () => {
  if (idleRef.current) window.clearTimeout(idleRef.current);
  setMoving(false);
  setStyle({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    ["--px"]: "50%",
    ["--py"]: "50%",
    ["--ox"]: "0px",
    ["--oy"]: "0px",
    transition: "transform 160ms ease-out",
  } as React.CSSProperties);
};


  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
      "relative w-full h-96 max-w-2xl will-change-transform transform-gpu",
      "[transform-style:preserve-3d] group",
      className
    )}
    style={style}
    role="group"
    aria-label={`${project.title} preview`}
  >
    <div className="relative w-full h-full transform-gpu" style={{ transform: 'translate3d(var(--tx, 0), var(--ty, 0), 0)', transition: moving ? 'none' : 'transform 120ms ease-out' }}>
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
      {/* Image (native <img>) with a safe fallback to avoid null/undefined src */}
      <img
        src={imgSrc}
        onError={() => setImgSrc(FALLBACK_IMG)}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          transform: 'scale(1.06)',
          transition: moving ? 'none' : 'transform 120ms ease-out',
        }}
      />
      {/* soft edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      {/* spotlight following cursor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
          "radial-gradient(600px circle at var(--px, 50%) var(--py, 50%), rgba(255,255,255,0.08), transparent 40%)",
        }}
      />
      {/* material glow */}
      <div
        className="absolute inset-0 -z-10 blur-xl rounded-xl opacity-0 group-hover:opacity-90 transition-opacity"
        style={{
          background:
          "radial-gradient(800px circle at var(--px, 50%) var(--py, 50%), rgba(147, 51, 234, 0.15), transparent 40%)",
        }}
      />
      {/* caption */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <div className="text-white font-semibold drop-shadow">
          {project.title}
        </div>
        {project.repo && (
          <a
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.title} GitHub repo`}
        className="text-slate-300 hover:text-white transition-colors pointer-events-auto"
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={(e) => e.stopPropagation()}
          >
        <Github className="w-5 h-5" />
          </a>
        )}
      </div>
      </div>
    </div>
</div>
);
}

function FollowMouseStage({
  className = "",
  children,
  strengthX = 12,
  strengthY = 10,
}: {
  className?: string;
  children: React.ReactNode;
  strengthX?: number;
  strengthY?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const idleRef = React.useRef<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - (r.left + r.width / 2)) / r.width;   // -0.5..0.5
    const ny = (e.clientY - (r.top + r.height / 2)) / r.height;  // -0.5..0.5
    const tx = nx * strengthX;
    const ty = ny * strengthY;
    if (idleRef.current) window.clearTimeout(idleRef.current);
    setStyle({ transform: `translate3d(${tx}px, ${ty}px, 0)`, transition: "none" });
    idleRef.current = window.setTimeout(() => {
      setStyle({ transform: "translate3d(0,0,0)", transition: "transform 160ms ease-out" });
    }, 100);
  };

  const onLeave = () => {
    if (idleRef.current) window.clearTimeout(idleRef.current);
    setStyle({ transform: "translate3d(0,0,0)", transition: "transform 160ms ease-out" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(className, "transform-gpu will-change-transform")}
      style={style}
    >
      {children}
    </div>
  );
}

function ProjectsCarousel({
  projects,
}: {
  projects: { title: string; img: string; desc: string; stack: string[]; repo: string }[];
}) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const n = projects.length;
  const prev = () => {
    setDir(-1);
    setIdx((i) => (i - 1 + n) % n);
  };
  const next = () => {
    setDir(1);
    setIdx((i) => (i + 1) % n);
  };

  // Basic runtime validation (acts like lightweight tests in dev)
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    console.assert(
      Array.isArray(projects) && projects.length > 0,
      "[ProjectsCarousel test] projects should be a non-empty array"
    );
    projects.forEach((p, i) => {
      if (!p || typeof p.img !== "string" || p.img.length === 0) {
        // eslint-disable-next-line no-console
        console.warn(
          `[ProjectsCarousel] Project[${i}] has invalid img; using fallback.`
        );
      }
      console.assert(
        typeof p.title === "string" && p.title.length > 0,
        `[ProjectsCarousel test] Project[${i}] missing title`
      );
    });
  }, [projects]);

  // swipe
  const wrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0;
    let dragging = false;
    const down = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (dx > 50) prev();
      else if (dx < -50) next();
      dragging = false;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [n]);

  const p = projects[idx];
  return (
    <div className="relative max-w-6xl mx-auto" ref={wrapRef}>
      <style>{`
        @keyframes cardInRight { 0% { opacity: 0; transform: translateX(24px); filter: blur(6px);} 100% { opacity: 1; transform: translateX(0); filter: blur(0);} }
        @keyframes cardInLeft { 0% { opacity: 0; transform: translateX(-24px); filter: blur(6px);} 100% { opacity: 1; transform: translateX(0); filter: blur(0);} }
      `}</style>
      <div className="flex items-center gap-8 lg:gap-16">
        <button
          onClick={prev}
          aria-label="Previous project"
          className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 hidden lg:flex p-4 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors shrink-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* stage */}
        <FollowMouseStage className="flex-1 flex justify-center">
          <div className="relative w-full max-w-4xl h-96">
            <div
              key={idx}
              className={cn(
                "relative w-full h-full will-change-transform",
                dir === 1
                  ? "animate-[cardInRight_420ms_ease-out]"
                  : "animate-[cardInLeft_420ms_ease-out]"
              )}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <TiltSpotlightCard project={p} />
              </div>
            </div>
          </div>
        </FollowMouseStage>

        {/* details */}
        <div
          key={`details-${idx}`}
          className={cn(
            "flex-1 max-w-xl",
            dir === 1
              ? "animate-[cardInRight_420ms_ease-out]"
              : "animate-[cardInLeft_420ms_ease-out]"
          )}
        >
          <div className="text-sm text-gray-400 mb-1">Selected Project</div>
          <h3 className="text-3xl font-bold text-white mb-1">{p.title}</h3>
          <p className="text-gray-300 leading-relaxed">{p.desc}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="px-2 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          aria-label="Next project"
          className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 hidden lg:flex p-4 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors shrink-0"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* dots + counter */}
      <div className="flex justify-center gap-4 mt-6">
        <div className="flex gap-2 items-center">
          {projects.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-2 rounded-full",
                i === idx ? "bg-white" : "bg-white/30"
              )}
            ></span>
          ))}
        </div>
        <div className="text-center mt-1 text-gray-400 text-sm">
          {idx + 1} of {n}
        </div>
      </div>
    </div>
  );
}


/* === ML-inspired aurora background (perf + reduced motion) === */
function NeuralFieldBG() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const c = canvasRef.current!;
    if (!c) return;
    const ctx = c.getContext("2d")!;
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
      // Static frame for reduced motion
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

    let t = 0;
    let raf = 0 as number;
    function draw() {
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
    }
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-95" aria-hidden />;
}


export function ArcCometBackground() {
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
      const dt = Math.min(0.05, (ts - lastTs) / 1000); // cap dt to avoid jumps
      lastTs = ts;

      // advance comet param (wraps 0..1)
      cometT += 0.30 * dt; // speed
      if (cometT > 1) cometT -= 1;

      // advance star offset continuously (never resets)
      starOffset += 40 * dt; // px/sec drift baseline

      // background
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#0b0614");
      bg.addColorStop(1, "#140a04");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // stars (use starOffset, not cometT)
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
        p.life -= 0.028 - 0.01 * dt; // slight dt stability
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

      // shooting star (unchanged logic; independent of cometT)
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
      lastTs = 0;                 // reset timing baseline
      // do NOT reset starOffset — keep it continuous across resizes
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

const Section = ({
  id,
  title,
  icon,
  children,
  className = "",
}: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={cn("relative py-10", className)} aria-labelledby={`${id}-title`}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-slate-100">
          {title}
        </h2>
      </div>
      {children}
    </div>
  </section>
);

export default function DanielHernandezSite() {
  /* ---------- Data ---------- */
  const coursework = [
    "Systems Programming I",
    "Systems Programming II",
    "Mathematical Foundations of Machine Learning",
    "Introduction to Data Engineering",
    "Linear Models and Experimental Design",
    "Multivariate Calculus",
    "Linear Algebra",
    "Discrete Mathematics",
    "Introduction to Computer Security",
    "Introduction to Data Science I",
  ];

  const skillsPro = [
    "Java",
    "Python",
    "PyTorch",
    "scikit-learn",
    "pandas",
    "CUDA",
    "C",
    "HTML/CSS",
    "TypeScript",
    "JavaScript",
    "React.js",
    "Git",
  ];
  const skillsExp = ["R", "Bash", "SQL", "Unix/Linux"];

  const projects = [
    {
      title: "Athlete Performance Forecasting Platform",
      stack: ["Python", "Playwright", "BeautifulSoup", "pandas", "NumPy", "PyTorch", "LSTM"],
      img: "/images/flightphase.png",
      desc:
        "End-to-end pipeline for NCAA T&F results → hierarchical LSTM for next-season peak prediction; leak-free eval and detailed diagnostics.",
      repo: "https://github.com/danyu1/FlightPhase"
    },
    {
      title: "GIT (from scratch)",
      stack: ["Java"],
      img: "/images/git.png",
      desc:
        "Simplified Git with staging/committing/branching/merging, object-store persistence, and conflict resolution implemented from first principles.",
      repo:"https://github.com/danyu1/GitFinalAssignment"
    },
    {
      title: "Custom Memory Allocator (C)",
      stack: ["C", "mmap", "POSIX"],
      img: "/images/cma.png",
      desc:
        "Dynamic allocator using first-fit strategy with splitting/coalescing, alignment guarantees, and metadata tracking; built atop mmap for granular control.",
      repo:"https://github.com/danyu1/Simple-Malloc"
    },
    {
      title: "Minimal Unix Shell (C)",
      stack: ["C", "POSIX"],
      img: "/images/minimal-shell.jpg",
      desc:
        "Unix-like shell supporting interactive/batch modes, built-ins (cd, pwd, exit), external commands via execvp, stdout redirection (>, >+), semicolon parser, and robust error handling.",
      repo:"https://github.com/danyu1/My-Shell"
    },
  ];

  const presentations = [
    {
      title:
        "Developing AI Emulator Tools for Extreme Events with Application to Heat Waves and Cold Snaps",
      venue: "UChicago Undergraduate Research Symposium 2025 – Oral Presentation",
      authors:
        "Constantino-Daniel Boscu; Daniel Hernandez; Fabio Alvarez Ventura; Advisor: Dorian Abbot",
    },
    {
      title: "Interpretable CVAE for Stochastic System Modeling",
      venue: "AGU Fall Meeting 2025 – Accepted Paper, New Orleans, LA",
      authors:
        "D. Hernandez, C. Boscu, F. Alvarez-Ventura, D.S. Abbot, J. Finkel, A. Chattopadhay, P. Hassanzadeh",
    },
    {
      title: "Interpretable CVAE for Stochastic System Modeling",
      venue:
        "Phoenix STEM Scholars Annual Research Conference 2026 – Oral Presentation (Scheduled)",
      authors:
        "D. Hernandez, C. Boscu, F. Alvarez-Ventura, D.S. Abbot, J. Finkel, A. Chattopadhay, P. Hassanzadeh",
    },
  ];

  const awards = [
    {
      group: "High School — Harvard-Westlake",
      items: [
        "SAT National Hispanic Recognition (2023)",
        "A Honor Roll (2021–2024)",
        "National Spanish Honor Society (2024)",
        "Senior Spotlight (2024) — Awarded to 5 students for excellence in character, leadership, and service at Harvard-Westlake",
      ],
    },
    {
      group: "University of Chicago",
      items: [
        "Polsky Fellow (2025) — Polsky Center for Entrepreneurship and Innovation",
      ],
    },
  ];

  /* ---------- Page ---------- */
  return (
    <div className="min-h-screen text-slate-200">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-slate-900 focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <NeuralFieldBG />

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-amber-400 ring-2 ring-slate-700 grid place-items-center">
              <PersonStanding className="w-7 h-7" aria-hidden />
            </div>
            <div>
              <div className="font-semibold leading-tight">Daniel A. Hernandez</div>
              <div className="text-xs text-slate-400">
                B.S. (Science) Computer Science + Minor in Data Science @ UChicago (’28)
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-3 text-sm" aria-label="Primary">
            <a className="hover:underline" href="#projects">
              Projects
            </a>
            <a className="hover:underline" href="#experience">
              Experience
            </a>
            <a className="hover:underline" href="#education">
              Education
            </a>
            <a className="hover:underline" href="#awards">
              Awards
            </a>
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <a
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700 hover:bg-slate-800 transition"
              href="https://github.com/danyu1"
              target="_blank"
              rel="noreferrer"
              aria-label="Daniel on GitHub"
            >
              <Github className="w-4 h-4" aria-hidden /> github.com/danyu1
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-16 pb-6" aria-label="Hero">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-[220px,1fr] gap-8 items-center">
          
          {/* Profile photo */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-2xl ring-2 ring-slate-700 overflow-hidden shadow-xl">
              <Image
                src="/images/polskyfellow.jpg"
                alt="Danny Hernandez profile photo"
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-3 text-xs text-slate-400 text-center">
              Polsky Fellow · University of Chicago
            </div>
          </div>

          {/* Hero text */}
          <div id="main">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
              Welcome, I&apos;m Danny!
              <Zap className="w-7 h-7 text-fuchsia-300" aria-hidden />
              I&apos;m a...

            </h1>
            <p className="mt-4 text-slate-300/90 leading-relaxed">
              UChicago artificial intelligence researcher & developer exploring Conditional VAEs for regime
              transitions in dynamical systems. I&apos;m also a varsity collegiate athlete (long jump, triple jump) at the University of Chicago!
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>AI Research Assistant — Geophysical Sciences</Tag>
              <Tag>Full-Stack Developer — Keysar Lab</Tag>
              <Tag>Varsity Horizontal Jumper</Tag>
            </div>
          </div>
        </div>

        {/* Animation */}
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <ArcCometBackground />
        </div>
      </section>

      <Separator className="bg-slate-800/60" />

      {/* Education */}
      <Section
        id="education"
        title="Education"
        icon={<GraduationCap className="w-5 h-5 text-fuchsia-300" aria-hidden />}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/uchicagologo.png"  // put your logo file in /public/images/
                  alt="University of Chicago Logo"
                  width={36}
                  height={36}
                  className="rounded-sm"
                />
                <CardTitle className="text-slate-100">University of Chicago</CardTitle>
              </div>
              <div className="text-sm text-slate-400">
                Chicago, IL — B.S. Computer Science (’28), Minor in Data Science
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Coursework focus: Systems Programming I & II, Mathematical Foundations of Machine Learning, 
              Introduction to Data Engineering, Linear Models and Experimental Design, Multivariate Calculus, 
              Linear Algebra, Discrete Mathematics
            </CardContent>
          </Card>
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/hwlogo.png"  // put your logo file in /public/images/
                  alt="University of Chicago Logo"
                  width={65}
                  height={65}
                  className="rounded-sm"
                />
                <CardTitle className="text-slate-100">Harvard-Westlake</CardTitle>
              </div>
              <div className="text-sm text-slate-400">
                Studio City, CA — GPA: 3.83/4.0
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Coursework focus: Coursework focus: AP Calculus BC (5), AP Statistics (5), AP Computer Science A (5), AP Spanish Language and Culture (5), Honors Design and Data Structures, Honors Topics in Computer Science
            </CardContent>
          </Card> 
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" icon={<Layers3 className="w-5 h-5 text-amber-300" aria-hidden />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">Proficient</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skillsPro.map((s) => (
                <Badge key={s} className="bg-slate-900/70 border-slate-700">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">Experience</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skillsExp.map((s) => (
                <Badge key={s} className="bg-slate-900/70 border-slate-700">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" icon={<Waves className="w-5 h-5 text-fuchsia-300" aria-hidden />}>
        <div className="grid gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>
                  AI Research Assistant — University of Chicago, Geophysical Sciences (Prof. Dorian Abbot)
                </span>
                <span className="text-xs text-slate-400">Sep 2024 – Present</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Designed a novel CVAE to model & autoregress regime transitions in the Holton–Mass system.
                </li>
                <li>
                  Used variational inference with KL-annealing and posterior‑collapse mitigation for stable training.
                </li>
                <li>
                  Found non-trivial latent clusters via PCA aligned with physical regimes; improved interpretability.
                </li>
                <li>
                  Emulated a stochastic PDE climate system while balancing transition statistics & distributional fidelity.
                </li>
                <li>10 hrs/wk (school), 40 hrs/wk (summer); biweekly meetings; driving toward publication.</li>
              </ul>
              <div className="mt-3">
                <Latent3DPlot />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>
                  Full‑Stack Developer — UChicago Psychology (Multilingualism & Decision Making Lab)
                </span>
                <span className="text-xs text-slate-400">Aug 2025 – Present</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 space-y-1">
              <ul className="list-disc pl-5 space-y-1">
                <li>Modernized & deployed the lab website to improve accessibility and participation.</li>
                <li>
                  Built automated communication tools for outreach & study coordination; reduced manual workload.
                </li>
                <li>Translated research needs into robust, scalable technical solutions.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Publications */}
      <Section
        id="pubs"
        title="Publications (Forthcoming)"
        icon={<Sparkles className="w-5 h-5 text-fuchsia-300" aria-hidden />}
      >
        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="p-4 text-sm text-slate-300">
            Hernandez D, Boscu C, Alvarez‑Ventura F, Abbot D.S, Finkel J, Chattopadhay A, Hassanzadeh P.
            <em> Interpretable Conditional Variational Autoencoder for Stochastic System Modeling</em>.
          </CardContent>
        </Card>
      </Section>

      {/* Coursework */}
      <Section
      id="coursework"
      title="Coursework"
      icon={<Brain className="w-5 h-5 text-amber-300" aria-hidden />}
      >
        <CourseworkMarquee items={coursework} />
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" icon={<Layers3 className="w-5 h-5 text-amber-300" aria-hidden />}>
        <ProjectsCarousel projects={projects} />
      </Section>

      {/* Presentations */}
      <Section id="talks" title="Presentations" icon={<Waves className="w-5 h-5 text-fuchsia-300" aria-hidden />}>
        <div className="grid gap-4">
          {presentations.map((t) => (
            <Card key={t.title} className="bg-slate-900/60 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-100">{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-300">
                <div className="text-slate-400">{t.venue}</div>
                <div className="mt-1">{t.authors}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Leadership & Activities */}
      <Section id="leadership" title="Leadership & Activities" icon={<Trophy className="w-5 h-5 text-amber-300" aria-hidden />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Varsity Collegiate Track & Field Athlete</CardTitle>
              <div className="text-xs text-slate-400">UChicago (2024–Present)</div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Competed as a jumper for UChicago Athletics; ranked 95th nationally in NCAA Division III triple jump as a first‑year.
            </CardContent>
          </Card>
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Phoenix STEM Scholar & Research Mentor</CardTitle>
              <div className="text-xs text-slate-400">UChicago (2024–Present)</div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Selected via competitive program supporting first‑gen & underrepresented students in STEM. Mentored incoming students on research paths and course planning.
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Awards & Honors */}
      <Section id="awards" title="Awards & Honors" icon={<Award className="w-5 h-5 text-fuchsia-300" aria-hidden />}>
        <div className="grid gap-4">
          {awards.map((grp) => (
            <Card key={grp.group} className="bg-slate-900/60 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-white">{grp.group}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white">
                <ul className="list-disc pl-5 space-y-1">
                  {grp.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Languages */}
      <Section id="languages" title="Languages" icon={<Layers3 className="w-5 h-5 text-amber-300" aria-hidden />}>
        <div className="flex flex-wrap gap-2">
          <Tag>English — Native</Tag>
          <Tag>Spanish — Native</Tag>
        </div>
      </Section>

      {/* Footer — no contact section at the bottom */}
      <footer className="py-10 border-t border-slate-800/60 bg-gradient-to-b from-transparent to-slate-950/60">
        <div className="max-w-5xl mx-auto px-4 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Daniel A. Hernandez</div>
          <a
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-900/60 border border-slate-700 hover:bg-slate-900"
            href="#hero"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4" /> Top
          </a>
        </div>
      </footer>
    </div>
  );
}
