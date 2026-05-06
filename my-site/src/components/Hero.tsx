"use client";

import React, { useRef, useState } from "react";

const FALLBACK_IMG = "/fallback.png";

export default function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-6 lg:py-12 min-h-screen flex flex-col justify-center">
      <div className="grid lg:grid-cols-[540px_1fr] gap-30 items-center">
        {/* Profile Image */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"></div>
            <TiltImage img="/images/image.png" alt="Danny" />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-block">
            <div className="text-xs font-mono text-amber-500 mb-2 tracking-wider uppercase">
              [ Hi there, I&apos;m  ]
            </div>
            <h1 className="text-5xl lg:text-6xl font-medium text-white mb-2 tracking-tight">
              Danny Hernandez
            </h1>
            <div className="h-px bg-linear-to-r from-amber-500 via-amber-500/50 to-transparent"></div>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-sm text-slate-400">
            </div>
            <div className="space-y-2 text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p className="text-base">
                Deep Learning Researcher for stochastic climate systems and computer vision researcher at UChicago.
                Incoming Equity Derivatives Trading &amp; Structuring Summer Analyst at Morgan Stanley.
                Incoming Software Engineer Intern on Recognition Algorithms &amp; SDK at PopID.
                Varsity collegiate athlete competing in horizontal jumps.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
            {[
              { label: "Deep Learning Research", icon: "◆" },
              { label: "Computer Vision", icon: "◆" },
              { label: "Equity Derivatives", icon: "◆" },
              { label: "Software Engineering", icon: "◆" },
              { label: "Collegiate Athlete", icon: "◆" },
            ].map((item, i) => (
              <span
                key={item.label}
                className="px-3 py-1.5 bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-colors duration-300 opacity-0 animate-fade-in-stagger"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <span className="text-amber-500/70 mr-1.5">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-stagger {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

/* --- Tilt Image Component --- */
function TiltImage({ img, alt }: { img: string; alt: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "translateZ(0)",
  });
  const [imgSrc, setImgSrc] = useState(img || FALLBACK_IMG);
  const [moving, setMoving] = useState(false);
  const idleRef = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

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

      const tiltX = Math.round(ny * -15 * 100) / 100;
      const tiltY = Math.round(nx * 15 * 100) / 100;
      const tx = Math.round(-nx * 20 * 100) / 100;
      const ty = Math.round(-ny * 20 * 100) / 100;

      setMoving(true);
      if (idleRef.current) window.clearTimeout(idleRef.current);
      setStyle({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${tx}px,${ty}px,0)`,
      });
      idleRef.current = window.setTimeout(() => setMoving(false), 100);
    });
  };

  const onLeave = () => {
    if (idleRef.current) window.clearTimeout(idleRef.current);
    setMoving(false);
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)",
      transition: "transform 200ms ease-out",
    });
  };

  return (
    <div className="flex-1 flex justify-center">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden will-change-transform shadow-lg"
        style={style}
      >
        <img
          src={imgSrc}
          onError={() => setImgSrc(FALLBACK_IMG)}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "scale(1.08)",
            transition: moving ? "none" : "transform 120ms ease-out",
            objectPosition: "center 20%",
            filter: "brightness(0.75) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>
      </div>
    </div>
  );
}
