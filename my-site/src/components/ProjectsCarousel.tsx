'use client';

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";

const FALLBACK_IMG = "/fallback.png";

type Project = {
  title: string;
  img: string;
  desc: string;
  stack: string[];
  repo: string;
};

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [idx, setIdx] = useState(0);
  const n = projects.length;

  const prev = () => setIdx((i) => (i - 1 + n) % n);
  const next = () => setIdx((i) => (i + 1) % n);

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
        @keyframes projectFade {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
        <div
          key={`img-${idx}`}
          className="order-2 lg:order-1 animate-[projectFade_350ms_ease-out]"
        >
          <ProjectImage project={p} />
        </div>

        <div
          key={`details-${idx}`}
          className="order-1 lg:order-2 space-y-5 animate-[projectFade_350ms_ease-out]"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-white/30" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Project {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-medium text-white mb-3 tracking-tight">
              {p.title}
            </h3>

            <p className="text-zinc-300 leading-relaxed text-[15px]">{p.desc}</p>
          </div>

          <div>
            <div className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {p.title === "Prior Systems" && (
              <Link
                href="/projects/prior-systems"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-mono text-xs hover:bg-zinc-200 transition-colors duration-200 group"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Showcase</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/15 text-zinc-300 font-mono text-xs hover:border-white/40 hover:text-white transition-colors duration-200 group"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Repository</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 max-w-6xl mx-auto">
        <button
          onClick={prev}
          aria-label="Previous project"
          className="flex items-center gap-2 px-3 py-1.5 border border-white/15 text-zinc-400 hover:border-white/40 hover:text-white transition-colors duration-200 font-mono text-xs group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-px transition-all duration-300 ${
                i === idx ? "w-10 bg-white" : "w-5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next project"
          className="flex items-center gap-2 px-3 py-1.5 border border-white/15 text-zinc-400 hover:border-white/40 hover:text-white transition-colors duration-200 font-mono text-xs group"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

/* --- static project image, no tilt, no spotlight --- */
function ProjectImage({ project }: { project: Project }) {
  const [imgSrc, setImgSrc] = useState(project?.img || FALLBACK_IMG);

  useEffect(() => {
    setImgSrc(project?.img || FALLBACK_IMG);
  }, [project]);

  return (
    <div className="relative w-full aspect-[4/3] border border-white/10 overflow-hidden bg-white/[0.02]">
      <img
        src={imgSrc}
        onError={() => setImgSrc(FALLBACK_IMG)}
        alt={project.title}
        className={`absolute inset-0 w-full h-full ${
          project.title === "Prior Systems" ? "object-contain p-12" : "object-cover"
        }`}
        style={{ filter: "saturate(0.9)" }}
      />
    </div>
  );
}
