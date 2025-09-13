"use client";

import React, { useRef, useState, useEffect } from "react";

const FALLBACK_IMG = "/fallback.png";

export default function Hero() {
  return (
    <section className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center lg:items-start gap-12">
      {/* Profile Image with Tilt */}
      <TiltImage img="/images/polskyfellow.jpg" alt="Danny" />

      {/* Text Section */}
      <div className="flex-[2] text-center lg:text-left max-w-6xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          {Array.from("Welcome, I'm Danny!").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-glow"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <h2 className="text-2xl lg:text-3xl font-semibold text-slate-300 mb-4 animate-slide-in">
          I&apos;m a ...
        </h2>

        <p className="text-gray-400 leading-relaxed max-w-5xl mx-auto lg:mx-0 animate-fade-in">
          UChicago artificial intelligence researcher & developer exploring Conditional
          VAEs for regime transitions in dynamical systems. I&apos;m also a varsity collegiate
          athlete (long jump, triple jump) at the University of Chicago!
        </p>

        <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
          {[
            "AI Research Assistant — Geophysical Sciences",
            "Full-Stack Developer — Keysar Lab",
            "Varsity Horizontal Jumper",
          ].map((role, i) => (
            <span
              key={role}
              className="px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-sm opacity-0 animate-fade-in-stagger"
              style={{ animationDelay: `${0.3 + i * 0.3}s` }}
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes glow {
        0%, 100% { color: rgba(191, 138, 235, 1); text-shadow: 0 0 8px #8719d1ff; }
        50% { color: #ffc595ff; text-shadow: 0 0 16px #f1b04eff; }
        }

        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-in { animation: slide-in 0.9s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-stagger { animation: fade-in 0.8s ease-out forwards; }
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
        className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden will-change-transform shadow-lg"
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
          }}
        />
      </div>
    </div>
  );
}
