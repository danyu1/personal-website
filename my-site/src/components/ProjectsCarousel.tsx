'use client';

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";

const FALLBACK_IMG = "/fallback.png";

export default function ProjectsCarousel({
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

      <div className="flex items-start gap-8 lg:gap-16">
        {/* prev */}
        <button
          onClick={prev}
          aria-label="Previous project"
          className="hidden lg:flex h-11 p-4 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors self-start mt-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* stage + tilt */}
        <TiltFollowCard key={idx} project={p} dir={dir} />

        {/* details */}
        <div
          key={`details-${idx}`}
          className={`flex-1 max-w-xl ${
            dir === 1
              ? "animate-[cardInRight_420ms_ease-out]"
              : "animate-[cardInLeft_420ms_ease-out]"
          }`}
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

        {/* next */}
        <button
          onClick={next}
          aria-label="Next project"
          className="hidden lg:flex h-11 p-4 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors self-start mt-10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-4 mt-6">
        <div className="flex gap-2 items-center">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === idx ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
        <div className="text-gray-400 text-sm">
          {idx + 1} of {n}
        </div>
      </div>
    </div>
  );
}

/* --- internal tilt + spotlight card --- */
function TiltFollowCard({
  project,
  dir,
}: {
  project: { title: string; img: string; desc: string; stack: string[]; repo: string };
  dir: 1 | -1;
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

      // stronger tilt + parallax
      const tiltX = Math.round(ny * -18 * 100) / 100; // -18..18deg
      const tiltY = Math.round(nx * 18 * 100) / 100;
      const tx = Math.round(-nx * 32 * 100) / 100;
      const ty = Math.round(-ny * 20 * 100) / 100;

      setMoving(true);
      if (idleRef.current) window.clearTimeout(idleRef.current);
      setStyle({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${tx}px,${ty}px,0)`,
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
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)",
      ["--px"]: "50%",
      ["--py"]: "50%",
      transition: "transform 200ms ease-out",
    } as React.CSSProperties);
  };

  return (
    <div className="flex-1 flex justify-center">
      <div className="relative w-full max-w-4xl h-96">
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={`relative w-full h-full rounded-2xl overflow-hidden will-change-transform group ${
            dir === 1
              ? "animate-[cardInRight_420ms_ease-out]"
              : "animate-[cardInLeft_420ms_ease-out]"
          }`}
          style={style}
        >
          <img
            src={imgSrc}
            onError={() => setImgSrc(FALLBACK_IMG)}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: "scale(1.06)",
              transition: moving ? "none" : "transform 120ms ease-out",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(600px circle at var(--px, 50%) var(--py, 50%), rgba(255,255,255,0.08), transparent 40%)",
            }}
          />
          <div
            className="absolute inset-0 -z-10 blur-xl opacity-0 group-hover:opacity-90 transition-opacity"
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
                className="text-slate-300 hover:text-white transition-colors"
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
