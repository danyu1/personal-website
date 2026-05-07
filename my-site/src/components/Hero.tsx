"use client";

import React, { useState } from "react";

const FALLBACK_IMG = "/fallback.png";

export default function Hero() {
  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-center">
        {/* Profile Image — static, no tilt */}
        <div className="flex justify-center lg:justify-start">
          <Portrait img="/images/image.png" alt="Daniel A. Hernandez" />
        </div>

        {/* Text */}
        <div className="text-center lg:text-left space-y-5">
          <h1 className="text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.05]">
            Danny Hernandez
          </h1>
          <div className="h-px bg-white/15 max-w-xs mx-auto lg:mx-0" />

          <p className="text-zinc-300 text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Deep-learning researcher for stochastic climate systems and
            computer-vision researcher at UChicago. Incoming Equity Derivatives
            Trading & Structuring Summer Analyst at Morgan Stanley. Incoming
            Software Engineer Intern on Recognition Algorithms & SDK at PopID.
            Varsity collegiate athlete competing in horizontal jumps.
          </p>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
            {[
              "Deep Learning Research",
              "Computer Vision",
              "Equity Derivatives",
              "Software Engineering",
              "Collegiate Athlete",
            ].map((label) => (
              <span
                key={label}
                className="px-3 py-1 bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Static portrait (no tilt) --- */
function Portrait({ img, alt }: { img: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(img || FALLBACK_IMG);

  return (
    <div className="relative w-72 h-72 lg:w-[360px] lg:h-[360px] overflow-hidden border border-white/10">
      <img
        src={imgSrc}
        onError={() => setImgSrc(FALLBACK_IMG)}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center 20%",
          filter: "saturate(0.9)",
        }}
      />
    </div>
  );
}
