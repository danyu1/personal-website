'use client';

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

const FALLBACK_IMG = "/fallback.png";

export default function ProjectsCarousel({
  projects,
}: {
  projects: { title: string; img: string; desc: string; stack: string[]; repo: string }[];
}) {
  const [idx, setIdx] = useState(0);
  const n = projects.length;

  const prev = () => {
    setIdx((i) => (i - 1 + n) % n);
  };
  const next = () => {
    setIdx((i) => (i + 1) % n);
  };

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
    <div className="relative w-full" ref={wrapRef}>
      <style>{`
        @keyframes projectSlideIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes detailsSlideIn {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Featured Project Showcase */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
        {/* Project Image/Card */}
        <div
          key={`img-${idx}`}
          className="order-2 lg:order-1 animate-[projectSlideIn_500ms_ease-out]"
        >
          <TiltFollowCard project={p} />
        </div>

        {/* Project Details */}
        <div
          key={`details-${idx}`}
          className="order-1 lg:order-2 space-y-6 animate-[detailsSlideIn_500ms_ease-out]"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-12 bg-amber-500"></div>
              <span className="text-xs font-mono text-amber-500 uppercase tracking-wider">
                Project {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            </div>

            <h3 className="text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight">
              {p.title}
            </h3>

            <p className="text-slate-400 leading-relaxed text-base">
              {p.desc}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-400 hover:border-amber-500/50 hover:text-amber-500 transition-colors duration-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-sm hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group"
            >
              <Github className="w-4 h-4" />
              <span>View Repository</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-12 max-w-7xl mx-auto">
        <button
          onClick={prev}
          aria-label="Previous project"
          className="flex items-center gap-2 px-4 py-2 border border-slate-800 text-slate-400 hover:border-amber-500/50 hover:text-amber-500 transition-all duration-300 font-mono text-sm group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Progress Indicators */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIdx(i);
              }}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1 transition-all duration-300 ${
                i === idx
                  ? "w-12 bg-amber-500"
                  : "w-6 bg-slate-800 hover:bg-slate-700"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next project"
          className="flex items-center gap-2 px-4 py-2 border border-slate-800 text-slate-400 hover:border-amber-500/50 hover:text-amber-500 transition-all duration-300 font-mono text-sm group"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

/* --- internal tilt + spotlight card --- */
function TiltFollowCard({
  project,
}: {
  project: { title: string; img: string; desc: string; stack: string[]; repo: string };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ transform: "translateZ(0)" });
  const [imgSrc, setImgSrc] = useState(project?.img || FALLBACK_IMG);
  const [moving, setMoving] = useState(false);
  const idleRef = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    setImgSrc(project?.img || FALLBACK_IMG);
  }, [project]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      const nx = Math.max(-0.5, Math.min(0.5, px / r.width - 0.5));
      const ny = Math.max(-0.5, Math.min(0.5, py / r.height - 0.5));

      const tiltX = Math.round(ny * -12 * 100) / 100;
      const tiltY = Math.round(nx * 12 * 100) / 100;
      const tx = Math.round(-nx * 20 * 100) / 100;
      const ty = Math.round(-ny * 20 * 100) / 100;

      setMoving(true);
      if (idleRef.current) window.clearTimeout(idleRef.current);
      setStyle({
        transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${tx}px,${ty}px,0)`,
        ["--px"]: `${px}px`,
        ["--py"]: `${py}px`,
      } as React.CSSProperties);
      idleRef.current = window.setTimeout(() => setMoving(false), 100);
    });
  };

  const onLeave = () => {
    if (idleRef.current) window.clearTimeout(idleRef.current);
    setMoving(false);
    setStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)",
      ["--px"]: "50%",
      ["--py"]: "50%",
      transition: "transform 250ms ease-out",
    } as React.CSSProperties);
  };

  return (
    <div className="relative w-full aspect-4/3">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-amber-500/10 blur-3xl -z-10 scale-95"></div>

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative w-full h-full border border-slate-800 overflow-hidden will-change-transform group"
        style={style}
      >
        <img
          src={imgSrc}
          onError={() => setImgSrc(FALLBACK_IMG)}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "scale(1.05)",
            transition: moving ? "none" : "transform 150ms ease-out",
          }}
        />

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/60" />

        {/* Hover spotlight effect with amber */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(500px circle at var(--px, 50%) var(--py, 50%), rgba(251, 146, 60, 0.08), transparent 50%)",
          }}
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-amber-500/30"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-amber-500/30"></div>
      </div>
    </div>
  );
}
